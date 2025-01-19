import React, { useState, useEffect } from 'react';
import { Newspaper, RefreshCw, Edit, MessageSquare, ThumbsUp, Activity, Star, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

const ReviewCard = ({ review }) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  // Calculate average rating
  const ratings = [
    review.easeOfLearning,
    review.integration,
    review.roi,
    review.support
  ].filter(Boolean);
  
  const avgRating = ratings.length > 0 
    ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
    : null;

  return (
    <Card 
      className="group relative overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-teal-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Column - Product Info */}
          <div className="flex-shrink-0">
            <div className="relative w-16 h-16 md:w-24 md:h-24 rounded-xl overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-50 shadow-inner">
              {review.product?.logoUrl ? (
                <img
                  src={review.product.logoUrl}
                  alt={review.product.name}
                  className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-emerald-100">
                  <MessageSquare className="w-8 h-8 text-emerald-600" />
                </div>
              )}
            </div>
          </div>

          {/* Middle Column - Review Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                  {review.product?.name}
                </h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {review.involvement?.map((role, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-800 border border-emerald-100"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <Link
                href={`/review/edit?id=${review.id}`}
                className={`p-2 text-gray-400 hover:text-emerald-600 rounded-full hover:bg-emerald-50 transition-all duration-300 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Edit className="w-5 h-5" />
              </Link>
            </div>

            {/* Review Content */}
            <div className="space-y-3">
              <p className="text-sm text-gray-600 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                {review.bestThing}
              </p>
              
              {/* Rating Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Ease of Learning', value: review.easeOfLearning, icon: Activity },
                  { label: 'Integration', value: review.integration, icon: ThumbsUp },
                  { label: 'ROI', value: review.roi, icon: Activity },
                  { label: 'Support', value: review.support, icon: MessageSquare },
                ].map((metric, index) => (
                  metric.value && (
                    <div key={index} className="flex items-center gap-1 text-sm text-gray-600">
                      <metric.icon className="w-4 h-4 text-emerald-500" />
                      <span>{metric.label}: </span>
                      <span className="font-semibold">{metric.value}/5</span>
                    </div>
                  )
                ))}
              </div>
            </div>

            {/* Footer Info */}
            {/* <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>Reviewed {formatDate(review.createdAt)}</span>
              </div>
              {avgRating && (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>{avgRating} Average</span>
                </div>
              )}
              {review.recommend && (
                <div className="flex items-center gap-1">
                  <ThumbsUp className="w-4 h-4 text-emerald-500" />
                  <span>{review.recommend}/10 would recommend</span>
                </div>
              )}
            </div> */}
             <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
      {/* Left side - Date */}
      <div className="flex items-center gap-1">
        <Calendar className="w-4 h-4" />
        <span>Reviewed {formatDate(review.createdAt)}</span>
      </div>

      {/* Right side - Rating and Recommend */}
      <div className="flex items-center gap-4">
        {avgRating && (
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400" />
            <span>{avgRating} Average</span>
          </div>
        )}
        {review.recommend && (
          <div className="flex items-center gap-1">
            <ThumbsUp className="w-4 h-4 text-emerald-500" />
            <span>{review.recommend}/10 would recommend</span>
          </div>
        )}
      </div>
    </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};



const ReviewsPage = ({ userId }) => {
  const [userReviews, setUserReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/get-user-review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      const data = await response.json();
      setUserReviews(data.userReviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchReviews();
    }
  }, [userId]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchReviews();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  return (
    <div className="min-h-screen p-6 overflow-hidden rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-emerald-50/20 shadow-md">
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg">
              <Newspaper className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Reviews</h1>
              <p className="text-sm text-gray-600">
                {userReviews.length} product reviews
              </p>
            </div>
          </div>
          <button
            onClick={handleRefresh}
            disabled={loading || isRefreshing}
            className="p-2 text-gray-600 hover:text-emerald-600 rounded-full hover:bg-emerald-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw 
              className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : 'transform transition-transform hover:rotate-180 duration-500'}`} 
            />
          </button>
        </div>
      </div>

      {/* Reviews List */}
      <div className="max-w-5xl mx-auto space-y-4">
        {loading ? (
          // Loading skeleton
          [...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="flex gap-6">
                  <div className="w-24 h-24 bg-gray-200 rounded-xl"></div>
                  <div className="flex-1">
                    <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : userReviews.length === 0 ? (
          <Card className="border-dashed border-2">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
                <MessageSquare className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No reviews yet
              </h3>
              <p className="text-gray-500 mb-6">
                Share your experience with products you've used
              </p>
              <button className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
                Write a Review
              </button>
            </CardContent>
          </Card>
        ) : (
          userReviews.map((review) => (
            <ReviewCard 
              key={review.id} 
              review={review}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewsPage;