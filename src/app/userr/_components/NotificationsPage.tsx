// import React, { useState, useEffect } from 'react';

// const NotificationsPage = ({ userId }) => {
//   const [notifications, setNotifications] = useState([]);
//   const [expandedNotificationId, setExpandedNotificationId] = useState(null);

//   useEffect(() => {
//     fetchNotifications(userId);
//   }, [userId]);

//   const fetchNotifications = (userId) => {
//     if (userId) {
//       fetch(`/api/get-user-notifications?userId=${userId}`)
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error('Network response was not ok');
//           }
//           return response.json();
//         })
//         .then((data) => {
//           console.log('Notifications:', data);
//           setNotifications(data.notifications);
//         })
//         .catch((error) => {
//           console.error('Error fetching notifications:', error);
//         });
//     }
//   };

//   const formatDate = (dateString) => {
//     const options = { year: 'numeric', month: 'long', day: 'numeric' };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   const toggleNotificationExpand = (notificationId) => {
//     if (expandedNotificationId === notificationId) {
//       setExpandedNotificationId(null);
//     } else {
//       setExpandedNotificationId(notificationId);
//     }
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-md p-6">
//       <h2 className="text-2xl font-bold mb-6">Notifications</h2>
//       {notifications.map((notification) => (
//         <div
//           key={notification.id}
//           className={`rounded-md p-4 mb-4 transition-colors duration-300 ${
//             notification.read ? 'bg-white' : 'bg-gray-100'
//           }`}
//         >
//           <div
//             className="flex items-center cursor-pointer"
//             onClick={() => toggleNotificationExpand(notification.id)}
//           >
//             <div className="text-gray-600 text-xl mr-4">
//               {notification.type === 'vendor' ? (
//                 <i className="fas fa-store"></i>
//               ) : (
//                 <i className="fas fa-user-shield"></i>
//               )}
//             </div>
//             <div className="flex-grow font-bold">{notification.message}</div>
//             <div className="text-gray-500 text-sm">{formatDate(notification.createdAt)}</div>
//           </div>
//           {expandedNotificationId === notification.id && (
//             <div className="mt-4 pl-8">
//               {/* Add additional notification details here */}
//               <p>This is an expanded notification with more details.</p>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default NotificationsPage;

// import React, { useState, useEffect } from 'react';
// import { Bell, CheckCheck, X, Clock, AlertCircle } from 'lucide-react';
// import { Card, CardContent } from '@/components/ui/card';

// const NotificationsPage = ({ userId }) => {
//   const [notifications, setNotifications] = useState([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const [unreadCount, setUnreadCount] = useState(0);

//   const fetchNotifications = (userId) => {
//     if (userId) {
//       fetch(`/api/get-user-notifications?userId=${userId}`)
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error("Network response was not ok");
//           }
//           return response.json();
//         })
//         .then((data) => {
//           setNotifications(data.notifications);
//           setUnreadCount(data.notifications.filter(n => !n.read).length);
//         })
//         .catch((error) => {
//           console.error("Error fetching notifications:", error);
//         });
//     }
//   };

//   useEffect(() => {
//     fetchNotifications(userId);
//     const interval = setInterval(() => fetchNotifications(userId), 30000);
//     return () => clearInterval(interval);
//   }, [userId]);

//   const getNotificationIcon = (type) => {
//     switch (type) {
//       case 'success':
//         return <CheckCheck className="w-5 h-5 text-green-500" />;
//       case 'warning':
//         return <AlertCircle className="w-5 h-5 text-yellow-500" />;
//       case 'error':
//         return <X className="w-5 h-5 text-red-500" />;
//       default:
//         return <Clock className="w-5 h-5 text-indigo-500" />;
//     }
//   };

//   const formatTime = (dateString) => {
//     const date = new Date(dateString);
//     const now = new Date();
//     const diff = now.getTime() - date.getTime();
    
//     if (diff < 60000) return 'Just now';
//     if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
//     if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
//     return `${Math.floor(diff / 86400000)}d ago`;
//   };

//   const markAsRead = (notificationId) => {
//     // Implement your mark as read API call here
//     console.log(`Marking notification ${notificationId} as read`);
//   };

//   return (
//     <div className="relative">
//       {/* Notification Bell Button */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="relative p-2 text-gray-600 hover:text-indigo-600 transition-colors"
//       >
//         <Bell className="w-6 h-6" />
//         {unreadCount > 0 && (
//           <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
//             {unreadCount}
//           </span>
//         )}
//       </button>

//       {/* Notifications Panel */}
//       {isOpen && (
//         <Card className="absolute right-0 mt-2 w-96 shadow-xl z-50 bg-white rounded-lg overflow-hidden">
//           <div className="p-4 bg-indigo-50 border-b border-indigo-100 flex justify-between items-center">
//             <h3 className="font-semibold text-indigo-900">Notifications</h3>
//             <button 
//               onClick={() => setIsOpen(false)}
//               className="text-gray-500 hover:text-gray-700"
//             >
//               <X className="w-5 h-5" />
//             </button>
//           </div>
//           <CardContent className="max-h-[480px] overflow-y-auto">
//             {notifications.length === 0 ? (
//               <div className="py-8 text-center text-gray-500">
//                 No notifications yet
//               </div>
//             ) : (
//               <div className="divide-y divide-gray-100">
//                 {notifications.map((notification) => (
//                   <div
//                     key={notification.id}
//                     className={`p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors ${
//                       !notification.read ? 'bg-indigo-50/50' : ''
//                     }`}
//                     onClick={() => markAsRead(notification.id)}
//                   >
//                     <div className="flex-shrink-0">
//                       {getNotificationIcon(notification.type)}
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <p className="text-sm text-gray-900">{notification.message}</p>
//                       <p className="text-xs text-gray-500 mt-1">
//                         {formatTime(notification.createdAt)}
//                       </p>
//                     </div>
//                     {!notification.read && (
//                       <div className="w-2 h-2 bg-indigo-600 rounded-full" />
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   );
// };

// export default NotificationsPage;

// import React, { useState, useEffect } from 'react';
// import { Bell, CheckCircle, Clock, ChevronRight } from 'lucide-react';
// import { Card, CardContent } from '@/components/ui/card';

// const NotificationsPage = ({ userId }) => {
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (userId) {
//       fetch(`/api/get-user-notifications?userId=${userId}`)
//         .then((response) => response.json())
//         .then((data) => {
//           setNotifications(data.notifications);
//           setLoading(false);
//         })
//         .catch((error) => {
//           console.error("Error:", error);
//           setLoading(false);
//         });
//     }
//   }, [userId]);

//   const formatTime = (dateString) => {
//     const date = new Date(dateString);
//     const now = new Date();
//     const diff = now.getTime() - date.getTime();
    
//     if (diff < 60000) return 'Just now';
//     if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
//     if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
//     if (diff < 172800000) return 'Yesterday';
//     return new Intl.DateTimeFormat('en-US', { 
//       month: 'short',
//       day: 'numeric'
//     }).format(date);
//   };

//   return (
//     <div className="min-h-screen  p-6 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md">
//       {/* Header */}
//       <div className="max-w-4xl mx-auto mb-8">
//         <div className="flex items-center gap-3 mb-2">
//           <Bell className="w-8 h-8 text-indigo-600" />
//           <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
//         </div>
//         <p className="text-gray-600">Stay updated with messages from your organization</p>
//       </div>

//       {/* Notifications List */}
//       <div className="max-w-4xl mx-auto space-y-4">
//         {loading ? (
//           <Card className="animate-pulse">
//             <CardContent className="p-6">
//               <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
//               <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//             </CardContent>
//           </Card>
//         ) : notifications.length === 0 ? (
//           <Card className="border-dashed border-2">
//             <CardContent className="p-12 text-center">
//               <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//               <h3 className="text-lg font-medium text-gray-900 mb-1">No notifications yet</h3>
//               <p className="text-gray-500">We'll notify you when there's something new</p>
//             </CardContent>
//           </Card>
//         ) : (
//           notifications.map((notification) => (
//             <Card 
//               key={notification.id}
//               className={`transform transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 ${
//                 !notification.read ? 'bg-gradient-to-r from-indigo-50/50 to-white border-l-4 border-l-indigo-500' : ''
//               }`}
//             >
//               <CardContent className="p-4">
//                 <div className="flex items-start gap-4">
//                   <div className={`p-2 rounded-full ${
//                     !notification.read ? 'bg-indigo-100' : 'bg-gray-100'
//                   }`}>
//                     {!notification.read ? (
//                       <Clock className="w-5 h-5 text-indigo-600" />
//                     ) : (
//                       <CheckCircle className="w-5 h-5 text-gray-500" />
//                     )}
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <p className={`text-base ${
//                       !notification.read ? 'text-gray-900 font-medium' : 'text-gray-600'
//                     }`}>
//                       {notification.message}
//                     </p>
//                     <div className="flex items-center gap-2 mt-1">
//                       <span className="text-sm text-gray-500">
//                         {formatTime(notification.createdAt)}
//                       </span>
//                     </div>
//                   </div>
//                   <ChevronRight className="w-5 h-5 text-gray-400" />
//                 </div>
//               </CardContent>
//             </Card>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default NotificationsPage;

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