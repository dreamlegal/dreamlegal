export interface Prompt {
    id: number;
    title: string;
    description: string;
    category: string;
    expectedResult: string;
    prompt: string;
  }
  
  const part1Prompts =  [
    {
      id: 1,
      title: "Draft a mutual NDA",
      description: "Create a one-page mutual NDA with clear confidentiality terms.",
      category: "Contract management",
      expectedResult: "A one-page NDA with mutual obligations, definitions, governing law, and signature blocks.",
      prompt: "You are an experienced contract lawyer specializing in commercial transactions. Draft a one-page mutual non-disclosure agreement between [Party A] and [Party B] for [Purpose], valid for [X years], under [Jurisdiction] law. Include clear definitions of confidential information, mutual obligations, permitted disclosures, duration of obligations, governing law, and signature blocks. Use concise, plain language suitable for immediate execution."
    },
    {
      id: 2,
      title: "Draft a one-way NDA",
      description: "Create a one-page one-way NDA where only one party discloses information.",
      category: "Contract management",
      expectedResult: "A one-page NDA with obligations on the receiving party, permitted disclosures, governing law, and signature blocks.",
      prompt: "You are a contracts specialist with expertise in confidentiality agreements. Draft a one-page one-way non-disclosure agreement where only [Party A] discloses confidential information to [Party B] for [Purpose], under [Jurisdiction] law. Clearly define confidential information, outline obligations of the receiving party, specify permitted disclosures, include term and governing law, and keep the tone professional but easy to understand."
    },
    {
      id: 3,
      title: "Compare indemnity clauses",
      description: "Compare indemnity clauses from two contracts and assess risk differences.",
      category: "Contract management",
      expectedResult: "A side-by-side clause comparison with risk assessment and recommendation.",
      prompt: "You are a senior commercial contracts lawyer. Compare the indemnity clauses from Contract A and Contract B, analyzing differences in coverage scope, triggers, exclusions, and liability limits. Provide a side-by-side comparison table followed by a written recommendation on which clause offers greater protection for [Party] and why."
    },
    {
      id: 4,
      title: "Compare limitation of liability clauses",
      description: "Compare limitation of liability clauses for scope and exclusions.",
      category: "Contract management",
      expectedResult: "A comparison table highlighting caps, exclusions, indirect damages, and time limits.",
      prompt: "You are a legal risk assessment expert. Compare the limitation of liability clauses from Contract A and Contract B, highlighting differences in caps, exclusions, indirect damage coverage, and time limits. Present findings in a table with clause text excerpts, risk ratings, and a recommendation for [Party]."
    },
    {
      id: 5,
      title: "Summarize a Master Services Agreement",
      description: "Summarize an MSA into a structured brief.",
      category: "Contract management",
      expectedResult: "A summary covering parties, scope, pricing, termination, and risks.",
      prompt: "You are a corporate legal analyst specializing in contract abstraction. Summarize the following Master Services Agreement [Paste Text] into a structured brief that covers parties, scope of work, pricing and payment terms, performance standards, renewal and termination provisions, dispute resolution, and key risks."
    },
    {
      id: 6,
      title: "Summarize a SaaS agreement for executives",
      description: "Produce an executive summary of a SaaS agreement.",
      category: "Contract management",
      expectedResult: "A one-page summary highlighting key clauses, risks, and negotiation points.",
      prompt: "You are a technology contracts advisor. Review the following SaaS agreement [Paste Text] and produce a one-page executive summary highlighting subscription scope, renewal conditions, service levels, data handling obligations, liabilities, termination rights, and any clauses requiring negotiation."
    },
    {
      id: 7,
      title: "Extract key dates from a contract",
      description: "List start, renewal, termination, and milestone dates.",
      category: "Contract management",
      expectedResult: "A table of dates with descriptions, clause references, and significance.",
      prompt: "You are a contract data abstraction specialist. From the following contract [Paste Text], extract all key dates including start date, renewal date, termination date, milestone deadlines, and payment due dates. Present them in a table with the date, description, clause reference, and importance level."
    },
    {
      id: 8,
      title: "Extract key obligations for a party",
      description: "Identify all obligations assigned to a specific party.",
      category: "Contract management",
      expectedResult: "A checklist of obligations grouped by category with clause references.",
      prompt: "You are a compliance tracking expert. From [Contract Text], identify and list all obligations assigned to [Party]. Present them in a checklist format grouped by category (e.g., operational, payment, reporting) with clause references."
    },
    {
      id: 9,
      title: "Identify all termination clauses",
      description: "Extract and explain all termination clauses in a contract.",
      category: "Contract management",
      expectedResult: "A numbered list of termination clauses with triggers and consequences.",
      prompt: "You are a contract reviewer. From [Contract Text], locate every termination-related clause, extract its text, and provide a brief explanation of each, including the trigger event and consequences. Present results in a numbered list with clause references."
    },
    {
      id: 10,
      title: "Identify renewal and notice period clauses",
      description: "Summarize all renewal and notice requirements.",
      category: "Contract management",
      expectedResult: "A table showing renewal type, notice period, and conditions.",
      prompt: "You are a contract lifecycle analyst. From [Contract Text], identify all clauses related to renewal, extension, and required notice periods. Summarize them in a table showing the clause number, renewal type (automatic/manual), notice time required, and any conditions for renewal."
    },
    {
      id: 11,
      title: "Identify governing law and jurisdiction clauses",
      description: "Extract clauses that specify governing law and legal jurisdiction.",
      category: "Contract management",
      expectedResult: "A summary of applicable laws and jurisdiction with clause references.",
      prompt: "You are a legal jurisdiction expert. From [Contract Text], locate and extract all clauses specifying governing law, jurisdiction, venue, and forum selection. Summarize the legal framework that will apply to disputes and contract interpretation."
    },
    {
      id: 12,
      title: "Identify force majeure clauses",
      description: "Extract and analyze force majeure provisions.",
      category: "Contract management",
      expectedResult: "A detailed analysis of force majeure triggers, procedures, and relief.",
      prompt: "You are a contract risk analyst. From [Contract Text], locate force majeure clauses and analyze: triggering events, notice requirements, mitigation obligations, duration limitations, and available relief. Assess the adequacy of protection for both parties."
    },
    {
      id: 13,
      title: "Identify payment terms and schedules",
      description: "Extract all payment-related terms and create a payment schedule.",
      category: "Contract management",
      expectedResult: "A comprehensive payment schedule with terms and conditions.",
      prompt: "You are a financial contract analyst. From [Contract Text], extract all payment terms including amounts, schedules, methods, late fees, interest rates, and payment conditions. Create a clear payment schedule with associated obligations."
    },
    {
      id: 14,
      title: "Identify penalty and liquidated damages clauses",
      description: "Extract clauses specifying penalties, liquidated damages, and consequences.",
      category: "Contract management",
      expectedResult: "A summary of penalties with triggers and calculation methods.",
      prompt: "You are a contract enforcement specialist. From [Contract Text], identify all penalty, liquidated damages, and consequential damage clauses. For each, specify the triggering conditions, calculation methods, caps or limitations, and enforcement procedures."
    },
    {
      id: 15,
      title: "Identify warranties and guarantees",
      description: "Extract warranty provisions and guarantee clauses.",
      category: "Contract management",
      expectedResult: "A comprehensive list of warranties with duration and remedies.",
      prompt: "You are a warranty analysis expert. From [Contract Text], identify all warranties, guarantees, and representations. For each, specify the scope, duration, exclusions, and available remedies for breach."
    },
    {
      id: 16,
      title: "Identify non-compete clauses",
      description: "Extract and analyze non-compete and restraint of trade provisions.",
      category: "Contract management",
      expectedResult: "A detailed analysis of competitive restrictions and their enforceability.",
      prompt: "You are an employment law specialist. From [Contract Text], identify all non-compete, non-solicitation, and restraint provisions. Analyze the scope, duration, geographic limitations, and enforceability under [Jurisdiction] law."
    },
    {
      id: 17,
      title: "Identify exclusivity clauses",
      description: "Extract and analyze exclusivity and non-dealing provisions.",
      category: "Contract management",
      expectedResult: "A summary of exclusivity obligations and exceptions.",
      prompt: "You are a commercial contracts expert. From [Contract Text], locate all exclusivity, sole dealing, and non-dealing clauses. Analyze the scope, duration, exceptions, and consequences of breach."
    },
    {
      id: 18,
      title: "Identify assignment clauses",
      description: "Extract clauses governing assignment and transfer of rights.",
      category: "Contract management",
      expectedResult: "A comprehensive analysis of assignment rights and restrictions.",
      prompt: "You are a contract assignment specialist. From [Contract Text], identify all clauses related to assignment, transfer, novation, and change of control. Analyze restrictions, consent requirements, and conditions for valid assignment."
    },
    {
      id: 19,
      title: "Identify survival clauses post-termination",
      description: "Extract clauses that survive contract termination or expiration.",
      category: "Contract management",
      expectedResult: "A list of surviving obligations with duration and scope.",
      prompt: "You are a contract lifecycle expert. From [Contract Text], identify all clauses that expressly survive termination or expiration. List the surviving obligations, their duration, and the scope of post-contract duties."
    },
    {
      id: 20,
      title: "Identify dispute resolution clauses",
      description: "Extract and analyze dispute resolution and arbitration provisions.",
      category: "Contract management",
      expectedResult: "A detailed analysis of dispute resolution mechanisms and procedures.",
      prompt: "You are a dispute resolution specialist. From [Contract Text], locate all clauses governing dispute resolution, including mediation, arbitration, litigation, and escalation procedures. Analyze the process, venue, applicable rules, and binding nature."
    },
    {
      id: 21,
      title: "Identify compliance with laws clauses",
      description: "Extract clauses requiring compliance with laws and regulations.",
      category: "Contract management",
      expectedResult: "A summary of legal compliance obligations and standards.",
      prompt: "You are a regulatory compliance expert. From [Contract Text], identify all clauses requiring compliance with laws, regulations, industry standards, and certifications. Specify the scope of compliance obligations and consequences of non-compliance."
    },
    {
      id: 22,
      title: "Identify data protection and privacy clauses",
      description: "Extract clauses related to data handling, privacy, and security.",
      category: "Contract management",
      expectedResult: "A comprehensive analysis of data protection obligations and security requirements.",
      prompt: "You are a data privacy specialist. From [Contract Text], locate all clauses related to data protection, privacy, security, GDPR compliance, and data handling. Analyze obligations, security standards, breach notification requirements, and data subject rights."
    },
    {
      id: 23,
      title: "Identify audit and inspection rights",
      description: "Extract clauses granting audit, inspection, and access rights.",
      category: "Contract management",
      expectedResult: "A summary of audit rights, procedures, and limitations.",
      prompt: "You are an audit compliance expert. From [Contract Text], identify all clauses granting audit, inspection, examination, or access rights. Analyze the scope, frequency, notice requirements, and cost allocation for audits."
    },
    {
      id: 24,
      title: "Identify insurance and risk allocation clauses",
      description: "Extract clauses related to insurance requirements and risk allocation.",
      category: "Contract management",
      expectedResult: "A detailed analysis of insurance obligations and risk allocation mechanisms.",
      prompt: "You are a risk management specialist. From [Contract Text], locate all clauses related to insurance requirements, risk allocation, hold harmless provisions, and liability distribution. Analyze coverage amounts, types, and risk transfer mechanisms."
    },
    {
      id: 25,
      title: "Identify change management clauses",
      description: "Extract clauses governing contract amendments and change procedures.",
      category: "Contract management",
      expectedResult: "A summary of amendment procedures and change control mechanisms.",
      prompt: "You are a contract administration expert. From [Contract Text], identify all clauses related to contract amendments, modifications, change orders, and variation procedures. Analyze approval requirements, documentation standards, and cost implications."
    },
    {
      id: 26,
      title: "Create contract summary dashboard",
      description: "Generate a comprehensive dashboard summary of contract key terms.",
      category: "Contract management",
      expectedResult: "A structured dashboard with all critical contract elements and timelines.",
      prompt: "You are a contract management specialist. Create a comprehensive dashboard summary for [Contract Name] including: parties, key dates, financial terms, performance obligations, risk factors, compliance requirements, and renewal/termination provisions. Format as a visual dashboard with clear sections and key metrics."
    },
    {
      id: 27,
      title: "Analyze contract risk profile",
      description: "Assess and categorize risks across all contract provisions.",
      category: "Contract management",
      expectedResult: "A risk assessment matrix with mitigation recommendations.",
      prompt: "You are a legal risk analyst. Analyze [Contract Text] and create a comprehensive risk profile including: high/medium/low risk categorization, specific risk factors, financial exposure, operational risks, legal compliance risks, and recommended mitigation strategies."
    },
    {
      id: 28,
      title: "Draft contract amendment proposal",
      description: "Create a formal amendment proposal with specific language changes.",
      category: "Contract management",
      expectedResult: "A formal amendment document with tracked changes and rationale.",
      prompt: "You are a contract negotiation specialist. Draft a formal amendment proposal for [Contract Name] to address [Specific Issues]. Include: current language, proposed new language, rationale for changes, business justification, and implementation timeline."
    },
    {
      id: 29,
      title: "Create contract negotiation strategy",
      description: "Develop a comprehensive negotiation strategy for contract discussions.",
      category: "Contract management",
      expectedResult: "A strategic negotiation plan with priorities and fallback positions.",
      prompt: "You are a contract negotiation expert. Create a negotiation strategy for [Contract Type] with [Counterparty] covering: key objectives, must-have vs. nice-to-have terms, concession strategy, deal breakers, timeline, and recommended negotiation sequence."
    },
    {
      id: 30,
      title: "Conduct contract compliance audit",
      description: "Audit contract performance and compliance with terms.",
      category: "Contract management",
      expectedResult: "A compliance audit report with findings and remediation plan.",
      prompt: "You are a contract compliance auditor. Conduct a compliance audit of [Contract Name] including: performance against SLAs, financial compliance, regulatory adherence, deliverable completion, and obligation fulfillment. Identify gaps and recommend corrective actions."
    },
    {
      id: 31,
      title: "Create contract renewal analysis",
      description: "Analyze contract performance to inform renewal decisions.",
      category: "Contract management",
      expectedResult: "A renewal recommendation report with performance metrics and strategic analysis.",
      prompt: "You are a contract lifecycle manager. Analyze [Contract Name] for renewal consideration including: performance metrics, value delivery, market comparison, relationship quality, strategic alignment, and financial impact. Provide renewal recommendation with supporting rationale."
    },
    {
      id: 32,
      title: "Draft contract termination notice",
      description: "Create a formal notice of contract termination with proper legal language.",
      category: "Contract management",
      expectedResult: "A legally compliant termination notice with required elements and timeline.",
      prompt: "You are a contract termination specialist. Draft a formal termination notice for [Contract Name] citing [Termination Reason]. Include: proper legal citations, notice period compliance, outstanding obligations, transition requirements, and post-termination duties."
    },
    {
      id: 33,
      title: "Create purchase order terms and conditions",
      description: "Draft comprehensive terms and conditions for purchase orders.",
      category: "Contract management",
      expectedResult: "Standard purchase order terms with legal protections and commercial clarity.",
      prompt: "You are a procurement lawyer. Draft comprehensive terms and conditions for purchase orders including: payment terms, delivery requirements, quality standards, warranty provisions, liability limitations, force majeure, and dispute resolution. Ensure terms protect the buyer while remaining commercially reasonable."
    },
    {
      id: 34,
      title: "Analyze vendor contract portfolio",
      description: "Review and analyze multiple vendor contracts for optimization opportunities.",
      category: "Contract management",
      expectedResult: "A portfolio analysis with consolidation and optimization recommendations.",
      prompt: "You are a vendor management specialist. Analyze our vendor contract portfolio for [Service Category] including: spend analysis, term comparison, performance metrics, redundancies, consolidation opportunities, and cost optimization strategies. Provide actionable recommendations."
    },
    {
      id: 35,
      title: "Create contract template library",
      description: "Develop standardized contract templates for common agreement types.",
      category: "Contract management",
      expectedResult: "A library of template contracts with guidance notes and customization options.",
      prompt: "You are a contract standardization expert. Create template contracts for [Agreement Types] including: standard terms, alternative clauses, guidance notes, risk ratings, and customization instructions. Ensure templates balance legal protection with commercial flexibility."
    },
    {
      id: 36,
      title: "Draft subcontractor agreement",
      description: "Create a comprehensive subcontractor agreement with performance standards.",
      category: "Contract management",
      expectedResult: "A detailed subcontractor agreement with clear obligations and performance metrics.",
      prompt: "You are a subcontracting specialist. Draft a subcontractor agreement for [Services] including: scope of work, performance standards, payment terms, insurance requirements, compliance obligations, intellectual property provisions, and termination rights."
    },
    {
      id: 37,
      title: "Create joint venture agreement",
      description: "Draft a joint venture agreement for collaborative business arrangements.",
      category: "Contract management",
      expectedResult: "A comprehensive joint venture agreement with governance and profit-sharing provisions.",
      prompt: "You are a joint venture attorney. Draft a joint venture agreement between [Parties] for [Purpose] including: governance structure, capital contributions, profit/loss sharing, management responsibilities, decision-making procedures, exit mechanisms, and dispute resolution."
    },
    {
      id: 38,
      title: "Analyze contract pricing models",
      description: "Review and compare different pricing models across contracts.",
      category: "Contract management",
      expectedResult: "A pricing analysis with cost comparison and optimization recommendations.",
      prompt: "You are a contract pricing analyst. Analyze pricing models across [Contract Portfolio] including: fixed price vs. time & materials, volume discounts, escalation clauses, benchmarking provisions, and cost optimization opportunities. Recommend optimal pricing strategies."
    },
    {
      id: 39,
      title: "Create service level agreement framework",
      description: "Develop comprehensive SLA framework with metrics and penalties.",
      category: "Contract management",
      expectedResult: "A detailed SLA framework with measurable metrics and enforcement mechanisms.",
      prompt: "You are an SLA design expert. Create a service level agreement framework for [Services] including: performance metrics, measurement methods, reporting requirements, penalty structures, credits, improvement procedures, and escalation processes."
    },
    {
      id: 40,
      title: "Draft distribution agreement",
      description: "Create a distribution agreement for product sales and marketing.",
      category: "Contract management",
      expectedResult: "A comprehensive distribution agreement with territory and performance provisions.",
      prompt: "You are a distribution law specialist. Draft a distribution agreement for [Products] including: territorial rights, sales targets, marketing obligations, pricing policies, intellectual property license, termination procedures, and post-termination restrictions."
    },
    {
      id: 41,
      title: "Create contract performance scorecard",
      description: "Develop a scorecard system for tracking contract performance metrics.",
      category: "Contract management",
      expectedResult: "A performance scorecard with KPIs and automated tracking recommendations.",
      prompt: "You are a contract performance manager. Create a performance scorecard for [Contract Type] including: key performance indicators, measurement criteria, reporting frequency, escalation triggers, improvement plans, and dashboard visualization recommendations."
    },
    {
      id: 42,
      title: "Analyze contract automation opportunities",
      description: "Identify processes suitable for contract automation and workflow optimization.",
      category: "Contract management",
      expectedResult: "An automation roadmap with technology recommendations and implementation priorities.",
      prompt: "You are a contract automation consultant. Analyze our contract management processes and identify automation opportunities including: template automation, approval workflows, renewal alerts, compliance monitoring, reporting automation, and integration requirements."
    },
    {
      id: 43,
      title: "Create contract dispute escalation matrix",
      description: "Develop a structured approach for handling contract disputes and conflicts.",
      category: "Contract management",
      expectedResult: "A dispute escalation framework with procedures and decision trees.",
      prompt: "You are a dispute resolution strategist. Create a contract dispute escalation matrix including: dispute categories, escalation triggers, resolution procedures, stakeholder involvement, timeline requirements, cost considerations, and success metrics."
    },
    {
      id: 44,
      title: "Draft software licensing agreement",
      description: "Create a comprehensive software licensing agreement with usage rights and restrictions.",
      category: "Contract management",
      expectedResult: "A detailed software license with clear usage terms and compliance requirements.",
      prompt: "You are a software licensing attorney. Draft a software licensing agreement including: license grant scope, usage restrictions, installation limitations, maintenance provisions, support obligations, intellectual property protection, and termination procedures."
    },
    {
      id: 45,
      title: "Create contract training materials",
      description: "Develop training materials for contract management best practices.",
      category: "Contract management",
      expectedResult: "Comprehensive training materials with practical examples and templates.",
      prompt: "You are a contract training specialist. Create training materials for contract management including: best practices guide, common pitfalls, template usage, negotiation techniques, compliance requirements, and practical exercises with real-world scenarios."
    },
    {
      id: 46,
      title: "Analyze cross-border contract requirements",
      description: "Review international contract requirements and compliance considerations.",
      category: "Contract management",
      expectedResult: "A cross-border compliance guide with jurisdiction-specific requirements.",
      prompt: "You are an international contract lawyer. Analyze cross-border contract requirements for [Countries/Regions] including: applicable laws, tax implications, currency considerations, regulatory compliance, dispute resolution options, and enforceability issues."
    },
    {
      id: 47,
      title: "Create contract repository structure",
      description: "Design an organized structure for contract storage and retrieval.",
      category: "Contract management",
      expectedResult: "A systematic repository structure with categorization and search capabilities.",
      prompt: "You are a contract management systems architect. Design a contract repository structure including: categorization schema, metadata requirements, search functionality, access controls, version management, and integration with business systems."
    },
    {
      id: 48,
      title: "Draft confidentiality agreement for employees",
      description: "Create employee confidentiality agreements for different roles and access levels.",
      category: "Contract management",
      expectedResult: "Tailored confidentiality agreements with role-specific obligations and restrictions.",
      prompt: "You are an employment law specialist. Draft confidentiality agreements for [Employee Categories] including: scope of confidential information, permitted uses, return obligations, post-employment restrictions, enforcement mechanisms, and industry-specific considerations."
    },
    {
      id: 49,
      title: "Create contract benchmark analysis",
      description: "Benchmark contract terms against industry standards and best practices.",
      category: "Contract management",
      expectedResult: "A benchmarking report with gap analysis and improvement recommendations.",
      prompt: "You are a contract benchmarking expert. Conduct a benchmark analysis of [Contract Terms] against industry standards including: market comparison, best practice identification, gap analysis, competitive positioning, and improvement recommendations."
    },
    {
      id: 50,
      title: "Draft technology transfer agreement",
      description: "Create an agreement for transferring technology rights and know-how.",
      category: "Contract management",
      expectedResult: "A comprehensive technology transfer agreement with IP protections and commercialization terms.",
      prompt: "You are a technology transfer attorney. Draft a technology transfer agreement including: technology description, license grants, know-how transfer, commercialization rights, royalty structure, milestone payments, IP warranties, and export control compliance."
    },
    {
      id: 51,
      title: "Create litigation case timeline",
      description: "Develop a comprehensive timeline for litigation management.",
      category: "Litigation and case management",
      expectedResult: "A detailed timeline with deadlines, milestones, and dependencies.",
      prompt: "You are a litigation project manager. Create a comprehensive case timeline for [Case Name] including: pleading deadlines, discovery phases, motion schedules, deposition timelines, expert witness deadlines, pre-trial conferences, and trial preparation milestones. Include dependencies and critical path analysis."
    },
    {
      id: 52,
      title: "Draft discovery requests",
      description: "Prepare comprehensive discovery requests for litigation.",
      category: "Litigation and case management",
      expectedResult: "Tailored discovery requests with strategic focus areas.",
      prompt: "You are a discovery attorney. Draft comprehensive discovery requests for [Case Type] including: interrogatories, requests for production, and requests for admissions. Focus on [Key Issues] and ensure requests are specific, relevant, and likely to produce useful evidence."
    },
    {
      id: 53,
      title: "Analyze deposition testimony",
      description: "Summarize and analyze key deposition testimony.",
      category: "Litigation and case management",
      expectedResult: "A strategic analysis with key admissions and inconsistencies.",
      prompt: "You are a litigation analyst. Review the deposition testimony of [Witness Name] and provide: key admissions, inconsistencies with other testimony or documents, credibility assessment, and strategic implications for the case."
    },
    {
      id: 54,
      title: "Prepare witness examination outline",
      description: "Create examination outlines for direct and cross-examination.",
      category: "Litigation and case management",
      expectedResult: "Structured examination outlines with key questions and exhibits.",
      prompt: "You are a trial attorney. Prepare a [direct/cross] examination outline for [Witness Name] covering [Key Topics]. Include foundational questions, exhibit introductions, key substantive questions, and anticipated objections with responses."
    },
    {
      id: 55,
      title: "Draft motion for summary judgment",
      description: "Prepare a motion for summary judgment with supporting arguments.",
      category: "Litigation and case management",
      expectedResult: "A complete motion with legal arguments and supporting evidence.",
      prompt: "You are a motions attorney. Draft a motion for summary judgment on [Legal Issue] including: statement of undisputed facts, legal standard, argument demonstrating no genuine issue of material fact, supporting case law, and proposed order."
    },
    {
      id: 56,
      title: "Analyze expert witness reports",
      description: "Review and analyze expert witness reports for strengths and weaknesses.",
      category: "Litigation and case management",
      expectedResult: "A comprehensive analysis with attack strategies and counter-arguments.",
      prompt: "You are an expert witness consultant. Analyze the expert report from [Expert Name] on [Subject Matter]. Identify: methodological strengths and weaknesses, potential Daubert challenges, areas for cross-examination, and recommendations for counter-expert strategy."
    },
    {
      id: 57,
      title: "Prepare trial brief",
      description: "Create a comprehensive trial brief outlining case strategy.",
      category: "Litigation and case management",
      expectedResult: "A strategic trial brief with legal arguments and evidence plan.",
      prompt: "You are lead trial counsel. Prepare a trial brief for [Case Name] including: case overview, legal theories, key evidence, witness list, anticipated defenses, jury selection strategy, and opening statement themes."
    },
    {
      id: 58,
      title: "Draft settlement demand letter",
      description: "Prepare a persuasive settlement demand letter.",
      category: "Litigation and case management",
      expectedResult: "A compelling demand letter with damages calculation and negotiation strategy.",
      prompt: "You are a settlement negotiator. Draft a settlement demand letter for [Case/Dispute] including: factual summary, liability analysis, damages calculation, supporting documentation references, settlement demand amount, and deadline for response."
    },
    {
      id: 59,
      title: "Analyze case law precedents",
      description: "Research and analyze relevant case law for litigation strategy.",
      category: "Litigation and case management",
      expectedResult: "A comprehensive case law analysis with strategic recommendations.",
      prompt: "You are a legal researcher. Analyze relevant case law for [Legal Issue] in [Jurisdiction]. Identify: controlling precedents, persuasive authority, factual distinctions, trending judicial attitudes, and strategic implications for our case."
    },
    {
      id: 60,
      title: "Prepare jury instructions",
      description: "Draft proposed jury instructions for trial.",
      category: "Litigation and case management",
      expectedResult: "Clear, legally accurate jury instructions with supporting authorities.",
      prompt: "You are a trial judge's law clerk. Draft proposed jury instructions for [Legal Claims] including: elements instructions, burden of proof, credibility instructions, damages instructions, and special verdict form. Cite supporting authorities and anticipate objections."
    },
    {
      id: 61,
      title: "Create case fact chronology",
      description: "Develop a detailed chronological timeline of case facts and events.",
      category: "Litigation and case management",
      expectedResult: "A comprehensive fact timeline with supporting documentation references.",
      prompt: "You are a case preparation specialist. Create a detailed fact chronology for [Case Name] including: key events, document references, witness involvement, causal relationships, and evidentiary support. Organize chronologically with cross-references to exhibits."
    },
    {
      id: 62,
      title: "Draft complaint or petition",
      description: "Prepare a comprehensive complaint or petition to initiate litigation.",
      category: "Litigation and case management",
      expectedResult: "A legally sufficient pleading with proper allegations and legal theories.",
      prompt: "You are a litigation attorney. Draft a complaint for [Legal Claims] against [Defendant] including: jurisdiction and venue, factual allegations, legal theories, damages claims, and prayer for relief. Ensure compliance with pleading standards and court rules."
    },
    {
      id: 63,
      title: "Analyze damages calculations",
      description: "Review and validate damages calculations for litigation or settlement.",
      category: "Litigation and case management",
      expectedResult: "A detailed damages analysis with supporting methodology and documentation.",
      prompt: "You are a litigation damages expert. Analyze damages calculations for [Case Type] including: economic losses, lost profits, mitigation efforts, comparative fault, pre and post-judgment interest, and supporting methodologies. Validate calculations and identify weaknesses."
    },
    {
      id: 64,
      title: "Prepare discovery plan",
      description: "Create a strategic discovery plan for efficient case development.",
      category: "Litigation and case management",
      expectedResult: "A comprehensive discovery strategy with timeline and resource allocation.",
      prompt: "You are a discovery strategist. Create a discovery plan for [Case Type] including: information needs assessment, discovery method selection, sequencing strategy, timeline, cost estimates, and coordination with case theory development."
    },
    {
      id: 65,
      title: "Draft appellate brief",
      description: "Prepare a persuasive appellate brief for higher court review.",
      category: "Litigation and case management",
      expectedResult: "A comprehensive appellate brief with legal arguments and record citations.",
      prompt: "You are an appellate attorney. Draft an appellate brief for [Appeal Type] including: statement of issues, procedural history, statement of facts, legal arguments, standard of review analysis, and conclusion. Ensure compliance with court rules and page limits."
    },
    {
      id: 66,
      title: "Create document review protocol",
      description: "Establish procedures for efficient document review in litigation.",
      category: "Litigation and case management",
      expectedResult: "A systematic document review protocol with quality control measures.",
      prompt: "You are a document review supervisor. Create a document review protocol including: review criteria, privilege screening, coding guidelines, quality control procedures, technology utilization, and efficiency metrics."
    },
    {
      id: 67,
      title: "Analyze privilege assertions",
      description: "Review and validate attorney-client privilege and work product claims.",
      category: "Litigation and case management",
      expectedResult: "A privilege analysis with recommendations for assertions and challenges.",
      prompt: "You are a privilege specialist. Analyze privilege assertions for [Document Categories] including: attorney-client privilege elements, work product doctrine application, common interest privilege, waiver analysis, and recommendations for privilege log preparation."
    },
    {
      id: 68,
      title: "Prepare mediation brief",
      description: "Create a strategic brief for mediation proceedings.",
      category: "Litigation and case management",
      expectedResult: "A persuasive mediation brief with settlement framework and negotiation strategy.",
      prompt: "You are a mediation advocate. Prepare a mediation brief for [Dispute] including: case summary, legal strengths and weaknesses, damages analysis, settlement authority, negotiation strategy, and desired outcomes."
    },
    {
      id: 69,
      title: "Draft protective order",
      description: "Prepare a protective order for confidential information in litigation.",
      category: "Litigation and case management",
      expectedResult: "A comprehensive protective order with appropriate confidentiality protections.",
      prompt: "You are a litigation attorney. Draft a protective order for [Case Name] including: confidentiality categories, permitted uses, disclosure restrictions, return obligations, enforcement mechanisms, and dispute resolution procedures."
    },
    {
      id: 70,
      title: "Create trial exhibit list",
      description: "Organize and prepare the exhibit list for trial presentation.",
      category: "Litigation and case management",
      expectedResult: "A comprehensive exhibit list with admissibility analysis and presentation strategy.",
      prompt: "You are a trial preparation specialist. Create a trial exhibit list for [Case Name] including: exhibit descriptions, admissibility foundation, objection anticipation, presentation sequence, and technical requirements for courtroom display."
    },
    {
      id: 71,
      title: "Analyze e-discovery requirements",
      description: "Assess electronic discovery obligations and develop compliance strategy.",
      category: "Litigation and case management",
      expectedResult: "An e-discovery compliance plan with technology and procedural recommendations.",
      prompt: "You are an e-discovery consultant. Analyze e-discovery requirements for [Case Type] including: data identification, preservation obligations, collection procedures, processing requirements, review workflows, and production formats."
    },
    {
      id: 72,
      title: "Prepare witness preparation outline",
      description: "Create structured preparation materials for witness testimony.",
      category: "Litigation and case management",
      expectedResult: "A comprehensive witness preparation guide with practice questions and strategies.",
      prompt: "You are a witness preparation specialist. Create preparation materials for [Witness Type] including: key topics review, anticipated questions, credibility factors, courtroom procedures, cross-examination strategies, and confidence-building techniques."
    },
    {
      id: 73,
      title: "Draft emergency motion",
      description: "Prepare urgent motions for immediate court relief.",
      category: "Litigation and case management",
      expectedResult: "A compelling emergency motion with proper legal standards and supporting evidence.",
      prompt: "You are an emergency litigation specialist. Draft an emergency motion for [Relief Sought] including: urgency demonstration, irreparable harm analysis, likelihood of success, balance of hardships, supporting affidavits, and proposed order."
    },
    {
      id: 74,
      title: "Create case budget and timeline",
      description: "Develop realistic budget and timeline projections for litigation.",
      category: "Litigation and case management",
      expectedResult: "A detailed budget and timeline with milestone tracking and cost control measures.",
      prompt: "You are a litigation project manager. Create a budget and timeline for [Case Type] including: phase-based cost estimates, resource allocation, milestone tracking, contingency planning, and cost control recommendations."
    },
    {
      id: 75,
      title: "Analyze insurance coverage issues",
      description: "Review insurance policies for litigation coverage and strategy implications.",
      category: "Litigation and case management",
      expectedResult: "A coverage analysis with strategic recommendations for litigation management.",
      prompt: "You are an insurance coverage attorney. Analyze insurance coverage for [Claims] including: policy interpretation, coverage gaps, reservation of rights issues, cooperation obligations, and strategic implications for case management."
    },
    {
      id: 76,
      title: "Create case status reporting system",
      description: "Establish regular reporting procedures for case progress and metrics.",
      category: "Litigation and case management",
      expectedResult: "A systematic reporting framework with key metrics and stakeholder communication.",
      prompt: "You are a litigation management consultant. Create a case status reporting system including: key performance indicators, reporting frequency, stakeholder communication, budget tracking, risk assessment, and escalation procedures."
    },
    {
      id: 77,
      title: "Prepare class action analysis",
      description: "Assess viability and strategy for class action litigation.",
      category: "Litigation and case management",
      expectedResult: "A comprehensive class action analysis with certification strategy and case management plan.",
      prompt: "You are a class action specialist. Analyze class action viability for [Claims] including: Rule 23 requirements, class definition, typicality and adequacy, superiority analysis, notice requirements, and case management strategies."
    },
    {
      id: 78,
      title: "Draft enforcement motion",
      description: "Prepare motions to enforce court orders or judgments.",
      category: "Litigation and case management",
      expectedResult: "A compelling enforcement motion with evidence of non-compliance and requested relief.",
      prompt: "You are a judgment enforcement attorney. Draft an enforcement motion for [Court Order/Judgment] including: compliance requirements, evidence of violation, harm analysis, available remedies, and proposed sanctions."
    },
    {
      id: 79,
      title: "Create alternative dispute resolution strategy",
      description: "Develop comprehensive ADR strategy as alternative to litigation.",
      category: "Litigation and case management",
      expectedResult: "An ADR strategy with process selection, timing, and success factor analysis.",
      prompt: "You are an ADR specialist. Create an alternative dispute resolution strategy for [Dispute Type] including: process selection criteria, timing considerations, cost-benefit analysis, success factors, and integration with litigation strategy."
    },
    {
      id: 80,
      title: "Analyze forum selection and venue",
      description: "Evaluate optimal forum selection and venue for litigation strategy.",
      category: "Litigation and case management",
      expectedResult: "A forum analysis with strategic recommendations for case filing and potential transfers.",
      prompt: "You are a forum selection strategist. Analyze forum options for [Legal Claims] including: jurisdictional requirements, venue analysis, forum shopping considerations, transfer possibilities, and strategic advantages of each option."
    },
    {
      id: 81,
      title: "Conduct patent prior art search",
      description: "Perform comprehensive prior art search for patent application or validity analysis.",
      category: "IP management",
      expectedResult: "A detailed prior art report with relevance analysis and patentability assessment.",
      prompt: "You are a patent search specialist. Conduct a prior art search for [Invention Description] including: database searches, classification analysis, relevance ranking, claim comparison, patentability assessment, and search strategy documentation."
    },
    {
      id: 82,
      title: "Draft patent application claims",
      description: "Prepare patent claims for invention disclosure and application filing.",
      category: "IP management",
      expectedResult: "Well-crafted patent claims with appropriate scope and legal protection.",
      prompt: "You are a patent attorney. Draft patent claims for [Invention] including: independent and dependent claims, claim differentiation, scope optimization, infringement considerations, and compliance with USPTO requirements."
    },
    {
      id: 83,
      title: "Analyze trademark distinctiveness",
      description: "Assess trademark strength and registrability for brand protection.",
      category: "IP management",
      expectedResult: "A distinctiveness analysis with registration strategy and brand protection recommendations.",
      prompt: "You are a trademark expert. Analyze the distinctiveness of [Mark] for [Goods/Services] including: inherent distinctiveness, acquired distinctiveness, descriptiveness analysis, registration prospects, and brand protection strategy."
    },
    {
      id: 84,
      title: "Create IP portfolio management strategy",
      description: "Develop comprehensive strategy for managing intellectual property portfolio.",
      category: "IP management",
      expectedResult: "A strategic IP portfolio plan with prioritization and budget allocation.",
      prompt: "You are an IP portfolio manager. Create a portfolio management strategy including: asset categorization, value assessment, maintenance decisions, strategic filing priorities, budget allocation, and competitive positioning."
    },
    {
      id: 85,
      title: "Draft copyright licensing agreement",
      description: "Prepare licensing agreement for copyrighted works and content.",
      category: "IP management",
      expectedResult: "A comprehensive copyright license with appropriate usage rights and restrictions.",
      prompt: "You are a copyright licensing specialist. Draft a licensing agreement for [Copyrighted Work] including: license grant scope, usage restrictions, territory limitations, royalty structure, attribution requirements, and termination provisions."
    },
    {
      id: 86,
      title: "Conduct trademark clearance search",
      description: "Perform comprehensive trademark search before brand launch or registration.",
      category: "IP management",
      expectedResult: "A clearance report with conflict analysis and registration recommendations.",
      prompt: "You are a trademark search attorney. Conduct a clearance search for [Proposed Mark] in [Classes] including: identical and similar mark analysis, phonetic and visual similarities, likelihood of confusion assessment, and clearance recommendations."
    },
    {
      id: 87,
      title: "Analyze trade secret protection",
      description: "Assess trade secret identification and protection measures.",
      category: "IP management",
      expectedResult: "A trade secret audit with protection strategy and security recommendations.",
      prompt: "You are a trade secret specialist. Analyze trade secret protection for [Information/Process] including: secrecy requirements, economic value assessment, protection measures, employee obligations, and enforcement strategies."
    },
    {
      id: 88,
      title: "Draft IP assignment agreement",
      description: "Prepare intellectual property assignment for employee or contractor inventions.",
      category: "IP management",
      expectedResult: "A comprehensive IP assignment with proper ownership transfer and warranties.",
      prompt: "You are an IP assignment attorney. Draft an intellectual property assignment agreement including: invention assignment scope, works for hire provisions, moral rights waiver, cooperation obligations, and warranty representations."
    },
    {
      id: 89,
      title: "Create brand protection strategy",
      description: "Develop comprehensive brand protection and enforcement strategy.",
      category: "IP management",
      expectedResult: "A brand protection plan with monitoring, enforcement, and global strategy components.",
      prompt: "You are a brand protection expert. Create a brand protection strategy for [Brand] including: trademark registration strategy, domain name protection, counterfeiting monitoring, enforcement procedures, and international considerations."
    },
    {
      id: 90,
      title: "Analyze patent infringement",
      description: "Assess potential patent infringement and develop response strategy.",
      category: "IP management",
      expectedResult: "An infringement analysis with validity challenges and design-around options.",
      prompt: "You are a patent litigation specialist. Analyze potential infringement of [Patent] by [Product/Process] including: claim construction, infringement analysis, validity challenges, prior art references, and design-around strategies."
    },
    {
      id: 91,
      title: "Draft technology license agreement",
      description: "Prepare comprehensive technology licensing agreement with commercialization terms.",
      category: "IP management",
      expectedResult: "A detailed technology license with appropriate commercial and technical provisions.",
      prompt: "You are a technology licensing attorney. Draft a license agreement for [Technology] including: license grant scope, field of use restrictions, improvement rights, royalty structure, milestone payments, and technology transfer obligations."
    },
    {
      id: 92,
      title: "Create IP due diligence checklist",
      description: "Develop comprehensive checklist for intellectual property due diligence.",
      category: "IP management",
      expectedResult: "A systematic due diligence framework with documentation and analysis requirements.",
      prompt: "You are an IP due diligence expert. Create a due diligence checklist for [Transaction Type] including: patent portfolio analysis, trademark clearance, copyright ownership, trade secret protection, licensing obligations, and infringement risks."
    },
    {
      id: 93,
      title: "Analyze open source compliance",
      description: "Review open source software usage for license compliance and risk assessment.",
      category: "IP management",
      expectedResult: "A compliance report with license analysis and risk mitigation recommendations.",
      prompt: "You are an open source compliance specialist. Analyze open source usage in [Software Product] including: license identification, compatibility analysis, copyleft obligations, attribution requirements, and compliance recommendations."
    },
    {
      id: 94,
      title: "Draft domain name policy",
      description: "Create comprehensive domain name registration and management policy.",
      category: "IP management",
      expectedResult: "A domain name policy with registration guidelines and protection strategies.",
      prompt: "You are a domain name specialist. Draft a domain name policy including: registration procedures, naming conventions, renewal management, defensive registrations, dispute resolution, and brand protection considerations."
    },
    {
      id: 95,
      title: "Create invention disclosure process",
      description: "Establish systematic process for capturing and evaluating employee inventions.",
      category: "IP management",
      expectedResult: "An invention disclosure system with evaluation criteria and decision frameworks.",
      prompt: "You are an innovation management expert. Create an invention disclosure process including: disclosure forms, evaluation criteria, committee structure, decision timelines, inventor incentives, and patent filing procedures."
    },
    {
      id: 96,
      title: "Analyze design patent strategy",
      description: "Develop design patent filing strategy for product protection.",
      category: "IP management",
      expectedResult: "A design patent strategy with filing recommendations and protection scope analysis.",
      prompt: "You are a design patent attorney. Analyze design patent strategy for [Product] including: protectable design elements, prior art analysis, filing timing, continuation strategy, and enforcement considerations."
    },
    {
      id: 97,
      title: "Draft IP enforcement notice",
      description: "Prepare cease and desist letters and enforcement communications.",
      category: "IP management",
      expectedResult: "A persuasive enforcement notice with legal basis and settlement framework.",
      prompt: "You are an IP enforcement attorney. Draft an enforcement notice for [IP Rights] infringement including: rights identification, infringement analysis, damages assessment, demand for cessation, and settlement offer framework."
    },
    {
      id: 98,
      title: "Create IP valuation report",
      description: "Assess intellectual property value for licensing, acquisition, or financial reporting.",
      category: "IP management",
      expectedResult: "A comprehensive IP valuation with methodology and market analysis.",
      prompt: "You are an IP valuation expert. Create a valuation report for [IP Assets] including: valuation methodologies, market analysis, revenue projections, risk factors, and comparable transactions analysis."
    },
    {
      id: 99,
      title: "Analyze freedom to operate",
      description: "Assess freedom to operate for product development and commercialization.",
      category: "IP management",
      expectedResult: "A freedom to operate analysis with risk assessment and mitigation strategies.",
      prompt: "You are a freedom to operate specialist. Analyze FTO for [Product/Technology] including: patent landscape analysis, blocking patent identification, design-around options, licensing opportunities, and risk mitigation strategies."
    },
    {
      id: 100,
      title: "Create IP training program",
      description: "Develop comprehensive intellectual property training for employees and inventors.",
      category: "IP management",
      expectedResult: "A structured IP training program with materials and assessment components.",
      prompt: "You are an IP education specialist. Create an IP training program including: invention identification, disclosure procedures, patent basics, trademark guidelines, copyright awareness, trade secret protection, and practical exercises."
    }
  
  ];

const part2Prompts = [
    {
      id: 101,
      title: "Draft a patent application based on invention details",
      description: "Create a comprehensive patent application from technical invention disclosure.",
      category: "IP management",
      expectedResult: "A complete patent application with claims, detailed description, and drawings.",
      prompt: "You are a patent attorney specializing in technology patents. Draft a patent application for [Invention Description] including: detailed technical description, claim set with independent and dependent claims, background of invention, field of invention, summary, detailed description of preferred embodiments, and drawing descriptions."
    },
    {
      id: 102,
      title: "Summarize a granted patent for a non-technical audience",
      description: "Create an accessible summary of complex patent technology.",
      category: "IP management",
      expectedResult: "A clear, non-technical summary explaining the invention's purpose and benefits.",
      prompt: "You are a technical communication specialist. Summarize [Patent Number] for a non-technical audience including: what problem the invention solves, how it works in simple terms, key benefits, commercial applications, and why it's innovative."
    },
    {
      id: 103,
      title: "Compare two patents for overlapping claims",
      description: "Analyze potential claim overlap between related patents.",
      category: "IP management",
      expectedResult: "A detailed comparison identifying overlapping elements and potential conflicts.",
      prompt: "You are a patent claim analyst. Compare [Patent A] and [Patent B] for claim overlap including: claim element mapping, scope analysis, potential interference issues, priority dates, and recommendations for claim differentiation."
    },
    {
      id: 104,
      title: "Conduct a patent novelty search using provided invention description",
      description: "Perform prior art search to assess invention patentability.",
      category: "IP management",
      expectedResult: "A comprehensive novelty search report with prior art analysis and patentability assessment.",
      prompt: "You are a patent search specialist. Conduct a novelty search for [Invention Description] including: relevant prior art identification, novelty analysis, obviousness assessment, search strategy documentation, and patentability recommendations."
    },
    {
      id: 105,
      title: "Draft a freedom-to-operate (FTO) opinion",
      description: "Assess patent landscape risks for product commercialization.",
      category: "IP management",
      expectedResult: "A comprehensive FTO opinion with risk assessment and mitigation strategies.",
      prompt: "You are a freedom-to-operate specialist. Draft an FTO opinion for [Product/Technology] including: patent landscape analysis, blocking patent identification, infringement risk assessment, design-around options, and commercialization recommendations."
    },
    {
      id: 106,
      title: "Prepare a patent claim chart for infringement analysis",
      description: "Create detailed claim charts mapping patent claims to accused products.",
      category: "IP management",
      expectedResult: "A comprehensive claim chart with element-by-element infringement analysis.",
      prompt: "You are a patent infringement analyst. Prepare claim charts for [Patent Claims] vs [Accused Product] including: element mapping, evidence identification, literal infringement analysis, doctrine of equivalents consideration, and infringement conclusions."
    },
    {
      id: 107,
      title: "Draft a trademark application for a new brand name",
      description: "Prepare trademark application with proper classification and description.",
      category: "IP management",
      expectedResult: "A complete trademark application with appropriate classifications and specimen requirements.",
      prompt: "You are a trademark attorney. Draft a trademark application for [Brand Name] covering [Goods/Services] including: proper classification, goods/services description, specimen requirements, use basis, and supporting documentation."
    },
    {
      id: 108,
      title: "Review a trademark application for compliance with jurisdictional requirements",
      description: "Assess trademark application completeness and compliance.",
      category: "IP management",
      expectedResult: "A compliance review with recommendations for application improvement.",
      prompt: "You are a trademark examination specialist. Review [Trademark Application] for compliance including: classification accuracy, description adequacy, specimen sufficiency, use requirements, formality compliance, and improvement recommendations."
    },
    {
      id: 109,
      title: "Search for similar trademarks in a given jurisdiction",
      description: "Conduct comprehensive trademark search for conflict analysis.",
      category: "IP management",
      expectedResult: "A trademark search report with conflict analysis and registration prospects.",
      prompt: "You are a trademark search attorney. Search for similar marks to [Proposed Mark] in [Jurisdiction] including: identical mark search, phonetic similarities, visual similarities, likelihood of confusion analysis, and registration recommendations."
    },
    {
      id: 110,
      title: "Draft an office action response for a trademark refusal",
      description: "Prepare comprehensive response to trademark office objections.",
      category: "IP management",
      expectedResult: "A persuasive office action response addressing all refusal grounds.",
      prompt: "You are a trademark prosecution attorney. Draft a response to [Office Action] addressing [Refusal Grounds] including: legal arguments, evidence submission, claim amendments if applicable, case law citations, and compliance with response requirements."
    },
    {
      id: 111,
      title: "Create a trademark monitoring strategy",
      description: "Develop comprehensive brand monitoring and enforcement strategy.",
      category: "IP management",
      expectedResult: "A systematic monitoring plan with detection and enforcement procedures.",
      prompt: "You are a brand protection specialist. Create a trademark monitoring strategy for [Brand Portfolio] including: monitoring scope, detection methods, alert systems, enforcement procedures, budget considerations, and international coverage."
    },
    {
      id: 112,
      title: "Analyze copyright ownership for collaborative works",
      description: "Determine copyright ownership in joint or collaborative creative works.",
      category: "IP management",
      expectedResult: "A copyright ownership analysis with recommendations for documentation and protection.",
      prompt: "You are a copyright attorney. Analyze copyright ownership for [Collaborative Work] including: authorship determination, joint work analysis, work-for-hire considerations, ownership documentation, and licensing requirements."
    },
    {
      id: 113,
      title: "Draft copyright registration application",
      description: "Prepare copyright registration for creative works and software.",
      category: "IP management",
      expectedResult: "A complete copyright registration application with proper classification and deposit materials.",
      prompt: "You are a copyright registration specialist. Prepare copyright registration for [Work Type] including: application form completion, work classification, authorship information, deposit requirements, and registration strategy."
    },
    {
      id: 114,
      title: "Create trade secret protection audit",
      description: "Assess and improve trade secret identification and protection measures.",
      category: "IP management",
      expectedResult: "A comprehensive trade secret audit with protection enhancement recommendations.",
      prompt: "You are a trade secret consultant. Conduct a trade secret audit for [Company/Department] including: information classification, secrecy measures assessment, access controls, employee obligations, third-party protections, and improvement recommendations."
    },
    {
      id: 115,
      title: "Draft employee invention agreement",
      description: "Create comprehensive agreement for employee intellectual property assignments.",
      category: "IP management",
      expectedResult: "A legally sound invention assignment agreement with appropriate scope and obligations.",
      prompt: "You are an employment IP attorney. Draft an employee invention agreement including: assignment scope, invention disclosure obligations, cooperation requirements, moral rights waiver, compensation provisions, and post-employment obligations."
    },
    {
      id: 116,
      title: "Analyze IP licensing revenue optimization",
      description: "Review and optimize intellectual property licensing revenue streams.",
      category: "IP management",
      expectedResult: "A revenue optimization analysis with licensing strategy recommendations.",
      prompt: "You are an IP commercialization expert. Analyze IP licensing revenue for [Portfolio] including: current licensing performance, market analysis, royalty benchmarking, licensing opportunity identification, and revenue optimization strategies."
    },
    {
      id: 117,
      title: "Create IP dispute resolution strategy",
      description: "Develop comprehensive strategy for resolving IP conflicts and disputes.",
      category: "IP management",
      expectedResult: "A dispute resolution plan with negotiation, mediation, and litigation alternatives.",
      prompt: "You are an IP dispute resolution specialist. Create a dispute strategy for [IP Conflict] including: strength assessment, settlement options, alternative dispute resolution, litigation risks, cost-benefit analysis, and recommended approach."
    },
    {
      id: 118,
      title: "Draft joint IP development agreement",
      description: "Create agreement for collaborative intellectual property development.",
      category: "IP management",
      expectedResult: "A comprehensive joint development agreement with IP ownership and commercialization terms.",
      prompt: "You are a joint venture IP attorney. Draft a joint IP development agreement for [Project] including: contribution allocation, ownership structure, commercialization rights, improvement ownership, confidentiality provisions, and exit procedures."
    },
    {
      id: 119,
      title: "Analyze IP portfolio gaps and opportunities",
      description: "Assess intellectual property portfolio for strategic gaps and expansion opportunities.",
      category: "IP management",
      expectedResult: "A portfolio gap analysis with strategic filing and acquisition recommendations.",
      prompt: "You are an IP portfolio strategist. Analyze [IP Portfolio] for gaps and opportunities including: competitive landscape analysis, white space identification, strategic filing priorities, acquisition targets, and budget allocation recommendations."
    },
    {
      id: 120,
      title: "Create IP enforcement budget and strategy",
      description: "Develop cost-effective enforcement strategy for intellectual property protection.",
      category: "IP management",
      expectedResult: "An enforcement strategy with budget allocation and priority-based approach.",
      prompt: "You are an IP enforcement strategist. Create an enforcement strategy for [IP Rights] including: priority ranking, budget allocation, enforcement mechanisms, success metrics, risk assessment, and resource planning."
    },
    {
      id: 121,
      title: "Draft domain name dispute response",
      description: "Prepare response to domain name disputes and UDRP proceedings.",
      category: "IP management",
      expectedResult: "A comprehensive dispute response with legal arguments and supporting evidence.",
      prompt: "You are a domain name dispute attorney. Draft a response to [Domain Dispute] including: trademark rights analysis, legitimate interest arguments, bad faith assessment, procedural compliance, and supporting evidence compilation."
    },
    {
      id: 122,
      title: "Create IP insurance assessment",
      description: "Evaluate intellectual property insurance needs and coverage options.",
      category: "IP management",
      expectedResult: "An IP insurance analysis with coverage recommendations and risk mitigation strategies.",
      prompt: "You are an IP insurance specialist. Assess IP insurance needs for [Company/Portfolio] including: coverage types analysis, risk assessment, policy comparison, cost-benefit evaluation, and coverage recommendations."
    },
    {
      id: 123,
      title: "Analyze IP tax implications",
      description: "Review tax considerations for intellectual property transactions and structures.",
      category: "IP management",
      expectedResult: "A tax analysis with optimization strategies for IP structures and transactions.",
      prompt: "You are an IP tax specialist. Analyze tax implications for [IP Transaction/Structure] including: transfer pricing considerations, tax optimization strategies, international tax issues, valuation requirements, and compliance obligations."
    },
    {
      id: 124,
      title: "Draft IP opinion letter",
      description: "Prepare formal intellectual property opinion for business decisions.",
      category: "IP management",
      expectedResult: "A professional IP opinion with legal analysis and business recommendations.",
      prompt: "You are an IP opinion attorney. Draft an IP opinion for [Legal Question] including: relevant law analysis, fact application, risk assessment, alternative approaches, and business recommendations with appropriate disclaimers."
    },
    {
      id: 125,
      title: "Create international IP filing strategy",
      description: "Develop global intellectual property filing and prosecution strategy.",
      category: "IP management",
      expectedResult: "An international IP strategy with jurisdiction priorities and filing timelines.",
      prompt: "You are an international IP strategist. Create a global filing strategy for [IP Assets] including: jurisdiction prioritization, filing timeline, cost optimization, prosecution strategy, and international treaty utilization."
    },
    {
      id: 126,
      title: "Analyze data protection compliance requirements",
      description: "Assess compliance with GDPR, CCPA, and other privacy regulations.",
      category: "Compliance & Regulatory",
      expectedResult: "A comprehensive privacy compliance audit with remediation recommendations.",
      prompt: "You are a data privacy compliance expert. Analyze compliance with [Privacy Regulations] including: data mapping, legal basis assessment, consent mechanisms, data subject rights, security measures, breach procedures, and compliance gaps."
    },
    {
      id: 127,
      title: "Draft privacy policy for website and mobile app",
      description: "Create comprehensive privacy policy meeting regulatory requirements.",
      category: "Compliance & Regulatory",
      expectedResult: "A legally compliant privacy policy with clear user disclosures and rights information.",
      prompt: "You are a privacy policy specialist. Draft a privacy policy for [Website/App] including: data collection disclosures, usage purposes, sharing practices, user rights, security measures, retention periods, and regulatory compliance statements."
    },
    {
      id: 128,
      title: "Create GDPR compliance checklist",
      description: "Develop systematic checklist for GDPR compliance assessment and implementation.",
      category: "Compliance & Regulatory",
      expectedResult: "A comprehensive GDPR checklist with implementation priorities and timelines.",
      prompt: "You are a GDPR compliance consultant. Create a GDPR compliance checklist including: lawful basis identification, consent management, data mapping, privacy impact assessments, data subject rights procedures, and breach notification protocols."
    },
    {
      id: 129,
      title: "Analyze anti-corruption compliance program",
      description: "Review and assess anti-bribery and corruption compliance measures.",
      category: "Compliance & Regulatory",
      expectedResult: "A compliance program assessment with risk mitigation and enhancement recommendations.",
      prompt: "You are an anti-corruption compliance expert. Analyze [Compliance Program] for FCPA/UK Bribery Act compliance including: policy effectiveness, training programs, due diligence procedures, monitoring systems, and improvement recommendations."
    },
    {
      id: 130,
      title: "Draft employee code of conduct",
      description: "Create comprehensive code of conduct for employee behavior and compliance.",
      category: "Compliance & Regulatory",
      expectedResult: "A clear code of conduct with behavioral standards and reporting procedures.",
      prompt: "You are a corporate compliance officer. Draft an employee code of conduct including: ethical standards, conflict of interest policies, reporting procedures, disciplinary measures, regulatory compliance requirements, and training obligations."
    },
    {
      id: 131,
      title: "Create third-party due diligence procedures",
      description: "Establish comprehensive due diligence process for vendors and partners.",
      category: "Compliance & Regulatory",
      expectedResult: "A systematic due diligence framework with risk assessment and ongoing monitoring.",
      prompt: "You are a third-party risk specialist. Create due diligence procedures for [Vendor/Partner Types] including: risk assessment criteria, background checks, compliance certifications, ongoing monitoring, and remediation procedures."
    },
    {
      id: 132,
      title: "Analyze export control compliance",
      description: "Review export control obligations and compliance measures for international business.",
      category: "Compliance & Regulatory",
      expectedResult: "An export control compliance analysis with licensing requirements and risk mitigation.",
      prompt: "You are an export control specialist. Analyze export control compliance for [Products/Technology] including: classification determination, licensing requirements, restricted party screening, compliance procedures, and violation prevention measures."
    },
    {
      id: 133,
      title: "Draft incident response plan",
      description: "Create comprehensive plan for responding to compliance incidents and breaches.",
      category: "Compliance & Regulatory",
      expectedResult: "A detailed incident response plan with escalation procedures and communication protocols.",
      prompt: "You are a compliance incident specialist. Draft an incident response plan including: incident identification, escalation procedures, investigation protocols, regulatory notification requirements, remediation measures, and lessons learned processes."
    },
    {
      id: 134,
      title: "Create sanctions compliance program",
      description: "Develop comprehensive sanctions screening and compliance procedures.",
      category: "Compliance & Regulatory",
      expectedResult: "A sanctions compliance program with screening procedures and monitoring systems.",
      prompt: "You are a sanctions compliance expert. Create a sanctions compliance program including: screening procedures, watchlist management, transaction monitoring, escalation protocols, training requirements, and audit procedures."
    },
    {
      id: 135,
      title: "Analyze environmental compliance requirements",
      description: "Assess environmental regulatory compliance for business operations.",
      category: "Compliance & Regulatory",
      expectedResult: "An environmental compliance audit with regulatory requirements and improvement recommendations.",
      prompt: "You are an environmental compliance specialist. Analyze environmental compliance for [Operations/Industry] including: regulatory requirements, permit obligations, reporting duties, waste management, emission controls, and compliance improvements."
    },
    {
      id: 136,
      title: "Draft whistleblower policy and procedures",
      description: "Create comprehensive whistleblower protection and reporting system.",
      category: "Compliance & Regulatory",
      expectedResult: "A whistleblower policy with secure reporting mechanisms and protection procedures.",
      prompt: "You are a corporate governance expert. Draft a whistleblower policy including: reporting channels, anonymity protection, investigation procedures, retaliation prevention, escalation protocols, and communication guidelines."
    },
    {
      id: 137,
      title: "Create regulatory change management process",
      description: "Establish systematic process for tracking and implementing regulatory changes.",
      category: "Compliance & Regulatory",
      expectedResult: "A change management framework with monitoring, assessment, and implementation procedures.",
      prompt: "You are a regulatory change specialist. Create a change management process including: regulatory monitoring, impact assessment, implementation planning, stakeholder communication, training updates, and compliance verification."
    },
    {
      id: 138,
      title: "Analyze healthcare compliance requirements",
      description: "Review HIPAA, FDA, and other healthcare regulatory compliance obligations.",
      category: "Compliance & Regulatory",
      expectedResult: "A healthcare compliance assessment with regulatory requirements and implementation guidance.",
      prompt: "You are a healthcare compliance expert. Analyze compliance requirements for [Healthcare Organization/Product] including: HIPAA obligations, FDA regulations, state requirements, patient safety measures, and compliance monitoring."
    },
    {
      id: 139,
      title: "Draft compliance training program",
      description: "Create comprehensive compliance training curriculum for employees.",
      category: "Compliance & Regulatory",
      expectedResult: "A structured training program with materials, assessments, and effectiveness measurements.",
      prompt: "You are a compliance training specialist. Create a training program for [Compliance Area] including: learning objectives, training materials, delivery methods, assessment criteria, tracking systems, and effectiveness measurement."
    },
    {
      id: 140,
      title: "Create vendor compliance monitoring system",
      description: "Establish ongoing monitoring system for vendor compliance and performance.",
      category: "Compliance & Regulatory",
      expectedResult: "A vendor monitoring framework with performance metrics and remediation procedures.",
      prompt: "You are a vendor compliance manager. Create a monitoring system for vendor compliance including: performance metrics, monitoring frequency, reporting requirements, escalation procedures, and corrective action protocols."
    },
    {
      id: 141,
      title: "Analyze financial services compliance",
      description: "Review banking, securities, and financial services regulatory compliance.",
      category: "Compliance & Regulatory",
      expectedResult: "A financial services compliance analysis with regulatory requirements and risk mitigation.",
      prompt: "You are a financial services compliance expert. Analyze compliance for [Financial Service/Product] including: regulatory requirements, licensing obligations, consumer protection, anti-money laundering, and supervisory expectations."
    },
    {
      id: 142,
      title: "Draft compliance audit procedures",
      description: "Create systematic procedures for conducting compliance audits and assessments.",
      category: "Compliance & Regulatory",
      expectedResult: "A comprehensive audit framework with testing procedures and reporting standards.",
      prompt: "You are a compliance audit specialist. Draft audit procedures for [Compliance Area] including: audit scope, testing methodologies, sampling procedures, documentation requirements, findings evaluation, and reporting standards."
    },
    {
      id: 143,
      title: "Create cybersecurity compliance framework",
      description: "Develop cybersecurity compliance program meeting regulatory and industry standards.",
      category: "Compliance & Regulatory",
      expectedResult: "A cybersecurity compliance framework with controls, monitoring, and incident response.",
      prompt: "You are a cybersecurity compliance expert. Create a compliance framework including: security controls, risk assessment, monitoring procedures, incident response, regulatory reporting, and continuous improvement processes."
    },
    {
      id: 144,
      title: "Analyze employment law compliance",
      description: "Review workplace compliance with employment laws and regulations.",
      category: "Compliance & Regulatory",
      expectedResult: "An employment compliance audit with policy recommendations and risk mitigation.",
      prompt: "You are an employment law compliance specialist. Analyze workplace compliance including: anti-discrimination policies, wage and hour compliance, safety requirements, family leave obligations, and workplace accommodations."
    },
    {
      id: 145,
      title: "Draft regulatory filing procedures",
      description: "Create systematic procedures for required regulatory filings and submissions.",
      category: "Compliance & Regulatory",
      expectedResult: "A filing procedures manual with timelines, responsibilities, and quality controls.",
      prompt: "You are a regulatory filing specialist. Draft filing procedures for [Regulatory Requirements] including: filing calendars, preparation responsibilities, review processes, submission procedures, and follow-up requirements."
    },
    {
      id: 146,
      title: "Create compliance risk assessment matrix",
      description: "Develop systematic approach for identifying and evaluating compliance risks.",
      category: "Compliance & Regulatory",
      expectedResult: "A risk assessment framework with prioritization criteria and mitigation strategies.",
      prompt: "You are a compliance risk analyst. Create a risk assessment matrix including: risk identification, probability assessment, impact evaluation, risk scoring, mitigation strategies, and monitoring procedures."
    },
    {
      id: 147,
      title: "Analyze industry-specific compliance requirements",
      description: "Review specialized compliance obligations for specific industries or sectors.",
      category: "Compliance & Regulatory",
      expectedResult: "An industry compliance guide with sector-specific requirements and best practices.",
      prompt: "You are an industry compliance expert. Analyze compliance requirements for [Industry/Sector] including: regulatory landscape, licensing requirements, operational restrictions, reporting obligations, and industry best practices."
    },
    {
      id: 148,
      title: "Draft compliance communication strategy",
      description: "Create communication plan for compliance initiatives and requirements.",
      category: "Compliance & Regulatory",
      expectedResult: "A communication strategy with messaging, channels, and stakeholder engagement plans.",
      prompt: "You are a compliance communications specialist. Create a communication strategy for [Compliance Initiative] including: stakeholder mapping, key messages, communication channels, timing, feedback mechanisms, and effectiveness measurement."
    },
    {
      id: 149,
      title: "Create compliance performance metrics",
      description: "Establish key performance indicators for compliance program effectiveness.",
      category: "Compliance & Regulatory",
      expectedResult: "A metrics framework with KPIs, measurement procedures, and reporting dashboards.",
      prompt: "You are a compliance metrics specialist. Create performance metrics for [Compliance Program] including: KPI identification, measurement methodologies, data collection, reporting frequency, benchmarking, and improvement targets."
    },
    {
      id: 150,
      title: "Analyze regulatory enforcement trends",
      description: "Review enforcement patterns and trends for strategic compliance planning.",
      category: "Compliance & Regulatory",
      expectedResult: "An enforcement trend analysis with strategic recommendations for compliance priorities.",
      prompt: "You are a regulatory enforcement analyst. Analyze enforcement trends for [Regulatory Area] including: enforcement statistics, penalty trends, focus areas, compliance priorities, and strategic recommendations for risk mitigation."
    },
    {
      id: 151,
      title: "Draft compliance manual and procedures",
      description: "Create comprehensive compliance manual with policies and procedures.",
      category: "Compliance & Regulatory",
      expectedResult: "A complete compliance manual with policies, procedures, and implementation guidance.",
      prompt: "You are a compliance manual specialist. Draft a compliance manual for [Organization/Area] including: policy statements, procedures, responsibilities, training requirements, monitoring processes, and update procedures."
    },
    {
      id: 152,
      title: "Create regulatory relationship management strategy",
      description: "Develop strategy for managing relationships with regulatory authorities.",
      category: "Compliance & Regulatory",
      expectedResult: "A regulatory engagement strategy with communication protocols and relationship management.",
      prompt: "You are a regulatory affairs specialist. Create a regulatory relationship strategy including: stakeholder identification, engagement protocols, communication standards, issue escalation, relationship maintenance, and regulatory advocacy."
    },
    {
      id: 153,
      title: "Analyze compliance technology solutions",
      description: "Evaluate technology solutions for compliance monitoring and management.",
      category: "Compliance & Regulatory",
      expectedResult: "A technology assessment with solution recommendations and implementation planning.",
      prompt: "You are a compliance technology consultant. Analyze technology solutions for [Compliance Area] including: system requirements, vendor evaluation, cost-benefit analysis, implementation planning, and integration considerations."
    },
    {
      id: 154,
      title: "Draft compliance committee charter",
      description: "Create governance structure and charter for compliance oversight committee.",
      category: "Compliance & Regulatory",
      expectedResult: "A committee charter with responsibilities, procedures, and governance framework.",
      prompt: "You are a corporate governance specialist. Draft a compliance committee charter including: committee purpose, composition, responsibilities, meeting procedures, reporting requirements, and authority delegation."
    },
    {
      id: 155,
      title: "Create compliance budget and resource plan",
      description: "Develop comprehensive budget and resource allocation for compliance programs.",
      category: "Compliance & Regulatory",
      expectedResult: "A compliance budget with resource requirements and cost optimization strategies.",
      prompt: "You are a compliance resource planner. Create a budget and resource plan for [Compliance Program] including: resource requirements, cost estimation, budget allocation, efficiency opportunities, and resource optimization strategies."
    },
    {
      id: 156,
      title: "Analyze international compliance coordination",
      description: "Review multi-jurisdictional compliance requirements and coordination strategies.",
      category: "Compliance & Regulatory",
      expectedResult: "An international compliance framework with coordination procedures and local requirements.",
      prompt: "You are an international compliance coordinator. Analyze multi-jurisdictional compliance for [Global Operations] including: regulatory mapping, coordination procedures, local requirements, conflict resolution, and harmonization opportunities."
    },
    {
      id: 157,
      title: "Draft compliance certification procedures",
      description: "Create procedures for compliance certifications and attestations.",
      category: "Compliance & Regulatory",
      expectedResult: "A certification framework with procedures, standards, and verification processes.",
      prompt: "You are a compliance certification specialist. Draft certification procedures including: certification standards, evidence requirements, verification processes, sign-off procedures, and maintenance requirements."
    },
    {
      id: 158,
      title: "Create compliance innovation strategy",
      description: "Develop strategy for innovative compliance approaches and continuous improvement.",
      category: "Compliance & Regulatory",
      expectedResult: "An innovation strategy with improvement initiatives and modernization approaches.",
      prompt: "You are a compliance innovation strategist. Create an innovation strategy for [Compliance Function] including: improvement opportunities, technology adoption, process optimization, stakeholder engagement, and success measurement."
    },
    {
      id: 159,
      title: "Analyze regulatory impact assessment",
      description: "Conduct impact assessment for proposed regulatory changes on business operations.",
      category: "Compliance & Regulatory",
      expectedResult: "A regulatory impact analysis with business implications and adaptation strategies.",
      prompt: "You are a regulatory impact analyst. Assess the impact of [Proposed Regulation] including: operational implications, cost analysis, competitive effects, implementation requirements, and strategic response options."
    },
    {
      id: 160,
      title: "Create compliance culture assessment",
      description: "Evaluate and develop organizational compliance culture and ethical climate.",
      category: "Compliance & Regulatory",
      expectedResult: "A culture assessment with recommendations for strengthening compliance mindset and behavior.",
      prompt: "You are a compliance culture specialist. Assess compliance culture including: culture measurement, behavioral indicators, leadership influence, communication effectiveness, and culture enhancement strategies."
    },
    {
      id: 161,
      title: "Draft regulatory comment letter",
      description: "Prepare formal comment letter responding to proposed regulatory changes.",
      category: "Compliance & Regulatory",
      expectedResult: "A professional comment letter with legal analysis and business impact arguments.",
      prompt: "You are a regulatory advocacy attorney. Draft a comment letter for [Proposed Regulation] including: regulatory analysis, business impact assessment, legal arguments, alternative proposals, and industry perspective."
    },
    {
      id: 162,
      title: "Create compliance benchmarking study",
      description: "Conduct benchmarking analysis of compliance practices against industry standards.",
      category: "Compliance & Regulatory",
      expectedResult: "A benchmarking report with comparative analysis and improvement recommendations.",
      prompt: "You are a compliance benchmarking specialist. Conduct a benchmarking study for [Compliance Area] including: peer comparison, best practice identification, gap analysis, performance metrics, and improvement roadmap."
    },
    {
      id: 163,
      title: "Analyze compliance outsourcing strategy",
      description: "Evaluate options for outsourcing compliance functions and vendor management.",
      category: "Compliance & Regulatory",
      expectedResult: "An outsourcing strategy with vendor evaluation criteria and management procedures.",
      prompt: "You are a compliance outsourcing consultant. Analyze outsourcing options for [Compliance Functions] including: outsourcing viability, vendor selection criteria, service level agreements, cost analysis, and risk management."
    },
    {
      id: 164,
      title: "Create compliance crisis management plan",
      description: "Develop comprehensive plan for managing compliance crises and regulatory emergencies.",
      category: "Compliance & Regulatory",
      expectedResult: "A crisis management plan with response procedures and communication protocols.",
      prompt: "You are a compliance crisis specialist. Create a crisis management plan including: crisis identification, response team structure, communication protocols, stakeholder management, media strategy, and recovery procedures."
    },
    {
      id: 165,
      title: "Draft compliance data governance framework",
      description: "Create framework for managing compliance-related data and information.",
      category: "Compliance & Regulatory",
      expectedResult: "A data governance framework with quality standards, access controls, and retention policies.",
      prompt: "You are a compliance data governance expert. Create a data governance framework including: data quality standards, access controls, retention policies, privacy protection, audit trails, and data lifecycle management."
    },
    {
      id: 166,
      title: "Analyze compliance automation opportunities",
      description: "Identify and evaluate opportunities for automating compliance processes and controls.",
      category: "Compliance & Regulatory",
      expectedResult: "An automation roadmap with technology solutions and implementation priorities.",
      prompt: "You are a compliance automation specialist. Analyze automation opportunities including: process assessment, technology solutions, cost-benefit analysis, implementation planning, and change management requirements."
    },
    {
      id: 167,
      title: "Create compliance stakeholder engagement plan",
      description: "Develop comprehensive plan for engaging internal and external compliance stakeholders.",
      category: "Compliance & Regulatory",
      expectedResult: "A stakeholder engagement strategy with communication plans and relationship management.",
      prompt: "You are a compliance stakeholder specialist. Create an engagement plan including: stakeholder mapping, communication strategies, engagement methods, feedback mechanisms, and relationship maintenance procedures."
    },
    {
      id: 168,
      title: "Draft compliance policy management framework",
      description: "Create systematic framework for developing, updating, and managing compliance policies.",
      category: "Compliance & Regulatory",
      expectedResult: "A policy management framework with development procedures and lifecycle management.",
      prompt: "You are a compliance policy specialist. Create a policy management framework including: development procedures, approval processes, update cycles, communication methods, training integration, and effectiveness measurement."
    },
    {
      id: 169,
      title: "Analyze compliance reporting automation",
      description: "Evaluate opportunities for automating compliance reporting and regulatory submissions.",
      category: "Compliance & Regulatory",
      expectedResult: "A reporting automation strategy with technology recommendations and implementation planning.",
      prompt: "You are a compliance reporting specialist. Analyze reporting automation opportunities including: reporting requirements, automation potential, technology solutions, data integration, and quality assurance procedures."
    },
    {
      id: 170,
      title: "Create compliance knowledge management system",
      description: "Develop system for capturing, organizing, and sharing compliance knowledge and expertise.",
      category: "Compliance & Regulatory",
      expectedResult: "A knowledge management framework with content organization and sharing mechanisms.",
      prompt: "You are a compliance knowledge specialist. Create a knowledge management system including: content categorization, expert identification, knowledge capture, sharing mechanisms, and continuous updating procedures."
    },
    {
      id: 171,
      title: "Draft compliance quality assurance program",
      description: "Create quality assurance program for compliance processes and deliverables.",
      category: "Compliance & Regulatory",
      expectedResult: "A quality assurance framework with standards, testing procedures, and improvement processes.",
      prompt: "You are a compliance quality specialist. Create a quality assurance program including: quality standards, testing procedures, error detection, corrective actions, and continuous improvement processes."
    },
    {
      id: 172,
      title: "Analyze compliance vendor management",
      description: "Review and optimize vendor management for compliance-related services and solutions.",
      category: "Compliance & Regulatory",
      expectedResult: "A vendor management strategy with selection criteria, performance monitoring, and relationship optimization.",
      prompt: "You are a compliance vendor specialist. Analyze vendor management including: vendor selection, performance monitoring, service level management, cost optimization, and relationship enhancement strategies."
    },
    {
      id: 173,
      title: "Create compliance succession planning",
      description: "Develop succession planning for key compliance roles and expertise retention.",
      category: "Compliance & Regulatory",
      expectedResult: "A succession planning framework with talent development and knowledge transfer procedures.",
      prompt: "You are a compliance talent specialist. Create succession planning including: key role identification, talent assessment, development planning, knowledge transfer, and continuity assurance procedures."
    },
    {
      id: 174,
      title: "Draft compliance performance evaluation system",
      description: "Create systematic approach for evaluating compliance function performance and effectiveness.",
      category: "Compliance & Regulatory",
      expectedResult: "A performance evaluation framework with metrics, assessment procedures, and improvement planning.",
      prompt: "You are a compliance performance specialist. Create an evaluation system including: performance metrics, assessment methods, benchmarking procedures, improvement planning, and stakeholder feedback integration."
    },
    {
      id: 175,
      title: "Create compliance strategic planning framework",
      description: "Develop strategic planning process for long-term compliance program development.",
      category: "Compliance & Regulatory",
      expectedResult: "A strategic planning framework with vision development, goal setting, and execution planning.",
      prompt: "You are a compliance strategy specialist. Create a strategic planning framework including: vision development, environmental analysis, goal setting, strategy formulation, execution planning, and progress monitoring."
    },
    {
        id: 176,
        title: "Create compliance scorecard system",
        description: "Develop systematic scorecard for measuring compliance program effectiveness.",
        category: "Compliance & Regulatory",
        expectedResult: "A compliance scorecard with KPIs, measurement criteria, and performance tracking.",
        prompt: "You are a compliance measurement specialist. Create a scorecard system including: performance indicators, measurement criteria, scoring methodology, reporting frequency, benchmarking standards, and improvement tracking."
      },
      {
        id: 177,
        title: "Draft regulatory exemption application",
        description: "Prepare application for regulatory exemptions or waivers from compliance requirements.",
        category: "Compliance & Regulatory",
        expectedResult: "A comprehensive exemption application with justification and supporting documentation.",
        prompt: "You are a regulatory exemption specialist. Draft exemption application for [Regulatory Requirement] including: exemption basis, business justification, alternative compliance measures, risk mitigation, and supporting documentation."
      },
      {
        id: 178,
        title: "Create compliance incident tracking system",
        description: "Establish system for tracking, investigating, and resolving compliance incidents.",
        category: "Compliance & Regulatory",
        expectedResult: "An incident tracking framework with investigation procedures and resolution protocols.",
        prompt: "You are a compliance incident specialist. Create tracking system including: incident classification, investigation procedures, escalation protocols, resolution tracking, trend analysis, and preventive measures."
      },
      {
        id: 179,
        title: "Analyze compliance costs and ROI",
        description: "Evaluate compliance program costs and return on investment analysis.",
        category: "Compliance & Regulatory",
        expectedResult: "A compliance cost analysis with ROI calculation and optimization recommendations.",
        prompt: "You are a compliance economics specialist. Analyze compliance costs including: direct costs, indirect costs, opportunity costs, benefit quantification, ROI calculation, and cost optimization strategies."
      },
      {
        id: 180,
        title: "Create compliance maturity assessment",
        description: "Develop framework for assessing compliance program maturity and sophistication.",
        category: "Compliance & Regulatory",
        expectedResult: "A maturity assessment model with capability levels and improvement roadmap.",
        prompt: "You are a compliance maturity specialist. Create assessment framework including: maturity levels, capability dimensions, assessment criteria, gap analysis, and advancement roadmap."
      },
      {
        id: 181,
        title: "Draft compliance legal privilege strategy",
        description: "Develop strategy for protecting compliance communications under legal privilege.",
        category: "Compliance & Regulatory",
        expectedResult: "A privilege protection strategy with communication protocols and documentation guidelines.",
        prompt: "You are a compliance privilege specialist. Create privilege strategy including: privilege requirements, communication protocols, documentation guidelines, investigation procedures, and privilege preservation."
      },
      {
        id: 182,
        title: "Create regulatory sandbox application",
        description: "Prepare application for regulatory sandbox programs to test innovative solutions.",
        category: "Compliance & Regulatory",
        expectedResult: "A sandbox application with innovation description and regulatory engagement plan.",
        prompt: "You are a regulatory innovation specialist. Create sandbox application for [Innovation] including: solution description, regulatory challenges, testing framework, risk mitigation, and regulatory engagement plan."
      },
      {
        id: 183,
        title: "Analyze cross-functional compliance coordination",
        description: "Review coordination mechanisms between compliance and other business functions.",
        category: "Compliance & Regulatory",
        expectedResult: "A coordination framework with integration strategies and communication protocols.",
        prompt: "You are a compliance coordination specialist. Analyze cross-functional coordination including: integration points, communication protocols, responsibility allocation, escalation procedures, and coordination optimization."
      },
      {
        id: 184,
        title: "Create compliance data analytics program",
        description: "Develop data analytics program for compliance monitoring and predictive analysis.",
        category: "Compliance & Regulatory",
        expectedResult: "An analytics program with data sources, analysis methods, and predictive capabilities.",
        prompt: "You are a compliance analytics specialist. Create analytics program including: data sources, analysis methodologies, predictive modeling, anomaly detection, reporting dashboards, and actionable insights."
      },
      {
        id: 185,
        title: "Draft compliance officer job description",
        description: "Create comprehensive job description for compliance officer positions.",
        category: "Compliance & Regulatory",
        expectedResult: "A detailed job description with qualifications, responsibilities, and performance metrics.",
        prompt: "You are a compliance recruitment specialist. Draft job description for [Compliance Role] including: role purpose, key responsibilities, qualification requirements, performance metrics, and career development path."
      },
      {
        id: 186,
        title: "Create compliance calendar and scheduling system",
        description: "Establish systematic calendar for compliance deadlines and recurring obligations.",
        category: "Compliance & Regulatory",
        expectedResult: "A compliance calendar with deadline tracking and automated reminder systems.",
        prompt: "You are a compliance scheduling specialist. Create calendar system including: deadline identification, scheduling procedures, reminder systems, escalation protocols, and completion tracking."
      },
      {
        id: 187,
        title: "Analyze compliance organizational structure",
        description: "Review optimal organizational structure for compliance function and reporting relationships.",
        category: "Compliance & Regulatory",
        expectedResult: "An organizational analysis with structure recommendations and reporting optimization.",
        prompt: "You are a compliance organization specialist. Analyze organizational structure including: reporting relationships, functional alignment, independence requirements, resource allocation, and structural optimization."
      },
      {
        id: 188,
        title: "Create compliance contract management procedures",
        description: "Establish procedures for compliance review of contracts and vendor agreements.",
        category: "Compliance & Regulatory",
        expectedResult: "Contract compliance procedures with review criteria and approval workflows.",
        prompt: "You are a compliance contract specialist. Create contract procedures including: review criteria, compliance checkpoints, approval workflows, monitoring requirements, and contract compliance tracking."
      },
      {
        id: 189,
        title: "Draft compliance board reporting framework",
        description: "Create framework for compliance reporting to board of directors and committees.",
        category: "Compliance & Regulatory",
        expectedResult: "A board reporting framework with content standards and presentation guidelines.",
        prompt: "You are a compliance governance specialist. Create board reporting framework including: reporting content, frequency, presentation format, key metrics, escalation criteria, and board engagement protocols."
      },
      {
        id: 190,
        title: "Create compliance emergency response procedures",
        description: "Establish emergency response procedures for urgent compliance situations.",
        category: "Compliance & Regulatory",
        expectedResult: "Emergency response procedures with rapid response protocols and decision frameworks.",
        prompt: "You are a compliance emergency specialist. Create response procedures including: emergency classification, response teams, escalation protocols, decision authority, communication procedures, and recovery planning."
      },
      {
        id: 191,
        title: "Analyze compliance cultural integration",
        description: "Review integration of compliance culture throughout organizational operations.",
        category: "Compliance & Regulatory",
        expectedResult: "A cultural integration analysis with enhancement strategies and measurement methods.",
        prompt: "You are a compliance culture specialist. Analyze cultural integration including: culture assessment, integration barriers, enhancement strategies, leadership influence, and culture measurement methods."
      },
      {
        id: 192,
        title: "Create compliance documentation retention policy",
        description: "Establish comprehensive policy for compliance document retention and disposal.",
        category: "Compliance & Regulatory",
        expectedResult: "A documentation policy with retention schedules and disposal procedures.",
        prompt: "You are a compliance documentation specialist. Create retention policy including: document categories, retention periods, storage requirements, disposal procedures, and legal hold protocols."
      },
      {
        id: 193,
        title: "Draft compliance advisory opinion process",
        description: "Create process for providing compliance advisory opinions to business units.",
        category: "Compliance & Regulatory",
        expectedResult: "An advisory process with request procedures and opinion documentation standards.",
        prompt: "You are a compliance advisory specialist. Create advisory process including: request procedures, analysis methodology, opinion format, documentation requirements, and follow-up protocols."
      },
      {
        id: 194,
        title: "Create compliance certification tracking system",
        description: "Establish system for tracking employee compliance certifications and renewals.",
        category: "Compliance & Regulatory",
        expectedResult: "A certification tracking system with renewal monitoring and compliance verification.",
        prompt: "You are a compliance certification specialist. Create tracking system including: certification requirements, tracking methodology, renewal procedures, compliance verification, and reporting capabilities."
      },
      {
        id: 195,
        title: "Analyze compliance effectiveness measurement",
        description: "Develop methods for measuring compliance program effectiveness and outcomes.",
        category: "Compliance & Regulatory",
        expectedResult: "An effectiveness measurement framework with metrics and evaluation methodologies.",
        prompt: "You are a compliance effectiveness specialist. Create measurement framework including: effectiveness indicators, measurement methodologies, data collection, analysis procedures, and improvement identification."
      },
      {
        id: 196,
        title: "Create compliance partnership management",
        description: "Establish framework for managing compliance aspects of business partnerships.",
        category: "Compliance & Regulatory",
        expectedResult: "A partnership compliance framework with due diligence and monitoring procedures.",
        prompt: "You are a compliance partnership specialist. Create management framework including: partner due diligence, compliance requirements, monitoring procedures, issue resolution, and relationship management."
      },
      {
        id: 197,
        title: "Draft compliance competitive intelligence guidelines",
        description: "Create guidelines for ethical competitive intelligence gathering and compliance.",
        category: "Compliance & Regulatory",
        expectedResult: "Competitive intelligence guidelines with ethical boundaries and compliance requirements.",
        prompt: "You are a compliance intelligence specialist. Create guidelines including: ethical boundaries, information sources, gathering methods, compliance requirements, and legal limitations."
      },
      {
        id: 198,
        title: "Create compliance merger integration procedures",
        description: "Establish procedures for compliance integration during mergers and acquisitions.",
        category: "Compliance & Regulatory",
        expectedResult: "Integration procedures with compliance harmonization and risk management protocols.",
        prompt: "You are a compliance integration specialist. Create integration procedures including: compliance assessment, harmonization planning, risk identification, integration timeline, and monitoring procedures."
      },
      {
        id: 199,
        title: "Analyze compliance regulatory relationship optimization",
        description: "Review and optimize relationships with regulatory authorities and agencies.",
        category: "Compliance & Regulatory",
        expectedResult: "A relationship optimization strategy with engagement protocols and communication enhancement.",
        prompt: "You are a regulatory relationship specialist. Analyze relationship optimization including: stakeholder mapping, engagement strategies, communication protocols, relationship building, and regulatory advocacy."
      },
      {
        id: 200,
        title: "Create compliance future readiness assessment",
        description: "Assess compliance program readiness for future regulatory changes and challenges.",
        category: "Compliance & Regulatory",
        expectedResult: "A future readiness assessment with adaptability analysis and preparation strategies.",
        prompt: "You are a compliance futurist. Create readiness assessment including: trend analysis, regulatory predictions, adaptability evaluation, capability gaps, and preparation strategies for future compliance challenges."
      }
  ];
 
const part3Prompts = [
    {
      id: 201,
      title: "Draft a due diligence checklist for M&A transactions",
      description: "Create comprehensive checklist for merger and acquisition due diligence.",
      category: "Due Diligence",
      expectedResult: "A systematic M&A due diligence checklist with legal, financial, and operational review areas.",
      prompt: "You are an M&A attorney. Draft a comprehensive due diligence checklist for [Transaction Type] including: corporate structure review, material agreements analysis, litigation assessment, regulatory compliance, intellectual property audit, employment matters, environmental issues, and financial statement review."
    },
    {
      id: 202,
      title: "Draft a vendor due diligence checklist",
      description: "Create systematic checklist for evaluating potential vendors and suppliers.",
      category: "Due Diligence",
      expectedResult: "A comprehensive vendor assessment framework with risk evaluation criteria.",
      prompt: "You are a vendor risk specialist. Draft a vendor due diligence checklist including: financial stability assessment, legal compliance review, operational capabilities, security measures, insurance coverage, reference checks, and ongoing monitoring requirements."
    },
    {
      id: 203,
      title: "Draft an IP due diligence checklist for acquisitions",
      description: "Create intellectual property focused due diligence for acquisition transactions.",
      category: "Due Diligence",
      expectedResult: "A detailed IP due diligence framework with ownership verification and value assessment.",
      prompt: "You are an IP due diligence specialist. Draft an IP checklist for [Acquisition] including: patent portfolio analysis, trademark portfolio review, copyright ownership verification, trade secret identification, licensing agreements, infringement risks, and IP valuation considerations."
    },
    {
      id: 204,
      title: "Draft a litigation due diligence checklist",
      description: "Create checklist for assessing litigation risks and pending legal matters.",
      category: "Due Diligence",
      expectedResult: "A comprehensive litigation risk assessment framework with materiality analysis.",
      prompt: "You are a litigation due diligence expert. Draft a litigation checklist including: pending litigation review, threatened claims assessment, regulatory investigations, settlement agreements, insurance coverage, legal reserves, and potential liability evaluation."
    },
    {
      id: 205,
      title: "Draft a compliance due diligence checklist",
      description: "Create systematic review of regulatory compliance and risk factors.",
      category: "Due Diligence",
      expectedResult: "A compliance assessment framework with regulatory risk evaluation.",
      prompt: "You are a compliance due diligence specialist. Draft a compliance checklist including: regulatory license review, compliance program assessment, violation history, pending regulatory matters, policy adequacy, training programs, and remediation requirements."
    },
    {
      id: 206,
      title: "Draft a financial due diligence checklist for investors",
      description: "Create investor-focused financial and business due diligence framework.",
      category: "Due Diligence",
      expectedResult: "A comprehensive financial due diligence checklist with investment risk assessment.",
      prompt: "You are an investment due diligence analyst. Draft a financial checklist including: audited financials review, revenue recognition, cash flow analysis, debt obligations, contingent liabilities, management quality, market position, and growth prospects."
    },
    {
      id: 207,
      title: "Draft a data protection due diligence checklist",
      description: "Create privacy and data protection focused due diligence assessment.",
      category: "Due Diligence",
      expectedResult: "A data protection compliance framework with privacy risk evaluation.",
      prompt: "You are a data privacy due diligence expert. Draft a data protection checklist including: data mapping, consent mechanisms, privacy policies, cross-border transfers, breach incidents, regulatory compliance, data subject rights, and security measures."
    },
    {
      id: 208,
      title: "Draft an ESG due diligence checklist",
      description: "Create environmental, social, and governance due diligence framework.",
      category: "Due Diligence",
      expectedResult: "A comprehensive ESG assessment with sustainability and governance evaluation.",
      prompt: "You are an ESG due diligence specialist. Draft an ESG checklist including: environmental compliance, sustainability practices, social impact assessment, governance structure, board composition, executive compensation, stakeholder engagement, and ESG reporting."
    },
    {
      id: 209,
      title: "Draft a cybersecurity due diligence checklist",
      description: "Create comprehensive cybersecurity and information security assessment.",
      category: "Due Diligence",
      expectedResult: "A cybersecurity due diligence framework with security risk evaluation.",
      prompt: "You are a cybersecurity due diligence expert. Draft a cybersecurity checklist including: security policies, access controls, incident response, vulnerability management, third-party security, compliance certifications, and security breach history."
    },
    {
      id: 210,
      title: "Draft a real estate due diligence checklist",
      description: "Create comprehensive real estate transaction due diligence framework.",
      category: "Due Diligence",
      expectedResult: "A real estate due diligence checklist with property and legal risk assessment.",
      prompt: "You are a real estate due diligence attorney. Draft a real estate checklist including: title examination, survey review, environmental assessment, zoning compliance, lease analysis, property conditions, insurance coverage, and regulatory approvals."
    },
    {
      id: 211,
      title: "Create due diligence data room structure",
      description: "Design organized data room structure for efficient due diligence review.",
      category: "Due Diligence",
      expectedResult: "A systematic data room organization with document categories and access controls.",
      prompt: "You are a due diligence coordinator. Create a data room structure including: document categorization, folder organization, access permissions, version control, confidentiality levels, and user management procedures."
    },
    {
      id: 212,
      title: "Draft due diligence timeline and project plan",
      description: "Create detailed timeline and project management plan for due diligence process.",
      category: "Due Diligence",
      expectedResult: "A comprehensive project plan with milestones, responsibilities, and timeline coordination.",
      prompt: "You are a due diligence project manager. Create a project plan including: phase breakdown, milestone schedule, team responsibilities, resource allocation, risk factors, contingency planning, and progress tracking mechanisms."
    },
    {
      id: 213,
      title: "Analyze due diligence findings and risks",
      description: "Synthesize due diligence results into risk assessment and recommendations.",
      category: "Due Diligence",
      expectedResult: "A comprehensive risk analysis with materiality assessment and mitigation recommendations.",
      prompt: "You are a due diligence analyst. Analyze findings from [Due Diligence Review] including: risk categorization, materiality assessment, financial impact, deal implications, mitigation strategies, and recommendation summary."
    },
    {
      id: 214,
      title: "Create due diligence report template",
      description: "Design standardized template for due diligence reporting and findings presentation.",
      category: "Due Diligence",
      expectedResult: "A professional due diligence report template with executive summary and detailed findings.",
      prompt: "You are a due diligence reporting specialist. Create a report template including: executive summary, methodology, key findings, risk assessment, financial implications, recommendations, and appendices structure."
    },
    {
      id: 215,
      title: "Draft third-party due diligence procedures",
      description: "Create procedures for outsourcing due diligence to external providers.",
      category: "Due Diligence",
      expectedResult: "A framework for managing third-party due diligence with quality control and oversight.",
      prompt: "You are a due diligence outsourcing specialist. Draft procedures for third-party due diligence including: vendor selection, scope definition, quality standards, progress monitoring, deliverable review, and cost management."
    },
    {
      id: 216,
      title: "Create due diligence quality control process",
      description: "Establish quality assurance procedures for due diligence accuracy and completeness.",
      category: "Due Diligence",
      expectedResult: "A quality control framework with review procedures and accuracy verification.",
      prompt: "You are a due diligence quality manager. Create quality control procedures including: review standards, verification processes, error checking, documentation requirements, sign-off procedures, and continuous improvement measures."
    },
    {
      id: 217,
      title: "Analyze cross-border due diligence requirements",
      description: "Review international due diligence considerations for cross-border transactions.",
      category: "Due Diligence",
      expectedResult: "A cross-border due diligence framework with jurisdiction-specific requirements.",
      prompt: "You are an international due diligence expert. Analyze cross-border requirements including: jurisdictional considerations, regulatory differences, cultural factors, language requirements, local counsel coordination, and international compliance issues."
    },
    {
      id: 218,
      title: "Draft due diligence confidentiality procedures",
      description: "Create confidentiality and information security procedures for due diligence.",
      category: "Due Diligence",
      expectedResult: "A comprehensive confidentiality framework with information protection measures.",
      prompt: "You are a due diligence confidentiality specialist. Draft confidentiality procedures including: access controls, non-disclosure requirements, information handling, secure communication, document retention, and breach prevention measures."
    },
    {
      id: 219,
      title: "Create industry-specific due diligence framework",
      description: "Develop specialized due diligence approach for specific industries or sectors.",
      category: "Due Diligence",
      expectedResult: "An industry-tailored due diligence framework with sector-specific risk factors.",
      prompt: "You are an industry due diligence specialist. Create a framework for [Industry/Sector] including: industry-specific risks, regulatory requirements, market factors, operational considerations, competitive analysis, and specialized expertise requirements."
    },
    {
      id: 220,
      title: "Analyze due diligence technology and automation",
      description: "Evaluate technology solutions for streamlining due diligence processes.",
      category: "Due Diligence",
      expectedResult: "A technology assessment with automation recommendations and implementation guidance.",
      prompt: "You are a due diligence technology consultant. Analyze technology solutions including: automation opportunities, AI applications, document review tools, data analytics, workflow management, and technology integration requirements."
    },
    {
      id: 221,
      title: "Create due diligence training program",
      description: "Develop comprehensive training program for due diligence professionals.",
      category: "Due Diligence",
      expectedResult: "A structured training curriculum with practical exercises and assessment components.",
      prompt: "You are a due diligence training specialist. Create a training program including: core competencies, methodology training, industry knowledge, risk assessment skills, reporting techniques, and practical case studies."
    },
    {
      id: 222,
      title: "Draft due diligence cost management framework",
      description: "Create cost control and budget management system for due diligence projects.",
      category: "Due Diligence",
      expectedResult: "A cost management framework with budgeting and expense control procedures.",
      prompt: "You are a due diligence cost specialist. Create a cost management framework including: budget planning, cost tracking, expense approval, vendor management, cost optimization, and financial reporting procedures."
    },
    {
      id: 223,
      title: "Analyze due diligence best practices",
      description: "Review and document due diligence best practices and lessons learned.",
      category: "Due Diligence",
      expectedResult: "A best practices guide with methodology improvements and efficiency recommendations.",
      prompt: "You are a due diligence best practice specialist. Analyze best practices including: methodology optimization, efficiency improvements, quality enhancement, technology utilization, team management, and continuous improvement processes."
    },
    {
      id: 224,
      title: "Create due diligence risk rating system",
      description: "Develop systematic approach for rating and prioritizing due diligence risks.",
      category: "Due Diligence",
      expectedResult: "A risk rating framework with scoring methodology and prioritization criteria.",
      prompt: "You are a due diligence risk specialist. Create a risk rating system including: risk categories, scoring criteria, probability assessment, impact evaluation, risk prioritization, and mitigation planning procedures."
    },
    {
      id: 225,
      title: "Draft due diligence communication plan",
      description: "Create communication strategy for stakeholder engagement during due diligence.",
      category: "Due Diligence",
      expectedResult: "A communication plan with stakeholder mapping and engagement protocols.",
      prompt: "You are a due diligence communication specialist. Create a communication plan including: stakeholder identification, communication protocols, reporting schedules, escalation procedures, and information sharing guidelines."
    },
    {
      id: 226,
      title: "Create due diligence documentation standards",
      description: "Establish documentation standards and procedures for due diligence work papers.",
      category: "Due Diligence",
      expectedResult: "A documentation framework with standards, templates, and retention policies.",
      prompt: "You are a due diligence documentation specialist. Create documentation standards including: work paper requirements, documentation templates, review procedures, retention policies, and audit trail maintenance."
    },
    {
      id: 227,
      title: "Analyze due diligence team structure and roles",
      description: "Design optimal team structure and role definitions for due diligence projects.",
      category: "Due Diligence",
      expectedResult: "A team structure framework with role definitions and responsibility matrices.",
      prompt: "You are a due diligence team specialist. Analyze team structure including: role definitions, responsibility allocation, skill requirements, team coordination, leadership structure, and performance management."
    },
    {
      id: 228,
      title: "Create due diligence performance metrics",
      description: "Establish key performance indicators for due diligence process effectiveness.",
      category: "Due Diligence",
      expectedResult: "A performance measurement framework with KPIs and success metrics.",
      prompt: "You are a due diligence performance specialist. Create performance metrics including: efficiency indicators, quality measures, client satisfaction, timeliness metrics, cost effectiveness, and continuous improvement tracking."
    },
    {
      id: 229,
      title: "Draft due diligence vendor management procedures",
      description: "Create procedures for managing external vendors and specialists in due diligence.",
      category: "Due Diligence",
      expectedResult: "A vendor management framework with selection criteria and performance monitoring.",
      prompt: "You are a due diligence vendor specialist. Draft vendor management procedures including: vendor selection, service agreements, performance monitoring, quality control, cost management, and relationship optimization."
    },
    {
      id: 230,
      title: "Create due diligence knowledge management system",
      description: "Develop system for capturing and sharing due diligence knowledge and expertise.",
      category: "Due Diligence",
      expectedResult: "A knowledge management framework with information capture and sharing mechanisms.",
      prompt: "You are a due diligence knowledge specialist. Create a knowledge management system including: expertise capture, best practice documentation, lesson learned compilation, knowledge sharing, and continuous learning processes."
    },
    {
      id: 231,
      title: "Analyze due diligence insurance and liability issues",
      description: "Review insurance coverage and liability considerations for due diligence activities.",
      category: "Due Diligence",
      expectedResult: "An insurance and liability framework with risk mitigation and coverage recommendations.",
      prompt: "You are a due diligence insurance specialist. Analyze insurance issues including: professional liability coverage, errors and omissions protection, client indemnification, limitation of liability, insurance requirements, and risk transfer mechanisms."
    },
    {
      id: 232,
      title: "Create due diligence post-closing follow-up procedures",
      description: "Establish procedures for post-transaction monitoring and follow-up activities.",
      category: "Due Diligence",
      expectedResult: "A post-closing framework with monitoring procedures and issue resolution protocols.",
      prompt: "You are a post-closing specialist. Create follow-up procedures including: integration monitoring, issue tracking, warranty claims, indemnification matters, earnout provisions, and post-closing dispute resolution."
    },
    {
      id: 233,
      title: "Draft due diligence regulatory compliance procedures",
      description: "Create compliance procedures for due diligence activities and reporting requirements.",
      category: "Due Diligence",
      expectedResult: "A regulatory compliance framework with due diligence reporting and documentation requirements.",
      prompt: "You are a due diligence compliance specialist. Draft compliance procedures including: regulatory requirements, reporting obligations, documentation standards, confidentiality compliance, and regulatory interaction protocols."
    },
    {
      id: 234,
      title: "Create due diligence dispute resolution framework",
      description: "Establish procedures for resolving disputes arising during due diligence process.",
      category: "Due Diligence",
      expectedResult: "A dispute resolution framework with escalation procedures and resolution mechanisms.",
      prompt: "You are a due diligence dispute specialist. Create a dispute resolution framework including: dispute identification, escalation procedures, mediation options, expert determination, arbitration procedures, and litigation alternatives."
    },
    {
      id: 235,
      title: "Analyze due diligence environmental and sustainability factors",
      description: "Review environmental and sustainability considerations in due diligence assessment.",
      category: "Due Diligence",
      expectedResult: "An environmental due diligence framework with sustainability risk assessment.",
      prompt: "You are an environmental due diligence specialist. Analyze environmental factors including: environmental compliance, contamination risks, sustainability practices, climate change impact, regulatory requirements, and remediation obligations."
    },
    {
      id: 236,
      title: "Create due diligence technology infrastructure assessment",
      description: "Develop framework for evaluating target company's technology infrastructure and capabilities.",
      category: "Due Diligence",
      expectedResult: "A technology assessment framework with infrastructure evaluation and integration considerations.",
      prompt: "You are a technology due diligence specialist. Create an assessment framework including: system architecture, technology stack, cybersecurity measures, scalability, integration requirements, and technology debt evaluation."
    },
    {
      id: 237,
      title: "Draft due diligence cultural integration assessment",
      description: "Create framework for assessing cultural compatibility and integration challenges.",
      category: "Due Diligence",
      expectedResult: "A cultural assessment framework with integration planning and change management considerations.",
      prompt: "You are an organizational culture specialist. Draft a cultural assessment including: culture evaluation, compatibility analysis, integration challenges, change management requirements, communication strategies, and success factors."
    },
    {
      id: 238,
      title: "Create due diligence competitive intelligence framework",
      description: "Develop systematic approach for competitive analysis during due diligence.",
      category: "Due Diligence",
      expectedResult: "A competitive intelligence framework with market analysis and strategic positioning assessment.",
      prompt: "You are a competitive intelligence specialist. Create a framework including: market position analysis, competitive landscape, strategic advantages, market share evaluation, competitive threats, and differentiation factors."
    },
    {
      id: 239,
      title: "Analyze due diligence customer and market assessment",
      description: "Review customer base and market position as part of commercial due diligence.",
      category: "Due Diligence",
      expectedResult: "A commercial due diligence framework with customer analysis and market evaluation.",
      prompt: "You are a commercial due diligence specialist. Analyze customer and market factors including: customer concentration, retention rates, market dynamics, growth prospects, competitive position, and revenue sustainability."
    },
    {
      id: 240,
      title: "Create due diligence operational assessment framework",
      description: "Develop comprehensive framework for evaluating operational capabilities and efficiency.",
      category: "Due Diligence",
      expectedResult: "An operational due diligence framework with efficiency assessment and improvement opportunities.",
      prompt: "You are an operational due diligence specialist. Create an assessment framework including: operational efficiency, process optimization, cost structure, capacity utilization, supply chain analysis, and operational risk evaluation."
    },
    {
      id: 241,
      title: "Draft due diligence management team evaluation",
      description: "Create systematic approach for assessing management quality and capabilities.",
      category: "Due Diligence",
      expectedResult: "A management assessment framework with leadership evaluation and retention planning.",
      prompt: "You are a management assessment specialist. Draft an evaluation framework including: leadership capabilities, track record analysis, team depth, succession planning, retention strategies, and management development needs."
    },
    {
      id: 242,
      title: "Create due diligence financial modeling framework",
      description: "Develop financial modeling approach for due diligence valuation and analysis.",
      category: "Due Diligence",
      expectedResult: "A financial modeling framework with valuation methodologies and scenario analysis.",
      prompt: "You are a financial modeling specialist. Create a modeling framework including: valuation methodologies, cash flow projections, scenario analysis, sensitivity testing, assumptions validation, and model documentation standards."
    },
    {
      id: 243,
      title: "Analyze due diligence tax structuring considerations",
      description: "Review tax implications and structuring opportunities in transaction due diligence.",
      category: "Due Diligence",
      expectedResult: "A tax due diligence framework with structuring recommendations and optimization strategies.",
      prompt: "You are a tax due diligence specialist. Analyze tax considerations including: tax compliance review, structuring opportunities, tax optimization, international tax issues, transfer pricing, and post-transaction tax planning."
    },
    {
      id: 244,
      title: "Create due diligence integration planning framework",
      description: "Develop comprehensive framework for post-acquisition integration planning.",
      category: "Due Diligence",
      expectedResult: "An integration planning framework with workstreams, timelines, and success metrics.",
      prompt: "You are an integration planning specialist. Create a framework including: integration workstreams, timeline development, resource allocation, success metrics, risk mitigation, and stakeholder communication plans."
    },
    {
      id: 245,
      title: "Draft due diligence exit strategy assessment",
      description: "Create framework for evaluating exit strategies and value realization opportunities.",
      category: "Due Diligence",
      expectedResult: "An exit strategy framework with value creation and realization planning.",
      prompt: "You are an exit strategy specialist. Draft an assessment framework including: exit options analysis, value creation strategies, market timing, buyer identification, exit preparation, and value maximization techniques."
    },
    {
      id: 246,
      title: "Create due diligence benchmarking methodology",
      description: "Develop benchmarking approach for comparing targets against industry standards.",
      category: "Due Diligence",
      expectedResult: "A benchmarking methodology with peer comparison and performance evaluation.",
      prompt: "You are a benchmarking specialist. Create a methodology including: peer group identification, performance metrics, data sources, analysis techniques, gap identification, and improvement recommendations."
    },
    {
      id: 247,
      title: "Analyze due diligence partnership and alliance assessment",
      description: "Review strategic partnerships and alliances as part of due diligence evaluation.",
      category: "Due Diligence",
      expectedResult: "A partnership assessment framework with strategic value and relationship evaluation.",
      prompt: "You are a partnership assessment specialist. Analyze partnerships including: strategic value, relationship quality, contractual terms, dependency risks, partnership sustainability, and value creation opportunities."
    },
    {
      id: 248,
      title: "Create due diligence scenario planning framework",
      description: "Develop scenario planning approach for evaluating different transaction outcomes.",
      category: "Due Diligence",
      expectedResult: "A scenario planning framework with multiple outcome analysis and contingency planning.",
      prompt: "You are a scenario planning specialist. Create a framework including: scenario development, probability assessment, impact analysis, contingency planning, decision trees, and risk mitigation strategies."
    },
    {
      id: 249,
      title: "Draft due diligence stakeholder impact assessment",
      description: "Create framework for assessing transaction impact on all stakeholder groups.",
      category: "Due Diligence",
      expectedResult: "A stakeholder impact framework with analysis and engagement strategies.",
      prompt: "You are a stakeholder specialist. Draft an impact assessment including: stakeholder mapping, impact analysis, engagement strategies, communication planning, expectation management, and relationship preservation."
    },
    {
      id: 250,
      title: "Create due diligence value creation assessment",
      description: "Develop framework for identifying and quantifying value creation opportunities.",
      category: "Due Diligence",
      expectedResult: "A value creation framework with opportunity identification and realization planning.",
      prompt: "You are a value creation specialist. Create an assessment framework including: opportunity identification, value quantification, implementation planning, timeline development, resource requirements, and success measurement."
    },
    {
      id: 251,
      title: "Draft merger agreement for stock transaction",
      description: "Prepare comprehensive merger agreement for stock-based acquisition.",
      category: "Corporate Transactions",
      expectedResult: "A complete merger agreement with transaction structure, terms, and closing conditions.",
      prompt: "You are an M&A attorney. Draft a merger agreement for [Stock Transaction] including: transaction structure, consideration terms, representations and warranties, closing conditions, indemnification provisions, and post-closing adjustments."
    },
    {
      id: 252,
      title: "Create asset purchase agreement",
      description: "Prepare comprehensive asset purchase agreement with appropriate protections.",
      category: "Corporate Transactions",
      expectedResult: "A detailed asset purchase agreement with asset descriptions, liabilities, and transfer provisions.",
      prompt: "You are a transaction attorney. Draft an asset purchase agreement including: asset descriptions, purchase price allocation, assumed liabilities, excluded liabilities, closing conditions, and post-closing obligations."
    },
    {
      id: 253,
      title: "Draft stock purchase agreement",
      description: "Create stock purchase agreement for acquisition of company shares.",
      category: "Corporate Transactions",
      expectedResult: "A comprehensive stock purchase agreement with buyer protections and seller representations.",
      prompt: "You are a corporate acquisition attorney. Draft a stock purchase agreement including: share transfer provisions, purchase price terms, representations and warranties, closing conditions, escrow arrangements, and indemnification terms."
    },
    {
      id: 254,
      title: "Create joint venture agreement",
      description: "Draft comprehensive joint venture agreement for business collaboration.",
      category: "Corporate Transactions",
      expectedResult: "A detailed joint venture agreement with governance, contribution, and profit-sharing terms.",
      prompt: "You are a joint venture attorney. Draft a JV agreement including: business purpose, capital contributions, governance structure, profit and loss sharing, management provisions, exit mechanisms, and dispute resolution."
    },
    {
      id: 255,
      title: "Draft shareholder agreement",
      description: "Create comprehensive shareholder agreement with governance and transfer provisions.",
      category: "Corporate Transactions",
      expectedResult: "A detailed shareholder agreement with voting, transfer, and governance provisions.",
      prompt: "You are a corporate governance attorney. Draft a shareholder agreement including: voting agreements, transfer restrictions, tag-along rights, drag-along rights, board composition, and shareholder protection provisions."
    },
    {
      id: 256,
      title: "Create partnership agreement",
      description: "Draft comprehensive partnership agreement for business partnership formation.",
      category: "Corporate Transactions",
      expectedResult: "A complete partnership agreement with capital, management, and distribution provisions.",
      prompt: "You are a partnership attorney. Draft a partnership agreement including: partnership purpose, capital contributions, profit and loss allocation, management structure, partner duties, withdrawal provisions, and dissolution procedures."
    },
    {
      id: 257,
      title: "Draft LLC operating agreement",
      description: "Create comprehensive operating agreement for limited liability company.",
      category: "Corporate Transactions",
      expectedResult: "A detailed LLC operating agreement with member rights, management, and distribution provisions.",
      prompt: "You are an LLC formation attorney. Draft an operating agreement including: member rights and obligations, management structure, capital contributions, profit distributions, transfer restrictions, and dissolution procedures."
    },
    {
      id: 258,
      title: "Create subscription agreement for private placement",
      description: "Draft subscription agreement for private securities offering.",
      category: "Corporate Transactions",
      expectedResult: "A comprehensive subscription agreement with investor representations and securities terms.",
      prompt: "You are a securities attorney. Draft a subscription agreement for [Securities Offering] including: subscription terms, investor representations, purchase price, securities descriptions, and regulatory compliance provisions."
    },
    {
      id: 259,
      title: "Draft private placement memorandum",
      description: "Create comprehensive offering memorandum for private securities placement.",
      category: "Corporate Transactions",
      expectedResult: "A detailed offering memorandum with business description, risk factors, and terms.",
      prompt: "You are a securities offering attorney. Draft a private placement memorandum including: executive summary, business description, risk factors, financial information, management discussion, use of proceeds, and terms of offering."
    },
    {
      id: 260,
      title: "Create convertible note agreement",
      description: "Draft convertible note agreement for startup financing.",
      category: "Corporate Transactions",
      expectedResult: "A comprehensive convertible note with conversion terms and investor protections.",
      prompt: "You are a startup financing attorney. Draft a convertible note including: principal amount, interest rate, maturity date, conversion terms, valuation cap, discount rate, and investor protection provisions."
    },
    {
      id: 261,
      title: "Draft term sheet for venture capital investment",
      description: "Create venture capital term sheet outlining investment terms and conditions.",
      category: "Corporate Transactions",
      expectedResult: "A comprehensive term sheet with valuation, governance, and investor rights provisions.",
      prompt: "You are a venture capital attorney. Draft a term sheet including: valuation and pricing, liquidation preferences, anti-dilution provisions, board composition, protective provisions, and exit rights."
    },
    {
      id: 262,
      title: "Create stock option plan",
      description: "Draft comprehensive employee stock option plan with vesting and exercise provisions.",
      category: "Corporate Transactions",
      expectedResult: "A complete stock option plan with plan administration and participant provisions.",
      prompt: "You are an equity compensation attorney. Draft a stock option plan including: plan purpose, share authorization, eligibility criteria, vesting schedules, exercise provisions, and plan administration procedures."
    },
    {
      id: 263,
      title: "Draft employment agreement for executives",
      description: "Create comprehensive executive employment agreement with compensation and termination provisions.",
      category: "Corporate Transactions",
      expectedResult: "A detailed executive agreement with compensation, duties, and severance provisions.",
      prompt: "You are an executive compensation attorney. Draft an employment agreement including: position and duties, compensation structure, benefits package, termination provisions, severance arrangements, and post-employment restrictions."
    },
    {
      id: 264,
      title: "Create board of directors resolutions",
      description: "Draft corporate resolutions for board decisions and authorizations.",
      category: "Corporate Transactions",
      expectedResult: "Properly formatted board resolutions with required approvals and authorizations.",
      prompt: "You are a corporate secretary. Draft board resolutions for [Corporate Action] including: meeting authorization, decision documentation, officer authorizations, and corporate formality compliance."
    },
    {
      id: 265,
      title: "Draft disclosure schedules for M&A transaction",
      description: "Create comprehensive disclosure schedules for merger or acquisition agreement.",
      category: "Corporate Transactions",
      expectedResult: "Detailed disclosure schedules with exceptions and qualifications to representations.",
      prompt: "You are an M&A disclosure specialist. Draft disclosure schedules including: litigation disclosures, material agreements, intellectual property, employee matters, regulatory compliance, and financial exceptions."
    },
    {
      id: 266,
      title: "Create closing checklist for corporate transaction",
      description: "Develop comprehensive closing checklist with deliverables and timing.",
      category: "Corporate Transactions",
      expectedResult: "A systematic closing checklist with responsibilities and deadline tracking.",
      prompt: "You are a transaction closing specialist. Create a closing checklist including: document deliverables, signature requirements, funding instructions, regulatory approvals, and post-closing obligations."
    },
    {
      id: 267,
      title: "Draft escrow agreement for M&A transaction",
      description: "Create escrow agreement for holding funds pending post-closing adjustments.",
      category: "Corporate Transactions",
      expectedResult: "A comprehensive escrow agreement with release conditions and dispute procedures.",
      prompt: "You are an escrow specialist. Draft an escrow agreement including: escrow terms, release conditions, dispute resolution, escrow agent duties, and expense allocation."
    },
    {
      id: 268,
      title: "Create earn-out agreement provisions",
      description: "Draft earn-out provisions for contingent consideration in acquisitions.",
      category: "Corporate Transactions",
      expectedResult: "Detailed earn-out provisions with calculation methodology and dispute resolution.",
      prompt: "You are an earn-out specialist. Draft earn-out provisions including: performance metrics, calculation methodology, payment timing, dispute resolution, and operational covenants."
    },
    {
      id: 269,
      title: "Draft corporate governance policies",
      description: "Create comprehensive corporate governance policies and procedures.",
      category: "Corporate Transactions",
      expectedResult: "A governance framework with policies, procedures, and compliance requirements.",
      prompt: "You are a corporate governance specialist. Draft governance policies including: board charter, committee charters, code of conduct, disclosure policies, and compliance procedures."
    },
    {
      id: 270,
      title: "Create spin-off transaction documents",
      description: "Draft documents for corporate spin-off or divestiture transaction.",
      category: "Corporate Transactions",
      expectedResult: "Complete spin-off documentation with separation agreements and distribution terms.",
      prompt: "You are a spin-off attorney. Draft spin-off documents including: separation agreement, distribution agreement, tax matters agreement, and transition services agreement."
    },
    {
      id: 271,
      title: "Draft recapitalization agreement",
      description: "Create recapitalization agreement for restructuring corporate capital structure.",
      category: "Corporate Transactions",
      expectedResult: "A comprehensive recapitalization plan with new capital structure and terms.",
      prompt: "You are a recapitalization specialist. Draft a recapitalization agreement including: new capital structure, exchange terms, valuation methodology, and shareholder treatment."
    },
    {
      id: 272,
      title: "Create management buyout documentation",
      description: "Draft comprehensive documentation for management buyout transaction.",
      category: "Corporate Transactions",
      expectedResult: "Complete MBO documentation with financing, governance, and incentive provisions.",
      prompt: "You are an MBO attorney. Draft MBO documentation including: purchase agreement, financing arrangements, management equity plan, and governance structure."
    },
    {
      id: 273,
      title: "Draft leveraged buyout agreements",
      description: "Create LBO transaction agreements with debt financing and equity structure.",
      category: "Corporate Transactions",
      expectedResult: "Comprehensive LBO documentation with financing and acquisition terms.",
      prompt: "You are an LBO attorney. Draft LBO agreements including: acquisition agreement, debt financing documents, equity arrangements, and security documents."
    },
    {
      id: 274,
      title: "Create PIPE investment documentation",
      description: "Draft documentation for private investment in public equity transaction.",
      category: "Corporate Transactions",
      expectedResult: "Complete PIPE documentation with investment terms and registration rights.",
      prompt: "You are a PIPE attorney. Draft PIPE documentation including: subscription agreement, registration rights agreement, and investor representations."
    },
    {
      id: 275,
      title: "Draft SPAC merger agreement",
      description: "Create merger agreement for SPAC business combination transaction.",
      category: "Corporate Transactions",
      expectedResult: "A comprehensive SPAC merger agreement with de-SPAC terms and conditions.",
      prompt: "You are a SPAC attorney. Draft a SPAC merger agreement including: business combination structure, consideration terms, earnout provisions, and sponsor arrangements."
    },
    {
      id: 276,
      title: "Create reverse merger documentation",
      description: "Draft documents for reverse merger going-public transaction.",
      category: "Corporate Transactions",
      expectedResult: "Complete reverse merger documentation with share exchange and public company provisions.",
      prompt: "You are a reverse merger attorney. Draft reverse merger documents including: share exchange agreement, disclosure documents, and public company compliance provisions."
    },
    {
      id: 277,
      title: "Draft tender offer documentation",
      description: "Create tender offer documents for public company acquisition.",
      category: "Corporate Transactions",
      expectedResult: "Complete tender offer documentation with offer terms and regulatory compliance.",
      prompt: "You are a tender offer attorney. Draft tender offer documents including: offer to purchase, letter of transmittal, and SEC filing documents."
    },
    {
      id: 278,
      title: "Create proxy statement for merger",
      description: "Draft proxy statement for shareholder approval of merger transaction.",
      category: "Corporate Transactions",
      expectedResult: "A comprehensive proxy statement with transaction description and voting information.",
      prompt: "You are a proxy specialist. Draft a proxy statement including: transaction summary, background, board recommendation, fairness opinion, and voting procedures."
    },
    {
      id: 279,
      title: "Draft registration rights agreement",
      description: "Create registration rights agreement for investor securities registration.",
      category: "Corporate Transactions",
      expectedResult: "A detailed registration rights agreement with demand and piggyback provisions.",
      prompt: "You are a registration rights attorney. Draft a registration rights agreement including: demand rights, piggyback rights, registration procedures, and expense allocation."
    },
    {
      id: 280,
      title: "Create lock-up agreement",
      description: "Draft lock-up agreement restricting securities transfers post-transaction.",
      category: "Corporate Transactions",
      expectedResult: "A comprehensive lock-up agreement with transfer restrictions and exceptions.",
      prompt: "You are a securities attorney. Draft a lock-up agreement including: transfer restrictions, lock-up period, permitted transfers, and early release provisions."
    },
    {
      id: 281,
      title: "Draft voting agreement",
      description: "Create voting agreement for coordinated shareholder voting arrangements.",
      category: "Corporate Transactions",
      expectedResult: "A detailed voting agreement with voting obligations and enforcement provisions.",
      prompt: "You are a voting agreement specialist. Draft a voting agreement including: voting obligations, board nomination rights, transfer restrictions, and enforcement mechanisms."
    },
    {
      id: 282,
      title: "Create standstill agreement",
      description: "Draft standstill agreement restricting hostile takeover activities.",
      category: "Corporate Transactions",
      expectedResult: "A comprehensive standstill agreement with acquisition restrictions and permitted activities.",
      prompt: "You are a standstill specialist. Draft a standstill agreement including: acquisition restrictions, standstill period, permitted activities, and termination events."
    },
    {
      id: 283,
      title: "Draft break-up fee provisions",
      description: "Create break-up fee and expense reimbursement provisions for M&A agreements.",
      category: "Corporate Transactions",
      expectedResult: "Detailed break-up fee provisions with triggering events and payment terms.",
      prompt: "You are an M&A attorney. Draft break-up fee provisions including: fee calculation, triggering events, payment conditions, and expense reimbursement."
    },
    {
      id: 284,
      title: "Create material adverse change definition",
      description: "Draft comprehensive material adverse change definition for transaction agreements.",
      category: "Corporate Transactions",
      expectedResult: "A precise MAC definition with inclusions, exclusions, and measurement criteria.",
      prompt: "You are an MAC specialist. Draft a material adverse change definition including: general definition, specific exclusions, measurement standards, and burden of proof requirements."
    },
    {
      id: 285,
      title: "Draft go-shop provisions",
      description: "Create go-shop provisions allowing post-signing solicitation of competing bids.",
      category: "Corporate Transactions",
      expectedResult: "Comprehensive go-shop provisions with solicitation rights and termination procedures.",
      prompt: "You are a go-shop specialist. Draft go-shop provisions including: solicitation period, permitted activities, superior proposal standards, and termination rights."
    },
    {
      id: 286,
      title: "Create collar mechanism for stock deals",
      description: "Draft collar provisions protecting against stock price fluctuations in equity deals.",
      category: "Corporate Transactions",
      expectedResult: "Detailed collar provisions with price protection and adjustment mechanisms.",
      prompt: "You are a collar specialist. Draft collar provisions including: price collar bands, adjustment mechanisms, termination rights, and walk-away provisions."
    },
    {
      id: 287,
      title: "Draft fairness opinion engagement letter",
      description: "Create engagement letter for investment bank fairness opinion services.",
      category: "Corporate Transactions",
      expectedResult: "A comprehensive engagement letter with scope, fees, and liability provisions.",
      prompt: "You are a fairness opinion specialist. Draft an engagement letter including: service scope, fee structure, liability limitations, and professional standards."
    },
    {
      id: 288,
      title: "Create transaction insurance policies",
      description: "Draft representations and warranties insurance and other transaction insurance.",
      category: "Corporate Transactions",
      expectedResult: "Transaction insurance documentation with coverage terms and claims procedures.",
      prompt: "You are a transaction insurance specialist. Draft insurance documentation including: coverage scope, policy terms, claims procedures, and retention arrangements."
    },
    {
      id: 289,
      title: "Draft carve-out transaction agreements",
      description: "Create agreements for carving out business units or divisions.",
      category: "Corporate Transactions",
      expectedResult: "Complete carve-out documentation with separation and transition provisions.",
      prompt: "You are a carve-out specialist. Draft carve-out agreements including: asset separation, employee transfers, shared services, and transition arrangements."
    },
    {
      id: 290,
      title: "Create cross-border transaction structure",
      description: "Design legal structure for international M&A and investment transactions.",
      category: "Corporate Transactions",
      expectedResult: "A cross-border transaction structure with tax optimization and regulatory compliance.",
      prompt: "You are an international transactions attorney. Create a transaction structure including: entity formation, tax optimization, regulatory approvals, and currency considerations."
    },
    {
      id: 291,
      title: "Draft regulatory approval strategies",
      description: "Create strategy and documentation for obtaining regulatory approvals.",
      category: "Corporate Transactions",
      expectedResult: "A regulatory approval plan with filing requirements and timing strategies.",
      prompt: "You are a regulatory approval specialist. Draft approval strategies including: regulatory mapping, filing requirements, timing coordination, and approval conditions."
    },
    {
      id: 292,
      title: "Create antitrust compliance plan",
      description: "Develop antitrust compliance strategy for merger and acquisition transactions.",
      category: "Corporate Transactions",
      expectedResult: "An antitrust compliance plan with HSR filing and approval strategies.",
      prompt: "You are an antitrust attorney. Create a compliance plan including: HSR analysis, competition assessment, regulatory strategy, and remedy negotiations."
    },
    {
      id: 293,
      title: "Draft foreign investment approval documentation",
      description: "Create documentation for CFIUS and other foreign investment approvals.",
      category: "Corporate Transactions",
      expectedResult: "Foreign investment approval documentation with national security compliance.",
      prompt: "You are a foreign investment specialist. Draft approval documentation including: CFIUS filings, national security analysis, mitigation measures, and compliance procedures."
    },
    {
      id: 294,
      title: "Create transaction communication plan",
      description: "Develop comprehensive communication strategy for transaction stakeholders.",
      category: "Corporate Transactions",
      expectedResult: "A transaction communication plan with stakeholder engagement and messaging strategies.",
      prompt: "You are a transaction communications specialist. Create a communication plan including: stakeholder mapping, messaging strategy, announcement timing, and ongoing communication."
    },
    {
      id: 295,
      title: "Draft post-closing integration plan",
      description: "Create comprehensive plan for post-acquisition integration activities.",
      category: "Corporate Transactions",
      expectedResult: "An integration plan with workstreams, timelines, and success metrics.",
      prompt: "You are an integration specialist. Draft an integration plan including: integration workstreams, timeline milestones, resource allocation, and success measurement."
    },
    {
      id: 296,
      title: "Create transaction risk management framework",
      description: "Develop risk management approach for complex corporate transactions.",
      category: "Corporate Transactions",
      expectedResult: "A transaction risk framework with identification, assessment, and mitigation strategies.",
      prompt: "You are a transaction risk specialist. Create a risk management framework including: risk identification, assessment methodology, mitigation strategies, and monitoring procedures."
    },
    {
      id: 297,
      title: "Draft transaction financing documentation",
      description: "Create comprehensive financing documentation for M&A transactions.",
      category: "Corporate Transactions",
      expectedResult: "Complete financing documentation with credit facilities and security arrangements.",
      prompt: "You are a transaction finance attorney. Draft financing documentation including: credit agreements, security documents, guarantee arrangements, and closing conditions."
    },
    {
      id: 298,
      title: "Create earnout dispute resolution procedures",
      description: "Draft procedures for resolving earnout calculation and payment disputes.",
      category: "Corporate Transactions",
      expectedResult: "Earnout dispute procedures with calculation verification and resolution mechanisms.",
      prompt: "You are an earnout dispute specialist. Create dispute procedures including: calculation verification, expert determination, arbitration procedures, and payment mechanisms."
    },
    {
      id: 299,
      title: "Draft transaction closing conditions",
      description: "Create comprehensive closing conditions for corporate transactions.",
      category: "Corporate Transactions",
      expectedResult: "Detailed closing conditions with satisfaction requirements and waiver provisions.",
      prompt: "You are a closing conditions specialist. Draft closing conditions including: regulatory approvals, third-party consents, financing arrangements, and material adverse change provisions."
    },
    {
      id: 300,
      title: "Create transaction termination and remedies provisions",
      description: "Draft termination rights and remedy provisions for transaction agreements.",
      category: "Corporate Transactions",
      expectedResult: "Comprehensive termination provisions with remedy allocation and enforcement mechanisms.",
      prompt: "You are a transaction remedies specialist. Create termination provisions including: termination rights, remedy allocation, specific performance, and damages calculations."
    }
  ];
  


const part4Prompts = [
    {
      id: 301,
      title: "Statutory Interpretation Guide",
      description: "Create comprehensive guide for interpreting complex statutory language and provisions.",
      category: "Legal research and opinions",
      expectedResult: "A structured interpretation guide with methodology and practical application examples.",
      prompt: "You are a statutory interpretation expert. Create a guide for interpreting [Statute/Regulation] including: plain meaning analysis, legislative history review, canons of construction, regulatory context, judicial interpretations, and practical application examples."
    },
    {
      id: 302,
      title: "Case Law Summary Report",
      description: "Prepare comprehensive summary and analysis of relevant case law on specific legal issues.",
      category: "Legal research and opinions",
      expectedResult: "A detailed case law analysis with holdings, reasoning, and precedential value assessment.",
      prompt: "You are a legal research specialist. Prepare a case law summary for [Legal Issue] including: key holdings, factual distinctions, reasoning analysis, precedential hierarchy, trend identification, and practical implications for current matters."
    },
    {
      id: 303,
      title: "Jurisdiction Comparison Analysis",
      description: "Compare legal approaches across multiple jurisdictions for strategic decision-making.",
      category: "Legal research and opinions",
      expectedResult: "A comparative analysis highlighting differences, advantages, and strategic considerations.",
      prompt: "You are a comparative law specialist. Analyze [Legal Issue] across [Jurisdictions] including: legal framework comparison, procedural differences, outcome variations, enforcement mechanisms, and strategic jurisdiction selection recommendations."
    },
    {
      id: 304,
      title: "Legal Opinion on Contract Validity",
      description: "Provide formal legal opinion on contract enforceability and validity issues.",
      category: "Legal research and opinions",
      expectedResult: "A professional legal opinion with analysis, conclusions, and risk assessment.",
      prompt: "You are a contract law expert. Provide a legal opinion on [Contract Issue] including: legal framework analysis, enforceability assessment, validity challenges, risk factors, and recommended actions with supporting authorities."
    },
    {
      id: 305,
      title: "Risk Assessment of Business Model",
      description: "Analyze legal risks associated with specific business models or practices.",
      category: "Legal research and opinions",
      expectedResult: "A comprehensive risk analysis with mitigation strategies and compliance recommendations.",
      prompt: "You are a business law risk analyst. Assess legal risks for [Business Model] including: regulatory compliance, liability exposure, contractual risks, intellectual property issues, and risk mitigation strategies."
    },
    {
      id: 306,
      title: "Regulatory Compliance Analysis",
      description: "Provide detailed analysis of regulatory requirements and compliance obligations.",
      category: "Legal research and opinions",
      expectedResult: "A compliance analysis with requirements summary and implementation guidance.",
      prompt: "You are a regulatory compliance expert. Analyze compliance requirements for [Industry/Activity] including: applicable regulations, compliance obligations, enforcement trends, penalty risks, and implementation recommendations."
    },
    {
      id: 307,
      title: "Precedent Case Comparison Report",
      description: "Compare current matter against relevant precedent cases for strategy development.",
      category: "Legal research and opinions",
      expectedResult: "A precedent comparison with factual distinctions and strategic implications.",
      prompt: "You are a precedent analysis specialist. Compare [Current Matter] with relevant precedents including: factual similarities, legal distinctions, outcome analysis, strategic implications, and argument development opportunities."
    },
    {
      id: 308,
      title: "Constitutional Law Analysis",
      description: "Analyze constitutional issues and provide constitutional law research and opinions.",
      category: "Legal research and opinions",
      expectedResult: "A constitutional analysis with doctrinal framework and precedent application.",
      prompt: "You are a constitutional law scholar. Analyze [Constitutional Issue] including: applicable constitutional provisions, relevant precedents, doctrinal framework, balancing tests, and constitutional arguments."
    },
    {
      id: 309,
      title: "Interpretation of Ambiguous Clauses",
      description: "Provide analysis and interpretation of ambiguous contract or statutory language.",
      category: "Legal research and opinions",
      expectedResult: "An interpretation analysis with supporting reasoning and alternative constructions.",
      prompt: "You are a legal interpretation specialist. Interpret [Ambiguous Language] including: plain meaning analysis, context consideration, interpretive canons, extrinsic evidence, and alternative constructions with supporting reasoning."
    },
    {
      id: 310,
      title: "Conflict of Laws Opinion",
      description: "Analyze choice of law issues and provide conflict of laws analysis.",
      category: "Legal research and opinions",
      expectedResult: "A conflict of laws analysis with applicable law determination and forum considerations.",
      prompt: "You are a conflict of laws expert. Analyze choice of law for [Legal Issue] including: connecting factors analysis, choice of law rules, forum selection, enforcement considerations, and applicable law recommendations."
    },
    {
      id: 311,
      title: "Legislative History Research",
      description: "Conduct comprehensive legislative history research for statutory interpretation.",
      category: "Legal research and opinions",
      expectedResult: "A legislative history report with interpretive insights and drafting intent analysis.",
      prompt: "You are a legislative history specialist. Research legislative history for [Statute] including: bill evolution, committee reports, floor debates, amendments, sponsor statements, and interpretive insights."
    },
    {
      id: 312,
      title: "Regulatory Impact Assessment",
      description: "Assess potential impact of proposed regulations on business operations.",
      category: "Legal research and opinions",
      expectedResult: "A regulatory impact analysis with business implications and compliance strategies.",
      prompt: "You are a regulatory impact analyst. Assess impact of [Proposed Regulation] including: operational implications, compliance costs, competitive effects, implementation challenges, and strategic response options."
    },
    {
      id: 313,
      title: "Legal Trend Analysis Report",
      description: "Analyze emerging legal trends and their implications for business strategy.",
      category: "Legal research and opinions",
      expectedResult: "A trend analysis with strategic implications and proactive recommendations.",
      prompt: "You are a legal trend analyst. Analyze trends in [Legal Area] including: emerging developments, judicial attitudes, regulatory changes, business implications, and strategic adaptation recommendations."
    },
    {
      id: 314,
      title: "Expert Witness Opinion Development",
      description: "Develop expert witness opinions and testimony for litigation support.",
      category: "Legal research and opinions",
      expectedResult: "A professional expert opinion with methodology, analysis, and conclusions.",
      prompt: "You are an expert witness. Develop an expert opinion on [Technical/Legal Issue] including: qualifications summary, methodology, factual analysis, professional conclusions, and testimony preparation."
    },
    {
      id: 315,
      title: "Policy Analysis and Recommendations",
      description: "Analyze policy issues and provide strategic recommendations for policy development.",
      category: "Legal research and opinions",
      expectedResult: "A policy analysis with recommendations and implementation strategies.",
      prompt: "You are a policy analyst. Analyze [Policy Issue] including: current policy framework, stakeholder interests, alternative approaches, implementation considerations, and policy recommendations."
    },
    {
      id: 316,
      title: "International Law Research",
      description: "Research international law issues and treaty obligations for cross-border matters.",
      category: "Legal research and opinions",
      expectedResult: "An international law analysis with treaty interpretation and compliance guidance.",
      prompt: "You are an international law specialist. Research [International Law Issue] including: treaty provisions, customary law, international precedents, state practice, and compliance obligations."
    },
    {
      id: 317,
      title: "Administrative Law Analysis",
      description: "Analyze administrative law issues including agency authority and procedural requirements.",
      category: "Legal research and opinions",
      expectedResult: "An administrative law analysis with agency authority assessment and procedural guidance.",
      prompt: "You are an administrative law expert. Analyze [Administrative Issue] including: agency authority, procedural requirements, judicial review standards, precedent analysis, and procedural compliance recommendations."
    },
    {
      id: 318,
      title: "Securities Law Compliance Opinion",
      description: "Provide securities law analysis and compliance opinions for financial transactions.",
      category: "Legal research and opinions",
      expectedResult: "A securities law opinion with registration analysis and exemption recommendations.",
      prompt: "You are a securities law specialist. Analyze [Securities Issue] including: registration requirements, exemption analysis, disclosure obligations, enforcement risks, and compliance recommendations."
    },
    {
      id: 319,
      title: "Employment Law Advisory Opinion",
      description: "Provide employment law guidance on workplace policies and practices.",
      category: "Legal research and opinions",
      expectedResult: "An employment law advisory with compliance analysis and policy recommendations.",
      prompt: "You are an employment law advisor. Provide guidance on [Employment Issue] including: legal requirements, compliance analysis, risk assessment, best practices, and policy recommendations."
    },
    {
      id: 320,
      title: "Environmental Law Impact Assessment",
      description: "Assess environmental law compliance and impact for business activities.",
      category: "Legal research and opinions",
      expectedResult: "An environmental impact analysis with compliance requirements and mitigation strategies.",
      prompt: "You are an environmental law specialist. Assess environmental impact for [Business Activity] including: regulatory requirements, permit obligations, environmental risks, mitigation measures, and compliance strategies."
    },
    {
      id: 321,
      title: "Tax Law Research and Analysis",
      description: "Research complex tax law issues and provide strategic tax planning advice.",
      category: "Legal research and opinions",
      expectedResult: "A tax law analysis with planning opportunities and compliance recommendations.",
      prompt: "You are a tax law specialist. Research [Tax Issue] including: applicable tax provisions, planning opportunities, compliance requirements, audit risks, and strategic recommendations."
    },
    {
      id: 322,
      title: "Antitrust Law Assessment",
      description: "Analyze antitrust implications of business practices and transactions.",
      category: "Legal research and opinions",
      expectedResult: "An antitrust analysis with competition law compliance and risk mitigation guidance.",
      prompt: "You are an antitrust specialist. Analyze [Business Practice/Transaction] including: competition law implications, market analysis, enforcement risks, compliance requirements, and risk mitigation strategies."
    },
    {
      id: 323,
      title: "Privacy Law Compliance Guide",
      description: "Provide comprehensive privacy law compliance analysis and implementation guidance.",
      category: "Legal research and opinions",
      expectedResult: "A privacy compliance guide with requirements analysis and implementation procedures.",
      prompt: "You are a privacy law expert. Create compliance guidance for [Privacy Requirements] including: legal obligations, data protection requirements, consent mechanisms, rights management, and compliance procedures."
    },
    {
      id: 324,
      title: "Corporate Law Advisory Opinion",
      description: "Provide corporate law advice on governance, fiduciary duties, and corporate transactions.",
      category: "Legal research and opinions",
      expectedResult: "A corporate law advisory with governance analysis and fiduciary duty guidance.",
      prompt: "You are a corporate law advisor. Provide guidance on [Corporate Issue] including: governance requirements, fiduciary duties, stakeholder interests, transaction implications, and compliance recommendations."
    },
    {
      id: 325,
      title: "Real Estate Law Analysis",
      description: "Analyze real estate law issues including property rights, zoning, and transactions.",
      category: "Legal research and opinions",
      expectedResult: "A real estate law analysis with property rights assessment and transaction guidance.",
      prompt: "You are a real estate law specialist. Analyze [Real Estate Issue] including: property rights, zoning compliance, transaction requirements, title issues, and legal recommendations."
    },
    {
      id: 326,
      title: "Healthcare Law Compliance Assessment",
      description: "Provide healthcare law compliance analysis for medical practices and healthcare organizations.",
      category: "Legal research and opinions",
      expectedResult: "A healthcare compliance assessment with regulatory requirements and implementation guidance.",
      prompt: "You are a healthcare law specialist. Assess compliance for [Healthcare Organization/Practice] including: regulatory requirements, licensing obligations, privacy compliance, reimbursement issues, and compliance recommendations."
    },
    {
      id: 327,
      title: "Technology Law Opinion",
      description: "Provide legal analysis on technology law issues including software, data, and emerging technologies.",
      category: "Legal research and opinions",
      expectedResult: "A technology law opinion with legal framework analysis and compliance guidance.",
      prompt: "You are a technology law expert. Analyze [Technology Issue] including: applicable legal framework, compliance requirements, liability issues, intellectual property considerations, and strategic recommendations."
    },
    {
      id: 328,
      title: "Banking and Financial Services Law Analysis",
      description: "Analyze banking and financial services regulatory compliance and legal issues.",
      category: "Legal research and opinions",
      expectedResult: "A financial services law analysis with regulatory compliance and risk management guidance.",
      prompt: "You are a financial services law specialist. Analyze [Banking/Financial Issue] including: regulatory framework, compliance obligations, supervisory expectations, enforcement risks, and compliance strategies."
    },
    {
      id: 329,
      title: "Insurance Law Research",
      description: "Research insurance law issues including coverage, claims, and regulatory compliance.",
      category: "Legal research and opinions",
      expectedResult: "An insurance law analysis with coverage interpretation and regulatory compliance guidance.",
      prompt: "You are an insurance law specialist. Research [Insurance Issue] including: coverage analysis, policy interpretation, claims handling, regulatory requirements, and compliance recommendations."
    },
    {
      id: 330,
      title: "Energy Law Regulatory Analysis",
      description: "Analyze energy law and regulatory compliance for energy projects and transactions.",
      category: "Legal research and opinions",
      expectedResult: "An energy law analysis with regulatory compliance and project development guidance.",
      prompt: "You are an energy law specialist. Analyze [Energy Project/Issue] including: regulatory framework, permitting requirements, compliance obligations, market regulations, and development strategies."
    },
    {
      id: 331,
      title: "Immigration Law Advisory",
      description: "Provide immigration law guidance for business immigration and compliance matters.",
      category: "Legal research and opinions",
      expectedResult: "An immigration law advisory with visa strategies and compliance recommendations.",
      prompt: "You are an immigration law specialist. Provide guidance on [Immigration Issue] including: visa requirements, compliance obligations, application strategies, enforcement risks, and immigration planning."
    },
    {
      id: 332,
      title: "Family Law Research and Analysis",
      description: "Research family law issues and provide strategic advice for family law matters.",
      category: "Legal research and opinions",
      expectedResult: "A family law analysis with strategic recommendations and procedural guidance.",
      prompt: "You are a family law specialist. Analyze [Family Law Issue] including: applicable law, procedural requirements, strategic options, negotiation considerations, and resolution strategies."
    },
    {
      id: 333,
      title: "Criminal Law Research Support",
      description: "Provide criminal law research and analysis for defense strategy development.",
      category: "Legal research and opinions",
      expectedResult: "A criminal law analysis with defense strategies and procedural guidance.",
      prompt: "You are a criminal law researcher. Analyze [Criminal Law Issue] including: applicable statutes, case law precedents, defense strategies, procedural requirements, and strategic recommendations."
    },
    {
      id: 334,
      title: "Civil Rights Law Analysis",
      description: "Analyze civil rights law issues and provide advocacy strategies.",
      category: "Legal research and opinions",
      expectedResult: "A civil rights analysis with legal framework assessment and advocacy strategies.",
      prompt: "You are a civil rights law specialist. Analyze [Civil Rights Issue] including: constitutional protections, statutory rights, enforcement mechanisms, precedent analysis, and advocacy strategies."
    },
    {
      id: 335,
      title: "Elder Law Research and Guidance",
      description: "Provide elder law research and guidance for aging-related legal issues.",
      category: "Legal research and opinions",
      expectedResult: "An elder law analysis with planning strategies and protection recommendations.",
      prompt: "You are an elder law specialist. Research [Elder Law Issue] including: legal protections, planning options, benefit eligibility, capacity issues, and protective strategies."
    },
    {
      id: 336,
      title: "Nonprofit Law Compliance Guide",
      description: "Provide nonprofit law compliance analysis and governance guidance.",
      category: "Legal research and opinions",
      expectedResult: "A nonprofit compliance guide with governance requirements and tax-exempt status guidance.",
      prompt: "You are a nonprofit law specialist. Create compliance guidance for [Nonprofit Organization] including: governance requirements, tax-exempt compliance, fundraising regulations, lobbying restrictions, and operational guidelines."
    },
    {
      id: 337,
      title: "Sports and Entertainment Law Analysis",
      description: "Analyze sports and entertainment law issues including contracts and intellectual property.",
      category: "Legal research and opinions",
      expectedResult: "A sports/entertainment law analysis with industry-specific compliance and contract guidance.",
      prompt: "You are a sports and entertainment law specialist. Analyze [Industry Issue] including: contract requirements, intellectual property rights, industry regulations, talent agreements, and compliance considerations."
    },
    {
      id: 338,
      title: "Education Law Research",
      description: "Research education law issues including institutional compliance and student rights.",
      category: "Legal research and opinions",
      expectedResult: "An education law analysis with institutional compliance and student rights guidance.",
      prompt: "You are an education law specialist. Research [Education Issue] including: institutional obligations, student rights, compliance requirements, disciplinary procedures, and policy recommendations."
    },
    {
      id: 339,
      title: "Transportation Law Analysis",
      description: "Analyze transportation law and regulatory compliance for transportation businesses.",
      category: "Legal research and opinions",
      expectedResult: "A transportation law analysis with regulatory compliance and operational guidance.",
      prompt: "You are a transportation law specialist. Analyze [Transportation Issue] including: regulatory framework, safety requirements, licensing obligations, compliance procedures, and operational recommendations."
    },
    {
      id: 340,
      title: "Municipal Law Advisory",
      description: "Provide municipal law guidance for local government legal issues and compliance.",
      category: "Legal research and opinions",
      expectedResult: "A municipal law advisory with governance compliance and procedural guidance.",
      prompt: "You are a municipal law specialist. Provide guidance on [Municipal Issue] including: legal authority, procedural requirements, compliance obligations, public meeting laws, and governance recommendations."
    },
    {
      id: 341,
      title: "Construction Law Analysis",
      description: "Analyze construction law issues including contracts, liens, and project disputes.",
      category: "Legal research and opinions",
      expectedResult: "A construction law analysis with contract guidance and dispute resolution strategies.",
      prompt: "You are a construction law specialist. Analyze [Construction Issue] including: contract requirements, lien rights, payment obligations, dispute resolution, and risk management strategies."
    },
    {
      id: 342,
      title: "Agricultural Law Research",
      description: "Research agricultural law issues including land use, environmental compliance, and farm operations.",
      category: "Legal research and opinions",
      expectedResult: "An agricultural law analysis with regulatory compliance and operational guidance.",
      prompt: "You are an agricultural law specialist. Research [Agricultural Issue] including: land use regulations, environmental compliance, operating requirements, subsidy programs, and compliance strategies."
    },
    {
      id: 343,
      title: "Maritime Law Analysis",
      description: "Analyze maritime law issues including admiralty jurisdiction and vessel operations.",
      category: "Legal research and opinions",
      expectedResult: "A maritime law analysis with admiralty jurisdiction and operational compliance guidance.",
      prompt: "You are a maritime law specialist. Analyze [Maritime Issue] including: admiralty jurisdiction, vessel regulations, maritime contracts, environmental compliance, and operational requirements."
    },
    {
      id: 344,
      title: "Aviation Law Research",
      description: "Research aviation law and regulatory compliance for aviation operations and transactions.",
      category: "Legal research and opinions",
      expectedResult: "An aviation law analysis with regulatory compliance and operational guidance.",
      prompt: "You are an aviation law specialist. Research [Aviation Issue] including: FAA regulations, operational requirements, safety compliance, international aviation law, and regulatory strategy."
    },
    {
      id: 345,
      title: "Gaming Law Compliance Analysis",
      description: "Analyze gaming law compliance for gaming operations and licensing requirements.",
      category: "Legal research and opinions",
      expectedResult: "A gaming law compliance analysis with licensing requirements and operational guidance.",
      prompt: "You are a gaming law specialist. Analyze compliance for [Gaming Operation] including: licensing requirements, regulatory compliance, operational restrictions, tax obligations, and compliance procedures."
    },
    {
      id: 346,
      title: "Franchise Law Advisory",
      description: "Provide franchise law guidance for franchise relationships and disclosure requirements.",
      category: "Legal research and opinions",
      expectedResult: "A franchise law advisory with relationship management and disclosure compliance guidance.",
      prompt: "You are a franchise law specialist. Provide guidance on [Franchise Issue] including: disclosure requirements, relationship regulations, termination procedures, compliance obligations, and relationship management."
    },
    {
      id: 347,
      title: "Regulatory Enforcement Defense Strategy",
      description: "Develop defense strategies for regulatory enforcement actions and investigations.",
      category: "Legal research and opinions",
      expectedResult: "A regulatory defense strategy with enforcement response and compliance remediation guidance.",
      prompt: "You are a regulatory enforcement specialist. Develop defense strategy for [Enforcement Action] including: response planning, compliance remediation, negotiation strategies, penalty mitigation, and resolution approaches."
    },
    {
      id: 348,
      title: "Legal Ethics Opinion",
      description: "Provide legal ethics analysis and professional responsibility guidance.",
      category: "Legal research and opinions",
      expectedResult: "A legal ethics opinion with professional responsibility analysis and compliance guidance.",
      prompt: "You are a legal ethics specialist. Provide ethics guidance on [Ethics Issue] including: professional responsibility rules, conflict analysis, client obligations, disclosure requirements, and ethical compliance recommendations."
    },
    {
      id: 349,
      title: "Cross-Border Legal Analysis",
      description: "Analyze legal issues involving multiple jurisdictions and international law considerations.",
      category: "Legal research and opinions",
      expectedResult: "A cross-border legal analysis with multi-jurisdictional compliance and coordination strategies.",
      prompt: "You are an international legal specialist. Analyze [Cross-Border Issue] including: jurisdictional considerations, conflict resolution, international law application, enforcement mechanisms, and coordination strategies."
    },
    {
      id: 350,
      title: "Emerging Technology Legal Framework",
      description: "Analyze legal frameworks for emerging technologies and provide compliance guidance.",
      category: "Legal research and opinions",
      expectedResult: "An emerging technology legal analysis with regulatory framework and compliance strategies.",
      prompt: "You are an emerging technology law specialist. Analyze legal framework for [Emerging Technology] including: current regulations, regulatory gaps, compliance strategies, risk assessment, and legal adaptation recommendations."
    },
    {
      id: 351,
      title: "Client Status Update Email",
      description: "Create professional client communication providing case or matter status updates.",
      category: "Client Communications",
      expectedResult: "A clear, professional email with status summary and next steps.",
      prompt: "You are a client relationship manager. Draft a status update email for [Client Name] regarding [Matter] including: progress summary, recent developments, upcoming milestones, action items, and next communication schedule."
    },
    {
      id: 352,
      title: "Legal Strategy Presentation for Board",
      description: "Prepare executive presentation explaining legal strategy and recommendations to board of directors.",
      category: "Client Communications",
      expectedResult: "A comprehensive presentation with strategic analysis and clear recommendations.",
      prompt: "You are a legal strategist. Create a board presentation on [Legal Strategy] including: strategic overview, risk analysis, recommended approach, resource requirements, timeline, and expected outcomes."
    },
    {
      id: 353,
      title: "Settlement Negotiation Communication",
      description: "Draft communication for settlement discussions and negotiation strategies.",
      category: "Client Communications",
      expectedResult: "A strategic settlement communication with negotiation positioning and terms.",
      prompt: "You are a settlement negotiator. Draft settlement communication for [Dispute] including: settlement framework, negotiation position, value proposition, terms outline, and response timeline."
    },
    {
      id: 354,
      title: "Regulatory Compliance Training Materials",
      description: "Create client training materials for regulatory compliance and legal requirements.",
      category: "Client Communications",
      expectedResult: "Comprehensive training materials with practical guidance and implementation steps.",
      prompt: "You are a compliance trainer. Create training materials for [Compliance Topic] including: regulatory overview, compliance requirements, practical examples, implementation steps, and assessment questions."
    },
    {
      id: 355,
      title: "Crisis Communication Strategy",
      description: "Develop crisis communication plan for legal and regulatory emergencies.",
      category: "Client Communications",
      expectedResult: "A crisis communication plan with messaging strategies and stakeholder engagement.",
      prompt: "You are a crisis communication specialist. Develop a communication strategy for [Crisis Situation] including: stakeholder mapping, key messages, communication channels, timeline, and crisis response procedures."
    },
    {
      id: 356,
      title: "Contract Negotiation Summary",
      description: "Summarize contract negotiation progress and outstanding issues for client decision-making.",
      category: "Client Communications",
      expectedResult: "A clear negotiation summary with decision points and recommendations.",
      prompt: "You are a contract negotiator. Summarize negotiation progress for [Contract] including: agreed terms, outstanding issues, negotiation positions, decision points, and recommended next steps."
    },
    {
      id: 357,
      title: "Legal Budget and Cost Estimate",
      description: "Prepare detailed legal budget and cost projections for client matters.",
      category: "Client Communications",
      expectedResult: "A comprehensive budget with cost breakdown and timeline projections.",
      prompt: "You are a legal project manager. Prepare budget estimate for [Legal Matter] including: scope of work, resource requirements, timeline, cost breakdown, assumptions, and budget management recommendations."
    },
    {
      id: 358,
      title: "Litigation Strategy Memo",
      description: "Create strategic litigation memo outlining case strategy and tactical recommendations.",
      category: "Client Communications",
      expectedResult: "A comprehensive litigation strategy with tactical analysis and recommendations.",
      prompt: "You are a litigation strategist. Create strategy memo for [Case] including: case assessment, strategic objectives, tactical options, resource requirements, timeline, and success probability analysis."
    },
    {
      id: 359,
      title: "Regulatory Update Newsletter",
      description: "Create client newsletter summarizing relevant regulatory developments and implications.",
      category: "Client Communications",
      expectedResult: "A professional newsletter with regulatory updates and practical implications.",
      prompt: "You are a regulatory communications specialist. Create newsletter covering [Regulatory Developments] including: key changes, client implications, compliance requirements, implementation timeline, and action items."
    },
    {
      id: 360,
      title: "Transaction Closing Summary",
      description: "Prepare comprehensive closing summary for completed transactions.",
      category: "Client Communications",
      expectedResult: "A detailed closing summary with transaction overview and post-closing obligations.",
      prompt: "You are a transaction coordinator. Create closing summary for [Transaction] including: transaction overview, key terms, closing deliverables, post-closing obligations, and ongoing compliance requirements."
    },
    {
      id: 361,
      title: "Legal Risk Assessment Report",
      description: "Create comprehensive risk assessment report for business operations or transactions.",
      category: "Client Communications",
      expectedResult: "A detailed risk report with assessment methodology and mitigation recommendations.",
      prompt: "You are a legal risk analyst. Create risk assessment for [Business Activity] including: risk identification, probability assessment, impact analysis, mitigation strategies, and monitoring recommendations."
    },
    {
      id: 362,
      title: "Client Onboarding Package",
      description: "Develop comprehensive onboarding materials for new client relationships.",
      category: "Client Communications",
      expectedResult: "A complete onboarding package with service descriptions and communication protocols.",
      prompt: "You are a client services manager. Create onboarding package including: service overview, team introductions, communication protocols, billing procedures, technology platforms, and expectation setting."
    },
    {
      id: 363,
      title: "Legal Opinion Letter",
      description: "Draft formal legal opinion letter addressing specific legal questions or issues.",
      category: "Client Communications",
      expectedResult: "A professional legal opinion with analysis, conclusions, and appropriate disclaimers.",
      prompt: "You are an opinion attorney. Draft legal opinion on [Legal Question] including: factual background, legal analysis, applicable authorities, conclusions, limitations, and professional disclaimers."
    },
    {
      id: 364,
      title: "Compliance Audit Results Presentation",
      description: "Present compliance audit findings and recommendations to client management.",
      category: "Client Communications",
      expectedResult: "A comprehensive audit presentation with findings, risk assessment, and remediation plan.",
      prompt: "You are a compliance auditor. Create audit results presentation including: audit scope, methodology, key findings, risk assessment, recommendations, implementation timeline, and follow-up procedures."
    },
    {
      id: 365,
      title: "Contract Management Training Workshop",
      description: "Design training workshop for client teams on contract management best practices.",
      category: "Client Communications",
      expectedResult: "A structured training program with materials, exercises, and assessment components.",
      prompt: "You are a contract training specialist. Design workshop on contract management including: learning objectives, training modules, practical exercises, best practices, common pitfalls, and assessment methods."
    },
    {
      id: 366,
      title: "Merger Integration Communication Plan",
      description: "Create communication strategy for merger integration and stakeholder management.",
      category: "Client Communications",
      expectedResult: "A comprehensive communication plan with stakeholder mapping and messaging strategies.",
      prompt: "You are an integration communication specialist. Create communication plan for [Merger] including: stakeholder analysis, communication objectives, key messages, delivery channels, timeline, and feedback mechanisms."
    },
    {
      id: 367,
      title: "IP Portfolio Management Report",
      description: "Prepare intellectual property portfolio report with strategic recommendations.",
      category: "Client Communications",
      expectedResult: "A comprehensive IP report with portfolio analysis and strategic recommendations.",
      prompt: "You are an IP portfolio manager. Create portfolio report including: asset inventory, value assessment, competitive analysis, maintenance recommendations, strategic opportunities, and budget planning."
    },
    {
      id: 368,
      title: "Employment Law Policy Manual",
      description: "Create comprehensive employment policy manual for client organizations.",
      category: "Client Communications",
      expectedResult: "A complete policy manual with employment policies and implementation guidance.",
      prompt: "You are an employment policy specialist. Create policy manual including: employment policies, compliance requirements, implementation procedures, training protocols, and regular update procedures."
    },
    {
      id: 369,
      title: "Corporate Governance Assessment",
      description: "Conduct governance assessment and provide improvement recommendations.",
      category: "Client Communications",
      expectedResult: "A governance assessment with best practice comparison and improvement roadmap.",
      prompt: "You are a governance consultant. Conduct governance assessment including: current state analysis, best practice comparison, gap identification, improvement recommendations, and implementation planning."
    },
    {
      id: 370,
      title: "Data Privacy Compliance Roadmap",
      description: "Create comprehensive roadmap for data privacy compliance implementation.",
      category: "Client Communications",
      expectedResult: "A detailed compliance roadmap with implementation phases and milestone tracking.",
      prompt: "You are a privacy compliance specialist. Create compliance roadmap for [Privacy Regulations] including: gap analysis, implementation phases, resource requirements, timeline, and success metrics."
    },
    {
      id: 371,
      title: "Legal Technology Implementation Guide",
      description: "Develop guide for implementing legal technology solutions in client organizations.",
      category: "Client Communications",
      expectedResult: "A comprehensive implementation guide with technology selection and change management.",
      prompt: "You are a legal technology consultant. Create implementation guide for [Legal Technology] including: system selection, implementation planning, change management, training programs, and success measurement."
    },
    {
      id: 372,
      title: "Dispute Resolution Options Analysis",
      description: "Analyze dispute resolution alternatives and provide strategic recommendations.",
      category: "Client Communications",
      expectedResult: "A dispute resolution analysis with option comparison and strategic recommendations.",
      prompt: "You are a dispute resolution specialist. Analyze resolution options for [Dispute] including: litigation assessment, alternative dispute resolution, cost-benefit analysis, timeline comparison, and strategic recommendations."
    },
    {
      id: 373,
      title: "Regulatory Investigation Response Plan",
      description: "Create response plan for regulatory investigations and enforcement actions.",
      category: "Client Communications",
      expectedResult: "A comprehensive response plan with investigation management and communication strategies.",
      prompt: "You are a regulatory investigation specialist. Create response plan for [Investigation] including: response team structure, communication protocols, document preservation, cooperation strategy, and stakeholder management."
    },
    {
      id: 374,
      title: "Legal Project Management Dashboard",
      description: "Design project management dashboard for tracking legal matter progress and metrics.",
      category: "Client Communications",
      expectedResult: "A project dashboard with progress tracking, metrics, and reporting capabilities.",
      prompt: "You are a legal project manager. Design dashboard for [Legal Matters] including: progress tracking, budget monitoring, deadline management, resource allocation, and performance metrics."
    },
    {
      id: 375,
      title: "Client Feedback and Satisfaction Survey",
      description: "Develop client feedback survey to assess satisfaction and improvement opportunities.",
      category: "Client Communications",
      expectedResult: "A comprehensive survey with satisfaction metrics and improvement identification.",
      prompt: "You are a client experience specialist. Create feedback survey including: satisfaction measures, service evaluation, communication assessment, improvement suggestions, and loyalty indicators."
    },
    {
      id: 376,
      title: "Legal Spend Analysis and Optimization",
      description: "Analyze legal spending patterns and provide cost optimization recommendations.",
      category: "Client Communications",
      expectedResult: "A spend analysis with cost optimization strategies and budget recommendations.",
      prompt: "You are a legal spend analyst. Analyze legal spending including: spend categories, cost drivers, efficiency opportunities, vendor performance, and optimization recommendations."
    },
    {
      id: 377,
      title: "Intellectual Property Strategy Presentation",
      description: "Create strategic presentation on intellectual property management and monetization.",
      category: "Client Communications",
      expectedResult: "A strategic IP presentation with portfolio optimization and commercialization opportunities.",
      prompt: "You are an IP strategist. Create strategy presentation including: portfolio analysis, competitive positioning, monetization opportunities, protection strategies, and investment recommendations."
    },
    {
      id: 378,
      title: "Environmental Compliance Monitoring Report",
      description: "Prepare environmental compliance monitoring report with regulatory status and recommendations.",
      category: "Client Communications",
      expectedResult: "A comprehensive monitoring report with compliance status and environmental management recommendations.",
      prompt: "You are an environmental compliance specialist. Create monitoring report including: compliance status, regulatory changes, environmental risks, corrective actions, and improvement recommendations."
    },
    {
      id: 379,
      title: "Cross-Border Transaction Guide",
      description: "Create guide for cross-border transaction considerations and compliance requirements.",
      category: "Client Communications",
      expectedResult: "A comprehensive transaction guide with international considerations and compliance frameworks.",
      prompt: "You are an international transaction specialist. Create transaction guide including: jurisdictional considerations, regulatory requirements, tax implications, currency issues, and structuring recommendations."
    },
    {
      id: 380,
      title: "Legal Innovation and Efficiency Program",
      description: "Develop program for legal innovation and operational efficiency improvements.",
      category: "Client Communications",
      expectedResult: "An innovation program with efficiency initiatives and technology adoption strategies.",
      prompt: "You are a legal innovation specialist. Create innovation program including: efficiency assessment, technology opportunities, process optimization, change management, and success measurement."
    },
    {
      id: 381,
      title: "Stakeholder Engagement Strategy",
      description: "Develop comprehensive strategy for engaging key stakeholders in legal matters.",
      category: "Client Communications",
      expectedResult: "A stakeholder engagement plan with mapping, communication strategies, and relationship management.",
      prompt: "You are a stakeholder engagement specialist. Create engagement strategy for [Legal Matter] including: stakeholder mapping, communication objectives, engagement methods, relationship management, and success metrics."
    },
    {
      id: 382,
      title: "Legal Knowledge Management System",
      description: "Design knowledge management system for legal best practices and precedents.",
      category: "Client Communications",
      expectedResult: "A knowledge management framework with content organization and sharing mechanisms.",
      prompt: "You are a knowledge management specialist. Design system for legal knowledge including: content categorization, search functionality, contribution processes, quality control, and usage analytics."
    },
    {
      id: 383,
      title: "Regulatory Advocacy Strategy",
      description: "Create advocacy strategy for engaging with regulators on policy development.",
      category: "Client Communications",
      expectedResult: "An advocacy strategy with regulatory engagement and influence tactics.",
      prompt: "You are a regulatory advocacy specialist. Create advocacy strategy for [Regulatory Issue] including: stakeholder analysis, advocacy objectives, engagement tactics, coalition building, and success measurement."
    },
    {
      id: 384,
      title: "Legal Service Delivery Model",
      description: "Design optimal service delivery model for client legal service provision.",
      category: "Client Communications",
      expectedResult: "A service delivery framework with resource optimization and client satisfaction enhancement.",
      prompt: "You are a service delivery specialist. Design delivery model for [Legal Services] including: service structure, resource allocation, delivery methods, quality assurance, and client experience optimization."
    },
    {
      id: 385,
      title: "Contract Lifecycle Management Process",
      description: "Create comprehensive process for managing contracts throughout their lifecycle.",
      category: "Client Communications",
      expectedResult: "A contract lifecycle framework with standardized processes and technology integration.",
      prompt: "You are a contract lifecycle specialist. Create management process including: contract creation, negotiation workflows, approval processes, execution procedures, performance monitoring, and renewal management."
    },
    {
      id: 386,
      title: "Legal Metrics and KPI Dashboard",
      description: "Develop metrics dashboard for tracking legal department performance and outcomes.",
      category: "Client Communications",
      expectedResult: "A metrics dashboard with KPIs, performance tracking, and reporting capabilities.",
      prompt: "You are a legal metrics specialist. Create KPI dashboard including: performance indicators, measurement methodology, data sources, reporting frequency, and improvement tracking."
    },
    {
      id: 387,
      title: "Client Relationship Management Strategy",
      description: "Develop comprehensive strategy for managing and enhancing client relationships.",
      category: "Client Communications",
      expectedResult: "A relationship management strategy with client segmentation and engagement programs.",
      prompt: "You are a client relationship specialist. Create relationship strategy including: client segmentation, relationship mapping, engagement programs, communication protocols, and loyalty enhancement."
    },
    {
      id: 388,
      title: "Legal Business Development Plan",
      description: "Create business development plan for expanding legal service offerings and client base.",
      category: "Client Communications",
      expectedResult: "A business development plan with market analysis and growth strategies.",
      prompt: "You are a legal business development specialist. Create development plan including: market analysis, service positioning, client targeting, growth strategies, and success measurement."
    },
    {
      id: 389,
      title: "Digital Transformation Roadmap for Legal",
      description: "Develop digital transformation roadmap for modernizing legal operations and services.",
      category: "Client Communications",
      expectedResult: "A transformation roadmap with technology adoption and change management strategies.",
      prompt: "You are a digital transformation specialist. Create roadmap for legal transformation including: current state assessment, technology roadmap, process redesign, change management, and implementation planning."
    },
    {
      id: 390,
      title: "Legal Talent Development Program",
      description: "Design talent development program for legal professionals and career advancement.",
      category: "Client Communications",
      expectedResult: "A talent development framework with training programs and career progression paths.",
      prompt: "You are a legal talent specialist. Create development program including: competency framework, training curriculum, career pathways, mentoring programs, and performance management."
    },
    {
      id: 391,
      title: "Legal Vendor Management Strategy",
      description: "Create comprehensive strategy for managing external legal service providers.",
      category: "Client Communications",
      expectedResult: "A vendor management framework with selection criteria and performance monitoring.",
      prompt: "You are a legal vendor specialist. Create management strategy including: vendor selection, performance monitoring, relationship management, cost optimization, and quality assurance."
    },
    {
      id: 392,
      title: "Crisis Recovery and Business Continuity Plan",
      description: "Develop legal aspects of crisis recovery and business continuity planning.",
      category: "Client Communications",
      expectedResult: "A business continuity plan with legal considerations and recovery procedures.",
      prompt: "You are a business continuity specialist. Create recovery plan including: risk assessment, continuity procedures, legal considerations, stakeholder communication, and recovery coordination."
    },
    {
      id: 393,
      title: "Legal Communication Standards and Guidelines",
      description: "Establish communication standards and guidelines for legal professional interactions.",
      category: "Client Communications",
      expectedResult: "Communication standards with guidelines, templates, and quality assurance procedures.",
      prompt: "You are a legal communication specialist. Create communication standards including: writing guidelines, template library, review processes, quality standards, and training requirements."
    },
    {
      id: 394,
      title: "Legal Risk Management Framework",
      description: "Develop comprehensive framework for identifying and managing legal risks.",
      category: "Client Communications",
      expectedResult: "A risk management framework with identification, assessment, and mitigation procedures.",
      prompt: "You are a legal risk specialist. Create risk framework including: risk identification, assessment methodology, mitigation strategies, monitoring procedures, and reporting requirements."
    },
    {
      id: 395,
      title: "Legal Innovation Lab Proposal",
      description: "Propose legal innovation lab for experimenting with new technologies and approaches.",
      category: "Client Communications",
      expectedResult: "An innovation lab proposal with objectives, structure, and implementation plan.",
      prompt: "You are a legal innovation specialist. Create lab proposal including: innovation objectives, lab structure, experimentation framework, resource requirements, and success measurement."
    },
    {
      id: 396,
      title: "Client Success Story Documentation",
      description: "Document client success stories and case studies for marketing and relationship building.",
      category: "Client Communications",
      expectedResult: "Professional case studies with success metrics and client testimonials.",
      prompt: "You are a client success specialist. Document success story for [Client/Matter] including: challenge description, solution approach, implementation process, results achieved, and client testimonial."
    },
    {
      id: 397,
      title: "Legal Benchmarking and Best Practices Report",
      description: "Create benchmarking report comparing legal practices against industry standards.",
      category: "Client Communications",
      expectedResult: "A benchmarking report with comparative analysis and improvement recommendations.",
      prompt: "You are a legal benchmarking specialist. Create benchmarking report including: performance comparison, best practice identification, gap analysis, improvement opportunities, and implementation roadmap."
    },
    {
      id: 398,
      title: "Legal Transformation Change Management",
      description: "Develop change management strategy for legal transformation initiatives.",
      category: "Client Communications",
      expectedResult: "A change management plan with stakeholder engagement and adoption strategies.",
      prompt: "You are a change management specialist. Create transformation plan including: change assessment, stakeholder analysis, communication strategy, training programs, and adoption measurement."
    },
    {
      id: 399,
      title: "Legal Quality Assurance Program",
      description: "Establish quality assurance program for legal work product and service delivery.",
      category: "Client Communications",
      expectedResult: "A quality assurance framework with standards, processes, and continuous improvement.",
      prompt: "You are a legal quality specialist. Create QA program including: quality standards, review processes, error tracking, improvement procedures, and quality measurement."
    },
    {
      id: 400,
      title: "Future of Legal Services Vision",
      description: "Create vision and strategy for the future evolution of legal services delivery.",
      category: "Client Communications",
      expectedResult: "A strategic vision with future trends analysis and adaptation strategies.",
      prompt: "You are a legal futurist. Create future vision including: trend analysis, disruption assessment, opportunity identification, strategic adaptation, and transformation roadmap for legal services evolution."
    }
  ];
  
  export interface Prompt {
    id: number;
    title: string;
    description: string;
    category: string;
    expectedResult: string;
    prompt: string;
  }
  
  // TO CREATE YOUR COMPLETE data.ts FILE:
  // Combine all parts: [...part1Prompts, ...part2Prompts, ...part3Prompts, ...part4Prompts]
  export const prompts: Prompt[] = [
    // Part 1: Prompts 1-100 (Contract management, Litigation basics, IP basics)
    ...part1Prompts,
    
    // Part 2: Prompts 101-200 (Advanced IP, Compliance & Regulatory) 
    ...part2Prompts,
    
    // Part 3: Prompts 201-300 (Due Diligence, Corporate Transactions)
    ...part3Prompts,
    
    // Part 4: Prompts 301-400 (Legal research and opinions, Client Communications)
    ...part4Prompts
  ];
  
  export const categories = [
    "Contract management",
    "Litigation and case management",
    "IP management", 
    "Compliance & Regulatory",
    "Due Diligence",
    "Corporate Transactions",
    "Legal research and opinions",
    "Client Communications"
  ];
  
  export const getDepartmentColor = (category: string): string => {
    const colorMap: { [key: string]: string } = {
      "Contract management": "#87ceeb",
      "Litigation and case management": "#87ceeb", 
      "IP management": "#87ceeb",
      "Compliance & Regulatory": "#87ceeb",
      "Due Diligence": "#87ceeb",
      "Corporate Transactions": "#87ceeb",
      "Legal research and opinions": "#87ceeb",
      "Client Communications": "#87ceeb"
    };
    return colorMap[category] || "#9ca3af";
  };
  