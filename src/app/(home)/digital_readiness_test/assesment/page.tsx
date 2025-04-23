// "use client";

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Progress } from "@/components/ui/progress";
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectValue,
//     SelectTrigger,
// } from "@/components/ui/select";
// import {
//     Card,
//     CardHeader,
//     CardContent,
//     CardFooter,
// } from "@/components/ui/card";
// import jsPDF from "jspdf";

// import { PDFDocument, rgb, StandardFonts, degrees } from 'pdf-lib';
// import fontkit from '@pdf-lib/fontkit';

// const legalDepartmentQuestions = [
//     {
//         question: "How effectively does your team manage contracts?",
//         category: "Contracts",
//         options: [
//             {
//                 text: "We have a centralized repository for all contracts.",
//                 techScore: 2,
//                 efficiencyScore: 1,
//             },
//             {
//                 text: "Contracts are automatically drafted or templatized.",
//                 techScore: 2,
//                 efficiencyScore: 2,
//             },
//             {
//                 text: "We have a system to track contract renewals and deadlines.",
//                 techScore: 2,
//                 efficiencyScore: 2,
//             },
//             {
//                 text: "We use AI to review contracts.",
//                 techScore: 3,
//                 efficiencyScore: 3,
//             },
//             {
//                 text: "We have time alert specific obligation management.",
//                 techScore: 1,
//                 efficiencyScore: 2,
//             },
//         ],
//     },
//     {
//         question: "How effectively does your team manage compliances?",
//         category: "Compliance",
//         options: [
//             {
//                 text: "We use automated regulatory tracking tools to monitor relevant legal changes.",
//                 techScore: 3,
//                 efficiencyScore: 2,
//             },
//             {
//                 text: "We maintain a systematic compliance calendar with reminders for key deadlines.",
//                 techScore: 2,
//                 efficiencyScore: 2,
//             },
//             {
//                 text: "We have a centralized digital repository for all compliance documentation.",
//                 techScore: 2,
//                 efficiencyScore: 1,
//             },
//             {
//                 text: "We utilize workflow automation for routine compliance processes.",
//                 techScore: 2,
//                 efficiencyScore: 2,
//             },
//             {
//                 text: "We implement compliance analytics dashboards to track and report on key metrics.",
//                 techScore: 1,
//                 efficiencyScore: 3,
//             },
//         ],
//     },
//     {
//         question:
//             "How effectively does your team manage Intellectual Property?",
//         category: "Intellectual Property (IP) Management",
//         options: [
//             {
//                 text: "We have a centralized IP management system for tracking patents, trademarks, and copyrights.",
//                 techScore: 2,
//                 efficiencyScore: 1,
//             },
//             {
//                 text: "AI-driven tools monitor potential IP infringements and unauthorized usage.",
//                 techScore: 3,
//                 efficiencyScore: 2,
//             },
//             {
//                 text: "We use automated alerts for IP renewal deadlines and maintenance filings.",
//                 techScore: 2,
//                 efficiencyScore: 2,
//             },
//             {
//                 text: "AI-powered tools assist in prior art searches and competitive IP analysis.",
//                 techScore: 3,
//                 efficiencyScore: 3,
//             },
//             {
//                 text: "We integrate IP risk assessment tools into our overall compliance framework.",
//                 techScore: 2,
//                 efficiencyScore: 2,
//             },
//         ],
//     },
//     {
//         question: "How effectively does your team manage internal support?",
//         category: "Internal Support",
//         options: [
//             {
//                 text: "A centralized legal helpdesk or portal is available for internal teams to request legal assistance.",
//                 techScore: 2,
//                 efficiencyScore: 2,
//             },
//             {
//                 text: "Automated intake and triage tools categorize and prioritize internal legal queries.",
//                 techScore: 3,
//                 efficiencyScore: 2,
//             },
//             {
//                 text: "We use AI-assisted chatbots for answering common legal FAQs.",
//                 techScore: 3,
//                 efficiencyScore: 2,
//             },
//             {
//                 text: "Our legal team operates through integrated communication platforms for seamless collaboration.",
//                 techScore: 1,
//                 efficiencyScore: 2,
//             },
//             {
//                 text: "We maintain department-specific legal data rooms for easy access to relevant documents.",
//                 techScore: 1,
//                 efficiencyScore: 2,
//             },
//         ],
//     },
//     {
//         question:
//             "How effectively does your team manage Litigation management?",
//         category: "Litigation Management",
//         options: [
//             {
//                 text: "We have a centralized matter management systems for organizing case information.",
//                 techScore: 2,
//                 efficiencyScore: 2,
//             },
//             {
//                 text: "We have automated workflows for tracking litigation progress and deadlines.",
//                 techScore: 2,
//                 efficiencyScore: 2,
//             },
//             {
//                 text: "We use AI-driven tools for predictive analysis on case outcomes.",
//                 techScore: 3,
//                 efficiencyScore: 2,
//             },
//             {
//                 text: "We follow structured checklists for collecting and authenticating evidence.",
//                 techScore: 2,
//                 efficiencyScore: 2,
//             },
//             {
//                 text: "We have access to legal research databases for staying updated on relevant precedents.",
//                 techScore: 1,
//                 efficiencyScore: 2,
//             },
//         ],
//     },
// ];

// const lawFirmQuestions = [
//     {
//         question:
//             "How effectively does your team manage client and matter management?",
//         category: "Client & Matter Management",
//         options: [
//             {
//                 text: "We have a centralized matter management system to track all cases and clients.",
//                 techScore: 2,
//                 efficiencyScore: 1,
//             },
//             {
//                 text: "Our firm uses client intake and onboarding automation tools.",
//                 techScore: 2,
//                 efficiencyScore: 2,
//             },
//             {
//                 text: "We utilize conflict-checking software before taking on new matters.",
//                 techScore: 2,
//                 efficiencyScore: 2,
//             },
//             {
//                 text: "Our system integrates client communication logs and case-related emails.",
//                 techScore: 2,
//                 efficiencyScore: 2,
//             },
//             {
//                 text: "We use AI-powered tools for client risk assessment and matter predictions.",
//                 techScore: 2,
//                 efficiencyScore: 3,
//             },
//         ],
//     },
//     {
//         question:
//             "How effectively does your team manage Document & Knowledge Management?",
//         category: "Document & Knowledge Management",
//         options: [
//             {
//                 text: "We have a centralized document management system for storing and retrieving legal files.",
//                 techScore: 2,
//                 efficiencyScore: 1,
//             },
//             {
//                 text: "Our firm utilizes version control to track document changes and prevent errors.",
//                 techScore: 2,
//                 efficiencyScore: 2,
//             },
//             {
//                 text: "We use AI-assisted document automation for drafting contracts and pleadings.",
//                 techScore: 3,
//                 efficiencyScore: 2,
//             },
//             {
//                 text: "There is a firm-wide knowledge repository for legal research and case precedents.",
//                 techScore: 2,
//                 efficiencyScore: 2,
//             },
//             {
//                 text: "We use AI-powered tools for document review and due diligence.",
//                 techScore: 3,
//                 efficiencyScore: 3,
//             },
//         ],
//     },
//     {
//         question: "How effectively does your team manage Billing and finance?",
//         category: "Billing & Finance",
//         options: [
//             {
//                 text: "We use an automated time tracking and billing system.",
//                 techScore: 2,
//                 efficiencyScore: 1,
//             },
//             {
//                 text: "Our firm supports multiple billing models (hourly, fixed, contingency, alternative fee arrangements).",
//                 techScore: 2,
//                 efficiencyScore: 2,
//             },
//             {
//                 text: "We have an e-billing system for invoicing and compliance with client guidelines.",
//                 techScore: 2,
//                 efficiencyScore: 2,
//             },
//             {
//                 text: "AI-powered analytics help us forecast revenue and financial trends.",
//                 techScore: 3,
//                 efficiencyScore: 2,
//             },
//             {
//                 text: "We have automated alerts for unpaid invoices and overdue accounts.",
//                 techScore: 1,
//                 efficiencyScore: 3,
//             },
//         ],
//     },
//     {
//         question:
//             "How effectively does your firm handle litigation and case strategy?",
//         category: "Litigation & Case Strategy",
//         options: [
//             {
//                 text: "AI-driven legal research tools help us analyze case laws and precedents.",
//                 techScore: 3,
//                 efficiencyScore: 2,
//             },
//             {
//                 text: "We use litigation analytics to assess judge and opposing counsel tendencies.",
//                 techScore: 3,
//                 efficiencyScore: 2,
//             },
//             {
//                 text: "Our firm has structured workflows for evidence collection and authentication.",
//                 techScore: 2,
//                 efficiencyScore: 2,
//             },
//             {
//                 text: "Predictive analytics help us assess case outcomes and risk factors.",
//                 techScore: 3,
//                 efficiencyScore: 3,
//             },
//             {
//                 text: "We have automated calendaring for court deadlines and litigation tasks.",
//                 techScore: 2,
//                 efficiencyScore: 1,
//             },
//         ],
//     },
//     {
//         question:
//             "How effectively does your firm leverage automation for practice growth?",
//         category: "Practice Development & Automation",
//         options: [
//             {
//                 text: "We use client relationship management (CRM) tools to track leads and interactions.",
//                 techScore: 2,
//                 efficiencyScore: 1,
//             },
//             {
//                 text: "Marketing automation tools help us manage firm outreach and branding.",
//                 techScore: 2,
//                 efficiencyScore: 2,
//             },
//             {
//                 text: "Chatbots or automated assistants handle basic client queries.",
//                 techScore: 3,
//                 efficiencyScore: 2,
//             },
//             {
//                 text: "Legal workflow automation improves efficiency in routine processes.",
//                 techScore: 3,
//                 efficiencyScore: 2,
//             },
//             {
//                 text: "We leverage dashboards for firm-wide performance tracking and insights.",
//                 techScore: 2,
//                 efficiencyScore: 3,
//             },
//         ],
//     },
// ];

// export default function LegalForm() {
//     const [firmType, setFirmType] = useState("");
//     const [currentQuestion, setCurrentQuestion] = useState(0);
//     const [answers, setAnswers] = useState({});
//     const [isComplete, setIsComplete] = useState(false);
//     const [teamSize, setTeamSize] = useState("");

//     const questions =
//         firmType === "legal-department"
//             ? legalDepartmentQuestions
//             : lawFirmQuestions;

//     const teamSizeOptions = [
//         "1 Person",
//         "2-20 Persons",
//         "21-50 Persons",
//         "51-200 Persons",
//         "201-500 Persons",
//         "500+ Persons"
//     ];

//     const calculateCategoryScores = (questionIndex, selectedOptions) => {
//         const question = questions[questionIndex];
//         let totalTechScore = 0;
//         let totalEfficiencyScore = 0;
//         let maxTechScore = 0;
//         let maxEfficiencyScore = 0;

//         // Calculate scores for selected options
//         selectedOptions.forEach((optionIndex) => {
//             const option = question.options[optionIndex];
//             totalTechScore += option.techScore;
//             totalEfficiencyScore += option.efficiencyScore;
//         });

//         // Calculate maximum possible scores
//         question.options.forEach((option) => {
//             maxTechScore += option.techScore;
//             maxEfficiencyScore += option.efficiencyScore;
//         });

//         return {
//             category: question.category,
//             techScore: (totalTechScore / maxTechScore) * 100,
//             efficiencyScore: (totalEfficiencyScore / maxEfficiencyScore) * 100,
//         };
//     };

//     const calculateFinalScores = () => {
//         if (Object.keys(answers).length === 0) {
//             return {
//                 technologyScore: 0,
//                 efficiencyScore: 0,
//                 totalScore: 0,
//             };
//         }

//         const categoryScores = Object.entries(answers).map(
//             ([questionIndex, selectedOptions]) =>
//                 calculateCategoryScores(
//                     parseInt(questionIndex),
//                     selectedOptions
//                 )
//         );

//         const overallScores = categoryScores.reduce(
//             (acc, score) => ({
//                 techScore: acc.techScore + score.techScore,
//                 efficiencyScore: acc.efficiencyScore + score.efficiencyScore,
//             }),
//             { techScore: 0, efficiencyScore: 0 }
//         );

//         const avgTechScore = overallScores.techScore / categoryScores.length;
//         const avgEfficiencyScore =
//             overallScores.efficiencyScore / categoryScores.length;
//         const finalScore = 0.6 * avgEfficiencyScore + 0.4 * avgTechScore;

//         return {
//             technologyScore: avgTechScore.toFixed(2),
//             efficiencyScore: avgEfficiencyScore.toFixed(2),
//             totalScore: finalScore.toFixed(2),
//         };
//     };

//     const handleNext = () => {
//         if (currentQuestion < questions.length - 1) {
//             setCurrentQuestion((prev) => prev + 1);
//         } else {
//             setIsComplete(true);
//         }
//     };

//     const handlePrevious = () => {
//         if (currentQuestion > 0) {
//             setCurrentQuestion((prev) => prev - 1);
//         }
//     };

//     const handleCheckboxChange = (optionIndex) => {
//         setAnswers((prev) => {
//             const currentAnswers = prev[currentQuestion] || [];
//             const updatedAnswers = currentAnswers.includes(optionIndex)
//                 ? currentAnswers.filter((index) => index !== optionIndex)
//                 : [...currentAnswers, optionIndex];

//             return {
//                 ...prev,
//                 [currentQuestion]: updatedAnswers,
//             };
//         });
//     };

//     const getScoreComment = (score) => {
//         if (score <= 20) {
//             return "Legal operations are at high risk due to poor technology adoption and inefficient workflows, leading to delays, compliance risks, and high workload.";
//         } else if (score <= 40) {
//             return "Foundational digital tools exist but are poorly integrated, making workflows slow, error-prone, and dependent on manual efforts.";
//         } else if (score <= 60) {
//             return "Legal operations are partially automated, but inefficiencies in integration and execution limit overall effectiveness.";
//         } else if (score <= 80) {
//             return "Well-structured legal operations with strong process control, though some manual processes and tech limitations still create bottlenecks.";
//         } else {
//             return "Highly optimized legal team with seamless automation, potentially AI-driven insights, and efficient workflows maximizing speed, compliance, and accuracy.";
//         }
//     };

//     const getEfficiencyComment = (score) => {
//         if (score <= 20) {
//             return "Workflows are highly disorganized, with excessive manual interventions causing bottlenecks, errors, and compliance risks.";
//         } else if (score <= 40) {
//             return "Basic processes exist, but reliance on manual tracking slows execution, leading to frequent delays and operational inefficiencies.";
//         } else if (score <= 60) {
//             return "Some automation implemented, but inconsistencies in execution prevent seamless workflows, causing avoidable rework and inefficiencies.";
//         } else if (score <= 80) {
//             return "Operations are structured and well-executed, with minimal friction, though some manual interventions still affect speed and accuracy.";
//         } else {
//             return "Fully optimized workflows ensure high-speed execution, with proactive tracking and automation eliminating operational delays.";
//         }
//     };

//     const getTechnologyComment = (score) => {
//         if (score <= 20) {
//             return "Legal operations rely entirely on manual processes, with little to no adoption of digital tools, creating high inefficiency and compliance risks.";
//         } else if (score <= 40) {
//             return "Some basic tools (e.g., spreadsheets, shared drives) are in use, but lack of integration limits their impact on overall workflow efficiency.";
//         } else if (score <= 60) {
//             return "Core legal technologies exist but are not fully automated, leading to gaps in workflow execution.";
//         } else if (score <= 80) {
//             return "Strong legal tech adoption, with well-integrated tools enhancing efficiency, though AI-driven optimizations are still underutilized.";
//         } else {
//             return "Fully digitized and potentially AI-powered legal operations, leveraging automation and analytics to optimize performance and risk management.";
//         }
//     };

//     const getCategoryObservations = (category: string, implemented: string[], notImplemented: string[]) => {
//         const observations = {
//             Contracts: {
//                 "We have a centralized repository for all contracts.": {
//                     implemented: "Your team has established a centralized contract repository, ensuring quick access, improved organization, and reduced document chaos.",
//                     notImplemented: "The absence of a centralized repository has led to scattered contracts, inefficient retrieval, and potential risk exposure."
//                 },
//                 "Contracts are automatically drafted or templatized.": {
//                     implemented: "Standardized contract templates streamline drafting, reducing errors and improving turnaround time.",
//                     notImplemented: "Manual drafting increases inconsistencies, prolongs contract creation, and raises compliance risks."
//                 },
//                 "We have a system to track contract renewals and deadlines.": {
//                     implemented: "Automated tracking of contract renewals and deadlines minimizes missed obligations and ensures compliance.",
//                     notImplemented: "Lack of a tracking system results in higher risks of contract breaches and increased administrative workload."
//                 },
//                 "We use AI to review contracts.": {
//                     implemented: "AI-powered contract review accelerates risk assessment and enhances accuracy in identifying key clauses.",
//                     notImplemented: "Manual contract review is slow, prone to errors, and lacks comprehensive risk detection."
//                 },
//                 "We have time alert specific obligation management.": {
//                     implemented: "Automated alerts ensure timely compliance with contract obligations, reducing disputes and financial penalties.",
//                     notImplemented: "Without alerts, obligations may be overlooked, increasing legal and operational risks."
//                 }
//             },
//             Compliance: {
//                 "We use automated regulatory tracking tools to monitor relevant legal changes.": {
//                     implemented: "Real-time tracking of regulatory updates helps the team stay compliant with changing laws.",
//                     notImplemented: "Manual tracking increases the risk of non-compliance and legal repercussions."
//                 },
//                 "We maintain a systematic compliance calendar with reminders for key deadlines.": {
//                     implemented: "A structured compliance calendar centralizes regulatory deadlines, reducing missed filings.",
//                     notImplemented: "Without a compliance calendar, teams struggle to track obligations, leading to potential regulatory penalties."
//                 },
//                 "We have a centralized digital repository for all compliance documentation.": {
//                     implemented: "A dedicated repository ensures compliance documents are organized and easily retrievable.",
//                     notImplemented: "Fragmented storage complicates audits and increases the risk of missing critical compliance records."
//                 },
//                 "We utilize workflow automation for routine compliance processes.": {
//                     implemented: "Automated workflows standardize compliance procedures, reducing manual errors and inefficiencies.",
//                     notImplemented: "Without automation, compliance tasks are inconsistent, increasing administrative burdens."
//                 },
//                 "We implement compliance analytics dashboards to track and report on key metrics.": {
//                     implemented: "Real-time analytics provide insights into compliance trends and risks, enabling proactive decision-making.",
//                     notImplemented: "Limited visibility into compliance performance can lead to reactive risk management and higher penalties."
//                 }
//             },
//             "Intellectual Property (IP) Management": {
//                 "We have a centralized IP management system for tracking patents, trademarks, and copyrights.": {
//                     implemented: "A structured system ensures efficient tracking of patents, trademarks, and copyrights.",
//                     notImplemented: "Decentralized IP tracking increases the risk of missed filings and IP loss."
//                 },
//                 "AI-driven tools monitor potential IP infringements and unauthorized usage.": {
//                     implemented: "Automated monitoring detects potential infringements, allowing proactive protection of assets.",
//                     notImplemented: "Without AI monitoring, IP violations may go unnoticed, increasing legal risks."
//                 },
//                 "We use automated alerts for IP renewal deadlines and maintenance filings.": {
//                     implemented: "Renewal reminders prevent unintentional lapses in IP rights.",
//                     notImplemented: "Missed renewal deadlines may result in the loss of valuable intellectual property."
//                 },
//                 "AI-powered tools assist in prior art searches and competitive IP analysis.": {
//                     implemented: "AI accelerates patent research, improving the quality and efficiency of filings.",
//                     notImplemented: "Manual prior art searches are time-intensive and prone to oversight."
//                 },
//                 "We integrate IP risk assessment tools into our overall compliance framework.": {
//                     implemented: "Structured risk assessment tools enhance IP protection strategies and competitive analysis.",
//                     notImplemented: "Without assessment tools, IP risks may be underestimated, leading to weak enforcement."
//                 }
//             },
//             "Internal Support": {
//                 "A centralized legal helpdesk or portal is available for internal teams to request legal assistance.": {
//                     implemented: "A legal helpdesk centralizes support requests, improving tracking and resolution times.",
//                     notImplemented: "Lack of a centralized system results in inefficient, scattered legal support requests."
//                 },
//                 "Automated intake and triage tools categorize and prioritize internal legal queries.": {
//                     implemented: "Automation categorizes and prioritizes legal queries, ensuring efficient response management.",
//                     notImplemented: "Manual request handling delays responses and increases routing errors."
//                 },
//                 "We use AI-assisted chatbots for answering common legal FAQs.": {
//                     implemented: "Chatbots provide instant responses, reducing repetitive queries for legal teams.",
//                     notImplemented: "Without AI chatbots, employees rely on manual interactions, consuming valuable legal resources."
//                 },
//                 "Our legal team operates through integrated communication platforms for seamless collaboration.": {
//                     implemented: "Seamless communication enhances collaboration across legal and business teams.",
//                     notImplemented: "Fragmented communication channels lead to delays and misalignment between teams."
//                 },
//                 "We maintain department-specific legal data rooms for easy access to relevant documents.": {
//                     implemented: "Secure data rooms ensure controlled access to sensitive legal documents.",
//                     notImplemented: "Lack of structured data rooms increases security risks and complicates information sharing."
//                 }
//             },
//             "Litigation Management": {
//                 "We have a centralized matter management systems for organizing case information.": {
//                     implemented: "Litigation cases are well-organized, enabling efficient tracking and document retrieval.",
//                     notImplemented: "Lack of a centralized system complicates case tracking and increases risks of disorganization."
//                 },
//                 "We have automated workflows for tracking litigation progress and deadlines.": {
//                     implemented: "Automated workflows enhance case progress tracking and prevent missed deadlines.",
//                     notImplemented: "Manual litigation tracking leads to delays and administrative inefficiencies."
//                 },
//                 "We use AI-driven tools for predictive analysis on case outcomes.": {
//                     implemented: "Data-driven insights improve case strategy and risk evaluation.",
//                     notImplemented: "Without predictive analysis, legal teams rely solely on experience, missing key risk factors."
//                 },
//                 "We follow structured checklists for collecting and authenticating evidence.": {
//                     implemented: "Evidence management is systematic, reducing procedural errors and inconsistencies.",
//                     notImplemented: "Without checklists, evidence handling becomes prone to oversight and mismanagement."
//                 },
//                 "We have access to legal research databases for staying updated on relevant precedents.": {
//                     implemented: "Quick access to legal research strengthens case arguments and preparation.",
//                     notImplemented: "Without legal research tools, case preparation is slower and less comprehensive."
//                 }
//             },
//             "Client & Matter Management": {
//                 "We have a centralized matter management system to track all cases and clients.": {
//                     implemented: "All client matters are systematically tracked, improving workflow efficiency and organization.",
//                     notImplemented: "Lack of a centralized system leads to fragmented client management and potential service delays."
//                 },
//                 "Our firm uses client intake and onboarding automation tools.": {
//                     implemented: "New clients are onboarded smoothly with minimal manual intervention, ensuring consistency.",
//                     notImplemented: "Manual onboarding creates inconsistencies, increasing processing time and administrative burden."
//                 },
//                 "We utilize conflict-checking software before taking on new matters.": {
//                     implemented: "Potential conflicts of interest are quickly identified, reducing ethical and legal risks.",
//                     notImplemented: "Manual conflict checks are slow and error-prone, increasing regulatory non-compliance risks."
//                 },
//                 "Our system integrates client communication logs and case-related emails.": {
//                     implemented: "All client interactions are recorded centrally, enhancing transparency and accessibility.",
//                     notImplemented: "Scattered communication records make it harder to track interactions, leading to inefficiencies."
//                 },
//                 "We use AI-powered tools for client risk assessment and matter predictions.": {
//                     implemented: "AI provides advanced risk profiling, helping firms make data-driven client decisions.",
//                     notImplemented: "Risk evaluations remain subjective, increasing exposure to unexpected legal and financial risks."
//                 }
//             },
//             "Document & Knowledge Management": {
//                 "We have a centralized document management system for storing and retrieving legal files.": {
//                     implemented: "Legal documents are securely stored and easily searchable, reducing retrieval time.",
//                     notImplemented: "Decentralized document storage leads to inefficiencies and security risks."
//                 },
//                 "Our firm utilizes version control to track document changes and prevent errors.": {
//                     implemented: "Version control ensures accuracy and prevents confusion over document updates.",
//                     notImplemented: "Without version control, tracking document revisions becomes difficult and error-prone."
//                 },
//                 "We use AI-assisted document automation for drafting contracts and pleadings.": {
//                     implemented: "Automated drafting reduces manual effort and ensures document consistency.",
//                     notImplemented: "Manual document drafting is time-consuming and prone to human errors."
//                 },
//                 "There is a firm-wide knowledge repository for legal research and case precedents.": {
//                     implemented: "A structured repository preserves institutional knowledge and improves collaboration.",
//                     notImplemented: "Without a knowledge repository, critical legal insights may be lost or underutilized."
//                 },
//                 "We use AI-powered tools for document review and due diligence.": {
//                     implemented: "AI speeds up document review and enhances accuracy in identifying key risks.",
//                     notImplemented: "Manual review processes take longer and may overlook crucial details."
//                 }
//             },
//             "Billing & Finance": {
//                 "We use an automated time tracking and billing system.": {
//                     implemented: "Accurate billing and time tracking reduce revenue leakage and improve transparency.",
//                     notImplemented: "Manual tracking is prone to errors, causing billing disputes and inefficiencies."
//                 },
//                 "Our firm supports multiple billing models (hourly, fixed, contingency, alternative fee arrangements).": {
//                     implemented: "Flexible billing structures cater to diverse client needs, improving financial efficiency.",
//                     notImplemented: "Rigid billing models limit the firm's ability to accommodate varied client preferences."
//                 },
//                 "We have an e-billing system for invoicing and compliance with client guidelines.": {
//                     implemented: "Digital invoicing speeds up payment collection and enhances financial transparency.",
//                     notImplemented: "Manual invoicing increases administrative workload and delays payment processing."
//                 },
//                 "AI-powered analytics help us forecast revenue and financial trends.": {
//                     implemented: "Predictive analytics provide data-driven insights into revenue and expense management.",
//                     notImplemented: "Financial forecasting is manual and lacks accuracy, leading to planning inefficiencies."
//                 },
//                 "We have automated alerts for unpaid invoices and overdue accounts.": {
//                     implemented: "Late payments are flagged automatically, ensuring timely follow-ups and improved cash flow.",
//                     notImplemented: "Without alerts, overdue invoices are harder to track, increasing financial risks."
//                 }
//             },
//             "Litigation & Case Strategy": {
//                 "AI-driven legal research tools help us analyze case laws and precedents.": {
//                     implemented: "Legal research is faster and more comprehensive with AI-assisted case law analysis.",
//                     notImplemented: "Manual research is slow, increasing the risk of missing critical precedents."
//                 },
//                 "We use litigation analytics to assess judge and opposing counsel tendencies.": {
//                     implemented: "Data-driven insights provide strategic advantages in litigation planning.",
//                     notImplemented: "Without analytics, case strategy is based on subjective judgment alone."
//                 },
//                 "Our firm has structured workflows for evidence collection and authentication.": {
//                     implemented: "A structured approach improves evidence authentication and case preparation.",
//                     notImplemented: "Unstructured evidence handling can lead to inconsistencies and missing documents."
//                 },
//                 "Predictive analytics help us assess case outcomes and risk factors.": {
//                     implemented: "AI helps assess case strengths, weaknesses, and potential outcomes.",
//                     notImplemented: "Case decisions rely solely on past experiences, missing predictive insights."
//                 },
//                 "We have automated calendaring for court deadlines and litigation tasks.": {
//                     implemented: "Automated deadline tracking prevents missed court dates and procedural delays.",
//                     notImplemented: "Manual deadline tracking increases the risk of missed filings and penalties."
//                 }
//             },
//             "Practice Development & Automation": {
//                 "We use client relationship management (CRM) tools to track leads and interactions.": {
//                     implemented: "CRM systems provide structured tracking of client interactions and relationships.",
//                     notImplemented: "Without CRM, client management is less organized, leading to inefficiencies in service."
//                 },
//                 "Marketing automation tools help us manage firm outreach and branding.": {
//                     implemented: "Marketing automation enhances client engagement and lead management.",
//                     notImplemented: "Manual marketing processes are less targeted and require more effort."
//                 },
//                 "Chatbots or automated assistants handle basic client queries.": {
//                     implemented: "AI-driven chatbots provide instant responses, improving client satisfaction.",
//                     notImplemented: "Without chatbots, client inquiries take longer to process and resolve."
//                 },
//                 "Legal workflow automation improves efficiency in routine processes.": {
//                     implemented: "Automation streamlines routine legal processes, improving productivity.",
//                     notImplemented: "Manual workflows increase inefficiencies and create inconsistencies."
//                 },
//                 "We leverage dashboards for firm-wide performance tracking and insights.": {
//                     implemented: "Real-time performance insights enhance decision-making and firm growth.",
//                     notImplemented: "Without analytics, tracking performance and strategic planning is less effective."
//                 }
//             }
//         };

//         // Get the category observations
//         const categoryObs = observations[category as keyof typeof observations];
//         if (!categoryObs) return {};

//         // Create a map of observations based on implementation status
//         const result: Record<string, string> = {};
        
//         // Add implemented observations
//         implemented.forEach(feature => {
//             if (categoryObs[feature as keyof typeof categoryObs]) {
//                 result[feature] = categoryObs[feature as keyof typeof categoryObs].implemented;
//             }
//         });
        
//         // Add not implemented observations
//         notImplemented.forEach(feature => {
//             if (categoryObs[feature as keyof typeof categoryObs]) {
//                 result[feature] = categoryObs[feature as keyof typeof categoryObs].notImplemented;
//             }
//         });

//         return result;
//     };

// const generateReport = () => {
//     // Use existing calculations
//     const categoryScores = Object.entries(answers).map(
//         ([questionIndex, selectedOptions]) =>
//             calculateCategoryScores(
//                 parseInt(questionIndex),
//                 selectedOptions
//             )
//     );

//     const finalScores = calculateFinalScores();
    
//     // DreamLegal brand colors
//     const BRAND = {
//         primary: "#1D2456",      // Dark blue (background)
//         secondary: "#76C1E0",    // Light blue/teal (accent)
//         text: {
//             light: "#FFFFFF",    // White text
//             dark: "#323232"      // Dark text
//         },
//         score: {
//             veryLow: "#FF5252",  // Red (below 20%)
//             low: "#FF9800",      // Orange (20-40%)
//             medium: "#FFC107",   // Yellow (40-60%)
//             high: "#8BC34A",     // Light green (60-80%)
//             veryHigh: "#4CAF50"  // Green (above 80%)
//         },
//         bg: {
//             light: "#F5F7FA",    // Light background
//             strength: "#F0F9F0", // Light green background for strengths
//             weakness: "#FFF0F0"  // Light red background for weaknesses
//         }
//     };
    
//     // Create new jsPDF instance
//     const doc = new jsPDF({
//         orientation: "portrait",
//         unit: "mm",
//         format: "a4",
//         compress: true,
//     });
    
//     // Page dimensions
//     const pageWidth = doc.internal.pageSize.width;
//     const pageHeight = doc.internal.pageSize.height;
//     const margin = 15;
//     const contentWidth = pageWidth - 2 * margin;
    
//     // Override the getScoreColor function for better color mapping
//     const getScoreColor = (percentage) => {
//         if (percentage <= 20) return BRAND.score.veryLow;
//         if (percentage <= 40) return BRAND.score.low;
//         if (percentage <= 60) return BRAND.score.medium;
//         if (percentage <= 80) return BRAND.score.high;
//         return BRAND.score.veryHigh;
//     };
    
//     // ---- HELPER FUNCTIONS ----
    
//     // Add multiline text with proper wrapping
//     const addMultiLineText = (text, x, y, maxWidth, fontSize = 10, align = "left", color = BRAND.text.dark) => {
//         doc.setFontSize(fontSize);
//         doc.setTextColor(color);
//         const lines = doc.splitTextToSize(text, maxWidth);
//         doc.text(lines, x, y, { align: align });
//         return y + lines.length * (fontSize * 0.352); // Approximate line height
//     };
    
//     // Add bullet points with colored bullets
//     const addBulletPoint = (text, x, y, maxWidth, fontSize = 11, bulletType = "•", bulletColor = null) => {
//         const textColor = BRAND.text.dark;
//         doc.setFontSize(fontSize);
//         doc.setFont("helvetica", "normal");
//         doc.setTextColor(textColor);
        
//         // Add custom bullet point with optional color
//         if (bulletColor) {
//             doc.setTextColor(bulletColor);
//             doc.text(bulletType, x, y);
//             doc.setTextColor(textColor);
//         } else {
//             doc.text(bulletType, x, y);
//         }
        
//         // Calculate bullet width for indentation
//         const bulletWidth = doc.getTextWidth(bulletType + " ");
        
//         // Add the text with proper indentation
//         const lines = doc.splitTextToSize(text, maxWidth - bulletWidth - 2);
//         doc.text(lines, x + bulletWidth, y);
        
//         return y + lines.length * (fontSize * 0.352); // Return the new Y position
//     };
    
//     // Draw circular progress indicator
//     const drawCircularProgress = (x, y, radius, percentage, customColor = null) => {
//         const color = customColor || getScoreColor(percentage);
        
//         // Draw background circle with lighter blue
//         doc.setFillColor(230, 236, 245);
//         doc.circle(x, y, radius, 'F');
        
//         // Draw progress arc using multiple small lines to approximate an arc
//         if (percentage > 0) {
//             const startAngle = -90; // Start from top (in degrees)
//             const endAngle = startAngle + (percentage * 360) / 100;
            
//             // Convert to radians for calculation
//             const startRad = (startAngle * Math.PI) / 180;
//             const endRad = (endAngle * Math.PI) / 180;
            
//             // Draw the arc using small line segments
//             const segments = 100; // More segments = smoother arc
//             const angleStep = (endRad - startRad) / segments;
            
//             // Set color for progress
//             doc.setFillColor(color);
            
//             // Create a series of triangles to approximate the circular segment
//             for (let i = 0; i < segments; i++) {
//                 const angle1 = startRad + i * angleStep;
//                 const angle2 = startRad + (i + 1) * angleStep;
                
//                 const x1 = x + radius * Math.cos(angle1);
//                 const y1 = y + radius * Math.sin(angle1);
//                 const x2 = x + radius * Math.cos(angle2);
//                 const y2 = y + radius * Math.sin(angle2);
                
//                 // Draw a filled triangle (center point + two points on circumference)
//                 doc.triangle(x, y, x1, y1, x2, y2, 'F');
//             }
//         }
        
//         // Draw inner white circle for donut effect with shadow
//         const innerRadius = radius * 0.75; // Larger inner circle for better readability
//         doc.setFillColor(255, 255, 255);
//         doc.circle(x, y, innerRadius, 'F');
        
//         // Add percentage text in the center with enhanced styling
//         doc.setFont("helvetica", "bold");
//         doc.setFontSize(radius * 0.8); // Scale font based on radius
//         doc.setTextColor(BRAND.primary);
//         doc.text(`${Math.round(percentage)}%`, x, y + (radius * 0.25), { align: 'center' });
//     };
    
//     // Add DreamLegal logo
//     const addLogo = (x, y, size = 30) => {
//         // Blue rectangular logo
//         doc.setFillColor(BRAND.secondary);
//         doc.roundedRect(x, y, size, size, 2, 2, 'F');
        
//         // Add "DreamLegal" text next to logo
//         doc.setFont("helvetica", "bold");
//         doc.setFontSize(size * 0.8);
//         doc.setTextColor(BRAND.text.light);
//         doc.text("DreamLegal", x + size + 5, y + (size * 0.6));
//     };
    
//     // Add professional header to each page
//     const addPageHeader = (title) => {
//         // Add blue header bar
//         doc.setFillColor(BRAND.primary);
//         doc.rect(0, 0, pageWidth, 25, 'F');
        
//         // Add logo
//         addLogo(margin, 7, 15);
        
//         // Add page title on right side
//         doc.setTextColor(BRAND.text.light);
//         doc.setFontSize(14);
//         doc.setFont("helvetica", "bold");
//         doc.text(title, pageWidth - margin, 15, { align: "right" });
//     };
    
//     // Add footer to each page
//     const addPageFooter = (pageNum) => {
//         const footerY = pageHeight - 10;
        
//         // Add footer bar
//         doc.setFillColor(BRAND.primary);
//         doc.rect(0, footerY - 5, pageWidth, 15, 'F');
        
//         // Add footer text
//         doc.setFontSize(9);
//         doc.setFont("helvetica", "normal");
//         doc.setTextColor(BRAND.text.light);
//         doc.text("DreamLegal | Driving digital transformation for legal teams", margin, footerY);
        
//         // Add page number
//         doc.text(`Page ${pageNum}`, pageWidth - margin, footerY, { align: "right" });
//     };
    
//     // Fixed progress bar with correct spacing for percentage
//     const drawProgressBar = (x, y, width, percentage, label) => {
//         const color = getScoreColor(percentage);
//         const barWidth = width * 0.85; // Leave room for percentage text
        
//         // Add label with improved styling
//         doc.setFont("helvetica", "normal");
//         doc.setFontSize(9);
//         doc.setTextColor(BRAND.text.dark);
//         doc.text(label, x, y - 3);
        
//         // Background bar with subtle styling
//         doc.setFillColor(230, 236, 245);
//         doc.roundedRect(x, y, barWidth, 6, 3, 3, 'F');
        
//         // Progress bar with score-based color
//         doc.setFillColor(color);
//         const progressWidth = (barWidth * percentage) / 100;
//         if (progressWidth > 0) {
//             doc.roundedRect(x, y, progressWidth, 6, 3, 3, 'F');
//         }
        
//         // Add percentage label with proper spacing
//         doc.setFont("helvetica", "bold");
//         doc.setTextColor(BRAND.primary);
//         doc.text(`${percentage.toFixed(1)}`, x + barWidth + 5, y + 4);
//     };
    
//     // Enhanced heading style
//     const addStyledHeading = (text, x, y, fontSize = 16, color = BRAND.primary) => {
//         doc.setFontSize(fontSize);
//         doc.setFont("helvetica", "bold");
//         doc.setTextColor(color);
//         doc.text(text, x, y);
        
//         // Add blue underline
//         const textWidth = doc.getTextWidth(text);
//         doc.setDrawColor(BRAND.secondary);
//         doc.setLineWidth(0.8);
//         doc.line(x, y + 2, x + textWidth, y + 2);
        
//         return y + fontSize * 0.5 + 5;
//     };
    
//     // ---- START BUILDING THE REPORT ----
    
//     // Cover Page with improved styling
//     doc.setFillColor(BRAND.primary);
//     doc.rect(0, 0, pageWidth, pageHeight * 0.4, 'F');
    
//     // Add decorative graphic element
//     doc.setFillColor(BRAND.secondary);
//     doc.circle(pageWidth - 25, 25, 30, 'F');
//     doc.setFillColor(BRAND.primary);
//     doc.circle(pageWidth - 25, 25, 20, 'F');
    
//     // Add logo
//     addLogo(margin, 20, 30);
    
//     // Add report title with better typography
//     doc.setTextColor(BRAND.text.light);
//     doc.setFontSize(28);
//     doc.setFont("helvetica", "bold");
//     doc.text("LEGAL TEAM MATURITY AND", pageWidth / 2, 80, { align: "center" });
//     doc.text("DIGITAL READINESS REPORT", pageWidth / 2, 95, { align: "center" });
    
//     // Add subtitle
//     doc.setFontSize(13);
//     doc.setFont("helvetica", "normal");
//     doc.text("Assessing Efficiency, Technology Adoption, and Future-Readiness of Legal Teams", 
//         pageWidth / 2, 115, { align: "center" });
    
//     // Add organization info panel
//     let yPos = pageHeight * 0.45;
//     doc.setFillColor(BRAND.bg.light);
//     doc.roundedRect(margin, yPos - 15, contentWidth, 40, 3, 3, 'F');
    
//     doc.setTextColor(BRAND.primary);
//     doc.setFontSize(18);
//     doc.setFont("helvetica", "bold");
//     doc.text(
//         `${firmType === "legal-department" ? "Legal Department" : "Law Firm"}`,
//         margin + 10,
//         yPos
//     );
    
//     doc.setFontSize(12);
//     doc.setFont("helvetica", "normal");
//     doc.text(
//         `Team size: ${teamSize}`,
//         margin + 10,
//         yPos + 12
//     );
    
//     doc.setFontSize(11);
//     doc.text(
//         `Generated on: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`,
//         pageWidth - margin - 10,
//         yPos,
//         { align: "right" }
//     );
    
//     // Add assessment results section
//     yPos += 60;
    
//     // Add section title
//     doc.setFontSize(16);
//     doc.setFont("helvetica", "bold");
//     doc.setTextColor(BRAND.primary);
//     doc.text("ASSESSMENT RESULTS", margin, yPos - 15);
    
//     // Add subtle background for score section
//     doc.setFillColor(245, 247, 250);
//     doc.roundedRect(margin - 5, yPos - 5, contentWidth + 10, 80, 3, 3, 'F');
    
//     // Draw circular progress for overall score
//     drawCircularProgress(
//         margin + 45, 
//         yPos + 35, 
//         30, 
//         parseFloat(finalScores.totalScore)
//     );
    
//     // Add score label
//     doc.setFontSize(12);
//     doc.setFont("helvetica", "bold");
//     doc.setTextColor(BRAND.primary);
//     doc.text("OVERALL\nSCORE", margin + 45, yPos + 75, { align: "center" });
    
//     // Add progress bars for sub-scores with fixed spacing
//     drawProgressBar(
//         margin + 100, 
//         yPos + 25, 
//         pageWidth / 2.5, 
//         parseFloat(finalScores.efficiencyScore), 
//         "Efficiency Score"
//     );
    
//     drawProgressBar(
//         margin + 100, 
//         yPos + 55, 
//         pageWidth / 2.5, 
//         parseFloat(finalScores.technologyScore), 
//         "Technology Score"
//     );
    
//     // Add assessment text
//     yPos += 100;
//     doc.setFillColor(BRAND.bg.light);
//     doc.roundedRect(margin - 5, yPos - 5, contentWidth + 10, 60, 3, 3, 'F');
    
//     doc.setFont("helvetica", "normal");
//     doc.setTextColor(BRAND.text.dark);
//     const assessmentText = getScoreComment(parseFloat(finalScores.totalScore));
//     yPos = addMultiLineText(assessmentText, margin, yPos, contentWidth, 11);
    
//     // Category Scores Page
//     doc.addPage();
    
//     // Add header to second page
//     addPageHeader("LEGAL TEAM MATURITY ASSESSMENT");
    
//     // Reset yPos for the new page
//     yPos = 40;
    
//     // Add category scores header
//     yPos = addStyledHeading("Legal Operations Category Scores", margin, yPos, 18);
    
//     // Add category scores table with improved styling
//     const tableWidth = contentWidth;
//     const headerHeight = 12;
//     const rowHeight = 14;
    
//     // Table header
//     doc.setFillColor(BRAND.primary);
//     doc.rect(margin, yPos, tableWidth, headerHeight, 'F');
    
//     doc.setFont("helvetica", "bold");
//     doc.setTextColor(BRAND.text.light);
//     doc.setFontSize(10);
    
//     // Define columns
//     const col1Width = tableWidth * 0.46;
//     const col2Width = tableWidth * 0.18;
//     const col3Width = tableWidth * 0.18;
//     const col4Width = tableWidth * 0.18;
    
//     // Header texts
//     doc.text("Legal Operation", margin + 5, yPos + 8);
//     doc.text("Overall", margin + col1Width + 5, yPos + 8);
//     doc.text("Technology", margin + col1Width + col2Width + 5, yPos + 8);
//     doc.text("Efficiency", margin + col1Width + col2Width + col3Width + 5, yPos + 8);
    
//     // Table rows
//     yPos += headerHeight;
    
//     categoryScores.forEach((score, index) => {
//         // Alternate row background
//         if (index % 2 === 0) {
//             doc.setFillColor(BRAND.bg.light);
//             doc.rect(margin, yPos, tableWidth, rowHeight, 'F');
//         }
        
//         doc.setFont("helvetica", "normal");
//         doc.setTextColor(BRAND.text.dark);
//         doc.text(score.category, margin + 5, yPos + 9);
        
//         // Calculate average score
//         const avgScore = ((score.techScore + score.efficiencyScore) / 2).toFixed(1);
        
//         // Add score percentages
//         doc.setFont("helvetica", "bold");
//         doc.setTextColor(BRAND.primary);
//         doc.text(`${avgScore}%`, margin + col1Width + 5, yPos + 9);
//         doc.text(`${score.techScore.toFixed(1)}%`, margin + col1Width + col2Width + 5, yPos + 9);
//         doc.text(`${score.efficiencyScore.toFixed(1)}%`, margin + col1Width + col2Width + col3Width + 5, yPos + 9);
        
//         yPos += rowHeight;
//     });
    
//     // Add performance comparison chart
//     yPos += 20;
//     yPos = addStyledHeading("Performance Comparison", margin, yPos, 16);
    
//     // Create chart area with subtle grid
//     const chartHeight = 120;
//     doc.setFillColor(245, 247, 250);
//     doc.roundedRect(margin, yPos, contentWidth, chartHeight, 3, 3, 'F');
    
//     // Draw chart grid
//     doc.setDrawColor(220, 225, 230);
//     doc.setLineWidth(0.2);
    
//     // Horizontal grid lines
//     for (let i = 1; i <= 4; i++) {
//         const gridY = yPos + chartHeight - (i * chartHeight / 5);
//         doc.line(margin, gridY, margin + contentWidth, gridY);
        
//         // Add axis labels
//         doc.setFontSize(8);
//         doc.setTextColor(BRAND.text.dark);
//         doc.text(`${i * 20}%`, margin - 5, gridY, { align: 'right' });
//     }
    
//     // Vertical grid lines
//     const segments = 10;
//     for (let i = 1; i < segments; i++) {
//         const gridX = margin + (contentWidth / segments) * i;
//         doc.line(gridX, yPos, gridX, yPos + chartHeight);
//     }
    
//     // Main axes
//     doc.setDrawColor(BRAND.primary);
//     doc.setLineWidth(0.8);
//     doc.line(margin, yPos + chartHeight, margin + contentWidth, yPos + chartHeight); // X-axis
//     doc.line(margin, yPos, margin, yPos + chartHeight); // Y-axis
    
//     // Draw category score points and lines
//     const xStep = contentWidth / (categoryScores.length + 1);
//     const dataPoints = categoryScores.map((score, index) => {
//         const x = margin + (index + 1) * xStep;
//         // Average of both scores
//         const scoreValue = (score.techScore + score.efficiencyScore) / 2;
//         const y = yPos + chartHeight - (scoreValue * chartHeight / 100);
//         return { x, y, score: scoreValue, category: score.category };
//     });
    
//     // Draw connecting lines with thicker stroke for better visibility
//     doc.setDrawColor(BRAND.secondary);
//     doc.setLineWidth(2.5);
//     for (let i = 0; i < dataPoints.length - 1; i++) {
//         doc.line(dataPoints[i].x, dataPoints[i].y, dataPoints[i + 1].x, dataPoints[i + 1].y);
//     }
    
//     // Enhanced data points
//     dataPoints.forEach((point, index) => {
//         // Draw point circles
//         doc.setFillColor(BRAND.secondary);
//         doc.circle(point.x, point.y, 5, 'F');
        
//         // Inner white highlight for better visibility
//         doc.setFillColor(255, 255, 255);
//         doc.circle(point.x, point.y, 2, 'F');
        
//         // Add category abbreviations below x-axis
//         doc.setFontSize(8);
//         doc.setTextColor(BRAND.text.dark);
//         // Use simpler abbreviation format
//         const shortName = categoryScores[index].category.replace(/&/g, '').split(' ').map(w => w.charAt(0)).join('');
//         doc.text(shortName, point.x, yPos + chartHeight + 10, { align: 'center' });
        
//         // Add value above point
//         doc.setFontSize(10);
//         doc.setFont("helvetica", "bold");
//         doc.setTextColor(BRAND.primary);
//         doc.text(`${point.score.toFixed(0)}%`, point.x, point.y - 10, { align: 'center' });
//     });
    
//     // Add legend for abbreviations
//     yPos += chartHeight + 15;
//     doc.setFontSize(8);
//     doc.setFont("helvetica", "normal");
//     doc.setTextColor(BRAND.text.dark);
    
//     // Add legend explaining abbreviations in a 2-column layout
//     let legendX = margin;
//     let legendY = yPos;
//     const legendItemWidth = contentWidth / 3;
    
//     categoryScores.forEach((score, index) => {
//         const shortName = score.category.replace(/&/g, '').split(' ').map(w => w.charAt(0)).join('');
        
//         // Create a 2-column layout
//         if (index > 0 && index % 3 === 0) {
//             legendX = margin;
//             legendY += 10;
//         }
        
//         doc.text(`${shortName}: ${score.category}`, legendX, legendY);
//         legendX += legendItemWidth;
//     });
    
//     // Add footer
//     addPageFooter(2);
    
//     // Create individual category detail pages - ONE CATEGORY PER PAGE
//     categoryScores.forEach((score, index) => {
//         doc.addPage();
//         const pageNum = 3 + index;
        
//         // Add header
//         addPageHeader("CATEGORY DETAILS");
        
//         // Reset position for each page
//         yPos = 40;
        
//         // Get question and answers
//         const questionIndex = categoryScores.findIndex(cs => cs.category === score.category);
//         const question = questions[questionIndex];
//         const selectedOptions = answers[questionIndex] || [];
//         const implemented = selectedOptions.map(
//             (idx) => question.options[idx].text
//         );
//         const notImplemented = question.options
//             .filter((_, idx) => !selectedOptions.includes(idx))
//             .map((opt) => opt.text);
        
//         // Category name with blue side accent
//         doc.setFillColor(BRAND.bg.light);
//         doc.roundedRect(margin - 5, yPos - 10, contentWidth + 10, 25, 3, 3, 'F');
        
//         // Add colored accent bar
//         doc.setDrawColor(BRAND.secondary);
//         doc.setLineWidth(3);
//         doc.line(margin - 5, yPos - 10, margin - 5, yPos + 15);
        
//         // Category name
//         doc.setFontSize(18);
//         doc.setFont("helvetica", "bold");
//         doc.setTextColor(BRAND.primary);
//         doc.text(score.category, margin + 5, yPos);
        
//         yPos += 30;
        
//         // Add score visualization section
//         doc.setFillColor(245, 247, 250);
//         doc.roundedRect(margin, yPos, contentWidth, 60, 3, 3, 'F');
        
//         // Draw category score visualization
//         const avgScore = (score.techScore + score.efficiencyScore) / 2;
//         drawCircularProgress(
//             margin + 40, 
//             yPos + 30, 
//             25, 
//             avgScore
//         );
        
//         // Add score bars - FIXED POSITIONING
//         drawProgressBar(
//             margin + 90, 
//             yPos + 20, 
//             pageWidth / 2.8, 
//             score.techScore, 
//             "Technology Score"
//         );
        
//         drawProgressBar(
//             margin + 90, 
//             yPos + 40, 
//             pageWidth / 2.8, 
//             score.efficiencyScore, 
//             "Efficiency Score"
//         );
        
//         // Add strengths section
//         yPos += 75;
//         doc.setFillColor(BRAND.bg.strength);
//         doc.roundedRect(margin - 5, yPos - 5, contentWidth + 10, Math.max(implemented.length * 15 + 15, 35), 3, 3, 'F');
        
//         // Strengths heading
//         doc.setFontSize(14);
//         doc.setFont("helvetica", "bold");
//         doc.setTextColor("#4CAF50"); // Green
//         doc.text("Strengths", margin, yPos);
        
//         // Add green underline
//         const strengthsWidth = doc.getTextWidth("Strengths");
//         doc.setDrawColor("#4CAF50");
//         doc.setLineWidth(0.8);
//         doc.line(margin, yPos + 2, margin + strengthsWidth, yPos + 2);
        
//         yPos += 10;
//         if (implemented.length > 0) {
//             implemented.forEach((feature) => {
//                 yPos = addBulletPoint(
//                     feature,
//                     margin + 5,
//                     yPos,
//                     contentWidth - 15,
//                     11,
//                     "✓",
//                     "#4CAF50" // Green checkmark
//                 );
//                 yPos += 5;
//             });
//         } else {
//             yPos = addMultiLineText(
//                 "No strengths identified in this category.",
//                 margin + 5,
//                 yPos,
//                 contentWidth - 15,
//                 11
//             );
//             yPos += 5;
//         }
        
//         // Add areas for improvement section
//         yPos += 15;
//         doc.setFillColor(BRAND.bg.weakness);
//         doc.roundedRect(margin - 5, yPos - 5, contentWidth + 10, Math.max(notImplemented.length * 15 + 15, 35), 3, 3, 'F');
        
//         // Areas for improvement heading
//         doc.setFontSize(14);
//         doc.setFont("helvetica", "bold");
//         doc.setTextColor("#F44336"); // Red
//         doc.text("Areas for Improvement", margin, yPos);
        
//         // Add red underline
//         const improvementWidth = doc.getTextWidth("Areas for Improvement");
//         doc.setDrawColor("#F44336");
//         doc.setLineWidth(0.8);
//         doc.line(margin, yPos + 2, margin + improvementWidth, yPos + 2);
        
//         yPos += 10;
//         if (notImplemented.length > 0) {
//             notImplemented.forEach((feature, idx) => {
//                 // Use numbered items for areas of improvement
//                 yPos = addBulletPoint(
//                     feature,
//                     margin + 5,
//                     yPos,
//                     contentWidth - 15,
//                     11,
//                     `${idx + 1}.`,
//                     "#F44336" // Red numbering
//                 );
//                 yPos += 5;
//             });
//         } else {
//             yPos = addMultiLineText(
//                 "No areas for improvement identified in this category.",
//                 margin + 5,
//                 yPos,
//                 contentWidth - 15,
//                 11
//             );
//             yPos += 5;
//         }
        
//         // Add footer
//         addPageFooter(pageNum);
//     });
    
//     // Add conclusion page
//     doc.addPage();
//     const conclusionPageNum = 3 + categoryScores.length;
    
//     // Add header
//     addPageHeader("CONCLUSION & RECOMMENDATIONS");
    
//     // Executive summary
//     yPos = 45;
    
//     // Add summary panel
//     doc.setFillColor(BRAND.bg.light);
//     doc.roundedRect(margin - 5, yPos - 5, contentWidth + 10, 60, 5, 5, 'F');
    
//     // Add blue side accent
//     doc.setDrawColor(BRAND.secondary);
//     doc.setLineWidth(3);
//     doc.line(margin - 5, yPos - 5, margin - 5, yPos + 55);
    
//     // Executive Summary heading
//     yPos = addStyledHeading("Executive Summary", margin, yPos, 18);
    
//     yPos += 10;
//     doc.setTextColor(BRAND.text.dark);
//     doc.setFontSize(12);
//     doc.setFont("helvetica", "normal");
//     yPos = addMultiLineText(
//         getScoreComment(parseFloat(finalScores.totalScore)),
//         margin,
//         yPos,
//         contentWidth,
//         12
//     );
    
//     // Next steps section
//     yPos += 25;
    
//     // Add next steps panel
//     doc.setFillColor(BRAND.bg.strength);
//     doc.roundedRect(margin - 5, yPos - 5, contentWidth + 10, 95, 5, 5, 'F');
    
//     // Add green side accent
//     doc.setDrawColor("#4CAF50");
//     doc.setLineWidth(3);
//     doc.line(margin - 5, yPos - 5, margin - 5, yPos + 90);
    
//     // Recommended next steps heading
//     doc.setFontSize(16);
//     doc.setFont("helvetica", "bold");
//     doc.setTextColor("#4CAF50");
//     doc.text("Recommended Next Steps", margin, yPos);
    
//     yPos += 15;
//     const recommendations = [
//         "Stay ahead by exploring cutting-edge advancements in AI for legal document analysis, blockchain for contract management, or predictive analytics for case outcome prediction.",
//         "Benchmark your legal team's performance against industry leaders and identify specific areas where digital transformation can provide the greatest ROI.",
//         "Invest in continuous upskilling for your legal team, focusing on technology proficiency and digital workflow optimization.",
//   "Implement integrations between your current legal tech solutions to create a more cohesive ecosystem."
//     ];
    
//     recommendations.forEach(rec => {
//         yPos = addBulletPoint(
//             rec, 
//             margin, 
//             yPos, 
//             contentWidth, 
//             11, 
//             "•", // Using bullet points instead of & symbol
//             "#4CAF50"
//         );
//         yPos += 5;
//     });
    
//     // Caution section
//     yPos += 25;
    
//     // Add caution panel
//     doc.setFillColor(255, 243, 224);
//     doc.roundedRect(margin - 5, yPos - 5, contentWidth + 10, 70, 5, 5, 'F');
    
//     // Add orange side accent
//     doc.setDrawColor("#FF9800");
//     doc.setLineWidth(3);
//     doc.line(margin - 5, yPos - 5, margin - 5, yPos + 65);
    
//     // Areas of caution heading
//     doc.setFontSize(16);
//     doc.setFont("helvetica", "bold");
//     doc.setTextColor("#FF9800");
//     doc.text("Areas of Caution", margin, yPos);
    
//     yPos += 15;
//     const cautions = [
//         "Complacency with your current technology stack may lead to diminishing returns — maintain a culture of continuous improvement and evaluation.",
//         "Focusing solely on technology without addressing process optimization can limit the effectiveness of your digital transformation.",
//         "Ensure proper training and change management when implementing new legal technologies to maximize adoption and ROI."
//     ];
    
//     cautions.forEach(caution => {
//         yPos = addBulletPoint(
//             caution, 
//             margin, 
//             yPos, 
//             contentWidth, 
//             11, 
//             "•", // Using bullet points instead of & symbol
//             "#FF9800"
//         );
//         yPos += 5;
//     });
    
//     // Next steps with DreamLegal
//     yPos += 25;
    
//     // Add contact panel
//     doc.setFillColor(230, 240, 250);
//     doc.roundedRect(margin - 5, yPos - 5, contentWidth + 10, 50, 5, 5, 'F');
    
//     doc.setFontSize(14);
//     doc.setFont("helvetica", "bold");
//     doc.setTextColor(BRAND.primary);
//     doc.text("Next Steps with DreamLegal", margin, yPos);
    
//     yPos += 10;
//     doc.setFontSize(11);
//     doc.setFont("helvetica", "normal");
//     doc.setTextColor(BRAND.text.dark);
//     doc.text("Schedule a no-obligation consultation with a DreamLegal expert to discuss your results", margin, yPos);
    
//     yPos += 10;
//     doc.setFontSize(10);
//     doc.text("Website: www.dreamlegal.in", margin, yPos);
//     yPos += 8;
//     doc.text("Email: ranjan@dreamlegal.in", margin, yPos);
//     yPos += 8;
//     doc.text("Book a 15-minute consultation: calendly.com/dreamlegal", margin, yPos);
    
//     // Add footer
//     addPageFooter(conclusionPageNum);
    
//     // Save the PDF with branded filename
//     doc.save("dreamlegal-assessment-report.pdf");
// };

//     const calculateProgress = () => {
//         if (!firmType) return 0;
//         return ((currentQuestion + 1) / questions.length) * 100;
//     };

//     const askForTeamSize = () => {
//         return (
//             <div className="space-y-4">
//                 <h3 className="text-xl font-semibold text-primary">
//                     Please select your team size:
//                 </h3>
//                 <div className="grid gap-4">
//                     {teamSizeOptions.map((option, index) => (
//                         <div
//                             key={index}
//                             className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-colors ${
//                                 teamSize === option
//                                     ? "border-primary bg-primary/5"
//                                     : "border-muted hover:border-muted-foreground/50"
//                             }`}
//                         >
//                             <Checkbox
//                                 id={`team-size-${index}`}
//                                 checked={teamSize === option}
//                                 onCheckedChange={() => setTeamSize(option)}
//                                 className="h-5 w-5"
//                             />
//                             <div className="flex-grow">
//                                 <label
//                                     htmlFor={`team-size-${index}`}
//                                     className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
//                                 >
//                                     {option}
//                                 </label>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         );
//     };

//     return (
//         <div className="max-w-4xl mx-auto py-8 mt-28">
//             <Card className="shadow-lg border-2">
//                 <CardHeader className="space-y-2 pt-5">
//                     {!firmType ? (
//                         <div className="space-y-4">
//                             <h2 className="text-3xl font-bold text-center">
//                                 Legal Technology Assessment
//                             </h2>
//                             <p className="text-muted-foreground text-center max-w-2xl mx-auto">
//                                 Select your organization type to begin the
//                                 assessment of your legal technology
//                                 implementation.
//                             </p>
//                             <div className="w-full mt-6 mx-auto">
//                                 <Select onValueChange={setFirmType}>
//                                     <SelectTrigger className="h-12">
//                                         <SelectValue placeholder="Select organization type" />
//                                     </SelectTrigger>
//                                     <SelectContent>
//                                         <SelectItem value="legal-department">
//                                             Legal Department
//                                         </SelectItem>
//                                         <SelectItem value="law-firm">
//                                             Law Firm
//                                         </SelectItem>
//                                     </SelectContent>
//                                 </Select>
//                             </div>
//                         </div>
//                     ) : !teamSize ? (
//                         askForTeamSize()
//                     ) : !isComplete ? (
//                         <>
//                             <div className="flex justify-between items-center border-b py-2">
//                                 <h2 className="text-2xl font-bold">
//                                     {firmType === "legal-department"
//                                         ? "Legal Department"
//                                         : "Law Firm"}{" "}
//                                     Assessment
//                                 </h2>
//                                 <span className="text-sm text-muted-foreground">
//                                     Question {currentQuestion + 1} of{" "}
//                                     {questions.length}
//                                 </span>
//                             </div>
//                             <AnimatePresence mode="wait">
//                                 <motion.div
//                                     key={currentQuestion}
//                                     initial={{ x: 50, opacity: 0 }}
//                                     animate={{ x: 0, opacity: 1 }}
//                                     exit={{ x: -50, opacity: 0 }}
//                                     transition={{ duration: 0.3 }}
//                                     className="space-y-6"
//                                 >
//                                     <div className="space-y-4">
//                                         <h3 className="text-xl font-semibold text-primary">
//                                             {questions[currentQuestion].question}
//                                         </h3>
//                                         <p className="text-sm text-muted-foreground mb-6">
//                                             Select all options that apply to your
//                                             organization
//                                         </p>
//                                         <div className="grid gap-4">
//                                             {questions[currentQuestion].options.map(
//                                                 (option, index) => (
//                                                     <div
//                                                         key={index}
//                                                         className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-colors ${
//                                                             (
//                                                                 answers[
//                                                                     currentQuestion
//                                                                 ] || []
//                                                             ).includes(index)
//                                                                 ? "border-primary bg-primary/5"
//                                                                 : "border-muted hover:border-muted-foreground/50"
//                                                         }`}
//                                                     >
//                                                         <Checkbox
//                                                             id={`option-${index}`}
//                                                             checked={(
//                                                                 answers[
//                                                                     currentQuestion
//                                                                 ] || []
//                                                             ).includes(index)}
//                                                             onCheckedChange={() =>
//                                                                 handleCheckboxChange(
//                                                                     index
//                                                                 )
//                                                             }
//                                                             className="h-5 w-5"
//                                                         />
//                                                         <div className="flex-grow">
//                                                             <label
//                                                                 htmlFor={`option-${index}`}
//                                                                 className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
//                                                             >
//                                                                 {option.text}
//                                                             </label>
//                                                         </div>
//                                                     </div>
//                                                 )
//                                             )}
//                                         </div>
//                                     </div>
//                                 </motion.div>
//                             </AnimatePresence>
//                         </>
//                     ) : (
//                         <motion.div
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             className="space-y-8 py-8"
//                         >
//                             <div className="text-center">
//                                 <div className="h-24 w-24 rounded-full bg-green-100 mx-auto flex items-center justify-center mb-6">
//                                     <svg
//                                         className="h-12 w-12 text-green-600"
//                                         fill="none"
//                                         stroke="currentColor"
//                                         viewBox="0 0 24 24"
//                                     >
//                                         <path
//                                             strokeLinecap="round"
//                                             strokeLinejoin="round"
//                                             strokeWidth="2"
//                                             d="M5 13l4 4L19 7"
//                                         />
//                                     </svg>
//                                 </div>
//                                 <h2 className="text-2xl font-bold text-green-600 mb-2">
//                                     Assessment Complete!
//                                 </h2>
//                                 <p className="text-muted-foreground">
//                                     Here's your technology adoption score
//                                     breakdown
//                                 </p>
//                             </div>

//                             <div className="max-w-md mx-auto space-y-6">
//                                 <div className="space-y-4">
//                                     <div className="space-y-2">
//                                         <div className="flex justify-between items-center">
//                                             <span className="text-sm font-medium">
//                                                 Technology Score
//                                             </span>
//                                             <span className="text-sm font-bold">
//                                                 {
//                                                     calculateFinalScores()
//                                                         .technologyScore
//                                                 }
//                                                 %
//                                             </span>
//                                         </div>
//                                         <Progress
//                                             value={
//                                                 calculateFinalScores()
//                                                     .technologyScore
//                                             }
//                                             className="h-2"
//                                         />
//                                     </div>

//                                     <div className="space-y-2">
//                                         <div className="flex justify-between items-center">
//                                             <span className="text-sm font-medium">
//                                                 Efficiency Score
//                                             </span>
//                                             <span className="text-sm font-bold">
//                                                 {
//                                                     calculateFinalScores()
//                                                         .efficiencyScore
//                                                 }
//                                                 %
//                                             </span>
//                                         </div>
//                                         <Progress
//                                             value={
//                                                 calculateFinalScores()
//                                                     .efficiencyScore
//                                             }
//                                             className="h-2"
//                                         />
//                                     </div>

//                                     <div className="pt-4 border-t">
//                                         <div className="flex justify-between items-center">
//                                             <span className="text-base font-semibold">
//                                                 Final Score
//                                             </span>
//                                             <span className="text-lg font-bold text-primary">
//                                                 {
//                                                     calculateFinalScores()
//                                                         .totalScore
//                                                 }
//                                                 %
//                                             </span>
//                                         </div>
//                                         <p className="text-xs text-muted-foreground mt-1">
//                                             Based on 60% Efficiency and 40%
//                                             Technology weights
//                                         </p>
//                                     </div>
//                                 </div>

//                                 <Button
//                                     onClick={generateReport}
//                                     className="w-full mt-6"
//                                     size="lg"
//                                 >
//                                     Download Detailed Report
//                                 </Button>
//                             </div>
//                         </motion.div>
//                     )}
//                 </CardHeader>

//                 {firmType && !isComplete && (
//                     <CardFooter className="border-t bg-muted/20 p-6">
//                         <div className="flex justify-between w-full">
//                             <Button
//                                 onClick={handlePrevious}
//                                 disabled={currentQuestion === 0}
//                                 variant="outline"
//                                 className="w-[100px]"
//                             >
//                                 Previous
//                             </Button>
//                             <Button onClick={handleNext} className="w-[100px]">
//                                 {currentQuestion === questions.length - 1
//                                     ? "Finish"
//                                     : "Next"}
//                             </Button>
//                         </div>
//                     </CardFooter>
//                 )}
//             </Card>
//         </div>
//     );
// }
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectValue,
    SelectTrigger,
} from "@/components/ui/select";
import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import jsPDF from "jspdf";

import { PDFDocument, rgb, StandardFonts, degrees } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';

const legalDepartmentQuestions = [
    {
        question: "How effectively does your team manage contracts?",
        category: "Contracts",
        options: [
            {
                text: "We have a centralized repository for all contracts.",
                techScore: 2,
                efficiencyScore: 1,
            },
            {
                text: "Contracts are automatically drafted or templatized.",
                techScore: 2,
                efficiencyScore: 2,
            },
            {
                text: "We have a system to track contract renewals and deadlines.",
                techScore: 2,
                efficiencyScore: 2,
            },
            {
                text: "We use AI to review contracts.",
                techScore: 3,
                efficiencyScore: 3,
            },
            {
                text: "We have time alert specific obligation management.",
                techScore: 1,
                efficiencyScore: 2,
            },
        ],
    },
    {
        question: "How effectively does your team manage compliances?",
        category: "Compliance",
        options: [
            {
                text: "We use automated regulatory tracking tools to monitor relevant legal changes.",
                techScore: 3,
                efficiencyScore: 2,
            },
            {
                text: "We maintain a systematic compliance calendar with reminders for key deadlines.",
                techScore: 2,
                efficiencyScore: 2,
            },
            {
                text: "We have a centralized digital repository for all compliance documentation.",
                techScore: 2,
                efficiencyScore: 1,
            },
            {
                text: "We utilize workflow automation for routine compliance processes.",
                techScore: 2,
                efficiencyScore: 2,
            },
            {
                text: "We implement compliance analytics dashboards to track and report on key metrics.",
                techScore: 1,
                efficiencyScore: 3,
            },
        ],
    },
    {
        question:
            "How effectively does your team manage Intellectual Property?",
        category: "Intellectual Property (IP) Management",
        options: [
            {
                text: "We have a centralized IP management system for tracking patents, trademarks, and copyrights.",
                techScore: 2,
                efficiencyScore: 1,
            },
            {
                text: "AI-driven tools monitor potential IP infringements and unauthorized usage.",
                techScore: 3,
                efficiencyScore: 2,
            },
            {
                text: "We use automated alerts for IP renewal deadlines and maintenance filings.",
                techScore: 2,
                efficiencyScore: 2,
            },
            {
                text: "AI-powered tools assist in prior art searches and competitive IP analysis.",
                techScore: 3,
                efficiencyScore: 3,
            },
            {
                text: "We integrate IP risk assessment tools into our overall compliance framework.",
                techScore: 2,
                efficiencyScore: 2,
            },
        ],
    },
    {
        question: "How effectively does your team manage internal support?",
        category: "Internal Support",
        options: [
            {
                text: "A centralized legal helpdesk or portal is available for internal teams to request legal assistance.",
                techScore: 2,
                efficiencyScore: 2,
            },
            {
                text: "Automated intake and triage tools categorize and prioritize internal legal queries.",
                techScore: 3,
                efficiencyScore: 2,
            },
            {
                text: "We use AI-assisted chatbots for answering common legal FAQs.",
                techScore: 3,
                efficiencyScore: 2,
            },
            {
                text: "Our legal team operates through integrated communication platforms for seamless collaboration.",
                techScore: 1,
                efficiencyScore: 2,
            },
            {
                text: "We maintain department-specific legal data rooms for easy access to relevant documents.",
                techScore: 1,
                efficiencyScore: 2,
            },
        ],
    },
    {
        question:
            "How effectively does your team manage Litigation management?",
        category: "Litigation Management",
        options: [
            {
                text: "We have a centralized matter management systems for organizing case information.",
                techScore: 2,
                efficiencyScore: 2,
            },
            {
                text: "We have automated workflows for tracking litigation progress and deadlines.",
                techScore: 2,
                efficiencyScore: 2,
            },
            {
                text: "We use AI-driven tools for predictive analysis on case outcomes.",
                techScore: 3,
                efficiencyScore: 2,
            },
            {
                text: "We follow structured checklists for collecting and authenticating evidence.",
                techScore: 2,
                efficiencyScore: 2,
            },
            {
                text: "We have access to legal research databases for staying updated on relevant precedents.",
                techScore: 1,
                efficiencyScore: 2,
            },
        ],
    },
];

const lawFirmQuestions = [
    {
        question:
            "How effectively does your team manage client and matter management?",
        category: "Client & Matter Management",
        options: [
            {
                text: "We have a centralized matter management system to track all cases and clients.",
                techScore: 2,
                efficiencyScore: 1,
            },
            {
                text: "Our firm uses client intake and onboarding automation tools.",
                techScore: 2,
                efficiencyScore: 2,
            },
            {
                text: "We utilize conflict-checking software before taking on new matters.",
                techScore: 2,
                efficiencyScore: 2,
            },
            {
                text: "Our system integrates client communication logs and case-related emails.",
                techScore: 2,
                efficiencyScore: 2,
            },
            {
                text: "We use AI-powered tools for client risk assessment and matter predictions.",
                techScore: 2,
                efficiencyScore: 3,
            },
        ],
    },
    {
        question:
            "How effectively does your team manage Document & Knowledge Management?",
        category: "Document & Knowledge Management",
        options: [
            {
                text: "We have a centralized document management system for storing and retrieving legal files.",
                techScore: 2,
                efficiencyScore: 1,
            },
            {
                text: "Our firm utilizes version control to track document changes and prevent errors.",
                techScore: 2,
                efficiencyScore: 2,
            },
            {
                text: "We use AI-assisted document automation for drafting contracts and pleadings.",
                techScore: 3,
                efficiencyScore: 2,
            },
            {
                text: "There is a firm-wide knowledge repository for legal research and case precedents.",
                techScore: 2,
                efficiencyScore: 2,
            },
            {
                text: "We use AI-powered tools for document review and due diligence.",
                techScore: 3,
                efficiencyScore: 3,
            },
        ],
    },
    {
        question: "How effectively does your team manage Billing and finance?",
        category: "Billing & Finance",
        options: [
            {
                text: "We use an automated time tracking and billing system.",
                techScore: 2,
                efficiencyScore: 1,
            },
            {
                text: "Our firm supports multiple billing models (hourly, fixed, contingency, alternative fee arrangements).",
                techScore: 2,
                efficiencyScore: 2,
            },
            {
                text: "We have an e-billing system for invoicing and compliance with client guidelines.",
                techScore: 2,
                efficiencyScore: 2,
            },
            {
                text: "AI-powered analytics help us forecast revenue and financial trends.",
                techScore: 3,
                efficiencyScore: 2,
            },
            {
                text: "We have automated alerts for unpaid invoices and overdue accounts.",
                techScore: 1,
                efficiencyScore: 3,
            },
        ],
    },
    {
        question:
            "How effectively does your firm handle litigation and case strategy?",
        category: "Litigation & Case Strategy",
        options: [
            {
                text: "AI-driven legal research tools help us analyze case laws and precedents.",
                techScore: 3,
                efficiencyScore: 2,
            },
            {
                text: "We use litigation analytics to assess judge and opposing counsel tendencies.",
                techScore: 3,
                efficiencyScore: 2,
            },
            {
                text: "Our firm has structured workflows for evidence collection and authentication.",
                techScore: 2,
                efficiencyScore: 2,
            },
            {
                text: "Predictive analytics help us assess case outcomes and risk factors.",
                techScore: 3,
                efficiencyScore: 3,
            },
            {
                text: "We have automated calendaring for court deadlines and litigation tasks.",
                techScore: 2,
                efficiencyScore: 1,
            },
        ],
    },
    {
        question:
            "How effectively does your firm leverage automation for practice growth?",
        category: "Practice Development & Automation",
        options: [
            {
                text: "We use client relationship management (CRM) tools to track leads and interactions.",
                techScore: 2,
                efficiencyScore: 1,
            },
            {
                text: "Marketing automation tools help us manage firm outreach and branding.",
                techScore: 2,
                efficiencyScore: 2,
            },
            {
                text: "Chatbots or automated assistants handle basic client queries.",
                techScore: 3,
                efficiencyScore: 2,
            },
            {
                text: "Legal workflow automation improves efficiency in routine processes.",
                techScore: 3,
                efficiencyScore: 2,
            },
            {
                text: "We leverage dashboards for firm-wide performance tracking and insights.",
                techScore: 2,
                efficiencyScore: 3,
            },
        ],
    },
];

export default function LegalForm() {
    const [firmType, setFirmType] = useState("");
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [isComplete, setIsComplete] = useState(false);
    const [teamSize, setTeamSize] = useState("");

    const questions =
        firmType === "legal-department"
            ? legalDepartmentQuestions
            : lawFirmQuestions;

    const teamSizeOptions = [
        "1 Person",
        "2-20 Persons",
        "21-50 Persons",
        "51-200 Persons",
        "201-500 Persons",
        "500+ Persons"
    ];

    const calculateCategoryScores = (questionIndex, selectedOptions) => {
        const question = questions[questionIndex];
        let totalTechScore = 0;
        let totalEfficiencyScore = 0;
        let maxTechScore = 0;
        let maxEfficiencyScore = 0;

        // Calculate scores for selected options
        selectedOptions.forEach((optionIndex) => {
            const option = question.options[optionIndex];
            totalTechScore += option.techScore;
            totalEfficiencyScore += option.efficiencyScore;
        });

        // Calculate maximum possible scores
        question.options.forEach((option) => {
            maxTechScore += option.techScore;
            maxEfficiencyScore += option.efficiencyScore;
        });

        return {
            category: question.category,
            techScore: (totalTechScore / maxTechScore) * 100,
            efficiencyScore: (totalEfficiencyScore / maxEfficiencyScore) * 100,
        };
    };

    const calculateFinalScores = () => {
        if (Object.keys(answers).length === 0) {
            return {
                technologyScore: 0,
                efficiencyScore: 0,
                totalScore: 0,
            };
        }

        const categoryScores = Object.entries(answers).map(
            ([questionIndex, selectedOptions]) =>
                calculateCategoryScores(
                    parseInt(questionIndex),
                    selectedOptions
                )
        );

        const overallScores = categoryScores.reduce(
            (acc, score) => ({
                techScore: acc.techScore + score.techScore,
                efficiencyScore: acc.efficiencyScore + score.efficiencyScore,
            }),
            { techScore: 0, efficiencyScore: 0 }
        );

        const avgTechScore = overallScores.techScore / categoryScores.length;
        const avgEfficiencyScore =
            overallScores.efficiencyScore / categoryScores.length;
        const finalScore = 0.6 * avgEfficiencyScore + 0.4 * avgTechScore;

        return {
            technologyScore: avgTechScore.toFixed(2),
            efficiencyScore: avgEfficiencyScore.toFixed(2),
            totalScore: finalScore.toFixed(2),
        };
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
        } else {
            setIsComplete(true);
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion((prev) => prev - 1);
        }
    };

    const handleCheckboxChange = (optionIndex) => {
        setAnswers((prev) => {
            const currentAnswers = prev[currentQuestion] || [];
            const updatedAnswers = currentAnswers.includes(optionIndex)
                ? currentAnswers.filter((index) => index !== optionIndex)
                : [...currentAnswers, optionIndex];

            return {
                ...prev,
                [currentQuestion]: updatedAnswers,
            };
        });
    };

    const getScoreComment = (score) => {
        if (score <= 20) {
            return "Legal operations are at high risk due to poor technology adoption and inefficient workflows, leading to delays, compliance risks, and high workload.";
        } else if (score <= 40) {
            return "Foundational digital tools exist but are poorly integrated, making workflows slow, error-prone, and dependent on manual efforts.";
        } else if (score <= 60) {
            return "Legal operations are partially automated, but inefficiencies in integration and execution limit overall effectiveness.";
        } else if (score <= 80) {
            return "Well-structured legal operations with strong process control, though some manual processes and tech limitations still create bottlenecks.";
        } else {
            return "Highly optimized legal team with seamless automation, potentially AI-driven insights, and efficient workflows maximizing speed, compliance, and accuracy.";
        }
    };

    const getEfficiencyComment = (score) => {
        if (score <= 20) {
            return "Workflows are highly disorganized, with excessive manual interventions causing bottlenecks, errors, and compliance risks.";
        } else if (score <= 40) {
            return "Basic processes exist, but reliance on manual tracking slows execution, leading to frequent delays and operational inefficiencies.";
        } else if (score <= 60) {
            return "Some automation implemented, but inconsistencies in execution prevent seamless workflows, causing avoidable rework and inefficiencies.";
        } else if (score <= 80) {
            return "Operations are structured and well-executed, with minimal friction, though some manual interventions still affect speed and accuracy.";
        } else {
            return "Fully optimized workflows ensure high-speed execution, with proactive tracking and automation eliminating operational delays.";
        }
    };

    const getTechnologyComment = (score) => {
        if (score <= 20) {
            return "Legal operations rely entirely on manual processes, with little to no adoption of digital tools, creating high inefficiency and compliance risks.";
        } else if (score <= 40) {
            return "Some basic tools (e.g., spreadsheets, shared drives) are in use, but lack of integration limits their impact on overall workflow efficiency.";
        } else if (score <= 60) {
            return "Core legal technologies exist but are not fully automated, leading to gaps in workflow execution.";
        } else if (score <= 80) {
            return "Strong legal tech adoption, with well-integrated tools enhancing efficiency, though AI-driven optimizations are still underutilized.";
        } else {
            return "Fully digitized and potentially AI-powered legal operations, leveraging automation and analytics to optimize performance and risk management.";
        }
    };

    const getCategoryObservations = (category: string, implemented: string[], notImplemented: string[]) => {
        const observations = {
            Contracts: {
                "We have a centralized repository for all contracts.": {
                    implemented: "Your team has established a centralized contract repository, ensuring quick access, improved organization, and reduced document chaos.",
                    notImplemented: "The absence of a centralized repository has led to scattered contracts, inefficient retrieval, and potential risk exposure."
                },
                "Contracts are automatically drafted or templatized.": {
                    implemented: "Standardized contract templates streamline drafting, reducing errors and improving turnaround time.",
                    notImplemented: "Manual drafting increases inconsistencies, prolongs contract creation, and raises compliance risks."
                },
                "We have a system to track contract renewals and deadlines.": {
                    implemented: "Automated tracking of contract renewals and deadlines minimizes missed obligations and ensures compliance.",
                    notImplemented: "Lack of a tracking system results in higher risks of contract breaches and increased administrative workload."
                },
                "We use AI to review contracts.": {
                    implemented: "AI-powered contract review accelerates risk assessment and enhances accuracy in identifying key clauses.",
                    notImplemented: "Manual contract review is slow, prone to errors, and lacks comprehensive risk detection."
                },
                "We have time alert specific obligation management.": {
                    implemented: "Automated alerts ensure timely compliance with contract obligations, reducing disputes and financial penalties.",
                    notImplemented: "Without alerts, obligations may be overlooked, increasing legal and operational risks."
                }
            },
            Compliance: {
                "We use automated regulatory tracking tools to monitor relevant legal changes.": {
                    implemented: "Real-time tracking of regulatory updates helps the team stay compliant with changing laws.",
                    notImplemented: "Manual tracking increases the risk of non-compliance and legal repercussions."
                },
                "We maintain a systematic compliance calendar with reminders for key deadlines.": {
                    implemented: "A structured compliance calendar centralizes regulatory deadlines, reducing missed filings.",
                    notImplemented: "Without a compliance calendar, teams struggle to track obligations, leading to potential regulatory penalties."
                },
                "We have a centralized digital repository for all compliance documentation.": {
                    implemented: "A dedicated repository ensures compliance documents are organized and easily retrievable.",
                    notImplemented: "Fragmented storage complicates audits and increases the risk of missing critical compliance records."
                },
                "We utilize workflow automation for routine compliance processes.": {
                    implemented: "Automated workflows standardize compliance procedures, reducing manual errors and inefficiencies.",
                    notImplemented: "Without automation, compliance tasks are inconsistent, increasing administrative burdens."
                },
                "We implement compliance analytics dashboards to track and report on key metrics.": {
                    implemented: "Real-time analytics provide insights into compliance trends and risks, enabling proactive decision-making.",
                    notImplemented: "Limited visibility into compliance performance can lead to reactive risk management and higher penalties."
                }
            },
            "Intellectual Property (IP) Management": {
                "We have a centralized IP management system for tracking patents, trademarks, and copyrights.": {
                    implemented: "A structured system ensures efficient tracking of patents, trademarks, and copyrights.",
                    notImplemented: "Decentralized IP tracking increases the risk of missed filings and IP loss."
                },
                "AI-driven tools monitor potential IP infringements and unauthorized usage.": {
                    implemented: "Automated monitoring detects potential infringements, allowing proactive protection of assets.",
                    notImplemented: "Without AI monitoring, IP violations may go unnoticed, increasing legal risks."
                },
                "We use automated alerts for IP renewal deadlines and maintenance filings.": {
                    implemented: "Renewal reminders prevent unintentional lapses in IP rights.",
                    notImplemented: "Missed renewal deadlines may result in the loss of valuable intellectual property."
                },
                "AI-powered tools assist in prior art searches and competitive IP analysis.": {
                    implemented: "AI accelerates patent research, improving the quality and efficiency of filings.",
                    notImplemented: "Manual prior art searches are time-intensive and prone to oversight."
                },
                "We integrate IP risk assessment tools into our overall compliance framework.": {
                    implemented: "Structured risk assessment tools enhance IP protection strategies and competitive analysis.",
                    notImplemented: "Without assessment tools, IP risks may be underestimated, leading to weak enforcement."
                }
            },
            "Internal Support": {
                "A centralized legal helpdesk or portal is available for internal teams to request legal assistance.": {
                    implemented: "A legal helpdesk centralizes support requests, improving tracking and resolution times.",
                    notImplemented: "Lack of a centralized system results in inefficient, scattered legal support requests."
                },
                "Automated intake and triage tools categorize and prioritize internal legal queries.": {
                    implemented: "Automation categorizes and prioritizes legal queries, ensuring efficient response management.",
                    notImplemented: "Manual request handling delays responses and increases routing errors."
                },
                "We use AI-assisted chatbots for answering common legal FAQs.": {
                    implemented: "Chatbots provide instant responses, reducing repetitive queries for legal teams.",
                    notImplemented: "Without AI chatbots, employees rely on manual interactions, consuming valuable legal resources."
                },
                "Our legal team operates through integrated communication platforms for seamless collaboration.": {
                    implemented: "Seamless communication enhances collaboration across legal and business teams.",
                    notImplemented: "Fragmented communication channels lead to delays and misalignment between teams."
                },
                "We maintain department-specific legal data rooms for easy access to relevant documents.": {
                    implemented: "Secure data rooms ensure controlled access to sensitive legal documents.",
                    notImplemented: "Lack of structured data rooms increases security risks and complicates information sharing."
                }
            },
            "Litigation Management": {
                "We have a centralized matter management systems for organizing case information.": {
                    implemented: "Litigation cases are well-organized, enabling efficient tracking and document retrieval.",
                    notImplemented: "Lack of a centralized system complicates case tracking and increases risks of disorganization."
                },
                "We have automated workflows for tracking litigation progress and deadlines.": {
                    implemented: "Automated workflows enhance case progress tracking and prevent missed deadlines.",
                    notImplemented: "Manual litigation tracking leads to delays and administrative inefficiencies."
                },
                "We use AI-driven tools for predictive analysis on case outcomes.": {
                    implemented: "Data-driven insights improve case strategy and risk evaluation.",
                    notImplemented: "Without predictive analysis, legal teams rely solely on experience, missing key risk factors."
                },
                "We follow structured checklists for collecting and authenticating evidence.": {
                    implemented: "Evidence management is systematic, reducing procedural errors and inconsistencies.",
                    notImplemented: "Without checklists, evidence handling becomes prone to oversight and mismanagement."
                },
                "We have access to legal research databases for staying updated on relevant precedents.": {
                    implemented: "Quick access to legal research strengthens case arguments and preparation.",
                    notImplemented: "Without legal research tools, case preparation is slower and less comprehensive."
                }
            },
            "Client & Matter Management": {
                "We have a centralized matter management system to track all cases and clients.": {
                    implemented: "All client matters are systematically tracked, improving workflow efficiency and organization.",
                    notImplemented: "Lack of a centralized system leads to fragmented client management and potential service delays."
                },
                "Our firm uses client intake and onboarding automation tools.": {
                    implemented: "New clients are onboarded smoothly with minimal manual intervention, ensuring consistency.",
                    notImplemented: "Manual onboarding creates inconsistencies, increasing processing time and administrative burden."
                },
                "We utilize conflict-checking software before taking on new matters.": {
                    implemented: "Potential conflicts of interest are quickly identified, reducing ethical and legal risks.",
                    notImplemented: "Manual conflict checks are slow and error-prone, increasing regulatory non-compliance risks."
                },
                "Our system integrates client communication logs and case-related emails.": {
                    implemented: "All client interactions are recorded centrally, enhancing transparency and accessibility.",
                    notImplemented: "Scattered communication records make it harder to track interactions, leading to inefficiencies."
                },
                "We use AI-powered tools for client risk assessment and matter predictions.": {
                    implemented: "AI provides advanced risk profiling, helping firms make data-driven client decisions.",
                    notImplemented: "Risk evaluations remain subjective, increasing exposure to unexpected legal and financial risks."
                }
            },
            "Document & Knowledge Management": {
                "We have a centralized document management system for storing and retrieving legal files.": {
                    implemented: "Legal documents are securely stored and easily searchable, reducing retrieval time.",
                    notImplemented: "Decentralized document storage leads to inefficiencies and security risks."
                },
                "Our firm utilizes version control to track document changes and prevent errors.": {
                    implemented: "Version control ensures accuracy and prevents confusion over document updates.",
                    notImplemented: "Without version control, tracking document revisions becomes difficult and error-prone."
                },
                "We use AI-assisted document automation for drafting contracts and pleadings.": {
                    implemented: "Automated drafting reduces manual effort and ensures document consistency.",
                    notImplemented: "Manual document drafting is time-consuming and prone to human errors."
                },
                "There is a firm-wide knowledge repository for legal research and case precedents.": {
                    implemented: "A structured repository preserves institutional knowledge and improves collaboration.",
                    notImplemented: "Without a knowledge repository, critical legal insights may be lost or underutilized."
                },
                "We use AI-powered tools for document review and due diligence.": {
                    implemented: "AI speeds up document review and enhances accuracy in identifying key risks.",
                    notImplemented: "Manual review processes take longer and may overlook crucial details."
                }
            },
            "Billing & Finance": {
                "We use an automated time tracking and billing system.": {
                    implemented: "Accurate billing and time tracking reduce revenue leakage and improve transparency.",
                    notImplemented: "Manual tracking is prone to errors, causing billing disputes and inefficiencies."
                },
                "Our firm supports multiple billing models (hourly, fixed, contingency, alternative fee arrangements).": {
                    implemented: "Flexible billing structures cater to diverse client needs, improving financial efficiency.",
                    notImplemented: "Rigid billing models limit the firm's ability to accommodate varied client preferences."
                },
                "We have an e-billing system for invoicing and compliance with client guidelines.": {
                    implemented: "Digital invoicing speeds up payment collection and enhances financial transparency.",
                    notImplemented: "Manual invoicing increases administrative workload and delays payment processing."
                },
                "AI-powered analytics help us forecast revenue and financial trends.": {
                    implemented: "Predictive analytics provide data-driven insights into revenue and expense management.",
                    notImplemented: "Financial forecasting is manual and lacks accuracy, leading to planning inefficiencies."
                },
                "We have automated alerts for unpaid invoices and overdue accounts.": {
                    implemented: "Late payments are flagged automatically, ensuring timely follow-ups and improved cash flow.",
                    notImplemented: "Without alerts, overdue invoices are harder to track, increasing financial risks."
                }
            },
            "Litigation & Case Strategy": {
                "AI-driven legal research tools help us analyze case laws and precedents.": {
                    implemented: "Legal research is faster and more comprehensive with AI-assisted case law analysis.",
                    notImplemented: "Manual research is slow, increasing the risk of missing critical precedents."
                },
                "We use litigation analytics to assess judge and opposing counsel tendencies.": {
                    implemented: "Data-driven insights provide strategic advantages in litigation planning.",
                    notImplemented: "Without analytics, case strategy is based on subjective judgment alone."
                },
                "Our firm has structured workflows for evidence collection and authentication.": {
                    implemented: "A structured approach improves evidence authentication and case preparation.",
                    notImplemented: "Unstructured evidence handling can lead to inconsistencies and missing documents."
                },
                "Predictive analytics help us assess case outcomes and risk factors.": {
                    implemented: "AI helps assess case strengths, weaknesses, and potential outcomes.",
                    notImplemented: "Case decisions rely solely on past experiences, missing predictive insights."
                },
                "We have automated calendaring for court deadlines and litigation tasks.": {
                    implemented: "Automated deadline tracking prevents missed court dates and procedural delays.",
                    notImplemented: "Manual deadline tracking increases the risk of missed filings and penalties."
                }
            },
            "Practice Development & Automation": {
                "We use client relationship management (CRM) tools to track leads and interactions.": {
                    implemented: "CRM systems provide structured tracking of client interactions and relationships.",
                    notImplemented: "Without CRM, client management is less organized, leading to inefficiencies in service."
                },
                "Marketing automation tools help us manage firm outreach and branding.": {
                    implemented: "Marketing automation enhances client engagement and lead management.",
                    notImplemented: "Manual marketing processes are less targeted and require more effort."
                },
                "Chatbots or automated assistants handle basic client queries.": {
                    implemented: "AI-driven chatbots provide instant responses, improving client satisfaction.",
                    notImplemented: "Without chatbots, client inquiries take longer to process and resolve."
                },
                "Legal workflow automation improves efficiency in routine processes.": {
                    implemented: "Automation streamlines routine legal processes, improving productivity.",
                    notImplemented: "Manual workflows increase inefficiencies and create inconsistencies."
                },
                "We leverage dashboards for firm-wide performance tracking and insights.": {
                    implemented: "Real-time performance insights enhance decision-making and firm growth.",
                    notImplemented: "Without analytics, tracking performance and strategic planning is less effective."
                }
            }
        };

        // Get the category observations
        const categoryObs = observations[category as keyof typeof observations];
        if (!categoryObs) return {};

        // Create a map of observations based on implementation status
        const result: Record<string, string> = {};
        
        // Add implemented observations
        implemented.forEach(feature => {
            if (categoryObs[feature as keyof typeof categoryObs]) {
                result[feature] = categoryObs[feature as keyof typeof categoryObs].implemented;
            }
        });
        
        // Add not implemented observations
        notImplemented.forEach(feature => {
            if (categoryObs[feature as keyof typeof categoryObs]) {
                result[feature] = categoryObs[feature as keyof typeof categoryObs].notImplemented;
            }
        });

        return result;
    };

    const generateReport = () => {
        const categoryScores = Object.entries(answers).map(
            ([questionIndex, selectedOptions]) =>
                calculateCategoryScores(
                    parseInt(questionIndex),
                    selectedOptions
                )
        );

        const finalScores = calculateFinalScores();
        
        // Create a JSON object with all report data
        const reportData = {
            finalScores,
            categoryDetails: categoryScores.map(score => {
                const questionIndex = categoryScores.findIndex(cs => cs.category === score.category);
                const question = questions[questionIndex];
                const selectedOptions = answers[questionIndex] || [];
                const implemented = selectedOptions.map(
                    (idx) => question.options[idx].text
                );
                const notImplemented = question.options
                    .filter((_, idx) => !selectedOptions.includes(idx))
                    .map((opt) => opt.text);
                    
                // Get observations for this category
                const observations = getCategoryObservations(score.category, implemented, notImplemented);
                
                return {
                    category: score.category,
                    techScore: score.techScore,
                    efficiencyScore: score.efficiencyScore,
                    implemented,
                    notImplemented,
                    observations
                };
            }),
            teamSize: teamSize,
            assessmentOverview: getScoreComment(parseFloat(finalScores.totalScore)),
            efficiencyComment: getEfficiencyComment(parseFloat(finalScores.efficiencyScore)),
            technologyComment: getTechnologyComment(parseFloat(finalScores.technologyScore)),
            generatedDate: new Date().toISOString()
        };
        
        // Log the complete report data to console
        console.log('Digital Readiness Assessment Report Data:', reportData);
        
        // Create new jsPDF instance
        const doc = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4",
            compress: true,
        });
        
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;
        const margin = 15;
        const contentWidth = pageWidth - 2 * margin;
        
        // Custom functions
        const getScoreColor = (percentage) => {
            if (percentage <= 20) return "#FF5252"; // Red
            if (percentage <= 40) return "#FF9800"; // Orange
            if (percentage <= 60) return "#FFC107"; // Yellow
            if (percentage <= 80) return "#8BC34A"; // Light green
            return "#4CAF50"; // Green
        };
        
        const addMultiLineText = (text, x, y, maxWidth, fontSize = 10, align = "left", color = "#000000") => {
            doc.setFontSize(fontSize);
            doc.setTextColor(color);
            const lines = doc.splitTextToSize(text, maxWidth);
            doc.text(lines, x, y, { align: align });
            return y + lines.length * (fontSize * 0.352); // Approximate line height
        };
        
        const addHeadingWithUnderline = (text, x, y, fontSize = 16, color = "#1D2456") => {
            doc.setFontSize(fontSize);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(color);
            doc.text(text, x, y);
            
            // Add underline
            const textWidth = doc.getTextWidth(text);
            doc.setDrawColor(color);
            doc.setLineWidth(0.5);
            doc.line(x, y + 1, x + textWidth, y + 1);
            
            return y + fontSize * 0.5;
        };
        
        const addBulletPoint = (text, x, y, maxWidth, fontSize = 11, bulletType = "•") => {
            doc.setFontSize(fontSize);
            doc.setFont("helvetica", "normal");
            doc.setTextColor(50, 50, 50);
            
            // Add custom bullet point
            doc.text(bulletType, x, y);
            
            // Calculate bullet width for indentation
            const bulletWidth = doc.getTextWidth(bulletType + " ");
            
            // Add the text with proper indentation
            const lines = doc.splitTextToSize(text, maxWidth - bulletWidth - 2);
            doc.text(lines, x + bulletWidth, y);
            
            return y + lines.length * (fontSize * 0.352); // Return the new Y position
        };
        
        const drawCircularProgress = (x, y, radius, percentage, customColor = null) => {
            const color = customColor || getScoreColor(percentage);
            
            // Draw background circle (light gray)
            doc.setFillColor(240, 240, 240);
            doc.circle(x, y, radius, 'F');
            
            // Draw progress arc using multiple small lines to approximate an arc
            if (percentage > 0) {
                const startAngle = -90; // Start from top (in degrees)
                const endAngle = startAngle + (percentage * 360) / 100;
                
                // Convert to radians for calculation
                const startRad = (startAngle * Math.PI) / 180;
                const endRad = (endAngle * Math.PI) / 180;
                
                // Draw the arc using small line segments
                const segments = 100; // More segments = smoother arc
                const angleStep = (endRad - startRad) / segments;
                
                // Set color for progress
                doc.setFillColor(color);
                
                // Create a series of triangles to approximate the circular segment
                for (let i = 0; i < segments; i++) {
                    const angle1 = startRad + i * angleStep;
                    const angle2 = startRad + (i + 1) * angleStep;
                    
                    const x1 = x + radius * Math.cos(angle1);
                    const y1 = y + radius * Math.sin(angle1);
                    const x2 = x + radius * Math.cos(angle2);
                    const y2 = y + radius * Math.sin(angle2);
                    
                    // Draw a filled triangle (center point + two points on circumference)
                    doc.triangle(x, y, x1, y1, x2, y2, 'F');
                }
            }
            
            // Draw inner white circle for donut effect
            const innerRadius = radius * 0.65;
            doc.setFillColor(255, 255, 255);
            doc.circle(x, y, innerRadius, 'F');
            
            // Add percentage text in the center
            doc.setFont("helvetica", "bold");
            doc.setFontSize(14);
            doc.setTextColor(29, 36, 86);
            doc.text(`${Math.round(percentage)}%`, x, y + 4, { align: 'center' });
        };
        
        const drawProgressBar = (x, y, width, percentage, label, showPercentage = true) => {
            const color = getScoreColor(percentage);
            
            // Draw background bar
            doc.setFillColor(240, 240, 240);
            doc.roundedRect(x, y, width, 6, 3, 3, 'F');
            
            // Draw progress bar
            doc.setFillColor(color);
            const progressWidth = (width * percentage) / 100;
            if (progressWidth > 0) {
                doc.roundedRect(x, y, progressWidth, 6, 3, 3, 'F');
            }
            
            // Add label and percentage
            doc.setFont("helvetica", "normal");
            doc.setFontSize(9);
            doc.setTextColor(80, 80, 80);
            doc.text(label, x, y - 3);
            
            if (showPercentage) {
                doc.setFont("helvetica", "bold");
                doc.setTextColor(29, 36, 86);
                doc.text(`${percentage.toFixed(1)}%`, x + width + 5, y + 4);
            }
        };
        
        // Cover Page
        // Add header with dark blue background
        doc.setFillColor(29, 36, 86); // Dark blue
        doc.rect(0, 0, pageWidth, 45, 'F');
        
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(22);
        doc.setFont("helvetica", "bold");
        doc.text("LEGAL TEAM MATURITY AND", pageWidth / 2, 20, { align: "center" });
        doc.text("DIGITAL READINESS REPORT", pageWidth / 2, 30, { align: "center" });
        
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text("Assessing Efficiency, Technology Adoption, and Future-Readiness of Legal Teams", 
            pageWidth / 2, 40, { align: "center" });
        
        // Add organization type and date
        let yPos = 60;
        doc.setTextColor(29, 36, 86);
        doc.setFontSize(20);
        doc.setFont("helvetica", "bold");
        doc.text(
            `${firmType === "legal-department" ? "Legal Department" : "Law Firm"}`,
            margin,
            yPos
        );
        
        doc.setFontSize(14);
        doc.setFont("helvetica", "normal");
        doc.text(
            `Team size: ${teamSize}`,
            margin,
            yPos + 10
        );
        
        doc.setFontSize(12);
        doc.text(
            `Generated on: ${new Date().toLocaleDateString()}`,
            pageWidth - margin,
            yPos,
            { align: "right" }
        );
        
        // Add overall score visualization
        yPos += 30;
        
        // Draw circular progress chart for overall score
        drawCircularProgress(
            margin + 45, 
            yPos + 35, 
            25, 
            parseFloat(finalScores.totalScore) 
        );
        
        // Add horizontal progress bars for sub-scores
        drawProgressBar(
            margin + 100, 
            yPos + 25, 
            pageWidth / 2.5, 
            parseFloat(finalScores.efficiencyScore), 
            "Efficiency Score"
        );
        
        drawProgressBar(
            margin + 100, 
            yPos + 45, 
            pageWidth / 2.5, 
            parseFloat(finalScores.technologyScore), 
            "Technology Score"
        );
        
        // Add assessment text
        yPos += 70;
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(50, 50, 50);
        const assessmentText = getScoreComment(parseFloat(finalScores.totalScore));
        yPos = addMultiLineText(assessmentText, margin, yPos, contentWidth, 12);
        
        // Add category scores line chart
        yPos += 10;
        yPos = addHeadingWithUnderline("Legal operations category scores", margin, yPos);
        
        yPos += 10;
        // Draw line chart axes
        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.5);
        doc.line(margin, yPos + 70, margin + contentWidth, yPos + 70); // X-axis
        doc.line(margin, yPos, margin, yPos + 70); // Y-axis
        
        // Draw horizontal grid lines
        doc.setDrawColor(230, 230, 230);
        doc.setLineWidth(0.3);
        for (let i = 1; i <= 4; i++) {
            const gridY = yPos + 70 - (i * 70 / 5);
            doc.line(margin, gridY, margin + contentWidth, gridY);
            doc.setFontSize(9);
            doc.setTextColor(120, 120, 120);
            doc.text(`${i * 20}`, margin - 5, gridY, { align: 'right' });
        }
        
        // Draw category score points and lines
        const xStep = contentWidth / (categoryScores.length + 1);
        const dataPoints = categoryScores.map((score, index) => {
            const x = margin + (index + 1) * xStep;
            // Average of both scores for simplicity
            const scoreValue = (score.techScore + score.efficiencyScore) / 2;
            const y = yPos + 70 - (scoreValue * 70 / 100);
            return { x, y, score: scoreValue, category: score.category };
        });
        
        // Draw connecting lines
        doc.setDrawColor(76, 193, 224); // Teal blue
        doc.setLineWidth(1.5);
        for (let i = 0; i < dataPoints.length - 1; i++) {
            doc.line(dataPoints[i].x, dataPoints[i].y, dataPoints[i + 1].x, dataPoints[i + 1].y);
        }
        
        // Draw data points
        dataPoints.forEach((point, index) => {
            // Draw point circles
            doc.setFillColor(50, 50, 50);
            doc.circle(point.x, point.y, 3.5, 'F');
            
            // Draw teal circle around point
            doc.setDrawColor(76, 193, 224);
            doc.setLineWidth(1.5);
            doc.circle(point.x, point.y, 4.5, 'S');
            
            // Add category labels below x-axis
            doc.setFontSize(9);
            doc.setTextColor(80, 80, 80);
            doc.text(`Item ${index + 1}`, point.x, yPos + 80, { align: 'center' });
        });
        
        // Group categories in pairs for the detail pages (2 per page)
        const categoryPairs = [];
        for (let i = 0; i < categoryScores.length; i += 2) {
            if (i + 1 < categoryScores.length) {
                categoryPairs.push([categoryScores[i], categoryScores[i + 1]]);
            } else {
                categoryPairs.push([categoryScores[i]]);
            }
        }
        
        // Track the total number of detail pages
        const totalDetailPages = Math.ceil(categoryScores.length / 2);
        let currentPage = 1;
        
        // Add category detail pages
        categoryPairs.forEach((pair, pairIndex) => {
            doc.addPage();
            currentPage++;
            
            // Determine if this is the last detail page
            const isLastDetailPage = pairIndex === categoryPairs.length - 1;
            let conclusionAdded = false;
            
            pair.forEach((score, index) => {
                // Calculate vertical position based on whether this is the first or second category on the page
                const startY = index === 0 ? 20 : pageHeight / 2 + 10;
                yPos = startY;
                
                // Get question and answers for this category
                const questionIndex = categoryScores.findIndex(cs => cs.category === score.category);
                const question = questions[questionIndex];
                const selectedOptions = answers[questionIndex] || [];
                const implemented = selectedOptions.map(
                    (idx) => question.options[idx].text
                );
                const notImplemented = question.options
                    .filter((_, idx) => !selectedOptions.includes(idx))
                    .map((opt) => opt.text);
                    
                // Get observations for this category
                const observations = getCategoryObservations(score.category, implemented, notImplemented);
                
                // Category name with underline
                yPos = addHeadingWithUnderline(score.category, margin, yPos);
                
                yPos += 10;
                
                // Draw category score visualization
                drawCircularProgress(
                    margin + 35, 
                    yPos + 20, 
                    20, 
                    (score.techScore + score.efficiencyScore) / 2
                );
                
                // Add score bars
                drawProgressBar(
                    margin + 80, 
                    yPos + 10, 
                    pageWidth / 2.5, 
                    score.techScore, 
                    "Technology Score"
                );
                
                drawProgressBar(
                    margin + 80, 
                    yPos + 30, 
                    pageWidth / 2.5, 
                    score.efficiencyScore, 
                    "Efficiency Score"
                );
                
                // Add observations
                yPos += 45;
                yPos = addHeadingWithUnderline("Observations", margin, yPos, 14, "#1D2456");
                
                yPos += 8;
                if (Object.keys(observations).length > 0) {
                    Object.entries(observations).forEach(([feature, observation]) => {
                        yPos = addBulletPoint(
                            observation,
                            margin,
                            yPos,
                            contentWidth - 10,
                            11,
                            "•"
                        );
                        yPos += 3;
                    });
                } else {
                    yPos = addMultiLineText(
                        "No observations available for this category.",
                        margin,
                        yPos,
                        contentWidth - 10,
                        11
                    );
                    yPos += 3;
                }
                
                // Add conclusion after the last category on the last detail page
                if (isLastDetailPage && index === pair.length - 1) {
                    let availableSpace = pageHeight - 30 - yPos; // Remaining space
                    let requiredSpace = 150; // Approx space needed for conclusion
                
                    if (availableSpace < requiredSpace) {
                        // Scale down font size proportionally, ensuring a minimum of 10
                        let newFontSize = Math.max(10, (availableSpace / requiredSpace) * 16);
                        addConclusion(yPos + 15, newFontSize);
                        // Add footer to conclusion page
                        yPos = pageHeight - 8; // Move it lower
                        doc.setFillColor(255, 255, 255); // White background
                        doc.rect(0, yPos - 4, pageWidth, 12, 'F'); // Reduce height from 20 to 12
                        
                        doc.setFontSize(7); // Reduce font size
                        doc.setTextColor(80, 80, 80);
                        doc.text("DreamLegal | Driving digital transformation for legal teams", margin, yPos - 1);
                        
                        // Smaller logo placeholder (Reduced size)
                        doc.setFillColor(29, 36, 86); // Dark blue
                        doc.rect(pageWidth - margin - 6, yPos - 5, 6, 6, 'F'); // Reduce from 10x10 to 6x6
                        
                    } else {
                        addConclusion(yPos + 15, 16); // Default font size
                        // Add footer to conclusion page
                        yPos = pageHeight - 8; // Move it lower
                        doc.setFillColor(255, 255, 255); // White background
                        doc.rect(0, yPos - 4, pageWidth, 12, 'F'); // Reduce height from 20 to 12
                        
                        doc.setFontSize(7); // Reduce font size
                        doc.setTextColor(80, 80, 80);
                        doc.text("DreamLegal | Driving digital transformation for legal teams", margin, yPos - 1);
                        
                        // Smaller logo placeholder (Reduced size)
                        doc.setFillColor(29, 36, 86); // Dark blue
                        doc.rect(pageWidth - margin - 6, yPos - 5, 6, 6, 'F'); // Reduce from 10x10 to 6x6
                        
                    }
                
                    conclusionAdded = true;
                }
                
                
            });
            
            // Add footer to each detail page
            // yPos = pageHeight - 15;
            // doc.setFillColor(255, 255, 255); // White
            // doc.rect(0, yPos - 5, pageWidth, 20, 'F');
            
            // doc.setFontSize(9);
            // doc.setTextColor(80, 80, 80);
            // doc.text("DreamLegal | Driving digital transformation for legal teams", margin, yPos);
            
            // // Add logo placeholder
            // doc.setFillColor(29, 36, 86); // Dark blue
            // doc.rect(pageWidth - margin - 10, yPos - 5, 10, 10, 'F');
            
            // If we are on the last page but didn't have room for the conclusion
            // if (isLastDetailPage && !conclusionAdded) {
            //     // Add a new page for conclusion
            //     // doc.addPage();
                
                // Add footer to conclusion page
                // yPos = pageHeight - 15;
                // doc.setFillColor(255, 255, 255); // White
                // doc.rect(0, yPos - 5, pageWidth, 20, 'F');
                
                // doc.setFontSize(9);
                // doc.setTextColor(80, 80, 80);
                // doc.text("DreamLegal | Driving digital transformation for legal teams", margin, yPos);
                
                // // Add logo placeholder
                // doc.setFillColor(29, 36, 86); // Dark blue
                // doc.rect(pageWidth - margin - 10, yPos - 5, 10, 10, 'F');
            // }
        });
        
        // Helper function to add conclusion section
        function addConclusion(startYPos, fontSize = 14) {
            let yPos = startYPos;
            
            // Conclusive remarks section
            yPos = addHeadingWithUnderline("Conclusive Remark", margin, yPos);
            
            yPos += 15;
            doc.setTextColor(50, 50, 50);
            doc.setFontSize(fontSize);
            doc.setFont("helvetica", "bold");
            doc.text("Observation:", margin, yPos);
            
            yPos += 8;
            doc.setFont("helvetica", "normal");
            doc.setFontSize(Math.max(fontSize - 2, 10)); // Ensure minimum font size of 10
            yPos = addMultiLineText(
                getScoreComment(parseFloat(finalScores.totalScore)),
                margin,
                yPos,
                contentWidth,
                Math.max(fontSize - 2, 10)
            );
        
            // 🟢 Next Steps
            yPos += 15;
            doc.setFontSize(fontSize);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(76, 175, 80);
            doc.text("Next Steps:", margin, yPos);
            
            yPos += 8;
            const recommendations = [
                "Stay ahead by exploring cutting-edge advancements in AI, blockchain, or predictive analytics.",
                "Benchmark performance against industry leaders to maintain a competitive edge.",
                "Invest in continuous training to keep the team proficient with evolving technology."
            ];
            
            recommendations.forEach(rec => {
                yPos = addBulletPoint(rec, margin, yPos, contentWidth, Math.max(fontSize - 2, 10), "•"); // Using • as bullet
                yPos += 4;
            });
        
            // ⚠ Caution
            yPos += 10;
            doc.setFontSize(fontSize);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(255, 152, 0);
            doc.text("Caution:", margin, yPos);
            
            yPos += 8;
            const cautions = [
                "Complacency can lead to stagnation—innovation should be a continuous effort.",
                "Regularly reassess your tech stack to ensure it remains the best fit for evolving needs."
            ];
            
            cautions.forEach(caution => {
                yPos = addBulletPoint(caution, margin, yPos, contentWidth, Math.max(fontSize - 2, 10), "•"); // Using • as bullet
                yPos += 4;
            });
        }
        
        // Save the PDF
        doc.save("legal-assessment-report.pdf");
    };

    const calculateProgress = () => {
        if (!firmType) return 0;
        return ((currentQuestion + 1) / questions.length) * 100;
    };

    const askForTeamSize = () => {
        return (
            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-primary">
                    Please select your team size:
                </h3>
                <div className="grid gap-4">
                    {teamSizeOptions.map((option, index) => (
                        <div
                            key={index}
                            className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-colors ${
                                teamSize === option
                                    ? "border-primary bg-primary/5"
                                    : "border-muted hover:border-muted-foreground/50"
                            }`}
                        >
                            <Checkbox
                                id={`team-size-${index}`}
                                checked={teamSize === option}
                                onCheckedChange={() => setTeamSize(option)}
                                className="h-5 w-5"
                            />
                            <div className="flex-grow">
                                <label
                                    htmlFor={`team-size-${index}`}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                >
                                    {option}
                                </label>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="max-w-4xl mx-auto py-8 mt-28">
            <Card className="shadow-lg border-2">
                <CardHeader className="space-y-2 pt-5">
                    {!firmType ? (
                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold text-center">
                                Legal Technology Assessment
                            </h2>
                            <p className="text-muted-foreground text-center max-w-2xl mx-auto">
                                Select your organization type to begin the
                                assessment of your legal technology
                                implementation.
                            </p>
                            <div className="w-full mt-6 mx-auto">
                                <Select onValueChange={setFirmType}>
                                    <SelectTrigger className="h-12">
                                        <SelectValue placeholder="Select organization type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="legal-department">
                                            Legal Department
                                        </SelectItem>
                                        <SelectItem value="law-firm">
                                            Law Firm
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    ) : !teamSize ? (
                        askForTeamSize()
                    ) : !isComplete ? (
                        <>
                            <div className="flex justify-between items-center border-b py-2">
                                <h2 className="text-2xl font-bold">
                                    {firmType === "legal-department"
                                        ? "Legal Department"
                                        : "Law Firm"}{" "}
                                    Assessment
                                </h2>
                                <span className="text-sm text-muted-foreground">
                                    Question {currentQuestion + 1} of{" "}
                                    {questions.length}
                                </span>
                            </div>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentQuestion}
                                    initial={{ x: 50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -50, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-6"
                                >
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-semibold text-primary">
                                            {questions[currentQuestion].question}
                                        </h3>
                                        <p className="text-sm text-muted-foreground mb-6">
                                            Select all options that apply to your
                                            organization
                                        </p>
                                        <div className="grid gap-4">
                                            {questions[currentQuestion].options.map(
                                                (option, index) => (
                                                    <div
                                                        key={index}
                                                        className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-colors ${
                                                            (
                                                                answers[
                                                                    currentQuestion
                                                                ] || []
                                                            ).includes(index)
                                                                ? "border-primary bg-primary/5"
                                                                : "border-muted hover:border-muted-foreground/50"
                                                        }`}
                                                    >
                                                        <Checkbox
                                                            id={`option-${index}`}
                                                            checked={(
                                                                answers[
                                                                    currentQuestion
                                                                ] || []
                                                            ).includes(index)}
                                                            onCheckedChange={() =>
                                                                handleCheckboxChange(
                                                                    index
                                                                )
                                                            }
                                                            className="h-5 w-5"
                                                        />
                                                        <div className="flex-grow">
                                                            <label
                                                                htmlFor={`option-${index}`}
                                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                                            >
                                                                {option.text}
                                                            </label>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-8 py-8"
                        >
                            <div className="text-center">
                                <div className="h-24 w-24 rounded-full bg-green-100 mx-auto flex items-center justify-center mb-6">
                                    <svg
                                        className="h-12 w-12 text-green-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-green-600 mb-2">
                                    Assessment Complete!
                                </h2>
                                <p className="text-muted-foreground">
                                    Here's your technology adoption score
                                    breakdown
                                </p>
                            </div>

                            <div className="max-w-md mx-auto space-y-6">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium">
                                                Technology Score
                                            </span>
                                            <span className="text-sm font-bold">
                                                {
                                                    calculateFinalScores()
                                                        .technologyScore
                                                }
                                                %
                                            </span>
                                        </div>
                                        <Progress
                                            value={
                                                calculateFinalScores()
                                                    .technologyScore
                                            }
                                            className="h-2"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium">
                                                Efficiency Score
                                            </span>
                                            <span className="text-sm font-bold">
                                                {
                                                    calculateFinalScores()
                                                        .efficiencyScore
                                                }
                                                %
                                            </span>
                                        </div>
                                        <Progress
                                            value={
                                                calculateFinalScores()
                                                    .efficiencyScore
                                            }
                                            className="h-2"
                                        />
                                    </div>

                                    <div className="pt-4 border-t">
                                        <div className="flex justify-between items-center">
                                            <span className="text-base font-semibold">
                                                Final Score
                                            </span>
                                            <span className="text-lg font-bold text-primary">
                                                {
                                                    calculateFinalScores()
                                                        .totalScore
                                                }
                                                %
                                            </span>
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            Based on 60% Efficiency and 40%
                                            Technology weights
                                        </p>
                                    </div>
                                </div>

                                <Button
                                    onClick={generateReport}
                                    className="w-full mt-6"
                                    size="lg"
                                >
                                    Download Detailed Report
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </CardHeader>

                {firmType && !isComplete && (
                    <CardFooter className="border-t bg-muted/20 p-6">
                        <div className="flex justify-between w-full">
                            <Button
                                onClick={handlePrevious}
                                disabled={currentQuestion === 0}
                                variant="outline"
                                className="w-[100px]"
                            >
                                Previous
                            </Button>
                            <Button onClick={handleNext} className="w-[100px]">
                                {currentQuestion === questions.length - 1
                                    ? "Finish"
                                    : "Next"}
                            </Button>
                        </div>
                    </CardFooter>
                )}
            </Card>
        </div>
    );
}
