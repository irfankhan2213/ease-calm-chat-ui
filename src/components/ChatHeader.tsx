
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Settings, MessageSquare, Mic, User, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { User as SupabaseUser } from '@supabase/supabase-js';

interface ChatHeaderProps {
  user: SupabaseUser;
  onSignOut: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ user, onSignOut }) => {
  const [mode, setMode] = useState<'text' | 'voice'>('text');

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-gradient-to-br from-purple-100 to-teal-100">
            <Heart className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-800">Ease</h1>
            <p className="text-sm text-gray-500">Your peaceful therapy space</p>
          </div>
        </div>

        {/* Mode Toggle and Actions */}
        <div className="flex items-center gap-4">
          {/* Mode Toggle */}
          <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1">
            <Button
              variant={mode === 'text' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setMode('text')}
              className={`rounded-full px-4 py-2 text-sm ${
                mode === 'text' 
                  ? 'bg-purple-600 text-white shadow-sm' 
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
              className={`rounded-full px-4 py-2 text-sm ${
                mode === 'voice' 
                  ? 'bg-teal-600 text-white shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Mic className="w-4 h-4 mr-2" />
              Voice
            </Button>
          </div>

          {/* Status Badge */}
          <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
            ● Online
          </Badge>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-teal-400 flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm text-gray-700 hidden sm:inline">
                  {user.email?.split('@')[0]}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link to="/settings" className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={onSignOut}
                className="text-red-600 focus:text-red-600"
              >
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

export default ChatHeader;
