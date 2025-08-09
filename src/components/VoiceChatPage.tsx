
import React, { useState, useEffect } from 'react';
import { Volume2, Radio } from 'lucide-react';
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
  const [isAgentSpeaking, setIsAgentSpeaking] = useState(false);
  const [sessionCount] = useState(12);
  const [isListening, setIsListening] = useState(true);

  // Simulate agent speaking for demo purposes
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        setIsAgentSpeaking(true);
        setTimeout(() => setIsAgentSpeaking(false), 2000 + Math.random() * 3000);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <ChatModeSelector 
        mode="voice" 
        setMode={setMode} 
        user={user} 
        onSignOut={onSignOut} 
      />

      {/* Session Counter */}
      <div className="bg-gradient-to-r from-teal-50 via-white to-teal-50 px-4 sm:px-6 py-3 border-b border-teal-100">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-teal-600" />
            <p className="text-sm text-teal-700 font-medium">Voice Mode • Session {sessionCount}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full animate-pulse ${
              isAgentSpeaking ? 'bg-red-400' : isListening ? 'bg-green-400' : 'bg-gray-400'
            }`}></div>
            <span className="text-xs text-gray-600">
              {isAgentSpeaking ? 'Agent Speaking' : isListening ? 'Listening' : 'Inactive'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Voice Interface */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-8 min-h-0 bg-gradient-to-b from-transparent to-teal-25">
        {/* Welcome Message */}
        <div className="text-center mb-12 sm:mb-16 max-w-lg mx-auto">
          <div className="text-5xl sm:text-7xl mb-6 sm:mb-8">🎧</div>
          <h2 className="text-2xl sm:text-3xl font-light text-gray-700 mb-4 bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
            Hello {user.email?.split('@')[0] || 'there'}
          </h2>
          <p className="text-base sm:text-lg text-gray-500 mb-2">
            I'm listening and ready to help
          </p>
          <p className="text-sm text-gray-400">
            Just speak naturally - no need to press anything
          </p>
        </div>

        {/* Voice Visualization */}
        <div className="relative mb-12 sm:mb-16">
          {/* Main voice visualization */}
          <div className={`relative w-32 h-32 sm:w-40 sm:h-40 rounded-full flex items-center justify-center transition-all duration-700 transform ${
            isAgentSpeaking 
              ? 'bg-gradient-to-r from-red-400 to-red-500 border-4 border-red-300 animate-pulse scale-110 shadow-2xl shadow-red-200' 
              : isListening
              ? 'bg-gradient-to-r from-green-400 to-teal-400 border-4 border-green-300 shadow-xl shadow-green-200'
              : 'bg-gradient-to-r from-gray-400 to-gray-500 border-4 border-gray-300 shadow-lg'
          }`}>
            {isAgentSpeaking ? (
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div 
                    key={i}
                    className="w-1.5 bg-white rounded-full animate-bounce" 
                    style={{
                      height: `${20 + Math.random() * 20}px`,
                      animationDelay: `${i * 0.1}s`
                    }}
                  />
                ))}
              </div>
            ) : isListening ? (
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-white rounded-full animate-pulse mb-2"></div>
                <div className="flex space-x-1">
                  {[...Array(3)].map((_, i) => (
                    <div 
                      key={i}
                      className="w-1 h-1 bg-white rounded-full animate-pulse" 
                      style={{animationDelay: `${i * 0.2}s`}}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <Volume2 className="w-12 h-12 sm:w-16 sm:h-16 text-white opacity-50" />
            )}
          </div>

          {/* Pulse rings when agent is speaking */}
          {isAgentSpeaking && (
            <>
              <div className="absolute inset-0 rounded-full border-2 border-red-300 animate-ping"></div>
              <div className="absolute inset-0 rounded-full border border-red-200 animate-ping" style={{animationDelay: '0.5s'}}></div>
            </>
          )}

          {/* Subtle listening indicator */}
          {isListening && !isAgentSpeaking && (
            <div className="absolute inset-0 rounded-full border border-green-200 animate-pulse"></div>
          )}

          {/* Floating sound waves */}
          <div className="absolute -inset-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-1 h-1 rounded-full animate-pulse ${
                  isAgentSpeaking ? 'bg-red-400' : isListening ? 'bg-green-400' : 'bg-gray-400'
                }`}
                style={{
                  left: `${20 + (i * 60 / 6)}%`,
                  top: `${15 + (i % 3) * 25}%`,
                  animationDelay: `${i * 0.3}s`,
                  opacity: isAgentSpeaking || isListening ? 0.6 : 0.2
                }}
              />
            ))}
          </div>
        </div>

        {/* Status Information */}
        <div className="text-center px-6 max-w-md mx-auto">
          <div className="mb-4">
            <p className="text-lg sm:text-xl text-gray-700 font-medium mb-2">
              {isAgentSpeaking 
                ? '🤖 AI is responding...' 
                : isListening
                ? '👂 Listening for your voice...'
                : '⏸️ Voice chat paused'
              }
            </p>
            <p className="text-sm sm:text-base text-gray-500">
              {isAgentSpeaking 
                ? 'Please wait while I respond to your message' 
                : isListening
                ? 'Speak naturally - I can hear you'
                : 'Voice recognition is currently inactive'
              }
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 border">
            <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
              <div className={`w-2 h-2 rounded-full ${
                isListening ? 'bg-green-400 animate-pulse' : 'bg-gray-300'
              }`}></div>
              <span>Always listening • Secure & Private</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceChatPage;
