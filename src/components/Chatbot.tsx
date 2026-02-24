import { AnimatePresence, motion } from 'framer-motion';
import {
  Car,
  Loader2,
  MessageSquare,
  Sparkles,
  X,
  Zap
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQCategory {
  id: string;
  title: string;
  description: string;
  items: FAQItem[];
}

const FAQ_CATEGORIES: FAQCategory[] = [
  {
    id: 'inventory',
    title: 'Inventory & Models',
    description: 'Availability, brands, and specifications.',
    items: [
      {
        id: 'inventory-1',
        question: 'What brands and types of vehicles do you offer?',
        answer:
          "We specialize in premium brands including BMW, Porsche, Mercedes, Audi and more. Our inventory covers performance coupes, practical SUVs, executive saloons and hot hatches, all carefully selected with full history checks and comprehensive inspections."
      },
      {
        id: 'inventory-2',
        question: 'Can you help me choose the right car for my needs?',
        answer:
          "Absolutely. Tell us your budget, whether you prioritise performance, comfort, technology or running costs, and how you use the car day‑to‑day. We’ll recommend specific models and trims that match your lifestyle instead of just showing you a long list of options."
      },
      {
        id: 'inventory-3',
        question: 'Are your vehicles inspected or certified?',
        answer:
          "Every vehicle goes through a multi‑point mechanical inspection, road test and diagnostic scan before it’s listed. We verify service history, mileage and ownership, and many of our cars are supplied with manufacturer warranty or our own comprehensive protection packages."
      }
    ]
  },
  {
    id: 'finance',
    title: 'Pricing & Finance',
    description: 'Costs, payments, and finance options.',
    items: [
      {
        id: 'finance-1',
        question: 'What financing options do you offer?',
        answer:
          "We work with several trusted finance partners to offer HP, PCP and lease‑style agreements. You can choose fixed monthly payments, flexible deposits and terms typically between 24 and 60 months, so we can tailor a package around your budget."
      },
      {
        id: 'finance-2',
        question: 'Can I part‑exchange my current car?',
        answer:
          "Yes, we accept part‑exchange. Share a few details about your current vehicle—registration, mileage, condition and service history—and we’ll provide a fair, data‑driven valuation that can be used directly against the cost of your next car."
      },
      {
        id: 'finance-3',
        question: 'How transparent are your prices?',
        answer:
          "Our prices are fully transparent: we clearly show the vehicle price, any optional add‑ons, and estimated monthly payments where applicable. There are no hidden admin fees, and we’ll walk you through every cost before you commit to anything."
      }
    ]
  },
  {
    id: 'test-drives',
    title: 'Test Drives & Visits',
    description: 'Booking and visiting the showroom.',
    items: [
      {
        id: 'test-1',
        question: 'How do I book a test drive?',
        answer:
          "You can book a test drive by telling us the car you’re interested in and your preferred date and time. We’ll confirm availability, prepare the vehicle in advance and have your paperwork ready so you spend more time driving and less time waiting."
      },
      {
        id: 'test-2',
        question: 'Where are you located and what are your opening hours?',
        answer:
          "We’re located at 123 Fishergate, Preston, PR1 2NJ. Our showroom is open Monday to Friday 9AM–8PM, Saturday 9AM–6PM and Sunday 10AM–5PM, so you can visit after work or at the weekend without rushing."
      },
      {
        id: 'test-3',
        question: 'Do you offer remote viewings or video tours?',
        answer:
          "Yes, if you can’t visit in person we can arrange a live video tour of any vehicle. We’ll walk you around the car, show key features, answer questions in real time and follow up with a detailed quote and all the information you need."
      }
    ]
  },
  {
    id: 'service',
    title: 'Service & Maintenance',
    description: 'Aftercare, servicing and protection.',
    items: [
      {
        id: 'service-1',
        question: 'What kind of servicing and maintenance do you provide?',
        answer:
          "Our service department handles everything from routine servicing and MOT preparation to performance diagnostics and detailing. We use quality parts and approved fluids, and we’ll always explain what’s been done and what to look out for next."
      },
      {
        id: 'service-2',
        question: 'Do you offer warranties or protection plans?',
        answer:
          "Yes, we offer a range of warranty and protection packages, including extended mechanical cover, breakdown assistance and cosmetic protection such as paint and interior treatments. We’ll recommend the right level of cover based on your mileage and how long you plan to keep the car."
      },
      {
        id: 'service-3',
        question: 'How do I get support if I have an issue after buying?',
        answer:
          "If anything feels wrong after purchase, contact us straight away by phone or email. Our team will investigate, arrange an inspection if needed and work towards a clear, fair solution. Our goal is long‑term relationships, not one‑off sales."
      }
    ]
  }
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "Welcome to Velocity Automotive! 🚗 I’m your virtual specialist. Choose a question below and I’ll walk you through everything in plain English.",
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleFAQClick = (item: FAQItem) => {
    if (isLoading) return;

    const now = new Date();

    const userMessage: Message = {
      role: 'user',
      content: item.question,
      timestamp: now
    };

    const assistantMessage: Message = {
      role: 'assistant',
      content: item.answer,
      timestamp: now
    };

    setIsLoading(true);
    setMessages(prev => [...prev, userMessage]);

    // small delay for nicer UX
    setTimeout(() => {
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 350);
  };

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
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              position: 'fixed',
              bottom: '24px',
              right: '24px',
              zIndex: 9999,
              width: '100%',
              maxWidth: '448px'
            }}
          >
            <div
              style={{
                background: '#18181B',
                border: '2px solid #27272A',
                borderRadius: '16px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                overflow: 'hidden',
                backdropFilter: 'blur(20px)'
              }}
            >
              {/* Header */}
              <div
                style={{
                  background: 'linear-gradient(90deg, #DC2626, #EA580C, #DC2626)',
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <motion.div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
                  }}
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                />

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    position: 'relative',
                    zIndex: 1
                  }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
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
                    <h3
                      style={{
                        color: 'white',
                        fontFamily: 'Teko, sans-serif',
                        fontSize: '20px',
                        fontWeight: 'bold',
                        letterSpacing: '1px',
                        margin: 0,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      MAAI GPT
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      >
                        <Zap size={16} color="#FDE047" />
                      </motion.div>
                    </h3>
                    <span
                      style={{
                        color: 'rgba(255,255,255,0.9)',
                        fontSize: '12px',
                        fontWeight: 600
                      }}
                    >
                      NO CUBY PASTE NO CHATGPT
                    </span>
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
              <div
                style={{
                  height: '260px',
                  overflowY: 'auto',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  background: 'linear-gradient(to bottom, #09090B, #18181B)'
                }}
              >
                {messages.map((message, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      display: 'flex',
                      justifyContent:
                        message.role === 'user' ? 'flex-end' : 'flex-start'
                    }}
                  >
                    <div
                      style={{
                        maxWidth: '85%',
                        borderRadius: '16px',
                        padding: '12px 16px',
                        ...(message.role === 'user'
                          ? {
                              background:
                                'linear-gradient(135deg, #DC2626, #EA580C)',
                              color: 'white'
                            }
                          : {
                              background: '#27272A',
                              color: '#F4F4F5',
                              border: '1px solid #3F3F46'
                            })
                      }}
                    >
                      <p
                        style={{
                          margin: 0,
                          fontSize: '14px',
                          lineHeight: '1.5',
                          whiteSpace: 'pre-wrap'
                        }}
                      >
                        {message.content}
                      </p>
                      <span
                        style={{
                          fontSize: '10px',
                          marginTop: '4px',
                          display: 'block',
                          opacity: 0.7
                        }}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </motion.div>
                ))}

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{ display: 'flex', justifyContent: 'flex-start' }}
                  >
                    <div
                      style={{
                        background: '#27272A',
                        border: '1px solid #3F3F46',
                        borderRadius: '16px',
                        padding: '12px 16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                      }}
                    >
                      <Loader2
                        size={16}
                        color="#DC2626"
                        className="animate-spin"
                      />
                      <span
                        style={{
                          fontSize: '14px',
                          color: '#A1A1AA',
                          fontWeight: 500
                        }}
                      >
                        Preparing an answer…
                      </span>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* FAQ buttons */}
              <div
                style={{
                  padding: '12px 16px',
                  background: '#18181B',
                  borderTop: '1px solid #27272A'
                }}
              >
                <p
                  style={{
                    fontSize: '11px',
                    color: '#71717A',
                    margin: '0 0 8px 0',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    fontWeight: 'bold'
                  }}
                >
                  Popular topics
                </p>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    maxHeight: '220px',
                    overflowY: 'auto'
                  }}
                >
                  {FAQ_CATEGORIES.map(category => (
                    <div
                      key={category.id}
                      style={{
                        borderRadius: '12px',
                        border: '1px solid #27272A',
                        background: '#09090B',
                        padding: '10px 10px 8px 10px'
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: '6px'
                        }}
                      >
                        <div>
                          <p
                            style={{
                              margin: 0,
                              fontSize: '12px',
                              fontWeight: 700,
                              color: '#E5E5E5',
                              textTransform: 'uppercase',
                              letterSpacing: '0.06em'
                            }}
                          >
                            {category.title}
                          </p>
                          <p
                            style={{
                              margin: 0,
                              fontSize: '11px',
                              color: '#71717A'
                            }}
                          >
                            {category.description}
                          </p>
                        </div>
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '6px'
                        }}
                      >
                        {category.items.map(item => (
                          <motion.button
                            key={item.id}
                            whileHover={{ scale: 1.03, y: -1 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => handleFAQClick(item)}
                            style={{
                              fontSize: '12px',
                              padding: '6px 10px',
                              background: '#18181B',
                              color: '#D4D4D8',
                              borderRadius: '9999px',
                              border: '1px solid #3F3F46',
                              cursor: 'pointer',
                              textAlign: 'left',
                              flexGrow: 1
                            }}
                          >
                            {item.question}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{
                  padding: '8px 16px 12px 16px',
                  background: '#18181B',
                  borderTop: '1px solid #27272A',
                  textAlign: 'center'
                }}
              >
                <p
                  style={{
                    fontSize: '10px',
                    color: '#52525B',
                    margin: 0,
                    fontWeight: 500
                  }}
                >
                  Can’t see your question? Reach us at +44 1772 123 456 or
                  info@velocity.auto.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
