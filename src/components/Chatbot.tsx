import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  BadgeCheck,
  Brain,
  Gauge,
  MessageCircle,
  Package,
  Send,
  Shield,
  Sparkles,
  Users,
  Wrench,
  X,
  Zap
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

// ============= Configuration =============
const API_CONFIG = {
  key: "sk-abcdqrstefghuvwxabcdqrstefghuvwxabcdqrst",
  endpoint: "https://api.openai.com/v1/chat/completions",
  model: "gpt-4-turbo-preview", // or "gpt-3.5-turbo" for faster/cheaper responses
  maxTokens: 500,
  temperature: 0.7
};

// ============= Types & Interfaces =============
interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  attachments?: Attachment[];
  quickReplies?: QuickReply[];
}

interface Attachment {
  type: "image" | "spec" | "price" | "comparison";
  content: any;
}

interface QuickReply {
  text: string;
  action: string;
  icon?: React.ReactNode;
}

interface CarInfo {
  id: string;
  name: string;
  type: "performance" | "luxury" | "suv" | "electric" | "hybrid";
  price: number;
  monthlyPayment: number;
  features: string[];
  description: string;
  image?: string;
  rating: number;
  inStock: boolean;
  color: string;
  engine: string;
  range?: string;
  acceleration: string;
  topSpeed?: string;
  horsepower: number;
  torque: number;
  weight?: string;
  mpg?: string;
  warranty: string;
}

interface ServicePackage {
  id: string;
  name: string;
  price: number | string;
  duration: string;
  includes: string[];
  popular?: boolean;
  icon?: React.ReactNode;
}

interface Appointment {
  date: string;
  time: string;
  type: string;
  status: "pending" | "confirmed" | "completed";
}

interface UserPreference {
  budget?: number;
  vehicleType?: string;
  features?: string[];
  monthlyPayment?: number;
}

// ============= Data Layer =============
const CAR_DATABASE: CarInfo[] = [
  {
    id: "vxr8",
    name: "VXR-8",
    type: "performance",
    price: 85000,
    monthlyPayment: 1250,
    features: [
      "0-60 in 3.1s",
      "650 HP",
      "Track Mode",
      "Carbon Fiber Package",
      "Launch Control",
      "Active Aerodynamics",
      "Ceramic Brakes"
    ],
    description: "Ultimate performance sports car with track capabilities and aggressive styling",
    rating: 4.8,
    inStock: true,
    color: "Racing Red",
    engine: "4.0L V8 Twin-Turbo",
    acceleration: "3.1s",
    topSpeed: "205 mph",
    horsepower: 650,
    torque: 590,
    weight: "3,450 lbs",
    warranty: "4 years / 50,000 miles"
  },
  {
    id: "phantom-gt",
    name: "Phantom GT",
    type: "performance",
    price: 95000,
    monthlyPayment: 1399,
    features: [
      "0-60 in 3.4s",
      "720 HP",
      "Adaptive Suspension",
      "Premium Sound",
      "Carbon Ceramic Brakes",
      "Rear-Wheel Steering",
      "Head-Up Display"
    ],
    description: "Balanced luxury and performance grand tourer with daily usability",
    rating: 4.9,
    inStock: true,
    color: "Midnight Blue",
    engine: "5.2L V10",
    acceleration: "3.4s",
    topSpeed: "212 mph",
    horsepower: 720,
    torque: 620,
    weight: "3,620 lbs",
    warranty: "4 years / 50,000 miles"
  },
  {
    id: "aurox-lx",
    name: "Aurox LX",
    type: "luxury",
    price: 75000,
    monthlyPayment: 1099,
    features: [
      "Executive Seats",
      "Massage Function",
      "4-Zone Climate",
      "Night Vision",
      "Air Suspension",
      "Rear Entertainment",
      "Refrigerator"
    ],
    description: "Executive luxury sedan with premium comfort and advanced safety features",
    rating: 4.7,
    inStock: true,
    color: "Obsidian Black",
    engine: "3.5L V6 Hybrid",
    acceleration: "5.2s",
    topSpeed: "155 mph",
    horsepower: 450,
    torque: 480,
    weight: "4,120 lbs",
    mpg: "28 combined",
    warranty: "6 years / 75,000 miles"
  },
  {
    id: "velar-prestige",
    name: "Velar Prestige",
    type: "luxury",
    price: 82000,
    monthlyPayment: 1199,
    features: [
      "OLED Dashboard",
      "AI Assistant",
      "Gesture Control",
      "Autonomous Driving",
      "Massage Seats",
      "Ambient Lighting",
      "Premium Audio"
    ],
    description: "Tech-focused luxury vehicle with cutting-edge features and elegant design",
    rating: 4.8,
    inStock: true,
    color: "Silver Frost",
    engine: "3.0L I6 Mild Hybrid",
    acceleration: "5.6s",
    topSpeed: "149 mph",
    horsepower: 395,
    torque: 405,
    weight: "4,350 lbs",
    mpg: "25 combined",
    warranty: "6 years / 75,000 miles"
  },
  {
    id: "titan-x",
    name: "Titan X",
    type: "suv",
    price: 68000,
    monthlyPayment: 999,
    features: [
      "7-Seater",
      "Off-Road Mode",
      "Towing Package",
      "Panoramic Roof",
      "Terrain Response",
      "Air Suspension",
      "Trailer Assist"
    ],
    description: "Performance SUV with family-friendly features and off-road capability",
    rating: 4.6,
    inStock: true,
    color: "Forest Green",
    engine: "3.0L V6 Turbo",
    acceleration: "6.1s",
    topSpeed: "143 mph",
    horsepower: 400,
    torque: 450,
    weight: "4,950 lbs",
    mpg: "21 combined",
    warranty: "5 years / 60,000 miles"
  },
  {
    id: "urban-elite",
    name: "Urban Elite",
    type: "suv",
    price: 55000,
    monthlyPayment: 799,
    features: [
      "Hybrid Engine",
      "Smart Storage",
      "Safety Suite",
      "Wireless Charging",
      "360° Camera",
      "Parking Assist",
      "Heated Seats"
    ],
    description: "Practical and stylish urban SUV with excellent fuel efficiency",
    rating: 4.5,
    inStock: true,
    color: "Urban Gray",
    engine: "2.5L Hybrid",
    acceleration: "7.2s",
    topSpeed: "124 mph",
    horsepower: 215,
    torque: 190,
    weight: "3,850 lbs",
    mpg: "38 combined",
    warranty: "5 years / 60,000 miles"
  },
  {
    id: "volt-prime",
    name: "Volt Prime",
    type: "electric",
    price: 72000,
    monthlyPayment: 1050,
    features: [
      "350-mile range",
      "15-min fast charge",
      "Autopilot",
      "Glass roof",
      "Haptic controls",
      "Frunk storage",
      "Bioweapon filter"
    ],
    description: "All-electric luxury sedan with zero emissions and instant torque",
    rating: 4.9,
    inStock: true,
    color: "Arctic White",
    engine: "Dual Motor AWD",
    range: "350 miles",
    acceleration: "3.8s",
    topSpeed: "162 mph",
    horsepower: 670,
    torque: 720,
    weight: "4,250 lbs",
    warranty: "8 years / 120,000 miles"
  },
  {
    id: "nexus-hybrid",
    name: "Nexus Hybrid",
    type: "hybrid",
    price: 48000,
    monthlyPayment: 699,
    features: [
      "50 MPG combined",
      "Solar roof",
      "Regenerative braking",
      "Eco mode",
      "Smart cruise",
      "Lane keep assist",
      "Blind spot monitor"
    ],
    description: "Efficient hybrid with innovative solar technology and modern design",
    rating: 4.7,
    inStock: true,
    color: "Eco Blue",
    engine: "1.8L Hybrid",
    range: "600+ miles total",
    acceleration: "8.1s",
    topSpeed: "115 mph",
    horsepower: 180,
    torque: 160,
    weight: "3,250 lbs",
    mpg: "50 combined",
    warranty: "6 years / 70,000 miles"
  }
];

const SERVICES: ServicePackage[] = [
  {
    id: "tuning",
    name: "Performance Tuning",
    price: 5000,
    duration: "2 days",
    includes: ["ECU remap", "Dyno testing", "Custom mapping", "Before/after comparison"],
    popular: true,
    icon: <Gauge className="w-4 h-4" />
  },
  {
    id: "coating",
    name: "Ceramic Pro Coating",
    price: 3000,
    duration: "1 day",
    includes: ["5-year warranty", "UV protection", "Hydrophobic finish", "Gloss enhancement"],
    icon: <Shield className="w-4 h-4" />
  },
  {
    id: "fleet",
    name: "Fleet Management",
    price: "Custom",
    duration: "Ongoing",
    includes: ["GPS tracking", "Maintenance scheduling", "Driver reports", "Cost optimization"],
    icon: <Users className="w-4 h-4" />
  },
  {
    id: "maintenance",
    name: "Premium Maintenance",
    price: 2000,
    duration: "Annual",
    includes: ["Oil changes", "Tire rotation", "Multi-point inspection", "Fluid checks"],
    popular: true,
    icon: <Wrench className="w-4 h-4" />
  },
  {
    id: "detailing",
    name: "Executive Detailing",
    price: 800,
    duration: "6 hours",
    includes: ["Full interior/exterior", "Paint correction", "Leather treatment", "Engine bay cleaning"],
    icon: <Sparkles className="w-4 h-4" />
  },
  {
    id: "wrap",
    name: "Vinyl Wrap",
    price: 3500,
    duration: "3 days",
    includes: ["Premium 3M vinyl", "Custom colors", "Paint protection", "Removable"],
    icon: <Package className="w-4 h-4" />
  }
];

const FINANCING_OPTIONS = {
  apr: { excellent: 2.9, good: 3.9, fair: 5.9, poor: 7.9 },
  terms: [36, 48, 60, 72, 84],
  downPayment: { min: 0, recommended: 10, ideal: 20 },
  lease: { starting: 399, term: 36, miles: 12000, residual: 55 }
};

const DEALERSHIP_INFO = {
  name: "Velocity Automotive",
  address: "123 Velocity Drive, Automotive City, CA 90210",
  phone: "+1 (555) 123-4567",
  tollfree: "1-800-VELOCITY",
  email: "concierge@velocityai.com",
  website: "www.velocityai.com",
  hours: {
    monday: "9:00 AM - 8:00 PM",
    tuesday: "9:00 AM - 8:00 PM",
    wednesday: "9:00 AM - 8:00 PM",
    thursday: "9:00 AM - 8:00 PM",
    friday: "9:00 AM - 8:00 PM",
    saturday: "10:00 AM - 6:00 PM",
    sunday: "11:00 AM - 5:00 PM"
  },
  services: ["Sales", "Service", "Parts", "Financing", "Trade-ins"]
};

// ============= AI Service Layer =============
class AIService {
  private apiKey: string;
  private endpoint: string;
  private model: string;
  private maxRetries: number = 3;
  private timeoutMs: number = 15000;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.endpoint = API_CONFIG.endpoint;
    this.model = API_CONFIG.model;
  }

  private async fetchWithTimeout(url: string, options: RequestInit, timeout: number): Promise<Response> {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      clearTimeout(id);
      return response;
    } catch (error) {
      clearTimeout(id);
      throw error;
    }
  }

  async generateResponse(
    message: string,
    conversationHistory: { role: "user" | "assistant" | "system"; content: string }[],
    contextData: any
  ): Promise<string> {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        // Build system prompt with context
        const systemPrompt = this.buildSystemPrompt(contextData);

        // Prepare messages array
        const messages = [
          { role: "system", content: systemPrompt },
          ...conversationHistory.slice(-10), // Last 10 messages for context
          { role: "user", content: message }
        ];

        const response = await this.fetchWithTimeout(
          this.endpoint,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${this.apiKey}`
            },
            body: JSON.stringify({
              model: this.model,
              messages: messages,
              max_tokens: API_CONFIG.maxTokens,
              temperature: API_CONFIG.temperature,
              presence_penalty: 0.6,
              frequency_penalty: 0.3
            })
          },
          this.timeoutMs
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(`API error (${response.status}): ${errorData.error?.message || response.statusText}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;

      } catch (error) {
        lastError = error as Error;
        console.error(`AI service attempt ${attempt} failed:`, error);

        // Wait before retrying (exponential backoff)
        if (attempt < this.maxRetries) {
          await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt)));
        }
      }
    }

    // If all retries fail, use fallback response
    console.error("All AI service attempts failed:", lastError);
    return this.getFallbackResponse(message, contextData);
  }

  private buildSystemPrompt(contextData: any): string {
    const { inventory, services, financing, dealership } = contextData;

    return `You are Velocity AI, an expert automotive assistant for Velocity Automotive dealership. Your personality is professional, enthusiastic, and helpful. You have deep knowledge about our vehicles, services, and financing options.

CORE RESPONSIBILITIES:
1. Provide accurate vehicle information from our database
2. Help customers find the perfect vehicle for their needs
3. Explain financing and lease options clearly
4. Schedule test drives and appointments
5. Answer questions about services and maintenance
6. Handle trade-in valuations
7. Compare different vehicle models

AVAILABLE VEHICLES:
${JSON.stringify(inventory, null, 2)}

SERVICES OFFERED:
${JSON.stringify(services, null, 2)}

FINANCING OPTIONS:
${JSON.stringify(financing, null, 2)}

DEALERSHIP INFO:
${JSON.stringify(dealership, null, 2)}

RESPONSE GUIDELINES:
- Be concise but informative (2-3 paragraphs max)
- Use emojis occasionally for friendly tone
- Always mention specific vehicle names, prices, and features
- Include monthly payment estimates when discussing pricing
- Offer to schedule test drives or appointments proactively
- Compare vehicles when relevant
- Never invent fake vehicles or services
- If you don't know something, offer to connect with a human agent
- Keep responses under ${API_CONFIG.maxTokens} tokens

Remember: You're representing Velocity Automotive - be helpful, accurate, and focused on providing excellent customer service.`;
  }

  private getFallbackResponse(message: string, contextData: any): string {
    // Intelligent fallback responses based on message content
    const lower = message.toLowerCase();

    if (lower.includes("hello") || lower.includes("hi")) {
      return "👋 Hello! I'm currently experiencing high demand. While I connect you with our AI service, is there a specific vehicle or service you're interested in?";
    }

    if (lower.includes("car") || lower.includes("vehicle")) {
      const cars = contextData.inventory.slice(0, 3);
      return `🚗 Our most popular vehicles right now:\n\n${cars.map((c: CarInfo) => `• **${c.name}**: $${c.price.toLocaleString()} - ${c.description.split('.')[0]}`).join('\n')}\n\nWould you like more details on any of these?`;
    }

    if (lower.includes("price") || lower.includes("cost")) {
      return `💰 Our vehicles range from $${Math.min(...contextData.inventory.map((c: CarInfo) => c.price)).toLocaleString()} to $${Math.max(...contextData.inventory.map((c: CarInfo) => c.price)).toLocaleString()}. Most models qualify for 0.9% - 3.9% APR financing. What's your target budget?`;
    }

    if (lower.includes("test drive")) {
      return "📅 I'd be happy to schedule a test drive! We offer 30-minute standard drives or 60-minute extended experiences. What day and time works best for you?";
    }

    return "I apologize, but I'm having trouble connecting to our AI service. Please try again in a moment, or call us directly at 1-800-VELOCITY for immediate assistance. How else can I help you?";
  }
}

// ============= Main Component =============
export default function EnhancedChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: uuidv4(),
      text: "👋 Welcome to Velocity AI! I'm your personal automotive assistant powered by advanced AI. I can help you discover the perfect vehicle, explore financing options, schedule test drives, and more. What would you like to explore today?",
      sender: "bot",
      timestamp: new Date(),
      quickReplies: [
        { text: "🚗 Browse vehicles", action: "Show me available vehicles" },
        { text: "💰 Payment calculator", action: "Calculate monthly payments" },
        { text: "🎁 Special offers", action: "What are your current special offers?" },
        { text: "📅 Schedule visit", action: "I want to schedule an appointment" },
        { text: "⚡ Electric vehicles", action: "Tell me about electric vehicles" }
      ]
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const [aiService] = useState(() => new AIService(API_CONFIG.key));
  const [apiStatus, setApiStatus] = useState<"online" | "offline" | "degraded">("online");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Context data for AI
  const contextData = {
    inventory: CAR_DATABASE,
    services: SERVICES,
    financing: FINANCING_OPTIONS,
    dealership: DEALERSHIP_INFO
  };

  // Scroll to bottom effect
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
      setUnreadCount(0);
    }
  }, [isOpen]);

  // Convert messages to conversation history format
  const getConversationHistory = () => {
    return messages.slice(-10).map(msg => ({
      role: msg.sender === "user" ? "user" : "assistant" as const,
      content: msg.text
    }));
  };

  // Handle sending messages
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

    // Generate bot response using AI
    setIsTyping(true);
    try {
      const conversationHistory = getConversationHistory();
      const aiResponse = await aiService.generateResponse(
        userMessage,
        conversationHistory,
        contextData
      );

      // Check if response contains vehicle recommendations
      const hasVehicleRecommendation = aiResponse.includes("$") &&
        (aiResponse.includes("HP") || aiResponse.includes("0-60") || aiResponse.includes("MPG"));

      // Extract car mentions for quick replies
      const mentionedCars = CAR_DATABASE.filter(car =>
        aiResponse.includes(car.name) || aiResponse.includes(car.name.split(' ')[0])
      ).slice(0, 3);

      const botMsg: Message = {
        id: uuidv4(),
        text: aiResponse,
        sender: "bot",
        timestamp: new Date(),
        quickReplies: mentionedCars.length > 0 ? [
          { text: `🚗 Details: ${mentionedCars[0].name}`, action: `Tell me more about the ${mentionedCars[0].name}` },
          { text: "💰 Pricing", action: "What are your financing options?" },
          { text: "📅 Test drive", action: "I want to schedule a test drive" }
        ] : [
          { text: "🚗 Browse vehicles", action: "Show me available vehicles" },
          { text: "💰 Payment calculator", action: "Calculate monthly payments" },
          { text: "📅 Schedule visit", action: "I want to schedule an appointment" }
        ]
      };
      setMessages(prev => [...prev, botMsg]);
      setApiStatus("online");
    } catch (error) {
      console.error("Error generating AI response:", error);
      setApiStatus("degraded");

      // Fallback response
      const fallbackMsg: Message = {
        id: uuidv4(),
        text: "I apologize, but I'm having trouble connecting to our AI service. Please try again in a moment. Is there something specific about our vehicles or services I can help with?",
        sender: "bot",
        timestamp: new Date(),
        quickReplies: [
          { text: "🚗 Current inventory", action: "What vehicles do you have in stock?" },
          { text: "💰 Special offers", action: "What are your current special offers?" },
          { text: "📞 Call dealership", action: "What's your phone number?" }
        ]
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickReply = async (action: string) => {
    setInput(action);
    setTimeout(() => handleSend(), 100);
  };

  const clearChat = () => {
    setMessages([
      {
        id: uuidv4(),
        text: "👋 Welcome back to Velocity AI! I'm your AI-powered automotive assistant. Our conversation has been reset. How can I help you today?",
        sender: "bot",
        timestamp: new Date(),
        quickReplies: [
          { text: "🚗 Browse vehicles", action: "Show me available vehicles" },
          { text: "💰 Payment calculator", action: "Calculate monthly payments" },
          { text: "🎁 Special offers", action: "What are your current special offers?" },
          { text: "📅 Schedule visit", action: "I want to schedule an appointment" }
        ]
      },
    ]);
  };

  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Render attachment based on type
  const renderAttachment = (attachment: Attachment) => {
    switch (attachment.type) {
      case "spec":
        return (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 p-3 bg-zinc-800/50 rounded-lg border border-zinc-700"
          >
            <div className="grid grid-cols-2 gap-2 text-xs">
              {Object.entries(attachment.content).map(([key, value]) => (
                <div key={key} className="flex flex-col">
                  <span className="text-zinc-400">{key}:</span>
                  <span className="text-white font-medium">{value as string}</span>
                </div>
              ))}
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* Chat Button with Unread Badge and Status */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-red-600 to-red-700 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <MessageCircle className="w-6 h-6" />
            {unreadCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 border-2 border-white rounded-full text-xs flex items-center justify-center font-bold"
              >
                {unreadCount}
              </motion.span>
            )}
            <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
              apiStatus === "online" ? "bg-green-500" : apiStatus === "degraded" ? "bg-yellow-500" : "bg-red-500"
            }`} />
          </>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 z-50 w-[420px] max-w-[calc(100vw-32px)] h-[600px] max-h-[calc(100vh-120px)] bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header with API Status */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4 flex justify-between items-center flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="bg-white/10 p-2 rounded-lg">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg tracking-tight">VELOCITY AI</h3>
                  <div className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full animate-pulse ${
                      apiStatus === "online" ? "bg-green-400" : apiStatus === "degraded" ? "bg-yellow-400" : "bg-red-400"
                    }`} />
                    <p className="text-red-100 text-xs">
                      {apiStatus === "online" ? "GPT-4 • Online" :
                       apiStatus === "degraded" ? "Degraded • Fallback" :
                       "Offline • Limited"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearChat}
                  className="text-red-100 hover:text-white text-xs px-3 py-1.5 rounded-full bg-red-700/30 hover:bg-red-700/50 transition-colors font-medium"
                >
                  Clear
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="text-red-100 hover:text-white p-1 rounded-lg hover:bg-red-700/30 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-4 py-6 bg-gradient-to-b from-zinc-900 to-zinc-900/95">
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm whitespace-pre-wrap break-words ${
                        msg.sender === "user"
                          ? "bg-gradient-to-r from-red-600 to-red-500 text-white rounded-br-none shadow-lg"
                          : "bg-zinc-800 text-zinc-100 rounded-bl-none border border-zinc-700 shadow-lg"
                      }`}
                    >
                      <div className="prose prose-invert prose-sm max-w-none">
                        {msg.text.split('\n').map((line, i) => (
                          <p key={i} className={line.startsWith('•') ? 'ml-2' : ''}>
                            {line.startsWith('**') ? <strong>{line.replace(/\*\*/g, '')}</strong> : line}
                          </p>
                        ))}
                      </div>

                      {msg.attachments?.map((attachment, i) => (
                        <div key={i}>{renderAttachment(attachment)}</div>
                      ))}

                      <div className={`flex items-center justify-between mt-2 text-xs ${
                        msg.sender === "user" ? "text-red-200" : "text-zinc-400"
                      }`}>
                        <span>{formatTime(msg.timestamp)}</span>
                        {msg.sender === "bot" && (
                          <div className="flex items-center gap-1">
                            {apiStatus === "online" && <Sparkles className="w-3.5 h-3.5" />}
                            <BadgeCheck className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="max-w-[85%] px-4 py-3 rounded-2xl bg-zinc-800 text-zinc-100 rounded-bl-none border border-zinc-700 shadow-lg">
                      <div className="flex items-center gap-3">
                        <div className="flex space-x-1">
                          <motion.div
                            animate={{ y: [0, -3, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5, delay: 0 }}
                            className="w-2 h-2 bg-red-500 rounded-full"
                          />
                          <motion.div
                            animate={{ y: [0, -3, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
                            className="w-2 h-2 bg-red-500 rounded-full"
                          />
                          <motion.div
                            animate={{ y: [0, -3, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}
                            className="w-2 h-2 bg-red-500 rounded-full"
                          />
                        </div>
                        <span className="text-zinc-300 text-sm">
                          {apiStatus === "online" ? "AI is thinking..." : "Processing..."}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Quick Replies */}
            {messages[messages.length - 1]?.quickReplies && !isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-4 py-3 border-t border-zinc-800 bg-zinc-900/90 backdrop-blur-sm"
              >
                <div className="flex flex-wrap gap-2">
                  {messages[messages.length - 1].quickReplies?.map((reply) => (
                    <motion.button
                      key={reply.action}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleQuickReply(reply.action)}
                      className="px-4 py-2 text-xs font-medium rounded-full bg-zinc-800 hover:bg-red-600 text-zinc-200 hover:text-white transition-colors border border-zinc-700 hover:border-red-500 shadow-sm flex items-center gap-1.5"
                    >
                      {reply.icon}
                      {reply.text}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Input Area */}
            <div className="px-4 py-4 border-t border-zinc-800 bg-zinc-900 flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about our vehicles..."
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-full text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all pr-12"
                    disabled={isTyping}
                  />
                  {input.length > 0 && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500">
                      Enter ↵
                    </span>
                  )}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  disabled={isTyping || !input.trim()}
                  className="px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center min-w-[44px]"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Status indicators */}
              <div className="flex justify-between items-center mt-2 px-2">
                <div className="flex items-center gap-1.5">
                  {apiStatus === "online" ? (
                    <>
                      <Sparkles className="w-3 h-3 text-green-500" />
                      <span className="text-[10px] text-green-500">
                        GPT-4 Powered
                      </span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-3 h-3 text-yellow-500" />
                      <span className="text-[10px] text-yellow-500">
                        Fallback Mode
                      </span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-1.5">
                  <Shield className="w-3 h-3 text-zinc-600" />
                  <span className="text-[10px] text-zinc-600">
                    Secure AI
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3 h-3 text-zinc-600" />
                  <span className="text-[10px] text-zinc-600">
                    {API_CONFIG.model === "gpt-4-turbo-preview" ? "GPT-4" : "GPT-3.5"}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
