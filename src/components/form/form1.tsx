"use client";
import { FormValues, useFormContext } from "@/context/formValueContext";
import { ChangeEvent, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Switch } from "@headlessui/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "../ui/multiselect";
import { useStepContext } from "@/context/formContext";

function Form1() {
  const { formValues, setFormValues } = useFormContext();
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { step, prevStep, nextStep, setStep } = useStepContext();

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
  const languages = [
    "Arabic",
    "Bulgarian",
    "Chinese",
    "Configurable",
    "Croatian",
    "Czech",
    "Danish",
    "Dutch",
    "English",
    "Estonian",
    "Finnish",
    "Flemish",
    "French",
    "German",
    "Greek",
    "Hebrew",
    "Hindi",
    "Hungarian",
    "Icelandic",
    "Indonesian",
    "Italian",
    "Japanese",
    "Korean",
    "Latvian",
    "Lithuanian",
    "Malay",
    "Maltese",
    "Norwegian",
    "Polish",
    "Portuguese",
    "Romanian",
    "Russian",
    "Serbian",
    "Spanish",
    "Swedish",
    "Tagalog",
    "Thai",
    "Turkish",
    "Vietnamese",
  ];
  const integrations = [
    "Integration 1",
    "Integration 2",
    "Integration 3",
    "Integration 4",
  ];
  const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo, Democratic Republic of the",
    "Congo, Republic of the",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "East Timor (Timor-Leste)",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Korea, North",
    "Korea, South",
    "Kosovo",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia, Federated States of",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar (Burma)",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City (Holy See)",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ];

  const handleIntegrationsChange = (selectedIntegrations: string[]) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      integrations: selectedIntegrations,
    }));
  };

  //   const isLanguageSelected = (language: string) =>
  //     formValues.languages.includes(language);

  //   const canSelectMoreLanguages = formValues.languages.length < 5;

  const handleCountriesChange = (selectedCountries: string[]) => {
    if (selectedCountries.length <= 5) {
      setFormValues((prevValues) => ({
        ...prevValues,
        focusCountries: selectedCountries,
      }));
    }
  };

  const handleLanguagesChange = (selectedLanguages: string[]) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      languages: selectedLanguages,
    }));
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
    nextStep(); // Log form values
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          {/* Product Name */}
          <div className="mt-2">
            <Label className="prname">Product Name</Label>
            <Input
              name="prname"
              type="text"
              placeholder="Product Name"
              value={formValues.prname}
              onChange={handleChange}
            />
          </div>
          {/* Product Logo */}
          <div className="mt-2">
            <Label htmlFor="logo">Product Logo</Label>
            <Input
              name="logo"
              type="file"
              placeholder="Logo"
              onChange={handleChange}
            />
          </div>
          {/* Category checkboxes */}
          <div className="mt-2">
            <Label htmlFor="category">Select Category</Label>
            {[
              "Client Management Software",
              "Governance and Compliance and Risk Management",
              "Contract Management Software",
              "Digital Signature",
              "Document Management and Automation",
              "E-billing and Invoicing",
              "E-discovery",
              "Intellectual Property Management",
              "Litigation Management and Analytics",
              "Legal Workflow Automation",
              "Legal Research"
            ].map((category) => (
              <div key={category} className="items-top flex space-x-2 mt-2">
                <Input
                  name="category"
                  type="checkbox"
                  value={category}
                  checked={formValues.category.includes(category)}
                  onChange={handleChange}
                  className="w-5 h-5"
                />
                <div className="grid gap-1.5 leading-none">
                  <label className="text-sm font-medium leading-none">
                    {category}
                  </label>
                </div>
              </div>
            ))}
          </div>
          {/* Deployment checkboxes */}
          <div className="mt-2">
            <Label htmlFor="deployment">Select Deployment</Label>
            {["SaaS", "On-premise", "Hybrid", "Cloud"].map((deployment) => (
              <div key={deployment} className="items-top flex space-x-2 mt-2">
                <Input
                  name="deployment"
                  type="checkbox"
                  value={deployment}
                  checked={formValues.deployment.includes(deployment)}
                  onChange={handleChange}
                  className="w-5 h-5"
                />
                <div className="grid gap-1.5 leading-none">
                  <label className="text-sm font-medium leading-none">
                    {deployment}
                  </label>
                </div>
              </div>
            ))}
          </div>
          {/* Mobile select */}
          {/* <Label htmlFor="mobileAccessibility">
            Select Mobile Accessibility
          </Label>
          <Select
            value={formValues.mobileAccessibility}
            onValueChange={(value) =>
              setFormValues((prevValues) => ({
                ...prevValues,
                mobileAccessibility: value,
              }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Mobile Accessibility" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select> */}

          <div className="mt-4">
            <div className=" flex gap-4 items-center">
              <Label htmlFor="mobileAccessibility">
                Select Mobile Accessibility
              </Label>
              <Switch
                checked={formValues.mobileAccessibility === "yes"}
                onChange={(value) =>
                  setFormValues((prevValues) => ({
                    ...prevValues,
                    mobileAccessibility: value ? "yes" : "no",
                  }))
                }
                className={`${
                  formValues.mobileAccessibility === "yes"
                    ? "bg-blue-600"
                    : "bg-gray-200"
                }
                          relative inline-flex items-center h-6 rounded-full w-11`}
              >
                <span
                  className={`${
                    formValues.mobileAccessibility === "yes"
                      ? "translate-x-6"
                      : "translate-x-1"
                  }
                            inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                />
              </Switch>
            </div>
          </div>
          <div>
            <Label htmlFor="adoptionPeriod">Adoption period</Label>
            <div className="flex gap-4">
              <Input
                name="adoptionPeriod"
                type="text"
                placeholder="Adoption period"
                value={formValues.adoptionPeriod}
                onChange={handleChange}
              />
              <Select
                value={formValues.adoptionPeriodUnit}
                onValueChange={(value) =>
                  setFormValues((prevValues) => ({
                    ...prevValues,
                    adoptionPeriodUnit: value,
                  }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="days">Days</SelectItem>
                  <SelectItem value="months">Months</SelectItem>
                  <SelectItem value="years">Years</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Language checkboxes */}
          <div className="mt-2">
            <Label htmlFor="languages">Select Languages</Label>
            <MultiSelector
              values={formValues.languages}
              onValuesChange={handleLanguagesChange}
            >
              <MultiSelectorTrigger>
                <MultiSelectorInput placeholder="Select items" />
              </MultiSelectorTrigger>
              <MultiSelectorContent>
                <MultiSelectorList>
                  {languages.map((language) => (
                    <MultiSelectorItem key={language} value={language}>
                      {language}
                    </MultiSelectorItem>
                  ))}
                </MultiSelectorList>
              </MultiSelectorContent>
            </MultiSelector>
          </div>

          {/* Security Certificates */}
          <div className="mt-2">
            <Label className="securityCertificate">Security Certificates</Label>
            <Textarea
              name="securityCertificate"
              placeholder="Mention name of certifications"
              value={formValues.securityCertificate}
              onChange={(event) => handleChange(event)}
            />
          </div>

          {/* Intergration checkboxes */}
          <div className="mt-2">
            <Label htmlFor="integration">Integration</Label>
            <MultiSelector
              values={formValues.integrations}
              onValuesChange={handleIntegrationsChange}
            >
              <MultiSelectorTrigger>
                <MultiSelectorInput placeholder="Select integrations" />
              </MultiSelectorTrigger>
              <MultiSelectorContent>
                <MultiSelectorList>
                  {integrations.map((integration) => (
                    <MultiSelectorItem key={integration} value={integration}>
                      {integration}
                    </MultiSelectorItem>
                  ))}
                </MultiSelectorList>
              </MultiSelectorContent>
            </MultiSelector>
          </div>

          {/* Focus Countries */}
          <div className="mt-2">
            <Label htmlFor="countries">Select Countries (Max 5)</Label>
            <MultiSelector
              values={formValues.focusCountries}
              onValuesChange={handleCountriesChange}
            >
              <MultiSelectorTrigger>
                <MultiSelectorInput placeholder="Select countries" />
              </MultiSelectorTrigger>
              <MultiSelectorContent>
                <MultiSelectorList>
                  {countries.map((country) => (
                    <MultiSelectorItem
                      key={country}
                      value={country}
                      disabled={
                        formValues.focusCountries.length >= 5 &&
                        !formValues.focusCountries.includes(country)
                      }
                    >
                      {country}
                    </MultiSelectorItem>
                  ))}
                </MultiSelectorList>
              </MultiSelectorContent>
            </MultiSelector>
          </div>
        </div>
        <div className="mt-4 flex flex-col md:flex-row items-center gap-4">
          <Button type="submit" className="bg-primary1" disabled={loading}>
            {loading ? "Saving" : "Next"}
          </Button>

          {/* <Button onClick={nextStep} className="bg-primary1">
              Next
            </Button> */}
        </div>
      </form>
    </div>
  );
}

export default Form1;
