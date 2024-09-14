import React, { useState, useEffect } from 'react';
import { ProductInfo } from '@/store/useStore';
import { Button } from '@/components/ui/button';

const categoryOptions = {
  'Client Relationship Management': ['Intake', 'Assessment', 'Strategize', 'Represent', 'Communication', 'Review'],
  'Governance, Risk and Compliance': ['Coverage', 'Assessment', 'Validation', 'Implementation', 'Monitoring', 'Analysis'],
  'Contract Lifecycle Management': ['Create', 'Negotiation', 'Authentication', 'Execute', 'Store', 'Tracking'],
  'E-Signature': ['Document Preparation', 'Authentication', 'Signing', 'Encryption', 'Verification', 'Distribution']
};

const OptionSelector = () => {
  const { category, setProcessLifecycle, processLifecycle } = ProductInfo();
  const [localProcessLifecycle, setLocalProcessLifecycle] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    console.log("Initial processLifecycle:", processLifecycle);
    const initialState = category.reduce((acc, cat) => {
      acc[cat] = Array.isArray(processLifecycle[cat]) ? processLifecycle[cat] : [];
      return acc;
    }, {});
    setLocalProcessLifecycle(initialState);
    console.log("Initial localProcessLifecycle:", initialState);
  }, [processLifecycle, category]);

  const handleChange = (cat, option, checked) => {
    setLocalProcessLifecycle(prevState => {
      const updatedCategory = checked
        ? [...(prevState[cat] || []), option]
        : (prevState[cat] || []).filter(item => item !== option);
      const newState = { ...prevState, [cat]: updatedCategory };
      console.log("Updated localProcessLifecycle:", newState);
      return newState;
    });
    if (errors[cat]) {
      setErrors(prevErrors => {
        const { [cat]: _, ...rest } = prevErrors;
        return rest;
      });
    }
  };

  const validateSelection = () => {
    const newErrors = {};
    let isValid = true;
    category.forEach(cat => {
      if (!localProcessLifecycle[cat] || localProcessLifecycle[cat].length === 0) {
        newErrors[cat] = `At least one option must be selected for ${cat}`;
        isValid = false;
      }
    });
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    console.log("Submit button clicked");
    console.log("Current localProcessLifecycle:", localProcessLifecycle);
    if (validateSelection()) {
      console.log("Validation passed, updating processLifecycle");
      Object.entries(localProcessLifecycle).forEach(([cat, options]) => {
        console.log(`Updating category: ${cat} with options:`, options);
        setProcessLifecycle(cat, options);
      });
      // Add a small delay before logging to allow state to update
      setTimeout(() => {
        console.log("Updated processLifecycle (after delay):", processLifecycle);
      }, 0);
    } else {
      console.log("Validation failed");
    }
  };

  return (
    <div className="space-y-4">
      {category.map((cat) => (
        <div key={cat} className="border p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2">{cat}</h2>
          <div className="grid grid-cols-2 gap-2">
            {categoryOptions[cat]?.map((option) => (
              <div key={option} className="flex items-center">
                <input
                  type="checkbox"
                  id={`${cat}-${option}`}
                  checked={localProcessLifecycle[cat]?.includes(option) || false}
                  onChange={(e) => handleChange(cat, option, e.target.checked)}
                  className="w-5 h-5 mr-2"
                />
                <label htmlFor={`${cat}-${option}`} className="cursor-pointer">
                  {option}
                </label>
              </div>
            ))}
          </div>
          {errors[cat] && (
            <p className="text-[#DC3545] pl-2 mt-2">
              {errors[cat]}
            </p>
          )}
        </div>
      ))}
      <Button onClick={handleSubmit} className="mt-4">Submit</Button>
    </div>
  );
};

export default OptionSelector;