// import React from 'react';
// import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Building2, Users, Mail, FileText, Package, Store } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// // const LeadCard = ({ lead }: { lead: any }) => {
// const LeadCard = () => {
//   return (
//     <Card className="w-full max-w-md overflow-hidden transition-all duration-300 hover:shadow-lg">
//       <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
//         <div className="flex justify-between items-start">
//           <CardTitle className="text-xl font-bold">Lead Name</CardTitle>
//           <Badge variant="secondary" className="bg-blue-200 text-blue-800">
//             Lead Organisation Type
//           </Badge>
//         </div>
//         <CardDescription className="text-blue-100">Lead Designation</CardDescription>
//       </CardHeader>
//       <CardContent className="pt-6">
//         <div className="space-y-4">
//           <div className="flex items-center space-x-3">
//             <Building2 className="h-5 w-5 text-gray-500" />
//             <span className="text-sm text-gray-600">Lead Organisation Name</span>
//           </div>
//           <div className="flex items-center space-x-3">
//             <Users className="h-5 w-5 text-gray-500" />
//             <span className="text-sm text-gray-600">Lead Team Size</span>
//           </div>
//           <div className="flex items-center space-x-3">
//             <Mail className="h-5 w-5 text-gray-500" />
//             <span className="text-sm text-gray-600">Lead Contact Email</span>
//           </div>
//           <div className="flex items-start space-x-3">
//             <FileText className="h-5 w-5 text-gray-500 mt-1" />
//               <p className="text-sm text-gray-600">Lead Requirements</p>
//           </div>
//         </div>
//       </CardContent>
//       <CardFooter className="bg-gray-50 flex justify-between items-center">
//         <span className="text-sm text-gray-500">
//           Demo Requested
//         </span>
//         <Button variant="outline" className="text-blue-600 hover:bg-blue-50">
//           View Details
//         </Button>
//       </CardFooter>
//     </Card>
   
    
  

       
    
//   );
// };

// export default LeadCard;
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Users, Mail, FileText, Package, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const LeadCard = ({ lead, verify }: { lead: any; verify: boolean } ) => {
  const baseClasses = "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium";
  const colorClasses = lead.scheduleDemo 
    ? "bg-green-100 text-green-800 border border-green-300" 
    : "bg-red-100 text-red-800 border border-red-300";
  return (
    <Card className="w-full max-w-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold">{lead.name}</CardTitle> {/* Lead Name */}
          <Badge variant="secondary" className="bg-blue-200 text-blue-800">
            {lead.ProductName
            } {/* Lead Organisation Type */}
          </Badge>
         
        </div>
        <div className="flex justify-between items-start">
        <CardDescription className="text-blue-100">{lead.designation}</CardDescription> {/* Lead Designation */}



        
        <Badge variant="secondary" className="bg-blue-200 text-blue-800 truncate">
            {lead.VendorName
            } {/* Lead Organisation Type */}
          </Badge>

          
         
        </div>
      
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
        <div className="flex items-center space-x-3">
            <Store className="h-5 w-5 text-gray-500" />
            <span className="text-sm text-gray-600">{lead.organisationType}</span> {/* Organisation Type */}
          </div>
          <div className="flex items-center space-x-3">
            <Building2 className="h-5 w-5 text-gray-500" />
            <span className="text-sm text-gray-600">{lead.organisationName}</span> {/* Lead Organisation Name */}
          </div>

          <div className="flex items-center space-x-3">
            <Users className="h-5 w-5 text-gray-500" />
            <span className="text-sm text-gray-600">{lead.teamSize}</span> {/* Lead Team Size */}
          </div>
          <div className="flex items-center space-x-3">
            <Mail className="h-5 w-5 text-gray-500" />
            <span className="text-sm text-gray-600">{lead.contactEmail}</span> {/* Lead Contact Email */}
          </div>
          <div className="flex items-start space-x-3">
            <FileText className="h-5 w-5 text-gray-500 mt-1" />
            <p className="text-sm text-gray-600">{lead.requirements}</p> {/* Lead Requirements */}
          </div>
          <div className="flex items-center space-x-3">
            <Package className="h-5 w-5 text-gray-500" />
            <span className="text-sm text-gray-600">Booking Time: {new Date(lead.bookingTime).toLocaleString()}</span> {/* Booking Time */}
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50  flex flex-col item-left">
       
       <div className='flex justify-between items-center gap-2'>

      
        <span className={`${baseClasses} ${colorClasses} mt-4` } >
      {lead.scheduleDemo ? (
        <>
          <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Demo Requested
        </>
      ) : (
        <>
          <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          No Demo Requested
        </>
      )}
        </span>
      
        <TooltipProvider >
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" className="text-blue-600 hover:bg-blue-50 mt-4">
            Schedule Meeting
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Coming Soon</p>
        </TooltipContent>
      </Tooltip>
        </TooltipProvider>
        </div>

        <p className='text-red-500 italic text-sm mt-2'>(Schedule meeting feature coming soon)</p>
      </CardFooter>
    </Card>
  );
};

export default LeadCard;
