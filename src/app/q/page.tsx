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

    const questions =
        firmType === "legal-department"
            ? legalDepartmentQuestions
            : lawFirmQuestions;

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

    const getCategoryObservations = (category, implemented, notImplemented) => {
        const observations = {
            Contracts: {
                "Centralized Contract Repository": {
                    implemented:
                        "Your team has established a centralized contract repository, ensuring quick access, improved organization, and reduced document chaos.",
                    notImplemented:
                        "The absence of a centralized repository has led to scattered contracts, inefficient retrieval, and potential risk exposure.",
                },
                "Automatically Drafted/Templatized Contracts": {
                    implemented:
                        "Standardized contract templates streamline drafting, reducing errors and improving turnaround time.",
                    notImplemented:
                        "Manual drafting increases inconsistencies, prolongs contract creation, and raises compliance risks.",
                },
                "Tracking Renewals and Deadlines": {
                    implemented:
                        "Automated tracking of contract renewals and deadlines minimizes missed obligations and ensures compliance.",
                    notImplemented:
                        "Lack of a tracking system results in higher risks of contract breaches and increased administrative workload.",
                },
                "AI-Assisted Contract Review": {
                    implemented:
                        "AI-powered contract review accelerates risk assessment and enhances accuracy in identifying key clauses.",
                    notImplemented:
                        "Manual contract review is slow, prone to errors, and lacks comprehensive risk detection.",
                },
                "Time Alerts for Obligation Management": {
                    implemented:
                        "Automated alerts ensure timely compliance with contract obligations, reducing disputes and financial penalties.",
                    notImplemented:
                        "Without alerts, obligations may be overlooked, increasing legal and operational risks.",
                },
            },
            Compliance: {
                "Automated Regulatory Tracking Tools": {
                    implemented:
                        "Real-time tracking of regulatory updates helps the team stay compliant with changing laws.",
                    notImplemented:
                        "Manual tracking increases the risk of non-compliance and legal repercussions.",
                },
                "Systematic Compliance Calendar": {
                    implemented:
                        "A structured compliance calendar centralizes regulatory deadlines, reducing missed filings.",
                    notImplemented:
                        "Without a compliance calendar, teams struggle to track obligations, leading to potential regulatory penalties.",
                },
                "Centralized Compliance Document Repository": {
                    implemented:
                        "A dedicated repository ensures compliance documents are organized and easily retrievable.",
                    notImplemented:
                        "Fragmented storage complicates audits and increases the risk of missing critical compliance records.",
                },
                "Workflow Automation for Compliance Processes": {
                    implemented:
                        "Automated workflows standardize compliance procedures, reducing manual errors and inefficiencies.",
                    notImplemented:
                        "Without automation, compliance tasks are inconsistent, increasing administrative burdens.",
                },
                "Compliance Analytics Dashboards": {
                    implemented:
                        "Real-time analytics provide insights into compliance trends and risks, enabling proactive decision-making.",
                    notImplemented:
                        "Limited visibility into compliance performance can lead to reactive risk management and higher penalties.",
                },
            },
            "Intellectual Property (IP) Management": {
                "Centralized IP Management System": {
                    implemented:
                        "A structured system ensures efficient tracking of patents, trademarks, and copyrights.",
                    notImplemented:
                        "Decentralized IP tracking increases the risk of missed filings and IP loss.",
                },
                "AI-Driven IP Infringement Monitoring": {
                    implemented:
                        "Automated monitoring detects potential infringements, allowing proactive protection of assets.",
                    notImplemented:
                        "Without AI monitoring, IP violations may go unnoticed, increasing legal risks.",
                },
                "Automated Alerts for Renewals & Filings": {
                    implemented:
                        "Renewal reminders prevent unintentional lapses in IP rights.",
                    notImplemented:
                        "Missed renewal deadlines may result in the loss of valuable intellectual property.",
                },
                "AI-Powered Prior Art Searches": {
                    implemented:
                        "AI accelerates patent research, improving the quality and efficiency of filings.",
                    notImplemented:
                        "Manual prior art searches are time-intensive and prone to oversight.",
                },
                "IP Risk Assessment Tools": {
                    implemented:
                        "Structured risk assessment tools enhance IP protection strategies and competitive analysis.",
                    notImplemented:
                        "Without assessment tools, IP risks may be underestimated, leading to weak enforcement.",
                },
            },
            "Internal Support": {
                "Centralized Legal Helpdesk or Portal": {
                    implemented:
                        "A legal helpdesk centralizes support requests, improving tracking and resolution times.",
                    notImplemented:
                        "Lack of a centralized system results in inefficient, scattered legal support requests.",
                },
                "Automated Intake & Triage Tools": {
                    implemented:
                        "Automation categorizes and prioritizes legal queries, ensuring efficient response management.",
                    notImplemented:
                        "Manual request handling delays responses and increases routing errors.",
                },
                "AI-Assisted Chatbots for FAQs": {
                    implemented:
                        "Chatbots provide instant responses, reducing repetitive queries for legal teams.",
                    notImplemented:
                        "Without AI chatbots, employees rely on manual interactions, consuming valuable legal resources.",
                },
                "Integrated Communication Platforms": {
                    implemented:
                        "Seamless communication enhances collaboration across legal and business teams.",
                    notImplemented:
                        "Fragmented communication channels lead to delays and misalignment between teams.",
                },
                "Department-Specific Legal Data Rooms": {
                    implemented:
                        "Secure data rooms ensure controlled access to sensitive legal documents.",
                    notImplemented:
                        "Lack of structured data rooms increases security risks and complicates information sharing.",
                },
            },
            "Litigation Management": {
                "Centralized Matter Management System": {
                    implemented:
                        "Litigation cases are well-organized, enabling efficient tracking and document retrieval.",
                    notImplemented:
                        "Lack of a centralized system complicates case tracking and increases risks of disorganization.",
                },
                "Automated Litigation Tracking Workflows": {
                    implemented:
                        "Automated workflows enhance case progress tracking and prevent missed deadlines.",
                    notImplemented:
                        "Manual litigation tracking leads to delays and administrative inefficiencies.",
                },
                "AI-Driven Predictive Analysis for Case Outcomes": {
                    implemented:
                        "Data-driven insights improve case strategy and risk evaluation.",
                    notImplemented:
                        "Without predictive analysis, legal teams rely solely on experience, missing key risk factors.",
                },
                "Structured Checklists for Evidence Authentication": {
                    implemented:
                        "Evidence management is systematic, reducing procedural errors and inconsistencies.",
                    notImplemented:
                        "Without checklists, evidence handling becomes prone to oversight and mismanagement.",
                },
                "Access to Legal Research Databases": {
                    implemented:
                        "Quick access to legal research strengthens case arguments and preparation.",
                    notImplemented:
                        "Without legal research tools, case preparation is slower and less comprehensive.",
                },
            },
            "Client & Matter Management": {
                "Centralized Matter Management System": {
                    implemented:
                        "All client matters are systematically tracked, improving workflow efficiency and organization.",
                    notImplemented:
                        "Lack of a centralized system leads to fragmented client management and potential service delays.",
                },
                "Client Intake and Onboarding Automation": {
                    implemented:
                        "New clients are onboarded smoothly with minimal manual intervention, ensuring consistency.",
                    notImplemented:
                        "Manual onboarding creates inconsistencies, increasing processing time and administrative burden.",
                },
                "Conflict-Checking Software": {
                    implemented:
                        "Potential conflicts of interest are quickly identified, reducing ethical and legal risks.",
                    notImplemented:
                        "Manual conflict checks are slow and error-prone, increasing regulatory non-compliance risks.",
                },
                "Integrated Client Communication Logs": {
                    implemented:
                        "All client interactions are recorded centrally, enhancing transparency and accessibility.",
                    notImplemented:
                        "Scattered communication records make it harder to track interactions, leading to inefficiencies.",
                },
                "AI-Powered Client Risk Assessment": {
                    implemented:
                        "AI provides advanced risk profiling, helping firms make data-driven client decisions.",
                    notImplemented:
                        "Risk evaluations remain subjective, increasing exposure to unexpected legal and financial risks.",
                },
            },
            "Document & Knowledge Management": {
                "Centralized Document Management System": {
                    implemented:
                        "Legal documents are securely stored and easily searchable, reducing retrieval time.",
                    notImplemented:
                        "Decentralized document storage leads to inefficiencies and security risks.",
                },
                "Version Control for Document Tracking": {
                    implemented:
                        "Version control ensures accuracy and prevents confusion over document updates.",
                    notImplemented:
                        "Without version control, tracking document revisions becomes difficult and error-prone.",
                },
                "AI-Assisted Document Automation": {
                    implemented:
                        "Automated drafting reduces manual effort and ensures document consistency.",
                    notImplemented:
                        "Manual document drafting is time-consuming and prone to human errors.",
                },
                "Firm-Wide Knowledge Repository": {
                    implemented:
                        "A structured repository preserves institutional knowledge and improves collaboration.",
                    notImplemented:
                        "Without a knowledge repository, critical legal insights may be lost or underutilized.",
                },
                "AI-Powered Document Review": {
                    implemented:
                        "AI speeds up document review and enhances accuracy in identifying key risks.",
                    notImplemented:
                        "Manual review processes take longer and may overlook crucial details.",
                },
            },
            "Billing & Finance": {
                "Automated Time Tracking & Billing System": {
                    implemented:
                        "Accurate billing and time tracking reduce revenue leakage and improve transparency.",
                    notImplemented:
                        "Manual tracking is prone to errors, causing billing disputes and inefficiencies.",
                },
                "Support for Multiple Billing Models": {
                    implemented:
                        "Flexible billing structures cater to diverse client needs, improving financial efficiency.",
                    notImplemented:
                        "Rigid billing models limit the firm's ability to accommodate varied client preferences.",
                },
                "E-Billing System for Client Invoicing": {
                    implemented:
                        "Digital invoicing speeds up payment collection and enhances financial transparency.",
                    notImplemented:
                        "Manual invoicing increases administrative workload and delays payment processing.",
                },
                "AI-Powered Financial Forecasting": {
                    implemented:
                        "Predictive analytics provide data-driven insights into revenue and expense management.",
                    notImplemented:
                        "Financial forecasting is manual and lacks accuracy, leading to planning inefficiencies.",
                },
                "Automated Alerts for Unpaid Invoices": {
                    implemented:
                        "Late payments are flagged automatically, ensuring timely follow-ups and improved cash flow.",
                    notImplemented:
                        "Without alerts, overdue invoices are harder to track, increasing financial risks.",
                },
            },
            "Litigation & Case Strategy": {
                "AI-Driven Legal Research Tools": {
                    implemented:
                        "Legal research is faster and more comprehensive with AI-assisted case law analysis.",
                    notImplemented:
                        "Manual research is slow, increasing the risk of missing critical precedents.",
                },
                "Litigation Analytics for Judge/Opposing Counsel Tendencies": {
                    implemented:
                        "Data-driven insights provide strategic advantages in litigation planning.",
                    notImplemented:
                        "Without analytics, case strategy is based on subjective judgment alone.",
                },
                "Structured Workflows for Evidence Collection": {
                    implemented:
                        "A structured approach improves evidence authentication and case preparation.",
                    notImplemented:
                        "Unstructured evidence handling can lead to inconsistencies and missing documents.",
                },
                "Predictive Analytics for Case Outcomes": {
                    implemented:
                        "AI helps assess case strengths, weaknesses, and potential outcomes.",
                    notImplemented:
                        "Case decisions rely solely on past experiences, missing predictive insights.",
                },
                "Automated Calendaring for Court Deadlines": {
                    implemented:
                        "Automated deadline tracking prevents missed court dates and procedural delays.",
                    notImplemented:
                        "Manual deadline tracking increases the risk of missed filings and penalties.",
                },
            },
            "Practice Development & Automation": {
                "Client Relationship Management (CRM) Tools": {
                    implemented:
                        "CRM systems provide structured tracking of client interactions and relationships.",
                    notImplemented:
                        "Without CRM, client management is less organized, leading to inefficiencies in service.",
                },
                "Marketing Automation for Firm Outreach": {
                    implemented:
                        "Marketing automation enhances client engagement and lead management.",
                    notImplemented:
                        "Manual marketing processes are less targeted and require more effort.",
                },
                "Chatbots or Automated Client Assistants": {
                    implemented:
                        "AI-driven chatbots provide instant responses, improving client satisfaction.",
                    notImplemented:
                        "Without chatbots, client inquiries take longer to process and resolve.",
                },
                "Legal Workflow Automation": {
                    implemented:
                        "Automation streamlines routine legal processes, improving productivity.",
                    notImplemented:
                        "Manual workflows increase inefficiencies and create inconsistencies.",
                },
                "Performance Tracking & Analytics Dashboards": {
                    implemented:
                        "Real-time performance insights enhance decision-making and firm growth.",
                    notImplemented:
                        "Without analytics, tracking performance and strategic planning is less effective.",
                },
            },
        };

        return observations[category] || {};
    };

    // This is the updated function to generate a more visually appealing PDF report
// Replace your existing generateReport function with this one

const generateReport = () => {
    const categoryScores = Object.entries(answers).map(
        ([questionIndex, selectedOptions]) =>
            calculateCategoryScores(
                parseInt(questionIndex),
                selectedOptions
            )
    );

    const finalScores = calculateFinalScores();
    
    // Create new jsPDF instance with better quality settings
    const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
    });
    
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 20;
    const contentWidth = pageWidth - 2 * margin;
    
    // Helper functions for enhanced visuals
    const addMultiLineText = (text, x, y, maxWidth, fontSize = 10, align = "left") => {
        doc.setFontSize(fontSize);
        const lines = doc.splitTextToSize(text, maxWidth);
        doc.text(lines, x, y, { align: align });
        return y + lines.length * (fontSize * 0.352); // Approximate line height
    };

    const addSectionHeader = (text, y) => {
        // Header with colored background
        doc.setFillColor(235, 237, 244);
        doc.rect(margin, y - 5, contentWidth, 10, "F");
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.setTextColor(29, 36, 86); // Dark blue text
        doc.text(text, margin + 2, y + 2);
        return y + 12;
    };
    
    const drawCircularProgress = (x, y, radius, percentage, color) => {
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
        doc.setFontSize(12);
        doc.setTextColor(29, 36, 86);
        doc.text(`${Math.round(percentage)}%`, x, y + 4, { align: 'center' });
    };
    
    const drawProgressBar = (x, y, width, percentage, color, label) => {
        // Draw background bar
        doc.setFillColor(235, 237, 244);
        doc.roundedRect(x, y, width, 8, 4, 4, 'F');
        
        // Draw progress bar
        doc.setFillColor(color);
        const progressWidth = (width * percentage) / 100;
        if (progressWidth > 0) {
            doc.roundedRect(x, y, progressWidth, 8, 4, 4, 'F');
        }
        
        // Add label and percentage
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(80, 80, 80);
        doc.text(label, x, y - 3);
        
        doc.setFont("helvetica", "bold");
        doc.text(`${percentage.toFixed(2)}%`, x + width + 5, y + 5);
    };
    
    // Add header with logo and background color
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
    doc.setTextColor(0);
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text(
        `${firmType === "legal-department" ? "Legal Department" : "Law Firm"}`,
        margin,
        yPos
    );
    
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text(
        `Team size: ${Object.keys(answers).length > 2 ? "11-50" : "1-10"}`,
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
        pageWidth / 4, 
        yPos + 35, 
        25, 
        parseFloat(finalScores.totalScore), 
        "#4CC1E0" // Teal blue
    );
    
    // Add horizontal progress bars for sub-scores
    drawProgressBar(
        pageWidth / 2, 
        yPos + 25, 
        pageWidth / 3, 
        parseFloat(finalScores.efficiencyScore), 
        "#4CC1E0", // Teal blue
        "Efficiency Score"
    );
    
    drawProgressBar(
        pageWidth / 2, 
        yPos + 45, 
        pageWidth / 3, 
        parseFloat(finalScores.technologyScore), 
        "#4CC1E0", // Teal blue
        "Technology Score"
    );
    
    // Add assessment text
    yPos += 75;
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    const assessmentText = getScoreComment(parseFloat(finalScores.totalScore));
    yPos = addMultiLineText(assessmentText, margin, yPos, contentWidth, 12);
    
    // Add category scores line chart
    yPos += 15;
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Legal operations category scores", margin, yPos);
    
    yPos += 10;
    // Draw line chart axes
    doc.setDrawColor(180, 180, 180);
    doc.line(margin, yPos + 70, margin + contentWidth, yPos + 70); // X-axis
    doc.line(margin, yPos, margin, yPos + 70); // Y-axis
    
    // Draw horizontal grid lines
    doc.setDrawColor(220, 220, 220);
    for (let i = 1; i <= 4; i++) {
        const gridY = yPos + 70 - (i * 70 / 5);
        doc.line(margin, gridY, margin + contentWidth, gridY);
        doc.setFontSize(9);
        doc.setTextColor(100, 100, 100);
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
    doc.setFillColor(76, 193, 224); // Teal blue
    dataPoints.forEach((point, index) => {
        doc.circle(point.x, point.y, 3, 'F');
        
        // Add category labels below x-axis
        doc.setFontSize(8);
        doc.setTextColor(80, 80, 80);
        doc.text(`Item ${index + 1}`, point.x, yPos + 80, { align: 'center' });
    });
    
    // Add category details pages
    categoryScores.forEach((score, index) => {
        // Add new page for each category
        doc.addPage();
        
        // Reset position for new page
        yPos = 45;
        
        // Add header
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
        
        // Category name
        doc.setTextColor(0);
        doc.setFontSize(18);
        doc.setFont("helvetica", "bold");
        doc.text(score.category, margin, yPos + 20);
        
        // Draw category score visualization
        drawCircularProgress(
            margin + 35, 
            yPos + 55, 
            20, 
            score.techScore, 
            "#4CC1E0" // Teal blue
        );
        
        // Add score bars
        drawProgressBar(
            margin + 70, 
            yPos + 45, 
            pageWidth / 3, 
            score.techScore, 
            "#4CC1E0", // Teal blue
            "Technology Score"
        );
        
        drawProgressBar(
            margin + 70, 
            yPos + 65, 
            pageWidth / 3, 
            score.efficiencyScore, 
            "#4CC1E0", // Teal blue
            "Efficiency Score"
        );
        
        // Get question and answers for this category
        const question = questions[index];
        const selectedOptions = answers[index] || [];
        const implemented = selectedOptions.map(
            (idx) => question.options[idx].text
        );
        const notImplemented = question.options
            .filter((_, idx) => !selectedOptions.includes(idx))
            .map((opt) => opt.text);
            
        const observations = getCategoryObservations(
            question.category,
            implemented,
            notImplemented
        );
        
        // Add implemented features
        yPos += 90;
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(76, 175, 80); // Green color
        doc.text("Strengths", margin, yPos);
        
        yPos += 10;
        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(0);
        
        implemented.forEach((feature) => {
            yPos = addMultiLineText(
                feature,
                margin,
                yPos,
                contentWidth,
                11
            );
            yPos += 5;
        });
        
        // Add not implemented features
        yPos += 10;
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(244, 67, 54); // Red color
        doc.text("Weakness", margin, yPos);
        
        yPos += 10;
        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(0);
        
        notImplemented.forEach((feature) => {
            yPos = addMultiLineText(
                feature,
                margin,
                yPos,
                contentWidth,
                11
            );
            yPos += 5;
        });
    });
    
    // Add final page with recommendations
    doc.addPage();
    
    // Reset position for new page
    yPos = 45;
    
    // Add header
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
    
    // Add final recommendations
    doc.setTextColor(0);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Conclusive remark", margin, yPos + 20);
    
    yPos += 35;
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Observation:", margin, yPos);
    
    yPos += 7;
    doc.setFont("helvetica", "normal");
    yPos = addMultiLineText(
        getScoreComment(parseFloat(finalScores.totalScore)),
        margin,
        yPos,
        contentWidth,
        11
    );
    
    yPos += 15;
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(76, 175, 80); // Green color
    doc.text("✅ Next Steps:", margin, yPos);
    
    doc.setTextColor(0);
    doc.setFont("helvetica", "normal");
    yPos += 10;
    
    const recommendations = [
        "Stay ahead by exploring cutting-edge advancements in AI, blockchain, or predictive analytics.",
        "Benchmark performance against industry leaders to maintain a competitive edge.",
        "Invest in continuous training to keep the team proficient with evolving technology."
    ];
    
    recommendations.forEach(rec => {
        yPos = addMultiLineText(rec, margin, yPos, contentWidth, 11);
        yPos += 7;
    });
    
    yPos += 10;
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 152, 0); // Orange/amber color
    doc.text("⚠ Caution:", margin, yPos);
    
    doc.setTextColor(0);
    doc.setFont("helvetica", "normal");
    yPos += 10;
    
    const cautions = [
        "Complacency can lead to stagnation—innovation should be a continuous effort.",
        "Regularly reassess your tech stack to ensure it remains the best fit for evolving needs."
    ];
    
    cautions.forEach(caution => {
        yPos = addMultiLineText(caution, margin, yPos, contentWidth, 11);
        yPos += 7;
    });
    
    // Add footer to every page
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        
        // Footer with logo placeholder and company name
        doc.setFillColor(245, 245, 245);
        doc.rect(0, pageHeight - 15, pageWidth, 15, 'F');
        
        doc.setFontSize(10);
        doc.setTextColor(80, 80, 80);
        doc.text("DreamLegal | Driving digital transformation for legal teams", margin, pageHeight - 5);
        
        // Add logo placeholder
        doc.setFillColor(29, 36, 86); // Dark blue
        doc.rect(pageWidth - margin - 10, pageHeight - 12, 10, 10, 'F');
    }
    
    // Save the PDF
    doc.save("legal-assessment-report.pdf");
};

    const calculateProgress = () => {
        if (!firmType) return 0;
        return ((currentQuestion + 1) / questions.length) * 100;
    };

    return (
        <div className="max-w-4xl mx-auto">
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
                    ) : (
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
                        </>
                    )}
                </CardHeader>

                <CardContent className="px-6">
                    {!firmType ? null : !isComplete ? (
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
                </CardContent>

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
