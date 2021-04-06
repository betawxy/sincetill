import Link from "next/link";
import React from "react";

export default function LandingPage() {
  return (
    <div>
      <div>Landing Page</div>
      <Link href="/items">
        <div className="beta-link">Open web app</div>
      </Link>
    </div>
  );
}
