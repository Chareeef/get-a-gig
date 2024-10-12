"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/app/components/loadingSpinner";
import { toast } from "sonner";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const user = session?.user;
  const router = useRouter();
  const [name, setName] = useState<string>(user?.name || "");
  const [email, setEmail] = useState<string>(user?.email || "");
  const [image, setImage] = useState<string>(user?.image || "");
  const [bio, setBio] = useState<string>("");
  const [isGoogleAuthAccount, setIsGoogleAuthAccount] = useState(false);

  useEffect(() => {
    console.log(user);
  }, [user, status, router]);

  if (status === "loading") {
    // Show a loading indicator
    return (
      <div className="flex-center grow bg-gray-100 dark:bg-slate-500">
        <LoadingSpinner />
      </div>
    );
  }

  if (status === "unauthenticated") {
    // Redirect to login page
    router.push("/auth/signin");
    toast.error("Please log in to view your profile");
    return null;
  }
  return <main className="grow bg-gray-100 p-4 dark:bg-slate-500"></main>;
}
