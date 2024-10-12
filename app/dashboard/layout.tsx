import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get A Gig - Dashboard",
  description: "Search for the best jobs for you.",
};

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
