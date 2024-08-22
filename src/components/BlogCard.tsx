"use client";
import React from "react";
import { FaRegClock } from "react-icons/fa6";

interface BlogCardProps {
  blog: {
    title: { rendered: string };
    date: string;
    link: string;
  };
  mediaUrl: string;
  category: string; // Single category name
}

function BlogCard({ blog, mediaUrl, category = 'Uncategorized' }: BlogCardProps) {
  const title = blog.title.rendered;
  const date = new Date(blog.date).toLocaleDateString();
  const readTime = 'N/A'; // Replace with actual read time if available

  return (
    <a
      href={blog.link}
      className="relative block rounded-xl overflow-hidden shadow transition-all duration-200 group hover:cursor-pointer hover:translate-y-1 hover:shadow-md "
    >
      <div className="relative">
        <img
          src={mediaUrl}
          alt={title}
          className="w-full h-auto object-cover" // Ensures the image covers the card
        />
        <div className="absolute inset-0 bg-black opacity-20 z-10"></div>
      </div>
      <div className="pb-10 px-8 relative z-20">
        <span className="text-sm text-primary1 py-4 px-4 rounded-full bg-primary2">
          {category}
        </span>
        <div className="flex flex-col gap-3 mt-8 mb-2">
          <h3 className="text-xl font-bold group-hover:text-primary1">
            {title}
          </h3>
          <div className="inline-flex justify-between">
            <p className="text-sm text-[#46526a]">{date}</p>
            <p className="text-sm text-[#46526a] flex gap-2 items-center">
              <FaRegClock /> {readTime}
            </p>
          </div>
        </div>
      </div>
    </a>
  );
}

export default BlogCard;
