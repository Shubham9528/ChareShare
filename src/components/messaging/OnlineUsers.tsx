import React from 'react';
import { onlineUsersData } from '../../data/messagesData';

export const OnlineUsers: React.FC = () => {
  return (
    <div className="flex space-x-4 overflow-x-auto pb-2">
      {onlineUsersData.map((user) => (
        <button
          key={user.id}
          className="flex-shrink-0 relative focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full"
        >
          <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  parent.style.background = 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)';
                  parent.innerHTML = `
                    <div class="w-full h-full flex items-center justify-center text-white font-semibold text-lg">
                      ${user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  `;
                }
              }}
            />
            
            {/* Online Status Indicator */}
            <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
        </button>
      ))}
    </div>
  );
};