
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, Sparkles } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-teal-50 flex items-center justify-center relative overflow-hidden">
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-purple-200/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-40 h-40 bg-teal-200/30 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-10 w-24 h-24 bg-pink-200/20 rounded-full blur-lg animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-32 right-32 w-28 h-28 bg-blue-200/25 rounded-full blur-lg animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Main Content */}
      <div className="text-center max-w-2xl mx-auto px-4 z-10 relative">
        {/* Icon with Animation */}
        <div className="flex items-center justify-center mb-12">
          <div className="relative">
            <div className="p-8 rounded-full bg-gradient-to-br from-purple-100 to-teal-100 shadow-2xl animate-scale-in">
              <Heart className="w-16 h-16 text-purple-600 animate-pulse" />
            </div>
            {/* Sparkle effects */}
            <Sparkles className="w-6 h-6 text-purple-400 absolute -top-2 -right-2 animate-bounce" style={{ animationDelay: '0.5s' }} />
            <Sparkles className="w-4 h-4 text-teal-400 absolute -bottom-1 -left-2 animate-bounce" style={{ animationDelay: '1s' }} />
          </div>
        </div>
        
        {/* Title with Gradient */}
        <h1 className="text-6xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-purple-600 via-purple-700 to-teal-600 bg-clip-text text-transparent animate-fade-in leading-tight">
          Ease
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-600 mb-16 animate-fade-in leading-relaxed" style={{ animationDelay: '0.3s' }}>
          Your peaceful place to talk and reflect
        </p>
        
        {/* CTA Button */}
        <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <Button 
            asChild 
            size="lg" 
            className="bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700 text-white px-12 py-6 rounded-full text-xl font-medium shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 border-0 h-auto"
          >
            <Link to="/auth">Begin Your Journey</Link>
          </Button>
        </div>
      </div>

      {/* Bottom Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/50 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default Landing;
