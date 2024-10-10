"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { satoshi } from "../fonts/fonts";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin"); // Redirect to login if not authenticated
    }
  }, [session, status, router]);

  if (status === "loading") {
    // Show a loading indicator
    return (
      <div className="flex-center grow bg-gray-100 dark:bg-slate-500">
        <span
          className={`${satoshi.className} animate-spin text-2xl font-black text-yellow-500 ease-in-out`}
        >
          @
        </span>
      </div>
    );
  }

  return (
    <main className="flex grow flex-col bg-gray-100 p-4 dark:bg-slate-500">
      <h1>Welcome, {session?.user?.name || session?.user?.email}</h1>
      {/* Dashboard content */}
    </main>
  );
};

export default Dashboard;
