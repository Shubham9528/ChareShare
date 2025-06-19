import { Chat, OnlineUser } from '../types/messaging';

export const onlineUsersData: OnlineUser[] = [
  {
    id: 'user1',
    name: 'Dr. Sarah Chen',
    avatar: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: 'user2',
    name: 'John Miller',
    avatar: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: 'user3',
    name: 'Dr. Mike Ross',
    avatar: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: 'user4',
    name: 'Emma White',
    avatar: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: 'user5',
    name: 'Dr. Lisa Park',
    avatar: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=100'
  }
];

export const messagesData: Chat[] = [
  {
    id: 'chat1',
    name: 'Alex Linderson',
    avatar: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=100',
    lastMessage: 'How are you today?',
    lastMessageTime: new Date(Date.now() - 2 * 60 * 1000).toISOString(), // 2 minutes ago
    unreadCount: 3,
    isOnline: true,
    specialty: 'General Practice'
  },
  {
    id: 'chat2',
    name: 'Team Align',
    avatar: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=100',
    lastMessage: "Don't miss to attend the meeting.",
    lastMessageTime: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    unreadCount: 3,
    isOnline: true,
    specialty: 'Team Communication'
  },
  {
    id: 'chat3',
    name: 'Sabila Sayma',
    avatar: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=100',
    lastMessage: 'How are you today?',
    lastMessageTime: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    unreadCount: 0,
    isOnline: false,
    specialty: 'Cardiology'
  },
  {
    id: 'chat4',
    name: 'John Borino',
    avatar: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=100',
    lastMessage: 'Have a good day 😊',
    lastMessageTime: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    unreadCount: 0,
    isOnline: false,
    specialty: 'Orthopedics'
  },
  {
    id: 'chat5',
    name: 'Angel Dayna',
    avatar: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=100',
    lastMessage: 'How are you today?',
    lastMessageTime: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    unreadCount: 0,
    isOnline: true,
    specialty: 'Dermatology'
  },
  {
    id: 'chat6',
    name: 'John Abraham',
    avatar: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=100',
    lastMessage: 'Hey! Can you join the meeting?',
    lastMessageTime: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    unreadCount: 0,
    isOnline: false,
    specialty: 'Neurology'
  }
];