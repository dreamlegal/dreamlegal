import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
      <CardContent className="overflow-x-auto bg-gray-50 p-4 rounded-md">
        <pre className="text-sm text-gray-800 whitespace-pre-wrap">
          {JSON.stringify(report.response, null, 2)}
        </pre>
      </CardContent>
    </Card>
  </DialogContent>
</Dialog>


  );
};

export default WorkflowReportModal;
