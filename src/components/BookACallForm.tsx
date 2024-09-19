// import React, { useState } from 'react';
// import { X } from 'lucide-react';
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

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

// interface BookACallFormProps {
//   onClose: () => void;
//   teamsize: string;
//   designation: string;
//   orgType: string;
//   email: string;
//   vendorId: string;
//   productId: string;
// }

// const BookACallForm: React.FC<BookACallFormProps> = ({
//   onClose,
//   teamsize,
//   designation,
//   orgType,
//   email,
//   vendorId,
//   productId,
// }) => {
//   const [formData, setFormData] = useState<FormData>({
//     name: '',
//     designation: designation || '',
//     organisationName: '',
//     organisationType: orgType || '',
//     teamSize: teamsize || '',
//     contactEmail: email || '',
//     requirements: '',
//     scheduleDemo: false,
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Add vendorId and productId to formData if needed
//     const submittedData = { ...formData, vendorId, productId };
//     console.log(submittedData);
//     onClose();
//   };

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
//         <div className="flex">
//           <div className="w-1/3 bg-blue-600 p-8 flex items-center justify-center rounded-l-lg">
//             <div className="text-white space-y-4">
//               <h2 className="text-3xl font-bold">Book a Call</h2>
//               <p className="text-blue-100">Schedule a call with our team to discuss your needs and how we can help you achieve your goals.</p>
//               <img 
//                 src="/api/placeholder/300/200" 
//                 alt="Book a Call" 
//                 className="rounded-lg shadow-lg"
//               />
//             </div>
//           </div>
//           <div className="w-2/3 p-8">
//             <CardHeader>
//               <CardTitle className="text-2xl">Contact Information</CardTitle>
//               <CardDescription>Please fill in your details to schedule a call with us.</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div className="grid grid-cols-2 gap-4">
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
//                     <Input
//                       id="organisationType"
//                       name="organisationType"
//                       value={formData.organisationType}
//                       onChange={handleChange}
//                       className="w-full"
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="teamSize">Team Size</Label>
//                     <Input
//                       id="teamSize"
//                       name="teamSize"
//                       value={formData.teamSize}
//                       onChange={handleChange}
//                       className="w-full"
//                     />
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


import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface FormData {
  name: string;
  designation: string;
  organisationName: string;
  organisationType: string;
  teamSize: string;
  contactEmail: string;
  requirements: string;
  scheduleDemo: boolean;
}

interface BookACallFormProps {
  onClose: () => void;
  teamsize: string;
  designation: string;
  orgType: string;
  email: string;
  vendorId: string;
  productId: string;
}

const BookACallForm: React.FC<BookACallFormProps> = ({
  onClose,
  teamsize,
  designation,
  orgType,
  email,
  vendorId,
  productId,
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    designation: designation || '',
    organisationName: '',
    organisationType: orgType || '',
    teamSize: teamsize || '',
    contactEmail: email || '',
    requirements: '',
    scheduleDemo: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add vendorId and productId to formData if needed
    const submittedData = { ...formData, vendorId, productId };
    console.log(submittedData);
    onClose();
  };

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
          {/* Left side content with image */}
          <div className="lg:w-1/3 bg-blue-600 p-8 flex items-center justify-center rounded-t-lg lg:rounded-l-lg lg:rounded-t-none">
            <div className="text-white space-y-4 text-center lg:text-left">
              <h2 className="text-2xl lg:text-3xl font-bold">Book a Call</h2>
              <p className="text-blue-100">Schedule a call with our team to discuss your needs and how we can help you achieve your goals.</p>
              <img 
                src="/api/placeholder/300/200" 
                alt="Book a Call" 
                className="rounded-lg shadow-lg max-w-full h-auto"
              />
            </div>
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
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="designation">Designation</Label>
                    <Input
                      id="designation"
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="organisationName">Organisation Name</Label>
                    <Input
                      id="organisationName"
                      name="organisationName"
                      value={formData.organisationName}
                      onChange={handleChange}
                      required
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="organisationType">Organisation Type</Label>
                    <Input
                      id="organisationType"
                      name="organisationType"
                      value={formData.organisationType}
                      onChange={handleChange}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="teamSize">Team Size</Label>
                    <Input
                      id="teamSize"
                      name="teamSize"
                      value={formData.teamSize}
                      onChange={handleChange}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Contact Email</Label>
                    <Input
                      type="email"
                      id="contactEmail"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleChange}
                      required
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="requirements">Tell us briefly about your requirements</Label>
                  <Textarea
                    id="requirements"
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleChange}
                    rows={3}
                    required
                    className="w-full"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="scheduleDemo"
                    checked={formData.scheduleDemo}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, scheduleDemo: checked as boolean }))
                    }
                  />
                  <Label htmlFor="scheduleDemo" className="text-sm text-gray-600">
                    Would you like to schedule a demo?
                  </Label>
                </div>
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

