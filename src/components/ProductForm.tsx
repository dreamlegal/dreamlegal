import React, { useState } from 'react'
import z from  "zod"
import { ProductInfo } from '@/store/useStore';
import ProductInformation from './ProductForms/ProductInformation';
import ProductOverview from './ProductForms/ProductOverview';
import ProductReference from './ProductForms/ProductReference';
import ProductOptions from './ProductForms/ProductPostImplementationService';
// import ProductSAndS from './ProductForms/ProductSAndS';
import ProductLifeCycle from './ProductForms/ProductLifeCycle';

const ProductForm = ({ editing = false }: { editing: boolean }) => {
    const {
        productName, setProductName,
        logoUrl, setLogoUrl,
        category, setCategory,
        deployment, setDeployment,
        mobileAvailable, setMobileAvailable,
        focusCountries, setFocusCountries,
        avgTimeAdoption, setAvgTimeAdoption,
        languages, setLanguages,
        securityCertificate, setSecurityCertificate,
        integration, setIntegration,
        description, setDescription,
        usp, setUSP,
        upcomingUpdates, setUpcomingUpdates,
        userCategory, setUserCategory,
        industry, setIndustry,
        practiceAreas, setPracticeAreas,
        teamSize, setTeamSize,
        processLifecycle, setProcessLifecycle,
        features, setFeatures,
        price, setPrice,
        pricingModel, setPricingModel,
        contractPeriod, setContractPeriod,
        demo, setDemo,
        support, setSupport,
        training, setTraining,
        storage, setStorage,
        fileSize, setFileSize,
        maintenance, setMaintenance,
        reqForChange, setReqForChange,
        dataMigration, setDataMigration,
        images, setImages,
        videoUrl, setVideoUrl,
        attachments, setAttachments,
        youtubeUrl, setYoutubeUrl,
        linkedinUrl, setLinkedinUrl,
        twitterUrl, setTwitterUrl,
        instagramUrl, setInstagramUrl
      } = ProductInfo();

      
      const [shouldShowProductInformation ,setShouldShowProductInformation] = useState(true)
  return (
    <>
    <h1>Product Name : {productName}</h1>
    <h1>Product Name : {description}</h1>
    <h1>Product Name : {logoUrl}</h1>
    <h1>Product Name : {training}</h1>
    <h1>Product Name : {maintenance}</h1>
    <h1>Product Name : {reqForChange}</h1>
    <h1>Product Name : {dataMigration}</h1>
    <h1>Product Name : {category}</h1>



    <ProductInformation />
    {shouldShowProductInformation && <ProductOptions/>}
    {/* <ProductLifeCycle/> */}
    {/* <ProductSAndS/> */}
    <ProductOverview/>
    
   

    </>
    
  )
}

export default ProductForm



