'use client';

import { useEffect } from 'react';
import { useAdmin } from '../../_components/AdminContext';
import { useRouter } from 'next/navigation';
import AdminProductCreation from "@/components/AdminProductCreation";

export default function ProductCreationPage() {
  const { hasPermission, isLoading } = useAdmin();
  const router = useRouter();

  useEffect(() => {
    // Redirect if user doesn't have permission
    if (!isLoading && !hasPermission('AdminProductCreation')) {
      router.push('/admin');
    }
  }, [hasPermission, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return <AdminProductCreation />;
}