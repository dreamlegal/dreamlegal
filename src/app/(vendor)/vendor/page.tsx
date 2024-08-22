"use client";
import React, { useEffect } from "react";
import { Suspense } from "react";
import VendorWrapper from "./_components/VendorWrapper";
import { useRouter } from "next/navigation";


function page() {

  return (
    <div>
      <VendorWrapper />
    </div>
  );
}

export default page;
