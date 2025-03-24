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


    
    // const generateReport = async () => {
    //     try {
    //         const categoryScores = Object.entries(answers).map(
    //             ([questionIndex, selectedOptions]) =>
    //                 calculateCategoryScores(
    //                     parseInt(questionIndex),
    //                     selectedOptions
    //                 )
    //         );
    
    //         const finalScores = calculateFinalScores();
            
    //         // Create a new PDF document
    //         const pdfDoc = await PDFDocument.create();
            
    //         // Embed fonts
    //         const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    //         const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
            
    //         // Define constants
    //         const pageWidth = 595.28;  // A4 width in points
    //         const pageHeight = 841.89; // A4 height in points
    //         const margin = 50;         // margin in points
    //         const contentWidth = pageWidth - 2 * margin;
            
    //         // Helper function to get color based on score
    //         const getScoreColor = (percentage) => {
    //             if (percentage <= 20) return rgb(1, 0.32, 0.32); // Red
    //             if (percentage <= 40) return rgb(1, 0.6, 0); // Orange
    //             if (percentage <= 60) return rgb(1, 0.76, 0.03); // Yellow
    //             if (percentage <= 80) return rgb(0.55, 0.76, 0.29); // Light green
    //             return rgb(0.3, 0.69, 0.31); // Green
    //         };
            
    //         // Helper function to add text with proper word wrapping
    //         const addMultiLineText = (page, text, x, y, { maxWidth, font, fontSize, color, lineHeight = 1.2 }) => {
    //             const words = text.split(' ');
    //             let line = '';
    //             let yPos = y;
                
    //             for (let i = 0; i < words.length; i++) {
    //                 const testLine = line + words[i] + ' ';
    //                 const width = font.widthOfTextAtSize(testLine, fontSize);
                    
    //                 if (width > maxWidth && i > 0) {
    //                     page.drawText(line, {
    //                         x,
    //                         y: yPos,
    //                         size: fontSize,
    //                         font,
    //                         color
    //                     });
    //                     line = words[i] + ' ';
    //                     yPos -= fontSize * lineHeight;
    //                 } else {
    //                     line = testLine;
    //                 }
    //             }
                
    //             page.drawText(line, {
    //                 x,
    //                 y: yPos,
    //                 size: fontSize,
    //                 font,
    //                 color
    //             });
                
    //             return yPos - fontSize * lineHeight;
    //         };
            
    //         // Helper to add heading with underline
    //         const addHeadingWithUnderline = (page, text, x, y, { fontSize, font, color, underlineColor }) => {
    //             // Draw the heading
    //             page.drawText(text, {
    //                 x,
    //                 y,
    //                 size: fontSize,
    //                 font,
    //                 color
    //             });
                
    //             // Draw the underline
    //             const textWidth = font.widthOfTextAtSize(text, fontSize);
    //             page.drawLine({
    //                 start: { x, y: y - 2 },
    //                 end: { x: x + textWidth, y: y - 2 },
    //                 thickness: 1,
    //                 color: underlineColor || color
    //             });
                
    //             return y - fontSize - 5;
    //         };
            
    //         // Helper to draw a circle
    //         const drawCircle = (page, centerX, centerY, radius, options) => {
    //             const { color, fill = true } = options;
                
    //             // Draw filled rectangle (PDF-lib doesn't have built-in circle)
    //             if (fill) {
    //                 // We can approximate a circle with a very short line that moves in a circular path
    //                 // Set up small segments to make it look like a circle
    //                 const segments = 36; // Number of segments to draw
    //                 const step = (2 * Math.PI) / segments;
                    
    //                 for (let i = 0; i < segments; i++) {
    //                     const angle1 = i * step;
    //                     const angle2 = (i + 1) * step;
                        
    //                     const x1 = centerX + radius * Math.cos(angle1);
    //                     const y1 = centerY + radius * Math.sin(angle1);
    //                     const x2 = centerX + radius * Math.cos(angle2);
    //                     const y2 = centerY + radius * Math.sin(angle2);
                        
    //                     // Create a triangle for each segment (center + two points on edge)
    //                     page.moveTo(centerX, centerY);
    //                     page.lineTo(x1, y1);
    //                     page.lineTo(x2, y2);
    //                     page.closePath();
    //                     page.setFillColor(color);
    //                     page.fill();
    //                 }
    //             } else {
    //                 // Draw outline
    //                 const segments = 36;
    //                 const step = (2 * Math.PI) / segments;
                    
    //                 // Start at first point
    //                 let startX = centerX + radius;
    //                 let startY = centerY;
    //                 page.moveTo(startX, startY);
                    
    //                 // Draw segments around
    //                 for (let i = 1; i <= segments; i++) {
    //                     const angle = i * step;
    //                     const x = centerX + radius * Math.cos(angle);
    //                     const y = centerY + radius * Math.sin(angle);
    //                     page.lineTo(x, y);
    //                 }
                    
    //                 page.setStrokeColor(color);
    //                 page.setLineWidth(1);
    //                 page.stroke();
    //             }
    //         };
            
    //         // Helper to draw a pie chart (circular progress)
    //         const drawCircularProgress = (page, x, y, radius, percentage, label) => {
    //             const color = getScoreColor(percentage);
                
    //             // Draw shadow for 3D effect
    //             drawCircle(page, x + 1.5, y - 1.5, radius, { color: rgb(0.85, 0.85, 0.85) });
                
    //             // Draw background circle (light gray)
    //             drawCircle(page, x, y, radius, { color: rgb(0.94, 0.94, 0.94) });
                
    //             // Draw progress arc
    //             if (percentage > 0) {
    //                 const segments = Math.ceil(36 * (percentage / 100)); // Only draw needed segments
    //                 const step = (2 * Math.PI) / 36;
                    
    //                 // Starting at -90 degrees (top)
    //                 const startAngleDeg = -90;
    //                 const startAngle = (startAngleDeg * Math.PI) / 180;
                    
    //                 for (let i = 0; i < segments; i++) {
    //                     const angle1 = startAngle + i * step;
    //                     const angle2 = startAngle + (i + 1) * step;
                        
    //                     const x1 = x + radius * Math.cos(angle1);
    //                     const y1 = y + radius * Math.sin(angle1);
    //                     const x2 = x + radius * Math.cos(angle2);
    //                     const y2 = y + radius * Math.sin(angle2);
                        
    //                     // Create a triangle for each segment (center + two points on edge)
    //                     page.moveTo(x, y);
    //                     page.lineTo(x1, y1);
    //                     page.lineTo(x2, y2);
    //                     page.closePath();
    //                     page.setFillColor(color);
    //                     page.fill();
    //                 }
    //             }
                
    //             // Draw inner white circle for donut effect
    //             const innerRadius = radius * 0.65;
    //             drawCircle(page, x, y, innerRadius, { color: rgb(1, 1, 1) });
                
    //             // Add percentage text in the center
    //             const percentText = `${Math.round(percentage)}%`;
    //             const textWidth = helveticaBold.widthOfTextAtSize(percentText, 16);
    //             page.drawText(percentText, {
    //                 x: x - textWidth / 2,
    //                 y: y - 8,
    //                 size: 16,
    //                 font: helveticaBold,
    //                 color: rgb(0.11, 0.14, 0.33)
    //             });
                
    //             // Add label if provided
    //             if (label) {
    //                 const lines = label.split('\\n');
    //                 let labelY = y - radius - 15;
                    
    //                 lines.forEach(line => {
    //                     const labelWidth = helvetica.widthOfTextAtSize(line, 12);
    //                     page.drawText(line, {
    //                         x: x - labelWidth / 2,
    //                         y: labelY,
    //                         size: 12,
    //                         font: helvetica,
    //                         color: rgb(0.11, 0.14, 0.33)
    //                     });
    //                     labelY -= 14;
    //                 });
    //             }
    //         };
            
    //         // Helper to draw a progress bar
    //         const drawProgressBar = (page, x, y, width, percentage, label) => {
    //             const color = getScoreColor(percentage);
    //             const barHeight = 8;
                
    //             // Draw shadow for 3D effect - using rectangle instead of roundedRect
    //             page.drawRectangle({
    //                 x: x + 1,
    //                 y: y - 1 - barHeight,
    //                 width,
    //                 height: barHeight,
    //                 color: rgb(0.85, 0.85, 0.85)
    //             });
                
    //             // Draw background bar
    //             page.drawRectangle({
    //                 x,
    //                 y: y - barHeight,
    //                 width,
    //                 height: barHeight,
    //                 color: rgb(0.94, 0.94, 0.94)
    //             });
                
    //             // Draw progress bar
    //             const progressWidth = (width * percentage) / 100;
    //             if (progressWidth > 0) {
    //                 page.drawRectangle({
    //                     x,
    //                     y: y - barHeight,
    //                     width: progressWidth,
    //                     height: barHeight,
    //                     color
    //                 });
    //             }
                
    //             // Add label
    //             page.drawText(label, {
    //                 x,
    //                 y: y + 3,
    //                 size: 10,
    //                 font: helvetica,
    //                 color: rgb(0.3, 0.3, 0.3)
    //             });
                
    //             // Add percentage
    //             const percentText = `${percentage.toFixed(1)}%`;
    //             page.drawText(percentText, {
    //                 x: x + width + 5,
    //                 y: y - 5,
    //                 size: 10,
    //                 font: helveticaBold,
    //                 color: rgb(0.11, 0.14, 0.33)
    //             });
    //         };
            
    //         // Helper to add a bullet point
    //         const addBulletPoint = (page, text, x, y, { maxWidth, font, fontSize, bulletType }) => {
    //             // Draw bullet (using standard characters compatible with WinAnsi encoding)
    //             page.drawText(bulletType, {
    //                 x,
    //                 y,
    //                 size: fontSize,
    //                 font: helveticaBold,
    //                 color: rgb(0.11, 0.14, 0.33)
    //             });
                
    //             // Calculate bullet width
    //             const bulletWidth = helveticaBold.widthOfTextAtSize(bulletType + ' ', fontSize);
                
    //             // Draw text with proper wrapping
    //             return addMultiLineText(page, text, x + bulletWidth, y, { 
    //                 maxWidth: maxWidth - bulletWidth, 
    //                 font, 
    //                 fontSize, 
    //                 color: rgb(0.2, 0.2, 0.2),
    //                 lineHeight: 1.2
    //             });
    //         };
            
    //         // Helper function to add watermark
    //         const addWatermark = (page) => {
    //             const text = "DreamLegal";
    //             const textWidth = helveticaBold.widthOfTextAtSize(text, 60);
    //             const textHeight = 60;
                
    //             // Calculate diagonal position
    //             const rotationAngle = 45;
    //             const radians = (rotationAngle * Math.PI) / 180;
                
    //             // Position watermark in center
    //             page.drawText(text, {
    //                 x: pageWidth / 2 - textWidth / 2,
    //                 y: pageHeight / 2,
    //                 size: 60,
    //                 font: helveticaBold,
    //                 color: rgb(0.9, 0.9, 0.9),
    //                 rotate: degrees(rotationAngle)
    //             });
    //         };
            
    //         // Helper function to add page border, footer and page number
    //         const addPageDecoration = (page, pageNumber, totalPages) => {
    //             // Add border
    //             page.drawRectangle({
    //                 x: margin - 15,
    //                 y: margin - 15,
    //                 width: pageWidth - 2 * (margin - 15),
    //                 height: pageHeight - 2 * (margin - 15),
    //                 borderColor: rgb(0.11, 0.14, 0.33),
    //                 borderWidth: 1,
    //                 color: rgb(1, 1, 1),
    //                 opacity: 0
    //             });
                
    //             // Add footer text
    //             page.drawText("DreamLegal | Driving digital transformation for legal teams", {
    //                 x: margin,
    //                 y: 30,
    //                 size: 9,
    //                 font: helvetica,
    //                 color: rgb(0.3, 0.3, 0.3)
    //             });
                
    //             // Add page number
    //             page.drawText(`Page ${pageNumber} of ${totalPages}`, {
    //                 x: pageWidth - margin - 50,
    //                 y: 30,
    //                 size: 9,
    //                 font: helvetica,
    //                 color: rgb(0.4, 0.4, 0.4)
    //             });
                
    //             // Add logo placeholder
    //             page.drawRectangle({
    //                 x: pageWidth - margin + 2,
    //                 y: 25,
    //                 width: 8,
    //                 height: 8,
    //                 color: rgb(0.11, 0.14, 0.33)
    //             });
    //         };
            
    //         // Create cover page
    //         const coverPage = pdfDoc.addPage([pageWidth, pageHeight]);
            
    //         // Add blue header background
    //         coverPage.drawRectangle({
    //             x: 0,
    //             y: pageHeight - 45,
    //             width: pageWidth,
    //             height: 45,
    //             color: rgb(0.11, 0.14, 0.33)
    //         });
            
    //         // Add title text
    //         coverPage.drawText("LEGAL TEAM MATURITY AND", {
    //             x: pageWidth / 2 - 170,
    //             y: pageHeight - 20,
    //             size: 22,
    //             font: helveticaBold,
    //             color: rgb(1, 1, 1)
    //         });
            
    //         coverPage.drawText("DIGITAL READINESS REPORT", {
    //             x: pageWidth / 2 - 170,
    //             y: pageHeight - 40,
    //             size: 22,
    //             font: helveticaBold,
    //             color: rgb(1, 1, 1)
    //         });
            
    //         // Add subtitle
    //         coverPage.drawText("Assessing Efficiency, Technology Adoption, and Future-Readiness of Legal Teams", {
    //             x: pageWidth / 2 - 240,
    //             y: pageHeight - 60,
    //             size: 12,
    //             font: helvetica,
    //             color: rgb(1, 1, 1)
    //         });
            
    //         // Add organization details
    //         let yPos = pageHeight - 100;
            
    //         coverPage.drawText(`${firmType === "legal-department" ? "Legal Department" : "Law Firm"}`, {
    //             x: margin,
    //             y: yPos,
    //             size: 20,
    //             font: helveticaBold,
    //             color: rgb(0.11, 0.14, 0.33)
    //         });
            
    //         coverPage.drawText(`Team size: ${teamSize}`, {
    //             x: margin,
    //             y: yPos - 20,
    //             size: 14,
    //             font: helvetica,
    //             color: rgb(0.11, 0.14, 0.33)
    //         });
            
    //         coverPage.drawText(`Generated on: ${new Date().toLocaleDateString()}`, {
    //             x: pageWidth - margin - 150,
    //             y: yPos,
    //             size: 12,
    //             font: helvetica,
    //             color: rgb(0.11, 0.14, 0.33)
    //         });
            
    //         // Add overall score visualization
    //         yPos -= 60;
            
    //         // Draw overall score circle
    //         drawCircularProgress(
    //             coverPage,
    //             margin + 45,
    //             yPos - 35,
    //             25,
    //             parseFloat(finalScores.totalScore),
    //             "Overall Maturity Score\\nBased on all categories"
    //         );
            
    //         // Draw score bars
    //         drawProgressBar(
    //             coverPage,
    //             margin + 100,
    //             yPos - 25,
    //             pageWidth / 2.5,
    //             parseFloat(finalScores.efficiencyScore),
    //             "Efficiency Score"
    //         );
            
    //         drawProgressBar(
    //             coverPage,
    //             margin + 100,
    //             yPos - 45,
    //             pageWidth / 2.5,
    //             parseFloat(finalScores.technologyScore),
    //             "Technology Score"
    //         );
            
    //         // Add assessment summary
    //         yPos -= 70;
    //         coverPage.drawText("Assessment Summary:", {
    //             x: margin,
    //             y: yPos,
    //             size: 13,
    //             font: helveticaBold,
    //             color: rgb(0.11, 0.14, 0.33)
    //         });
            
    //         yPos -= 15;
    //         yPos = addMultiLineText(coverPage, getScoreComment(parseFloat(finalScores.totalScore)), margin, yPos, {
    //             maxWidth: contentWidth,
    //             font: helvetica,
    //             fontSize: 12,
    //             color: rgb(0.2, 0.2, 0.2),
    //             lineHeight: 1.2
    //         });
            
    //         // Add category scores heading
    //         yPos -= 20;
    //         yPos = addHeadingWithUnderline(coverPage, "Legal operations category scores", margin, yPos, {
    //             fontSize: 16,
    //             font: helveticaBold,
    //             color: rgb(0.11, 0.14, 0.33),
    //             underlineColor: rgb(0.11, 0.14, 0.33)
    //         });
            
    //         // Add horizontal line above heading (cyan)
    //         coverPage.drawLine({
    //             start: { x: margin, y: yPos + 25 },
    //             end: { x: pageWidth - margin, y: yPos + 25 },
    //             thickness: 1,
    //             color: rgb(0.3, 0.76, 0.88)
    //         });
            
    //         // Draw category scores chart
    //         yPos -= 10;
    //         const chartHeight = 60;
    //         const chartWidth = contentWidth;
            
    //         // Draw Y-axis
    //         coverPage.drawLine({
    //             start: { x: margin, y: yPos },
    //             end: { x: margin, y: yPos - chartHeight },
    //             thickness: 0.5,
    //             color: rgb(0.7, 0.7, 0.7)
    //         });
            
    //         // Draw X-axis
    //         coverPage.drawLine({
    //             start: { x: margin, y: yPos - chartHeight },
    //             end: { x: margin + chartWidth, y: yPos - chartHeight },
    //             thickness: 0.5,
    //             color: rgb(0.7, 0.7, 0.7)
    //         });
            
    //         // Draw grid lines and labels
    //         for (let i = 1; i <= 5; i++) {
    //             const gridY = yPos - chartHeight + (i * chartHeight / 5);
                
    //             // Draw horizontal grid line
    //             coverPage.drawLine({
    //                 start: { x: margin, y: gridY },
    //                 end: { x: margin + chartWidth, y: gridY },
    //                 thickness: 0.3,
    //                 color: rgb(0.85, 0.85, 0.85)
    //             });
                
    //             // Add percentage label
    //             const percent = (i * 20).toString() + '%';
    //             const labelWidth = helvetica.widthOfTextAtSize(percent, 8);
    //             coverPage.drawText(percent, {
    //                 x: margin - labelWidth - 3,
    //                 y: gridY - 3,
    //                 size: 8,
    //                 font: helvetica,
    //                 color: rgb(0.5, 0.5, 0.5)
    //             });
    //         }
            
    //         // Draw data points and connecting lines
    //         const categoryScoreValues = categoryScores.map(score => (score.techScore + score.efficiencyScore) / 2);
    //         const xStep = chartWidth / (categoryScoreValues.length + 1);
    //         const points = categoryScoreValues.map((value, index) => {
    //             const x = margin + (index + 1) * xStep;
    //             const y = yPos - chartHeight + (value * chartHeight / 100);
    //             return { x, y, value };
    //         });
            
    //         // Draw connecting lines
    //         for (let i = 0; i < points.length - 1; i++) {
    //             coverPage.drawLine({
    //                 start: { x: points[i].x, y: points[i].y },
    //                 end: { x: points[i + 1].x, y: points[i + 1].y },
    //                 thickness: 1,
    //                 color: rgb(0.3, 0.76, 0.88)
    //             });
    //         }
            
    //         // Draw data points
    //         points.forEach((point, index) => {
    //             // Draw point circle
    //             drawCircle(coverPage, point.x, point.y, 3.5, { color: rgb(0.2, 0.2, 0.2) });
                
    //             // Draw outline
    //             drawCircle(coverPage, point.x, point.y, 4.5, { color: rgb(0.3, 0.76, 0.88), fill: false });
                
    //             // Add category labels
    //             coverPage.drawText(`Item ${index + 1}`, {
    //                 x: point.x - 15,
    //                 y: yPos - chartHeight - 15,
    //                 size: 9,
    //                 font: helvetica,
    //                 color: rgb(0.3, 0.3, 0.3)
    //             });
    //         });
            
    //         // Group categories in pairs for the detail pages (2 per page)
    //         const categoryPairs = [];
    //         for (let i = 0; i < categoryScores.length; i += 2) {
    //             if (i + 1 < categoryScores.length) {
    //                 categoryPairs.push([categoryScores[i], categoryScores[i + 1]]);
    //             } else {
    //                 categoryPairs.push([categoryScores[i]]);
    //             }
    //         }
            
    //         // Add detail pages
    //         categoryPairs.forEach((pair) => {
    //             const detailPage = pdfDoc.addPage([pageWidth, pageHeight]);
                
    //             pair.forEach((score, index) => {
    //                 // Calculate vertical position based on whether this is the first or second category on the page
    //                 const startY = index === 0 ? pageHeight - 50 : pageHeight / 2;
    //                 yPos = startY;
                    
    //                 // Get question and answers for this category
    //                 const questionIndex = categoryScores.findIndex(cs => cs.category === score.category);
    //                 const question = questions[questionIndex];
    //                 const selectedOptions = answers[questionIndex] || [];
    //                 const implemented = selectedOptions.map(
    //                     (idx) => question.options[idx].text
    //                 );
    //                 const notImplemented = question.options
    //                     .filter((_, idx) => !selectedOptions.includes(idx))
    //                     .map((opt) => opt.text);
                    
    //                 // Add horizontal cyan line
    //                 detailPage.drawLine({
    //                     start: { x: margin, y: yPos + 5 },
    //                     end: { x: pageWidth - margin, y: yPos + 5 },
    //                     thickness: 1,
    //                     color: rgb(0.3, 0.76, 0.88)
    //                 });
                    
    //                 // Category name with underline
    //                 yPos = addHeadingWithUnderline(detailPage, score.category, margin, yPos, {
    //                     fontSize: 18,
    //                     font: helveticaBold,
    //                     color: rgb(0.11, 0.14, 0.33),
    //                     underlineColor: rgb(0.11, 0.14, 0.33)
    //                 });
                    
    //                 yPos -= 20;
                    
    //                 // Draw category score circle
    //                 drawCircularProgress(
    //                     detailPage,
    //                     margin + 35,
    //                     yPos - 20,
    //                     20,
    //                     (score.techScore + score.efficiencyScore) / 2,
    //                     "Overall"
    //                 );
                    
    //                 // Draw score bars
    //                 drawProgressBar(
    //                     detailPage,
    //                     margin + 80,
    //                     yPos - 10,
    //                     pageWidth / 2.5,
    //                     score.techScore,
    //                     "Technology Score"
    //                 );
                    
    //                 drawProgressBar(
    //                     detailPage,
    //                     margin + 80,
    //                     yPos - 30,
    //                     pageWidth / 2.5,
    //                     score.efficiencyScore,
    //                     "Efficiency Score"
    //                 );
                    
    //                 // Add strengths section
    //                 yPos -= 60;
                    
    //                 // Add Strengths heading
    //                 yPos = addHeadingWithUnderline(detailPage, "Strengths", margin, yPos, {
    //                     fontSize: 14,
    //                     font: helveticaBold,
    //                     color: rgb(0.3, 0.69, 0.31), // Green
    //                     underlineColor: rgb(0.3, 0.69, 0.31)
    //                 });
                    
    //                 yPos -= 10;
    //                 if (implemented.length > 0) {
    //                     implemented.forEach(feature => {
    //                         yPos = addBulletPoint(detailPage, feature, margin, yPos, {
    //                             maxWidth: contentWidth - 10,
    //                             font: helvetica,
    //                             fontSize: 11,
    //                             bulletType: "+" // Using + instead of ✓ for compatibility
    //                         });
    //                         yPos -= 5;
    //                     });
    //                 } else {
    //                     yPos = addMultiLineText(detailPage, "No strengths identified in this category.", margin, yPos, {
    //                         maxWidth: contentWidth - 10,
    //                         font: helvetica,
    //                         fontSize: 11,
    //                         color: rgb(0.2, 0.2, 0.2)
    //                     });
    //                     yPos -= 5;
    //                 }
                    
    //                 // Add weaknesses section
    //                 yPos -= 10;
                    
    //                 // Add Weakness heading
    //                 yPos = addHeadingWithUnderline(detailPage, "Weakness", margin, yPos, {
    //                     fontSize: 14,
    //                     font: helveticaBold,
    //                     color: rgb(0.96, 0.26, 0.21), // Red
    //                     underlineColor: rgb(0.96, 0.26, 0.21)
    //                 });
                    
    //                 yPos -= 10;
    //                 if (notImplemented.length > 0) {
    //                     notImplemented.forEach((feature, idx) => {
    //                         yPos = addBulletPoint(detailPage, feature, margin, yPos, {
    //                             maxWidth: contentWidth - 10,
    //                             font: helvetica,
    //                             fontSize: 11,
    //                             bulletType: `${idx + 1}.`
    //                         });
    //                         yPos -= 5;
    //                     });
    //                 } else {
    //                     yPos = addMultiLineText(detailPage, "No weaknesses identified in this category.", margin, yPos, {
    //                         maxWidth: contentWidth - 10,
    //                         font: helvetica,
    //                         fontSize: 11,
    //                         color: rgb(0.2, 0.2, 0.2)
    //                     });
    //                     yPos -= 5;
    //                 }
    //             });
                
    //             // Add watermark
    //             addWatermark(detailPage);
    //         });
            
    //         // Add conclusion page
    //         const conclusionPage = pdfDoc.addPage([pageWidth, pageHeight]);
            
    //         // Add horizontal cyan line
    //         conclusionPage.drawLine({
    //             start: { x: margin, y: pageHeight - 45 },
    //             end: { x: pageWidth - margin, y: pageHeight - 45 },
    //             thickness: 1,
    //             color: rgb(0.3, 0.76, 0.88)
    //         });
            
    //         // Add conclusion heading
    //         yPos = pageHeight - 50;
    //         yPos = addHeadingWithUnderline(conclusionPage, "Conclusive Remark", margin, yPos, {
    //             fontSize: 20,
    //             font: helveticaBold,
    //             color: rgb(0.11, 0.14, 0.33),
    //             underlineColor: rgb(0.11, 0.14, 0.33)
    //         });
            
    //         // Add observation section
    //         yPos -= 30;
            
    //         // Add Observation with cyan underline
    //         yPos = addHeadingWithUnderline(conclusionPage, "Observation:", margin, yPos, {
    //             fontSize: 16,
    //             font: helveticaBold,
    //             color: rgb(0.11, 0.14, 0.33),
    //             underlineColor: rgb(0.3, 0.76, 0.88)
    //         });
            
    //         yPos -= 15;
    //         yPos = addMultiLineText(conclusionPage, getScoreComment(parseFloat(finalScores.totalScore)), margin, yPos, {
    //             maxWidth: contentWidth,
    //             font: helvetica,
    //             fontSize: 12,
    //             color: rgb(0.2, 0.2, 0.2),
    //             lineHeight: 1.2
    //         });
            
    //         // Add next steps section
    //         yPos -= 30;
            
    //         // Add Next Steps with green underline
    //         yPos = addHeadingWithUnderline(conclusionPage, "Next Steps:", margin, yPos, {
    //             fontSize: 16,
    //             font: helveticaBold,
    //             color: rgb(0.3, 0.69, 0.31), // Green
    //             underlineColor: rgb(0.3, 0.69, 0.31)
    //         });
            
    //         yPos -= 15;
    //         const recommendations = [
    //             "Stay ahead by exploring cutting-edge advancements in AI, blockchain, or predictive analytics.",
    //             "Benchmark performance against industry leaders to maintain a competitive edge.",
    //             "Invest in continuous training to keep the team proficient with evolving technology."
    //         ];
            
    //         recommendations.forEach(rec => {
    //             yPos = addBulletPoint(conclusionPage, rec, margin, yPos, {
    //                 maxWidth: contentWidth,
    //                 font: helvetica,
    //                 fontSize: 12,
    //                 bulletType: "*" // Using * instead of • for compatibility
    //             });
    //             yPos -= 10;
    //         });
            
    //         // Add caution section
    //         yPos -= 20;
            
    //         // Add Caution with orange underline
    //         yPos = addHeadingWithUnderline(conclusionPage, "Caution:", margin, yPos, {
    //             fontSize: 16,
    //             font: helveticaBold,
    //             color: rgb(1, 0.6, 0), // Orange
    //             underlineColor: rgb(1, 0.6, 0)
    //         });
            
    //         yPos -= 15;
    //         const cautions = [
    //             "Complacency can lead to stagnation—innovation should be a continuous effort.",
    //             "Regularly reassess your tech stack to ensure it remains the best fit for evolving needs."
    //         ];
            
    //         cautions.forEach(caution => {
    //             yPos = addBulletPoint(conclusionPage, caution, margin, yPos, {
    //                 maxWidth: contentWidth,
    //                 font: helvetica,
    //                 fontSize: 12,
    //                 bulletType: "*" // Using * instead of • for compatibility
    //             });
    //             yPos -= 10;
    //         });
            
    //         // Add watermark
    //         addWatermark(conclusionPage);
            
    //         // Add page borders, footers and numbers to all pages
    //         const totalPages = pdfDoc.getPageCount();
    //         for (let i = 0; i < totalPages; i++) {
    //             const page = pdfDoc.getPage(i);
    //             addPageDecoration(page, i + 1, totalPages);
    //         }
            
    //         // Serialize the PDFDocument to bytes
    //         const pdfBytes = await pdfDoc.save();
            
    //         // Create a blob and trigger download
    //         const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    //         const link = document.createElement('a');
    //         link.href = URL.createObjectURL(blob);
    //         link.download = 'legal-assessment-report.pdf';
    //         link.click();
            
    //     } catch (error) {
    //         console.error('Error generating PDF:', error);
    //         alert('Error generating PDF: ' + error.message);
    //     }
    // };
    



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
}']'
