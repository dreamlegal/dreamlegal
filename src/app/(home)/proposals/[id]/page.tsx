
"use client"

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { 
  Edit2, Save, AlertCircle, Activity, 
  Calendar, Settings, Target, Sparkles,
  CheckCircle2, Users, Building2, FileText,
  Plus, X, Briefcase, Trash2, Check
} from 'lucide-react';

// Enhanced editable text component with smooth transitions
const EditableParagraph = ({ text, onSave, onCancel, onDelete }) => {
  const [value, setValue] = useState(text);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative group bg-white rounded-lg shadow-sm p-4 transition-all duration-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="min-h-[100px] w-full pr-24 focus:ring-2 focus:ring-indigo-500 transition-all duration-200 resize-none"
        rows={3}
        autoFocus
      />
      <div 
        className={`absolute top-6 right-6 flex gap-2 transition-all duration-200 ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
        }`}
      >
        <Button 
          size="sm" 
          variant="ghost" 
          className="text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
          onClick={onDelete}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
        <Button 
          size="sm" 
          variant="ghost" 
          className="text-gray-500 hover:bg-gray-50"
          onClick={onCancel}
        >
          <X className="w-4 h-4" />
        </Button>
        <Button 
          size="sm" 
          className="bg-indigo-500 text-white hover:bg-indigo-600"
          onClick={() => onSave(value)}
        >
          <Check className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

// Enhanced text display component
const TextDisplay = ({ text, onEdit, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative group bg-white rounded-lg p-4 hover:shadow-md transition-all duration-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="text-gray-700 pr-20">{text}</div>
      <div 
        className={`absolute top-4 right-4 flex gap-2 transition-all duration-200 ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
        }`}
      >
        <Button 
          size="sm" 
          variant="ghost" 
          className="text-red-500 hover:bg-red-50 hover:text-red-600"
          onClick={onDelete}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
        <Button 
          size="sm" 
          variant="ghost"
          className="text-gray-500 hover:bg-gray-50"
          onClick={onEdit}
        >
          <Edit2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};


const ProposalDisplay = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [proposal, setProposal] = useState(null);
  const [editingItems, setEditingItems] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [versionName, setVersionName] = useState('');

  useEffect(() => {
    fetchProposal();
  }, [params.id]);

  const fetchProposal = async () => {
    try {
      const response = await fetch('/api/get-proposal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ proposalId: params.id })
      });
      
      const data = await response.json();
      if (response.ok) {
        setProposal(data.currentContent);
      } else {
        throw new Error(data.error || 'Failed to fetch proposal');
      }
    } catch (error) {
      console.error('Error fetching proposal:', error);
      alert('Failed to fetch proposal');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (path) => {
    setEditingItems(prev => ({
      ...prev,
      [path]: true
    }));
  };

  const handleSave = async (path, newValue) => {
    const pathSegments = path.split('.');
    const lastSegment = pathSegments[pathSegments.length - 1];
    
    setProposal(prev => {
      const newProposal = { ...prev };
      let current = newProposal;
      
      for (let i = 0; i < pathSegments.length - 1; i++) {
        current = current[pathSegments[i]];
      }
      
      if (Array.isArray(current)) {
        current[parseInt(lastSegment)] = newValue;
      } else {
        current[lastSegment] = newValue;
      }
      
      return newProposal;
    });
    
    setEditingItems(prev => ({
      ...prev,
      [path]: false
    }));
  };

  const handleCancel = (path) => {
    setEditingItems(prev => ({
      ...prev,
      [path]: false
    }));
  };

  const handleDelete = (path) => {
    const pathSegments = path.split('.');
    const lastSegment = pathSegments[pathSegments.length - 1];
    
    setProposal(prev => {
      const newProposal = { ...prev };
      let current = newProposal;
      
      for (let i = 0; i < pathSegments.length - 1; i++) {
        current = current[pathSegments[i]];
      }
      
      if (Array.isArray(current)) {
        current.splice(parseInt(lastSegment), 1);
      } else {
        delete current[lastSegment];
      }
      
      return newProposal;
    });
  };

  const handleAddItem = (path) => {
    setProposal(prev => {
      const newProposal = { ...prev };
      let current = newProposal;
      const pathSegments = path.split('.');
      
      for (const segment of pathSegments) {
        if (!current[segment]) {
          current[segment] = [];
        }
        current = current[segment];
      }
      
      if (Array.isArray(current)) {
        current.push('New item');
      }
      
      return newProposal;
    });
  };

  const handleSaveVersion = async () => {
    if (!versionName.trim()) {
      alert('Please enter a version name');
      return;
    }
    console.log(proposal)

    try {
      const response = await fetch('/api/save-proposal-version', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          proposalId: params.id,
          name: versionName,
          content: proposal
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setProposal(data.currentContent);
        setIsModalOpen(false);
        setVersionName('');
        alert('Version saved successfully');
      } else {
        throw new Error(data.error || 'Failed to save version');
      }
    } catch (error) {
      console.error('Error saving version:', error);
      alert(error.message || 'Failed to save version');
    }
  };

  const getIconForSection = (sectionKey) => {
    const iconMap = {
      'Problems Addressed': AlertCircle,
      'Pain Points': Briefcase,
      'Product Overview': Briefcase,
      'Top Features': Sparkles,
      'Top Functionalities': Settings,
      'Best Version of Product': CheckCircle2,
      'Testimonials': Users,
      'About the company': Building2,
      'Company Description': Building2,
      'Analysis of Customer Preferences': Activity,
      'Particular Requirements': FileText,
      'How the Product Can Help': CheckCircle2
    };
    
    const key = Object.keys(iconMap).find(k => 
      sectionKey.toLowerCase().includes(k.toLowerCase())
    );
    
    return iconMap[key] || FileText;
  };

  const renderContent = (content, path) => {
    if (!content) return null;
    
    if (typeof content === 'string') {
      const isEditing = editingItems[path];
      
      return isEditing ? (
        <EditableParagraph
          text={content}
          onSave={(newValue) => handleSave(path, newValue)}
          onCancel={() => handleCancel(path)}
          onDelete={() => handleDelete(path)}
        />
      ) : (
        <TextDisplay
          text={content}
          onEdit={() => handleEdit(path)}
          onDelete={() => handleDelete(path)}
        />
      );
    }
    
    if (Array.isArray(content)) {
      return (
        <div className="space-y-4">
          {content.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
              {typeof item === 'object' ? (
                <div className="p-4">
                  {(item.Feature || item.functionality) && (
                    <h4 className="font-semibold text-indigo-600 mb-2">
                      {item.Feature || item.functionality}
                    </h4>
                  )}
                  
                  {item.Details && (
                    <div className="ml-4 space-y-3">
                      {Array.isArray(item.Details) 
                        ? item.Details.map((detail, idx) => (
                            <div key={idx}>
                              {editingItems[`${path}.Details.${idx}`] ? (
                                <EditableParagraph
                                  text={detail}
                                  onSave={(newValue) => handleSave(`${path}.Details.${idx}`, newValue)}
                                  onCancel={() => handleCancel(`${path}.Details.${idx}`)}
                                  onDelete={() => handleDelete(`${path}.Details.${idx}`)}
                                />
                              ) : (
                                <TextDisplay
                                  text={detail}
                                  onEdit={() => handleEdit(`${path}.Details.${idx}`)}
                                  onDelete={() => handleDelete(`${path}.Details.${idx}`)}
                                />
                              )}
                            </div>
                          ))
                        : <div className="text-gray-700">{item.Details}</div>
                      }
                    </div>
                  )}
                  
                  {item.features && (
                    <div className="mt-4 space-y-3">
                      {item.features.map((feature, idx) => (
                        <div key={idx}>
                          {editingItems[`${path}.features.${idx}`] ? (
                            <EditableParagraph
                              text={feature}
                              onSave={(newValue) => handleSave(`${path}.features.${idx}`, newValue)}
                              onCancel={() => handleCancel(`${path}.features.${idx}`)}
                              onDelete={() => handleDelete(`${path}.features.${idx}`)}
                            />
                          ) : (
                            <TextDisplay
                              text={feature}
                              onEdit={() => handleEdit(`${path}.features.${idx}`)}
                              onDelete={() => handleDelete(`${path}.features.${idx}`)}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {item.Name && (
                    <div className="mt-4 border-l-4 border-indigo-500 pl-4 py-2 bg-indigo-50 rounded-r-lg">
                      <p className="font-semibold text-indigo-900">{item.Name}</p>
                      <p className="text-sm text-indigo-600">
                        {item.Designation} at {item.Organization}
                      </p>
                      <p className="mt-2 italic text-gray-700">"{item.Message}"</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-4">
                  {renderContent(item, `${path}.${index}`)}
                </div>
              )}
            </div>
          ))}
          {/* <AddItemButton onAdd={() => handleAddItem(path)} /> */}
        </div>
      );
    }
    
    if (typeof content === 'object' && content !== null) {
      return (
        <div className="space-y-6">
          {Object.entries(content).map(([key, value]) => {
            if (['id', 'createdAt', 'updatedAt'].includes(key)) return null;
            
            if (['CE', 'COI', 'ROI'].includes(key)) {
              const titles = {
                'CE': 'Competitive Edge',
                'COI': 'Cost of Inaction',
                'ROI': 'Return on Investment'
              };
              
              return (
                <div key={key} className="bg-white rounded-lg p-6 shadow-sm">
                <h4 className="font-semibold text-lg text-indigo-600 mb-4">{titles[key]}</h4>
                {renderContent(value, `${path}.${key}`)}
              </div>
            );
          }
          
          return (
            <div key={key} className="bg-white rounded-lg p-6 shadow-sm">
              <h4 className="font-semibold text-lg text-indigo-600 mb-4">
                {key.replace(/[•-]\s?/g, '')}
              </h4>
              {renderContent(value, `${path}.${key}`)}
            </div>
          );
        })}
      </div>
    );
  }
  
  return null;
};

const Section = ({ title, sectionKey, icon: Icon }) => {
  if (!proposal[sectionKey] || 
      (Array.isArray(proposal[sectionKey]) && proposal[sectionKey].length === 0) ||
      (typeof proposal[sectionKey] === 'object' && Object.keys(proposal[sectionKey]).length === 0)) {
    return null;
  }

  return (
    <Card className="overflow-hidden transform hover:scale-[1.01] transition-transform duration-300 shadow-xl rounded-xl border-0 bg-gradient-to-r from-white to-gray-50">
      <CardContent className="p-8">
        <div className="flex items-center gap-4 mb-6">
          {Icon && (
            <div className="p-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg transform hover:scale-110 transition-transform duration-200">
              <Icon className="w-6 h-6 text-white" />
            </div>
          )}
          <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {title}
          </h3>
        </div>
        <div className="space-y-6">
          {renderContent(proposal[sectionKey], sectionKey)}
        </div>
      </CardContent>
    </Card>
  );
};

const proposalId = params.id;

const [isSaving, setIsSaving] = useState(false);

  const handleSaveToDashboard = async () => {
    if (isSaving) return;
    
    setIsSaving(true);
    try {
      const response = await fetch('/api/save-proposal-to-dashboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ proposalId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save to dashboard');
      }

      alert('Proposal saved to dashboard successfully');
      
    } catch (error) {
      console.error('Error saving to dashboard:', error);
      alert(error.message || 'Failed to save to dashboard');
    } finally {
      setIsSaving(false);
    }
  };
if (loading) {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
    </div>
  );
}

const sections = Object.keys(proposal || {}).filter(key => 
  !['id', 'createdAt', 'updatedAt'].includes(key)
);

return (
  <div className="pt-20 pb-12">
    <div className="max-w-4xl mx-auto space-y-8 px-4">
      {/* Header */}
      <div className="text-center space-y-6 py-8">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          {proposal?.Title || "AI-Generated Business Proposal"}
        </h2>
        <div className="flex justify-end">
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-200"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Version
          </Button>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-8">
        {sections.map(sectionKey => (
          <Section
            key={sectionKey}
            title={sectionKey.replace(/([A-Z])/g, ' $1').trim()}
            sectionKey={sectionKey}
            icon={getIconForSection(sectionKey)}
          />
        ))}
      </div>

      <div className="flex justify-center pt-8 space-x-4">
        <Button
        size="lg"
          onClick={handleSaveToDashboard}
          disabled={isSaving}
          className="bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 transform hover:scale-105 transition-all duration-200 disabled:opacity-50"
        >
          <CheckCircle2 className="w-4 h-4 mr-2" />
          {isSaving ? 'Saving...' : 'Save to Dashboard'}
        </Button>

        <Button
          size="lg"
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg transform hover:scale-105 transition-all duration-200"
          onClick={() => console.log(JSON.stringify(proposal, null, 2))}
        >
          Export Proposal
        </Button>
      </div>

      {/* Save Version Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-900">Save New Version</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="Enter version name..."
              value={versionName}
              onChange={(e) => setVersionName(e.target.value)}
              className="focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsModalOpen(false)}
              className="hover:bg-gray-100"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSaveVersion}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600"
            >
              Save 
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  </div>
);
};

export default ProposalDisplay;