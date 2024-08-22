"use client";
import { useState } from "react";

interface ItemProps {
  title: string;
  children: React.ReactNode;
}

const Item: React.FC<ItemProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`border shadow-sm shadow-primary2/50  rounded-2xl p-4 font-clarity ${
        isOpen ? "bg-primary1 text-white" : "bg-white text-gray-900"
      }`}
    >
      <button
        type="button"
        aria-label="Open item"
        title="Open item"
        className="flex items-center justify-between w-full p-4 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="text-lg font-bold ">{title}</p>
        <div className="flex items-center justify-center w-8 h-8 border rounded-full shadow">
          <svg
            viewBox="0 0 24 24"
            className={`w-3  transition-transform duration-200 ${
              isOpen ? "transform rotate-180" : ""
            }`}
          >
            <polyline
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeMiterlimit="10"
              points="2,7 12,17 22,7"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>
      {isOpen && (
        <div className="p-4 pt-0">
          <p className="">{children}</p>
        </div>
      )}
    </div>
  );
};

export default Item;
