import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const {
    id,
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
    userCategoryPercentage,
    industry,
    industryPercentage,
    practiceAreas,
    practiceAreasPercentage,
    teamSize,
    teamSizePercentage,
    processLifecycle,
    features,
    freeTrial,
    timePeriod,
    timePeriodUnit,
    freeVersion,
    pricingModel,
    contractPeriod,
    contractUnit,
    nameofPlan1,
    nameofPlan2,
    nameofPlan3,
    validity1,
    validity2,
    validity3,
    price1,
    price2,
    price3,
    pricingParams,
    Images,
    attachments,
    Demo,
    DemoNote,
    support,
    supportNote,
    training,
    trainingNote,
    storage,
    storageNote,
    storageUnit,
    fileSizeUnit,
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
    videoUrl,
    ImageUrl,
    youtubeUrl,
    linkedinUrl,
    twitterUrl,
    instagramUrl,
    attachmentUrl,
  } = await request.json();

  if (!id || !userId) {
    return Response.json(
      {
        msg: "Please provide product ID and user ID",
        success: false,
      },
      {
        status: 400,
      }
    );
  }

  try {
    const findCompanyId = await prisma.companyInfo.findFirst({
      where: { userId },
    });

    if (!findCompanyId) {
      return Response.json(
        {
          msg: "User not found",
          success: false,
        },
        {
          status: 400,
        }
      );
    }

    const name = prname;
    const avgTimeAdoption = adoptionPeriod + " " + adoptionPeriodUnit;
    const timePeriodServer = timePeriod + " " + timePeriodUnit;
    const nameofPlan = [nameofPlan1, nameofPlan2, nameofPlan3];
    const validity = [validity1, validity2, validity3];
    const price = [price1, price2, price3];
    const MinContarct = contractPeriod + " " + contractUnit;
    const storageServer = storage + " " + storageUnit;
    const fileSizeServer = fileSize + " " + fileSizeUnit;
    const userCategoryPercentageString = userCategoryPercentage.map(
      (number: number) => String(number)
    );
    const industryPercentageString = industryPercentage.map((number: number) =>
      String(number)
    );
    const practiceAreasPercentageString = practiceAreasPercentage.map(
      (number: number) => String(number)
    );
    const teamSizePercentageString = teamSizePercentage.map((number: number) =>
      String(number)
    );

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        userId,
        companyId: findCompanyId.id,
        name,
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
        userCategoryPercentage: userCategoryPercentageString,
        industry,
        industryPercentage: industryPercentageString,
        practiceAreas,
        practiceAreasPercentage: practiceAreasPercentageString,
        teamSize,
        teamsizePercentage: teamSizePercentageString,
        processLifecycle,
        features,
        freeTrial,
        timePeriod: timePeriodServer,
        pricingModel,
        contractPeriod: MinContarct,
        nameofPlan,
        validity,
        price,
        pricingParams,
        freeVersion,
        Demo,
        DemoNote,
        support,
        supportNote,
        training,
        trainingNote,
        storage: [storageServer],
        storageNote,
        fileSize: [fileSizeServer],
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
        youtubeUrl,
        linkedinUrl,
        twitterUrl,
        instagramUrl,
        attachments,
      },
    });

    return Response.json(
      {
        msg: "Product updated successfully",
        success: true,
        product: updatedProduct,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        msg: "An error occurred while updating the product.",
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
