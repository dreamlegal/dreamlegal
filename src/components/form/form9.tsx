"use client";
import { FormValues, useFormContext } from "@/context/formValueContext";
import {
  ChangeEvent,
  useEffect,
  useOptimistic,
  useState,
  useTransition,
} from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useStepContext } from "@/context/formContext";
import { useToast } from "../ui/use-toast";

function Form9({ editing }: { editing: boolean }) {
  const { formValues, setFormValues } = useFormContext();
  let [isPending, startTransition] = useTransition();
  const [logoUrl, setLogoUrl] = useState("");
  const [imagesUrl, setImagesUrl] = useState<string[]>([]);
  const [AttachmetUrl, setAttachmetUrl] = useState<string[]>([]);
  useEffect(() => {
    const setValueonLoad = (): any => {
      setFormValues((prevValues) => {
        const newProcessLifecycle = [...prevValues.processLifecycle];

        if (prevValues.clientManagementSoftware.length > 0) {
          const clientManagementIndex = newProcessLifecycle.findIndex(
            (item) => item.category === "Client Relationship Management "
          );

          if (clientManagementIndex === -1) {
            newProcessLifecycle.push({
              category: "Client Relationship Management ",
              subcategories: prevValues.clientManagementSoftware,
            });
          } else {
            newProcessLifecycle[clientManagementIndex].subcategories =
              prevValues.clientManagementSoftware;
          }
        }

        if (prevValues.ComplianceandRiskSoftware.length > 0) {
          const ComplianceandRiskSoftwareIndex = newProcessLifecycle.findIndex(
            (item) =>
              item.category === "Compliance and Risk Management Software"
          );

          if (ComplianceandRiskSoftwareIndex === -1) {
            newProcessLifecycle.push({
              category: "Compliance and Risk Management Software",
              subcategories: prevValues.ComplianceandRiskSoftware,
            });
          } else {
            newProcessLifecycle[ComplianceandRiskSoftwareIndex].subcategories =
              prevValues.ComplianceandRiskSoftware;
          }
        }

        if (prevValues.contractManageSoftware.length > 0) {
          const contractManageSoftwareIndex = newProcessLifecycle.findIndex(
            (item) => item.category === "Contract Lifecycle Management"
          );

          if (contractManageSoftwareIndex === -1) {
            newProcessLifecycle.push({
              category: "Contract Lifecycle Management",
              subcategories: prevValues.contractManageSoftware,
            });
          } else {
            newProcessLifecycle[contractManageSoftwareIndex].subcategories =
              prevValues.contractManageSoftware;
          }
        }

        if (prevValues.DigitalSignature.length > 0) {
          const DigitalSignatureIndex = newProcessLifecycle.findIndex(
            (item) => item.category === "E-Signature"
          );

          if (DigitalSignatureIndex === -1) {
            newProcessLifecycle.push({
              category: "E-Signature",
              subcategories: prevValues.DigitalSignature,
            });
          } else {
            newProcessLifecycle[DigitalSignatureIndex].subcategories =
              prevValues.DigitalSignature;
          }
        }

        if (prevValues.DocumnetManagement.length > 0) {
          const DocumnetManagementIndex = newProcessLifecycle.findIndex(
            (item) => item.category === "Document Management System Software"
          );

          if (DocumnetManagementIndex === -1) {
            newProcessLifecycle.push({
              category: "Document Management System Software",
              subcategories: prevValues.DocumnetManagement,
            });
          } else {
            newProcessLifecycle[DocumnetManagementIndex].subcategories =
              prevValues.DocumnetManagement;
          }
        }

        if (prevValues.Ebilling.length > 0) {
          const EbillingIndex = newProcessLifecycle.findIndex(
            (item) => item.category === "E-billing and Invoicing"
          );

          if (EbillingIndex === -1) {
            newProcessLifecycle.push({
              category: "E-billing and Invoicing",
              subcategories: prevValues.Ebilling,
            });
          } else {
            newProcessLifecycle[EbillingIndex].subcategories =
              prevValues.Ebilling;
          }
        }

        if (prevValues.Ediscovery.length > 0) {
          const EdiscoveryIndex = newProcessLifecycle.findIndex(
            (item) => item.category === "E-discovery"
          );

          if (EdiscoveryIndex === -1) {
            newProcessLifecycle.push({
              category: "E-discovery",
              subcategories: prevValues.Ediscovery,
            });
          } else {
            newProcessLifecycle[EdiscoveryIndex].subcategories =
              prevValues.Ediscovery;
          }
        }

        if (prevValues.IPManagement.length > 0) {
          const IPManagementIndex = newProcessLifecycle.findIndex(
            (item) => item.category === "IP Management Software"
          );

          if (IPManagementIndex === -1) {
            newProcessLifecycle.push({
              category: "IP Management Software",
              subcategories: prevValues.IPManagement,
            });
          } else {
            newProcessLifecycle[IPManagementIndex].subcategories =
              prevValues.IPManagement;
          }
        }

        if (prevValues.LitigationManagement.length > 0) {
          const LitigationManagementIndex = newProcessLifecycle.findIndex(
            (item) => item.category === "Litigation Management and analytics"
          );

          if (LitigationManagementIndex === -1) {
            newProcessLifecycle.push({
              category: "Litigation Management and analytics",
              subcategories: prevValues.LitigationManagement,
            });
          } else {
            newProcessLifecycle[LitigationManagementIndex].subcategories =
              prevValues.LitigationManagement;
          }
        }

        if (prevValues.legalWorkflow.length > 0) {
          const legalWorkflowIndex = newProcessLifecycle.findIndex(
            (item) => item.category === "Legal Workflow Automation"
          );

          if (legalWorkflowIndex === -1) {
            newProcessLifecycle.push({
              category: "Legal Workflow Automation",
              subcategories: prevValues.legalWorkflow,
            });
          } else {
            newProcessLifecycle[legalWorkflowIndex].subcategories =
              prevValues.legalWorkflow;
          }
        }

        return {
          ...prevValues,
          processLifecycle: newProcessLifecycle,
        };
      });

      setFormValues((prevValues) => {
        const newFeatures = [...prevValues.features];

        if (prevValues.InternalCollaboration.length > 0) {
          const index = newFeatures.findIndex(
            (item) => item.category === "Internal Collaboration"
          );
          if (index === -1) {
            newFeatures.push({
              category: "Internal Collaboration",
              subcategories: prevValues.InternalCollaboration,
            });
          } else {
            newFeatures[index].subcategories = prevValues.InternalCollaboration;
          }
        }
        if (prevValues.CaseLawResearch.length > 0) {
          const index = newFeatures.findIndex(
            (item) => item.category === "Case Law Research"
          );
          if (index === -1) {
            newFeatures.push({
              category: "Case Law Research",
              subcategories: prevValues.CaseLawResearch,
            });
          } else {
            newFeatures[index].subcategories = prevValues.CaseLawResearch;
          }
        }

        if (prevValues.StatutoryResearch.length > 0) {
          const index = newFeatures.findIndex(
            (item) => item.category === "Statutory Research"
          );
          if (index === -1) {
            newFeatures.push({
              category: "Statutory Research",
              subcategories: prevValues.StatutoryResearch,
            });
          } else {
            newFeatures[index].subcategories = prevValues.StatutoryResearch;
          }
        }

        if (prevValues.AdvancedSearchCapabilities.length > 0) {
          const index = newFeatures.findIndex(
            (item) => item.category === "Advanced Search Capabilities"
          );
          if (index === -1) {
            newFeatures.push({
              category: "Advanced Search Capabilities",
              subcategories: prevValues.AdvancedSearchCapabilities,
            });
          } else {
            newFeatures[index].subcategories =
              prevValues.AdvancedSearchCapabilities;
          }
        }

        if (prevValues.FilterAndSorting.length > 0) {
          const index = newFeatures.findIndex(
            (item) => item.category === "Filter and Sorting"
          );
          if (index === -1) {
            newFeatures.push({
              category: "Filter and Sorting",
              subcategories: prevValues.FilterAndSorting,
            });
          } else {
            newFeatures[index].subcategories = prevValues.FilterAndSorting;
          }
        }

        if (prevValues.DocumentCreationAndTemplates.length > 0) {
          const index = newFeatures.findIndex(
            (item) => item.category === "Document Creation And Templates"
          );
          if (index === -1) {
            newFeatures.push({
              category: "Document Creation And Templates",
              subcategories: prevValues.DocumentCreationAndTemplates,
            });
          } else {
            newFeatures[index].subcategories =
              prevValues.DocumentCreationAndTemplates;
          }
        }

        if (prevValues.ExternalCollaboration.length > 0) {
          const index = newFeatures.findIndex(
            (item) => item.category === "External Collaboration"
          );
          if (index === -1) {
            newFeatures.push({
              category: "External Collaboration",
              subcategories: prevValues.ExternalCollaboration,
            });
          } else {
            newFeatures[index].subcategories = prevValues.ExternalCollaboration;
          }
        }

        if (prevValues.AnalyticsAndReporting.length > 0) {
          const index = newFeatures.findIndex(
            (item) => item.category === "Analytics and Reporting"
          );
          if (index === -1) {
            newFeatures.push({
              category: "Analytics and Reporting",
              subcategories: prevValues.AnalyticsAndReporting,
            });
          } else {
            newFeatures[index].subcategories = prevValues.AnalyticsAndReporting;
          }
        }

        if (prevValues.ToolAdministrationAndControl.length > 0) {
          const index = newFeatures.findIndex(
            (item) => item.category === "Tool Administration and Control"
          );
          if (index === -1) {
            newFeatures.push({
              category: "Tool Administration and Control",
              subcategories: prevValues.ToolAdministrationAndControl,
            });
          } else {
            newFeatures[index].subcategories =
              prevValues.ToolAdministrationAndControl;
          }
        }

        if (prevValues.IntakeAndLeadManagement.length > 0) {
          const index = newFeatures.findIndex(
            (item) => item.category === "Intake and Lead Management"
          );
          if (index === -1) {
            newFeatures.push({
              category: "Intake and Lead Management",
              subcategories: prevValues.IntakeAndLeadManagement,
            });
          } else {
            newFeatures[index].subcategories =
              prevValues.IntakeAndLeadManagement;
          }
        }

        if (prevValues.ClientPortal.length > 0) {
          const index = newFeatures.findIndex(
            (item) => item.category === "Client Portal"
          );
          if (index === -1) {
            newFeatures.push({
              category: "Client Portal",
              subcategories: prevValues.ClientPortal,
            });
          } else {
            newFeatures[index].subcategories = prevValues.ClientPortal;
          }
        }

        if (prevValues.DocumentManagement.length > 0) {
          const index = newFeatures.findIndex(
            (item) => item.category === "Document Management"
          );
          if (index === -1) {
            newFeatures.push({
              category: "Document Management",
              subcategories: prevValues.DocumentManagement,
            });
          } else {
            newFeatures[index].subcategories = prevValues.DocumentManagement;
          }
        }

        if (prevValues.CaseAlerts.length > 0) {
          const index = newFeatures.findIndex(
            (item) => item.category === "Case Alerts"
          );
          if (index === -1) {
            newFeatures.push({
              category: "Case Alerts",
              subcategories: prevValues.CaseAlerts,
            });
          } else {
            newFeatures[index].subcategories = prevValues.CaseAlerts;
          }
        }

        if (prevValues.BudgetExpenseAndTimeTracking.length > 0) {
          const index = newFeatures.findIndex(
            (item) => item.category === "Budget, Expense and Time Tracking"
          );
          if (index === -1) {
            newFeatures.push({
              category: "Budget, Expense and Time Tracking",
              subcategories: prevValues.BudgetExpenseAndTimeTracking,
            });
          } else {
            newFeatures[index].subcategories =
              prevValues.BudgetExpenseAndTimeTracking;
          }
        }

        if (prevValues.ClientBillingAndInvoicing.length > 0) {
          const index = newFeatures.findIndex(
            (item) => item.category === "Client Billing and Invoicing"
          );
          if (index === -1) {
            newFeatures.push({
              category: "Client Billing and Invoicing",
              subcategories: prevValues.ClientBillingAndInvoicing,
            });
          } else {
            newFeatures[index].subcategories =
              prevValues.ClientBillingAndInvoicing;
          }
        }

        if (prevValues.PolicyManagement.length > 0) {
          const index = newFeatures.findIndex(
            (item) => item.category === "Policy Management"
          );
          if (index === -1) {
            newFeatures.push({
              category: "Policy Management",
              subcategories: prevValues.PolicyManagement,
            });
          } else {
            newFeatures[index].subcategories = prevValues.PolicyManagement;
          }
        }

        if (prevValues.IssueManagement.length > 0) {
          const index = newFeatures.findIndex(
            (item) => item.category === "Issue Management"
          );
          if (index === -1) {
            newFeatures.push({
              category: "Issue Management",
              subcategories: prevValues.IssueManagement,
            });
          } else {
            newFeatures[index].subcategories = prevValues.IssueManagement;
          }
        }

        if (prevValues.LawsComplianceAndRegulatoryTracking.length > 0) {
          const index = newFeatures.findIndex(
            (item) =>
              item.category === "Laws, Compliance and Regulatory Tracking"
          );
          if (index === -1) {
            newFeatures.push({
              category: "Laws, Compliance and Regulatory Tracking",
              subcategories: prevValues.LawsComplianceAndRegulatoryTracking,
            });
          } else {
            newFeatures[index].subcategories =
              prevValues.LawsComplianceAndRegulatoryTracking;
          }
        }

        if (prevValues.ContractCreationAndAuthoring.length > 0) {
          const index = newFeatures.findIndex(
            (item) => item.category === "Contract Creation and Authoring"
          );
          if (index === -1) {
            newFeatures.push({
              category: "Contract Creation and Authoring",
              subcategories: prevValues.ContractCreationAndAuthoring,
            });
          } else {
            newFeatures[index].subcategories =
              prevValues.ContractCreationAndAuthoring;
          }
        }

        if (prevValues.ContractRepository.length > 0) {
          const index = newFeatures.findIndex(
            (item) => item.category === "Contract Repository"
          );
          if (index === -1) {
            newFeatures.push({
              category: "Contract Repository",
              subcategories: prevValues.ContractRepository,
            });
          } else {
            newFeatures[index].subcategories = prevValues.ContractRepository;
          }
        }

        if (prevValues.ContractNegotiation.length > 0) {
          const index = newFeatures.findIndex(
            (item) => item.category === "Contract Negotiation"
          );
          if (index === -1) {
            newFeatures.push({
              category: "Contract Negotiation",
              subcategories: prevValues.ContractNegotiation,
            });
          } else {
            newFeatures[index].subcategories = prevValues.ContractNegotiation;
          }
        }

        if (prevValues.LifecycleManagement.length > 0) {
          const index = newFeatures.findIndex(
            (item) => item.category === "Lifecycle Management"
          );
          if (index === -1) {
            newFeatures.push({
              category: "Lifecycle Management",
              subcategories: prevValues.LifecycleManagement,
            });
          } else {
            newFeatures[index].subcategories = prevValues.LifecycleManagement;
          }
        }

        if (prevValues.ClauseLibrary.length > 0) {
          const index = newFeatures.findIndex(
            (item) => item.category === "Clause Library"
          );
          if (index === -1) {
            newFeatures.push({
              category: "Clause Library",
              subcategories: prevValues.ClauseLibrary,
            });
          } else {
            newFeatures[index].subcategories = prevValues.ClauseLibrary;
          }
        }

        if (prevValues.FieldsCreation.length > 0) {
          const index = newFeatures.findIndex(
            (item) => item.category === "Fields Creation"
          );
          if (index === -1) {
            newFeatures.push({
              category: "Fields Creation",
              subcategories: prevValues.FieldsCreation,
            });
          } else {
            newFeatures[index].subcategories = prevValues.FieldsCreation;
          }
        }

        if (prevValues.TrackingAndValidity.length > 0) {
          const index = newFeatures.findIndex(
            (item) => item.category === "Tracking and Validity"
          );
          if (index === -1) {
            newFeatures.push({
              category: "Tracking and Validity",
              subcategories: prevValues.TrackingAndValidity,
            });
          } else {
            newFeatures[index].subcategories = prevValues.TrackingAndValidity;
          }
        }

        if (prevValues.DocumentManagementAndTemplates.length > 0) {
          const index = newFeatures.findIndex(
            (item) => item.category === "Document Management and Templates"
          );
          if (index === -1) {
            newFeatures.push({
              category: "Document Management and Templates",
              subcategories: prevValues.DocumentManagementAndTemplates,
            });
          } else {
            newFeatures[index].subcategories =
              prevValues.DocumentManagementAndTemplates;
          }
        }

        if (prevValues.DocumentCapturing.length > 0) {
          const index = newFeatures.findIndex(
            (item) => item.category === "Document Capturing"
          );
          if (index === -1) {
            newFeatures.push({
              category: "Document Capturing",
              subcategories: prevValues.DocumentCapturing,
            });
          } else {
            newFeatures[index].subcategories = prevValues.DocumentCapturing;
          }
        }

        if (prevValues.DocumentSearchAndNavigation.length > 0) {
          const index = newFeatures.findIndex(
            (item) => item.category === "Document Search and Navigation"
          );
          if (index === -1) {
            newFeatures.push({
              category: "Document Search and Navigation",
              subcategories: prevValues.DocumentSearchAndNavigation,
            });
          } else {
            newFeatures[index].subcategories =
              prevValues.DocumentSearchAndNavigation;
          }
        }

        if (prevValues.Authentication.length > 0) {
          const index = newFeatures.findIndex(
            (item) => item.category === "Authentication"
          );
          if (index === -1) {
            newFeatures.push({
              category: "Authentication",
              subcategories: prevValues.Authentication,
            });
          } else {
            newFeatures[index].subcategories = prevValues.Authentication;
          }
        }

        if (prevValues.TaskAllotment.length > 0) {
          const index = newFeatures.findIndex(
            (item) => item.category === "Task Allotment"
          );
          if (index === -1) {
            newFeatures.push({
              category: "Task Allotment",
              subcategories: prevValues.TaskAllotment,
            });
          } else {
            newFeatures[index].subcategories = prevValues.TaskAllotment;
          }
        }

        if (prevValues.BudgetingExpenseAndTimeTracking.length > 0) {
          const index = newFeatures.findIndex(
            (item) => item.category === "Budgeting, Expense and Time Tracking"
          );
          if (index === -1) {
            newFeatures.push({
              category: "Budgeting, Expense and Time Tracking",
              subcategories: prevValues.BudgetingExpenseAndTimeTracking,
            });
          } else {
            newFeatures[index].subcategories =
              prevValues.BudgetingExpenseAndTimeTracking;
          }
        }

        if (prevValues.ClientManagement.length > 0) {
          const index = newFeatures.findIndex(
            (item) => item.category === "Client Management"
          );
          if (index === -1) {
            newFeatures.push({
              category: "Client Management",
              subcategories: prevValues.ClientManagement,
            });
          } else {
            newFeatures[index].subcategories = prevValues.ClientManagement;
          }
        }

        if (prevValues.InvoiceGenerationAndReview.length > 0) {
          const index = newFeatures.findIndex(
            (item) => item.category === "Invoice Generation and Review"
          );
          if (index === -1) {
            newFeatures.push({
              category: "Invoice Generation and Review",
              subcategories: prevValues.InvoiceGenerationAndReview,
            });
          } else {
            newFeatures[index].subcategories =
              prevValues.InvoiceGenerationAndReview;
          }
        }

        if (prevValues.DataIdentificationAndCollection.length > 0) {
          const index = newFeatures.findIndex(
            (item) => item.category === "Data Identification and Collection"
          );
          if (index === -1) {
            newFeatures.push({
              category: "Data Identification and Collection",
              subcategories: prevValues.DataIdentificationAndCollection,
            });
          } else {
            newFeatures[index].subcategories =
              prevValues.DataIdentificationAndCollection;
          }
        }

        if (prevValues.SearchProcessingAndAnalysis.length > 0) {
          const index = newFeatures.findIndex(
            (item) => item.category === "Search, Processing and Analysis"
          );
          if (index === -1) {
            newFeatures.push({
              category: "Search, Processing and Analysis",
              subcategories: prevValues.SearchProcessingAndAnalysis,
            });
          } else {
            newFeatures[index].subcategories =
              prevValues.SearchProcessingAndAnalysis;
          }
        }

        if (prevValues.ReviewAndProduction.length > 0) {
          const index = newFeatures.findIndex(
            (item) => item.category === "Review and Production"
          );
          if (index === -1) {
            newFeatures.push({
              category: "Review and Production",
              subcategories: prevValues.ReviewAndProduction,
            });
          } else {
            newFeatures[index].subcategories = prevValues.ReviewAndProduction;
          }
        }

        if (prevValues.LegalHoldManagement.length > 0) {
          const index = newFeatures.findIndex(
            (item) => item.category === "Legal Hold Management"
          );
          if (index === -1) {
            newFeatures.push({
              category: "Legal Hold Management",
              subcategories: prevValues.LegalHoldManagement,
            });
          } else {
            newFeatures[index].subcategories = prevValues.LegalHoldManagement;
          }
        }

        if (prevValues.IdeationAndCreation.length > 0) {
          const index = newFeatures.findIndex(
            (item) => item.category === "Ideation and Creation"
          );
          if (index === -1) {
            newFeatures.push({
              category: "Ideation and Creation",
              subcategories: prevValues.IdeationAndCreation,
            });
          } else {
            newFeatures[index].subcategories = prevValues.IdeationAndCreation;
          }
        }

        if (prevValues.LifecycleManagementIP.length > 0) {
          const index = newFeatures.findIndex(
            (item) => item.category === "Lifecycle Management IP"
          );
          if (index === -1) {
            newFeatures.push({
              category: "Lifecycle Management IP",
              subcategories: prevValues.LifecycleManagementIP,
            });
          } else {
            newFeatures[index].subcategories = prevValues.LifecycleManagementIP;
          }
        }

        if (prevValues.SearchAndDiscovery.length > 0) {
          const index = newFeatures.findIndex(
            (item) => item.category === "Search and Discovery"
          );
          if (index === -1) {
            newFeatures.push({
              category: "Search and Discovery",
              subcategories: prevValues.SearchAndDiscovery,
            });
          } else {
            newFeatures[index].subcategories = prevValues.SearchAndDiscovery;
          }
        }

        if (prevValues.StorageAndRepository.length > 0) {
          const index = newFeatures.findIndex(
            (item) => item.category === "Storage and Repository"
          );
          if (index === -1) {
            newFeatures.push({
              category: "Storage and Repository",
              subcategories: prevValues.StorageAndRepository,
            });
          } else {
            newFeatures[index].subcategories = prevValues.StorageAndRepository;
          }
        }

        if (prevValues.MatterLifecycleTracking.length > 0) {
          const index = newFeatures.findIndex(
            (item) => item.category === "Matter Lifecycle Tracking"
          );
          if (index === -1) {
            newFeatures.push({
              category: "Matter Lifecycle Tracking",
              subcategories: prevValues.MatterLifecycleTracking,
            });
          } else {
            newFeatures[index].subcategories =
              prevValues.MatterLifecycleTracking;
          }
        }

        if (prevValues.CourtAndCaseSearch.length > 0) {
          const index = newFeatures.findIndex(
            (item) => item.category === "Court and Case Search"
          );
          if (index === -1) {
            newFeatures.push({
              category: "Court and Case Search",
              subcategories: prevValues.CourtAndCaseSearch,
            });
          } else {
            newFeatures[index].subcategories = prevValues.CourtAndCaseSearch;
          }
        }

        if (prevValues.LitigationDocketingFeatures.length > 0) {
          const index = newFeatures.findIndex(
            (item) => item.category === "Litigation Docketing Features"
          );
          if (index === -1) {
            newFeatures.push({
              category: "Litigation Docketing Features",
              subcategories: prevValues.LitigationDocketingFeatures,
            });
          } else {
            newFeatures[index].subcategories =
              prevValues.LitigationDocketingFeatures;
          }
        }

        if (prevValues.WorkflowDesignAndConfiguration.length > 0) {
          const index = newFeatures.findIndex(
            (item) => item.category === "Workflow Design and Configuration"
          );
          if (index === -1) {
            newFeatures.push({
              category: "Workflow Design and Configuration",
              subcategories: prevValues.WorkflowDesignAndConfiguration,
            });
          } else {
            newFeatures[index].subcategories =
              prevValues.WorkflowDesignAndConfiguration;
          }
        }

        if (prevValues.AssignmentAllotmentAndTracking.length > 0) {
          const index = newFeatures.findIndex(
            (item) => item.category === "Assignment Allotment and Tracking"
          );
          if (index === -1) {
            newFeatures.push({
              category: "Assignment Allotment and Tracking",
              subcategories: prevValues.AssignmentAllotmentAndTracking,
            });
          } else {
            newFeatures[index].subcategories =
              prevValues.AssignmentAllotmentAndTracking;
          }
        }

        if (prevValues.DocumentCreationAndManagement.length > 0) {
          const index = newFeatures.findIndex(
            (item) => item.category === "Document Creation and Management"
          );
          if (index === -1) {
            newFeatures.push({
              category: "Document Creation and Management",
              subcategories: prevValues.DocumentCreationAndManagement,
            });
          } else {
            newFeatures[index].subcategories =
              prevValues.DocumentCreationAndManagement;
          }
        }

        if (prevValues.LawsComplianceAndRegulatoryTrackingIP.length > 0) {
          const index = newFeatures.findIndex(
            (item) =>
              item.category === "Laws, Compliance and Regulatory Tracking 2"
          );
          if (index === -1) {
            newFeatures.push({
              category: "Laws, Compliance and Regulatory Tracking 2",
              subcategories: prevValues.LawsComplianceAndRegulatoryTrackingIP,
            });
          } else {
            newFeatures[index].subcategories =
              prevValues.LawsComplianceAndRegulatoryTrackingIP;
          }
        }

        return {
          ...prevValues,
          features: newFeatures,
        };
      });
    };
    setValueonLoad();
  }, []);

  const { nextStep } = useStepContext();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
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

  const uploadFile = async (file: File, folderName: string) => {
    // Create the form data
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folderName", folderName);

    try {
      // Send the POST request
      const response = await fetch("/api/upload-file", {
        method: "POST",
        body: formData,
      });

      // Handle the response
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          const url = data.location;
          console.log("Uploaded file location:", url);
          return url;
        } else {
          console.error("Upload failed:", data.error);
        }
      } else {
        console.error("Failed to upload file:", response.statusText);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
    return null;
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
    setLoading(true);
    const userId = localStorage.getItem("vendorId");
    if (!userId) {
      toast({
        title: "Error",
        description: "Something went wrong. Please login again.",
        variant: "destructive",
      });
      return;
    }

    setFormValues((prevValues) => {
      const newProcessLifecycle = [...prevValues.processLifecycle];

      if (prevValues.clientManagementSoftware.length > 0) {
        const clientManagementIndex = newProcessLifecycle.findIndex(
          (item) => item.category === "Client Relationship Management "
        );

        if (clientManagementIndex === -1) {
          newProcessLifecycle.push({
            category: "Client Relationship Management ",
            subcategories: prevValues.clientManagementSoftware,
          });
        } else {
          newProcessLifecycle[clientManagementIndex].subcategories =
            prevValues.clientManagementSoftware;
        }
      }

      if (prevValues.ComplianceandRiskSoftware.length > 0) {
        const ComplianceandRiskSoftwareIndex = newProcessLifecycle.findIndex(
          (item) => item.category === "Compliance and Risk Management Software"
        );

        if (ComplianceandRiskSoftwareIndex === -1) {
          newProcessLifecycle.push({
            category: "Compliance and Risk Management Software",
            subcategories: prevValues.ComplianceandRiskSoftware,
          });
        } else {
          newProcessLifecycle[ComplianceandRiskSoftwareIndex].subcategories =
            prevValues.ComplianceandRiskSoftware;
        }
      }

      if (prevValues.contractManageSoftware.length > 0) {
        const contractManageSoftwareIndex = newProcessLifecycle.findIndex(
          (item) => item.category === "Contract Lifecycle Management"
        );

        if (contractManageSoftwareIndex === -1) {
          newProcessLifecycle.push({
            category: "Contract Lifecycle Management",
            subcategories: prevValues.contractManageSoftware,
          });
        } else {
          newProcessLifecycle[contractManageSoftwareIndex].subcategories =
            prevValues.contractManageSoftware;
        }
      }

      if (prevValues.DigitalSignature.length > 0) {
        const DigitalSignatureIndex = newProcessLifecycle.findIndex(
          (item) => item.category === "E-Signature"
        );

        if (DigitalSignatureIndex === -1) {
          newProcessLifecycle.push({
            category: "E-Signature",
            subcategories: prevValues.DigitalSignature,
          });
        } else {
          newProcessLifecycle[DigitalSignatureIndex].subcategories =
            prevValues.DigitalSignature;
        }
      }

      if (prevValues.DocumnetManagement.length > 0) {
        const DocumnetManagementIndex = newProcessLifecycle.findIndex(
          (item) => item.category === "Document Management System Software"
        );

        if (DocumnetManagementIndex === -1) {
          newProcessLifecycle.push({
            category: "Document Management System Software",
            subcategories: prevValues.DocumnetManagement,
          });
        } else {
          newProcessLifecycle[DocumnetManagementIndex].subcategories =
            prevValues.DocumnetManagement;
        }
      }

      if (prevValues.Ebilling.length > 0) {
        const EbillingIndex = newProcessLifecycle.findIndex(
          (item) => item.category === "E-billing and Invoicing"
        );

        if (EbillingIndex === -1) {
          newProcessLifecycle.push({
            category: "E-billing and Invoicing",
            subcategories: prevValues.Ebilling,
          });
        } else {
          newProcessLifecycle[EbillingIndex].subcategories =
            prevValues.Ebilling;
        }
      }

      if (prevValues.Ediscovery.length > 0) {
        const EdiscoveryIndex = newProcessLifecycle.findIndex(
          (item) => item.category === "E-discovery"
        );

        if (EdiscoveryIndex === -1) {
          newProcessLifecycle.push({
            category: "E-discovery",
            subcategories: prevValues.Ediscovery,
          });
        } else {
          newProcessLifecycle[EdiscoveryIndex].subcategories =
            prevValues.Ediscovery;
        }
      }

      if (prevValues.IPManagement.length > 0) {
        const IPManagementIndex = newProcessLifecycle.findIndex(
          (item) => item.category === "IP Management Software"
        );

        if (IPManagementIndex === -1) {
          newProcessLifecycle.push({
            category: "IP Management Software",
            subcategories: prevValues.IPManagement,
          });
        } else {
          newProcessLifecycle[IPManagementIndex].subcategories =
            prevValues.IPManagement;
        }
      }

      if (prevValues.LitigationManagement.length > 0) {
        const LitigationManagementIndex = newProcessLifecycle.findIndex(
          (item) => item.category === "Litigation Management and analytics"
        );

        if (LitigationManagementIndex === -1) {
          newProcessLifecycle.push({
            category: "Litigation Management and analytics",
            subcategories: prevValues.LitigationManagement,
          });
        } else {
          newProcessLifecycle[LitigationManagementIndex].subcategories =
            prevValues.LitigationManagement;
        }
      }

      if (prevValues.legalWorkflow.length > 0) {
        const legalWorkflowIndex = newProcessLifecycle.findIndex(
          (item) => item.category === "Legal Workflow Automation"
        );

        if (legalWorkflowIndex === -1) {
          newProcessLifecycle.push({
            category: "Legal Workflow Automation",
            subcategories: prevValues.legalWorkflow,
          });
        } else {
          newProcessLifecycle[legalWorkflowIndex].subcategories =
            prevValues.legalWorkflow;
        }
      }

      return {
        ...prevValues,
        processLifecycle: newProcessLifecycle,
      };
    });

    setFormValues((prevValues) => {
      const newFeatures = [...prevValues.features];

      if (prevValues.InternalCollaboration.length > 0) {
        const index = newFeatures.findIndex(
          (item) => item.category === "Internal Collaboration"
        );
        if (index === -1) {
          newFeatures.push({
            category: "Internal Collaboration",
            subcategories: prevValues.InternalCollaboration,
          });
        } else {
          newFeatures[index].subcategories = prevValues.InternalCollaboration;
        }
      }

      if (prevValues.ExternalCollaboration.length > 0) {
        const index = newFeatures.findIndex(
          (item) => item.category === "External Collaboration"
        );
        if (index === -1) {
          newFeatures.push({
            category: "External Collaboration",
            subcategories: prevValues.ExternalCollaboration,
          });
        } else {
          newFeatures[index].subcategories = prevValues.ExternalCollaboration;
        }
      }

      if (prevValues.AnalyticsAndReporting.length > 0) {
        const index = newFeatures.findIndex(
          (item) => item.category === "Analytics and Reporting"
        );
        if (index === -1) {
          newFeatures.push({
            category: "Analytics and Reporting",
            subcategories: prevValues.AnalyticsAndReporting,
          });
        } else {
          newFeatures[index].subcategories = prevValues.AnalyticsAndReporting;
        }
      }

      if (prevValues.ToolAdministrationAndControl.length > 0) {
        const index = newFeatures.findIndex(
          (item) => item.category === "Tool Administration and Control"
        );
        if (index === -1) {
          newFeatures.push({
            category: "Tool Administration and Control",
            subcategories: prevValues.ToolAdministrationAndControl,
          });
        } else {
          newFeatures[index].subcategories =
            prevValues.ToolAdministrationAndControl;
        }
      }

      if (prevValues.IntakeAndLeadManagement.length > 0) {
        const index = newFeatures.findIndex(
          (item) => item.category === "Intake and Lead Management"
        );
        if (index === -1) {
          newFeatures.push({
            category: "Intake and Lead Management",
            subcategories: prevValues.IntakeAndLeadManagement,
          });
        } else {
          newFeatures[index].subcategories = prevValues.IntakeAndLeadManagement;
        }
      }

      if (prevValues.ClientPortal.length > 0) {
        const index = newFeatures.findIndex(
          (item) => item.category === "Client Portal"
        );
        if (index === -1) {
          newFeatures.push({
            category: "Client Portal",
            subcategories: prevValues.ClientPortal,
          });
        } else {
          newFeatures[index].subcategories = prevValues.ClientPortal;
        }
      }

      if (prevValues.DocumentManagement.length > 0) {
        const index = newFeatures.findIndex(
          (item) => item.category === "Document Management"
        );
        if (index === -1) {
          newFeatures.push({
            category: "Document Management",
            subcategories: prevValues.DocumentManagement,
          });
        } else {
          newFeatures[index].subcategories = prevValues.DocumentManagement;
        }
      }

      if (prevValues.CaseAlerts.length > 0) {
        const index = newFeatures.findIndex(
          (item) => item.category === "Case Alerts"
        );
        if (index === -1) {
          newFeatures.push({
            category: "Case Alerts",
            subcategories: prevValues.CaseAlerts,
          });
        } else {
          newFeatures[index].subcategories = prevValues.CaseAlerts;
        }
      }

      if (prevValues.BudgetExpenseAndTimeTracking.length > 0) {
        const index = newFeatures.findIndex(
          (item) => item.category === "Budget, Expense and Time Tracking"
        );
        if (index === -1) {
          newFeatures.push({
            category: "Budget, Expense and Time Tracking",
            subcategories: prevValues.BudgetExpenseAndTimeTracking,
          });
        } else {
          newFeatures[index].subcategories =
            prevValues.BudgetExpenseAndTimeTracking;
        }
      }

      if (prevValues.ClientBillingAndInvoicing.length > 0) {
        const index = newFeatures.findIndex(
          (item) => item.category === "Client Billing and Invoicing"
        );
        if (index === -1) {
          newFeatures.push({
            category: "Client Billing and Invoicing",
            subcategories: prevValues.ClientBillingAndInvoicing,
          });
        } else {
          newFeatures[index].subcategories =
            prevValues.ClientBillingAndInvoicing;
        }
      }

      if (prevValues.PolicyManagement.length > 0) {
        const index = newFeatures.findIndex(
          (item) => item.category === "Policy Management"
        );
        if (index === -1) {
          newFeatures.push({
            category: "Policy Management",
            subcategories: prevValues.PolicyManagement,
          });
        } else {
          newFeatures[index].subcategories = prevValues.PolicyManagement;
        }
      }

      if (prevValues.IssueManagement.length > 0) {
        const index = newFeatures.findIndex(
          (item) => item.category === "Issue Management"
        );
        if (index === -1) {
          newFeatures.push({
            category: "Issue Management",
            subcategories: prevValues.IssueManagement,
          });
        } else {
          newFeatures[index].subcategories = prevValues.IssueManagement;
        }
      }

      if (prevValues.LawsComplianceAndRegulatoryTracking.length > 0) {
        const index = newFeatures.findIndex(
          (item) => item.category === "Laws, Compliance and Regulatory Tracking"
        );
        if (index === -1) {
          newFeatures.push({
            category: "Laws, Compliance and Regulatory Tracking",
            subcategories: prevValues.LawsComplianceAndRegulatoryTracking,
          });
        } else {
          newFeatures[index].subcategories =
            prevValues.LawsComplianceAndRegulatoryTracking;
        }
      }

      if (prevValues.ContractCreationAndAuthoring.length > 0) {
        const index = newFeatures.findIndex(
          (item) => item.category === "Contract Creation and Authoring"
        );
        if (index === -1) {
          newFeatures.push({
            category: "Contract Creation and Authoring",
            subcategories: prevValues.ContractCreationAndAuthoring,
          });
        } else {
          newFeatures[index].subcategories =
            prevValues.ContractCreationAndAuthoring;
        }
      }

      if (prevValues.ContractRepository.length > 0) {
        const index = newFeatures.findIndex(
          (item) => item.category === "Contract Repository"
        );
        if (index === -1) {
          newFeatures.push({
            category: "Contract Repository",
            subcategories: prevValues.ContractRepository,
          });
        } else {
          newFeatures[index].subcategories = prevValues.ContractRepository;
        }
      }

      if (prevValues.ContractNegotiation.length > 0) {
        const index = newFeatures.findIndex(
          (item) => item.category === "Contract Negotiation"
        );
        if (index === -1) {
          newFeatures.push({
            category: "Contract Negotiation",
            subcategories: prevValues.ContractNegotiation,
          });
        } else {
          newFeatures[index].subcategories = prevValues.ContractNegotiation;
        }
      }

      if (prevValues.LifecycleManagement.length > 0) {
        const index = newFeatures.findIndex(
          (item) => item.category === "Lifecycle Management"
        );
        if (index === -1) {
          newFeatures.push({
            category: "Lifecycle Management",
            subcategories: prevValues.LifecycleManagement,
          });
        } else {
          newFeatures[index].subcategories = prevValues.LifecycleManagement;
        }
      }

      if (prevValues.ClauseLibrary.length > 0) {
        const index = newFeatures.findIndex(
          (item) => item.category === "Clause Library"
        );
        if (index === -1) {
          newFeatures.push({
            category: "Clause Library",
            subcategories: prevValues.ClauseLibrary,
          });
        } else {
          newFeatures[index].subcategories = prevValues.ClauseLibrary;
        }
      }

      if (prevValues.FieldsCreation.length > 0) {
        const index = newFeatures.findIndex(
          (item) => item.category === "Fields Creation"
        );
        if (index === -1) {
          newFeatures.push({
            category: "Fields Creation",
            subcategories: prevValues.FieldsCreation,
          });
        } else {
          newFeatures[index].subcategories = prevValues.FieldsCreation;
        }
      }

      if (prevValues.TrackingAndValidity.length > 0) {
        const index = newFeatures.findIndex(
          (item) => item.category === "Tracking and Validity"
        );
        if (index === -1) {
          newFeatures.push({
            category: "Tracking and Validity",
            subcategories: prevValues.TrackingAndValidity,
          });
        } else {
          newFeatures[index].subcategories = prevValues.TrackingAndValidity;
        }
      }

      if (prevValues.DocumentManagementAndTemplates.length > 0) {
        const index = newFeatures.findIndex(
          (item) => item.category === "Document Management and Templates"
        );
        if (index === -1) {
          newFeatures.push({
            category: "Document Management and Templates",
            subcategories: prevValues.DocumentManagementAndTemplates,
          });
        } else {
          newFeatures[index].subcategories =
            prevValues.DocumentManagementAndTemplates;
        }
      }

      if (prevValues.DocumentCapturing.length > 0) {
        const index = newFeatures.findIndex(
          (item) => item.category === "Document Capturing"
        );
        if (index === -1) {
          newFeatures.push({
            category: "Document Capturing",
            subcategories: prevValues.DocumentCapturing,
          });
        } else {
          newFeatures[index].subcategories = prevValues.DocumentCapturing;
        }
      }

      if (prevValues.DocumentSearchAndNavigation.length > 0) {
        const index = newFeatures.findIndex(
          (item) => item.category === "Document Search and Navigation"
        );
        if (index === -1) {
          newFeatures.push({
            category: "Document Search and Navigation",
            subcategories: prevValues.DocumentSearchAndNavigation,
          });
        } else {
          newFeatures[index].subcategories =
            prevValues.DocumentSearchAndNavigation;
        }
      }

      if (prevValues.Authentication.length > 0) {
        const index = newFeatures.findIndex(
          (item) => item.category === "Authentication"
        );
        if (index === -1) {
          newFeatures.push({
            category: "Authentication",
            subcategories: prevValues.Authentication,
          });
        } else {
          newFeatures[index].subcategories = prevValues.Authentication;
        }
      }

      if (prevValues.TaskAllotment.length > 0) {
        const index = newFeatures.findIndex(
          (item) => item.category === "Task Allotment"
        );
        if (index === -1) {
          newFeatures.push({
            category: "Task Allotment",
            subcategories: prevValues.TaskAllotment,
          });
        } else {
          newFeatures[index].subcategories = prevValues.TaskAllotment;
        }
      }

      if (prevValues.BudgetingExpenseAndTimeTracking.length > 0) {
        const index = newFeatures.findIndex(
          (item) => item.category === "Budgeting, Expense and Time Tracking"
        );
        if (index === -1) {
          newFeatures.push({
            category: "Budgeting, Expense and Time Tracking",
            subcategories: prevValues.BudgetingExpenseAndTimeTracking,
          });
        } else {
          newFeatures[index].subcategories =
            prevValues.BudgetingExpenseAndTimeTracking;
        }
      }

      if (prevValues.ClientManagement.length > 0) {
        const index = newFeatures.findIndex(
          (item) => item.category === "Client Management"
        );
        if (index === -1) {
          newFeatures.push({
            category: "Client Management",
            subcategories: prevValues.ClientManagement,
          });
        } else {
          newFeatures[index].subcategories = prevValues.ClientManagement;
        }
      }

      if (prevValues.InvoiceGenerationAndReview.length > 0) {
        const index = newFeatures.findIndex(
          (item) => item.category === "Invoice Generation and Review"
        );
        if (index === -1) {
          newFeatures.push({
            category: "Invoice Generation and Review",
            subcategories: prevValues.InvoiceGenerationAndReview,
          });
        } else {
          newFeatures[index].subcategories =
            prevValues.InvoiceGenerationAndReview;
        }
      }

      if (prevValues.DataIdentificationAndCollection.length > 0) {
        const index = newFeatures.findIndex(
          (item) => item.category === "Data Identification and Collection"
        );
        if (index === -1) {
          newFeatures.push({
            category: "Data Identification and Collection",
            subcategories: prevValues.DataIdentificationAndCollection,
          });
        } else {
          newFeatures[index].subcategories =
            prevValues.DataIdentificationAndCollection;
        }
      }

      if (prevValues.SearchProcessingAndAnalysis.length > 0) {
        const index = newFeatures.findIndex(
          (item) => item.category === "Search, Processing and Analysis"
        );
        if (index === -1) {
          newFeatures.push({
            category: "Search, Processing and Analysis",
            subcategories: prevValues.SearchProcessingAndAnalysis,
          });
        } else {
          newFeatures[index].subcategories =
            prevValues.SearchProcessingAndAnalysis;
        }
      }

      if (prevValues.ReviewAndProduction.length > 0) {
        const index = newFeatures.findIndex(
          (item) => item.category === "Review and Production"
        );
        if (index === -1) {
          newFeatures.push({
            category: "Review and Production",
            subcategories: prevValues.ReviewAndProduction,
          });
        } else {
          newFeatures[index].subcategories = prevValues.ReviewAndProduction;
        }
      }

      if (prevValues.LegalHoldManagement.length > 0) {
        const index = newFeatures.findIndex(
          (item) => item.category === "Legal Hold Management"
        );
        if (index === -1) {
          newFeatures.push({
            category: "Legal Hold Management",
            subcategories: prevValues.LegalHoldManagement,
          });
        } else {
          newFeatures[index].subcategories = prevValues.LegalHoldManagement;
        }
      }

      if (prevValues.IdeationAndCreation.length > 0) {
        const index = newFeatures.findIndex(
          (item) => item.category === "Ideation and Creation"
        );
        if (index === -1) {
          newFeatures.push({
            category: "Ideation and Creation",
            subcategories: prevValues.IdeationAndCreation,
          });
        } else {
          newFeatures[index].subcategories = prevValues.IdeationAndCreation;
        }
      }

      if (prevValues.LifecycleManagementIP.length > 0) {
        const index = newFeatures.findIndex(
          (item) => item.category === "Lifecycle Management IP"
        );
        if (index === -1) {
          newFeatures.push({
            category: "Lifecycle Management IP",
            subcategories: prevValues.LifecycleManagementIP,
          });
        } else {
          newFeatures[index].subcategories = prevValues.LifecycleManagementIP;
        }
      }

      if (prevValues.SearchAndDiscovery.length > 0) {
        const index = newFeatures.findIndex(
          (item) => item.category === "Search and Discovery"
        );
        if (index === -1) {
          newFeatures.push({
            category: "Search and Discovery",
            subcategories: prevValues.SearchAndDiscovery,
          });
        } else {
          newFeatures[index].subcategories = prevValues.SearchAndDiscovery;
        }
      }

      if (prevValues.StorageAndRepository.length > 0) {
        const index = newFeatures.findIndex(
          (item) => item.category === "Storage and Repository"
        );
        if (index === -1) {
          newFeatures.push({
            category: "Storage and Repository",
            subcategories: prevValues.StorageAndRepository,
          });
        } else {
          newFeatures[index].subcategories = prevValues.StorageAndRepository;
        }
      }

      if (prevValues.MatterLifecycleTracking.length > 0) {
        const index = newFeatures.findIndex(
          (item) => item.category === "Matter Lifecycle Tracking"
        );
        if (index === -1) {
          newFeatures.push({
            category: "Matter Lifecycle Tracking",
            subcategories: prevValues.MatterLifecycleTracking,
          });
        } else {
          newFeatures[index].subcategories = prevValues.MatterLifecycleTracking;
        }
      }

      if (prevValues.CourtAndCaseSearch.length > 0) {
        const index = newFeatures.findIndex(
          (item) => item.category === "Court and Case Search"
        );
        if (index === -1) {
          newFeatures.push({
            category: "Court and Case Search",
            subcategories: prevValues.CourtAndCaseSearch,
          });
        } else {
          newFeatures[index].subcategories = prevValues.CourtAndCaseSearch;
        }
      }

      if (prevValues.LitigationDocketingFeatures.length > 0) {
        const index = newFeatures.findIndex(
          (item) => item.category === "Litigation Docketing Features"
        );
        if (index === -1) {
          newFeatures.push({
            category: "Litigation Docketing Features",
            subcategories: prevValues.LitigationDocketingFeatures,
          });
        } else {
          newFeatures[index].subcategories =
            prevValues.LitigationDocketingFeatures;
        }
      }

      if (prevValues.WorkflowDesignAndConfiguration.length > 0) {
        const index = newFeatures.findIndex(
          (item) => item.category === "Workflow Design and Configuration"
        );
        if (index === -1) {
          newFeatures.push({
            category: "Workflow Design and Configuration",
            subcategories: prevValues.WorkflowDesignAndConfiguration,
          });
        } else {
          newFeatures[index].subcategories =
            prevValues.WorkflowDesignAndConfiguration;
        }
      }

      if (prevValues.AssignmentAllotmentAndTracking.length > 0) {
        const index = newFeatures.findIndex(
          (item) => item.category === "Assignment Allotment and Tracking"
        );
        if (index === -1) {
          newFeatures.push({
            category: "Assignment Allotment and Tracking",
            subcategories: prevValues.AssignmentAllotmentAndTracking,
          });
        } else {
          newFeatures[index].subcategories =
            prevValues.AssignmentAllotmentAndTracking;
        }
      }

      if (prevValues.DocumentCreationAndManagement.length > 0) {
        const index = newFeatures.findIndex(
          (item) => item.category === "Document Creation and Management"
        );
        if (index === -1) {
          newFeatures.push({
            category: "Document Creation and Management",
            subcategories: prevValues.DocumentCreationAndManagement,
          });
        } else {
          newFeatures[index].subcategories =
            prevValues.DocumentCreationAndManagement;
        }
      }

      if (prevValues.LawsComplianceAndRegulatoryTrackingIP.length > 0) {
        const index = newFeatures.findIndex(
          (item) =>
            item.category === "Laws, Compliance and Regulatory Tracking 2"
        );
        if (index === -1) {
          newFeatures.push({
            category: "Laws, Compliance and Regulatory Tracking 2",
            subcategories: prevValues.LawsComplianceAndRegulatoryTrackingIP,
          });
        } else {
          newFeatures[index].subcategories =
            prevValues.LawsComplianceAndRegulatoryTrackingIP;
        }
      }

      return {
        ...prevValues,
        features: newFeatures,
      };
    });
    // Validation logic
    const requiredFields = [
      "prname",
      "category",
      "deployment",
      "adoptionPeriod",
      "languages",
      "focusCountries",
      "description",
      "usp",
      "userCategory",
      "industry",
      "practiceAreas",
      "teamSize",
      "features",
    ];

    let isValid = true;
    requiredFields.forEach((field) => {
      const value = formValues[field as keyof FormValues];

      if (
        value === "" ||
        value === null ||
        (Array.isArray(value) && value.length === 0)
      ) {
        isValid = false;
        console.error(`Field ${field} is required.`);
      }
    });

    if (!isValid) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      setLoading(false);
      return; // Stop submission if validation fails
    }

    if (editing === false) {
      startTransition(async () => {
        try {
          toast({
            title: "Submitting Form",
            description:
              "Please wait while we process your request. And uploading Images and files to server",
            variant: "default",
          });

          let logoUrl = "";

          if (formValues.logo) {
            logoUrl = await uploadFile(formValues.logo as File, "logos");

            console.log(logoUrl);
          }
          let updatedImages: string[] = [];
          if (formValues.Images.length > 0) {
            updatedImages = await Promise.all(
              formValues.Images.map((image) =>
                uploadFile(image as File, "images")
              )
            );
            console.log(`first` + `${updatedImages}`);
          }
          let updatedAttachments: string[] = [];
          if (formValues.attachments.length > 0) {
            updatedAttachments = await Promise.all(
              formValues.attachments.map((attachment) =>
                uploadFile(attachment as File, "attachments")
              )
            );
            console.log(`first` + `${updatedAttachments}`);
          }

          const updatedFormValues = {
            ...formValues,
            userId: userId,
            logoUrl: logoUrl || formValues.logoUrl,
            ImageUrl:
              updatedImages.length > 0 ? updatedImages : formValues.ImageUrl,
            attachmentUrl:
              updatedAttachments.length > 0
                ? updatedAttachments
                : formValues.attachmentUrl,
          };
          console.log(updatedFormValues);
          setFormValues(updatedFormValues);

          const response = await fetch("/api/add-product", {
            method: "POST",
            body: JSON.stringify(updatedFormValues),
            headers: {
              "Content-Type": "application/json",
            },
          });

          const data = await response.json();

          // Handle success
          console.log("Form submitted successfully", data);
          if (data?.success === false) {
            toast({
              title: "Fail to create product",
              description: "Fail to create product",
              variant: "destructive",
            });
            return;
          } else {
            toast({
              title: "Form Submitted",
              description: "Thank you for your submission!",
              variant: "success",
            });
          }
        } catch (error) {
          console.error("Error submitting form", error);
          toast({
            title: "Fail to submit",
            description: "Got some internal error",
            variant: "destructive",
          });
        }
      });
    }

    if (editing === true) {
      startTransition(async () => {
        try {
          toast({
            title: "Submitting Form",
            description:
              "Please wait while we process your request. And uploading Images and files to server",
            variant: "default",
          });

          let logoUrl = "";

          if (formValues.logo) {
            logoUrl = await uploadFile(formValues.logo as File, "logos");

            console.log(logoUrl);
          }
          let updatedImages: string[] = [];
          if (formValues.Images.length > 0) {
            updatedImages = await Promise.all(
              formValues.Images.map((image) =>
                uploadFile(image as File, "images")
              )
            );
            console.log(`first` + `${updatedImages}`);
          }
          let updatedAttachments: string[] = [];
          if (formValues.attachments.length > 0) {
            updatedAttachments = await Promise.all(
              formValues.attachments.map((attachment) =>
                uploadFile(attachment as File, "attachments")
              )
            );
            console.log(`first` + `${updatedAttachments}`);
          }

          const updatedFormValues = {
            ...formValues,
            userId: userId,
            logoUrl: logoUrl || formValues.logoUrl,
            ImageUrl:
              updatedImages.length > 0 ? updatedImages : formValues.ImageUrl,
            attachmentUrl:
              updatedAttachments.length > 0
                ? updatedAttachments
                : formValues.attachmentUrl,
          };
          console.log(updatedFormValues);
          setFormValues(updatedFormValues);

          const response = await fetch("/api/edit-product", {
            method: "POST",
            body: JSON.stringify(updatedFormValues),
            headers: {
              "Content-Type": "application/json",
            },
          });

          const data = await response.json();

          // Handle success
          console.log("Form submitted successfully", data);
          if (data?.success === false) {
            toast({
              title: "Fail to create product",
              description: "Fail to create product",
              variant: "destructive",
            });
            return;
          } else {
            toast({
              title: "Form Submitted",
              description: "Thank you for your submission!",
              variant: "success",
            });
          }
        } catch (error) {
          console.error("Error submitting form", error);
          toast({
            title: "Fail to submit",
            description: "Got some internal error",
            variant: "destructive",
          });
        }
      });
    }

    // If validation passes, proceed with submission
    console.log("submitted");
    console.log(formValues);
    setLoading(false);

    nextStep(); // Move to the next step
  };

  const handleImagesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length <= 5) {
      setFormValues((prevValues) => ({
        ...prevValues,
        Images: Array.from(files),
      }));
    } else {
      alert("You can upload up to 5 images.");
      event.target.value = ""; // Clear the input field
    }
  };

  const handleAttachmentsChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length <= 2) {
      const validFiles = Array.from(files).filter(
        (file) => file.size <= 10 * 1024 * 1024
      );
      if (validFiles.length === files.length) {
        setFormValues((prevValues) => ({
          ...prevValues,
          attachments: validFiles,
        }));
      } else {
        alert("Each file must be less than 10 MB.");
        event.target.value = ""; // Clear the input field
      }
    } else {
      alert("You can upload up to 2 attachments.");
      event.target.value = ""; // Clear the input field
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className=" mt-2">
          <Label>
            Images{" "}
            <span className="text-yellow-500 italic text-xs">(up to 5)</span>
          </Label>
          <Input
            type="file"
            name="images"
            multiple
            accept="image/*"
            onChange={handleImagesChange}
          ></Input>
        </div>
        <div>
          <Label>Video Url</Label>
          <Input
            name="videoUrl"
            type="text"
            placeholder="Enter video url Only Youtube/vimeo"
            value={formValues.videoUrl}
            onChange={handleChange}
            required
          />
        </div>

        
        <div className=" mt-2">
          <Label>
            Attachments{" "}
            <span className="text-yellow-500 italic text-xs">(up to 2)</span>
          </Label>
          <Input
            type="file"
            name="attachments"
            multiple
            accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
            onChange={handleAttachmentsChange}
          ></Input>
        </div>
        <div>
          <Label>Instagram</Label>
          <Input
            name="instagramUrl"
            type="text"
            placeholder="Instagram Url"
            value={formValues.instagramUrl}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label>Linkedin</Label>
          <Input
            name="linkedinUrl"
            type="text"
            placeholder="Linkedin Url"
            value={formValues.linkedinUrl}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label>Twitter</Label>
          <Input
            name="twitterUrl"
            type="text"
            placeholder="Twitter  Url"
            value={formValues.twitterUrl}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label>Youtube </Label>
          <Input
            name="youtubeUrl"
            type="text"
            placeholder="Youtube Channel Url"
            value={formValues.youtubeUrl}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mt-4 flex flex-col md:flex-row items-center gap-4">
          <Button type="submit" className="bg-primary1">
            {loading
              ? editing
                ? "Saving edits..."
                : "Saving..."
              : "Save for Publish"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Form9;
