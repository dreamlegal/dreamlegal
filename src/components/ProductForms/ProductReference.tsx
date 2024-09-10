"use client";
import React, { ChangeEvent, useState } from "react";
import { z } from "zod";
import { ProductInfo } from "@/store/useStore"; // Assuming this is your Zustand store
import { FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa6";
import { FaLink } from "react-icons/fa";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const ProductReferenceSchema = z.object({
  images: z
    .array(z.instanceof(File))
    .min(1, "At least one image is required")
    .max(5, "Maximum 5 images allowed"),
  attachments: z.array(z.instanceof(File)).max(2, "Maximum 2 attachments allowed").optional(),
  instagramUrl: z.string().url("Invalid Instagram URL").optional().nullable(),
  videoUrl: z.string().url("Invalid video URL").optional().nullable(),
  linkedinUrl: z.string().url("Invalid LinkedIn URL").optional().nullable(),
  twitterUrl: z.string().url("Invalid Twitter URL").optional().nullable(),
  youtubeUrl: z.string().url("Invalid YouTube URL").optional().nullable(),
});

const ProductReference = () => {
  // Zustand states (directly using Zustand without intermediate local state)
  const { images, setImages, attachments, setAttachments, instagramUrl, setInstagramUrl, videoUrl, setVideoUrl, linkedinUrl, setLinkedinUrl, twitterUrl, setTwitterUrl, youtubeUrl, setYoutubeUrl } = ProductInfo();
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Validate all fields using Zod
  const validateAllFields = () => {
    const result = ProductReferenceSchema.safeParse({
      images,
      attachments,
      instagramUrl: instagramUrl || undefined,
      videoUrl: videoUrl || undefined,
      linkedinUrl: linkedinUrl || undefined,
      twitterUrl: twitterUrl || undefined,
      youtubeUrl: youtubeUrl || undefined,
    });

    if (!result.success) {
      const validationErrors: Record<string, string> = {};
      result.error.errors.forEach((error) => {
        validationErrors[error.path[0]] = error.message;
      });
      setErrors(validationErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  // Handle file input changes (directly update Zustand)
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, type: string) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (type === "images") {
      setImages(files);
    } else if (type === "attachments") {
      setAttachments(files);
    }
  };

  // Handle URL changes (directly update Zustand)
  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const sanitizedValue = value.trim() === "" ? null : value.trim();
    switch (name) {
      case "instagramUrl":
        setInstagramUrl(sanitizedValue);
        break;
      case "videoUrl":
        setVideoUrl(sanitizedValue);
        break;
      case "linkedinUrl":
        setLinkedinUrl(sanitizedValue);
        break;
      case "twitterUrl":
        setTwitterUrl(sanitizedValue);
        break;
      case "youtubeUrl":
        setYoutubeUrl(sanitizedValue);
        break;
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateAllFields()) {
      return;
    }

    // Submit logic
    console.log("Form submitted with:", {
      images,
      attachments,
      instagramUrl,
      videoUrl,
      linkedinUrl,
      twitterUrl,
      youtubeUrl,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full font-calarity">
      <div className="flex w-100 flex-col">
        {/* Image upload */}
        <div className="w-full mb-4">
          <label htmlFor="images" className="block mb-2">Images (1-5)</label>
          <Input type="file" id="images" name="images" multiple accept="image/*" onChange={(e) => handleFileChange(e, "images")} />
          {errors.images && <p className="text-red-500">{errors.images}</p>}
        </div>

        {/* Attachments upload */}
        <div className="w-full mb-4">
          <label htmlFor="attachments" className="block mb-2">Attachments (0-2)</label>
          <Input type="file" id="attachments" name="attachments" multiple onChange={(e) => handleFileChange(e, "attachments")} />
          {errors.attachments && <p className="text-red-500">{errors.attachments}</p>}
        </div>

        {/* Social media URLs */}
        {/* Instagram */}
        <div className="w-full mb-4">
          <label htmlFor="instagramUrl">Instagram</label>
          <div className="flex items-center">
            <FaInstagram className="mr-2" />
            <Input type="url" id="instagramUrl" name="instagramUrl" value={instagramUrl || ""} onChange={handleUrlChange} placeholder="Instagram URL" />
          </div>
          {errors.instagramUrl && <p className="text-red-500">{errors.instagramUrl}</p>}
        </div>

        {/* More social media and video URL fields... */}
      </div>

      <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Submit</button>
    </form>
  );
};

export default ProductReference;
