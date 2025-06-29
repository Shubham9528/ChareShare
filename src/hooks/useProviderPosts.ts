import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { dbService } from '../lib/supabase';

export interface Post {
  id: string;
  provider_id: string;
  title: string;
  content: string;
  image_url?: string;
  categories: string[];
  created_at: string;
  updated_at: string;
  likes: number;
  comments: number;
}

export const useProviderPosts = (providerId?: string) => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Determine which ID to use
  const targetId = providerId || (user?.id || '');

  // Fetch provider posts
  useEffect(() => {
    const fetchPosts = async () => {
      if (!targetId) {
        setPosts([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // In a real app, we would fetch from a posts table
        // For now, we'll return mock data
        setPosts(mockPosts(targetId));
        setError(null);
      } catch (err) {
        console.error('Error fetching provider posts:', err);
        setError(err as Error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [targetId]);

  // Add post
  const addPost = async (postData: Omit<Post, 'id' | 'provider_id' | 'created_at' | 'updated_at' | 'likes' | 'comments'>) => {
    if (!user) throw new Error('User not authenticated');

    try {
      setLoading(true);
      
      // In a real app, we would insert into a posts table
      // For now, we'll simulate adding a post
      const newPost: Post = {
        id: Date.now().toString(),
        provider_id: user.id,
        ...postData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        likes: 0,
        comments: 0
      };
      
      setPosts(prev => [newPost, ...prev]);
      return newPost;
    } catch (err) {
      console.error('Error adding post:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete post
  const deletePost = async (postId: string) => {
    if (!user) throw new Error('User not authenticated');

    try {
      setLoading(true);
      
      // In a real app, we would delete from a posts table
      // For now, we'll simulate deleting a post
      setPosts(prev => prev.filter(post => post.id !== postId));
      return true;
    } catch (err) {
      console.error('Error deleting post:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    posts,
    loading,
    error,
    addPost,
    deletePost
  };
};

// Mock data for development
function mockPosts(providerId: string): Post[] {
  return [
    {
      id: '1',
      provider_id: providerId,
      title: 'Understanding Heart Health',
      content: 'Understanding heart health basics: 5 tips for a healthy heart 🖤',
      image_url: 'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=400',
      categories: ['Health Tips', 'Cardiology'],
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      likes: 2456,
      comments: 123
    },
    {
      id: '2',
      provider_id: providerId,
      title: 'Nutrition for Optimal Health',
      content: 'What you eat matters! Here are some nutrition tips for maintaining optimal health and wellbeing.',
      image_url: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
      categories: ['Nutrition', 'Health Tips'],
      created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      likes: 1872,
      comments: 95
    }
  ];
}