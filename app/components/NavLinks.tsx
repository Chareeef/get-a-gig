"use client";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { Button } from "@/app/components/ui/button";
import { FaBars } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function NavLinks() {
  const { status } = useSession();
  const pathname = usePathname();
  const links = [];

  if (pathname === "/") {
    links.push(
      { name: "Features", href: "#features" },
      { name: "How It Works", href: "#how-it-works" },
      { name: "Our Team", href: "#team" },
    );
  }

  if (status === "authenticated") {
    links.push({ name: "Dashboard", href: "/dashboard" });
  } else {
    links.push(
      { name: "Sign Up", href: "/auth/signup" },
      { name: "Sign In", href: "/auth/signin" },
    );
  }
  return (
    <nav>
      {/* Links for large screens */}
      <div className="hidden items-center gap-3 text-center md:flex">
        {links.map((link) => (
          <Link href={link.href} key={link.name}>
            {link.name}
          </Link>
        ))}

        {/* Sign Out Button */}
        {status === "authenticated" && (
          <button
            onClick={() => signOut({ callbackUrl: "/auth/signin" })}
            className="hover:text-yellow-400 hover:underline"
          >
            Sign Out
          </button>
        )}
      </div>

      {/* Dropdown for small screens */}
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <FaBars className="size-[1.2rem]" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="divide-y divide-gray-200"
          >
            {links.map((link) => (
              <DropdownMenuItem key={link.name}>
                <Link href={link.href} className="w-full hover:text-yellow-400">
                  {link.name}
                </Link>
              </DropdownMenuItem>
            ))}
            {status === "authenticated" && (
              <DropdownMenuItem key="Sign Out">
                <button
                  onClick={() => signOut({ callbackUrl: "/auth/signin" })}
                  className="w-full text-left hover:text-yellow-400"
                >
                  Sign Out
                </button>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
