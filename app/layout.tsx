import React from "react";
import type { Metadata } from "next";
import "@/styles/globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { geistSans } from "./fonts/fonts";
import Header from "@/app/components/Header";
import { ThemeProvider } from "@/app/components/theme-provider";
import Footer from "@/app/components/Footer";
import { Toaster } from "@/app/components/ui/sonner";

export const metadata: Metadata = {
  title: "Get a Gig",
  description: "Uncover that job made just for you!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.className} flex min-h-dvh flex-col overflow-x-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <Header />
            {children}
            <Footer />
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
