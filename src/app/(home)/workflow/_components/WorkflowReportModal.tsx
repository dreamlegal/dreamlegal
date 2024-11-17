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
        
        {/* Current Status */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Current Status and Observations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {Object.entries(report.response["Current Status and Observations"]).map(([key, value]) => (
              <div key={key}>
                <h4 className="font-semibold text-sm">{key}</h4>
                <p className="text-sm text-gray-600">{value}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Flags Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Red Flags */}
          <Card className="bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-700">Red Flags</CardTitle>
            </CardHeader>
            <CardContent>
              {Object.entries(report.response["Red Flags"]).map(([key, value]) => (
                <div key={key} className="mb-2">
                  <Badge variant="destructive" className="mb-1">{key}</Badge>
                  <p className="text-sm text-gray-600">{value}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Green Flags */}
          <Card className="bg-green-50">
            <CardHeader>
              <CardTitle className="text-green-700">Green Flags</CardTitle>
            </CardHeader>
            <CardContent>
              {Object.entries(report.response["Green Flags"]).map(([key, value]) => (
                <div key={key} className="mb-2">
                  <Badge variant="success" className="mb-1 bg-green-600">{key}</Badge>
                  <p className="text-sm text-gray-600">{value}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recommendations */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Recommendations and Solutions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(report.response["Data-Driven Recommendations and Solutions"]).map(([category, items]) => (
                <div key={category}>
                  <h4 className="font-semibold mb-2">{category}</h4>
                  {Object.entries(items).map(([key, value]) => (
                    <div key={key} className="ml-4 mb-2">
                      <p className="text-sm font-medium">{key}</p>
                      <p className="text-sm text-gray-600">{value}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Implementation Plan */}
        <Card>
          <CardHeader>
            <CardTitle>Implementation Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(report.response["Future Steps and Monitoring Metrics"]["Implementation Plan"]).map(([timeframe, plan]) => (
                <div key={timeframe} className="flex gap-2">
                  <Badge variant="outline" className="whitespace-nowrap">{timeframe}</Badge>
                  <p className="text-sm">{plan}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default WorkflowReportModal;