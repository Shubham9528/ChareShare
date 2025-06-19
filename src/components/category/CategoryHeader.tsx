import React, { useState, useRef, useEffect } from 'react';
import { Bell, X } from 'lucide-react';

interface CategoryHeaderProps {
  onBack?: () => void;
  onShare?: () => void;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  type: 'appointment' | 'reminder' | 'update' | 'message';
}

export const CategoryHeader: React.FC<CategoryHeaderProps> = ({ onBack, onShare }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Mock notifications data
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Appointment Reminder',
      message: 'Your appointment with Dr. Sarah Chen is tomorrow at 2:00 PM',
      time: '2 hours ago',
      isRead: false,
      type: 'appointment'
    },
    {
      id: '2',
      title: 'New Message',
      message: 'Dr. Mike Ross sent you a message about your treatment plan',
      time: '4 hours ago',
      isRead: false,
      type: 'message'
    },
    {
      id: '3',
      title: 'Health Tip',
      message: 'Remember to take your daily vitamins and stay hydrated',
      time: '1 day ago',
      isRead: true,
      type: 'reminder'
    },
    {
      id: '4',
      title: 'App Update',
      message: 'CareCircle has been updated with new features and improvements',
      time: '2 days ago',
      isRead: true,
      type: 'update'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const handleClearAll = () => {
    setNotifications([]);
    setShowNotifications(false);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'appointment':
        return '📅';
      case 'message':
        return '💬';
      case 'reminder':
        return '💡';
      case 'update':
        return '🔄';
      default:
        return '🔔';
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="flex items-center justify-between px-4 py-4">
        {/* Empty space for layout balance */}
        <div className="w-20"></div>

        {/* Title */}
        <h1 className="text-xl font-semibold text-gray-900">
          CareCircle
        </h1>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3 relative">
          {/* Notification Button */}
          <div className="relative">
            <button
              ref={buttonRef}
              onClick={handleNotificationClick}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 relative"
            >
              <Bell className="w-6 h-6 text-gray-700" />
              {/* Notification Badge */}
              {unreadCount > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                </div>
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div
                ref={dropdownRef}
                className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 max-h-96 overflow-hidden"
              >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Notifications
                  </h3>
                  <div className="flex items-center space-x-2">
                    {unreadCount > 0 && (
                      <button
                        onClick={handleMarkAllAsRead}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                      >
                        Mark all read
                      </button>
                    )}
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
                    >
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>

                {/* Notifications List */}
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Bell className="w-8 h-8 text-gray-400" />
                      </div>
                      <h4 className="text-lg font-medium text-gray-900 mb-2">
                        No notifications
                      </h4>
                      <p className="text-gray-600 text-sm">
                        You're all caught up! Check back later for updates.
                      </p>
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-100">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 hover:bg-gray-50 transition-colors duration-200 cursor-pointer ${
                            !notification.isRead ? 'bg-blue-50' : ''
                          }`}
                          onClick={() => handleMarkAsRead(notification.id)}
                        >
                          <div className="flex items-start space-x-3">
                            {/* Icon */}
                            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm">
                              {getNotificationIcon(notification.type)}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className={`text-sm font-medium ${
                                  !notification.isRead ? 'text-gray-900' : 'text-gray-700'
                                }`}>
                                  {notification.title}
                                </h4>
                                {!notification.isRead && (
                                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 leading-relaxed mb-2">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-500">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer */}
                {notifications.length > 0 && (
                  <div className="p-4 border-t border-gray-100 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={handleClearAll}
                        className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors duration-200"
                      >
                        Clear all
                      </button>
                      <button
                        onClick={() => setShowNotifications(false)}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                      >
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Share Button */}
          <button
            onClick={onShare}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.8125 8.97891V8.4375V7.3125C14.8125 7.00313 14.5594 6.75 14.25 6.75H13.125H12.5625H10.9277C9.13828 6.75 7.62656 7.92773 7.12031 9.54844C7.0043 9.21797 6.9375 8.85234 6.9375 8.4375C6.9375 6.26133 8.69883 4.5 10.875 4.5H12.5625H13.125H14.25C14.5594 4.5 14.8125 4.24687 14.8125 3.9375V2.8125V2.27109L18.5391 5.625L14.8125 8.97891ZM12.5625 8.4375H13.125V10.125C13.125 10.7473 13.6277 11.25 14.25 11.25H14.3801C14.6578 11.25 14.925 11.148 15.1324 10.9617L20.0191 6.56367C20.2863 6.32461 20.4375 5.98359 20.4375 5.625C20.4375 5.26641 20.2863 4.92539 20.0191 4.68633L15.1605 0.312891C14.9355 0.1125 14.6473 0 14.3449 0C13.6699 0 13.125 0.544922 13.125 1.21992V2.8125H12.5625H11.4375H10.875C7.76719 2.8125 5.25 5.32969 5.25 8.4375C5.25 10.5609 6.46641 11.9215 7.49648 12.6879C7.70391 12.8426 7.90078 12.9727 8.08359 13.0816C8.23828 13.1766 8.38242 13.2539 8.50195 13.3137C8.62148 13.3734 8.71992 13.4191 8.79023 13.4508C8.86758 13.4859 8.95195 13.5 9.03984 13.5H9.12773C9.47227 13.5 9.75352 13.2188 9.75352 12.8742C9.75352 12.6 9.56719 12.3574 9.3457 12.1887C9.33164 12.1781 9.32109 12.1711 9.30703 12.1605C9.24727 12.1219 9.1875 12.0727 9.13125 12.0164C9.10312 11.9883 9.07148 11.9602 9.04336 11.925C9.01523 11.8898 8.98711 11.8582 8.95898 11.823C8.8957 11.7352 8.83594 11.6367 8.7832 11.5242C8.6918 11.3133 8.63203 11.0566 8.63203 10.7367C8.63203 9.46758 9.66211 8.43398 10.9348 8.43398H11.4375H12.5625V8.4375ZM3.28125 1.125C1.88203 1.125 0.75 2.25703 0.75 3.65625V15.4688C0.75 16.868 1.88203 18 3.28125 18H15.0938C16.493 18 17.625 16.868 17.625 15.4688V13.2188C17.625 12.7512 17.2488 12.375 16.7812 12.375C16.3137 12.375 15.9375 12.7512 15.9375 13.2188V15.4688C15.9375 15.9363 15.5613 16.3125 15.0938 16.3125H3.28125C2.81367 16.3125 2.4375 15.9363 2.4375 15.4688V3.65625C2.4375 3.18867 2.81367 2.8125 3.28125 2.8125H5.53125C5.99883 2.8125 6.375 2.43633 6.375 1.96875C6.375 1.50117 5.99883 1.125 5.53125 1.125H3.28125Z" fill="url(#paint0_linear_379_3808)"/>
              <defs>
                <linearGradient id="paint0_linear_379_3808" x1="10.5938" y1="0" x2="10.5938" y2="18" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#3B82F6"/>
                  <stop offset="1" stopColor="#234C90"/>
                </linearGradient>
              </defs>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};