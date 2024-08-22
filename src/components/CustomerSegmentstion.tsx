import { useState } from "react";
import { Button } from "./ui/button";
import { useStepContext } from "@/context/formContext";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { DeployementInfo } from "./DeployementInfo";
import { FocusCountriesInfo } from "./FocusCountriesInfo";
import { AccessibilityInfo } from "./AccessbilityInfo";
import { AdoptionTimeInfo } from "./AdoptionTime";
import { LanguagesInfo } from "./LanguagesInfo";
import { CustomerSegInfo } from "./CustomerSeg";
import { PracticeAreaInfo } from "./PracticeArea";
import { IndustriesInfo } from "./Industries";

function CustomerSegmentation() {
  const { step, nextStep, prevStep } = useStepContext();
  const [create, setCreate] = useState(false);
  const [negotiate, setNegotiate] = useState(false);
  const [authenticate, setAuthenticate] = useState(false);
  const [exec, setExec] = useState(false);
  const [renew, setRenew] = useState(false);
  const [moniter, setMoniter] = useState(false);
  const [formValues, setFormValues] = useState({
    customerSegment: [],
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
      customerSegment: [],
      practiceArea: [],
      indutries: [],
    });
  };

  const handleCustomerChange = (frameworks: any) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      customerSegment: frameworks,
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

  const handleCraeteCheckboxChange = (e: any) => {
    setCreate(e.target.checked);

    console.log("Checkbox checked:", e.target.checked);
  };

  const handleNegotiateCheckboxChange = (e: any) => {
    setNegotiate(e.target.checked);

    console.log("Checkbox checked:", e.target.checked);
  };

  const handleAuthCheckboxChange = (e: any) => {
    setAuthenticate(e.target.checked);

    console.log("Checkbox checked:", e.target.checked);
  };

  const handleExcutionCheckboxChange = (e: any) => {
    setExec(e.target.checked);

    console.log("Checkbox checked:", e.target.checked);
  };

  const handleRenewCheckboxChange = (e: any) => {
    setRenew(e.target.checked);

    console.log("Checkbox checked:", e.target.checked);
  };

  const handleMoniterCheckboxChange = (e: any) => {
    setMoniter(e.target.checked);

    console.log("Checkbox checked:", e.target.checked);
  };

  return (
    <div>
      <div className="my-4 font-clarity">
        <form onSubmit={handleSubmit}>
          <div className="mt-2">
            <div className="mb-10 mt-6">
              <Label className="prname">Customer Segments</Label>

              <CustomerSegInfo onFrameworksChange={handleCustomerChange} />
              <Label className="prname">Pratice Area </Label>

              <PracticeAreaInfo onFrameworksChange={handleAreaChange} />
              <Label className="prname">Industries </Label>

              <IndustriesInfo onFrameworksChange={handleIndustrieChange} />
            </div>
          </div>

          <div className=" flex flex-col gap-4">
            <div className="items-top flex space-x-2 mt-2">
              <Input
                type="checkbox"
                className=" w-5 h-5"
                checked={create}
                onChange={handleCraeteCheckboxChange}
              ></Input>

              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="business"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Create
                </label>
                <p className="text-sm text-muted-foreground">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            </div>

            <div className="items-top flex space-x-2 mt-2">
              <Input
                type="checkbox"
                className=" w-5 h-5"
                checked={negotiate}
                onChange={handleNegotiateCheckboxChange}
              ></Input>

              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="business"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Negotiate
                </label>
                <p className="text-sm text-muted-foreground">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            </div>

            <div className="items-top flex space-x-2 mt-2">
              <Input
                type="checkbox"
                className=" w-5 h-5"
                checked={authenticate}
                onChange={handleAuthCheckboxChange}
              ></Input>

              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="business"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Authenticate
                </label>
                <p className="text-sm text-muted-foreground">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            </div>

            <div className="items-top flex space-x-2 mt-2">
              <Input
                type="checkbox"
                className=" w-5 h-5"
                checked={exec}
                onChange={handleExcutionCheckboxChange}
              ></Input>

              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="business"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Execution
                </label>
                <p className="text-sm text-muted-foreground">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            </div>

            <div className="items-top flex space-x-2 mt-2">
              <Input
                type="checkbox"
                className=" w-5 h-5"
                checked={renew}
                onChange={handleRenewCheckboxChange}
              ></Input>

              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="business"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Renew
                </label>
                <p className="text-sm text-muted-foreground">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            </div>

            <div className="items-top flex space-x-2 mt-2">
              <Input
                type="checkbox"
                className=" w-5 h-5"
                checked={moniter}
                onChange={handleMoniterCheckboxChange}
              ></Input>

              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="business"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Moniter
                </label>
                <p className="text-sm text-muted-foreground">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
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

export default CustomerSegmentation;
