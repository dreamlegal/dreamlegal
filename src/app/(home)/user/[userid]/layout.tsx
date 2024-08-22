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
  const userId =
   typeof window !== "undefined" ? localStorage.getItem("userId") : null;
  if(!userId){
    return null
  }

  let ActiveComponent;
  // switch (activeTab) {
  //   case "dashboard":
  //     ActiveComponent = <UserDashboard />;
  //     break;
  //   case "saved":
  //     ActiveComponent = <SavedItems />;
  //     break;
  //   case "profile":
  //     ActiveComponent = <UserProfile userId={userId} />;
  //     break;
  //   case "addReview":
  //     ActiveComponent = <AddReview />;
  //     break;
  //   default:
  //     ActiveComponent = <UserDashboard />;
  // }
  return <main>{children}</main>;
}
