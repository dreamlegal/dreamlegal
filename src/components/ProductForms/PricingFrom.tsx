"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { Textarea } from "../ui/textarea";
import { Label } from "@/components/ui/label";
import { XCircle } from "lucide-react";
import { z } from "zod";
import { ProductInfo } from "@/store/useStore";
import { Switch } from "../ui/switch";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface PricingField {
  id: number;
  name: string;
  validity: string;
  price: string;
}

const PricingSchema = z.object({
  freeTrial: z.enum(["Yes", "No"], {
    required_error: "Choose this please",
  }),
  freeVersion: z.enum(["Yes", "No"], {
    required_error: "Choose this please",
  }),
  timePeriod: z.string().optional(),
  pricingModel: z
    .array(z.enum(["Annual Fee", "Monthly subscription", "Volume based"]))
    .min(1, "At least one pricing model is required"),
  contractPeriod: z.string().nonempty("Minimum Contract Period is required"),
  fixedPricing: z.boolean(),
  pricingParams: z.string().optional(),
  pricingFields: z.array(
    z.object({
      name: z.string().nonempty("Name of plan is required"),
      validity: z.string().nonempty("Validity is required"),
      price: z.string().nonempty("Price is required"),
    })
  ).optional(),
}).refine(data => {
  if (data.fixedPricing) {
    return data.pricingFields && data.pricingFields.length > 0;
  } else {
    return !!data.pricingParams;
  }
}, {
  message: "Either custom parameters or fixed pricing fields are required",
  path: ["pricingParams"],
});


const units = ["months", "days", "years"];

const PricingForm = () => {
  const { freeTrial, setFreeTrial } = ProductInfo();
  const { freeVersion, setFreeVersion } = ProductInfo(); // Added
  const { timePeriod, setTimePeriod } = ProductInfo();
  const { pricingModel, setPricingModel } = ProductInfo();
  const { contractPeriod, setContractPeriod } = ProductInfo();
  const { pricingParams, setPricingParams } = ProductInfo();
  const {nameofPlan , setNameofPlan } = ProductInfo();
  const {validity, setValidity } = ProductInfo();
  const { price , setPrice } = ProductInfo();
  const {fixPricing ,setFixPricing} = ProductInfo();

  const [selectedFreeTrial, setSelectedFreeTrial] = useState(freeTrial || null);
  const [selectedFreeVersion, setSelectedFreeVersion] = useState(
    freeVersion || null
  ); // Added
  const [inputTimePeriod, setInputTimePeriod] = useState(
    timePeriod?.split(" ")[0] || ""
  );
  const [selectedTimePeriodUnit, setSelectedTimePeriodUnit] = useState(
    timePeriod?.split(" ")[1] || units[0]
  );
  const [selectedPricingModel, setSelectedPricingModel] =
    useState(pricingModel);
  const [inputContractPeriod, setInputContractPeriod] = useState(
    contractPeriod?.split(" ")[0] || ""
  );
  const [selectedContractPeriodUnit, setSelectedContractPeriodUnit] = useState(
    contractPeriod?.split(" ")[1] || units[0]
  );
  const [inputPricingParams, setInputPricingParams] = useState(
    pricingParams || ""
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFreeTrialChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedFreeTrial(value);
    setFreeTrial(value);
  };

  const handleFreeVersionChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Added
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
    setTimePeriod(
      inputTimePeriod ? `${inputTimePeriod} ${selectedTimePeriodUnit}` : null
    );
  };

  const handlePricingModelChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedPricingModel((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleContractPeriodChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputContractPeriod(e.target.value);
  };

  const handleContractPeriodUnitChange = (
    e: ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedContractPeriodUnit(e.target.value);
  };

  const handleAddContractPeriod = () => {
    setContractPeriod(
      inputContractPeriod
        ? `${inputContractPeriod} ${selectedContractPeriodUnit}`
        : null
    );
  };

  const handlePricingParamsChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputPricingParams(e.target.value);
  };


  


  const [fixedPricing, setFixedPricing] = useState(fixPricing);
  // const [pricingFields, setPricingFields] = useState<PricingField[]>([]);
  const [localPricingFields, setLocalPricingFields] = useState<PricingField[]>([]);

  useEffect(() => {
    if (fixedPricing) {
      setInputPricingParams('');
      // Initialize localPricingFields with the global state values if they exist
      if (nameofPlan.length > 0 || validity.length > 0 || price.length > 0) {
        const maxLength = Math.max(nameofPlan.length, validity.length, price.length);
        const fields: PricingField[] = [];
        for (let i = 0; i < maxLength; i++) {
          fields.push({
            id: i,
            name: nameofPlan[i] || "",
            validity: validity[i] || "",
            price: price[i] || "",
          });
        }
        setLocalPricingFields(fields);
      } else {
        // Add an empty field if there are no fields
        handleAddPricing();
      }
    } else {
      // Clear the global state when switching back to custom pricing
      setNameofPlan([]);
      setValidity([]);
      setPrice([]);
    }
  }, [fixedPricing]);

  const handleAddPricing = () => {
    const newField = { id: Date.now(), name: "", validity: "", price: "" };
    const updatedFields = [...localPricingFields, newField];
    setLocalPricingFields(updatedFields);
    updateGlobalPricingFields(updatedFields);
  };

  const handleRemovePricing = (id: number) => {
    const updatedFields = localPricingFields.filter((field) => field.id !== id);
    setLocalPricingFields(updatedFields);
    updateGlobalPricingFields(updatedFields);
  };

  const handlePricingChange = (
    id: number,
    field: keyof PricingField,
    value: string
  ) => {
    const updatedFields = localPricingFields.map((pricing) =>
      pricing.id === id ? { ...pricing, [field]: value } : pricing
    );
    setLocalPricingFields(updatedFields);
    updateGlobalPricingFields(updatedFields);
  };

  const updateGlobalPricingFields = (fields: PricingField[]) => {
    setNameofPlan(fields.map(field => field.name));
    setValidity(fields.map(field => field.validity));
    setPrice(fields.map(field => field.price));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    
    const formData = {
      freeTrial: selectedFreeTrial,
      freeVersion: selectedFreeVersion,
      timePeriod: timePeriod,
      pricingModel: selectedPricingModel,
      contractPeriod: contractPeriod,
      fixedPricing: fixedPricing,
      pricingParams: fixedPricing ? undefined : inputPricingParams,
      pricingFields: fixedPricing ? localPricingFields : undefined,
    };

    const result = PricingSchema.safeParse(formData);
    

    if (!result.success) {
      const validationErrors: Record<string, string> = {};
      result.error.errors.forEach((error) => {
        validationErrors[error.path.join('.')] = error.message;
      });
      setErrors(validationErrors);
      console.log("Validation errors:", validationErrors);
      return;
    }
    setPricingModel(selectedPricingModel)
    setPricingParams(inputPricingParams)

    setErrors({});
    console.log("Form submitted with:", result.data);
  };


  return (
    <form onSubmit={handleSubmit} className="w-full font-calarity max-w-4xl mx-auto mt-4">
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
          {errors.freeTrial && (
            <p className="text-red-500">{errors.freeTrial}</p>
          )}
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
              {units.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
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
          {errors.timePeriod && (
            <p className="text-red-500">{errors.timePeriod}</p>
          )}
        </div>


        <div className="w-full mt-2">
          <Label>Free Version</Label> {/* Added */}
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
          {errors.freeVersion && (
            <p className="text-red-500">{errors.freeVersion}</p>
          )}
        </div>

     
        <div className="w-full mt-2">
          <Label>Pricing Model</Label>
          <div className="flex flex-col">
            {["Annual Fee", "Monthly subscription", "Volume based"].map(
              (model) => (
                <label key={model} className="flex items-center mb-1">
                  <input
                    type="checkbox"
                    value={model}
                    checked={selectedPricingModel.includes(model)}
                    onChange={handlePricingModelChange}
                  />
                  <span className="ml-2">{model}</span>
                </label>
              )
            )}
          </div>
          {errors.pricingModel && (
            <p className="text-red-500">{errors.pricingModel}</p>
          )}
        </div>

        
    
        <div>
        <div className="flex items-center gap-2">
          <Label>Fixed Pricing</Label>
          <Switch checked={fixedPricing} onCheckedChange={setFixedPricing} />
        </div>
        {fixedPricing ? (
          <div className="pt-2">
            {localPricingFields.map((field, index) => (
              <div key={field.id} className="mb-4 p-4 border rounded">
                <h3 className="text-lg font-semibold mb-2">
                  Pricing {index + 1}
                </h3>
                <div className="grid gap-4">
                  <Input
                    placeholder="Name of plan"
                    value={field.name}
                    onChange={(e) =>
                      handlePricingChange(field.id, "name", e.target.value)
                    }
                  />
                  {/* <Input
                    placeholder="Validity in days, month"
                    value={field.validity}
                    onChange={(e) =>
                      handlePricingChange(
                        field.id,
                        "validity",
                        e.target.value
                      )
                    }
                  /> */}

        <select
          value={field.validity}
          onChange={(e) =>
            handlePricingChange(field.id, "validity", e.target.value)
          }
          className="border border-gray-300 rounded-lg px-3 py-2"
        >
          <option value="">Select Validity</option>
          {units.map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </select>

                  <Input
                    placeholder="Price"
                    value={field.price}
                    onChange={(e) =>
                      handlePricingChange(field.id, "price", e.target.value)
                    }
                  />
                  {localPricingFields.length > 1 && (
                    <Button
                      variant="destructive"
                      onClick={() => handleRemovePricing(field.id)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            ))}

            <Button onClick={handleAddPricing} className="w-full">
              Add New
            </Button>
          </div>
        ) : (
          <div className="w-full mt-2">
            <Label>Custom Parameters</Label>
            <Textarea
              value={inputPricingParams}
              onChange={handlePricingParamsChange}
            />
            {errors.pricingParams && (
              <p className="text-red-500">{errors.pricingParams}</p>
            )}
          </div>
        )}
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
              {units.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
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
          {errors.contractPeriod && (
            <p className="text-red-500">{errors.contractPeriod}</p>
          )}
        </div>

      

      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 mt-4"
      >
        Submit
      </button>
      </div>
    </form>
  );
};

export default PricingForm;
