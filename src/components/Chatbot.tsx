import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
}

interface Option {
  label: string;
  action: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [options, setOptions] = useState<Option[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const addBotMessage = (text: string) => {
    setMessages(prev => [
      ...prev,
      { id: Date.now().toString(), text, sender: "bot" }
    ]);
  };

  const addUserMessage = (text: string) => {
    setMessages(prev => [
      ...prev,
      { id: Date.now().toString(), text, sender: "user" }
    ]);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (messages.length === 0) {
      showMainMenu();
    }
  }, []);

  const showMainMenu = () => {
    addBotMessage("Welcome to Velocity AI 👋\nWhat would you like to explore today?");
    setOptions([
      { label: "🚗 Browse Vehicles", action: "browse" },
      { label: "💰 Pricing & Financing", action: "pricing" },
      { label: "🛠 Services", action: "services" },
      { label: "🔄 Trade-In", action: "trade" },
      { label: "📅 Book Appointment", action: "booking" }
    ]);
  };

  const handleAction = (action: string, label: string) => {
    addUserMessage(label);

    switch (action) {
      // ================= VEHICLES =================
      case "browse":
        addBotMessage("What type of vehicle fits your lifestyle?");
        setOptions([
          { label: "🏎 Performance", action: "performance" },
          { label: "✨ Luxury", action: "luxury" },
          { label: "🚙 SUV", action: "suv" },
          { label: "💎 Most Popular", action: "popular" }
        ]);
        break;

      case "performance":
        addBotMessage(
          "🔥 Performance Picks:\n\n• VXR-8 (0–60 in 3.1s)\n• Phantom GT (Track Tuned)\n\nWhat matters most?"
        );
        setOptions([
          { label: "Top Speed", action: "speed" },
          { label: "Acceleration", action: "acceleration" },
          { label: "See Pricing", action: "pricing" }
        ]);
        break;

      case "luxury":
        addBotMessage(
          "✨ Luxury Collection:\n\n• Aurox LX – Executive Comfort\n• Velar Prestige – Tech Focused\n\nWhat do you value most?"
        );
        setOptions([
          { label: "Interior Comfort", action: "comfort" },
          { label: "Technology", action: "technology" },
          { label: "See Pricing", action: "pricing" }
        ]);
        break;

      case "suv":
        addBotMessage(
          "🚙 SUV Options:\n\n• Titan X – Performance SUV\n• Urban Elite – Family & Style\n\nInterested in specs or pricing?"
        );
        setOptions([
          { label: "View Specs", action: "specs" },
          { label: "See Pricing", action: "pricing" }
        ]);
        break;

      case "popular":
        addBotMessage(
          "💎 Our Most Popular Model:\n\nPhantom GT – Balanced luxury & performance.\n\nWould you like to schedule a test drive?"
        );
        setOptions([
          { label: "Book Test Drive", action: "booking" },
          { label: "See Pricing", action: "pricing" }
        ]);
        break;

      // ================= PRICING =================
      case "pricing":
        addBotMessage(
          "Our vehicles range from $45,000 to $51,000+.\n\nWhat's your budget range?"
        );
        setOptions([
          { label: "Under $50k", action: "budget_low" },
          { label: "$50k–$80k", action: "budget_mid" },
          { label: "$80k+", action: "budget_high" },
          { label: "Financing Options", action: "financing" }
        ]);
        break;

      case "budget_low":
        addBotMessage(
          "Under $50k Recommendation:\n\nUrban Elite SUV – Practical & stylish."
        );
        setOptions([
          { label: "Book Consultation", action: "booking" },
          { label: "Back to Menu", action: "menu" }
        ]);
        break;

      case "budget_mid":
        addBotMessage(
          "$50k–$80k Recommendation:\n\nAurox LX – Premium comfort & tech."
        );
        setOptions([
          { label: "Book Test Drive", action: "booking" },
          { label: "Back to Menu", action: "menu" }
        ]);
        break;

      case "budget_high":
        addBotMessage(
          "$80k+ Recommendation:\n\nPhantom GT – Elite performance."
        );
        setOptions([
          { label: "Schedule Viewing", action: "booking" },
          { label: "Back to Menu", action: "menu" }
        ]);
        break;

      case "financing":
        addBotMessage(
          "We offer flexible financing:\n\n• Low monthly payments\n• Lease options\n• Custom plans\n\nWould you like to speak with our finance team?"
        );
        setOptions([
          { label: "Yes, Connect Me", action: "booking" },
          { label: "Back to Menu", action: "menu" }
        ]);
        break;

      // ================= SERVICES =================
      case "services":
        addBotMessage(
          "🛠 Our Elite Services:\n\n• Performance Tuning\n• Diagnostics\n• Ceramic Coating\n• Fleet Management\n\nWhich interests you?"
        );
        setOptions([
          { label: "Performance Tuning", action: "tuning" },
          { label: "Ceramic Coating", action: "ceramic" },
          { label: "Fleet Management", action: "fleet" }
        ]);
        break;

      case "tuning":
        addBotMessage(
          "Track-ready upgrades available.\n\nIncrease horsepower & optimize performance."
        );
        setOptions([
          { label: "Schedule Service", action: "booking" },
          { label: "Back to Menu", action: "menu" }
        ]);
        break;

      case "ceramic":
        addBotMessage(
          "Ceramic Shield Pro:\n\n• Long-term paint protection\n• Gloss finish\n• UV resistance"
        );
        setOptions([
          { label: "Schedule Application", action: "booking" },
          { label: "Back to Menu", action: "menu" }
        ]);
        break;

      case "fleet":
        addBotMessage(
          "Executive Fleet Solutions:\n\nFull management & maintenance for business vehicles."
        );
        setOptions([
          { label: "Contact Fleet Team", action: "booking" },
          { label: "Back to Menu", action: "menu" }
        ]);
        break;

      // ================= TRADE =================
      case "trade":
        addBotMessage(
          "We accept trade-ins.\n\nWould you like a valuation for your current vehicle?"
        );
        setOptions([
          { label: "Get Valuation", action: "booking" },
          { label: "Back to Menu", action: "menu" }
        ]);
        break;

      // ================= BOOKING =================
      case "booking":
        addBotMessage(
          "📅 Perfect.\n\nPlease visit our Contact page to schedule your appointment. Our concierge team is available 24/7."
        );
        setOptions([{ label: "Back to Main Menu", action: "menu" }]);
        break;

      case "menu":
        showMainMenu();
        break;

      default:
        break;
    }
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-red-600 to-red-700 text-white flex items-center justify-center shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X /> : <MessageCircle />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-32px)] bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4">
              <h3 className="text-white font-bold">VELOCITY AI</h3>
              <p className="text-red-100 text-xs">Smart Concierge</p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-96">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs px-4 py-3 rounded-lg text-sm whitespace-pre-wrap ${
                      msg.sender === "user"
                        ? "bg-red-600 text-white rounded-br-none"
                        : "bg-zinc-800 text-zinc-100 rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {options.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleAction(opt.action, opt.label)}
                      className="bg-zinc-800 hover:bg-red-600 text-white text-xs px-3 py-2 rounded-full transition-colors"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
