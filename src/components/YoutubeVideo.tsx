"use client";
import React from "react";

interface VideoEmbedProps {
  embedId: string;
  platform: "youtube" | "vimeo";
}

function VideoEmbed({ embedId, platform }: VideoEmbedProps) {
  const src =
    platform === "youtube"
      ? `https://www.youtube.com/embed/${embedId}`
      : `https://player.vimeo.com/video/${embedId}`;

  return (
    <div className="video-responsive">
      <iframe
        width="853"
        height="480"
        src={src}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded video"
      />
    </div>
  );
}

export default VideoEmbed;
