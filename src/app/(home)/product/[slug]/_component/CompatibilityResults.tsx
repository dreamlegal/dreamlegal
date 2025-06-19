import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Check, X, ChevronDown, ChevronRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const CompatibilityResults = ({ isOpen, onOpenChange, results }) => {
  const [showDetails, setShowDetails] = useState(false);

  const calculateOverallMatch = () => {
    if (!results) return 0;
    const matches = Object.values(results.response).filter(value => value).length;
    return Math.round((matches / Object.values(results.response).length) * 100);
  };

  const getMatchDescription = (percentage) => {
    if (percentage >= 80) return "Excellent Match!";
    if (percentage >= 60) return "Good Match";
    if (percentage >= 40) return "Fair Match";
    return "Low Match";
  };

  const getMatchColor = (percentage) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-blue-600";
    if (percentage >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 80) return "bg-green-500";
    if (percentage >= 60) return "bg-blue-500";
    if (percentage >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  const matchPercentage = calculateOverallMatch();

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Compatibility Analysis
          </DialogTitle>
        </DialogHeader>

        {results && (
          <div className="space-y-6 py-4">
            {/* Overall Score Section */}
            <div className="text-center space-y-4">
              <div className="relative inline-block">
                <div className="w-32 h-32 rounded-full border-8 border-gray-100 flex items-center justify-center">
                  <span className={cn("text-4xl font-bold", getMatchColor(matchPercentage))}>
                    {matchPercentage}%
                  </span>
                </div>
              </div>
              <div>
                <h3 className={cn("text-xl font-semibold", getMatchColor(matchPercentage))}>
                  {getMatchDescription(matchPercentage)}
                </h3>
              </div>
              <Progress 
                value={matchPercentage} 
                className="h-2 w-full"
                indicatorClassName={getProgressColor(matchPercentage)}
              />
            </div>

            {/* View Details Button */}
            <Button
              onClick={() => setShowDetails(!showDetails)}
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
            >
              {showDetails ? "Hide Details" : "View Details"}
              {showDetails ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>

            {/* Detailed Breakdown */}
            {showDetails && (
              <div className="space-y-3 mt-4">
                {Object.entries(results.response).map(([key, value]) => (
                  <div
                    key={key}
                    className={cn(
                      "flex items-center justify-between p-4 rounded-lg transition-all duration-200 hover:scale-102",
                      value ? "bg-green-50" : "bg-red-50"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      {value ? (
                        <Check className="h-5 w-5 text-green-600" />
                      ) : (
                        <X className="h-5 w-5 text-red-600" />
                      )}
                      <span className="font-medium">{key}</span>
                    </div>
                    <span className={cn(
                      "px-3 py-1 rounded-full text-sm font-medium",
                      value ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    )}>
                      {value ? "Match" : "No Match"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CompatibilityResults;