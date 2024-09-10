"use client";
import { FormValues, useFormContext } from "@/context/formValueContext";

import { ChangeEvent, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useStepContext } from "@/context/formContext";
import { ProductInfo } from "@/store/useStore";


const ProductLifeCycle = () => {
   const { category, setCategory } = ProductInfo();

   // Handle checkbox change
   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
     const { name, value, checked } = e.target;
     setCategory((prevCategory) => {
       const updatedCategory = { ...prevCategory };
       
       if (checked) {
         if (!updatedCategory[name]) {
           updatedCategory[name] = [];
         }
         updatedCategory[name].push(value);
       } else {
         updatedCategory[name] = updatedCategory[name].filter((item: string) => item !== value);
       }
 
       return updatedCategory;
     });
   };
 
   // Handle form submission
   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
     e.preventDefault();
     
     // Add your validation logic here
     const isValid = validateForm();
     if (isValid) {
       console.log("Form submitted:", category);
       // Handle form submission, e.g., send data to the server
     } else {
       console.error("Form validation failed.");
     }
   };
 
   // Validation function to ensure at least one checkbox is selected in each category
   const validateForm = () => {
     // List of categories that must have at least one checkbox selected
     const requiredCategories = [
       "clientManagementSoftware",
       "ComplianceandRiskSoftware",
       "contractManageSoftware",
       "DigitalSignature",
       "DocumnetManagement",
       "Ebilling",
       "Ediscovery",
       "IPManagement",
       "LitigationManagement",
       "legalWorkflow",
       "legalResearch"
     ];
 
     // Check if at least one checkbox is selected for each required category
     for (const categoryName of requiredCategories) {
       if (!category[categoryName] || category[categoryName].length === 0) {
         return false; // Validation failed
       }
     }
 
     return true; // Validation passed
   };


  return (
    <div>
      <div className="mt-4 ">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
          <div>
            {category.includes("Client Relationship Management ") && (
              <div className="mt-2">
                <div className="mt-2">
                  <Label htmlFor="deployment">
                    Customer Relation Management
                  </Label>
                  {[
                    "Intake",
                    "Assessment",
                    "Strategize",
                    "Represent",
                    "Communication",
                    "Review",
                  ].map((crm) => (
                    <div key={crm} className="items-top flex space-x-2 mt-2">
                      <Input
                        name="clientManagementSoftware"
                        type="checkbox"
                        value={crm}
                        checked={category.clientManagementSoftware.includes(
                          crm
                        )}
                        onChange={handleChange}
                        className="w-5 h-5"
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label className="text-sm font-medium leading-none">
                          {crm}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {category.includes(
              "Governance, Risk and Compliance"
            ) && (
              <div className="mt-2">
                <div className="mt-2">
                  <Label htmlFor="deployment">
                    Governance, Risk and Compliance
                  </Label>
                  {[
                    "Coverage",
                    "Assessment",
                    "Validation",
                    "Implementation",
                    "Monitoring",
                    "Analysis",
                  ].map((crm) => (
                    <div key={crm} className="items-top flex space-x-2 mt-2">
                      <Input
                        name="ComplianceandRiskSoftware"
                        type="checkbox"
                        value={crm}
                        checked={category.ComplianceandRiskSoftware.includes(
                          crm
                        )}
                        onChange={handleChange}
                        className="w-5 h-5"
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label className="text-sm font-medium leading-none">
                          {crm}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {category.includes("Contract Lifecycle Management") && (
              <div className="mt-2">
                <div className="mt-2">
                  <Label htmlFor="deployment">
                    Contract Lifecycle Management
                  </Label>
                  {[
                    "Create",
                    "Negotiation",
                    "Authentication",
                    "Execute",
                    "Store",
                    "Tracking",
                  ].map((crm) => (
                    <div key={crm} className="items-top flex space-x-2 mt-2">
                      <Input
                        name="contractManageSoftware"
                        type="checkbox"
                        value={crm}
                        checked={category.contractManageSoftware.includes(
                          crm
                        )}
                        onChange={handleChange}
                        className="w-5 h-5"
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label className="text-sm font-medium leading-none">
                          {crm}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {category.includes("E-Signature") && (
              <div className="mt-2">
                <div className="mt-2">
                  <Label htmlFor="deployment">E-Signature</Label>
                  {[
                    "Document Preparation",
                    "Authentication",
                    "Signing",
                    "Encryption",
                    "Verification",
                    "Distribution",
                  ].map((crm) => (
                    <div key={crm} className="items-top flex space-x-2 mt-2">
                      <Input
                        name="DigitalSignature"
                        type="checkbox"
                        value={crm}
                        checked={category.DigitalSignature.includes(crm)}
                        onChange={handleChange}
                        className="w-5 h-5"
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label className="text-sm font-medium leading-none">
                          {crm}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {category.includes(
              "Document Management System"
            ) && (
              <div className="mt-2">
                <div className="mt-2">
                  <Label htmlFor="deployment">
                    Document Management System Software
                  </Label>
                  {[
                    "Capture",
                    "Change management",
                    "Review",
                    "Organize",
                    "Access management",
                    "Retrieval",
                  ].map((crm) => (
                    <div key={crm} className="items-top flex space-x-2 mt-2">
                      <Input
                        name="DocumnetManagement"
                        type="checkbox"
                        value={crm}
                        checked={category.DocumnetManagement.includes(crm)}
                        onChange={handleChange}
                        className="w-5 h-5"
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label className="text-sm font-medium leading-none">
                          {crm}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {category.includes("E-billing and Invoicing") && (
              <div className="mt-2">
                <div className="mt-2">
                  <Label htmlFor="deployment">E-billing and Invoicing</Label>
                  {[
                    "Invoice generation",
                    "Authorization",
                    "Distribution and Accessibility",
                    "Payment Faciliation",
                    "Tracking",
                    "Analysis",
                  ].map((crm) => (
                    <div key={crm} className="items-top flex space-x-2 mt-2">
                      <Input
                        name="Ebilling"
                        type="checkbox"
                        value={crm}
                        checked={category.Ebilling.includes(crm)}
                        onChange={handleChange}
                        className="w-5 h-5"
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label className="text-sm font-medium leading-none">
                          {crm}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {category.includes("E-discovery") && (
              <div className="mt-2">
                <div className="mt-2">
                  <Label htmlFor="deployment">E-discovery</Label>
                  {[
                    "Discover",
                    "Preserve",
                    "Acquire",
                    "Examine",
                    "Evaluate",
                    "Present",
                  ].map((crm) => (
                    <div key={crm} className="items-top flex space-x-2 mt-2">
                      <Input
                        name="Ediscovery"
                        type="checkbox"
                        value={crm}
                        checked={category.Ediscovery.includes(crm)}
                        onChange={handleChange}
                        className="w-5 h-5"
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label className="text-sm font-medium leading-none">
                          {crm}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {category.includes(
              "Intellectual Property Management"
            ) && (
              <div className="mt-2">
                <div className="mt-2">
                  <Label htmlFor="deployment">IP Management Software</Label>
                  {[
                    "Cataloging",
                    "Analysis",
                    "Protection",
                    "Monitoring",
                    "Enforcement",
                    "Reporting",
                  ].map((crm) => (
                    <div key={crm} className="items-top flex space-x-2 mt-2">
                      <Input
                        name="IPManagement"
                        type="checkbox"
                        value={crm}
                        checked={category.IPManagement.includes(crm)}
                        onChange={handleChange}
                        className="w-5 h-5"
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label className="text-sm font-medium leading-none">
                          {crm}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {category.includes(
              "Litigation Management and Analytics"
            ) && (
              <div className="mt-2">
                <div className="mt-2">
                  <Label htmlFor="deployment">
                    Litigation Management and analytics
                  </Label>
                  {[
                    "Intake",
                    "Strategize",
                    "Preparation",
                    "Litigation Support",
                    "Analytics",
                    "Outcome evaluation",
                  ].map((crm) => (
                    <div key={crm} className="items-top flex space-x-2 mt-2">
                      <Input
                        name="LitigationManagement"
                        type="checkbox"
                        value={crm}
                        checked={category.LitigationManagement.includes(crm)}
                        onChange={handleChange}
                        className="w-5 h-5"
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label className="text-sm font-medium leading-none">
                          {crm}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {category.includes("Legal Workflow Automation") && (
              <div className="mt-2">
                <div className="mt-2">
                  <Label htmlFor="deployment">Legal Workflow Automation</Label>
                  {[
                    "Process Identification",
                    "Workflow configuration",
                    "Validation",
                    "Implementation",
                    "Tracking",
                    "Optimization",
                  ].map((crm) => (
                    <div key={crm} className="items-top flex space-x-2 mt-2">
                      <Input
                        name="legalWorkflow"
                        type="checkbox"
                        value={crm}
                        checked={category.legalWorkflow.includes(crm)}
                        onChange={handleChange}
                        className="w-5 h-5"
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label className="text-sm font-medium leading-none">
                          {crm}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

             {category.includes(
             "Legal Research"
            ) && (
              <div className="mt-2">
                <div className="mt-2">
                  <Label htmlFor="deployment">
                   Legal Research
                  </Label>
                  {[
                     "Query Identification",
                     " Source and Type Selection",
                     " Filtration and sorting",
                     " Data extraction",
                      "Data Analysis and Organization",
                      "Storage or retrieval"
                  ].map((crm) => (
                    <div key={crm} className="items-top flex space-x-2 mt-2">
                      <Input
                        name="LitigationManagement"
                        type="checkbox"
                        value={crm}
                        checked={category.legalResearch.includes(crm)}
                        onChange={handleChange}
                        className="w-5 h-5"
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label className="text-sm font-medium leading-none">
                          {crm}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="mt-4 flex flex-col md:flex-row items-center gap-4">
            <Button type="submit" className="bg-primary1">
             submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default  ProductLifeCycle;
