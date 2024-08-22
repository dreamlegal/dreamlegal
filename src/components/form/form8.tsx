"use client";
import { FormValues, useFormContext } from "@/context/formValueContext";
import { ChangeEvent, useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useStepContext } from "@/context/formContext";

function Form8() {
  const { formValues, setFormValues } = useFormContext();
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
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
    } else if (type === "radio") {
      const { value } = event.target as HTMLInputElement;
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    } else {
      const value = event.target.value;
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
    nextStep(); // Log form values
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <h3 className="mt-2 text-gray-900 font-semibold mb-2">Maintenance</h3>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("maintenance", value)}
            defaultValue="not-available"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="free" id="free" />
              <Label htmlFor="free">Free</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="paid" id="paid" />
              <Label htmlFor="paid">Paid</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="not-available" id="option-two" />
              <Label htmlFor="not-available">Not available</Label>
            </div>
          </RadioGroup>

          
        </div>

        <div>
          <h3  className="mt-2 text-gray-900 font-semibold mb-2">Request for change  </h3>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("reqForChange", value)}
            defaultValue="not-available"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="available" id="available" />
              <Label htmlFor="available">Available</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="not-available" id="not-available" />
              <Label htmlFor="not-available">Not available</Label>
            </div>
          </RadioGroup>

       
        </div>

        <div>
          <h3  className="mt-2 text-gray-900 font-semibold mb-2">Training</h3>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("trainingReq", value)}
            defaultValue="not-available"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="free" id="free" />
              <Label htmlFor="free">Free</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="paid" id="paid" />
              <Label htmlFor="paid">Paid</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="not-available" id="not-available" />
              <Label htmlFor="not-available">Not available</Label>
            </div>
          </RadioGroup>

       
        </div>

        <div>
          <h3  className="mt-2 text-gray-900 font-semibold mb-2">Data Migration</h3>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("dataMigration", value)}
            defaultValue="not-available"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="free" id="free" />
              <Label htmlFor="free">Free</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="paid" id="paid" />
              <Label htmlFor="paid">Paid</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="not-available" id="not-available" />
              <Label htmlFor="not-available">Not available</Label>
            </div>
          </RadioGroup>

          {/* <Textarea
            name="dataMigrationNote"
            placeholder="  Note optional"
            value={formValues.dataMigrationNote}
            onChange={handleChange}
          ></Textarea> */}
        </div>
        <div className="mt-4 flex flex-col md:flex-row items-center gap-4">
          <Button type="submit" className="bg-primary1" disabled={loading}>
            {loading ? "Saving" : "Next"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Form8;
