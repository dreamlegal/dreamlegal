"use client";
import React, { useState } from 'react';
import { GoPencil } from 'react-icons/go';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { FaRegTrashAlt } from 'react-icons/fa';
import { Button } from './ui/button';
import { FaCheck } from 'react-icons/fa6';
import { Link } from '@react-email/components';

async function publishProduct(productId: string) {
  try {
    const response = await fetch('/api/update-publish', { // Adjust the endpoint as needed
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: productId }),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.msg || 'Failed to publish product');
    }

    alert('Product published successfully');
    return data.product;
  } catch (error) {
    console.error(error);
    alert('Error publishing product: ' );
  }
}

function NewProductAdminCard({ product } : any) {
  const [isPublishing, setIsPublishing] = useState(false);

  const handlePublishClick = async () => {
    setIsPublishing(true);
    await publishProduct(product.id);
    setIsPublishing(false);
    // Optionally, you can trigger a re-fetch or update local state here
  };

  return (
    <div>
      <div>
        <div>
          <div className="w-full px-10 py-7 bg-secondary1 rounded-xl border shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="md:col-span-2 inline-flex flex-col md:flex-row gap-4">
                <img
                  src={product.logoUrl}
                  width={80}
                  height={80}
                  alt="logo"
                  className="rounded-full w-20 h-20 object-cover"
                />
                <div>
                  <h3 className="font-bold text-base">{product.name}</h3>
                  <p className="text-sm text-slate-500 mt-2">{product.description}</p>
                  <div className="flex gap-3 items-center mt-3"></div>
                </div>
              </div>
              <div className="col-span-1 mt-2">
                <div className="flex flex-col md:flex-row gap-4 md:items-center justify-center h-full">
                  <Link
                    href={`/product/${product.slug}`}
                    className="flex gap-2 rounded-full bg-primary1 font-bold px-6 py-3 text-xs transition-all w-fit items-center hover:gap-4"
                  >
                    <span className='text-white'>View</span>
                  </Link>
                  <Link
                    href={`/web-admin/product/${product.id}`}
                    className="flex gap-2 rounded-full bg-primary1 font-bold px-6 py-3 text-xs transition-all w-fit items-center hover:gap-4"
                  >
                    <span className='text-white'>edit</span>
                  </Link>
                  <button
                    onClick={handlePublishClick}
                    disabled={isPublishing}
                    className={`flex gap-2 rounded-full ${isPublishing ? 'bg-gray-400' : 'bg-teal-500'} text-white font-bold px-6 py-3 text-xs transition-all w-fit items-center hover:bg-gray-900 hover:gap-4`}
                  >
                    {isPublishing ? 'Publishing...' : 'Approve'}
                    <FaCheck className="text-xl" />
                  </button>
               
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewProductAdminCard;
