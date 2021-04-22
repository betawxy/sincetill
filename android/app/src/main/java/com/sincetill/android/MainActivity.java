package com.sincetill.android;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.SearchView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.google.firebase.firestore.CollectionReference;
import com.google.firebase.firestore.DocumentChange;
import com.google.firebase.firestore.EventListener;
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

    private CollectionReference userItemsRef;
    private ArrayList<Item> userItems;
    private ItemsAdapter itemsAdapter;

    private ListenerRegistration registration = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mBinding = ActivityMainBinding.inflate(getLayoutInflater());
        setContentView(mBinding.getRoot());

        auth = new Auth(this);
        signInIfNecessary();

        mFireStore = FirebaseFirestore.getInstance();

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

    private void updateUI() {
        itemsAdapter.notifyDataSetChanged();
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