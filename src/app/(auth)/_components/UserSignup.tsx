"use client";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEye } from "react-icons/fa";

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
  const [error, setError] = useState(""); // New state for error messages
  const [msg, setMsg] = useState(""); // New state for success messages

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
    setError(""); // Reset error message
    console.log(formData);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
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
        setMsg("Account created successfully! Redirecting to OTP verification");
        setOtpStep(true);
      } else if (response.status === 409) {
        // Conflict status code for user already exists
        setError("User with this email already exists");
      } else {
        setError("Failed to create account. Please try again.");
        console.error("Failed to create account");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
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
        setMsg("OTP verified successfully");
        setOtpStep(true);
        typeof window !== "undefined"
          ? localStorage.setItem("userId", data.user.id)
          : null;
        typeof window !== "undefined"
          ? localStorage.setItem("userEmail", data.user.email)
          : null;
        alert("OTP verified successfully");
        const emailSent = await fetch("/api/senwelcome", {
          method: "POST",
          body: JSON.stringify({ email: formData.email, name: formData.name }),
        });
        // alert("Email sent successfully");
        router.push(`/user/${data.user.id}/complete`);
      } else {
        setError("Failed to verify OTP");
        console.error("Failed to verify OTP");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
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
        setError("Failed to resend email. Please try again.");
        console.error("Failed to resend email");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("An error occurred:", error);
    }
  };

  const [show, setShow] = useState(false);
  const handleEye = () => {
    setShow(!show);
  };

  return (
    <div className="font-clarity">
      {otpStep ? (
        <div>
          <form onSubmit={handleOtpSubmit}>
            <h1 className="text-lg font-bold">OTP Verification</h1>
            <p>Enter the OTP sent to your email</p>
            <div>
              <Input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                value={otp}
                onChange={handleOtpChange}
              />
            </div>
            {/* {error && <p className="text-red-500">{error}</p>}{" "} */}
            {/* Display error */}
            <Button className="w-full bg-primary1 my-4" type="submit">
              Submit
            </Button>
            <span className="text-xs text-gray-400 px-3">
              Please check your email, and if not received check spam folder
            </span>
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
            <p className="text-gray-400 text-xs">
              By Continue with Google, you agree to our Terms of Service and
              Privacy Policy
            </p>
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
            <div className="relative">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                type={show ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Enter your Password Again"
              />
              <div
                className="absolute right-[5%] top-[52%] cursor-pointer"
                onClick={handleEye}
              >
                <FaEye className="size-5" />
              </div>
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
            {error && <p className="text-red-500">{error}</p>}{" "}
            {msg && <p className="text-green-500">{msg}</p>}
            {/* Display error */}
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
