
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart, Shield, MessageCircle, Sparkles } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-teal-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 rounded-full bg-gradient-to-br from-purple-100 to-teal-100">
              <Heart className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">
            Welcome to Ease
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
            Your peaceful place to talk, reflect, and find emotional support
          </p>
          
          <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
            Ease provides a safe, private space for deep emotional conversations with an AI companion trained to understand, support, and guide you through life's challenges.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link to="/auth">Start Your Journey</Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="border-purple-200 text-purple-700 hover:bg-purple-50 px-8 py-3 rounded-full text-lg font-medium"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="p-8 text-center border-0 shadow-lg bg-gradient-to-br from-white to-purple-50 hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center">
              <Shield className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Private & Safe</h3>
            <p className="text-gray-600 leading-relaxed">
              Your conversations are completely private and secure. Share your thoughts without judgment in a safe space designed for healing.
            </p>
          </Card>

          <Card className="p-8 text-center border-0 shadow-lg bg-gradient-to-br from-white to-teal-50 hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-teal-100 to-teal-200 rounded-2xl flex items-center justify-center">
              <MessageCircle className="w-8 h-8 text-teal-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Always Available</h3>
            <p className="text-gray-600 leading-relaxed">
              Text or voice support whenever you need it. Your AI companion is here 24/7 to listen, understand, and provide gentle guidance.
            </p>
          </Card>

          <Card className="p-8 text-center border-0 shadow-lg bg-gradient-to-br from-white to-amber-50 hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Personalized Care</h3>
            <p className="text-gray-600 leading-relaxed">
              Tailored responses that adapt to your emotional needs. Experience caring conversations that help you grow and heal at your own pace.
            </p>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-600 to-teal-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to begin your healing journey?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Take the first step towards emotional wellness in a space designed just for you.
          </p>
          <Button 
            asChild 
            size="lg" 
            className="bg-white text-purple-600 hover:bg-gray-50 px-8 py-3 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Link to="/auth">Get Started Now</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
