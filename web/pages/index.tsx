import Link from "next/link";
import React from "react";

export default function LandingPage() {
  return (
    <div>
      <div className="w-full bg-green-100 p-10">Landing Page</div>
      <Link href="/items">
        <span className="beta-link m-10">Go to web app</span>
      </Link>
    </div>
  );
}
