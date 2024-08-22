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
import { IoCloseCircle, IoTicketOutline } from "react-icons/io5";
import { FaCircleCheck } from "react-icons/fa6";

interface Product {
  maintenance: string;
  maintenanceNote?: string;
  reqForChange: string;
  reqForChangeNote?: string;
  trainingReq: string;
  trainingReqNote?: string;
  dataMigration: string;
  dataMigrationNote?: string;
}

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

function PostImplementation({ product }: { product: Product }) {
  return (
    <div className="font-clarity grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="mb-3">
        <div>
          <h5 className="text-lg font-bold leading-none text-gray-800">
            Maintenance
          </h5>
          <p className="text-xs text-slate-500">
            {product?.maintenanceNote || " "}
          </p>
        </div>
        <div className="px-5 mt-2">
          <div className="flex items-center gap-3">
            {product.maintenance === "not-available" ? (
              <IoCloseCircle className="w-5 h-5 text-red-500" />
            ) : (
              <FaCircleCheck className="w-5 h-5 text-teal-500" />
            )}
            <p className="text-gray-700">
              {product.maintenance.charAt(0).toUpperCase() +
                product.maintenance.slice(1)}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-3">
        <div>
          <h5 className="text-lg font-bold leading-none text-gray-800">
            Request for Change
          </h5>
          <p className="text-xs text-slate-500">
            {product?.reqForChangeNote || " "}
          </p>
        </div>
        <div className="px-5 mt-2">
          <div className="flex items-center gap-3">
            {product.reqForChange === "not-available" ? (
              <IoCloseCircle className="w-5 h-5 text-red-500" />
            ) : (
              <FaCircleCheck className="w-5 h-5 text-teal-500" />
            )}
            <p className="text-gray-700">
              {product.reqForChange.charAt(0).toUpperCase() +
                product.reqForChange.slice(1)}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-3">
        <div>
          <h5 className="text-lg font-bold leading-none text-gray-800">
            Training
          </h5>
          <p className="text-xs text-slate-500">
            {product?.trainingReqNote || " "}
          </p>
        </div>
        <div className="px-5 mt-2">
          <div className="flex items-center gap-3">
            {product.trainingReq === "not-available" ? (
              <IoCloseCircle className="w-5 h-5 text-red-500" />
            ) : (
              <FaCircleCheck className="w-5 h-5 text-teal-500" />
            )}
            <p className="text-gray-700">
              {product.trainingReq.charAt(0).toUpperCase() +
                product.trainingReq.slice(1)}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-3">
        <div>
          <h5 className="text-lg font-bold leading-none text-gray-800">
            Data Migration
          </h5>
          <p className="text-xs text-slate-500">
            {product?.dataMigrationNote || " "}
          </p>
        </div>
        <div className="px-5 mt-2">
          <div className="flex items-center gap-3">
            {product.dataMigration === "not-available" ? (
              <IoCloseCircle className="w-5 h-5 text-red-500" />
            ) : (
              <FaCircleCheck className="w-5 h-5 text-teal-500" />
            )}
            <p className="text-gray-700">
              {product.dataMigration.charAt(0).toUpperCase() +
                product.dataMigration.slice(1)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostImplementation;
