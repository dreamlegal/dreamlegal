
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  CalendarDays, 
  Users, 
  Briefcase, 
  ArrowRight,
  ArrowLeft, 
  
  Clock,
  Activity,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const WorkflowCards = ({ data }) => {
  const router = useRouter();
  const [currentSteps, setCurrentSteps] = useState({});

  const handleNextStep = (itemId) => {
    setCurrentSteps(prev => ({
      ...prev,
      [itemId]: Math.min((prev[itemId] || 0) + 1, data.find(item => item.formData.id === itemId).formData.workFlowSteps.length - 1)
    }));
  };

  const handlePrevStep = (itemId) => {
    setCurrentSteps(prev => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 0) - 1, 0)
    }));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getExhaustionColor = (scale) => {
    if (scale >= 4) return 'text-red-600 bg-red-50';
    if (scale >= 3) return 'text-orange-600 bg-orange-50';
    return 'text-green-600 bg-green-50';
  };

  return (
    <div className="space-y-6">
      {data.map((item, index) => (
        <div key={index} className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-indigo-500/10 rounded-2xl transform -rotate-1 transition-all duration-300 opacity-0 group-hover:opacity-100" />
          
          <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transition-all duration-300 group-hover:shadow-2xl">
            {/* Card Header */}
            <div className="p-6 bg-gradient-to-r from-gray-50 to-indigo-50 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      #{index + 1}
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-violet-500/10 absolute -top-1 -left-1 -z-10" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl font-bold text-gray-900">
                        {item.formData.categoryOfWorkflow}
                      </h3>
                      <div className="px-3 py-1 rounded-lg bg-violet-100 text-violet-600 text-sm font-medium">
                        {item.response.name}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <CalendarDays className="w-4 h-4" />
                        Created {formatDate(item.formData.createdAt)}
                      </div>
                      <div className="w-1 h-1 rounded-full bg-gray-300" />
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Updated {formatDate(item.formData.updatedAt)}
                      </div>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => router.push(`/workflow/report/${item.formData.id}`)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl
                           bg-gradient-to-r from-violet-500 to-indigo-600 text-white font-medium
                           shadow-lg shadow-indigo-200 transition-all duration-300
                           hover:shadow-xl hover:shadow-indigo-300 hover:from-violet-600 
                           hover:to-indigo-700 active:scale-[0.98]"
                >
                  View Full Report
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Column 1: Organization Info */}
              <div className="space-y-6">
                <div className="p-4 rounded-xl bg-gradient-to-br from-violet-50 to-indigo-50">
                  <div className="flex items-center gap-2 mb-3">
                    <Briefcase className="w-5 h-5 text-violet-600" />
                    <h4 className="font-semibold text-gray-900">Organization Details</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Type:</span>
                      <span className="text-sm font-medium text-gray-900">{item.formData.userOrgType}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Team Size:</span>
                      <span className="text-sm font-medium text-gray-900">{item.formData.userTeamSize}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="w-5 h-5 text-blue-600" />
                    <h4 className="font-semibold text-gray-900">Team Roles</h4>
                  </div>
                  <div className="space-y-2">
                    {item.formData.teamRoles.map((role, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{role.role}:</span>
                        <span className="text-sm font-medium text-gray-900">{role.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Column 2: Workflow Steps */}
              <div className="lg:col-span-2">
                <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Activity className="w-5 h-5 text-emerald-600" />
                      <h4 className="font-semibold text-gray-900">Workflow Steps</h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">
                        Step {(currentSteps[item.formData.id] || 0) + 1} of {item.formData.workFlowSteps.length}
                      </span>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="overflow-hidden rounded-xl">
                      {item.formData.workFlowSteps.map((step, idx) => (
                        <div
                          key={idx}
                          className={`transform transition-all duration-300 ${
                            idx === (currentSteps[item.formData.id] || 0)
                              ? 'opacity-100 translate-x-0'
                              : 'opacity-0 absolute inset-0 translate-x-full'
                          }`}
                        >
                          <div className="p-4 bg-white border border-emerald-100 rounded-xl hover:shadow-md transition-shadow duration-200">
                            <div className="flex items-center justify-between mb-3">
                              <h5 className="font-semibold text-gray-900">{step.step}</h5>
                              <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1.5">
                                  <AlertCircle className="w-4 h-4 text-orange-500" />
                                  <span className="text-sm">Repetitiveness: {step.repetitiveness}/5</span>
                                </div>
                                <div className={`flex items-center gap-1.5 px-2 py-1 rounded-lg ${getExhaustionColor(step.exhaustionScale)}`}>
                                  <Activity className="w-4 h-4" />
                                  <span className="text-sm">Exhaustion: {step.exhaustionScale}/5</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="space-y-3">
                              <div>
                                <div className="text-sm text-gray-600 mb-1.5">Team Members:</div>
                                <div className="flex flex-wrap gap-2">
                                  {step.teamRoles.map((role, roleIdx) => (
                                    <span key={roleIdx} className="px-3 py-1 rounded-lg bg-blue-50 text-blue-600 text-sm font-medium">
                                      {role}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              
                              <div>
                                <div className="text-sm text-gray-600 mb-1.5">Selected Steps:</div>
                                <div className="space-y-1">
                                  {step.selectedSteps.map((selected, stepIdx) => (
                                    <div key={stepIdx} className="flex items-center gap-2 text-gray-700">
                                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                      <span className="text-sm">{selected}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Navigation Arrows */}
                    {item.formData.workFlowSteps.length > 1 && (
                      <>
                        <button
                          onClick={() => handlePrevStep(item.formData.id)}
                          disabled={!currentSteps[item.formData.id]}
                          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-8 h-8 
                                   rounded-full bg-white shadow-lg border border-gray-200 
                                   flex items-center justify-center text-gray-600
                                   hover:bg-gray-50 transition-all duration-200
                                   disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <ArrowLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleNextStep(item.formData.id)}
                          disabled={currentSteps[item.formData.id] === item.formData.workFlowSteps.length - 1}
                          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-8 h-8 
                                   rounded-full bg-white shadow-lg border border-gray-200 
                                   flex items-center justify-center text-gray-600
                                   hover:bg-gray-50 transition-all duration-200
                                   disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Tools Section */}
            <div className="px-6 pb-6">
              <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-5 h-5 text-purple-600" />
                  <h4 className="font-semibold text-gray-900">Tools Used</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.formData.toolsUsed.map((tool, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-lg bg-white border border-purple-100
                               text-sm font-medium text-purple-600 shadow-sm"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WorkflowCards;