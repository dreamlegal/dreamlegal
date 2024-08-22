"use client"
import UserDashboard from "@/components/UserDashboard";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import UserProfile from "@/components/UserProfile";
import { ScrollArea } from "@/components/ui/scroll-area";
import Loading from "@/components/Loading";
import EditUser from "@/app/(home)/user/[userid]/_components/EditUser";
import ChangePass from "@/app/(home)/user/[userid]/_components/ChangePass";

function UserPage({ data }: any) {
  const path = useParams();
  const searchParams = useSearchParams();
  const userId = path?.userid;
  const [view, setView] = useState('dashboard');

  // Add logging for debugging
  useEffect(() => {
    console.log("UserPage data:", data);
  }, [data]);

  // Ensure data is available
  if (!data) {
    return <Loading />;
  }

  const handleEditClick = () => {
    setView('edit');
  };

  // Function to switch back to the dashboard view
  const handleCloseEdit = () => {
    setView('dashboard');
  };

  const handlePasswordClick = () => {
    setView('change-password');
    console.log('Password clicked');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 px-4">
      <div className="col-span-1">
        <div style={{ maxWidth: "100%" }}>
          <UserProfile data={data} onEditClick={handleEditClick} onChangePassword={handlePasswordClick} />
        </div>
      </div>
      <div className="col-span-4">
        <ScrollArea className="h-screen px-5">
        {view === 'dashboard' && <UserDashboard />}
        {view === 'edit' && <EditUser data={data} onCloseEdit={handleCloseEdit}  />}
        {view === 'change-password' && <ChangePass />}
        </ScrollArea>
      </div>
    </div>
  );
}

export default UserPage;
