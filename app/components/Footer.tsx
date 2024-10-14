"use client";
import Link from "next/link";
import { Linkedin, Mail } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export default function Footer() {
  const { status } = useSession();
  const links = [
    { name: "Features", href: "/#features" },
    { name: "How It Works", href: "/#how-it-works" },
    { name: "Our Team", href: "/#team" },
  ];

  const teamMembers = [
    {
      name: "Abdelrahman Hany",
      bio: "Abdelrahman is a former design architect who transitioned into software engineering, applying his creativity and problem-solving skills to the tech industry. With a background in architecture, he brings a unique perspective to building innovative digital solutions.",
      githubURL: "https://github.com/AbduHany",
      linkedinURL: "https://linkedin.com/in/abduhany",
      xURL: "https://x.com/AbduuHany",
      email: "mailto:abdu.hany@gmail.com",
    },
    {
      name: "Youssef Charif Hamidi",
      bio: "Youssef is a passionate software engineer, committed to building technology that empowers people and creates opportunities for everyone. Inspired by his personal journey, he believes in using innovation to make a positive impact on lives.",
      xURL: "https://x.com/YoussefCharifH2",
      githubURL: "https://github.com/Chareeef",
      linkedinURL: "https://linkedin.com/in/youssef-charif-hamidi",
      email: "mailto:youssef.charif.h@gmail.com",
    },
  ];

  if (status === "authenticated") {
    links.push(
      { name: "Dashboard", href: "/dashboard" },
      { name: "Profile", href: "/profile" },
    );
  } else {
    links.push(
      { name: "Sign Up", href: "/auth/signup" },
      { name: "Sign In", href: "/auth/signin" },
    );
  }

  return (
    <footer className="px-4 pb-8 pt-12 md:px-6">
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
          {teamMembers.map((member) => (
            <Card key={member.name} className="flex flex-col">
              <CardHeader>
                <CardTitle>{member.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex grow flex-col justify-between">
                <p className="mb-4 text-sm text-muted-foreground">
                  {member.bio}
                </p>

                {/* Social Links */}
                <div className="flex space-x-4">
                  <Link
                    href={member.email}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="icon">
                      <Mail className="size-4" />
                      <span className="sr-only">Email {member.name}</span>
                    </Button>
                  </Link>

                  <Link
                    href={member.xURL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="icon">
                      <span style={{ fontSize: "1rem", fontWeight: "bold" }}>
                        𝕏
                      </span>
                      <span className="sr-only">
                        {member.name}&apos;s Twitter
                      </span>
                    </Button>
                  </Link>

                  <Link
                    href={member.linkedinURL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="icon">
                      <Linkedin className="size-4" />
                      <span className="sr-only">
                        {member.name}&apos;s LinkedIn
                      </span>
                    </Button>
                  </Link>

                  <Link
                    href={member.githubURL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="icon">
                      <GitHubLogoIcon className="size-4" />
                      <span className="sr-only">
                        {member.name}&apos;s GitHub
                      </span>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Get@Gig. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
