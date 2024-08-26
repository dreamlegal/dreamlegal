import { ChangeEvent, useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { FormValues, useFormContext } from "@/context/formValueContext";
import { useStepContext } from "@/context/formContext";
import { z } from "zod";

const formSchema = z.object({
  description: z.string().max(50,"max word limit 50"),
  usp: z.string().max(50,"max word limit 50"),
  upcomingUpdates: z.string().max(50,"max word limit 50"),
});

function Form2() {
  const { formValues, setFormValues } = useFormContext();
  const [loading, setLoading] = useState(false);
  const { nextStep } = useStepContext();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (name: string, value: string) => {
    const result = formSchema.safeParse({ [name]: value });
    if (!result.success) {
      return result.error.errors[0].message;
    }
    return "";
  };

  const handleChange = (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    
    const errorMessage = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission

    const validationErrors: Record<string, string> = {};
    const formValidationResult = formSchema.safeParse(formValues);

    if (!formValidationResult.success) {
      formValidationResult.error.errors.forEach((error) => {
        validationErrors[error.path[0]] = error.message;
      });
      setErrors(validationErrors);
      return; // Stop form submission if there are validation errors
    }

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
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          {/* Description*/}
          <div className="mt-2">
            <Label className="prname">Brief description</Label>
            <Textarea
              name="description"
              value={formValues.description}
              onChange={handleChange}
              required
            />
            {errors.description && <p className="text-red-500">{errors.description}</p>}
          </div>
          {/* USP */}
          <div className="mt-2">
            <Label htmlFor="logo">Unique Selling Proposition</Label>
            <Textarea
              name="usp"
              value={formValues.usp}
              onChange={handleChange}
              required
            />
            {errors.usp && <p className="text-red-500">{errors.usp}</p>}
          </div>
          {/* Category checkboxes */}
          <div className="mt-2">
            <Label htmlFor="category">Upcoming updates</Label>
            <Textarea
              name="upcomingUpdates"
              value={formValues.upcomingUpdates}
              onChange={handleChange}
              required
            />
            {errors.upcomingUpdates && <p className="text-red-500">{errors.upcomingUpdates}</p>}
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
