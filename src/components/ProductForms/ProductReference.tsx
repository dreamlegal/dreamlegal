"use client";
import React, { ChangeEvent, useState } from "react";
import { z } from "zod";
import { ProductInfo } from "@/store/useStore"; // Assuming this is your Zustand store
import { FaInstagram, FaLinkedin, FaTwitter, FaVideo, FaYoutube } from "react-icons/fa6";
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
    <form onSubmit={handleSubmit} className="w-full font-calarity max-w-4xl mx-auto mt-4 ">
      <div className="flex w-100 flex-col">
        {/* Image upload */}
        <div className="w-full mb-4 mt-4">
          <label htmlFor="images" className="block mb-2 font-bold">Images  <span className="text-yellow-500 italic text-xs">(up to 5)</span></label>
          <Input type="file" id="images" name="images" multiple accept="image/*" onChange={(e) => handleFileChange(e, "images")} />
          {errors.images && <p className="text-red-500">{errors.images}</p>}
        </div>




        <div className="w-full mb-4">
          <label htmlFor="videoUrl">Video</label>
          <div className="flex items-center">
            {/* <FaVideo className="mr-2" /> */}
            <Input type="url" id="videoUrl" name="videoUrl" value={videoUrl || ""} onChange={handleUrlChange} placeholder="Enter Video Url Only Youtube/Vimeo" />
          </div>
          {errors.videoUrl && <p className="text-red-500">{errors.videoUrl}</p>}
        </div>

        {/* Attachments upload */}
        <div className="w-full mb-4">
          <label htmlFor="attachments" className="block mb-2 font-bold">Attachments <span className="text-yellow-500 italic text-xs">(up to 2)</span></label>
          <Input type="file" id="attachments" name="attachments" multiple onChange={(e) => handleFileChange(e, "attachments")} />
          {errors.attachments && <p className="text-red-500">{errors.attachments}</p>}
        </div>
       


        {/* Social media URLs */}
        {/* Instagram */}
        <div className="w-full mb-4">
          <label htmlFor="instagramUrl">Instagram</label>
          <div className="flex items-center">
            {/* <FaInstagram className="mr-2" /> */}
            <Input type="url" id="instagramUrl" name="instagramUrl" value={instagramUrl || ""} onChange={handleUrlChange} placeholder="Instagram URL" />
          </div>
          {errors.instagramUrl && <p className="text-red-500">{errors.instagramUrl}</p>}
        </div>
        
        <div className="w-full mb-4">
          <label htmlFor="linkedinUrl">Linkedin</label>
          <div className="flex items-center">
            {/* <FaLinkedin className="mr-2" /> */}
            <Input type="url" id="linkedinUrl" name="linkedinUrl" value={linkedinUrl || ""} onChange={handleUrlChange} placeholder="linkedin URL" />
          </div>
          {errors.linkedinUrl && <p className="text-red-500">{errors.linkedinUrl}</p>}
        </div>
        <div className="w-full mb-4">
          <label htmlFor="twitterUrl">Twitter</label>
          <div className="flex items-center">
            {/* <FaTwitter className="mr-2" /> */}
            <Input type="url" id="twitterUrl" name="twitterUrl" value={twitterUrl || ""} onChange={handleUrlChange} placeholder="twitter URL" />
          </div>
          {errors.twitterUrl && <p className="text-red-500">{errors.twitterUrl}</p>}
        </div>
        <div className="w-full mb-4">
          <label htmlFor="youtubeUrl">Youtube </label>
          <div className="flex items-center">
            {/* <FaYoutube className="mr-2" /> */}
            <Input type="url" id="youtubeUrl" name="youtubeUrl" value={youtubeUrl || ""} onChange={handleUrlChange} placeholder="Youtube Channel Url" />
          </div>
          {errors.youtubeUrl && <p className="text-red-500">{errors.youtubeUrl}</p>}
        </div>

        {/* More social media and video URL fields... */}
      </div>

      <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Submit</button>
    </form>
  );
};

export default ProductReference;











// "use client";
// import React, { ChangeEvent, useState, useEffect } from "react";
// import { z } from "zod";
// import { ProductInfo } from "@/store/useStore"; // Assuming this is your Zustand store
// import { Input } from "../ui/input";
// import { Button } from "../ui/button";

// const ProductReferenceSchema = z.object({
//   images: z
//     .array(z.instanceof(File))
//     .min(1, "At least one image is required")
//     .max(5, "Maximum 5 images allowed"),
//   attachments: z.array(z.instanceof(File)).max(2, "Maximum 2 attachments allowed").optional(),
//   instagramUrl: z.string().url("Invalid Instagram URL").optional().nullable(),
//   videoUrl: z.string().url("Invalid video URL").optional().nullable(),
//   linkedinUrl: z.string().url("Invalid LinkedIn URL").optional().nullable(),
//   twitterUrl: z.string().url("Invalid Twitter URL").optional().nullable(),
//   youtubeUrl: z.string().url("Invalid YouTube URL").optional().nullable(),
// });

// const ProductReference = () => {
//   // Zustand states (directly using Zustand without intermediate local state)
//   const { images, setImages, attachments, setAttachments, instagramUrl, setInstagramUrl, videoUrl, setVideoUrl, linkedinUrl, setLinkedinUrl, twitterUrl, setTwitterUrl, youtubeUrl, setYoutubeUrl } = ProductInfo();
  
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [imagePreviews, setImagePreviews] = useState<string[]>([]);

//   // Validate all fields using Zod
//   const validateAllFields = () => {
//     const result = ProductReferenceSchema.safeParse({
//       images,
//       attachments,
//       instagramUrl: instagramUrl || undefined,
//       videoUrl: videoUrl || undefined,
//       linkedinUrl: linkedinUrl || undefined,
//       twitterUrl: twitterUrl || undefined,
//       youtubeUrl: youtubeUrl || undefined,
//     });

//     if (!result.success) {
//       const validationErrors: Record<string, string> = {};
//       result.error.errors.forEach((error) => {
//         validationErrors[error.path[0]] = error.message;
//       });
//       setErrors(validationErrors);
//       return false;
//     }

//     setErrors({});
//     return true;
//   };

//   // Handle file input changes (directly update Zustand)
//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>, type: string) => {
//     const files = e.target.files ? Array.from(e.target.files) : [];
//     if (type === "images") {
//       setImages(files);
//     } else if (type === "attachments") {
//       setAttachments(files);
//     }
//   };

//   // Handle URL changes (directly update Zustand)
//   const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     const sanitizedValue = value.trim() === "" ? null : value.trim();
//     switch (name) {
//       case "instagramUrl":
//         setInstagramUrl(sanitizedValue);
//         break;
//       case "videoUrl":
//         setVideoUrl(sanitizedValue);
//         break;
//       case "linkedinUrl":
//         setLinkedinUrl(sanitizedValue);
//         break;
//       case "twitterUrl":
//         setTwitterUrl(sanitizedValue);
//         break;
//       case "youtubeUrl":
//         setYoutubeUrl(sanitizedValue);
//         break;
//     }
//   };

//   // Clear all images (ensure at least one image is retained if images are present)
//   const clearImages = () => {
//     if (images.length > 1) {
//       setImages([]);
//     }
//   };

//   // Clear all attachments
//   const clearAttachments = () => {
//     setAttachments([]);
//   };

//   // Handle form submission
//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!validateAllFields()) {
//       return;
//     }

//     // Submit logic
//     console.log("Form submitted with:", {
//       images,
//       attachments,
//       instagramUrl,
//       videoUrl,
//       linkedinUrl,
//       twitterUrl,
//       youtubeUrl,
//     });
//   };

//   // Update image previews when images change
//   useEffect(() => {
//     const newPreviews = images.map(file => URL.createObjectURL(file));
//     setImagePreviews(newPreviews);

//     // Cleanup function to revoke object URLs when component unmounts
//     return () => {
//       newPreviews.forEach(url => URL.revokeObjectURL(url));
//     };
//   }, [images]);

//   return (
//     <form onSubmit={handleSubmit} className="w-full font-calarity max-w-4xl mx-auto mt-4 ">
//       <div className="flex w-100 flex-col">
//         {/* Image upload */}
//         <div className="w-full mb-4 mt-4">
//           <label htmlFor="images" className="block mb-2 font-bold">Images  <span className="text-yellow-500 italic text-xs">(up to 5)</span></label>
//           <Input type="file" id="images" name="images" multiple accept="image/*" onChange={(e) => handleFileChange(e, "images")} />
//           {errors.images && <p className="text-red-500">{errors.images}</p>}
//           <Button 
//             onClick={(e) => {
//               e.preventDefault(); // Prevent the default button action
//               clearImages(); // Call clearImages function
//             }} 
//             className="mt-2 bg-red-500 text-white"
//             disabled={images.length <= 1}  // Disable button if only one image is present
//           >
//             Clear All Images
//           </Button>
//         </div>

//         {/* Image previews */}
//         {imagePreviews.length > 0 && (
//           <div className="w-full mb-4">
//             <label className="block mb-2 font-bold">Image Previews</label>
//             <div className="flex flex-wrap gap-2">
//               {imagePreviews.map((preview, index) => (
//                 <div key={index} className="relative w-32 h-32">
//                   <img src={preview} alt={`Preview ${index}`} className="w-full h-full object-cover" />
//                   <Button 
//                     onClick={() => {
//                       // Remove specific image preview
//                       const newImages = images.filter((_, i) => i !== index);
//                       setImages(newImages);
//                     }} 
//                     className="absolute top-0 right-0 bg-red-500 text-white text-xs"
//                   >
//                     Remove
//                   </Button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Video URL */}
//         <div className="w-full mb-4">
//           <label htmlFor="videoUrl">Video</label>
//           <div className="flex items-center">
//             <Input type="url" id="videoUrl" name="videoUrl" value={videoUrl || ""} onChange={handleUrlChange} placeholder="Enter Video Url Only Youtube/Vimeo" />
//           </div>
//           {errors.videoUrl && <p className="text-red-500">{errors.videoUrl}</p>}
//         </div>

//         {/* Attachments upload */}
//         <div className="w-full mb-4">
//           <label htmlFor="attachments" className="block mb-2 font-bold">Attachments <span className="text-yellow-500 italic text-xs">(up to 2)</span></label>
//           <Input type="file" id="attachments" name="attachments" multiple onChange={(e) => handleFileChange(e, "attachments")} />
//           {errors.attachments && <p className="text-red-500">{errors.attachments}</p>}
//           <Button 
//             onClick={(e) => {
//               e.preventDefault(); // Prevent the default button action
//               clearAttachments(); // Call clearAttachments function
//             }} 
//             className="mt-2 bg-red-500 text-white"
//           >
//             Clear All Attachments
//           </Button>
//         </div>

//         {/* Social media URLs */}
//         {/* Instagram */}
//         <div className="w-full mb-4">
//           <label htmlFor="instagramUrl">Instagram</label>
//           <div className="flex items-center">
//             <Input type="url" id="instagramUrl" name="instagramUrl" value={instagramUrl || ""} onChange={handleUrlChange} placeholder="Instagram URL" />
//           </div>
//           {errors.instagramUrl && <p className="text-red-500">{errors.instagramUrl}</p>}
//         </div>
        
//         {/* LinkedIn */}
//         <div className="w-full mb-4">
//           <label htmlFor="linkedinUrl">Linkedin</label>
//           <div className="flex items-center">
//             <Input type="url" id="linkedinUrl" name="linkedinUrl" value={linkedinUrl || ""} onChange={handleUrlChange} placeholder="LinkedIn URL" />
//           </div>
//           {errors.linkedinUrl && <p className="text-red-500">{errors.linkedinUrl}</p>}
//         </div>
        
//         {/* Twitter */}
//         <div className="w-full mb-4">
//           <label htmlFor="twitterUrl">Twitter</label>
//           <div className="flex items-center">
//             <Input type="url" id="twitterUrl" name="twitterUrl" value={twitterUrl || ""} onChange={handleUrlChange} placeholder="Twitter URL" />
//           </div>
//           {errors.twitterUrl && <p className="text-red-500">{errors.twitterUrl}</p>}
//         </div>

//         {/* YouTube */}
//         <div className="w-full mb-4">
//           <label htmlFor="youtubeUrl">YouTube</label>
//           <div className="flex items-center">
//             <Input type="url" id="youtubeUrl" name="youtubeUrl" value={youtubeUrl || ""} onChange={handleUrlChange} placeholder="YouTube Channel URL" />
//           </div>
//           {errors.youtubeUrl && <p className="text-red-500">{errors.youtubeUrl}</p>}
//         </div>

//         <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Submit</button>
//       </div>
//     </form>
//   );
// };

// export default ProductReference;

