"use client";
import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useRouter } from "next/navigation";

function VendorSignup() {
  const router = useRouter();
  const [otpStep, setOtpStep] = useState(false);
  const [formData, setFormData] = useState({
    name: "company",
    email: "",
    password: "",
    confirmPassword: "",
    type: "vendor",
  });
  const [otp, setOtp] = useState("");
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [pending, setPending] = useState(false);

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
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setPending(true);
      setMsg("Creating your account... Please wait."); // Set a loading message
      const response = await fetch("/api/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMsg(
          "Account created successfully. Please check your email for a verification cocde."
        );
        setOtpStep(true);
      } else if (response.status === 409) {
        setError("User with this email already exists");
      } else {
        setError("Failed to create account");
      }
    } catch (error) {
      setError("An error occurred during account creation");
    } finally {
      setPending(false);
    }
  };

  const handleOtpSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setPending(true);
      setMsg("Verifying OTP... Please wait."); // Set a loading message
      const response = await fetch("/api/otp-verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email, otp }),
      });
      if (response.ok) {
        setMsg("OTP verified successfully! Redirecting to your profile...");
        const data = await response.json();
        if (data.user && data.user.id) {
          if (typeof window !== "undefined") {
            localStorage.setItem("vendorId", data.user.id);
          }
        }
        router.push("/vendor?verified=true");
      } else {
        setError("Failed to verify OTP");
      }
    } catch (error) {
      setError("An error occurred during OTP verification");
    }
    // finally {
    //   setPending(false);
    // }
  };

  const handleResendEmail = async () => {
    try {
      setPending(true);
      setMsg("Resending verification email... Please wait."); // Set a loading message
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
        setError("Failed to resend email");
      }
    } catch (error) {
      setError("An error occurred while resending the email");
    } finally {
      setPending(false);
    }
  };

  return (
    <>
      {pending ? (
        <div>{msg || "Loading..."}</div> // Display the loading message or a default one
      ) : (
        <>
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
                  {error && <p className="text-red-500">{error}</p>}
                  {msg && <p className="text-green-500">{msg}</p>}
                  <Button className="w-full bg-primary1 my-4" type="submit">
                    Submit
                  </Button>
                  <Button
                    className="w-full bg-black text-white my-4"
                    onClick={handleResendEmail}
                  >
                    Resend Email
                  </Button>
                  <span className="text-sm text-gray-400">
                    Please check your spam folder if you did not receive the
                    email
                  </span>
                </form>
              </div>
            ) : (
              <div>
                <form onSubmit={handleSubmit}>
                  <h1 className="text-lg font-bold">Create Account</h1>
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
                    <p>I agree to the T&Cs and receive mails</p>
                  </div>
                  {error && <p className="text-red-500">{error}</p>}
                  {msg && <p className="text-green-500">{msg}</p>}
                  <Button
                    className="w-full bg-primary1 my-4"
                    type="submit"
                    disabled={!terms}
                  >
                    Create Account
                  </Button>
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
        </>
      )}
    </>
  );
}

export default VendorSignup;
