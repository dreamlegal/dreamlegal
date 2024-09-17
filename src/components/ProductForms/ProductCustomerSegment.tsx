
// const predefinedCategories = {
//   userCategories: [
//     "Individual Practitioner",
//     "Law firms",
//     "Government departments",
//     "Startups",
//     "Enterprises",
//     "Judiciary",
//     "In-House Counsels",
//   ],
//   industries: [
//     "Neutral",
//     "Accounting firms",
//     "Agriculture",
//     "Banking and Finance",
//     "Construction and Engineering",
//     "Consulting firms",
//     "Defence",
//     "Education",
//     "Energy and Utilities",
//     "Government and Public Sector",
//     "Healthcare",
//     "Hospitality and Tourism",
//     "Insurance",
//     "Legal Services Providers",
//     "Manufacturing",
//     "Media and Entertainment",
//     "Non-Profit Organizations",
//     "Pharmaceutical and Life Sciences",
//     "Real Estate",
//     "Retail and Consumer Goods",
//     "Technology and Software",
//     "Telecommunications",
//     "Transportation and Logistics",
//   ],
//   practiceAreas: [
//     "Neutral",
//     "Appellate Law",
//     "Antitrust Law",
//     "Alternative Dispute Resolution",
//     "Aviation",
//     "Banking & Finance",
//     "Business Law",
//     "Civil Law",
//     "Company",
//     "Contract",
//     "Consumer Protection",
//     "Competition/Anti-Trust Law",
//     "Construction",
//     "Corporate Law",
//     "Cybersecurity and Privacy Law",
//     "Mergers and Acquisitions (M&A)",
//     "Defense Law",
//     "Dispute Resolution",
//     "Election Law",
//     "Education Law",
//     "Energy and Natural Resources",
//     "Environmental Law",
//     "Labour and Employment Law",
//     "Franchise Law",
//     "Foreign Exchange Law",
//     "Family and Succession",
//     "Food and Drug Law",
//     "Gaming Law",
//     "Human Rights Law",
//     "Healthcare",
//     "International Law",
//     "Immigration Law",
//     "Infrastructure",
//     "Insolvency and Banking",
//     "Insurance",
//     "Information Technology",
//     "Intellectual Property Law",
//     "Investment Law",
//     "International Trade and Customs Law",
//     "Management of Litigation",
//     "Manufacturing in India",
//     "Metals and Mining",
//     "Technology Law",
//     "Tax Law",
//     "Telecommunication Law",
//     "Personal Injury Law",
//     "Product Liability",
//     "Pharma and Life Sciences",
//     "Public Interest Law",
//     "Public Finance Law",
//     "Railways",
//     "Real Estate/Property Law",
//     "Social Security and Disability Law",
//     "Securities Law",
//     "Sports, Media, Entertainment and Advertising",
//     "Shipping",
//     "Tax-Exempt Organizations Law",
//     "Transportation Law",
//     "Trade and commerce",
//     "Trust",
//     "Other",
//   ],
//   teamSizes: [
//     "1",
//     "2-20",
//     "21-50",
//     "51-200",
//     "201-500",
//     "500+",
//   ],
// };



// import React, { useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Slider } from "@/components/ui/slider";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { X, Lock, Unlock } from "lucide-react";
// import { useCustomerSegmentStore } from "./UserCustomerSegmentStore";



// type CategoryType = "userCategories" | "industries" | "practiceAreas" | "teamSizes";

// export default function ProductCustomerSegment() {
//   const { customerSegment, addCategory, removeCategory, updatePercentage, toggleLock, validateAndSave } = useCustomerSegmentStore();
//   const [customCategory, setCustomCategory] = useState<{
//     [key in CategoryType]: string;
//   }>({
//     userCategories: "",
//     industries: "",
//     practiceAreas: "",
//     teamSizes: "",
//   });

//   const handleSelectChange = (type: CategoryType, value: string) => {
//     if (value === "Other") {
//       setCustomCategory((prev) => ({ ...prev, [type]: "" }));
//     } else {
//       addCategory(type, value);
//     }
//   };

//   const handleCustomCategorySubmit = (
//     e: React.FormEvent,
//     type: CategoryType
//   ) => {
//     e.preventDefault();
//     if (customCategory[type]) {
//       addCategory(type, customCategory[type]);
//       setCustomCategory((prev) => ({ ...prev, [type]: "" }));
//     }
//   };

//   const renderCategorySection = (type: CategoryType, title: string) => (
//     <div className="space-y-4">
//       <h3 className="text-lg font-semibold">{title}</h3>
//       <div className="flex space-x-2">
//         <Select onValueChange={(value) => handleSelectChange(type, value)}>
//           <SelectTrigger className="">
//             <SelectValue placeholder={`Select ${title}`} />
//           </SelectTrigger>
//           <SelectContent>
//             {predefinedCategories[type].map((category) => (
//               <SelectItem key={category} value={category}>
//                 {category}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//         {customCategory[type] !== "" && (
//           <form
//             onSubmit={(e) => handleCustomCategorySubmit(e, type)}
//             className="flex space-x-2"
//           >
//             <Input
//               placeholder={`Enter custom ${title}`}
//               value={customCategory[type]}
//               onChange={(e) =>
//                 setCustomCategory((prev) => ({
//                   ...prev,
//                   [type]: e.target.value,
//                 }))
//               }
//             />
//             <Button type="submit">Add</Button>
//           </form>
//         )}
//       </div>
//       {customerSegment[type].map((category) => (
//         <div key={category.name} className="">
//           <div className="flex justify-between items-center">
//             <Label>{category.name}</Label>
//             <div>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={() => toggleLock(type, category.name)}
//               >
//                 {category.locked ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
//               </Button>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={() => removeCategory(type, category.name)}
//               >
//                 <X className="h-4 w-4" />
//               </Button>
//             </div>
//           </div>
//           <div className="flex items-center">
//             <Slider
//               max={100}
//               step={1}
//               value={[category.percentage]}
//               onValueChange={(value) =>
//                 updatePercentage(type, category.name, value[0])
//               }
//               className="flex-grow"
//               disabled={category.locked}
//             />
//             <Input
//               type="number"
//               min="0"
//               max="100"
//               value={category.percentage}
//               onChange={(e) =>
//                 updatePercentage(type, category.name, parseInt(e.target.value) || 0)
//               }
//               className="w-16"
//               disabled={category.locked}
//             />
//             <span>%</span>
//           </div>
//         </div>
//       ))}
//     </div>
//   );

//   const handleSubmit = () => {
//     if (validateAndSave()) {
//       alert('Data saved successfully!');
//     } else {
//       alert('Validation failed. Please check your inputs.');
//     }
//   };

//   return (
//     <Card className="w-full max-w-4xl mx-auto mt-4">
//       <span className="text-red-500 italic font-bold text-xs">All Fields Are Required </span>

//       <CardContent className="space-y-8 mt-4">
//         {renderCategorySection("userCategories", "Target User Categories")}
//         {renderCategorySection("industries", "Target Industries")}
//         {renderCategorySection("practiceAreas", "Target Practice Areas")}
//         {renderCategorySection("teamSizes", "Target Client Team Sizes")}
//         <Button className="w-full bg-blue-500 text-white font-semibold " onClick={handleSubmit}>Save Customer Segments </Button>
//       </CardContent>
//     </Card>
//   );
// }








type PredefinedCategories = {
  userCategories: string[];
  industries: string[];
  practiceAreas: string[];
  teamSizes: string[];
};

const predefinedCategories: PredefinedCategories = {
  userCategories: [
    "Individual Practitioner",
    "Law firms",
    // ... rest of the categories
  ],
  industries: [
    "Neutral",
    "Accounting firms",
    // ... rest of the industries
  ],
  practiceAreas: [
    "Neutral",
    "Appellate Law",
    // ... rest of the practice areas
  ],
  teamSizes: [
    "1",
    "2-20",
    // ... rest of the team sizes
  ],
};


const predefinedCategories = {
  userCategories: [
    "Individual Practitioner",
    "Law firms",
    "Government departments",
    "Startups",
    "Enterprises",
    "Judiciary",
    "In-House Counsels",
  ],
  industries: [
    "Neutral",
    "Accounting firms",
    "Agriculture",
    "Banking and Finance",
    "Construction and Engineering",
    "Consulting firms",
    "Defence",
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
  ],
  practiceAreas: [
    "Neutral",
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
  ],
  teamSizes: [
    "1",
    "2-20",
    "21-50",
    "51-200",
    "201-500",
    "500+",
  ],
};


import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Lock, Unlock } from "lucide-react";
import { useCustomerSegmentStore } from "./UserCustomerSegmentStore";
import { ProductInfo } from "@/store/useStore";

// ... keep the predefinedCategories object as is

type CategoryType = "userCategories" | "industries" | "practiceAreas" | "teamSizes";

export default function ProductCustomerSegment() {
  const { 
    customerSegment, 
    addCategory, 
    removeCategory, 
    updatePercentage, 
    toggleLock, 
    validateAndSave,
    initializeFromGlobalStore 
  } = useCustomerSegmentStore();



  const handleSelectChange = (type: CategoryType, value: string) => {
    if (value === "Other") {
      setCustomCategory((prev) => ({ ...prev, [type]: "" }));
    } else {
      addCategory(type, value);
    }
  };

  const handleCustomCategorySubmit = (
    e: React.FormEvent,
    type: CategoryType
  ) => {
    e.preventDefault();
    if (customCategory[type]) {
      addCategory(type, customCategory[type]);
      setCustomCategory((prev) => ({ ...prev, [type]: "" }));
    }
  };

  const renderCategorySection = (type: CategoryType, title: string) => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="flex space-x-2">
        <Select onValueChange={(value) => handleSelectChange(type, value)}>
          <SelectTrigger className="">
            <SelectValue placeholder={`Select ${title}`} />
          </SelectTrigger>
          <SelectContent>
            {predefinedCategories[type].map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {customCategory[type] !== "" && (
          <form
            onSubmit={(e) => handleCustomCategorySubmit(e, type)}
            className="flex space-x-2"
          >
            <Input
              placeholder={`Enter custom ${title}`}
              value={customCategory[type]}
              onChange={(e) =>
                setCustomCategory((prev) => ({
                  ...prev,
                  [type]: e.target.value,
                }))
              }
            />
            <Button type="submit">Add</Button>
          </form>
        )}
      </div>
      {customerSegment[type].map((category) => (
        <div key={category.name} className="">
          <div className="flex justify-between items-center">
            <Label>{category.name}</Label>
            <div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleLock(type, category.name)}
              >
                {category.locked ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeCategory(type, category.name)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex items-center">
            <Slider
              max={100}
              step={1}
              value={[category.percentage]}
              onValueChange={(value) =>
                updatePercentage(type, category.name, value[0])
              }
              className="flex-grow"
              disabled={category.locked}
            />
            <Input
              type="number"
              min="0"
              max="100"
              value={category.percentage}
              onChange={(e) =>
                updatePercentage(type, category.name, parseInt(e.target.value) || 0)
              }
              className="w-16"
              disabled={category.locked}
            />
            <span>%</span>
          </div>
        </div>
      ))}
    </div>
  );
  
  const [customCategory, setCustomCategory] = useState<{
    [key in CategoryType]: string;
  }>({
    userCategories: "",
    industries: "",
    practiceAreas: "",
    teamSizes: "",
  });

  useEffect(() => {
    console.log('Component mounted, checking for existing data');
    const globalStore = ProductInfo.getState();
    console.log('Global Store Data:', globalStore);

    if (globalStore.userCategory?.length || globalStore.industry?.length || 
        globalStore.practiceAreas?.length || globalStore.teamSize?.length) {
      console.log('Existing data found, initializing from global store');
      initializeFromGlobalStore();
    } else {
      console.log('No existing data found');
    }
  }, [initializeFromGlobalStore]);

  useEffect(() => {
    console.log('Customer Segment updated:', customerSegment);
  }, [customerSegment]);

  // ... keep the rest of your component logic (handleSelectChange, handleCustomCategorySubmit, etc.) as is

  const handleSubmit = () => {
    console.log('Attempting to save data');
    if (validateAndSave()) {
      console.log('Data saved successfully');
      alert('Data saved successfully!');
    } else {
      console.log('Validation failed');
      alert('Validation failed. Please check your inputs.');
    }
  };

  // ... keep the renderCategorySection function as is

  return (
    <Card className="w-full max-w-4xl mx-auto mt-4">
      <span className="text-red-500 italic font-bold text-xs">All Fields Are Required </span>

      <CardContent className="space-y-8 mt-4">
        {renderCategorySection("userCategories", "Target User Categories")}
        {renderCategorySection("industries", "Target Industries")}
        {renderCategorySection("practiceAreas", "Target Practice Areas")}
        {renderCategorySection("teamSizes", "Target Client Team Sizes")}
        <Button className="w-full bg-blue-500 text-white font-semibold " onClick={handleSubmit}>Save Customer Segments</Button>
      </CardContent>
    </Card>
  );
}