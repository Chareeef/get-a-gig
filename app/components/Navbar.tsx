import React from "react";
import { satoshi } from "../fonts/fonts";
import NavLinks from "./NavLinks";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className="flex items-center px-10 py-5 gap-4">
      {/* Logo */}
      <div className="grow">
        <Link href="/" className={`${satoshi.className} text-xl font-black`}>
          GET
          <br />
          <span className="text-yellow-400">@</span> GIG
        </Link>
      </div>

      {/* Links */}
      <NavLinks />
      <ModeToggle />
    </nav>
  );
};

export default Navbar;
