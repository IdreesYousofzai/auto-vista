import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowUpRight
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const footerLinks = [
    { href: '/vehicles', label: 'Browse Vehicles' },
    { href: '/3d-experience', label: '3D Showroom' },
    { href: '/services', label: 'Elite Services' },
    { href: '/analytics', label: 'Market Analytics' },
    { href: '/about', label: 'About Elite Motors' },
  ];

  const services = [
    'Vehicle Sales',
    'Performance Tuning',
    'Trade-In Evaluation',
    'Maintenance & Protection',
  ];

  return (
    <footer className="relative w-full bg-zinc-950 text-zinc-300 overflow-hidden border-t border-zinc-800">
      
      {/* Ambient Glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-red-600/20 blur-[120px]" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-600/20 blur-[120px]" />

      <div className="relative max-w-[120rem] mx-auto px-6 sm:px-12 lg:px-24 py-24">
        
        {/* Top Racing Stripe */}
        <div className="h-1 w-full bg-gradient-to-r from-red-600 via-orange-500 to-transparent mb-20" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-14 mb-20">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3
              className="text-3xl font-black text-white mb-5 tracking-tight"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              ELITE
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                MOTORS
              </span>
            </h3>

            <p className="text-sm text-zinc-400 leading-relaxed mb-6 max-w-sm">
              Precision-engineered vehicles, data-driven confidence, and
              uncompromising performance — built for those who demand more.
            </p>

            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.2, y: -2 }}
                  className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:border-red-500 hover:bg-red-600 transition-all"
                >
                  <Icon className="w-4 h-4 text-white" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Explore */}
          <FooterColumn title="Explore">
            {footerLinks.map(link => (
              <FooterLink key={link.href} {...link} />
            ))}
          </FooterColumn>

          {/* Services */}
          <FooterColumn title="Services">
            {services.map((service, i) => (
              <FooterLink key={i} href="/services" label={service} />
            ))}
          </FooterColumn>

          {/* Contact */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4
              className="text-lg font-bold text-white mb-6 tracking-wider"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              Get in Touch
            </h4>

            <ul className="space-y-4 text-sm text-zinc-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-red-500 mt-0.5" />
                123 Auto Drive, Innovation City
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-red-500" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-red-500" />
                info@velocityauto.com
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-zinc-500 uppercase tracking-wider">
            © 2026 Elite Motors — All Rights Reserved
          </p>

          <div className="flex gap-6 text-xs uppercase tracking-wider">
            <a className="hover:text-red-500 transition-colors" href="#">
              Privacy Policy
            </a>
            <a className="hover:text-red-500 transition-colors" href="#">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------------------------- */
/* Helper Components                  */
/* ---------------------------------- */

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h4
        className="text-lg font-bold text-white mb-6 tracking-wider"
        style={{ fontFamily: 'Orbitron, sans-serif' }}
      >
        {title}
      </h4>
      <ul className="space-y-3">{children}</ul>
    </motion.div>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link
        to={href}
        className="group flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
      >
        <span className="relative">
          {label}
          <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-red-500 to-orange-500 group-hover:w-full transition-all duration-300" />
        </span>
        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
      </Link>
    </li>
  );
}
