import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, Send, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ResponsePattern {
  keywords: string[];
  response: string;
  priority: number;
}

const CHATBOT_PATTERNS: ResponsePattern[] = [
  // Greeting patterns
  {
    keywords: ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening', 'what\'s up', 'howdy'],
    response: 'Hey there! 👋 Welcome to Velocity. I\'m your AI assistant. How can I help you today? Feel free to ask about our vehicles, services, 3D experience, or anything else!',
    priority: 10
  },

  // Inventory & Vehicles
  {
    keywords: ['inventory', 'vehicles', 'cars', 'models', 'browse', 'collection', 'available', 'what cars', 'show me', 'see vehicles', 'vehicle list'],
    response: 'We have an amazing collection of premium vehicles! 🚗 Check out our Vehicles page to browse our latest models. Each vehicle is carefully selected and maintained to the highest standards. We have 100+ premium vehicles ranging from sports cars to luxury sedans.',
    priority: 9
  },

  // Services
  {
    keywords: ['services', 'service', 'what do you offer', 'offerings', 'packages', 'maintenance', 'tuning', 'diagnostics', 'ceramic', 'fleet', 'detailing'],
    response: 'We offer elite services including:\n• Performance Diagnostics - Unlock your vehicle\'s full potential\n• Track-Ready Tuning - Professional performance enhancement\n• Ceramic Shield Pro - Premium protective coating\n• Executive Fleet Management - Comprehensive fleet solutions\n\nVisit our Services page to learn more about each service!',
    priority: 9
  },

  // Pricing & Cost
  {
    keywords: ['price', 'cost', 'how much', 'expensive', 'affordable', 'payment', 'financing', 'payment plan', 'monthly', 'lease', 'budget'],
    response: 'Our vehicles range from $45,000 to $51,000+, depending on the model and specifications. For specific pricing on a vehicle you\'re interested in, visit our Vehicles page or contact us for a personalized consultation. We also offer flexible financing options - reach out to our team to discuss payment plans!',
    priority: 8
  },

  // 3D Experience
  {
    keywords: ['3d', 'experience', 'showroom', 'virtual', 'immersive', 'explore', 'interactive', 'model viewer', 'three dimensional'],
    response: 'We have an immersive 3D Showroom experience! 🎮 You can explore vehicles in stunning detail from every angle. Check out our 3D Experience page to get started - it\'s an amazing way to see our vehicles up close!',
    priority: 9
  },

  // Contact & Support
  {
    keywords: ['contact', 'reach', 'call', 'email', 'support', 'help', 'assistance', 'talk to', 'speak with', 'customer service', 'get in touch'],
    response: 'You can reach us through our Contact page or book a consultation directly. Our team is available 24/7 to assist you! We\'re here to answer any questions and help you find the perfect vehicle.',
    priority: 8
  },

  // About Company
  {
    keywords: ['about', 'company', 'who are you', 'history', 'background', 'team', 'experience', 'reputation', 'velocity'],
    response: 'Velocity is a premium automotive dealership with 10+ years of excellence in the industry. We pride ourselves on:\n• 98% client satisfaction rate\n• 100+ premium vehicles in our collection\n• Expert team with decades of combined experience\n• Commitment to quality and customer service\n\nWe\'re passionate about connecting you with the perfect vehicle!',
    priority: 8
  },

  // Performance & Features
  {
    keywords: ['performance', 'speed', 'engine', 'horsepower', 'acceleration', 'power', 'specs', 'specifications', 'features', 'capability'],
    response: 'Our vehicles are engineered for peak performance! 🏁 We offer:\n• Track-ready tuning for enhanced performance\n• Performance diagnostics to optimize your vehicle\n• Detailed specifications for each model\n• Expert consultation on performance upgrades\n\nVisit our Vehicles page to see detailed specs, or contact us for personalized performance recommendations!',
    priority: 8
  },

  // Warranty & Coverage
  {
    keywords: ['warranty', 'guarantee', 'coverage', 'protection', 'insurance', 'covered', 'protection plan', 'guarantee'],
    response: 'All our vehicles come with comprehensive coverage and warranty protection. For specific warranty details and coverage options, please reach out to our team through the Contact page. We\'ll be happy to explain all the protection benefits included with your purchase!',
    priority: 7
  },

  // Trade-in
  {
    keywords: ['trade', 'trade-in', 'trade in', 'exchange', 'current vehicle', 'old car', 'valuation', 'sell my car'],
    response: 'We accept trade-ins! 🔄 Contact us to discuss your current vehicle and get a professional valuation. Our team will work with you to ensure you get the best value for your trade-in. Visit our Contact page to start the process!',
    priority: 7
  },

  // Appointment & Booking
  {
    keywords: ['appointment', 'book', 'schedule', 'reserve', 'test drive', 'visit', 'meeting', 'consultation', 'viewing'],
    response: 'You can book a consultation or test drive through our Contact page or call our 24/7 concierge service. We\'re here to help! Simply let us know your preferred time, and we\'ll arrange everything for you.',
    priority: 8
  },

  // Hours & Availability
  {
    keywords: ['hours', 'open', 'closed', 'available', 'when', 'timing', 'schedule', 'open hours', 'operating hours'],
    response: 'We\'re available 24/7 for consultations and support! Whether you\'re an early bird or a night owl, our team is ready to assist you. Visit our Contact page to reach out anytime, and we\'ll get back to you promptly.',
    priority: 7
  },

  // Location
  {
    keywords: ['location', 'where', 'address', 'office', 'showroom', 'find us', 'directions', 'located'],
    response: 'For location details and directions to our showroom, please visit our Locations page or contact us directly. We\'re conveniently located and easy to find!',
    priority: 7
  },

  // Comparison & Recommendations
  {
    keywords: ['compare', 'comparison', 'which', 'recommend', 'recommendation', 'best', 'better', 'difference'],
    response: 'Great question! 🤔 To help you find the perfect vehicle, I\'d love to know more about your preferences:\n• What\'s your budget range?\n• Are you looking for performance, luxury, or practicality?\n• Do you prefer sports cars, sedans, or SUVs?\n\nVisit our Vehicles page to browse our collection, or contact us for personalized recommendations!',
    priority: 8
  },

  // Delivery & Shipping
  {
    keywords: ['delivery', 'shipping', 'deliver', 'ship', 'transport', 'how do you deliver'],
    response: 'We offer convenient delivery options for our vehicles! For details about delivery, shipping, and logistics, please contact our team through the Contact page. We\'ll arrange everything to get your vehicle to you safely and on time.',
    priority: 7
  }
];

function calculateSimilarity(text: string, keywords: string[]): number {
  const lowerText = text.toLowerCase();
  let matchCount = 0;

  for (const keyword of keywords) {
    if (lowerText.includes(keyword)) {
      matchCount++;
    }
  }

  return matchCount > 0 ? matchCount / keywords.length : 0;
}

function findBestResponse(userMessage: string): string {
  let bestMatch: ResponsePattern | null = null;
  let bestScore = 0;

  for (const pattern of CHATBOT_PATTERNS) {
    const similarity = calculateSimilarity(userMessage, pattern.keywords);
    const score = similarity * pattern.priority;

    if (score > bestScore) {
      bestScore = score;
      bestMatch = pattern;
    }
  }

  if (bestMatch && bestScore > 0) {
    return bestMatch.response;
  }

  // Smart fallback based on message length and content
  const messageLength = userMessage.length;
  if (messageLength < 5) {
    return 'I didn\'t quite catch that. Could you tell me more about what you\'re looking for? I can help with vehicles, services, pricing, 3D experience, or anything else about Velocity!';
  }

  return 'That\'s a great question! 🤔 I\'m here to help with information about our premium vehicles, services, 3D showroom experience, pricing, and more. Feel free to ask about our inventory, services, or anything else related to Velocity. What would you like to know?';
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

    // Simulate bot thinking time with variable delay based on response complexity
    const delay = Math.random() * 800 + 300; // 300-1100ms for more natural feel
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
    }, delay);
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
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
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
