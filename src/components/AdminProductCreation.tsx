// "use client"
// import  AdminProductForm from "./AdminProductForm";
// const AdminProductCreation = () => {
//   return (
//     <div className="font-clarity">
//     <h1 className="text-xl font-bold">Add Product</h1>
//     <div>
//       <div className="grid grid-cols-1 md:grid-cols-4 mt-6">
//         <div className="w-full col-span-3 shadow border px-5 py-6 rounded-lg">
//           <div>
//             {/* <ProductInfo editing={false} /> */}
//             <AdminProductForm editing= {false}/>


//             {/* Add more steps here */}
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
//   )
// }

// export default AdminProductCreation

// "use client"
// import AdminProductForm from "./AdminProductForm";
// import { useRouter } from "next/navigation";
// import { ProductInfo } from '@/store/useStore';
// import { useState } from 'react';

// const AdminProductCreation = () => {
//   const router = useRouter();
//   const reset = ProductInfo((state) => state.reset);
//   const [isRefreshed, setIsRefreshed] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleRefresh = () => {
//     setIsLoading(true);
//     reset();
//     router.refresh();
    
//     // Show success message
//     setIsRefreshed(true);
//     setIsLoading(false);
    
//     // Hide the success message after 3 seconds
//     setTimeout(() => {
//       setIsRefreshed(false);
//     }, 3000);
//   };

//   return (
//     <div className="font-clarity">
//       <div className="flex justify-between items-center">
//         <h1 className="text-xl font-bold">Add Product</h1>
//         <div className="flex items-center gap-4">
//           {isRefreshed && (
//             <span className="text-green-600 text-sm">
//               Form has been reset successfully!
//             </span>
//           )}
//           <button 
//             onClick={handleRefresh}
//             disabled={isLoading}
//             className={`px-4 py-2 bg-blue-500 text-white rounded-md transition-colors
//               ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
//           >
//             {isLoading ? 'Resetting...' : 'Reset Form'}
//           </button>
//         </div>
//       </div>
//       <div>
//         <div className="grid grid-cols-1 md:grid-cols-4 mt-6">
//           <div className="w-full col-span-3 shadow border px-5 py-6 rounded-lg">
//             <div>
//               <AdminProductForm editing={false}/>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AdminProductCreation
"use client"
import AdminProductForm from "./AdminProductForm";
import { useRouter } from "next/navigation";
import { ProductInfo } from '@/store/useStore';
import { useState } from 'react';

const AdminProductCreation = () => {
  const router = useRouter();
  const reset = ProductInfo((state) => state.reset);
  const [isRefreshed, setIsRefreshed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formKey, setFormKey] = useState(0); // Add this for forcing re-render

  const handleRefresh = () => {
    setIsLoading(true);
    reset();
    router.refresh();
    setFormKey(prev => prev + 1); // This will force AdminProductForm to re-render completely
    
    setIsRefreshed(true);
    setIsLoading(false);
    
    setTimeout(() => {
      setIsRefreshed(false);
    }, 3000);
  };

  return (
    <div className="font-clarity">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Add Product</h1>
        <div className="flex items-center gap-4">
          {isRefreshed && (
            <span className="text-green-600 text-sm">
              Form has been reset successfully!
            </span>
          )}
          <button 
            onClick={handleRefresh}
            disabled={isLoading}
            className={`px-4 py-2 bg-blue-500 text-white rounded-md transition-colors
              ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
          >
            {isLoading ? 'Resetting...' : 'Reset Form'}
          </button>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-4 mt-6">
          <div className="w-full col-span-3 shadow border px-5 py-6 rounded-lg">
            <div>
              <AdminProductForm key={formKey} editing={false}/> {/* Add key prop here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminProductCreation