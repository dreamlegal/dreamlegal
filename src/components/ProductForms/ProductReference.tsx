




// import React, { ChangeEvent, useState, useEffect, useRef } from "react";
// import { z } from "zod";
// import { ProductInfo } from "@/store/useStore";
// import { Input } from "../ui/input";
// import { Button } from "../ui/button";
// import { useToast } from "../ui/use-toast";
// import 'react-toastify/dist/ReactToastify.css';
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
//   const { images, setImages, attachments, setAttachments, instagramUrl, setInstagramUrl, videoUrl, setVideoUrl, linkedinUrl, setLinkedinUrl, twitterUrl, setTwitterUrl, youtubeUrl, setYoutubeUrl ,setAttachmentsUrl,setImagesUrl,imagesUrl,attachmentsUrl} = ProductInfo();
  
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [imagePreviews, setImagePreviews] = useState<string[]>([]);

//   const [attachmentInfos, setAttachmentInfos] = useState<AttachmentInfo[]>([]);
  

//   const { toast } = useToast();


//   // Use refs to reset input field programmatically
//   const imageInputRef = useRef<HTMLInputElement>(null);
//   const attachmentInputRef = useRef<HTMLInputElement>(null);

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



// const handleFileChange = (e: ChangeEvent<HTMLInputElement>, type: string) => {
//   const files = e.target.files ? Array.from(e.target.files) : [];
//   let limit = type === "images" ? 5 : 2;

//   if (files.length > limit) {
//     setErrors((prev) => ({
//       ...prev,
//       [type]: `You can only upload up to ${limit} ${type}.`,
//     }));
//     if (type === "images" ? imageInputRef.current : attachmentInputRef.current) {
//       (type === "images" ? imageInputRef : attachmentInputRef).current!.value = "";
//     }
//   } else {
//     setErrors((prev) => ({ ...prev, [type]: "" }));
//     if (type === "images") {
//       setImages(files.slice(0, limit));
//     } else {
//       setAttachments(files.slice(0, limit));
//       updateAttachmentInfos(files);
//       setAttachmentsUrl([]); // Clear any existing attachment URLs
//     }
//   }
// };


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

//   // Clears images and resets file input field
//   const clearImages = () => {
//     setImagesUrl([]);
//     setImages([]);
//     setImagePreviews([]);
//     if (imageInputRef.current) {
//       imageInputRef.current.value = ""; // Reset file input field

//     }

//     setAttachments([]);
//     setAttachmentInfos([]);
//     setAttachmentsUrl([]);
//     if (attachmentInputRef.current) {
//       attachmentInputRef.current.value = "";
//     }
//   };




//   const uploadFile = async (file: File, folderName: string) => {
//     // Create the form data
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("folderName", folderName);

//     try {
//       // Send the POST request
//       const response = await fetch("/api/upload-file", {
//         method: "POST",
//         body: formData,
//       });

//       // Handle the response
//       if (response.ok) {
//         const data = await response.json();
//         if (data.success) {
//           const url = data.location;
//           console.log("Uploaded file location:", url);
//           toast({
//             title: "Images Saved ... ",
//             description: "if attachment are there wait for them to upload otherwise move ahead",
//             variant: "success",
//           });
//           return url;
//         } else {
//           console.error("Upload failed:", data.error);
//         }
//       } else {
//         console.error("Failed to upload file:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error uploading file:", error);
//     }
//     return null;
//   };
//   const uploadFileAttachment = async (file: File, folderName: string) => {
//     // Create the form data
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("folderName", folderName);

//     try {
//       // Send the POST request
//       const response = await fetch("/api/upload-file", {
//         method: "POST",
//         body: formData,
//       });

//       // Handle the response
//       if (response.ok) {
//         const data = await response.json();
//         if (data.success) {
//           const url = data.location;
//           console.log("Uploaded file location:", url);
//           toast({
//             title: "Saved",
//             description: "Reference Details Saved ",
//             variant: "success",
//           });
//           return url;
//         } else {
//           console.error("Upload failed:", data.error);
//         }
//       } else {
//         console.error("Failed to upload file:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error uploading file:", error);
//     }
//     return null;
//   };
  
//   const handleImageUpload = async () => {
//     let updatedImages: string[] = [];
//     if (images.length > 0) {
//       updatedImages = await Promise.all(
//         images.map((image) => uploadFile(image, "images"))
//       );
//       console.log(`Uploaded images: ${updatedImages}`);
//     }
//     return updatedImages.filter(url => url !== null);
//   }
  
 
//   const updateAttachmentInfos = (files: File[]) => {
//     const infos = files.map(file => ({
//       name: file.name,
//       size: file.size,
//       type: file.type
//     }));
//     setAttachmentInfos(infos);
//   };


//   const clearAttachments = () => {
//     setAttachments([]);
//     setAttachmentInfos([]);
//     setAttachmentsUrl([]);
//     if (attachmentInputRef.current) {
//       attachmentInputRef.current.value = "";
//     }
//   };

//   const handleAttachmentUpload = async () => {
//     let updatedAttachments: string[] = [];
//     if (attachments && attachments.length > 0) {
//       updatedAttachments = await Promise.all(
//         attachments.map((attachment) => uploadFileAttachment(attachment, "attachments"))
//       );
//       console.log(`Uploaded attachments: ${updatedAttachments}`);
//     }
//     return updatedAttachments.filter(url => url !== null);
//   }
  
 

  

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!validateAllFields()) {
//       toast({
//         title: "Validation Failed",
//         description: "Please check the form for errors",
//         variant: "error",
//       });
//       return;
      
//     }
//     toast({
//       title: "saving...",
//       description: "Saving Image Upload May Take Some Time  ",
//       variant: "saving",
//     });
//     const uploadedImages = await handleImageUpload();
//     const uploadedAttachments = await handleAttachmentUpload();
  
//     if (uploadedImages.length === 0) {
//       console.error("No images were successfully uploaded");
//       setErrors(prev => ({ ...prev, images: "Failed to upload images" }));
      
//       return;
      
//     }
//     setImagesUrl(uploadedImages);
//     setAttachmentsUrl(uploadedAttachments);

//     console.log("Form submitted with:", {
//       Images: uploadedImages,
//       Attachments: uploadedAttachments,
//       image: imagesUrl,
//       attachment: attachmentsUrl,
//       instagramUrl,
//       videoUrl,
//       linkedinUrl,
//       twitterUrl,
//       youtubeUrl,
//     });
//   };




//   useEffect(() => {
//     console.log('Fetching images...');

//     if (imagesUrl.length > 0) {
     
//       setImagePreviews(imagesUrl);

//       console.log('Images loaded:', imagesUrl);

//       // setLoading(false); // Set loading to false once images are set
//     } else {
//       console.log('No images available.');
//       // setLoading(false);
//     }
//   }, [imagesUrl]);


//   useEffect(() => {
//     if (attachments && attachments.length > 0) {
//       updateAttachmentInfos(attachments);
//     } else if (attachmentsUrl && attachmentsUrl.length > 0) {
//       const infos = attachmentsUrl.map(url => ({
//         name: url.split('/').pop() || 'Unknown',
//         size: 0, // Size is unknown for URL attachments
//         type: 'Unknown',
//         url: url
//       }));
//       setAttachmentInfos(infos);
//     } else {
//       setAttachmentInfos([]);
//     }
//   }, [attachments, attachmentsUrl]);

 
//   return (
   
//     <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto p-4 bg-white rounded-lg">
//   {/* Media Files Row - Images and Attachments */}
//   <div className="flex flex-col md:flex-row gap-4 mb-4">
//     {/* Images upload */}
//     <div className="w-full md:w-1/2">
//       <label htmlFor="images" className="block text-sm font-medium mb-1">
//         Images <span className="text-yellow-500 italic text-xs">(1-5 required)</span>
//       </label>
//       <div className="flex items-center gap-2">
//         <Input 
//           type="file" 
//           id="images" 
//           name="images" 
//           multiple 
//           accept="image/*" 
//           onChange={(e) => handleFileChange(e, "images")}
//           ref={imageInputRef}
//           required
//           className="text-xs"
//         />
//         <Button 
//           onClick={(e) => {
//             e.preventDefault();
//             clearImages();
//           }} 
//           className="bg-red-500 text-white text-xs h-8 px-2"
//         >
//           Reset
//         </Button>
//       </div>
//       {errors.images && <p className="text-red-500 text-xs mt-1">{errors.images}</p>}
      
//       {/* Image previews */}
//       {imagePreviews.length > 0 && (
//         <div className="mt-2">
//           <div className="flex flex-wrap gap-1">
//             {imagePreviews.map((preview, index) => (
//               <div key={index} className="w-12 h-12">
//                 <img src={preview} alt={`Preview ${index}`} className="w-full h-full object-cover rounded" />
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>

//     {/* Attachments upload */}
//     <div className="w-full md:w-1/2">
//       <label htmlFor="attachments" className="block text-sm font-medium mb-1">
//         Attachments <span className="text-yellow-500 italic text-xs">(up to 2)</span>
//       </label>
//       <div className="flex items-center gap-2">
//         <Input 
//           type="file" 
//           id="attachments" 
//           name="attachments" 
//           multiple 
//           onChange={(e) => handleFileChange(e, "attachments")} 
//           ref={attachmentInputRef}
//           className="text-xs"
//         />
//         <Button 
//           onClick={(e) => {
//             e.preventDefault();
//             clearAttachments();
//           }} 
//           className="bg-red-500 text-white text-xs h-8 px-2"
//         >
//           Reset
//         </Button>
//       </div>
//       {errors.attachments && <p className="text-red-500 text-xs mt-1">{errors.attachments}</p>}
      
//       {/* Attachment info */}
//       {attachmentInfos.length > 0 && (
//         <div className="mt-2">
//           <div className="flex flex-col gap-1">
//             {attachmentInfos.map((info, index) => (
//               <div key={index} className="p-1 border rounded text-xs flex items-center">
//                 <span className="font-medium truncate">{info.name}</span>
//                 <span className="text-gray-500 ml-1">
//                   ({info.size ? `${(info.size / 1024).toFixed(1)}KB` : 'Size unknown'})
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   </div>

//   {/* Video URL Row */}
//   <div className="mb-4">
//     <label htmlFor="videoUrl" className="block text-sm font-medium mb-1">Video URL</label>
//     <Input 
//       type="url" 
//       id="videoUrl" 
//       name="videoUrl" 
//       value={videoUrl || ""} 
//       onChange={handleUrlChange} 
//       placeholder="Enter YouTube/Vimeo URL only" 
//       className="text-xs"
//     />
//     {errors.videoUrl && <p className="text-red-500 text-xs mt-1">{errors.videoUrl}</p>}
//   </div>

//   {/* Social Media Links - First Row */}
//   <div className="flex flex-col md:flex-row gap-4 mb-4">
//     {/* Instagram */}
//     <div className="w-full md:w-1/2">
//       <label htmlFor="instagramUrl" className="block text-sm font-medium mb-1">Instagram</label>
//       <Input 
//         type="url" 
//         id="instagramUrl" 
//         name="instagramUrl" 
//         value={instagramUrl || ""} 
//         onChange={handleUrlChange} 
//         placeholder="Instagram URL" 
//         className="text-xs"
//       />
//       {errors.instagramUrl && <p className="text-red-500 text-xs mt-1">{errors.instagramUrl}</p>}
//     </div>

//     {/* LinkedIn */}
//     <div className="w-full md:w-1/2">
//       <label htmlFor="linkedinUrl" className="block text-sm font-medium mb-1">LinkedIn</label>
//       <Input 
//         type="url" 
//         id="linkedinUrl" 
//         name="linkedinUrl" 
//         value={linkedinUrl || ""} 
//         onChange={handleUrlChange} 
//         placeholder="LinkedIn URL" 
//         className="text-xs"
//       />
//       {errors.linkedinUrl && <p className="text-red-500 text-xs mt-1">{errors.linkedinUrl}</p>}
//     </div>
//   </div>

//   {/* Social Media Links - Second Row */}
//   <div className="flex flex-col md:flex-row gap-4 mb-4">
//     {/* Twitter */}
//     <div className="w-full md:w-1/2">
//       <label htmlFor="twitterUrl" className="block text-sm font-medium mb-1">Twitter</label>
//       <Input 
//         type="url" 
//         id="twitterUrl" 
//         name="twitterUrl" 
//         value={twitterUrl || ""} 
//         onChange={handleUrlChange} 
//         placeholder="Twitter URL" 
//         className="text-xs"
//       />
//       {errors.twitterUrl && <p className="text-red-500 text-xs mt-1">{errors.twitterUrl}</p>}
//     </div>

//     {/* YouTube */}
//     <div className="w-full md:w-1/2">
//       <label htmlFor="youtubeUrl" className="block text-sm font-medium mb-1">YouTube</label>
//       <Input 
//         type="url" 
//         id="youtubeUrl" 
//         name="youtubeUrl" 
//         value={youtubeUrl || ""} 
//         onChange={handleUrlChange} 
//         placeholder="YouTube Channel URL" 
//         className="text-xs"
//       />
//       {errors.youtubeUrl && <p className="text-red-500 text-xs mt-1">{errors.youtubeUrl}</p>}
//     </div>
//   </div>

//   {/* Submit Button */}
//   <div className="flex justify-end">
//     <Button type="submit" className="bg-blue-500 text-white">Save References</Button>
//   </div>
// </form>
//   );
// };

// export default ProductReference;

import React, { ChangeEvent, useState, useEffect, useRef } from "react";
import { z } from "zod";
import { ProductInfo } from "@/store/useStore";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import 'react-toastify/dist/ReactToastify.css';

// Modified schema with all validations removed - fields are all optional
const ProductReferenceSchema = z.object({
  images: z.array(z.any()).optional(),
  attachments: z.array(z.any()).optional(),
  instagramUrl: z.string().optional().nullable(),
  videoUrl: z.string().optional().nullable(),
  linkedinUrl: z.string().optional().nullable(),
  twitterUrl: z.string().optional().nullable(),
  youtubeUrl: z.string().optional().nullable(),
});

// Type for attachment info
interface AttachmentInfo {
  name: string;
  size: number;
  type: string;
  url?: string;
}

const ProductReference = () => {
  const { 
    images, setImages, 
    attachments, setAttachments, 
    instagramUrl, setInstagramUrl, 
    videoUrl, setVideoUrl, 
    linkedinUrl, setLinkedinUrl, 
    twitterUrl, setTwitterUrl, 
    youtubeUrl, setYoutubeUrl,
    setAttachmentsUrl, setImagesUrl,
    imagesUrl, attachmentsUrl
  } = ProductInfo();
  
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [attachmentInfos, setAttachmentInfos] = useState<AttachmentInfo[]>([]);
  const { toast } = useToast();

  // Use refs to reset input field programmatically
  const imageInputRef = useRef<HTMLInputElement>(null);
  const attachmentInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, type: string) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    let limit = type === "images" ? 5 : 2;

    if (type === "images") {
      setImages(files.slice(0, limit));
    } else {
      setAttachments(files.slice(0, limit));
      updateAttachmentInfos(files);
      setAttachmentsUrl([]); // Clear any existing attachment URLs
    }
  };

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

  // Clears images and resets file input field
  const clearImages = () => {
    setImagesUrl([]);
    setImages([]);
    setImagePreviews([]);
    if (imageInputRef.current) {
      imageInputRef.current.value = ""; // Reset file input field
    }
  };

  const clearAttachments = () => {
    setAttachments([]);
    setAttachmentInfos([]);
    setAttachmentsUrl([]);
    if (attachmentInputRef.current) {
      attachmentInputRef.current.value = "";
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
          toast({
            title: "Images Saved ... ",
            description: "if attachment are there wait for them to upload otherwise move ahead",
            variant: "success",
          });
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
  
  const uploadFileAttachment = async (file: File, folderName: string) => {
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
          toast({
            title: "Saved",
            description: "Reference Details Saved ",
            variant: "success",
          });
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
  
  const handleImageUpload = async () => {
    let updatedImages: string[] = [];
    if (images.length > 0) {
      updatedImages = await Promise.all(
        images.map((image) => uploadFile(image, "images"))
      );
      console.log(`Uploaded images: ${updatedImages}`);
    }
    return updatedImages.filter(url => url !== null);
  }
  
  const updateAttachmentInfos = (files: File[]) => {
    const infos = files.map(file => ({
      name: file.name,
      size: file.size,
      type: file.type
    }));
    setAttachmentInfos(infos);
  };

  const handleAttachmentUpload = async () => {
    let updatedAttachments: string[] = [];
    if (attachments && attachments.length > 0) {
      updatedAttachments = await Promise.all(
        attachments.map((attachment) => uploadFileAttachment(attachment, "attachments"))
      );
      console.log(`Uploaded attachments: ${updatedAttachments}`);
    }
    return updatedAttachments.filter(url => url !== null);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Always proceed without validation
    toast({
      title: "saving...",
      description: "Saving Image Upload May Take Some Time",
      variant: "saving",
    });
    
    const uploadedImages = await handleImageUpload();
    const uploadedAttachments = await handleAttachmentUpload();
  
    setImagesUrl(uploadedImages);
    setAttachmentsUrl(uploadedAttachments);

    console.log("Form submitted with:", {
      Images: uploadedImages,
      Attachments: uploadedAttachments,
      image: imagesUrl,
      attachment: attachmentsUrl,
      instagramUrl,
      videoUrl,
      linkedinUrl,
      twitterUrl,
      youtubeUrl,
    });
    
    toast({
      title: "Saved",
      description: "Reference Details Saved",
      variant: "success",
    });
  };

  useEffect(() => {
    console.log('Fetching images...');

    if (imagesUrl.length > 0) {
      setImagePreviews(imagesUrl);
      console.log('Images loaded:', imagesUrl);
    } else {
      console.log('No images available.');
    }
  }, [imagesUrl]);

  useEffect(() => {
    if (attachments && attachments.length > 0) {
      updateAttachmentInfos(attachments);
    } else if (attachmentsUrl && attachmentsUrl.length > 0) {
      const infos = attachmentsUrl.map(url => ({
        name: url.split('/').pop() || 'Unknown',
        size: 0, // Size is unknown for URL attachments
        type: 'Unknown',
        url: url
      }));
      setAttachmentInfos(infos);
    } else {
      setAttachmentInfos([]);
    }
  }, [attachments, attachmentsUrl]);

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto p-4 bg-white rounded-lg">
      {/* Media Files Row - Images and Attachments */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        {/* Images upload */}
        <div className="w-full md:w-1/2">
          <label htmlFor="images" className="block text-sm font-medium mb-1">
            Images
          </label>
          <div className="flex items-center gap-2">
            <Input 
              type="file" 
              id="images" 
              name="images" 
              multiple 
              accept="image/*" 
              onChange={(e) => handleFileChange(e, "images")}
              ref={imageInputRef}
              className="text-xs"
            />
            <Button 
              onClick={(e) => {
                e.preventDefault();
                clearImages();
              }} 
              className="bg-red-500 text-white text-xs h-8 px-2"
            >
              Reset
            </Button>
          </div>
          
          {/* Image previews */}
          {imagePreviews.length > 0 && (
            <div className="mt-2">
              <div className="flex flex-wrap gap-1">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="w-12 h-12">
                    <img src={preview} alt={`Preview ${index}`} className="w-full h-full object-cover rounded" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Attachments upload */}
        <div className="w-full md:w-1/2">
          <label htmlFor="attachments" className="block text-sm font-medium mb-1">
            Attachments
          </label>
          <div className="flex items-center gap-2">
            <Input 
              type="file" 
              id="attachments" 
              name="attachments" 
              multiple 
              onChange={(e) => handleFileChange(e, "attachments")} 
              ref={attachmentInputRef}
              className="text-xs"
            />
            <Button 
              onClick={(e) => {
                e.preventDefault();
                clearAttachments();
              }} 
              className="bg-red-500 text-white text-xs h-8 px-2"
            >
              Reset
            </Button>
          </div>
          
          {/* Attachment info */}
          {attachmentInfos.length > 0 && (
            <div className="mt-2">
              <div className="flex flex-col gap-1">
                {attachmentInfos.map((info, index) => (
                  <div key={index} className="p-1 border rounded text-xs flex items-center">
                    <span className="font-medium truncate">{info.name}</span>
                    <span className="text-gray-500 ml-1">
                      ({info.size ? `${(info.size / 1024).toFixed(1)}KB` : 'Size unknown'})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Video URL Row */}
      <div className="mb-4">
        <label htmlFor="videoUrl" className="block text-sm font-medium mb-1">Video URL</label>
        <Input 
          type="url" 
          id="videoUrl" 
          name="videoUrl" 
          value={videoUrl || ""} 
          onChange={handleUrlChange} 
          placeholder="Enter YouTube/Vimeo URL only" 
          className="text-xs"
        />
      </div>

      {/* Social Media Links - First Row */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        {/* Instagram */}
        <div className="w-full md:w-1/2">
          <label htmlFor="instagramUrl" className="block text-sm font-medium mb-1">Instagram</label>
          <Input 
            type="url" 
            id="instagramUrl" 
            name="instagramUrl" 
            value={instagramUrl || ""} 
            onChange={handleUrlChange} 
            placeholder="Instagram URL" 
            className="text-xs"
          />
        </div>

        {/* LinkedIn */}
        <div className="w-full md:w-1/2">
          <label htmlFor="linkedinUrl" className="block text-sm font-medium mb-1">LinkedIn</label>
          <Input 
            type="url" 
            id="linkedinUrl" 
            name="linkedinUrl" 
            value={linkedinUrl || ""} 
            onChange={handleUrlChange} 
            placeholder="LinkedIn URL" 
            className="text-xs"
          />
        </div>
      </div>

      {/* Social Media Links - Second Row */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        {/* Twitter */}
        <div className="w-full md:w-1/2">
          <label htmlFor="twitterUrl" className="block text-sm font-medium mb-1">Twitter</label>
          <Input 
            type="url" 
            id="twitterUrl" 
            name="twitterUrl" 
            value={twitterUrl || ""} 
            onChange={handleUrlChange} 
            placeholder="Twitter URL" 
            className="text-xs"
          />
        </div>

        {/* YouTube */}
        <div className="w-full md:w-1/2">
          <label htmlFor="youtubeUrl" className="block text-sm font-medium mb-1">YouTube</label>
          <Input 
            type="url" 
            id="youtubeUrl" 
            name="youtubeUrl" 
            value={youtubeUrl || ""} 
            onChange={handleUrlChange} 
            placeholder="YouTube Channel URL" 
            className="text-xs"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button type="submit" className="bg-blue-500 text-white">Save References</Button>
      </div>
    </form>
  );
};

export default ProductReference;