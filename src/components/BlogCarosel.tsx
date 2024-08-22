"use client";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import BlogCard from "./BlogCard";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";

interface BlogPost {
  id: number;
  title: { rendered: string };
  date: string;
  link: string; // Blog post URL
  featured_media: number; // Media ID
  categories: number[]; // Array of category IDs
}

interface Category {
  id: number;
  name: string;
}

interface MediaItem {
  id: number;
  source_url: string; // The URL of the media
  title: { rendered: string };
}

function BlogCarosel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [media, setMedia] = useState<Record<number, string>>({});
  const [categories, setCategories] = useState<Record<number, string>>({});

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await fetch("https://blog.dreamlegal.in/wp-json/wp/v2/posts");
        const blogData: BlogPost[] = await response.json();
        setBlogs(blogData);

        // Fetch media for each blog post
        const mediaPromises = blogData.map(async (blog) => {
          if (blog.featured_media) {
            const mediaResponse = await fetch(`https://blog.dreamlegal.in/wp-json/wp/v2/media/${blog.featured_media}`);
            const mediaData: MediaItem = await mediaResponse.json();
            return { id: blog.featured_media, url: mediaData.source_url };
          }
          return { id: null, url: '' };
        });

        // Wait for all media requests to complete
        const mediaArray = await Promise.all(mediaPromises);
        const mediaMap = mediaArray.reduce((acc, { id, url }) => {
          if (id) acc[id] = url;
          return acc;
        }, {} as Record<number, string>);
        setMedia(mediaMap);

        // Fetch categories
        const categoryIds = Array.from(new Set(blogData.flatMap(blog => blog.categories)));
        const categoryPromises = categoryIds.map(id => 
          fetch(`https://blog.dreamlegal.in/wp-json/wp/v2/tags/${id}`)
        );
        
        const categoryResponses = await Promise.all(categoryPromises);
        const categoryData = await Promise.all(categoryResponses.map(res => res.json()));

        const categoryMap = categoryData.reduce((acc, category: Category) => {
          acc[category.id] = category.name;
          return acc;
        }, {} as Record<number, string>);
        
        setCategories(categoryMap);

      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    }

    fetchBlogs();
  }, []);

  return (
    <div className="embla relative">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {blogs.map((blog) => {
            const firstCategoryId = blog.categories[0];
            const firstCategory = firstCategoryId ? categories[firstCategoryId] : 'Unknown';
            return (
              <div key={blog.id} className="embla__slide">
                <BlogCard
                  blog={blog}
                  mediaUrl={media[blog.featured_media] || 'https://via.placeholder.com/600x400'}
                  category={firstCategory}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-between px-4 z-50">
        <button
          className="embla__prev bg-gray-900/45 h-10 w-10 md:h-16 md:w-16 rounded-full flex justify-center items-center z-10" // Ensure z-index is high
          onClick={scrollPrev}
        >
          <IoArrowBack className="text-[22px] text-white" />
        </button>
        <button
          className="embla__next bg-gray-900/45 h-10 w-10 md:h-16 md:w-16 rounded-full flex justify-center items-center z-10" // Ensure z-index is high
          onClick={scrollNext}
        >
          <IoArrowForward className="text-[22px] text-white" />
        </button>
      </div>
    </div>
  );
}

export default BlogCarosel;
