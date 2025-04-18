
"use client"
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend,CartesianGrid , RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Database, Globe, Calendar, Server, Users, Activity, ChevronDown, Filter, Download } from 'lucide-react';

// Custom color scheme based on brand colors (matching the existing dashboard)
const BRAND_COLORS = {
  titleHeading: "#1e2556", // bold
  subtitle: "#334155",
  bodyText: "#2d2d2d",
  links: "#7cc6ee",
  mainButtonBg: "#1e2556", 
  softButtonBg: "#7cc6ee", 
  darkBackgroundArea: "#1e2556",
  card: "#f5f7fa"
};

// Derived colors for charts
const CHART_COLORS = [
  "#1e2556", // Primary dark blue
  "#7cc6ee", // Light blue
  "#4a90e2", // Mid blue - derived
  "#334155", // Subtitle color
  "#6b7280", // Gray - derived
  "#f97316", // Orange for contrast
  "#84cc16", // Green for positive metrics
  "#8b5cf6", // Purple for variety
  "#ec4899", // Pink for variety
];

// Format number with commas
const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Categories
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

// Initial data structure
const initialData = {
  category: '',
  totalProducts: 0,
  userCategoryDistribution: [],
  pricingDistribution: [],
  deploymentDistribution: [],
  foundingYearDistribution: [],
  lifecycleAnalysis: {
    stages: [],
    productScores: [],
    stageCoverage: []
  },
  functionalityAnalysis: {
    productScores: [],
    functionalityCoverage: []
  }
};

// Stat Card Component
const StatCard = ({ title, value, icon: Icon, bgColor = BRAND_COLORS.card, iconBgColor = BRAND_COLORS.softButtonBg, textColor = BRAND_COLORS.titleHeading }) => (
  <div className="bg-white rounded-lg shadow-md p-6 border-l-4" style={{ borderLeftColor: iconBgColor, backgroundColor: bgColor }}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm" style={{ color: BRAND_COLORS.subtitle }}>{title}</p>
        <h2 className="text-4xl font-bold mt-1" style={{ color: textColor }}>{value}</h2>
      </div>
      <div className="p-3 rounded-lg" style={{ backgroundColor: `${iconBgColor}25` }}>
        <Icon style={{ color: iconBgColor }} size={24} />
      </div>
    </div>
  </div>
);

// Chart Card Component
const ChartCard = ({ title, children, subtitle }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <div className="p-5 border-b" style={{ borderColor: `${BRAND_COLORS.titleHeading}15` }}>
      <h3 className="text-xl font-semibold" style={{ color: BRAND_COLORS.titleHeading }}>{title}</h3>
      {subtitle && <p className="text-sm mt-1" style={{ color: BRAND_COLORS.subtitle }}>{subtitle}</p>}
    </div>
    <div className="p-5">
      {children}
    </div>
  </div>
);

// Competitor Analysis Dashboard Component
const CompetitorAnalysisDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [analytics, setAnalytics] = useState(initialData);
  const [activeTab, setActiveTab] = useState('user-solutions');

  useEffect(() => {
    fetchData(selectedCategory);
  }, [selectedCategory]);

  // Function to fetch competitor analysis data
  const fetchData = async (category) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/competitor-analysis?category=${encodeURIComponent(category)}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch competitor analysis data');
      }
      
      const data = await response.json();
      setAnalytics(data);
    } catch (error) {
      console.error('Error fetching competitor analysis data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: BRAND_COLORS.card }}>
      {/* Header */}
      <div className="pt-24 pb-8" style={{ backgroundColor: BRAND_COLORS.darkBackgroundArea }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white">Competitor Analysis</h1>
          <p className="mt-2 text-white opacity-80">Comparative analysis of legal tech products by category</p>
        </div>
      </div>

      {/* Category Selector */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <label className="block text-sm font-medium mb-2 sm:mb-0" style={{ color: BRAND_COLORS.subtitle }}>
              Select Category:
            </label>
            <div className="relative w-full sm:w-96">
              <select
                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-4 bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{ color: BRAND_COLORS.bodyText }}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <ChevronDown className="h-5 w-5" style={{ color: BRAND_COLORS.subtitle }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            <button 
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'user-solutions' ? 'border-current' : 'border-transparent'}`}
              style={{ color: activeTab === 'user-solutions' ? BRAND_COLORS.links : BRAND_COLORS.subtitle }}
              onClick={() => setActiveTab('user-solutions')}
            >
              User Solutions
            </button>
            <button 
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'pricing-models' ? 'border-current' : 'border-transparent'}`}
              style={{ color: activeTab === 'pricing-models' ? BRAND_COLORS.links : BRAND_COLORS.subtitle }}
              onClick={() => setActiveTab('pricing-models')}
            >
              Pricing Models
            </button>
            <button 
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'deployment-type' ? 'border-current' : 'border-transparent'}`}
              style={{ color: activeTab === 'deployment-type' ? BRAND_COLORS.links : BRAND_COLORS.subtitle }}
              onClick={() => setActiveTab('deployment-type')}
            >
              Deployment Type
            </button>
            <button 
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'founding-year' ? 'border-current' : 'border-transparent'}`}
              style={{ color: activeTab === 'founding-year' ? BRAND_COLORS.links : BRAND_COLORS.subtitle }}
              onClick={() => setActiveTab('founding-year')}
            >
              Founding Year
            </button>
            <button 
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'lifecycle-stage' ? 'border-current' : 'border-transparent'}`}
              style={{ color: activeTab === 'lifecycle-stage' ? BRAND_COLORS.links : BRAND_COLORS.subtitle }}
              onClick={() => setActiveTab('lifecycle-stage')}
            >
              Lifecycle Stage
            </button>
            <button 
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'functionality' ? 'border-current' : 'border-transparent'}`}
              style={{ color: activeTab === 'functionality' ? BRAND_COLORS.links : BRAND_COLORS.subtitle }}
              onClick={() => setActiveTab('functionality')}
            >
              Functionality
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: BRAND_COLORS.mainButtonBg }}></div>
              <p className="mt-4 text-sm" style={{ color: BRAND_COLORS.subtitle }}>Loading analysis data...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <StatCard 
                title="Total Products" 
                value={formatNumber(analytics.totalProducts)} 
                icon={Database}
                iconBgColor={BRAND_COLORS.mainButtonBg}
              />
              
              <StatCard 
                title="Category" 
                value={selectedCategory.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} 
                icon={Globe}
                iconBgColor="#8b5cf6"
              />
              
              <StatCard 
                title="Lifecycle Stages" 
                value={formatNumber(analytics.lifecycleAnalysis.stages.length)} 
                icon={Activity}
                iconBgColor="#f97316"
              />
            </div>

            {/* Tab Content */}
            {activeTab === 'user-solutions' && (
              <div className="grid grid-cols-1 gap-6 mb-8">
                <ChartCard title="User Solutions" subtitle="Distribution of products by user category">
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        layout="vertical"
                        data={analytics.userCategoryDistribution}
                        margin={{ top: 5, right: 30, left: 160, bottom: 5 }}
                      >
                        <XAxis type="number" />
                        <YAxis dataKey="category" type="category" width={150} tick={{ fontSize: 12 }} />
                        <Tooltip 
                          formatter={(value, name) => [`${value} products (${(value/analytics.totalProducts*100).toFixed(1)}%)`, 'Count']}
                          labelFormatter={(label) => `User Type: ${label}`}
                          contentStyle={{ backgroundColor: 'white', borderColor: BRAND_COLORS.links }}
                        />
                        <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                          {analytics.userCategoryDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </ChartCard>
                
                {/* User Category Tiles */}
                <h3 className="text-xl font-semibold mb-4" style={{ color: BRAND_COLORS.titleHeading }}>User Categories at a Glance</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                  {analytics.userCategoryDistribution.map((category, index) => (
                    <div 
                      key={index}
                      className="p-4 rounded-lg shadow-sm relative overflow-hidden"
                      style={{ 
                        backgroundColor: 'white',
                        borderLeft: `4px solid ${CHART_COLORS[index % CHART_COLORS.length]}`
                      }}
                    >
                      <h4 className="font-medium mb-2 truncate" style={{ color: BRAND_COLORS.titleHeading }} title={category.category}>
                        {category.category}
                      </h4>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold" style={{ color: BRAND_COLORS.bodyText }}>{category.count}</span>
                        <span className="text-xs rounded-full px-2 py-1" style={{ backgroundColor: `${CHART_COLORS[index % CHART_COLORS.length]}15`, color: CHART_COLORS[index % CHART_COLORS.length] }}>
                          {((category.count / analytics.totalProducts) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'pricing-models' && (
              <div className="grid grid-cols-1 gap-6 mb-8">
                <ChartCard title="Pricing Models" subtitle="Distribution of products by pricing model">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={analytics.pricingDistribution}
                            cx="50%"
                            cy="50%"
                            labelLine={true}
                            outerRadius={80}
                            fill={BRAND_COLORS.mainButtonBg}
                            dataKey="count"
                            nameKey="model"
                            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                          >
                            {analytics.pricingDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip 
                            formatter={(value, name) => [`${value} products (${(value/analytics.totalProducts*100).toFixed(1)}%)`, name]}
                            contentStyle={{ backgroundColor: 'white', borderColor: BRAND_COLORS.links }}
                          />
                          <Legend 
                            layout="vertical" 
                            verticalAlign="middle" 
                            align="right"
                            formatter={(value, entry) => (
                              <span style={{ color: BRAND_COLORS.bodyText, marginRight: 10 }}>
                                {value} ({analytics.pricingDistribution.find(item => item.model === value)?.count})
                              </span>
                            )}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          layout="vertical"
                          data={analytics.pricingDistribution}
                          margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                        >
                          <XAxis type="number" />
                          <YAxis dataKey="model" type="category" width={90} tick={{ fontSize: 12 }} />
                          <Tooltip 
                            formatter={(value, name) => [`${value} products (${(value/analytics.totalProducts*100).toFixed(1)}%)`, 'Count']}
                            labelFormatter={(label) => `Model: ${label}`}
                            contentStyle={{ backgroundColor: 'white', borderColor: BRAND_COLORS.links }}
                          />
                          <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                            {analytics.pricingDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </ChartCard>
                
                {/* Pricing Model Cards */}
                <h3 className="text-xl font-semibold mb-4" style={{ color: BRAND_COLORS.titleHeading }}>Pricing Models Breakdown</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {analytics.pricingDistribution.map((model, index) => (
                    <div 
                      key={index}
                      className="p-6 rounded-lg shadow-sm relative overflow-hidden"
                      style={{ 
                        backgroundColor: 'white',
                        borderTop: `4px solid ${CHART_COLORS[index % CHART_COLORS.length]}`
                      }}
                    >
                      <h4 className="font-medium mb-3" style={{ color: BRAND_COLORS.titleHeading }}>
                        {model.model}
                      </h4>
                      <div className="flex flex-col">
                        <span className="text-3xl font-bold mb-2" style={{ color: BRAND_COLORS.bodyText }}>{model.count}</span>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                          <div 
                            className="h-2.5 rounded-full" 
                            style={{ 
                              width: `${(model.count / analytics.totalProducts) * 100}%`,
                              backgroundColor: CHART_COLORS[index % CHART_COLORS.length]
                            }}
                          ></div>
                        </div>
                        <span className="text-sm" style={{ color: BRAND_COLORS.subtitle }}>
                          {((model.count / analytics.totalProducts) * 100).toFixed(1)}% of products
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'deployment-type' && (
              <div className="grid grid-cols-1 gap-6 mb-8">
                <ChartCard title="Deployment Types" subtitle="Distribution of products by deployment model">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={analytics.deploymentDistribution}
                            cx="50%"
                            cy="50%"
                            labelLine={true}
                            outerRadius={80}
                            fill={BRAND_COLORS.mainButtonBg}
                            dataKey="count"
                            nameKey="type"
                            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                          >
                            {analytics.deploymentDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={CHART_COLORS[(index + 2) % CHART_COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip 
                            formatter={(value, name) => [`${value} products (${(value/analytics.totalProducts*100).toFixed(1)}%)`, name]}
                            contentStyle={{ backgroundColor: 'white', borderColor: BRAND_COLORS.links }}
                          />
                          <Legend 
                            layout="vertical" 
                            verticalAlign="middle" 
                            align="right"
                            formatter={(value, entry) => (
                              <span style={{ color: BRAND_COLORS.bodyText, marginRight: 10 }}>
                                {value} ({analytics.deploymentDistribution.find(item => item.type === value)?.count})
                              </span>
                            )}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          layout="vertical"
                          data={analytics.deploymentDistribution}
                          margin={{ top: 5, right: 30, left: 160, bottom: 5 }}
                        >
                          <XAxis type="number" />
                          <YAxis dataKey="type" type="category" width={150} tick={{ fontSize: 12 }} />
                          <Tooltip 
                            formatter={(value, name) => [`${value} products (${(value/analytics.totalProducts*100).toFixed(1)}%)`, 'Count']}
                            labelFormatter={(label) => `Deployment: ${label}`}
                            contentStyle={{ backgroundColor: 'white', borderColor: BRAND_COLORS.links }}
                          />
                          <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                            {analytics.deploymentDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={CHART_COLORS[(index + 2) % CHART_COLORS.length]} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </ChartCard>
                
                {/* Deployment Type Cards */}
                <h3 className="text-xl font-semibold mb-4" style={{ color: BRAND_COLORS.titleHeading }}>Deployment Models Comparison</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {analytics.deploymentDistribution.map((deployment, index) => (
                    <div 
                      key={index}
                      className="p-6 rounded-lg shadow-sm relative overflow-hidden"
                      style={{ 
                        backgroundColor: 'white',
                        borderLeft: `4px solid ${CHART_COLORS[(index + 2) % CHART_COLORS.length]}`
                      }}
                    >
                      <h4 className="font-medium mb-3" style={{ color: BRAND_COLORS.titleHeading }}>
                        {deployment.type}
                      </h4>
                      <div className="flex flex-col">
                        <span className="text-3xl font-bold mb-2" style={{ color: BRAND_COLORS.bodyText }}>{deployment.count}</span>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                          <div 
                            className="h-2.5 rounded-full" 
                            style={{ 
                              width: `${(deployment.count / analytics.totalProducts) * 100}%`,
                              backgroundColor: CHART_COLORS[(index + 2) % CHART_COLORS.length]
                            }}
                          ></div>
                        </div>
                        <span className="text-sm" style={{ color: BRAND_COLORS.subtitle }}>
                          {((deployment.count / analytics.totalProducts) * 100).toFixed(1)}% of products
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'founding-year' && (
              <div className="grid grid-cols-1 gap-6 mb-8">
                <ChartCard title="Founding Year Distribution" subtitle="Age distribution of companies in this category">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={analytics.foundingYearDistribution}>
                        <XAxis dataKey="range" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value) => [`${value} products (${(value/analytics.totalProducts*100).toFixed(1)}%)`, 'Count']}
                          contentStyle={{ backgroundColor: 'white', borderColor: BRAND_COLORS.links }}
                        />
                        <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                          {analytics.foundingYearDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={CHART_COLORS[(index + 5) % CHART_COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </ChartCard>
                
                {/* Founding Year Cards */}
                <h3 className="text-xl font-semibold mb-4" style={{ color: BRAND_COLORS.titleHeading }}>Company Age Groups</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                  {analytics.foundingYearDistribution.map((yearRange, index) => (
                    <div 
                      key={index}
                      className="p-4 rounded-lg shadow-sm relative overflow-hidden"
                      style={{ 
                        backgroundColor: 'white',
                        borderTop: `4px solid ${CHART_COLORS[(index + 5) % CHART_COLORS.length]}`
                      }}
                    >
                      <h4 className="font-medium mb-2 text-sm" style={{ color: BRAND_COLORS.titleHeading }}>
                        {yearRange.range}
                      </h4>
                      <div className="flex flex-col">
                        <span className="text-2xl font-bold mb-1" style={{ color: BRAND_COLORS.bodyText }}>{yearRange.count}</span>
                        <span className="text-xs rounded-full px-2 py-1 inline-block" style={{ backgroundColor: `${CHART_COLORS[(index + 5) % CHART_COLORS.length]}15`, color: CHART_COLORS[(index + 5) % CHART_COLORS.length] }}>
                          {((yearRange.count / analytics.totalProducts) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'lifecycle-stage' && (
              <div className="grid grid-cols-1 gap-6 mb-8">
                <ChartCard title="Lifecycle Stage Coverage" subtitle="How many products cover each lifecycle stage">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={analytics.lifecycleAnalysis.stageCoverage}
                        margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="stage" 
                          angle={-45} 
                          textAnchor="end"
                          height={70}
                          tick={{ fontSize: 12 }}
                        />
                        <YAxis 
                          label={{ value: 'Number of Products', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }} 
                        />
                        <Tooltip 
                          formatter={(value) => [`${value} products (${(value/analytics.totalProducts*100).toFixed(1)}%)`, 'Count']}
                          labelFormatter={(label) => `Stage: ${label}`}
                          contentStyle={{ backgroundColor: 'white', borderColor: BRAND_COLORS.links }}
                        />
                        <Bar dataKey="count" fill={BRAND_COLORS.mainButtonBg} radius={[4, 4, 0, 0]}>
                          {analytics.lifecycleAnalysis.stageCoverage.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={CHART_COLORS[(index + 3) % CHART_COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </ChartCard>
                
                {/* Top Products by Lifecycle Coverage */}
                <ChartCard title="Top Products by Lifecycle Coverage" subtitle="Products with the most comprehensive lifecycle coverage">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: BRAND_COLORS.subtitle }}>
                            Product
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: BRAND_COLORS.subtitle }}>
                            Stages Covered
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: BRAND_COLORS.subtitle }}>
                            Percentage
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: BRAND_COLORS.subtitle }}>
                            Coverage
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {analytics.lifecycleAnalysis.productScores.slice(0, 10).map((product, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium" style={{ color: BRAND_COLORS.bodyText }}>
                              {product.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: BRAND_COLORS.bodyText }}>
                              {product.score} / {product.totalStages}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: BRAND_COLORS.bodyText }}>
                              {product.percentage.toFixed(1)}%
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div 
                                  className="h-2.5 rounded-full" 
                                  style={{ 
                                    width: `${product.percentage}%`,
                                    backgroundColor: CHART_COLORS[(index) % CHART_COLORS.length]
                                  }}
                                ></div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </ChartCard>
                
                {/* Stage Coverage Cards */}
                <h3 className="text-xl font-semibold mb-4" style={{ color: BRAND_COLORS.titleHeading }}>Lifecycle Stage Breakdown</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                  {analytics.lifecycleAnalysis.stageCoverage.map((stage, index) => (
                    <div 
                      key={index}
                      className="p-4 rounded-lg shadow-sm relative overflow-hidden"
                      style={{ 
                        backgroundColor: 'white',
                        borderTop: `4px solid ${CHART_COLORS[(index + 3) % CHART_COLORS.length]}`
                      }}
                    >
                      <h4 className="font-medium mb-2 text-sm" style={{ color: BRAND_COLORS.titleHeading }}>
                        {stage.stage}
                      </h4>
                      <div className="flex flex-col">
                        <span className="text-2xl font-bold mb-1" style={{ color: BRAND_COLORS.bodyText }}>{stage.count}</span>
                        <span className="text-xs rounded-full px-2 py-1 inline-block" style={{ backgroundColor: `${CHART_COLORS[(index + 3) % CHART_COLORS.length]}15`, color: CHART_COLORS[(index + 3) % CHART_COLORS.length] }}>
                          {((stage.count / analytics.totalProducts) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'functionality' && (
              <div className="grid grid-cols-1 gap-6 mb-8">
                {analytics.functionalityAnalysis.functionalityCoverage && (
                  <ChartCard title="Functionality Coverage" subtitle="How many products support each functionality">
                    <div className="h-96">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={analytics.functionalityAnalysis.functionalityCoverage}
                          margin={{ top: 20, right: 30, left: 20, bottom: 90 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="functionality" 
                            angle={-45} 
                            textAnchor="end"
                            height={100}
                            tick={{ fontSize: 11 }}
                          />
                          <YAxis 
                            label={{ value: 'Number of Products', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }} 
                          />
                          <Tooltip 
                            formatter={(value) => [`${value} products (${(value/analytics.totalProducts*100).toFixed(1)}%)`, 'Count']}
                            labelFormatter={(label) => `Functionality: ${label}`}
                            contentStyle={{ backgroundColor: 'white', borderColor: BRAND_COLORS.links }}
                          />
                          <Bar dataKey="count" fill={BRAND_COLORS.mainButtonBg} radius={[4, 4, 0, 0]}>
                            {analytics.functionalityAnalysis.functionalityCoverage.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={CHART_COLORS[(index + 1) % CHART_COLORS.length]} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </ChartCard>
                )}
                
                {analytics.functionalityAnalysis.productScores && (
                  <ChartCard title="Top Products by Functionality Coverage" subtitle="Products with the most comprehensive feature set">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: BRAND_COLORS.subtitle }}>
                              Product
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: BRAND_COLORS.subtitle }}>
                              Features Covered
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: BRAND_COLORS.subtitle }}>
                              Percentage
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: BRAND_COLORS.subtitle }}>
                              Coverage
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {analytics.functionalityAnalysis.productScores.slice(0, 10).map((product, index) => (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium" style={{ color: BRAND_COLORS.bodyText }}>
                                {product.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: BRAND_COLORS.bodyText }}>
                                {product.score} / {product.totalFunctionalities}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: BRAND_COLORS.bodyText }}>
                                {product.percentage.toFixed(1)}%
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                  <div 
                                    className="h-2.5 rounded-full" 
                                    style={{ 
                                      width: `${product.percentage}%`,
                                      backgroundColor: CHART_COLORS[(index) % CHART_COLORS.length]
                                    }}
                                  ></div>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </ChartCard>
                )}
                
                {analytics.functionalityAnalysis.functionalityCoverage && (
                  <>
                    <h3 className="text-xl font-semibold mb-4" style={{ color: BRAND_COLORS.titleHeading }}>Functionality Breakdown</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                      {analytics.functionalityAnalysis.functionalityCoverage.map((func, index) => (
                        <div 
                          key={index}
                          className="p-4 rounded-lg shadow-sm relative overflow-hidden"
                          style={{ 
                            backgroundColor: 'white',
                            borderLeft: `4px solid ${CHART_COLORS[(index + 1) % CHART_COLORS.length]}`
                          }}
                        >
                          <h4 className="font-medium mb-2" style={{ color: BRAND_COLORS.titleHeading }}>
                            {func.functionality}
                          </h4>
                          <div className="flex flex-col">
                            <span className="text-2xl font-bold mb-2" style={{ color: BRAND_COLORS.bodyText }}>{func.count}</span>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                              <div 
                                className="h-2.5 rounded-full" 
                                style={{ 
                                  width: `${(func.count / analytics.totalProducts) * 100}%`,
                                  backgroundColor: CHART_COLORS[(index + 1) % CHART_COLORS.length]
                                }}
                              ></div>
                            </div>
                            <span className="text-sm" style={{ color: BRAND_COLORS.subtitle }}>
                              {((func.count / analytics.totalProducts) * 100).toFixed(1)}% of products
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <div className="bg-white border-t" style={{ borderColor: `${BRAND_COLORS.titleHeading}15` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <p className="text-sm" style={{ color: BRAND_COLORS.subtitle }}>
              Last updated: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitorAnalysisDashboard;