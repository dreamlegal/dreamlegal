"use client";
import React, { useEffect, useState } from 'react';
import { Progress } from './ui/progress';

type Interest = {
    productId: string;
    views: number;
};

function OverallProductRank({ userId }: { userId: string }) {
    const [interests, setInterests] = useState<Interest[]>([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        async function fetchInterests() {
            try {
                const response = await fetch('/api/get-analytics-userid', { // Adjust the endpoint as per your setup
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId }), // Replace with the actual userId
                });

                const data = await response.json();

                if (data.success) {
                    setInterests(data.analytics);
                    // Calculate total count
                    const totalCount = data.analytics.reduce((sum: number, interest: Interest) => sum + interest.views, 0);
                    setTotal(totalCount);
                } else {
                    console.error('Failed to fetch interests:', data.msg);
                }
            } catch (error) {
                console.error('Error fetching interests:', error);
            }
        }

        fetchInterests();
    }, [userId]);

    function capitalizeFirstLetter(str: string): string {
        if (!str) return str;
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    return (
        <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7 xl:col-span-8 font-clarity">
            <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
                <div className="flex w-full flex-wrap gap-3 sm:gap-5">
                    <h4 className="text-sm font-semibold text-black dark:text-white">
                        Overall Product Rank
                    </h4>
                </div>
            </div>

            <div>
                {interests.map((interest, index) => (
                    <div key={index} className='w-full flex gap-2 items-center mt-4'>
                        <span className='text-sm text-gray-600'>{capitalizeFirstLetter(interest.productId)}</span>
                        <Progress
                            value={total > 0 ? (interest.views / total) * 100 : 0} // Avoid division by zero
                            className="w-[60%] h-1"
                        />
                        <span className='text-sm text-gray-400'>{total > 0 ? ((interest.views / total) * 100).toFixed(2) : '0.00'}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OverallProductRank;
