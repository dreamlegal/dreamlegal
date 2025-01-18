"use client"
import React, { useState } from 'react';
import { Mail, Lock, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';

const UserLoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [alert, setAlert] = useState({ show: false, title: '', message: '' });
  const router = useRouter();
  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch("/api/user-login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     if (response.ok) {
  //       showAlert("Success","redirecting to dash");
  //       const data = await response.json();
  //       if (data.user?.id) {
  //         localStorage.setItem("userId", data.user.id);
  //         window.location.href = `/user/${data.user.id}`;
  //       }
  //     } else {
  //       showAlert('Error', 'Failed to sign in. Please try again.');
  //     }
  //   } catch (error) {
  //     showAlert('Error', 'An unexpected error occurred.');
  //   }
  // };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("/api/common-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      console.log('Login API response:', data);
  
      
      if (data?.success) {
        showAlert("Success", "Redirecting to dashboard");
        
        setTimeout(() => {
          if (data.type === "user") {
            router.push('/legal_proffesionals/dashboard');
          } else {
            router.push('/');
          }
        }, 1500);
      } else {
        showAlert('Error', data?.error || 'Failed to sign in');
      }
    } catch (error) {
      console.error('Login handler error:', error);
      showAlert('Error', 'An unexpected error occurred during login');
    }
  };
  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/reset-password-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: resetEmail }),
      });

      if (response.ok) {
        setIsResetModalOpen(false);
        showAlert('Success', 'Password reset instructions have been sent to your email.');
        setResetEmail('');
      } else if (response.status === 404) {
        showAlert('Error', 'No account exists with this email address.');
      } else {
        showAlert('Error', 'Failed to send reset email. Please try again later.');
      }
    } catch (error) {
      showAlert('Error', 'An unexpected error occurred.');
    }
  };

  const showAlert = (title, message) => {
    setAlert({ show: true, title, message });
    setTimeout(() => setAlert({ show: false, title: '', message: '' }), 5000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {alert.show && (
        <div className="fixed top-4 right-4 bg-white p-4 rounded-lg shadow-lg border z-50">
          <h4 className="font-bold">{alert.title}</h4>
          <p>{alert.message}</p>
        </div>
      )}

      <div className="rounded-3xl p-8 shadow-sm">
        <div className="space-y-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
            <p className="text-gray-500 mt-2">Please enter your details to sign in</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
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
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>

              <div className="relative">
                <Lock 
                  size={20} 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full p-3.5 pl-12 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:border-gray-300"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
                <Eye
                  size={20}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsResetModalOpen(true)}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Forgot password?
            </button>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-black text-white rounded-2xl hover:bg-gray-800 transition-colors"
            >
              Sign in
            </button>
          </form>

          <div className="text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <a href="/auth/user/signup" className="text-black hover:underline">
              Sign up
            </a>
          </div>
        </div>
      </div>

      {isResetModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Reset Password</h2>
            <p className="text-gray-600 mb-4">Enter your email address to receive a password reset link.</p>
            <form onSubmit={handleResetPassword}>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 rounded-lg border mb-4"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsResetModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                >
                  Send Reset Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserLoginPage;