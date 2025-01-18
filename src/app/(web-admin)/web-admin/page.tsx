"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // For handling navigation
import Loading from '@/components/Loading';
// import WebAdmin from '@/pages/WebAdmin';
import WebAdmin from '@/components/WebAdmin';
import React, { Suspense } from 'react';

function Page() {
  const router = useRouter();

  useEffect(() => {
    const adminId = localStorage.getItem('adminId');
    if (!adminId) {
      // Redirect to login page if adminId is not found in localStorage
      router.push('/web-admin/login');
    }
  }, [router]);

  return (
    <Suspense fallback={<Loading />}>
      <WebAdmin />
    </Suspense>
  );
}

export default Page;
