"use client";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/app/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { useEffect, useState } from "react";
import { satoshi } from "@/app/fonts/fonts";
import AOS from "aos";
import "aos/dist/aos.css";

// Zod schema for form validation
const SigninSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

type SigninFormData = z.infer<typeof SigninSchema>;

export default function Signin() {
  const { status } = useSession();
  const router = useRouter();
  const form = useForm<SigninFormData>({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onSubmit = async (data: SigninFormData) => {
    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (res?.ok) {
        toast.success("You have been signed in successfully.");
        router.push("/dashboard");
      } else {
        toast.error(res?.error || "Failed to sign in.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during sign in.");
    }
  };

  const handleGoogleSignIn = () => {
    try {
      signIn("google", { callbackUrl: "/dashboard" });
      toast.success("You have been signed in successfully.");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during sign in.");
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard"); // Redirect to dashboard if already authenticated
    }

    // Initialize AOS
    AOS.init({ offset: 0, duration: 1000, delay: 200, once: true });
  }, [status, router]);

  return (
    <main className="flex grow flex-col items-center justify-center border-y-4 border-yellow-500 bg-gray-100 p-6 dark:bg-gray-800">
      {/* Logo */}
      <div
        className={`${satoshi.className} mb-4 text-3xl font-black`}
        data-aos="zoom-in"
      >
        GET
        <br />
        <span className="text-yellow-400">@</span> GIG
      </div>

      <hr
        className="my-4 w-[50vw] border-t border-gray-300 md:w-[20vw]"
        data-aos="fade-right"
      />

      <h1 className="mb-4 text-2xl font-bold" data-aos="fade-up">
        Sign In
      </h1>

      {/* Form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full max-w-sm flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem data-aos="flip-up">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="outline outline-1 outline-gray-300"
                    placeholder="your-email@example.com"
                    {...field}
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
            name="password"
            render={({ field }) => (
              <FormItem data-aos="flip-up">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      className="outline outline-1 outline-gray-300"
                      type={showPassword ? "text" : "password"}
                      placeholder="Your password"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                    >
                      {showPassword ? (
                        <FaEyeSlash className="dark:text-gray-300" />
                      ) : (
                        <FaEye className="dark:text-gray-300" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage>
                  {form.formState.errors.password?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" data-aos="zoom-in">
            Sign In
          </Button>
        </form>
      </Form>

      <div className="my-4 text-xl font-bold" data-aos="flip-left">
        Or
      </div>

      <div className="flex flex-col items-center" data-aos="zoom-in">
        <Button
          onClick={handleGoogleSignIn}
          className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600"
        >
          <FaGoogle /> Continue with Google
        </Button>

        <hr
          className="my-4 w-[50vw] border-t border-gray-300 md:w-[20vw]"
          data-aos="fade-left"
        />

        <p className="text-center" data-aos="fade-up">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/signup"
            className="block text-yellow-500 hover:underline md:inline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </main>
  );
}
