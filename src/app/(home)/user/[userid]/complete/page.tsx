// "use client";
// import { Input } from "@/components/ui/input";
// import { useRouter } from "next/navigation";
// import { useParams } from "next/navigation";
// import React, { useState } from "react";

// function Complete() {
//   const path = useParams();
//   const [logoPreview, setLogoPreview] = useState<string | null>(null);
//   const userId = path?.userid;
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     Contact: "",
//     Location: "",
//     Address: "",
//     Designation: "",
//     CompanyType: "",
//     CompanyAddress: "",
//     CompanyEmail: "",
//     TeamSize : "",
//     ProfileImage: null,
//     MarketingAccept: false,
//     editing: false,
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
//         router.push(`/user/${userId}`);
//       } else {
//         console.error("Error creating profile:", result.msg);
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//     console.log("Form submitted:", formData);
//   };

//   const handleSkip = async () => {
//     try {
//       const response = await fetch("/api/skip", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ userId }),
//       });

//       const result = await response.json();

//       if (result.success) {
//         console.log("User skipped successfully:", result.user);
//         router.push(`/user/${userId}`);
//       } else {
//         console.error("Error skipping user:", result.error);
//       }
//     } catch (error) {
//       console.error("Error skipping user:", error);
//     }
//   };

//   const organizationTypes = [
//     "Law firms",
//     "Enterprises",
//     "Individual Practitioners",
//     "Startups",
//     "Government Departments",
//     "Judiciary",
//     "In-House Counsels",
//   ];

//   const countries = [
//     "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
//     "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
//     "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia",
//     "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)", "Costa Rica",
//     "Croatia", "Cuba", "Cyprus", "Czechia (Czech Republic)", "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador",
//     "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France",
//     "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau",
//     "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland",
//     "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan",
//     "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar",
//     "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia",
//     "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar (formerly Burma)", "Namibia", "Nauru", "Nepal",
//     "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan",
//     "Palau", "Palestine State", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar",
//     "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia",
//     "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa",
//     "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan",
//     "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan",
//     "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City",
//     "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
//   ];

//   const teamSize = [
//     "1",
//     "2-20",
//     "21-50",
//     "51- 200",
//     "201-500",
//     "500+",
//   ]

//   return (
//     <div>
//       <>
//       <section className="bg-white font-clarity">
//           <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
//             <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6 sm:py-4">
//               <img
//                 alt={`/signup_page_image.png`}
//                 src={`/signup_page_image.png`}
//                 className="absolute inset-0 h-full w-full object-cover "
//               />

//               <div className="hidden lg:relative lg:block lg:p-12">
//                 <a className="block text-white" href="#">
//                   <span className="sr-only">Home</span>
//                   <svg
//                     className="h-8 sm:h-10"
//                     viewBox="0 0 28 24"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
//                       fill="currentColor"
//                     />
//                   </svg>
//                 </a>

             
//               </div>
//             </section>

//             <main className="flex items-center justify-center px-8 py-4 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
//               <div className="max-w-xl lg:max-w-3xl">
//                 <div className="relative -mt-16 block lg:hidden">
//                   <a
//                     className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20"
//                     href="#"
//                   >
//                     <span className="sr-only">Home</span>
//                     <svg
//                       className="h-8 sm:h-10"
//                       viewBox="0 0 28 24"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
//                         fill="currentColor"
//                       />
//                     </svg>
//                   </a>

                 
//                 </div>


//                 <h2 className="-mt-10 text-2xl font-bold text-gray sm:text-3xl md:text-4xl">
//                 WELCOME TO DREAMLEGAL 🔥
//                 </h2>

//                 <p className="mt-4 leading-relaxed text-gray">
                
//                 All your Legal Tech needs at one place with us

//                 </p>
//                 <h1 className="mt-10 text-xl font-bold text-gray-900 sm:text-xl md:text-xl">
//                   Please complete your Profile
//                 </h1>

//                 <form
//                   onSubmit={handleSubmit}
//                   className="mt-8 grid grid-cols-6 gap-6"
//                 >
//                  <div className="col-span-6 sm:col-span-3">
//                     <label
//                       htmlFor="Designation"
//                       className="block text-sm font-medium text-gray-700"
//                     >
//                       {" "}
//                       Designation{" "}
//                     </label>

//                     <input
//                       type="text"
//                       id="Designation"
//                       required
//                       name="Designation"
//                       value={formData.Designation}
//                       onChange={handleChange}
//                       className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
//                     />
//                   </div>

//                    <div className="col-span-6 sm:col-span-3">
//                     <label
//                       htmlFor="CompanyAddress"
//                       className="block text-sm font-medium text-gray-700"
//                     >
//                       {" "}
//                       Organisation  Name{" "}
//                     </label>

//                     <input
//                       type="text"
//                       id="CompanyAddress"
//                       name="CompanyAddress"
//                       required
//                       value={formData.CompanyAddress}
//                       onChange={handleChange}
//                       className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
//                     />
//                   </div>

                 

              

                 

//                   <div className="col-span-6 sm:col-span-3">
//                     <label
//                       htmlFor="CompanyType"
//                       className="block text-sm font-medium text-gray-700"
//                     >
//                       Organisation Type
//                     </label>

//                     <select
//                       name="CompanyType"
//                       value={formData.CompanyType}
//                       onChange={handleChange}
//                       className="w-full p-2 border border-gray-300 rounded text-gray-600"
//                     >
//                       <option value="" className="text-gray-400">Select Organization Type</option>
//                       {organizationTypes.map((type) => (
//                         <option key={type} value={type}>
//                           {type}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

                 


//                   <div className="col-span-6 sm:col-span-3">
//                     <label
//                       htmlFor="CompanyAddress"
//                       className="block text-sm font-medium text-gray-700"
//                     >
//                       {" "}
//                       Team size{" "}
//                     </label>

//                     <select
//                       name="TeamSize"
//                       value={formData.TeamSize}
//                       onChange={handleChange}
//                       className="w-full p-2 border border-gray-300 rounded text-gray-600"
//                     >
//                       <option value="" className="text-gray-400">Select Team Size</option>
//                       {teamSize.map((type) => (
//                         <option key={type} value={type}>
//                           {type}
//                         </option>
//                       ))}
//                     </select>

                   
//                   </div>
//                   <div className="col-span-6 sm:col-span-3">
//                     <label
//                       htmlFor="Location"
//                       className="block text-sm font-medium text-gray-700"
//                     >
//                       Country
//                     </label>

//                     <select
//                       name="Location"
//                       value={formData.Location}
//                       onChange={handleChange}
//                       className="w-full p-2 border border-gray-300 rounded text-gray-600"
//                     >
//                       <option value="" className="text-gray-400">Select Country</option>
//                       {countries.map((type) => (
//                         <option key={type} value={type}>
//                           {type}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

                
//                   <div className="col-span-6">
//                     <label htmlFor="MarketingAccept" className="flex gap-4">
//                       <input
//                         type="checkbox"
//                         id="MarketingAccept"
//                         name="MarketingAccept"
//                         value={formData.MarketingAccept ? "true" : "false"}
//                         onChange={handleChange}
//                         className="size-5 rounded-md border-gray-200 bg-white shadow-sm"
//                       />

//                       <span className="text-sm text-gray-700">
//                         I want to receive emails about events, product updates
//                         and company announcements.
//                       </span>
//                     </label>
//                   </div>

//                   <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
//                     <button
//                       type="submit"
//                       className="inline-block shrink-0 rounded-md border bg-primary1 px-12 py-3 text-sm font-medium text-white transition hover:bg-blue-600 hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
//                     >
//                       Save Details
//                     </button>

//                     <button
//                       type="button"
//                       onClick={handleSkip}
//                       className="px-4 py-2 text-white bg-gray-400 rounded-md text-sm"
//                     >
//                       Skip for Now
//                     </button>
//                   </div>
//                 </form>

//               </div>

//             </main>
//           </div>
//       </section>
//       </>
//     </div>
//   );
// }

// export default Complete;
"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { Label } from "@/components/ui/label";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/ui/multiselect";

function Complete() {
  const path = useParams();
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const userId = path?.userid;
  const router = useRouter();
  
  // Original form state
  const [formData, setFormData] = useState({
    Contact: "",
    Location: "",
    Address: "",
    Designation: "",
    CompanyType: "",
    CompanyAddress: "",
    CompanyEmail: "",
    TeamSize: "",
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

  // Options for dropdowns
  const organizationTypes = [
    "Law firms",
    "Enterprises",
    "Individual Practitioners",
    "Startups",
    "Government Departments",
    "Judiciary",
    "In-House Counsels",
  ];

  const teamSize = [
    "1",
    "2-20",
    "21-50",
    "51- 200",
    "201-500",
    "500+",
  ];

  // New options for multi-select
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

  const countries = [
    "Afghanistan", "Albania", /* ... other countries ... */ "Zimbabwe"
  ];

  const handleChange = (e: any) => {
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

  const uploadFile = async (file: File, folderName: string) => {
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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (formData.ProfileImage) {
        const response = await uploadFile(formData.ProfileImage, "profile");
        setLogoPreview(response);
      }

      // Combine all form data including multi-select values
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
        router.push(`/user/${userId}`);
      } else {
        console.error("Error creating profile:", result.msg);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleSkip = async () => {
    try {
      const response = await fetch("/api/skip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      const result = await response.json();

      if (result.success) {
        console.log("User skipped successfully:", result.user);
        router.push(`/user/${userId}`);
      } else {
        console.error("Error skipping user:", result.error);
      }
    } catch (error) {
      console.error("Error skipping user:", error);
    }
  };

  return (
    <div>
      <section className="bg-white font-clarity">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              alt="signup_page_image"
              src="/signup_page_image.png"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </section>

          <main className="flex items-center justify-center px-8 py-4 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl">
              <h2 className="text-2xl font-bold text-gray sm:text-3xl md:text-4xl">
                WELCOME TO DREAMLEGAL 🔥
              </h2>

              <p className="mt-4 leading-relaxed text-gray">
                All your Legal Tech needs at one place with us
              </p>

              <h1 className="mt-10 text-xl font-bold text-gray-900">
                Please complete your Profile
              </h1>

              <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-6 gap-6">
                {/* Original form fields */}
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="Designation" className="block text-sm font-medium text-gray-700">
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
                      {" "}
                      Organisation  Name{" "}
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
                      <option value="" className="text-gray-400">Select Organization Type</option>
                      {organizationTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                 


                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="CompanyAddress"
                      className="block text-sm font-medium text-gray-700"
                    >
                      {" "}
                      Team size{" "}
                    </label>

                    <select
                      name="TeamSize"
                      value={formData.TeamSize}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded text-gray-600"
                    >
                      <option value="" className="text-gray-400">Select Team Size</option>
                      {teamSize.map((type) => (
                        <option key={type} value={type}>
                          {type}
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

                    <select
                      name="Location"
                      value={formData.Location}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded text-gray-600"
                    >
                      <option value="" className="text-gray-400">Select Country</option>
                      {countries.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                
                  
                {/* Continue with other original fields... */}
                
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

                {/* Marketing Accept checkbox */}
                <div className="col-span-6">
                  <label htmlFor="MarketingAccept" className="flex gap-4">
                    <input
                      type="checkbox"
                      id="MarketingAccept"
                      name="MarketingAccept"
                      checked={formData.MarketingAccept}
                      onChange={handleChange}
                      className="size-5 rounded-md border-gray-200 bg-white shadow-sm"
                    />
                    <span className="text-sm text-gray-700">
                      I want to receive emails about events, product updates and company announcements.
                    </span>
                  </label>
                </div>

                {/* Submit and Skip buttons */}
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
        </div>
      </section>
    </div>
  );
}

export default Complete;