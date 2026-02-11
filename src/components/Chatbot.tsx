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
  value: string;
}

type Step =
  | "main"
  | "browse"
  | "sports"
  | "luxury"
  | "suv"
  | "budget"
  | "services"
  | "booking"
  | "end";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState<Step>("main");
  const [options, setOptions] = useState<Option[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (messages.length === 0) {
      botMessage(
        "Hi 👋 Welcome to Velocity.\nHow can I assist you today?"
      );
      setOptions([
        { label: "🚗 Browse Vehicles", value: "browse" },
        { label: "💰 Pricing & Budget", value: "budget" },
        { label: "🛠 Services", value: "services" },
        { label: "📅 Book Test Drive", value: "booking" },
      ]);
    }
  }, []);

  const botMessage = (text: string) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), text, sender: "bot" },
    ]);
  };

  const userMessage = (text: string) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), text, sender: "user" },
    ]);
  };

  const handleOptionClick = (option: Option) => {
    userMessage(option.label);

    switch (option.value) {
      case "browse":
        setCurrentStep("browse");
        botMessage("What type of vehicle are you looking for?");
        setOptions([
          { label: "🏎 Sports Cars", value: "sports" },
          { label: "✨ Luxury Sedans", value: "luxury" },
          { label: "🚙 SUVs", value: "suv" },
        ]);
        break;

      case "sports":
        setCurrentStep("sports");
        botMessage(
          "🔥 Our Top Sports Cars:\n\n• VXR-8 — 0-60 in 3.1s\n• Phantom GT — Track Ready Performance\n\nWould you like specs or pricing?"
        );
        setOptions([
          { label: "View Pricing", value: "budget" },
          { label: "Book Test Drive", value: "booking" },
        ]);
        break;

      case "luxury":
        setCurrentStep("luxury");
        botMessage(
          "✨ Our Premium Sedans:\n\n• Aurox LX — Executive Comfort\n• Velar Prestige — Advanced Tech & Luxury\n\nInterested in pricing?"
        );
        setOptions([
          { label: "See Pricing", value: "budget" },
          { label: "Schedule Viewing", value: "booking" },
        ]);
        break;

      case "suv":
        setCurrentStep("suv");
        botMessage(
          "🚙 Our Luxury SUVs:\n\n• Titan X — Performance SUV\n• Urban Elite — Family & Style\n\nWould you like pricing or to schedule a test drive?"
        );
        setOptions([
          { label: "View Pricing", value: "budget" },
          { label: "Book Test Drive", value: "booking" },
        ]);
        break;

      case "budget":
        setCurrentStep("budget");
        botMessage(
          "💰 Our vehicles range from $45,000 to $51,000+ depending on specifications.\n\nWe also offer flexible financing options tailored to you."
        );
        setOptions([
          { label: "Browse Vehicles", value: "browse" },
          { label: "Book Consultation", value: "booking" },
        ]);
        break;

      case "services":
        setCurrentStep("services");
        botMessage(
          "🛠 Our Elite Services:\n\n• Performance Diagnostics\n• Track-Ready Tuning\n• Ceramic Shield Pro\n• Executive Fleet Management\n\nWould you like to schedule a service?"
        );
        setOptions([
          { label: "Schedule Service", value: "booking" },
          { label: "Back to Menu", value: "main" },
        ]);
        break;

      case "booking":
        setCurrentStep("booking");
        botMessage(
          "📅 Perfect! Our team is available 24/7.\n\nPlease visit our Contact page to book your test drive or consultation."
        );
        setOptions([{ label: "Back to Main Menu", value: "main" }]);
        break;

      case "main":
        setCurrentStep("main");
        botMessage("How else can I assist you?");
        setOptions([
          { label: "🚗 Browse Vehicles", value: "browse" },
          { label: "💰 Pricing & Budget", value: "budget" },
          { label: "🛠 Services", value: "services" },
          { label: "📅 Book Test Drive", value: "booking" },
        ]);
        break;

      default:
        break;
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-red-600 to-red-700 text-white flex items-center justify-center shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X /> : <MessageCircle />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-32px)] bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4">
              <h3 className="text-white font-bold">VELOCITY AI</h3>
              <p className="text-red-100 text-xs">Smart Assistant</p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-96">
              {messages.map((msg) => (
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

              {/* Options */}
              {options.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleOptionClick(option)}
                      className="bg-zinc-800 hover:bg-red-600 text-white text-xs px-3 py-2 rounded-full transition-colors"
                    >
                      {option.label}
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
