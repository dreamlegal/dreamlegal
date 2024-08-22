"use client";
import { ChangeEvent, useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { FormValues, useFormContext } from "@/context/formValueContext";
import { useStepContext } from "@/context/formContext";

function Form2() {
  const { formValues, setFormValues } = useFormContext();
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

    const fieldsToCheck = ['description', 'usp', 'upcomingUpdates'];

    for (const field of fieldsToCheck) {
      const value = formValues[field as keyof FormValues] as string;
      const wordCount = value.trim().split(/\s+/).length;

      if (wordCount < 10) {
        alert(`The content in ${field} should contain at least 10 words.`);
        return; 
      }
  
      if (wordCount > 50) {
        alert(`The content in ${field} should not exceed 50 words.`);
        return; // Stop form submission if any field exceeds 50 words
      }
    }
  
    nextStep(); // Log form values
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
        <div>
          {/* Description*/}
          <div className="mt-2">
            <Label className="prname">Brief description</Label>
            <Textarea
              name="description"
              placeholder="Brief description, more long content will help in rankings"
              value={formValues.description}
              onChange={handleChange}
              required
            />
          </div>
          {/* USP */}
          <div className="mt-2">
            <Label htmlFor="logo">Unique Selling Proposition</Label>
            <Textarea
              name="usp"
              value={formValues.usp}
              placeholder="Unique Selling Proposition,more long content will help in rankings"
              onChange={handleChange}
              required
            />
          </div>
          {/* Category checkboxes */}
          <div className="mt-2">
            <Label htmlFor="category">Upcoming updates</Label>
            <Textarea
              name="upcomingUpdates"
              placeholder="Upcoming updates, more long content will help in rankings"
              value={formValues.upcomingUpdates}
              onChange={handleChange}
              required
            ></Textarea>
          </div>
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

export default Form2;
