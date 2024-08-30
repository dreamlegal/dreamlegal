"use client";
import { ChangeEvent, useState } from "react";

import { Input } from "../ui/input";
import { FormValues, useFormContext } from "@/context/formValueContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "../ui/multiselect";
import { Label } from "../ui/label";
import { useStepContext } from "@/context/formContext";

function Form3() {
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

  const handleUserCategoriesChange = (selectedCategories: string[]) => {
    setFormValues((prevValues) => {
      const newUserCategoryPercentage = new Array(
        selectedCategories.length
      ).fill(0);
      const totalPercentage = 100;
      const percentagePerCategory = Math.floor(
        totalPercentage / selectedCategories.length
      );
      selectedCategories.forEach((_, index) => {
        newUserCategoryPercentage[index] = percentagePerCategory;
      });
      return {
        ...prevValues,
        userCategory: selectedCategories,
        userCategoryPercentage: newUserCategoryPercentage,
      };
    });
  };

  const handleIndustriesChange = (selectedCategories: string[]) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      industry: selectedCategories,
    }));
  };

  const handlePracticeAreaChange = (selectedCategories: string[]) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      practiceAreas: selectedCategories,
    }));
  };

  const handleTeamsizeChange = (selectedCategories: string[]) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      teamSize: selectedCategories,
    }));
  };

  const handleSliderChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const index = parseInt(event.target.getAttribute("data-index") || "0", 10);

    setFormValues((prevValues) => {
      const userCategoryPercentage = [...prevValues.userCategoryPercentage];
      const totalOtherPercentages = userCategoryPercentage.reduce(
        (acc, curr, idx) => (idx !== index ? acc + curr : acc),
        0
      );

      // Calculate remaining percentage available for this slider
      const remainingPercentage = 100 - totalOtherPercentages;
      const newValue = Math.min(parseInt(value), remainingPercentage);

      userCategoryPercentage[index] = newValue;
      return { ...prevValues, userCategoryPercentage };
    });
  };

  const handleIndustrySliderChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const index = parseInt(event.target.getAttribute("data-index") || "0", 10);

    setFormValues((prevValues) => {
      const industryPercentage = [...prevValues.industryPercentage];
      const totalOtherPercentages = industryPercentage.reduce(
        (acc, curr, idx) => (idx !== index ? acc + curr : acc),
        0
      );

      // Calculate remaining percentage available for this slider
      const remainingPercentage = 100 - totalOtherPercentages;
      const newValue = Math.min(parseInt(value), remainingPercentage);

      industryPercentage[index] = newValue;
      return { ...prevValues, industryPercentage };
    });
  };

  const handleLawSliderChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const index = parseInt(event.target.getAttribute("data-index") || "0", 10);

    setFormValues((prevValues) => {
      const practiceAreasPercentage = [...prevValues.practiceAreasPercentage];
      const totalOtherPercentages = practiceAreasPercentage.reduce(
        (acc, curr, idx) => (idx !== index ? acc + curr : acc),
        0
      );

      // Calculate remaining percentage available for this slider
      const remainingPercentage = 100 - totalOtherPercentages;
      const newValue = Math.min(parseInt(value), remainingPercentage);

      practiceAreasPercentage[index] = newValue;
      return { ...prevValues, practiceAreasPercentage };
    });
  };

  const handleTeamSizeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const index = parseInt(event.target.getAttribute("data-index") || "0", 10);

    setFormValues((prevValues) => {
      const teamSizePercentage = [...prevValues.teamSizePercentage];
      const totalOtherPercentages = teamSizePercentage.reduce(
        (acc, curr, idx) => (idx !== index ? acc + curr : acc),
        0
      );

      // Calculate remaining percentage available for this slider
      const remainingPercentage = 100 - totalOtherPercentages;
      const newValue = Math.min(parseInt(value), remainingPercentage);

      teamSizePercentage[index] = newValue;
      return { ...prevValues, teamSizePercentage };
    });
  };

  const userCategories = [
    "Individual Practitioner",
    "Law firms",
    "Government departments",
    "Startups",
    "Enterprises",
    "Judiciary",
    "In-House Counsels"
  ];

  const Industries = [
    "Neutral",
    "Accounting firms",
    "Agriculture",
    "Banking and Finance",
    "Construction and Engineering",
    "Consulting firms",
    "Education",
    "Energy and Utilities",
    "Government and Public Sector",
    "Healthcare",
    "Hospitality and Tourism",
    "Insurance",
    "Legal Services Providers",
    "Manufacturing",
    "Media and Entertainment",
    "Non-Profit Organizations",
    "Pharmaceutical and Life Sciences",
    "Real Estate",
    "Retail and Consumer Goods",
    "Technology and Software",
    "Telecommunications",
    "Transportation and Logistics",
  ];

  const practiseArea = [
    "Appellate Law",
    "Antitrust Law",
    "Alternative Dispute Resolution",
    "Aviation",
    "Banking & Finance",
    "Business Law",
    "Civil Law",
    "Company",
    "Contract",
    "Consumer Protection",
    "Competition/Anti-Trust Law",
    "Construction",
    "Corporate Law",
    "Cybersecurity and Privacy Law",
    "Mergers and Acquisitions (M&A)",
    "Defense Law",
    "Dispute Resolution",
    "Election Law",
    "Education Law",
    "Energy and Natural Resources",
    "Environmental Law",
    "Labour and Employment Law",
    "Franchise Law",
    "Foreign Exchange Law",
    "Family and Succession",
    "Food and Drug Law",
    "Gaming Law",
    "Human Rights Law",
    "Healthcare",
    "International Law",
    "Immigration Law",
    "Infrastructure",
    "Insolvency and Banking",
    "Insurance",
    "Information Technology",
    "Intellectual Property Law",
    "Investment Law",
    "International Trade and Customs Law",
    "Management of Litigation",
    "Manufacturing in India",
    "Metals and Mining",
    "Technology Law",
    "Tax Law",
    "Telecommunication Law",
    "Personal Injury Law",
    "Product Liability",
    "Pharma and Life Sciences",
    "Public Interest Law",
    "Public Finance Law",
    "Railways",
    "Real Estate/Property Law",
    "Social Security and Disability Law",
    "Securities Law",
    "Sports, Media, Entertainment and Advertising",
    "Shipping",
    "Tax-Exempt Organizations Law",
    "Transportation Law",
    "Trade and commerce",
    "Trust",
    "Other",
  ];

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
    nextStep(); // Log form values
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
        <div>
          {/* user categories*/}

          <div className="mt-2">
            <Label htmlFor="userCategories">Select User Categories</Label>

            <MultiSelector
              values={formValues.userCategory}
              onValuesChange={handleUserCategoriesChange}
            >
              <MultiSelectorTrigger>
                <MultiSelectorInput placeholder="Select user categories" />
              </MultiSelectorTrigger>
              <MultiSelectorContent>
                <MultiSelectorList>
                  {userCategories.map((language) => (
                    <MultiSelectorItem key={language} value={language}>
                      {language}
                    </MultiSelectorItem>
                  ))}
                </MultiSelectorList>
              </MultiSelectorContent>
            </MultiSelector>
          </div>
          {formValues.userCategory.length > 0 && (
            <div>
              <span className="text-gray-600 italic text-sm">
                Mention the distibution for the selected options
              </span>
              {formValues.userCategory.map((category, index) => (
                <div key={category} className="mt-4">
                  <div className="inline-flex gap-5 items-center">
                    <Label htmlFor={`slider_${index}`}>{category}</Label>
                    <output className="text-sm text-gray-900 font-bold">
                      {formValues.userCategoryPercentage[index]} %
                    </output>
                  </div>
                  <Input
                    name="userCategoryPercentage"
                    type="range"
                    className="w-full bg-transparent cursor-pointer appearance-none disabled:opacity-50 disabled:pointer-events-none focus:outline-none
  [&::-webkit-slider-thumb]:w-2.5
  [&::-webkit-slider-thumb]:h-2.5
  [&::-webkit-slider-thumb]:-mt-0.5
  [&::-webkit-slider-thumb]:appearance-none
  [&::-webkit-slider-thumb]:bg-white
  [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(37,99,235,1)]
  [&::-webkit-slider-thumb]:rounded-full
  [&::-webkit-slider-thumb]:transition-all
  [&::-webkit-slider-thumb]:duration-150
  [&::-webkit-slider-thumb]:ease-in-out
  [&::-webkit-slider-thumb]:dark:bg-neutral-700

  [&::-moz-range-thumb]:w-2.5
  [&::-moz-range-thumb]:h-2.5
  [&::-moz-range-thumb]:appearance-none
  [&::-moz-range-thumb]:bg-white
  [&::-moz-range-thumb]:border-4
  [&::-moz-range-thumb]:border-blue-600
  [&::-moz-range-thumb]:rounded-full
  [&::-moz-range-thumb]:transition-all
  [&::-moz-range-thumb]:duration-150
  [&::-moz-range-thumb]:ease-in-out

  [&::-webkit-slider-runnable-track]:w-full
  [&::-webkit-slider-runnable-track]:h-2
  [&::-webkit-slider-runnable-track]:bg-gray-100
  [&::-webkit-slider-runnable-track]:rounded-full
  [&::-webkit-slider-runnable-track]:dark:bg-neutral-700

  [&::-moz-range-track]:w-full
  [&::-moz-range-track]:h-2
  [&::-moz-range-track]:bg-gray-100
  [&::-moz-range-track]:rounded-full"
                    id="min-and-max-range-slider-usage"
                    min="0"
                    max="100"
                    value={formValues.userCategoryPercentage[index]}
                    onChange={handleSliderChange}
                    data-index={index}
                  />
                </div>
              ))}
            </div>
          )}
          {/* Industries */}
          <div className="mt-2">
            <Label htmlFor="industries">Select Industries</Label>

            <MultiSelector
              values={formValues.industry}
              onValuesChange={handleIndustriesChange}
            >
              <MultiSelectorTrigger>
                <MultiSelectorInput placeholder="Select Industries" />
              </MultiSelectorTrigger>
              <MultiSelectorContent>
                <MultiSelectorList>
                  {Industries.map((language) => (
                    <MultiSelectorItem key={language} value={language}>
                      {language}
                    </MultiSelectorItem>
                  ))}
                </MultiSelectorList>
              </MultiSelectorContent>
            </MultiSelector>
          </div>

          {formValues.industry.length > 0 && (
            <div>
              <span className="text-gray-600 italic text-sm">
                Mention the distibution for the selected options
              </span>
              {formValues.industry.map((category, index) => (
                <div key={category} className="mt-4">
                  <div className="inline-flex gap-5 items-center">
                    <Label htmlFor={`slider_${index}`}>{category}</Label>
                    <output className="text-sm text-gray-900 font-bold">
                      {formValues.industryPercentage[index]} %
                    </output>
                  </div>
                  <Input
                    name="industryPercentage"
                    type="range"
                    className="w-full bg-transparent cursor-pointer appearance-none disabled:opacity-50 disabled:pointer-events-none focus:outline-none
  [&::-webkit-slider-thumb]:w-2.5
  [&::-webkit-slider-thumb]:h-2.5
  [&::-webkit-slider-thumb]:-mt-0.5
  [&::-webkit-slider-thumb]:appearance-none
  [&::-webkit-slider-thumb]:bg-white
  [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(37,99,235,1)]
  [&::-webkit-slider-thumb]:rounded-full
  [&::-webkit-slider-thumb]:transition-all
  [&::-webkit-slider-thumb]:duration-150
  [&::-webkit-slider-thumb]:ease-in-out
  [&::-webkit-slider-thumb]:dark:bg-neutral-700

  [&::-moz-range-thumb]:w-2.5
  [&::-moz-range-thumb]:h-2.5
  [&::-moz-range-thumb]:appearance-none
  [&::-moz-range-thumb]:bg-white
  [&::-moz-range-thumb]:border-4
  [&::-moz-range-thumb]:border-blue-600
  [&::-moz-range-thumb]:rounded-full
  [&::-moz-range-thumb]:transition-all
  [&::-moz-range-thumb]:duration-150
  [&::-moz-range-thumb]:ease-in-out

  [&::-webkit-slider-runnable-track]:w-full
  [&::-webkit-slider-runnable-track]:h-2
  [&::-webkit-slider-runnable-track]:bg-gray-100
  [&::-webkit-slider-runnable-track]:rounded-full
  [&::-webkit-slider-runnable-track]:dark:bg-neutral-700

  [&::-moz-range-track]:w-full
  [&::-moz-range-track]:h-2
  [&::-moz-range-track]:bg-gray-100
  [&::-moz-range-track]:rounded-full"
                    id="min-and-max-range-slider-usage"
                    min="0"
                    max="100"
                    value={formValues.industryPercentage[index]}
                    onChange={handleIndustrySliderChange}
                    data-index={index}
                  />
                </div>
              ))}
            </div>
          )}

          <div className="mt-2">
            <Label htmlFor="userCategories">Select Practice Area</Label>

            <MultiSelector
              values={formValues.practiceAreas}
              onValuesChange={handlePracticeAreaChange}
            >
              <MultiSelectorTrigger>
                <MultiSelectorInput placeholder="Select user categories" />
              </MultiSelectorTrigger>
              <MultiSelectorContent>
                <MultiSelectorList>
                  {practiseArea.map((language) => (
                    <MultiSelectorItem key={language} value={language}>
                      {language}
                    </MultiSelectorItem>
                  ))}
                </MultiSelectorList>
              </MultiSelectorContent>
            </MultiSelector>
          </div>
          {formValues.practiceAreas.length > 0 && (
            <div>
              <span className="text-gray-600 italic text-sm">
                Mention the distibution for the selected options
              </span>

              {formValues.practiceAreas.map((category, index) => (
                <div key={category} className="mt-4">
                  <div className="inline-flex gap-5 items-center">
                    <Label htmlFor={`slider_${index}`}>{category}</Label>
                    <output className="text-sm text-gray-900 font-bold ">
                      {formValues.practiceAreasPercentage[index]} %
                    </output>
                  </div>

                  <Input
                    name="practiceAreasPercentage"
                    className="w-full bg-transparent cursor-pointer appearance-none disabled:opacity-50 disabled:pointer-events-none focus:outline-none
                  [&::-webkit-slider-thumb]:w-2.5
                  [&::-webkit-slider-thumb]:h-2.5
                  [&::-webkit-slider-thumb]:-mt-0.5
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:bg-white
                  [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(37,99,235,1)]
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:transition-all
                  [&::-webkit-slider-thumb]:duration-150
                  [&::-webkit-slider-thumb]:ease-in-out
                  [&::-webkit-slider-thumb]:dark:bg-neutral-700
                
                  [&::-moz-range-thumb]:w-2.5
                  [&::-moz-range-thumb]:h-2.5
                  [&::-moz-range-thumb]:appearance-none
                  [&::-moz-range-thumb]:bg-white
                  [&::-moz-range-thumb]:border-4
                  [&::-moz-range-thumb]:border-blue-600
                  [&::-moz-range-thumb]:rounded-full
                  [&::-moz-range-thumb]:transition-all
                  [&::-moz-range-thumb]:duration-150
                  [&::-moz-range-thumb]:ease-in-out
                
                  [&::-webkit-slider-runnable-track]:w-full
                  [&::-webkit-slider-runnable-track]:h-2
                  [&::-webkit-slider-runnable-track]:bg-gray-100
                  [&::-webkit-slider-runnable-track]:rounded-full
                  [&::-webkit-slider-runnable-track]:dark:bg-neutral-700
                
                  [&::-moz-range-track]:w-full
                  [&::-moz-range-track]:h-2
                  [&::-moz-range-track]:bg-gray-100
                  [&::-moz-range-track]:rounded-full"
                    type="range"
                    min="0"
                    max="100"
                    value={formValues.practiceAreasPercentage[index]}
                    onChange={handleLawSliderChange}
                    data-index={index}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/*Team Sixe */}

        <div className="mt-2">
          <Label htmlFor="industries">Select Client Team size</Label>

          <MultiSelector
            values={formValues.teamSize}
            onValuesChange={handleTeamsizeChange}
          >
            <MultiSelectorTrigger>
              <MultiSelectorInput placeholder="Select Team size" />
            </MultiSelectorTrigger>
            <MultiSelectorContent>
              <MultiSelectorList>
                {["1", "1-20", "20-50", "50-200", "200-500", "500+"].map(
                  (language) => (
                    <MultiSelectorItem key={language} value={language}>
                      {language}
                    </MultiSelectorItem>
                  )
                )}
              </MultiSelectorList>
            </MultiSelectorContent>
          </MultiSelector>
        </div>
        {formValues.teamSize.length > 0 && (
          <div>
            <span className="text-gray-600 italic text-sm">
              Mention the distibution for the selected options
            </span>

            {formValues.teamSize.map((category, index) => (
              <div key={category} className="mt-4">
                <div className="inline-flex gap-5 items-center">
                  <Label htmlFor={`slider_${index}`}>{category}</Label>
                  <output className="text-sm text-gray-900 font-bold">
                    {formValues.teamSizePercentage[index]} %
                  </output>
                </div>
                <Input
                  name="practiceAreasPercentage"
                  className="w-full bg-transparent cursor-pointer appearance-none disabled:opacity-50 disabled:pointer-events-none focus:outline-none
                  [&::-webkit-slider-thumb]:w-2.5
                  [&::-webkit-slider-thumb]:h-2.5
                  [&::-webkit-slider-thumb]:-mt-0.5
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:bg-white
                  [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(37,99,235,1)]
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:transition-all
                  [&::-webkit-slider-thumb]:duration-150
                  [&::-webkit-slider-thumb]:ease-in-out
                  [&::-webkit-slider-thumb]:dark:bg-neutral-700
                
                  [&::-moz-range-thumb]:w-2.5
                  [&::-moz-range-thumb]:h-2.5
                  [&::-moz-range-thumb]:appearance-none
                  [&::-moz-range-thumb]:bg-white
                  [&::-moz-range-thumb]:border-4
                  [&::-moz-range-thumb]:border-blue-600
                  [&::-moz-range-thumb]:rounded-full
                  [&::-moz-range-thumb]:transition-all
                  [&::-moz-range-thumb]:duration-150
                  [&::-moz-range-thumb]:ease-in-out
                
                  [&::-webkit-slider-runnable-track]:w-full
                  [&::-webkit-slider-runnable-track]:h-2
                  [&::-webkit-slider-runnable-track]:bg-gray-100
                  [&::-webkit-slider-runnable-track]:rounded-full
                  [&::-webkit-slider-runnable-track]:dark:bg-neutral-700
                
                  [&::-moz-range-track]:w-full
                  [&::-moz-range-track]:h-2
                  [&::-moz-range-track]:bg-gray-100
                  [&::-moz-range-track]:rounded-full"
                  type="range"
                  min="0"
                  max="100"
                  value={formValues.teamSizePercentage[index]}
                  onChange={handleTeamSizeChange}
                  data-index={index}
                />
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 flex flex-col md:flex-row items-center gap-4">
          <Button type="submit" className="bg-primary1" disabled={loading}>
            {loading ? "Saving" : "Next"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Form3;
