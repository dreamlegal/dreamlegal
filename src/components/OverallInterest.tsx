"use client";
import React, { useEffect, useState } from 'react';
import { Progress } from './ui/progress';

type Interest = {
    companyType: string;
    count: number;
};


function OverallInterest({ userId }: { userId: string }) {
    const [interests, setInterests] = useState<Interest[]>([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        async function fetchInterests() {
            try {
                const response = await fetch('/api/get-interest-overall', { // Adjust the endpoint as per your setup
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId }), // Replace with the actual userId
                });

                const data = await response.json();

                if (data.success) {
                    setInterests(data.interests);
                    // Calculate total count
                    const totalCount = data.interests.reduce((sum: any, interest: { count: any; }) => sum + interest.count, 0);
                    setTotal(totalCount);
                } else {
                    console.error('Failed to fetch interests:', data.msg);
                }
            } catch (error) {
                console.error('Error fetching interests:', error);
            }
        }

        fetchInterests();
    }, []);

    return (
        <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7 xl:col-span-8 font-clarity">
            <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
                <div className="flex w-full flex-wrap gap-3 sm:gap-5">
                    <h4 className="text-sm font-semibold text-black dark:text-white">
                        Overall Interest
                    </h4>
                </div>
            </div>

            <div>
                {interests.map((interest, index) => (
                    <div key={index} className='w-full flex gap-2 items-center mt-4'>
                        <span className='text-sm text-gray-600'>{interest.companyType}</span>
                        <Progress 
                            value={(interest.count / total) * 100} 
                            className="w-[60%] h-1" 
                        />
                        <span className='text-sm text-gray-400'>{((interest.count / total) * 100).toFixed(2)}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OverallInterest;
