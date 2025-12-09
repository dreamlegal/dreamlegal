export const dynamic = "force-dynamic";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import UserSignup from "../_components/UserSignup";
import VendorSignup from "../_components/VendorSignup";


function page() {
  return (
    <div className="flex justify-center font-clarity">
      <div className="w-fit px-5 py-5 border shadow">
        <Tabs defaultValue="user" className="md:w-[400px] ">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="user">User</TabsTrigger>
            <TabsTrigger value="vendor">Vendor</TabsTrigger>
          </TabsList>
          <TabsContent value="user">
            <UserSignup />
          </TabsContent>
          <TabsContent value="vendor">
            <VendorSignup />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default page;