import { useContext } from "react";
import { UserContext } from "lib/context";
import { useRouter } from "next/router";

type TProps = {
  children: JSX.Element | JSX.Element[];
};

// Component's children only shown to logged-in users
export default function AuthRedirect(props: TProps) {
  const router = useRouter();

  const { user } = useContext(UserContext);
  if (!user) {
    router.push("/auth?" + "redirect=" + router.pathname);
  }

  return <>{props.children}</>;
}
