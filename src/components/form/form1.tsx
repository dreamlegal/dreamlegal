"use client";
import { FormValues, useFormContext } from "@/context/formValueContext";
import { ChangeEvent } from "react";
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

import { useState, useEffect } from 'react';

interface FormProps {
  
  form1Pending: boolean;
  setForm1Pending: React.Dispatch<React.SetStateAction<boolean>>;
}

function Form1({form1Pending, setForm1Pending }: FormProps) {
  
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
    "24/7Live Virtual Legal Receptionists",
    "4LegalLeads",
    "ABC Legal",
    "Accurate Legal Billing",
    "Activewords",
    "Adobe",
    "Afterpattern",
    "AgileLaw",
    "aiLegal",
    "Alert Communications",
    "Alpha Legal",
    "AltFee",
    "Amiqus",
    "Answering Legal",
    "Apexchat",
    "ApperaMe",
    "Apptoto",
    "Arken",
    "Atlegal",
    "AXEL Go",
    "Back Office Betties",
    "Billerassist",
    "Billzer",
    "Birdeye",
    "Blackacre Pro Integration",
    "Box",
    "Broadly",
    "Bundledocs",
    "Cahroom",
    "Call Connector",
    "Calling and SMS",
    "CallRail",
    "Captorra",
    "Caramail",
    "Case Status",
    "CaseAtlas",
    "Casemail",
    "Casetext",
    "Cashroom",
    "Checktrade",
    "Chrometa",
    "Civille Integration",
    "Clearbrief",
    "Click to file",
    "Client Desktop",
    "Clientchat",
    "Clientping",
    "Clientrock",
    "Gmail",
    "Klyant",
    "Microsoft",
    "Xero accounting software",
    "Draft",
    "Microsoft Teams",
    "Clio Payments",
    "Clio-goto",
    "Clio's Outlook 365 Add-in",
    "CollBox",
    "Corvum",
    "Corvum Texting",
    "CourtDrive",
    "Courttrax",
    "CozyCal Scheduling",
    "CRM Connector",
    "Dealcloser",
    "DecisionVault",
    "Dendri",
    "Dialpad",
    "Diligen",
    "Directive Communication Systems",
    "Directlaw",
    "Discovery",
    "Divorcehelp123",
    "Docketalarm",
    "Docketbird",
    "Docketly",
    "Docketman",
    "Docketwise",
    "DocMoto",
    "Dropbox",
    "dtour.life",
    "Dynamic Self Declarations",
    "eCourtReporters",
    "EDEX Mailing for Attorneys",
    "eEndorsements",
    "Effortless Legal",
    "EffortlessLegal",
    "Embroker",
    "Epona DMSforLegal and Matter Center",
    "ESI-Legal",
    "Estateably",
    "Evenup",
    "Evichat",
    "Expediate",
    "Expertise",
    "EZ eFile by US Legal PRO",
    "Fastcase",
    "Faster Backup",
    "Faster Time",
    "Fasterlaw",
    "Fastmail",
    "Fidu Client Experience Platform",
    "Financial Disclosures",
    "Firmtrak",
    "FormEvo",
    "Formstack",
    "Foundation AI",
    "Freshbooks",
    "Funddocs",
    "Gavel Document Automation",
    "Gideon",
    "Google Apps",
    "Google Calender",
    "Google Contacts",
    "Google Drive",
    "Gretchen",
    "HarakaConnect for imanage",
    "Heymarket",
    "Highlevel",
    "Hire an Esquire",
    "Hivelight",
    "Hona",
    "HubSpot",
    "Hyperlaw",
    "Immediation",
    "Info Track Australia",
    "Info Track UK",
    "Infotrack",
    "InfoTrack Australia",
    "InfraWareDictation",
    "Inktaker",
    "InsightsOfficer",
    "Instance Connector",
    "InterActive LegalSuite",
    "Inventive IP",
    "Invoco Telecom",
    "Invoice Convert",
    "InvoiceSherpa",
    "Jubilee",
    "Jurispage",
    "kenect",
    "Knackly",
    "Kolleno",
    "Law Ruler",
    "Lawbrokr",
    "LawCloud",
    "LawDroid Builder",
    "Lawgood",
    "LawKPIs- Reporting and Analysis Solution",
    "Lawlytics",
    "Lawmatics",
    "Lawpay",
    "Lawtap Appointment Booking Manager",
    "Leaddocket",
    "Leaflet",
    "Leaguewell",
    "Legably",
    "Legal Beagle",
    "Legal Connect",
    "Legal Ninja",
    "Legalboards",
    "Legaler",
    "Legallinc",
    "Levitate",
    "Lexbox",
    "Lexop",
    "Lexreception",
    "LexWorkplace",
    "Litera",
    "Logikcull",
    "Lupl",
    "Magic Time",
    "Mailchip",
    "Mailform",
    "Martindale-Nolo",
    "Mass Document Automation",
    "Matter Match Migrator",
    "MatterSnail",
    "Medilenz",
    "Messagehub",
    "Microsoft 365 Onedrive",
    "MightyForms",
    "MotaWord Document Translation",
    "Multus Medical",
    "My Legal Briefcase",
    "Myfirm Datta",
    "Netdocuments",
    "NetDocuments Powered by GDSI",
    "Nextchapter",
    "Nextiva",
    "Ngagelive",
    "Nice Job",
    "Nota by M&T Bank",
    "Notarize",
    "Nuage Diagonostics",
    "Office 365 Contracts",
    "OneNotary",
    "Ooma Office",
    "Patlive",
    "Podium",
    "Primalaw",
    "Proclaim",
    "Proof",
    "Quickbooks",
    "Rainmaker",
    "Rapid Legal",
    "Recordgrabber",
    "Report",
    "Repsight",
    "Rest",
    "Retrievables",
    "ReviewSolicitors",
    "RingCentral",
    "Rocketcase",
    "Ruby",
    "RushAnswer",
    "Scansnapit",
    "SEDNA",
    "Settify",
    "Shoveler",
    "Sign with DocuSign",
    "Smart Drafter",
    "Smarter",
    "SMS FOR Legal Integration",
    "Spectacles",
    "Spring",
    "SQL",
    "Steno",
    "Taxguru",
    "Techradar",
    "Text Request",
    "Texttranch",
    "TimeBro",
    "Timeline",
    "Timeminer",
    "Timessparrow",
    "Timetracker by ebillity",
    "Tracers",
    "Tracklight",
    "Trustbooks",
    "Trustifi",
    "UnbundledAttorney",
    "Vaultie",
    "Verify 365",
    "Veta Virtual Receptionist",
    "Vijilent",
    "Voicespin",
    "Vonage",
    "Wealthcounsel",
    "Wisetime",
    "Wordpress",
    "Workload",
    "Worldox Powered by GDS",
    "Xerox Connect",
    "Yocierge",
    "Yourefolio",
    "Zapier",
    "Zoom",
    "Zorrosign",
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
    
   

    // const isFormValid = validateForm();

    // if (!isFormValid) {
    //   return; // Stop form submission if there are validation errors
    // }

    // Perform form submission logic here
    setForm1Pending(true);
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
              required
            />
          </div>
          {/* Product Logo */}
          {/* {formValues.logo && typeof formValues.logo === 'object' && (
            <div className="mt-2">
              <img
                src={URL.createObjectURL(formValues.logo)} // Create a URL for the uploaded image
                alt="Selected Logo"
                className="h-20 w-20 object-cover"
              />
            </div>
          )}

          <div className="mt-2">
            <Label htmlFor="logo">Product Logo</Label>
           
            <Input
              name="logo"
              type="file"
              placeholder="Logo"
              
              
              onChange={handleChange}
            />
          </div> */}
 
 <div className="mt-2">
            <Label className="prname">Product Name</Label>
  
  <div>
      {formValues.logo && typeof formValues.logo === 'object' ? (
        <>
          {/* Image preview if logo is uploaded */}
          
          <div className="mt-2">
            <img
              src={URL.createObjectURL(formValues.logo)} // Create a URL for the uploaded image
              alt="Selected Logo"
              className="h-20 w-20 object-cover"
            />
          </div>
          <label
            htmlFor="logoInput"
            className="block mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg cursor-pointer text-center hover:bg-blue-600"
          >
            Reselect file
          </label>
          <input
            id="logoInput"
            name="logo"
            type="file"
            style={{ display: 'none' }} // Hide the default file input
            onChange={handleChange}
          />
        </>
      ) : (
        <>
          {/* Regular input when no logo is selected */}
          <label
            htmlFor="logoInput"
            style={{ cursor: 'pointer', display: 'block', marginTop: '10px' }}
            className="block mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg cursor-pointer text-center hover:bg-blue-600"
          >
            Choose A Logo
          </label>
          <input
            id="logoInput"
            name="logo"
            type="file"
            style={{ display: 'none' }} // Hide the default file input
            onChange={handleChange}
          />
        </>
      )}
    </div>
</div>
          {/* Category checkboxes */}
          <div className="mt-2">
            <Label htmlFor="category">Select Category</Label>
            {[
              "Client Relationship Management ",
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
                type="number"
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
              required
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
