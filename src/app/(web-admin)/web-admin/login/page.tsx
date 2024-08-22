"use client";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch('/api/admin-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (result.success) {
                // Store adminId in localStorage
                localStorage.setItem('adminId', result.adminId);
                // Redirect to admin dashboard or handle successful login
                console.log('Login successful, adminId stored in localStorage');

                router.push('/web-admin/');
                // Example: window.location.href = '/admin-dashboard';
            } else {
                setError(result.msg);
            }
        } catch (error) {
            console.error('An error occurred during login.');
            setError('An error occurred during login.');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="font-clarity w-full max-w-sm p-6 bg-white rounded-md shadow-md">
                <h2 className="text-lg font-bold text-center mb-6">Admin Login</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label className="text-slate-600" htmlFor="email">
                            Email
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <Label className="text-slate-600" htmlFor="password">
                            Password
                        </Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {error && <div className="text-red-500 mt-2">{error}</div>}

                    <Button
                        type="submit"
                        className="w-full rounded-lg bg-primary1 py-2 text-white"
                    >
                        Login
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
