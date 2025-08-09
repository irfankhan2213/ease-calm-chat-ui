
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume2, Zap, Radio } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import ChatModeSelector from './ChatModeSelector';
import type { User } from '@supabase/supabase-js';

interface VoiceChatPageProps {
  user: User;
  onSignOut: () => void;
  setMode: (mode: 'text' | 'voice') => void;
}

const VoiceChatPage: React.FC<VoiceChatPageProps> = ({ user, onSignOut, setMode }) => {
  const isMobile = useIsMobile();
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sessionCount] = useState(12);

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (isRecording) {
      setTimeout(() => {
        setIsPlaying(true);
        setTimeout(() => setIsPlaying(false), 3000);
      }, 1000);
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <ChatModeSelector 
        mode="voice" 
        setMode={setMode} 
        user={user} 
        onSignOut={onSignOut} 
      />

      {/* Session Counter with enhanced styling */}
      <div className="bg-gradient-to-r from-teal-50 via-white to-teal-50 px-4 sm:px-6 py-3 border-b border-teal-100">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-teal-600" />
            <p className="text-sm text-teal-700 font-medium">Voice Mode • Session {sessionCount}</p>
          </div>
          <div className={`w-2 h-2 rounded-full animate-pulse ${
            isRecording ? 'bg-red-400' : isPlaying ? 'bg-teal-400' : 'bg-green-400'
          }`}></div>
        </div>
      </div>

      {/* Main Voice Interface with enhanced design */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-8 min-h-0 bg-gradient-to-b from-transparent to-teal-25">
        {/* Welcome Message with animation */}
        <div className="text-center mb-8 sm:mb-12 max-w-lg mx-auto animate-fade-in">
          <div className="text-5xl sm:text-7xl mb-4 sm:mb-6 animate-bounce">🌱</div>
          <h2 className="text-2xl sm:text-3xl font-light text-gray-700 mb-3 bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
            Hello {user.email?.split('@')[0] || 'there'}
          </h2>
          <p className="text-base sm:text-lg text-gray-500">Ready to talk when you are</p>
        </div>

        {/* Enhanced Voice Visualization */}
        <div className="relative mb-8 sm:mb-12">
          {/* Main voice blob with improved animations */}
          <div className={`relative w-28 h-28 sm:w-36 sm:h-36 rounded-full flex items-center justify-center transition-all duration-500 transform ${
            isRecording 
              ? 'bg-gradient-to-r from-red-400 to-red-500 border-4 border-red-300 animate-pulse scale-110 shadow-2xl shadow-red-200' 
              : isPlaying 
              ? 'bg-gradient-to-r from-teal-400 to-teal-500 border-4 border-teal-300 animate-pulse scale-105 shadow-2xl shadow-teal-200'
              : 'bg-gradient-to-r from-purple-400 to-teal-400 border-4 border-purple-300 hover:scale-105 shadow-xl shadow-purple-200'
          }`}>
            {isRecording ? (
              <div className="flex space-x-1">
                <div className="w-1.5 h-6 sm:h-8 bg-white rounded-full animate-bounce"></div>
                <div className="w-1.5 h-4 sm:h-6 bg-white rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-1.5 h-8 sm:h-10 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                <div className="w-1.5 h-3 sm:h-4 bg-white rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></div>
                <div className="w-1.5 h-7 sm:h-9 bg-white rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
              </div>
            ) : isPlaying ? (
              <Volume2 className="w-10 h-10 sm:w-14 sm:h-14 text-white animate-pulse" />
            ) : (
              <Mic className="w-10 h-10 sm:w-14 sm:h-14 text-white" />
            )}
          </div>

          {/* Multiple pulse rings for better effect */}
          {isRecording && (
            <>
              <div className="absolute inset-0 rounded-full border-2 border-red-300 animate-ping"></div>
              <div className="absolute inset-0 rounded-full border border-red-200 animate-ping" style={{animationDelay: '0.5s'}}></div>
            </>
          )}

          {/* Floating particles effect */}
          <div className="absolute -inset-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-1 h-1 rounded-full animate-pulse ${
                  isRecording ? 'bg-red-400' : isPlaying ? 'bg-teal-400' : 'bg-purple-400'
                }`}
                style={{
                  left: `${20 + (i * 60 / 6)}%`,
                  top: `${10 + (i % 3) * 30}%`,
                  animationDelay: `${i * 0.2}s`
                }}
              />
            ))}
          </div>
        </div>

        {/* Enhanced Controls */}
        <div className="flex flex-col items-center gap-6 sm:gap-8 w-full max-w-sm mx-auto">
          <Button
            onClick={toggleRecording}
            className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full text-white transition-all duration-300 touch-manipulation shadow-2xl ${
              isRecording 
                ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 scale-110 shadow-red-300' 
                : 'bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700 hover:scale-110 shadow-purple-300'
            }`}
            disabled={isPlaying}
          >
            {isRecording ? (
              <MicOff className="w-8 h-8 sm:w-10 sm:h-10" />
            ) : (
              <Mic className="w-8 h-8 sm:w-10 sm:h-10" />
            )}
          </Button>

          {/* Status text with better styling */}
          <div className="text-center px-4">
            <p className="text-base sm:text-lg text-gray-700 mb-2 font-medium">
              {isRecording 
                ? '🎤 Listening... Tap to stop' 
                : isPlaying
                ? '🤖 AI is responding...'
                : '✨ Tap to start speaking'
              }
            </p>
            <p className="text-xs sm:text-sm text-gray-500 flex items-center justify-center gap-1">
              <Zap className="w-3 h-3" />
              Your voice is processed securely and privately
            </p>
          </div>
        </div>

        {/* Enhanced status indicators */}
        <div className="mt-8 sm:mt-10 flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full transition-colors ${
            isRecording ? 'bg-red-500 animate-pulse' : 
            isPlaying ? 'bg-teal-500 animate-pulse' : 
            'bg-gray-300'
          }`}></div>
          <span className="text-xs text-gray-500">
            {isRecording ? 'Recording' : isPlaying ? 'Playing' : 'Ready'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default VoiceChatPage;
