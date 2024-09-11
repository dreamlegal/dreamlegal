"use client";
import { ChangeEvent, useState } from 'react';
import { Textarea } from "../ui/textarea";
import { Label } from '@/components/ui/label';
import { XCircle } from "lucide-react";
import { z } from 'zod';
import { ProductInfo } from '@/store/useStore';

const PricingSchema = z.object({
    freeTrial: z.enum(["Yes", "No"], {
        required_error: "Choose this please",
    }),
    freeVersion: z.enum(["Yes", "No"], {
        required_error: "Choose this please",
    }),
    timePeriod: z.string().optional(),
    pricingModel: z.array(z.enum(["Annual Fee", "Monthly subscription", "Volume based"])).min(1, "At least one pricing model is required"),
    contractPeriod: z.string().nonempty("Minimum Contract Period is required"),
    pricingParams: z.string().nonempty("Custom Parameters are required"),
});

const units = ['months', 'days', 'years'];

const PricingForm = () => {
  const { freeTrial, setFreeTrial } = ProductInfo();
  const { freeVersion, setFreeVersion } = ProductInfo();  // Added
  const { timePeriod, setTimePeriod } = ProductInfo();
  const { pricingModel, setPricingModel } = ProductInfo();
  const { contractPeriod, setContractPeriod } = ProductInfo();
  const { pricingParams, setPricingParams } = ProductInfo();

  const [selectedFreeTrial, setSelectedFreeTrial] = useState(freeTrial || null);
  const [selectedFreeVersion, setSelectedFreeVersion] = useState(freeVersion || null);  // Added
  const [inputTimePeriod, setInputTimePeriod] = useState(timePeriod?.split(' ')[0] || '');
  const [selectedTimePeriodUnit, setSelectedTimePeriodUnit] = useState(timePeriod?.split(' ')[1] || units[0]);
  const [selectedPricingModel, setSelectedPricingModel] = useState(pricingModel);
  const [inputContractPeriod, setInputContractPeriod] = useState(contractPeriod?.split(' ')[0] || '');
  const [selectedContractPeriodUnit, setSelectedContractPeriodUnit] = useState(contractPeriod?.split(' ')[1] || units[0]);
  const [inputPricingParams, setInputPricingParams] = useState(pricingParams || '');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFreeTrialChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedFreeTrial(value);
    setFreeTrial(value);
  };

  const handleFreeVersionChange = (e: ChangeEvent<HTMLInputElement>) => {  // Added
    const value = e.target.value;
    setSelectedFreeVersion(value);
    setFreeVersion(value);
  };

  const handleTimePeriodChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputTimePeriod(e.target.value);
  };

  const handleTimePeriodUnitChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedTimePeriodUnit(e.target.value);
  };

  const handleAddTimePeriod = () => {
    setTimePeriod(inputTimePeriod ? `${inputTimePeriod} ${selectedTimePeriodUnit}` : null);
  };

  const handlePricingModelChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedPricingModel(prev => 
      prev.includes(value) 
      ? prev.filter(item => item !== value) 
      : [...prev, value]
    );
  };

  const handleContractPeriodChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputContractPeriod(e.target.value);
  };

  const handleContractPeriodUnitChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedContractPeriodUnit(e.target.value);
  };

  const handleAddContractPeriod = () => {
    setContractPeriod(inputContractPeriod ? `${inputContractPeriod} ${selectedContractPeriodUnit}` : null);
  };

  const handlePricingParamsChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputPricingParams(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = PricingSchema.safeParse({
      freeTrial: selectedFreeTrial,
      freeVersion: selectedFreeVersion,  // Added
      timePeriod: timePeriod || undefined,
      pricingModel: selectedPricingModel,
      contractPeriod: contractPeriod || undefined,
      pricingParams: inputPricingParams || undefined
    });

    if (!result.success) {
      const validationErrors: Record<string, string> = {};
      result.error.errors.forEach(error => {
        validationErrors[error.path[0]] = error.message;
      });
      setErrors(validationErrors);
      return;
    }

    setPricingParams(inputPricingParams);
    setPricingModel(selectedPricingModel);

    setErrors({});
    // Proceed with the form submission logic
    console.log('Form submitted with:', {
      freeTrial: selectedFreeTrial,
      freeVersion: selectedFreeVersion,  // Added
      timePeriod,
      pricingModel: selectedPricingModel,
      contractPeriod,
      pricingParams: inputPricingParams
    });
  };

  return (
    <form onSubmit={handleSubmit} className='w-full font-calarity'>
      <div className="flex w-100 flex-col">
        <div className="w-full mt-2">
          <Label>Free Trial</Label>
          <div className="flex items-center">
            <label className="mr-4">
              <input
                type="radio"
                name="freeTrial"
                value="Yes"
                checked={selectedFreeTrial === "Yes"}
                onChange={handleFreeTrialChange}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="freeTrial"
                value="No"
                checked={selectedFreeTrial === "No"}
                onChange={handleFreeTrialChange}
              />
              No
            </label>
          </div>
          {errors.freeTrial && <p className="text-red-500">{errors.freeTrial}</p>}
        </div>

        <div className="w-full mt-2">
          <Label>Free Version</Label>  {/* Added */}
          <div className="flex items-center">
            <label className="mr-4">
              <input
                type="radio"
                name="freeVersion"
                value="Yes"
                checked={selectedFreeVersion === "Yes"}
                onChange={handleFreeVersionChange}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="freeVersion"
                value="No"
                checked={selectedFreeVersion === "No"}
                onChange={handleFreeVersionChange}
              />
              No
            </label>
          </div>
          {errors.freeVersion && <p className="text-red-500">{errors.freeVersion}</p>}
        </div>

        <div className="w-full mt-2">
          <Label>Time Period</Label>
          <div className="flex items-center">
            <input
              type="number"
              value={inputTimePeriod}
              onChange={handleTimePeriodChange}
              className="border border-gray-300 rounded-l-lg px-3 py-2 w-24"
              placeholder="Enter value"
            />
            <select
              value={selectedTimePeriodUnit}
              onChange={handleTimePeriodUnitChange}
              className="border border-gray-300 rounded-r-lg px-3 py-2"
            >
              {units.map(unit => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>
            <button
              type="button"
              onClick={handleAddTimePeriod}
              className="ml-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
            >
              Add
            </button>
          </div>
          {errors.timePeriod && <p className="text-red-500">{errors.timePeriod}</p>}
        </div>

        <div className="w-full mt-2">
          <Label>Pricing Model</Label>
          <div className="flex flex-col">
            {["Annual Fee", "Monthly subscription", "Volume based"].map(model => (
              <label key={model} className="flex items-center mb-1">
                <input
                  type="checkbox"
                  value={model}
                  checked={selectedPricingModel.includes(model)}
                  onChange={handlePricingModelChange}
                />
                <span className="ml-2">{model}</span>
              </label>
            ))}
          </div>
          {errors.pricingModel && <p className="text-red-500">{errors.pricingModel}</p>}
        </div>

        <div className="w-full mt-2">
          <Label>Minimum Contract Period</Label>
          <div className="flex items-center">
            <input
              type="number"
              value={inputContractPeriod}
              onChange={handleContractPeriodChange}
              className="border border-gray-300 rounded-l-lg px-3 py-2 w-24"
              placeholder="Enter value"
            />
            <select
              value={selectedContractPeriodUnit}
              onChange={handleContractPeriodUnitChange}
              className="border border-gray-300 rounded-r-lg px-3 py-2"
            >
              {units.map(unit => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>
            <button
              type="button"
              onClick={handleAddContractPeriod}
              className="ml-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
            >
              Add
            </button>
          </div>
          {errors.contractPeriod && <p className="text-red-500">{errors.contractPeriod}</p>}
        </div>

        <div className="w-full mt-2">
          <Label>Custom Parameters</Label>
          <Textarea
            value={inputPricingParams}
            onChange={handlePricingParamsChange}
          />
          {errors.pricingParams && <p className="text-red-500">{errors.pricingParams}</p>}
        </div>
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default PricingForm;
