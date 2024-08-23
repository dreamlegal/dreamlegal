"use client";

import DirectoryProduct from "@/components/DirectoryProduct";
import Loading from "@/components/Loading";
import React, { Suspense, useEffect, useState } from "react";

function DirectoryPage() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="py-8">
      <Suspense fallback={<Loading />}>
        <DirectoryProduct />
      </Suspense>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-5 w-10 h-10 bg-primary1 text-white rounded-full shadow-lg"
        >
          ↑
        </button>
      )}
    </div>
  );
}

export default DirectoryPage;
