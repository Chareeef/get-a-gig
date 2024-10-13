import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get a Gig - Profile",
  description: "Settings for your profile. Set your name and bio.",
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
