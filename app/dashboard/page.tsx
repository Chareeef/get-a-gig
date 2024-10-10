"use client";
import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin"); // Redirect to login if not authenticated
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <div>Loading...</div>; // Loading state while session is being fetched
  }

  return (
    <div>
      <h1>Welcome, {session?.user?.name || session?.user?.email}</h1>
      {/* Dashboard content */}

      {/* Logout Button */}
      <button
        onClick={() => signOut({ callbackUrl: "/auth/signin" })}
        className="rounded-md border-2 border-amber-50 bg-slate-300 hover:bg-slate-400"
      >
        Log Out
      </button>
    </div>
  );
};

export default Dashboard;
