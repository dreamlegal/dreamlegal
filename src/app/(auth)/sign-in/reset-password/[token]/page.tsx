

// // "use client";
// // import { useState, useEffect } from 'react';
// // import { usePathname } from 'next/navigation';
// // import { Input } from '@/components/ui/input';
// // import { Button } from '@/components/ui/button';

// // const ResetPasswordPage = () => {
// //   const pathname = usePathname();
// //   const parts = pathname.split('/');
// //   const token = parts[parts.length - 1];  // Extract token from the URL
// //   const [tokenValid, setTokenValid] = useState<boolean | null>(null);
// //   const [newPassword, setNewPassword] = useState('');
// //   const [errorMessage, setErrorMessage] = useState('');
// //   const [successMessage, setSuccessMessage] = useState('');
// //   const [loading, setLoading] = useState(false);  // New loading state

// //   console.log(token);

// //   useEffect(() => {
// //     if (!token) {
// //       setErrorMessage("Token is missing.");
// //       setTokenValid(false);
// //       return;
// //     }

// //     // Validate token when the page loads
// //     const validateToken = async () => {
// //       setLoading(true);
// //       try {
// //         const res = await fetch(`/api/verify-pass-reset-token/${token}`);
// //         const data = await res.json();
// //         if (res.ok) {
// //           setTokenValid(true);
// //         } else {
// //           setTokenValid(false);
// //           setErrorMessage(data.message);
// //         }
// //       } catch (error) {
// //         setTokenValid(false);
// //         setErrorMessage('Something went wrong while validating the token.');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     validateToken();
// //   }, [token]);

// //   const handlePasswordReset = async () => {
// //     if (!newPassword) {
// //       setErrorMessage('Please enter a new password.');
// //       return;
// //     }

// //     setLoading(true); // Start loading while submitting the password
// //     const res = await fetch('/api/reset-password', {
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': 'application/json',
// //       },
// //       body: JSON.stringify({ token, newPassword }),
// //     });

// //     const data = await res.json();
// //     setLoading(false); // End loading after submission

// //     if (res.ok) {
// //       setSuccessMessage(data.message);
// //       setErrorMessage('');
// //     } else {
// //       setErrorMessage(data.message);
// //       setSuccessMessage('');
// //     }
// //   };

// //   return (
// //     <div className="max-w-md mx-auto p-4">
// //       <h1 className="text-3xl font-bold text-center mb-4">Reset Your Password</h1>
// //       {loading ? (
// //         <div>Loading...</div>
// //       ) : tokenValid === null ? (
// //         <div>Validating token...</div>
// //       ) : tokenValid ? (
// //         <div>
// //           <Input
// //             type="password"
// //             placeholder="Enter new password"
// //             value={newPassword}
// //             onChange={(e) => setNewPassword(e.target.value)}
// //             className="mb-4"
// //           />
// //           {errorMessage && <p className="text-red-500">{errorMessage}</p>}
// //           {successMessage && <p className="text-green-500">{successMessage}</p>}
// //           <Button onClick={handlePasswordReset} className="w-full mt-4">
// //             Reset Password
// //           </Button>
// //         </div>
// //       ) : (
// //         <div>
// //           <p className="text-red-500">{errorMessage}</p>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default ResetPasswordPage;
// "use client";
// import { useState, useEffect } from 'react';
// import { usePathname } from 'next/navigation';
// import { Loader2, Eye, EyeOff } from 'lucide-react';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
// import { Alert, AlertDescription } from '@/components/ui/alert';

// interface PasswordValidation {
//   hasMinLength: boolean;
//   hasUpperCase: boolean;
//   hasLowerCase: boolean;
//   hasNumber: boolean;
//   hasSpecialChar: boolean;
// }

// const ResetPasswordPage = () => {
//   const pathname = usePathname();
//   const parts = pathname.split('/');
//   const token = parts[parts.length - 1];

//   const [tokenValid, setTokenValid] = useState<boolean | null>(null);
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [passwordValidation, setPasswordValidation] = useState<PasswordValidation>({
//     hasMinLength: false,
//     hasUpperCase: false,
//     hasLowerCase: false,
//     hasNumber: false,
//     hasSpecialChar: false,
//   });

//   useEffect(() => {
//     if (!token) {
//       setErrorMessage("Token is missing.");
//       setTokenValid(false);
//       return;
//     }

//     const validateToken = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch(`/api/verify-pass-reset-token/${token}`);
//         const data = await res.json();
//         if (res.ok) {
//           setTokenValid(true);
//         } else {
//           setTokenValid(false);
//           setErrorMessage(data.message);
//         }
//       } catch (error) {
//         setTokenValid(false);
//         setErrorMessage('Something went wrong while validating the token.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     validateToken();
//   }, [token]);

//   useEffect(() => {
//     setPasswordValidation({
//       hasMinLength: newPassword.length >= 8,
//       hasUpperCase: /[A-Z]/.test(newPassword),
//       hasLowerCase: /[a-z]/.test(newPassword),
//       hasNumber: /\d/.test(newPassword),
//       hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
//     });
//   }, [newPassword]);

//   const handlePasswordReset = async () => {
//     // Reset messages
//     setErrorMessage('');
//     setSuccessMessage('');

//     // Validate password
//     if (!newPassword) {
//       setErrorMessage('Please enter a new password.');
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       setErrorMessage('Passwords do not match.');
//       return;
//     }

//     const isPasswordValid = Object.values(passwordValidation).every(Boolean);
//     if (!isPasswordValid) {
//       setErrorMessage('Please ensure your password meets all requirements.');
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await fetch('/api/reset-password', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ token, newPassword }),
//       });

//       const data = await res.json();
      
//       if (res.ok) {
//         setSuccessMessage(data.message);
//         setNewPassword('');
//         setConfirmPassword('');
//       } else {
//         setErrorMessage(data.message);
//       }
//     } catch (error) {
//       setErrorMessage('An error occurred while resetting your password.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading || tokenValid === null) {
//     return (
//       <div className="min-h-[400px] flex items-center justify-center p-4">
//         <Card className="w-full max-w-md">
//           <CardContent className="pt-6">
//             <div className="flex flex-col items-center gap-4">
//               <Loader2 className="h-8 w-8 animate-spin text-primary" />
//               <p className="text-muted-foreground">
//                 {tokenValid === null ? 'Validating reset token...' : 'Processing your request...'}
//               </p>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   if (!tokenValid) {
//     return (
//       <div className="min-h-[400px] flex items-center justify-center p-4">
//         <Card className="w-full max-w-md">
//           <CardContent className="pt-6">
//             <Alert variant="destructive">
//               <AlertDescription>
//                 {errorMessage || 'This password reset link is invalid or has expired. Please request a new one.'}
//               </AlertDescription>
//             </Alert>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-[400px] flex items-center justify-center p-4">
//       <Card className="w-full max-w-md">
//         <CardHeader>
//           <CardTitle className="text-2xl text-center">Reset Your Password</CardTitle>
//           <CardDescription className="text-center">
//             Please enter your new password below
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div className="space-y-4">
//             <div className="relative">
//               <Input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Enter new password"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//                 className="pr-10"
//               />
//               <Button
//                 type="button"
//                 variant="ghost"
//                 size="sm"
//                 className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//               </Button>
//             </div>

//             <Input
//               type={showPassword ? "text" : "password"}
//               placeholder="Confirm new password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//             />
//           </div>

//           <div className="space-y-2 text-sm">
//             <p className="text-muted-foreground">Password requirements:</p>
//             <ul className="space-y-1">
//               <li className={passwordValidation.hasMinLength ? "text-green-600" : "text-gray-500"}>
//                 ✓ At least 8 characters
//               </li>
//               <li className={passwordValidation.hasUpperCase ? "text-green-600" : "text-gray-500"}>
//                 ✓ At least one uppercase letter
//               </li>
//               <li className={passwordValidation.hasLowerCase ? "text-green-600" : "text-gray-500"}>
//                 ✓ At least one lowercase letter
//               </li>
//               <li className={passwordValidation.hasNumber ? "text-green-600" : "text-gray-500"}>
//                 ✓ At least one number
//               </li>
//               <li className={passwordValidation.hasSpecialChar ? "text-green-600" : "text-gray-500"}>
//                 ✓ At least one special character
//               </li>
//             </ul>
//           </div>
          
//           {errorMessage && (
//             <Alert variant="destructive">
//               <AlertDescription>{errorMessage}</AlertDescription>
//             </Alert>
//           )}
          
//           {successMessage && (
//             <Alert className="bg-green-50 text-green-700 border-green-200">
//               <AlertDescription>{successMessage}</AlertDescription>
//             </Alert>
//           )}
//         </CardContent>
//         <CardFooter>
//           <Button 
//             onClick={handlePasswordReset} 
//             className="w-full"
//             disabled={loading || !newPassword || !confirmPassword}
//           >
//             Reset Password
//           </Button>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// };

// export default ResetPasswordPage;

"use client";
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Loader2, Eye, EyeOff, Check, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { z } from 'zod';

// Zod schema for password validation
const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(
    /[^A-Za-z0-9]/,
    'Password must contain at least one special character'
  );

interface ValidationState {
  minLength: boolean;
  hasUpperCase: boolean;
  hasLowerCase: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
}

const ResetPasswordPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const parts = pathname.split('/');
  const token = parts[parts.length - 1];

  const [tokenValid, setTokenValid] = useState<boolean | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [validationState, setValidationState] = useState<ValidationState>({
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecial: false,
  });

  // Validate password in real-time
  useEffect(() => {
    setValidationState({
      minLength: newPassword.length >= 8,
      hasUpperCase: /[A-Z]/.test(newPassword),
      hasLowerCase: /[a-z]/.test(newPassword),
      hasNumber: /[0-9]/.test(newPassword),
      hasSpecial: /[^A-Za-z0-9]/.test(newPassword),
    });
  }, [newPassword]);

  useEffect(() => {
    if (!token) {
      setErrorMessage("Token is missing.");
      setTokenValid(false);
      return;
    }

    const validateToken = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/verify-pass-reset-token/${token}`);
        const data = await res.json();
        if (res.ok) {
          setTokenValid(true);
        } else {
          setTokenValid(false);
          setErrorMessage(data.message);
        }
      } catch (error) {
        setTokenValid(false);
        setErrorMessage('Something went wrong while validating the token.');
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, [token]);

  const validatePassword = () => {
    try {
      passwordSchema.parse(newPassword);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrorMessage(error.errors[0].message);
      }
      return false;
    }
  };

  const handlePasswordReset = async () => {
    setErrorMessage('');

    // Validate password
    if (!validatePassword()) {
      return;
    }

    // Validate confirmation
    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await res.json();
      
      if (res.ok) {
        setShowSuccessDialog(true);
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage('An error occurred while resetting your password.');
    } finally {
      setLoading(false);
    }
  };

  if (loading || tokenValid === null) {
    return (
      <div className="min-h-[400px] flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-muted-foreground">
                {tokenValid === null ? 'Validating reset token...' : 'Processing your request...'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!tokenValid) {
    return (
      <div className="min-h-[400px] flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            {errorMessage && (
              <AlertDialog open={!!errorMessage} onOpenChange={(open) => {
                if (!open) {
                  setErrorMessage('');
                  router.push('/sign-in');
                }
              }}>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Error</AlertDialogTitle>
                    <AlertDialogDescription className="text-red-500">
                      {errorMessage}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogAction onClick={() => {
                      setErrorMessage('');
                      router.push('/sign-in');
                    }}>
                      Close
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  const ValidationItem = ({ satisfied, text }: { satisfied: boolean; text: string }) => (
    <div className="flex items-center space-x-2">
      {satisfied ? (
        <Check className="h-4 w-4 text-green-500" />
      ) : (
        <X className="h-4 w-4 text-gray-300" />
      )}
      <span className={`text-sm ${satisfied ? 'text-green-500' : 'text-gray-500'}`}>
        {text}
      </span>
    </div>
  );

  return (
    <>
      <div className="min-h-[400px] flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Reset Your Password</CardTitle>
            <CardDescription className="text-center">
              Please enter your new password below
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>

              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">Password Requirements:</p>
              <div className="space-y-2 border rounded-lg p-3 bg-gray-50">
                <ValidationItem 
                  satisfied={validationState.minLength} 
                  text="At least 8 characters long"
                />
                <ValidationItem 
                  satisfied={validationState.hasUpperCase} 
                  text="Contains uppercase letter"
                />
                <ValidationItem 
                  satisfied={validationState.hasLowerCase} 
                  text="Contains lowercase letter"
                />
                <ValidationItem 
                  satisfied={validationState.hasNumber} 
                  text="Contains number"
                />
                <ValidationItem 
                  satisfied={validationState.hasSpecial} 
                  text="Contains special character"
                />
              </div>
            </div>
            
            {/* {errorMessage && (
              <Alert variant="destructive">
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>





            )} */}
             {errorMessage && (
              <AlertDialog open={!!errorMessage}>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Error</AlertDialogTitle>
                    <AlertDialogDescription className="text-red-500">
                      {errorMessage}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogAction onClick={() => setErrorMessage('')}>
                      Close
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handlePasswordReset} 
              className="w-full"
              disabled={loading || !newPassword || !confirmPassword || !Object.values(validationState).every(Boolean)}
            >
              Reset Password
            </Button>
          </CardFooter>
        </Card>
      </div>

      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Password Reset Successful!</AlertDialogTitle>
            <AlertDialogDescription>
              Your password has been successfully reset. You can now log in with your new password.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => {
                setShowSuccessDialog(false);
                router.push('/sign-in');
              }}
            >
              Go to Login
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ResetPasswordPage;