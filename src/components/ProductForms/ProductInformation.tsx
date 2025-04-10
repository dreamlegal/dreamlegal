"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
// import {Search} from "../ui/search";
import { Label } from "@/components/ui/label";
import { XCircle } from "lucide-react";
import { z } from "zod";
import { ProductInfo } from "@/store/useStore";
import { ChevronDown, ChevronUp, X  } from 'lucide-react';
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
import { Switch } from "../ui/switch"
import { useToast } from "../ui/use-toast";;
import Alert from '@/components/Alert';

interface Integrations {
  [category: string]: string[];
}

// Define schema for both fields
const productSchema = z.object({
  productName: z
    .string()
    .min(3, "Product name must be at least 3 characters"),
  category: z.array(z.string()).min(1, "Please select at least one category"),
  deployment: z
    .array(z.string())
    .min(1, "Please select at least one deployment option"),
  
  
  focusCountries: z
    .array(z.string())
    .max(5, "You can select up to 5 countries")
    .min(1, "Please select at least one language"),
  languages: z.array(z.string()).min(1, "Please select at least one language"),
  securityCertificate: z.string().optional().refine(value => {
    if (value === undefined || value.trim() === '') return true; // Skip validation for undefined or empty values
    return wordCount(value, 50); // Ensure this function is correctly defined
  }, {
    message: "Max word limit of 50 words exceeded",
  }),
  websiteUrl: z.string().url("Invalid Website URL").optional().nullable(),
  adoptionPeriod: z
  .number({
    required_error: "Adoption period is required",
    invalid_type_error: "Adoption period must be a number",
  }),  adoptionPeriodUnit: z.enum(["days", "months", "years"], {
    invalid_type_error: "Please select a valid period unit",
  }),
  
    mobileAvailable: z.enum(["Yes", "No"], {
      required_error: "Choose this please", // Error when the field is not provided
      invalid_type_error: "Choose this please", // Error when the value is null or any other type
    }),

    logoPreview: z.any().refine(value => value !== null, {
      message: "Logo preview is required",
  }),

  
});
const wordCount = (value: string, maxWords: number): boolean => {
  return value.trim().split(/\s+/).length <= maxWords;
};

const ProductInformation = () => {
  const {
    productName,
    setProductName,
    logoUrl,
    setLogoUrl,
    mobileAvailable,
    setMobileAvailable,
    category,
    setCategory,
    deployment,
    setDeployment,
    adoptionPeriod,
    setAdoptionPeriod,
    adoptionPeriodUnit,
    setAdoptionPeriodUnit,
    focusCountries,
    setFocusCountries,
    languages,
    setLanguages,
    securityCertificate,
    setSecurityCertificate,
    setWebsiteUrl,
    websiteUrl
  } = ProductInfo();

  const [inputValue, setInputValue] = useState(productName);
  const [securityValue, setSecurityValue] = useState(securityCertificate || "");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [localAdoptionPeriod, setLocalAdoptionPeriod] = useState(adoptionPeriod);
  const [localAdoptionPeriodUnit, setLocalAdoptionPeriodUnit] = useState(adoptionPeriodUnit);

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

  const { toast } = useToast();
  // Validate a single field
  const validateField = (name: string, value: any) => {
    const tempValues = {
      productName: name === "productName" ? value : inputValue,
      category: name === "category" ? value : category,
      deployment: name === "deployment" ? value : deployment,
      adoptionPeriod: name === "adoptionPeriod" ? value : adoptionPeriod,
      adoptionPeriodUnit:
        name === "adoptionPeriodUnit" ? value : adoptionPeriodUnit,
      focusCountries: name === "focusCountries" ? value : focusCountries,
      languages: name === "languages" ? value : languages,
      securityCertificate: name === "securityCertificate"? value : securityValue,
      websiteUrl: websiteUrl || undefined,
      logoPreview:logoPreview,
    };

    const result = productSchema.safeParse(tempValues);

    if (!result.success) {
      const error = result.error.errors.find((err) => err.path[0] === name);
      return error ? error.message : "";
    }
    return "";
  };
  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const sanitizedValue = value.trim() === "" ? null : value.trim();
    
    if (name === "websiteUrl") {
      setWebsiteUrl(sanitizedValue);
    }
  };
  
  const validateFieldAdopt = (name: string, value: any) => {
    const tempValues = {
     adoptionPeriod: name === 'adoptionPeriod' ? Number(value) : adoptionPeriod,
      adoptionPeriodUnit: name === 'adoptionPeriodUnit' ? value : adoptionPeriodUnit,
    };

    const result = productSchema.safeParse(tempValues);

    if (!result.success) {
      const error = result.error.errors.find((err) => err.path[0] === name);
      return error ? error.message : "";
    }
    return "";
  }; 

  const handleAdoptionPeriodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const errorMessage = validateFieldAdopt(name, value);
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: errorMessage
    }));

    if (!errorMessage) {
      setAdoptionPeriod(Number(value));
    }
  };

  const handleAdoptionPeriodUnitChange = (value: string) => {
    const name = 'adoptionPeriodUnit';
    const errorMessage = validateFieldAdopt(name, value);
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: errorMessage
    }));

    if (!errorMessage) {
      setAdoptionPeriodUnit(value);
    }
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
      mobileAvailable,
      securityCertificate: securityValue,
      websiteUrl: websiteUrl || undefined,
      logoPreview: logoPreview || undefined,
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

  const handleAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
   
    if (name === "securityCertificate") {
      setSecurityValue(value);
      const errorMessage = validateField(name, value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: errorMessage,
      }));
    } 
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

    }else if (name === "category") {
      let updatedCategories = category;

      if (checked) {
        updatedCategories = [...category, value];
      } else {
        updatedCategories = category.filter((cat: any) => cat !== value);
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
        updatedDeployment = deployment.filter((dep: any) => dep !== value);
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
 

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  
        
  //   fileSubmit()

  //   let hasErrors = false;

  // if (!validateAllFields()) {
  //   console.log("Validation failed");
  //   hasErrors = true;
  // }
  // setProductName(inputValue);
  // setSecurityCertificate(securityValue);

  // // Validate integrations
  // try {
  //   integrationsSchema.parse({ integrations: selectedIntegrations });
  // } catch (error) {
  //   if (error instanceof z.ZodError) {
  //     setErrors(prevErrors => ({
  //       ...prevErrors,
  //       integrations: error.errors[0].message
  //     }));
  //     hasErrors = true;
  //   }
  // }

  // if (hasErrors) {
  //   console.log("Form has errors. Please correct them before submitting.");
  //   return; // Stop form submission if there are validation errors
  // }


    
    
   
  //   console.log("Form submitted with:", {
  //     productName: inputValue,
  //     category,
  //     deployment,
  //     adoptionPeriod,
  //     adoptionPeriodUnit,
  //     focusCountries,
  //     languages,
  //     securityCertificate: securityValue, // Ensure the correct value is logged
  //   });
  // };



  

  const validateForm = () => {
    const result = productSchema.safeParse({ logoUrl });
    if (!result.success) {
      const errors = result.error.errors.reduce((acc, error) => {
        acc[error.path[0]] = error.message;
        return acc;
      }, {});
      setErrors(errors);
    }
  };


 
  // integrations   
  // Define the type for integrations object


// Define the integrations object with type
// const integrations: Integrations = {
//   "NOT AVAILABLE":[
//     "NOT AVAILABLE",
//   ],
//   "Accounting and Finance": [
//     "Financial Disclosures",
//     "FreshBooks",
//     "Jubilee",
//     "QuickBooks",
//     "TrustBooks",
//     "Xero"
//   ],
//   "Case and Matter Management": [
//     "Clio",
//     "LawRuler",
//     "Litify",
//     "MyCase",
//     "PracticePanther",
//     "Zola Suite"
//   ],
 
// };
const integrations: Integrations = {
  "NOT AVAILABLE": [
    "NOT AVAILABLE"
  ],
  "Accounting and Finance": [
    "Financial Disclosures",
    "FreshBooks",
    "Jubilee",
    "QuickBooks",
    "TrustBooks",
    "Xero"
  ],
  "Case and Matter Management": [
    "Clio",
    "LawRuler",
    "Litify",
    "MyCase",
    "PracticePanther",
    "Zola Suite"
  ],
  "Client Communication & Collaboration": [
    "Alpha Legal",
    "Answering Legal",
    "Back Office Betties",
    "Broadly",
    "CallRail",
    "Microsoft Teams",
    "RingCentral",
    "Ruby Receptionists",
    "Slack",
    "Vonage",
    "Zoom"
  ],
  "Court and Filing Solutions": [
    "CourtDrive",
    "CourtTrax",
    "DirectLaw",
    "Docketwise",
    "eCourtReporters"
  ],
  "CRM and Client Intake Tools": [
    "BirdEye",
    "Captorra",
    "Lawlytics",
    "Lawmatics",
    "LeadDocket",
    "Legalboards"
  ],
  "Cybersecurity & Data Management": [
    "Embroker",
    "Expediate",
    "InfoTrack",
    "NetDocuments",
    "Proof",
    "Trustifi"
  ],
  "Document Management and Automation": [
    "Docketalarm",
    "Docketbird",
    "DocMoto",
    "Effortless Legal",
    "Epona DMSforLegal",
    "Gavel Document Automation",
    "LexWorkplace",
    "Litera",
    "NetDocuments",
    "Proclaim",
    "Worldox",
    "Xerox Connect"
  ],
  "E-Discovery and Litigation Support": [
    "Discovery",
    "Docketalarm",
    "Effortless Legal",
    "Logikcull",
    "Nextchapter",
    "Rainmaker"
  ],
  "E-signatures and Notary Services": [
    "DocuSign",
    "Notarize",
    "OneNotary",
    "Vaultie",
    "Zorrosign"
  ],
  "Google": [
    "Gmail",
    "Google Apps",
    "Google Calendar",
    "Google Contacts",
    "Google Docs",
    "Google Drive"
  ],
  "Legal AI and Automation": [
    "Foundation AI",
    "Gideon",
    "Levitate",
    "Lexop"
  ],
  "Legal Billing, Payments, and Invoicing": [
    "Accurate Legal Billing",
    "Billzer",
    "Cashroom",
    "FreshBooks",
    "QuickBooks",
    "TrustBooks",
    "Trustifi"
  ],
  "Legal Research": [
    "CaseText",
    "Casetext",
    "Fastcase",
    "Lexbox"
  ],
  "Marketing & Client Reviews": [
    "BirdEye",
    "Broadly",
    "Repsight",
    "ReviewSolicitors"
  ],
  "Microsoft": [
    "Co-Pilot",
    "Excel",
    "Microsoft 365",
    "Microsoft OneDrive",
    "Microsoft Outlook",
    "Microsoft Outlook 365 Add-in",
    "Microsoft Teams",
    "Office 365 Contracts",
    "Word"
  ],
  "Practice Management Software": [
    "Case Status",
    "CaseAtlas",
    "Clio Payments",
    "Clio-goto",
    "Cosmolex",
    "Fastcase",
    "Jubilee",
    "MyCase",
    "Practice Panther",
    "Rocket Matter",
    "Zola Suite"
  ],
  "Scheduling and Appointments": [
    "Apptoto",
    "Calendly",
    "Clio Scheduler",
    "LawTap"
  ],
  "Time Tracking and Billing": [
    "Faster Time",
    "TimeBro",
    "Timeminer",
    "Timetracker by ebillity"
  ],
  "Virtual Law Firms and Legal Support": [
    "Alpha Legal",
    "Hire an Esquire",
    "Immediation",
    "LawCloud",
    "Veta Virtual Receptionists"
  ],
  "Virtual Receptionists and Legal Support": [
    "24/7Live Virtual Legal Receptionists",
    "Answering Legal",
    "Back Office Betties",
    "Ruby Receptionists",
    "Veta Virtual Receptionists"
  ]
};


const [searchTerm, setSearchTerm] = useState('');

const filterIntegrations = (integrations: Record<string, string[]>) => {
  return Object.entries(integrations).reduce((acc, [category, options]) => {
    const filteredOptions = options.filter(option =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filteredOptions.length > 0) {
      acc[category] = filteredOptions;
    }
    return acc;
  }, {} as Record<string, string[]>);
};



// Assuming you have an 'integrations' object defined somewhere in your component or imported
const filteredIntegrations = filterIntegrations(integrations);

const [open, setOpen] = useState(false);
  


const integrationsSchema = z.object({
  integrations: z.array(z.string()).min(1, "At least one category must be selected"),
});

const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
const [selectedIntegrations, setSelectedIntegrations] = useState<string[]>([]);

// Retrieve global state and updater function from Zustand store
const { integrations: globalIntegrations, setIntegrations } = ProductInfo();

useEffect(() => {
  // Initialize local state with global state integrations on load
  setSelectedIntegrations(globalIntegrations);
}, [globalIntegrations]);




const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };
const toggleIntegration = (integration: string) => {
  const updatedIntegrations = selectedIntegrations.includes(integration)
    ? selectedIntegrations.filter((i) => i !== integration)
    : [...selectedIntegrations, integration];

  console.log('Updated Integrations:', updatedIntegrations); // Log updated integrations
  setSelectedIntegrations(updatedIntegrations);

  // Validate and update global state when selection changes
  handleIntegrationChange(updatedIntegrations);
};

const handleIntegrationChange = (updatedIntegrations: string[]) => {
  try {
    integrationsSchema.parse({ integrations: updatedIntegrations });
    setErrors({});
    setIntegrations(updatedIntegrations);
  } catch (error) {
    if (error instanceof z.ZodError) {
      setErrors({ integrations: error.errors[0].message });
    }
  }
};
  



 const uploadFile = async (file: File, folderName: string) => {
    // Create the form data
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folderName", folderName);

    try {
      // Send the POST request
      const response = await fetch("/api/upload-file", {
        method: "POST",
        body: formData,
      });

      // Handle the response
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          const url = data.location;
          console.log("Uploaded file location:", url);
          toast({
            title: "saving...",
            description: "Saving Image Upload May Take Some Time  ",
            variant: "saving",
          });
          return url;
        } else {
          console.error("Upload failed:", data.error);
        }
      } else {
        console.error("Failed to upload file:", response.statusText);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
    return null;
  };


    
  const { logoFile, setLogoFile, logoPreview, setLogoPreview,  } = ProductInfo();



const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    setLogoFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  } else {
    setErrors(prev => ({ ...prev, logo: "Logo is required" }));
    setLogoFile(null);
    setLogoPreview(null);
  }
};
const [alert, setAlert] = useState(null);
  const showAlert = (message, type = 'success') => {
    setAlert({ message, type });
    // Auto dismiss after 3 seconds
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    let hasErrors = false;
  
    if (!validateAllFields()) {
      console.log("Validation failed");
      hasErrors = true;
      showAlert("Validation Failed!", 'error');
      toast({
        title: "Validation Failed",
        description: "Please check the form for errors",
        variant: "error",
      });
    }
  
    // Validate integrations
    try {
      integrationsSchema.parse({ integrations: selectedIntegrations });
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prevErrors => ({
          ...prevErrors,
          integrations: error.errors[0].message
        }));
        hasErrors = true;
      }
    }
  
    if (hasErrors) {
      console.log("Form has errors. Please correct them before submitting.");
      return; // Stop form submission if there are validation errors
    }
  

    if (logoFile) {
      try {
        const uploadedLogoUrl = await uploadFile(logoFile, "logos");
        console.log("Logo uploaded:", uploadedLogoUrl);
        setLogoUrl(uploadedLogoUrl); // Update global state with the new URL
      } catch (error) {
        console.error("Error uploading logo:", error);
        setErrors(prevErrors => ({ ...prevErrors, logo: "Failed to upload logo" }));
      }
    } else {
      
      console.log("No logo file selected");
    }

    if (logoPreview === "" || logoPreview === null || logoPreview === undefined) {
      showAlert("Fill All Details And Upload Logo Please", 'error');
      toast({
        title: "Missing Fields",
        description: "Fill All Details And Upload Logo Please",
        variant: "error",
      });
      
    }else {
      showAlert("Product Information  Saved ... Move to the next form", 'success');
      toast({
        title: "Saved",
        description: "Product Information  Saved ... Move to the next form",
        variant: "success",
      });
    }
    
setProductName(inputValue);
setSecurityCertificate(securityValue);


// Prepare form data for submission
const formData = {
  productName: inputValue,
  category,
  deployment,
  adoptionPeriod,
  adoptionPeriodUnit,
  focusCountries,
  languages,
  securityCertificate: securityValue,
  logoUrl,
  integrations: selectedIntegrations,
  mobileAccessibility: mobileAvailable,
};

console.log("Form submitted with:", formData);
    
  };

  const [selectedMobileAvailability, setSelectedMobileAvailability] = useState(mobileAvailable || null);
  const handleMobile = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedMobileAvailability(value);
    setMobileAvailable(value);
  };

  useEffect(() => {
    setLogoPreview(logoUrl || null);
  }, [logoUrl, setLogoPreview]);



  return (
//     <form onSubmit={handleSubmit} className="w-full font-calarity">
//       <div className="flex w-100 flex-col">

    

//         {/* Product Name */}
//         <div className="w-full mt-2">
//           <Label htmlFor="productName">Product Name</Label>
//           <Input
//             type="text"
//             id="productName"
//             name="productName"
//             value={inputValue}
//             onChange={handleChange}
//             className="mt-1"
//           />
//           {errors.productName && (
//             <div className="w-full bg-[#F8D7DA] mt-3 p-2 rounded-lg flex">
//               <XCircle className="w-6 h-6 text-red-500" />
//               <p className="text-[#DC3545] pl-2">{errors.productName}</p>
//             </div>
//           )}
//         </div>
//         {/* logo */}
//         {/* <div className="w-full mt-2">
//           <Label htmlFor="logo">Logo</Label>
//           <Input
//             type="file"
//             id="logo"
//             name="logo"
//             className="mt-1"
//           />
//         </div> */}
//    <div className="w-full mt-2">
//       <label htmlFor="logo">Logo</label>
//       <Input
//         type="file"
//         id="logo"
//         name="logo"
//         className="mt-1"
//         onChange={handleFileChange}
//       />
//       {/* {errors.logo && <p className="text-red-500">{errors.logo}</p>} */}
//       {errors.logoPreview && (
//             <div className="w-full bg-[#F8D7DA] mt-3 p-2 rounded-lg flex">
//               <XCircle className="w-6 h-6 text-red-500" />
//               <p className="text-[#DC3545] pl-2">{errors.logoPreview}</p>
//             </div>
//           )}
//       {logoPreview && (
//         <div className="mt-2 ">
//           <img src={logoPreview} alt="Logo Preview" style={{ maxWidth: '30%' }} />
//         </div>
//       )}
//     </div>

//         {/* Category Checkboxes */}
//         <div className="mt-2">
//           <Label htmlFor="category">Select Category</Label>
//           {[
//             "Client Relationship Management",
//             "Governance, Risk and Compliance",
//             "Contract Lifecycle Management",
//             "E-Signature",
//             "Document Management System",
//             "E-billing and Invoicing",
//             "E-discovery",
//             "Intellectual Property Management",
//             "Litigation Management and Analytics",
//             "Legal Workflow Automation",
//             "Legal Research",
//           ].map((cat) => (
//             <div key={cat} className="items-top flex space-x-2 mt-2">
//               <Input
//                 name="category"
//                 type="checkbox"
//                 value={cat}
//                 checked={category.includes(cat)}
//                 onChange={handleChange}
//                 className="w-5 h-5"
//               />
//               <div className="grid gap-1.5 leading-none">
//                 <label className="text-sm font-medium leading-none">
//                   {cat}
//                 </label>
//               </div>
//             </div>
//           ))}
//           {errors.category && (
//             <div className="w-full bg-[#F8D7DA] mt-3 p-2 rounded-lg flex">
//               <XCircle className="w-6 h-6 text-red-500" />
//               <p className="text-[#DC3545] pl-2">{errors.category}</p>
//             </div>
//           )}
//         </div>
//         {/* Deployment Checkboxes */}
//         <div className="mt-2">
//           <Label htmlFor="deployment">Select Deployment</Label>
//           {["SaaS", "On-premise", "Hybrid", "Cloud"].map((dep) => (
//             <div key={dep} className="items-top flex space-x-2 mt-2">
//               <Input
//                 name="deployment"
//                 type="checkbox"
//                 value={dep}
//                 checked={deployment.includes(dep)}
//                 onChange={handleChange}
//                 className="w-5 h-5"
//               />
//               <div className="grid gap-1.5 leading-none">
//                 <label className="text-sm font-medium leading-none">
//                   {dep}
//                 </label>
//               </div>
//             </div>
//           ))}
//           {errors.deployment && (
//             <div className="w-full bg-[#F8D7DA] mt-3 p-2 rounded-lg flex">
//               <XCircle className="w-6 h-6 text-red-500" />
//               <p className="text-[#DC3545] pl-2">{errors.deployment}</p>
//             </div>
//           )}
//         </div>
//         {/* Select Mobile Accessibility */}
       


//         <div className="w-full mt-2">
//           <Label>Select Mobile Accessibility</Label>
//           <div className="flex items-center">
//             <label className="mr-4">
//               <input
//                 type="radio"
//                 name="freeTrial"
//                 value="Yes"
//                 checked={selectedMobileAvailability === "Yes"}
//                 onChange={handleMobile}
//               />
//               Yes
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name="freeTrial"
//                 value="No"
//                 checked={selectedMobileAvailability === "No"}
//                 onChange={handleMobile}
//               />
//               No
//             </label>
//           </div>
         
//            {errors.mobileAvailable && (
//             <div className="w-full bg-[#F8D7DA] mt-3 p-2 rounded-lg flex">
//               <XCircle className="w-6 h-6 text-red-500" />
//               <p className="text-[#DC3545] pl-2">{errors.mobileAvailable}</p>
//             </div>
//           )}
//         </div>


//         {/* Adoption Period */}
//         <div>
//       <Label htmlFor="adoptionPeriod">Adoption Period</Label>
//       <div className="flex gap-4">
//         <Input
//           name="adoptionPeriod"
//           type="text"
//           placeholder="Adoption period"
//           value={adoptionPeriod}
//           onChange={handleAdoptionPeriodChange}
//         />
//         <Select value={adoptionPeriodUnit} onValueChange={handleAdoptionPeriodUnitChange}>
//           <SelectTrigger className="w-full">
//             <SelectValue placeholder="Period"/> 
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="days">Days</SelectItem>
//             <SelectItem value="months">Months</SelectItem>
//             <SelectItem value="years">Years</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>
//       {(errors.adoptionPeriod || errors.adoptionPeriodUnit) && (
//         <div className="w-full bg-[#F8D7DA] mt-3 p-2 rounded-lg flex">
//           <XCircle className="w-6 h-6 text-red-500" />
//           <p className="text-[#DC3545] pl-2">
//             {errors.adoptionPeriod || errors.adoptionPeriodUnit}
//           </p>
//         </div>
//       )}
//         </div>
//         {/* Language Checkboxes */}
//         <div className="mt-2">
//           <Label htmlFor="languages">Select Languages</Label>
//           <MultiSelector
//             values={languages}
//             onValuesChange={handleLanguagesChange}
//           >
//             <MultiSelectorTrigger>
//               <MultiSelectorInput placeholder="Select items" />
//             </MultiSelectorTrigger>
//             <MultiSelectorContent>
//               <MultiSelectorList>
//                 {languagess.map((language) => (
//                   <MultiSelectorItem key={language} value={language}>
//                     {language}
//                   </MultiSelectorItem>
//                 ))}
//               </MultiSelectorList>
//             </MultiSelectorContent>
//           </MultiSelector>
//           {errors.languages && (
//             <div className="w-full bg-[#F8D7DA] mt-3 p-2 rounded-lg flex">
//               <XCircle className="w-6 h-6 text-red-500" />
//               <p className="text-[#DC3545] pl-2">{errors.languages}</p>
//             </div>
//           )}
//         </div>


//         {/* lang  */}

//         <div className="w-full mb-4">
//           <label htmlFor="websiteUrl">Website</label>
//           <div className="flex items-center">
//             <Input
//               type="url"
//               id="websiteUrl"
//               name="websiteUrl"
//               value={websiteUrl || ""}
//               onChange={handleUrlChange}
//               placeholder="Website URL"
//             />
//           </div>
//           {errors.websiteUrl && (
//             <p className="text-red-500">{errors.websiteUrl}</p>
//           )}
//         </div>


//         {/* Security Certificates */}
//         <div className="mt-2">
//           <Label className="securityCertificate">Security Certificates</Label>
//           <Textarea
//         name="securityCertificate"
//         placeholder="Mention name of certifications"
//         id="securityCertificate"
//         value={securityValue}
//         onChange={handleAreaChange}
//       />
//       {errors.securityCertificate && (
//             <div className="w-full bg-[#F8D7DA] mt-3 p-2 rounded-lg flex">
//               <XCircle className="w-6 h-6 text-red-500" />
//               <p className="text-[#DC3545] pl-2">{errors.securityCertificate}</p>
//             </div>
//           )}
//         </div>


//           {/* integrations  */}
//       <div className="w-full mt-2">
//       <Label htmlFor="focusCountries">Select Integrations</Label>
//       {/* <div className="w-full bg-gray-50 rounded-lg overflow-hidden mt-4 shadow-md">
//       <button
//         onClick={() => toggleCategory('root')}
//         className="w-full text-left p-3 bg-white text-gray-800 border border-gray-200 rounded-t-lg outline-none hover:bg-gray-100 transition-colors duration-150 flex items-center justify-between"
//       >
//         <span className="font-semibold">
//           {expandedCategories['root'] ? 'Hide Integrations' : 'Select Integrations'}
//         </span>
//         {expandedCategories['root'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
//       </button>

//       {expandedCategories['root'] && (
//         <div className="p-4 border border-gray-200 bg-white">
//           {Object.entries(integrations).map(([category, options]) => (
//             <div key={category} className="mb-4 last:mb-0 bg-gray-50 rounded-lg overflow-hidden">
//               <button
//                 onClick={() => toggleCategory(category)}
//                 className="flex justify-between items-center w-full p-3 text-left bg-gray-100 hover:bg-gray-200 transition-colors duration-150"
//               >
//                 <span className="font-semibold text-gray-800">{category}</span>
//                 {expandedCategories[category] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
//               </button>

//               {expandedCategories[category] && (
//                 <div className="p-3 bg-white">
//                   {options.map((option) => (
//                     <label key={option} className="flex items-center space-x-2 mb-2 cursor-pointer">
//                       <input
//                         type="checkbox"
//                         checked={selectedIntegrations.includes(option)}
//                         onChange={() => toggleIntegration(option)}
//                         className="form-checkbox h-5 w-5 text-gray-600 rounded border-gray-300 focus:ring-gray-500"
//                       />
//                       <span className="text-gray-700">{option}</span>
//                     </label>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}

//           <div className="mt-4 p-4 bg-gray-100 rounded-lg">
//             <h3 className="font-semibold mb-2 text-gray-800">Selected Integrations:</h3>
//             <ul className="list-disc pl-5 text-gray-700">
//               {selectedIntegrations.map((integration) => (
//                 <li key={integration}>{integration}</li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       )}
//     </div> */}
//      {/* <AlertDialog open={open} onOpenChange={setOpen}>
//       <AlertDialogTrigger asChild>
//         <button className="w-full text-left p-3 bg-white text-gray-800 border border-gray-200 rounded-lg outline-none hover:bg-gray-100 transition-colors duration-150 flex items-center justify-between">
//           <span className="font-semibold">
//             Select Integrations
//           </span>
//           <ChevronDown size={20} />
         
          
//         </button>
//       </AlertDialogTrigger>
//       <AlertDialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
//         <div className="p-4">
//         <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
//               <X size={20} />
//             </Button>
//           <div className="mb-4 p-4 bg-gray-100 rounded-lg">
//             <h3 className="font-semibold mb-2 text-gray-800">Selected Integrations:</h3>
//             <ul className="list-disc pl-5 text-gray-700">
//               {selectedIntegrations.map((integration) => (
//                 <li key={integration}>{integration}</li>
//               ))}
//             </ul>
//           </div>

//           {Object.entries(integrations).map(([category, options]) => (
//             <div key={category} className="mb-4 last:mb-0 bg-gray-50 rounded-lg overflow-hidden">
//               <button
//                 onClick={() => toggleCategory(category)}
//                 className="flex justify-between items-center w-full p-3 text-left bg-gray-100 hover:bg-gray-200 transition-colors duration-150"
//               >
//                 <span className="font-semibold text-gray-800">{category}</span>
//                 {expandedCategories[category] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
//               </button>

//               {expandedCategories[category] && (
//                 <div className="p-3 bg-white">
//                   {options.map((option) => (
//                     <label key={option} className="flex items-center space-x-2 mb-2 cursor-pointer">
//                       <input
//                         type="checkbox"
//                         checked={selectedIntegrations.includes(option)}
//                         onChange={() => toggleIntegration(option)}
//                         className="form-checkbox h-5 w-5 text-gray-600 rounded border-gray-300 focus:ring-gray-500"
//                       />
//                       <span className="text-gray-700">{option}</span>
//                     </label>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </AlertDialogContent>
//     </AlertDialog> */}

// <AlertDialog open={open} onOpenChange={setOpen}>
//       <AlertDialogTrigger asChild>
//         <button className="w-full text-left p-3 bg-white text-gray-800 border border-gray-200 rounded-lg outline-none hover:bg-gray-100 transition-colors duration-150 flex items-center justify-between">
//           <span className="font-semibold">
//             Select Integrations
//           </span>
//           <ChevronDown size={20} />
//         </button>
//       </AlertDialogTrigger>
//       <AlertDialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
//         <div className="p-4">
//           <div className="flex justify-between items-center mb-4">
//             <div className="relative flex-grow mr-4">
//               <input
//                 type="text"
//                 placeholder="Search integrations..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full p-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
//               />
//               {/* <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" /> */}
              
//             </div>
//             <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
//               <X size={20} />
//             </Button>
//           </div>
          
//           <div className="mb-4 p-4 bg-gray-100 rounded-lg">
//             <h3 className="font-semibold mb-2 text-gray-800">Selected Integrations:</h3>
//             <ul className="list-disc pl-5 text-gray-700">
//               {selectedIntegrations.map((integration) => (
//                 <li key={integration}>{integration}</li>
//               ))}
//             </ul>
//           </div>

//           {Object.entries(filteredIntegrations).map(([category, options]) => (
//             <div key={category} className="mb-4 last:mb-0 bg-gray-50 rounded-lg overflow-hidden">
//               <button
//                 onClick={() => toggleCategory(category)}
//                 className="flex justify-between items-center w-full p-3 text-left bg-gray-100 hover:bg-gray-200 transition-colors duration-150"
//               >
//                 <span className="font-semibold text-gray-800">{category}</span>
//                 {expandedCategories[category] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
//               </button>

//               {expandedCategories[category] && (
//                 <div className="p-3 bg-white">
//                   {options.map((option) => (
//                     <label key={option} className="flex items-center space-x-2 mb-2 cursor-pointer">
//                       <input
//                         type="checkbox"
//                         checked={selectedIntegrations.includes(option)}
//                         onChange={() => toggleIntegration(option)}
//                         className="form-checkbox h-5 w-5 text-gray-600 rounded border-gray-300 focus:ring-gray-500"
//                       />
//                       <span className="text-gray-700">{option}</span>
//                     </label>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </AlertDialogContent>
//     </AlertDialog>

    
      
//           {errors.integrations && (
//             <div className="w-full bg-[#F8D7DA] mt-3 mb-3 p-2 rounded-lg flex">
//               <XCircle className="w-6 h-6 text-red-500" />
//               <p className="text-[#DC3545] pl-2">{errors.integrations}</p>
//             </div>
//           )}
//       </div>

//         {/* Focus Countries */}
//         <div className="mt-2">
        
//           <Label htmlFor="focusCountries">Select Countries (Max 5)</Label>
//           <MultiSelector
//             values={focusCountries}
//             onValuesChange={handleCountriesChange}
//           >
//             <MultiSelectorTrigger>
//               <MultiSelectorInput placeholder="Select countries" />
//             </MultiSelectorTrigger>
//             <MultiSelectorContent>
//               <MultiSelectorList>
//                 {countries.map((country) => (
//                   <MultiSelectorItem
//                     key={country}
//                     value={country}
//                     disabled={
//                       focusCountries.length >= 5 &&
//                       !focusCountries.includes(country)
//                     }
//                   >
//                     {country}
//                   </MultiSelectorItem>
//                 ))}
//               </MultiSelectorList>
//             </MultiSelectorContent>
//           </MultiSelector>
//           {errors.focusCountries && (
//             <div className="w-full bg-[#F8D7DA] mt-3 mb-3 p-2 rounded-lg flex">
//               <XCircle className="w-6 h-6 text-red-500" />
//               <p className="text-[#DC3545] pl-2">{errors.focusCountries}</p>
//             </div>
//           )}
//         </div>
        
//         <Button type="submit" className=" bg-blue-500 text-white font-semibold "   >Save Product Information</Button>
       
//       </div>
//     </form>
<form onSubmit={handleSubmit} className="w-full font-calarity max-w-4xl mx-auto">
{alert && (
  <Alert 
    message={alert.message} 
    type={alert.type} 
    onClose={() => setAlert(null)} 
  />
)}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Left Column */}
    <div>
      {/* Product Name */}
      <div className="mb-4">
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
          <div className="w-full bg-[#F8D7DA] mt-2 p-2 rounded-lg flex">
            <XCircle className="w-5 h-5 text-red-500" />
            <p className="text-[#DC3545] pl-2 text-sm">{errors.productName}</p>
          </div>
        )}
      </div>

      {/* Logo */}
      <div className="mb-4">
        <Label htmlFor="logo">Logo</Label>
        <Input
          type="file"
          id="logo"
          name="logo"
          className="mt-1"
          onChange={handleFileChange}
        />
        {errors.logoPreview && (
          <div className="w-full bg-[#F8D7DA] mt-2 p-2 rounded-lg flex">
            <XCircle className="w-5 h-5 text-red-500" />
            <p className="text-[#DC3545] pl-2 text-sm">{errors.logoPreview}</p>
          </div>
        )}
        {logoPreview && (
          <div className="mt-2">
            <img src={logoPreview} alt="Logo Preview" style={{ maxWidth: '150px' }} />
          </div>
        )}
      </div>

      {/* Website URL */}
      <div className="mb-4">
        <Label htmlFor="websiteUrl">Website</Label>
        <Input
          type="url"
          id="websiteUrl"
          name="websiteUrl"
          value={websiteUrl || ""}
          onChange={handleUrlChange}
          placeholder="Website URL"
          className="mt-1"
        />
        {errors.websiteUrl && (
          <div className="w-full bg-[#F8D7DA] mt-2 p-2 rounded-lg flex">
            <XCircle className="w-5 h-5 text-red-500" />
            <p className="text-[#DC3545] pl-2 text-sm">{errors.websiteUrl}</p>
          </div>
        )}
      </div>

      {/* Mobile Accessibility */}
      <div className="mb-4">
        <Label>Mobile Accessibility</Label>
        <div className="flex items-center mt-1">
          <label className="flex items-center mr-4">
            <input
              type="radio"
              name="freeTrial"
              value="Yes"
              checked={selectedMobileAvailability === "Yes"}
              onChange={handleMobile}
              className="mr-2"
            />
            <span>Yes</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="freeTrial"
              value="No"
              checked={selectedMobileAvailability === "No"}
              onChange={handleMobile}
              className="mr-2"
            />
            <span>No</span>
          </label>
        </div>
        {errors.mobileAvailable && (
          <div className="w-full bg-[#F8D7DA] mt-2 p-2 rounded-lg flex">
            <XCircle className="w-5 h-5 text-red-500" />
            <p className="text-[#DC3545] pl-2 text-sm">{errors.mobileAvailable}</p>
          </div>
        )}
      </div>

      {/* Adoption Period */}
      <div className="mb-4">
        <Label htmlFor="adoptionPeriod">Adoption Period</Label>
        <div className="flex gap-2 mt-1">
          <Input
            name="adoptionPeriod"
            type="text"
            placeholder="Adoption period"
            value={adoptionPeriod | ""}
            onChange={handleAdoptionPeriodChange}
          />
          <Select value={adoptionPeriodUnit} onValueChange={handleAdoptionPeriodUnitChange}>
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
        {/* {(errors.adoptionPeriod || errors.adoptionPeriodUnit) && (
          <div className="w-full bg-[#F8D7DA] mt-2 p-2 rounded-lg flex">
            <XCircle className="w-5 h-5 text-red-500" />
            <p className="text-[#DC3545] pl-2 text-sm">
              {errors.adoptionPeriod || errors.adoptionPeriodUnit}
            </p>
          </div>
        )} */}
      </div>

      {/* Security Certificates */}
      <div className="mb-4">
        <Label htmlFor="securityCertificate">Security Certificates</Label>
        <Textarea
          name="securityCertificate"
          placeholder="Mention name of certifications"
          id="securityCertificate"
          value={securityValue}
          onChange={handleAreaChange}
          className="mt-1"
        />
        {errors.securityCertificate && (
          <div className="w-full bg-[#F8D7DA] mt-2 p-2 rounded-lg flex">
            <XCircle className="w-5 h-5 text-red-500" />
            <p className="text-[#DC3545] pl-2 text-sm">{errors.securityCertificate}</p>
          </div>
        )}
      </div>
    </div>

    {/* Right Column */}
    <div>
      {/* Category Selection */}
      <div className="mb-4">
        <Label htmlFor="category">Category</Label>
        <div className="mt-1 border border-gray-200 rounded-lg p-3 max-h-60 overflow-y-auto">
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
            <div key={cat} className="flex items-center space-x-2 mb-2">
              <Input
                name="category"
                type="checkbox"
                value={cat}
                checked={category.includes(cat)}
                onChange={handleChange}
                className="w-4 h-4"
                id={`category-${cat}`}
              />
              <label htmlFor={`category-${cat}`} className="text-sm">
                {cat}
              </label>
            </div>
          ))}
        </div>
        {errors.category && (
          <div className="w-full bg-[#F8D7DA] mt-2 p-2 rounded-lg flex">
            <XCircle className="w-5 h-5 text-red-500" />
            <p className="text-[#DC3545] pl-2 text-sm">{errors.category}</p>
          </div>
        )}
      </div>

      {/* Deployment Options */}
      <div className="mb-4">
        <Label htmlFor="deployment">Deployment</Label>
        <div className="mt-1 flex flex-wrap gap-4">
          {["SaaS", "On-premise", "Hybrid", "Cloud"].map((dep) => (
            <label key={dep} className="flex items-center space-x-2">
              <Input
                name="deployment"
                type="checkbox"
                value={dep}
                checked={deployment.includes(dep)}
                onChange={handleChange}
                className="w-4 h-4"
                id={`deployment-${dep}`}
              />
              <span className="text-sm">{dep}</span>
            </label>
          ))}
        </div>
        {errors.deployment && (
          <div className="w-full bg-[#F8D7DA] mt-2 p-2 rounded-lg flex">
            <XCircle className="w-5 h-5 text-red-500" />
            <p className="text-[#DC3545] pl-2 text-sm">{errors.deployment}</p>
          </div>
        )}
      </div>

      {/* Languages */}
      <div className="mb-4">
        <Label htmlFor="languages">Languages</Label>
        <MultiSelector
          values={languages}
          onValuesChange={handleLanguagesChange}
          className="mt-1"
        >
          <MultiSelectorTrigger>
            <MultiSelectorInput placeholder="Select languages" />
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
          <div className="w-full bg-[#F8D7DA] mt-2 p-2 rounded-lg flex">
            <XCircle className="w-5 h-5 text-red-500" />
            <p className="text-[#DC3545] pl-2 text-sm">{errors.languages}</p>
          </div>
        )}
      </div>

      {/* Focus Countries */}
      <div className="mb-4">
        <Label htmlFor="focusCountries">Focus Countries (Max 5)</Label>
        <MultiSelector
          values={focusCountries}
          onValuesChange={handleCountriesChange}
          className="mt-1"
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
                    focusCountries.length >= 5 &&
                    !focusCountries.includes(country)
                  }
                >
                  {country}
                </MultiSelectorItem>
              ))}
            </MultiSelectorList>
          </MultiSelectorContent>
        </MultiSelector>
        {errors.focusCountries && (
          <div className="w-full bg-[#F8D7DA] mt-2 p-2 rounded-lg flex">
            <XCircle className="w-5 h-5 text-red-500" />
            <p className="text-[#DC3545] pl-2 text-sm">{errors.focusCountries}</p>
          </div>
        )}
      </div>
    </div>
  </div>

  {/* Full Width Section */}
  <div className="mt-2 mb-6">
    <Label htmlFor="integrations">Integrations</Label>
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <button className="w-full text-left mt-1 p-3 bg-white text-gray-800 border border-gray-200 rounded-lg outline-none hover:bg-gray-100 transition-colors duration-150 flex items-center justify-between">
          <span className="font-medium">
            Select Integrations
          </span>
          <ChevronDown size={16} />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="relative flex-grow mr-4">
              <input
                type="text"
                placeholder="Search integrations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <X size={20} />
            </Button>
          </div>
          
          <div className="mb-4 p-4 bg-gray-100 rounded-lg">
            <h3 className="font-semibold mb-2 text-gray-800">Selected Integrations:</h3>
            {selectedIntegrations.length > 0 ? (
              <ul className="list-disc pl-5 text-gray-700">
                {selectedIntegrations.map((integration) => (
                  <li key={integration}>{integration}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No integrations selected</p>
            )}
          </div>

          {Object.entries(filteredIntegrations).map(([category, options]) => (
            <div key={category} className="mb-4 last:mb-0 bg-gray-50 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleCategory(category)}
                className="flex justify-between items-center w-full p-3 text-left bg-gray-100 hover:bg-gray-200 transition-colors duration-150"
              >
                <span className="font-semibold text-gray-800">{category}</span>
                {expandedCategories[category] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {expandedCategories[category] && (
                <div className="p-3 bg-white">
                  {options.map((option) => (
                    <label key={option} className="flex items-center space-x-2 mb-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedIntegrations.includes(option)}
                        onChange={() => toggleIntegration(option)}
                        className="form-checkbox h-4 w-4 text-gray-600 rounded border-gray-300 focus:ring-gray-500"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </AlertDialogContent>
    </AlertDialog>
    {errors.integrations && (
      <div className="w-full bg-[#F8D7DA] mt-2 p-2 rounded-lg flex">
        <XCircle className="w-5 h-5 text-red-500" />
        <p className="text-[#DC3545] pl-2 text-sm">{errors.integrations}</p>
      </div>
    )}
  </div>

  {/* Submit Button */}
  <Button 
    type="submit" 
    className="w-full bg-blue-500 text-white font-semibold py-2.5"
  >
    Save Product Information
  </Button>
</form>
  );
};

export default ProductInformation;
