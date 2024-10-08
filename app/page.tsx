"use client";
import { JSX } from "react";
import { satoshi } from "./fonts/fonts";

export default function Home(): JSX.Element {
  return (
    <div
      className={`${satoshi.className}  flex h-[500px] flex-col items-center justify-center gap-4 px-10 `}
    >
      <h1 className="text-center text-6xl font-bold">
        Find Your Dream Remote Job in Tech
      </h1>
      <h2 className="text-center">
        Get-a-Gig connects ALX Software Engineering students with exciting
        remote job opportunities in the tech industry.
      </h2>
      <button
      className="rounded-md bg-yellow-400 px-4 py-2 text-black font-black hover:bg-yellow-500"
      >Get Started</button>
    </div>
  );
}
