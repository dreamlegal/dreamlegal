"use client";
import { ChangeEvent, useState } from 'react';
import { Textarea } from "../ui/textarea";
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { XCircle } from "lucide-react";
import { z } from 'zod';
import { ProductInfo } from '@/store/useStore';

const wordCount = (value: string, maxWords: number): boolean => {
  return value.split(/\s+/).length <= maxWords;
};

const ProductOverviewSchema = z.object({
  description: z.string().nonempty("Description is required").refine(value => wordCount(value, 50), {
    message: "max word limit 50",
  }),
  usp: z.string().nonempty("USP is required").refine(value => wordCount(value, 50), {
    message: "max word limit 50",
  }),
  upcomingUpdates: z.string().nonempty("Updates is required").refine(value => wordCount(value, 50), {
    message: "max word limit 50",
  })
});

const ProductOverview = () => {
  const { description, setDescription } = ProductInfo();
  const { usp, setUSP } = ProductInfo();
  const { upcomingUpdates, setUpcomingUpdates } = ProductInfo();

  const [inputDescription, setInputDescription] = useState(description);
  const [inputUSP, setInputUSP] = useState(usp);
  const [inputUpdates, setInputUpdates] = useState(upcomingUpdates);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [successMessage, setSuccessMessage] = useState("");

  // Function to validate all fields
  const validateAllFields = () => {
    const result = ProductOverviewSchema.safeParse({
      description: inputDescription,
      usp: inputUSP,
      upcomingUpdates: inputUpdates,
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

  // Handle change events and update state
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    switch (name) {
      case 'description':
        setInputDescription(value);
        break;
      case 'usp':
        setInputUSP(value);
        break;
      case 'upcomingUpdates':
        setInputUpdates(value);
        break;
    }

    // Validate field individually on change
    const errorMessage = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  // Validate a single field
  const validateField = (name: string, value: string) => {
    const tempValues = {
      description: name === 'description' ? value : inputDescription,
      usp: name === 'usp' ? value : inputUSP,
      upcomingUpdates: name === 'upcomingUpdates' ? value : inputUpdates,
    };

    const result = ProductOverviewSchema.safeParse(tempValues);

    if (!result.success) {
      const error = result.error.errors.find(err => err.path[0] === name);
      return error ? error.message : "";
    }
    return "";
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateAllFields()) {
      return; // Stop form submission if there are validation errors
      setSuccessMessage("");
    }

    // Set the validated values to state
    setDescription(inputDescription);
    setUSP(inputUSP);
    setUpcomingUpdates(inputUpdates);
    setSuccessMessage("All fields are valid. You can move ahead.");

    // Proceed with the form submission logic
    console.log('Form submitted with:', {
      description: inputDescription,
      usp: inputUSP,
      upcomingUpdates: inputUpdates,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className='w-full font-calarity'>
        <div className="flex w-100 flex-col">
          <div className="w-full mt-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              name="description"
              value={inputDescription}
              onChange={handleChange}
              required
            />
            {errors.description &&  
              <div className="w-full bg-[#F8D7DA] mt-3 p-2 rounded-lg flex"> 
                <XCircle className="w-6 h-6 text-red-500" />
                <p className="text-[#DC3545] pl-2">{errors.description}</p>
              </div>
            }
          </div>
          <div className="w-full mt-2">
            <Label htmlFor="usp">Unique Selling Proposition (USP)</Label>
            <Textarea
              name="usp"
              value={inputUSP}
              onChange={handleChange}
              required
            />
            {errors.usp &&  
              <div className="w-full bg-[#F8D7DA] mt-3 p-2 rounded-lg flex"> 
                <XCircle className="w-6 h-6 text-red-500" />
                <p className="text-[#DC3545] pl-2">{errors.usp}</p>
              </div>
            }
          </div>
          <div className="w-full mt-2">
            <Label htmlFor="upcomingUpdates">Upcoming Updates</Label>
            <Textarea
              name="upcomingUpdates"
              value={inputUpdates}
              onChange={handleChange}
            />
            {errors.upcomingUpdates &&  
              <div className="w-full bg-[#F8D7DA] mt-3 p-2 rounded-lg flex"> 
                <XCircle className="w-6 h-6 text-red-500" />
                <p className="text-[#DC3545] pl-2">{errors.upcomingUpdates}</p>
              </div>
            }
          </div>
        </div>
        {successMessage &&  
              <div className="w-full bg-[#90ee90 ] mt-3 p-2 rounded-lg flex"> 
                <XCircle className="w-6 h-6 text-red-500" />
                <p className="text-[#50a092] pl-2">{successMessage}</p>
              </div>
            }
        <Button type='submit' className='mt-2 bg-primary1'>Submit</Button>
      </form>
    </>
  );
};

export default ProductOverview;