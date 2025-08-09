
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import type { User, Session } from '@supabase/supabase-js';
import TextChatPage from '@/components/TextChatPage';
import VoiceChatPage from '@/components/VoiceChatPage';
import ChatModeSelector from '@/components/ChatModeSelector';

const Chat = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const mode = searchParams.get('mode') as 'text' | 'voice' | null;
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
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

  const setMode = (newMode: 'text' | 'voice') => {
    setSearchParams({ mode: newMode });
  };

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

  // Show mode selector if no mode is selected
  if (!mode) {
    return (
      <div className="h-screen bg-gradient-to-br from-purple-50 via-white to-teal-50">
        <ChatModeSelector 
          mode={null} 
          setMode={setMode} 
          user={user} 
          onSignOut={handleSignOut} 
        />
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-purple-50 via-white to-teal-50">
      {mode === 'text' ? (
        <TextChatPage user={user} onSignOut={handleSignOut} setMode={setMode} />
      ) : (
        <VoiceChatPage user={user} onSignOut={handleSignOut} setMode={setMode} />
      )}
    </div>
  );
};

export default Chat;
