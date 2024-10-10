import { satoshi } from "../fonts/fonts";
import NavLinks from "./NavLinks";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";

export default function Header() {
  return (
    <nav className="flex items-center gap-4 px-10 py-5">
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

      {/* Dark/Light/System Mode Toggle */}
      <ModeToggle />
    </nav>
  );
}
