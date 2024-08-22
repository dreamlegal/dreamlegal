"use client";
import React, { useState } from 'react';
import { GoPencil } from 'react-icons/go';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { FaRegTrashAlt, FaStar } from 'react-icons/fa';
import { Button } from './ui/button';
import Link from 'next/link';

async function toggleFeatured(productId: string) {
  try {
    const response = await fetch('/api/make-featured', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: productId }),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.msg || 'Failed to toggle feature status');
    }

    alert('Product feature status updated successfully');
    return data.product;
  } catch (error) {
    console.error(error);
    alert('Error toggling feature status: ');
  }
}

function AdminProductCard({ product }: any) {
  const [isUnpublishing, setIsUnpublishing] = useState(false);
  const [isFeatured, setIsFeatured] = useState(product.featured);

  const handleUnpublishClick = async () => {
    setIsUnpublishing(true);
    await unpublishProduct(product.id);
    setIsUnpublishing(false);
    // Optionally, trigger a re-fetch or update local state here
  };

  const handleToggleFeatured = async () => {
    const updatedProduct = await toggleFeatured(product.id);
    setIsFeatured(updatedProduct.featured);
  };

  return (
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
                <div className="flex gap-3 items-center mt-3">
                  <button onClick={handleToggleFeatured}>
                    <FaStar className={`text-2xl ${isFeatured ? 'text-primary1' : 'text-gray-400'}`} />
                  </button>
                </div>
              </div>
            </div>
            <div className="col-span-1 mt-2">
              <div className="flex flex-col md:flex-row gap-4 md:items-center justify-center h-full">
                <button
                  onClick={handleUnpublishClick}
                  disabled={isUnpublishing}
                  className={`flex gap-2 rounded-full ${isUnpublishing ? 'bg-gray-400' : 'bg-yellow-500'} text-white font-bold px-6 py-3 text-xs transition-all w-fit items-center hover:bg-gray-900 hover:gap-4`}
                >
                  {isUnpublishing ? 'Unpublishing...' : 'Unpublish'}
                </button>
                <Link
                  href={`/web-admin/product/${product.id}`}
                  className="flex gap-2 rounded-full bg-primary1 text-white font-bold px-6 py-3 text-xs transition-all w-fit items-center hover:bg-gray-900 hover:gap-4"
                >
                  Edit
                  <GoPencil className="text-xl" />
                </Link>
                <Dialog>
                  <DialogTrigger>
                    <button className="flex gap-2 rounded-full bg-red-500 text-white font-bold px-6 py-3 text-xs transition-all w-fit items-center hover:bg-gray-900 hover:gap-4">
                      <FaRegTrashAlt className="text-xl" />
                      Delete
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you absolutely sure?</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                      </DialogDescription>
                    </DialogHeader>
                    <Button variant={"destructive"}>Delete Permanently</Button>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProductCard;
function unpublishProduct(id: any) {
  throw new Error('Function not implemented.');
}

