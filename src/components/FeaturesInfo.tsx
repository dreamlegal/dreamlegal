import { useState } from "react";
import { Button } from "./ui/button";
import { useStepContext } from "@/context/formContext";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

import { CustomerSegInfo } from "./CustomerSeg";
import { PracticeAreaInfo } from "./PracticeArea";
import { IndustriesInfo } from "./Industries";
import { FeatureDocumentation } from "./FeatureDocumnetation";

function FeaturesInfo() {
  const { step, nextStep, prevStep } = useStepContext();

  const [formValues, setFormValues] = useState({
    documentation: [],
    practiceArea: [],
    indutries: [],
  });

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: files ? Array.from(files) : value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(formValues);
    // You can perform further actions, such as sending the data to a server
    // Reset the form values if needed
    setFormValues({
      documentation: [],
      practiceArea: [],
      indutries: [],
    });
  };

  const handleCustomerChange = (frameworks: any) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      documentation: frameworks,
    }));
  };

  const handleAreaChange = (frameworks: any) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      practiceArea: frameworks,
    }));
  };

  const handleIndustrieChange = (frameworks: any) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      indutries: frameworks,
    }));
  };

  return (
    <div>
      <div className="my-4 font-clarity">
        <form onSubmit={handleSubmit}>
          <div className="mt-2">
            <div className="mb-20 mt-6">
              <Label className="prname">Documentation Features</Label>

              <FeatureDocumentation onFrameworksChange={handleCustomerChange} />
            </div>
          </div>

          <div className=" flex gap-4 items-center mt-4 ">
            {step > 1 && (
              <Button onClick={prevStep} className="mr-2">
                Previous
              </Button>
            )}

            <Button onClick={nextStep} className=" bg-primary1 ">
              Save & Continue
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FeaturesInfo;
