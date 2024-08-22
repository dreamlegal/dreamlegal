import React, { useState, useEffect } from 'react';

// Define the type for feature data
interface FeatureData {
    [key: string]: number; // Assuming the feature names are strings and counts are numbers
}
interface SignupData {
    type: string;
    count: number;
}

// Helper function to group by productId and productName
const groupByProduct = (data: any[]) => {
    if (!Array.isArray(data)) {
        console.error("Data is not an array:", data);
        return [];
    }

    const grouped = data.reduce((acc: any, item: any) => {
        const key = `${item.productId}-${item.productName}`;
        if (!acc[key]) {
            acc[key] = {
                productId: item.productId,
                productName: item.productName,
                entries: []
            };
        }
        acc[key].entries.push({
            companyType: item.companyType,
            count: item.count
        });
        return acc;
    }, {});
    return Object.values(grouped);
};

function AddAnalytics() {
    const [interests, setInterests] = useState<any[]>([]);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const [signupData, setSignupData] = useState<{ user: number; vendor: number }>({ user: 0, vendor: 0 });
    const [featureData, setFeatureData] = useState<FeatureData | null>(null);

    useEffect(() => {
        // Function to fetch data from API
        const fetchData = async () => {
            try {
                const response = await fetch('/api/get-interest');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Fetched data:', data); // Log data to inspect its structure
                setInterests(data.interests);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchData();
    }, []); // Empty dependency array means this effect runs once on component mount


    useEffect(() => {
        // Function to fetch signup data from API
        const fetchSignups = async () => {
            try {
                const response = await fetch('/api/analytics-signups');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Fetched signup data:', data);

                // Map the signup data to user and vendor counts
                const signupCounts = data.signups.reduce(
                    (acc: { user: number; vendor: number }, signup: SignupData) => {
                        if (signup.type === 'user') {
                            acc.user = signup.count;
                        } else if (signup.type === 'vendor') {
                            acc.vendor = signup.count;
                        }
                        return acc;
                    },
                    { user: 0, vendor: 0 }
                );

                setSignupData(signupCounts);
            } catch (error) {
                console.error('Failed to fetch signup data:', error);
            }
        };

        fetchSignups();
    }, []); 

    // Fetch feature data based on productId
    const fetchFeatureData = async (productId: string) => {
        try {
            const response = await fetch('/api/get-clickcount', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ productId })
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('Feature data:', data);
            if (data.success) {
                // Parse the feature JSON string into an object
                const feature = JSON.parse(data.clicks.feature) as FeatureData;
                setFeatureData(feature);
            } else {
                console.error('Failed to fetch feature data:', data);
                setFeatureData(null);
            }
        } catch (error) {
            console.error('Failed to fetch feature data:', error);
            setFeatureData(null);
        }
    };

    if (!interests) {
        return <div>Loading...</div>;
    }

    const groupedData = groupByProduct(interests);

    const handleToggle = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <div>
            <h2 className='text-2xl font-bold mb-4'>Analytics</h2>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                <div className='col-span-1 rounded-md border shadow px-4 py-4'>
                    <h4 className='text-lg font-bold text-gray-800'>User Signup</h4>
                    <span className='text-sm text-gray-400'>in 24 hours</span>
                    <h3 className='text-3xl font-bold text-gray-800'>{signupData.user}</h3>
                </div>
                <div className='col-span-1 rounded-md border shadow px-4 py-4'>
                    <h4 className='text-lg font-bold text-gray-800'>Vendor Signup</h4>
                    <span className='text-sm text-gray-400'>in 24 hours</span>
                    <h3 className='text-3xl font-bold text-gray-800'>{signupData.vendor}</h3>
                </div>
            </div>
            {groupedData.map((group: any, index: number) => (
                <div onClick={() => handleToggle(index)} key={index} className=" border shadow-md p-5 rounded-md my-2 hover:cursor-pointer">
                    <h3 className='text-lg font-bold text-gray-700'>{group.productName}</h3>
                    {expandedIndex === index && (
                        <div>
                            {group.entries.map((entry: any, entryIndex: number) => (
                                <div key={entryIndex} className="mb-4 p-4 border rounded-lg shadow-sm bg-gray-50 flex items-center justify-between">
                                    <div>
                                        <p className='text-sm text-gray-700'><strong>Company Type:</strong> {entry.companyType}</p>
                                    </div>
                                    <div className='flex-shrink-0'>
                                        <p className='text-sm text-gray-800 font-bold'><strong>Count:</strong> {entry.count / 3}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <button 
                        onClick={() => fetchFeatureData(group.productId)} 
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                        Fetch feature data
                    </button>
                </div>
            ))}
            {featureData && (
                <div className="mt-4 p-4 border rounded-lg shadow-sm bg-gray-50">
                    <h3 className='text-lg font-bold text-gray-700'>Feature Data</h3>
                    <ul>
                        {Object.entries(featureData).map(([featureName, count], index) => (
                            <li key={index} className="mb-2">
                                <strong>{featureName}:</strong> {count}
                            </li>
                        ))}
                    </ul>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => setFeatureData(null)}>Hide</button>
                </div>
            )}
        </div>
    );
}

export default AddAnalytics;
