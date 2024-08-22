"use client";
import React, { useState } from 'react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { TbListDetails } from 'react-icons/tb';
import { Button } from './ui/button';

function AddAdmin() {
  const [formData, setFormData] = useState({
    user: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('/api/add-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(result.msg);
        setFormData({ user: '', email: '', password: '' });
      } else {
        setError(result.msg);
      }
    } catch (error) {
      console.error('An error occurred while creating the admin.');
    }
  };

  return (
    <div className="font-clarity">
      <h2 className="text-lg font-bold flex gap-4 items-center">
        <span className="text-primary1 text-xl">
          <TbListDetails />
        </span>
        Create new Admin Account
      </h2>

      <div className="px-5 py-4 rounded-md border shadow-sm w-full md:w-2/3">
        <form onSubmit={handleSubmit} className="w-full px-4">
          <div className="mt-4">
            <Label className="text-slate-600" htmlFor="companyName">
              Name
            </Label>
            <Input
              id="user"
              name="user"
              value={formData.user}
              onChange={handleChange}
              required
            />
          </div>

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

          {error && <div className="text-red-500 mt-2">{error}</div>}
          {success && <div className="text-green-500 mt-2">{success}</div>}

          <Button type="submit" className="my-4 w-2/3 rounded-lg bg-primary1">
            Create Admin
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AddAdmin;
