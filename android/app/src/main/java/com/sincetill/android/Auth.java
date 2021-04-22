package com.sincetill.android;

import android.content.Context;
import android.content.Intent;

import androidx.annotation.NonNull;

import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;

public class Auth {
    private FirebaseAuth mFirebaseAuth;
    private GoogleSignInClient mSignInClient;

    public Auth(@NonNull Context context) {
        mFirebaseAuth = FirebaseAuth.getInstance();

        GoogleSignInOptions gso =
                new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                        .requestIdToken(context.getString(R.string.default_web_client_id))
                        .requestEmail()
                        .build();
        mSignInClient = GoogleSignIn.getClient(context, gso);
    }

    public void signOut() {
        mFirebaseAuth.signOut();
        mSignInClient.signOut();
    }

    public boolean isSignedIn() {
        return mFirebaseAuth.getCurrentUser() != null;
    }

    public FirebaseUser getCurrentUser() {
        return mFirebaseAuth.getCurrentUser();
    }
}
