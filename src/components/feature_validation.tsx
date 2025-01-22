
"use client"
// export default FeatureAnalysisDashboard;
import React, { useEffect, useState } from 'react';
import { 
  Search, 
  Activity, 
  PieChart, 
  TrendingUp, 
  Star, 
  FileText, 
  Scale, 
  GitCommit, 
  Target, 
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/context/authContext';
const FeatureAnalysisDashboard = () => {
  const [featureName, setFeatureName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const { vendorId, userType } = useAuth()

   const categories = [
    "Client Relationship Management",
    "Governance, Risk and Compliance",
    "Contract Lifecycle Management",
    "E-Signature",
    "Document Management System",
    "E-billing and Invoicing",
    "E-discovery",
    "Intellectual Property Management",
    "Litigation Management and Analytics",
    "Legal Workflow Automation",
    "Legal Research",
  ];

  // const handleAnalyze = async () => {
  //   if (!featureName || !selectedCategory) return;
    
  //   setLoading(true);
  //   try {
  //     const response = await fetch('https://ai-backend-y6mq.onrender.com/feature_analysis/', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         feature_name: featureName,
  //         category: selectedCategory
  //       }),
  //     });
      
  //     const data = await response.json();
  //     setAnalysisResult(data.response);
  //     console.log('API Response:', data); 
  //   } catch (error) {
  //     console.error('Error:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const [credits, setCredits] = useState(null);

  // Fetch credits on component mount
  useEffect(() => {
    fetchCredits();
  }, [vendorId]);

  const fetchCredits = async () => {
    try {
      const response = await fetch('/api/get-vendor-credits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ vendorId })
      });
      const data = await response.json();
      setCredits(data);
    } catch (error) {
      console.error('Error fetching credits:', error);
    }
  };

  // const handleAnalyze = async () => {
  //   if (!featureName || !selectedCategory) return;
    
  //   setLoading(true);
  //   try {
  //     const response = await fetch('/api/analyse-feature', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         feature_name: featureName,
  //         category: selectedCategory,
  //         vendorId
  //       }),
  //     });
      
  //     const data = await response.json();
      
  //     if (response.ok) {
  //       setAnalysisResult(data.analysis);
  //       setCredits(prev => ({
  //         ...prev,
  //         validationCredits: data.remainingCredits
  //       }));
  //     } else {
  //       alert(data.error);
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
// Feature Validation Handler
const handleAnalyze = async () => {
  if (!featureName || !selectedCategory) return;
  if (!credits?.validationCredits) {
    alert('You have no validation credits remaining');
    return;
  }
  
  setLoading(true);
  try {
    const response = await fetch('/api/analyze-feature', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        feature_name: featureName,
        category: selectedCategory,
        vendorId
      }),
    });
    
    const data = await response.json();
    
    if (response.ok) {
      setAnalysisResult(data.analysis);
      // Update credits immediately
      setCredits(prev => ({
        ...prev,
        validationCredits: data.remainingCredits
      }));
    } else {
      alert(data.error);
      // Update credits even on error to stay in sync
      if (data.remainingCredits !== undefined) {
        setCredits(prev => ({
          ...prev,
          validationCredits: data.remainingCredits
        }));
      }
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred during analysis');
  } finally {
    setLoading(false);
  }
};



  const safeArray = (data, path) => {
    return data && data[path] ? 
      (Array.isArray(data[path]) ? data[path] : [data[path]]) 
      : [];
  };
  
  const safeString = (data, path) => {
    return data && data[path] ? data[path] : '';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 pt-8">
          <div className="inline-block p-3 rounded-3xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-xl transform hover:scale-105 transition-transform duration-300 mb-6">
            <Sparkles className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Feature Analysis
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover market insights for any legal tech feature
          </p>
          <div className="mb-4">
        <p className="text-sm font-medium">
          Remaining Validation Credits: {credits?.validationCredits ?? 'Loading...'}
        </p>
      </div>
        </div>

        {/* Main Content Section with Overlapping Input */}
        <div className="relative">
          {/* Overlapping Input */}
          <div className="absolute -top-7 left-0 right-0 px-4">
            <div className="max-w-2xl mx-auto">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter your feature name..."
                    className="w-full px-8 py-5 text-lg bg-white rounded-xl shadow-xl border-0 focus:ring-2 focus:ring-indigo-500 outline-none transition-all duration-300"
                    value={featureName}
                    onChange={(e) => setFeatureName(e.target.value)}
                  />
                  <Search className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-indigo-500 transition-colors duration-300" size={24} />
                </div>
              </div>
            </div>
          </div>

          {/* Main Card */}
          <Card className="bg-white shadow-xl rounded-xl overflow-hidden">
            <CardContent className="p-8 pt-16">
              {/* Category Selection */}
              <div className="mt-6 space-y-4">
                <h3 className="text-center text-lg text-gray-600 font-medium">Select Feature Category</h3>
                <div className="flex flex-wrap justify-center gap-3 p-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                        selectedCategory === category
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg scale-105'
                          : 'bg-white text-gray-600 shadow-md hover:shadow-lg border border-gray-100'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Analyze Button */}
              <div className="mt-8">
                <button
                  onClick={handleAnalyze}
                  disabled={!featureName || !selectedCategory || loading}
                  className={`w-full py-4 px-6 rounded-xl font-medium text-lg shadow-lg transform transition-all duration-300 ${
                    featureName && selectedCategory
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-xl hover:-translate-y-0.5'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <Activity className="w-6 h-6 mr-3 animate-pulse" />
                      Analyzing Feature...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 mr-3" />
                      Generate Analysis Report
                    </span>
                  )}
                </button>
              </div>
            </CardContent>
          </Card>
        </div>



{(loading || analysisResult) && (
  <div className="mt-8 transform transition-all duration-500">
    <Card className="bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <CardContent className="p-8">
        {loading ? (
          <div className="min-h-[400px] flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-500"></div>
            <p className="mt-6 text-lg text-gray-600">Analyzing your feature...</p>
            <p className="text-sm text-gray-500 mt-2">This may take a moment</p>
          </div>
        ) : (
          <AnalysisResults analysisResult={analysisResult} />
        )}
      </CardContent>
    </Card>
  </div>
)}
      </div>
    </div>
  );
};

export default FeatureAnalysisDashboard;













import { 
  TrendingDown, 
   Users, Briefcase, Building,
  CheckCircle, XCircle,Clock, Shield
} from 'lucide-react';

const AnalysisResults = ({ analysisResult }) => {
  console.log('Full analysis result:', analysisResult);

  // Enhanced getStringData function with multiple possible keys
  const getStringData = (data, paths) => {
    if (!data) return '';
    
    const allPossiblePaths = [
      ...paths,
      ...paths.map(p => p.replace(/^\d+\.\s+/, '')), // Remove numbered prefix
      ...paths.map(p => p.toLowerCase()), // Lowercase version
      ...paths.map(p => p.replace(/^\d+\.\s+/, '').toLowerCase()) // Both
    ];

    console.log('Checking paths for string:', allPossiblePaths);
    
    for (const path of allPossiblePaths) {
      if (data[path] && typeof data[path] === 'string') {
        console.log('Found string data for path:', path, data[path]);
        return data[path];
      }
    }
    return '';
  };

  // Enhanced getArrayData function with multiple possible keys
  const getArrayData = (data, paths) => {
    if (!data) return [];
    
    const allPossiblePaths = [
      ...paths,
      ...paths.map(p => p.replace(/^\d+\.\s+/, '')), // Remove numbered prefix
      ...paths.map(p => p.toLowerCase()), // Lowercase version
      ...paths.map(p => p.replace(/^\d+\.\s+/, '').toLowerCase()) // Both
    ];

    console.log('Checking paths for array:', allPossiblePaths);
    
    for (const path of allPossiblePaths) {
      if (data[path]) {
        if (Array.isArray(data[path])) {
          console.log('Found array data for path:', path, data[path]);
          return data[path];
        }
        if (typeof data[path] === 'string' && data[path].includes(',')) {
          const array = data[path].split(',').map(item => item.trim());
          console.log('Converted string to array for path:', path, array);
          return array;
        }
      }
    }
    return [];
  };

  // Get data with all possible variations
  const description = getStringData(analysisResult, [
    '1. Description of feature',
    'Description of feature',
    'Description_of_feature',
    'description'
  ]);

  const scalability = getStringData(analysisResult, [
    '2. Overall scalability comment',
    'Overall scalability comment',
    'overall_scalability_comment',
    'scalability'
  ]);

  const sectors = getArrayData(analysisResult, [
    '3. Top sectors/ Top practice areas',
    'Top sectors/ Top practice areas',
    'top_sectors',
    'Top sectors'
  ]);

  const processImpact = getStringData(analysisResult, [
    '4. Impact on process lifecycle',
    'Impact on process lifecycle',
    'impact_on_process_lifecycle',
    'process_impact'
  ]);

  const problemStatements = getArrayData(analysisResult, [
    '5. Top problem statements',
    'Top problem statements',
    'top_problem_statements',
    'problem_statements'
  ]);

  const beneficiaryRoles = getArrayData(analysisResult, [
    '6. Key Beneficiary legal roles',
    'Key Beneficiary legal roles',
    'key_beneficiary_legal_roles',
    'beneficiary_roles'
  ]);

  const positiveTrends = getArrayData(analysisResult, [
    '7. Positive market trends',
    'Positive market trends',
    'positive_market_trends'
  ]);

  const negativeTrends = getArrayData(analysisResult, [
    '8. Negative market trends',
    'Negative market trends',
    'negative_market_trends'
  ]);

  const marketViability = getStringData(analysisResult, [
    '9. Market viability',
    'Market viability',
    'market_viability'
  ]);

  console.log('Extracted data:', {
    description,
    scalability,
    sectors,
    processImpact,
    problemStatements,
    beneficiaryRoles,
    positiveTrends,
    negativeTrends,
    marketViability
  });

  // Progress bar component
  const ProgressBar = ({ value, maxValue, color }) => (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div 
        className={`h-2 rounded-full ${color}`} 
        style={{ width: `${(value/maxValue) * 100}%` }}
      />
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Section 1: Feature Overview */}
      <Card className="bg-gradient-to-br from-white to-indigo-50 hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <FileText className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold">1. Feature Overview</h3>
          </div>
          <p className="text-gray-700 leading-relaxed">{description}</p>
        </CardContent>
      </Card>

      {/* Section 2: Scalability Analysis */}
      <Card className="bg-gradient-to-br from-white to-blue-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Scale className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold">2. Scalability Analysis</h3>
          </div>
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">{scalability}</p>
            <ProgressBar value={85} maxValue={100} color="bg-blue-500" />
          </div>
        </CardContent>
      </Card>

      {/* Section 3: Top Sectors */}
      <Card className="bg-gradient-to-br from-white to-purple-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Building className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold">3. Top Sectors</h3>
          </div>
          <div className="grid gap-4">
            {sectors.map((sector, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">{sector}</span>
                  <span className="text-sm text-gray-500">{90 - index * 10}%</span>
                </div>
                <ProgressBar value={90 - index * 10} maxValue={100} color="bg-purple-500" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Section 4: Process Impact */}
      <Card className="bg-gradient-to-br from-white to-cyan-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-cyan-100 rounded-lg">
              <GitCommit className="w-6 h-6 text-cyan-600" />
            </div>
            <h3 className="text-xl font-semibold">4. Process Lifecycle Impact</h3>
          </div>
          <p className="text-gray-700 mb-4">{processImpact}</p>
          <div className="flex justify-between items-center gap-4">
            <div className="flex-1 text-center p-3 bg-cyan-50 rounded-lg">
              <Clock className="w-5 h-5 mx-auto mb-2 text-cyan-600" />
              <p className="text-sm text-gray-600">Initiation</p>
            </div>
            <div className="flex-1 text-center p-3 bg-cyan-50 rounded-lg">
              <GitCommit className="w-5 h-5 mx-auto mb-2 text-cyan-600" />
              <p className="text-sm text-gray-600">Process</p>
            </div>
            <div className="flex-1 text-center p-3 bg-cyan-50 rounded-lg">
              <Shield className="w-5 h-5 mx-auto mb-2 text-cyan-600" />
              <p className="text-sm text-gray-600">Completion</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 5: Problem Statements */}
      <Card className="bg-gradient-to-br from-white to-teal-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-teal-100 rounded-lg">
              <Target className="w-6 h-6 text-teal-600" />
            </div>
            <h3 className="text-xl font-semibold">5. Problem Statements</h3>
          </div>
          <div className="space-y-4">
            {problemStatements.map((statement, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-white rounded-lg border border-teal-100">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-teal-100 text-teal-600 font-semibold">
                  {index + 1}
                </div>
                <span className="text-gray-700 flex-grow">{statement}</span>
                <ProgressBar value={85 - index * 10} maxValue={100} color="bg-teal-500" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Section 6: Beneficiary Roles */}
      <Card className="bg-gradient-to-br from-white to-yellow-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Users className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="text-xl font-semibold">6. Key Beneficiary Roles</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {beneficiaryRoles.map((role, index) => (
              <div key={index} className="p-4 bg-white rounded-lg border border-yellow-100 hover:shadow-md transition-shadow">
                <Users className="w-6 h-6 mx-auto mb-2 text-yellow-600" />
                <p className="text-center text-gray-700">{role}</p>
                <ProgressBar value={90 - index * 8} maxValue={100} color="bg-yellow-500" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sections 7 & 8: Market Trends */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Positive Trends */}
        <Card className="bg-gradient-to-br from-white to-green-50">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold">7. Positive Trends</h3>
            </div>
            <div className="space-y-3">
              {positiveTrends.map((trend, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg border border-green-100">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div className="space-y-2 flex-grow">
                    <p className="text-gray-700">{trend}</p>
                    <ProgressBar value={90 - index * 10} maxValue={100} color="bg-green-500" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Negative Trends */}
        <Card className="bg-gradient-to-br from-white to-red-50">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <TrendingDown className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold">8. Negative Trends</h3>
            </div>
            <div className="space-y-3">
              {negativeTrends.map((trend, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg border border-red-100">
                  <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div className="space-y-2 flex-grow">
                    <p className="text-gray-700">{trend}</p>
                    <ProgressBar value={70 - index * 10} maxValue={100} color="bg-red-500" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>


      {/* Section 9: Market Viability */}
      <Card className="bg-gradient-to-br from-white to-red-50">
      <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <Briefcase className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold">9. Market Viability</h3>
          </div>
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">{marketViability}</p>
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Market Readiness</span>
                <span>85%</span>
              </div>
              <ProgressBar value={85} maxValue={100} color="bg-emerald-500" />
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="p-3 bg-white rounded-lg border border-emerald-100 text-center">
                <span className="text-lg font-semibold text-emerald-600">High</span>
                <p className="text-sm text-gray-600">Demand</p>
              </div>
              <div className="p-3 bg-white rounded-lg border border-emerald-100 text-center">
                <span className="text-lg font-semibold text-emerald-600">Strong</span>
                <p className="text-sm text-gray-600">Growth</p>
              </div>
              <div className="p-3 bg-white rounded-lg border border-emerald-100 text-center">
                <span className="text-lg font-semibold text-emerald-600">Positive</span>
                <p className="text-sm text-gray-600">ROI</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

