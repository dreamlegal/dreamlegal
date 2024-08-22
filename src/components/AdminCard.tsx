"use client";
import React from 'react';

interface AdminCardProps {
  admin: {
    id: string;
    user: string;
    email: string;
  };
}

function AdminCard({ admin }: AdminCardProps) {
  return (
    <div className='font-clarity border rounded-md px-4 py-4 shadow'>
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold">{admin.user || 'Admin Name'}</h2>
          <p className="text-sm text-slate-500">{admin.email || 'Admin Email'}</p>
        </div>
      </div>
    </div>
  );
}

export default AdminCard;
