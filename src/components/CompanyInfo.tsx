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

function CompanyInfo() {
  const { step, nextStep, prevStep } = useStepContext();
  const [formValues, setFormValues] = useState({
    logoimg: "",
    thumbnailimg: [],
    about: "",
    frameworks: [],
    countries: [],
    accessbility: [],
    adoptionTime: [],
    languages: [],
    usp: "",
    overview: "",
    founderVision: "",
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
      logoimg: "",
      thumbnailimg: [],
      about: "",
      frameworks: [],
      countries: [],
      accessbility: [],
      adoptionTime: [],
      languages: [],
      usp: "",
      overview: "",
      founderVision: "",
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
            <Label className="prname">Logo Image</Label>
            <Input
              name="logoimg"
              type="file"
              placeholder="Product Name"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mt-2">
            <Label className="prname">Product Thumbnail Images</Label>
            <Input
              name="thumbnailimg"
              type="file"
              multiple
              placeholder="Product Name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mt-2">
            <Label className="prname">About Product</Label>
            <Textarea
              name="about"
              placeholder="About Your product"
              onChange={handleChange}
              required
            />

            <div className="mb-20 mt-6">
              <Label className="prname">Deployement</Label>

              <DeployementInfo onFrameworksChange={handleFrameworksChange} />
              <Label className="prname">Focus Countries </Label>

              <FocusCountriesInfo onFrameworksChange={handleCountrieChange} />
              <Label className="prname">Accessibility </Label>

              <AccessibilityInfo onFrameworksChange={handleAccibilityChange} />
              <Label className="prname">Adobtion Time </Label>

              <AdoptionTimeInfo onFrameworksChange={handleTimeChange} />
              <Label className="prname">Languages </Label>

              <LanguagesInfo onFrameworksChange={handleLangChange} />
            </div>
          </div>

          <div className="mt-2">
            <Label className="prname"> Product USP</Label>
            <Textarea
              name="usp"
              placeholder="List your USP here, using (-),
              eg: - Better commutioncation, - Other usp"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mt-2">
            <Label className="prname"> Company Oview</Label>
            <Textarea
              name="overview"
              placeholder="List your Company overview here,
              "
              onChange={handleChange}
              required
            />
          </div>

          <div className="mt-2">
            <Label className="founderVision"> Founder Vision</Label>
            <Textarea
              name="founderVision"
              placeholder="List your Founder Vision
              "
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

export default CompanyInfo;
