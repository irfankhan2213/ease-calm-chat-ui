
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import type { User } from '@supabase/supabase-js';

interface VoiceChatProps {
  user: User;
}

const VoiceChat: React.FC<VoiceChatProps> = ({ user }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sessionCount] = useState(12); // Simple counter

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Here you would implement actual voice recording logic
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8">
      <div className="text-center mb-12">
        <div className="text-6xl mb-4">🌱</div>
        <h2 className="text-2xl font-light text-gray-700 mb-2">
          Hello {user.email?.split('@')[0] || 'there'}
        </h2>
        <p className="text-gray-500 mb-8">Session {sessionCount}</p>
      </div>

      {/* Voice Blob */}
      <div className="relative mb-12">
        <div className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${
          isRecording 
            ? 'bg-red-100 border-4 border-red-300 animate-pulse' 
            : isPlaying 
            ? 'bg-teal-100 border-4 border-teal-300 animate-pulse'
            : 'bg-purple-100 border-4 border-purple-300'
        }`}>
          {isRecording ? (
            <div className="flex space-x-1">
              <div className="w-1 h-8 bg-red-500 rounded-full animate-bounce"></div>
              <div className="w-1 h-6 bg-red-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-1 h-10 bg-red-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              <div className="w-1 h-4 bg-red-500 rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></div>
            </div>
          ) : isPlaying ? (
            <Volume2 className="w-12 h-12 text-teal-600" />
          ) : (
            <Mic className="w-12 h-12 text-purple-600" />
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center gap-6">
        <Button
          onClick={toggleRecording}
          className={`w-20 h-20 rounded-full text-white text-xl transition-all duration-300 ${
            isRecording 
              ? 'bg-red-500 hover:bg-red-600 scale-110' 
              : 'bg-purple-600 hover:bg-purple-700 hover:scale-105'
          }`}
        >
          {isRecording ? (
            <MicOff className="w-8 h-8" />
          ) : (
            <Mic className="w-8 h-8" />
          )}
        </Button>

        <p className="text-sm text-gray-500 max-w-xs text-center">
          {isRecording 
            ? 'Listening... Tap to stop' 
            : 'Tap to start speaking with your AI companion'
          }
        </p>
      </div>
    </div>
  );
};

export default VoiceChat;
