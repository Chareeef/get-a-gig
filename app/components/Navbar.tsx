import Link from "next/link";
import React from "react";
import { satoshi } from "../fonts/fonts";
import { ModeToggle } from "./ModeToggle";

const Navbar: React.FC = () => {
  return (
    <nav className="flex items-center px-10 py-5 gap-4">
      <h1 className={`${satoshi.className} grow text-xl font-black`}>
        GET
        <br />
        <span className="text-yellow-400">@</span> GIG
      </h1>
      <div className="items-center hidden text-center md:flex gap-3">
        <Link href="#" className="hover:underline">
          Features
        </Link>
        <Link href="#" className="hover:underline">
          How It Works
        </Link>
        <Link href="#" className="hover:underline">
          Our Team
        </Link>
        <Link href="/auth/signin" className="hover:underline">
          Sign In
        </Link>
        <Link href="/auth/signup" className="hover:underline">
          Sign Up
        </Link>
      </div>
      <ModeToggle />
    </nav>
  );
};

export default Navbar;
