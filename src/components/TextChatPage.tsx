
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, ArrowLeft, Sparkles } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import ChatModeSelector from './ChatModeSelector';
import type { User } from '@supabase/supabase-js';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface TextChatPageProps {
  user: User;
  onSignOut: () => void;
  setMode: (mode: 'text' | 'voice') => void;
}

const TextChatPage: React.FC<TextChatPageProps> = ({ user, onSignOut, setMode }) => {
  const isMobile = useIsMobile();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `Hello ${user.email?.split('@')[0] || 'there'} 🌱 I'm here to provide you with a safe space to talk. How are you feeling today?`,
      role: 'assistant',
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (!isMobile && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isMobile]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputText,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const responses = [
        "I hear you. It sounds like you're going through something difficult right now. Can you tell me more about what's on your mind?",
        "Thank you for sharing that with me. Your feelings are completely valid. What would feel most helpful for you right now?",
        "I can sense there's a lot weighing on you. Remember that it's okay to take things one step at a time. What's feeling most overwhelming today?"
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const goBack = () => {
    setMode('text' as any); // This will trigger navigation back to mode selector
    window.history.back();
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header with back button */}
      <ChatModeSelector 
        mode="text" 
        setMode={setMode} 
        user={user} 
        onSignOut={onSignOut} 
      />

      {/* Session Counter with enhanced styling */}
      <div className="bg-gradient-to-r from-purple-50 via-white to-purple-50 px-4 sm:px-6 py-3 border-b border-purple-100">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <p className="text-sm text-purple-700 font-medium">Text Chat • Session 12</p>
          </div>
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
        </div>
      </div>

      {/* Messages with improved styling */}
      <ScrollArea className="flex-1 p-3 sm:p-6" ref={scrollAreaRef}>
        <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
              <div className={`max-w-[85%] sm:max-w-md px-4 sm:px-5 py-3 sm:py-4 rounded-2xl transition-all duration-200 ${
                message.role === 'user' 
                  ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg' 
                  : 'bg-white border border-gray-200 text-gray-800 shadow-md hover:shadow-lg'
              }`}>
                <p className="text-sm sm:text-base leading-relaxed">{message.content}</p>
                <p className="text-xs opacity-70 mt-2 sm:mt-3">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start animate-fade-in">
              <div className="bg-white border border-gray-200 px-4 sm:px-5 py-3 sm:py-4 rounded-2xl shadow-md">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Enhanced Input Area */}
      <div className="border-t border-gray-200 bg-white/95 backdrop-blur-sm p-3 sm:p-6 safe-area-inset-bottom">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <Input
                ref={inputRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={isMobile ? "Share your thoughts..." : "What's on your mind? I'm here to listen..."}
                className="bg-gray-50 border-gray-200 focus:border-purple-400 focus:ring-purple-400 py-3 sm:py-4 text-sm sm:text-base rounded-xl resize-none min-h-[44px] sm:min-h-[52px] transition-all duration-200"
                disabled={isTyping}
                maxLength={1000}
              />
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isTyping}
              className={`bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl flex-shrink-0 min-h-[44px] sm:min-h-[52px] transition-all duration-200 ${
                !inputText.trim() || isTyping 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:scale-105 shadow-lg hover:shadow-xl'
              }`}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Character count */}
          <div className="flex justify-end mt-2">
            <span className="text-xs text-gray-400">
              {inputText.length}/1000
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextChatPage;
