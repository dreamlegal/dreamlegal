// import React from 'react';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";

// const WorkflowReportModal = ({ isOpen, onClose, report }) => {
//   if (!report) return null;

//   return (
  
// <Dialog open={isOpen} onOpenChange={onClose}>
//   <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
//     <DialogHeader>
//       <DialogTitle className="text-2xl font-bold">Workflow Analysis Report</DialogTitle>
//     </DialogHeader>
//     <Card className="mb-4">
//       <CardHeader>
//         <CardTitle>Response Data</CardTitle>
//       </CardHeader>
//       <CardContent className="overflow-x-auto bg-gray-50 p-4 rounded-md">
//         <pre className="text-sm text-gray-800 whitespace-pre-wrap">
//           {JSON.stringify(report.response, null, 2)}
//         </pre>
//       </CardContent>
//     </Card>
//   </DialogContent>
// </Dialog>


//   );
// };

// export default WorkflowReportModal;

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const RenderJson = ({ data }: { data: any }) => {
  if (typeof data === "object" && !Array.isArray(data) && data !== null) {
    return (
      <div className="space-y-4">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="mb-4">
            <h4 className="font-semibold text-lg text-gray-800">{key.replace(/_/g, " ")}</h4>
            <div className="ml-4">
              <RenderJson data={value} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (Array.isArray(data)) {
    return (
      <ul className="list-disc ml-6 space-y-2">
        {data.map((item, index) => (
          <li key={index}>
            <RenderJson data={item} />
          </li>
        ))}
      </ul>
    );
  }

  return <p className="text-sm text-gray-600">{String(data)}</p>;
};

const WorkflowReportModal = ({ isOpen, onClose, report }) => {
  if (!report) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Workflow Analysis Report</DialogTitle>
        </DialogHeader>
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Response Data</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <RenderJson data={report.response} />
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default WorkflowReportModal;
