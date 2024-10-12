import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get A Gig - Sign In",
  description: "Sign In to Get A Gig",
};

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
