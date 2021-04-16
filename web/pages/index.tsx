import Logo from "components/icons/logo";
import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="w-screen h-screen bg-gray-50">
      <nav className="w-full h-16 bg-indigo-800">
        <div className="container w-full h-16 mx-auto flex max-w-screen-lg items-center">
          <div className="w-12 h-12 flex items-center mr-3">
            <Logo />
          </div>
          <div className="text-white text-3xl">since till</div>
        </div>
      </nav>
      <main className="container mx-auto max-w-screen-lg">
        <section className="flex my-6">
          <div className="w-2/3 bg-blue-100 border overflow-hidden rounded mr-3">
            <Image src="/webapp.png" alt="webapp" width="680" height="400" />
            <div className="m-6 text-center text-lg text-gray-600">
              Screenshot
            </div>
          </div>
          <div className="w-1/3 bg-blue-100 rounded ml-3 ">
            <div className="p-10 text-xl text-gray-600">
              A simple app to track date &amp; time since/till an event.
              Supports webapp currently. Android/iOS coming soon.
            </div>
            <div className="m-6 text-center">
              <Link href="/items">
                <span className="beta-link text-xl">Open webapp</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
