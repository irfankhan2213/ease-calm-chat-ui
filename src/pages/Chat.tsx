
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import type { User, Session } from '@supabase/supabase-js';
import ChatInterface from '@/components/ChatInterface';
import ChatHeader from '@/components/ChatHeader';
import ChatHistory from '@/components/ChatHistory';

const Chat = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (!session?.user) {
          navigate('/auth');
        }
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session?.user) {
        navigate('/auth');
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
      toast({
        title: "Signed out",
        description: "You've been safely signed out of Ease.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-purple-300 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your peaceful space...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="h-screen bg-gradient-to-br from-purple-50 via-white to-teal-50 flex flex-col">
      <ChatHeader user={user} onSignOut={handleSignOut} />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Chat History */}
        <div className="w-80 border-r border-gray-200 bg-white/80 backdrop-blur-sm">
          <ChatHistory />
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          <ChatInterface user={user} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
