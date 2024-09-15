// stores/useStore.js
import { create } from 'zustand';

export const ProductInfo = create((set) => ({
  // Global state properties
  // logoFile: null,
  // logoUrl: '',
  // setLogoFile: (file) => set({ logoFile: file }),
  // setLogoUrl: (url) => set({ logoUrl: url }),
  // clearLogo: () => set({ logoFile: null, logoUrl: '' }),
  // logoPreview: null,
  // setLogo: (logo) => set({ logo }),
  // logo: null,
  // setLogoPreview: (preview) => set({ logoPreview: preview }),

//   logo: { file: null, preview: null },
// setLogo: (logo) => set({ logo }),
logoFile: null,
logoPreview: null,
setLogoFile: (file) => set({ logoFile: file }),
setLogoPreview: (preview) => set({ logoPreview: preview }),

  productName: '',
  logoUrl: '',
  category: [],
  deployment: [],
  mobileAvailable: null,
  focusCountries: [],
  avgTimeAdoption: null,
  languages: [],
  securityCertificate: null,
  // integrations: [],
  // setIntegrations: (integrations) => set({ integration: integrations }),
  integrations: [],
  setIntegrations: (integrations) => set({ integrations }),
  
  adoptionPeriod: null, // initial value can be null or empty string
  setAdoptionPeriod: (period) => set({ adoptionPeriod: period }),
  
  adoptionPeriodUnit: null, // initial value for unit (e.g., 'days', 'months')
  setAdoptionPeriodUnit: (unit) => set({ adoptionPeriodUnit: unit }),
  description: '',
  usp: '',
  upcomingUpdates: '',

  userCategory: [],
  industry: [],
  practiceAreas: [],
  teamSize: [],


  // processLifecycle: [],
  processLifecycle: {},

  setProcessLifecycle: (category, selectedValues) => 
    set((state) => ({
      processLifecycle: {
        ...state.processLifecycle,
        [category]: selectedValues
      }
    })),

    features: {},

  setFeatures: (category, selectedValues) => 
    set((state) => ({
      features: {
        ...state.features,
        [category]: selectedValues
      }
    })),

 
// ...................... 


  freeTrial: null,
  timePeriod: null,
  freeVersion: null,

  pricingModel: [],
  fixPricing:false,
  setFixPricing: () => set((state) => ({ fixPricing: !state.fixPricing })),

  contractPeriod: null,
  
  nameofPlan: [],
  validity: [],
  price: [],

  pricingParams: "",
setPricingParams: (value) => set({ pricingParams: value }),
//  pricingParams: [], // Initialize as an empty array instead of an empty string
//   setPricingParams: (value) => set({ pricingParams: Array.isArray(value) ? value : [] }), // Ensure it's always an array
  setFreeTrial: (value) => set({ freeTrial: value }),
  setTimePeriod: (value) => set({ timePeriod: value }),
  setFreeVersion: (value) => set({ freeVersion: value }),
  setPricingModel: (value) => set({ pricingModel: value }),
  setContractPeriod: (value) => set({ contractPeriod: value }),
  setNameofPlan: (value) => set({ nameofPlan: value }),
  setValidity: (value) => set({ validity: value }),
  setPrice: (value) => set({ price: value }),
 

  // .................. 

  demo: [],
  support: [],
  training: [],

  storage: "",
  fileSize: "",
  // demo: {
  //   selections: [],
  //   note: ""
  // },
  // support: {
  //   selections: [],
  //   note: ""
  // },
  // training: {
  //   selections: [],
  //   note: ""
  // },
  // storage: {
  //   value: 0,
  //   unit: "",
  //   note: ""
  // },
  // fileSize: {
  //   value: 0,
  //   unit: "",
  //   note: ""
  // }
  

  maintenance: null,
  reqForChange: null,
  dataMigration: null,
  trainingReq:null,
  
  images: [],
  
  attachments: [],

  // images: [] as File[], // Initialize as empty array
  // setImages: (files: File[]) => set({ images: files }),
  // attachments: [] as File[], // Initialize as empty array
  // setAttachments: (files: File[]) => set({ attachments: files }),
  videoUrl: null,
  youtubeUrl: null,
  linkedinUrl: null,
  twitterUrl: null,
  instagramUrl: null,



  // Global state update functions
  setProductName: (name) => set({ productName: name }),
  setLogoUrl: (url) => set({ logoUrl: url }),
  setCategory: (categories) => set({ category: categories }),
  setDeployment: (deployments) => set({ deployment: deployments }),
  setMobileAvailable: (availability) => set({ mobileAvailable: availability }),
  setFocusCountries: (countries) => set({ focusCountries: countries }),
  setAvgTimeAdoption: (adoptionTime) => set({ avgTimeAdoption: adoptionTime }),
  setLanguages: (langs) => set({ languages: langs }),
  setSecurityCertificate: (certificate) => set({ securityCertificate: certificate }),
  
  setDescription: (desc) => set({ description: desc }),
  setUSP: (usp) => set({ usp: usp }),
  setUpcomingUpdates: (updates) => set({ upcomingUpdates: updates }),
  setUserCategory: (categories) => set({ userCategory: categories }),
  setIndustry: (industries) => set({ industry: industries }),
  setPracticeAreas: (areas) => set({ practiceAreas: areas }),
  setTeamSize: (sizes) => set({ teamSize: sizes }),
  // setProcessLifecycle: (lifecycle) => set({ processLifecycle: lifecycle }),
  // setFeatures: (features) => set({ features: features }),
 
  setDemo: (demos) => set({ demo: demos }),
  setSupport: (supports) => set({ support: supports }),
  setTraining: (trainings) => set({ training: trainings }),
  setStorage: (storages) => set({ storage: storages }),
  setFileSize: (size) => set({ fileSize: size }),

  setMaintenance: (maint) => set({ maintenance: maint }),
  setReqForChange: (request) => set({ reqForChange: request }),
  setDataMigration: (migration) => set({ dataMigration: migration }),
  setTrainingReq: (trainings) => set({ trainingReq: trainings }),


 setImages: (imgs) => set({ images: imgs }),
  setVideoUrl: (url) => set({ videoUrl: url }),
  setAttachments: (files) => set({ attachments: files }),
  setYoutubeUrl: (url) => set({ youtubeUrl: url }),
  setLinkedinUrl: (url) => set({ linkedinUrl: url }),
  setTwitterUrl: (url) => set({ twitterUrl: url }),
  setInstagramUrl: (url) => set({ instagramUrl: url }),
  

  websiteUrl: null,
  setWebsiteUrl: (url) => set({ websiteUrl: url }),
}));
