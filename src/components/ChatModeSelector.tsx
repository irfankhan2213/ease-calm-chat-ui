
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, MessageSquare, Mic, User, LogOut } from 'lucide-react';
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
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        <div className="flex items-center gap-3">
          <Heart className="w-6 h-6 text-purple-600" />
          <h1 className="text-xl font-semibold text-gray-800">Ease</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex bg-gray-100 rounded-full p-1">
            <Button
              variant={mode === 'text' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setMode('text')}
              className={`rounded-full px-4 py-2 ${
                mode === 'text' 
                  ? 'bg-purple-600 text-white' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Text
            </Button>
            <Button
              variant={mode === 'voice' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setMode('voice')}
              className={`rounded-full px-4 py-2 ${
                mode === 'voice' 
                  ? 'bg-teal-600 text-white' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Mic className="w-4 h-4 mr-2" />
              Voice
            </Button>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-teal-400 flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/settings" className="flex items-center gap-2">
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onSignOut} className="text-red-600">
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
