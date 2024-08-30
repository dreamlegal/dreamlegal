"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import React, { useState } from "react";

function EditUser({ data, onCloseEdit }: any) {
  const path = useParams();
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const organizationTypes = [
    "Law firms",
    "Enterprises",
    "Individual Practitioners",
    "Startups",
    "Government Departments",
    "Judiciary",
   "In-House Counsels"
  ];
  const userId = path?.userid;
  const router = useRouter();
  const [formData, setFormData] = useState({
    Contact: data.profile?.Contact || "",
    Location: data.profile?.Location || "",
    Address: data.profile?.Address || "",
    TeamSize: data.profile?.TeamSize || "",
    Designation: data.profile?.Designation || "",
    CompanyType: data.profile?.CompanyType || "",
    CompanyAddress: data.profile?.CompanyAddress || "",
    CompanyEmail: data.profile?.CompanyEmail || "",
    ProfileImage: null,
    MarketingAccept: false,
    editing: true,
  });
  const handleChange = (e: any) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const uploadFile = async (file: File, folderName: string) => {
    // Create the form data
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folderName", folderName);

    try {
      // Send the POST request
      const response = await fetch("/api/upload-file", {
        method: "POST",
        body: formData,
      });

      // Handle the response
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          const url = data.location;
          console.log("Uploaded file location:", url);
          return url;
        } else {
          console.error("Upload failed:", data.error);
        }
      } else {
        console.error("Failed to upload file:", response.statusText);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
    return null;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Handle form submission, e.g., send data to an API
    try {
      if (formData.ProfileImage) {
        const response = await uploadFile(formData.ProfileImage, "profile");
        setLogoPreview(response);
      }
      const response = await fetch("/api/edit-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, userId, logoPreview }),
      });

      const result = await response.json();

      if (result.success) {
        console.log("Profile created successfully:", result.profile);
        onCloseEdit();
        window.location.reload();
      } else {
        console.error("Error creating profile:", result.msg);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    console.log("Form submitted:", formData);
  };
  const teamSize = [
    "1-10",
    "11-50",
    "51-100",
    "101-250",
    "251-500",
    "501-1000",
    "1001-5000",
    "5001-10000",
    "10001-50000",
    "50001-100000",
  ];
  return (
    <main className="">
      <div className="max-w-xl lg:max-w-3xl">
        <div className="flex justify-between">
          <h1 className="mt-2 text-xl font-bold text-gray-900 sm:text-xl md:text-xl">
            Edit Profile
          </h1>
          <Button
            variant={"secondary"}
            className="cursor-pointer"
            onClick={onCloseEdit}
          >
            Back
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-6 gap-6">
          <div className="col-span-6 ">
            <label
              htmlFor="Location"
              className="block text-sm font-medium text-gray-700"
            >
              Profile Image <span className="text-slate-400">optional</span>
            </label>

            <Input
              type="file"
              id="ProfileImage"
              name="ProfileImage"
              accept="image/*"
              onChange={handleChange}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="CompanyAddress"
              className="block text-sm font-medium text-gray-700"
            >
              {" "}
              Company Name{" "}
            </label>

            <input
              type="text"
              id="CompanyAddress"
              name="CompanyAddress"
              required
              value={formData.CompanyAddress}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="Location"
              className="block text-sm font-medium text-gray-700"
            >
              Country
            </label>

            <input
              type="text"
              id="Location"
              required
              name="Location"
              value={formData.Location}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="Designation"
              className="block text-sm font-medium text-gray-700"
            >
              {" "}
              Designation{" "}
            </label>

            <input
              type="text"
              id="Designation"
              required
              name="Designation"
              value={formData.Designation}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="CompanyType"
              className="block text-sm font-medium text-gray-700"
            >
              Company Type
            </label>

            <select
              name="CompanyType"
              value={formData.CompanyType}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded text-gray-600"
            >
              <option value="" className="text-gray-400">
                Select Organization Type
              </option>
              {organizationTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="CompanyAddress"
              className="block text-sm font-medium text-gray-700"
            >
              {" "}
              Team size{" "}
            </label>

            <select
              name="TeamSize"
              value={formData.TeamSize}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded text-gray-600"
            >
              <option value="" className="text-gray-400">
                Select Team Size
              </option>
              {teamSize.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
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

export default EditUser;
