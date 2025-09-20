// app/api/rfp/create/route.js
import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const {
      userId,
      category,
      coreProblem,
      priority,
      implementationTimeline,
      budgetMin,
      budgetMax,
      currency,
      teamType,
      teamSize,
      vendorCountry
    } = await request.json();

    // Validate required fields
    if (!category || !coreProblem || !priority || !implementationTimeline || 
        !budgetMin || !budgetMax || !currency || !teamType || !teamSize || !vendorCountry) {
      return NextResponse.json({
        success: false,
        message: 'Missing required fields'
      }, { status: 400 });
    }

    // Save to RfpAi table
    const rfpAi = await prisma.rfpAi.create({
      data: {
        category,
        coreProblem,
        priority,
        implementationTimeline,
        budgetMin: parseInt(budgetMin) || null,
        budgetMax: parseInt(budgetMax) || null,
        teamType,
        teamSize,
        vendorCountry
      }
    });

    // Fetch filtered legal software products
    const categoryMapping = {
      'CONTRACT-LIFECYCLE-MANAGEMENT': 'CONTRACT_LIFECYCLE_MANAGEMENT',
      'LEGAL-AI': 'LEGAL_AI',
      'DOCUMENT-MANAGEMENT-SYSTEM': 'DOCUMENT_MANAGEMENT_SYSTEM',
      'LITIGATION-MANAGEMENT-AND-ANALYTICS': 'LITIGATION_MANAGEMENT_AND_ANALYTICS',
      'IP-MANAGEMENT': 'IP_MANAGEMENT',
      'LEGAL-RESEARCH': 'LEGAL_RESEARCH',
      'E-DISCOVERY': 'E_DISCOVERY'
    };

    const products = await prisma.legalSoftware.findMany({
      where: {
        category: categoryMapping[category],
        headquarters: vendorCountry
      },
      select: {
        productName: true,
        companyName: true,
        description: true,
        briefDescription: true,
        targetUsers: true,
        primaryPurpose: true,
        coreFunctionalities: true,
        keyFeatures: true,
        pricingTier: true,
        startingPrice: true,
        bestKnownFor: true,
        topUseCases: true
      }
    });

    // Get currency symbol for display
    const currencySymbols = {
      'USD': '$', 'EUR': '€', 'GBP': '£', 'CAD': 'C$', 
      'AUD': 'A$', 'INR': '₹', 'JPY': '¥', 'SGD': 'S$'
    };
    const currencySymbol = currencySymbols[currency] || '$';

    // Generate RFP using AI
    const aiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [{
          role: 'system',
          content: `You are an expert RFP writer specializing in legal technology procurement. Generate a professional RFP structure based on the user's requirements and available products. 

Your response must be a valid JSON object with this exact structure:
{
  "problemStatement": "A detailed problem statement (200-300 words)",
  "objectives": ["objective1", "objective2", "objective3", "objective4", "objective5"],
  "keyRequirements": [
    {"head": "Requirement Title", "description": "Detailed requirement description"},
    {"head": "Another Requirement", "description": "Another detailed description"}
  ],
  "additionalQuestions": ["question1", "question2", "question3", "question4", "question5"]
}

Make sure all strings are properly escaped for JSON and the response is complete and valid.`
        }, {
          role: 'user',
          content: `Generate a comprehensive RFP for legal software procurement with the following specifications:

BUSINESS CONTEXT:
- Category: ${category.replace(/-/g, ' ').toLowerCase()}
- Team Type: ${teamType}
- Team Size: ${teamSize}
- Location: ${vendorCountry}

REQUIREMENTS:
- Core Problem: ${coreProblem}
- Priority: ${priority}
- Implementation Timeline: ${implementationTimeline}
- Budget Range: ${currencySymbol}${parseInt(budgetMin).toLocaleString()} - ${currencySymbol}${parseInt(budgetMax).toLocaleString()} ${currency}

AVAILABLE MARKET SOLUTIONS:
${products.length > 0 ? JSON.stringify(products.slice(0, 5), null, 2) : 'Limited product data available for this category and location'}

Please create a professional RFP that:
1. Clearly articulates the business problem and context
2. Sets 5 specific, measurable objectives aligned with their priority (${priority})
3. Defines 5-7 key technical and business requirements
4. Includes 5 strategic questions for vendor evaluation

Focus on ${priority.toLowerCase()} as the primary evaluation criteria. Consider the team size (${teamSize}) and implementation timeline (${implementationTimeline}) in your requirements.`
        }],
        temperature: 0.7,
        max_tokens: 2500
      })
    });

    if (!aiResponse.ok) {
      throw new Error(`AI API failed: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    
    if (!aiData.choices || !aiData.choices[0] || !aiData.choices[0].message) {
      throw new Error('Invalid AI response format');
    }

    let generatedRfp;
    try {
      generatedRfp = JSON.parse(aiData.choices[0].message.content);
    } catch (parseError) {
      console.error('AI response parse error:', parseError);
      // Fallback RFP structure
      generatedRfp = {
        problemStatement: `Our ${teamType.toLowerCase()} is seeking a ${category.replace(/-/g, ' ').toLowerCase()} solution to address: ${coreProblem}. With a team of ${teamSize} and ${implementationTimeline.toLowerCase()}, we need a solution that prioritizes ${priority.toLowerCase()}.`,
        objectives: [
          "Streamline current workflows and processes",
          "Improve operational efficiency and productivity", 
          "Enhance collaboration and communication",
          "Ensure compliance and risk management",
          "Achieve measurable ROI within 12 months"
        ],
        keyRequirements: [
          {"head": "Ease of Implementation", "description": "Solution must be deployable within the specified timeline with minimal disruption"},
          {"head": "Scalability", "description": "Must accommodate current team size and future growth"},
          {"head": "Integration Capabilities", "description": "Seamless integration with existing legal and business systems"},
          {"head": "Security & Compliance", "description": "Enterprise-grade security meeting legal industry standards"},
          {"head": "Training & Support", "description": "Comprehensive training and ongoing support services"}
        ],
        additionalQuestions: [
          "What is your implementation timeline and methodology?",
          "How do you handle data migration from existing systems?",
          "What training and change management support do you provide?",
          "Can you provide references from similar organizations?",
          "What are your pricing models and total cost of ownership?"
        ]
      };
    }

    // Get user email from auth context or use placeholder
    const contactEmail = userId ? `user-${userId}@company.com` : 'contact@company.com';

    // Save structured RFP
    const rfpStructured = await prisma.rfpStructured.create({
      data: {
        teamType,
        category: category.replace(/-/g, ' '),
        requirementUrgency: implementationTimeline,
        locationPreference: vendorCountry,
        contactEmail,
        problemStatement: generatedRfp.problemStatement,
        objectives: generatedRfp.objectives,
        keyRequirements: generatedRfp.keyRequirements,
        additionalQuestions: generatedRfp.additionalQuestions
      }
    });

    return NextResponse.json({
      success: true,
      rfpId: rfpStructured.id,
      message: 'RFP generated successfully',
      data: {
        rfpAiId: rfpAi.id,
        rfpStructuredId: rfpStructured.id,
        productsFound: products.length
      }
    });

  } catch (error) {
    console.error('Error creating RFP:', error);
    
    // Return appropriate error message
    if (error.message.includes('AI API')) {
      return NextResponse.json({
        success: false,
        message: 'AI service temporarily unavailable. Please try again.',
        error: 'AI_SERVICE_ERROR'
      }, { status: 503 });
    }
    
    if (error.message.includes('Database')) {
      return NextResponse.json({
        success: false,
        message: 'Database error. Please try again.',
        error: 'DATABASE_ERROR'
      }, { status: 500 });
    }

    return NextResponse.json({
      success: false,
      message: 'Failed to create RFP. Please try again.',
      error: 'INTERNAL_ERROR'
    }, { status: 500 });
  }
}
