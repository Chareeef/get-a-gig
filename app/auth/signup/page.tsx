"use client";
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
import { useState } from "react";
import { satoshi } from "@/app/fonts/fonts";

// Zod schema for form validation
const RegisterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

type RegisterFormData = z.infer<typeof RegisterSchema>;

const Register = () => {
  const router = useRouter();
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        toast.success("You have been registered successfully. Redirecting...");
        router.push("/auth/signin");
      } else {
        const responseData = await res.json();
        toast.error(responseData.error);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during registration.");
    }
  };

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <main className="flex grow flex-col items-center justify-center border-y-4 border-yellow-500 bg-gray-100 p-6 dark:bg-gray-800">
      <div className={`${satoshi.className} mb-4 text-3xl font-black`}>
        GET
        <br />
        <span className="text-yellow-400">@</span> GIG
      </div>

      <hr className="my-4 w-1/4 border-t border-gray-300" />

      <h1 className="mb-4 text-2xl font-bold">Register</h1>

      {/* Form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full max-w-sm flex-col gap-4"
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
              <FormItem>
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
          <Button type="submit" className="w-full">
            Register
          </Button>
        </form>
      </Form>

      <div className="my-4 text-xl font-bold">Or</div>

      <div className="flex flex-col items-center">
        <Button
          onClick={handleGoogleSignIn}
          className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600"
        >
          <FaGoogle /> Continue with Google
        </Button>
        <hr className="my-4 w-2/3 border-t border-gray-300" />
        <p>
          Already have an account?{" "}
          <Link href="/auth/signin" className="text-yellow-500 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
