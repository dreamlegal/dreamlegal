import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isInitialState, setIsInitialState] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play().catch(error => {
        console.error('Playback failed:', error);
      });
      setIsInitialState(false);
    }
    setIsPlaying(!isPlaying);
  };

  const handleVideoClick = () => {
    if (isPlaying) {
      handlePlayPause();
    }
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
    }
    return () => {
      if (video) {
        video.removeEventListener('timeupdate', updateProgress);
      }
    };
  }, []);

  // Show play button only in initial state or when paused
  const shouldShowControls = isInitialState || !isPlaying;

  return (
    // Container with max-width for desktop
    <div className="w-full max-w-full md:max-w-2xl lg:max-w-3xl mx-auto">
      <div className="aspect-video relative w-full overflow-hidden rounded-xl bg-gray-50 shadow-xl"
           onClick={handleVideoClick}>
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src="/videos/Dream_Legal_Wc.mp4"
          playsInline
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          Your browser does not support the video tag.
        </video>

        {/* Light gradient overlay when not playing */}
        {!isPlaying && (
          <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-gray-50/70 to-white/80 backdrop-blur-sm" />
        )}

        {/* Play/Pause button container - only visible in initial state or when paused */}
        {shouldShowControls && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              onClick={(e) => {
                e.stopPropagation();
                handlePlayPause();
              }}
              className="group/button relative transform transition-all duration-300 hover:scale-110 cursor-pointer"
            >
              {/* Soft glow effect */}
              <div className="absolute inset-0 rounded-full bg-blue-400/20 blur-lg group-hover/button:bg-blue-400/30" />
              
              {/* Button background with lighter gradient */}
              <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 rounded-full p-6 shadow-lg shadow-blue-300/30 backdrop-blur-sm">
                {isPlaying ? (
                  <Pause className="text-white w-8 h-8 md:w-10 md:h-10" strokeWidth={2} />
                ) : (
                  <Play className="text-white w-8 h-8 md:w-10 md:h-10 ml-1" strokeWidth={2} />
                )}
              </div>
            </div>
          </div>
        )}

        {/* Video progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200/30">
          <div
            className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;