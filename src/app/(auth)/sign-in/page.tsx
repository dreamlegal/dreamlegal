"use client"
export const dynamic = "force-dynamic";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { signIn } from "next-auth/react";
import { useState } from "react";
import UserSignin from "../_components/UserSignin";
import VendorSignin from "../_components/VendorSignin";

export default function SignIn() {
  return (
    <div className="flex justify-center font-clarity  ">
      <div className="w-fit px-5 py-5 border shadow">
        <Tabs defaultValue="user" className="md:w-[400px] ">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="user">User</TabsTrigger>
            <TabsTrigger value="vendor">Vendor</TabsTrigger>
          </TabsList>
          <TabsContent value="user">
            <UserSignin />
          </TabsContent>
          <TabsContent value="vendor">
            <VendorSignin />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
