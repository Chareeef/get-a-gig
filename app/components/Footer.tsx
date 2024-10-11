"use client";
import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

export default function Footer() {
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
    <footer className="border-t border-gray-200 px-4 py-12 md:px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">
              GET<span className="text-yellow-400">@</span>GIG
            </h2>
            <nav className="flex flex-col space-y-2">
              {links.map((link) => (
                <Link
                  className="hover:underline"
                  href={link.href}
                  key={link.name}
                >
                  {link.name}
                </Link>
              ))}
              {/* Sign Out Button */}
              {status === "authenticated" && (
                <button
                  onClick={() => signOut({ callbackUrl: "/auth/signin" })}
                  className="text-left hover:text-yellow-400 hover:underline"
                >
                  Sign Out
                </button>
              )}
            </nav>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Abdelrahman Hany</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-muted-foreground">
                Co-founder of GET@GIG. Passionate about connecting talented
                individuals with exciting opportunities.
              </p>
              <div className="flex space-x-4">
                <Button variant="outline" size="icon">
                  <Mail className="size-4" />
                  <span className="sr-only">Email Abdelrahman</span>
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Youssef Charif</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-muted-foreground">
                Co-founder of GET@GIG. Dedicated to revolutionizing the job
                search experience for candidates.
              </p>
              <div className="flex space-x-4">
                <Button variant="outline" size="icon">
                  <Mail className="size-4" />
                  <span className="sr-only">Email Youssef</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} GET@GIG. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
