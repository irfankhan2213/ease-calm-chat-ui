
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, MessageSquare, Mic, User, LogOut, Settings, Sparkles, Zap } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';
import type { User as SupabaseUser } from '@supabase/supabase-js';

interface ChatModeSelectorProps {
  mode: 'text' | 'voice' | null;
  setMode: (mode: 'text' | 'voice') => void;
  user: SupabaseUser;
  onSignOut: () => void;
}

const ChatModeSelector: React.FC<ChatModeSelectorProps> = ({ mode, setMode, user, onSignOut }) => {
  const isMobile = useIsMobile();
  
  // If mode is already selected, show compact header
  if (mode) {
    return (
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 sticky top-0 z-50">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-2 sm:gap-3">
            <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 flex-shrink-0" />
            <h1 className="text-lg sm:text-xl font-semibold text-gray-800">Ease</h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex bg-gray-100 rounded-full p-0.5 sm:p-1">
              <Button
                variant={mode === 'text' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setMode('text')}
                className={`rounded-full px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm transition-all duration-200 ${
                  mode === 'text' 
                    ? 'bg-purple-600 text-white shadow-sm scale-105' 
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
                {!isMobile && "Text"}
              </Button>
              <Button
                variant={mode === 'voice' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setMode('voice')}
                className={`rounded-full px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm transition-all duration-200 ${
                  mode === 'voice' 
                    ? 'bg-teal-600 text-white shadow-sm scale-105' 
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <Mic className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
                {!isMobile && "Voice"}
              </Button>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2 hover:bg-gray-100 transition-colors">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-purple-400 to-teal-400 flex items-center justify-center flex-shrink-0">
                    <User className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  {!isMobile && (
                    <span className="text-sm text-gray-700 hidden md:inline max-w-24 truncate">
                      {user.email?.split('@')[0]}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40 sm:w-48">
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="flex items-center gap-2 text-sm">
                    <Settings className="w-4 h-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onSignOut} className="text-red-600 text-sm">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    );
  }

  // Central mode selection interface
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-2 sm:gap-3">
            <Heart className="w-6 h-6 text-purple-600 flex-shrink-0" />
            <h1 className="text-xl font-semibold text-gray-800">Ease</h1>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center gap-2 p-2 hover:bg-gray-100 transition-colors">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-teal-400 flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                {!isMobile && (
                  <span className="text-sm text-gray-700 max-w-24 truncate">
                    {user.email?.split('@')[0]}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link to="/settings" className="flex items-center gap-2 text-sm">
                  <Settings className="w-4 h-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onSignOut} className="text-red-600 text-sm">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Central Mode Selection */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="text-center max-w-2xl mx-auto w-full">
          {/* Welcome Section - no plant emoji */}
          <div className="mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-800 mb-4 animate-fade-in">
              Welcome back, {user.email?.split('@')[0] || 'there'}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 animate-fade-in">
              Choose how you'd like to connect today
            </p>
          </div>

          {/* Mode Selection Cards - side by side on all screen sizes */}
          <div className="flex gap-3 sm:gap-6 md:gap-8 mb-6 sm:mb-8 w-full">
            {/* Text Chat Mode */}
            <Button
              onClick={() => setMode('text')}
              className="group relative flex-1 h-auto p-0 bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-purple-300 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden"
              variant="ghost"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-purple-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative p-4 sm:p-6 md:p-8 text-center w-full">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">Text Chat</h3>
                <div className="flex items-center justify-center text-purple-600 text-xs sm:text-sm font-medium">
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  Start typing
                </div>
              </div>
            </Button>

            {/* Voice Chat Mode */}
            <Button
              onClick={() => setMode('voice')}
              className="group relative flex-1 h-auto p-0 bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-teal-300 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden"
              variant="ghost"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-teal-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative p-4 sm:p-6 md:p-8 text-center w-full">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Mic className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">Voice Chat</h3>
                <div className="flex items-center justify-center text-teal-600 text-xs sm:text-sm font-medium">
                  <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  Start speaking
                </div>
              </div>
            </Button>
          </div>

          {/* Session Info */}
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-gray-200">
            <p className="text-xs sm:text-sm text-gray-600">
              Session 12 • Ready when you are
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatModeSelector;
