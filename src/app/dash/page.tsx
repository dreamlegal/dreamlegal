
"use client"
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts';
import { Database, Globe, Calendar, Server, Users, ChevronDown, Filter, Download } from 'lucide-react';
import GeoChartWithAPI from './_components/GeoChartWithAPI';

// Custom color scheme based on brand colors
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

// Mock data for initial loading state
const initialData = {
  totalListings: 0,
  categoryDistribution: [],
  userCategoryDistribution: [],
  pricingDistribution: [],
  headquartersDistribution: [],
  foundingYearDistribution: [],
  deploymentDistribution: [],
  mobileAvailable: 0,
  mobileNotAvailable: 0,
};

// Mock data for testing - remove in production
const mockData = {
  totalListings: 374,
  categoryDistribution: [
    { category: "Contract Management", count: 72 },
    { category: "Legal Research", count: 58 },
    { category: "Document Automation", count: 54 },
    { category: "E-Discovery", count: 41 },
    { category: "Intellectual Property Management", count: 38 },
    { category: "Case Management", count: 35 },
    { category: "Compliance Management", count: 33 },
    { category: "Legal Analytics", count: 23 },
    { category: "Dispute Resolution", count: 20 }
  ],
  userCategoryDistribution: [
    { category: "In-House Counsel", count: 112 },
    { category: "Law Firms", count: 95 },
    { category: "Solo Practitioners", count: 78 },
    { category: "Corporate Legal Teams", count: 53 },
    { category: "Government Legal Departments", count: 36 }
  ],
  pricingDistribution: [
    { model: "Annual Subscription", count: 142 },
    { model: "Monthly Subscription", count: 94 },
    { model: "Volume Based", count: 81 },
    { model: "One Time", count: 43 },
    { model: "Perpetual", count: 14 }
  ],
  headquartersDistribution: [
    { country: "United States", count: 194 },
    { country: "United Kingdom", count: 43 },
    { country: "India", count: 31 },
    { country: "Canada", count: 27 },
    { country: "Australia", count: 18 },
    { country: "Germany", count: 12 },
    { country: "France", count: 8 },
    { country: "Singapore", count: 4 },
    { country: "Japan", count: 1 },
    { country: "Brazil", count: 1 }
  ],
  foundingYearDistribution: [
    { range: "2020-2024", count: 87 },
    { range: "2015-2019", count: 129 },
    { range: "2010-2014", count: 93 },
    { range: "2005-2009", count: 45 },
    { range: "Before 2005", count: 20 }
  ],
  deploymentDistribution: [
    { type: "Software as a Service", count: 217 },
    { type: "Cloud Based", count: 139 },
    { type: "On Premise", count: 13 },
    { type: "Hybrid", count: 5 }
  ],
  mobileAvailable: 243,
  mobileNotAvailable: 131
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

// Top Countries Horizontal Bar Chart
const TopCountriesChart = ({ data }) => {
  // Take top 10 countries and sort by count
  const topCountries = [...data]
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
    
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={topCountries}
          margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
        >
          <XAxis type="number" />
          <YAxis 
            dataKey="country" 
            type="category" 
            width={110} 
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => value.length > 14 ? `${value.substring(0, 12)}...` : value}
          />
          <Tooltip 
            formatter={(value) => [`${value} products`, 'Count']}
            labelFormatter={(label) => `Country: ${label}`}
            contentStyle={{ backgroundColor: 'white', borderColor: BRAND_COLORS.links }}
          />
          <Bar dataKey="count" radius={[0, 4, 4, 0]}>
            {topCountries.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={CHART_COLORS[(index + 3) % CHART_COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// Enhanced Analytics Dashboard Component
const EnhancedAnalyticsDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState(initialData);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [timePeriod, setTimePeriod] = useState("last_month");

  useEffect(() => {
    fetchData();
  }, []);

  // Function to fetch analytics data
//   const fetchData = async () => {
//     try {
//       setLoading(true);
      
//       // In a real application, fetch from the API
//       // const response = await fetch('/api/dash-analytics');
//       // const data = await response.json();
      
//       // For this example, using the mock data directly
//       setTimeout(() => {
//         setAnalytics(mockData);
//         setLoading(false);
//       }, 1000);
//     } catch (error) {
//       console.error('Error fetching analytics data:', error);
//       setLoading(false);
//     }
//   };
const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/dash-analytics');
      if (!response.ok) {
        throw new Error('Failed to fetch analytics data');
      }
      const data = await response.json();
      setAnalytics(data);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: BRAND_COLORS.card }}>
      {/* Header */}
      <div className="pt-24 pb-8" style={{ backgroundColor: BRAND_COLORS.darkBackgroundArea }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white">Platform Analytics</h1>
          <p className="mt-2 text-white opacity-80">Comprehensive overview of your legal tech marketplace</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            <button 
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'overview' ? 'border-current' : 'border-transparent'}`}
              style={{ color: activeTab === 'overview' ? BRAND_COLORS.links : BRAND_COLORS.subtitle }}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'categories' ? 'border-current' : 'border-transparent'}`}
              style={{ color: activeTab === 'categories' ? BRAND_COLORS.links : BRAND_COLORS.subtitle }}
              onClick={() => setActiveTab('categories')}
            >
              Categories
            </button>
            <button 
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'users' ? 'border-current' : 'border-transparent'}`}
              style={{ color: activeTab === 'users' ? BRAND_COLORS.links : BRAND_COLORS.subtitle }}
              onClick={() => setActiveTab('users')}
            >
              User Solutions
            </button>
            <button 
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'deployment' ? 'border-current' : 'border-transparent'}`}
              style={{ color: activeTab === 'deployment' ? BRAND_COLORS.links : BRAND_COLORS.subtitle }}
              onClick={() => setActiveTab('deployment')}
            >
              Deployment
            </button>
            <button 
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'geography' ? 'border-current' : 'border-transparent'}`}
              style={{ color: activeTab === 'geography' ? BRAND_COLORS.links : BRAND_COLORS.subtitle }}
              onClick={() => setActiveTab('geography')}
            >
              Geography
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
              <p className="mt-4 text-sm" style={{ color: BRAND_COLORS.subtitle }}>Loading analytics data...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Actions Row */}
            {/* <div className="flex justify-between mb-6">
              <div className="flex space-x-2">
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium bg-white hover:bg-gray-50" style={{ color: BRAND_COLORS.bodyText }}>
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </button>
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium bg-white hover:bg-gray-50" style={{ color: BRAND_COLORS.bodyText }}>
                  <Calendar className="mr-2 h-4 w-4" />
                  Date Range
                </button>
              </div>
              <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:opacity-90" style={{ backgroundColor: BRAND_COLORS.mainButtonBg }}>
                <Download className="mr-2 h-4 w-4" />
                Export Report
              </button>
            </div> */}

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard 
                title="Total Listings" 
                value={formatNumber(analytics.totalListings)} 
                icon={Database}
                iconBgColor={BRAND_COLORS.mainButtonBg}
              />
              
              <StatCard 
                title="Total Categories" 
                value={formatNumber(analytics.categoryDistribution.length)} 
                icon={Globe}
                iconBgColor="#8b5cf6"
              />
              
              <StatCard 
                title="Product Deployments" 
                value={formatNumber(analytics.deploymentDistribution.reduce((acc, curr) => acc + curr.count, 0))} 
                icon={Server}
                iconBgColor="#f97316"
              />
              
              <StatCard 
                title="User Categories Served" 
                value={formatNumber(analytics.userCategoryDistribution.length)} 
                icon={Users}
                iconBgColor="#84cc16"
              />
            </div>

            {activeTab === 'overview' && (
              <>
                {/* Overview First Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  <ChartCard title="Top 5 Categories" subtitle="Distribution of products by category">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          layout="vertical"
                          data={analytics.categoryDistribution.slice(0, 5)}
                          margin={{ top: 5, right: 30, left: 150, bottom: 5 }}
                        >
                          <XAxis type="number" />
                          <YAxis dataKey="category" type="category" width={140} tick={{ fontSize: 12 }} />
                          <Tooltip 
                            formatter={(value) => [`${value} products`, 'Count']}
                            labelFormatter={(label) => `Category: ${label}`}
                            contentStyle={{ backgroundColor: 'white', borderColor: BRAND_COLORS.links }}
                          />
                          <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                            {analytics.categoryDistribution.slice(0, 5).map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </ChartCard>

                  <ChartCard title="User Solutions" subtitle="Distribution of products by user category">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          layout="vertical"
                          data={analytics.userCategoryDistribution.slice(0, 5)}
                          margin={{ top: 5, right: 30, left: 150, bottom: 5 }}
                        >
                          <XAxis type="number" />
                          <YAxis dataKey="category" type="category" width={140} tick={{ fontSize: 12 }} />
                          <Tooltip 
                            formatter={(value) => [`${value} products`, 'Count']}
                            labelFormatter={(label) => `User Type: ${label}`}
                            contentStyle={{ backgroundColor: 'white', borderColor: BRAND_COLORS.links }}
                          />
                          <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                            {analytics.userCategoryDistribution.slice(0, 5).map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={CHART_COLORS[(index + 2) % CHART_COLORS.length]} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </ChartCard>
                </div>

                {/* Overview Second Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  <ChartCard title="Pricing Models" subtitle="Distribution of products by pricing model">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={analytics.pricingDistribution}
                            cx="50%"
                            cy="50%"
                            labelLine={true}
                            outerRadius={70}
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
                            formatter={(value, name) => [`${value} products (${(value/analytics.totalListings*100).toFixed(1)}%)`, name]}
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
                  </ChartCard>

                  <ChartCard title="Deployment Types" subtitle="Distribution of products by deployment model">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={analytics.deploymentDistribution}
                            cx="50%"
                            cy="50%"
                            labelLine={true}
                            outerRadius={70}
                            fill={BRAND_COLORS.mainButtonBg}
                            dataKey="count"
                            nameKey="type"
                            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                          >
                            {analytics.deploymentDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={CHART_COLORS[(index + 4) % CHART_COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip 
                            formatter={(value, name) => [`${value} products (${(value/analytics.deploymentDistribution.reduce((acc, curr) => acc + curr.count, 0)*100).toFixed(1)}%)`, name]}
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
                  </ChartCard>
                </div>

                {/* World Map */}
                <ChartCard title="Headquarters Distribution" subtitle="Geographic distribution of product companies">
                  <div className="h-96">
                    <GeoChartWithAPI data={analytics.headquartersDistribution} />
                  </div>
                </ChartCard>
              </>
            )}

            {activeTab === 'categories' && (
              <>
                <div className="grid grid-cols-1 gap-6 mb-8">
                  <ChartCard title="All Categories" subtitle="Complete distribution of products by category">
                    <div className="h-96">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          layout="vertical"
                          data={analytics.categoryDistribution}
                          margin={{ top: 5, right: 30, left: 200, bottom: 5 }}
                        >
                          <XAxis type="number" />
                          <YAxis dataKey="category" type="category" width={190} tick={{ fontSize: 12 }} />
                          <Tooltip 
                            formatter={(value) => [`${value} products`, 'Count']}
                            labelFormatter={(label) => `Category: ${label}`}
                            contentStyle={{ backgroundColor: 'white', borderColor: BRAND_COLORS.links }}
                          />
                          <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                            {analytics.categoryDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </ChartCard>
                </div>
                
                {/* Category Tiles */}
                <h3 className="text-xl font-semibold mb-4" style={{ color: BRAND_COLORS.titleHeading }}>Categories at a Glance</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                  {analytics.categoryDistribution.map((category, index) => (
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
                          {((category.count / analytics.totalListings) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeTab === 'users' && (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  <ChartCard title="User Category Distribution" subtitle="Products by intended user category">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          layout="vertical"
                          data={analytics.userCategoryDistribution}
                          margin={{ top: 5, right: 30, left: 150, bottom: 5 }}
                        >
                          <XAxis type="number" />
                          <YAxis dataKey="category" type="category" width={140} tick={{ fontSize: 12 }} />
                          <Tooltip 
                            formatter={(value) => [`${value} products`, 'Count']}
                            labelFormatter={(label) => `User Type: ${label}`}
                            contentStyle={{ backgroundColor: 'white', borderColor: BRAND_COLORS.links }}
                          />
                          <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                            {analytics.userCategoryDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={CHART_COLORS[(index + 2) % CHART_COLORS.length]} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </ChartCard>

                  <ChartCard title="Mobile Availability" subtitle="Products with mobile support">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: "Mobile Available", value: analytics.mobileAvailable },
                              { name: "Not Mobile Available", value: analytics.mobileNotAvailable }
                            ]}
                            cx="50%"
                            cy="50%"
                            labelLine={true}
                            outerRadius={80}
                            dataKey="value"
                            nameKey="name"
                            label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                          >
                            <Cell fill={CHART_COLORS[6]} /> {/* Green for available */}
                            <Cell fill="#d1d5db" /> {/* Gray for not available */}
                          </Pie>
                          <Tooltip formatter={(value) => [`${value} products`, 'Count']} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </ChartCard>
                </div>
              </>
            )}

            {activeTab === 'deployment' && (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  <ChartCard title="Deployment Models" subtitle="How products are deployed">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={analytics.deploymentDistribution}
                            cx="50%"
                            cy="50%"
                            labelLine={true}
                            outerRadius={70}
                            fill={BRAND_COLORS.mainButtonBg}
                            dataKey="count"
                            nameKey="type"
                            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                          >
                            {analytics.deploymentDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={CHART_COLORS[(index + 4) % CHART_COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip 
                            formatter={(value, name) => [`${value} products (${(value/analytics.deploymentDistribution.reduce((acc, curr) => acc + curr.count, 0)*100).toFixed(1)}%)`, name]}
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
                  </ChartCard>

                  <ChartCard title="Pricing Models" subtitle="How products are priced">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={analytics.pricingDistribution}
                            cx="50%"
                            cy="50%"
                            labelLine={true}
                            outerRadius={70}
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
                            formatter={(value, name) => [`${value} products (${(value/analytics.pricingDistribution.reduce((acc, curr) => acc + curr.count, 0)*100).toFixed(1)}%)`, name]}
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
                  </ChartCard>
                </div>

                <div className="grid grid-cols-1 gap-6 mb-8">
                  <ChartCard title="Founding Year Distribution" subtitle="Age of companies on the platform">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={analytics.foundingYearDistribution}>
                          <XAxis dataKey="range" />
                          <YAxis />
                          <Tooltip 
                            formatter={(value) => [`${value} products`, 'Count']}
                            contentStyle={{ backgroundColor: 'white', borderColor: BRAND_COLORS.links }}
                          />
                          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                            {analytics.foundingYearDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={CHART_COLORS[(index + 6) % CHART_COLORS.length]} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </ChartCard>
                </div>
              </>
            )}

            {activeTab === 'geography' && (
              <>
                <div className="grid grid-cols-1 gap-6 mb-8">
                  <ChartCard title="Global Distribution" subtitle="Geographic distribution of product companies">
                    <div className="h-96">
                      <GeoChartWithAPI data={analytics.headquartersDistribution} />
                    </div>
                  </ChartCard>
                </div>

                <div className="grid grid-cols-1 gap-6 mb-8">
                  <ChartCard title="Top Headquarters Locations" subtitle="Countries with the most products">
                    <TopCountriesChart data={analytics.headquartersDistribution} />
                  </ChartCard>
                </div>
              </>
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
            <div className="flex items-center">
              <span className="inline-block h-2 w-2 rounded-full mr-2" style={{ backgroundColor: '#22c55e' }}></span>
              <p className="text-sm" style={{ color: BRAND_COLORS.subtitle }}>Data refreshes automatically</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedAnalyticsDashboard;