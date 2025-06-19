import { useState, useEffect } from 'react';
import { dbService, Message } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export interface Conversation {
  id: string;
  name: string;
  avatar_url: string | null;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
  specialty?: string;
}

export const useMessages = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentChat, setCurrentChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch conversations
  useEffect(() => {
    const fetchConversations = async () => {
      if (!user) {
        setConversations([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await dbService.getConversations(user.id);
        
        // Transform data to match our Conversation interface
        const formattedConversations: Conversation[] = data.map((conv: any) => ({
          id: conv.other_user_id,
          name: conv.full_name,
          avatar_url: conv.avatar_url,
          lastMessage: conv.last_message,
          lastMessageTime: conv.last_message_time,
          unreadCount: conv.unread_count,
          isOnline: false, // We would need a separate online status system
          specialty: conv.specialization
        }));
        
        setConversations(formattedConversations);
        setError(null);
      } catch (err) {
        console.error('Error fetching conversations:', err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
    
    // Set up a polling interval to refresh conversations
    const interval = setInterval(fetchConversations, 30000); // Every 30 seconds
    
    return () => clearInterval(interval);
  }, [user]);

  // Fetch messages for current chat
  useEffect(() => {
    const fetchMessages = async () => {
      if (!user || !currentChat) {
        setMessages([]);
        return;
      }

      try {
        setLoading(true);
        const data = await dbService.getMessages(user.id, currentChat);
        
        // Mark messages as read
        await dbService.markMessagesAsRead(user.id, currentChat);
        
        // Update unread count in conversations
        setConversations(prev => 
          prev.map(conv => 
            conv.id === currentChat 
              ? { ...conv, unreadCount: 0 } 
              : conv
          )
        );
        
        setMessages(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching messages:', err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
    
    // Set up a polling interval to refresh messages
    const interval = setInterval(fetchMessages, 5000); // Every 5 seconds
    
    return () => clearInterval(interval);
  }, [user, currentChat]);

  const sendMessage = async (content: string) => {
    if (!user || !currentChat) return;

    try {
      const newMessage = {
        sender_id: user.id,
        receiver_id: currentChat,
        content,
        message_type: 'text' as const,
        is_read: false
      };
      
      const sentMessage = await dbService.sendMessage(newMessage);
      
      // Update local messages state
      setMessages(prev => [...prev, sentMessage]);
      
      // Update conversations with new last message
      setConversations(prev => 
        prev.map(conv => 
          conv.id === currentChat 
            ? { 
                ...conv, 
                lastMessage: content,
                lastMessageTime: new Date().toISOString()
              } 
            : conv
        )
      );
      
      return sentMessage;
    } catch (err) {
      console.error('Error sending message:', err);
      throw err;
    }
  };

  return {
    conversations,
    messages,
    loading,
    error,
    currentChat,
    setCurrentChat,
    sendMessage
  };
};