import { AnimatePresence, motion } from 'framer-motion';
import { Car, Loader2, MessageSquare, Send, Sparkles, X, Zap } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Welcome to Velocity Automotive! 🚗 I'm your AI assistant. How can I help you find your perfect vehicle today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Your Claude API key - REPLACE WITH YOUR OWN
  const CLAUDE_API_KEY = 'sk-ant-api03-your-key-here';

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // System prompt
      const systemPrompt = `You are a helpful AI assistant for Velocity Automotive, a premium car dealership in Preston, UK.

Your role:
- Help customers find the perfect vehicle
- Answer questions about features, specs, and performance
- Provide info about financing, warranties, and services
- Assist with booking test drives
- Offer automotive advice

Business info:
- Location: Preston, UK (123 Fishergate, Preston, PR1 2NJ)
- Phone: +44 1772 123 456
- Email: info@velocity.auto
- Specializes in: BMW, Porsche, Mercedes, Audi, etc.
- Hours: Mon-Fri 9AM-8PM, Sat 9AM-6PM, Sun 10AM-5PM

Keep responses concise (2-4 sentences). Be professional, friendly, and enthusiastic about cars. Use emojis sparingly 🚗`;

      // Call Claude API directly
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': CLAUDE_API_KEY,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1024,
          system: systemPrompt,
          messages: [
            ...messages.slice(1).map(m => ({
              role: m.role,
              content: m.content
            })),
            {
              role: 'user',
              content: userMessage.content
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      const aiResponse = data.content[0].text;

      const assistantMessage: Message = {
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: "I apologize, I'm having trouble connecting. Please contact us at +44 1772 123 456 or info@velocity.auto",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickPrompts = [
    "What vehicles do you have?",
    "Tell me about financing",
    "Book a test drive",
    "Service information"
  ];

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            style={{
              position: 'fixed',
              bottom: '24px',
              right: '24px',
              zIndex: 9999,
              width: '64px',
              height: '64px',
              background: 'linear-gradient(135deg, #DC2626, #EA580C)',
              borderRadius: '50%',
              boxShadow: '0 20px 60px -12px rgba(220, 38, 38, 0.5)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <MessageSquare size={28} color="white" />
            </motion.div>

            {/* Pulse */}
            <motion.div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                background: '#DC2626'
              }}
              animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                width: '24px',
                height: '24px',
                background: 'linear-gradient(135deg, #A855F7, #EC4899)',
                borderRadius: '50%',
                border: '2px solid #18181B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Sparkles size={12} color="white" />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
              position: 'fixed',
              bottom: '24px',
              right: '24px',
              zIndex: 9999,
              width: '100%',
              maxWidth: '448px'
            }}
          >
            <div style={{
              background: '#18181B',
              border: '2px solid #27272A',
              borderRadius: '16px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              overflow: 'hidden',
              backdropFilter: 'blur(20px)'
            }}>
              {/* Header */}
              <div style={{
                background: 'linear-gradient(90deg, #DC2626, #EA580C, #DC2626)',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden'
              }}>
                {/* Shimmer */}
                <motion.div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
                  }}
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', position: 'relative', zIndex: 1 }}>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    style={{
                      width: '48px',
                      height: '48px',
                      background: 'rgba(255,255,255,0.2)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.3)'
                    }}
                  >
                    <Car size={24} color="white" />
                  </motion.div>
                  <div>
                    <h3 style={{
                      color: 'white',
                      fontFamily: 'Teko, sans-serif',
                      fontSize: '20px',
                      fontWeight: 'bold',
                      letterSpacing: '1px',
                      margin: 0,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      VELOCITY AI
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <Zap size={16} color="#FDE047" />
                      </motion.div>
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <motion.div
                        style={{
                          width: '8px',
                          height: '8px',
                          background: '#4ADE80',
                          borderRadius: '50%'
                        }}
                        animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '12px', fontWeight: 600 }}>
                        Powered by Claude
                      </span>
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  style={{
                    width: '36px',
                    height: '36px',
                    background: 'rgba(255,255,255,0.2)',
                    borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.3)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backdropFilter: 'blur(10px)',
                    position: 'relative',
                    zIndex: 1
                  }}
                >
                  <X size={20} color="white" />
                </motion.button>
              </div>

              {/* Messages */}
              <div style={{
                height: '384px',
                overflowY: 'auto',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                background: 'linear-gradient(to bottom, #09090B, #18181B)'
              }}>
                {messages.map((message, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: idx * 0.05, type: "spring" }}
                    style={{
                      display: 'flex',
                      justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start'
                    }}
                  >
                    <div style={{
                      maxWidth: '85%',
                      borderRadius: '16px',
                      padding: '12px 16px',
                      ...(message.role === 'user' ? {
                        background: 'linear-gradient(135deg, #DC2626, #EA580C)',
                        color: 'white'
                      } : {
                        background: '#27272A',
                        color: '#F4F4F5',
                        border: '1px solid #3F3F46'
                      })
                    }}>
                      <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>
                        {message.content}
                      </p>
                      <span style={{
                        fontSize: '10px',
                        marginTop: '4px',
                        display: 'block',
                        opacity: 0.7
                      }}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </motion.div>
                ))}

                {/* Loading */}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{ display: 'flex', justifyContent: 'flex-start' }}
                  >
                    <div style={{
                      background: '#27272A',
                      border: '1px solid #3F3F46',
                      borderRadius: '16px',
                      padding: '12px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px'
                    }}>
                      <Loader2 size={16} color="#DC2626" className="animate-spin" />
                      <div style={{ display: 'flex', gap: '4px' }}>
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            style={{
                              width: '8px',
                              height: '8px',
                              background: '#DC2626',
                              borderRadius: '50%'
                            }}
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                          />
                        ))}
                      </div>
                      <span style={{ fontSize: '14px', color: '#A1A1AA', fontWeight: 500 }}>
                        Claude is thinking...
                      </span>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Prompts */}
              {messages.length === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    padding: '12px 16px',
                    background: '#18181B',
                    borderTop: '1px solid #27272A'
                  }}
                >
                  <p style={{
                    fontSize: '11px',
                    color: '#71717A',
                    margin: '0 0 8px 0',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    fontWeight: 'bold'
                  }}>
                    Quick Questions:
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {quickPrompts.map((prompt, idx) => (
                      <motion.button
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setInput(prompt);
                          setTimeout(() => sendMessage(), 100);
                        }}
                        style={{
                          fontSize: '12px',
                          padding: '8px 12px',
                          background: '#27272A',
                          color: '#D4D4D8',
                          borderRadius: '9999px',
                          border: '1px solid #3F3F46',
                          cursor: 'pointer',
                          fontWeight: 500
                        }}
                      >
                        {prompt}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Input */}
              <div style={{
                padding: '16px',
                background: '#18181B',
                borderTop: '1px solid #27272A'
              }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about vehicles..."
                    disabled={isLoading}
                    style={{
                      flex: 1,
                      background: '#27272A',
                      border: '2px solid #3F3F46',
                      borderRadius: '12px',
                      padding: '12px 16px',
                      color: 'white',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={sendMessage}
                    disabled={!input.trim() || isLoading}
                    style={{
                      width: '48px',
                      height: '48px',
                      background: 'linear-gradient(135deg, #DC2626, #EA580C)',
                      borderRadius: '12px',
                      border: 'none',
                      cursor: input.trim() && !isLoading ? 'pointer' : 'not-allowed',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 10px 30px -10px rgba(220, 38, 38, 0.3)',
                      opacity: input.trim() && !isLoading ? 1 : 0.5
                    }}
                  >
                    {isLoading ? (
                      <Loader2 size={20} color="white" className="animate-spin" />
                    ) : (
                      <Send size={20} color="white" />
                    )}
                  </motion.button>
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  style={{
                    fontSize: '10px',
                    color: '#52525B',
                    marginTop: '8px',
                    textAlign: 'center',
                    fontWeight: 500
                  }}
                >
                  Powered by Claude AI • Available 24/7 • Secure & Private
                </motion.p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
