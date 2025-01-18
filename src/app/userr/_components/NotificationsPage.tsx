
import React, { useState, useEffect } from 'react';
import { Bell, CheckCircle, Clock, ChevronRight, RefreshCw } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const NotificationsPage = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/get-user-notifications?userId=${userId}`);
      const data = await response.json();
      setNotifications(data.notifications);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchNotifications();
    }
  }, [userId]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchNotifications();
    // Keep the animation running for at least 500ms for better UX
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    if (diff < 172800000) return 'Yesterday';
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="min-h-screen  p-6 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <Bell className="w-8 h-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          </div>
          <button
            onClick={handleRefresh}
            disabled={loading || isRefreshing}
            className="p-2 text-gray-600 hover:text-indigo-600 rounded-full hover:bg-indigo-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw 
              className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : 'transform transition-transform hover:rotate-180 duration-500'}`} 
            />
          </button>
        </div>
        <p className="text-gray-600">Stay updated with messages from your organization</p>
      </div>

      {/* Notifications List */}
      <div className="max-w-4xl mx-auto space-y-4">
        {loading ? (
          <Card className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </CardContent>
          </Card>
        ) : notifications.length === 0 ? (
          <Card className="border-dashed border-2">
            <CardContent className="p-12 text-center">
              <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">No notifications yet</h3>
              <p className="text-gray-500">We'll notify you when there's something new</p>
            </CardContent>
          </Card>
        ) : (
          notifications.map((notification) => (
            <Card 
              key={notification.id}
              className={`transform transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 ${
                !notification.read ? 'bg-gradient-to-r from-indigo-50/50 to-white border-l-4 border-l-indigo-500' : ''
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-full ${
                    !notification.read ? 'bg-indigo-100' : 'bg-gray-100'
                  }`}>
                    {!notification.read ? (
                      <Clock className="w-5 h-5 text-indigo-600" />
                    ) : (
                      <CheckCircle className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-base ${
                      !notification.read ? 'text-gray-900 font-medium' : 'text-gray-600'
                    }`}>
                      {notification.message}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-gray-500">
                        {formatTime(notification.createdAt)}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;