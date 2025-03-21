import React from "react";
import {
  FaWalking,
  FaRobot,
  FaBookOpen,
  FaUserTie,
  FaUserGraduate,
} from "react-icons/fa";
import { GrTestDesktop, GrCertificate } from "react-icons/gr";
import { RiMobileDownloadLine } from "react-icons/ri";
import {
  MdOutlineOndemandVideo,
  MdOutlineSupportAgent,
  MdOutlineForum,
} from "react-icons/md";
import { IoIosCall } from "react-icons/io";
import { PiVideoConference } from "react-icons/pi";
import { IoTicketOutline } from "react-icons/io5";

// interface Product {
//   Demo: string[];
//   DemoNote?: string;
//   support: string[];
//   supportNote?: string;
//   training: string[];
//   trainingNote?: string;
// }

const icons: Record<string, Record<string, JSX.Element>> = {
  Demo: {
    "Self-demo": <GrTestDesktop className="w-5 h-5 text-primary1" />,
    "Customised prototypes": (
      <RiMobileDownloadLine className="w-5 h-5 text-primary1" />
    ),
    "Guided walkthrough": <FaWalking className="w-5 h-5 text-primary1" />,
    "Video demos": <MdOutlineOndemandVideo className="w-5 h-5 text-primary1" />,
  },
  support: {
    Phone: <IoIosCall className="w-5 h-5 text-primary1" />,
    "Live chat": <MdOutlineSupportAgent className="w-5 h-5 text-primary1" />,
    "Bot chat": <FaRobot className="w-5 h-5 text-primary1" />,
    "Community forum": <MdOutlineForum className="w-5 h-5 text-primary1" />,
    "Dedicated account manager": (
      <FaUserTie className="w-5 h-5 text-primary1" />
    ),
    "Help ticket": <IoTicketOutline className="w-5 h-5 text-primary1" />,
  },
  training: {
    "Video Tutorials": <PiVideoConference className="w-5 h-5 text-primary1" />,
    "User Manuals": <FaBookOpen className="w-5 h-5 text-primary1" />,
    "On-demand Training": <FaUserGraduate className="w-5 h-5 text-primary1" />,
    "Certification program": (
      <GrCertificate className="w-5 h-5 text-primary1" />
    ),
  },
};

// function ProductService({ product }: { product: Product }) {
//   const renderSelectedItems = (type: "Demo" | "support" | "training") => {
//     const selectedItems = product[type];
//     return selectedItems.map((item) => (
//       <div key={item} className="max-w-md hover:cursor-pointer">
//         <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-indigo-50">
//           {icons[type][item]}
//         </div>
//         <h6 className="mb-2 font-semibold leading-5 text-sm text-gray-800">{item}</h6>
//       </div>
//     ));
//   };

//   return (
//     <div>
//       <div className="grid grid-cols-1 md:grid-cols-2  items-start h-full">
//         <div className="mb-2">
//           <h5 className="mb-4 text-lg font-bold leading-none">Demo</h5>

//         </div>
//         <div className=" px-5">
//         <div className="mb-6 grid gap-5 grid-cols-2 row-gap-5 md:grid-cols-3">
//           {renderSelectedItems("Demo")}
//         </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 items-start h-full">
//         <div className=" mb-2">
//           <h5 className="mb-4 text-lg font-bold leading-none">Supports</h5>
        
//         </div>
//         <div className=" px-5">
//         <div className="mb-6 grid gap-5 grid-cols-2 row-gap-5 md:grid-cols-3">
//           {renderSelectedItems("support")}
//         </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 items-start h-full ">
//         <div className=" mb-2">
//           <h5 className="mb-4 text-lg font-bold leading-none">Training</h5>
        
//         </div>
//         <div className=" px-5">
//         <div className="mb-6 grid gap-5 grid-cols-2 row-gap-5 md:grid-cols-3">
//           {renderSelectedItems("training")}
//         </div>
//         </div>
//       </div>
//     </div>
    
//   );
// }

// export default ProductService;

function ProductService({ product }: { product: Product }) {
  const renderSelectedItems = (type: "Demo" | "support" | "training") => {
    const selectedItems = product[type];
    
    if (!selectedItems?.length) {
      // Placeholder items for each section
      const placeholders = {
        Demo: [
          { icon: <GrTestDesktop className="w-5 h-5" />, label: "Self Demo" },
          { icon: <FaWalking className="w-5 h-5" />, label: "Guided Demo" },
          { icon: <MdOutlineOndemandVideo className="w-5 h-5" />, label: "Video Demo" }
        ],
        support: [
          { icon: <IoIosCall className="w-5 h-5" />, label: "Support Call" },
          { icon: <MdOutlineSupportAgent className="w-5 h-5" />, label: "Live Support" },
          { icon: <FaRobot className="w-5 h-5" />, label: "Bot Support" }
        ],
        training: [
          { icon: <FaBookOpen className="w-5 h-5" />, label: "Documentation" },
          { icon: <PiVideoConference className="w-5 h-5" />, label: "Video Training" },
          { icon: <FaUserGraduate className="w-5 h-5" />, label: "Live Training" }
        ]
      };

      return placeholders[type].map((item, index) => (
        <div key={index} className="max-w-md">
          <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-indigo-50/50 blur-[3px]">
            {item.icon}
          </div>
          <h6 className="mb-2 font-semibold leading-5 text-sm text-gray-800 blur-[3px] select-none">
            {item.label}
          </h6>
        </div>
      ));
    }

    return selectedItems.map((item) => (
      <div key={item} className="max-w-md hover:cursor-pointer">
        <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-indigo-50">
          {icons[type][item]}
        </div>
        <h6 className="mb-2 font-semibold leading-5 text-sm text-gray-800">{item}</h6>
      </div>
    ));
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 items-start h-full">
        <div className="mb-2">
          <h5 className="mb-4 text-lg font-bold leading-none">Demo</h5>
        </div>
        <div className="px-5">
          <div className="mb-6 grid gap-5 grid-cols-2 row-gap-5 md:grid-cols-3">
            {renderSelectedItems("Demo")}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 items-start h-full">
        <div className="mb-2">
          <h5 className="mb-4 text-lg font-bold leading-none">Supports</h5>
        </div>
        <div className="px-5">
          <div className="mb-6 grid gap-5 grid-cols-2 row-gap-5 md:grid-cols-3">
            {renderSelectedItems("support")}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 items-start h-full">
        <div className="mb-2">
          <h5 className="mb-4 text-lg font-bold leading-none">Training</h5>
        </div>
        <div className="px-5">
          <div className="mb-6 grid gap-5 grid-cols-2 row-gap-5 md:grid-cols-3">
            {renderSelectedItems("training")}
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductService;
