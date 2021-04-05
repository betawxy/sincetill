import { auth, usersRef } from "lib/firebase";
import { useEffect, useState } from "react";
import { TUserContext } from "./types";
import { useAuthState } from "react-firebase-hooks/auth";

export function useUserData(): TUserContext {
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // turn off realtime subscription
    let unsubscribe: any;

    if (user) {
      unsubscribe = usersRef.doc(user.uid).onSnapshot((doc) => {
        setUserData(doc.data());
      });
    } else {
      setUserData(null);
    }

    return unsubscribe;
  }, [user]);

  return { user, userData };
}
