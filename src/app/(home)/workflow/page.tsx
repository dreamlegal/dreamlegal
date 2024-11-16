"use client"
import React, { useEffect, useState  } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { ChevronUp, ChevronDown, X, Plus, GripVertical } from 'lucide-react';

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { toast } from "@/components/ui/use-toast";

import { CardHeader, CardTitle, CardContent } from '@/components/ui/card';

import { 
  Code2, 
  Megaphone, 
  HeadphonesIcon, 
  BarChart2, 
  Briefcase,
  PenTool,
  ArrowRight,
  ArrowLeft,
  Gavel,
  Settings,
  BookOpen,
  Lightbulb,
  Shield,
  Search,
  DollarSign,
  FileText,
  PlusCircle,
  PlusSquare,

} from 'lucide-react';







const SortableStep = ({ step, index, onRemove, onUpdateStep, categoryName, teamRoles }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: step.step });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const toggleTeamRole = (role) => {
    const currentRoles = step.teamRoles || [];
    const newRoles = currentRoles.includes(role)
      ? currentRoles.filter((r) => r !== role)
      : [...currentRoles, role];
    
    onUpdateStep(index, { ...step, teamRoles: newRoles });
  };

  const generateMarkers = (min, max, type) => {
    return [...Array(max - min + 1)].map((_, i) => {
      const isSelected =
        (type === 'Repetitiveness' && i <= step.repetitiveness) ||
        (type === 'Exhaustion' && i <= step.exhaustionScale);

      return (
        <div
          key={i}
          className={`absolute w-3 h-3 rounded-full border-2 ${
            isSelected ? 'border-primary bg-primary/20' : 'border-gray-300 bg-white'
          } transition-colors duration-200`}
          style={{
            left: `${(i / (max - min)) * 92}%`,
            transform: 'translateX(-50%)',
            top: '48%',
            zIndex: 10,
          }}
        />
      );
    });
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-secondary p-6 rounded-lg space-y-6 mb-3 shadow-sm"
    >
      <div className="flex items-center space-x-4">
        <div {...attributes} {...listeners} className="cursor-move hover:opacity-70 transition-opacity">
          <GripVertical className="h-5 w-5 text-gray-500" />
        </div>
        <span className="w-8 h-8 flex items-center justify-center bg-primary text-primary-foreground rounded-full font-medium">
          {index + 1}
        </span>
        <span className="flex-1 font-medium text-foreground">{step.step}</span>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="hover:bg-destructive/10 hover:text-destructive transition-colors"
          onClick={() => onRemove(index)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-8">
        {/* Repetitiveness Slider */}
        <div className="space-y-3 relative">
          <Label className="text-sm font-medium">Repetitiveness (0-5)</Label>
          <div className="flex items-center">
            {generateMarkers(0, 5, 'Repetitiveness')}
            <Slider
              value={[step.repetitiveness]}
              onValueChange={(value) => onUpdateStep(index, { ...step, repetitiveness: value[0] })}
              max={5}
              min={0}
              step={1}
              className="flex-1"
              aria-label="Repetitiveness Slider"
            />
            <span className="ml-4 text-gray-500 min-w-[2.5rem] text-right">
              {step.repetitiveness.toFixed(1)}
            </span>
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>Low</span>
            <span>High</span>
          </div>
        </div>

        {/* Exhaustion Rate Slider */}
        <div className="space-y-3 relative">
          <Label className="text-sm font-medium">Exhaustion Rate (0-5)</Label>
          <div className="flex items-center">
            {generateMarkers(0, 5, 'Exhaustion')}
            <Slider
              value={[step.exhaustionScale]}
              onValueChange={(value) => onUpdateStep(index, { ...step, exhaustionScale: value[0] })}
              max={5}
              min={0}
              step={1}
              className="flex-1"
              aria-label="Exhaustion Rate Slider"
            />
            <span className="ml-4 text-gray-500 min-w-[2.5rem] text-right">
              {step.exhaustionScale.toFixed(1)}
            </span>
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>Low</span>
            <span>High</span>
          </div>
        </div>

        {/* Team Roles Section */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Team Roles</Label>
          <div className="flex flex-wrap gap-2">
            {teamRoles.map((role) => {
              const isSelected = (step.teamRoles || []).includes(role);
              return (
                <Button
                  key={role}
                  type="button"
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleTeamRole(role)}
                  className={`relative group ${
                    isSelected ? 'bg-blue-600 text-white hover:bg-blue-700' : 'hover:bg-gray-100'
                  }`}
                >
                  {role}
                  {isSelected && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleTeamRole(role);
                      }}
                      className="absolute -right-1 -top-1 w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}



const WorkflowForm = () => {
   // forms  bookmycall and rfp
   const CustomerUserId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;
   console.log(CustomerUserId);

   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   useEffect(() => {
    const fetchUserData = async () => {
      if (!CustomerUserId) {
        setLoading(false);
        return;
      }
  
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/get-user?userId=${CustomerUserId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();
  
        if (userData.success) {
          const { profile } = userData;
  
          // Use setFormData with the spread operator to update state immutably
          setFormData(prevFormData => ({
            ...prevFormData,
            userOrgType: profile.CompanyType || "",
            userTeamSize: profile.TeamSize || ""
          }));
        } else {
          throw new Error("Failed to fetch user data");
        }
      } catch (err) {
        setError(err.message || "An error occurred while fetching user data");
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserData();
  }, [CustomerUserId]);
  
  const [formData, setFormData] = useState({
    userOrgType: '',
    userTeamSize: '',
    catOfWorkFlow: '',
    teamRoles: [],
    toolsUsed: [],
    steps: []
  });

  // Organization types and team sizes
  const orgTypes = [
    'Individual Practitioner',
    'Law Firms',
    'Government Departments',
    'Startups',
    'Enterprises',
    'Judiciary',
    'In-House Counsels'
  ];

  const teamSizes = ['1-10', '11-50', '51-200', '201-500', '500+'];

  // Workflow categories
  const workflowCategories = [
    'Client Management',
    'Contract Management',
    'E-Signature',
    'Document Management',
    'Billing and Invoicing',
    'Discovery',
    'Compliance Management',
    'IP Management',
    'Legal Research',
    'Workflow Automation',
    'Litigation Management'
  ];

  
  const teamRolesMap = {
    'Individual Practitioner': [
      'Lawyer',
      'Junior Lawyer',
      'Paralegal',
      'Externally Associated Counsel',
      'Intern',
      'Administrative Support'
    ],
    'Law Firms': [
      'Managing Partner',
      'Senior Partner',
      'Partner',
      'Principal Associate',
      'Senior Associate',
      'Associate',
      'Junior Associate',
      'Paralegal',
      'Company Secretary',
      'Case Manager/Clerk',
      'Administrative Support',
      'Intern'
    ],
    'Government Departments': [
      'Chief Legal Officer',
      'Compliance Officer',
      'Legal Analyst',
      'Policy Advisor',
      'Administrative Officer',
      'Clerk',
      'Intern',
      'Outsourced Lawyer/Firm'
    ],
    'Startups': [
      'Legal Head',
      'Compliance Officer',
      'Legal Associate',
      'Contract Manager',
      'Operations Manager',
      'Outsourced Lawyer/Firm'
    ],
    'Enterprises': [
      'General Counsel',
      'Legal President',
      'Legal Vice President',
      'Legal Director',
      'Legal Manager',
      'Legal Operations Manager',
      'Contract Specialist',
      'Compliance Manager',
      'Outsourced Lawyer/Firm'
    ],
    'Judiciary': [
      'Judge',
      'Court Clerk',
      'Judicial Assistant',
      'Research Attorney',
      'Case Administrator'
    ],
    'In-House Counsels': [
      'General Counsel',
      'Legal Counsel',
      'Compliance Officer',
      'Legal Operations Manager',
      'Paralegal/Legal Assistant'
    ]
  };
  

 
  const toolsMap = {
    'Client Management': [
      'Client Intake Software',
      'Case Management Software',
      'Communication Platforms',
      'Client Portal Software',
      'Relationship Tracking Tools'
    ],
    'Contract Management': [
      'Contract Drafting Tools',
      'Contract Review Platforms',
      'Contract Repository',
      'Approval Workflow Software',
      'Contract Analytics Tools',
      'Lifecycle Management Software'
    ],
    'E-Signature': [
      'Digital Signature Software',
      'Authentication Tools',
      'Secure Document Sharing',
      'Signature Tracking Software',
      'Compliance-Based E-Sign Solutions'
    ],
    'Document Management': [
      'Document Storage Solutions',
      'Version Control Software',
      'Access Control Tools',
      'Document Sharing Platforms',
      'Document Search and Retrieval'
    ],
    'Billing and Invoicing': [
      'Billing Management Software',
      'Invoice Generation Tools',
      'Payment Tracking Systems',
      'Expense Management Tools',
      'Automated Billing Workflows'
    ],
    'Discovery': [
      'Document Review Tools',
      'Data Collection Software',
      'Redaction Tools',
      'Data Processing Tools',
      'Legal Hold Management Software'
    ],
    'Compliance Management': [
      'Compliance Management Tools',
      'Risk Assessment Software',
      'Policy Management Tools',
      'Audit Management Solutions',
      'Incident Management Tools'
    ],
    'IP Management': [
      'IP Portfolio Management Software',
      'Patent and Trademark Management Tools',
      'IP Search and Monitoring Tools',
      'IP Filing Software',
      'Licensing and Royalty Management'
    ],
    'Legal Research': [
      'Legal Database Access Tools',
      'Case Law Research Platforms',
      'Statutory and Regulatory Databases',
      'AI-Powered Research Tools',
      'Citation Management Tools'
    ],
    'Workflow Automation': [
      'Workflow Design Software',
      'Task Automation Tools',
      'Workflow Management Platforms',
      'Approval Workflow Software',
      'Document Automation Tools'
    ],
    'Litigation Management': [
      'Case Tracking Tools',
      'Analytics for Litigation Trends',
      'Court Docket Management',
      'Case Data Analytics',
      'Outcome Prediction Software'
    ]
  };
  

 
  const stepsMap = {
    'Client Management': [
      'Conduct Client Intake',
      'Assess Client Needs',
      'Develop Strategy Plan',
      'Represent Client Interests',
      'Communicate with Client',
      'Review Client Feedback'
    ],
    'Contract Management': [
      'Draft Contract Terms',
      'Negotiate Contract Details',
      'Authenticate Contract Parties',
      'Execute Contract Agreement',
      'Store Contract Safely',
      'Track Contract Status'
    ],
    'E-Signature': [
      'Prepare Document for Signing',
      'Authenticate Signer Identity',
      'Sign Document Electronically',
      'Encrypt Document Securely',
      'Verify Signature Validity',
      'Distribute Signed Document'
    ],
    'Document Management': [
      'Capture New Documents',
      'Manage Document Changes',
      'Review Document Content',
      'Organize Document Structure',
      'Control Access Permissions',
      'Retrieve Documents Easily'
    ],
    'Billing and Invoicing': [
      'Generate Client Invoices',
      'Authorize Billing Amounts',
      'Distribute Invoices Securely',
      'Facilitate Payment Process',
      'Track Payment Status',
      'Analyze Billing Data'
    ],
    'Discovery': [
      'Discover Relevant Evidence',
      'Preserve Digital Data',
      'Acquire Case Documents',
      'Examine Data Thoroughly',
      'Evaluate Findings',
      'Present Evidence Clearly'
    ],
    'Compliance Management': [
      'Assess Coverage Needs',
      'Validate Compliance Risks',
      'Implement Compliance Controls',
      'Monitor Compliance Actions',
      'Analyze Risk Levels'
    ],
    'IP Management': [
      'Catalogue IP Assets',
      'Analyze IP Value',
      'Protect IP Rights',
      'Monitor IP Use',
      'Enforce IP Protections',
      'Report IP Status'
    ],
    'Workflow Automation': [
      'Identify Workflow Steps',
      'Configure Workflow Process',
      'Validate Workflow Stages',
      'Implement Automation',
      'Track Workflow Progress',
      'Optimize Workflow Efficiency'
    ],
    'Litigation Management': [
      'Intake Case Details',
      'Develop Case Strategy',
      'Prepare Litigation Materials',
      'Support Litigation Process',
      'Analyze Case Data',
      'Evaluate Case Outcome'
    ]
  };
  
  

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      setFormData((prev) => {
        const oldIndex = prev.steps.findIndex((step) => step.step === active.id);
        const newIndex = prev.steps.findIndex((step) => step.step === over.id);
        
        return {
          ...prev,
          steps: arrayMove(prev.steps, oldIndex, newIndex),
        };
      });
    }
  };

  // Keep all the existing handlers (handleAddTeamRole, handleAddCustomTeamRole, etc.)
  // ... [Include all handlers from the original code]

  const handleUpdateStep = (index, updatedStep) => {
    const newSteps = [...formData.steps];
    newSteps[index] = updatedStep;
    setFormData(prev => ({ ...prev, steps: newSteps }));
  };


  
  // Team Roles handlers
  const handleAddTeamRole = (role) => {
    if (!formData.teamRoles.find(r => r.role === role)) {
      const newRole = {
        role,
        count: 1
      };
      setFormData(prev => ({
        ...prev,
        teamRoles: [...prev.teamRoles, newRole]
      }));
    }
  };

  const handleAddCustomTeamRole = (customRole) => {
    if (customRole.trim() && !formData.teamRoles.find(r => r.role === customRole.trim())) {
      handleAddTeamRole(customRole.trim());
    }
  };

  const handleUpdateRoleCount = (role, count) => {
    setFormData(prev => ({
      ...prev,
      teamRoles: prev.teamRoles.map(r => 
        r.role === role ? { ...r, count: parseInt(count) || 0 } : r
      )
    }));
  };

  const handleRemoveRole = (roleToRemove) => {
    setFormData(prev => ({
      ...prev,
      teamRoles: prev.teamRoles.filter(r => r.role !== roleToRemove)
    }));
  };

  // Tools handlers
  const handleAddTool = (tool) => {
    if (!formData.toolsUsed.includes(tool)) {
      setFormData(prev => ({
        ...prev,
        toolsUsed: [...prev.toolsUsed, tool]
      }));
    }
  };

  const handleAddCustomTool = (customTool) => {
    if (customTool.trim() && !formData.toolsUsed.includes(customTool.trim())) {
      handleAddTool(customTool.trim());
    }
  };

  const handleRemoveTool = (tool) => {
    setFormData(prev => ({
      ...prev,
      toolsUsed: prev.toolsUsed.filter(t => t !== tool)
    }));
  };

  // Steps handlers
  const handleAddStep = (step) => {
    if (!formData.steps.find(s => s.step === step)) {
      const newStep = {
        step,
        repetitiveness: 3,
        exhaustionScale: 3
      };
      setFormData(prev => ({
        ...prev,
        steps: [...prev.steps, newStep]
      }));
    }
  };

  const handleAddCustomStep = (customStep) => {
    if (customStep.trim() && !formData.steps.find(s => s.step === customStep.trim())) {
      handleAddStep(customStep.trim());
    }
  };



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement> ) => {
    // Check if all fields are filled
    e.preventDefault(); // This is crucial to prevent form submission on every change
    
    if (
      !CustomerUserId ||
      !formData.userOrgType ||
      !formData.userTeamSize ||
      !formData.catOfWorkFlow ||
      !formData.teamRoles.length ||

      !formData.steps.length
    ) {
      console.error('Please fill in all required fields');
      toast({
        title: "Missing Fields",
        description:  "Please fill in all required fields.",
        variant: "destructive",
      });
      return; // Exit the function if validation fails
    }
  
    try {
      // Prepare the request body with necessary data
      const requestBody = {
        userID: CustomerUserId, // The user ID passed as an argument
        userOrgType: formData.userOrgType,
        userTeamSize: formData.userTeamSize,
        categoryOfWorkflow: formData.catOfWorkFlow,
        teamRoles: formData.teamRoles,
        toolsUsed: formData.toolsUsed,
        workFlowSteps: formData.steps,
      };
  
      // Make a POST request to your API endpoint
      const response = await fetch('/api/submit-workFlowData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
  
      // Handle the response
      const result = await response.json();
      if (response.ok) {
        console.log('Workflow created successfully:', result.data);
        toast({
          title: "Success",
          description: "Form submitted successfully!",
          variant: "success",
        });
        // Optionally handle success (e.g., clear the form or show a success message)
      } else {
        console.error('Error creating workflow:', result.message);
        toast({
          title: "Error",
          description: result.msg || "Failed to submit Form.",
          variant: "destructive",
        });
        // Optionally show an error message to the user
      }
    } catch (error) {
      console.error('Network or server error:', error);
      toast({
        title: "Error",
        description: "An error occurred while submitting the Form.",
        variant: "destructive",
      });
      // Optionally show an error message to the user
    }
  };


  const [step, setStep] = useState(1);
  

  const workflowCategoriess = [
    {
      id: "client-management",
      name: "Client Management",
      icon: Megaphone,
      description: "Manage client interactions and relationships effectively",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: "contract-management",
      name: "Contract Management",
      icon: Briefcase,
      description: "Streamline contract creation, negotiation, and management",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: "e-signature",
      name: "E-Signature",
      icon: PenTool,
      description: "Facilitate secure and efficient electronic signatures",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: "document-management",
      name: "Document Management",
      icon: FileText,
      description: "Organize and manage documents efficiently",
      color: "from-orange-500 to-amber-500"
    },
    {
      id: "billing-invoicing",
      name: "Billing and Invoicing",
      icon: DollarSign,
      description: "Optimize billing and invoicing processes",
      color: "from-indigo-500 to-violet-500"
    },
    {
      id: "discovery",
      name: "Discovery",
      icon: Search,
      description: "Enhance discovery processes and data collection",
      color: "from-rose-500 to-red-500"
    },
    {
      id: "compliance-management",
      name: "Compliance Management",
      icon: Shield,
      description: "Ensure compliance with regulations and standards",
      color: "from-teal-500 to-blue-500"
    },
    {
      id: "ip-management",
      name: "IP Management",
      icon: Lightbulb,
      description: "Manage intellectual property effectively",
      color: "from-yellow-500 to-orange-500"
    },
    {
      id: "legal-research",
      name: "Legal Research",
      icon: BookOpen,
      description: "Conduct thorough and efficient legal research",
      color: "from-red-500 to-pink-500"
    },
    {
      id: "workflow-automation",
      name: "Workflow Automation",
      icon: Settings,
      description: "Automate and optimize workflows",
      color: "from-green-500 to-teal-500"
    },
    {
      id: "litigation-management",
      name: "Litigation Management",
      icon: Gavel,
      description: "Manage litigation processes effectively",
      color: "from-blue-500 to-indigo-500"
    }
  ];

  
  const handleCategorySelect = (categoryName) => {
    // Set the selected category
    setFormData(prev => ({ ...prev, catOfWorkFlow: categoryName }));
    
    // Add CSS class for transition
    const formContainer = document.getElementById('form-container');
    formContainer.classList.add('slide-out');
  
    // Delay the step change to ensure animation completes
    setTimeout(() => {
      setStep(2);
      formContainer.classList.remove('slide-out'); // Optionally remove the class after setting step
    }, 300);
  };
  // const [customRoleInput, setCustomRoleInput] = useState('');

  // const allRoles = [
  //   ...(teamRolesMap[formData.userOrgType] || []),
  //   ...formData.teamRoles
  //     .filter(role => !teamRolesMap[formData.userOrgType]?.includes(role.role))
  //     .map(role => role.role)
  // ];

  // const handleCustomRoleAdd = () => {
  //   if (customRoleInput.trim()) {
  //     handleAddCustomTeamRole(customRoleInput);
  //     setCustomRoleInput('');
  //   }
  // };
  const [customRoleInput, setCustomRoleInput] = useState('');
  const [customToolInput, setCustomToolInput] = useState('');

  // Combine predefined and custom roles
  const allRoles = [
    ...(teamRolesMap[formData.userOrgType] || []),
    ...formData.teamRoles
      .filter(role => !teamRolesMap[formData.userOrgType]?.includes(role.role))
      .map(role => role.role)
  ];

  // Combine predefined and custom tools
  const allTools = [
    ...(toolsMap[formData.catOfWorkFlow] || []),
    ...formData.toolsUsed.filter(tool => !toolsMap[formData.catOfWorkFlow]?.includes(tool))
  ];

  const handleCustomRoleAdd = () => {
    if (customRoleInput.trim()) {
      handleAddCustomTeamRole(customRoleInput);
      setCustomRoleInput('');
    }
  };

  const handleCustomToolAdd = () => {
    if (customToolInput.trim()) {
      handleAddCustomTool(customToolInput);
      setCustomToolInput('');
    }
  };
  const teamRoleNames = formData.teamRoles.map(({ role }) => role);

  return (
    

<div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideOut {
          to { transform: translateX(-100%); opacity: 0; }
        }
        
        .slide-out {
          animation: slideOut 0.3s ease-in-out forwards;
        }
        
        .workflow-card {
          transition: all 0.3s ease;
        }
        
        .workflow-card:hover {
          transform: translateY(-4px);
        }
      `}</style>

      <div className="max-w-5xl bg-gray-50 mx-auto" id="form-container">
        {step === 1 ? (
          <div className="space-y-8" style={{ animation: 'fadeIn 0.5s ease-out' }}>
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                Select Which Workflow to Analyse 
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Select your workflow category to begin optimizing your business processes
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {workflowCategoriess.map((category) => {
                const Icon = category.icon;
                return (
                  <Card 
                    key={category.id}
                    className="workflow-card hover:shadow-xl cursor-pointer border-0 shadow-md"
                    onClick={() => handleCategorySelect(category.name)}
                  >
                    <CardContent className="p-6 space-y-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {category.name}
                        </h3>
                        <p className="text-gray-500 text-sm">
                          {category.description}
                        </p>
                      </div>
                      <div className="pt-2 flex items-center text-sm text-gray-600 group">
                        <span>Get started</span>
                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ) : (

          <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
            
            <Button 
              variant="ghost" 
              onClick={() => setStep(1)}
              className="mb-6 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Categories
            </Button>
            
            
                <div className="flex items-center space-x-3">
                  {workflowCategories.find(c => c.name === formData.catOfWorkFlow)?.icon && 
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${
                      workflowCategories.find(c => c.name === formData.catOfWorkFlow)?.color
                    } flex items-center justify-center`}>
                      {React.createElement(
                        workflowCategories.find(c => c.name === formData.catOfWorkFlow)?.icon,
                        { className: "w-5 h-5 text-white" }
                      )}
                    </div>
                  }
                
                </div>
              

              <form onSubmit={handleSubmit}>


<Card className='p-6 mb-6'>   

                  <CardTitle className="text-2xl font-bold">
                    Configure {formData.catOfWorkFlow} Workflow
                  </CardTitle>             
</Card>
<Card className='p-6 mb-6'>           
                  <div className="space-y-2 mb-6 ">
                    <Label>Organization Type</Label>
                    <Select 
                      value={formData.userOrgType}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, userOrgType: value }))}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select organization type" />
                      </SelectTrigger>
                      <SelectContent>
                        {orgTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  
                  <div className="space-y-2 mb-6">
                    <Label>Team Size</Label>
                    <Select 
                      value={formData.userTeamSize}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, userTeamSize: value }))}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select team size" />
                      </SelectTrigger>
                      <SelectContent>
                        {teamSizes.map(size => (
                          <SelectItem key={size} value={size}>{size}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  
</Card>
            
{/* <Card className='p-6 mb-6'>

                 
                  {formData.userOrgType && (
            <div className="space-y-4 mb-6">
              
              <CardTitle className="text-2xl font-bold">
              
              Team Roles Involved In The Workflow
              </CardTitle>

              <div className="grid grid-cols-1 gap-2">
                {teamRolesMap[formData.userOrgType]?.map(role => {
                  const isSelected = formData.teamRoles.some(tr => tr.role === role);
                  return (
                    <Button
                      type="button"
                      key={role}
                      variant={isSelected ? "default" : "outline"}
                      onClick={() => handleAddTeamRole(role)}
                      className={`w-full text-left justify-start break-words ${
                        isSelected 
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : ""
                      }`}
                    >
                      {role}
                    </Button>
                  );
                })}
              </div>

              
              <div className="space-y-2">
                {formData.teamRoles.map(({ role, count }) => (
                  <div key={role} className="flex items-center bg-gray-50 space-x-2 p-2  shadow-sm rounded-lg border border-gray-200">
                    <p className='mr-1 text-sm font-semibold text-gray-700'>Count:</p>
                    <Input 
                      type="text"
                      placeholder='Enter Count'
                      value={count}
                      onChange={(e) => handleUpdateRoleCount(role, e.target.value)}
                      className="w-16 md:w-20 border-gray-300 rounded-md"
                      min="1"
                    />
                    <span className="flex-1 break-words text-gray-800">{role}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveRole(role)}
                      className="shrink-0 text-red-600 hover:text-red-800"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

             
              <div className="flex space-x-2">
                <Input
                  placeholder="Add custom role"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAddCustomTeamRole(e.target.value);
                      e.target.value = '';
                    }
                  }}
                />
                <Button 
                  type="button"
                  onClick={() => {
                    const input = document.querySelector('input[placeholder="Add custom role"]');
                    handleAddCustomTeamRole(input.value);
                    input.value = '';
                  }}
                  className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
                  )}
</Card> */}

{/* <Card className="p-6 mb-6">
      {formData.userOrgType && (
        <div className="space-y-4 mb-6">
          <CardTitle className="text-2xl font-bold">
            Team Roles Involved In The Workflow
          </CardTitle>

          <div className="grid grid-cols-1 gap-2">
            {teamRolesMap[formData.userOrgType]?.map(role => {
              const isSelected = formData.teamRoles.some(tr => tr.role === role);
              const selectedRole = formData.teamRoles.find(tr => tr.role === role);

              return (
                <div key={role} className="relative">
                  {!isSelected ? (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleAddTeamRole(role)}
                      className="w-full text-left justify-start break-words"
                    >
                      {role}
                    </Button>
                  ) : (
                    <div className="flex items-center bg-blue-600 text-white p-2 rounded-lg space-x-2">
                      <div className="flex items-center space-x-2 flex-1">
                        <span className="text-sm font-semibold">Count:</span>
                        <Input 
                          type="text"
                          value={selectedRole.count}
                          onChange={(e) => handleUpdateRoleCount(role, e.target.value)}
                          className="w-16 md:w-20 bg-white/10 border-white/20 text-white placeholder-white/50"
                          min="1"
                        />
                        <span className="flex-1 break-words">{role}</span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveRole(role)}
                        className="shrink-0 text-white hover:text-white/80 hover:bg-blue-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex space-x-2">
            <Input
              placeholder="Add custom role"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAddCustomTeamRole(e.target.value);
                  e.target.value = '';
                }
              }}
            />
            <Button 
              type="button"
              onClick={() => {
                const input = document.querySelector('input[placeholder="Add custom role"]');
                handleAddCustomTeamRole(input.value);
                input.value = '';
              }}
              className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </Card> */}
 <Card className="p-6 mb-6">
      {formData.userOrgType && (
        <div className="space-y-4 mb-6">
          <CardTitle className="text-2xl font-bold">
            Team Roles Involved In The Workflow
          </CardTitle>

          <div className="grid grid-cols-1 gap-2">
            {allRoles.map(role => {
              const isSelected = formData.teamRoles.some(tr => tr.role === role);
              const selectedRole = formData.teamRoles.find(tr => tr.role === role);

              return (
                <div key={role} className="relative">
                  {!isSelected ? (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleAddTeamRole(role)}
                      className="w-full text-left justify-start break-words"
                    >
                      {role}
                    </Button>
                  ) : (
                    <div className="flex items-center bg-blue-600 text-white px-2 rounded-lg space-x-2">
                      <div className="flex items-center space-x-2 flex-1">
                        
                        <span className="flex-1 break-words">{role}</span>
                        <span className="text-sm font-semibold">Count:</span>
                        <Input 
                          type="text"
                          value={selectedRole.count}
                          onChange={(e) => handleUpdateRoleCount(role, e.target.value)}
                          className="w-16 md:w-20 bg-white/50 py-1 border-white/20 text-white placeholder-white/50"
                          min="1"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveRole(role)}
                        className="shrink-0 text-white hover:text-white/80 hover:bg-blue-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>

                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex space-x-2">
            <Input
              placeholder="Add custom role"
              value={customRoleInput}
              onChange={(e) => setCustomRoleInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleCustomRoleAdd();
                }
              }}
            />
            <Button 
              type="button"
              onClick={handleCustomRoleAdd}
              className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </Card>

{/* <Card className='p-6 mb-6'>
                  {formData.catOfWorkFlow && toolsMap[formData.catOfWorkFlow] && (
                    <div className="space-y-4 mb-6">
                      
                      <CardTitle className="text-2xl font-bold">
                      Tools Used
                      </CardTitle>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 ">
                        {toolsMap[formData.catOfWorkFlow].map(tool => (
                          <Button
                            type="button"
                            key={tool}
                            variant={formData.toolsUsed.includes(tool) ? "default" : "outline"}
                            onClick={() => handleAddTool(tool)}
                            className={`h-auto py-2 px-3 text-sm text-left justify-start break-words ${
                              formData.toolsUsed.includes(tool) 
                                ? "bg-blue-600 hover:bg-blue-700 text-white"
                                : ""
                            }`}
                          >
                            {tool}
                          </Button>
                        ))}
                      </div>

                     
                      <div className="space-y-2">
                        {formData.toolsUsed.map(tool => (
                          <div key={tool} className="flex items-center space-x-2 bg-blue-50 p-2 rounded-lg">
                            <span className="flex-1 break-words">{tool}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveTool(tool)}
                              className="shrink-0 hover:bg-blue-100 hover:text-blue-600"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>

                      
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Add custom tool"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              handleAddCustomTool(e.target.value);
                              e.target.value = '';
                            }
                          }}
                        />
                        <Button 
                          type="button"
                          onClick={() => {
                            const input = document.querySelector('input[placeholder="Add custom tool"]');
                            handleAddCustomTool(input.value);
                            input.value = '';
                          }}
                          className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}

</Card> */}
                  

                  <Card className="p-6 mb-6">
        {formData.catOfWorkFlow && toolsMap[formData.catOfWorkFlow] && (
          <div className="space-y-4 mb-6">
            <CardTitle className="text-2xl font-bold">
              Tools Used
            </CardTitle>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {allTools.map(tool => {
                const isSelected = formData.toolsUsed.includes(tool);

                return (
                  <div key={tool} className="relative">
                    {!isSelected ? (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleAddTool(tool)}
                        className="h-auto py-2 px-3 text-sm w-full text-left justify-start break-words"
                      >
                        {tool}
                      </Button>
                    ) : (
                      <div className="flex items-center bg-blue-600 text-white p-2 rounded-lg space-x-2">
                        <span className="flex-1 break-words text-sm">{tool}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveTool(tool)}
                          className="shrink-0 text-white hover:text-white/80 hover:bg-blue-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex space-x-2">
              <Input
                placeholder="Add custom tool"
                value={customToolInput}
                onChange={(e) => setCustomToolInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleCustomToolAdd();
                  }
                }}
              />
              <Button 
                type="button"
                onClick={handleCustomToolAdd}
                className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </Card>
<Card className='p-6 mb-4'>
                  {formData.catOfWorkFlow && (
                    <div className="space-y-4">
                      
                      <CardTitle className="text-2xl font-bold">
                      Workflow Steps
                      </CardTitle>
                      <div className="grid grid-cols-1 gap-2">
                        {stepsMap[formData.catOfWorkFlow]?.map((step) => {
                          const isSelected = formData.steps.some(s => s.step === step);
                          return (
                            <Button
                              type="button"
                              key={step}
                              variant={isSelected ? "default" : "outline"}
                              onClick={() => handleAddStep(step)}
                              className={`w-full text-left justify-start break-words ${
                                isSelected 
                                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                                  : ""
                              }`}
                              disabled={isSelected}
                            >
                              {step}
                            </Button>
                          );
                        })}
                      </div>

                      {/* Custom Step Input */}
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Add custom step"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              handleAddCustomStep(e.target.value);
                              e.target.value = '';
                            }
                          }}
                        />
                        <Button 
                          type="button"
                          onClick={() => {
                            const input = document.querySelector('input[placeholder="Add custom step"]');
                            handleAddCustomStep(input.value);
                            input.value = '';
                          }}
                          className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Selected Steps with DnD */}

                     

                      <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                      >
                        <SortableContext
                          items={formData.steps.map(step => step.step)}
                          strategy={verticalListSortingStrategy}
                        >
                          {formData.steps.map((step, index) => (
                            <SortableStep
                              key={step.step}
                              step={step}
                              index={index}
                              onRemove={(index) => {
                                const newSteps = formData.steps.filter((_, i) => i !== index);
                                setFormData(prev => ({ ...prev, steps: newSteps }));
                              }}
                              onUpdateStep={handleUpdateStep}
                              categoryName={formData.userOrgType}
                              teamRoles={teamRoleNames}  
                            />
                          ))}
                        </SortableContext>
                      </DndContext>
                       {formData.steps.length > 1 && (
                        <div className="display flex">
                          <p className='text-sm text-gray-500 ml-2'>
                            <i>Drag to reorder using &nbsp; </i>
                          </p>
                          <GripVertical className="h-5 w-5 text-gray-500" />
                        </div>
                      )}
                    </div>
                  )}
</Card>
                          <Button 
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-6"
                          >
                            Submit Workflow Data
                          </Button>
              </form>


          
          </div>
        )}
      </div>
     <pre className="p-4 bg-secondary rounded-lg overflow-auto">
         {JSON.stringify(formData, null, 2)}
      </pre> 
    </div>
  );
};

export default WorkflowForm;