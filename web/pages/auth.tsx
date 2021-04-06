import React from "react";
import { auth, googleAuthProvider } from "lib/firebase";

export default function AuthPage() {
  const signInWithGoogle = () => {
    auth.signInWithPopup(googleAuthProvider).then(() => {
      close();
    });
  };

  return (
    <div>
      <button className="beta-btn-blue" onClick={signInWithGoogle}>
        sign in with google
      </button>
    </div>
  );
}
