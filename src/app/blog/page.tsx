

import { useState } from "react";
import { useRouter } from "next/router";

export default function BlogPage() {

  return (
    <div className="container mx-auto px-4">
      <div className="mt-12">
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-3xl font-bold mb-4">Welcome to the Blog Page</h1>
          <p className="text-lg text-gray-500 mb-8">Please click on the Home page or  blogs resources.</p>
          <div className="flex gap-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              <a href="/">Home Page</a>
            </button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              <a href="/resources">Blogs</a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
