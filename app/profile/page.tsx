"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Button } from "@/app/components/ui/button";
import LoadingSpinner from "@/app/components/loadingSpinner";
import { toast } from "sonner";
import { Textarea } from "../components/ui/textarea";
import ProfileImage from "./components/ProfileImage";

const UpdateUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  bio: z.string().optional(),
});

type UpdateUserFormData = z.infer<typeof UpdateUserSchema>;

export default function Dashboard() {
  const { data: session, status } = useSession();
  const user = session?.user;
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [isGoogleAuthAccount, setIsGoogleAuthAccount] = useState(false);

  const form = useForm<UpdateUserFormData>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      name,
      email,
      bio,
    },
  });

  useEffect(() => {
    if (status !== "authenticated" || !user) {
      return;
    }

    setName(user.name || "");
    setEmail(user.email || "");
    setImage(user.image || "");

    (async () => {
      try {
        const response = await fetch("/api/get_user", {
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
      } catch (error) {
        console.error(error);
      }
    })();
  }, [user, status, router]);

  const onSubmit = async (data: UpdateUserFormData) => {
    try {
      const res = await fetch("/api/update_user", {
        method: "POST",
        body: JSON.stringify({ ...data, id: user?.id }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        toast.success("Profile updated successfully.");
        setName(data.name);
        setEmail(data.email);
        setBio(data.bio || "");
      } else {
        const responseData = await res.json();
        toast.error(responseData.error);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating the profile.");
    }
  };

  if (status === "loading") {
    return (
      <div className="flex-center h-[60dvh] grow bg-gray-100 dark:bg-slate-500">
        <LoadingSpinner />
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/auth/signin");
    toast.error("Please log in to view your profile");
    return null;
  }

  return (
    <main className="flex min-h-[60dvh] grow flex-col items-center justify-around gap-4 bg-gray-100 p-4 dark:bg-slate-500">
      <ProfileImage imageURL={image} userName={name} />
      <h1 className="text-3xl font-bold">Profile</h1>

      {/* Form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-4 md:w-1/2"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    className="outline outline-1 outline-gray-300"
                    placeholder="Your name"
                    {...field}
                  />
                </FormControl>
                <FormMessage>{form.formState.errors.name?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="outline outline-1 outline-gray-300"
                    placeholder="your-email@example.com"
                    {...field}
                    disabled={isGoogleAuthAccount}
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.email?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    className="outline outline-1 outline-gray-300"
                    placeholder="A short bio"
                    {...field}
                  />
                </FormControl>
                <FormMessage>{form.formState.errors.bio?.message}</FormMessage>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Update Profile
          </Button>
        </form>
      </Form>
    </main>
  );
}
