
"use client";
import AddReview from "@/components/AddReview";
import SavedItems from "@/components/SavedItems";
import UserDashboard from "@/components/UserDashboard";
import UserProfile from "@/components/UserProfile";
import UserSidebar from "@/components/UserSidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [activeTab, setActiveTab] = useState("dashboard");
  // const userId =
  //  typeof window !== "undefined" ? localStorage.getItem("userId") : null;
  // if(!userId){
  //   return null
  // // }

  

  return <main>{children}</main>;
}

