

import React, { useState } from "react";
import { ChevronDown, X, Check, Pencil } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ProfilePage = ({ data, userId }) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(data.profile);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Your existing options arrays
  const toolOptions = ["Dashboard Customization", "Analytics Dashboard"];
  const goalOptions = ["Time management", "Improving client services", "Client Satisfaction", "Process Optimization"];
  const languageOptions = ["English", "Spanish", "French"];
  const industryOptions = ["Agriculture", "Banking", "Healthcare"];
  const practiceAreaOptions = ["Appellate Law", "Corporate Law"];
  const workTypeOptions = ["Drafting", "Consulting", "Advisory", "Litigation"];
  const organizationTypes = [
    "Law firms",
    "Enterprises",
    "Individual Practitioners",
    "Startups",
    "Government Departments",
    "Judiciary",
    "In-House Counsels"
  ];
  const teamSizes = ["1", "2-20", "21-50", "51- 200", "201-500", "500+"];

  const handleSave = async () => {
    try {
      setIsSubmitting(true);
      console.log("Sending profile update request with data:", profile);
      
      const response = await fetch("/api/edit-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          editing: true,
          // Map all profile fields to API expected fields
          Contact: profile.Contact,
          Location: profile.Location,
          Address: profile.Address,
          TeamSize: profile.TeamSize,
          Designation: profile.Designation,
          CompanyType: profile.OrgType,
          CompanyAddress: profile.CompanyAddress,
          CompanyEmail: profile.CompanyEmail,
          primaryLanguages: profile.PrimaryLanguage,
          industries: profile.Industry,
          practiceAreas: profile.PracticeArea,
          workTypes: profile.WorkType,
          goals: profile.Goals,
          existingTools: profile.ExistingTools,
        }),
      });

      const result = await response.json();
      console.log("API Response:", result);

      if (result.success) {
        toast({
          title: "Success",
          description: "Profile updated successfully",
          variant: "default",
        });
        setIsEditing(false);
      } else {
        throw new Error(result.msg || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    console.log(`Updating field: ${field} with value:`, value);
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  
  const CustomInput = ({ label, value, onChange, disabled = false }) => (
    <div className="relative group">
      <label className="absolute -top-2 left-3 bg-white px-1 text-xs font-medium text-indigo-400 z-10">
        {label}
      </label>
      <input
        type="text"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm transition-all duration-200 
                 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 focus:outline-none 
                 disabled:bg-gray-50 group-hover:border-indigo-200"
      />
    </div>
  );

  const CustomSelect = ({ label, field, options }) => {
    const isOpen = activeDropdown === field;
    const selectedValue = profile?.[field] || "";

    return (
      <div className="relative group">
        <label className="absolute -top-2 left-3 bg-white px-1 text-xs font-medium text-indigo-400 z-10">
          {label}
        </label>
        <div
          onClick={() => isEditing && setActiveDropdown(isOpen ? null : field)}
          className={`relative w-full rounded-xl border bg-white px-4 py-3.5 cursor-pointer transition-all duration-200
            ${isOpen ? "border-indigo-400 ring-2 ring-indigo-50" : "border-gray-200"}
            ${isEditing ? "group-hover:border-indigo-200" : "pointer-events-none bg-gray-50"}`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-sm ${selectedValue ? "text-gray-900" : "text-gray-400"}`}>
              {selectedValue || "Select option..."}
            </span>
            {isEditing && (
              <ChevronDown
                size={16}
                className={`text-indigo-400 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            )}
          </div>
        </div>
        {isOpen && (
          <div className="absolute z-50 mt-2 w-full rounded-xl border border-gray-200 bg-white py-1.5 shadow-lg 
                         ring-1 ring-black ring-opacity-5 backdrop-blur-sm">
            {options.map((option) => (
              <div
                key={option}
                onClick={() => {
                  handleInputChange(field, option);
                  setActiveDropdown(null);
                }}
                className="flex cursor-pointer items-center px-4 py-2.5 text-sm transition-colors hover:bg-indigo-50"
              >
                <div
                  className={`mr-3 flex h-5 w-5 items-center justify-center rounded-md border transition-colors
                    ${
                      selectedValue === option
                        ? "border-indigo-400 bg-gradient-to-r from-indigo-400 to-purple-400"
                        : "border-gray-300"
                    }`}
                >
                  {selectedValue === option && (
                    <Check size={12} className="text-white" />
                  )}
                </div>
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const CustomMultiSelect = ({ label, field, options }) => {
    const isOpen = activeDropdown === field;
    const selectedValues = profile?.[field] || [];

    const toggleOption = (option) => {
      const newValues = selectedValues.includes(option)
        ? selectedValues.filter((v) => v !== option)
        : [...selectedValues, option];
      handleInputChange(field, newValues);
    };

    const removeOption = (option, e) => {
      e.stopPropagation();
      handleInputChange(
        field,
        selectedValues.filter((v) => v !== option)
      );
    };

    return (
      <div className="relative group">
        <label className="absolute -top-2 left-3 bg-white px-1 text-xs font-medium text-indigo-400 z-10">
          {label}
        </label>
        <div
          onClick={() => isEditing && setActiveDropdown(isOpen ? null : field)}
          className={`min-h-[52px] w-full rounded-xl border bg-white px-3 py-2.5 cursor-pointer transition-all duration-200
            ${isOpen ? "border-indigo-400 ring-2 ring-indigo-50" : "border-gray-200"}
            ${isEditing ? "group-hover:border-indigo-200" : "pointer-events-none bg-gray-50"}`}
        >
          <div className="flex flex-wrap gap-2">
            {selectedValues.map((value) => (
              <span
                key={value}
                className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 
                         px-2.5 py-1.5 text-xs font-medium text-indigo-600"
              >
                {value}
                {isEditing && (
                  <X
                    size={14}
                    className="cursor-pointer hover:text-indigo-800 transition-colors"
                    onClick={(e) => removeOption(value, e)}
                  />
                )}
              </span>
            ))}
            {selectedValues.length === 0 && (
              <span className="text-sm text-gray-400">Select options...</span>
            )}
          </div>
          {isEditing && (
            <ChevronDown
              size={16}
              className={`absolute right-3 top-4 text-indigo-400 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          )}
        </div>
        {isOpen && (
          <div className="absolute z-50 mt-2 w-full rounded-xl border border-gray-200 bg-white py-1.5 shadow-lg 
                         ring-1 ring-black ring-opacity-5 backdrop-blur-sm">
            {options.map((option) => (
              <div
                key={option}
                onClick={() => toggleOption(option)}
                className="flex cursor-pointer items-center px-4 py-2.5 text-sm transition-colors hover:bg-indigo-50"
              >
                <div
                  className={`mr-3 flex h-5 w-5 items-center justify-center rounded-md border transition-colors
                    ${
                      selectedValues.includes(option)
                        ? "border-indigo-400 bg-gradient-to-r from-indigo-400 to-purple-400"
                        : "border-gray-300"
                    }`}
                >
                  {selectedValues.includes(option) && (
                    <Check size={12} className="text-white" />
                  )}
                </div>
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const TileSelect = ({ label, field, options }) => {
    const selectedValues = profile?.[field] || [];

    if (!isEditing) {
      return (
        <div className="space-y-2">
          <label className="text-sm font-medium text-indigo-400">{label}</label>
          <div className="flex flex-wrap gap-2">
            {selectedValues.map((value) => (
              <span
                key={value}
                className="inline-flex items-center rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 
                         px-3 py-2 text-sm font-medium text-indigo-600"
              >
                {value}
              </span>
            ))}
            {selectedValues.length === 0 && (
              <span className="text-sm text-gray-400">None selected</span>
            )}
          </div>
        </div>
      );
    }

    const toggleOption = (option) => {
      const newValues = selectedValues.includes(option)
        ? selectedValues.filter((v) => v !== option)
        : [...selectedValues, option];
      handleInputChange(field, newValues);
    };

    return (
      <div className="space-y-3">
        <label className="text-sm font-medium text-indigo-400">{label}</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {options.map((option) => {
            const isSelected = selectedValues.includes(option);
            return (
              <div
                key={option}
                onClick={() => toggleOption(option)}
                className={`group relative cursor-pointer overflow-hidden rounded-lg border-2 p-2.5
                          transition-all duration-300 hover:border-indigo-300
                          ${
                            isSelected
                              ? "border-indigo-400 bg-gradient-to-r from-indigo-50 to-purple-50"
                              : "border-gray-100 hover:shadow-sm"
                          }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r from-indigo-100 to-purple-100 
                              transition-transform duration-300 group-hover:translate-y-0 
                              ${isSelected ? "translate-y-0" : "translate-y-full"}`} 
                />
                
                <div className="relative flex items-center justify-between gap-2">
                  <span className={`text-xs font-medium transition-colors
                                ${isSelected ? "text-indigo-600" : "text-gray-600"}
                                group-hover:text-indigo-500`}>
                    {option}
                  </span>
                  
                  <div className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-md 
                                border transition-colors duration-300
                                ${
                                  isSelected
                                    ? "border-indigo-400 bg-gradient-to-r from-indigo-400 to-purple-400"
                                    : "border-gray-200 group-hover:border-indigo-200"
                                }`}>
                    {isSelected && <Check size={10} className="text-white" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };


  // Your existing input components (CustomInput, CustomSelect, CustomMultiSelect, TileSelect)
  // ... [Keep all your existing component definitions here]

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md">
      <div className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white px-8 py-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Profile Details
          </h3>
          <button
            onClick={() => setIsEditing(!isEditing)}
            disabled={isSubmitting}
            className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium
                     text-indigo-600 transition-all duration-200 hover:border-indigo-200 hover:bg-indigo-50
                     hover:shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Pencil size={14} />
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>
      </div>
      <div className="p-8">
        <div className="grid gap-8">
          {/* Keep your existing form layout */}
          <div className="grid gap-6 md:grid-cols-2">
            <CustomInput
              label="Designation"
              value={profile?.Designation}
              onChange={(value) => handleInputChange("Designation", value)}
              disabled={!isEditing}
            />
            <CustomInput
              label="Company Name"
              value={profile?.CompanyAddress}
              onChange={(value) => handleInputChange("CompanyAddress", value)}
              disabled={!isEditing}
            />
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <CustomSelect
              label="Organisation Type"
              field="OrgType"
              options={organizationTypes}
            />
            <CustomSelect
              label="Team Size"
              field="TeamSize"
              options={teamSizes}
            />
          </div>

          <CustomInput
            label="Country"
            value={profile?.Location}
            onChange={(value) => handleInputChange("Location", value)}
            disabled={!isEditing}
          />

          <div className="grid gap-6 md:grid-cols-2">
            <CustomMultiSelect
              label="Existing Tools"
              field="ExistingTools"
              options={toolOptions}
            />
            <CustomMultiSelect
              label="Industry"
              field="Industry"
              options={industryOptions}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <CustomMultiSelect
              label="Practice Areas"
              field="PracticeArea"
              options={practiceAreaOptions}
            />
            <CustomMultiSelect
              label="Primary Languages"
              field="PrimaryLanguage"
              options={languageOptions}
            />
          </div>

          <div className="space-y-8 pt-4 border-t border-gray-100">
            <TileSelect
              label="Goals"
              field="Goals"
              options={goalOptions}
            />
            
            <TileSelect
              label="Work Types"
              field="WorkType"
              options={workTypeOptions}
            />
          </div>
        </div>

        {isEditing && (
          <div className="mt-10 flex justify-end gap-4">
            <button
              onClick={() => setIsEditing(false)}
              disabled={isSubmitting}
              className="rounded-xl border border-gray-200 bg-white px-6 py-2.5 text-sm font-medium
                       text-gray-600 transition-all duration-200 hover:border-gray-300 
                       hover:bg-gray-50 hover:shadow-md active:scale-95 
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSubmitting}
              className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-2.5 
                       text-sm font-medium text-white shadow-lg shadow-indigo-200 
                       transition-all duration-200 hover:from-indigo-600 hover:to-purple-600 
                       hover:shadow-xl hover:shadow-indigo-300 active:scale-95
                       disabled:opacity-50 disabled:cursor-not-allowed
                       flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin">⌛</span>
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;