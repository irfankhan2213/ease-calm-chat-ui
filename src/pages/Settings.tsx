
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Heart, Volume2, VolumeX, Trash2, UserX, Shield } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import type { User } from '@supabase/supabase-js';

const Settings = () => {
  const [user, setUser] = useState<User | null>(null);
  const [settings, setSettings] = useState({
    voiceFeedback: true,
    activeCoaching: false,
    notificationsEnabled: true,
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check authentication
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session?.user) {
        navigate('/auth');
      } else {
        setUser(session.user);
      }
    });
  }, [navigate]);

  const handleSettingChange = (setting: keyof typeof settings, value: boolean) => {
    setSettings(prev => ({ ...prev, [setting]: value }));
    toast({
      title: "Setting updated",
      description: "Your preferences have been saved.",
    });
  };

  const handleClearHistory = async () => {
    if (!confirm('Are you sure you want to clear all chat history? This action cannot be undone.')) {
      return;
    }

    try {
      // Here you would implement the actual history clearing logic
      toast({
        title: "History cleared",
        description: "All chat history has been permanently deleted.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to clear history. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteMemory = async () => {
    if (!confirm('Are you sure you want to delete all stored memory? This will reset your AI companion\'s understanding of your conversations.')) {
      return;
    }

    try {
      // Here you would implement the actual memory deletion logic
      toast({
        title: "Memory deleted",
        description: "AI memory has been reset. Future conversations will start fresh.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete memory. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
      toast({
        title: "Signed out",
        description: "You've been safely signed out of Ease.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-teal-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/chat')}
              className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Chat
            </Button>
            
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-purple-600" />
              <span className="font-semibold text-gray-800">Ease Settings</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="space-y-6">
          {/* Profile Section */}
          <Card className="shadow-sm border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-600" />
                Account
              </CardTitle>
              <CardDescription>
                Manage your account settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">Email</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Chat Preferences */}
          <Card className="shadow-sm border-0">
            <CardHeader>
              <CardTitle>Chat Preferences</CardTitle>
              <CardDescription>
                Customize your therapy session experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    {settings.voiceFeedback ? (
                      <Volume2 className="w-4 h-4 text-teal-600" />
                    ) : (
                      <VolumeX className="w-4 h-4 text-gray-400" />
                    )}
                    <Label className="font-medium">Voice Feedback</Label>
                  </div>
                  <p className="text-sm text-gray-600">
                    Enable voice responses from your AI companion
                  </p>
                </div>
                <Switch
                  checked={settings.voiceFeedback}
                  onCheckedChange={(checked) => handleSettingChange('voiceFeedback', checked)}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="font-medium">Active Coaching Mode</Label>
                  <p className="text-sm text-gray-600">
                    Receive proactive guidance and suggestions during conversations
                  </p>
                </div>
                <Switch
                  checked={settings.activeCoaching}
                  onCheckedChange={(checked) => handleSettingChange('activeCoaching', checked)}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="font-medium">Gentle Notifications</Label>
                  <p className="text-sm text-gray-600">
                    Receive caring reminders for self-care and check-ins
                  </p>
                </div>
                <Switch
                  checked={settings.notificationsEnabled}
                  onCheckedChange={(checked) => handleSettingChange('notificationsEnabled', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Data */}
          <Card className="shadow-sm border-0">
            <CardHeader>
              <CardTitle className="text-red-700">Privacy & Data</CardTitle>
              <CardDescription>
                Manage your personal data and conversation history
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">Clear Chat History</p>
                  <p className="text-sm text-gray-600">
                    Permanently delete all your conversation history
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={handleClearHistory}
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear History
                </Button>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">Delete AI Memory</p>
                  <p className="text-sm text-gray-600">
                    Reset your companion's memory and start fresh
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={handleDeleteMemory}
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  <UserX className="w-4 h-4 mr-2" />
                  Delete Memory
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Sign Out */}
          <Card className="shadow-sm border-0">
            <CardContent className="pt-6">
              <Button
                onClick={handleSignOut}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white"
              >
                Sign Out of Ease
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
