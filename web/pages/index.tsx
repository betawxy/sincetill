import Link from "next/link";
import React from "react";

export default function LandingPage() {
  return (
    <div className="w-screen h-screen bg-gray-50">
      <nav className="w-full h-16 bg-indigo-800">
        <div className="container w-full h-16 mx-auto flex max-w-screen-lg">
          <div className="flex self-center text-white text-3xl">since till</div>
        </div>
      </nav>
      <main className="container mx-auto max-w-screen-lg">
        <section className="flex my-6">
          <div className="w-2/3 bg-yellow-100 p-10 rounded mr-3">
            <h1 className="text-xl mb-3">Landing Page</h1>
            <Link href="/items">
              <span className="beta-link">Open web app</span>
            </Link>
          </div>
          <div className="w-1/3 bg-yellow-100 p-10 rounded ml-3">
            <div>Download Apps</div>
          </div>
        </section>
      </main>
    </div>
  );
}
