import { auth, googleAuthProvider } from "lib/firebase";

export default function SignInDialog({ close }) {
  const signInWithGoogle = () => {
    auth.signInWithPopup(googleAuthProvider).then(() => {
      close();
    });
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-blue-100">
      <div>
        <button
          type="button"
          className="beta-btn-red top-0 right-0"
          onClick={close}
        >
          x
        </button>
      </div>
      <button className="beta-btn-blue" onClick={signInWithGoogle}>
        sign in with google
      </button>
    </div>
  );
}
