import React from "react";
import { auth, googleAuthProvider, usersRef } from "lib/firebase";
import { useRouter } from "next/router";
import { createTUserFromUser } from "lib/utils";

export default function AuthPage() {
  const router = useRouter();

  const signInWithGoogle = () => {
    auth.signInWithPopup(googleAuthProvider).then((credentials) => {
      usersRef
        .doc(credentials.user.uid)
        .get()
        .then((snapshot) => {
          if (!snapshot.data()) {
            usersRef
              .doc(credentials.user.uid)
              .set(createTUserFromUser(credentials.user));
          }
        });
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
