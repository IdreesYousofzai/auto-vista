import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const CHATBOT_RESPONSES: Record<string, string> = {
  'hello': 'Hey there! 👋 Welcome to Velocity. How can I help you today? Feel free to ask about our vehicles, services, or anything else!',
  'hi': 'Hey there! 👋 Welcome to Velocity. How can I help you today? Feel free to ask about our vehicles, services, or anything else!',
  'vehicles': 'We have an amazing collection of premium vehicles! Check out our Inventory page to browse our latest models. Each vehicle is carefully selected and maintained to the highest standards.',
  'services': 'We offer elite services including Performance Diagnostics, Track-Ready Tuning, Ceramic Shield Pro, and Executive Fleet management. Visit our Services page to learn more!',
  'price': 'Our vehicles range from $45,000 to $51,000+. For specific pricing on a vehicle you\'re interested in, visit our Inventory page or contact us for a consultation.',
  '3d': 'We have an immersive 3D Showroom experience! You can explore vehicles in stunning detail. Check out our 3D Experience page to get started.',
  'contact': 'You can reach us through our Contact page or book a consultation directly. Our team is available 24/7 to assist you!',
  'about': 'Velocity is a premium automotive dealership with 10+ years of excellence. We pride ourselves on 98% client satisfaction and a collection of 100+ premium vehicles.',
  'performance': 'Our vehicles are engineered for peak performance. We offer track-ready tuning and performance diagnostics to unlock the full potential of your car.',
  'financing': 'For financing options and details, please contact our team directly through the Contact page. We\'ll be happy to discuss flexible payment plans.',
  'warranty': 'All our vehicles come with comprehensive coverage. For specific warranty details, please reach out to our team!',
  'trade-in': 'We accept trade-ins! Contact us to discuss your current vehicle and get a valuation.',
  'appointment': 'You can book a consultation through our Contact page or call our 24/7 concierge service. We\'re here to help!',
  'hours': 'We\'re available 24/7 for consultations and support. Visit our Contact page to reach out anytime!',
  'location': 'For location details, please visit our Locations page or contact us directly.',
  'default': 'That\'s a great question! I\'m here to help with information about our vehicles, services, and more. Feel free to ask about our inventory, services, pricing, or anything else related to Velocity!'
};

function findBestResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();
  
  for (const [keyword, response] of Object.entries(CHATBOT_RESPONSES)) {
    if (keyword === 'default') continue;
    if (lowerMessage.includes(keyword)) {
      return response;
    }
  }
  
  return CHATBOT_RESPONSES.default;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi! 👋 Welcome to Velocity. I\'m your AI assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse = findBestResponse(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 500);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-r from-red-600 to-red-700 text-white shadow-2xl shadow-red-600/50 flex items-center justify-center hover:shadow-lg hover:shadow-red-600/70 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="fixed bottom-24 right-6 z-40 w-96 max-w-[calc(100vw-32px)] bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl shadow-black/50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="text-white font-bold text-lg" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  VELOCITY AI
                </h3>
                <p className="text-red-100 text-xs font-semibold">Always here to help</p>
              </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-96 bg-zinc-950">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-red-600 text-white rounded-br-none'
                        : 'bg-zinc-800 text-zinc-100 rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-zinc-800 text-zinc-100 px-4 py-3 rounded-lg rounded-bl-none">
                    <div className="flex gap-2">
                      <motion.div
                        className="w-2 h-2 bg-red-500 rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-red-500 rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-red-500 rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="border-t border-zinc-800 p-4 bg-zinc-900">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-zinc-800 text-white px-4 py-2 rounded-lg border border-zinc-700 focus:border-red-600 focus:outline-none text-sm placeholder-zinc-500 transition-colors"
                  disabled={isLoading}
                />
                <motion.button
                  type="submit"
                  disabled={isLoading || !inputValue.trim()}
                  className="bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
