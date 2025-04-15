// "use client";
// import React, { useState } from "react";
// import { ProductInfo } from "@/store/useStore"; // Assuming Zustand store

// const useProductInfo = () => {
//   const { 
//     maintenance, setMaintenance, 
//     reqForChange, setReqForChange, 
//     trainingReq, setTrainingReq, 
//     dataMigration, setDataMigration 
//   } = ProductInfo();
  
//   return { maintenance, setMaintenance, reqForChange, setReqForChange, trainingReq, setTrainingReq, dataMigration, setDataMigration };
// };

// const  ProductPostImplementationService = () => {
//   const { maintenance, setMaintenance, reqForChange, setReqForChange, trainingReq, setTrainingReq, dataMigration, setDataMigration } = useProductInfo();
  
//   const [errors, setErrors] = useState({
//     maintenance: false,
//     reqForChange: false,
//     trainingReq: false,
//     dataMigration: false,
//   });

//   // Function to handle form submission
//   const handleSubmit = (e ) => {
//     e.preventDefault();
    
//     // Check if all fields are selected
//     const newErrors = {
//       maintenance: !maintenance,
//       reqForChange: !reqForChange,
//       trainingReq: !trainingReq,
//       dataMigration: !dataMigration,
//     };

//     setErrors(newErrors);

//     // Check if there are no validation errors
//     const hasErrors = Object.values(newErrors).some((error) => error);
    
//     if (!hasErrors) {
//       // All fields are valid, proceed to the next step
//       console.log("Form is valid! Proceed to the next step...");
//     } else {
//       console.log("Please fill all required fields.");
//     }
//   };

//   return (
//     <form className="w-full  font-calarity max-w-4xl mx-auto " onSubmit={handleSubmit}>
//          <span className="text-red-500 italic font-bold text-xs">All Fields Are Required </span>

//       {/* Maintenance */}
//       <div className="w-full mb-4">
//         <label className="block mb-2">Maintenance</label>
//         {["Free", "Paid", "Not available"].map((option) => (
//           <div key={option}>
//             <input
//               type="radio"
//               name="maintenance"
//               value={option}
//               checked={maintenance === option}
//               onChange={() => setMaintenance(option)}
//             />
//             <label className="ml-2">{option}</label>
//           </div>
//         ))}
//         {errors.maintenance && <p className="text-red-500 text-sm">Please select a maintenance option.</p>}
//       </div>

//       {/* Request for Change */}
//       <div className="w-full mb-4">
//         <label className="block mb-2">Request for Change</label>
//         {["Available", "Not available"].map((option) => (
//           <div key={option}>
//             <input
//               type="radio"
//               name="reqForChange"
//               value={option}
//               checked={reqForChange === option}
//               onChange={() => setReqForChange(option)}
//             />
//             <label className="ml-2">{option}</label>
//           </div>
//         ))}
//         {errors.reqForChange && <p className="text-red-500 text-sm">Please select a request for change option.</p>}
//       </div>

//       {/* Training */}
//       {/* Training */}
// <div className="w-full mb-4">
//   <label className="block mb-2">Training</label>
//   {["Free", "Paid", "Not available"].map((option) => (
//     <div key={option}>
//       <input
//         type="radio"
//         name="training"
//         value={option}
//         checked={trainingReq === option}
//         onChange={() => setTrainingReq(option)} // Ensure this properly updates the state
//       />
//       <label className="ml-2">{option}</label>
//     </div>
//   ))}
//   {/* Check for error */}
//   {errors.trainingReq && <p className="text-red-500 text-sm">Please select a training option.</p>}
// </div>


//       {/* Data Migration */}
//       <div className="w-full mb-4">
//         <label className="block mb-2">Data Migration</label>
//         {["Free", "Paid", "Not available"].map((option) => (
//           <div key={option}>
//             <input
//               type="radio"
//               name="dataMigration"
//               value={option}
//               checked={dataMigration === option}
//               onChange={() => setDataMigration(option)}
//             />
//             <label className="ml-2">{option}</label>
//           </div>
//         ))}
//         {errors.dataMigration && <p className="text-red-500 text-sm">Please select a data migration option.</p>}
//       </div>

//       {/* Next Button */}
    
//     </form>
//   );
// };

// export default ProductPostImplementationService;

"use client";
import React from "react";
import { ProductInfo } from "@/store/useStore"; // Assuming Zustand store

const useProductInfo = () => {
  const { 
    maintenance, setMaintenance, 
    reqForChange, setReqForChange, 
    trainingReq, setTrainingReq, 
    dataMigration, setDataMigration 
  } = ProductInfo();
  
  return { maintenance, setMaintenance, reqForChange, setReqForChange, trainingReq, setTrainingReq, dataMigration, setDataMigration };
};

const ProductPostImplementationService = () => {
  const { maintenance, setMaintenance, reqForChange, setReqForChange, trainingReq, setTrainingReq, dataMigration, setDataMigration } = useProductInfo();
  
  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Always proceed without validation
    console.log("Form submitted with:", {
      maintenance,
      reqForChange,
      trainingReq,
      dataMigration
    });
  };

  return (
    <form className="w-full font-calarity max-w-4xl mx-auto" onSubmit={handleSubmit}>
      {/* Maintenance */}
      <div className="w-full mb-4">
        <label className="block mb-2">Maintenance</label>
        {["Free", "Paid", "Not available"].map((option) => (
          <div key={option}>
            <input
              type="radio"
              name="maintenance"
              value={option}
              checked={maintenance === option}
              onChange={() => setMaintenance(option)}
            />
            <label className="ml-2">{option}</label>
          </div>
        ))}
      </div>

      {/* Request for Change */}
      <div className="w-full mb-4">
        <label className="block mb-2">Request for Change</label>
        {["Available", "Not available"].map((option) => (
          <div key={option}>
            <input
              type="radio"
              name="reqForChange"
              value={option}
              checked={reqForChange === option}
              onChange={() => setReqForChange(option)}
            />
            <label className="ml-2">{option}</label>
          </div>
        ))}
      </div>

      {/* Training */}
      <div className="w-full mb-4">
        <label className="block mb-2">Training</label>
        {["Free", "Paid", "Not available"].map((option) => (
          <div key={option}>
            <input
              type="radio"
              name="training"
              value={option}
              checked={trainingReq === option}
              onChange={() => setTrainingReq(option)}
            />
            <label className="ml-2">{option}</label>
          </div>
        ))}
      </div>

      {/* Data Migration */}
      <div className="w-full mb-4">
        <label className="block mb-2">Data Migration</label>
        {["Free", "Paid", "Not available"].map((option) => (
          <div key={option}>
            <input
              type="radio"
              name="dataMigration"
              value={option}
              checked={dataMigration === option}
              onChange={() => setDataMigration(option)}
            />
            <label className="ml-2">{option}</label>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <button 
        type="submit" 
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
      >
        Save Post Implementation Services
      </button>
    </form>
  );
};

export default ProductPostImplementationService;