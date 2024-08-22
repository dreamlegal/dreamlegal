"use client";
import React, { useState } from "react";
import { TbListDetails } from "react-icons/tb";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

function NewVendor() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        companyName: "",
    });

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const response = await fetch("/api/create-vendor-admin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (result.success) {
                setSuccess("Vendor created successfully");
                setFormData({ email: "", password: "", companyName: "" });
            } else {
                setError(result.msg);
            }
        } catch (error) {
            setError("An error occurred while creating the vendor.");
        }
    };

    return (
        <div>
            <div className="font-clarity">
                <h2 className="text-lg font-bold flex gap-4 items-center">
                    <span className="text-primary1 text-xl">
                        <TbListDetails />
                    </span>
                    Create new Vendor
                </h2>

                <div className="px-5 py-4 rounded-md border shadow-sm w-full md:w-2/3">
                    <form onSubmit={handleSubmit} className="w-full px-4">
                        <div>
                            <Label className="text-slate-600" htmlFor="email">
                                Email
                            </Label>
                            <Input
                                id="email"
                                name="email"
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
                                value={formData.password}
                                onChange={handleChange}
                                required
                                type="password"
                            />
                        </div>

                        <div className="mt-4">
                            <Label className="text-slate-600" htmlFor="companyName">
                                Company Name
                            </Label>
                            <Input
                                id="companyName"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {error && <div className="text-red-500 mt-2">{error}</div>}
                        {success && <div className="text-green-500 mt-2">{success}</div>}

                        <Button
                            type="submit"
                            className="my-4 w-2/3 rounded-lg bg-primary1"
                        >
                            Create Vendor
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default NewVendor;
