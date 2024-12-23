import { UploadImage } from "@/actions/UploadAction";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
    const formData = await request.json();
    
    try {
      // Generate slug from name if it exists
      let slug = '';
      if (formData.prname) {
        slug = formData.prname.toLowerCase().replace(/ /g, "-");
        
        // Check if the slug already exists
        let existingProduct = await prisma.product.findUnique({
          where: { slug },
        });
  
        // If the slug exists, append a number to make it unique
        let counter = 1;
        while (existingProduct) {
          slug = `${formData.prname.toLowerCase().replace(/ /g, "-")}-${counter}`;
          existingProduct = await prisma.product.findUnique({
            where: { slug },
          });
          counter++;
        }
      }
  
      // Calculate avgTimeAdoption only if both fields exist
      const avgTimeAdoption = formData.adoptionPeriod && formData.adoptionPeriodUnit 
        ? `${formData.adoptionPeriod} ${formData.adoptionPeriodUnit}`
        : null;
  
      // Create a clean data object with only the fields that exist
      const cleanData = {
        isVendorVerified: false,
        
        name: formData.prname || null,
        slug: slug || null,
        logoUrl: formData.logoUrl || null,
        category: formData.category || null,
        deployement: formData.deployment || null,
        mobileAvailable: formData.mobileAccessibility || null,
        focusCountries: formData.focusCountries || [],
        avgTimeAdoption,
        languages: formData.languages || [],
        securityCertificate: formData.securityCertificate || null,
        integration: formData.integrations || [],
        description: formData.description || null,
        usp: formData.usp || null,
        upcomingUpdates: formData.upcomingUpdates || null,
        userCategory: formData.userCategory || null,
        industry: formData.industry || [],
        practiceAreas: formData.practiceAreas || [],
        teamSize: formData.teamSize || null,
        processLifecycle: formData.processLifecycle || null,
        features: formData.features || [],
        painPointAddressed: formData.painPointAddressed || null,
        websiteUrl: formData.websiteUrl || null,
        freeTrial: formData.freeTrial || null,
        timePeriod: formData.timePeriod || null,
        pricingModel: formData.pricingModel || [],
        contractPeriod: formData.contractPeriod || null,
        nameofPlan: formData.nameofPlan || null,
        validity: formData.validity || null,
        price: formData.price || null,
        pricingParams: formData.pricingParams || [],
        freeVersion: formData.freeVersion || null,
        Demo: formData.Demo || null,
        support: formData.support || null,
        training: formData.training || null,
        storage: formData.storage || [],
        fileSize: formData.fileSize || [],
        maintenance: formData.maintenance || null,
        reqForChange: formData.reqForChange || null,
        trainingReq: formData.trainingReq || null,
        dataMigration: formData.dataMigration || null,
        Images: formData.ImagesUrl || null,
        videoUrl: formData.videoUrl || null,
        youtubeUrl: formData.youtubeUrl || null,
        linkedinUrl: formData.linkedinUrl || null,
        twitterUrl: formData.twitterUrl || null,
        instagramUrl: formData.instagramUrl || null,
        attachments: formData.attachmentUrl || null,
        featured: false
      };
  
      // Remove any null values to avoid database constraints
      const finalData = Object.fromEntries(
        Object.entries(cleanData).filter(([_, value]) => value !== null)
      );
  
      const product = await prisma.product.create({
        data: finalData,
      });
  
      return new Response(
        JSON.stringify({
          success: true,
          msg: "Product created successfully",
          product: product.id,
        }),
        { status: 200 }
      );
    } catch (error) {
      console.error(error);
      return new Response(
        JSON.stringify({
          success: false,
          msg: "Error creating product",
          error: error instanceof Error ? error.message : "Unknown error",
        }),
        { status: 500 }
      );
    }
  }