// import React, { useState, useEffect } from 'react';
// import { X } from 'lucide-react';
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {z} from "zod"
// interface BookACallFormProps {
//   CustomerUserId?: string;
//   onClose: () => void;
//   vendorId: string;
//   productId: string;
// }

// interface FormData {
//   name: string;
//   designation: string;
//   organisationName: string;
//   organisationType: string;
//   teamSize: string;
//   contactEmail: string;
//   requirements: string;
//   scheduleDemo: boolean;
// }

// const organizationTypes = [
//   "Law firms",
//   "Enterprises",
//   "Individual Practitioners",
//   "Startups",
//   "Government Departments",
//   "Judiciary",
//   "In-House Counsels"
// ];

// const teamSizes = [
//   "1",
//   "2-20",
//   "21-50",
//   "51- 200",
//   "201-500",
//   "500+"
// ];


// const BookACallForm: React.FC<BookACallFormProps> = ({
//   CustomerUserId,
//   onClose,
//   vendorId,
//   productId,
// }) => {
//   const [formData, setFormData] = useState<FormData>({
//     name: "",
//     designation: "",
//     organisationName: "",
//     organisationType: "" ,
//     teamSize: "",
//     contactEmail: "",
//     requirements: "",
//     scheduleDemo: false,
//   });
//   const [loading, setLoading] = useState(!!CustomerUserId);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (!CustomerUserId) {
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/get-user?userId=${CustomerUserId}`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch user data");
//         }
//         const userData = await response.json();

//         if (userData.success) {
//           const { profile, account } = userData;
//           setFormData(prev => ({
//             ...prev,
//             designation: profile.Designation || "",
//             organisationName: profile.CompanyAddress || "",
//             organisationType: profile.CompanyType || "",
//             teamSize: profile.TeamSize || "",
//             contactEmail: account.email || "",
//           }));
//         } else {
//           throw new Error("Failed to fetch user data");
//         }
//       } catch (err) {
//         setError(err.message || "An error occurred while fetching user data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, [CustomerUserId]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSelectChange = (name: string) => (value: string) => {
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const submittedData = { ...formData, vendorId, productId };
    
//     console.log("Submitting data:", submittedData);
//     // Here you would typically send this data to your API
//     // await submitFormData(submittedData);
//     onClose();
//   };

//   if (loading) {
//     return <div>Loading user data...</div>;
//   }

//   return (
//     <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center p-4">
//       <Card className="w-full max-w-6xl">
//         <Button
//           variant="ghost"
//           className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
//           onClick={onClose}
//         >
//           <X className="h-5 w-5" />
//         </Button>
//         <div className="flex flex-col lg:flex-row">
//           {/* Left side content (remains the same) */}
//           <div className="lg:w-1/3 bg-blue-600 p-8 flex items-center justify-center rounded-t-lg lg:rounded-l-lg lg:rounded-t-none">
//             {/* ... (content remains the same) ... */}
//           </div>
          
//           {/* Right side form */}
//           <div className="lg:w-2/3 p-8">
//             <CardHeader>
//               <CardTitle className="text-xl lg:text-2xl">Contact Information</CardTitle>
//               <CardDescription>Please fill in your details to schedule a call with us.</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="name">Name</Label>
//                     <Input
//                       id="name"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       required
//                       className="w-full"
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="designation">Designation</Label>
//                     <Input
//                       id="designation"
//                       name="designation"
//                       value={formData.designation}
//                       onChange={handleChange}
//                       className="w-full"
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="organisationName">Organisation Name</Label>
//                     <Input
//                       id="organisationName"
//                       name="organisationName"
//                       value={formData.organisationName}
//                       onChange={handleChange}
//                       required
//                       className="w-full"
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="organisationType">Organisation Type</Label>
//                     <Select
//                       onValueChange={handleSelectChange("organisationType")}
//                       value={formData.organisationType}
//                     >
//                       <SelectTrigger className="w-full">
//                         <SelectValue placeholder="Select organization type" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {organizationTypes.map((type) => (
//                           <SelectItem key={type} value={type}>
//                             {type}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="teamSize">Team Size</Label>
//                     <Select
//                       onValueChange={handleSelectChange("teamSize")}
//                       value={formData.teamSize}
//                     >
//                       <SelectTrigger className="w-full">
//                         <SelectValue placeholder="Select team size" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {teamSizes.map((size) => (
//                           <SelectItem key={size} value={size}>
//                             {size}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="contactEmail">Contact Email</Label>
//                     <Input
//                       type="email"
//                       id="contactEmail"
//                       name="contactEmail"
//                       value={formData.contactEmail}
//                       onChange={handleChange}
//                       required
//                       className="w-full"
//                     />
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="requirements">Tell us briefly about your requirements</Label>
//                   <Textarea
//                     id="requirements"
//                     name="requirements"
//                     value={formData.requirements}
//                     onChange={handleChange}
//                     rows={3}
//                     required
//                     className="w-full"
//                   />
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Checkbox
//                     id="scheduleDemo"
//                     checked={formData.scheduleDemo}
//                     onCheckedChange={(checked) => 
//                       setFormData(prev => ({ ...prev, scheduleDemo: checked as boolean }))
//                     }
//                   />
//                   <Label htmlFor="scheduleDemo" className="text-sm text-gray-600">
//                     Would you like to schedule a demo?
//                   </Label>
//                 </div>
//                 {error && <div className="text-red-500">{error}</div>}
//                 <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
//                   Submit
//                 </Button>
//               </form>
//             </CardContent>
//           </div>
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default BookACallForm;

import React, { useState, useEffect, ChangeEvent } from 'react';
import { X } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";

interface BookACallFormProps {
  CustomerUserId?: string;
  onClose: () => void;
  vendorId: string;
  productId: string;
  vendorName: string;
  productName: string;
}

const organizationTypes = [
  "Law firms",
  "Enterprises",
  "Individual Practitioners",
  "Startups",
  "Government Departments",
  "Judiciary",
  "In-House Counsels"
] as const;

const teamSizes = [
  "1",
  "2-20",
  "21-50",
  "51- 200",
  "201-500",
  "500+"
] as const;

const BookACallFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  designation: z.string().min(2, "Designation must be at least 2 characters long"),
  organisationName: z.string().min(2, "Organisation name must be at least 2 characters long"),
  organisationType: z.enum(organizationTypes, {
    errorMap: () => ({ message: "Please select an organization type" }),
  }),
  teamSize: z.enum(teamSizes, {
    errorMap: () => ({ message: "Please select a team size" }),
  }),
  contactEmail: z.string().email("Invalid email address"),
  requirements: z.string().min(10, "Requirements must be at least 10 characters long"),
  scheduleDemo: z.boolean()
});

type FormData = z.infer<typeof BookACallFormSchema>;

const BookACallForm: React.FC<BookACallFormProps> = ({
  CustomerUserId,
  onClose,
  vendorId,
  productId,
  vendorName,
  productName,
}) => {
  const VendorName= vendorName;
  const ProductName = productName;
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [organisationName, setOrganisationName] = useState("");
  const [organisationType, setOrganisationType] = useState<(typeof organizationTypes)[number] | "">("");
  const [teamSize, setTeamSize] = useState<(typeof teamSizes)[number] | "">("");
  const [contactEmail, setContactEmail] = useState("");
  const [requirements, setRequirements] = useState("");
  const [scheduleDemo, setScheduleDemo] = useState(false);

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [loading, setLoading] = useState(!!CustomerUserId);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!CustomerUserId) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/get-user?userId=${CustomerUserId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();

        if (userData.success) {
          const { profile, account } = userData;
          setDesignation(profile.Designation || "");
          setOrganisationName(profile.CompanyAddress || "");
          setOrganisationType(profile.CompanyType || "");
          setTeamSize(profile.TeamSize || "");
          setContactEmail(account.email || "");
        } else {
          throw new Error("Failed to fetch user data");
        }
      } catch (err) {
        setApiError(err.message || "An error occurred while fetching user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [CustomerUserId]);

// useEffect(() => {
//   console.log("Vendor Name in useEffect:", vendorName);
//   console.log("Product Name in useEffect:", productName);
// }, [vendorName, productName]);

  const validateField = (field: keyof FormData, value: any): string => {
    try {
      BookACallFormSchema.shape[field].parse(value);
      return "";
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.errors[0]?.message || `Invalid ${field}`;
      }
      return `Invalid ${field}`;
    }
  };

  const handleChange = (value: string | boolean, field: keyof FormData) => {
    switch (field) {
      case "name":
        setName(value as string);
        break;
      case "designation":
        setDesignation(value as string);
        break;
      case "organisationName":
        setOrganisationName(value as string);
        break;
      case "organisationType":
        setOrganisationType(value as (typeof organizationTypes)[number]);
        break;
      case "teamSize":
        setTeamSize(value as (typeof teamSizes)[number]);
        break;
      case "contactEmail":
        setContactEmail(value as string);
        break;
      case "requirements":
        setRequirements(value as string);
        break;
      case "scheduleDemo":
        setScheduleDemo(value as boolean);
        break;
    }

    const errorMessage = validateField(field, value);
    setErrors(prev => ({ ...prev, [field]: errorMessage }));
  };

  const validateAllFields = (): boolean => {
    const formData: FormData = {
      name,
      designation,
      organisationName,
      organisationType: organisationType as (typeof organizationTypes)[number],
      teamSize: teamSize as (typeof teamSizes)[number],
      contactEmail,
      requirements,
      scheduleDemo
    };

    const newErrors: Partial<Record<keyof FormData, string>> = {};
    let isValid = true;

    (Object.keys(formData) as Array<keyof FormData>).forEach((field) => {
      const errorMessage = validateField(field, formData[field]);
      if (errorMessage) {
        newErrors[field] = errorMessage;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!validateAllFields()) {
      return; // Stop form submission if there are validation errors
    }
  
    toast({
      title: "Saving",
      description: "Submitting your booking...",
      variant: "info",
    });
  
    console.log("Submitting data:", {
      name,
      designation,
      organisationName,
      organisationType,
      teamSize,
      contactEmail,
      requirements,
      scheduleDemo,
      vendorId,
      productId,
      VendorName,
      ProductName,
    });
  
    try {
      const response = await fetch("/api/bookACall", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          designation,
          organisationName,
          organisationType,
          teamSize,
          contactEmail,
          requirements,
          scheduleDemo,
          vendorId,
          productId,
          vendorName: VendorName,
          productName: ProductName,
          // Removed bookingTime from submission since it's handled in the API
        }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        toast({
          title: "Success",
          description: "Booking created successfully!",
          variant: "success",
        });
  
        // Log and display the submitted data
        console.log("Booking response data:", data.booking);
        alert(`Booking created: ${JSON.stringify(data.booking, null, 2)}`);
  
        // Optionally close the form
        onClose();
      } else {
        setApiError(data.msg || "Failed to create booking.");
        toast({
          title: "Error",
          description: data.msg || "Failed to create booking.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      setApiError("An error occurred while submitting the form. Please try again.");
      toast({
        title: "Error",
        description: "An error occurred while submitting the booking.",
        variant: "destructive",
      });
    }
    onClose();
  };
  
  

  if (loading) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl">
        <Button
          variant="ghost"
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
        <div className="flex flex-col lg:flex-row">
          {/* Left side content (remains the same) */}
          <div className="lg:w-1/3 bg-blue-600 p-8 flex items-center justify-center rounded-t-lg lg:rounded-l-lg lg:rounded-t-none">
            {/* ... (content remains the same) ... */}
          </div>
          
          {/* Right side form */}
          <div className="lg:w-2/3 p-8">
            <CardHeader>
              <CardTitle className="text-xl lg:text-2xl">Contact Information</CardTitle>
              <CardDescription>Please fill in your details to schedule a call with us.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => handleChange(e.target.value, "name")}
                      required
                      className={`w-full ${errors.name ? 'border-red-500' : ''}`}
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="designation">Designation</Label>
                    <Input
                      id="designation"
                      value={designation}
                      onChange={(e) => handleChange(e.target.value, "designation")}
                      required
                      className={`w-full ${errors.designation ? 'border-red-500' : ''}`}
                    />
                    {errors.designation && <p className="text-red-500 text-sm">{errors.designation}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="organisationName">Organisation Name</Label>
                    <Input
                      id="organisationName"
                      value={organisationName}
                      onChange={(e) => handleChange(e.target.value, "organisationName")}
                      required
                      className={`w-full ${errors.organisationName ? 'border-red-500' : ''}`}
                    />
                    {errors.organisationName && <p className="text-red-500 text-sm">{errors.organisationName}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="organisationType">Organisation Type</Label>
                    <Select
                      onValueChange={(value) => handleChange(value, "organisationType")}
                      value={organisationType}
                    >
                      <SelectTrigger className={`w-full ${errors.organisationType ? 'border-red-500' : ''}`}>
                        <SelectValue placeholder="Select organization type" />
                      </SelectTrigger>
                      <SelectContent>
                        {organizationTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.organisationType && <p className="text-red-500 text-sm">{errors.organisationType}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="teamSize">Team Size</Label>
                    <Select
                      onValueChange={(value) => handleChange(value, "teamSize")}
                      value={teamSize}
                    >
                      <SelectTrigger className={`w-full ${errors.teamSize ? 'border-red-500' : ''}`}>
                        <SelectValue placeholder="Select team size" />
                      </SelectTrigger>
                      <SelectContent>
                        {teamSizes.map((size) => (
                          <SelectItem key={size} value={size}>
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.teamSize && <p className="text-red-500 text-sm">{errors.teamSize}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Contact Email</Label>
                    <Input
                      type="email"
                      id="contactEmail"
                      value={contactEmail}
                      onChange={(e) => handleChange(e.target.value, "contactEmail")}
                      required
                      className={`w-full ${errors.contactEmail ? 'border-red-500' : ''}`}
                    />
                    {errors.contactEmail && <p className="text-red-500 text-sm">{errors.contactEmail}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="requirements">Tell us briefly about your requirements</Label>
                  <Textarea
                    id="requirements"
                    value={requirements}
                    onChange={(e) => handleChange(e.target.value, "requirements")}
                    rows={3}
                    required
                    className={`w-full ${errors.requirements ? 'border-red-500' : ''}`}
                  />
                  {errors.requirements && <p className="text-red-500 text-sm">{errors.requirements}</p>}
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="scheduleDemo"
                    checked={scheduleDemo}
                    onCheckedChange={(checked) => handleChange(checked as boolean, "scheduleDemo")}
                  />
                  <Label htmlFor="scheduleDemo" className="text-sm text-gray-600">
                    Would you like to schedule a demo?
                  </Label>
                </div>
                {apiError && <div className="text-red-500">{apiError}</div>}
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Submit
                </Button>
              </form>
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BookACallForm;