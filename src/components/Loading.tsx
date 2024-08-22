import Image from "next/image";
import React from "react";

function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex items-center gap-4 font-clarity">
        <div>
          <Image src={"/loader.gif"} height={100} width={100} alt="loader" />
        </div>
        <p className="text-gray-900 font-bold text-2xl">Dreamlegal</p>
      </div>
    </div>
  );
}

export default Loading;
