import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const footerLinks = [
    { href: '/vehicles', label: 'Browse Vehicles' },
    { href: '/3d-experience', label: '3D Experience' },
    { href: '/services', label: 'Services & Products' },
    { href: '/analytics', label: 'Market Analytics' },
    { href: '/about', label: 'About Us' },
  ];

  const services = [
    'Vehicle Sales',
    'Financing Options',
    'Trade-In Evaluation',
    'Maintenance & Repair',
  ];

  return (
    <footer className="w-full bg-backgrounddark text-secondary-foreground">
      <div className="max-w-[120rem] mx-auto px-6 sm:px-12 lg:px-24 py-20 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="font-heading text-2xl font-bold text-white mb-4">
                Velocity<span className="text-primary">Auto</span>
              </h3>
              <p className="font-paragraph text-sm text-secondary-foreground/70 mb-6 leading-relaxed">
                Leading the future of automotive excellence with innovation, performance, and customer-first service.
              </p>
              <div className="flex gap-4">
                <motion.a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-secondary-foreground hover:text-primary transition-colors"
                  whileHover={{ scale: 1.2 }}
                >
                  <Facebook className="w-5 h-5" />
                </motion.a>
                <motion.a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-secondary-foreground hover:text-primary transition-colors"
                  whileHover={{ scale: 1.2 }}
                >
                  <Twitter className="w-5 h-5" />
                </motion.a>
                <motion.a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-secondary-foreground hover:text-primary transition-colors"
                  whileHover={{ scale: 1.2 }}
                >
                  <Instagram className="w-5 h-5" />
                </motion.a>
                <motion.a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-secondary-foreground hover:text-primary transition-colors"
                  whileHover={{ scale: 1.2 }}
                >
                  <Linkedin className="w-5 h-5" />
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-heading text-lg font-bold text-white mb-6">Explore</h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href} 
                    className="font-paragraph text-sm text-secondary-foreground/70 hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-heading text-lg font-bold text-white mb-6">Services</h4>
            <ul className="space-y-3">
              {services.map((service, idx) => (
                <li key={idx} className="font-paragraph text-sm text-secondary-foreground/70">
                  {service}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <h4 className="font-heading text-lg font-bold text-white mb-6">Get in Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="font-paragraph text-sm text-secondary-foreground/70">
                  123 Auto Drive, Innovation City, IC 12345
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a 
                  href="tel:+15551234567" 
                  className="font-paragraph text-sm text-secondary-foreground/70 hover:text-primary transition-colors"
                >
                  +1 (555) 123-4567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a 
                  href="mailto:info@velocityauto.com" 
                  className="font-paragraph text-sm text-secondary-foreground/70 hover:text-primary transition-colors"
                >
                  info@velocityauto.com
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          className="pt-8 border-t border-secondary-foreground/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-paragraph text-sm text-secondary-foreground/50">
              © 2026 Velocity Auto. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="font-paragraph text-sm text-secondary-foreground/50 hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="font-paragraph text-sm text-secondary-foreground/50 hover:text-primary transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
