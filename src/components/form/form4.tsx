"use client";
import { FormValues, useFormContext } from "@/context/formValueContext";

import { ChangeEvent, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useStepContext } from "@/context/formContext";

function Form4() {
  const { formValues, setFormValues } = useFormContext();

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
      <div className="mt-4 ">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
          <div>
            {formValues.category.includes("Client Management Software") && (
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
                        checked={formValues.clientManagementSoftware.includes(
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

            {formValues.category.includes(
              "Governance and Compliance and Risk Management"
            ) && (
              <div className="mt-2">
                <div className="mt-2">
                  <Label htmlFor="deployment">
                    Governance and Compliance and Risk Management
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
                        checked={formValues.ComplianceandRiskSoftware.includes(
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

            {formValues.category.includes("Contract Management Software") && (
              <div className="mt-2">
                <div className="mt-2">
                  <Label htmlFor="deployment">
                    Contract Management Software
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
                        checked={formValues.contractManageSoftware.includes(
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

            {formValues.category.includes("Digital Signature") && (
              <div className="mt-2">
                <div className="mt-2">
                  <Label htmlFor="deployment">Digital Signature</Label>
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
                        checked={formValues.DigitalSignature.includes(crm)}
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

            {formValues.category.includes(
              "Document Management and Automation"
            ) && (
              <div className="mt-2">
                <div className="mt-2">
                  <Label htmlFor="deployment">
                    Document Management and Automation Software
                  </Label>
                  {[
                    "Capture",
                    "Change management",
                    "Review",
                    "Organize",
                    "Access management",
                    "Retrival",
                  ].map((crm) => (
                    <div key={crm} className="items-top flex space-x-2 mt-2">
                      <Input
                        name="DocumnetManagement"
                        type="checkbox"
                        value={crm}
                        checked={formValues.DocumnetManagement.includes(crm)}
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

            {formValues.category.includes("E-billing and Invoicing") && (
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
                        checked={formValues.Ebilling.includes(crm)}
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

            {formValues.category.includes("E-discovery") && (
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
                        checked={formValues.Ediscovery.includes(crm)}
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

            {formValues.category.includes(
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
                        checked={formValues.IPManagement.includes(crm)}
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

            {formValues.category.includes(
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
                        checked={formValues.LitigationManagement.includes(crm)}
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

            {formValues.category.includes("Legal Workflow Automation") && (
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
                        checked={formValues.legalWorkflow.includes(crm)}
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
            <Button type="submit" className="bg-primary1" disabled={loading}>
              {loading ? "Saving" : "Next"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form4;
