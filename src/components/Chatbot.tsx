import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
}

interface Option {
  label: string;
  action: string;
}

const MESSAGES = {
  welcome: "Welcome to Velocity AI 👋\nWhat would you like to explore today?",
  // ... Put all bot texts here
};

const OPTIONS = {
  mainMenu: [
    { label: "🚗 Browse Vehicles", action: "browse" },
    { label: "💰 Pricing & Financing", action: "pricing" },
    { label: "🛠 Services", action: "services" },
    { label: "🔄 Trade-In", action: "trade" },
    { label: "📅 Book Appointment", action: "booking" },
  ],
  // ... Put all option arrays here similarly
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [options, setOptions] = useState<Option[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const addBotMessage = (text: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { id: uuidv4(), text, sender: "bot" }]);
      setIsTyping(false);
    }, 800); // simulate typing delay
  };

  const addUserMessage = (text: string) => {
    setMessages((prev) => [...prev, { id: uuidv4(), text, sender: "user" }]);
  };

  // Scroll to bottom with a small delay
  useEffect(() => {
    const timer = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
    return () => clearTimeout(timer);
  }, [messages]);

  useEffect(() => {
    if (messages.length === 0) {
      showMainMenu();
    }
  }, []);

  const showMainMenu = () => {
    addBotMessage(MESSAGES.welcome);
    setOptions(OPTIONS.mainMenu);
  };

  const handleAction = (action: string, label: string) => {
    addUserMessage(label);

    // Clear options to prevent spamming buttons
    setOptions([]);

    // Add a tiny delay to allow message to render before bot response
    setTimeout(() => {
      switch (action) {
        case "browse":
          addBotMessage(
            "What type of vehicle fits your lifestyle?"
          );
          setOptions([
            { label: "🏎 Performance", action: "performance" },
            { label: "✨ Luxury", action: "luxury" },
            { label: "🚙 SUV", action: "suv" },
            { label: "💎 Most Popular", action: "popular" }
          ]);
          break;

        // ... Use previous cases, updated with extracted messages/options

        case "menu":
          showMainMenu();
          break;

        // ... Default and other cases
      }
    }, 500);
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-red-600 to-red-700 text-white flex items-center justify-center shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X /> : <MessageCircle />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-32px)] bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="chatbot-title"
          >
            <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4 flex justify-between items-center">
              <h3 id="chatbot-title" className="text-white font-bold">
                VELOCITY AI
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="text-red-100 hover:text-white focus:outline-none"
              >
                <X />
              </button>
            </div>

            <div
              className="flex-1 overflow-y-auto p-4 space-y-4 max-h-96"
              tabIndex={0}
              aria-live="polite"
              aria-relevant="additions"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs px-4 py-3 rounded-lg text-sm whitespace-pre-wrap break-words ${
                      msg.sender === "user"
                        ? "bg-red-600 text-white rounded-br-none"
                        : "bg-zinc-800 text-zinc-100 rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="max-w-xs px-4 py-3 rounded-lg bg-zinc-800 text-zinc-100 text-sm animate-pulse rounded-bl-none">
                    Typing...
                  </div>
                </motion.div>
              )}

              {options.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleAction(opt.action, opt.label)}
                      className="bg-zinc-800 hover:bg-red-600 text-white text-xs px-3 py-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                      aria-label={`Select option: ${opt.label}`}
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
