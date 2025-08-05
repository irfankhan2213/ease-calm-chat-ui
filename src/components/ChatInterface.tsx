
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Mic, MicOff, Volume2, Lightbulb, Heart } from 'lucide-react';
import type { User } from '@supabase/supabase-js';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  insight?: string;
}

interface ChatInterfaceProps {
  user: User;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ user }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `Hello ${user.email?.split('@')[0] || 'there'} 🌱 I'm here to provide you with a safe, non-judgmental space to talk through whatever is on your mind. Whether you're dealing with stress, relationships, work challenges, or just need someone to listen - I'm here for you. How are you feeling today?`,
      role: 'assistant',
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [mode, setMode] = useState<'text' | 'voice'>('text');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

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

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const responses = [
        {
          content: "I hear that you're going through a difficult time. It takes courage to reach out and share what's on your mind. Your feelings are valid, and it's completely normal to feel overwhelmed sometimes.",
          insight: "Remember that seeking support is a sign of strength, not weakness."
        },
        {
          content: "It sounds like there's a lot weighing on you right now. Sometimes when we're dealing with multiple stressors, it can feel like everything is piling up at once. Can you tell me more about what's feeling most challenging for you today?",
          insight: "Breaking down overwhelming situations into smaller parts can make them feel more manageable."
        },
        {
          content: "Thank you for trusting me with your feelings. What you're experiencing is part of the human journey, and you don't have to navigate it alone. I'm here to listen and support you through this.",
          insight: "Emotional healing is not linear - it's okay to have good days and difficult days."
        }
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse.content,
        role: 'assistant',
        timestamp: new Date(),
        insight: randomResponse.insight,
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

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Here you would implement actual voice recording logic
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-purple-25 to-teal-25">
      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs md:max-w-md ${message.role === 'user' ? 'ml-12' : 'mr-12'}`}>
                {/* Message Bubble */}
                <div className={`message-bubble ${message.role === 'user' ? 'user-message' : 'therapist-message'}`}>
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs opacity-70">
                      {formatTime(message.timestamp)}
                    </span>
                    {message.role === 'assistant' && (
                      <Button size="sm" variant="ghost" className="p-1 h-auto">
                        <Volume2 className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                </div>

                {/* Insight Box */}
                {message.insight && (
                  <Card className="insight-box mt-3">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-medium text-amber-800 mb-1">Insight</p>
                        <p className="text-sm text-amber-700 leading-relaxed">{message.insight}</p>
                      </div>
                    </div>
                  </Card>
                )}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start mr-12">
              <div className="therapist-message message-bubble">
                <div className="typing-dots">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Your companion is typing...</p>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t border-gray-200 bg-white/90 backdrop-blur-sm p-6">
        <div className="max-w-3xl mx-auto">
          {mode === 'text' ? (
            <div className="flex items-end gap-3">
              <div className="flex-1">
                <Input
                  ref={inputRef}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Share what's on your mind... I'm here to listen 💙"
                  className="bg-gray-50 border-gray-200 focus:border-purple-300 focus:ring-purple-300 py-3 text-base rounded-xl"
                  disabled={isTyping}
                />
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <Button
                onClick={toggleRecording}
                className={`voice-button ${isRecording ? 'recording bg-red-500 hover:bg-red-600' : 'bg-teal-600 hover:bg-teal-700'} text-white`}
              >
                {isRecording ? (
                  <MicOff className="w-8 h-8" />
                ) : (
                  <Mic className="w-8 h-8" />
                )}
              </Button>
              
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">
                  {isRecording ? 'Listening... Tap to stop' : 'Tap to start speaking'}
                </p>
                <p className="text-xs text-gray-400">
                  Your voice is processed securely and privately
                </p>
              </div>
            </div>
          )}
          
          {/* Mode Toggle */}
          <div className="flex items-center justify-center mt-4 gap-2">
            <Button
              variant={mode === 'text' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setMode('text')}
              className="text-xs"
            >
              Text Chat
            </Button>
            <Button
              variant={mode === 'voice' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setMode('voice')}
              className="text-xs"
            >
              Voice Chat
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
