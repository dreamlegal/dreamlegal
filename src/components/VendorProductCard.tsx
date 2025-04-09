
// "use client";
// import React, { useState } from "react";
// import { 
//   Edit2, 
//   Trash2, 
//   ChevronDown, 
//   ChevronUp, 
//   BarChart2, 
//   Users, 
//   FileText 
// } from 'lucide-react';
// import { 
//   Dialog, 
//   DialogContent, 
//   DialogHeader, 
//   DialogTitle, 
//   DialogDescription, 
//   DialogTrigger 
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Progress } from "@/components/ui/progress";
// import { useFormContext } from "@/context/formValueContext";
// import { useRouter } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";
// import { toast } from "sonner";

// function VendorProductCard({ 
//   id, 
//   image, 
//   title, 
//   description, 
//   userId 
// }: {
//   id: string;
//   image: string;
//   title: string;
//   description: string;
//   userId: string;
// }) {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [features, setFeatures] = useState([]);
//   const [analytics, setAnalytics] = useState([]);
//   const [totalClicks, setTotalClicks] = useState(0);
  
//   const { setFormValues } = useFormContext();
//   const router = useRouter();

//   const fetchProductDetails = async () => {
//     if (isExpanded && features.length > 0) return;

//     setIsLoading(true);
//     try {
//       const response = await fetch('/api/more-details-productid', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ productId: id }),
//       });

//       const data = await response.json();

//       if (data.success) {
//         setFeatures(data.features);
//         setAnalytics(data.analytics);
//         setTotalClicks(data.totalClicks);
//       } else {
//         toast.error('Failed to fetch product details', {
//           description: data.msg || 'Please try again later'
//         });
//       }
//     } catch (error) {
//       toast.error('Network Error', {
//         description: 'Unable to fetch product details'
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const deleteProduct = async () => {
//     try {
//       const response = await fetch('/api/delete-product', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ id, userId }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         toast.success('Product Deleted', {
//           description: 'Your product has been successfully removed'
//         });
//         // Optionally trigger a refresh or remove the card
//       } else {
//         toast.error('Delete Failed', {
//           description: data.msg || 'Unable to delete product'
//         });
//       }
//     } catch (error) {
//       toast.error('Network Error', {
//         description: 'Unable to delete product'
//       });
//     }
//   };

//   const editProduct = () => {
//     setFormValues((prevValues: any) => ({
//       ...prevValues,
//       id: id,
//     }));
//     router.push("/vendor/edit");
//   };

//   const calculatePercentage = (value: number, total: number): number => {
//     return total === 0 ? 0 : (value / total) * 100;
//   };

//   const toggleExpand = () => {
//     if (!isExpanded) {
//       fetchProductDetails();
//     }
//     setIsExpanded(!isExpanded);
//   };

//   return (
//     <motion.div 
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3 }}
//       className="w-full bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
//     >
//       {/* Product Header */}
//       <div className="p-6 border-b border-gray-100">
//         <div className="flex items-center justify-between space-x-4">
//           {/* Product Info */}
//           <div className="flex items-center space-x-4">
//             <img
//               src={image}
//               alt={title}
//               className="w-16 h-16 rounded-full object-cover border-4 border-indigo-50"
//             />
//             <div>
//               <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
//               <p className="text-sm text-gray-500 line-clamp-1">{description}</p>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex items-center space-x-2">
//             <motion.button
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={editProduct}
//               className="p-2 bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100 transition-colors"
//             >
//               <Edit2 size={20} />
//             </motion.button>
//             <Dialog>
//               <DialogTrigger asChild>
//                 <motion.button
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="p-2 bg-red-50 text-red-600 rounded-full hover:bg-red-100 transition-colors"
//                 >
//                   <Trash2 size={20} />
//                 </motion.button>
//               </DialogTrigger>
//               <DialogContent>
//                 <DialogHeader>
//                   <DialogTitle>Delete Product</DialogTitle>
//                   <DialogDescription>
//                     Are you sure you want to delete this product? This action cannot be undone.
//                   </DialogDescription>
//                 </DialogHeader>
//                 <div className="flex justify-end space-x-2">
//                   <Button variant="outline">Cancel</Button>
//                   <Button 
//                     variant="destructive" 
//                     onClick={deleteProduct}
//                   >
//                     Delete Permanently
//                   </Button>
//                 </div>
//               </DialogContent>
//             </Dialog>
//           </div>
//         </div>
//       </div>

//       {/* Expand/Collapse Button */}
//       <button 
//         onClick={toggleExpand}
//         className="w-full flex items-center justify-center py-2 bg-gray-50 hover:bg-gray-100 transition-colors"
//       >
//         <span className="text-sm text-gray-600 flex items-center">
//           {isExpanded ? 'Collapse' : 'Show More'} 
//           {isExpanded ? <ChevronUp className="ml-2" size={16} /> : <ChevronDown className="ml-2" size={16} />}
//         </span>
//       </button>

//       {/* Expandable Content */}
//       <AnimatePresence>
//         {isExpanded && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: 'auto' }}
//             exit={{ opacity: 0, height: 0 }}
//             className="p-6 bg-gray-50/50"
//           >
//             {isLoading ? (
//               <div className="flex justify-center items-center py-8">
//                 <div className="animate-spin w-8 h-8 border-4 border-indigo-400 border-t-transparent rounded-full"></div>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Features Section */}
//                 <div>
//                   <div className="flex items-center space-x-2 mb-4">
//                     <BarChart2 className="text-indigo-600" size={20} />
//                     <h4 className="text-lg font-semibold text-gray-800">Feature Insights</h4>
//                   </div>
//                   {features.map((feature: any, index) => {
//                     const featureName = Object.keys(feature)[0];
//                     const featureValue = feature[featureName];
//                     const percentage = calculatePercentage(featureValue, totalClicks);
                    
//                     return (
//                       <div key={index} className="mb-3">
//                         <div className="flex justify-between items-center mb-1">
//                           <span className="text-sm text-gray-600">{featureName}</span>
//                           <span className="text-xs text-gray-500">{percentage.toFixed(1)}%</span>
//                         </div>
//                         <Progress value={percentage} className="h-2" />
//                       </div>
//                     );
//                   })}
//                 </div>

//                 {/* Analytics Section */}
//                 <div>
//                   <div className="flex items-center space-x-2 mb-4">
//                     <Users className="text-indigo-600" size={20} />
//                     <h4 className="text-lg font-semibold text-gray-800">User Distribution</h4>
//                   </div>
//                   {analytics.map((analytic: any, index) => {
//                     const total = analytics.reduce((sum: number, a: any) => sum + a.count, 0);
//                     const percentage = calculatePercentage(analytic.count, total);
                    
//                     return (
//                       <div key={index} className="mb-3">
//                         <div className="flex justify-between items-center mb-1">
//                           <span className="text-sm text-gray-600">{analytic.companyType}</span>
//                           <span className="text-xs text-gray-500">{percentage.toFixed(1)}%</span>
//                         </div>
//                         <Progress value={percentage} className="h-2" />
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.div>
//   );
// }

// export default VendorProductCard;
"use client";
import React, { useState } from "react";
import { Edit2, Trash2, Eye } from 'lucide-react';
import { useRouter } from "next/navigation";
import Alert from '@/components/Alert';
// import ConfirmationDialog from './ConfirmationDialog';

function VendorProductCard({ 
  slug,
  id, 
  image, 
  title, 
  description, 
  userId,
  onDelete,
  showAlert: parentShowAlert
}) {
  const router = useRouter();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [alert, setAlert] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Use parent alert function if provided, otherwise use local
  const showAlert = (message, type = 'success') => {
    if (parentShowAlert) {
      parentShowAlert(message, type);
    } else {
      setAlert({ message, type });
      // Auto dismiss after 3 seconds
      setTimeout(() => {
        setAlert(null);
      }, 3000);
    }
  };

  const handleEdit = () => {
    router.push(`/tech_vendor/dashboard/edit_product/${id}`);
  };

  const confirmDelete = () => {
    setShowConfirmDialog(true);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch('/api/delete-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, userId }),
      });

      const data = await response.json();

      if (response.ok) {
        if (onDelete) {
          onDelete(id);
        } else {
          showAlert("Your product has been successfully removed", "success");
          // Optionally refresh the page if onDelete callback isn't provided
          setTimeout(() => {
            router.refresh();
          }, 1000);
        }
      } else {
        showAlert(data.msg || 'Unable to delete product', "error");
      }
    } catch (error) {
      showAlert('Network error: Unable to delete product', "error");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleView = () => {
    router.push(`/product/${slug}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow overflow-hidden">
      {/* Alert Component */}
      {alert && (
        <Alert 
          message={alert.message} 
          type={alert.type} 
          onClose={() => setAlert(null)} 
        />
      )}

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={handleDelete}
        title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone."
        confirmText={isDeleting ? "Deleting..." : "Delete"}
        type="danger"
      />

      {/* Product Header */}
      <div className="p-5">
        {/* Product Info */}
        <div className="flex items-start space-x-4 mb-4">
          <img
            src={image || '/placeholder-product.png'}
            alt={title}
            className="w-16 h-16 rounded-lg object-cover border border-gray-200 flex-shrink-0"
            onError={(e) => {
              e.currentTarget.src = '/placeholder-product.png';
            }}
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-800 truncate">{title}</h3>
            <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={handleView}
              className="inline-flex items-center space-x-1 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              <Eye size={16} />
              <span>View Product</span>
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleEdit}
              className="p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors"
              title="Edit product"
            >
              <Edit2 size={16} />
            </button>
            
            <button
              onClick={confirmDelete}
              className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
              title="Delete product"
              disabled={isDeleting}
            >
              <Trash2 size={16} className={isDeleting ? "opacity-50" : ""} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VendorProductCard;


import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle } from 'lucide-react';

const ConfirmationDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "danger" // danger, warning, info
}) => {
  if (!isOpen) return null;

  // Determine colors based on type
  let bgColor, textColor, buttonColor, iconColor;
  
  switch (type) {
    case "danger":
      bgColor = "bg-red-50";
      textColor = "text-red-700";
      buttonColor = "bg-red-600 hover:bg-red-700 text-white";
      iconColor = "text-red-500";
      break;
    case "warning":
      bgColor = "bg-amber-50";
      textColor = "text-amber-700";
      buttonColor = "bg-amber-600 hover:bg-amber-700 text-white";
      iconColor = "text-amber-500";
      break;
    case "info":
    default:
      bgColor = "bg-blue-50";
      textColor = "text-blue-700";
      buttonColor = "bg-blue-600 hover:bg-blue-700 text-white";
      iconColor = "text-blue-500";
      break;
  }

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/30 z-[1000] flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Dialog */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className={`${bgColor} px-6 py-4 flex items-start justify-between`}>
            <div className="flex items-center gap-3">
              <AlertTriangle className={iconColor} size={20} />
              <h3 className={`text-lg font-semibold ${textColor}`}>{title}</h3>
            </div>
            <button 
              onClick={onClose}
              className="rounded-full p-1 hover:bg-white/20 transition-colors"
            >
              <X size={16} className={textColor} />
            </button>
          </div>
          
          {/* Body */}
          <div className="px-6 py-4">
            <p className="text-gray-700">{message}</p>
          </div>
          
          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
            >
              {cancelText}
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className={`px-4 py-2 rounded-lg ${buttonColor} transition-colors`}
            >
              {confirmText}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

