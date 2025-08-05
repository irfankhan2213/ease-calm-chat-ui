
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import type { User } from '@supabase/supabase-js';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface TextChatProps {
  user: User;
}

const TextChat: React.FC<TextChatProps> = ({ user }) => {
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

  // Auto-focus input on desktop
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

    // Simulate AI response
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

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Session Counter */}
      <div className="bg-gradient-to-r from-purple-50 to-teal-50 px-4 sm:px-6 py-2 border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs sm:text-sm text-gray-600 text-center">Session 12 • Active</p>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-3 sm:p-6" ref={scrollAreaRef}>
        <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] sm:max-w-xs md:max-w-md px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl ${
                message.role === 'user' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-white border border-gray-200 text-gray-800 shadow-sm'
              }`}>
                <p className="text-sm sm:text-base leading-relaxed">{message.content}</p>
                <p className="text-xs opacity-70 mt-1 sm:mt-2">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t border-gray-200 bg-white/90 backdrop-blur-sm p-3 sm:p-6 safe-area-inset-bottom">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end gap-2 sm:gap-3">
            <div className="flex-1">
              <Input
                ref={inputRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={isMobile ? "Type your message..." : "Share what's on your mind..."}
                className="bg-gray-50 border-gray-200 focus:border-purple-300 focus:ring-purple-300 py-2.5 sm:py-3 text-sm sm:text-base rounded-xl resize-none min-h-[40px] sm:min-h-[44px]"
                disabled={isTyping}
                maxLength={1000}
              />
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isTyping}
              className="bg-purple-600 hover:bg-purple-700 text-white px-3 sm:px-6 py-2.5 sm:py-3 rounded-xl flex-shrink-0 min-h-[40px] sm:min-h-[44px]"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextChat;
