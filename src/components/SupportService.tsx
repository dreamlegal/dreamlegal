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

function SupportService() {
  const { step, nextStep, prevStep } = useStepContext();
  const [formValues, setFormValues] = useState({
    selfDemo: "",
    customPrototype: "",
    walkthrough: "",
    videoDemo: "",
    phoneCall: "",
    liveChat: "",
    botChat: "",
    communityForum: "",
    accountManager: "",
    helpTicket: "",
    videoTutorial: "",
    userManual: "",
    onDemandTraining: "",
    certification: "",
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
      selfDemo: "",
      customPrototype: "",
      walkthrough: "",
      videoDemo: "",
      phoneCall: "",
      liveChat: "",
      botChat: "",
      communityForum: "",
      accountManager: "",
      helpTicket: "",
      videoTutorial: "",
      userManual: "",
      onDemandTraining: "",
      certification: "",
    });
  };

  const handleFrameworksChange = (frameworks: any) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      frameworks: frameworks,
    }));
  };

  const handleCountrieChange = (frameworks: any) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      countries: frameworks,
    }));
  };

  const handleAccibilityChange = (frameworks: any) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      accessbility: frameworks,
    }));
  };

  const handleTimeChange = (frameworks: any) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      adoptionTime: frameworks,
    }));
  };

  const handleLangChange = (frameworks: any) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      languages: frameworks,
    }));
  };
  return (
    <div>
      <div className="my-4 font-clarity">
        <form onSubmit={handleSubmit}>
          <div className="mt-2">
            <Label className="prname">Self Demo</Label>
            <Input
              name="selfDemo"
              type="text"
              placeholder="About Your product"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mt-2">
            <Label className="prname">Custom Prototype</Label>
            <Input
              name="customPrototype"
              type="text"
              placeholder="Custom Prototype"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mt-2">
            <Label className="prname">Walkthrough</Label>
            <Input
              name="walkthrough"
              type="text"
              placeholder="Walkthrough"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mt-2">
            <Label className="prname">Video Demo</Label>
            <Input
              name="videoDemo"
              type="text"
              placeholder="Video Demo"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mt-2">
            <Label className="prname">Phone Call</Label>
            <Input
              name="phoneCall"
              type="text"
              placeholder="Phone Call"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mt-2">
            <Label className="prname">Live Chat</Label>
            <Input
              name="liveChat"
              type="text"
              placeholder="Live Chat"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mt-2">
            <Label className="prname">Bot Chat</Label>
            <Input
              name="botChat"
              type="text"
              placeholder="Bot Chat"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mt-2">
            <Label className="prname">Community Forum</Label>
            <Input
              name="communityForum"
              type="text"
              placeholder="Community Forum"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mt-2">
            <Label className="prname">Account Manager</Label>
            <Input
              name="accountManager"
              type="text"
              placeholder="Account Manager"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mt-2">
            <Label className="prname">Help Ticket</Label>
            <Input
              name="helpTicket"
              type="text"
              placeholder="Help Ticket"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mt-2">
            <Label className="prname">Video Tutorial</Label>
            <Input
              name="videoTutorial"
              type="text"
              placeholder="Video Tutorial"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mt-2">
            <Label className="prname">User Manual</Label>
            <Input
              name="userManual"
              type="text"
              placeholder="User Manual"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mt-2">
            <Label className="prname">On Demand Training</Label>
            <Input
              name="onDemandTraining"
              type="text"
              placeholder="On Demand Training"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mt-2">
            <Label className="prname">Certification</Label>
            <Input
              name="certification"
              type="text"
              placeholder="Certification"
              onChange={handleChange}
              required
            />
          </div>
          <div className=" flex gap-4 items-center mt-4 ">
            {step > 1 && (
              <Button onClick={prevStep} className="mr-2">
                Previous
              </Button>
            )}

            <Button onClick={nextStep} className="bg-primary1">
              Save & Continue
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SupportService;
