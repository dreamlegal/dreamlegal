"use client";
import React from "react";

function ChangePass() {
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : null;
  const [formData, setFormData] = React.useState({
    currentPassword: "",
    newPassword: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId, // Replace with actual user ID
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        }),
      });

      const result = await response.json();

      if (result.success) {
        alert("Password updated successfully");
      } else {
        alert(result.msg);
      }
    } catch (error) {
      console.error("Error updating password:", error);
      alert("Error updating password");
    }
  };
  return (
    <main className="">
      <div className="max-w-xl lg:max-w-3xl">
        <h1 className="mt-2 text-xl font-bold text-gray-900 sm:text-xl md:text-xl">
          Edit Password
        </h1>

        <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="CurrentPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Current Password
            </label>

            <input
              type="text"
              id="CurrentPassword"
              name="CurrentPassword"
              required
              value={formData.currentPassword}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>

            <input
              type="text"
              id="newPassword"
              required
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

          <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
            <button
              type="submit"
              className="inline-block shrink-0 rounded-md border bg-primary1 px-12 py-3 text-sm font-medium text-white transition hover:bg-blue-600 hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
            >
              Save Details
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default ChangePass;
