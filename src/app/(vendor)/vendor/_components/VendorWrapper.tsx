"use client";
import React, { useEffect } from "react";
import { Suspense } from "react";
import VendorPage from "./VendorPage";
import Loading from "@/components/Loading";


function VendorWrapper() {

  return (
    <Suspense fallback={<Loading />}>
      <VendorPage />
    </Suspense>
  );
}

export default VendorWrapper;
