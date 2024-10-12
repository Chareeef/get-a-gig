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
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [isGoogleAuthAccount, setIsGoogleAuthAccount] = useState(false);

  useEffect(() => {
    if (status !== "authenticated" || !user) {
      return;
    }

    setName(user.name || "");
    setEmail(user.email || "");
    setImage(user.image || "");

    (async () => {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: user.id }),
      });

      const { bio, password } = await response.json();
      if (bio) {
        setBio(bio);
      }

      if (!password) {
        setIsGoogleAuthAccount(true);
      }
    })();
  }, [user, status, router]);

  if (status === "loading") {
    // Show a loading indicator
    return (
      <div className="flex-center h-[60dvh] grow bg-gray-100 dark:bg-slate-500">
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

  return (
    <main className="min-h-[60dvh] grow bg-gray-100 p-4 dark:bg-slate-500">
      <h1 className="text-3xl font-bold">Profile</h1>
      <h1 className="text-2xl font-bold">Name: {name}</h1>
      <h1 className="text-2xl font-bold">Email: {email}</h1>
      <h1 className="text-2xl font-bold">Bio: {bio}</h1>
      <h1 className="text-2xl font-bold">Image: {image}</h1>
      <h1 className="text-2xl font-bold">
        Google Auth Account: {isGoogleAuthAccount ? "Yes" : "No"}
      </h1>
    </main>
  );
}
