"use client";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEye } from "react-icons/fa";

function UserSignin() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await fetch("/api/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data); // Log the response data

        // Save the user ID in localStorage if available in the response
        if (data.user && data.user.id) {
          typeof window !== "undefined"
            ? localStorage.setItem("userId", data.user.id)
            : null;
          typeof window !== "undefined" ? localStorage.getItem("userId") : null;
        }

        // Redirect to the home page or any other desired page
        window.location.href = `/user/${data.user.id}`;
      } else {
        // Handle sign-in error
        console.error("Failed to sign in:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const [show, setShow] = useState(false);
  const handleEye = () => {
    setShow(!show);
  };

  return (
    <div className="font-clarity">
      <form onSubmit={handleSubmit}>
        <h1 className="text-lg font-bold">Login to Account</h1>

        <Button
          onClick={() => signIn("google", { callbackUrl: "/check" })}
          className="w-full bg-white gap-4 text-black border hover:text-white my-4"
        >
          <FcGoogle />
          Continue with Google
        </Button>
        <p className="text-center text-gray-800">or</p>
        <hr />

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>

        <div className="relative">
          <Label htmlFor="password">Password</Label>
          <Input
            type={show ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your Password"
          />
          <div
            className="absolute right-[5%] top-[52%] cursor-pointer"
            onClick={handleEye}
          >
            <FaEye className="size-5" />
          </div>
        </div>

        <Button className="w-full bg-primary1 my-4" type="submit">
          Login
        </Button>

        <hr />
      </form>

      <p className="text-center">
        Don't have an account?{" "}
        <a
          className="text-primary1 hover:pointer hover:underline"
          onClick={() => router.push("/sign-up")}
        >
          Create one
        </a>
      </p>
    </div>
  );
}

export default UserSignin;
