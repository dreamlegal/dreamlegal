// // app/api/rfp/send-email/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import prisma from '@/lib/prisma';
// import nodemailer from 'nodemailer';

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASSWORD,
//   },
// });

// export async function POST(req: NextRequest) {
//   console.log('========== SEND EMAIL API CALLED ==========');
  
//   try {
//     let body;
//     try {
//       body = await req.json();
//       console.log('1. Request body received:', body);
//     } catch (parseError) {
//       console.error('JSON Parse Error:', parseError);
//       return NextResponse.json(
//         { success: false, message: 'Invalid request body - must be valid JSON' },
//         { status: 400 }
//       );
//     }

//     const { rfpId, email } = body;
    
//     console.log('2. Extracted data:', { rfpId, email });

//     if (!rfpId || !email) {
//       console.log('ERROR: Missing required fields');
//       return NextResponse.json(
//         { success: false, message: 'RFP ID and email are required' },
//         { status: 400 }
//       );
//     }

//     // Validate email format
//     const emailRegex = /\S+@\S+\.\S+/;
//     if (!emailRegex.test(email)) {
//       return NextResponse.json(
//         { success: false, message: 'Invalid email format' },
//         { status: 400 }
//       );
//     }

//     console.log('3. Fetching RFP with ID:', rfpId, 'Type:', typeof rfpId);

//     const rfpIdNumber = typeof rfpId === 'string' ? parseInt(rfpId) : rfpId;
    
//     console.log('4. Converted RFP ID:', rfpIdNumber);

//     // Fetch RFP data
//     const rfp = await prisma.rfpStructured.findUnique({
//       where: { id: rfpIdNumber },
//     });

//     console.log('5. RFP found:', rfp ? 'YES' : 'NO');

//     if (!rfp) {
//       return NextResponse.json(
//         { success: false, message: 'RFP not found' },
//         { status: 404 }
//       );
//     }

//     // ============================================
//     // STEP: Match Vendors if not already matched
//     // ============================================
//     let vendors = [];
    
//     if (!rfp.vendors || rfp.vendors.length === 0) {
//       console.log('6. No vendors matched yet, triggering vendor matching...');
      
//       try {
//         // Call the vendor matching API internally
//         const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
//         const matchResponse = await fetch(`${baseUrl}/api/rfp/${rfpIdNumber}/match-vendors`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });

//         const matchResult = await matchResponse.json();
//         console.log('7. Vendor matching result:', matchResult.success ? 'SUCCESS' : 'FAILED');
        
//         if (matchResult.success) {
//           // Fetch the updated RFP with vendors
//           const updatedRfp = await prisma.rfpStructured.findUnique({
//             where: { id: rfpIdNumber },
//           });
          
//           if (updatedRfp && updatedRfp.vendors && updatedRfp.vendors.length > 0) {
//             console.log('8. Fetching matched vendor details...');
//           vendors = await prisma.legalSoftware.findMany({
//   where: {
//     id: { in: rfp.vendors },
//   },
//   select: {
//     id: true,
//     slug: true,  // ADD THIS
//     productName: true,
//     companyName: true,
//     description: true,
//     logoUrl: true,
//     pricingTier: true,
//     startingPrice: true,
//     bestKnownFor: true,
//     topUseCases: true,
//   },
// });
//             console.log('9. Vendors fetched:', vendors.length);
//           }
//         } else {
//           console.warn('Vendor matching failed:', matchResult.message);
//         }
//       } catch (matchError) {
//         console.error('Error during vendor matching:', matchError);
//         // Continue with email even if vendor matching fails
//       }
//     } else {
//       console.log('6. Vendors already matched, fetching details...');
//       vendors = await prisma.legalSoftware.findMany({
//         where: {
//           id: { in: rfp.vendors },
//         },
//         select: {
//           id: true,
//           productName: true,
//           companyName: true,
//           description: true,
//           logoUrl: true,
//           pricingTier: true,
//           startingPrice: true,
//           bestKnownFor: true,
//           topUseCases: true,
//         },
//       });
//       console.log('7. Vendors found:', vendors.length);
//     }

//     // Generate email HTML
//     console.log('10. Generating email HTML...');
//     const emailHtml = generateEmailHtml(rfp, vendors, rfpIdNumber.toString());

//     // Send email
//     console.log('11. Sending email to:', email);
    
//     if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
//       console.error('ERROR: Email credentials not configured');
//       return NextResponse.json(
//         { success: false, message: 'Email service not configured' },
//         { status: 500 }
//       );
//     }

//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: `Your RFP for ${rfp.category} - Legal Software Solutions`,
//       html: emailHtml,
//     };

//     const emailResult = await transporter.sendMail(mailOptions);
//     console.log('12. Email sent successfully!', emailResult.messageId);

//     return NextResponse.json({
//       success: true,
//       message: 'Email sent successfully',
//       vendorsMatched: vendors.length,
//     });

//   } catch (error) {
//     console.error('========== ERROR ==========');
//     console.error('Error type:', error?.constructor?.name);
//     console.error('Error message:', error instanceof Error ? error.message : 'Unknown');
//     console.error('Error stack:', error instanceof Error ? error.stack : 'No stack');
//     console.error('===========================');
    
//     return NextResponse.json(
//       { 
//         success: false, 
//         message: 'Failed to send email', 
//         error: error instanceof Error ? error.message : 'Unknown error'
//       },
//       { status: 500 }
//     );
//   }
// }
// app/api/rfp/send-email/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(req: NextRequest) {
  console.log('========== SEND EMAIL API CALLED ==========');
  
  try {
    let body;
    try {
      body = await req.json();
      console.log('1. Request body received:', body);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      return NextResponse.json(
        { success: false, message: 'Invalid request body - must be valid JSON' },
        { status: 400 }
      );
    }

    const { rfpId, email } = body;
    
    if (!rfpId || !email) {
      return NextResponse.json(
        { success: false, message: 'RFP ID and email are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 }
      );
    }

    const rfpIdNumber = typeof rfpId === 'string' ? parseInt(rfpId) : rfpId;
    
    console.log('2. Fetching RFP with ID:', rfpIdNumber);

    // Fetch RFP data
    let rfp = await prisma.rfpStructured.findUnique({
      where: { id: rfpIdNumber },
    });

    if (!rfp) {
      return NextResponse.json(
        { success: false, message: 'RFP not found' },
        { status: 404 }
      );
    }

    console.log('3. RFP found, checking vendors...');
    console.log('4. Current vendors:', rfp.vendors);

    // ============================================
    // STEP: Match Vendors if not already matched
    // ============================================
    let vendors = [];
    let vendorMatchingAttempted = false;
    
    if (!rfp.vendors || rfp.vendors.length === 0) {
      console.log('5. No vendors matched yet, triggering vendor matching...');
      vendorMatchingAttempted = true;
      
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        
        console.log('6. Calling vendor matching API...');
        const matchResponse = await fetch(`${baseUrl}/api/rfp/${rfpIdNumber}/match-vendors`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const matchResult = await matchResponse.json();
        console.log('7. Vendor matching response:', matchResult);
        
        if (matchResult.success) {
          console.log('8. Vendor matching successful!');
          
          // IMPORTANT: Wait a bit and then fetch the UPDATED RFP from database
          // This ensures we get the RFP with the newly matched vendors
          await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
          
          const updatedRfp = await prisma.rfpStructured.findUnique({
            where: { id: rfpIdNumber },
          });
          
          console.log('9. Fetched updated RFP, vendors:', updatedRfp?.vendors);
          
          if (updatedRfp && updatedRfp.vendors && updatedRfp.vendors.length > 0) {
            console.log('10. Fetching vendor details for:', updatedRfp.vendors);
            
            vendors = await prisma.legalSoftware.findMany({
              where: {
                id: { in: updatedRfp.vendors },
              },
              select: {
                id: true,
                slug: true,
                productName: true,
                companyName: true,
                description: true,
                logoUrl: true,
                pricingTier: true,
                startingPrice: true,
                bestKnownFor: true,
                topUseCases: true,
              },
            });
            
            // Order vendors according to the updatedRfp.vendors array
            const orderedVendors = updatedRfp.vendors
              .map(id => vendors.find(v => v.id === id))
              .filter(Boolean);
            
            vendors = orderedVendors;
            
            console.log('11. Vendors fetched and ordered:', vendors.length);
          } else {
            console.warn('10. Updated RFP still has no vendors');
          }
        } else {
          console.error('8. Vendor matching failed:', matchResult.message);
        }
      } catch (matchError) {
        console.error('Error during vendor matching:', matchError);
        // Continue with email even if vendor matching fails
      }
    } else {
      console.log('5. Vendors already matched, fetching details...');
      
      vendors = await prisma.legalSoftware.findMany({
        where: {
          id: { in: rfp.vendors },
        },
        select: {
          id: true,
          slug: true,
          productName: true,
          companyName: true,
          description: true,
          logoUrl: true,
          pricingTier: true,
          startingPrice: true,
          bestKnownFor: true,
          topUseCases: true,
        },
      });
      
      // Order vendors according to rfp.vendors array
      const orderedVendors = rfp.vendors
        .map(id => vendors.find(v => v.id === id))
        .filter(Boolean);
      
      vendors = orderedVendors;
      
      console.log('6. Vendors found:', vendors.length);
    }

    // Generate email HTML
    console.log('12. Generating email HTML with', vendors.length, 'vendors...');
    const emailHtml = generateEmailHtml(rfp, vendors, rfpIdNumber.toString());

    // Send email
    console.log('13. Sending email to:', email);
    
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.error('ERROR: Email credentials not configured');
      return NextResponse.json(
        { success: false, message: 'Email service not configured' },
        { status: 500 }
      );
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Your RFP for ${rfp.category} - Legal Software Solutions`,
      html: emailHtml,
    };

    const emailResult = await transporter.sendMail(mailOptions);
    console.log('14. Email sent successfully!', emailResult.messageId);

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
      vendorsMatched: vendors.length,
      vendorMatchingAttempted,
    });

  } catch (error) {
    console.error('========== ERROR ==========');
    console.error('Error type:', error?.constructor?.name);
    console.error('Error message:', error instanceof Error ? error.message : 'Unknown');
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack');
    console.error('===========================');
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to send email', 
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}



function generateEmailHtml(rfp: any, vendors: any[], rfpId: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const rfpUrl = `${baseUrl}/rfp/${rfpId}`;
  const vendorsUrl = `${baseUrl}/rfp/${rfpId}/vendors`;

  const getPricingTierDisplay = (tier: string) => {
    const tiers: { [key: string]: { label: string; symbol: string; color: string } } = {
      'BUDGET': { label: 'Budget', symbol: '$', color: '#10b981' },
      'MID_RANGE': { label: 'Mid-Range', symbol: '$$', color: '#3b82f6' },
      'PREMIUM': { label: 'Premium', symbol: '$$$', color: '#8b5cf6' },
      'ENTERPRISE': { label: 'Enterprise', symbol: '$$$+', color: '#ef4444' }
    };
    return tiers[tier] || { label: tier, symbol: '$', color: '#6b7280' };
  };

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your RFP is Ready</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #2d2d2d; background-color: #f9fafb; }
    .container { max-width: 650px; margin: 0 auto; background-color: #ffffff; }
    .header { background: linear-gradient(135deg, #1e2556 0%, #7cc6ee 100%); padding: 40px 30px; text-align: center; color: #ffffff; }
    .header h1 { font-size: 28px; font-weight: bold; margin-bottom: 10px; }
    .header p { font-size: 16px; opacity: 0.95; }
    .content { padding: 40px 30px; }
    .section { margin-bottom: 35px; }
    .section-title { font-size: 20px; font-weight: bold; color: #1e2556; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 2px solid #7cc6ee; }
    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px; }
    .info-item { background-color: #f3f4f6; padding: 15px; border-radius: 8px; }
    .info-label { font-size: 12px; color: #6b7280; font-weight: 600; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 0.5px; }
    .info-value { font-size: 14px; color: #1e2556; font-weight: 500; }
    .problem-statement { background-color: #eff6ff; border-left: 4px solid #7cc6ee; padding: 20px; border-radius: 8px; line-height: 1.8; }
    .objectives-list { list-style: none; margin-top: 15px; }
    .objectives-list li { padding: 12px 0; padding-left: 30px; position: relative; border-bottom: 1px solid #e5e7eb; }
    .objectives-list li:before { content: "✓"; position: absolute; left: 0; color: #7cc6ee; font-weight: bold; font-size: 18px; }
    .feature-item { border-left: 4px solid #7cc6ee; padding-left: 15px; margin-bottom: 20px; }
    .feature-name { font-weight: 600; color: #1e2556; margin-bottom: 8px; font-size: 15px; }
    .feature-description { color: #4b5563; font-size: 14px; line-height: 1.6; }
    .functionality-item { border-left: 4px solid #00d4aa; padding-left: 15px; margin-bottom: 20px; }
    .vendor-card { background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); transition: box-shadow 0.3s; }
    .vendor-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
    .vendor-badge { background-color: #1e2556; color: white; display: inline-block; padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: bold; margin-bottom: 15px; }
    .vendor-header { display: flex; align-items: center; margin-bottom: 15px; }
    .vendor-logo { width: 50px; height: 50px; border-radius: 8px; object-fit: contain; margin-right: 15px; background-color: #f9fafb; padding: 5px; }
    .vendor-info h3 { font-size: 18px; font-weight: bold; color: #1e2556; margin-bottom: 3px; }
    .vendor-info p { font-size: 13px; color: #6b7280; }
    .vendor-description { color: #4b5563; font-size: 14px; line-height: 1.7; margin-bottom: 15px; }
    .features-tags { margin: 15px 0; }
    .feature-tag { display: inline-block; background-color: #eff6ff; color: #1e2556; padding: 6px 12px; border-radius: 6px; font-size: 12px; margin: 4px 4px 4px 0; }
    .pricing-box { background-color: #f9fafb; padding: 12px; border-radius: 6px; margin: 15px 0; }
    .view-product-btn { display: inline-block; background-color: #7cc6ee; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; margin-top: 10px; }
    .view-product-btn:hover { background-color: #5bb5dd; }
    .cta-section { background: linear-gradient(135deg, #1e2556 0%, #7cc6ee 100%); padding: 40px 30px; text-align: center; }
    .cta-button { display: inline-block; background-color: #ffffff; color: #1e2556; padding: 15px 35px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px; margin: 10px; }
    .cta-button:hover { background-color: #f0f0f0; }
    .footer { background-color: #f9fafb; padding: 30px; text-align: center; color: #6b7280; font-size: 12px; line-height: 1.8; }
    .footer a { color: #7cc6ee; text-decoration: none; }
    .divider { height: 1px; background-color: #e5e7eb; margin: 30px 0; }
    @media only screen and (max-width: 600px) {
      .info-grid { grid-template-columns: 1fr; }
      .header h1 { font-size: 24px; }
      .content { padding: 25px 20px; }
      .vendor-header { flex-direction: column; align-items: flex-start; }
      .vendor-logo { margin-bottom: 10px; }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1>🎉 Your RFP is Ready!</h1>
      <p>Complete RFP with ${vendors.length > 0 ? `${vendors.length} matched vendors` : 'detailed requirements'}</p>
    </div>

    <!-- Main Content -->
    <div class="content">
      <!-- Key Information -->
      <div class="section">
        <h2 class="section-title">📋 Key Information</h2>
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">Category</div>
            <div class="info-value">${rfp.category || 'N/A'}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Team Type</div>
            <div class="info-value">${rfp.teamType || 'N/A'}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Team Size</div>
            <div class="info-value">${rfp.teamSize || 'N/A'}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Timeline</div>
            <div class="info-value">${rfp.requirementUrgency || 'N/A'}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Location</div>
            <div class="info-value">${rfp.locationPreference || 'N/A'}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Contact</div>
            <div class="info-value">${rfp.contactEmail || 'N/A'}</div>
          </div>
        </div>
      </div>

      <!-- Problem Statement -->
      <div class="section">
        <h2 class="section-title">🎯 Problem Statement</h2>
        <div class="problem-statement">
          ${rfp.problemStatement || 'No problem statement provided'}
        </div>
      </div>

      <!-- Objectives -->
      ${rfp.objectives && Array.isArray(rfp.objectives) && rfp.objectives.length > 0 ? `
      <div class="section">
        <h2 class="section-title">✅ Objectives</h2>
        <ul class="objectives-list">
          ${rfp.objectives.map((obj: string) => `<li>${obj}</li>`).join('')}
        </ul>
      </div>
      ` : ''}

      <!-- Key Features -->
      ${rfp.keyFeatures && Array.isArray(rfp.keyFeatures) && rfp.keyFeatures.length > 0 ? `
      <div class="section">
        <h2 class="section-title">⭐ Key Features Required</h2>
        ${rfp.keyFeatures.map((feature: any) => `
          <div class="feature-item">
            <div class="feature-name">${feature.name}</div>
            <div class="feature-description">${feature.description}</div>
          </div>
        `).join('')}
      </div>
      ` : ''}

      <!-- Key Functionalities -->
      ${rfp.keyFunctionalities && Array.isArray(rfp.keyFunctionalities) && rfp.keyFunctionalities.length > 0 ? `
      <div class="section">
        <h2 class="section-title">⚙️ Key Functionalities Required</h2>
        ${rfp.keyFunctionalities.map((func: any) => `
          <div class="functionality-item">
            <div class="feature-name">${func.name}</div>
            <div class="feature-description">${func.description}</div>
          </div>
        `).join('')}
      </div>
      ` : ''}

      <div class="divider"></div>

      <!-- Matched Vendors -->
      ${vendors.length > 0 ? `
      <div class="section">
        <h2 class="section-title">🏆 Top ${vendors.length} Matched Vendors</h2>
        <p style="color: #6b7280; margin-bottom: 25px; font-size: 15px;">
          Based on your requirements, we've identified these vendors as the best fit for your organization.
        </p>
        
        ${vendors.map((vendor, index) => {
          const pricingInfo = getPricingTierDisplay(vendor.pricingTier);
          const productUrl = vendor.slug ? `${baseUrl}/product/${vendor.slug}` : '#';
          
          return `
          <div class="vendor-card">
            <div class="vendor-badge">#${index + 1} Best Match</div>
            
            <div class="vendor-header">
              ${vendor.logoUrl ? `<img src="${vendor.logoUrl}" alt="${vendor.companyName}" class="vendor-logo" />` : ''}
              <div class="vendor-info">
                <h3>${vendor.productName}</h3>
                <p>${vendor.companyName}</p>
              </div>
            </div>
            
            <div class="vendor-description">
              ${vendor.description || 'No description available'}
            </div>
            
            ${vendor.bestKnownFor && Array.isArray(vendor.bestKnownFor) && vendor.bestKnownFor.length > 0 ? `
            <div class="features-tags">
              <strong style="font-size: 13px; color: #1e2556; display: block; margin-bottom: 8px;">Best Known For:</strong>
              ${vendor.bestKnownFor.slice(0, 4).map((feature: string) => 
                `<span class="feature-tag">${feature}</span>`
              ).join('')}
            </div>
            ` : ''}
            
            ${vendor.startingPrice ? `
            <div class="pricing-box">
              <span style="color: #6b7280; font-size: 13px;">Starting from: </span>
              <strong style="color: #1e2556; font-size: 15px;">${vendor.startingPrice}</strong>
              <span style="color: ${pricingInfo.color}; margin-left: 10px; font-weight: 600;">${pricingInfo.symbol}</span>
            </div>
            ` : ''}
            
            ${vendor.slug ? `
            <a href="${productUrl}" class="view-product-btn">View Full Product Details →</a>
            ` : ''}
          </div>
          `;
        }).join('')}
      </div>
      ` : `
      <div class="section">
        <p style="color: #6b7280; text-align: center; padding: 30px; background-color: #f9fafb; border-radius: 8px;">
          🔄 Vendor matching is in progress. You'll receive an update once vendors are matched with your RFP.
        </p>
      </div>
      `}
    </div>

    <!-- CTA Section -->
    <div class="cta-section">
      <h2 style="color: #ffffff; margin-bottom: 15px; font-size: 24px;">📄 Access Your Complete RFP</h2>
      <p style="color: rgba(255, 255, 255, 0.9); margin-bottom: 30px; font-size: 15px;">
        View, edit, and share your RFP anytime
      </p>
      <a href="${rfpUrl}" class="cta-button">View Full RFP Document</a>
      ${vendors.length > 0 ? `<a href="${vendorsUrl}" class="cta-button">View All Matched Vendors</a>` : ''}
    </div>

    <!-- Footer -->
    <div class="footer">
      <p><strong>Your RFP is saved and accessible at:</strong></p>
      <p style="margin: 10px 0;"><a href="${rfpUrl}">${rfpUrl}</a></p>
      <p style="margin-top: 20px; color: #9ca3af;">
        © ${new Date().getFullYear()} Legal Software Solutions. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>
  `;
}