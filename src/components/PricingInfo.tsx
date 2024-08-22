import { useState } from "react";
import { Button } from "./ui/button";
import { useStepContext } from "@/context/formContext";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

import { CustomerSegInfo } from "./CustomerSeg";
import { PracticeAreaInfo } from "./PracticeArea";
import { IndustriesInfo } from "./Industries";
import { FeatureDocumentation } from "./FeatureDocumnetation";
import { PricingParameter } from "./PricingParameter";

function PricingInfo() {
  const { step, nextStep, prevStep } = useStepContext();

  const [formValues, setFormValues] = useState({
    type: "",
    period: "",
    pricingType: "",
    parameter: [],
    pricing1H: "",
    pricing2H: "",
    pricing3H: "",
    pricing1P: "",
    pricing2P: "",
    pricing3P: "",
    pricing1F: [],
    pricing2F: [],
    pricing3F: [],
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
      type: "",
      period: "",
      pricingType: "",
      parameter: [],
      pricing1H: "",
      pricing2H: "",
      pricing3H: "",
      pricing1P: "",
      pricing2P: "",
      pricing3P: "",
      pricing1F: [],
      pricing2F: [],
      pricing3F: [],
    });
  };

  const handleCustomerChange = (frameworks: any) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      parameter: frameworks,
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
            <div className="mb mt-6">
              <div className="mt-2">
                <Label className="prname"> Product USP</Label>
                <Input
                  name="type"
                  placeholder="Type of Pricing: Free,Paid,Subscription"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mt-2">
                <Label className="prname"> Type</Label>
                <Input
                  name="type"
                  placeholder="Type of Pricing: Free,Paid,Subscription"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mt-2">
                <Label className="prname"> Time Period</Label>
                <Input
                  name="period"
                  placeholder="3 months, 6 months, etc"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mt-2">
                <Label className="prname"> Payment Model</Label>
                <Input
                  name="pricingType"
                  placeholder="3 months, 6 months, etc"
                  onChange={handleChange}
                  required
                />
              </div>
              <Label className="prname">Pricing Parameter</Label>
              <PricingParameter onFrameworksChange={handleCustomerChange} />
            </div>
          </div>
          <hr className="my-4" />
          <div>
            <h3 className=" text-lg"> Pricing 1 </h3>
            <div className="mt-2">
              <Label className="prname"> Pricing Model Heading</Label>
              <Input
                name="pricing1H"
                placeholder="Basic Plan"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mt-2">
              <Label className="prname"> Pricing Rates</Label>
              <Input
                name="pricing1H"
                placeholder="$123"
                onChange={handleChange}
                required
              />
            </div>
            <div className=" mb-20">
              <Label className="prname">Features</Label>
              <PricingParameter onFrameworksChange={handleCustomerChange} />
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

export default PricingInfo;
