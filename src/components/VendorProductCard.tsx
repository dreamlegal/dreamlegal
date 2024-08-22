"use client";
import React, { useState } from "react";
import { GoPencil } from "react-icons/go";
import { FaRegTrashAlt } from "react-icons/fa";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { useFormContext } from "@/context/formValueContext";
import { useRouter } from "next/navigation";

function VendorProductCard({ id, image, title, description,userId }: any) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [features, setFeatures] = useState([]);
  const [analytics, setAnalytics] = useState([]);
  const [totalClick, settotalClick] = useState(0);
  const { setFormValues } = useFormContext();
  const router = useRouter();

  async function openTab() {
    setOpen(!open);
    if (!open) {
      setLoading(true);

      try {
        const response = await fetch('/api/more-details-productid', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productId: id }),
        });

        const data = await response.json();

        if (data.success) {
          setFeatures(data.features);
          setAnalytics(data.analytics);
          settotalClick(data.totalClicks);
        } else {
          console.error('Failed to fetch data:', data.msg);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
  }

  async function deleteFunction(productId: string, userId: string): Promise<void> {
    try {
      // Check if required parameters are provided
      if (!productId || !userId) {
        console.error('Product ID and User ID are required');
        return;
      }
  
      // Send a DELETE request to the server
      const response = await fetch('/api/delete-product', { // Adjust the endpoint as necessary
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: productId, userId }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Handle successful deletion
        console.log(data.msg);
        // Optionally refresh or update the UI
      } else {
        // Handle errors
        console.error(data.msg);
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error('An error occurred while deleting the product:', error);
    }
  }
  

  function editFunction(id: string) {
    setFormValues((prevValues: any) => ({
      ...prevValues,
      id: id,
    }));
    router.push("/vendor/edit");
  }

  function calculatePercentage(value: number, total: number): number {
    return total === 0 ? 0 : (value / total) * 100;
  }

  return (
    <div className="font-clarity">
      <div className="w-full px-10 py-7 bg-secondary1 rounded-xl border shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="md:col-span-2 inline-flex flex-col md:flex-row gap-4">
            <img
              src={image}
              width={80}
              height={80}
              alt="logo"
              className="rounded-full w-20 h-20 object-cover"
            />
            <div>
              <h3 className=" font-bold text-base">{title}</h3>
              <p className=" text-sm text-slate-500 mt-2">{description}</p>
            </div>
          </div>
          <div className="col-span-1 mt-2">
            <div className="flex flex-col md:flex-row gap-4 md:items-center justify-center h-full ">
              <button
                onClick={() => {
                  editFunction(id);
                }}
                className="flex gap-2 rounded-full bg-primary1 text-white font-bold px-6 py-3 text-xs transition-all  w-fit items-center hover:bg-gray-900 hover:gap-4"
              >
                Edit
                <GoPencil className=" text-xl" />
              </button>
              <Dialog>
                <DialogTrigger>
                  <button className="flex gap-2 rounded-full bg-red-500 text-white font-bold px-6 py-3 text-xs transition-all  w-fit items-center hover:bg-gray-900 hover:gap-4">
                    <FaRegTrashAlt className=" text-xl" />
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
                  <Button onClick={() => deleteFunction(id, userId)}  variant={"destructive"}>Delete Permanently</Button>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
        <div onClick={openTab} className="cursor-pointer ml-5">
          <span className="text-sm text-slate-500">Click here to see more</span>
        </div>
      </div>

      {open && (
        <div className="rounded-md border-x border-b border-primary1 px-10 shadow-md py-7 bg-white">
          {loading ? (
            <div role="status">
              <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-1">
                <h4 className="font-bold text-sm">Features</h4>
                <span className="text-sm text-gray-500 italic">Your traffic is more interested in</span>
                <div>
                  {features.map((feature: any, index) => {
                    const total = totalClick;
                    const featureName = Object.keys(feature)[0];
                    const featureValue = feature[featureName];
                    return (
                      <div key={index} className="w-full flex gap-2 items-center mt-4">
                        <span className="text-sm text-gray-600">{featureName}</span>
                        <Progress value={calculatePercentage(featureValue, total)} className="w-[60%] h-1" />
                        <span className="text-sm text-gray-400">

                          {calculatePercentage(featureValue, total).toFixed(2)}%
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="col-span-1">
                <h4 className="font-bold text-sm">User Distributions</h4>
                <span className="text-sm text-gray-500 italic">Your traffic user distributions</span>
                <div>
                  {analytics.map((analytic: any, index) => {
                    const total = analytics.reduce((sum: any, a: any) => sum + a.count, 0);
                    return (
                      <div key={index} className="w-full flex gap-2 items-center mt-4">
                        <span className="text-sm text-gray-600">{analytic.companyType}</span>
                        <Progress value={calculatePercentage(analytic.count, total)} className="w-[60%] h-1" />
                        <span className="text-sm text-gray-400">
                          {calculatePercentage(analytic.count, total).toFixed(2)}%
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default VendorProductCard;
