package com.sincetill.android;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.firestore.CollectionReference;
import com.google.firebase.firestore.DocumentChange;
import com.google.firebase.firestore.EventListener;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.FirebaseFirestoreException;
import com.google.firebase.firestore.QueryDocumentSnapshot;
import com.google.firebase.firestore.QuerySnapshot;
import com.sincetill.android.databinding.ActivityMainBinding;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {
    private static final String TAG = "MainActivity";

    private ActivityMainBinding mBinding;

    private FirebaseAuth mFirebaseAuth;
    private FirebaseFirestore mFireStore;

    private GoogleSignInClient mSignInClient;

    private CollectionReference userItemsRef;
    private ArrayList<Item> userItems;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mBinding = ActivityMainBinding.inflate(getLayoutInflater());
        setContentView(mBinding.getRoot());

        mFirebaseAuth = FirebaseAuth.getInstance();
        signInIfNecessary();

        GoogleSignInOptions gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                .requestIdToken(getString(R.string.default_web_client_id))
                .requestEmail()
                .build();
        mSignInClient = GoogleSignIn.getClient(this, gso);

        mFireStore = FirebaseFirestore.getInstance();

        final CollectionReference userItemsRef =
                mFireStore.collection("users")
                        .document(mFirebaseAuth.getCurrentUser().getUid())
                        .collection("items");
        loadAndSyncUserItems();
    }

    private void loadAndSyncUserItems() {
        userItemsRef.get().addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
            @Override
            public void onComplete(@NonNull Task<QuerySnapshot> task) {
                if (task.isSuccessful()) {
                    for (QueryDocumentSnapshot document : task.getResult()) {
                        Log.d(TAG, document.getId() + " => " + document.getData());
                        Item item = document.toObject(Item.class);
                        userItems.add(item);
                    }
                } else {
                    Log.d(TAG, "Error getting documents: ", task.getException());
                }
            }
        });

        userItemsRef.addSnapshotListener(new EventListener<QuerySnapshot>() {
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
                            i = findItem(item.getId());
                            if (i != -1) {
                                userItems.set(i, item);
                            }
                            break;
                        case REMOVED:
                            Log.d(TAG, "Removed item: " + dc.getDocument().getData());
                            i = findItem(item.getId());
                            if (i != -1) {
                                userItems.remove(i);
                            }
                            break;
                    }
                }
            }

            private int findItem(String id) {
                for (int i = 0; i < userItems.size(); i++) {
                    if (userItems.get(i).getId().equals(id)) {
                        return i;
                    }
                }
                return -1;
            }
        });
    }

    @Override
    protected void onStart() {
        super.onStart();

        signInIfNecessary();
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
            signOut();
            return true;
        }
        return super.onOptionsItemSelected(item);
    }

    private void signOut() {
        mFirebaseAuth.signOut();
        mSignInClient.signOut();
        startActivity(new Intent(this, SignInActivity.class));
        finish();
    }

    private void signInIfNecessary() {
        if (mFirebaseAuth.getCurrentUser() == null) {
            // Not signed in, launch the Sign In activity
            startActivity(new Intent(this, SignInActivity.class));
            finish();
        }
    }
}