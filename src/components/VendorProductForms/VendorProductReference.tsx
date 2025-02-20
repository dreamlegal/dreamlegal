




import React, { ChangeEvent, useState, useEffect, useRef } from "react";
import { z } from "zod";
import { ProductInfo } from "@/store/useStore";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import 'react-toastify/dist/ReactToastify.css';

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

const ProductReference = () => {
  const { images, setImages, attachments, setAttachments, instagramUrl, setInstagramUrl, videoUrl, setVideoUrl, linkedinUrl, setLinkedinUrl, twitterUrl, setTwitterUrl, youtubeUrl, setYoutubeUrl ,setAttachmentsUrl,setImagesUrl,imagesUrl,attachmentsUrl} = ProductInfo();
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const [attachmentInfos, setAttachmentInfos] = useState<AttachmentInfo[]>([]);
  

  const { toast } = useToast();


  // Use refs to reset input field programmatically
  const imageInputRef = useRef<HTMLInputElement>(null);
  const attachmentInputRef = useRef<HTMLInputElement>(null);

  // const validateAllFields = () => {
  //   const result = ProductReferenceSchema.safeParse({
  //     images,
  //     attachments,
  //     instagramUrl: instagramUrl || undefined,
  //     videoUrl: videoUrl || undefined,
  //     linkedinUrl: linkedinUrl || undefined,
  //     twitterUrl: twitterUrl || undefined,
  //     youtubeUrl: youtubeUrl || undefined,
  //   });

  //   if (!result.success) {
  //     const validationErrors: Record<string, string> = {};
  //     result.error.errors.forEach((error) => {
  //       validationErrors[error.path[0]] = error.message;
  //     });
  //     setErrors(validationErrors);
  //     return false;
  //   }

  //   setErrors({});
  //   return true;
  // };

const handleFileChange = (e: ChangeEvent<HTMLInputElement>, type: string) => {
  const files = e.target.files ? Array.from(e.target.files) : [];
  let limit = type === "images" ? 5 : 2;

  if (files.length > limit) {
    setErrors((prev) => ({
      ...prev,
      [type]: `You can only upload up to ${limit} ${type}.`,
    }));
    if (type === "images" ? imageInputRef.current : attachmentInputRef.current) {
      (type === "images" ? imageInputRef : attachmentInputRef).current!.value = "";
    }
  } else {
    setErrors((prev) => ({ ...prev, [type]: "" }));
    if (type === "images") {
      setImages(files.slice(0, limit));
    } else {
      setAttachments(files.slice(0, limit));
      updateAttachmentInfos(files);
      setAttachmentsUrl([]); // Clear any existing attachment URLs
    }
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


  const clearAttachments = () => {
    setAttachments([]);
    setAttachmentInfos([]);
    setAttachmentsUrl([]);
    if (attachmentInputRef.current) {
      attachmentInputRef.current.value = "";
    }
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
    // if (!validateAllFields()) {
    //   toast({
    //     title: "Validation Failed",
    //     description: "Please check the form for errors",
    //     variant: "error",
    //   });
    //   return;
      
    // }
    toast({
      title: "saving...",
      description: "Saving Image Upload May Take Some Time  ",
      variant: "saving",
    });
    const uploadedImages = await handleImageUpload();
    const uploadedAttachments = await handleAttachmentUpload();
  
    // if (uploadedImages.length === 0) {
    //   console.error("No images were successfully uploaded");
    //   setErrors(prev => ({ ...prev, images: "Failed to upload images" }));
      
    //   return;
      
    // }
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
  };




  useEffect(() => {
    console.log('Fetching images...');

    if (imagesUrl.length > 0) {
     
      setImagePreviews(imagesUrl);

      console.log('Images loaded:', imagesUrl);

      // setLoading(false); // Set loading to false once images are set
    } else {
      console.log('No images available.');
      // setLoading(false);
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
    <form onSubmit={handleSubmit} className="w-full font-calarity max-w-4xl mx-auto mt-4 p-6 bg-white rounded-lg shadow-md">
      <div className="flex w-100 flex-col">
      {/* <span className="text-red-500  text-xs">Image Field Necassary</span> */}
        {/* Image upload */}
        <div className="w-full mb-4 mt-4">
          <label htmlFor="images" className="block mb-2 font-bold">Images <span className="text-yellow-500 italic text-xs">(1-5 images required)</span></label>
          <Input 
            type="file" 
            id="images" 
            name="images" 
            multiple 
            accept="image/*" 
            onChange={(e) => handleFileChange(e, "images")}
            ref={imageInputRef} // Reference for resetting
            
          />
          {errors.images && <p className="text-red-500">{errors.images}</p>}
          <Button 
            onClick={(e) => {
              e.preventDefault();
              clearImages();
            }} 
            className="mt-2 bg-red-500 text-white"
          >
            Reset Images
          </Button>
        </div>

        {/* Image previews */}
        {imagePreviews.length > 0 && (
          <div className="w-full mb-4">
            <label className="block mb-2 font-bold">Image Previews</label>
            <div className="flex flex-wrap gap-2">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative w-32 h-32">
                  <img src={preview} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                  {/* <Button 
                    onClick={() => {
                      const newImages = images.filter((_, i) => i !== index);
                      setImages(newImages);
                    }} 
                    className="absolute top-0 right-0 bg-red-500 text-white text-xs"
                  >
                    Remove
                  </Button> */}
                </div>
              ))}
            </div>
          </div>
        )}
        <div>


        {/* <div>
      {loading ? (
        <p>Loading images...</p> // Show this while loading
      ) : imagePreviews.length > 0 ? (
        <div>
          {imagePreviews.map((url, index) => (
            <img key={index} src={url} alt={`Preview ${index}`} style={{ width: '200px', height: 'auto', margin: '10px' }} />
          ))}
        </div>
      ) : (
        <p>No images available.</p> // Message when there are no images
      )}
    </div> */}
    </div>

        {/* Video URL */}
        <div className="w-full mb-4">
          <label htmlFor="videoUrl">Video</label>
          <div className="flex items-center">
            <Input type="url" id="videoUrl" name="videoUrl" value={videoUrl || ""} onChange={handleUrlChange} placeholder="Enter Video Url Only Youtube/Vimeo" />
          </div>
          {errors.videoUrl && <p className="text-red-500">{errors.videoUrl}</p>}
        </div>

        {/* Attachments upload */}
        <div className="w-full mb-4">
        <label htmlFor="attachments" className="block mb-2 font-bold">Attachments <span className="text-yellow-500 italic text-xs">(up to 2)</span></label>
        <Input 
          type="file" 
          id="attachments" 
          name="attachments" 
          multiple 
          onChange={(e) => handleFileChange(e, "attachments")} 
          ref={attachmentInputRef}
        />
        {errors.attachments && <p className="text-red-500">{errors.attachments}</p>}
        <Button 
          onClick={(e) => {
            e.preventDefault();
            clearAttachments();
          }} 
          className="mt-2 bg-red-500 text-white"
        >
          Reset Attachments
        </Button>
      </div>

      {/* Attachment previews */}
      {attachmentInfos.length > 0 && (
        <div className="w-full mb-4">
          <label className="block mb-2 font-bold">Attachment Previews</label>
          <div className="flex flex-col gap-2">
            {attachmentInfos.map((info, index) => (
              <div key={index} className="p-4 border rounded-lg flex justify-between items-center">
                <div>
                  <p className="font-bold">{info.name}</p>
                  <p className="text-sm text-gray-600">
                    {info.size ? `${(info.size / 1024).toFixed(2)} KB` : 'Size unknown'} | {info.type}
                  </p>
                </div>
                {/* <Button 
                  onClick={() => {
                    const newAttachments = attachments?.filter((_, i) => i !== index) || [];
                    const newAttachmentUrls = attachmentsUrl?.filter((_, i) => i !== index) || [];
                    setAttachments(newAttachments);
                    setAttachmentsUrl(newAttachmentUrls);
                    updateAttachmentInfos(newAttachments);
                  }} 
                  className="bg-red-500 text-white text-xs"
                >
                  Remove
                </Button> */}
              </div>
            ))}
          </div>
        </div>
      )}
        {/* Social media URLs */}
       
         {/* Social media URLs */}
         {/* Instagram */}
         <div className="w-full mb-4">
           <label htmlFor="instagramUrl">Instagram</label>
           <div className="flex items-center">
             <Input type="text" id="instagramUrl" name="instagramUrl" value={instagramUrl || ""} onChange={handleUrlChange} placeholder="Instagram URL" />
           </div>
           {errors.instagramUrl && <p className="text-red-500">{errors.instagramUrl}</p>}
         </div>
      
       <div className="w-full mb-4">
           <label htmlFor="linkedinUrl">Linkedin</label>
           <div className="flex items-center">
             <Input type="text" id="linkedinUrl" name="linkedinUrl" value={linkedinUrl || ""} onChange={handleUrlChange} placeholder="LinkedIn URL" />           </div>
           {errors.linkedinUrl && <p className="text-red-500">{errors.linkedinUrl}</p>}
         </div>
        
         {/* Twitter */}
         <div className="w-full mb-4">
           <label htmlFor="twitterUrl">Twitter</label>
           <div className="flex items-center">
             <Input type="text" id="twitterUrl" name="twitterUrl" value={twitterUrl || ""} onChange={handleUrlChange} placeholder="Twitter URL" />
           </div>
           {errors.twitterUrl && <p className="text-red-500">{errors.twitterUrl}</p>}
         </div>

        {/* YouTube */}
         <div className="w-full mb-4">
           <label htmlFor="youtubeUrl">YouTube</label>
           <div className="flex items-center">
            <Input type="text" id="youtubeUrl" name="youtubeUrl" value={youtubeUrl || ""} onChange={handleUrlChange} placeholder="YouTube Channel URL" />
           </div>
           {errors.youtubeUrl && <p className="text-red-500">{errors.youtubeUrl}</p>}
         </div>

        <Button type="submit" className="mt-4 bg-blue-500 text-white font-semibold ">Save References</Button>
      </div>
    </form>
  );
};

export default ProductReference;

// ... (keep the existing schema and interfaces)



  // ... (keep existing functions like validateAllFields, handleUrlChange, etc.)




