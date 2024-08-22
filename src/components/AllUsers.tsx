"use client";
import React, { useEffect, useState } from 'react';
import VendorCardAdmin from './VendorCardAdmin';
import { MdOutlineDelete } from 'react-icons/md';
import UserCardAdmin from './UserCardAdmin';

function AllUsers() {
  const [vendors, setVendors] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await fetch('/api/get-all-users', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        const result = await response.json();
        if (result.success) {
          setVendors(result.users);
        } else {
          setError(result.msg);
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Unknown error');
      }
    };

    fetchVendors();
  }, []);

  const handleEdit = (id: string) => {
    // Logic for editing a vendor
    console.log('Edit vendor with ID:', id);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch('/api/delete-vendor', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const result = await response.json();
      if (result.success) {
        setVendors(vendors.filter(vendor => vendor.id !== id));
      } else {
        setError(result.msg);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error');
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='font-clarity px-4'>
      <h2 className="text-lg font-bold mb-4">All User</h2>
      {vendors.map(vendor => (
        <UserCardAdmin
          key={vendor.id}
          vendor={vendor}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}

export default AllUsers;
