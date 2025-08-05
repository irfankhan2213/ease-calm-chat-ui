
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, MessageSquare, Mic, User, LogOut, Settings } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { User as SupabaseUser } from '@supabase/supabase-js';

interface ChatModeSelectorProps {
  mode: 'text' | 'voice';
  setMode: (mode: 'text' | 'voice') => void;
  user: SupabaseUser;
  onSignOut: () => void;
}

const ChatModeSelector: React.FC<ChatModeSelectorProps> = ({ mode, setMode, user, onSignOut }) => {
  const isMobile = useIsMobile();
  
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
              className={`rounded-full px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm ${
                mode === 'text' 
                  ? 'bg-purple-600 text-white shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
              {!isMobile && "Text"}
            </Button>
            <Button
              variant={mode === 'voice' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setMode('voice')}
              className={`rounded-full px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm ${
                mode === 'voice' 
                  ? 'bg-teal-600 text-white shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Mic className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
              {!isMobile && "Voice"}
            </Button>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2">
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
};

export default ChatModeSelector;
