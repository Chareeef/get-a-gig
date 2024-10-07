"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleCredentialsSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email: userInfo.email,
      password: userInfo.password,
      redirect: false,
    });

    if (res?.ok) {
      router.push("/dashboard");
    } else {
      alert(res?.error || "Failed to sign in");
    }
  };

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleCredentialsSignIn}>
        <input
          type="email"
          placeholder="Email"
          value={userInfo.email}
          onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={userInfo.password}
          onChange={(e) =>
            setUserInfo({ ...userInfo, password: e.target.value })
          }
          required
        />
        <button type="submit">Sign In with Credentials</button>
      </form>
      <button onClick={handleGoogleSignIn}>Sign In with Google</button>
    </div>
  );
};

export default SignIn;
