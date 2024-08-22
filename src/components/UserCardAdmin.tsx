import Link from 'next/link';
import React from 'react';

interface VendorCardAdminProps {
  vendor: {
    id: string;
    name: string;
    email: string;
  };
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

function UserCardAdmin({ vendor, onEdit, onDelete }: VendorCardAdminProps) {
  return (
    <div className='font-clarity border rounded-md px-4 py-4 shadow'>
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold">{vendor.name || 'Vendor Name'}</h2>
          <p className="text-sm text-slate-500">{vendor.email || 'Vendor Email'}</p>
        </div>
        <div className='flex gap-3'>
          <Link
            className="text-sm bg-primary1 px-3 py-3 rounded-sm text-white"
            href={`/web-admin/vendor/${vendor.id}`}
          >
            Edit
          </Link>
          <button
            className='text-sm bg-red-500 px-3 py-3 rounded-sm text-white'
            onClick={() => onDelete(vendor.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserCardAdmin;
