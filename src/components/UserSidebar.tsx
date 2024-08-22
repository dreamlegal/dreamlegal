"use client";
import React from "react";
import { FaBookmark } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";

function UserSidebar({ setActiveTab, activeTab }: any) {
  return (
    <div className=" hidden md:block font-clarity ">
      <div className="flex h-screen flex-col justify-between  bg-white">
        <div className="px-4 py-6">
          <ul className="mt-6 space-y-1">
            <li onClick={() => setActiveTab("dashboard")}>
              <a
                href="#"
                className={`flex gap-2 rounded-lg  px-4 py-2 text-sm font-medium text-gray-700 items-center ${
                  activeTab === "dashboard" ? "bg-gray-100" : ""
                }`}
              >
                <MdDashboard /> Dashboard
              </a>
            </li>

            <li onClick={() => setActiveTab("saved")}>
              <a
                href="#"
                className={`flex gap-2 rounded-lg  px-4 py-2 text-sm font-medium text-gray-700 items-center ${
                  activeTab === "saved" ? "bg-gray-100" : ""
                }`}
              >
                <FaBookmark /> Saved
              </a>
            </li>

            <li onClick={() => setActiveTab("profile")}>
              <a
                href="#"
                className={`flex gap-2 rounded-lg  px-4 py-2 text-sm font-medium text-gray-700 items-center ${
                  activeTab === "profile" ? "bg-gray-100" : ""
                }`}
              >
                <FaRegUserCircle /> Profile
              </a>
            </li>

            <li onClick={() => setActiveTab("addReview")}>
              <button className=" flex w-full gap-2 rounded-lg  px-4 py-2 text-sm font-medium bg-primary1 text-white items-center">
                {" "}
                <FaRegStar />
                Add Review
              </button>
            </li>

            <li>
              <button className=" flex w-full gap-2 rounded-lg  px-4 py-2 text-sm font-medium  text-black items-center">
                {" "}
                <CiLogout />
                Logout
              </button>
            </li>
          </ul>
        </div>

        <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
          <a
            href="#"
            className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50"
          >
            <img
              alt=""
              src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              className="size-10 rounded-full object-cover"
            />

            <div>
              <p className="text-xs">
                <strong className="block font-medium">Eric Frusciante</strong>

                <span> eric@frusciante.com </span>
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default UserSidebar;
