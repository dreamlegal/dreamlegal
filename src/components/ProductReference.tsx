// import React from "react";

// import { FaLink, FaLinkedin, FaTwitter } from "react-icons/fa6";
// import Link from "next/link";
// import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
// import VideoEmbed from "./YoutubeVideo";

// type Platform = "youtube" | "vimeo";

// function ProductReference({ product }: any) {
//   const videoInfo = product.videoUrl ? getVideoId(product.videoUrl) : null;
//   console.log("video ", product.videoUrl);

//   return (
//     <div>
//       {videoInfo ? (
//         <div className="w-[200px] h-[200px]  md:w-[400px] md:h-[400px]">
//         <VideoEmbed embedId={videoInfo.id} platform={videoInfo.platform} />
//         {/* <video  className="w-[200px] h-[200px]  md:w-[400px] md:h-[400px]" src={product.videoUrl}></video> */}
//       </div>
        
//       ) : (
//         <div>No reference video provided</div>
//       )}
//       <div className="grid grid-cols-1 md:grid-cols-2">
//         <div className="flex gap-3 flex-wrap my-4">
//           {product.attachments?.map((url: string, index: number) => (
//             <div
//               key={index}
//               className="flex gap-2 items-center bg-primary1 px-3 py-3 rounded-2xl text-white"
//             >
//               <FaLink />
//               <a href={url} target="_blank" rel="noopener noreferrer">
//                 {`Attachment ${index + 1}`}
//               </a>
//             </div>
//           ))}
//         </div>
//         <div className="flex gap-3 flex-wrap my-4 md:justify-end">
//           <a href={product.instagramUrl}>
//             <div className="flex gap-2 items-center text-primary1 p-5 rounded-full bg-primary2">
//               <FaInstagram className="text-lg" />
//             </div>
//           </a>
//           <a href={product.twitterUrl}>
//             <div className="flex gap-2 items-center text-primary1 p-5 rounded-full bg-primary2">
//               <FaTwitter className="text-lg" />
//             </div>
//           </a>
//           <a href={product.youtubeUrl}>
//             <div className="flex gap-2 items-center text-primary1 p-5 rounded-full bg-primary2">
//               <FaYoutube className="text-lg" />
//             </div>
//           </a>
//           <a href={product.linkedinUrl}>
//             <div className="flex gap-2 items-center text-primary1 p-5 rounded-full bg-primary2">
//               <FaLinkedin className="text-lg" />
//             </div>
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductReference;

// function getVideoId(url: string): { platform: Platform; id: string } | null {
//   const youtubeRegex =
//     /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
//   const vimeoRegex =
//     /(?:https?:\/\/)?(?:www\.)?vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:\w+\/)?|album\/(?:\d+\/)?video\/|)(\d+)(?:$|\/|\?)/;

//   const youtubeMatch = url.match(youtubeRegex);
//   if (youtubeMatch && youtubeMatch[1]) {
//     return { platform: "youtube", id: youtubeMatch[1] };
//   }

//   const vimeoMatch = url.match(vimeoRegex);
//   if (vimeoMatch && vimeoMatch[1]) {
//     return { platform: "vimeo", id: vimeoMatch[1] };
//   }

//   return null;
// }


import React from "react";
import { FaLink, FaLinkedin, FaTwitter, FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import VideoEmbed from "./YoutubeVideo";

type Platform = "youtube" | "vimeo";

interface Product {
  videoUrl?: string;
  attachments?: string[];
  instagramUrl?: string;
  twitterUrl?: string;
  youtubeUrl?: string;
  linkedinUrl?: string;
}

function ProductReference({ product }: { product: Product }) {
  const videoInfo = product.videoUrl ? getVideoId(product.videoUrl) : null;
  
  console.log("Video URL:", product.videoUrl);
  console.log("Parsed video info:", videoInfo);

  return (
    <div>
      {videoInfo ? (
        <div className="w-[200px] h-[200px] md:w-[400px] md:h-[400px] rounded-[20px]">
          <VideoEmbed embedId={videoInfo.id} platform={videoInfo.platform} />
        </div>
      ) : product.videoUrl ? (
        <div>Unable to parse video URL: {product.videoUrl}</div>
      ) : (
        <div>No reference video provided</div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="flex gap-3 flex-wrap my-4">
          {product.attachments?.map((url: string, index: number) => (
            <div
              key={index}
              className="flex gap-2 items-center bg-primary1 px-3 py-3 rounded-2xl text-white"
            >
              <FaLink />
              <a href={url} target="_blank" rel="noopener noreferrer">
                {`Attachment ${index + 1}`}
              </a>
            </div>
          ))}
        </div>
        <div className="flex gap-3 flex-wrap my-4 md:justify-end">
          {product.instagramUrl && (
            <a href={product.instagramUrl}>
              <div className="flex gap-2 items-center text-primary1 p-5 rounded-full bg-primary2">
                <FaInstagram className="text-lg" />
              </div>
            </a>
          )}
          {product.twitterUrl && (
            <a href={product.twitterUrl}>
              <div className="flex gap-2 items-center text-primary1 p-5 rounded-full bg-primary2">
                <FaTwitter className="text-lg" />
              </div>
            </a>
          )}
          {product.youtubeUrl && (
            <a href={product.youtubeUrl}>
              <div className="flex gap-2 items-center text-primary1 p-5 rounded-full bg-primary2">
                <FaYoutube className="text-lg" />
              </div>
            </a>
          )}
          {product.linkedinUrl && (
            <a href={product.linkedinUrl}>
              <div className="flex gap-2 items-center text-primary1 p-5 rounded-full bg-primary2">
                <FaLinkedin className="text-lg" />
              </div>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function getVideoId(url: string): { platform: Platform; id: string } | null {
  const youtubeRegex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const vimeoRegex =
    /(?:https?:\/\/)?(?:www\.)?vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:\w+\/)?|album\/(?:\d+\/)?video\/|)(\d+)(?:$|\/|\?)/;

  const youtubeMatch = url.match(youtubeRegex);
  if (youtubeMatch && youtubeMatch[1]) {
    return { platform: "youtube", id: youtubeMatch[1] };
  }

  const vimeoMatch = url.match(vimeoRegex);
  if (vimeoMatch && vimeoMatch[1]) {
    return { platform: "vimeo", id: vimeoMatch[1] };
  }

  console.warn("Unable to parse video URL:", url);
  return null;
}

export default ProductReference;