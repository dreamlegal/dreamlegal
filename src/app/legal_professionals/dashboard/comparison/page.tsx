// // "use client"
// // import React, { useState } from 'react';
// // import CompactEvaluationForm from '../../_components/CompactEvaluationForm';
// // import ProductDetailsView from '../../_components/ProductDetailsView';


// // const LegalTechSelector = () => {
// //   const [selectedProduct, setSelectedProduct] = useState(null);
  
// //   return (
// //     <div className="min-h-screen bg-gray-50 overflow-y-auto">
// //       <header className="bg-white shadow-sm border-b border-gray-100">
// //         <div className="max-w-5xl mx-auto py-3 px-4">
// //           <h1 className="text-lg font-bold text-gray-800">Legal Tech Evaluator</h1>
// //           <p className="text-xs text-gray-500">Find the perfect legal technology solution for your team</p>
// //         </div>
// //       </header>
      
// //       <main className="max-w-5xl mx-auto py-4">
// //         {/* The form container with height limit */}
// //         <div className="bg-white shadow-sm rounded-lg border border-gray-100 overflow-auto" style={{ maxHeight: 'calc(100vh - 100px)' }}>
// //           <CompactEvaluationForm 
// //             onSelectProduct={setSelectedProduct}
// //           />
// //         </div>
// //       </main>
      
// //       {/* Product details modal */}
// //       {selectedProduct && (
// //         <ProductDetailsView 
// //           product={selectedProduct} 
// //           onClose={() => setSelectedProduct(null)} 
// //         />
// //       )}
// //     </div>
// //   );
// // };
// // export default   LegalTechSelector;
// "use client"
// import React, { useState } from 'react';
// import CompactEvaluationForm from '../../_components/CompactEvaluationForm';
// import ProductDetailsView from '../../_components/ProductDetailsView';

// const LegalTechSelector = () => {
//   const [selectedProduct, setSelectedProduct] = useState(null);
  
//   return (
//     <div className="min-h-screen bg-gray-50 overflow-y-auto">
//       <header className="bg-white shadow-sm border-b border-gray-100">
//         <div className="w-full px-6 py-3">
//           <h1 className="text-lg font-bold text-gray-800">Legal Tech Evaluator</h1>
//           <p className="text-xs text-gray-500">Find the perfect legal technology solution for your team</p>
//         </div>
//       </header>
      
//       <main className="w-full py-4 px-6">
//         {/* The form container with height limit */}
//         <div className="bg-white shadow-sm rounded-lg border border-gray-100 overflow-auto" style={{ maxHeight: 'calc(100vh - 100px)' }}>
//           <CompactEvaluationForm 
//             onSelectProduct={setSelectedProduct}
//           />
//         </div>
//       </main>
      
//       {/* Product details modal */}
//       {selectedProduct && (
//         <ProductDetailsView 
//           product={selectedProduct} 
//           onClose={() => setSelectedProduct(null)} 
//         />
//       )}
//     </div>
//   );
// };

// export default LegalTechSelector;
"use client"
import React, { useState } from 'react';
import CompactEvaluationForm from '../../_components/CompactEvaluationForm';
import ProductDetailsView from '../../_components/ProductDetailsView';

const LegalTechSelector = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  return (
    <div className="min-h-screen bg-gray-50 overflow-y-auto">
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="w-full px-6 py-3">
          <h1 className="text-lg font-bold text-gray-800">Legal Tech Evaluator</h1>
          <p className="text-xs text-gray-500">Find the perfect legal technology solution for your team</p>
        </div>
      </header>
      
      <main className="w-full py-4 px-6">
        {/* The form container with height limit */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-100 overflow-auto" style={{ maxHeight: 'calc(100vh - 100px)' }}>
          <CompactEvaluationForm 
            onSelectProduct={setSelectedProduct}
          />
        </div>
      </main>
      
      {/* Product details modal */}
      {selectedProduct && (
        <ProductDetailsView 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
};

export default LegalTechSelector;