"use client";
import React, { useState } from "react";
import { ProductInfo } from "@/store/useStore"; // Assuming Zustand store

const useProductInfo = () => {
  const { 
    maintenance, setMaintenance, 
    reqForChange, setReqForChange, 
    training, setTraining, 
    dataMigration, setDataMigration 
  } = ProductInfo();
  
  return { maintenance, setMaintenance, reqForChange, setReqForChange, training, setTraining, dataMigration, setDataMigration };
};

const ProductOptions = () => {
  const { maintenance, setMaintenance, reqForChange, setReqForChange, training, setTraining, dataMigration, setDataMigration } = useProductInfo();
  
  const [errors, setErrors] = useState({
    maintenance: false,
    reqForChange: false,
    training: false,
    dataMigration: false,
  });

  // Function to handle form submission
  const handleSubmit = (e ) => {
    e.preventDefault();
    
    // Check if all fields are selected
    const newErrors = {
      maintenance: !maintenance,
      reqForChange: !reqForChange,
      training: !training,
      dataMigration: !dataMigration,
    };

    setErrors(newErrors);

    // Check if there are no validation errors
    const hasErrors = Object.values(newErrors).some((error) => error);
    
    if (!hasErrors) {
      // All fields are valid, proceed to the next step
      console.log("Form is valid! Proceed to the next step...");
    } else {
      console.log("Please fill all required fields.");
    }
  };

  return (
    <form className="w-full font-calarity" onSubmit={handleSubmit}>
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
        {errors.maintenance && <p className="text-red-500 text-sm">Please select a maintenance option.</p>}
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
        {errors.reqForChange && <p className="text-red-500 text-sm">Please select a request for change option.</p>}
      </div>

      {/* Training */}
      {/* Training */}
<div className="w-full mb-4">
  <label className="block mb-2">Training</label>
  {["Free", "Paid", "Not available"].map((option) => (
    <div key={option}>
      <input
        type="radio"
        name="training"
        value={option}
        checked={training === option}
        onChange={() => setTraining(option)} // Ensure this properly updates the state
      />
      <label className="ml-2">{option}</label>
    </div>
  ))}
  {/* Check for error */}
  {errors.training && <p className="text-red-500 text-sm">Please select a training option.</p>}
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
        {errors.dataMigration && <p className="text-red-500 text-sm">Please select a data migration option.</p>}
      </div>

      {/* Next Button */}
      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
      >
        Next
      </button>
    </form>
  );
};

export default ProductOptions;
