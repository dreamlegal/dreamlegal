"use client"
import React, { useState, useEffect } from "react";
import { 
  Star,
  ThumbsUp,
  MessageSquare, 
  Activity,
  RefreshCw,
  ChevronDown,
  Building2,
  Sparkles,
  Clock,
  Shield,
  Medal,
  BadgeCheck,
  ArrowRight,
  FileText
} from "lucide-react";
import { useAuth } from '@/context/authContext';
// Star Rating Component
const StarRating = ({ value, size = "md", showValue = true }) => {
  const starSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  };

  return (
    <div className="flex items-center gap-1.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star 
          key={star}
          className={`${starSizes[size]} ${
            star <= value 
              ? "text-amber-400 fill-amber-400" 
              : "text-gray-200"
          } transition-all duration-300`}
        />
      ))}
      {showValue && (
        <span className="ml-2 font-semibold text-amber-500">
          {value.toFixed(1)}
        </span>
      )}
    </div>
  );
};

// Badge Component
const Badge = ({ children, color }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
    ${color === 'amber' ? 'bg-amber-50 text-amber-700 ring-1 ring-amber-600/10' : 
    color === 'emerald' ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/10' :
    'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-600/10'}`}>
    {children}
  </span>
);

// Metric Card Component
const MetricCard = ({ label, value, icon: Icon }) => (
  <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-100">
    <div className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
      <Icon className="w-4 h-4 text-indigo-500" />
      {label}
    </div>
    <StarRating value={value} size="sm" />
  </div>
);

// Feature Section Component
const FeatureSection = ({ icon: Icon, title, children, variant = "default" }) => {
  const variants = {
    default: "bg-white ring-1 ring-gray-100",
    highlight: "bg-gradient-to-br from-emerald-50 to-teal-50 ring-1 ring-emerald-100",
    growth: "bg-gradient-to-br from-amber-50 to-orange-50 ring-1 ring-amber-100"
  };

  const textColors = {
    default: "text-gray-900",
    highlight: "text-emerald-900",
    growth: "text-amber-900"
  };

  return (
    <div className={`rounded-xl ${variants[variant]} p-6 shadow-sm`}>
      <h4 className={`flex items-center gap-2 text-lg font-semibold ${textColors[variant]} mb-3`}>
        <Icon className="w-5 h-5" />
        {title}
      </h4>
      <div className={variant === 'default' ? 'text-gray-600' : 
        variant === 'highlight' ? 'text-emerald-700' : 'text-amber-700'}>
        {children}
      </div>
    </div>
  );
};

// Review Card Component
const ReviewCard = ({ review }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const metrics = [
    { label: "Ease of Use", value: review?.easeOfLearning || 0, icon: Activity },
    { label: "Integration", value: review?.integration || 0, icon: Building2 },
    { label: "Support", value: review?.support || 0, icon: MessageSquare },
    { label: "ROI", value: review?.roi || 0, icon: ThumbsUp }
  ];

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            {/* Avatar */}
            <div className="relative">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 
                p-1 shadow-sm ring-1 ring-indigo-100">
                <div className="w-full h-full rounded-lg overflow-hidden">
                  {review?.user?.image ? (
                    <img 
                      src={review.user.image} 
                      alt={review.user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 
                      flex items-center justify-center">
                      <span className="text-xl font-bold text-indigo-600">
                        {review?.user?.name?.[0] || '?'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              {review?.verified && (
                <div className="absolute -bottom-1 -right-1 rounded-full bg-emerald-500 p-1.5 
                  ring-2 ring-white">
                  <BadgeCheck className="w-3 h-3 text-white" />
                </div>
              )}
            </div>

            {/* User Info */}
            <div>
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                {review?.user?.name || 'Anonymous'}
                {(review?.recommend || 0) >= 8 && (
                  <Badge color="amber">
                    <Medal className="w-3 h-3 mr-1" />
                    Top Reviewer
                  </Badge>
                )}
              </h3>
              <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>
                  {review?.createdAt ? 
                    new Date(review.createdAt).toLocaleDateString() : 
                    'Unknown date'}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 text-gray-400 hover:text-indigo-600 rounded-lg 
              transition-transform duration-300"
            aria-label={isExpanded ? "Show less" : "Show more"}
          >
            <ChevronDown className={`w-5 h-5 transform transition-transform duration-300
              ${isExpanded ? "rotate-180" : ""}`} />
          </button>
        </div>

        {/* Quick Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((metric) => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="space-y-6 pt-4">
            <FeatureSection 
              icon={Sparkles}
              title="Highlights"
              variant="highlight"
            >
              {review?.bestThing || 'No highlights provided'}
            </FeatureSection>

            <FeatureSection 
              icon={Shield}
              title="Areas for Growth"
              variant="growth"
            >
              {review?.worstThing || 'No improvement areas specified'}
            </FeatureSection>

            {/* Features Grid */}
            {review?.functionality?.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-indigo-500" />
                    Feature Ratings
                  </h4>
                  <Badge>
                    {review.functionality.length} Features
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {review.functionality.map((feature) => (
                    <div key={feature.category} 
                      className="flex items-center justify-between p-4 rounded-xl 
                        bg-white shadow-sm ring-1 ring-gray-100">
                      <span className="text-sm font-medium text-gray-700">
                        {feature.category}
                      </span>
                      <div className="flex items-center gap-3">
                        <StarRating value={feature.rating} size="sm" />
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 
                p-4 ring-1 ring-indigo-100">
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  Recommendation Score
                </h4>
                <div className="flex items-center gap-2">
                  <ThumbsUp className={`w-5 h-5 ${
                    (review?.recommend || 0) >= 8 ? 'text-emerald-500' : 
                    (review?.recommend || 0) >= 5 ? 'text-amber-500' : 'text-red-500'
                  }`} />
                  <span className="text-2xl font-bold text-indigo-600">
                    {review?.recommend || 0}/10
                  </span>
                </div>
              </div>

              <div className="rounded-xl bg-white p-4 ring-1 ring-gray-100">
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  Reference Availability
                </h4>
                <p className="text-gray-600">
                  {review?.reference || 'No reference information provided'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Main Component
const VendorReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
    const { vendorId, userType } = useAuth();
    const userId= vendorId
  const fetchReviews = async () => {
    try {
      
      const response = await fetch("/api/vendor-reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      
      const data = await response.json();
      if (data.success) {
        setReviews(data.products);
      } else {
        setError(data.msg);
      }
    } catch (err) {
      setError("Failed to fetch reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchReviews();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-indigo-100 animate-pulse" />
            <div className="absolute inset-0 w-16 h-16 rounded-full border-t-4 border-indigo-500 animate-spin" />
          </div>
          <p className="text-gray-600">Loading reviews...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <div className="text-center space-y-4 max-w-md mx-auto p-6">
          <div className="w-16 h-16 mx-auto text-red-500">
            <Shield className="w-full h-full" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Error Loading Reviews</h3>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <div className="text-center max-w-xl mx-auto p-8">
          <div className="relative mb-6">
            <div className="w-24 h-24 mx-auto bg-gradient-to-r from-indigo-50 to-purple-50 
              rounded-2xl flex items-center justify-center transform transition-transform duration-500 hover:scale-110">
              <FileText className="w-12 h-12 text-indigo-500" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 
              blur-xl opacity-50 rounded-full" />
          </div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 
            bg-clip-text text-transparent mb-4">
            No Reviews Yet
          </h3>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Start collecting reviews from your customers to build trust and showcase your product's value.
            Reviews help potential customers make informed decisions.
          </p>
          <button className="inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r
          from-indigo-500 to-purple-500 text-white font-semibold shadow-lg 
            hover:shadow-xl transform transition-all duration-300 hover:-translate-y-0.5">
            <Sparkles className="w-5 h-5 mr-2" />
            Get Started with Reviews
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-6 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 
          bg-white rounded-2xl p-6 shadow-lg relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 opacity-50" />
          {/* <div className="absolute inset-0 bg-grid-pattern opacity-10" /> */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(226_232_240/0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgb(226_232_240/0.1)_1px,transparent_1px)] bg-[size:24px_24px] opacity-10" />
          
          <div className="relative flex items-center gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 
              text-white shadow-lg transform transition-transform duration-300 hover:scale-110">
              <Star className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 
                bg-clip-text text-transparent">
                Product Reviews
              </h1>
              <div className="text-gray-600 flex items-center gap-2">
                <span className="flex items-center gap-1">
                  <FileText className="w-4 h-4" />
                  {reviews.reduce((total, product) => total + (product.reviews?.length || 0), 0)} total reviews
                </span>
                <span className="text-gray-300">•</span>
                <span className="flex items-center gap-1">
                  <Building2 className="w-4 h-4" />
                  {reviews.length} products
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={handleRefresh}
                disabled={loading || isRefreshing}
                className="p-3 rounded-xl bg-white border border-gray-100 text-gray-600 
                  hover:text-indigo-600 hover:border-indigo-100 hover:bg-indigo-50 
                  shadow-sm hover:shadow-md transition-all duration-300 disabled:opacity-50 
                  disabled:cursor-not-allowed transform hover:scale-105"
              >
                <RefreshCw className={`w-5 h-5 ${isRefreshing ? "animate-spin" : ""}`} />
              </button>
              <div className="absolute inset-0 bg-indigo-500/10 blur-xl opacity-0 
                hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid gap-6">
          {reviews.map((product) => (
            <div key={product.id} className="space-y-6">
              {/* Product Header */}
              <div className="flex items-center gap-4 pl-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 
                  p-2 shadow-sm">
                  {product.logoUrl ? (
                    <img
                      src={product.logoUrl}
                      alt={product.name}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  ) : (
                    <Building2 className="w-full h-full text-indigo-500" />
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 
                    bg-clip-text text-transparent">
                    {product.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {product.reviews?.length || 0} {product.reviews?.length === 1 ? "review" : "reviews"}
                  </p>
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {product.reviews?.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VendorReviews;