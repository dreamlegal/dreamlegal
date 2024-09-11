// stores/useStore.js
import { create } from 'zustand';

export const ProductInfo = create((set) => ({
  // Global state properties
  productName: '',
  logoUrl: '',
  category: [],
  deployment: [],
  mobileAvailable: null,
  focusCountries: [],
  avgTimeAdoption: null,
  languages: [],
  securityCertificate: null,
  integration: [],

  description: '',
  usp: '',
  upcomingUpdates: '',

  userCategory: [],
  industry: [],
  practiceAreas: [],
  teamSize: [],

  processLifecycle: null,

  features: null,
// ...................... 


  freeTrial: null,
  timePeriod: null,
  freeVersion: null,
  pricingModel: [],
  contractPeriod: null,
  nameofPlan: [],
  validity: [],
  price: [],
  pricingParams: "",

  setFreeTrial: (value) => set({ freeTrial: value }),
  setTimePeriod: (value) => set({ timePeriod: value }),
  setFreeVersion: (value) => set({ freeVersion: value }),
  setPricingModel: (value) => set({ pricingModel: value }),
  setContractPeriod: (value) => set({ contractPeriod: value }),
  setNameofPlan: (value) => set({ nameofPlan: value }),
  setValidity: (value) => set({ validity: value }),
  setPrice: (value) => set({ price: value }),
  setPricingParams: (value) => set({ pricingParams: value }),


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
  
  images: [],
  videoUrl: null,
  attachments: [],
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
  setIntegration: (integrations) => set({ integration: integrations }),
  setDescription: (desc) => set({ description: desc }),
  setUSP: (usp) => set({ usp: usp }),
  setUpcomingUpdates: (updates) => set({ upcomingUpdates: updates }),
  setUserCategory: (categories) => set({ userCategory: categories }),
  setIndustry: (industries) => set({ industry: industries }),
  setPracticeAreas: (areas) => set({ practiceAreas: areas }),
  setTeamSize: (sizes) => set({ teamSize: sizes }),
  setProcessLifecycle: (lifecycle) => set({ processLifecycle: lifecycle }),
  setFeatures: (features) => set({ features: features }),
 
  setDemo: (demos) => set({ demo: demos }),
  setSupport: (supports) => set({ support: supports }),
  setTraining: (trainings) => set({ training: trainings }),
  setStorage: (storages) => set({ storage: storages }),
  setFileSize: (size) => set({ fileSize: size }),
  setMaintenance: (maint) => set({ maintenance: maint }),
  setReqForChange: (request) => set({ reqForChange: request }),
  setDataMigration: (migration) => set({ dataMigration: migration }),
  setImages: (imgs) => set({ images: imgs }),
  setVideoUrl: (url) => set({ videoUrl: url }),
  setAttachments: (files) => set({ attachments: files }),
  setYoutubeUrl: (url) => set({ youtubeUrl: url }),
  setLinkedinUrl: (url) => set({ linkedinUrl: url }),
  setTwitterUrl: (url) => set({ twitterUrl: url }),
  setInstagramUrl: (url) => set({ instagramUrl: url })
}));
