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

export default function NavLinks() {
  const pathname = usePathname();
  const links = [];

  if (pathname === "/") {
    links.push(
      { name: "Features", href: "#features" },
      { name: "How It Works", href: "#how-it-works" },
      { name: "Our Team", href: "#team" },
    );
  }

  links.push(
    { name: "Sign Up", href: "/auth/signup" },
    { name: "Sign In", href: "/auth/signin" },
  );
  return (
    <nav>
      {/* Links for large screens */}
      <div className="items-center hidden text-center md:flex gap-3">
        {links.map((link) => (
          <Link
            href={link.href}
            key={link.name}
            className="hover:text-yellow-400 hover:underline"
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Dropdown for small screens */}
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <FaBars className="h-[1.2rem] w-[1.2rem]" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="divide-y divide-gray-200"
          >
            {links.map((link) => (
              <DropdownMenuItem key={link.name}>
                <Link href={link.href} className="hover:text-yellow-400 w-full">
                  {link.name}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
