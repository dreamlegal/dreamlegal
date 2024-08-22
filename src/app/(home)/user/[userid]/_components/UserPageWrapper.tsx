import React from "react";
import { Suspense } from "react";

import Loading from "@/components/Loading";
import UserPage from "@/pages/UserPage";

function UserPageWrapper( { data }: any) {
  return (
    <Suspense fallback={<Loading />}>
      <UserPage data={data} />
    </Suspense>
  );
}

export default UserPageWrapper;
