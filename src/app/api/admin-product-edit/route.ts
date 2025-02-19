import { UploadImage } from "@/actions/UploadAction";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
    const formData = await request.json();
    console.log("this is the form data",formData);
    try {
      // Check if product exists
      const productId = formData.id;
      if (!productId) {
        return new Response(
          JSON.stringify({
            success: false,
            msg: "Product ID is required"
          }),
          { status: 400 }
        );
      }
      console.log("this is the product id",productId);
      const existingProduct = await prisma.product.findUnique({
        where: { id: productId },
      });

      if (!existingProduct) {
        return new Response(
          JSON.stringify({
            success: false,
            msg: "Product not found"
          }),
          { status: 404 }
        );
      }

      // Handle slug update if name changes
      let slug = existingProduct.slug;
      if (formData.prname && formData.prname !== existingProduct.name) {
        let newSlug = formData.prname.toLowerCase().replace(/ /g, "-");
        let slugExists = await prisma.product.findFirst({
          where: { 
            slug: newSlug,
            id: { not: productId }
          },
        });

        let counter = 1;
        while (slugExists) {
          newSlug = `${formData.prname.toLowerCase().replace(/ /g, "-")}-${counter}`;
          slugExists = await prisma.product.findFirst({
            where: { 
              slug: newSlug,
              id: { not: productId }
            },
          });
          counter++;
        }
        slug = newSlug;
      }

      // Calculate avgTimeAdoption if both fields exist
      const avgTimeAdoption = formData.adoptionPeriod && formData.adoptionPeriodUnit 
        ? `${formData.adoptionPeriod} ${formData.adoptionPeriodUnit}`
        : existingProduct.avgTimeAdoption;

      // Create update data object matching the frontend structure
      const updateData = {
        name: formData.prname || existingProduct.name,
        slug,
        logoUrl: formData.logoUrl || existingProduct.logoUrl,
        category: formData.category || existingProduct.category,
        deployement: formData.deployment || existingProduct.deployement,
        mobileAvailable: formData.mobileAccessibility ?? existingProduct.mobileAvailable,
        focusCountries: formData.focusCountries || existingProduct.focusCountries,
        avgTimeAdoption,
        languages: formData.languages || existingProduct.languages,
        securityCertificate: formData.securityCertificate || existingProduct.securityCertificate,
        integration: formData.integrations || existingProduct.integration,
        description: formData.description || existingProduct.description,
        usp: formData.usp || existingProduct.usp,
        upcomingUpdates: formData.upcomingUpdates || existingProduct.upcomingUpdates,
        userCategory: formData.userCategory || existingProduct.userCategory,
        industry: formData.industry || existingProduct.industry,
        practiceAreas: formData.practiceAreas || existingProduct.practiceAreas,
        teamSize: formData.teamSize || existingProduct.teamSize,
        processLifecycle: formData.processLifecycle || existingProduct.processLifecycle,
        features: formData.features || existingProduct.features,
        painPointAddressed: formData.painPointAddressed || existingProduct.painPointAddressed,
        websiteUrl: formData.websiteUrl || existingProduct.websiteUrl,
        freeTrial: formData.freeTrial ?? existingProduct.freeTrial,
        timePeriod: formData.timePeriod || existingProduct.timePeriod,
        pricingModel: formData.pricingModel || existingProduct.pricingModel,
        contractPeriod: formData.contractPeriod || existingProduct.contractPeriod,
        nameofPlan: formData.nameofPlan || existingProduct.nameofPlan,
        validity: formData.validity || existingProduct.validity,
        price: formData.price || existingProduct.price,
        pricingParams: formData.pricingParams || existingProduct.pricingParams,
        freeVersion: formData.freeVersion ?? existingProduct.freeVersion,
        Demo: formData.Demo ?? existingProduct.Demo,
        support: formData.support || existingProduct.support,
        training: formData.training || existingProduct.training,
        storage: formData.storage || existingProduct.storage,
        fileSize: formData.fileSize || existingProduct.fileSize,
        maintenance: formData.maintenance || existingProduct.maintenance,
        reqForChange: formData.reqForChange || existingProduct.reqForChange,
        trainingReq: formData.trainingReq || existingProduct.trainingReq,
        dataMigration: formData.dataMigration || existingProduct.dataMigration,
        Images: formData.ImageUrl || existingProduct.Images,
        videoUrl: formData.videoUrl || existingProduct.videoUrl,
        youtubeUrl: formData.youtubeUrl || existingProduct.youtubeUrl,
        linkedinUrl: formData.linkedinUrl || existingProduct.linkedinUrl,
        twitterUrl: formData.twitterUrl || existingProduct.twitterUrl,
        instagramUrl: formData.instagramUrl || existingProduct.instagramUrl,
        attachments: formData.attachmentUrl || existingProduct.attachments,
        CompanyName: formData.companyName || existingProduct.CompanyName,
        Headquarters: formData.headquarters || existingProduct.Headquarters,
        FoundersNames: formData.foundersNames || existingProduct.FoundersNames,

        ByAdminYearFounded: formData.ByAdminYearFounded,
          
        ByAdminAwards : formData.ByAdminAwards,
        ByAdminTeamSize : formData.ByAdminTeamSize,
        ByAdminEmail  : formData.ByAdminEmail,
        ByAdminPhone : formData.ByAdminPhone,
        ByAdminWebsite : formData.ByAdminWebsite,

        featured: formData.featured ?? existingProduct.featured
      };

      // Update the product
      const updatedProduct = await prisma.product.update({
        where: { id: productId },
        data: updateData,
      });

      return new Response(
        JSON.stringify({
          success: true,
          msg: "Product updated successfully",
          product: updatedProduct.id,
        }),
        { status: 200 }
      );
    } catch (error) {
      console.error(error);
      return new Response(
        JSON.stringify({
          success: false,
          msg: "Error updating product",
          error: error instanceof Error ? error.message : "Unknown error",
        }),
        { status: 500 }
      );
    }
}