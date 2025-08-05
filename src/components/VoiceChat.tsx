
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import type { User } from '@supabase/supabase-js';

interface VoiceChatProps {
  user: User;
}

const VoiceChat: React.FC<VoiceChatProps> = ({ user }) => {
  const isMobile = useIsMobile();
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sessionCount] = useState(12);

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Simulate AI response after recording stops
    if (isRecording) {
      setTimeout(() => {
        setIsPlaying(true);
        setTimeout(() => setIsPlaying(false), 3000);
      }, 1000);
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Session Counter */}
      <div className="bg-gradient-to-r from-purple-50 to-teal-50 px-4 sm:px-6 py-2 border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs sm:text-sm text-gray-600 text-center">Session {sessionCount} • Voice Mode</p>
        </div>
      </div>

      {/* Main Voice Interface */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 min-h-0">
        {/* Welcome Message */}
        <div className="text-center mb-8 sm:mb-12 max-w-md mx-auto">
          <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">🌱</div>
          <h2 className="text-xl sm:text-2xl font-light text-gray-700 mb-2">
            Hello {user.email?.split('@')[0] || 'there'}
          </h2>
          <p className="text-sm sm:text-base text-gray-500">Ready to talk when you are</p>
        </div>

        {/* Voice Blob */}
        <div className="relative mb-8 sm:mb-12">
          <div className={`w-24 h-24 sm:w-32 sm:h-32 rounded-full flex items-center justify-center transition-all duration-500 ${
            isRecording 
              ? 'bg-red-100 border-4 border-red-300 animate-pulse scale-110' 
              : isPlaying 
              ? 'bg-teal-100 border-4 border-teal-300 animate-pulse scale-105'
              : 'bg-purple-100 border-4 border-purple-300'
          }`}>
            {isRecording ? (
              <div className="flex space-x-1">
                <div className="w-1 h-6 sm:h-8 bg-red-500 rounded-full animate-bounce"></div>
                <div className="w-1 h-4 sm:h-6 bg-red-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-1 h-8 sm:h-10 bg-red-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                <div className="w-1 h-3 sm:h-4 bg-red-500 rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></div>
              </div>
            ) : isPlaying ? (
              <Volume2 className="w-8 h-8 sm:w-12 sm:h-12 text-teal-600" />
            ) : (
              <Mic className="w-8 h-8 sm:w-12 sm:h-12 text-purple-600" />
            )}
          </div>

          {/* Pulse rings when recording */}
          {isRecording && (
            <div className="absolute inset-0 rounded-full border-2 border-red-300 animate-ping"></div>
          )}
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-4 sm:gap-6 w-full max-w-sm mx-auto">
          <Button
            onClick={toggleRecording}
            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full text-white transition-all duration-300 touch-manipulation ${
              isRecording 
                ? 'bg-red-500 hover:bg-red-600 scale-110 shadow-lg' 
                : 'bg-purple-600 hover:bg-purple-700 hover:scale-105 shadow-md'
            }`}
            disabled={isPlaying}
          >
            {isRecording ? (
              <MicOff className="w-6 h-6 sm:w-8 sm:h-8" />
            ) : (
              <Mic className="w-6 h-6 sm:w-8 sm:h-8" />
            )}
          </Button>

          <div className="text-center px-4">
            <p className="text-sm sm:text-base text-gray-600 mb-1">
              {isRecording 
                ? 'Listening... Tap to stop' 
                : isPlaying
                ? 'AI is responding...'
                : 'Tap to start speaking'
              }
            </p>
            <p className="text-xs sm:text-sm text-gray-400">
              Your voice is processed securely and privately
            </p>
          </div>
        </div>

        {/* Status indicator */}
        <div className="mt-6 sm:mt-8">
          <div className={`w-2 h-2 rounded-full mx-auto ${
            isRecording ? 'bg-red-500 animate-pulse' : 
            isPlaying ? 'bg-teal-500 animate-pulse' : 
            'bg-gray-300'
          }`}></div>
        </div>
      </div>
    </div>
  );
};

export default VoiceChat;
