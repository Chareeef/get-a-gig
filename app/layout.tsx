import React from "react";
import type { Metadata } from "next";
import "@/styles/globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { geistSans } from "./fonts/fonts";
import Header from "@/app/components/Header";
import { ThemeProvider } from "@/app/components/theme-provider";
import Footer from "@/app/components/Footer";
import { Toaster } from "@/app/components/ui/sonner";
import { JobDetailsProvider } from "@/context/JobDetails";
import { Analytics } from "@vercel/analytics/react";

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
      <head>
        {/* Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />

        {/* Apple Touch Icon */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/apple-touch-icon.png"
        />
      </head>
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
            <JobDetailsProvider>
              <Header />
              {children}
              <Footer />
              <Toaster />
            </JobDetailsProvider>
          </AuthProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
