import prisma from "@/lib/prisma";

export async function PUT(request: Request) {
  const {
    id, // Include id for update scenario
    userId,
    prname,
    logoUrl,
    category,
    deployment,
    mobileAccessibility,
    adoptionPeriod,
    adoptionPeriodUnit,
    languages,
    securityCertificate,
    integrations,
    description,
    usp,
    upcomingUpdates,
    userCategory,
    industry,
    industryPercentage,
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
    price,
    pricingParams,
    Demo,
    DemoNote,
    support,
    supportNote,
    training,
    trainingNote,
    storage,
    storageNote,
    fileSize,
    fileSizeNote,
    maintenance,
    maintenanceNote,
    reqForChange,
    reqForChangeNote,
    trainingReq,
    trainingReqNote,
    dataMigration,
    dataMigrationNote,
    Images,
    videoUrl,
    attachments,
    youtubeUrl,
    linkedinUrl,
    twitterUrl,
    instagramUrl,
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

    const avgTimeAdoption = adoptionPeriod + " " + adoptionPeriodUnit;

    let product;
    if (id) {
      // Update existing product
      product = await prisma.product.update({
        where: { id },
        data: {
          name: prname,
          logoUrl,
          category,
          deployement: deployment,
          mobileAvailable: mobileAccessibility, // boolean value
          avgTimeAdoption,
          languages,
          securityCertificate,
          integration: integrations,
          companyId: findCompanyId.id,
          userId,
          description,
          usp,
          upcomingUpdates,
          userCategory,
          industry,
          industryPercentage,
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
          price,
          pricingParams,
          Demo,
          DemoNote,
          support,
          supportNote,
          training,
          trainingNote,
          storage,
          storageNote,
          fileSize,
          fileSizeNote,
          maintenance,
          maintenanceNote,
          reqForChange,
          reqForChangeNote,
          trainingReq,
          trainingReqNote,
          dataMigration,
          dataMigrationNote,
          Images,
          videoUrl,
          attachments,
          youtubeUrl,
          linkedinUrl,
          twitterUrl,
          instagramUrl,
        },
      });
    }
    return new Response(
      JSON.stringify({
        success: true,
        msg: "Product updated successfully",
        product: product,
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
