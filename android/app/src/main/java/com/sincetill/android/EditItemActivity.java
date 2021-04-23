package com.sincetill.android;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.google.firebase.firestore.DocumentSnapshot;
import com.google.firebase.firestore.EventListener;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.FirebaseFirestoreException;
import com.google.firebase.firestore.ListenerRegistration;
import com.sincetill.android.databinding.ActivityEditItemBinding;

public class EditItemActivity extends AppCompatActivity {
    private static final String TAG = "EditItemActivity";

    private Item item;
    ActivityEditItemBinding binding;
    private FirebaseFirestore mFireStore;
    private Auth auth;

    private ListenerRegistration registration = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityEditItemBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setTitle("");

        mFireStore = FirebaseFirestore.getInstance();
        auth = new Auth(this);

        Intent intent = getIntent();
        String uid = intent.getStringExtra("uid");
        String id = intent.getStringExtra("id");
        if (uid.length() > 0 && id.length() > 0) {
            loadItem(uid, id);
        }
    }

    private void loadItem(String uid, String id) {
        registration = mFireStore.collection("users")
                .document(uid)
                .collection("items")
                .document(id)
                .addSnapshotListener(new EventListener<DocumentSnapshot>() {
                    @Override
                    public void onEvent(@Nullable DocumentSnapshot snapshot,
                                        @Nullable FirebaseFirestoreException error) {
                        if (error != null) {
                            Log.w(TAG, "Listen failed.", error);
                        }

                        if (snapshot != null && snapshot.exists()) {
                            Log.d(TAG, "Current data: " + snapshot.getData());
                            item = snapshot.toObject(Item.class);
                            updateUI();
                        } else {
                            Log.d(TAG, "Current data: null");
                        }
                    }
                });
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.edit_item_menu, menu);
        return true;
    }

    @SuppressLint("NonConstantResourceId")
    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem menuItem) {
        switch (menuItem.getItemId()) {
            case android.R.id.home:
                this.finish();
                return true;
            case R.id.sign_out_menu:
                signOut();
                return true;
            default:
                return super.onOptionsItemSelected(menuItem);
        }
    }

    private void signOut() {
        auth.signOut();
        startActivity(new Intent(this, SignInActivity.class));
        finish();
    }

    private void updateUI() {
        if (item != null) {
            getSupportActionBar().setTitle(item.title);
        }
    }

    @Override
    protected void onDestroy() {
        if (registration != null) {
            registration.remove();
        }
        super.onDestroy();
    }
}