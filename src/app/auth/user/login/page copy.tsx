"use client";
import { Mail } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { BsLinkedin } from "react-icons/bs";
import { Button } from "@/components/ui/button";

const UserLoginPage = () => {
  const { data: session } = useSession();

  const [email, setEmail] = useState("");

  async function SignInWithEmail(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("sending ...");
    const signInResult = await signIn("email", {
      email: email,
      callbackUrl: "/onboard",
      redirect: false,
    });

    if (!signInResult?.ok) {
      return "error";
    }

    setEmail("");
    console.log("sent");

    return "success";
  }

  return (
    <div className="pt-8">
      <div className="max-w-2xl mx-auto pt-24 pb-16">
        <div className="rounded-3xl p-8 shadow-sm">
          <div className="space-y-6">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
              <p className="text-gray-500 mt-2">
                Please enter your details to sign in
              </p>
            </div>

            <form onSubmit={SignInWithEmail} className="space-y-4">
              <div className="space-y-4">
                <div className="relative">
                  <Mail
                    size={20}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3.5 pl-12 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:border-gray-300"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                size={"lg"}
                className="w-full rounded-xl"
              >
                Sign in
              </Button>
            </form>

            {session ? JSON.stringify(session) : "No session"}
            <div className="flex items-center my-4">
              <div className="flex-grow h-px bg-gray-200"></div>
              <span className="px-4 text-sm font-medium text-gray-500">OR</span>
              <div className="flex-grow h-px bg-gray-200"></div>
            </div>

            <div className="flex items-center justify-between gap-4">
              <Button
                type="submit"
                onClick={() => signIn("google", {callbackUrl: "/onboard"})}
                className="w-full rounded-xl"
              >
                <FcGoogle size={20} className="mr-2" /> Continue with Google
              </Button>
              <Button
                type="submit"
                onClick={() => signIn("linkedin", {callbackUrl: "/onboard"})}
                className="w-full rounded-xl"
              >
                <BsLinkedin size={20} className="mr-2" /> Continue with LinkedIn
              </Button>
            </div>
            <Button onClick={() => signOut()} >Signout</Button>

            <div className="text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <a
                href="/auth/user/signup"
                className="text-black hover:underline"
              >
                Sign up
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLoginPage;
