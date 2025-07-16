'use client'

import React, { useState, useEffect, useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, ScatterChart, Scatter, AreaChart, Area } from 'recharts';
import { ChevronRight, ChevronDown, BarChart3, MessageSquare, Brain, Menu, Loader2 } from 'lucide-react';


// Horizontal Bar Chart using Chart.js
const HorizontalBarChart = ({ data }) => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const [chartError, setChartError] = useState(null);

  useEffect(() => {
    if (!canvasRef.current || !data || data.length === 0) return;

    // Import Chart.js dynamically with error handling
    import('chart.js/auto').then((Chart) => {
      try {
        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) {
          setChartError('Canvas context not available');
          return;
        }
        
        // Destroy existing chart if it exists
        if (chartRef.current) {
          chartRef.current.destroy();
        }

        chartRef.current = new Chart.default(ctx, {
          type: 'bar',
          data: {
            labels: data.map(item => item?.name || 'Unknown'),
            datasets: [{
              label: 'Count',
              data: data.map(item => item?.value || 0),
              backgroundColor: '#1e2556',
              borderColor: '#1e2556',
              borderWidth: 1
            }]
          },
          options: {
            indexAxis: 'y', // This makes it horizontal
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              }
            },
            scales: {
              x: {
                beginAtZero: true,
                ticks: {
                  color: '#2d2d2d'
                },
                grid: {
                  color: '#e2e8f0'
                }
              },
              y: {
                ticks: {
                  color: '#2d2d2d',
                  font: {
                    size: 11
                  }
                },
                grid: {
                  display: false
                }
              }
            }
          }
        });
        
        setChartError(null);
      } catch (error) {
        console.error('Chart.js error:', error);
        setChartError('Failed to create chart');
      }
    }).catch((error) => {
      console.error('Failed to load Chart.js:', error);
      setChartError('Failed to load chart library');
    });

    // Cleanup function
    return () => {
      if (chartRef.current) {
        try {
          chartRef.current.destroy();
        } catch (error) {
          console.error('Error destroying chart:', error);
        }
      }
    };
  }, [data]);

  if (chartError) {
    return (
      <div className="text-center py-8" style={{ color: '#334155' }}>
        <p>Chart error: {chartError}</p>
        <p className="text-sm mt-2">Falling back to data display</p>
        <div className="mt-4 text-left">
          {data && data.map((item, index) => (
            <div key={index} className="flex justify-between py-1">
              <span>{item?.name || 'Unknown'}</span>
              <span>{item?.value || 0}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '300px', width: '100%' }}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};
async function fetchMarketIntelligence() {
  try {
    const response = await fetch('/api/public-mi', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
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
  console.log('📈 Chart: ChartRenderer called with type:', type, 'response:', response);
  
  // Add fallback test data for debugging
  const testData = [
    { name: "Contract Lifecycle Management", value: 8 },
    { name: "Legal AI", value: 6 },
    { name: "Document Management", value: 7 },
    { name: "E-discovery", value: 4 },
    { name: "IP Management", value: 5 }
  ];

  const parseChartData = (response, type) => {
    if (!response) {
      console.log('⚠️ Chart: No response data provided');
      return [];
    }
    
    console.log('🔍 Chart: Parsing type:', type, 'Response:', response);
    
    try {
      switch (type) {
        case 'bar':
        case 'horizontal-bar':
        case 'line':
        case 'area':
          if (response.includes(':') && response.includes(',')) {
            // Check if this is complex format (Category: Item: Value, Item: Value)
            const colonCount = (response.match(/:/g) || []).length;
            const commaCount = (response.match(/,/g) || []).length;
            
            console.log('📊 Chart: Colon count:', colonCount, 'Comma count:', commaCount);
            
            // If we have more colons than commas + 1, it's likely complex format
            if (colonCount > commaCount + 1) {
              console.log('📊 Chart: Detected complex format');
              // Complex format: "Category: Item1: Value1, Item2: Value2"
              const firstColonIndex = response.indexOf(':');
              if (firstColonIndex !== -1) {
                // Skip the category part and get the vendor:value pairs
                const vendorData = response.substring(firstColonIndex + 1).trim();
                const items = vendorData.split(', ');
                
                console.log('📊 Chart: Vendor data:', vendorData);
                console.log('📊 Chart: Split items:', items);
                
                const parsedData = items.map(item => {
                  const colonIndex = item.lastIndexOf(':');
                  if (colonIndex === -1) return null;
                  
                  const name = item.substring(0, colonIndex).trim();
                  const value = item.substring(colonIndex + 1).trim();
                  
                  console.log('📊 Chart: Parsing complex item - name:', name, 'value:', value);
                  
                  return { 
                    name: name || 'Unknown',
                    value: parseInt(value) || 0 
                  };
                }).filter(item => item !== null && item.name !== 'Unknown' && item.value > 0);
                
                console.log('📊 Chart: Final complex parsed data:', parsedData);
                return parsedData;
              }
            } else {
              console.log('📊 Chart: Detected simple format');
              // Simple format: "Item1: Value1, Item2: Value2"
              const items = response.split(', ');
              
              const parsedData = items.map(item => {
                const colonIndex = item.lastIndexOf(':');
                if (colonIndex === -1) return null;
                
                const name = item.substring(0, colonIndex).trim();
                const value = item.substring(colonIndex + 1).trim();
                
                console.log('📊 Chart: Parsing simple item - name:', name, 'value:', value);
                
                return { 
                  name: name || 'Unknown',
                  value: parseInt(value) || 0 
                };
              }).filter(item => item !== null && item.name !== 'Unknown' && item.value > 0);
              
              console.log('📊 Chart: Final simple parsed data:', parsedData);
              return parsedData;
            }
          }
          return [];
          
        case 'pie':
          // Format: "Category1: 35%, Category2: 25%"
          if (response.includes(':') && response.includes(',')) {
            const items = response.split(', ');
            const pieData = items.map(item => {
              const colonIndex = item.lastIndexOf(':');
              if (colonIndex === -1) return null;
              
              const name = item.substring(0, colonIndex).trim();
              const percentage = item.substring(colonIndex + 1).trim();
              
              return { 
                name: name || 'Unknown',
                value: parseInt(percentage.replace('%', '')) || 0 
              };
            }).filter(item => item !== null && item.name !== 'Unknown');
            
            console.log('🥧 Chart: Parsed pie data:', pieData);
            return pieData;
          }
          return [];
          
        case 'scatter':
          // Format: "Tool1: (8.5, 1000), Tool2: (7.2, 800)"
          if (response.includes(':') && response.includes('(') && response.includes(')')) {
            const items = response.split(', ');
            console.log('📍 Chart: Scatter items to parse:', items);
            
            const scatterData = items.map(item => {
              const colonIndex = item.lastIndexOf(':');
              if (colonIndex === -1) return null;
              
              const name = item.substring(0, colonIndex).trim();
              const coords = item.substring(colonIndex + 1).trim();
              
              console.log('📍 Chart: Parsing scatter - name:', name, 'coords:', coords);
              
              // Match coordinates in parentheses
              const coordMatch = coords.match(/\(([^,]+),\s*([^)]+)\)/);
              if (coordMatch) {
                const result = {
                  name: name || 'Unknown',
                  x: parseFloat(coordMatch[1]) || 0,
                  y: parseFloat(coordMatch[2]) || 0
                };
                console.log('📍 Chart: Parsed scatter point:', result);
                return result;
              }
              return null;
            }).filter(item => item !== null && item.name !== 'Unknown');
            
            console.log('📍 Chart: Final scatter data:', scatterData);
            return scatterData;
          }
          return [];
          
        default:
          console.log('⚠️ Chart: Unknown chart type:', type);
          return [];
      }
    } catch (error) {
      console.error('❌ Chart: Error parsing chart data:', error);
      console.error('❌ Chart: Response was:', response);
      return [];
    }
  };

  let data = parseChartData(response, type);
  
  // Temporary: Use test data if parsing fails for bar charts
  if ((!data || data.length === 0) && (type === 'bar' || type === 'horizontal-bar')) {
    console.log('🔧 Chart: Using test data for', type, 'chart');
    data = testData;
  }
  
  const colors = ['#1e2556', '#7cc6ee', '#334155', '#2d2d2d', '#8B5CF6', '#EC4899', '#14B8A6', '#F97316'];

  console.log('📊 Chart: Final data for rendering:', data);
  console.log('📊 Chart: Data length:', data.length);

  if (!data.length) {
    console.log('⚠️ Chart: No data to render - showing fallback message');
    return <div className="text-center py-8" style={{ color: '#334155' }}>No chart data available</div>;
  }

  // Validate data structure
  const isValidData = data.every(item => 
    item && 
    typeof item === 'object' && 
    'name' in item && 
    'value' in item && 
    typeof item.value === 'number' && 
    item.value > 0
  );

  if (!isValidData) {
    console.log('⚠️ Chart: Invalid data structure:', data);
    return <div className="text-center py-8" style={{ color: '#334155' }}>Invalid chart data format</div>;
  }

  console.log('✅ Chart: Data validation passed, rendering chart');

  switch (type) {
    case 'bar':
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#2d2d2d', fontSize: 10 }} 
              angle={-45}
              textAnchor="end"
              height={80}
              interval={0}
            />
            <YAxis 
              tick={{ fill: '#2d2d2d', fontSize: 12 }} 
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#f5f7fa', border: '1px solid #e2e8f0' }}
              formatter={(value, name) => [`${value}`, 'Count']}
              labelFormatter={(label) => `${label}`}
            />
            <Bar dataKey="value" fill="#1e2556" />
          </BarChart>
        </ResponsiveContainer>
      );

    case 'horizontal-bar':
      return <HorizontalBarChart data={data} />;

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
      <div style={{ color: '#2d2d2d' }}>
        {typeof response === 'string' ? response : JSON.stringify(response)}
      </div>
    </div>
  );
};

// Sub Panel Detail View
const SubPanelDetail = ({ subPanelData, onBack, sidebarOpen, setSidebarOpen, insightsData, openDropdowns, toggleDropdown, onSubPanelClick }) => {
  const { content, graph, insights } = subPanelData;

  return (
    <div className="flex h-full">
      {/* Sidebar - Keep original structure */}
      <div className={`${sidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 overflow-hidden border-r`} style={{ backgroundColor: '#f5f7fa', borderColor: '#e2e8f0' }}>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-6" style={{ color: '#1e2556' }}>Market Intelligence</h2>
          
          {!insightsData || Object.keys(insightsData || {}).length === 0 ? (
            <div className="text-center py-8">
              <p style={{ color: '#334155' }}>No data available</p>
            </div>
          ) : (
            Object.entries(insightsData || {}).map(([mainHeading, mainData]) => (
              <DropdownSection
                key={mainHeading}
                title={mainHeading}
                subPanels={mainData || {}}
                onSubPanelClick={onSubPanelClick}
                isOpen={openDropdowns[mainHeading] || false}
                setIsOpen={(isOpen) => toggleDropdown(mainHeading)}
              />
            ))
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b flex items-center" style={{ backgroundColor: '#f5f7fa', borderColor: '#e2e8f0' }}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:opacity-80 rounded-lg mr-4 transition-opacity"
            style={{ backgroundColor: '#7cc6ee', color: 'white' }}
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-semibold" style={{ color: '#1e2556' }}>Panel Details</h1>
          <button 
            onClick={onBack}
            className="ml-auto flex items-center hover:opacity-80 transition-opacity px-3 py-1 rounded-lg"
            style={{ backgroundColor: '#7cc6ee', color: 'white' }}
          >
            <ChevronRight className="w-4 h-4 rotate-180 mr-1" />
            Back to Overview
          </button>
        </div>

        <div className="flex-1 p-6 overflow-auto" style={{ backgroundColor: '#f5f7fa' }}>
          <div className="space-y-8">
            {/* Content Section */}
            {content && (
              <div className="rounded-lg border p-6" style={{ backgroundColor: 'white', borderColor: '#e2e8f0' }}>
                <ContentRenderer 
                  type={content.type}
                  response={content.response}
                  heading={content.heading}
                />
              </div>
            )}

            {/* Graph Section */}
            {graph && (
              <div className="rounded-lg border p-6" style={{ backgroundColor: 'white', borderColor: '#e2e8f0' }}>
                <h3 className="text-lg font-semibold mb-4" style={{ color: '#1e2556' }}>{graph.heading}</h3>
                <ChartRenderer type={graph.type} response={graph.response} />
              </div>
            )}

            {/* Insights Section */}
            {insights && (
              <div className="rounded-lg border p-6" style={{ backgroundColor: 'white', borderColor: '#e2e8f0' }}>
                <ContentRenderer 
                  type={insights.type}
                  response={insights.response}
                  heading={insights.heading}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Dropdown Component for Main Headings
const DropdownSection = ({ title, subPanels, onSubPanelClick, isOpen, setIsOpen }) => {
  // Ensure subPanels is a valid object
  const validSubPanels = subPanels && typeof subPanels === 'object' ? subPanels : {};
  
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
          {Object.entries(validSubPanels).filter(([key]) => key !== 'data_header_name').map(([subHeading, subData]) => (
            <button
              key={subHeading}
              onClick={() => onSubPanelClick(subData)}
              className="w-full text-left px-3 py-2 rounded-lg hover:opacity-80 transition-all duration-200 flex items-center justify-between group"
              style={{ backgroundColor: 'white', color: '#2d2d2d', border: '1px solid #e2e8f0' }}
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
  const [openDropdowns, setOpenDropdowns] = useState({});

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log('🔄 Insights: Starting data load...');
        setLoading(true);
        setError(null);
        
        const data = await fetchMarketIntelligence();
        console.log('📊 Insights: Data loaded:', data);
        
        // Ensure data is a valid object
        const validData = data && typeof data === 'object' ? data : {};
        setInsightsData(validData);
        
        // Open first dropdown by default if data exists
        const dataKeys = Object.keys(validData);
        if (dataKeys.length > 0) {
          const firstKey = dataKeys[0];
          setOpenDropdowns({ [firstKey]: true });
          console.log('📂 Insights: Opened first dropdown:', firstKey);
        }
      } catch (err) {
        console.error('❌ Insights: Error loading data:', err);
        setError('Failed to load market intelligence data');
        setInsightsData({}); // Ensure we set empty object on error
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const toggleDropdown = (key) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

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
        <div className="text-center max-w-md">
          <p className="mb-4" style={{ color: '#2d2d2d' }}>{error}</p>
          <div className="mb-4 p-4 rounded-lg text-sm text-left" style={{ backgroundColor: 'white', border: '1px solid #e2e8f0' }}>
            <h4 className="font-medium mb-2" style={{ color: '#1e2556' }}>Troubleshooting:</h4>
            <ul className="space-y-1" style={{ color: '#2d2d2d' }}>
              <li>• Check if API endpoint `/api/public-mi` exists</li>
              <li>• Verify API route is deployed correctly</li>
              <li>• Check browser console for detailed errors</li>
              <li>• Ensure environment variables are set</li>
            </ul>
          </div>
          <button
            onClick={() => {
              setError(null);
              setInsightsData({});
              window.location.reload();
            }}
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
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        insightsData={insightsData}
        openDropdowns={openDropdowns}
        toggleDropdown={toggleDropdown}
        onSubPanelClick={setSelectedPanel}
      />
    );
  }

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 overflow-hidden border-r`} style={{ backgroundColor: '#f5f7fa', borderColor: '#e2e8f0' }}>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-6" style={{ color: '#1e2556' }}>Market Intelligence</h2>
          
          {!insightsData || Object.keys(insightsData || {}).length === 0 ? (
            <div className="text-center py-8">
              <p style={{ color: '#334155' }}>No data available</p>
            </div>
          ) : (
            Object.entries(insightsData || {}).map(([mainHeading, mainData]) => (
              <DropdownSection
                key={mainHeading}
                title={mainHeading}
                subPanels={mainData || {}}
                onSubPanelClick={setSelectedPanel}
                isOpen={openDropdowns[mainHeading] || false}
                setIsOpen={(isOpen) => toggleDropdown(mainHeading)}
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
            
            {/* Debug Info */}
            <div className="mt-8 p-4 rounded-lg text-left text-sm" style={{ backgroundColor: 'white', border: '1px solid #e2e8f0' }}>
              <h4 className="font-medium mb-2" style={{ color: '#1e2556' }}>Debug Information:</h4>
              <p style={{ color: '#2d2d2d' }}>Data categories loaded: {Object.keys(insightsData || {}).length}</p>
              <p style={{ color: '#2d2d2d' }}>Categories: {Object.keys(insightsData || {}).join(', ') || 'None'}</p>
              <p style={{ color: '#2d2d2d' }}>Data status: {insightsData ? 'Loaded' : 'Empty'}</p>
              <p className="mt-2 text-xs" style={{ color: '#334155' }}>Check browser console for detailed logs</p>
            </div>
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