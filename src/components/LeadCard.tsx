
import React, { useState } from 'react';
import { Building2, Users, Mail, FileText, Package, Store, Calendar, ArrowRight, Clock, CheckCircle } from 'lucide-react';

const LoadingPlaceholder = () => (
  <div className="animate-pulse flex flex-col md:flex-row">
    <div className="flex-1 p-6 space-y-4">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="space-y-3">
        <div className="h-3 bg-gray-200 rounded w-5/6" />
        <div className="h-3 bg-gray-200 rounded w-4/6" />
      </div>
    </div>
    <div className="h-64 md:h-auto md:w-96 bg-gradient-to-r from-blue-100 to-blue-50 md:rounded-r-xl" />
  </div>
);

const LeadCard = ({ lead, verify }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  if (isLoading) {
    return (
      <div className="w-full overflow-hidden rounded-2xl bg-white shadow-xl transition-all duration-300">
        <LoadingPlaceholder />
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-2xl bg-white shadow-xl transition-all duration-300 flex flex-col md:flex-row">
      {/* Main Content Section */}
      <div className="flex-1 flex flex-col">
        <div className="p-6 flex-1">
          {/* Organization Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <InfoGroup
              title="Organization Details"
              items={[
                { icon: Building2, label: "Company", value: lead.organisationName },
                { icon: Store, label: "Type", value: lead.organisationType },
                { icon: Users, label: "Team Size", value: lead.teamSize },
              ]}
            />
            <InfoGroup
              title="Contact Information"
              items={[
                { icon: Mail, label: "Email", value: lead.contactEmail },
                { icon: Clock, label: "Response Time", value: "24 hours" },
              ]}
            />
          </div>

          {/* Requirements Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
              <FileText className="w-4 h-4 text-indigo-600" />
              Requirements Overview
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-b from-gray-50 to-white border border-gray-100">
              <p className="text-gray-600 leading-relaxed">{lead.requirements}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gradient-to-b flex flex-col md:flex-row justify-between items-start md:items-center gap-3 from-gray-50 to-white border-t border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">Inquiry received: {new Date(lead.bookingTime).toLocaleString()}</span>
          </div>
          <StatusBadge isDemo={lead.scheduleDemo} />
        </div>
      </div>

      {/* Blue Section - moves to bottom on mobile */}
      <div className="md:w-96 relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700">
        {/* Decorative Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent)]" />
          <div className="absolute inset-0 bg-[length:20px_20px] bg-grid-white/10 opacity-30" />
        </div>

        <div className="relative p-6 text-white flex flex-col justify-between min-h-[16rem] md:h-full">
          {/* Header Content */}
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-xl font-bold tracking-tight">{lead.name}</h3>
              <p className="text-sm font-medium text-indigo-100">{lead.designation}</p>
            </div>
           
            {/* Product & Vendor Tags */}
            <div className="flex flex-wrap gap-2">
              <Badge icon={Package}>{lead.ProductName}</Badge>
              <Badge icon={Store}>{lead.VendorName}</Badge>
            </div>
          </div>

          <button className="group w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white/20 backdrop-blur-sm text-sm font-medium text-white transition-all hover:bg-white/30">
            Schedule Meeting
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

const Badge = ({ children, icon: Icon }) => (
  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur-sm">
    {Icon && <Icon className="w-3.5 h-3.5" />}
    {children}
  </span>
);

const InfoGroup = ({ title, items }) => (
  <div className="space-y-3">
    <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-50">
            <item.icon className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500">{item.label}</p>
            <p className="text-sm font-medium text-gray-900 truncate">{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const StatusBadge = ({ isDemo }) => {
  const baseClasses = "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm";
  const classes = isDemo
    ? "bg-green-400/20 text-green-700"
    : "bg-red-400/20 text-red-700";

  return (
    <span className={`${baseClasses} ${classes}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${isDemo ? 'bg-green-400' : 'bg-red-400'}`} />
      {isDemo ? 'Demo Requested' : 'No Demo Requested'}
    </span>
  );
};

export default LeadCard;