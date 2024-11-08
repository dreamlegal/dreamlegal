
// "use client";
// import { signIn } from "next-auth/react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { FcGoogle } from "react-icons/fc";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { FaEye } from "react-icons/fa";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";


// import 'react-toastify/dist/ReactToastify.css';

// import { useToast } from "@/components/ui/use-toast";

// function UserSignin() {
//   const { toast } = useToast();

//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [resetEmail, setResetEmail] = useState("");
//   const [show, setShow] = useState(false);
//   const [dialogOpen, setDialogOpen] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("/api/sign-in", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log(data);

//         if (data.user && data.user.id) {
//           typeof window !== "undefined"
//             ? localStorage.setItem("userId", data.user.id)
//             : null;
//           typeof window !== "undefined" ? localStorage.getItem("userId") : null;
//         }

//         window.location.href = `/user/${data.user.id}`;
//       } else {
//         console.error("Failed to sign in:", response.statusText);
//       }
//     } catch (error) {
//       console.error("An error occurred:", error);
//     }
//   };

//   const handleEye = () => {
//     setShow(!show);
//   };

//   const handleResetChange = (e) => {
//     setResetEmail(e.target.value);
//   };

//   const handleResetSubmit = async (e) => {
//     e.preventDefault();
//     e.stopPropagation(); // Prevent event from bubbling up to parent form

//     try {
//       const response = await fetch("/api/reset-password-request", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email: resetEmail }),
//       });

//       if (response.ok) {
//         console.log("Password reset email sent");
//         toast({
//           title: "Form Submitted",
//           description: "Thank you for your submission!",
//           variant: "success",
//         });

//         setDialogOpen(false); // Close the dialog after successful submission
//         setResetEmail(""); // Clear the reset email input

//       } else if (response.status === 404) {
//         toast({
//           title: "Form Submitted",
//           description: "Thank you for your submission!",
//           variant: "success",
//         });
//       } else {
//         console.error("Failed to send password reset email:", response.statusText);
//       }
//     } catch (error) {
//       console.error("An error occurred:", error);
//     }
//   };

//   return (
//     <div className="font-clarity">
//       <form onSubmit={handleSubmit}>
//         <h1 className="text-lg font-bold">Login to Account</h1>

//         <Button
//           onClick={() => signIn("google", { callbackUrl: "/check" })}
//           className="w-full bg-white gap-4 text-black border hover:text-white my-4"
//         >
//           <FcGoogle />
//           Continue with Google
//         </Button>
//         <p className="text-center text-gray-800">or</p>
//         <hr />

//         <div>
//           <Label htmlFor="email">Email</Label>
//           <Input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Enter your email"
//           />
//         </div>

//         <div className="relative">
//           <Label htmlFor="password">Password</Label>
//           <Input
//             type={show ? "text" : "password"}
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             placeholder="Enter your Password"
//           />
//           <div
//             className="absolute right-[5%] top-[52%] cursor-pointer"
//             onClick={handleEye}
//           >
//             <FaEye className="size-5" />
//           </div>
//         </div>

//         <div className="pt-4 pl-1">
//           <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
//             <DialogTrigger asChild>
//               <a className="text-sm text-red-500 hover:pointer hover:underline">
//                 Forgot Password?
//               </a>
//             </DialogTrigger>
//             <DialogContent className="sm:max-w-[425px]">
//               <DialogHeader>
//                 <DialogTitle>Reset Password</DialogTitle>
//                 <DialogDescription>
//                   Enter your email address to receive a password reset link.
//                 </DialogDescription>
//               </DialogHeader>
//               <div className="flex flex-col gap-4 py-4">
//                 <div className="flex items-center gap-4">
//                   <Label htmlFor="resetEmail" className="text-right">
//                     Email
//                   </Label>
//                   <Input
//                     id="resetEmail"
//                     type="email"
//                     value={resetEmail}
//                     onChange={handleResetChange}
//                     className="flex-grow"
//                     placeholder="Enter your email"
//                   />
//                 </div>
//                 <DialogFooter className="flex justify-end">
//                   <Button
//                     type="button"
//                     className="bg-primary1"
//                     onClick={handleResetSubmit}
//                   >
//                     Send Reset Link
//                   </Button>
//                 </DialogFooter>
//               </div>
//             </DialogContent>
//           </Dialog>
//         </div>

//         <Button className="w-full bg-primary1 my-4" type="submit">
//           Login
//         </Button>

//         <hr />
//       </form>

//       <p className="text-center pt-3">
//         Don't have an account?{" "}
//         <a
//           className="text-primary1 hover:pointer hover:underline"
//           onClick={() => router.push("/sign-up")}
//         >
//           Create one
//         </a>
//       </p>
//     </div>
//   );
// }

// export default UserSignin;

"use client";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEye } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

function UserSignin() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [resetEmail, setResetEmail] = useState("");
  const [show, setShow] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertContent, setAlertContent] = useState({
    title: "",
    description: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        console.log(data);

        if (data.user && data.user.id) {
          typeof window !== "undefined"
            ? localStorage.setItem("userId", data.user.id)
            : null;
          typeof window !== "undefined" ? localStorage.getItem("userId") : null;
        }

        window.location.href = `/user/${data.user.id}`;
      } else {
        console.error("Failed to sign in:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleEye = () => {
    setShow(!show);
  };

  const handleResetChange = (e) => {
    setResetEmail(e.target.value);
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const response = await fetch("/api/reset-password-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: resetEmail }),
      });

      if (response.ok) {
        setAlertContent({
          title: "Check Your Email",
          description: "Password reset instructions have been sent to your email. Please check your inbox and spam folder."
        });
        setShowAlert(true);
        setDialogOpen(false);
        setResetEmail("");

        // Auto close after 5 seconds
        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
      } else if (response.status === 404) {
        setAlertContent({
          title: "Email Sent",
          description: "No account exists with this email,Enter Correct Email Address."
        });
        setShowAlert(true);
        setDialogOpen(false);
        setResetEmail("");

        // Auto close after 5 seconds
        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
      } else {
        setAlertContent({
          title: "Error",
          description: "Failed to send reset email. Please try again later."
        });
        setShowAlert(true);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setAlertContent({
        title: "Error",
        description: "An unexpected error occurred. Please try again later."
      });
      setShowAlert(true);
    }
  };

  return (
    <div className="font-clarity">
      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{alertContent.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {alertContent.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Okay</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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

        <div className="pt-4 pl-1">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <a className="text-sm text-red-500 hover:pointer hover:underline">
                Forgot Password?
              </a>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Reset Password</DialogTitle>
                <DialogDescription>
                  Enter your email address to receive a password reset link.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-4 py-4">
                <div className="flex items-center gap-4">
                  <Label htmlFor="resetEmail" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="resetEmail"
                    type="email"
                    value={resetEmail}
                    onChange={handleResetChange}
                    className="flex-grow"
                    placeholder="Enter your email"
                  />
                </div>
                <DialogFooter className="flex justify-end">
                  <Button
                    type="button"
                    className="bg-primary1"
                    onClick={handleResetSubmit}
                  >
                    Send Reset Link
                  </Button>
                </DialogFooter>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Button className="w-full bg-primary1 my-4" type="submit">
          Login
        </Button>

        <hr />
      </form>

      <p className="text-center pt-3">
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