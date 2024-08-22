import DirectoryProduct from "@/components/DirectoryProduct";
import Loading from "@/components/Loading";
import React, { Suspense } from "react";

function DirectoryPage() {
  return (
    <div className=" py-8">
      <Suspense fallback={<Loading />}>
        <DirectoryProduct />
      </Suspense>
    </div>
  );
}

export default DirectoryPage;
