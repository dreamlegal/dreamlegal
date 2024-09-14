"use client";
import { useState } from 'react';
import { ProductInfo } from '@/store/useStore';
import { z } from 'zod';

const options = {
  demo: [
    'Self-demo',
    'Customised prototypes',
    'Guided walkthrough',
    'Video demos',
    'None'
  ],
  support: [
    'Phone',
    'Live chat',
    'Bot chat',
    'Community forum',
    'Dedicated account manager',
    'Help ticket',
    'None'
  ],
  training: [
    'Video Tutorials',
    'User Manuals',
    'On-demand Training',
    'Certification program',
    'None'
  ]
};

const units = ['MB  ', 'GB  ', 'TB  '];
const units2 = ['KB  ','MB  ', 'GB  '];

// Zod Schema for validation
const ProductSAndSSchema = z.object({
  demo: z.array(z.string()).min(1, "At least one demo option is required"),
  support: z.array(z.string()).min(1, "At least one support option is required"),
  training: z.array(z.string()).min(1, "At least one training option is required"),
  storage: z.string().nonempty("Storage value is required"),
  fileSize: z.string().nonempty("File size value is required")
});

const ProductSAndS = () => {
  // Access global state from Zustand
  const { demo, setDemo } = ProductInfo();
  const { support, setSupport } = ProductInfo();
  const { training, setTraining } = ProductInfo();
  const { storage, setStorage } = ProductInfo();
  const { fileSize, setFileSize } = ProductInfo();

  // Local state for checkboxes
  const [inputDemo, setInputDemo] = useState(demo || []);
  const [inputSupport, setInputSupport] = useState(support || []);
  const [inputTraining, setInputTraining] = useState(training || []);
  const [inputValue, setInputValue] = useState('');
  const [selectedUnit, setSelectedUnit] = useState(units[0]);
  const [inputFileSize, setInputFileSize] = useState('');
  const [selectedFileSizeUnit, setSelectedFileSizeUnit] = useState(units[0]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handle checkbox selection
  const handleCheckboxChange = (category: string, value: string) => {
    let newSelection: string[] = [];

    switch (category) {
      case 'demo':
        newSelection = inputDemo.includes(value)
          ? inputDemo.filter((item) => item !== value)
          : [...inputDemo, value];
        setInputDemo(newSelection);
        break;

      case 'support':
        newSelection = inputSupport.includes(value)
          ? inputSupport.filter((item) => item !== value)
          : [...inputSupport, value];
        setInputSupport(newSelection);
        break;

      case 'training':
        newSelection = inputTraining.includes(value)
          ? inputTraining.filter((item) => item !== value)
          : [...inputTraining, value];
        setInputTraining(newSelection);
        break;
    }
  };

  // Handle changes in the numerical input for storage
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Handle changes in the unit dropdown for storage
  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUnit(e.target.value);
  };

  // Handle changes in the file size input
  const handleFileSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputFileSize(e.target.value);
  };

  // Handle changes in the file size unit dropdown
  const handleFileSizeUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFileSizeUnit(e.target.value);
  };

  // Add storage value
  const handleAddStorage = () => {
    // Validate input
    const numericValue = parseFloat(inputValue);
    if (isNaN(numericValue) || numericValue <= 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        storage: 'Please enter a valid number.'
      }));
      return;
    }

    // Ensure only one storage value is stored
    setStorage(`${numericValue}${selectedUnit}`);
    setInputValue('');
    setSelectedUnit(units[0]);
    setErrors((prevErrors) => ({
      ...prevErrors,
      storage: ''
    }));
  };

  // Add file size value
  const handleAddFileSize = () => {
    // Validate input
    const numericValue = parseFloat(inputFileSize);
    if (isNaN(numericValue) || numericValue <= 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        fileSize: 'Please enter a valid number.'
      }));
      return;
    }

    // Ensure only one file size value is stored
    setFileSize(`${numericValue}${selectedFileSizeUnit}`);
    setInputFileSize('');
    setSelectedFileSizeUnit(units[0]);
    setErrors((prevErrors) => ({
      ...prevErrors,
      fileSize: ''
    }));
  };

  // Validate all fields
  const validateAllFields = () => {
    const result = ProductSAndSSchema.safeParse({
      demo: inputDemo,
      support: inputSupport,
      training: inputTraining,
      storage,
      fileSize
    });

    if (!result.success) {
      const validationErrors: Record<string, string> = {};
      result.error.errors.forEach((error) => {
        validationErrors[error.path[0]] = error.message;
      });
      setErrors(validationErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateAllFields()) return;

    // Save to global store
    setDemo(inputDemo);
    setSupport(inputSupport);
    setTraining(inputTraining);

    console.log('Submitted: ', {
      demo: inputDemo,
      support: inputSupport,
      training: inputTraining,
      storage,
      fileSize
    });
  };

  return (
    // <form onSubmit={handleSubmit} className="w-full  mx-auto p-4 font-calarity max-w-4xl mx-auto mt-4 ">
    //   <div className="mb-4">
    //     <h2 className="text-lg font-semibold mb-2">Demo</h2>
    //     {options.demo.map((option) => (
    //       <label key={option} className="block mb-2">
    //         <input
    //           type="checkbox"
    //           value={option}
    //           checked={inputDemo.includes(option)}
    //           onChange={() => handleCheckboxChange('demo', option)}
    //           className="mr-2"
    //         />
    //         {option}
    //       </label>
    //     ))}
    //     {errors.demo && <p className="text-red-500">{errors.demo}</p>}
    //   </div>

    //   <div className="mb-4">
    //     <h2 className="text-lg font-semibold mb-2">Support</h2>
    //     {options.support.map((option) => (
    //       <label key={option} className="block mb-2">
    //         <input
    //           type="checkbox"
    //           value={option}
    //           checked={inputSupport.includes(option)}
    //           onChange={() => handleCheckboxChange('support', option)}
    //           className="mr-2"
    //         />
    //         {option}
    //       </label>
    //     ))}
    //     {errors.support && <p className="text-red-500">{errors.support}</p>}
    //   </div>

    //   <div className="mb-4">
    //     <h2 className="text-lg font-semibold mb-2">Training</h2>
    //     {options.training.map((option) => (
    //       <label key={option} className="block mb-2">
    //         <input
    //           type="checkbox"
    //           value={option}
    //           checked={inputTraining.includes(option)}
    //           onChange={() => handleCheckboxChange('training', option)}
    //           className="mr-2"
    //         />
    //         {option}
    //       </label>
    //     ))}
    //     {errors.training && <p className="text-red-500">{errors.training}</p>}
    //   </div>

    //   <div className="mb-4">
    //     <h2 className="text-lg font-semibold mb-2">Storage</h2>
    //     <div className="flex items-center mb-2">
    //       <input
    //         type="number"
    //         value={inputValue}
    //         onChange={handleValueChange}
    //         className="border border-gray-300 rounded-l-lg px-3 py-2 w-24"
    //         placeholder="Enter value"
    //       />
    //       <select
    //         value={selectedUnit}
    //         onChange={handleUnitChange}
    //         className="border border-gray-300 rounded-r-lg px-3 py-2"
    //       >
    //         {units.map(unit => (
    //           <option key={unit} value={unit}>{unit}</option>
    //         ))}
    //       </select>
    //       <button
    //         type="button"
    //         onClick={handleAddStorage}
    //         className="ml-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
    //       >
    //         Add
    //       </button>
    //       {storage}
    //     </div>
    //     {errors.storage && <p className="text-red-500">{errors.storage}</p>
    // }
    //   </div>

    //   <div className="mb-4">
    //     <h2 className="text-lg font-semibold mb-2">File Size</h2>
    //     <div className="flex items-center mb-2">
    //       <input
    //         type="number"
    //         value={inputFileSize}
    //         onChange={handleFileSizeChange}
    //         className="border border-gray-300 rounded-l-lg px-3 py-2 w-24"
    //         placeholder="Enter value"
    //       />
    //       <select
    //         value={selectedFileSizeUnit}
    //         onChange={handleFileSizeUnitChange}
    //         className="border border-gray-300 rounded-r-lg px-3 py-2"
    //       >
    //         {units2.map(unit => (
    //           <option key={unit} value={unit}>{unit}</option>
    //         ))}
    //       </select>
    //       <button
    //         type="button"
    //         onClick={handleAddFileSize}
    //         className="ml-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
    //       >
    //         Add
    //       </button>
    //       {fileSize},

    //     </div>
    //     {errors.fileSize && <p className="text-red-500">{errors.fileSize}</p>}
    //   </div>

    //   <button
    //     type="submit"
    //     className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
    //   >
    //     Submit
    //   </button>
    // </form>

    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md font-calarity">
      {/* Demo Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-800">Demo</h2>
        <div className="space-y-2">
          {options.demo.map((option) => (
            <label key={option} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                value={option}
                checked={inputDemo.includes(option)}
                onChange={() => handleCheckboxChange('demo', option)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700">{option}</span>
            </label>
          ))}
        </div>

        
        {errors.demo && <p className="text-red-500 text-sm mt-1">{errors.demo}</p>}
      </div>

      {/* Support Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-800">Support</h2>
        <div className="space-y-2">
          {options.support.map((option) => (
            <label key={option} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                value={option}
                checked={inputSupport.includes(option)}
                onChange={() => handleCheckboxChange('support', option)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700">{option}</span>
            </label>
          ))}
        </div>
        {errors.support && <p className="text-red-500 text-sm mt-1">{errors.support}</p>}
      </div>

      {/* Training Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-800">Training</h2>
        <div className="space-y-2">
          {options.training.map((option) => (
            <label key={option} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                value={option}
                checked={inputTraining.includes(option)}
                onChange={() => handleCheckboxChange('training', option)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700">{option}</span>
            </label>
          ))}
        </div>
        {errors.training && <p className="text-red-500 text-sm mt-1">{errors.training}</p>}
      </div>

      {/* Storage Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-800">Storage</h2>
        <div className="flex flex-wrap items-center space-x-2 mb-2">
          <input
            type="number"
            value={inputValue}
            onChange={handleValueChange}
            className="border border-gray-300 rounded-lg px-3 py-2 w-24"
            placeholder="Enter value"
          />
          <select
            value={selectedUnit}
            onChange={handleUnitChange}
            className="border border-gray-300 rounded-lg px-3 py-2"
          >
            {units.map(unit => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>
          <button
            type="button"
            onClick={handleAddStorage}
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Add
          </button>
        </div>
        <div className="text-gray-700 mt-2">{storage}</div>
        {errors.storage && <p className="text-red-500 text-sm mt-1">{errors.storage}</p>}
      </div>

      {/* File Size Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-800">File Size</h2>
        <div className="flex flex-wrap items-center space-x-2 mb-2">
          <input
            type="number"
            value={inputFileSize}
            onChange={handleFileSizeChange}
            className="border border-gray-300 rounded-lg px-3 py-2 w-24"
            placeholder="Enter value"
          />
          <select
            value={selectedFileSizeUnit}
            onChange={handleFileSizeUnitChange}
            className="border border-gray-300 rounded-lg px-3 py-2"
          >
            {units2.map(unit => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>
          <button
            type="button"
            onClick={handleAddFileSize}
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Add
          </button>
        </div>
        <div className="text-gray-700 mt-2">{fileSize}</div>
        {errors.fileSize && <p className="text-red-500 text-sm mt-1">{errors.fileSize}</p>}
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Submit
      </button>
    </form>
  );
};

export default ProductSAndS;
