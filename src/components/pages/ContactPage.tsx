import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion, useInView } from 'framer-motion';
import { CheckCircle2, Clock, Mail, MapPin, MessageSquare, Navigation, Phone, Send } from 'lucide-react';
import { useRef, useState } from 'react';

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    preferredContact: 'email'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        preferredContact: 'email'
      });

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Our Showroom',
      lines: [
        'Velocity Automotive',
        '123 Fishergate',
        'Preston, PR1 2NJ',
        'United Kingdom'
      ],
      gradient: 'from-red-600 to-orange-600'
    },
    {
      icon: Phone,
      title: 'Call Us',
      lines: [
        'Sales: +44 1772 123 456',
        'Service: +44 1772 123 457',
        'Parts: +44 1772 123 458'
      ],
      gradient: 'from-blue-600 to-cyan-600'
    },
    {
      icon: Mail,
      title: 'Email Us',
      lines: [
        'info@velocity.auto',
        'sales@velocity.auto',
        'service@velocity.auto'
      ],
      gradient: 'from-purple-600 to-pink-600'
    },
    {
      icon: Clock,
      title: 'Opening Hours',
      lines: [
        'Mon - Fri: 9:00 AM - 8:00 PM',
        'Saturday: 9:00 AM - 6:00 PM',
        'Sunday: 10:00 AM - 5:00 PM'
      ],
      gradient: 'from-emerald-600 to-teal-600'
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 overflow-x-hidden" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Header />

      {/* HERO SECTION */}
      <section className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden bg-zinc-950">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute -top-40 -right-40 w-96 h-96 bg-red-600/20 rounded-full blur-[120px]"
            animate={{
              x: [0, 50, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]"
            animate={{
              x: [0, -50, 0],
              y: [0, 50, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-[120rem] mx-auto px-6 sm:px-12 lg:px-24 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-3 mb-8 px-5 py-2.5 bg-red-600/10 border border-red-600/30 backdrop-blur-md rounded-full">
              <MessageSquare className="w-4 h-4 text-red-400" />
              <span className="text-red-400 text-sm font-bold tracking-widest uppercase" style={{ fontFamily: 'Teko, sans-serif' }}>
                // Get in Touch
              </span>
            </div>

            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.95] mb-8 text-white" style={{ fontFamily: 'Teko, sans-serif' }}>
              LET'S START
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-red-600">
                YOUR JOURNEY
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
              Ready to experience automotive excellence? Our team is here to help you find your perfect vehicle.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONTACT INFO CARDS */}
      <section className="w-full bg-zinc-900 py-20 border-y border-zinc-800">
        <div className="max-w-[120rem] mx-auto px-6 sm:px-12 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                <motion.div
                  className="group relative h-full bg-zinc-950 border border-zinc-800 p-8 overflow-hidden"
                  whileHover={{
                    y: -8,
                    borderColor: 'rgb(239, 68, 68)',
                    boxShadow: '0 20px 60px -12px rgba(239, 68, 68, 0.3)'
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${info.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10`} />

                  {/* Top Accent */}
                  <motion.div
                    className={`absolute top-0 left-0 h-1 bg-gradient-to-r ${info.gradient} w-0 group-hover:w-full transition-all duration-500`}
                  />

                  {/* Icon */}
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-orange-600 flex items-center justify-center shadow-lg shadow-red-600/30 group-hover:shadow-2xl group-hover:shadow-red-600/50 transition-all duration-300">
                      <info.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-4 text-white group-hover:text-red-400 transition-colors" style={{ fontFamily: 'Teko, sans-serif', fontSize: '24px' }}>
                    {info.title}
                  </h3>

                  {/* Info Lines */}
                  <div className="space-y-2">
                    {info.lines.map((line, i) => (
                      <p key={i} className="text-zinc-400 text-sm leading-relaxed">
                        {line}
                      </p>
                    ))}
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN CONTACT SECTION */}
      <section className="w-full max-w-[120rem] mx-auto px-6 sm:px-12 lg:px-24 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* INTERACTIVE MAP */}
          <FadeIn>
            <div className="relative h-full min-h-[600px]">
              <div className="sticky top-24">
                <div className="mb-6">
                  <h2 className="text-4xl font-black mb-4" style={{ fontFamily: 'Teko, sans-serif' }}>
                    FIND US IN <span className="text-red-500">PRESTON</span>
                  </h2>
                  <p className="text-zinc-400 text-base">
                    Visit our state-of-the-art showroom in the heart of Preston
                  </p>
                </div>

                {/* Map Container */}
                <div className="relative bg-zinc-900 border border-zinc-800 overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d37573.84774059964!2d-2.7238!3d53.7632!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487b71c3e1c5e893%3A0x500f7a1e96c5e20!2sPreston%2C%20UK!5e0!3m2!1sen!2sus!4v1234567890"
                    width="100%"
                    height="500"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="grayscale hover:grayscale-0 transition-all duration-500"
                  />

                  {/* Map Overlay Badge */}
                  <div className="absolute top-6 left-6 px-4 py-2 bg-red-600 backdrop-blur-sm flex items-center gap-2">
                    <Navigation className="w-4 h-4 text-white" />
                    <span className="text-white text-sm font-bold" style={{ fontFamily: 'Teko, sans-serif', fontSize: '16px' }}>
                      PRESTON, UK
                    </span>
                  </div>
                </div>

                {/* Directions Button */}
                <motion.a
                  href="https://www.google.com/maps/dir//Preston,+UK"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full mt-6 bg-zinc-900 border-2 border-zinc-800 hover:border-red-600 text-white px-8 py-4 text-center font-bold transition-all duration-300 group"
                  whileHover={{ scale: 1.02 }}
                  style={{ fontFamily: 'Teko, sans-serif', fontSize: '18px', letterSpacing: '1px' }}
                >
                  <span className="flex items-center justify-center gap-2">
                    <Navigation className="w-5 h-5 group-hover:text-red-500 transition-colors" />
                    GET DIRECTIONS
                  </span>
                </motion.a>
              </div>
            </div>
          </FadeIn>

          {/* CONTACT FORM */}
          <FadeIn delay={0.2}>
            <div className="bg-zinc-900 border border-zinc-800 p-8 lg:p-10">
              <div className="mb-8">
                <h2 className="text-4xl font-black text-white mb-4" style={{ fontFamily: 'Teko, sans-serif' }}>
                  SEND A MESSAGE
                </h2>
                <p className="text-zinc-400">
                  Fill out the form below and we'll get back to you within 24 hours
                </p>
              </div>

              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-emerald-600/20 border-2 border-emerald-600 p-6 mb-8 flex items-start gap-4"
                >
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-white font-bold mb-1" style={{ fontFamily: 'Teko, sans-serif', fontSize: '18px' }}>
                      Message Sent Successfully!
                    </h3>
                    <p className="text-emerald-200 text-sm">
                      Thank you for contacting us. We'll respond shortly.
                    </p>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm text-zinc-300 mb-2 font-bold uppercase tracking-wider" style={{ fontFamily: 'Teko, sans-serif' }}>
                    Full Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-zinc-800 border-2 border-zinc-700 focus:border-red-600 text-white rounded-none h-14 px-4 transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm text-zinc-300 mb-2 font-bold uppercase tracking-wider" style={{ fontFamily: 'Teko, sans-serif' }}>
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-zinc-800 border-2 border-zinc-700 focus:border-red-600 text-white rounded-none h-14 px-4 transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm text-zinc-300 mb-2 font-bold uppercase tracking-wider" style={{ fontFamily: 'Teko, sans-serif' }}>
                      Phone
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-zinc-800 border-2 border-zinc-700 focus:border-red-600 text-white rounded-none h-14 px-4 transition-colors"
                      placeholder="+44 1772 123 456"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm text-zinc-300 mb-2 font-bold uppercase tracking-wider" style={{ fontFamily: 'Teko, sans-serif' }}>
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-zinc-800 border-2 border-zinc-700 focus:border-red-600 text-white rounded-none h-14 px-4 transition-colors cursor-pointer"
                  >
                    <option value="">Select a subject</option>
                    <option value="sales">Sales Inquiry</option>
                    <option value="service">Service Appointment</option>
                    <option value="test-drive">Schedule Test Drive</option>
                    <option value="parts">Parts & Accessories</option>
                    <option value="financing">Financing Options</option>
                    <option value="trade-in">Trade-In Valuation</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm text-zinc-300 mb-2 font-bold uppercase tracking-wider" style={{ fontFamily: 'Teko, sans-serif' }}>
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full bg-zinc-800 border-2 border-zinc-700 focus:border-red-600 text-white resize-none rounded-none p-4 transition-colors"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                {/* Preferred Contact Method */}
                <div>
                  <label className="block text-sm text-zinc-300 mb-3 font-bold uppercase tracking-wider" style={{ fontFamily: 'Teko, sans-serif' }}>
                    Preferred Contact Method
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="email"
                        checked={formData.preferredContact === 'email'}
                        onChange={handleChange}
                        className="w-4 h-4 accent-red-600"
                      />
                      <span className="text-zinc-300">Email</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="phone"
                        checked={formData.preferredContact === 'phone'}
                        onChange={handleChange}
                        className="w-4 h-4 accent-red-600"
                      />
                      <span className="text-zinc-300">Phone</span>
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 px-8 py-7 text-lg font-bold rounded-none border-b-4 border-red-900 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontFamily: 'Teko, sans-serif', letterSpacing: '1px' }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      SENDING...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      SEND MESSAGE
                      <Send className="w-5 h-5" />
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="w-full bg-zinc-900 py-24 border-t border-zinc-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="text-5xl lg:text-6xl font-black mb-6 text-white" style={{ fontFamily: 'Teko, sans-serif' }}>
              PREFER TO VISIT<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                IN PERSON?
              </span>
            </h2>
            <p className="text-xl text-zinc-300 mb-10 leading-relaxed max-w-2xl mx-auto">
              Experience our premium collection firsthand. Walk into our Preston showroom and let our experts guide you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://www.google.com/maps/dir//Preston,+UK"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-red-600 hover:bg-red-700 text-white px-12 py-7 text-lg font-bold rounded-none transition-all duration-300" style={{ fontFamily: 'Teko, sans-serif', letterSpacing: '1px' }}>
                  GET DIRECTIONS
                </Button>
              </a>
              <a href="tel:+441772123456">
                <Button variant="outline" className="border-2 border-zinc-700 text-white hover:bg-zinc-800 hover:border-red-500 px-12 py-7 text-lg font-bold rounded-none transition-all duration-300" style={{ fontFamily: 'Teko, sans-serif', letterSpacing: '1px' }}>
                  CALL NOW
                </Button>
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}
