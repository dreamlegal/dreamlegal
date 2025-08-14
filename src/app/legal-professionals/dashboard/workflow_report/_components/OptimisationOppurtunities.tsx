"use client"
import React from 'react';
import { 
  BarChart3, AlertCircle, TrendingUp,
  Zap, AlertTriangle, CheckCircle2
} from 'lucide-react';

const OptimizationDashboard = ({ data }) => {
  // Extract data from props with fallbacks
  const optimizationData = {
    "Actionable Workflow Improvements": 
      data?.Optimization_Opportunities?.["Actionable_Workflow_Improvements"] || [],
    "Expected Impact Metrics": 
      data?.Optimization_Opportunities?.["Expected_Impact_Metrics"] || "",
    "Implementation Complexity Rating": 
      data?.Optimization_Opportunities?.["Implementation_Complexity_Rating"] || ""
  };

  return (
    <div className="p-8 "  >
      <div className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-sm border border-slate-100 p-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <BarChart3 className="w-6 h-6 text-blue-500" strokeWidth={1.5} />
            <h2 className="text-xl font-semibold text-slate-800">Optimization Opportunities</h2>
          </div>
        </div>

        {/* Layout Container */}
        <div className="space-y-6">
          {/* Full Width Workflow Improvements Box */}
          <div className="w-full p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-100 hover:border-blue-100 transition-all duration-300">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-2 rounded-xl bg-blue-50">
                <Zap className="w-5 h-5 text-blue-500" strokeWidth={1.5} />
              </div>
              <h3 className="font-semibold text-lg text-slate-800">Actionable Workflow Improvements</h3>
            </div>
            
            <ul className="space-y-3 pl-12">
              {optimizationData["Actionable Workflow Improvements"].map((improvement, index) => (
                <li key={index} className="text-slate-700 flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" strokeWidth={1.5} />
                  <span>{improvement}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Two Boxes in One Row */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Expected Impact Metrics Box */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-green-50 to-green-100/50 border border-green-100 hover:border-green-200 transition-all duration-300">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-2 rounded-xl bg-green-100">
                  <CheckCircle2 className="w-5 h-5 text-green-600" strokeWidth={1.5} />
                </div>
                <h3 className="font-semibold text-lg text-green-900">Expected Impact Metrics</h3>
              </div>
              <p className="text-green-800">
                {optimizationData["Expected Impact Metrics"]}
              </p>
            </div>

            {/* Implementation Complexity Box */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-100 hover:border-amber-200 transition-all duration-300">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-2 rounded-xl bg-amber-100">
                  <AlertTriangle className="w-5 h-5 text-amber-600" strokeWidth={1.5} />
                </div>
                <h3 className="font-semibold text-lg text-amber-900">Implementation Complexity</h3>
              </div>
              <p className="text-amber-800">
                {optimizationData["Implementation Complexity Rating"]
                
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptimizationDashboard;