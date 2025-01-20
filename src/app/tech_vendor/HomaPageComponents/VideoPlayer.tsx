// import React, { useState, useRef, useEffect } from 'react';
// import { Play, Pause } from 'lucide-react';

// const VideoPlayer = () => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isInitialState, setIsInitialState] = useState(true);
//   const [progress, setProgress] = useState(0);
//   const videoRef = useRef(null);

//   const handlePlayPause = () => {
//     const video = videoRef.current;
//     if (!video) return;

//     if (isPlaying) {
//       video.pause();
//     } else {
//       video.play().catch(error => {
//         console.error('Playback failed:', error);
//       });
//       setIsInitialState(false);
//     }
//     setIsPlaying(!isPlaying);
//   };

//   const handleVideoClick = () => {
//     if (isPlaying) {
//       handlePlayPause();
//     }
//   };

//   const updateProgress = () => {
//     const video = videoRef.current;
//     if (video) {
//       const progress = (video.currentTime / video.duration) * 100;
//       setProgress(progress);
//     }
//   };

//   useEffect(() => {
//     const video = videoRef.current;
//     if (video) {
//       video.addEventListener('timeupdate', updateProgress);
//     }
//     return () => {
//       if (video) {
//         video.removeEventListener('timeupdate', updateProgress);
//       }
//     };
//   }, []);

//   // Show play button only in initial state or when paused
//   const shouldShowControls = isInitialState || !isPlaying;

//   return (
//     // Container with max-width for desktop
//     <div className="w-full max-w-full md:max-w-2xl lg:max-w-3xl mx-auto">
//       <div className="aspect-video relative w-full overflow-hidden rounded-xl bg-gray-50 shadow-xl"
//            onClick={handleVideoClick}>
//         <video
//           ref={videoRef}
//           className="w-full h-full object-cover"
//           src="/videos/Dream_Legal_Wc.mp4"
//           poster="/videos/thumbnail.png"
//           playsInline
//           onPlay={() => setIsPlaying(true)}
//           onPause={() => setIsPlaying(false)}
//         >
//           Your browser does not support the video tag.
//         </video>

//         {/* Light gradient overlay when not playing */}
//         {!isPlaying && (
//           <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-gray-50/70 to-white/80 backdrop-blur-sm" />
//         )}

//         {/* Play/Pause button container - only visible in initial state or when paused */}
//         {shouldShowControls && (
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handlePlayPause();
//               }}
//               className="group/button relative transform transition-all duration-300 hover:scale-110 cursor-pointer"
//             >
//               {/* Soft glow effect */}
//               <div className="absolute inset-0 rounded-full bg-blue-400/20 blur-lg group-hover/button:bg-blue-400/30" />
              
//               {/* Button background with lighter gradient */}
//               <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 rounded-full p-6 shadow-lg shadow-blue-300/30 backdrop-blur-sm">
//                 {isPlaying ? (
//                   <Pause className="text-white w-8 h-8 md:w-10 md:h-10" strokeWidth={2} />
//                 ) : (
//                   <Play className="text-white w-8 h-8 md:w-10 md:h-10 ml-1" strokeWidth={2} />
//                 )}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Video progress bar */}
//         <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200/30">
//           <div
//             className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-300"
//             style={{ width: `${progress}%` }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VideoPlayer;
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showThumbnail, setShowThumbnail] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);
  const thumbnailRef = useRef(null);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play().catch(error => {
        console.error('Playback failed:', error);
      });
      setShowThumbnail(false);
    }
    setIsPlaying(!isPlaying);
  };

  const updateProgress = () => {
    const video = videoRef.current;
    if (video) {
      const progress = (video.currentTime / video.duration) * 100;
      setProgress(progress);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener('timeupdate', updateProgress);
      video.addEventListener('pause', () => setIsPlaying(false));
      video.addEventListener('play', () => {
        setIsPlaying(true);
        setShowThumbnail(false);
      });
    }
    return () => {
      if (video) {
        video.removeEventListener('timeupdate', updateProgress);
        video.removeEventListener('pause', () => setIsPlaying(false));
        video.removeEventListener('play', () => {
          setIsPlaying(true);
          setShowThumbnail(false);
        });
      }
    };
  }, []);

  return (
    <div className="w-full max-w-full md:max-w-2xl lg:max-w-3xl mx-auto">
      <div className="relative aspect-video rounded-xl bg-black overflow-hidden">
        {/* Thumbnail Image */}
        {showThumbnail && (
          <div 
            ref={thumbnailRef}
            className="absolute inset-0 bg-cover bg-center z-10"
            style={{
              backgroundImage: 'url(/videos/thumbnail.png)',
              backgroundPosition: 'center',
              backgroundSize: 'cover'
            }}
          />
        )}
        
        {/* Video Element */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src="/videos/Dream_Legal_Wc.mp4"
          playsInline
        >
          Your browser does not support the video tag.
        </video>

        {/* Play/Pause Button */}
        <button
          onClick={handlePlayPause}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20
                   bg-black/70 hover:bg-black/90 rounded-full p-4
                   transform transition-all duration-200 hover:scale-110"
        >
          {isPlaying ? (
            <Pause className="text-white w-6 h-6" />
          ) : (
            <Play className="text-white w-6 h-6 ml-1" />
          )}
        </button>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800">
          <div
            className="h-full bg-blue-500 transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;