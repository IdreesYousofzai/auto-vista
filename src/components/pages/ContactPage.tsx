import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-red-600/20 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-600/20 blur-[120px]" />

        <div className="relative max-w-[120rem] mx-auto px-6 sm:px-12 lg:px-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span
              className="inline-block mb-6 text-red-500 text-sm font-bold tracking-[0.3em] uppercase"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              // GET IN TOUCH
            </span>

            <h1
              className="text-6xl md:text-7xl font-black mb-8"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              CONTACT
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                ELITE MOTORS
              </span>
            </h1>

            <p className="text-zinc-400 text-xl max-w-3xl mx-auto">
              Have questions? We're here to help you find the perfect vehicle or service solution
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="w-full max-w-[120rem] mx-auto px-6 sm:px-12 lg:px-24 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-black mb-8" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Contact Information
            </h2>
            <p className="text-zinc-400 text-base mb-10">
              Reach out to us through any of these channels. Our team is ready to assist you with your automotive needs.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-red-600 p-3 flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>Visit Us</h3>
                  <p className="text-zinc-400 text-base">
                    123 Auto Drive<br />
                    Innovation City, PR2 <br />
                    United Kingdom
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-red-600 p-3 flex-shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>Call Us</h3>
                  <p className="text-zinc-400 text-base">
                    Sales: +1 (555) 123-4567<br />
                    Service: +1 (555) 123-4568<br />
                    Parts: +1 (555) 123-4569
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-red-600 p-3 flex-shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>Email Us</h3>
                  <p className="text-zinc-400 text-base">
                    General: info@elitemotors.com<br />
                    Sales: sales@elitemotors.com<br />
                    Support: support@elitemotors.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-red-600 p-3 flex-shrink-0">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>Business Hours</h3>
                  <p className="text-zinc-400 text-base">
                    Monday - Friday: 9:00 AM - 8:00 PM<br />
                    Saturday: 9:00 AM - 6:00 PM<br />
                    Sunday: 10:00 AM - 5:00 PM
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-zinc-900 border border-zinc-800 p-8 lg:p-10">
              <h2 className="text-3xl font-black text-white mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                Send Us a Message
              </h2>

              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-600/20 border-2 border-red-600 p-4 mb-6"
                >
                  <p className="text-base text-white">
                    Thank you for your message! We'll get back to you soon.
                  </p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm text-zinc-300 mb-2 font-bold">
                    Full Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-zinc-800 border border-zinc-700 focus:border-red-500 text-white rounded-none"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm text-zinc-300 mb-2 font-bold">
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-zinc-800 border border-zinc-700 focus:border-red-500 text-white rounded-none"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm text-zinc-300 mb-2 font-bold">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-zinc-800 border border-zinc-700 focus:border-red-500 text-white rounded-none"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm text-zinc-300 mb-2 font-bold">
                    Subject *
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-zinc-800 border border-zinc-700 focus:border-red-500 text-white rounded-none"
                    placeholder="How can we help you?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm text-zinc-300 mb-2 font-bold">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full bg-zinc-800 border border-zinc-700 focus:border-red-500 text-white resize-none rounded-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 px-8 py-6 text-base font-bold rounded-none border-b-4 border-red-900"
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  {isSubmitting ? 'Sending...' : (
                    <>
                      Send Message <Send className="ml-2 w-5 h-5" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
