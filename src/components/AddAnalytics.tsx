// import React, { useState, useEffect } from 'react';

// import VendorDashboard from './VendorDashboard';
// interface SignupData { 
//     type: string;
//     count: number;
// }
// function AddAnalytics() {
//     const [signupData, setSignupData] = useState<{ user: number; vendor: number }>({ user: 0, vendor: 0 });
//     const [products, setProducts] = useState<any[]>([]);

//     useEffect(() => {
//         // Function to fetch signup data from API
//         const fetchSignups = async () => {
//             try {
//                 const response = await fetch('/api/analytics-signups');
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 const data = await response.json();
//                 console.log('Fetched signup data:', data);

//                 // Map the signup data to user and vendor counts
//                 const signupCounts = data.signups.reduce(
//                     (acc: { user: number; vendor: number }, signup: SignupData) => {
//                         if (signup.type === 'user') {
//                             acc.user = signup.count;
//                         } else if (signup.type === 'vendor') {
//                             acc.vendor = signup.count;
//                         }
//                         return acc;
//                     },
//                     { user: 0, vendor: 0 }
//                 );

//                 setSignupData(signupCounts);
//             } catch (error) {
//                 console.error('Failed to fetch signup data:', error);
//             }
//         };

//         fetchSignups();
//     }, []); 



//     const fetchProducts = async (search = "") => {
//         try {
//           const response = await fetch("/api/get-all-products", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ number: 10 }),
//             cache: "no-cache",
//             next: { revalidate: 10 },
//           });
//           const data = await response.json();
    
//           if (data.success) {
//              setProducts(data.products)
//           }
//         } catch (error) {
//           console.error("An error occurred while fetching the products:", error);
//         }
//       };
//     return (
//         <div>
//         <div>
//             <h2 className='text-2xl font-bold mb-4'>Analytics</h2>
//             <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
//                 <div className='col-span-1 rounded-md border shadow px-4 py-4'>
//                     <h4 className='text-lg font-bold text-gray-800'>User Signup</h4>
//                     <span className='text-sm text-gray-400'>in 24 hours</span>
//                     <h3 className='text-3xl font-bold text-gray-800'>{signupData.user}</h3>
//                 </div>
//                 <div className='col-span-1 rounded-md border shadow px-4 py-4'>
//                     <h4 className='text-lg font-bold text-gray-800'>Vendor Signup</h4>
//                     <span className='text-sm text-gray-400'>in 24 hours</span>
//                     <h3 className='text-3xl font-bold text-gray-800'>{signupData.vendor}</h3>
//                 </div>
//             </div>
//         </div>
//         <VendorDashboard allProducts ={products}/>
//         </div>
//     );
// }

// export default AddAnalytics;
import React, { useState, useEffect } from 'react';
import VendorDashboard from "@/components/VendorDashborad"

interface SignupData {
    type: string;
    count: number;
}

interface SignupCounts {
    user: number;
    vendor: number;
}

function AddAnalytics() {
    const [signupData, setSignupData] = useState<SignupCounts>({ user: 0, vendor: 0 });
    const [products, setProducts] = useState<any[]>([]);
    const [loadingSignups, setLoadingSignups] = useState<boolean>(true);
    const [loadingProducts, setLoadingProducts] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSignups = async () => {
            try {
                const response = await fetch('/api/analytics-signups');
                if (!response.ok) {
                    throw new Error('Failed to fetch signup data');
                }
                const data = await response.json();
                console.log('Fetched signup data:', data);

                const signupCounts = data.signups.reduce((acc: SignupCounts, signup: SignupData) => {
                    if (signup.type === 'user') {
                        acc.user = signup.count;
                    } else if (signup.type === 'vendor') {
                        acc.vendor = signup.count;
                    }
                    return acc;
                }, { user: 0, vendor: 0 });

                setSignupData(signupCounts);
            } catch (error) {
                console.error('Failed to fetch signup data:', error);
                setError(error.message);
            } finally {
                setLoadingSignups(false);
            }
        };

        fetchSignups();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch("/api/get-all-products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ number: 10 }),
                cache: "no-cache",
                next: { revalidate: 10 },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }

            const data = await response.json();
            if (data.success) {
                setProducts(data.products);
            }
        } catch (error) {
            console.error("An error occurred while fetching the products:", error);
            setError(error.message);
        } finally {
            setLoadingProducts(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
//         <div>
//             <h2 className='text-2xl font-bold mb-4'>Analytics</h2>
//             {loadingSignups ? (
//                 <p>Loading signup data...</p>
//             ) : error ? (
//                 <p className="text-red-500">{error}</p>
//             ) : (
              
//                 <div className='flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0'>
//     <div className='flex-1 rounded-md border shadow-lg px-6 py-4 bg-white'>
//         <h4 className='text-lg font-bold text-gray-800'>User Signup</h4>
//         <span className='text-sm text-gray-400'>in 24 hours</span>
//         <h3 className='text-4xl font-bold text-gray-800'>{signupData.user}</h3>
//     </div>
//     <div className='flex-1 rounded-md border shadow-lg px-6 py-4 bg-white'>
//         <h4 className='text-lg font-bold text-gray-800'>Vendor Signup</h4>
//         <span className='text-sm text-gray-400'>in 24 hours</span>
//         <h3 className='text-4xl font-bold text-gray-800'>{signupData.vendor}</h3>
//     </div>
// </div>

//             )}
//             {loadingProducts ? (
//                 <p>Loading products...</p>
//             ) : (
//                 <VendorDashboard allProducts={products} />
//             )}
//         </div>
<div>
    <h2 className='text-2xl font-bold mb-4'>Analytics</h2>
    {loadingSignups ? (
        <p>Loading signup data...</p>
    ) : error ? (
        <p className="text-red-500">{error}</p>
    ) : (
        <>
            {/* User Signup Section */}
            <div className='flex flex-col md:flex-row md:space-x-4 bg-light-blue-100 p-4  '>
                <div className='flex-1 rounded-md border bg-white shadow-md px-6 py-4'>
                    <h4 className='text-lg font-bold text-gray-800'>User Signup</h4>
                    <span className='text-sm text-gray-400'>in 24 hours</span>
                    <h3 className='text-4xl font-bold text-gray-800'>{signupData.user}</h3>
                </div>
                <div className='flex-1 rounded-md border bg-white shadow-md px-6 py-4'>
                    <h4 className='text-lg font-bold text-gray-800'>Vendor Signup</h4>
                    <span className='text-sm text-gray-400'>in 24 hours</span>
                    <h3 className='text-4xl font-bold text-gray-800'>{signupData.vendor}</h3>
                </div>
            </div>

            {/* Vendor Dashboard Section */}
            <div className='mt-4 rounded-md border bg-white p-4 shadow-lg'>
               
                {loadingProducts ? (
                    <p>Loading products...</p>
                ) : (
                    <VendorDashboard allProducts={products} />
                )}
            </div>
        </>
    )}
</div>

    );
}

export default AddAnalytics;
