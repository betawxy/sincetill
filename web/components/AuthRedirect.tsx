import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "lib/firebase";

type TProps = {
  children: JSX.Element | JSX.Element[];
};

export default function AuthRedirect(props: TProps) {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (!loading && (error || !user)) {
      router.replace("/auth?" + "next=" + router.asPath);
    }
  });

  return <>{props.children}</>;
}
