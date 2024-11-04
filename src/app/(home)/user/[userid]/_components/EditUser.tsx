// "use client";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useRouter } from "next/navigation";
// import { useParams } from "next/navigation";
// import React, { useState } from "react";

// function EditUser({ data, onCloseEdit }: any) {
//   const path = useParams();
//   const [logoPreview, setLogoPreview] = useState<string | null>(null);
//   const organizationTypes = [
//     "Law firms",
//     "Enterprises",
//     "Individual Practitioners",
//     "Startups",
//     "Government Departments",
//     "Judiciary",
//    "In-House Counsels"
//   ];
//   const userId = path?.userid;
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     Contact: data.profile?.Contact || "",
//     Location: data.profile?.Location || "",
//     Address: data.profile?.Address || "",
//     TeamSize: data.profile?.TeamSize || "",
//     Designation: data.profile?.Designation || "",
//     CompanyType: data.profile?.CompanyType || "",
//     CompanyAddress: data.profile?.CompanyAddress || "",
//     CompanyEmail: data.profile?.CompanyEmail || "",
//     ProfileImage: null,
//     MarketingAccept: false,
//     editing: true,
//   });
//   const handleChange = (e: any) => {
//     const { name, value, type, checked, files } = e.target;
//     if (type === "file") {
//       setFormData((prevData) => ({
//         ...prevData,
//         [name]: files[0],
//       }));
//     } else if (type === "checkbox") {
//       setFormData((prevData) => ({
//         ...prevData,
//         [name]: checked,
//       }));
//     } else {
//       setFormData((prevData) => ({
//         ...prevData,
//         [name]: value,
//       }));
//     }
//   };

//   const uploadFile = async (file: File, folderName: string) => {
//     // Create the form data
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("folderName", folderName);

//     try {
//       // Send the POST request
//       const response = await fetch("/api/upload-file", {
//         method: "POST",
//         body: formData,
//       });

//       // Handle the response
//       if (response.ok) {
//         const data = await response.json();
//         if (data.success) {
//           const url = data.location;
//           console.log("Uploaded file location:", url);
//           return url;
//         } else {
//           console.error("Upload failed:", data.error);
//         }
//       } else {
//         console.error("Failed to upload file:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error uploading file:", error);
//     }
//     return null;
//   };

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();

//     // Handle form submission, e.g., send data to an API
//     try {
//       if (formData.ProfileImage) {
//         const response = await uploadFile(formData.ProfileImage, "profile");
//         setLogoPreview(response);
//       }
//       const response = await fetch("/api/edit-user", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ ...formData, userId, logoPreview }),
//       });

//       const result = await response.json();

//       if (result.success) {
//         console.log("Profile created successfully:", result.profile);
//         onCloseEdit();
//         window.location.reload();
//       } else {
//         console.error("Error creating profile:", result.msg);
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//     console.log("Form submitted:", formData);
//   };
//   const teamSize = [
//     "1",
//     "2-20",
//     "21-50",
//     "51- 200",
//     "201-500",
//     "500+",
//   ];
//   return (
//     <main className="">
//       <div className="max-w-xl lg:max-w-3xl">
//         <div className="flex justify-between">
//           <h1 className="mt-2 text-xl font-bold text-gray-900 sm:text-xl md:text-xl">
//             Edit Profile
//           </h1>
//           <Button
//             variant={"secondary"}
//             className="cursor-pointer"
//             onClick={onCloseEdit}
//           >
//             Back
//           </Button>
//         </div>

//         <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-6 gap-6">
         


//           <div className="col-span-6 sm:col-span-3">
//             <label
//               htmlFor="Designation"
//               className="block text-sm font-medium text-gray-700"
//             >
//               {" "}
//               Designation{" "}
//             </label>

//             <input
//               type="text"
//               id="Designation"
//               required
//               name="Designation"
//               value={formData.Designation}
//               onChange={handleChange}
//               className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
//             />
//           </div>
//           <div className="col-span-6 sm:col-span-3">
//             <label
//               htmlFor="CompanyAddress"
//               className="block text-sm font-medium text-gray-700"
//             >
//               {" "}
//               Organisation Name{" "}
//             </label>

//             <input
//               type="text"
//               id="CompanyAddress"
//               name="CompanyAddress"
//               required
//               value={formData.CompanyAddress}
//               onChange={handleChange}
//               className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
//             />
//           </div>
        

         

//           <div className="col-span-6 sm:col-span-3">
//             <label
//               htmlFor="CompanyType"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Organisation Type
//             </label>

//             <select
//               name="CompanyType"
//               value={formData.CompanyType}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded text-gray-600"
//             >
//               <option value="" className="text-gray-400">
//                 Select Organization Type
//               </option>
//               {organizationTypes.map((type) => (
//                 <option key={type} value={type}>
//                   {type}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="col-span-6 sm:col-span-3">
//             <label
//               htmlFor="CompanyAddress"
//               className="block text-sm font-medium text-gray-700"
//             >
//               {" "}
//               Team size{" "}
//             </label>

//             <select
//               name="TeamSize"
//               value={formData.TeamSize}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded text-gray-600"
//             >
//               <option value="" className="text-gray-400">
//                 Select Team Size
//               </option>
//               {teamSize.map((type) => (
//                 <option key={type} value={type}>
//                   {type}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="col-span-6 sm:col-span-3">
//             <label
//               htmlFor="Location"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Country
//             </label>

//             <input
//               type="text"
//               id="Location"
//               required
//               name="Location"
//               value={formData.Location}
//               onChange={handleChange}
//               className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
//             />
//           </div>

//           <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
//             <button
//               type="submit"
//               className="inline-block shrink-0 rounded-md border bg-primary1 px-12 py-3 text-sm font-medium text-white transition hover:bg-blue-600 hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
//             >
//               Save Details
//             </button>
//           </div>
//         </form>
//       </div>
//     </main>
//   );
// }

// export default EditUser;

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/ui/multiselect";

function EditUser({ data, onCloseEdit }) {
  const path = useParams();
  const userId = path?.userid;
  const router = useRouter();
  const [logoPreview, setLogoPreview] = useState(null);

  // Original form data
  const [formData, setFormData] = useState({
    Contact: data.profile?.Contact || "",
    Location: data.profile?.Location || "",
    Address: data.profile?.Address || "",
    TeamSize: data.profile?.TeamSize || "",
    Designation: data.profile?.Designation || "",
    CompanyType: data.profile?.CompanyType || "",
    CompanyAddress: data.profile?.CompanyAddress || "",
    CompanyEmail: data.profile?.CompanyEmail || "",
    ProfileImage: null,
    MarketingAccept: false,
    editing: true,
  });

  // New multi-select states
  const [primaryLanguages, setPrimaryLanguages] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [practiceAreas, setPracticeAreas] = useState([]);
  const [workTypes, setWorkTypes] = useState([]);
  const [goals, setGoals] = useState([]);
  const [existingTools, setExistingTools] = useState([]);

  // Original organization types
  const organizationTypes = [
    "Law firms",
    "Enterprises",
    "Individual Practitioners",
    "Startups",
    "Government Departments",
    "Judiciary",
    "In-House Counsels"
  ];

  const teamSizes = [
    "1",
    "2-20",
    "21-50",
    "51- 200",
    "201-500",
    "500+",
  ];

  // New options
  const languages = ["English", "Spanish", "French", "German", "Chinese"];
  const industryOptions = [
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
  ];

  const practiceAreaOptions = [
    "Appellate Law",
    "Antitrust Law",
    "Alternative Dispute Resolution",
    "Aviation",
    "Banking & Finance",
    "Business Law",
    "Civil Law"
  ];

  const workTypeOptions = [
    "Dispute Resolution",
    "Diligence",
    "Drafting",
    "Advisory",
    "Research",
    "Representation"
  ];

  const goalOptions = [
    "Streamlining workflows",
    "Time management",
    "Cost efficiency",
    "Improving client services",
    "Enhancing collaboration",
    "Reducing turnaround time",
    "Automating repetitive tasks",
    "Optimizing document management"
  ];

  const toolOptions = [
    "Analytics dashboard",
    "Report generation",
    "Dashboard Customization",
    "Report Customization",
    "Multiple User role",
    "Granular Permission",
    "Information access control",
    "Role based access control"
  ];

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const uploadFile = async (file, folderName) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folderName", folderName);

    try {
      const response = await fetch("/api/upload-file", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          const url = data.location;
          console.log("Uploaded file location:", url);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.ProfileImage) {
        const response = await uploadFile(formData.ProfileImage, "profile");
        setLogoPreview(response);
      }

      // Combine all form data
      const combinedData = {
        ...formData,
        userId,
        logoPreview,
        primaryLanguages,
        industries,
        practiceAreas,
        workTypes,
        goals,
        existingTools
      };
      console.log("edited data",combinedData)

      const response = await fetch("/api/edit-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(combinedData),
      });

      const result = await response.json();

      if (result.success) {
        console.log("Profile created successfully:", result.profile);
        onCloseEdit();
        window.location.reload();
      } else {
        console.error("Error creating profile:", result.msg);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <main className="p-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Edit Profile
          </h1>
          <Button
            variant="secondary"
            className="cursor-pointer"
            onClick={onCloseEdit}
          >
            Back
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-6 gap-6">
          {/* Original form fields */}
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="Designation"
              className="block text-sm font-medium text-gray-700"
            >
              Designation
            </label>
            <input
              type="text"
              id="Designation"
              required
              name="Designation"
              value={formData.Designation}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="CompanyAddress"
              className="block text-sm font-medium text-gray-700"
            >
              Organisation Name
            </label>
            <input
              type="text"
              id="CompanyAddress"
              name="CompanyAddress"
              required
              value={formData.CompanyAddress}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="CompanyType"
              className="block text-sm font-medium text-gray-700"
            >
              Organisation Type
            </label>
            <select
              name="CompanyType"
              value={formData.CompanyType}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded text-gray-600"
            >
              <option value="" className="text-gray-400">
                Select Organization Type
              </option>
              {organizationTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="TeamSize"
              className="block text-sm font-medium text-gray-700"
            >
              Team size
            </label>
            <select
              name="TeamSize"
              value={formData.TeamSize}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded text-gray-600"
            >
              <option value="" className="text-gray-400">
                Select Team Size
              </option>
              {teamSizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="Location"
              className="block text-sm font-medium text-gray-700"
            >
              Country
            </label>
            <input
              type="text"
              id="Location"
              required
              name="Location"
              value={formData.Location}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

          {/* New multi-select fields */}
          <div className="col-span-6 sm:col-span-3">
            <Label htmlFor="primaryLanguages">Primary Languages</Label>
            <MultiSelector
              values={primaryLanguages}
              onValuesChange={setPrimaryLanguages}
            >
              <MultiSelectorTrigger>
                <MultiSelectorInput placeholder="Select languages" />
              </MultiSelectorTrigger>
              <MultiSelectorContent>
                <MultiSelectorList>
                  {languages.map((language) => (
                    <MultiSelectorItem
                      key={language}
                      value={language}
                    >
                      {language}
                    </MultiSelectorItem>
                  ))}
                </MultiSelectorList>
              </MultiSelectorContent>
            </MultiSelector>
          </div>

          <div className="col-span-6 sm:col-span-3">
            <Label htmlFor="industries">Industries</Label>
            <MultiSelector
              values={industries}
              onValuesChange={setIndustries}
            >
              <MultiSelectorTrigger>
                <MultiSelectorInput placeholder="Select industries" />
              </MultiSelectorTrigger>
              <MultiSelectorContent>
                <MultiSelectorList>
                  {industryOptions.map((industry) => (
                    <MultiSelectorItem
                      key={industry}
                      value={industry}
                    >
                      {industry}
                    </MultiSelectorItem>
                  ))}
                </MultiSelectorList>
              </MultiSelectorContent>
            </MultiSelector>
          </div>

          <div className="col-span-6 sm:col-span-3">
            <Label htmlFor="practiceAreas">Practice Areas</Label>
            <MultiSelector
              values={practiceAreas}
              onValuesChange={setPracticeAreas}
            >
              <MultiSelectorTrigger>
                <MultiSelectorInput placeholder="Select practice areas" />
              </MultiSelectorTrigger>
              <MultiSelectorContent>
                <MultiSelectorList>
                  {practiceAreaOptions.map((area) => (
                    <MultiSelectorItem
                      key={area}
                      value={area}
                    >
                      {area}
                    </MultiSelectorItem>
                  ))}
                </MultiSelectorList>
              </MultiSelectorContent>
            </MultiSelector>
          </div>

          <div className="col-span-6 sm:col-span-3">
            <Label htmlFor="workTypes">Work Types</Label>
            <MultiSelector
              values={workTypes}
              onValuesChange={setWorkTypes}
            >
              <MultiSelectorTrigger>
                <MultiSelectorInput placeholder="Select work types" />
              </MultiSelectorTrigger>
              <MultiSelectorContent>
                <MultiSelectorList>
                  {workTypeOptions.map((type) => (
                    <MultiSelectorItem
                      key={type}
                      value={type}
                    >
                      {type}
                    </MultiSelectorItem>
                  ))}
                </MultiSelectorList>
              </MultiSelectorContent>
            </MultiSelector>
          </div>

          <div className="col-span-6 sm:col-span-3">
            <Label htmlFor="goals">Goals</Label>
            <MultiSelector
              values={goals}
              onValuesChange={setGoals}
            >
              <MultiSelectorTrigger>
                <MultiSelectorInput placeholder="Select goals" />
              </MultiSelectorTrigger>
              <MultiSelectorContent>
                <MultiSelectorList>
                  {goalOptions.map((goal) => (
                    <MultiSelectorItem
                      key={goal}
                      value={goal}
                    >
                      {goal}
                    </MultiSelectorItem>
                  ))}
                </MultiSelectorList>
              </MultiSelectorContent>
            </MultiSelector>
          </div>

          <div className="col-span-6 sm:col-span-3">
            <Label htmlFor="existingTools">Existing Tools</Label>
            <MultiSelector
              values={existingTools}
              onValuesChange={setExistingTools}
            >
              <MultiSelectorTrigger>
                <MultiSelectorInput placeholder="Select tools" />
              </MultiSelectorTrigger>
              <MultiSelectorContent>
                <MultiSelectorList>
                  {toolOptions.map((tool) => (
                    <MultiSelectorItem
                      key={tool}
                      value={tool}
                    >
                      {tool}
                    </MultiSelectorItem>
                  ))}
                </MultiSelectorList>
              </MultiSelectorContent>
            </MultiSelector>
          </div>

          <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
            <button
              type="submit"
              className="inline-block shrink-0 rounded-md border bg-primary1 px-12 py-3 text-sm font-medium text-white transition hover:bg-blue-600 hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
            >
              Save Details
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default EditUser;


// import React, { useState, useEffect } from 'react';
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { useRouter } from "next/navigation";
// import { useParams } from "next/navigation";
// import {
//   MultiSelector,
//   MultiSelectorContent,
//   MultiSelectorInput,
//   MultiSelectorItem,
//   MultiSelectorList,
//   MultiSelectorTrigger,
// } from "@/components/ui/multiselect";

// function EditUser({ data, onCloseEdit }) {
//   const path = useParams();
//   const userId = path?.userid;
//   const router = useRouter();
//   const [logoPreview, setLogoPreview] = useState(null);

//   // Original form data
//   const [formData, setFormData] = useState({
//     Contact: data.profile?.Contact || "",
//     Location: data.profile?.Location || "",
//     Address: data.profile?.Address || "",
//     TeamSize: data.profile?.TeamSize || "",
//     Designation: data.profile?.Designation || "",
//     CompanyType: data.profile?.CompanyType || "",
//     CompanyAddress: data.profile?.CompanyAddress || "",
//     CompanyEmail: data.profile?.CompanyEmail || "",
//     ProfileImage: null,
//     MarketingAccept: false,
//     editing: true,
//   });

//   // Initialize multi-select states with existing data
//   const [primaryLanguages, setPrimaryLanguages] = useState(data.profile?.PrimaryLanguage || []);
//   const [industries, setIndustries] = useState(data.profile?.Industry || []);
//   const [practiceAreas, setPracticeAreas] = useState(data.profile?.PracticeArea || []);
//   const [workTypes, setWorkTypes] = useState(data.profile?.WorkType || []);
//   const [goals, setGoals] = useState(data.profile?.Goals || []);
//   const [existingTools, setExistingTools] = useState(data.profile?.ExistingTools || []);

  

//   // Effect to update states when data changes
//   useEffect(() => {
//     if (data.profile) {
//       setFormData({
//         Contact: data.profile.Contact || "",
//         Location: data.profile.Location || "",
//         Address: data.profile.Address || "",
//         TeamSize: data.profile.TeamSize || "",
//         Designation: data.profile.Designation || "",
//         CompanyType: data.profile.CompanyType || "",
//         CompanyAddress: data.profile.CompanyAddress || "",
//         CompanyEmail: data.profile.CompanyEmail || "",
//         ProfileImage: null,
//         MarketingAccept: false,
//         editing: true,
//       });

//       setPrimaryLanguages(data.profile.PrimaryLanguage || []);
//       setIndustries(data.profile.Industry || []);
//       setPracticeAreas(data.profile.PracticeArea || []);
//       setWorkTypes(data.profile.WorkType || []);
//       setGoals(data.profile.Goals || []);
//       setExistingTools(data.profile.ExistingTools || []);
//     }
//   }, [data.profile]);

//   const organizationTypes = [
//     "Law firms",
//     "Enterprises",
//     "Individual Practitioners",
//     "Startups",
//     "Government Departments",
//     "Judiciary",
//     "In-House Counsels"
//   ];

//   const teamSizes = [
//     "1",
//     "2-20",
//     "21-50",
//     "51- 200",
//     "201-500",
//     "500+",
//   ];

//   const languages = ["English", "Spanish", "French", "German", "Chinese"];
//   const industryOptions = [
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
//   ];

//   const practiceAreaOptions = [
//     "Appellate Law",
//     "Antitrust Law",
//     "Alternative Dispute Resolution",
//     "Aviation",
//     "Banking & Finance",
//     "Business Law",
//     "Civil Law"
//   ];

//   const workTypeOptions = [
//     "Dispute Resolution",
//     "Diligence",
//     "Drafting",
//     "Advisory",
//     "Research",
//     "Representation"
//   ];

//   const goalOptions = [
//     "Streamlining workflows",
//     "Time management",
//     "Cost efficiency",
//     "Improving client services",
//     "Enhancing collaboration",
//     "Reducing turnaround time",
//     "Automating repetitive tasks",
//     "Optimizing document management"
//   ];

//   const toolOptions = [
//     "Analytics dashboard",
//     "Report generation",
//     "Dashboard Customization",
//     "Report Customization",
//     "Multiple User role",
//     "Granular Permission",
//     "Information access control",
//     "Role based access control"
//   ];

//   const handleChange = (e) => {
//     const { name, value, type, checked, files } = e.target;
//     if (type === "file") {
//       setFormData((prevData) => ({
//         ...prevData,
//         [name]: files[0],
//       }));
//     } else if (type === "checkbox") {
//       setFormData((prevData) => ({
//         ...prevData,
//         [name]: checked,
//       }));
//     } else {
//       setFormData((prevData) => ({
//         ...prevData,
//         [name]: value,
//       }));
//     }
//   };

//   const uploadFile = async (file, folderName) => {
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("folderName", folderName);

//     try {
//       const response = await fetch("/api/upload-file", {
//         method: "POST",
//         body: formData,
//       });

//       if (response.ok) {
//         const data = await response.json();
//         if (data.success) {
//           const url = data.location;
//           console.log("Uploaded file location:", url);
//           return url;
//         } else {
//           console.error("Upload failed:", data.error);
//         }
//       } else {
//         console.error("Failed to upload file:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error uploading file:", error);
//     }
//     return null;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       if (formData.ProfileImage) {
//         const response = await uploadFile(formData.ProfileImage, "profile");
//         setLogoPreview(response);
//       }

//       // Combine all form data
//       const combinedData = {
//         ...formData,
//         userId,
//         logoPreview,
//         primaryLanguages,
//         industries,
//         practiceAreas,
//         workTypes,
//         goals,
//         existingTools
//       };
//       console.log("Submitting data:", combinedData);

//       const response = await fetch("/api/edit-user", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(combinedData),
//       });

//       const result = await response.json();

//       if (result.success) {
//         console.log("Profile updated successfully:", result.profile);
//         onCloseEdit();
//         window.location.reload();
//       } else {
//         console.error("Error updating profile:", result.msg);
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//   };
  

//   return (
//     <main className="p-4">
//       <div className="max-w-3xl mx-auto">
//         <div className="flex justify-between mb-6">
//           <h1 className="text-2xl font-bold text-gray-900">
//             Edit Profile
//           </h1>
//           <Button
//             variant="secondary"
//             className="cursor-pointer"
//             onClick={onCloseEdit}
//           >
//             Back
//           </Button>
//         </div>

//         <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-6 gap-6">
//           {/* Original form fields */}
//           <div className="col-span-6 sm:col-span-3">
//             <label
//               htmlFor="Designation"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Designation
//             </label>
//             <input
//               type="text"
//               id="Designation"
//               required
//               name="Designation"
//               value={formData.Designation}
//               onChange={handleChange}
//               className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
//             />
//           </div>

//           <div className="col-span-6 sm:col-span-3">
//             <label
//               htmlFor="CompanyAddress"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Organisation Name
//             </label>
//             <input
//               type="text"
//               id="CompanyAddress"
//               name="CompanyAddress"
//               required
//               value={formData.CompanyAddress}
//               onChange={handleChange}
//               className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
//             />
//           </div>

//           <div className="col-span-6 sm:col-span-3">
//             <label
//               htmlFor="CompanyType"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Organisation Type
//             </label>
//             <select
//               name="CompanyType"
//               value={formData.CompanyType}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded text-gray-600"
//             >
//               <option value="" className="text-gray-400">
//                 Select Organization Type
//               </option>
//               {organizationTypes.map((type) => (
//                 <option key={type} value={type}>
//                   {type}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="col-span-6 sm:col-span-3">
//             <label
//               htmlFor="TeamSize"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Team size
//             </label>
//             <select
//               name="TeamSize"
//               value={formData.TeamSize}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded text-gray-600"
//             >
//               <option value="" className="text-gray-400">
//                 Select Team Size
//               </option>
//               {teamSizes.map((size) => (
//                 <option key={size} value={size}>
//                   {size}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="col-span-6 sm:col-span-3">
//             <label
//               htmlFor="Location"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Country
//             </label>
//             <input
//               type="text"
//               id="Location"
//               required
//               name="Location"
//               value={formData.Location}
//               onChange={handleChange}
//               className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
//             />
//           </div>

//           {/* Multi-select fields with existing values */}
//           <div className="col-span-6 sm:col-span-3">
//             <Label htmlFor="primaryLanguages">Primary Languages</Label>
//             <MultiSelector
//               value={primaryLanguages}
//               onValueChange={setPrimaryLanguages}
//               defaultValue={primaryLanguages}
//             >
//               <MultiSelectorTrigger>
//                 <MultiSelectorInput placeholder="Select languages" />
//               </MultiSelectorTrigger>
//               <MultiSelectorContent>
//                 <MultiSelectorList>
//                   {languages.map((language) => (
//                     <MultiSelectorItem
//                       key={language}
//                       value={language}
//                     >
//                       {language}
//                     </MultiSelectorItem>
//                   ))}
//                 </MultiSelectorList>
//               </MultiSelectorContent>
//             </MultiSelector>
//           </div>

//           <div className="col-span-6 sm:col-span-3">
//             <Label htmlFor="industries">Industries</Label>
//             <MultiSelector
//               value={industries}
//               onValueChange={setIndustries}
//               defaultValue={industries}
//             >
//               <MultiSelectorTrigger>
//                 <MultiSelectorInput placeholder="Select industries" />
//               </MultiSelectorTrigger>
//               <MultiSelectorContent>
//                 <MultiSelectorList>
//                   {industryOptions.map((industry) => (
//                     <MultiSelectorItem
//                       key={industry}
//                       value={industry}
//                     >
//                       {industry}
//                     </MultiSelectorItem>
//                   ))}
//                 </MultiSelectorList>
//               </MultiSelectorContent>
//             </MultiSelector>
//           </div>

//           <div className="col-span-6 sm:col-span-3">
//             <Label htmlFor="practiceAreas">Practice Areas</Label>
//             <MultiSelector
//               value={practiceAreas}
//               onValueChange={setPracticeAreas}
//               defaultValue={practiceAreas}
//             >
//               <MultiSelectorTrigger>
//                 <MultiSelectorInput placeholder="Select practice areas" />
//               </MultiSelectorTrigger>
//               <MultiSelectorContent>
//                 <MultiSelectorList>
//                   {practiceAreaOptions.map((area) => (
//                     <MultiSelectorItem
//                       key={area}
//                       value={area}
//                     >
//                       {area}
//                     </MultiSelectorItem>
//                   ))}
//                 </MultiSelectorList>
//               </MultiSelectorContent>
//             </MultiSelector>
//           </div>

//           <div className="col-span-6 sm:col-span-3">
//             <Label htmlFor="workTypes">Work Types</Label>
//             <MultiSelector
//               value={workTypes}
//               onValueChange={setWorkTypes}
//               defaultValue={workTypes}
//             >
//               <MultiSelectorTrigger>
//                 <MultiSelectorInput placeholder="Select work types" />
//               </MultiSelectorTrigger>
//               <MultiSelectorContent>
//                 <MultiSelectorList>
//                   {workTypeOptions.map((type) => (
//                     <MultiSelectorItem
//                       key={type}
//                       value={type}
//                     >
//                       {type}
//                     </MultiSelectorItem>
//                   ))}
//                 </MultiSelectorList>
//               </MultiSelectorContent>
//             </MultiSelector>
//           </div>

//           <div className="col-span-6 sm:col-span-3">
//             <Label htmlFor="goals">Goals</Label>
//             <MultiSelector
//               value={goals}
//               onValueChange={setGoals}
//               defaultValue={goals}
//             >
//               <MultiSelectorTrigger>
//                 <MultiSelectorInput placeholder="Select goals" />
//               </MultiSelectorTrigger>
//               <MultiSelectorContent>
//                 <MultiSelectorList>
//                   {goalOptions.map((goal) => (
//                     <MultiSelectorItem
//                       key={goal}
//                       value={goal}
//                     >
//                       {goal}
//                     </MultiSelectorItem>
//                   ))}
//                 </MultiSelectorList>
//               </MultiSelectorContent>
//             </MultiSelector>
//           </div>

//           <div className="col-span-6 sm:col-span-3"> 
//                         <Label htmlFor="existingTools">Existing Tools</Label>
//              <MultiSelector
//                values={existingTools}
//               onValuesChange={setExistingTools}
//             >
//               <MultiSelectorTrigger>
//                 <MultiSelectorInput placeholder="Select tools" />
//               </MultiSelectorTrigger>
//               <MultiSelectorContent>
//                 <MultiSelectorList>
//                   {toolOptions.map((tool) => (
//                     <MultiSelectorItem
//                       key={tool}
//                       value={tool}
//                     >
//                       {tool}
//                     </MultiSelectorItem>
//                   ))}
//                 </MultiSelectorList>
//               </MultiSelectorContent>
//             </MultiSelector>
//           </div>

//           <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
//             <button
//               type="submit"
//               className="inline-block shrink-0 rounded-md border bg-primary1 px-12 py-3 text-sm font-medium text-white transition hover:bg-blue-600 hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
//             >
//               Save Details
//             </button>
//           </div>
//         </form>
//       </div>
//     </main>
//   );
// }

// export default EditUser;

