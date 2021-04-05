import React from "react";
import Navbar from "./Navbar";

export default function PageWrapper({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  return (
    <>
      <Navbar />
      <main>
        <div className="container mx-auto max-w-screen-md">{children}</div>
      </main>
      <footer></footer>
    </>
  );
}
