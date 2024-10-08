import React from "react";
import type { Metadata } from "next";
import "@/styles/globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { geistSans } from "./fonts/fonts";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "Get a Gig!",
  description: "Uncover that job made just for you!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.className}`}>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
