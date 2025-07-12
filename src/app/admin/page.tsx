'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardStats from './_components/DashboardStats';
import { useAdmin } from './_components/AdminContext';
import MarketIntelligenceDashboard from './_components/MarketIntelligenceDashboard';
export default function AdminDashboard() {
  const { loading } = useAdmin();
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return <MarketIntelligenceDashboard />;
  // return <DashboardStats />;
}