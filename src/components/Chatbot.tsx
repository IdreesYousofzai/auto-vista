import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Send, Loader2, Brain } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface CarInfo {
  name: string;
  type: "performance" | "luxury" | "suv" | "popular";
  price: number;
  features: string[];
  description: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: uuidv4(),
      text: "Hi! I'm Velocity AI, your smart car assistant. I can help you with vehicles, pricing, services, and more. What would you like to know?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Car database
  const carDatabase: CarInfo[] = [
    {
      name: "VXR-8",
      type: "performance",
      price: 85000,
      features: ["0-60 in 3.1s", "650 HP", "Track Mode", "Carbon Fiber Package"],
      description: "Ultimate performance sports car with track capabilities",
    },
    {
      name: "Phantom GT",
      type: "performance",
      price: 95000,
      features: ["0-60 in 3.4s", "720 HP", "Adaptive Suspension", "Premium Sound"],
      description: "Balanced luxury and performance grand tourer",
    },
    {
      name: "Aurox LX",
      type: "luxury",
      price: 75000,
      features: ["Executive Seats", "Massage Function", "4-Zone Climate", "Night Vision"],
      description: "Executive luxury sedan with premium comfort features",
    },
    {
      name: "Velar Prestige",
      type: "luxury",
      price: 82000,
      features: ["OLED Dashboard", "AI Assistant", "Gesture Control", "Autonomous Driving"],
      description: "Tech-focused luxury vehicle with cutting-edge features",
    },
    {
      name: "Titan X",
      type: "suv",
      price: 68000,
      features: ["7-Seater", "Off-Road Mode", "Towing Package", "Panoramic Roof"],
      description: "Performance SUV with family-friendly features",
    },
    {
      name: "Urban Elite",
      type: "suv",
      price: 55000,
      features: ["Hybrid Engine", "Smart Storage", "Safety Suite", "Wireless Charging"],
      description: "Practical and stylish urban SUV",
    },
  ];

  // Services database
  const services = [
    { name: "Performance Tuning", price: 5000, duration: "2 days" },
    { name: "Ceramic Coating", price: 3000, duration: "1 day" },
    { name: "Fleet Management", price: "Custom", duration: "Ongoing" },
    { name: "Maintenance Package", price: 2000, duration: "Annual" },
  ];

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Smart response generator
  const generateSmartResponse = async (userMessage: string): Promise<string> => {
    setIsTyping(true);

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const lowerMessage = userMessage.toLowerCase();

    // Vehicle queries
    if (lowerMessage.includes("car") || lowerMessage.includes("vehicle") || lowerMessage.includes("model")) {
      if (lowerMessage.includes("performance") || lowerMessage.includes("fast") || lowerMessage.includes("speed")) {
        const perfCars = carDatabase.filter(car => car.type === "performance");
        const car = perfCars[Math.floor(Math.random() * perfCars.length)];
        return `For performance, I recommend the ${car.name}. ${car.description}. Key features: ${car.features.slice(0, 3).join(", ")}. Price starts at $${car.price.toLocaleString()}.`;
      }

      if (lowerMessage.includes("luxury") || lowerMessage.includes("comfort") || lowerMessage.includes("premium")) {
        const luxuryCars = carDatabase.filter(car => car.type === "luxury");
        const car = luxuryCars[Math.floor(Math.random() * luxuryCars.length)];
        return `For luxury, consider the ${car.name}. ${car.description}. Features include: ${car.features.slice(0, 3).join(", ")}. Starting at $${car.price.toLocaleString()}.`;
      }

      if (lowerMessage.includes("suv") || lowerMessage.includes("family") || lowerMessage.includes("space")) {
        const suvCars = carDatabase.filter(car => car.type === "suv");
        const car = suvCars[Math.floor(Math.random() * suvCars.length)];
        return `For an SUV, check out the ${car.name}. ${car.description}. Features: ${car.features.slice(0, 3).join(", ")}. Price: $${car.price.toLocaleString()}.`;
      }

      // General car recommendation
      const randomCar = carDatabase[Math.floor(Math.random() * carDatabase.length)];
      return `Based on your interest, you might like the ${randomCar.name}. ${randomCar.description}. Price: $${randomCar.price.toLocaleString()}. Would you like more details about this model?`;
    }

    // Price queries
    if (lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("budget")) {
      const minPrice = Math.min(...carDatabase.map(car => car.price));
      const maxPrice = Math.max(...carDatabase.map(car => car.price));

      if (lowerMessage.includes("cheap") || lowerMessage.includes("low") || lowerMessage.includes("affordable")) {
        const affordableCars = carDatabase.filter(car => car.price < 60000);
        if (affordableCars.length > 0) {
          const car = affordableCars[0];
          return `For budget-friendly options, the ${car.name} starts at $${car.price.toLocaleString()}. We also offer financing with rates as low as 3.9% APR.`;
        }
      }

      if (lowerMessage.includes("finance") || lowerMessage.includes("payment") || lowerMessage.includes("loan")) {
        return `We offer flexible financing options:\n• 3.9% APR for qualified buyers\n• Lease options starting at $499/month\n• 60-72 month terms available\n• $0 down payment options\nWould you like me to calculate monthly payments for a specific model?`;
      }

      return `Our vehicles range from $${minPrice.toLocaleString()} to $${maxPrice.toLocaleString()}. The average price is around $${Math.round((minPrice + maxPrice) / 2).toLocaleString()}. What's your budget range?`;
    }

    // Service queries
    if (lowerMessage.includes("service") || lowerMessage.includes("maintain") || lowerMessage.includes("repair")) {
      if (lowerMessage.includes("tuning") || lowerMessage.includes("upgrade") || lowerMessage.includes("performance")) {
        return `Performance tuning starts at $${services[0].price} and takes ${services[0].duration}. We can increase horsepower by 15-30% and optimize handling.`;
      }

      if (lowerMessage.includes("coating") || lowerMessage.includes("protect") || lowerMessage.includes("paint")) {
        return `Ceramic coating provides 5-year paint protection for $${services[1].price}. It includes UV protection, chemical resistance, and enhanced gloss.`;
      }

      return `We offer: ${services.map(s => `${s.name} (${s.duration})`).join(", ")}. Which service interests you?`;
    }

    // Test drive queries
    if (lowerMessage.includes("test drive") || lowerMessage.includes("drive") || lowerMessage.includes("try")) {
      return `I can schedule a test drive for you! We offer:\n• 30-minute test drives\n• Home delivery option\n• Weekend appointments\n• Multiple model comparisons\nWhen would you like to come in?`;
    }

    // Trade-in queries
    if (lowerMessage.includes("trade") || lowerMessage.includes("sell") || lowerMessage.includes("old car")) {
      return `We offer competitive trade-in values. To get an estimate, I'll need:\n1. Your vehicle's make/model/year\n2. Current mileage\n3. Overall condition\nWould you like to provide these details?`;
    }

    // Appointment queries
    if (lowerMessage.includes("appointment") || lowerMessage.includes("schedule") || lowerMessage.includes("book")) {
      return `You can book an appointment:\n• Online: velocityai.com/book\n• Phone: (555) 123-4567\n• In-person: 123 Auto Street\nOur hours: Mon-Sat 9AM-8PM, Sun 10AM-6PM`;
    }

    // Greetings
    if (lowerMessage.includes("hi") || lowerMessage.includes("hello") || lowerMessage.includes("hey")) {
      return "Hello! Welcome to Velocity AI. How can I assist you with your vehicle needs today?";
    }

    // Help
    if (lowerMessage.includes("help") || lowerMessage.includes("what can you do")) {
      return "I can help you with:\n• Vehicle recommendations\n• Pricing and financing\n• Service appointments\n• Test drive scheduling\n• Trade-in valuations\n• General car advice\nWhat would you like to know?";
    }

    // Default intelligent response
    const responses = [
      "I understand you're asking about vehicles. Could you tell me more about what you're looking for?",
      "That's an interesting question about cars. Let me help you find the perfect vehicle.",
      "I'd be happy to assist with that. Are you interested in a specific type of vehicle or price range?",
      "Based on your query, I recommend checking our latest models. Would you like me to suggest some options?",
      "I can help you compare different vehicles. What's most important to you: performance, comfort, or price?",
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput("");

    // Add user message
    const userMsg: Message = {
      id: uuidv4(),
      text: userMessage,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);

    // Generate and add bot response
    const botResponse = await generateSmartResponse(userMessage);

    const botMsg: Message = {
      id: uuidv4(),
      text: botResponse,
      sender: "bot",
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, botMsg]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickAction = (action: string) => {
    const actions: Record<string, string> = {
      "vehicles": "What cars do you have available?",
      "pricing": "What are your prices and financing options?",
      "services": "Tell me about your services",
      "testdrive": "I want to schedule a test drive",
      "tradein": "How does trade-in work?",
    };

    setInput(actions[action] || action);
    setTimeout(() => handleSend(), 100);
  };

  const clearChat = () => {
    setMessages([
      {
        id: uuidv4(),
        text: "Hi! I'm Velocity AI, your smart car assistant. I can help you with vehicles, pricing, services, and more. What would you like to know?",
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-red-600 to-red-700 text-white flex items-center justify-center shadow-lg hover:shadow-xl"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X /> : <MessageCircle />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-32px)] bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                <div>
                  <h3 className="text-white font-bold text-lg">VELOCITY AI</h3>
                  <p className="text-red-100 text-xs">Smart Car Assistant</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={clearChat}
                  className="text-red-100 hover:text-white text-xs px-3 py-1 rounded-full bg-red-700/30 hover:bg-red-700/50 transition-colors"
                  title="Clear chat"
                >
                  Clear
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-red-100 hover:text-white"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 max-h-96">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm whitespace-pre-wrap break-words ${
                        msg.sender === "user"
                          ? "bg-gradient-to-r from-red-600 to-red-500 text-white rounded-br-none"
                          : "bg-zinc-800 text-zinc-100 rounded-bl-none border border-zinc-700"
                      }`}
                    >
                      {msg.text}
                      <div className={`text-xs mt-2 ${msg.sender === "user" ? "text-red-200" : "text-zinc-400"}`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="max-w-[80%] px-4 py-3 rounded-2xl bg-zinc-800 text-zinc-100 text-sm rounded-bl-none border border-zinc-700">
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Thinking...</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="px-4 py-3 border-t border-zinc-800 bg-zinc-900/50">
              <div className="flex flex-wrap gap-2 mb-3">
                {["vehicles", "pricing", "services", "testdrive", "tradein"].map((action) => (
                  <button
                    key={action}
                    onClick={() => handleQuickAction(action)}
                    className="px-3 py-1.5 text-xs rounded-full bg-zinc-800 hover:bg-red-600 text-zinc-200 hover:text-white transition-colors capitalize"
                  >
                    {action.replace(/([A-Z])/g, ' $1').trim()}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about cars, pricing, services..."
                  className="flex-1 px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-full text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  disabled={isTyping}
                />
                <button
                  onClick={handleSend}
                  disabled={isTyping || !input.trim()}
                  className="px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
