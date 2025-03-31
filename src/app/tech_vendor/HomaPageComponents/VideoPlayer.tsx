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
      <div className="relative aspect-video rounded-xl bg-[#1e2556] overflow-hidden">
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
                   bg-[#1e2556]/70 hover:bg-[#1e2556]/90 rounded-full p-4
                   transform transition-all duration-200 hover:scale-110"
        >
          {isPlaying ? (
            <Pause className="text-white w-6 h-6" />
          ) : (
            <Play className="text-white w-6 h-6 ml-1" />
          )}
        </button>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#1e2556]/80">
          <div
            className="h-full bg-[#7cc6ee] transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;