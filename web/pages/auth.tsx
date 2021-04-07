import React from "react";
import { auth, googleAuthProvider } from "lib/firebase";
import { useRouter } from "next/router";

export default function AuthPage() {
  const router = useRouter();

  const signInWithGoogle = () => {
    auth.signInWithPopup(googleAuthProvider).then(() => {
      const nextPage = router.query.next as string;
      router.replace(nextPage);
    });
  };

  return (
    <div className="w-screen h-screen flex">
      <div className="mx-auto self-center">
        <button className="beta-btn-blue m-10" onClick={signInWithGoogle}>
          Continue with Google
        </button>
      </div>
    </div>
  );
}