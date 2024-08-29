"use client";
import { ChangeEvent, useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FormValues, useFormContext } from "@/context/formValueContext";
import { useStepContext } from "@/context/formContext";

function Form5() {
  const { formValues, setFormValues } = useFormContext();
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const { nextStep } = useStepContext();
  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, type } = event.target;
    if (type === "checkbox") {
      const { value, checked } = event.target as HTMLInputElement;
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: checked
          ? [...(prevValues[name as keyof FormValues] as string[]), value]
          : (prevValues[name as keyof FormValues] as string[]).filter(
              (item) => item !== value
            ),
      }));
    } else if (type === "file") {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file && file.size <= 10 * 1024 * 1024) {
        setFormValues((prevValues) => ({
          ...prevValues,
          [name]: file,
        }));
      } else {
        // Display an error message or handle the oversized file in some way
        alert("File size exceeds the limit (10 MB)");
      }
    } else {
      const value = event.target.value;
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
    nextStep(); // Log form values
  };

  return (
    <div>
      <>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <div className="mt-2">
              <Label className="text-sm font-bold" htmlFor="">
                Internal Collaboration
              </Label>
              {[
                "Messaging and Communication",
                "Notification",
                "Document sharing",
                "Real time Document editing",
              ].map((item) => (
                <div key={item} className="items-top flex space-x-2 mt-2">
                  <Input
                    name="InternalCollaboration"
                    type="checkbox"
                    value={item}
                    checked={formValues.InternalCollaboration.includes(item)}
                    onChange={handleChange}
                    className="w-5 h-5"
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label className="text-sm font-medium leading-none">
                      {item}
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-2">
              <Label className="text-sm font-bold" htmlFor="">
                External Collaboration
              </Label>
              {[
                "Messaging and Communication",
                "Notification",
                "Document sharing",
                "Real time Document editing",
              ].map((item) => (
                <div key={item} className="items-top flex space-x-2 mt-2">
                  <Input
                    name="ExternalCollaboration"
                    type="checkbox"
                    value={item}
                    checked={formValues.ExternalCollaboration.includes(item)}
                    onChange={handleChange}
                    className="w-5 h-5"
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label className="text-sm font-medium leading-none">
                      {item}
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-2">
              <Label className="text-sm font-bold" htmlFor="">
                Analytics and Reporting
              </Label>
              {[
                "Analytics dashboard",
                "Report generation",
                "Dashboard Customization",
                "Report Customization",
              ].map((item) => (
                <div key={item} className="items-top flex space-x-2 mt-2">
                  <Input
                    name="AnalyticsAndReporting"
                    type="checkbox"
                    value={item}
                    checked={formValues.AnalyticsAndReporting.includes(item)}
                    onChange={handleChange}
                    className="w-5 h-5"
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label className="text-sm font-medium leading-none">
                      {item}
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-2">
              <Label className="text-sm font-bold" htmlFor="">
                Tool Administration and Control
              </Label>
              {[
                "Multiple User role",
                "Granular Permission",
                "Information access control",
                "Role based access control",
              ].map((item) => (
                <div key={item} className="items-top flex space-x-2 mt-2">
                  <Input
                    name="ToolAdministrationAndControl"
                    type="checkbox"
                    value={item}
                    checked={formValues.ToolAdministrationAndControl.includes(
                      item
                    )}
                    onChange={handleChange}
                    className="w-5 h-5"
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label className="text-sm font-medium leading-none">
                      {item}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/*  */}
          {/* Client Management Software */}
          {formValues.category.includes("Client Management Software") && (
            <div>
              <div className="mt-2">
                <Label className="text-sm font-bold" htmlFor="">
                  Intake and Lead Management
                </Label>
                {["Tracking and capture", "Lead assignment", "Follow Up"].map(
                  (item) => (
                    <div key={item} className="items-top flex space-x-2 mt-2">
                      <Input
                        name="IntakeAndLeadManagement"
                        type="checkbox"
                        value={item}
                        checked={formValues.IntakeAndLeadManagement.includes(
                          item
                        )}
                        onChange={handleChange}
                        className="w-5 h-5"
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label className="text-sm font-medium leading-none">
                          {item}
                        </label>
                      </div>
                    </div>
                  )
                )}
              </div>

              <div className="mt-2">
                <Label className="text-sm font-bold" htmlFor="">
                  Client Portal
                </Label>
                {[
                  "Profile Management",
                  "Appointment Management",
                  "Task Tracking",
                  "Client Communication",
                ].map((item) => (
                  <div key={item} className="items-top flex space-x-2 mt-2">
                    <Input
                      name="ClientPortal"
                      type="checkbox"
                      value={item}
                      checked={formValues.ClientPortal.includes(item)}
                      onChange={handleChange}
                      className="w-5 h-5"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label className="text-sm font-medium leading-none">
                        {item}
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-2">
                <Label className="text-sm font-bold" htmlFor="">
                  Document Management
                </Label>
                {[
                  "Document creation",
                  "Document Templatization",
                  "Version control",
                  "Granular permissions",
                ].map((item) => (
                  <div key={item} className="items-top flex space-x-2 mt-2">
                    <Input
                      name="DocumentManagement"
                      type="checkbox"
                      value={item}
                      checked={formValues.DocumentManagement.includes(item)}
                      onChange={handleChange}
                      className="w-5 h-5"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label className="text-sm font-medium leading-none">
                        {item}
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-2">
                <Label className="text-sm font-bold" htmlFor="">
                  Case Alerts
                </Label>
                {[
                  "Event based notifications",
                  "Case schedules updates",
                  "Document changes alert",
                ].map((item) => (
                  <div key={item} className="items-top flex space-x-2 mt-2">
                    <Input
                      name="CaseAlerts"
                      type="checkbox"
                      value={item}
                      checked={formValues.CaseAlerts.includes(item)}
                      onChange={handleChange}
                      className="w-5 h-5"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label className="text-sm font-medium leading-none">
                        {item}
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-2">
                <Label className="text-sm font-bold" htmlFor="">
                  Budget, Expense and Time Tracking
                </Label>
                {[
                  "Budget Management",
                  "Time tracking",
                  "Approval Management",
                ].map((item) => (
                  <div key={item} className="items-top flex space-x-2 mt-2">
                    <Input
                      name="BudgetExpenseAndTimeTracking"
                      type="checkbox"
                      value={item}
                      checked={formValues.BudgetExpenseAndTimeTracking.includes(
                        item
                      )}
                      onChange={handleChange}
                      className="w-5 h-5"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label className="text-sm font-medium leading-none">
                        {item}
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-2">
                <Label className="text-sm font-bold" htmlFor="">
                  Client Billing and Invoicing
                </Label>
                {[
                  "Multiple fee arrangement",
                  "Invoice creation",
                  "Automated Invoicing",
                ].map((item) => (
                  <div key={item} className="items-top flex space-x-2 mt-2">
                    <Input
                      name="ClientBillingAndInvoicing"
                      type="checkbox"
                      value={item}
                      checked={formValues.ClientBillingAndInvoicing.includes(
                        item
                      )}
                      onChange={handleChange}
                      className="w-5 h-5"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label className="text-sm font-medium leading-none">
                        {item}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/*  */}

          {formValues.category.includes("Governance, Risk and Compliance") && (
            <div>
              <div className="mt-2">
                <Label className="text-sm font-bold" htmlFor="">
                  Policy Management
                </Label>
                {[
                  "Policy creation",
                  "Centralized repository",
                  "Version control",
                  "Policy reviews",
                  "Policy monitoring",
                ].map((item) => (
                  <div key={item} className="items-top flex space-x-2 mt-2">
                    <Input
                      name="PolicyManagement"
                      type="checkbox"
                      value={item}
                      checked={formValues.PolicyManagement.includes(item)}
                      onChange={handleChange}
                      className="w-5 h-5"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label className="text-sm font-medium leading-none">
                        {item}
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-2">
                <Label className="text-sm font-bold" htmlFor="">
                  Issue Management
                </Label>
                {[
                  "Incident reporting",
                  "Issue assessment",
                  "Action tracking",
                  "Response measuring",
                ].map((item) => (
                  <div key={item} className="items-top flex space-x-2 mt-2">
                    <Input
                      name="IssueManagement"
                      type="checkbox"
                      value={item}
                      checked={formValues.IssueManagement.includes(item)}
                      onChange={handleChange}
                      className="w-5 h-5"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label className="text-sm font-medium leading-none">
                        {item}
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-2">
                <Label className="text-sm font-bold" htmlFor="">
                  Laws, Compliance and Regulatory Tracking
                </Label>
                {[
                  "Sectoral relevance",
                  "Compliance applicability",
                  "Law and compliance updates",
                ].map((item) => (
                  <div key={item} className="items-top flex space-x-2 mt-2">
                    <Input
                      name="LawsComplianceAndRegulatoryTracking"
                      type="checkbox"
                      value={item}
                      checked={formValues.LawsComplianceAndRegulatoryTracking.includes(
                        item
                      )}
                      onChange={handleChange}
                      className="w-5 h-5"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label className="text-sm font-medium leading-none">
                        {item}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {formValues.category.includes("Contract Lifecycle Management") && (
            <div>
              <div className="mt-2">
                <Label className="text-sm font-bold" htmlFor="">
                  Contract Creation and Authoring
                </Label>
                {[
                  "Contract Authoring",
                  "Text Editor",
                  "Contract Templatization",
                  "Format Customization",
                  "Version control",
                ].map((item) => (
                  <div key={item} className="items-top flex space-x-2 mt-2">
                    <Input
                      name="ContractCreationAndAuthoring"
                      type="checkbox"
                      value={item}
                      checked={formValues.ContractCreationAndAuthoring.includes(
                        item
                      )}
                      onChange={handleChange}
                      className="w-5 h-5"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label className="text-sm font-medium leading-none">
                        {item}
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-2">
                <Label className="text-sm font-bold" htmlFor="">
                  Contract Repository
                </Label>
                {[
                  "Document Storage",
                  "Multiple file formats",
                  "Categorization and Retrieval",
                ].map((item) => (
                  <div key={item} className="items-top flex space-x-2 mt-2">
                    <Input
                      name="ContractRepository"
                      type="checkbox"
                      value={item}
                      checked={formValues.ContractRepository.includes(item)}
                      onChange={handleChange}
                      className="w-5 h-5"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label className="text-sm font-medium leading-none">
                        {item}
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-2">
                <Label className="text-sm font-bold" htmlFor="">
                  Contract Negotiation
                </Label>
                {[
                  "Collaboration workspace",
                  "Comments and Annotations",
                  "Messaging and Emailing",
                ].map((item) => (
                  <div key={item} className="items-top flex space-x-2 mt-2">
                    <Input
                      name="ContractNegotiation"
                      type="checkbox"
                      value={item}
                      checked={formValues.ContractNegotiation.includes(item)}
                      onChange={handleChange}
                      className="w-5 h-5"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label className="text-sm font-medium leading-none">
                        {item}
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-2">
                <Label className="text-sm font-bold" htmlFor="">
                  Lifecycle Management
                </Label>
                {[
                  "Approval Management",
                  "Milestone tracking",
                  "Obligation tracking",
                  "Calendar Alerts",
                ].map((item) => (
                  <div key={item} className="items-top flex space-x-2 mt-2">
                    <Input
                      name="LifecycleManagement"
                      type="checkbox"
                      value={item}
                      checked={formValues.LifecycleManagement.includes(item)}
                      onChange={handleChange}
                      className="w-5 h-5"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label className="text-sm font-medium leading-none">
                        {item}
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-2">
                <Label className="text-sm font-bold" htmlFor="">
                  Clause Library
                </Label>
                {[
                  "Clause Library",
                  "Text editor",
                  "Clause review and approval",
                  "Version control for clauses",
                ].map((item) => (
                  <div key={item} className="items-top flex space-x-2 mt-2">
                    <Input
                      name="ClauseLibrary"
                      type="checkbox"
                      value={item}
                      checked={formValues.ClauseLibrary.includes(item)}
                      onChange={handleChange}
                      className="w-5 h-5"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label className="text-sm font-medium leading-none">
                        {item}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {formValues.category.includes("Digital Signature") && (
            <div>
              <div className="mt-2">
                <Label className="text-sm font-bold" htmlFor="">
                  Fields Creation
                </Label>
                {[
                  "Signature fields",
                  "Multiple signature styles",
                  "Data fields",
                  "Customization and labelling",
                ].map((item) => (
                  <div key={item} className="items-top flex space-x-2 mt-2">
                    <Input
                      name="FieldsCreation"
                      type="checkbox"
                      value={item}
                      checked={formValues.FieldsCreation.includes(item)}
                      onChange={handleChange}
                      className="w-5 h-5"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label className="text-sm font-medium leading-none">
                        {item}
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-2">
                <Label className="text-sm font-bold" htmlFor="">
                  Tracking and Validity
                </Label>
                {[
                  "Legal validity",
                  "Audit trail",
                  "Document recording and retention",
                ].map((item) => (
                  <div key={item} className="items-top flex space-x-2 mt-2">
                    <Input
                      name="TrackingAndValidity"
                      type="checkbox"
                      value={item}
                      checked={formValues.TrackingAndValidity.includes(item)}
                      onChange={handleChange}
                      className="w-5 h-5"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label className="text-sm font-medium leading-none">
                        {item}
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-2">
                <Label className="text-sm font-bold" htmlFor="">
                  Document Management and Templates
                </Label>
                {[
                  "Document creation",
                  "Version control",
                  "Granular permission for collaborators",
                ].map((item) => (
                  <div key={item} className="items-top flex space-x-2 mt-2">
                    <Input
                      name="DocumentManagementAndTemplates"
                      type="checkbox"
                      value={item}
                      checked={formValues.DocumentManagementAndTemplates.includes(
                        item
                      )}
                      onChange={handleChange}
                      className="w-5 h-5"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label className="text-sm font-medium leading-none">
                        {item}
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-2">
                <Label className="text-sm font-bold" htmlFor="">
                  Document Capturing
                </Label>
                {["Document uploads", "Multiple file supports", "OCR"].map(
                  (item) => (
                    <div key={item} className="items-top flex space-x-2 mt-2">
                      <Input
                        name="DocumentCapturing"
                        type="checkbox"
                        value={item}
                        checked={formValues.DocumentCapturing.includes(item)}
                        onChange={handleChange}
                        className="w-5 h-5"
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label className="text-sm font-medium leading-none">
                          {item}
                        </label>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {formValues.category.includes("Legal Research") && (
            <div>
              <div className="mt-2">
                <Label className="text-sm font-bold" htmlFor="">
                  Case Law Research
                </Label>
                {[
                  "Comprehensive case law databases",
                  "Jurisdictional filters",
                  "Citation search and validation",
                  "Historical case law archives",
                ].map((item) => (
                  <div key={item} className="items-top flex space-x-2 mt-2">
                    <Input
                      name="CaseLawResearch"
                      type="checkbox"
                      value={item}
                      checked={formValues.CaseLawResearch.includes(item)}
                      onChange={handleChange}
                      className="w-5 h-5"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label className="text-sm font-medium leading-none">
                        {item}
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-2">
                <Label className="text-sm font-bold" htmlFor="">
                  Statutory Research
                </Label>
                {[
                  "Statutes and regulations databases",
                  "Annotations and historical versions",
                  "Legislative tracking and updates",
                  "Secondary Sources",
                  "Legal treatises and commentaries",
                  "Journals and law reviews",
                  "International treaties and conventions",
                ].map((item) => (
                  <div key={item} className="items-top flex space-x-2 mt-2">
                    <Input
                      name="StatutoryResearch"
                      type="checkbox"
                      value={item}
                      checked={formValues.StatutoryResearch.includes(item)}
                      onChange={handleChange}
                      className="w-5 h-5"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label className="text-sm font-medium leading-none">
                        {item}
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-2">
                <Label className="text-sm font-bold" htmlFor="">
                  Advanced Search Capabilities
                </Label>
                {[
                  "Search Functionality",
                  "Boolean and logical search",
                  "AI-powered search and chat",
                  "Document upload",
                ].map((item) => (
                  <div key={item} className="items-top flex space-x-2 mt-2">
                    <Input
                      name="AdvancedSearchCapabilities"
                      type="checkbox"
                      value={item}
                      checked={formValues.AdvancedSearchCapabilities.includes(item)}
                      onChange={handleChange}
                      className="w-5 h-5"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label className="text-sm font-medium leading-none">
                        {item}
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-2">
                <Label className="text-sm font-bold" htmlFor="">
                  Filter and Sorting
                </Label>
                {[
                  "Jurisdiction and court level",
                  "Date range and publication type",
                  "Relevance and citation frequency",
                ].map((item) => (
                  <div key={item} className="items-top flex space-x-2 mt-2">
                    <Input
                      name="FilterAndSorting"
                      type="checkbox"
                      value={item}
                      checked={formValues.FilterAndSorting.includes(item)}
                      onChange={handleChange}
                      className="w-5 h-5"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label className="text-sm font-medium leading-none">
                        {item}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {formValues.category.includes(
            "Document Management and Automation"
          ) && (
            <div>
              <div className="mt-2">
                <Label className="text-sm font-bold" htmlFor="">
                  Document Creation and Templates
                </Label>
                {[
                  "Document creation",
                  "Text editor",
                  "Document Templatization",
                  "Central repository",
                  "Co-authoring features",
                ].map((item) => (
                  <div key={item} className="items-top flex space-x-2 mt-2">
                    <Input
                      name="DocumentCreationAndTemplates"
                      type="checkbox"
                      value={item}
                      checked={formValues.DocumentCreationAndTemplates.includes(
                        item
                      )}
                      onChange={handleChange}
                      className="w-5 h-5"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label className="text-sm font-medium leading-none">
                        {item}
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-2">
                <Label className="text-sm font-bold" htmlFor="">
                  Document Search and Navigation
                </Label>
                {[
                  "Categorizing and tagging",
                  "Search capabilities",
                  "Filter and sorting",
                ].map((item) => (
                  <div key={item} className="items-top flex space-x-2 mt-2">
                    <Input
                      name="DocumentSearchAndNavigation"
                      type="checkbox"
                      value={item}
                      checked={formValues.DocumentSearchAndNavigation.includes(
                        item
                      )}
                      onChange={handleChange}
                      className="w-5 h-5"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label className="text-sm font-medium leading-none">
                        {item}
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-2">
                <Label className="text-sm font-bold" htmlFor="">
                  Authentication
                </Label>
                {[
                  "MFA (Multi factor Authentication)",
                  "Electronic signature capabilities.",
                ].map((item) => (
                  <div key={item} className="items-top flex space-x-2 mt-2">
                    <Input
                      name="Authentication"
                      type="checkbox"
                      value={item}
                      checked={formValues.Authentication.includes(item)}
                      onChange={handleChange}
                      className="w-5 h-5"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label className="text-sm font-medium leading-none">
                        {item}
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-2">
                <Label className="text-sm font-bold" htmlFor="">
                  Task allotment
                </Label>
                {[
                  "Customizable workflows",
                  "Internal work delegation",
                  "Task tracking",
                ].map((item) => (
                  <div key={item} className="items-top flex space-x-2 mt-2">
                    <Input
                      name="TaskAllotment"
                      type="checkbox"
                      value={item}
                      checked={formValues.TaskAllotment.includes(item)}
                      onChange={handleChange}
                      className="w-5 h-5"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label className="text-sm font-medium leading-none">
                        {item}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {formValues.category.includes("E-billing and Invoicing") && (
            <div>
              <div className="mt-2">
                <Label className="text-sm font-bold" htmlFor="">
                  Budgeting, Expense and Time Tracking
                </Label>
                {[
                  "Budget management",
                  "Time tracking",
                  "Multiple fee arrangements",
                  "Approval management",
                ].map((item) => (
                  <div key={item} className="items-top flex space-x-2 mt-2">
                    <Input
                      name="BudgetingExpenseAndTimeTracking"
                      type="checkbox"
                      value={item}
                      checked={formValues.BudgetingExpenseAndTimeTracking.includes(
                        item
                      )}
                      onChange={handleChange}
                      className="w-5 h-5"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label className="text-sm font-medium leading-none">
                        {item}
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-2">
                <Label className="text-sm font-bold" htmlFor="">
                  Client Management
                </Label>
                {[
                  "Central client repository",
                  "Client communications",
                  "Billing schedules",
                  "Payment processing",
                ].map((item) => (
                  <div key={item} className="items-top flex space-x-2 mt-2">
                    <Input
                      name="ClientManagement"
                      type="checkbox"
                      value={item}
                      checked={formValues.ClientManagement.includes(item)}
                      onChange={handleChange}
                      className="w-5 h-5"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label className="text-sm font-medium leading-none">
                        {item}
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-2">
                <Label className="text-sm font-bold" htmlFor="">
                  Invoice Generation and Review
                </Label>
                {[
                  "Customizable invoice templates",
                  "Automated invoice generation",
                  "Multiple currencies",
                  "Tax entries and calculations",
                  "Payment tracking and recording",
                ].map((item) => (
                  <div key={item} className="items-top flex space-x-2 mt-2">
                    <Input
                      name="InvoiceGenerationAndReview"
                      type="checkbox"
                      value={item}
                      checked={formValues.InvoiceGenerationAndReview.includes(
                        item
                      )}
                      onChange={handleChange}
                      className="w-5 h-5"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label className="text-sm font-medium leading-none">
                        {item}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {formValues.category.includes("E-discovery") && (
            <div>
              <div className="mt-2">
                <Label className="text-sm font-bold" htmlFor="">
                  Data Identification and Collection
                </Label>
                {[
                  "Data source identification",
                  "Remote Collection",
                  "Network-based collection",
                  "Forensic imaging",
                  "Custodian self-collection",
                  "Validation mechanisms",
                ].map((item) => (
                  <div key={item} className="items-top flex space-x-2 mt-2">
                    <Input
                      name="DataIdentificationAndCollection"
                      type="checkbox"
                      value={item}
                      checked={formValues.DataIdentificationAndCollection.includes(
                        item
                      )}
                      onChange={handleChange}
                      className="w-5 h-5"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label className="text-sm font-medium leading-none">
                        {item}
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-2">
                <Label className="text-sm font-bold" htmlFor="">
                  Search, Processing and Analysis
                </Label>
                {[
                  "Search functionality",
                  "Filter and sorting",
                  "Duplicity elimination",
                  "Data processing",
                  "Cluster similar documents",
                ].map((item) => (
                  <div key={item} className="items-top flex space-x-2 mt-2">
                    <Input
                      name="SearchProcessingAndAnalysis"
                      type="checkbox"
                      value={item}
                      checked={formValues.SearchProcessingAndAnalysis.includes(
                        item
                      )}
                      onChange={handleChange}
                      className="w-5 h-5"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label className="text-sm font-medium leading-none">
                        {item}
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-2">
                <Label className="text-sm font-bold" htmlFor="">
                  Review and Production
                </Label>
                {[
                  "Review and Analysis",
                  "Coding and annotations",
                  "Process control",
                  "Review workflow",
                  "Audit trail",
                ].map((item) => (
                  <div key={item} className="items-top flex space-x-2 mt-2">
                    <Input
                      name="ReviewAndProduction"
                      type="checkbox"
                      value={item}
                      checked={formValues.ReviewAndProduction.includes(item)}
                      onChange={handleChange}
                      className="w-5 h-5"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label className="text-sm font-medium leading-none">
                        {item}
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-2">
                <Label className="text-sm font-bold" htmlFor="">
                  Legal Hold Management
                </Label>
                {[
                  "Legal hold tracking",
                  "Legal hold notice management",
                  "Receipt Acknowledgement",
                  "Data custodian Management",
                ].map((item) => (
                  <div key={item} className="items-top flex space-x-2 mt-2">
                    <Input
                      name="LegalHoldManagement"
                      type="checkbox"
                      value={item}
                      checked={formValues.LegalHoldManagement.includes(item)}
                      onChange={handleChange}
                      className="w-5 h-5"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label className="text-sm font-medium leading-none">
                        {item}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {formValues.category.includes("Intellectual Property Management") && (
            <div>
              <div className="mt-2">
                <Label className="text-sm font-bold" htmlFor="">
                  Ideation and Creation
                </Label>
                {[
                  "Idea intake and management",
                  "Innovation workflow management",
                ].map((item) => (
                  <div key={item} className="items-top flex space-x-2 mt-2">
                    <Input
                      name="IdeationAndCreation"
                      type="checkbox"
                      value={item}
                      checked={formValues.IdeationAndCreation.includes(item)}
                      onChange={handleChange}
                      className="w-5 h-5"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label className="text-sm font-medium leading-none">
                        {item}
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-2">
                <Label className="text-sm font-bold" htmlFor="">
                  Lifecycle Management
                </Label>
                {[
                  "Workflow management system (IP lifecycle)",
                  "Renewal management",
                  "Management of licensing agreements, contracts",
                ].map((item) => (
                  <div key={item} className="items-top flex space-x-2 mt-2">
                    <Input
                      name="LifecycleManagement"
                      type="checkbox"
                      value={item}
                      checked={formValues.LifecycleManagement.includes(item)}
                      onChange={handleChange}
                      className="w-5 h-5"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label className="text-sm font-medium leading-none">
                        {item}
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-2">
                <Label className="text-sm font-bold" htmlFor="">
                  Search and Discovery
                </Label>
                {[
                  "Database integration",
                  "Advanced search capabilities",
                  "Filter and sorting",
                ].map((item) => (
                  <div key={item} className="items-top flex space-x-2 mt-2">
                    <Input
                      name="SearchAndDiscovery"
                      type="checkbox"
                      value={item}
                      checked={formValues.SearchAndDiscovery.includes(item)}
                      onChange={handleChange}
                      className="w-5 h-5"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label className="text-sm font-medium leading-none">
                        {item}
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-2">
                <Label className="text-sm font-bold" htmlFor="">
                  Storage and Repository
                </Label>
                {[
                  "Centralized repository",
                  "Categorization and tagging",
                  "Accessibility control",
                  "Access audit",
                ].map((item) => (
                  <div key={item} className="items-top flex space-x-2 mt-2">
                    <Input
                      name="StorageAndRepository"
                      type="checkbox"
                      value={item}
                      checked={formValues.StorageAndRepository.includes(item)}
                      onChange={handleChange}
                      className="w-5 h-5"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label className="text-sm font-medium leading-none">
                        {item}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {formValues.category.includes(
            "Litigation Management and Analytics"
          ) && (
            <div>
              <div className="mt-2">
                <Label className="text-sm font-bold" htmlFor="">
                  Matter Lifecycle Tracking
                </Label>
                {["Task management", "Document organisation"].map((item) => (
                  <div key={item} className="items-top flex space-x-2 mt-2">
                    <Input
                      name="MatterLifecycleTracking"
                      type="checkbox"
                      value={item}
                      checked={formValues.MatterLifecycleTracking.includes(
                        item
                      )}
                      onChange={handleChange}
                      className="w-5 h-5"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label className="text-sm font-medium leading-none">
                        {item}
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-2">
                <Label className="text-sm font-bold" htmlFor="">
                  Court and Case Search
                </Label>
                {[
                  "Automated case alerts",
                  "Court docket systems",
                  "Real-time updates",
                ].map((item) => (
                  <div key={item} className="items-top flex space-x-2 mt-2">
                    <Input
                      name="CourtAndCaseSearch"
                      type="checkbox"
                      value={item}
                      checked={formValues.CourtAndCaseSearch.includes(item)}
                      onChange={handleChange}
                      className="w-5 h-5"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label className="text-sm font-medium leading-none">
                        {item}
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-2">
                <Label className="text-sm font-bold" htmlFor="">
                  Budget, Expense and Time Tracking
                </Label>
                {[
                  "Budget Management",
                  "Time tracking",
                  "Approval Management",
                  "Client invoicing",
                  "Payment processing",
                ].map((item) => (
                  <div key={item} className="items-top flex space-x-2 mt-2">
                    <Input
                      name="BudgetExpenseAndTimeTracking"
                      type="checkbox"
                      value={item}
                      checked={formValues.BudgetExpenseAndTimeTracking.includes(
                        item
                      )}
                      onChange={handleChange}
                      className="w-5 h-5"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label className="text-sm font-medium leading-none">
                        {item}
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-2">
                <Label className="text-sm font-bold" htmlFor="">
                  Litigation Docketing Features
                </Label>
                {[
                  "Collaborative timeline tracking",
                  "Court Rule tracking",
                  "Court database integration",
                  "Customized docket entries",
                ].map((item) => (
                  <div key={item} className="items-top flex space-x-2 mt-2">
                    <Input
                      name="LitigationDocketingFeatures"
                      type="checkbox"
                      value={item}
                      checked={formValues.LitigationDocketingFeatures.includes(
                        item
                      )}
                      onChange={handleChange}
                      className="w-5 h-5"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label className="text-sm font-medium leading-none">
                        {item}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {formValues.category.includes("Legal Workflow Automation") && (
              <div>
              <div className="mt-2">
                <Label className="text-sm font-bold" htmlFor="">
                Workflow design and configuration

                </Label>
                {[
                 
                 " Workflow designer ",
                  "Branching",
                 " Task management ",
                 " Data routing" ,
                "  Workflow templates "

                ].map((item) => (
                  <div key={item} className="items-top flex space-x-2 mt-2">
                    <Input
                      name="IdeationAndCreation"
                      type="checkbox"
                      value={item}
                      checked={formValues.legalWorkflow.includes(item)}
                      onChange={handleChange}
                      className="w-5 h-5"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label className="text-sm font-medium leading-none">
                        {item}
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-2">
                <Label className="text-sm font-bold" htmlFor="">
                Assignment allotment and tracking


                </Label>
                {[
                 "Task creation",
                 "Task allotment",
                 "Task tracking"
                ].map((item) => (
                  <div key={item} className="items-top flex space-x-2 mt-2">
                    <Input
                      name="LifecycleManagement"
                      type="checkbox"
                      value={item}
                      checked={formValues.legalWorkflow.includes(item)}
                      onChange={handleChange}
                      className="w-5 h-5"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label className="text-sm font-medium leading-none">
                        {item}
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-2">
                <Label className="text-sm font-bold" htmlFor="">
                Document creation and management

                </Label>
                {[
                 "Document creation",
                  "Templatization",
                  "indexing and tagging of documents" ,
                  "Document search and retrieval"
                  
                ].map((item) => (
                  <div key={item} className="items-top flex space-x-2 mt-2">
                    <Input
                      name="SearchAndDiscovery"
                      type="checkbox"
                      value={item}
                      checked={formValues.legalWorkflow.includes(item)}
                      onChange={handleChange}
                      className="w-5 h-5"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label className="text-sm font-medium leading-none">
                        {item}
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-2">
                <Label className="text-sm font-bold" htmlFor="">
                Laws, Compliance and Regulatory tracking

                </Label>
                {[
                 " Sectoral differentiation",
                "  Compliance applicability",
                "  Law and compliance updates"
                  
                ].map((item) => (
                  <div key={item} className="items-top flex space-x-2 mt-2">
                    <Input
                      name="StorageAndRepository"
                      type="checkbox"
                      value={item}
                      checked={formValues.StorageAndRepository.includes(item)}
                      onChange={handleChange}
                      className="w-5 h-5"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label className="text-sm font-medium leading-none">
                        {item}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-4 flex flex-col md:flex-row items-center gap-4">
            <Button type="submit" className="bg-primary1" disabled={loading}>
              {loading ? "Saving" : "Next"}
            </Button>
          </div>
        </form>
      </>
    </div>
  );
}

export default Form5;
