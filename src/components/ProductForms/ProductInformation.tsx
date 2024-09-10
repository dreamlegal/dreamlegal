"use client"; 
import { ChangeEvent, useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "@/components/ui/label";
import { XCircle } from "lucide-react";
import { z } from "zod";
import { ProductInfo } from "@/store/useStore";
import {
    MultiSelector,
    MultiSelectorContent,
    MultiSelectorInput,
    MultiSelectorItem,
    MultiSelectorList,
    MultiSelectorTrigger,
  } from "../ui/multiselect";

  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../ui/select";

// Define schema for both fields
const productSchema = z.object({
  productName: z
    .string()
    .max(5, "Product name must be 5 characters or less")
    .min(2, "Product name must be at least 2 characters"),
  category: z.array(z.string()).min(1, "Please select at least one category"),
  deployment: z.array(z.string()).min(1, "Please select at least one deployment option"),
  adoptionPeriod: z.number().positive("Adoption period must be a positive number").optional(),
  adoptionPeriodUnit: z.enum(["days", "months", "years"]).optional(),
  focusCountries: z.array(z.string()).max(5, "You can select up to 5 countries").min(1, "Please select at least one language"),
  languages: z.array(z.string()).min(1, "Please select at least one language"),
});

const ProductInformation = () => {
  const {
    productName, setProductName, category, setCategory, deployment, setDeployment,
    adoptionPeriod, setAdoptionPeriod, adoptionPeriodUnit, setAdoptionPeriodUnit,
    focusCountries, setFocusCountries, languages, setLanguages
  } = ProductInfo();
  
  const [inputValue, setInputValue] = useState(productName);
  const [errors, setErrors] = useState<Record<string, string>>({});


  const languagess = [
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


  // Validate a single field
  const validateField = (name: string, value: any) => {
    const tempValues = {
      productName: name === "productName" ? value : inputValue,
      category: name === "category" ? value : category,
      deployment: name === "deployment" ? value : deployment,
      adoptionPeriod: name === "adoptionPeriod" ? value : adoptionPeriod,
      adoptionPeriodUnit: name === "adoptionPeriodUnit" ? value : adoptionPeriodUnit,
      focusCountries: name === "focusCountries" ? value : focusCountries,
      languages: name === "languages" ? value : languages,
    };

    const result = productSchema.safeParse(tempValues);

    if (!result.success) {
      const error = result.error.errors.find((err) => err.path[0] === name);
      return error ? error.message : "";
    }
    return "";
  };

  // Function to validate all fields
  const validateAllFields = () => {
    const result = productSchema.safeParse({
      productName: inputValue,
      category,
      deployment,
      adoptionPeriod,
      adoptionPeriodUnit,
      focusCountries,
      languages,
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
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;

    if (name === "productName") {
      setInputValue(value);

      // Validate the productName field
      const errorMessage = validateField(name, value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: errorMessage,
      }));
    } else if (name === "category") {
      let updatedCategories = category;

      if (checked) {
        updatedCategories = [...category, value];
      } else {
        updatedCategories = category.filter((cat) => cat !== value);
      }

      setCategory(updatedCategories);

      const errorMessage = validateField(name, updatedCategories);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: errorMessage,
      }));
    } else if (name === "deployment") {
      let updatedDeployment = deployment;

      if (checked) {
        updatedDeployment = [...deployment, value];
      } else {
        updatedDeployment = deployment.filter((dep) => dep !== value);
      }

      setDeployment(updatedDeployment);

      const errorMessage = validateField(name, updatedDeployment);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: errorMessage,
      }));
    }
  };

  // Handle adoption period and unit change
  const handleAdoptionPeriodChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const numericValue = Number(value);

    setAdoptionPeriod(numericValue);
    const errorMessage = validateField("adoptionPeriod", numericValue);
    setErrors((prevErrors) => ({
      ...prevErrors,
      ["adoptionPeriod"]: errorMessage,
    }));
  };

//   const handleAdoptionPeriodUnitChange = (value: string) => {
//     setAdoptionPeriodUnit(value);
//     const errorMessage = validateField("adoptionPeriodUnit", value);
//     setErrors((prevErrors) => ({
//       ...prevErrors,
//       ["adoptionPeriodUnit"]: errorMessage,
//     }));
//   };

  // Handle countries change
  const handleCountriesChange = (selectedCountries: string[]) => {
    setFocusCountries(selectedCountries);
    const errorMessage = validateField("focusCountries", selectedCountries);
    setErrors((prevErrors) => ({
      ...prevErrors,
      ["focusCountries"]: errorMessage,
    }));
  };

  // Handle languages change
  const handleLanguagesChange = (selectedLanguages: string[]) => {
    setLanguages(selectedLanguages);
    const errorMessage = validateField("languages", selectedLanguages);
    setErrors((prevErrors) => ({
      ...prevErrors,
      ["languages"]: errorMessage,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateAllFields()) {
      return; // Stop form submission if there are validation errors
    }

    // Set the validated values to Zustand state
    setProductName(inputValue);

    console.log("Form submitted with:", {
      productName: inputValue,
      category,
      deployment,
      adoptionPeriod,
      adoptionPeriodUnit,
      focusCountries,
      languages,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full font-calarity">
      <div className="flex w-100 flex-col">
        {/* Product Name */}
        <div className="w-full mt-2">
          <Label htmlFor="productName">Product Name</Label>
          <Input
            type="text"
            id="productName"
            name="productName"
            value={inputValue}
            onChange={handleChange}
            className="mt-1"
          />
          {errors.productName && (
            <div className="w-full bg-[#F8D7DA] mt-3 p-2 rounded-lg flex">
              <XCircle className="w-6 h-6 text-red-500" />
              <p className="text-[#DC3545] pl-2">{errors.productName}</p>
            </div>
          )}
        </div>

        {/* Category Checkboxes */}
        <div className="mt-2">
          <Label htmlFor="category">Select Category</Label>
          {[
            "Client Relationship Management",
            "Governance, Risk and Compliance",
            "Contract Lifecycle Management",
            "E-Signature",
            "Document Management System",
            "E-billing and Invoicing",
            "E-discovery",
            "Intellectual Property Management",
            "Litigation Management and Analytics",
            "Legal Workflow Automation",
            "Legal Research",
          ].map((cat) => (
            <div key={cat} className="items-top flex space-x-2 mt-2">
              <Input
                name="category"
                type="checkbox"
                value={cat}
                checked={category.includes(cat)}
                onChange={handleChange}
                className="w-5 h-5"
              />
              <div className="grid gap-1.5 leading-none">
                <label className="text-sm font-medium leading-none">
                  {cat}
                </label>
              </div>
            </div>
          ))}
          {errors.category && (
            <div className="w-full bg-[#F8D7DA] mt-3 p-2 rounded-lg flex">
              <XCircle className="w-6 h-6 text-red-500" />
              <p className="text-[#DC3545] pl-2">{errors.category}</p>
            </div>
          )}
        </div>

        {/* Deployment Checkboxes */}
        <div className="mt-2">
          <Label htmlFor="deployment">Select Deployment</Label>
          {["SaaS", "On-premise", "Hybrid", "Cloud"].map((dep) => (
            <div key={dep} className="items-top flex space-x-2 mt-2">
              <Input
                name="deployment"
                type="checkbox"
                value={dep}
                checked={deployment.includes(dep)}
                onChange={handleChange}
                className="w-5 h-5"
              />
              <div className="grid gap-1.5 leading-none">
                <label className="text-sm font-medium leading-none">
                  {dep}
                </label>
              </div>
            </div>
          ))}
          {errors.deployment && (
            <div className="w-full bg-[#F8D7DA] mt-3 p-2 rounded-lg flex">
              <XCircle className="w-6 h-6 text-red-500" />
              <p className="text-[#DC3545] pl-2">{errors.deployment}</p>
            </div>
          )}
        </div>

        {/* Adoption Period */}
        {/* <div>
          <Label htmlFor="adoptionPeriod">Adoption Period</Label>
          <div className="flex gap-4">
            <Input
              name="adoptionPeriod"
              type="number"
              placeholder="Adoption period"
              value={adoptionPeriod || ""}
              onChange={handleAdoptionPeriodChange}
            />
            <Select
              value={adoptionPeriodUnit}
              onValueChange={handleAdoptionPeriodUnitChange}
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
          {errors.adoptionPeriod && (
            <div className="w-full bg-[#F8D7DA] mt-3 p-2 rounded-lg flex">
              <XCircle className="w-6 h-6 text-red-500" />
              <p className="text-[#DC3545] pl-2">{errors.adoptionPeriod}</p>
            </div>
          )}
        </div> */}

        {/* Language Checkboxes */}
        <div className="mt-2">
          <Label htmlFor="languages">Select Languages</Label>
          <MultiSelector
            values={languages}
            onValuesChange={handleLanguagesChange}
          >
            <MultiSelectorTrigger>
              <MultiSelectorInput placeholder="Select items" />
            </MultiSelectorTrigger>
            <MultiSelectorContent>
              <MultiSelectorList>
                {languagess.map((language) => (
                  <MultiSelectorItem key={language} value={language}>
                    {language}
                  </MultiSelectorItem>
                ))}
              </MultiSelectorList>
            </MultiSelectorContent>
          </MultiSelector>
          {errors.languages && (
            <div className="w-full bg-[#F8D7DA] mt-3 p-2 rounded-lg flex">
              <XCircle className="w-6 h-6 text-red-500" />
              <p className="text-[#DC3545] pl-2">{errors.languages}</p>
            </div>
          )}
        </div>

        {/* Focus Countries */}
        <div className="mt-2">
          <Label htmlFor="focusCountries">Select Countries (Max 5)</Label>
          <MultiSelector
            values={focusCountries}
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
                      focusCountries.length >= 5 && !focusCountries.includes(country)
                    }
                  >
                    {country}
                  </MultiSelectorItem>
                ))}
              </MultiSelectorList>
            </MultiSelectorContent>
          </MultiSelector>
          {errors.focusCountries && (
            <div className="w-full bg-[#F8D7DA] mt-3 p-2 rounded-lg flex">
              <XCircle className="w-6 h-6 text-red-500" />
              <p className="text-[#DC3545] pl-2">{errors.focusCountries}</p>
            </div>
          )}
        </div>

     

        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default ProductInformation;
