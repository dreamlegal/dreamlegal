import React from "react";
import BlogCard from "./BlogCard";
import { FaBookmark } from "react-icons/fa";

function SavedItems() {
  return (
    <div className="font-clarity">
      <div className=" mb-4">
        <div className="flex items-center gap-4">
          <div className=" p-4 bg-primary2 rounded-full ">
            <FaBookmark className="text-primary1 text-lg" />
          </div>{" "}
          <p className="text-slate-500 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </p>
          <div className="text-xs text-orange-500 bg-orange-50 rounded-full px-2 py-1">
            Aug 5
          </div>
        </div>
      </div>
    </div>
  );
}

export default SavedItems;
