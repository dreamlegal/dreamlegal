"use client";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useRouter } from "next/navigation";

function UserSignup() {
  const [otpStep, setOtpStep] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [otp, setOtp] = useState("");
  const [terms, setTerms] = useState(false);

  const router = useRouter();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleOtpChange = (e: any) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(formData);
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("/api/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Account created successfully!");
        setOtpStep(true);
      } else {
        console.error("Failed to create account");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleOtpSubmit = async (e: any) => {
    e.preventDefault();
    console.log(otp);
    try {
      const response = await fetch("/api/otp-verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email, otp }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("OTP verified successfully");
        setOtpStep(true);
        typeof window !== "undefined" ? localStorage.setItem("userId", data.user.id) : null;
        typeof window !== "undefined" ? localStorage.setItem("userEmail", data.user.email) : null;
        alert("OTP verified successfully");
        router.push(`/user/${data.user.id}/complete`);
      } else {
        console.error("Failed to verify OTP");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleResendEmail = async () => {
    try {
      const response = await fetch("/api/resend-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email }),
      });

      if (response.ok) {
        alert("Verification email resent successfully!");
      } else {
        console.error("Failed to resend email");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="font-clarity">
      {otpStep ? (
        <div>
          <form onSubmit={handleOtpSubmit}>
            <h1 className="text-lg font-bold">OTP Verification</h1>
            <p>Enter the OTP sent to your email</p>
            <div>
              <Label htmlFor="otp">OTP</Label>
              <Input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                value={otp}
                onChange={handleOtpChange}
              />
            </div>
            <Button className="w-full bg-primary1 my-4" type="submit">
              Submit
            </Button>
            <span className="text-xs text-gray-400 px-3">Please check your email, and if not received check spam folder</span>
            <Button
              className="w-full bg-black text-white my-4"
              onClick={handleResendEmail}
            >
              Resend OTP
            </Button>
          </form>
        </div>
      ) : (
        <div>
          <form onSubmit={handleSubmit}>
            <h1 className="text-lg font-bold">Create Account</h1>
            <Button
              onClick={() => signIn("google", { callbackUrl: "/check" })}
              className="w-full bg-white gap-4 text-black border hover:text-white my-4"
            >
              <FcGoogle />
              Continue with Google
            </Button>
            <p className="text-gray-400 text-xs">By Continue with Google, you agree to our Terms of Service and Privacy Policy</p>
            <p className="text-center text-gray-800">or</p>
            <hr />
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </div>

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

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your Password"
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Enter your Password Again"
              />
            </div>

            <div className="flex gap-3 items-center my-3">
              <Input
                type="checkbox"
                name="terms"
                id="terms"
                className="w-2 h-5"
                onChange={() => setTerms(!terms)}
              />{" "}
              <p>I agree to the T&Cs and receive mails </p>
            </div>

            <Button
              className="w-full bg-primary1 my-4"
              disabled={!terms}
              type="submit"
            >
              Create Account
            </Button>

            <hr />
          </form>

          <p className="text-center">
            Already have an account?{" "}
            <a
              className="text-primary1 hover:pointer hover:underline"
              onClick={() => router.push("/sign-in")}
            >
              Login
            </a>
          </p>
        </div>
      )}
    </div>
  );
}

export default UserSignup;
