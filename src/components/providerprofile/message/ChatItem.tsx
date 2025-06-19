import React from 'react';
import { Chat } from '../../../types/messaging';

interface ChatItemProps {
  chat: Chat;
  onClick: () => void;
}

export const ChatItem: React.FC<ChatItemProps> = ({ chat, onClick }) => {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'now';
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hr ago`;
    return date.toLocaleDateString();
  };

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-left"
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
          <img
            src={chat.avatar}
            alt={chat.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const parent = e.currentTarget.parentElement;
              if (parent) {
                parent.style.background = 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)';
                parent.innerHTML = `
                  <div class="w-full h-full flex items-center justify-center text-white font-semibold">
                    ${chat.name.split(' ').map(n => n[0]).join('')}
                  </div>
                `;
              }
            }}
          />
        </div>
        
        {/* Online Status */}
        {chat.isOnline && (
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
        )}
      </div>

      {/* Chat Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-gray-900 truncate">{chat.name}</h3>
          <span className="text-xs text-gray-500 flex-shrink-0">
            {formatTime(chat.lastMessageTime)}
          </span>
        </div>
        <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
      </div>

      {/* Unread Badge */}
      {chat.unreadCount > 0 && (
        <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white text-xs font-medium rounded-full flex items-center justify-center">
          {chat.unreadCount > 9 ? '9+' : chat.unreadCount}
        </div>
      )}
    </button>
  );
};