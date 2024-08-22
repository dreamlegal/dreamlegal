"use client";
import React, { useEffect, useState } from 'react';
import AdminCard from './AdminCard';


function AllAdmins() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the list of admins when the component mounts
    const fetchAdmins = async () => {
      try {
        const response = await fetch('/api/get-admin');
        const result = await response.json();

        if (result.success) {
          setAdmins(result.admins);
        } else {
          setError(result.msg);
        }
      } catch (err) {
        console.error('An error occurred while fetching admins.');
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="font-clarity">
      <h2 className="text-lg font-bold mb-4">All Admin Accounts</h2>

      {admins.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {admins.map((admin, index) => (
            <AdminCard key={index} admin={admin} />
          ))}
        </div>
      ) : (
        <div>No admins found.</div>
      )}
    </div>
  );
}

export default AllAdmins;
