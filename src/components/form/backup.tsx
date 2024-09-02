// "use client";

// import {
//   useState,
//   ChangeEvent,
//   FormEvent,
//   useEffect,
//   SetStateAction,
// } from "react";
// import { Input } from "./ui/input";
// import { Label } from "@/components/ui/label";
// import { toast } from "sonner";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Button } from "./ui/button";
// import { useStepContext } from "@/context/formContext";
// import { Textarea } from "./ui/textarea";
// import { IoIosInformation } from "react-icons/io";
// // import { UploadImage } from "@/actions/UploadAction";
// import { UploadResponse } from "nodejs-s3-typescript/dist/cjs/types";
// import { Slider } from "./ui/slider";
// import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

// interface FormValues {
//   id: string;
//   userId: string;
//   prname: string;
//   logo: File | null;
//   logoUrl: string;
//   category: string[];
//   deployment: string[];
//   mobileAccessibility: string;
//   adoptionPeriod: string;
//   adoptionPeriodUnit: string;
//   languages: string[];
//   securityCertificate: string;
//   integrations: string[];
//   description: string;
//   usp: string;
//   upcomingUpdates: string;
//   userCategory: string[];
//   userCategoryPercentage: number[];
//   industry: string[];
//   industryPercentage: number[];
//   practiceAreas: string[];
//   practiceAreasPercentage: number[];
//   teamSize: string;
//   processLifecycle: { category: string; subcategories: string[] }[];
//   clientManagementSoftware: string[];
//   ComplianceandRiskSoftware: string[];
//   contractManageSoftware: string[];
//   DigitalSignature: string[];
//   DocumnetManagement: string[];
//   Ebilling: string[];
//   Ediscovery: string[];
//   IPManagement: string[];
//   LitigationManagement: string[];
//   legalWorkflow: string[];
//   features: { category: string; subcategories: string[] }[];
//   freeTrial: string;
//   timePeriod: string;
//   timePeriodUnit: string;
//   freeVersion: string;
//   pricingModel: string;
//   contractPeriod: string;
//   nameofPlan: string[];
//   validity: string[];
//   price: string[];
//   pricingParams: string[];
//   Demo: string[];
//   DemoNote: string;
//   support: string[];
//   supportNote: string;
//   training: string[];
//   trainingNote: string;
//   storage: string[];
//   storageUnit: string;

//   storageNote: string;
//   fileSize: string[];
//   fileSizeUnit: string;

//   fileSizeNote: string;
//   maintenance: string[];
//   maintenanceNote: string;
//   reqForChange: string[];
//   reqForChangeNote: string;
//   trainingReq: string[];
//   trainingReqNote: string;
//   dataMigration: string[];
//   dataMigrationNote: string;
//   Images: string[];
//   videoUrl: string[];
//   attachments: string[];
//   youtubeUrl: string[];
//   linkedinUrl: string[];
//   twitterUrl: string[];
//   instagramUrl: string[];
//   // features state
//   InternalCollaboration: string[];
//   ExternalCollaboration: string[];
//   AnalyticsAndReporting: string[];
//   ToolAdministrationAndControl: string[];
//   IntakeAndLeadManagement: string[];
//   ClientPortal: string[];
//   DocumentManagement: string[];
//   CaseAlerts: string[];
//   BudgetExpenseAndTimeTracking: string[];
//   ClientBillingAndInvoicing: string[];
//   PolicyManagement: string[];
//   IssueManagement: string[];
//   LawsComplianceAndRegulatoryTracking: string[];
//   ContractCreationAndAuthoring: string[];
//   ContractRepository: string[];
//   ContractNegotiation: string[];
//   LifecycleManagement: string[];
//   ClauseLibrary: string[];
//   FieldsCreation: string[];
//   TrackingAndValidity: string[];
//   DocumentManagementAndTemplates: string[];
//   DocumentCapturing: string[];
//   DocumentSearchAndNavigation: string[];
//   Authentication: string[];
//   TaskAllotment: string[];
//   BudgetingExpenseAndTimeTracking: string[];
//   ClientManagement: string[];
//   InvoiceGenerationAndReview: string[];
//   DataIdentificationAndCollection: string[];
//   SearchProcessingAndAnalysis: string[];
//   ReviewAndProduction: string[];
//   LegalHoldManagement: string[];
//   IdeationAndCreation: string[];
//   LifecycleManagementIP: string[];
//   SearchAndDiscovery: string[];
//   StorageAndRepository: string[];
//   MatterLifecycleTracking: string[];
//   CourtAndCaseSearch: string[];
//   LitigationDocketingFeatures: string[];
//   WorkflowDesignAndConfiguration: string[];
//   AssignmentAllotmentAndTracking: string[];
//   DocumentCreationAndManagement: string[];
//   LawsComplianceAndRegulatoryTrackingIP: string[];
//   // Extra
//   fixedPricing: string;

//   nameofPlan1: string;
//   nameofPlan2: string;
//   nameofPlan3: string;
//   validity1: string;
//   validity2: string;
//   validity3: string;
//   price1: string;
//   price2: string;
//   price3: string;
// }

// function ProductInfo() {
//   const { step, prevStep, nextStep, setStep } = useStepContext();

//   const [loading, setLoading] = useState(false);
//   const [numPricings, setNumPricings] = useState(1);
//   const [file, setFile] = useState(null);
//   const [files, setFiles] = useState([]);
//   const [attachments, setAttachments] = useState([]);
//   const [submitted, setSubmitted] = useState(false);
//   const [formValues, setFormValues] = useState<FormValues>({
//     id: "",
//     userId: "",
//     prname: "",
//     logo: null,
//     logoUrl: "",
//     category: [],
//     deployment: [],
//     mobileAccessibility: "",
//     adoptionPeriod: "",
//     adoptionPeriodUnit: "",
//     languages: [],
//     securityCertificate: "",
//     integrations: [],
//     description: "",
//     usp: "",
//     upcomingUpdates: "",
//     userCategory: [],
//     userCategoryPercentage: [],
//     industry: [],
//     industryPercentage: [],
//     practiceAreas: [],
//     practiceAreasPercentage: [],
//     teamSize: "",
//     processLifecycle: [],
//     clientManagementSoftware: [],
//     ComplianceandRiskSoftware: [],
//     contractManageSoftware: [],
//     DigitalSignature: [],
//     DocumnetManagement: [],
//     Ebilling: [],
//     Ediscovery: [],
//     IPManagement: [],
//     LitigationManagement: [],
//     legalWorkflow: [],
//     features: [],
//     freeTrial: "",
//     timePeriod: "",
//     timePeriodUnit: "",
//     freeVersion: "",
//     pricingModel: "",
//     contractPeriod: "",
//     nameofPlan: [""],
//     nameofPlan1: "",
//     nameofPlan2: "",
//     nameofPlan3: "",
//     validity1: "",
//     validity2: "",
//     validity3: "",
//     price1: "",
//     price2: "",
//     price3: "",
//     validity: [""],
//     price: [""],
//     pricingParams: [],
//     Demo: [],
//     DemoNote: "",
//     support: [],
//     supportNote: "",
//     training: [],
//     trainingNote: "",
//     storage: [],
//     storageNote: "",
//     storageUnit: "",
//     fileSizeUnit: "",
//     fileSize: [],
//     fileSizeNote: "",
//     maintenance: [],
//     maintenanceNote: "",
//     reqForChange: [],
//     reqForChangeNote: "",
//     trainingReq: [],
//     trainingReqNote: "",
//     dataMigration: [],
//     dataMigrationNote: "",
//     Images: [],
//     videoUrl: [],
//     attachments: [],
//     youtubeUrl: [],
//     linkedinUrl: [],
//     twitterUrl: [],
//     instagramUrl: [],
//     // Features
//     InternalCollaboration: [],
//     ExternalCollaboration: [],
//     AnalyticsAndReporting: [],
//     ToolAdministrationAndControl: [],
//     IntakeAndLeadManagement: [],
//     ClientPortal: [],
//     DocumentManagement: [],
//     CaseAlerts: [],
//     BudgetExpenseAndTimeTracking: [],
//     ClientBillingAndInvoicing: [],
//     PolicyManagement: [],
//     IssueManagement: [],
//     LawsComplianceAndRegulatoryTracking: [],
//     ContractCreationAndAuthoring: [],
//     ContractRepository: [],
//     ContractNegotiation: [],
//     LifecycleManagement: [],
//     ClauseLibrary: [],
//     FieldsCreation: [],
//     TrackingAndValidity: [],
//     DocumentManagementAndTemplates: [],
//     DocumentCapturing: [],
//     DocumentSearchAndNavigation: [],
//     Authentication: [],
//     TaskAllotment: [],
//     BudgetingExpenseAndTimeTracking: [],
//     ClientManagement: [],
//     InvoiceGenerationAndReview: [],
//     DataIdentificationAndCollection: [],
//     SearchProcessingAndAnalysis: [],
//     ReviewAndProduction: [],
//     LegalHoldManagement: [],
//     IdeationAndCreation: [],
//     LifecycleManagementIP: [],
//     SearchAndDiscovery: [],
//     StorageAndRepository: [],
//     MatterLifecycleTracking: [],
//     CourtAndCaseSearch: [],
//     LitigationDocketingFeatures: [],
//     WorkflowDesignAndConfiguration: [],
//     AssignmentAllotmentAndTracking: [],
//     DocumentCreationAndManagement: [],
//     LawsComplianceAndRegulatoryTrackingIP: [],
//     fixedPricing: "",
//   });

//   useEffect(() => {
//     console.log(formValues.processLifecycle);
//   }, [formValues.processLifecycle]);

//   useEffect(() => {
//     console.log(formValues.features);
//   }, [formValues.features]);

//   const temp1 = (event: any) => {
//     event.preventDefault();
//     setTimeout(() => {
//       nextStep();
//     }, 2000); // 2000 milliseconds = 2 seconds
//   };

//   const temp2 = () => {
//     setSubmitted(true);
//   };
//   const handleAttachmentChange = (e: any) => {
//     const selectedFiles = Array.from(e.target.files);
//     if (selectedFiles.length > 2) {
//       alert("You can only upload up to 2 attachments");
//       setAttachments([]); // Clear the selected files
//       e.target.value = ""; // Reset the input value
//     } else {
//       setAttachments(selectedFiles as any);
//     }
//   };
//   const handleChange = (
//     event: ChangeEvent<
//       HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
//     >
//   ) => {
//     const { name, type } = event.target;
//     if (type === "checkbox") {
//       const { value, checked } = event.target as HTMLInputElement;
//       setFormValues((prevValues) => ({
//         ...prevValues,
//         [name]: checked
//           ? [...(prevValues[name as keyof FormValues] as string[]), value]
//           : (prevValues[name as keyof FormValues] as string[]).filter(
//               (item) => item !== value
//             ),
//       }));
//     } else if (type === "file") {
//       const file = (event.target as HTMLInputElement).files?.[0];
//       if (file && file.size <= 10 * 1024 * 1024) {
//         setFormValues((prevValues) => ({
//           ...prevValues,
//           [name]: file,
//         }));
//       } else {
//         // Display an error message or handle the oversized file in some way
//         alert("File size exceeds the limit (10 MB)");
//       }
//     } else {
//       const value = event.target.value;
//       setFormValues((prevValues) => ({
//         ...prevValues,
//         [name]: value,
//       }));
//     }
//   };

//   const handleAddNew = () => {
//     if (numPricings < 3) {
//       setNumPricings((prevNumPricings) => prevNumPricings + 1);
//     }
//   };

//   const isUploadResponse = (res: any): res is UploadResponse => {
//     return typeof res === "object" && res !== null && "location" in res;
//   };

//   const handleLanguageChange = (language: string) => {
//     if (formValues.languages.includes(language)) {
//       // Remove language if already selected
//       setFormValues((prevValues) => ({
//         ...prevValues,
//         languages: prevValues.languages.filter((l) => l !== language),
//       }));
//     } else if (formValues.languages.length < 5) {
//       // Add language if not already selected and less than 5 selected
//       setFormValues((prevValues) => ({
//         ...prevValues,
//         languages: [...prevValues.languages, language],
//       }));
//     }
//   };

//   const isLanguageSelected = (language: string) =>
//     formValues.languages.includes(language);

//   const canSelectMoreLanguages = formValues.languages.length < 5;

//   // const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
//   //   event.preventDefault();

//   //   const formData = new FormData();
//   //   formData.append("file", formValues.logo as File); // Assuming logo is the file input
//   //   formData.append("folderName", "logos");
//   //   try {
//   //     const userId = localStorage.getItem("vendorId");

//   //     setLoading(true);
//   //     if (!userId || userId === "") {
//   //       console.error("User ID is missing or empty");
//   //       // Handle the missing userId case, e.g., show a message to the user
//   //       toast("User ID is missing. Please log in again.");
//   //       return;
//   //     }

//   //     if (!formValues.userId) {
//   //       console.error("User ID is missing or empty");
//   //       // Handle the missing userId case, e.g., show a message to the user
//   //       toast("User ID is missing. Please log in again.");
//   //       return;
//   //     }

//   //     const res = await UploadImage(formData);
//   //     console.log("Image uploaded:", res);
//   //     if (isUploadResponse(res)) {
//   //       const imageLocation = res.location;

//   //       setFormValues((prevFormValues) => ({
//   //         ...prevFormValues,
//   //         logoUrl: imageLocation || "",
//   //         userId: userId || "",
//   //       }));
//   //     }

//   //     const response = await fetch("/api/add-product", {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify(formValues),
//   //     });

//   //     if (response.ok) {
//   //       const data = await response.json();

//   //       // Handle success response
//   //       console.log("Product added successfully");
//   //       setFormValues((prevFormValues) => ({
//   //         ...prevFormValues,
//   //         id: data.productId,
//   //       }));

//   //       nextStep();
//   //       // Reset the form or navigate to another page
//   //     } else {
//   //       // Handle error response
//   //       toast("Failed to add product");
//   //       console.error("Failed to add product");
//   //     }
//   //     setLoading(false);
//   //     toast("Product Information added.");
//   //   } catch (error) {
//   //     console.error("Image upload failed:", error);
//   //     // Handle error as needed
//   //   }
//   //   console.log(formValues);
//   //   // nextStep();
//   //   // You can send `formValues` to your server here
//   // };

//   const handleSliderChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const { value } = event.target;
//     const index = parseInt(event.target.getAttribute("data-index") || "0", 10);
//     setFormValues((prevValues) => {
//       const userCategoryPercentage = [...prevValues.userCategoryPercentage];
//       userCategoryPercentage[index] = parseInt(value);
//       return { ...prevValues, userCategoryPercentage };
//     });
//   };

//   const handleIndustrySliderChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const { value } = event.target;
//     const index = parseInt(event.target.getAttribute("data-index") || "0", 10);
//     setFormValues((prevValues) => {
//       const industryPercentage = [...prevValues.industryPercentage];
//       industryPercentage[index] = parseInt(value);
//       return { ...prevValues, industryPercentage };
//     });
//   };

//   const handleLawSliderChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const { value } = event.target;
//     const index = parseInt(event.target.getAttribute("data-index") || "0", 10);
//     setFormValues((prevValues) => {
//       const practiceAreasPercentage = [...prevValues.practiceAreasPercentage];
//       practiceAreasPercentage[index] = parseInt(value);
//       return { ...prevValues, practiceAreasPercentage };
//     });
//   };
//   const handleEdit = async (event: FormEvent<HTMLFormElement>) => {};

//   const handleLifecycleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     setFormValues((prevValues) => {
//       const newProcessLifecycle = [...prevValues.processLifecycle];

//       if (prevValues.clientManagementSoftware.length > 0) {
//         const clientManagementIndex = newProcessLifecycle.findIndex(
//           (item) => item.category === "Client Relationship Management "
//         );

//         if (clientManagementIndex === -1) {
//           newProcessLifecycle.push({
//             category: "Client Relationship Management ",
//             subcategories: prevValues.clientManagementSoftware,
//           });
//         } else {
//           newProcessLifecycle[clientManagementIndex].subcategories =
//             prevValues.clientManagementSoftware;
//         }
//       }

//       if (prevValues.ComplianceandRiskSoftware.length > 0) {
//         const ComplianceandRiskSoftwareIndex = newProcessLifecycle.findIndex(
//           (item) => item.category === "Compliance and Risk Management Software"
//         );

//         if (ComplianceandRiskSoftwareIndex === -1) {
//           newProcessLifecycle.push({
//             category: "Compliance and Risk Management Software",
//             subcategories: prevValues.ComplianceandRiskSoftware,
//           });
//         } else {
//           newProcessLifecycle[ComplianceandRiskSoftwareIndex].subcategories =
//             prevValues.ComplianceandRiskSoftware;
//         }
//       }

//       if (prevValues.contractManageSoftware.length > 0) {
//         const contractManageSoftwareIndex = newProcessLifecycle.findIndex(
//           (item) => item.category === "Contract Lifecycle Management"
//         );

//         if (contractManageSoftwareIndex === -1) {
//           newProcessLifecycle.push({
//             category: "Contract Lifecycle Management",
//             subcategories: prevValues.contractManageSoftware,
//           });
//         } else {
//           newProcessLifecycle[contractManageSoftwareIndex].subcategories =
//             prevValues.contractManageSoftware;
//         }
//       }

//       if (prevValues.DigitalSignature.length > 0) {
//         const DigitalSignatureIndex = newProcessLifecycle.findIndex(
//           (item) => item.category === "E-Signature"
//         );

//         if (DigitalSignatureIndex === -1) {
//           newProcessLifecycle.push({
//             category: "E-Signature",
//             subcategories: prevValues.DigitalSignature,
//           });
//         } else {
//           newProcessLifecycle[DigitalSignatureIndex].subcategories =
//             prevValues.DigitalSignature;
//         }
//       }

//       if (prevValues.DocumnetManagement.length > 0) {
//         const DocumnetManagementIndex = newProcessLifecycle.findIndex(
//           (item) =>
//             item.category === "Document Management System Software"
//         );

//         if (DocumnetManagementIndex === -1) {
//           newProcessLifecycle.push({
//             category: "Document Management System Software",
//             subcategories: prevValues.DocumnetManagement,
//           });
//         } else {
//           newProcessLifecycle[DocumnetManagementIndex].subcategories =
//             prevValues.DocumnetManagement;
//         }
//       }

//       if (prevValues.Ebilling.length > 0) {
//         const EbillingIndex = newProcessLifecycle.findIndex(
//           (item) => item.category === "E-billing and Invoicing"
//         );

//         if (EbillingIndex === -1) {
//           newProcessLifecycle.push({
//             category: "E-billing and Invoicing",
//             subcategories: prevValues.Ebilling,
//           });
//         } else {
//           newProcessLifecycle[EbillingIndex].subcategories =
//             prevValues.Ebilling;
//         }
//       }

//       if (prevValues.Ediscovery.length > 0) {
//         const EdiscoveryIndex = newProcessLifecycle.findIndex(
//           (item) => item.category === "E-discovery"
//         );

//         if (EdiscoveryIndex === -1) {
//           newProcessLifecycle.push({
//             category: "E-discovery",
//             subcategories: prevValues.Ediscovery,
//           });
//         } else {
//           newProcessLifecycle[EdiscoveryIndex].subcategories =
//             prevValues.Ediscovery;
//         }
//       }

//       if (prevValues.IPManagement.length > 0) {
//         const IPManagementIndex = newProcessLifecycle.findIndex(
//           (item) => item.category === "IP Management Software"
//         );

//         if (IPManagementIndex === -1) {
//           newProcessLifecycle.push({
//             category: "IP Management Software",
//             subcategories: prevValues.IPManagement,
//           });
//         } else {
//           newProcessLifecycle[IPManagementIndex].subcategories =
//             prevValues.IPManagement;
//         }
//       }

//       if (prevValues.LitigationManagement.length > 0) {
//         const LitigationManagementIndex = newProcessLifecycle.findIndex(
//           (item) => item.category === "Litigation Management and analytics"
//         );

//         if (LitigationManagementIndex === -1) {
//           newProcessLifecycle.push({
//             category: "Litigation Management and analytics",
//             subcategories: prevValues.LitigationManagement,
//           });
//         } else {
//           newProcessLifecycle[LitigationManagementIndex].subcategories =
//             prevValues.LitigationManagement;
//         }
//       }

//       if (prevValues.legalWorkflow.length > 0) {
//         const legalWorkflowIndex = newProcessLifecycle.findIndex(
//           (item) => item.category === "Legal Workflow Automation"
//         );

//         if (legalWorkflowIndex === -1) {
//           newProcessLifecycle.push({
//             category: "Legal Workflow Automation",
//             subcategories: prevValues.legalWorkflow,
//           });
//         } else {
//           newProcessLifecycle[legalWorkflowIndex].subcategories =
//             prevValues.legalWorkflow;
//         }
//       }

//       return {
//         ...prevValues,
//         processLifecycle: newProcessLifecycle,
//       };
//       console.log(formValues);
//     });
//   };

//   const handleFileChange = (e: any) => {
//     const selectedFiles = Array.from(e.target.files);
//     if (selectedFiles.length > 5) {
//       alert("You can only upload up to 5 images");
//       setFiles([]); // Clear the selected files
//       e.target.value = ""; // Reset the input value
//     } else {
//       setFiles(selectedFiles as SetStateAction<never[]>);
//     }
//   };

//   const handleFeatureSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     setFormValues((prevValues) => {
//       const newFeatures = [...prevValues.features];

//       if (prevValues.InternalCollaboration.length > 0) {
//         const index = newFeatures.findIndex(
//           (item) => item.category === "Internal Collaboration"
//         );
//         if (index === -1) {
//           newFeatures.push({
//             category: "Internal Collaboration",
//             subcategories: prevValues.InternalCollaboration,
//           });
//         } else {
//           newFeatures[index].subcategories = prevValues.InternalCollaboration;
//         }
//       }

//       if (prevValues.ExternalCollaboration.length > 0) {
//         const index = newFeatures.findIndex(
//           (item) => item.category === "External Collaboration"
//         );
//         if (index === -1) {
//           newFeatures.push({
//             category: "External Collaboration",
//             subcategories: prevValues.ExternalCollaboration,
//           });
//         } else {
//           newFeatures[index].subcategories = prevValues.ExternalCollaboration;
//         }
//       }

//       if (prevValues.AnalyticsAndReporting.length > 0) {
//         const index = newFeatures.findIndex(
//           (item) => item.category === "Analytics and Reporting"
//         );
//         if (index === -1) {
//           newFeatures.push({
//             category: "Analytics and Reporting",
//             subcategories: prevValues.AnalyticsAndReporting,
//           });
//         } else {
//           newFeatures[index].subcategories = prevValues.AnalyticsAndReporting;
//         }
//       }

//       if (prevValues.ToolAdministrationAndControl.length > 0) {
//         const index = newFeatures.findIndex(
//           (item) => item.category === "Tool Administration and Control"
//         );
//         if (index === -1) {
//           newFeatures.push({
//             category: "Tool Administration and Control",
//             subcategories: prevValues.ToolAdministrationAndControl,
//           });
//         } else {
//           newFeatures[index].subcategories =
//             prevValues.ToolAdministrationAndControl;
//         }
//       }

//       if (prevValues.IntakeAndLeadManagement.length > 0) {
//         const index = newFeatures.findIndex(
//           (item) => item.category === "Intake and Lead Management"
//         );
//         if (index === -1) {
//           newFeatures.push({
//             category: "Intake and Lead Management",
//             subcategories: prevValues.IntakeAndLeadManagement,
//           });
//         } else {
//           newFeatures[index].subcategories = prevValues.IntakeAndLeadManagement;
//         }
//       }

//       if (prevValues.ClientPortal.length > 0) {
//         const index = newFeatures.findIndex(
//           (item) => item.category === "Client Portal"
//         );
//         if (index === -1) {
//           newFeatures.push({
//             category: "Client Portal",
//             subcategories: prevValues.ClientPortal,
//           });
//         } else {
//           newFeatures[index].subcategories = prevValues.ClientPortal;
//         }
//       }

//       if (prevValues.DocumentManagement.length > 0) {
//         const index = newFeatures.findIndex(
//           (item) => item.category === "Document Management"
//         );
//         if (index === -1) {
//           newFeatures.push({
//             category: "Document Management",
//             subcategories: prevValues.DocumentManagement,
//           });
//         } else {
//           newFeatures[index].subcategories = prevValues.DocumentManagement;
//         }
//       }

//       if (prevValues.CaseAlerts.length > 0) {
//         const index = newFeatures.findIndex(
//           (item) => item.category === "Case Alerts"
//         );
//         if (index === -1) {
//           newFeatures.push({
//             category: "Case Alerts",
//             subcategories: prevValues.CaseAlerts,
//           });
//         } else {
//           newFeatures[index].subcategories = prevValues.CaseAlerts;
//         }
//       }

//       if (prevValues.BudgetExpenseAndTimeTracking.length > 0) {
//         const index = newFeatures.findIndex(
//           (item) => item.category === "Budget, Expense and Time Tracking"
//         );
//         if (index === -1) {
//           newFeatures.push({
//             category: "Budget, Expense and Time Tracking",
//             subcategories: prevValues.BudgetExpenseAndTimeTracking,
//           });
//         } else {
//           newFeatures[index].subcategories =
//             prevValues.BudgetExpenseAndTimeTracking;
//         }
//       }

//       if (prevValues.ClientBillingAndInvoicing.length > 0) {
//         const index = newFeatures.findIndex(
//           (item) => item.category === "Client Billing and Invoicing"
//         );
//         if (index === -1) {
//           newFeatures.push({
//             category: "Client Billing and Invoicing",
//             subcategories: prevValues.ClientBillingAndInvoicing,
//           });
//         } else {
//           newFeatures[index].subcategories =
//             prevValues.ClientBillingAndInvoicing;
//         }
//       }

//       if (prevValues.PolicyManagement.length > 0) {
//         const index = newFeatures.findIndex(
//           (item) => item.category === "Policy Management"
//         );
//         if (index === -1) {
//           newFeatures.push({
//             category: "Policy Management",
//             subcategories: prevValues.PolicyManagement,
//           });
//         } else {
//           newFeatures[index].subcategories = prevValues.PolicyManagement;
//         }
//       }

//       if (prevValues.IssueManagement.length > 0) {
//         const index = newFeatures.findIndex(
//           (item) => item.category === "Issue Management"
//         );
//         if (index === -1) {
//           newFeatures.push({
//             category: "Issue Management",
//             subcategories: prevValues.IssueManagement,
//           });
//         } else {
//           newFeatures[index].subcategories = prevValues.IssueManagement;
//         }
//       }

//       if (prevValues.LawsComplianceAndRegulatoryTracking.length > 0) {
//         const index = newFeatures.findIndex(
//           (item) => item.category === "Laws, Compliance and Regulatory Tracking"
//         );
//         if (index === -1) {
//           newFeatures.push({
//             category: "Laws, Compliance and Regulatory Tracking",
//             subcategories: prevValues.LawsComplianceAndRegulatoryTracking,
//           });
//         } else {
//           newFeatures[index].subcategories =
//             prevValues.LawsComplianceAndRegulatoryTracking;
//         }
//       }

//       if (prevValues.ContractCreationAndAuthoring.length > 0) {
//         const index = newFeatures.findIndex(
//           (item) => item.category === "Contract Creation and Authoring"
//         );
//         if (index === -1) {
//           newFeatures.push({
//             category: "Contract Creation and Authoring",
//             subcategories: prevValues.ContractCreationAndAuthoring,
//           });
//         } else {
//           newFeatures[index].subcategories =
//             prevValues.ContractCreationAndAuthoring;
//         }
//       }

//       if (prevValues.ContractRepository.length > 0) {
//         const index = newFeatures.findIndex(
//           (item) => item.category === "Contract Repository"
//         );
//         if (index === -1) {
//           newFeatures.push({
//             category: "Contract Repository",
//             subcategories: prevValues.ContractRepository,
//           });
//         } else {
//           newFeatures[index].subcategories = prevValues.ContractRepository;
//         }
//       }

//       if (prevValues.ContractNegotiation.length > 0) {
//         const index = newFeatures.findIndex(
//           (item) => item.category === "Contract Negotiation"
//         );
//         if (index === -1) {
//           newFeatures.push({
//             category: "Contract Negotiation",
//             subcategories: prevValues.ContractNegotiation,
//           });
//         } else {
//           newFeatures[index].subcategories = prevValues.ContractNegotiation;
//         }
//       }

//       if (prevValues.LifecycleManagement.length > 0) {
//         const index = newFeatures.findIndex(
//           (item) => item.category === "Lifecycle Management"
//         );
//         if (index === -1) {
//           newFeatures.push({
//             category: "Lifecycle Management",
//             subcategories: prevValues.LifecycleManagement,
//           });
//         } else {
//           newFeatures[index].subcategories = prevValues.LifecycleManagement;
//         }
//       }

//       if (prevValues.ClauseLibrary.length > 0) {
//         const index = newFeatures.findIndex(
//           (item) => item.category === "Clause Library"
//         );
//         if (index === -1) {
//           newFeatures.push({
//             category: "Clause Library",
//             subcategories: prevValues.ClauseLibrary,
//           });
//         } else {
//           newFeatures[index].subcategories = prevValues.ClauseLibrary;
//         }
//       }

//       if (prevValues.FieldsCreation.length > 0) {
//         const index = newFeatures.findIndex(
//           (item) => item.category === "Fields Creation"
//         );
//         if (index === -1) {
//           newFeatures.push({
//             category: "Fields Creation",
//             subcategories: prevValues.FieldsCreation,
//           });
//         } else {
//           newFeatures[index].subcategories = prevValues.FieldsCreation;
//         }
//       }

//       if (prevValues.TrackingAndValidity.length > 0) {
//         const index = newFeatures.findIndex(
//           (item) => item.category === "Tracking and Validity"
//         );
//         if (index === -1) {
//           newFeatures.push({
//             category: "Tracking and Validity",
//             subcategories: prevValues.TrackingAndValidity,
//           });
//         } else {
//           newFeatures[index].subcategories = prevValues.TrackingAndValidity;
//         }
//       }

//       if (prevValues.DocumentManagementAndTemplates.length > 0) {
//         const index = newFeatures.findIndex(
//           (item) => item.category === "Document Management and Templates"
//         );
//         if (index === -1) {
//           newFeatures.push({
//             category: "Document Management and Templates",
//             subcategories: prevValues.DocumentManagementAndTemplates,
//           });
//         } else {
//           newFeatures[index].subcategories =
//             prevValues.DocumentManagementAndTemplates;
//         }
//       }

//       if (prevValues.DocumentCapturing.length > 0) {
//         const index = newFeatures.findIndex(
//           (item) => item.category === "Document Capturing"
//         );
//         if (index === -1) {
//           newFeatures.push({
//             category: "Document Capturing",
//             subcategories: prevValues.DocumentCapturing,
//           });
//         } else {
//           newFeatures[index].subcategories = prevValues.DocumentCapturing;
//         }
//       }

//       if (prevValues.DocumentSearchAndNavigation.length > 0) {
//         const index = newFeatures.findIndex(
//           (item) => item.category === "Document Search and Navigation"
//         );
//         if (index === -1) {
//           newFeatures.push({
//             category: "Document Search and Navigation",
//             subcategories: prevValues.DocumentSearchAndNavigation,
//           });
//         } else {
//           newFeatures[index].subcategories =
//             prevValues.DocumentSearchAndNavigation;
//         }
//       }

//       if (prevValues.Authentication.length > 0) {
//         const index = newFeatures.findIndex(
//           (item) => item.category === "Authentication"
//         );
//         if (index === -1) {
//           newFeatures.push({
//             category: "Authentication",
//             subcategories: prevValues.Authentication,
//           });
//         } else {
//           newFeatures[index].subcategories = prevValues.Authentication;
//         }
//       }

//       if (prevValues.TaskAllotment.length > 0) {
//         const index = newFeatures.findIndex(
//           (item) => item.category === "Task Allotment"
//         );
//         if (index === -1) {
//           newFeatures.push({
//             category: "Task Allotment",
//             subcategories: prevValues.TaskAllotment,
//           });
//         } else {
//           newFeatures[index].subcategories = prevValues.TaskAllotment;
//         }
//       }

//       if (prevValues.BudgetingExpenseAndTimeTracking.length > 0) {
//         const index = newFeatures.findIndex(
//           (item) => item.category === "Budgeting, Expense and Time Tracking"
//         );
//         if (index === -1) {
//           newFeatures.push({
//             category: "Budgeting, Expense and Time Tracking",
//             subcategories: prevValues.BudgetingExpenseAndTimeTracking,
//           });
//         } else {
//           newFeatures[index].subcategories =
//             prevValues.BudgetingExpenseAndTimeTracking;
//         }
//       }

//       if (prevValues.ClientManagement.length > 0) {
//         const index = newFeatures.findIndex(
//           (item) => item.category === "Client Management"
//         );
//         if (index === -1) {
//           newFeatures.push({
//             category: "Client Management",
//             subcategories: prevValues.ClientManagement,
//           });
//         } else {
//           newFeatures[index].subcategories = prevValues.ClientManagement;
//         }
//       }

//       if (prevValues.InvoiceGenerationAndReview.length > 0) {
//         const index = newFeatures.findIndex(
//           (item) => item.category === "Invoice Generation and Review"
//         );
//         if (index === -1) {
//           newFeatures.push({
//             category: "Invoice Generation and Review",
//             subcategories: prevValues.InvoiceGenerationAndReview,
//           });
//         } else {
//           newFeatures[index].subcategories =
//             prevValues.InvoiceGenerationAndReview;
//         }
//       }

//       if (prevValues.DataIdentificationAndCollection.length > 0) {
//         const index = newFeatures.findIndex(
//           (item) => item.category === "Data Identification and Collection"
//         );
//         if (index === -1) {
//           newFeatures.push({
//             category: "Data Identification and Collection",
//             subcategories: prevValues.DataIdentificationAndCollection,
//           });
//         } else {
//           newFeatures[index].subcategories =
//             prevValues.DataIdentificationAndCollection;
//         }
//       }

//       if (prevValues.SearchProcessingAndAnalysis.length > 0) {
//         const index = newFeatures.findIndex(
//           (item) => item.category === "Search, Processing and Analysis"
//         );
//         if (index === -1) {
//           newFeatures.push({
//             category: "Search, Processing and Analysis",
//             subcategories: prevValues.SearchProcessingAndAnalysis,
//           });
//         } else {
//           newFeatures[index].subcategories =
//             prevValues.SearchProcessingAndAnalysis;
//         }
//       }

//       if (prevValues.ReviewAndProduction.length > 0) {
//         const index = newFeatures.findIndex(
//           (item) => item.category === "Review and Production"
//         );
//         if (index === -1) {
//           newFeatures.push({
//             category: "Review and Production",
//             subcategories: prevValues.ReviewAndProduction,
//           });
//         } else {
//           newFeatures[index].subcategories = prevValues.ReviewAndProduction;
//         }
//       }

//       if (prevValues.LegalHoldManagement.length > 0) {
//         const index = newFeatures.findIndex(
//           (item) => item.category === "Legal Hold Management"
//         );
//         if (index === -1) {
//           newFeatures.push({
//             category: "Legal Hold Management",
//             subcategories: prevValues.LegalHoldManagement,
//           });
//         } else {
//           newFeatures[index].subcategories = prevValues.LegalHoldManagement;
//         }
//       }

//       if (prevValues.IdeationAndCreation.length > 0) {
//         const index = newFeatures.findIndex(
//           (item) => item.category === "Ideation and Creation"
//         );
//         if (index === -1) {
//           newFeatures.push({
//             category: "Ideation and Creation",
//             subcategories: prevValues.IdeationAndCreation,
//           });
//         } else {
//           newFeatures[index].subcategories = prevValues.IdeationAndCreation;
//         }
//       }

//       if (prevValues.LifecycleManagementIP.length > 0) {
//         const index = newFeatures.findIndex(
//           (item) => item.category === "Lifecycle Management IP"
//         );
//         if (index === -1) {
//           newFeatures.push({
//             category: "Lifecycle Management IP",
//             subcategories: prevValues.LifecycleManagementIP,
//           });
//         } else {
//           newFeatures[index].subcategories = prevValues.LifecycleManagementIP;
//         }
//       }

//       if (prevValues.SearchAndDiscovery.length > 0) {
//         const index = newFeatures.findIndex(
//           (item) => item.category === "Search and Discovery"
//         );
//         if (index === -1) {
//           newFeatures.push({
//             category: "Search and Discovery",
//             subcategories: prevValues.SearchAndDiscovery,
//           });
//         } else {
//           newFeatures[index].subcategories = prevValues.SearchAndDiscovery;
//         }
//       }

//       if (prevValues.StorageAndRepository.length > 0) {
//         const index = newFeatures.findIndex(
//           (item) => item.category === "Storage and Repository"
//         );
//         if (index === -1) {
//           newFeatures.push({
//             category: "Storage and Repository",
//             subcategories: prevValues.StorageAndRepository,
//           });
//         } else {
//           newFeatures[index].subcategories = prevValues.StorageAndRepository;
//         }
//       }

//       if (prevValues.MatterLifecycleTracking.length > 0) {
//         const index = newFeatures.findIndex(
//           (item) => item.category === "Matter Lifecycle Tracking"
//         );
//         if (index === -1) {
//           newFeatures.push({
//             category: "Matter Lifecycle Tracking",
//             subcategories: prevValues.MatterLifecycleTracking,
//           });
//         } else {
//           newFeatures[index].subcategories = prevValues.MatterLifecycleTracking;
//         }
//       }

//       if (prevValues.CourtAndCaseSearch.length > 0) {
//         const index = newFeatures.findIndex(
//           (item) => item.category === "Court and Case Search"
//         );
//         if (index === -1) {
//           newFeatures.push({
//             category: "Court and Case Search",
//             subcategories: prevValues.CourtAndCaseSearch,
//           });
//         } else {
//           newFeatures[index].subcategories = prevValues.CourtAndCaseSearch;
//         }
//       }

//       if (prevValues.LitigationDocketingFeatures.length > 0) {
//         const index = newFeatures.findIndex(
//           (item) => item.category === "Litigation Docketing Features"
//         );
//         if (index === -1) {
//           newFeatures.push({
//             category: "Litigation Docketing Features",
//             subcategories: prevValues.LitigationDocketingFeatures,
//           });
//         } else {
//           newFeatures[index].subcategories =
//             prevValues.LitigationDocketingFeatures;
//         }
//       }

//       if (prevValues.WorkflowDesignAndConfiguration.length > 0) {
//         const index = newFeatures.findIndex(
//           (item) => item.category === "Workflow Design and Configuration"
//         );
//         if (index === -1) {
//           newFeatures.push({
//             category: "Workflow Design and Configuration",
//             subcategories: prevValues.WorkflowDesignAndConfiguration,
//           });
//         } else {
//           newFeatures[index].subcategories =
//             prevValues.WorkflowDesignAndConfiguration;
//         }
//       }

//       if (prevValues.AssignmentAllotmentAndTracking.length > 0) {
//         const index = newFeatures.findIndex(
//           (item) => item.category === "Assignment Allotment and Tracking"
//         );
//         if (index === -1) {
//           newFeatures.push({
//             category: "Assignment Allotment and Tracking",
//             subcategories: prevValues.AssignmentAllotmentAndTracking,
//           });
//         } else {
//           newFeatures[index].subcategories =
//             prevValues.AssignmentAllotmentAndTracking;
//         }
//       }

//       if (prevValues.DocumentCreationAndManagement.length > 0) {
//         const index = newFeatures.findIndex(
//           (item) => item.category === "Document Creation and Management"
//         );
//         if (index === -1) {
//           newFeatures.push({
//             category: "Document Creation and Management",
//             subcategories: prevValues.DocumentCreationAndManagement,
//           });
//         } else {
//           newFeatures[index].subcategories =
//             prevValues.DocumentCreationAndManagement;
//         }
//       }

//       if (prevValues.LawsComplianceAndRegulatoryTrackingIP.length > 0) {
//         const index = newFeatures.findIndex(
//           (item) =>
//             item.category === "Laws, Compliance and Regulatory Tracking 2"
//         );
//         if (index === -1) {
//           newFeatures.push({
//             category: "Laws, Compliance and Regulatory Tracking 2",
//             subcategories: prevValues.LawsComplianceAndRegulatoryTrackingIP,
//           });
//         } else {
//           newFeatures[index].subcategories =
//             prevValues.LawsComplianceAndRegulatoryTrackingIP;
//         }
//       }

//       return {
//         ...prevValues,
//         features: newFeatures,
//       };
//     });
//   };

//   const handlePricingSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const nameofPlanArray = [
//       formValues.nameofPlan1,
//       formValues.nameofPlan2,
//       formValues.nameofPlan3,
//     ].filter((value) => value !== "");
//     const validityArray = [
//       formValues.validity1,
//       formValues.validity2,
//       formValues.validity3,
//     ].filter((value) => value !== "");
//     const priceArray = [
//       formValues.price1,
//       formValues.price2,
//       formValues.price3,
//     ].filter((value) => value !== "");
//     // Use nameofPlanArray, validityArray, and priceArray as needed
//     console.log("Form Values:", formValues);
//   };

//   return (
//     <>
//       {submitted ? (
//         <div className="my-4 font-clarity">
//           <div className="flex  items-center">
//             <div className=" flex flex-col items-center">
//               <img src="/submitted.gif" alt="" />
//               <h2 className="text-gray-600 text-xl font-bold">
//                 Submitted Successfully!
//               </h2>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="my-4 font-clarity">
//           <h2 className="text-gray-900 text-xl font-bold flex gap-2 items-center">
//             <span className="border rounded-full border-primary1 p-1 text-2xl">
//               <IoIosInformation />
//             </span>
//             Product Information
//           </h2>

//           {step === 1 && (
//             <form onSubmit={temp1} className="flex flex-col gap-4">
//               <div>
//                 {/* Product Name */}
//                 <div className="mt-2">
//                   <Label className="prname">Product Name</Label>
//                   <Input
//                     name="prname"
//                     type="text"
//                     placeholder="Product Name"
//                     value={formValues.prname}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 {/* Product Logo */}
//                 <div className="mt-2">
//                   <Label htmlFor="logo">Product Logo</Label>
//                   <Input
//                     name="logo"
//                     type="file"
//                     placeholder="Logo"
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 {/* Category checkboxes */}
//                 <div className="mt-2">
//                   <Label htmlFor="category">Select Category</Label>
//                   {[
//                     "Client Relationship Management ",
//                     "Compliance and Risk Management",
//                     "Contract Lifecycle Management",
//                     "E-Signature",
//                     "Document Management System",
//                     "E-billing and Invoicing",
//                     "E-discovery",
//                     "Intellectual Property Management",
//                     "Litigation Management and Analytics",
//                     "Legal Workflow Automation",
//                     "Governance",
//                   ].map((category) => (
//                     <div
//                       key={category}
//                       className="items-top flex space-x-2 mt-2"
//                     >
//                       <Input
//                         name="category"
//                         type="checkbox"
//                         value={category}
//                         checked={formValues.category.includes(category)}
//                         onChange={handleChange}
//                         className="w-5 h-5"
//                       />
//                       <div className="grid gap-1.5 leading-none">
//                         <label className="text-sm font-medium leading-none">
//                           {category}
//                         </label>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//                 {/* Deployment checkboxes */}
//                 <div className="mt-2">
//                   <Label htmlFor="deployment">Select Deployment</Label>
//                   {["SaaS", "On-premise", "Hybrid", "Cloud"].map(
//                     (deployment) => (
//                       <div
//                         key={deployment}
//                         className="items-top flex space-x-2 mt-2"
//                       >
//                         <Input
//                           name="deployment"
//                           type="checkbox"
//                           value={deployment}
//                           checked={formValues.deployment.includes(deployment)}
//                           onChange={handleChange}
//                           className="w-5 h-5"
//                         />
//                         <div className="grid gap-1.5 leading-none">
//                           <label className="text-sm font-medium leading-none">
//                             {deployment}
//                           </label>
//                         </div>
//                       </div>
//                     )
//                   )}
//                 </div>
//                 {/* Mobile select */}
//                 <Label htmlFor="mobileAccessibility">
//                   Select Mobile Accessibility
//                 </Label>
//                 <Select
//                   value={formValues.mobileAccessibility}
//                   onValueChange={(value) =>
//                     setFormValues((prevValues) => ({
//                       ...prevValues,
//                       mobileAccessibility: value,
//                     }))
//                   }
//                 >
//                   <SelectTrigger className="w-full">
//                     <SelectValue placeholder="Mobile Accessibility" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="yes">Yes</SelectItem>
//                     <SelectItem value="no">No</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <div>
//                   <Label htmlFor="adoptionPeriod">Adoption period</Label>
//                   <div className="flex gap-4">
//                     <Input
//                       name="adoptionPeriod"
//                       type="text"
//                       placeholder="Adoption period"
//                       value={formValues.adoptionPeriod}
//                       onChange={handleChange}
//                       required
//                     />
//                     <Select
//                       value={formValues.adoptionPeriodUnit}
//                       onValueChange={(value) =>
//                         setFormValues((prevValues) => ({
//                           ...prevValues,
//                           adoptionPeriodUnit: value,
//                         }))
//                       }
//                     >
//                       <SelectTrigger className="w-full">
//                         <SelectValue placeholder="Period" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="days">Days</SelectItem>
//                         <SelectItem value="months">Months</SelectItem>
//                         <SelectItem value="years">Years</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 </div>

//                 {/* Language checkboxes */}
//                 <div className="mt-2">
//                   <Label htmlFor="languages">Select Languages (Max 5)</Label>
//                   <div className="grid grid-cols-2 md:grid-cols-5  gap-4">
//                     {[
//                       "Arabic",
//                       "Bulgarian",
//                       "Chinese",
//                       "Configurable",
//                       "Croatian",
//                       "Czech",
//                       "Danish",
//                       "Dutch",
//                       "English",
//                       "Estonian",
//                       "Finnish",
//                       "Flemish",
//                       "French",
//                       "German",
//                       "Greek",
//                       "Hebrew",
//                       "Hindi",
//                       "Hungarian",
//                       "Icelandic",
//                       "Indonesian",
//                       "Italian",
//                       "Japanese",
//                       "Korean",
//                       "Latvian",
//                       "Lithuanian",
//                       "Malay",
//                       "Maltese",
//                       "Norwegian",
//                       "Polish",
//                       "Portuguese",
//                       "Romanian",
//                       "Russian",
//                       "Serbian",
//                       "Spanish",
//                       "Swedish",
//                       "Tagalog",
//                       "Thai",
//                       "Turkish",
//                       "Vietnamese",
//                     ].map((language) => (
//                       <div
//                         key={language}
//                         className="items-top flex space-x-2 mt-2"
//                       >
//                         <Input
//                           name="languages"
//                           type="checkbox"
//                           value={language}
//                           checked={isLanguageSelected(language)}
//                           onChange={() => handleLanguageChange(language)}
//                           disabled={
//                             !canSelectMoreLanguages &&
//                             !isLanguageSelected(language)
//                           }
//                           className="w-5 h-5"
//                         />
//                         <div className="grid gap-1.5 leading-none">
//                           <label className="text-sm font-medium leading-none">
//                             {language}
//                           </label>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Security Certificates */}
//                 <div className="mt-2">
//                   <Label className="securityCertificate">
//                     Security Certificates
//                   </Label>
//                   <Textarea
//                     name="securityCertificate"
//                     placeholder="Mention name of certifications"
//                     value={formValues.securityCertificate}
//                     onChange={(event) => handleChange(event)}
//                     required
//                   />
//                 </div>

//                 {/* Intergration checkboxes */}
//                 <div className="mt-2">
//                   <Label htmlFor="integration">Integration</Label>
//                   {[
//                     "Integration 1",
//                     "Integration 2",
//                     "Integration 3",
//                     "Integration 4",
//                   ].map((integration) => (
//                     <div
//                       key={integration}
//                       className="items-top flex space-x-2 mt-2"
//                     >
//                       <Input
//                         name="integrations"
//                         type="checkbox"
//                         value={integration}
//                         checked={formValues.integrations.includes(integration)}
//                         onChange={handleChange}
//                         className="w-5 h-5"
//                       />
//                       <div className="grid gap-1.5 leading-none">
//                         <label className="text-sm font-medium leading-none">
//                           {integration}
//                         </label>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               <div className="mt-4 flex flex-col md:flex-row items-center gap-4">
//                 <Button
//                   type="submit"
//                   className="bg-primary1"
//                   disabled={loading}
//                 >
//                   {loading ? "Saving" : "Save & Continue"}
//                 </Button>

//                 {/* <Button onClick={nextStep} className="bg-primary1">
//               Next
//             </Button> */}

//                 <Button disabled type="submit" className="bg-primary1">
//                   Submit for Review
//                 </Button>
//               </div>
//             </form>
//           )}

//           <h2 className="text-gray-900 text-xl font-bold flex gap-2 items-center mt-4">
//             <span className="border rounded-full border-primary1 p-1 text-2xl">
//               <IoIosInformation />
//             </span>
//             Overview
//           </h2>

//           {step === 2 && (
//             <form onSubmit={temp1} className="flex flex-col gap-4 ">
//               <div>
//                 {/* Description*/}
//                 <div className="mt-2">
//                   <Label className="prname">Brief description</Label>
//                   <Textarea
//                     name="description"
//                     placeholder="Brief description, more long content will help in rankings"
//                     value={formValues.description}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 {/* USP */}
//                 <div className="mt-2">
//                   <Label htmlFor="logo">Unique Selling Proposition</Label>
//                   <Textarea
//                     name="usp"
//                     value={formValues.usp}
//                     placeholder="Unique Selling Proposition,more long content will help in rankings"
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 {/* Category checkboxes */}
//                 <div className="mt-2">
//                   <Label htmlFor="category">Upcoming updates</Label>
//                   <Textarea
//                     name="upcomingUpdates"
//                     placeholder="Upcoming updates, more long content will help in rankings"
//                     value={formValues.upcomingUpdates}
//                     onChange={handleChange}
//                     required
//                   ></Textarea>
//                 </div>
//               </div>
//               <div className="mt-4 flex flex-col md:flex-row items-center gap-4">
//                 <Button
//                   type="submit"
//                   className="bg-primary1"
//                   disabled={loading}
//                 >
//                   {loading ? "Saving" : "Save & Continue"}
//                 </Button>

//                 <Button disabled type="submit" className="bg-primary1">
//                   Submit for Review
//                 </Button>
//               </div>
//             </form>
//           )}

//           <h2 className="text-gray-900 text-xl font-bold flex gap-2 items-center mt-4">
//             <span className="border rounded-full border-primary1 p-1 text-2xl">
//               <IoIosInformation />
//             </span>
//             Customer Segment
//           </h2>

//           {step === 3 && (
//             <form onSubmit={temp1} className="flex flex-col gap-4 ">
//               <div>
//                 {/* user categories*/}
//                 <div className="mt-2">
//                   <Label htmlFor="userCategories">Select User Categories</Label>
//                   {[
//                     "Individual Practitioner",
//                     "Law firms",
//                     "Government departments",
//                     "Startups",
//                     "Enterprises",
//                     "Judiciary",
//                   ].map((category) => (
//                     <div
//                       key={category}
//                       className="items-top flex space-x-2 mt-2"
//                     >
//                       <Input
//                         name="userCategory"
//                         type="checkbox"
//                         value={category}
//                         checked={formValues.userCategory.includes(category)}
//                         onChange={handleChange}
//                         className="w-5 h-5"
//                       />
//                       <div className="grid gap-1.5 leading-none">
//                         <label className="text-sm font-medium leading-none">
//                           {category}
//                         </label>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//                 {formValues.userCategory.map((category, index) => (
//                   <div key={category} className="mt-4">
//                     <div className="inline-flex gap-5 items-center">
//                       <Label htmlFor={`slider_${index}`}>{category}</Label>
//                       <output className="text-sm text-gray-600">
//                         {formValues.userCategoryPercentage[index]} %
//                       </output>
//                     </div>
//                     <Input
//                       name="userCategoryPercentage"
//                       type="range"
//                       className="w-full bg-transparent cursor-pointer appearance-none disabled:opacity-50 disabled:pointer-events-none focus:outline-none
//   [&::-webkit-slider-thumb]:w-2.5
//   [&::-webkit-slider-thumb]:h-2.5
//   [&::-webkit-slider-thumb]:-mt-0.5
//   [&::-webkit-slider-thumb]:appearance-none
//   [&::-webkit-slider-thumb]:bg-white
//   [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(37,99,235,1)]
//   [&::-webkit-slider-thumb]:rounded-full
//   [&::-webkit-slider-thumb]:transition-all
//   [&::-webkit-slider-thumb]:duration-150
//   [&::-webkit-slider-thumb]:ease-in-out
//   [&::-webkit-slider-thumb]:dark:bg-neutral-700

//   [&::-moz-range-thumb]:w-2.5
//   [&::-moz-range-thumb]:h-2.5
//   [&::-moz-range-thumb]:appearance-none
//   [&::-moz-range-thumb]:bg-white
//   [&::-moz-range-thumb]:border-4
//   [&::-moz-range-thumb]:border-blue-600
//   [&::-moz-range-thumb]:rounded-full
//   [&::-moz-range-thumb]:transition-all
//   [&::-moz-range-thumb]:duration-150
//   [&::-moz-range-thumb]:ease-in-out

//   [&::-webkit-slider-runnable-track]:w-full
//   [&::-webkit-slider-runnable-track]:h-2
//   [&::-webkit-slider-runnable-track]:bg-gray-100
//   [&::-webkit-slider-runnable-track]:rounded-full
//   [&::-webkit-slider-runnable-track]:dark:bg-neutral-700

//   [&::-moz-range-track]:w-full
//   [&::-moz-range-track]:h-2
//   [&::-moz-range-track]:bg-gray-100
//   [&::-moz-range-track]:rounded-full"
//                       id="min-and-max-range-slider-usage"
//                       min="0"
//                       max="100"
//                       value={formValues.userCategoryPercentage[index]}
//                       onChange={handleSliderChange}
//                       data-index={index}
//                     />
//                   </div>
//                 ))}

//                 <div className="mt-2">
//                   <Label htmlFor="industry">Select User Categories</Label>
//                   <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
//                     {[
//                       "Neutral",
//                       "Accounting firms",
//                       "Agriculture",
//                       "Banking and Finance",
//                       "Construction and Engineering",
//                       "Consulting firms",
//                       "Education",
//                       "Energy and Utilities",
//                       "Government and Public Sector",
//                       "Healthcare",
//                       "Hospitality and Tourism",
//                       "Insurance",
//                       "Legal Services Providers",
//                       "Manufacturing",
//                       "Media and Entertainment",
//                       "Non-Profit Organizations",
//                       "Pharmaceutical and Life Sciences",
//                       "Real Estate",
//                       "Retail and Consumer Goods",
//                       "Technology and Software",
//                       "Telecommunications",
//                       "Transportation and Logistics",
//                     ].map((category) => (
//                       <div
//                         key={category}
//                         className="items-top flex space-x-2 mt-2"
//                       >
//                         <Input
//                           name="industry"
//                           type="checkbox"
//                           value={category}
//                           checked={formValues.industry.includes(category)}
//                           onChange={handleChange}
//                           className="w-5 h-5"
//                         />
//                         <div className="grid gap-1.5 leading-none">
//                           <label className="text-sm font-medium leading-none">
//                             {category}
//                           </label>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//                 {formValues.industry.map((category, index) => (
//                   <div key={category} className="mt-4">
//                     <div className="inline-flex gap-5 items-center">
//                       <Label htmlFor={`slider_${index}`}>{category}</Label>
//                       <output className="text-sm text-gray-600">
//                         {formValues.industryPercentage[index]} %
//                       </output>
//                     </div>
//                     <Input
//                       name="industryPercentage"
//                       type="range"
//                       className="w-full bg-transparent cursor-pointer appearance-none disabled:opacity-50 disabled:pointer-events-none focus:outline-none
//   [&::-webkit-slider-thumb]:w-2.5
//   [&::-webkit-slider-thumb]:h-2.5
//   [&::-webkit-slider-thumb]:-mt-0.5
//   [&::-webkit-slider-thumb]:appearance-none
//   [&::-webkit-slider-thumb]:bg-white
//   [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(37,99,235,1)]
//   [&::-webkit-slider-thumb]:rounded-full
//   [&::-webkit-slider-thumb]:transition-all
//   [&::-webkit-slider-thumb]:duration-150
//   [&::-webkit-slider-thumb]:ease-in-out
//   [&::-webkit-slider-thumb]:dark:bg-neutral-700

//   [&::-moz-range-thumb]:w-2.5
//   [&::-moz-range-thumb]:h-2.5
//   [&::-moz-range-thumb]:appearance-none
//   [&::-moz-range-thumb]:bg-white
//   [&::-moz-range-thumb]:border-4
//   [&::-moz-range-thumb]:border-blue-600
//   [&::-moz-range-thumb]:rounded-full
//   [&::-moz-range-thumb]:transition-all
//   [&::-moz-range-thumb]:duration-150
//   [&::-moz-range-thumb]:ease-in-out

//   [&::-webkit-slider-runnable-track]:w-full
//   [&::-webkit-slider-runnable-track]:h-2
//   [&::-webkit-slider-runnable-track]:bg-gray-100
//   [&::-webkit-slider-runnable-track]:rounded-full
//   [&::-webkit-slider-runnable-track]:dark:bg-neutral-700

//   [&::-moz-range-track]:w-full
//   [&::-moz-range-track]:h-2
//   [&::-moz-range-track]:bg-gray-100
//   [&::-moz-range-track]:rounded-full"
//                       id="min-and-max-range-slider-usage"
//                       min="0"
//                       max="100"
//                       value={formValues.industryPercentage[index]}
//                       onChange={handleIndustrySliderChange}
//                       data-index={index}
//                     />
//                   </div>
//                 ))}

//                 <div className="mt-2">
//                   <label htmlFor="practiceAreas">Select Law Categories</label>
//                   <div className="grid grid-cols-2 md:grid-cols-3 gap-1.5 leading-none">
//                     {[
//                       "Appellate Law",
//                       "Antitrust Law",
//                       "Alternative Dispute Resolution",
//                       "Aviation",
//                       "Banking & Finance",
//                       "Business Law",
//                       "Civil Law",
//                       "Company",
//                       "Contract",
//                       "Consumer Protection",
//                       "Competition/Anti-Trust Law",
//                       "Construction",
//                       "Corporate Law",
//                       "Cybersecurity and Privacy Law",
//                       "Mergers and Acquisitions (M&A)",
//                       "Defense Law",
//                       "Dispute Resolution",
//                       "Election Law",
//                       "Education Law",
//                       "Energy and Natural Resources",
//                       "Environmental Law",
//                       "Labour and Employment Law",
//                       "Franchise Law",
//                       "Foreign Exchange Law",
//                       "Family and Succession",
//                       "Food and Drug Law",
//                       "Gaming Law",
//                       "Human Rights Law",
//                       "Healthcare",
//                       "International Law",
//                       "Immigration Law",
//                       "Infrastructure",
//                       "Insolvency and Banking",
//                       "Insurance",
//                       "Information Technology",
//                       "Intellectual Property Law",
//                       "Investment Law",
//                       "International Trade and Customs Law",
//                       "Management of Litigation",
//                       "Manufacturing in India",
//                       "Metals and Mining",
//                       "Technology Law",
//                       "Tax Law",
//                       "Telecommunication Law",
//                       "Personal Injury Law",
//                       "Product Liability",
//                       "Pharma and Life Sciences",
//                       "Public Interest Law",
//                       "Public Finance Law",
//                       "Railways",
//                       "Real Estate/Property Law",
//                       "Social Security and Disability Law",
//                       "Securities Law",
//                       "Sports, Media, Entertainment and Advertising",
//                       "Shipping",
//                       "Tax-Exempt Organizations Law",
//                       "Transportation Law",
//                       "Trade and commerce",
//                       "Trust",
//                       "Other",
//                     ].map((category) => (
//                       <div
//                         key={category}
//                         className="items-top flex space-x-2 mt-2"
//                       >
//                         <Input
//                           name="practiceAreas"
//                           type="checkbox"
//                           value={category}
//                           checked={formValues.practiceAreas.includes(category)}
//                           onChange={handleChange}
//                           className="w-5 h-5"
//                         />
//                         <div className="grid gap-1.5 leading-none">
//                           <label className="text-sm font-medium leading-none">
//                             {category}
//                           </label>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {formValues.practiceAreas.map((category, index) => (
//                   <div key={category} className="mt-4">
//                     <label htmlFor={`lawSlider_${index}`}>{category}</label>
//                     <Input
//                       name="practiceAreasPercentage"
//                       className="w-full bg-transparent cursor-pointer appearance-none disabled:opacity-50 disabled:pointer-events-none focus:outline-none
//                   [&::-webkit-slider-thumb]:w-2.5
//                   [&::-webkit-slider-thumb]:h-2.5
//                   [&::-webkit-slider-thumb]:-mt-0.5
//                   [&::-webkit-slider-thumb]:appearance-none
//                   [&::-webkit-slider-thumb]:bg-white
//                   [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(37,99,235,1)]
//                   [&::-webkit-slider-thumb]:rounded-full
//                   [&::-webkit-slider-thumb]:transition-all
//                   [&::-webkit-slider-thumb]:duration-150
//                   [&::-webkit-slider-thumb]:ease-in-out
//                   [&::-webkit-slider-thumb]:dark:bg-neutral-700

//                   [&::-moz-range-thumb]:w-2.5
//                   [&::-moz-range-thumb]:h-2.5
//                   [&::-moz-range-thumb]:appearance-none
//                   [&::-moz-range-thumb]:bg-white
//                   [&::-moz-range-thumb]:border-4
//                   [&::-moz-range-thumb]:border-blue-600
//                   [&::-moz-range-thumb]:rounded-full
//                   [&::-moz-range-thumb]:transition-all
//                   [&::-moz-range-thumb]:duration-150
//                   [&::-moz-range-thumb]:ease-in-out

//                   [&::-webkit-slider-runnable-track]:w-full
//                   [&::-webkit-slider-runnable-track]:h-2
//                   [&::-webkit-slider-runnable-track]:bg-gray-100
//                   [&::-webkit-slider-runnable-track]:rounded-full
//                   [&::-webkit-slider-runnable-track]:dark:bg-neutral-700

//                   [&::-moz-range-track]:w-full
//                   [&::-moz-range-track]:h-2
//                   [&::-moz-range-track]:bg-gray-100
//                   [&::-moz-range-track]:rounded-full"
//                       type="range"
//                       min="0"
//                       max="100"
//                       value={formValues.practiceAreasPercentage[index]}
//                       onChange={handleLawSliderChange}
//                       data-index={index}
//                     />
//                     <output>{formValues.practiceAreasPercentage[index]}</output>
//                   </div>
//                 ))}
//               </div>

//               {/*Team Sixe */}
//               <Label htmlFor="mobileAccessibility">Select Team size</Label>
//               <Select
//                 value={formValues.teamSize}
//                 onValueChange={(value) =>
//                   setFormValues((prevValues) => ({
//                     ...prevValues,
//                     teamSize: value,
//                   }))
//                 }
//               >
//                 <SelectTrigger className="w-full">
//                   <SelectValue placeholder="Team size" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="1">Single</SelectItem>
//                   <SelectItem value="1-20">1-20</SelectItem>
//                   <SelectItem value="20-50">20-50</SelectItem>
//                   <SelectItem value="50-200">50-200</SelectItem>
//                   <SelectItem value="200-500">200-500</SelectItem>
//                   <SelectItem value="500+">500+</SelectItem>
//                 </SelectContent>
//               </Select>
//               <div className="mt-4 flex flex-col md:flex-row items-center gap-4">
//                 <Button
//                   type="submit"
//                   className="bg-primary1"
//                   disabled={loading}
//                 >
//                   {loading ? "Saving" : "Save & Continue"}
//                 </Button>

//                 <Button disabled type="submit" className="bg-primary1">
//                   Submit for Review
//                 </Button>
//               </div>
//             </form>
//           )}

//           <h2 className="text-gray-900 text-xl font-bold flex gap-2 items-center mt-4">
//             <span className="border rounded-full border-primary1 p-1 text-2xl">
//               <IoIosInformation />
//             </span>
//             Process Lifecycle
//           </h2>

//           {step === 4 && (
//             <div className="mt-4 ">
//               <form onSubmit={temp1} className="flex flex-col gap-4 ">
//                 <div>
//                   {formValues.category.includes(
//                     "Client Relationship Management "
//                   ) && (
//                     <div className="mt-2">
//                       <div className="mt-2">
//                         <Label htmlFor="deployment">
//                           Customer Relation Management
//                         </Label>
//                         {[
//                           "Intake",
//                           "Assessment",
//                           "Strategize",
//                           "Represent",
//                           "Communication",
//                           "Review",
//                         ].map((crm) => (
//                           <div
//                             key={crm}
//                             className="items-top flex space-x-2 mt-2"
//                           >
//                             <Input
//                               name="clientManagementSoftware"
//                               type="checkbox"
//                               value={crm}
//                               checked={formValues.clientManagementSoftware.includes(
//                                 crm
//                               )}
//                               onChange={handleChange}
//                               className="w-5 h-5"
//                             />
//                             <div className="grid gap-1.5 leading-none">
//                               <label className="text-sm font-medium leading-none">
//                                 {crm}
//                               </label>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {formValues.category.includes(
//                     "Compliance and Risk Management"
//                   ) && (
//                     <div className="mt-2">
//                       <div className="mt-2">
//                         <Label htmlFor="deployment">
//                           Compliance and Risk Management Software
//                         </Label>
//                         {[
//                           "Coverage",
//                           "Assessment",
//                           "Validation",
//                           "Implementation",
//                           "Monitoring",
//                           "Analysis",
//                         ].map((crm) => (
//                           <div
//                             key={crm}
//                             className="items-top flex space-x-2 mt-2"
//                           >
//                             <Input
//                               name="ComplianceandRiskSoftware"
//                               type="checkbox"
//                               value={crm}
//                               checked={formValues.ComplianceandRiskSoftware.includes(
//                                 crm
//                               )}
//                               onChange={handleChange}
//                               className="w-5 h-5"
//                             />
//                             <div className="grid gap-1.5 leading-none">
//                               <label className="text-sm font-medium leading-none">
//                                 {crm}
//                               </label>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {formValues.category.includes(
//                     "Contract Lifecycle Management"
//                   ) && (
//                     <div className="mt-2">
//                       <div className="mt-2">
//                         <Label htmlFor="deployment">
//                           Contract Lifecycle Management
//                         </Label>
//                         {[
//                           "Create",
//                           "Negotiation",
//                           "Authentication",
//                           "Execute",
//                           "Store",
//                           "Tracking",
//                         ].map((crm) => (
//                           <div
//                             key={crm}
//                             className="items-top flex space-x-2 mt-2"
//                           >
//                             <Input
//                               name="contractManageSoftware"
//                               type="checkbox"
//                               value={crm}
//                               checked={formValues.contractManageSoftware.includes(
//                                 crm
//                               )}
//                               onChange={handleChange}
//                               className="w-5 h-5"
//                             />
//                             <div className="grid gap-1.5 leading-none">
//                               <label className="text-sm font-medium leading-none">
//                                 {crm}
//                               </label>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {formValues.category.includes("E-Signature") && (
//                     <div className="mt-2">
//                       <div className="mt-2">
//                         <Label htmlFor="deployment">E-Signature</Label>
//                         {[
//                           "Document Preparation",
//                           "Authentication",
//                           "Signing",
//                           "Encryption",
//                           "Verification",
//                           "Distribution",
//                         ].map((crm) => (
//                           <div
//                             key={crm}
//                             className="items-top flex space-x-2 mt-2"
//                           >
//                             <Input
//                               name="DigitalSignature"
//                               type="checkbox"
//                               value={crm}
//                               checked={formValues.DigitalSignature.includes(
//                                 crm
//                               )}
//                               onChange={handleChange}
//                               className="w-5 h-5"
//                             />
//                             <div className="grid gap-1.5 leading-none">
//                               <label className="text-sm font-medium leading-none">
//                                 {crm}
//                               </label>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {formValues.category.includes(
//                     "Document Management System"
//                   ) && (
//                     <div className="mt-2">
//                       <div className="mt-2">
//                         <Label htmlFor="deployment">
//                           Document Management System Software
//                         </Label>
//                         {[
//                           "Capture",
//                           "Change management",
//                           "Review",
//                           "Organize",
//                           "Access management",
//                           "Retrival",
//                         ].map((crm) => (
//                           <div
//                             key={crm}
//                             className="items-top flex space-x-2 mt-2"
//                           >
//                             <Input
//                               name="DocumnetManagement"
//                               type="checkbox"
//                               value={crm}
//                               checked={formValues.DocumnetManagement.includes(
//                                 crm
//                               )}
//                               onChange={handleChange}
//                               className="w-5 h-5"
//                             />
//                             <div className="grid gap-1.5 leading-none">
//                               <label className="text-sm font-medium leading-none">
//                                 {crm}
//                               </label>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {formValues.category.includes("E-billing and Invoicing") && (
//                     <div className="mt-2">
//                       <div className="mt-2">
//                         <Label htmlFor="deployment">
//                           E-billing and Invoicing
//                         </Label>
//                         {[
//                           "Invoice generation",
//                           "Authorization",
//                           "Distribution and Accessibility",
//                           "Payment Faciliation",
//                           "Tracking",
//                           "Analysis",
//                         ].map((crm) => (
//                           <div
//                             key={crm}
//                             className="items-top flex space-x-2 mt-2"
//                           >
//                             <Input
//                               name="Ebilling"
//                               type="checkbox"
//                               value={crm}
//                               checked={formValues.Ebilling.includes(crm)}
//                               onChange={handleChange}
//                               className="w-5 h-5"
//                             />
//                             <div className="grid gap-1.5 leading-none">
//                               <label className="text-sm font-medium leading-none">
//                                 {crm}
//                               </label>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {formValues.category.includes("E-discovery") && (
//                     <div className="mt-2">
//                       <div className="mt-2">
//                         <Label htmlFor="deployment">E-discovery</Label>
//                         {[
//                           "Discover",
//                           "Preserve",
//                           "Acquire",
//                           "Examine",
//                           "Evaluate",
//                           "Present",
//                         ].map((crm) => (
//                           <div
//                             key={crm}
//                             className="items-top flex space-x-2 mt-2"
//                           >
//                             <Input
//                               name="Ediscovery"
//                               type="checkbox"
//                               value={crm}
//                               checked={formValues.Ediscovery.includes(crm)}
//                               onChange={handleChange}
//                               className="w-5 h-5"
//                             />
//                             <div className="grid gap-1.5 leading-none">
//                               <label className="text-sm font-medium leading-none">
//                                 {crm}
//                               </label>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {formValues.category.includes(
//                     "Intellectual Property Management"
//                   ) && (
//                     <div className="mt-2">
//                       <div className="mt-2">
//                         <Label htmlFor="deployment">
//                           IP Management Software
//                         </Label>
//                         {[
//                           "Cataloging",
//                           "Analysis",
//                           "Protection",
//                           "Monitoring",
//                           "Enforcement",
//                           "Reporting",
//                         ].map((crm) => (
//                           <div
//                             key={crm}
//                             className="items-top flex space-x-2 mt-2"
//                           >
//                             <Input
//                               name="IPManagement"
//                               type="checkbox"
//                               value={crm}
//                               checked={formValues.IPManagement.includes(crm)}
//                               onChange={handleChange}
//                               className="w-5 h-5"
//                             />
//                             <div className="grid gap-1.5 leading-none">
//                               <label className="text-sm font-medium leading-none">
//                                 {crm}
//                               </label>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {formValues.category.includes(
//                     "Litigation Management and Analytics"
//                   ) && (
//                     <div className="mt-2">
//                       <div className="mt-2">
//                         <Label htmlFor="deployment">
//                           Litigation Management and analytics
//                         </Label>
//                         {[
//                           "Intake",
//                           "Strategize",
//                           "Preparation",
//                           "Litigation Support",
//                           "Analytics",
//                           "Outcome evaluation",
//                         ].map((crm) => (
//                           <div
//                             key={crm}
//                             className="items-top flex space-x-2 mt-2"
//                           >
//                             <Input
//                               name="LitigationManagement"
//                               type="checkbox"
//                               value={crm}
//                               checked={formValues.LitigationManagement.includes(
//                                 crm
//                               )}
//                               onChange={handleChange}
//                               className="w-5 h-5"
//                             />
//                             <div className="grid gap-1.5 leading-none">
//                               <label className="text-sm font-medium leading-none">
//                                 {crm}
//                               </label>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {formValues.category.includes(
//                     "Legal Workflow Automation"
//                   ) && (
//                     <div className="mt-2">
//                       <div className="mt-2">
//                         <Label htmlFor="deployment">
//                           Legal Workflow Automation
//                         </Label>
//                         {[
//                           "Process Identification",
//                           "Workflow configuration",
//                           "Validation",
//                           "Implementation",
//                           "Tracking",
//                           "Optimization",
//                         ].map((crm) => (
//                           <div
//                             key={crm}
//                             className="items-top flex space-x-2 mt-2"
//                           >
//                             <Input
//                               name="legalWorkflow"
//                               type="checkbox"
//                               value={crm}
//                               checked={formValues.legalWorkflow.includes(crm)}
//                               onChange={handleChange}
//                               className="w-5 h-5"
//                             />
//                             <div className="grid gap-1.5 leading-none">
//                               <label className="text-sm font-medium leading-none">
//                                 {crm}
//                               </label>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//                 <div className="mt-4 flex flex-col md:flex-row items-center gap-4">
//                   <Button
//                     type="submit"
//                     className="bg-primary1"
//                     disabled={loading}
//                   >
//                     {loading ? "Saving" : "Save & Continue"}
//                   </Button>

//                   <Button disabled type="submit" className="bg-primary1">
//                     Submit for Review
//                   </Button>
//                 </div>
//               </form>
//             </div>
//           )}

//           <h2 className="text-gray-900 text-xl font-bold flex gap-2 items-center mt-4">
//             <span className="border rounded-full border-primary1 p-1 text-2xl">
//               <IoIosInformation />
//             </span>
//             Features
//           </h2>

//           {step === 5 && (
//             <>
//               <form onSubmit={temp1} className="flex flex-col gap-4">
//                 <div>
//                   <div className="mt-2">
//                     <Label htmlFor="">Internal Collaboration</Label>
//                     {[
//                       "Messaging and Communication",
//                       "Notification",
//                       "Document sharing",
//                       "Real time Document editing",
//                     ].map((item) => (
//                       <div key={item} className="items-top flex space-x-2 mt-2">
//                         <Input
//                           name="InternalCollaboration"
//                           type="checkbox"
//                           value={item}
//                           checked={formValues.InternalCollaboration.includes(
//                             item
//                           )}
//                           onChange={handleChange}
//                           className="w-5 h-5"
//                           required
//                         />
//                         <div className="grid gap-1.5 leading-none">
//                           <label className="text-sm font-medium leading-none">
//                             {item}
//                           </label>
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   <div className="mt-2">
//                     <Label htmlFor="">External Collaboration</Label>
//                     {[
//                       "Messaging and Communication",
//                       "Notification",
//                       "Document sharing",
//                       "Real time Document editing",
//                     ].map((item) => (
//                       <div key={item} className="items-top flex space-x-2 mt-2">
//                         <Input
//                           name="ExternalCollaboration"
//                           type="checkbox"
//                           value={item}
//                           checked={formValues.ExternalCollaboration.includes(
//                             item
//                           )}
//                           onChange={handleChange}
//                           className="w-5 h-5"
//                         />
//                         <div className="grid gap-1.5 leading-none">
//                           <label className="text-sm font-medium leading-none">
//                             {item}
//                           </label>
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   <div className="mt-2">
//                     <Label htmlFor="">Analytics and Reporting</Label>
//                     {[
//                       "Analytics dashboard",
//                       "Report generation",
//                       "Dashboard Customization",
//                       "Report Customization",
//                     ].map((item) => (
//                       <div key={item} className="items-top flex space-x-2 mt-2">
//                         <Input
//                           name="AnalyticsAndReporting"
//                           type="checkbox"
//                           value={item}
//                           checked={formValues.AnalyticsAndReporting.includes(
//                             item
//                           )}
//                           onChange={handleChange}
//                           className="w-5 h-5"
//                           required
//                         />
//                         <div className="grid gap-1.5 leading-none">
//                           <label className="text-sm font-medium leading-none">
//                             {item}
//                           </label>
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   <div className="mt-2">
//                     <Label htmlFor="">Tool Administration and Control</Label>
//                     {[
//                       "Multiple User role",
//                       "Granular Permission",
//                       "Information access control",
//                       "Role based access control",
//                     ].map((item) => (
//                       <div key={item} className="items-top flex space-x-2 mt-2">
//                         <Input
//                           name="ToolAdministrationAndControl"
//                           type="checkbox"
//                           value={item}
//                           checked={formValues.ToolAdministrationAndControl.includes(
//                             item
//                           )}
//                           onChange={handleChange}
//                           className="w-5 h-5"
//                           required
//                         />
//                         <div className="grid gap-1.5 leading-none">
//                           <label className="text-sm font-medium leading-none">
//                             {item}
//                           </label>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//                 {/*  */}
//                 {/* Client Relationship Management  */}
//                 {formValues.category.includes("Client Relationship Management ") && (
//                   <div>
//                     <div className="mt-2">
//                       <Label htmlFor="">Intake and Lead Management</Label>
//                       {[
//                         "Tracking and capture",
//                         "Lead assignment",
//                         "Follow Up",
//                       ].map((item) => (
//                         <div
//                           key={item}
//                           className="items-top flex space-x-2 mt-2"
//                         >
//                           <Input
//                             name="IntakeAndLeadManagement"
//                             type="checkbox"
//                             value={item}
//                             checked={formValues.IntakeAndLeadManagement.includes(
//                               item
//                             )}
//                             onChange={handleChange}
//                             className="w-5 h-5"
//                           />
//                           <div className="grid gap-1.5 leading-none">
//                             <label className="text-sm font-medium leading-none">
//                               {item}
//                             </label>
//                           </div>
//                         </div>
//                       ))}
//                     </div>

//                     <div className="mt-2">
//                       <Label htmlFor="">Client Portal</Label>
//                       {[
//                         "Profile Management",
//                         "Appointment Management",
//                         "Task Tracking",
//                         "Client Communication",
//                       ].map((item) => (
//                         <div
//                           key={item}
//                           className="items-top flex space-x-2 mt-2"
//                         >
//                           <Input
//                             name="ClientPortal"
//                             type="checkbox"
//                             value={item}
//                             checked={formValues.ClientPortal.includes(item)}
//                             onChange={handleChange}
//                             className="w-5 h-5"
//                             required
//                           />
//                           <div className="grid gap-1.5 leading-none">
//                             <label className="text-sm font-medium leading-none">
//                               {item}
//                             </label>
//                           </div>
//                         </div>
//                       ))}
//                     </div>

//                     <div className="mt-2">
//                       <Label htmlFor="">Document Management</Label>
//                       {[
//                         "Document creation",
//                         "Document Templatization",
//                         "Version control",
//                         "Granular permissions",
//                       ].map((item) => (
//                         <div
//                           key={item}
//                           className="items-top flex space-x-2 mt-2"
//                         >
//                           <Input
//                             name="DocumentManagement"
//                             type="checkbox"
//                             value={item}
//                             checked={formValues.DocumentManagement.includes(
//                               item
//                             )}
//                             onChange={handleChange}
//                             className="w-5 h-5"
//                           />
//                           <div className="grid gap-1.5 leading-none">
//                             <label className="text-sm font-medium leading-none">
//                               {item}
//                             </label>
//                           </div>
//                         </div>
//                       ))}
//                     </div>

//                     <div className="mt-2">
//                       <Label htmlFor="">Case Alerts</Label>
//                       {[
//                         "Event based notifications",
//                         "Case schedules updates",
//                         "Document changes alert",
//                       ].map((item) => (
//                         <div
//                           key={item}
//                           className="items-top flex space-x-2 mt-2"
//                         >
//                           <Input
//                             name="CaseAlerts"
//                             type="checkbox"
//                             value={item}
//                             checked={formValues.CaseAlerts.includes(item)}
//                             onChange={handleChange}
//                             className="w-5 h-5"
//                           />
//                           <div className="grid gap-1.5 leading-none">
//                             <label className="text-sm font-medium leading-none">
//                               {item}
//                             </label>
//                           </div>
//                         </div>
//                       ))}
//                     </div>

//                     <div className="mt-2">
//                       <Label htmlFor="">
//                         Budget, Expense and Time Tracking
//                       </Label>
//                       {[
//                         "Budget Management",
//                         "Time tracking",
//                         "Approval Management",
//                       ].map((item) => (
//                         <div
//                           key={item}
//                           className="items-top flex space-x-2 mt-2"
//                         >
//                           <Input
//                             name="BudgetExpenseAndTimeTracking"
//                             type="checkbox"
//                             value={item}
//                             checked={formValues.BudgetExpenseAndTimeTracking.includes(
//                               item
//                             )}
//                             onChange={handleChange}
//                             className="w-5 h-5"
//                           />
//                           <div className="grid gap-1.5 leading-none">
//                             <label className="text-sm font-medium leading-none">
//                               {item}
//                             </label>
//                           </div>
//                         </div>
//                       ))}
//                     </div>

//                     <div className="mt-2">
//                       <Label htmlFor="">Client Billing and Invoicing</Label>
//                       {[
//                         "Multiple fee arrangement",
//                         "Invoice creation",
//                         "Automated Invoicing",
//                       ].map((item) => (
//                         <div
//                           key={item}
//                           className="items-top flex space-x-2 mt-2"
//                         >
//                           <Input
//                             name="ClientBillingAndInvoicing"
//                             type="checkbox"
//                             value={item}
//                             checked={formValues.ClientBillingAndInvoicing.includes(
//                               item
//                             )}
//                             onChange={handleChange}
//                             className="w-5 h-5"
//                           />
//                           <div className="grid gap-1.5 leading-none">
//                             <label className="text-sm font-medium leading-none">
//                               {item}
//                             </label>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/*  */}

//                 {formValues.category.includes(
//                   "Compliance and Risk Management"
//                 ) && (
//                   <div>
//                     <div className="mt-2">
//                       <Label htmlFor="">Policy Management</Label>
//                       {[
//                         "Policy creation",
//                         "Centralized repository",
//                         "Version control",
//                         "Policy reviews",
//                         "Policy monitoring",
//                       ].map((item) => (
//                         <div
//                           key={item}
//                           className="items-top flex space-x-2 mt-2"
//                         >
//                           <Input
//                             name="PolicyManagement"
//                             type="checkbox"
//                             value={item}
//                             checked={formValues.PolicyManagement.includes(item)}
//                             onChange={handleChange}
//                             className="w-5 h-5"
//                           />
//                           <div className="grid gap-1.5 leading-none">
//                             <label className="text-sm font-medium leading-none">
//                               {item}
//                             </label>
//                           </div>
//                         </div>
//                       ))}
//                     </div>

//                     <div className="mt-2">
//                       <Label htmlFor="">Issue Management</Label>
//                       {[
//                         "Incident reporting",
//                         "Issue assessment",
//                         "Action tracking",
//                         "Response measuring",
//                       ].map((item) => (
//                         <div
//                           key={item}
//                           className="items-top flex space-x-2 mt-2"
//                         >
//                           <Input
//                             name="IssueManagement"
//                             type="checkbox"
//                             value={item}
//                             checked={formValues.IssueManagement.includes(item)}
//                             onChange={handleChange}
//                             className="w-5 h-5"
//                           />
//                           <div className="grid gap-1.5 leading-none">
//                             <label className="text-sm font-medium leading-none">
//                               {item}
//                             </label>
//                           </div>
//                         </div>
//                       ))}
//                     </div>

//                     <div className="mt-2">
//                       <Label htmlFor="">
//                         Laws, Compliance and Regulatory Tracking
//                       </Label>
//                       {[
//                         "Sectoral relevance",
//                         "Compliance applicability",
//                         "Law and compliance updates",
//                       ].map((item) => (
//                         <div
//                           key={item}
//                           className="items-top flex space-x-2 mt-2"
//                         >
//                           <Input
//                             name="LawsComplianceAndRegulatoryTracking"
//                             type="checkbox"
//                             value={item}
//                             checked={formValues.LawsComplianceAndRegulatoryTracking.includes(
//                               item
//                             )}
//                             onChange={handleChange}
//                             className="w-5 h-5"
//                           />
//                           <div className="grid gap-1.5 leading-none">
//                             <label className="text-sm font-medium leading-none">
//                               {item}
//                             </label>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {formValues.category.includes(
//                   "Contract Lifecycle Management"
//                 ) && (
//                   <div>
//                     <div className="mt-2">
//                       <Label htmlFor="">Contract Creation and Authoring</Label>
//                       {[
//                         "Contract Authoring",
//                         "Text Editor",
//                         "Contract Templatization",
//                         "Format Customization",
//                         "Version control",
//                       ].map((item) => (
//                         <div
//                           key={item}
//                           className="items-top flex space-x-2 mt-2"
//                         >
//                           <Input
//                             name="ContractCreationAndAuthoring"
//                             type="checkbox"
//                             value={item}
//                             checked={formValues.ContractCreationAndAuthoring.includes(
//                               item
//                             )}
//                             onChange={handleChange}
//                             className="w-5 h-5"
//                           />
//                           <div className="grid gap-1.5 leading-none">
//                             <label className="text-sm font-medium leading-none">
//                               {item}
//                             </label>
//                           </div>
//                         </div>
//                       ))}
//                     </div>

//                     <div className="mt-2">
//                       <Label htmlFor="">Contract Repository</Label>
//                       {[
//                         "Document Storage",
//                         "Multiple file formats",
//                         "Categorization and Retrieval",
//                       ].map((item) => (
//                         <div
//                           key={item}
//                           className="items-top flex space-x-2 mt-2"
//                         >
//                           <Input
//                             name="ContractRepository"
//                             type="checkbox"
//                             value={item}
//                             checked={formValues.ContractRepository.includes(
//                               item
//                             )}
//                             onChange={handleChange}
//                             className="w-5 h-5"
//                           />
//                           <div className="grid gap-1.5 leading-none">
//                             <label className="text-sm font-medium leading-none">
//                               {item}
//                             </label>
//                           </div>
//                         </div>
//                       ))}
//                     </div>

//                     <div className="mt-2">
//                       <Label htmlFor="">Contract Negotiation</Label>
//                       {[
//                         "Collaboration workspace",
//                         "Comments and Annotations",
//                         "Messaging and Emailing",
//                       ].map((item) => (
//                         <div
//                           key={item}
//                           className="items-top flex space-x-2 mt-2"
//                         >
//                           <Input
//                             name="ContractNegotiation"
//                             type="checkbox"
//                             value={item}
//                             checked={formValues.ContractNegotiation.includes(
//                               item
//                             )}
//                             onChange={handleChange}
//                             className="w-5 h-5"
//                           />
//                           <div className="grid gap-1.5 leading-none">
//                             <label className="text-sm font-medium leading-none">
//                               {item}
//                             </label>
//                           </div>
//                         </div>
//                       ))}
//                     </div>

//                     <div className="mt-2">
//                       <Label htmlFor="">Lifecycle Management</Label>
//                       {[
//                         "Approval Management",
//                         "Milestone tracking",
//                         "Obligation tracking",
//                         "Calendar Alerts",
//                       ].map((item) => (
//                         <div
//                           key={item}
//                           className="items-top flex space-x-2 mt-2"
//                         >
//                           <Input
//                             name="LifecycleManagement"
//                             type="checkbox"
//                             value={item}
//                             checked={formValues.LifecycleManagement.includes(
//                               item
//                             )}
//                             onChange={handleChange}
//                             className="w-5 h-5"
//                           />
//                           <div className="grid gap-1.5 leading-none">
//                             <label className="text-sm font-medium leading-none">
//                               {item}
//                             </label>
//                           </div>
//                         </div>
//                       ))}
//                     </div>

//                     <div className="mt-2">
//                       <Label htmlFor="">Clause Library</Label>
//                       {[
//                         "Clause Library",
//                         "Text editor",
//                         "Clause review and approval",
//                         "Version control for clauses",
//                       ].map((item) => (
//                         <div
//                           key={item}
//                           className="items-top flex space-x-2 mt-2"
//                         >
//                           <Input
//                             name="ClauseLibrary"
//                             type="checkbox"
//                             value={item}
//                             checked={formValues.ClauseLibrary.includes(item)}
//                             onChange={handleChange}
//                             className="w-5 h-5"
//                           />
//                           <div className="grid gap-1.5 leading-none">
//                             <label className="text-sm font-medium leading-none">
//                               {item}
//                             </label>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {formValues.category.includes("E-Signature") && (
//                   <div>
//                     <div className="mt-2">
//                       <Label htmlFor="">Fields Creation</Label>
//                       {[
//                         "Signature fields",
//                         "Multiple signature styles",
//                         "Data fields",
//                         "Customization and labelling",
//                       ].map((item) => (
//                         <div
//                           key={item}
//                           className="items-top flex space-x-2 mt-2"
//                         >
//                           <Input
//                             name="FieldsCreation"
//                             type="checkbox"
//                             value={item}
//                             checked={formValues.FieldsCreation.includes(item)}
//                             onChange={handleChange}
//                             className="w-5 h-5"
//                           />
//                           <div className="grid gap-1.5 leading-none">
//                             <label className="text-sm font-medium leading-none">
//                               {item}
//                             </label>
//                           </div>
//                         </div>
//                       ))}
//                     </div>

//                     <div className="mt-2">
//                       <Label htmlFor="">Tracking and Validity</Label>
//                       {[
//                         "Legal validity",
//                         "Audit trail",
//                         "Document recording and retention",
//                       ].map((item) => (
//                         <div
//                           key={item}
//                           className="items-top flex space-x-2 mt-2"
//                         >
//                           <Input
//                             name="TrackingAndValidity"
//                             type="checkbox"
//                             value={item}
//                             checked={formValues.TrackingAndValidity.includes(
//                               item
//                             )}
//                             onChange={handleChange}
//                             className="w-5 h-5"
//                           />
//                           <div className="grid gap-1.5 leading-none">
//                             <label className="text-sm font-medium leading-none">
//                               {item}
//                             </label>
//                           </div>
//                         </div>
//                       ))}
//                     </div>

//                     <div className="mt-2">
//                       <Label htmlFor="">
//                         Document Management and Templates
//                       </Label>
//                       {[
//                         "Document creation",
//                         "Version control",
//                         "Granular permission for collaborators",
//                       ].map((item) => (
//                         <div
//                           key={item}
//                           className="items-top flex space-x-2 mt-2"
//                         >
//                           <Input
//                             name="DocumentManagementAndTemplates"
//                             type="checkbox"
//                             value={item}
//                             checked={formValues.DocumentManagementAndTemplates.includes(
//                               item
//                             )}
//                             onChange={handleChange}
//                             className="w-5 h-5"
//                           />
//                           <div className="grid gap-1.5 leading-none">
//                             <label className="text-sm font-medium leading-none">
//                               {item}
//                             </label>
//                           </div>
//                         </div>
//                       ))}
//                     </div>

//                     <div className="mt-2">
//                       <Label htmlFor="">Document Capturing</Label>
//                       {[
//                         "Document uploads",
//                         "Multiple file supports",
//                         "OCR",
//                       ].map((item) => (
//                         <div
//                           key={item}
//                           className="items-top flex space-x-2 mt-2"
//                         >
//                           <Input
//                             name="DocumentCapturing"
//                             type="checkbox"
//                             value={item}
//                             checked={formValues.DocumentCapturing.includes(
//                               item
//                             )}
//                             onChange={handleChange}
//                             className="w-5 h-5"
//                           />
//                           <div className="grid gap-1.5 leading-none">
//                             <label className="text-sm font-medium leading-none">
//                               {item}
//                             </label>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {formValues.category.includes(
//                   "Document Management System"
//                 ) && (
//                   <div>
//                     <div className="mt-2">
//                       <Label htmlFor="">Document Creation and Templates</Label>
//                       {[
//                         "Document creation",
//                         "Text editor",
//                         "Document Templatization",
//                         "Central repository",
//                         "Co-authoring features",
//                       ].map((item) => (
//                         <div
//                           key={item}
//                           className="items-top flex space-x-2 mt-2"
//                         >
//                           <Input
//                             name="DocumentCreationAndTemplates"
//                             type="checkbox"
//                             value={item}
//                             checked={formValues.DocumentManagementAndTemplates.includes(
//                               item
//                             )}
//                             onChange={handleChange}
//                             className="w-5 h-5"
//                           />
//                           <div className="grid gap-1.5 leading-none">
//                             <label className="text-sm font-medium leading-none">
//                               {item}
//                             </label>
//                           </div>
//                         </div>
//                       ))}
//                     </div>

//                     <div className="mt-2">
//                       <Label htmlFor="">Document Search and Navigation</Label>
//                       {[
//                         "Categorizing and tagging",
//                         "Search capabilities",
//                         "Filter and sorting",
//                       ].map((item) => (
//                         <div
//                           key={item}
//                           className="items-top flex space-x-2 mt-2"
//                         >
//                           <Input
//                             name="DocumentSearchAndNavigation"
//                             type="checkbox"
//                             value={item}
//                             checked={formValues.DocumentSearchAndNavigation.includes(
//                               item
//                             )}
//                             onChange={handleChange}
//                             className="w-5 h-5"
//                           />
//                           <div className="grid gap-1.5 leading-none">
//                             <label className="text-sm font-medium leading-none">
//                               {item}
//                             </label>
//                           </div>
//                         </div>
//                       ))}
//                     </div>

//                     <div className="mt-2">
//                       <Label htmlFor="">Authencation</Label>
//                       {[
//                         "MFA (Multi factor Authentication)",
//                         "Electronic signature capabilities.",
//                       ].map((item) => (
//                         <div
//                           key={item}
//                           className="items-top flex space-x-2 mt-2"
//                         >
//                           <Input
//                             name="Authentication"
//                             type="checkbox"
//                             value={item}
//                             checked={formValues.Authentication.includes(item)}
//                             onChange={handleChange}
//                             className="w-5 h-5"
//                           />
//                           <div className="grid gap-1.5 leading-none">
//                             <label className="text-sm font-medium leading-none">
//                               {item}
//                             </label>
//                           </div>
//                         </div>
//                       ))}
//                     </div>

//                     <div className="mt-2">
//                       <Label htmlFor="">Task allotment</Label>
//                       {[
//                         "Customizable workflows",
//                         "Internal work delegation",
//                         "Task tracking",
//                       ].map((item) => (
//                         <div
//                           key={item}
//                           className="items-top flex space-x-2 mt-2"
//                         >
//                           <Input
//                             name="TaskAllotment"
//                             type="checkbox"
//                             value={item}
//                             checked={formValues.TaskAllotment.includes(item)}
//                             onChange={handleChange}
//                             className="w-5 h-5"
//                           />
//                           <div className="grid gap-1.5 leading-none">
//                             <label className="text-sm font-medium leading-none">
//                               {item}
//                             </label>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//                 {formValues.category.includes("E-billing and Invoicing") && (
//                   <div>
//                     <div className="mt-2">
//                       <Label htmlFor="">
//                         Budgeting, Expense and Time Tracking
//                       </Label>
//                       {[
//                         "Budget management",
//                         "Time tracking",
//                         "Multiple fee arrangements",
//                         "Approval management",
//                       ].map((item) => (
//                         <div
//                           key={item}
//                           className="items-top flex space-x-2 mt-2"
//                         >
//                           <Input
//                             name="BudgetingExpenseAndTimeTracking"
//                             type="checkbox"
//                             value={item}
//                             checked={formValues.BudgetingExpenseAndTimeTracking.includes(
//                               item
//                             )}
//                             onChange={handleChange}
//                             className="w-5 h-5"
//                           />
//                           <div className="grid gap-1.5 leading-none">
//                             <label className="text-sm font-medium leading-none">
//                               {item}
//                             </label>
//                           </div>
//                         </div>
//                       ))}
//                     </div>

//                     <div className="mt-2">
//                       <Label htmlFor="">Client Management</Label>
//                       {[
//                         "Central client repository",
//                         "Client communications",
//                         "Billing schedules",
//                         "Payment processing",
//                       ].map((item) => (
//                         <div
//                           key={item}
//                           className="items-top flex space-x-2 mt-2"
//                         >
//                           <Input
//                             name="ClientManagement"
//                             type="checkbox"
//                             value={item}
//                             checked={formValues.ClientManagement.includes(item)}
//                             onChange={handleChange}
//                             className="w-5 h-5"
//                           />
//                           <div className="grid gap-1.5 leading-none">
//                             <label className="text-sm font-medium leading-none">
//                               {item}
//                             </label>
//                           </div>
//                         </div>
//                       ))}
//                     </div>

//                     <div className="mt-2">
//                       <Label htmlFor="">Invoice Generation and Review</Label>
//                       {[
//                         "Customizable invoice templates",
//                         "Automated invoice generation",
//                         "Multiple currencies",
//                         "Tax entries and calculations",
//                         "Payment tracking and recording",
//                       ].map((item) => (
//                         <div
//                           key={item}
//                           className="items-top flex space-x-2 mt-2"
//                         >
//                           <Input
//                             name="InvoiceGenerationAndReview"
//                             type="checkbox"
//                             value={item}
//                             checked={formValues.InvoiceGenerationAndReview.includes(
//                               item
//                             )}
//                             onChange={handleChange}
//                             className="w-5 h-5"
//                           />
//                           <div className="grid gap-1.5 leading-none">
//                             <label className="text-sm font-medium leading-none">
//                               {item}
//                             </label>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {formValues.category.includes("E-discovery") && (
//                   <div>
//                     <div className="mt-2">
//                       <Label htmlFor="">
//                         Data Identification and Collection
//                       </Label>
//                       {[
//                         "Data source identification",
//                         "Remote Collection",
//                         "Network-based collection",
//                         "Forensic imaging",
//                         "Custodian self-collection",
//                         "Validation mechanisms",
//                       ].map((item) => (
//                         <div
//                           key={item}
//                           className="items-top flex space-x-2 mt-2"
//                         >
//                           <Input
//                             name="DataIdentificationAndCollection"
//                             type="checkbox"
//                             value={item}
//                             checked={formValues.DataIdentificationAndCollection.includes(
//                               item
//                             )}
//                             onChange={handleChange}
//                             className="w-5 h-5"
//                           />
//                           <div className="grid gap-1.5 leading-none">
//                             <label className="text-sm font-medium leading-none">
//                               {item}
//                             </label>
//                           </div>
//                         </div>
//                       ))}
//                     </div>

//                     <div className="mt-2">
//                       <Label htmlFor="">Search, Processing and Analysis</Label>
//                       {[
//                         "Search functionality",
//                         "Filter and sorting",
//                         "Duplicity elimination",
//                         "Data processing",
//                         "Cluster similar documents",
//                       ].map((item) => (
//                         <div
//                           key={item}
//                           className="items-top flex space-x-2 mt-2"
//                         >
//                           <Input
//                             name="SearchProcessingAndAnalysis"
//                             type="checkbox"
//                             value={item}
//                             checked={formValues.SearchProcessingAndAnalysis.includes(
//                               item
//                             )}
//                             onChange={handleChange}
//                             className="w-5 h-5"
//                           />
//                           <div className="grid gap-1.5 leading-none">
//                             <label className="text-sm font-medium leading-none">
//                               {item}
//                             </label>
//                           </div>
//                         </div>
//                       ))}
//                     </div>

//                     <div className="mt-2">
//                       <Label htmlFor="">Review and Production</Label>
//                       {[
//                         "Review and Analysis",
//                         "Coding and annotations",
//                         "Process control",
//                         "Review workflow",
//                         "Audit trail",
//                       ].map((item) => (
//                         <div
//                           key={item}
//                           className="items-top flex space-x-2 mt-2"
//                         >
//                           <Input
//                             name="ReviewAndProduction"
//                             type="checkbox"
//                             value={item}
//                             checked={formValues.ReviewAndProduction.includes(
//                               item
//                             )}
//                             onChange={handleChange}
//                             className="w-5 h-5"
//                           />
//                           <div className="grid gap-1.5 leading-none">
//                             <label className="text-sm font-medium leading-none">
//                               {item}
//                             </label>
//                           </div>
//                         </div>
//                       ))}
//                     </div>

//                     <div className="mt-2">
//                       <Label htmlFor="">Legal Hold Management</Label>
//                       {[
//                         "Legal hold tracking",
//                         "Legal hold notice management",
//                         "Receipt Acknowledgement",
//                         "Data custodian Management",
//                       ].map((item) => (
//                         <div
//                           key={item}
//                           className="items-top flex space-x-2 mt-2"
//                         >
//                           <Input
//                             name="LegalHoldManagement"
//                             type="checkbox"
//                             value={item}
//                             checked={formValues.LegalHoldManagement.includes(
//                               item
//                             )}
//                             onChange={handleChange}
//                             className="w-5 h-5"
//                           />
//                           <div className="grid gap-1.5 leading-none">
//                             <label className="text-sm font-medium leading-none">
//                               {item}
//                             </label>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {formValues.category.includes(
//                   "Intellectual Property Management"
//                 ) && (
//                   <div>
//                     <div className="mt-2">
//                       <Label htmlFor="">Ideation and Creation</Label>
//                       {[
//                         "Idea intake and management",
//                         "Innovation workflow management",
//                       ].map((item) => (
//                         <div
//                           key={item}
//                           className="items-top flex space-x-2 mt-2"
//                         >
//                           <Input
//                             name="IdeationAndCreation"
//                             type="checkbox"
//                             value={item}
//                             checked={formValues.IdeationAndCreation.includes(
//                               item
//                             )}
//                             onChange={handleChange}
//                             className="w-5 h-5"
//                           />
//                           <div className="grid gap-1.5 leading-none">
//                             <label className="text-sm font-medium leading-none">
//                               {item}
//                             </label>
//                           </div>
//                         </div>
//                       ))}
//                     </div>

//                     <div className="mt-2">
//                       <Label htmlFor="">Lifecycle Management</Label>
//                       {[
//                         "Workflow management system (IP lifecycle)",
//                         "Renewal management",
//                         "Management of licensing agreements, contracts",
//                       ].map((item) => (
//                         <div
//                           key={item}
//                           className="items-top flex space-x-2 mt-2"
//                         >
//                           <Input
//                             name="LifecycleManagement"
//                             type="checkbox"
//                             value={item}
//                             checked={formValues.LifecycleManagement.includes(
//                               item
//                             )}
//                             onChange={handleChange}
//                             className="w-5 h-5"
//                           />
//                           <div className="grid gap-1.5 leading-none">
//                             <label className="text-sm font-medium leading-none">
//                               {item}
//                             </label>
//                           </div>
//                         </div>
//                       ))}
//                     </div>

//                     <div className="mt-2">
//                       <Label htmlFor="">Search and Discovery</Label>
//                       {[
//                         "Database integration",
//                         "Advanced search capabilities",
//                         "Filter and sorting",
//                       ].map((item) => (
//                         <div
//                           key={item}
//                           className="items-top flex space-x-2 mt-2"
//                         >
//                           <Input
//                             name="SearchAndDiscovery"
//                             type="checkbox"
//                             value={item}
//                             checked={formValues.SearchAndDiscovery.includes(
//                               item
//                             )}
//                             onChange={handleChange}
//                             className="w-5 h-5"
//                           />
//                           <div className="grid gap-1.5 leading-none">
//                             <label className="text-sm font-medium leading-none">
//                               {item}
//                             </label>
//                           </div>
//                         </div>
//                       ))}
//                     </div>

//                     <div className="mt-2">
//                       <Label htmlFor="">Storage and Repository</Label>
//                       {[
//                         "Centralized repository",
//                         "Categorization and tagging",
//                         "Accessibility control",
//                         "Access audit",
//                       ].map((item) => (
//                         <div
//                           key={item}
//                           className="items-top flex space-x-2 mt-2"
//                         >
//                           <Input
//                             name="StorageAndRepository"
//                             type="checkbox"
//                             value={item}
//                             checked={formValues.StorageAndRepository.includes(
//                               item
//                             )}
//                             onChange={handleChange}
//                             className="w-5 h-5"
//                           />
//                           <div className="grid gap-1.5 leading-none">
//                             <label className="text-sm font-medium leading-none">
//                               {item}
//                             </label>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {formValues.category.includes(
//                   "Litigation Management and Analytics"
//                 ) && (
//                   <div>
//                     <div className="mt-2">
//                       <Label htmlFor="">Matter Lifecycle Tracking</Label>
//                       {["Task management", "Document organisation"].map(
//                         (item) => (
//                           <div
//                             key={item}
//                             className="items-top flex space-x-2 mt-2"
//                           >
//                             <Input
//                               name="MatterLifecycleTracking"
//                               type="checkbox"
//                               value={item}
//                               checked={formValues.MatterLifecycleTracking.includes(
//                                 item
//                               )}
//                               onChange={handleChange}
//                               className="w-5 h-5"
//                             />
//                             <div className="grid gap-1.5 leading-none">
//                               <label className="text-sm font-medium leading-none">
//                                 {item}
//                               </label>
//                             </div>
//                           </div>
//                         )
//                       )}
//                     </div>

//                     <div className="mt-2">
//                       <Label htmlFor="">Court and Case Search</Label>
//                       {[
//                         "Automated case alerts",
//                         "Court docket systems",
//                         "Real-time updates",
//                       ].map((item) => (
//                         <div
//                           key={item}
//                           className="items-top flex space-x-2 mt-2"
//                         >
//                           <Input
//                             name="CourtAndCaseSearch"
//                             type="checkbox"
//                             value={item}
//                             checked={formValues.CourtAndCaseSearch.includes(
//                               item
//                             )}
//                             onChange={handleChange}
//                             className="w-5 h-5"
//                           />
//                           <div className="grid gap-1.5 leading-none">
//                             <label className="text-sm font-medium leading-none">
//                               {item}
//                             </label>
//                           </div>
//                         </div>
//                       ))}
//                     </div>

//                     <div className="mt-2">
//                       <Label htmlFor="">
//                         Budget, Expense and Time Tracking
//                       </Label>
//                       {[
//                         "Budget Management",
//                         "Time tracking",
//                         "Approval Management",
//                         "Client invoicing",
//                         "Payment processing",
//                       ].map((item) => (
//                         <div
//                           key={item}
//                           className="items-top flex space-x-2 mt-2"
//                         >
//                           <Input
//                             name="BudgetExpenseAndTimeTracking"
//                             type="checkbox"
//                             value={item}
//                             checked={formValues.BudgetExpenseAndTimeTracking.includes(
//                               item
//                             )}
//                             onChange={handleChange}
//                             className="w-5 h-5"
//                           />
//                           <div className="grid gap-1.5 leading-none">
//                             <label className="text-sm font-medium leading-none">
//                               {item}
//                             </label>
//                           </div>
//                         </div>
//                       ))}
//                     </div>

//                     <div className="mt-2">
//                       <Label htmlFor="">Litigation Docketing Features</Label>
//                       {[
//                         "Collaborative timeline tracking",
//                         "Court Rule tracking",
//                         "Court database integration",
//                         "Customized docket entries",
//                       ].map((item) => (
//                         <div
//                           key={item}
//                           className="items-top flex space-x-2 mt-2"
//                         >
//                           <Input
//                             name="LitigationDocketingFeatures"
//                             type="checkbox"
//                             value={item}
//                             checked={formValues.LitigationDocketingFeatures.includes(
//                               item
//                             )}
//                             onChange={handleChange}
//                             className="w-5 h-5"
//                           />
//                           <div className="grid gap-1.5 leading-none">
//                             <label className="text-sm font-medium leading-none">
//                               {item}
//                             </label>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {formValues.category.includes("Legal Workflow Automation") && (
//                   <div></div>
//                 )}

//                 <div className="mt-4 flex flex-col md:flex-row items-center gap-4">
//                   <Button
//                     type="submit"
//                     className="bg-primary1"
//                     disabled={loading}
//                   >
//                     {loading ? "Saving" : "Save & Continue"}
//                   </Button>

//                   <Button disabled type="submit" className="bg-primary1">
//                     Submit for Review
//                   </Button>
//                 </div>
//               </form>
//             </>
//           )}
//           <h2 className="text-gray-900 text-xl font-bold flex gap-2 items-center mt-4">
//             <span className="border rounded-full border-primary1 p-1 text-2xl">
//               <IoIosInformation />
//             </span>
//             Pricing
//           </h2>
//           {step === 6 && (
//             <>
//               <form onSubmit={temp1} className="flex flex-col gap-4">
//                 {/* Free Trial select */}
//                 <div className="flex gap-2 items-center mt-2">
//                   <div>
//                     <Label htmlFor="mobileAccessibility">
//                       Select Free trial
//                     </Label>
//                     <Select
//                       value={formValues.freeTrial}
//                       onValueChange={(value) =>
//                         setFormValues((prevValues) => ({
//                           ...prevValues,
//                           freeTrial: value,
//                         }))
//                       }
//                     >
//                       <SelectTrigger className="w-full">
//                         <SelectValue placeholder="Free Trial" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="yes">Yes</SelectItem>
//                         <SelectItem value="no">No</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                   <div>
//                     <Label htmlFor="adoptionPeriod">Adoption period</Label>
//                     <div className="flex gap-4">
//                       <Input
//                         name="timePeriod"
//                         type="text"
//                         placeholder="Time period"
//                         value={formValues.timePeriod}
//                         onChange={handleChange}
//                         required
//                       />
//                       <Select
//                         value={formValues.timePeriodUnit}
//                         onValueChange={(value) =>
//                           setFormValues((prevValues) => ({
//                             ...prevValues,
//                             timePeriodUnit: value,
//                           }))
//                         }
//                       >
//                         <SelectTrigger className="w-full">
//                           <SelectValue placeholder="Period" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="days">Days</SelectItem>
//                           <SelectItem value="months">Months</SelectItem>
//                           <SelectItem value="years">Years</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="mt-2">
//                   <Label htmlFor="mobileAccessibility">Free version</Label>
//                   <Select
//                     value={formValues.freeVersion}
//                     onValueChange={(value) =>
//                       setFormValues((prevValues) => ({
//                         ...prevValues,
//                         freeVersion: value,
//                       }))
//                     }
//                   >
//                     <SelectTrigger className="w-full">
//                       <SelectValue placeholder="Free Version" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="yes">Yes</SelectItem>
//                       <SelectItem value="no">No</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//                 <div className="mt-2">
//                   <Label htmlFor="">Pricing Model</Label>
//                   {["Annual Fee", "Monthly subscription", "Volume based"].map(
//                     (item) => (
//                       <div key={item} className="items-top flex space-x-2 mt-2">
//                         <Input
//                           name="pricingModel"
//                           type="checkbox"
//                           value={item}
//                           checked={formValues.pricingModel.includes(item)}
//                           onChange={handleChange}
//                           className="w-5 h-5"
//                         />
//                         <div className="grid gap-1.5 leading-none">
//                           <label className="text-sm font-medium leading-none">
//                             {item}
//                           </label>
//                         </div>
//                       </div>
//                     )
//                   )}
//                 </div>

//                 <div className="mt-2">
//                   <Label htmlFor="mobileAccessibility">Fixed Pricing</Label>
//                   <Select
//                     value={formValues.fixedPricing}
//                     onValueChange={(value) =>
//                       setFormValues((prevValues) => ({
//                         ...prevValues,
//                         fixedPricing: value,
//                       }))
//                     }
//                   >
//                     <SelectTrigger className="w-full">
//                       <SelectValue placeholder="Fixed price" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="yes">Yes</SelectItem>
//                       <SelectItem value="no">No</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//                 <div className=" mt-2">
//                   <Label htmlFor="contractPeriod">
//                     Minimum Contract Period
//                   </Label>

//                   <Input
//                     name="contractPeriod"
//                     type="text"
//                     placeholder="Time period"
//                     value={formValues.contractPeriod}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 {formValues.fixedPricing === "yes" && (
//                   <div>
//                     {[...Array(numPricings)].map((_, index) => (
//                       <div key={index}>
//                         <h2>Pricing {index + 1}</h2>
//                         <div className="flex gap-2 items-center">
//                           <Input
//                             name={`nameofPlan${index + 1}`}
//                             type="text"
//                             placeholder="Name of plan"
//                             //  @ts-ignore ts(7053)
//                             value={formValues[`nameofPlan${index + 1}`]}
//                             onChange={handleChange}
//                             required
//                           />

//                           <Input
//                             name={`validity${index + 1}`}
//                             type="text"
//                             placeholder="Validity in days , month"
//                             //  @ts-ignore ts(7053)
//                             value={formValues[`validity${index + 1}`]}
//                             onChange={handleChange}
//                             required
//                           />

//                           <Input
//                             name={`price${index + 1}`}
//                             type="text"
//                             placeholder="Price"
//                             //  @ts-ignore ts(7053)
//                             value={formValues[`price${index + 1}`]}
//                             onChange={handleChange}
//                             required
//                           />
//                         </div>
//                       </div>
//                     ))}
//                     {numPricings < 3 && (
//                       <Button
//                         className="bg-primary1 mt-2"
//                         onClick={handleAddNew}
//                       >
//                         Add New
//                       </Button>
//                     )}
//                   </div>
//                 )}

//                 <div className="mt-2">
//                   <Label htmlFor="category">Select Category</Label>
//                   {[
//                     "Parameter 1",
//                     "Parameter 2",
//                     "Parameter 3",
//                     "Parameter 4",
//                   ].map((category) => (
//                     <div
//                       key={category}
//                       className="items-top flex space-x-2 mt-2"
//                     >
//                       <Input
//                         name="pricingParams"
//                         type="checkbox"
//                         value={category}
//                         checked={formValues.pricingParams.includes(category)}
//                         onChange={handleChange}
//                         className="w-5 h-5"
//                       />
//                       <div className="grid gap-1.5 leading-none">
//                         <label className="text-sm font-medium leading-none">
//                           {category}
//                         </label>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//                 <div className="mt-4 flex flex-col md:flex-row items-center gap-4">
//                   <Button
//                     type="submit"
//                     className="bg-primary1"
//                     disabled={loading}
//                   >
//                     {loading ? "Saving" : "Save & Continue"}
//                   </Button>

//                   <Button disabled type="submit" className="bg-primary1">
//                     Submit for Review
//                   </Button>
//                 </div>
//               </form>
//             </>
//           )}

//           <h2 className="text-gray-900 text-xl font-bold flex gap-2 items-center mt-4">
//             <span className="border rounded-full border-primary1 p-1 text-2xl">
//               <IoIosInformation />
//             </span>
//             Service and Support
//           </h2>

//           {step === 7 && (
//             <>
//               <form onSubmit={temp1} className="flex flex-col gap-4">
//                 <div className="mt-2">
//                   <Label htmlFor="">Demo</Label>
//                   {[
//                     "Self-demo",
//                     "Customised prototypes",
//                     "Guided walkthrough",
//                     "Video demos",
//                     "None",
//                   ].map((item) => (
//                     <div key={item} className="items-top flex space-x-2 mt-2">
//                       <Input
//                         name="Demo"
//                         type="checkbox"
//                         value={item}
//                         checked={formValues.Demo.includes(item)}
//                         onChange={handleChange}
//                         className="w-5 h-5"
//                       />
//                       <div className="grid gap-1.5 leading-none">
//                         <label className="text-sm font-medium leading-none">
//                           {item}
//                         </label>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//                 <Textarea
//                   name="DemoNote"
//                   placeholder="Addtional Note optional"
//                   value={formValues.DemoNote}
//                   onChange={handleChange}
//                 ></Textarea>
//                 <div className="mt-2">
//                   <Label htmlFor="">Support</Label>
//                   {[
//                     "Phone",
//                     "Live chat",
//                     "Bot chat",
//                     "Community forum",
//                     "Dedicated account manager",
//                     "Help ticket",
//                     "None",
//                   ].map((item) => (
//                     <div key={item} className="items-top flex space-x-2 mt-2">
//                       <Input
//                         name="support"
//                         type="checkbox"
//                         value={item}
//                         checked={formValues.support.includes(item)}
//                         onChange={handleChange}
//                         className="w-5 h-5"
//                       />
//                       <div className="grid gap-1.5 leading-none">
//                         <label className="text-sm font-medium leading-none">
//                           {item}
//                         </label>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 <Textarea
//                   name="supportNote"
//                   placeholder="Support Note optional"
//                   value={formValues.supportNote}
//                   onChange={handleChange}
//                 ></Textarea>

//                 <div className="mt-2">
//                   <Label htmlFor="">Training</Label>
//                   {[
//                     "Video Tutorials",
//                     "User Manuals",
//                     "On-demand Training",
//                     "Certification program",
//                     "None",
//                   ].map((item) => (
//                     <div key={item} className="items-top flex space-x-2 mt-2">
//                       <Input
//                         name="training"
//                         type="checkbox"
//                         value={item}
//                         checked={formValues.training.includes(item)}
//                         onChange={handleChange}
//                         className="w-5 h-5"
//                       />
//                       <div className="grid gap-1.5 leading-none">
//                         <label className="text-sm font-medium leading-none">
//                           {item}
//                         </label>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//                 <Textarea
//                   name="trainingNote"
//                   placeholder="Training Note optional"
//                   value={formValues.trainingNote}
//                   onChange={handleChange}
//                 ></Textarea>

//                 <div>
//                   <Label htmlFor="storage">Storage</Label>
//                   <div className="flex gap-4">
//                     <Input
//                       name="storage"
//                       type="text"
//                       placeholder="Storage"
//                       value={formValues.storage}
//                       onChange={handleChange}
//                       required
//                     />
//                     <Select
//                       value={formValues.storageUnit}
//                       onValueChange={(value) =>
//                         setFormValues((prevValues) => ({
//                           ...prevValues,
//                           storageUnit: value,
//                         }))
//                       }
//                     >
//                       <SelectTrigger className="w-full">
//                         <SelectValue placeholder="Storage Unit" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="days">KB</SelectItem>
//                         <SelectItem value="months">MB</SelectItem>
//                         <SelectItem value="years">GB</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 </div>
//                 <Textarea
//                   name="storageNote"
//                   placeholder="Storage Note optional"
//                   value={formValues.storageNote}
//                   onChange={handleChange}
//                 ></Textarea>

//                 <div>
//                   <Label htmlFor="v">File upload limit</Label>
//                   <div className="flex gap-4">
//                     <Input
//                       name="fileSize"
//                       type="text"
//                       placeholder="File size"
//                       value={formValues.fileSize}
//                       onChange={handleChange}
//                       required
//                     />
//                     <Select
//                       value={formValues.fileSizeUnit}
//                       onValueChange={(value) =>
//                         setFormValues((prevValues) => ({
//                           ...prevValues,
//                           fileSizeUnit: value,
//                         }))
//                       }
//                     >
//                       <SelectTrigger className="w-full">
//                         <SelectValue placeholder="Storage Unit" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="days">KB</SelectItem>
//                         <SelectItem value="months">MB</SelectItem>
//                         <SelectItem value="years">GB</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                   <Textarea
//                     name="fileSizeNote"
//                     placeholder="File size Note optional"
//                     value={formValues.fileSizeNote}
//                     onChange={handleChange}
//                   ></Textarea>
//                 </div>
//                 <div className="mt-4 flex flex-col md:flex-row items-center gap-4">
//                   <Button
//                     type="submit"
//                     className="bg-primary1"
//                     disabled={loading}
//                   >
//                     {loading ? "Saving" : "Save & Continue"}
//                   </Button>

//                   <Button disabled type="submit" className="bg-primary1">
//                     Submit for Review
//                   </Button>
//                 </div>
//               </form>
//             </>
//           )}

//           <h2 className="text-gray-900 text-xl font-bold flex gap-2 items-center mt-4">
//             <span className="border rounded-full border-primary1 p-1 text-2xl">
//               <IoIosInformation />
//             </span>
//             Post implementation service
//           </h2>

//           {step === 8 && (
//             <>
//               <form onSubmit={temp1} className="flex flex-col gap-4">
//                 <div>
//                   <h3>Maintaince</h3>
//                   <RadioGroup defaultValue="free">
//                     <div className="flex items-center space-x-2">
//                       <RadioGroupItem value="free" id="free" />
//                       <Label htmlFor="free">Free</Label>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <RadioGroupItem value="paid" id="paid" />
//                       <Label htmlFor="paid">Paid</Label>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <RadioGroupItem value="NA" id="option-two" />
//                       <Label htmlFor="NA">Not available</Label>
//                     </div>
//                   </RadioGroup>

//                   <Textarea
//                     name="maintenanceNote"
//                     placeholder="Maintaice Note optional"
//                     value={formValues.maintenanceNote}
//                     onChange={handleChange}
//                   ></Textarea>
//                 </div>

//                 <div>
//                   <h3>Request for change</h3>
//                   <RadioGroup defaultValue="free">
//                     <div className="flex items-center space-x-2">
//                       <RadioGroupItem value="available" id="available" />
//                       <Label htmlFor="available">Available</Label>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <RadioGroupItem
//                         value="not-available"
//                         id="not-available"
//                       />
//                       <Label htmlFor="not-available">Not available</Label>
//                     </div>
//                   </RadioGroup>

//                   <Textarea
//                     name="reqForChangeNote"
//                     placeholder="Request for change Note optional"
//                     value={formValues.reqForChangeNote}
//                     onChange={handleChange}
//                   ></Textarea>
//                 </div>

//                 <div>
//                   <h3>Training</h3>
//                   <RadioGroup defaultValue="free">
//                     <div className="flex items-center space-x-2">
//                       <RadioGroupItem value="free" id="free" />
//                       <Label htmlFor="free">Free</Label>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <RadioGroupItem value="paid" id="paid" />
//                       <Label htmlFor="paid">Paid</Label>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <RadioGroupItem
//                         value="not-available"
//                         id="not-available"
//                       />
//                       <Label htmlFor="not-available">Not available</Label>
//                     </div>
//                   </RadioGroup>

//                   <Textarea
//                     name="trainingReqNote"
//                     placeholder="Request for change Note optional"
//                     value={formValues.trainingReqNote}
//                     onChange={handleChange}
//                   ></Textarea>
//                 </div>

//                 <div>
//                   <h3>Data Migration</h3>
//                   <RadioGroup defaultValue="free">
//                     <div className="flex items-center space-x-2">
//                       <RadioGroupItem value="free" id="free" />
//                       <Label htmlFor="free">Free</Label>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <RadioGroupItem value="paid" id="paid" />
//                       <Label htmlFor="paid">Paid</Label>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <RadioGroupItem
//                         value="not-available"
//                         id="not-available"
//                       />
//                       <Label htmlFor="not-available">Not available</Label>
//                     </div>
//                   </RadioGroup>

//                   <Textarea
//                     name="dataMigrationNote"
//                     placeholder="Request for change Note optional"
//                     value={formValues.dataMigrationNote}
//                     onChange={handleChange}
//                   ></Textarea>
//                 </div>
//                 <div className="mt-4 flex flex-col md:flex-row items-center gap-4">
//                   <Button
//                     type="submit"
//                     className="bg-primary1"
//                     disabled={loading}
//                   >
//                     {loading ? "Saving" : "Save & Continue"}
//                   </Button>

//                   <Button disabled type="submit" className="bg-primary1">
//                     Submit for Review
//                   </Button>
//                 </div>
//               </form>
//             </>
//           )}

//           <h2 className="text-gray-900 text-xl font-bold flex gap-2 items-center mt-4">
//             <span className="border rounded-full border-primary1 p-1 text-2xl">
//               <IoIosInformation />
//             </span>
//             References
//           </h2>
//           {step === 9 && (
//             <form onSubmit={temp2} className="flex flex-col gap-4">
//               <div className=" mt-2">
//                 <Label>
//                   Images{" "}
//                   <span className="text-yellow-500 italic text-xs">upto 5</span>
//                 </Label>
//                 <Input
//                   type="file"
//                   name="images"
//                   multiple
//                   accept="image/*"
//                   onChange={handleFileChange}
//                   value={files.length > 0 ? "fakepath" : ""}
//                 ></Input>
//               </div>
//               <div>
//                 <Label>Video Url</Label>
//                 <Input
//                   name="videoUrl"
//                   type="text"
//                   placeholder="Enter video url Only Youtube/vimeo"
//                   value={formValues.videoUrl}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className=" mt-2">
//                 <Label>
//                   Attachment{" "}
//                   <span className="text-yellow-500 italic text-xs">upto 2</span>
//                 </Label>
//                 <Input
//                   type="file"
//                   name="attachments"
//                   multiple
//                   accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
//                   onChange={handleAttachmentChange}
//                   value={attachments.length > 0 ? "fakepath" : ""}
//                 ></Input>
//               </div>
//               <div>
//                 <Label>Instagram</Label>
//                 <Input
//                   name="instagramUrl"
//                   type="text"
//                   placeholder="Instagram Url"
//                   value={formValues.instagramUrl}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div>
//                 <Label>Linkedin</Label>
//                 <Input
//                   name="linkedinUrl"
//                   type="text"
//                   placeholder="Linkedin Url"
//                   value={formValues.linkedinUrl}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div>
//                 <Label>Twitter</Label>
//                 <Input
//                   name="twitterUrl"
//                   type="text"
//                   placeholder="Twitter  Url"
//                   value={formValues.twitterUrl}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div>
//                 <Label>Youtube </Label>
//                 <Input
//                   name="youtubeUrl"
//                   type="text"
//                   placeholder="Youtube Channel Url"
//                   value={formValues.youtubeUrl}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="mt-4 flex flex-col md:flex-row items-center gap-4">
//                 <Button
//                   type="submit"
//                   className="bg-primary1"
//                   disabled={loading}
//                 >
//                   {loading ? "Saving" : "Save & Continue"}
//                 </Button>

//                 <Button type="submit" className="bg-primary1">
//                   Submit for Review
//                 </Button>
//               </div>
//             </form>
//           )}
//         </div>
//       )}
//     </>
//   );
// }

// export default ProductInfo;
// s;

import React from "react";

function backup() {
  return <div></div>;
}

export default backup;
