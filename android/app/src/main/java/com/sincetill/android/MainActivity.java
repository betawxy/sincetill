package com.sincetill.android;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.PopupMenu;
import android.widget.SearchView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.google.firebase.firestore.CollectionReference;
import com.google.firebase.firestore.DocumentChange;
import com.google.firebase.firestore.DocumentSnapshot;
import com.google.firebase.firestore.EventListener;
import com.google.firebase.firestore.FieldPath;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.FirebaseFirestoreException;
import com.google.firebase.firestore.ListenerRegistration;
import com.google.firebase.firestore.QuerySnapshot;
import com.sincetill.android.databinding.ActivityMainBinding;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {
    private static final String TAG = "MainActivity";

    private ActivityMainBinding mBinding;

    private Auth auth;
    private FirebaseFirestore mFireStore;
    private UserSettings userSettings;

    private CollectionReference userItemsRef;
    private ArrayList<Item> userItems;
    private ItemsAdapter itemsAdapter;

    private ListenerRegistration registration = null;

    private String lastKey = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mBinding = ActivityMainBinding.inflate(getLayoutInflater());
        setContentView(mBinding.getRoot());

        auth = new Auth(this);
        signInIfNecessary();

        mFireStore = FirebaseFirestore.getInstance();
        userSettings = new UserSettings();

        userItemsRef = mFireStore.collection("users")
                .document(auth.getCurrentUser().getUid())
                .collection("items");
        userItems = new ArrayList<>();
        loadAndSyncUserItems();

        itemsAdapter = new ItemsAdapter(MainActivity.this, 0, userItems);
        mBinding.listView.setAdapter(itemsAdapter);
        mBinding.listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                Intent intent = new Intent(MainActivity.this, ItemActivity.class);
                intent.putExtra("uid", auth.getCurrentUser().getUid());
                intent.putExtra("id", itemsAdapter.filteredItems.get(position).id);
                startActivity(intent);
            }
        });

        mBinding.searchInput.setOnQueryTextListener(new SearchView.OnQueryTextListener() {
            @Override
            public boolean onQueryTextSubmit(String query) {
                itemsAdapter.getFilter().filter(query);
                return true;
            }

            @Override
            public boolean onQueryTextChange(String newText) {
                itemsAdapter.getFilter().filter(newText);
                return true;
            }
        });

        loadAndSyncUserSettings();

        mBinding.imageButton.setOnClickListener(v -> {
            userSettings.sortDirection = 1 - userSettings.sortDirection;
            updateUI();
            updateServerSide();
        });

        mBinding.sortTypeButton.setOnClickListener(this::showPopupMenu);
    }

    private void updateServerSide() {
        mFireStore.collection("users")
                .document(auth.getCurrentUser().getUid())
                .update(FieldPath.of("settings", "sortDirection"), userSettings.sortDirection);
        mFireStore.collection("users")
                .document(auth.getCurrentUser().getUid())
                .update(FieldPath.of("settings", "sortType"), userSettings.sortType);
    }

    private void showPopupMenu(View v) {
        PopupMenu popupMenu = new PopupMenu(this, v);
        popupMenu.getMenuInflater().inflate(R.menu.popup_menu, popupMenu.getMenu());

        popupMenu.setOnMenuItemClickListener(new PopupMenu.OnMenuItemClickListener() {
            @SuppressLint("NonConstantResourceId")
            @Override
            public boolean onMenuItemClick(MenuItem item) {
                switch (item.getItemId()) {
                    case R.id.option_title:
                        userSettings.sortType = 0;
                        break;
                    case R.id.option_ts:
                        userSettings.sortType = 1;
                        break;
                    case R.id.option_ctime:
                        userSettings.sortType = 2;
                        break;
                    case R.id.option_mtime:
                        userSettings.sortType = 3;
                        break;
                    default:
                        break;
                }
                updateServerSide();
                return true;
            }
        });

        popupMenu.setOnDismissListener(new PopupMenu.OnDismissListener() {
            @Override
            public void onDismiss(PopupMenu menu) {
                updateUI();
            }
        });

        popupMenu.show();
    }


    private void loadAndSyncUserItems() {
        registration = userItemsRef.addSnapshotListener(new EventListener<QuerySnapshot>() {
            @Override
            public void onEvent(@Nullable QuerySnapshot snapshots,
                                @Nullable FirebaseFirestoreException error) {
                if (error != null) {
                    Log.w(TAG, "Listen failed.", error);
                    return;
                }

                for (DocumentChange dc : snapshots.getDocumentChanges()) {
                    Item item = dc.getDocument().toObject(Item.class);
                    int i = -1;
                    switch (dc.getType()) {
                        case ADDED:
                            Log.d(TAG, "New item: " + dc.getDocument().getData());
                            userItems.add(item);
                            break;
                        case MODIFIED:
                            Log.d(TAG, "Modified item: " + dc.getDocument().getData());
                            i = findItem(item.id);
                            if (i != -1) {
                                userItems.set(i, item);
                            }
                            break;
                        case REMOVED:
                            Log.d(TAG, "Removed item: " + dc.getDocument().getData());
                            i = findItem(item.id);
                            if (i != -1) {
                                userItems.remove(i);
                            }
                            break;
                    }
                }

                updateUI();
            }

            private int findItem(String id) {
                for (int i = 0; i < userItems.size(); i++) {
                    if (userItems.get(i).id.equals(id)) {
                        return i;
                    }
                }
                return -1;
            }
        });
    }

    private void loadAndSyncUserSettings() {
        mFireStore.collection("users")
                .document(auth.getCurrentUser().getUid()).addSnapshotListener(new EventListener<DocumentSnapshot>() {
            @Override
            public void onEvent(@Nullable DocumentSnapshot snapshot,
                                @Nullable FirebaseFirestoreException error) {
                if (error != null) {
                    Log.w(TAG, "Listen failed.", error);
                    return;
                }
                if (snapshot.exists()) {
                    userSettings.sortDirection = (long) snapshot.get(FieldPath.of("settings",
                            "sortDirection"));
                    userSettings.sortType = (long) snapshot.get(FieldPath.of("settings",
                            "sortType"));
                }

                updateUI();
            }
        });
    }

    private String encodeState() {
        StringBuilder stringBuilder = new StringBuilder();
        for (int i = 0; i < userItems.size(); i++) {
            stringBuilder.append(userItems.get(i).id);
            stringBuilder.append(",");
        }
        stringBuilder.append(mBinding.searchInput.getQuery()).append(",")
                .append(userSettings.sortDirection).append(",")
                .append(userSettings.sortType).append(",");
        return stringBuilder.toString();
    }

    private void updateUI() {
        String key = encodeState();
        if (!key.equals(lastKey)) {
            lastKey = key;

            if (userSettings.sortDirection == 0) {
                mBinding.imageButton.setImageResource(R.drawable.ic_sort_asc);
            } else {
                mBinding.imageButton.setImageResource(R.drawable.ic_sort_desc);
            }

            mBinding.sortTypeButton.setText(Utils.sortTypeToString(userSettings.sortType));

            itemsAdapter.setSortDirection(userSettings.sortDirection);
            itemsAdapter.setSortType(userSettings.sortType);
            itemsAdapter.getFilter().filter(mBinding.searchInput.getQuery());
        }
    }

    @Override
    protected void onStart() {
        super.onStart();

        signInIfNecessary();
    }

    @Override
    protected void onStop() {
        if (registration != null) {
            registration.remove();
            registration = null;
        }
        super.onStop();
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.main_menu, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
        if (item.getItemId() == R.id.sign_out_menu) {
            auth.signOut();
            startActivity(new Intent(this, SignInActivity.class));
            finish();
            return true;
        }
        return super.onOptionsItemSelected(item);
    }

    private void signInIfNecessary() {
        if (!auth.isSignedIn()) {
            // Not signed in, launch the Sign In activity
            startActivity(new Intent(this, SignInActivity.class));
            finish();
        }
    }
}