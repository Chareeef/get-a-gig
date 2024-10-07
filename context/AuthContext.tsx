"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";

// Creating a wrapper around SessionProvider to use throughout the app
export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
