import React from "react";
import { auth, googleAuthProvider } from "lib/firebase";
import { useRouter } from "next/router";

export default function AuthPage() {
  const router = useRouter();

  const signInWithGoogle = () => {
    auth.signInWithPopup(googleAuthProvider).then(() => {
      router.query;
      router.back();
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
