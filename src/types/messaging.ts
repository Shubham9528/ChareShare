export interface OnlineUser {
  id: string;
  name: string;
  avatar: string;
}

export interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
  specialty?: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  isFromMe: boolean;
  type?: 'text' | 'image' | 'file';
}