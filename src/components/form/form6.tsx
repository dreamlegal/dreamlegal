"use client";
import { ChangeEvent, useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { FormValues, useFormContext } from "@/context/formValueContext";
import { Switch } from "@headlessui/react";
import { useStepContext } from "@/context/formContext";

interface FormProps {
  form6Pending: boolean;
  setForm6Pending: React.Dispatch<React.SetStateAction<boolean>>;
}

function Form6({ form6Pending, setForm6Pending }: FormProps) {
  const { formValues, setFormValues } = useFormContext();
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [numPricings, setNumPricings] = useState(1);

  const { nextStep } = useStepContext();

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, type } = event.target;
    if (type === "checkbox") {
      const { value, checked } = event.target as HTMLInputElement;
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: checked
          ? [...(prevValues[name as keyof FormValues] as string[]), value]
          : (prevValues[name as keyof FormValues] as string[]).filter(
              (item) => item !== value
            ),
      }));
    } else if (type === "file") {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file && file.size <= 10 * 1024 * 1024) {
        setFormValues((prevValues) => ({
          ...prevValues,
          [name]: file,
        }));
      } else {
        // Display an error message or handle the oversized file in some way
        alert("File size exceeds the limit (10 MB)");
      }
    } else {
      const value = event.target.value;
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  const handleAddNew = () => {
    if (numPricings < 3) {
      setNumPricings((prevNumPricings) => prevNumPricings + 1);
    }
  };

  const handleRemove = (index: number) => {
    const updatedValues = { ...formValues };
    //  @ts-ignore ts(7053)
    delete updatedValues[`nameofPlan${index + 1}`];
    //  @ts-ignore ts(7053)
    delete updatedValues[`validity${index + 1}`];
    //  @ts-ignore ts(7053)
    delete updatedValues[`price${index + 1}`];
    setFormValues(updatedValues);
    setNumPricings((prevNum) => Math.max(prevNum - 1, 1)); // Ensure at least 1 pricing plan
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
    setForm6Pending(true);
    nextStep(); // Log form values
  };

  return (
    <div>
      <>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Free Trial select */}
          <div className="flex gap-4 items-center mt-2">
            {/* <div>
              <Label htmlFor="mobileAccessibility">Select Free trial</Label>
              <Select
                value={formValues.freeTrial}
                onValueChange={(value) =>
                  setFormValues((prevValues) => ({
                    ...prevValues,
                    freeTrial: value,
                  }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Free Trial" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div> */}
            <div className="mt-4">
              <div className="flex flex-col gap-4 ">
                <Label htmlFor="freeTrial">Free Trial</Label>
                <Switch
                  checked={formValues.freeTrial === "yes"}
                  onChange={(value) =>
                    setFormValues((prevValues) => ({
                      ...prevValues,
                      freeTrial: value ? "yes" : "no",
                    }))
                  }
                  className={`${
                    formValues.freeTrial === "yes"
                      ? "bg-blue-600"
                      : "bg-gray-200"
                  }
                          relative inline-flex items-center h-6 rounded-full w-11`}
                >
                  <span
                    className={`${
                      formValues.freeTrial === "yes"
                        ? "translate-x-6"
                        : "translate-x-1"
                    }
                            inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                  />
                </Switch>
              </div>
            </div>
            <div>
              <div className="flex gap-2">
                <Input
                  name="timePeriod"
                  placeholder="Time period"
                  value={formValues.timePeriod}
                  onChange={handleChange}
                />

                <Select
                  value={formValues.timePeriodUnit}
                  onValueChange={(value) =>
                    setFormValues((prevValues) => ({
                      ...prevValues,
                      timePeriodUnit: value,
                    }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="days">Days</SelectItem>
                    <SelectItem value="months">Months</SelectItem>
                    <SelectItem value="years">Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="flex gap-4  items-center mt-4">
            <Label htmlFor="freeVersion">Free Version</Label>
            <Switch
              checked={formValues.freeVersion === "yes"}
              onChange={(value) =>
                setFormValues((prevValues) => ({
                  ...prevValues,
                  freeVersion: value ? "yes" : "no",
                }))
              }
              className={`${
                formValues.freeVersion === "yes" ? "bg-blue-600" : "bg-gray-200"
              }
                          relative inline-flex items-center h-6 rounded-full w-11`}
            >
              <span
                className={`${
                  formValues.freeVersion === "yes"
                    ? "translate-x-6"
                    : "translate-x-1"
                }
                            inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
              />
            </Switch>
          </div>
          <div className="mt-2">
            <Label htmlFor="">Pricing Model</Label>
            {["Annual Fee", "Monthly subscription", "Volume based"].map(
              (item) => (
                <div key={item} className="items-top flex space-x-2 mt-2">
                  <Input
                    name="pricingModel"
                    type="checkbox"
                    value={item}
                    checked={formValues.pricingModel.includes(item)}
                    onChange={handleChange}
                    className="w-5 h-5"
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label className="text-sm font-medium leading-none">
                      {item}
                    </label>
                  </div>
                </div>
              )
            )}
          </div>

          <div className="flex gap-4 items-center mt-4">
            <Label htmlFor="fixedPricing">Fixed Pricing</Label>
            <Switch
              checked={formValues.fixedPricing === "yes"}
              onChange={(value) =>
                setFormValues((prevValues) => ({
                  ...prevValues,
                  fixedPricing: value ? "yes" : "no",
                }))
              }
              className={`${
                formValues.fixedPricing === "yes"
                  ? "bg-blue-600"
                  : "bg-gray-200"
              }
                          relative inline-flex items-center h-6 rounded-full w-11`}
            >
              <span
                className={`${
                  formValues.fixedPricing === "yes"
                    ? "translate-x-6"
                    : "translate-x-1"
                }
                            inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
              />
            </Switch>
          </div>

          <div className=" mt-2">
            <Label htmlFor="contractPeriod">Minimum Contract Period</Label>

            <div className=" flex gap-3 items-center">
              <Input
                name="contractPeriod"
                type="text"
                placeholder="Time period"
                value={formValues.contractPeriod}
                onChange={handleChange}
              />

              <Select
                value={formValues.contractUnit}
                onValueChange={(value) =>
                  setFormValues((prevValues) => ({
                    ...prevValues,
                    contractUnit: value,
                  }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="days">Days</SelectItem>
                  <SelectItem value="months">Months</SelectItem>
                  <SelectItem value="years">Years</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {formValues.fixedPricing === "yes" && (
            <div>
              {[...Array(numPricings)].map((_, index) => (
                <div key={index}>
                  <h2>Pricing {index + 1}</h2>
                  <div className="flex gap-2 items-center">
                    <Input
                      name={`nameofPlan${index + 1}`}
                      type="text"
                      placeholder="Name of plan"
                      //  @ts-ignore ts(7053)
                      value={formValues[`nameofPlan${index + 1}`] || ""}
                      onChange={handleChange}
                      required
                    />

                    <Input
                      name={`validity${index + 1}`}
                      type="text"
                      placeholder="Validity in days , month"
                      //  @ts-ignore ts(7053)
                      value={formValues[`validity${index + 1}`] || ""}
                      onChange={handleChange}
                      required
                    />

                    <Input
                      name={`price${index + 1}`}
                      type="text"
                      placeholder="Price"
                      //  @ts-ignore ts(7053)
                      value={formValues[`price${index + 1}`] || ""}
                      onChange={handleChange}
                      required
                    />

                    <Button
                      className="bg-red-600 text-white"
                      onClick={() => handleRemove(index)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
              {numPricings < 3 && (
                <Button className="bg-primary1 mt-2" onClick={handleAddNew}>
                  Add New
                </Button>
              )}
            </div>
          )}

          <div className="mt-2 flex items-start">
            <Label htmlFor="category" className="mr-2">
              Custom parameters
            </Label>

            <textarea
              name="pricingParams"
              value={formValues.pricingParams}
              onChange={handleChange}
              className="flex-1 mt-0  w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={5}
            />
          </div>

          <div className="mt-4 flex flex-col md:flex-row items-center gap-4">
            <Button type="submit" className="bg-primary1" disabled={loading}>
              {loading ? "Saving" : "Next"}
            </Button>
          </div>
        </form>
      </>
    </div>
  );
}

export default Form6;
