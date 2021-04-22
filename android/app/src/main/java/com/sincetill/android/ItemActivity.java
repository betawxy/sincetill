package com.sincetill.android;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.google.firebase.firestore.DocumentSnapshot;
import com.google.firebase.firestore.EventListener;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.FirebaseFirestoreException;
import com.google.firebase.firestore.ListenerRegistration;
import com.sincetill.android.databinding.ActivityItemBinding;

import java.util.concurrent.ExecutionException;

public class ItemActivity extends AppCompatActivity {
    private static final String TAG = "ItemActivity";

    private Item item;

    private ActivityItemBinding binding;
    private FirebaseFirestore mFireStore;

    private ListenerRegistration registration = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityItemBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        item = null;
        mFireStore = FirebaseFirestore.getInstance();

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

    private void updateUI() {
        if (item != null) {
            binding.itemTitleTextView.setText(item.title);

            if (item.bitmap == null) {
                try {
                    item.bitmap = new ImageDownloader().execute(item.backgroundImage).get();
                } catch (ExecutionException | InterruptedException e) {
                    e.printStackTrace();
                }
            }
            binding.itemImageView.setImageBitmap(item.bitmap);
            binding.itemDiffTextView.setItem(item);
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