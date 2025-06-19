import React from 'react';
import { ChatItem } from './ChatItem';
import { Chat } from '../../../types/messaging';

interface ChatListProps {
  chats: Chat[];
  onChatSelect: (chatId: string) => void;
}

export const ChatList: React.FC<ChatListProps> = ({ chats, onChatSelect }) => {
  return (
    <div className="space-y-1">
      {chats.map((chat) => (
        <ChatItem
          key={chat.id}
          chat={chat}
          onClick={() => onChatSelect(chat.id)}
        />
      ))}
    </div>
  );
};