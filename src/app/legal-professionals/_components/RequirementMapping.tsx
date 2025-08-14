import React from 'react';
import { Clock, Sparkles, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const RequirementMapping = () => {
  return (
    <div className="min-h-screen p-6 overflow-hidden rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-blue-50/20 shadow-md">
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Requirements Mapping</h1>
            <p className="text-sm text-gray-600">Coming Soon</p>
          </div>
        </div>
      </div>

      {/* Coming Soon Card */}
      <div className="max-w-5xl mx-auto">
        <Card className="border-2 border-dashed border-blue-200 bg-gradient-to-br from-white to-blue-50">
          <CardContent className="p-12 text-center">
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute inset-0 -z-10">
                <div className="absolute top-10 left-1/4 w-24 h-24 bg-blue-200/20 rounded-full blur-xl" />
                <div className="absolute bottom-10 right-1/4 w-32 h-32 bg-cyan-200/20 rounded-full blur-xl" />
              </div>
              
              {/* Main content */}
              <div className="relative z-10">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Clock className="w-10 h-10 text-white" />
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Requirements Mapping Coming Soon
                </h2>
                
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  We're working on something exciting! Our requirements mapping feature 
                  will help you visualize and manage your project requirements effectively.
                </p>
                
                
                
                <div className="mt-12">
                  <button 
                    disabled
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium shadow-lg opacity-75 cursor-not-allowed"
                  >
                    <span className="mr-2">Feature Under Development</span>
                    <Sparkles className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RequirementMapping;