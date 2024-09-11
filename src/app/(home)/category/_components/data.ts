interface CategoryData {
  slug: string;
  name: string;
  description: string;
  desciptionClosure: string;
  blogLabel: string;
  blogHref: string;
  image: string;
  labels: string[];
}

export const data: CategoryData[] = [
  {
    slug: "client-relationship-management",
    name: "Client Relationship Management (CRM)",
    description:
      "Efficiently organise client data, communication logs, and client details in one convenient platform, ensuring personalised service and seamless interactions for your law firm",
    desciptionClosure: "Your personal client caretaker",
    blogLabel:
      "Check the guide to find the best Client Relationship Management (CRM) tools.",
    blogHref:
      "https://blog.dreamlegal.in/guide-to-find-best-client-relationship-management-for-lawyers/",
    image: "/CRM.jpg",
    labels: ["label1", "label2", "label3", "label4"],
  },
  {
    slug: "government-risk-and-compliance",
    name: "Governance, Risk and Compliance (GRC)",
    description:
      "Navigate complex regulatory landscapes and compliances using software designed to identify, assess, and mitigate risks, ensuring your firm's adherence to legal requirements and safeguarding against potential liabilities",
    desciptionClosure: "Your Legal Compliance Guardian",
    blogLabel:
      "Check the guide to find the best Governance, Risk and Compliance (GRC) tools.",
    blogHref:
      "https://blog.dreamlegal.in/guide-to-find-best-client-relationship-management-for-lawyers/",
    image: "/GRC.jpg",
    labels: ["label1", "label2", "label3", "label4"],
  },
  {
    slug: "contract-lifecycle-management",
    name: "Contract Lifecycle Management (CLM)",
    description:
      "From creation to execution, streamline the entire contract lifecycle by centralising document storage, automating workflows, and facilitating secure digital signatures, empowering your firm to manage contracts efficiently while minimising errors and delays",
    desciptionClosure: "Your Digital Contract Concierge",
    blogLabel:
      "Check the guide to find the best Contract Lifecycle Management (CLM) tools.",
    blogHref:
      "https://blog.dreamlegal.in/guide-to-find-best-contract-lifecycle-management-tools-for-lawyers/",
    image: "/CLM.jpg",
    labels: ["label1", "label2", "label3", "label4"],
  },
  {
    slug: "e-signature",
    name: "E-Signature",
    description:
      "Replace cumbersome paperwork with secure and legally binding electronic signatures, enabling quick and convenient document authentication for your legal transactions, all at the click of a button",
    desciptionClosure: "Your Virtual Signature Secretary",
    blogLabel: "Check the guide to find the best E-Signature tools",
    blogHref:
      "https://blog.dreamlegal.in/guide-to-find-best-e-signature-tools-for-lawyers/",
    image: "/esign.jpg",
    labels: ["label1", "label2", "label3", "label4"],
  },
  {
    slug: "document-management-system",
    name: "Document Management System (DMS)",
    description:
      "Effortlessly organise, retrieve, and create legal documents while reducing manual tasks through automation features, enhancing productivity and accuracy in your law practice",
    desciptionClosure: "Your document organisation Virtuoso",
    blogLabel:
      "Check the guide to find the best Document Management System (DMS) tools",
    blogHref:
      "https://blog.dreamlegal.in/guide-to-find-best-document-management-system-for-lawyers/",
    image: "/DMS.jpg",
    labels: ["label1", "label2", "label3", "label4"],
  },
  {
    slug: "e-billing-and-invoicing",
    name: "E-billing and invoicing",
    description:
      "Streamline your billing process and improve cash flow by generating accurate invoices, tracking payments, and managing client accounts electronically, saving time and reducing administrative burden",
    desciptionClosure: "Your billing and invoicing buddy",
    blogLabel:
      "Check the guide to find the best E-billing and invoicing tools.",
    blogHref:
      "https://blog.dreamlegal.in/guide-to-find-best-e-billing-and-invoicing-tools-for-lawyers/",
    image: "/ebilling.jpg",
    labels: ["label1", "label2", "label3", "label4"],
  },
  {
    slug: "e-discovery",
    name: "E-discovery",
    description:
      "Uncover critical evidence from vast digital datasets with powerful search and analysis tools, facilitating efficient and thorough investigations for litigation preparation and compliance purposes",
    desciptionClosure: "Your digital detective",
    blogLabel: "Check the guide to find the best E-discovery tools.",
    blogHref:
      "https://blog.dreamlegal.in/guide-to-find-best-e-discovery-tools-for-lawyers/",
    image: "/ediscovery.jpg",
    labels: ["label1", "label2", "label3", "label4"],
  },
  {
    slug: "intellectual-property-management",
    name: "Intellectual Property Management",
    description:
      "Safeguard your valuable intellectual assets by efficiently managing patents, trademarks, and copyrights, ensuring proper registration, protection, and enforcement of your creative rights",
    desciptionClosure: "Your Intellectual Property guardian",
    blogLabel:
      "Check the guide to find the best Intellectual Property Management",
    blogHref: "/",
    image: "/IPR.jpg",
    labels: ["label1", "label2", "label3", "label4"],
  },
  {
    slug: "litigation-management-and-analytics",
    name: "Litigation management and analytics",
    description:
      "Gain insights into case strategies and outcomes through data-driven analysis, optimising case management processes and empowering informed decision-making for your legal team",
    desciptionClosure: "Your Litigation Strategy Sidekick",
    blogLabel:
      "Check the guide to find the best Litigation management and analytics tools",
    blogHref: "/",
    image: "/Litigation.jpg",
    labels: ["label1", "label2", "label3", "label4"],
  },
  {
    slug: "legal-workflow-automation",
    name: "Legal Workflow Automation",
    description:
      "Automate routine tasks and workflows across your firm's processes, from case intake to resolution, increasing efficiency, reducing errors, and freeing up time for strategic legal work",
    desciptionClosure: "Your Legal Process Navigator",
    blogLabel:
      "Check the guide to find the best Legal Workflow Automation tools",
    blogHref: "/",
    image: "/workflow.jpg",
    labels: ["label1", "label2", "label3", "label4"],
  },
  {
    slug: "legal-research",
    name: "Legal Research",
    description:
      "Instant access to a vast repository of case law, statutes, and legal literature. With advanced search capabilities, AI-driven insights, and seamless integration into your workflow, streamline your research process, ensuring you stay ahead of the curve and deliver precise, informed legal advice",
    desciptionClosure: "Your Ultimate Legal Research Assistant",
    blogLabel: "Check the guide to find the best Legal Research  tools",
    blogHref: "/",
    image: "/Legal Research.jpg",
    labels: ["label1", "label2", "label3", "label4"],
  },
];
