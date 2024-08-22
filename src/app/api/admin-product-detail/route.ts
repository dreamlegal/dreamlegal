import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const { id } = await request.json();

  

  if (!id) {
    return new Response(
      JSON.stringify({ success: false, msg: "Please provide Product ID" }),
      { status: 400 }
    );
  }

  try {
    const product = await prisma.product.findFirst({
      where: {
        id: id,
      },
    });

    if (!product) {
      return new Response(
        JSON.stringify({ success: false, msg: "Product not found" }),
        { status: 404 }
      );
    }

    // Split the combined fields back into individual fields
    const [adoptionPeriod, adoptionPeriodUnit] =
      product.avgTimeAdoption!.split(" ");
    const [timePeriod, timePeriodUnit] = product.timePeriod!.split(" ");
    const [contractPeriod, contractUnit] = product.contractPeriod!.split(" ");
    const [storage, storageUnit] = product.storage[0].split(" ");
    const [fileSize, fileSizeUnit] = product.fileSize[0].split(" ");

    return new Response(
      JSON.stringify({
        success: true,
        product: {
          id: product.id,
          userId: product.userId,
          prname: product.name,
          logoUrl: product.logoUrl,
          category: product.category,
          deployment: product.deployement,
          mobileAccessibility: product.mobileAvailable,
          adoptionPeriod: adoptionPeriod || "",
          adoptionPeriodUnit: adoptionPeriodUnit || "",
          languages: product.languages,
          focusCountries: product.focusCountries,
          securityCertificate: product.securityCertificate,
          integrations: product.integration,
          description: product.description?.substring(0, 100) + "...",
          usp: product.usp,
          upcomingUpdates: product.upcomingUpdates,
          userCategory: product.userCategory,
          userCategoryPercentage: product.userCategoryPercentage.map(
            (percentage: string) => Number(percentage)
          ),
          industry: product.industry,
          industryPercentage: product.industryPercentage.map(
            (percentage: string) => Number(percentage)
          ),
          practiceAreas: product.practiceAreas,
          practiceAreasPercentage: product.practiceAreasPercentage.map(
            (percentage: string) => Number(percentage)
          ),
          teamSize: product.teamSize,
          teamSizePercentage: product.teamsizePercentage.map(
            (percentage: string) => Number(percentage)
          ),
          processLifecycle: product.processLifecycle,
          features: product.features,
          freeTrial: product.freeTrial,
          timePeriod: timePeriod || "",
          timePeriodUnit: timePeriodUnit || "",
          freeVersion: product.freeVersion,
          pricingModel: product.pricingModel,
          contractPeriod: contractPeriod || "",
          contractUnit: contractUnit || "",
          nameofPlan1: product.nameofPlan[0] || "",
          nameofPlan2: product.nameofPlan[1] || "",
          nameofPlan3: product.nameofPlan[2] || "",
          validity1: product.validity[0] || "",
          validity2: product.validity[1] || "",
          validity3: product.validity[2] || "",
          price1: product.price[0] || "",
          price2: product.price[1] || "",
          price3: product.price[2] || "",
          pricingParams: product.pricingParams,
          Demo: product.Demo,
          DemoNote: product.DemoNote,
          support: product.support,
          supportNote: product.supportNote,
          training: product.training,
          trainingNote: product.trainingNote,
          storage: storage || "",
          storageUnit: storageUnit || "",
          storageNote: product.storageNote,
          fileSize: fileSize || "",
          fileSizeUnit: fileSizeUnit || "",
          fileSizeNote: product.fileSizeNote,
          maintenance: product.maintenance,
          maintenanceNote: product.maintenanceNote,
          reqForChange: product.reqForChange,
          reqForChangeNote: product.reqForChangeNote,
          trainingReq: product.trainingReq,
          trainingReqNote: product.trainingReqNote,
          dataMigration: product.dataMigration,
          dataMigrationNote: product.dataMigrationNote,
          Images: product.Images,
          videoUrl: product.videoUrl,
          youtubeUrl: product.youtubeUrl,
          linkedinUrl: product.linkedinUrl,
          twitterUrl: product.twitterUrl,
          instagramUrl: product.instagramUrl,
          attachments: product.attachments,
        },
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: false, msg: "Error fetching product" }),
      { status: 500 }
    );
  }
}
