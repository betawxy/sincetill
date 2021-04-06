import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "lib/firebase";

type TProps = {
  children: JSX.Element | JSX.Element[];
};

export default function AuthRedirect(props: TProps) {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (loading) {
      return;
    }
    if (!error && !!user) {
      setChecked(true);
    } else {
      router.push("/auth?" + "next=" + router.asPath);
    }
  });

  if (!checked) {
    return null;
  }
  return <>{props.children}</>;
}
