
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, Calendar, MessageCircle, Heart } from 'lucide-react';

const ChatHistory = () => {
  // Mock data for demonstration
  const sessions = [
    {
      id: 1,
      title: "Feeling overwhelmed at work",
      date: "Today",
      time: "2:30 PM",
      messageCount: 12,
      mood: "anxious",
      preview: "I've been having trouble focusing lately..."
    },
    {
      id: 2,
      title: "Family relationship challenges",
      date: "Yesterday", 
      time: "7:45 PM",
      messageCount: 8,
      mood: "conflicted",
      preview: "My sister and I had another argument..."
    },
    {
      id: 3,
      title: "Self-care and boundaries",
      date: "Dec 3",
      time: "1:15 PM", 
      messageCount: 15,
      mood: "hopeful",
      preview: "I tried setting some boundaries today..."
    },
    {
      id: 4,
      title: "Processing grief",
      date: "Dec 1",
      time: "9:20 AM",
      messageCount: 22,
      mood: "sad",
      preview: "It's been six months since mom passed..."
    },
  ];

  const getMoodColor = (mood: string) => {
    const colors = {
      anxious: "bg-orange-100 text-orange-700 border-orange-200",
      conflicted: "bg-yellow-100 text-yellow-700 border-yellow-200", 
      hopeful: "bg-green-100 text-green-700 border-green-200",
      sad: "bg-blue-100 text-blue-700 border-blue-200"
    };
    return colors[mood as keyof typeof colors] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-800 flex items-center gap-2">
            <Heart className="w-4 h-4 text-purple-600" />
            Your Sessions
          </h2>
          <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
            <Plus className="w-4 h-4 mr-1" />
            New
          </Button>
        </div>
        
        <p className="text-sm text-gray-500 mb-3">
          Your private space for healing conversations
        </p>
      </div>

      {/* Sessions List */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {sessions.map((session) => (
            <Card 
              key={session.id}
              className="mb-3 p-3 cursor-pointer hover:shadow-md transition-shadow border-0 bg-gradient-to-r from-white to-gray-50 hover:from-purple-50 hover:to-teal-50"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <h3 className="font-medium text-gray-800 text-sm leading-tight pr-2">
                    {session.title}
                  </h3>
                  <Badge 
                    variant="outline" 
                    className={`text-xs px-2 py-0.5 ${getMoodColor(session.mood)}`}
                  >
                    {session.mood}
                  </Badge>
                </div>
                
                <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                  {session.preview}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    <span>{session.date} at {session.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-3 h-3" />
                    <span>{session.messageCount}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100">
        <p className="text-xs text-gray-400 text-center">
          All conversations are private and secure
        </p>
      </div>
    </div>
  );
};

export default ChatHistory;
