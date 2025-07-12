"use client"
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, ScatterChart, Scatter, AreaChart, Area } from 'recharts';
import { ChevronRight, ChevronDown, BarChart3, MessageSquare, Brain, Menu, Loader2 } from 'lucide-react';

// API function to fetch market intelligence data
async function fetchMarketIntelligence() {
  try {
    const response = await fetch('/api/public-mi', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch market intelligence data');
    }
    
    const data = await response.json();
    return data.insights || {};
  } catch (error) {
    console.error('Error fetching market intelligence:', error);
    return {};
  }
}

// Dashboard Component (Empty for now)
const Dashboard = () => {
  return (
    <div className="p-6">
      <div className="text-center" style={{ color: '#334155' }}>
        <BarChart3 className="mx-auto h-16 w-16 mb-4" style={{ color: '#7cc6ee' }} />
        <h3 className="text-lg font-medium mb-2" style={{ color: '#1e2556' }}>Dashboard Coming Soon</h3>
        <p style={{ color: '#2d2d2d' }}>Analytics and metrics will be displayed here.</p>
      </div>
    </div>
  );
};

// Chat Interface Component (Empty for now)
const ChatInterface = () => {
  return (
    <div className="p-6">
      <div className="text-center" style={{ color: '#334155' }}>
        <MessageSquare className="mx-auto h-16 w-16 mb-4" style={{ color: '#7cc6ee' }} />
        <h3 className="text-lg font-medium mb-2" style={{ color: '#1e2556' }}>Chat Interface Coming Soon</h3>
        <p style={{ color: '#2d2d2d' }}>Interactive chat for market intelligence queries will be available here.</p>
      </div>
    </div>
  );
};

// Chart Component for rendering different chart types
const ChartRenderer = ({ type, response }) => {
  const parseChartData = (response, type) => {
    if (!response) return [];
    
    try {
      switch (type) {
        case 'bar':
        case 'line':
        case 'area':
          // Format: "Item1: 10, Item2: 8, Item3: 6"
          return response.split(', ').map(item => {
            const [name, value] = item.split(': ');
            return { name: name.trim(), value: parseInt(value) || 0 };
          });
          
        case 'pie':
          // Format: "Category1: 35%, Category2: 25%"
          return response.split(', ').map(item => {
            const [name, percentage] = item.split(': ');
            return { 
              name: name.trim(), 
              value: parseInt(percentage.replace('%', '')) || 0 
            };
          });
          
        case 'scatter':
          // Format: "Tool1: (8.5, 1000), Tool2: (7.2, 800)"
          return response.split(', ').map(item => {
            const [name, coords] = item.split(': ');
            const coordMatch = coords.match(/\(([^,]+),\s*([^)]+)\)/);
            if (coordMatch) {
              return {
                name: name.trim(),
                x: parseFloat(coordMatch[1]) || 0,
                y: parseFloat(coordMatch[2]) || 0
              };
            }
            return { name: name.trim(), x: 0, y: 0 };
          });
          
        default:
          return [];
      }
    } catch (error) {
      console.error('Error parsing chart data:', error);
      return [];
    }
  };

  const data = parseChartData(response, type);
  const colors = ['#1e2556', '#7cc6ee', '#334155', '#2d2d2d', '#8B5CF6', '#EC4899', '#14B8A6', '#F97316'];

  if (!data.length) {
    return <div className="text-center py-8" style={{ color: '#334155' }}>No chart data available</div>;
  }

  switch (type) {
    case 'bar':
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis type="number" tick={{ fill: '#2d2d2d' }} />
            <YAxis dataKey="name" type="category" width={120} tick={{ fill: '#2d2d2d' }} />
            <Tooltip contentStyle={{ backgroundColor: '#f5f7fa', border: '1px solid #e2e8f0' }} />
            <Bar dataKey="value" fill="#1e2556" />
          </BarChart>
        </ResponsiveContainer>
      );

    case 'line':
      return (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" tick={{ fill: '#2d2d2d' }} />
            <YAxis tick={{ fill: '#2d2d2d' }} />
            <Tooltip contentStyle={{ backgroundColor: '#f5f7fa', border: '1px solid #e2e8f0' }} />
            <Line type="monotone" dataKey="value" stroke="#1e2556" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      );

    case 'pie':
      return (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: '#f5f7fa', border: '1px solid #e2e8f0' }} />
          </PieChart>
        </ResponsiveContainer>
      );

    case 'scatter':
      return (
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="x" tick={{ fill: '#2d2d2d' }} />
            <YAxis dataKey="y" tick={{ fill: '#2d2d2d' }} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: '#f5f7fa', border: '1px solid #e2e8f0' }} />
            <Scatter dataKey="y" fill="#1e2556" />
          </ScatterChart>
        </ResponsiveContainer>
      );

    case 'area':
      return (
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" tick={{ fill: '#2d2d2d' }} />
            <YAxis tick={{ fill: '#2d2d2d' }} />
            <Tooltip contentStyle={{ backgroundColor: '#f5f7fa', border: '1px solid #e2e8f0' }} />
            <Area type="monotone" dataKey="value" stroke="#1e2556" fill="#7cc6ee" fillOpacity={0.6} />
          </AreaChart>
        </ResponsiveContainer>
      );

    default:
      return <div className="text-center py-8" style={{ color: '#334155' }}>Unsupported chart type: {type}</div>;
  }
};

// Content Renderer for different content types
const ContentRenderer = ({ type, response, heading }) => {
  if (type === 'point' && Array.isArray(response)) {
    return (
      <div>
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#1e2556' }}>{heading}</h3>
        <ul className="space-y-3">
          {response.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="inline-block w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0" style={{ backgroundColor: '#7cc6ee' }}></span>
              <span style={{ color: '#2d2d2d' }}>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4" style={{ color: '#1e2556' }}>{heading}</h3>
      <div style={{ color: '#2d2d2d' }}>{response}</div>
    </div>
  );
};

// Sub Panel Detail View
const SubPanelDetail = ({ subPanelData, onBack }) => {
  const { content, graph, insights } = subPanelData;

  return (
    <div className="flex-1 p-6">
      <button 
        onClick={onBack}
        className="mb-6 flex items-center hover:opacity-80 transition-opacity"
        style={{ color: '#7cc6ee' }}
      >
        <ChevronRight className="w-4 h-4 rotate-180 mr-1" />
        Back to panels
      </button>

      <div className="space-y-8">
        {/* Content Section */}
        {content && (
          <div className="rounded-lg border p-6" style={{ backgroundColor: '#f5f7fa', borderColor: '#e2e8f0' }}>
            <ContentRenderer 
              type={content.type}
              response={content.response}
              heading={content.heading}
            />
          </div>
        )}

        {/* Graph Section */}
        {graph && (
          <div className="rounded-lg border p-6" style={{ backgroundColor: '#f5f7fa', borderColor: '#e2e8f0' }}>
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#1e2556' }}>{graph.heading}</h3>
            <ChartRenderer type={graph.type} response={graph.response} />
          </div>
        )}

        {/* Insights Section */}
        {insights && (
          <div className="rounded-lg border p-6" style={{ backgroundColor: '#f5f7fa', borderColor: '#e2e8f0' }}>
            <ContentRenderer 
              type={insights.type}
              response={insights.response}
              heading={insights.heading}
            />
          </div>
        )}
      </div>
    </div>
  );
};

// Dropdown Component for Main Headings
const DropdownSection = ({ title, subPanels, onSubPanelClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 rounded-lg hover:opacity-80 transition-all duration-200"
        style={{ backgroundColor: '#1e2556', color: 'white' }}
      >
        <span className="font-medium">{title}</span>
        {isOpen ? (
          <ChevronDown className="w-4 h-4" />
        ) : (
          <ChevronRight className="w-4 h-4" />
        )}
      </button>
      
      {isOpen && (
        <div className="mt-2 ml-4 space-y-1">
          {Object.entries(subPanels).filter(([key]) => key !== 'data_header_name').map(([subHeading, subData]) => (
            <button
              key={subHeading}
              onClick={() => onSubPanelClick(subData)}
              className="w-full text-left px-3 py-2 rounded-lg hover:opacity-80 transition-all duration-200 flex items-center justify-between group"
              style={{ backgroundColor: '#f5f7fa', color: '#2d2d2d' }}
            >
              <span className="text-sm">{subHeading}</span>
              <ChevronRight className="w-3 h-3" style={{ color: '#334155' }} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Insights Component with Sidebar
const Insights = () => {
  const [selectedPanel, setSelectedPanel] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [insightsData, setInsightsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchMarketIntelligence();
        setInsightsData(data);
      } catch (err) {
        setError('Failed to load market intelligence data');
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 mb-4 animate-spin" style={{ color: '#7cc6ee' }} />
          <p style={{ color: '#334155' }}>Loading market intelligence data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="mb-4" style={{ color: '#2d2d2d' }}>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 rounded-lg font-medium"
            style={{ backgroundColor: '#1e2556', color: 'white' }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (selectedPanel) {
    return (
      <SubPanelDetail 
        subPanelData={selectedPanel} 
        onBack={() => setSelectedPanel(null)} 
      />
    );
  }

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 overflow-hidden border-r`} style={{ backgroundColor: '#f5f7fa', borderColor: '#e2e8f0' }}>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-6" style={{ color: '#1e2556' }}>Market Intelligence</h2>
          
          {Object.keys(insightsData).length === 0 ? (
            <div className="text-center py-8">
              <p style={{ color: '#334155' }}>No data available</p>
            </div>
          ) : (
            Object.entries(insightsData).map(([mainHeading, mainData]) => (
              <DropdownSection
                key={mainHeading}
                title={mainHeading}
                subPanels={mainData}
                onSubPanelClick={setSelectedPanel}
              />
            ))
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b flex items-center" style={{ backgroundColor: '#f5f7fa', borderColor: '#e2e8f0' }}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:opacity-80 rounded-lg mr-4 transition-opacity"
            style={{ backgroundColor: '#7cc6ee', color: 'white' }}
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-semibold" style={{ color: '#1e2556' }}>Insights Overview</h1>
        </div>
        
        <div className="flex-1 p-6" style={{ backgroundColor: '#f5f7fa' }}>
          <div className="text-center mt-20" style={{ color: '#334155' }}>
            <Brain className="mx-auto h-16 w-16 mb-4" style={{ color: '#7cc6ee' }} />
            <h3 className="text-lg font-medium mb-2" style={{ color: '#1e2556' }}>Select a Panel to View Insights</h3>
            <p style={{ color: '#2d2d2d' }}>Choose a category from the sidebar to explore detailed market intelligence data, charts, and insights.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Market Intelligence Component
const MarketIntelligence = () => {
  const [activeTab, setActiveTab] = useState('insights');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'chat', label: 'Chat Interface', icon: MessageSquare },
    { id: 'insights', label: 'Insights', icon: Brain }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'chat':
        return <ChatInterface />;
      case 'insights':
        return <Insights />;
      default:
        return <Insights />;
    }
  };

  return (
    <div className="h-screen flex flex-col" style={{ backgroundColor: '#f5f7fa' }}>
      {/* Header with Tabs */}
      <div style={{ backgroundColor: '#f5f7fa', borderBottom: '1px solid #e2e8f0' }}>
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold mb-4" style={{ color: '#1e2556' }}>Market Intelligence</h1>
          <div className="flex space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg flex items-center space-x-2 transition-all duration-200 ${
                    activeTab === tab.id ? '' : 'hover:opacity-80'
                  }`}
                  style={{
                    backgroundColor: activeTab === tab.id ? '#7cc6ee' : 'transparent',
                    color: activeTab === tab.id ? 'white' : '#334155'
                  }}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        {renderContent()}
      </div>
    </div>
  );
};

export default MarketIntelligence;