import { UploadImage } from "@/actions/UploadAction";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const {
    userId,
    prname,
    logoUrl,
    category,
    deployment,
    mobileAccessibility,
    adoptionPeriod,
    adoptionPeriodUnit,
    languages,
    focusCountries,
    securityCertificate,
    integrations,

    description,
    usp,
    upcomingUpdates,

    userCategory,
    
    industry,
   
    practiceAreas,
   
    teamSize,
    

    processLifecycle,
    
    features,

    freeTrial,
    timePeriod,
    
    freeVersion,
    pricingModel,
    contractPeriod,
    
    nameofPlan,
   
    validity,
    
    painPointAddressed,
    websiteUrl,
    price,
   
    pricingParams,

    Demo,
    
    support,
   
    training,
    
    storage,
    
    fileSize,
    
    maintenance,
    
    reqForChange,
    
    trainingReq,
    
    dataMigration,
    
    videoUrl,
    
    youtubeUrl,
    linkedinUrl,
    twitterUrl,
    instagramUrl,
   
    attachmentUrl,
    ImagesUrl,
  } = await request.json();

  if (!userId) {
    return new Response(
      JSON.stringify({ success: false, msg: "Missing required fields" }),
      { status: 400 }
    );
  }

  try {
    const findCompanyId = await prisma.companyInfo.findFirst({
      where: { userId },
    });

    if (!findCompanyId) {
      return new Response(
        JSON.stringify({ success: false, msg: "Profile not completed" }),
        { status: 404 }
      );
    }

    const name = prname;
    const avgTimeAdoption = adoptionPeriod + " " + adoptionPeriodUnit;
    
    
    let slug = name.toLowerCase().replace(/ /g, "-");

    // Check if the slug already exists
    let existingProduct = await prisma.product.findUnique({
      where: { slug },
    });

    // If the slug exists, append a number to make it unique
    let counter = 1;
    while (existingProduct) {
      slug = `${name.toLowerCase().replace(/ /g, "-")}-${counter}`;
      existingProduct = await prisma.product.findUnique({
        where: { slug },
      });
      counter++;
    }

    const product = await prisma.product.create({
      data: {
        userId,
        companyId: findCompanyId.id,
        featured: false,
        name,
        slug, // Include slug in the data
        logoUrl,
        category,
        deployement: deployment,
        mobileAvailable: mobileAccessibility,
        focusCountries,
        avgTimeAdoption,
        languages,
        securityCertificate,
        integration: integrations,
        description,
        usp,
        upcomingUpdates,
        userCategory,
        
        industry,
      
        practiceAreas,
      
        teamSize,
      
        processLifecycle,

        features,
        painPointAddressed,
        websiteUrl,
        freeTrial,
        timePeriod: timePeriod,
        pricingModel: pricingModel || ["dummy"],
        contractPeriod: contractPeriod,
        nameofPlan,
        validity,
        price,
        pricingParams,

        freeVersion,

        Demo,
        
        support,
        
        training,
        
        storage: storage,
        
        fileSize: fileSize,
        maintenance,
        
        reqForChange,
        
        trainingReq,
        
        dataMigration,
        
        Images: ImagesUrl,
        videoUrl,
        youtubeUrl,
        linkedinUrl,
        twitterUrl,
        instagramUrl,
        attachments: attachmentUrl,
      },
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
      }),
      { status: 500 }
    );
  }
}
