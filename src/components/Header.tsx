import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/vehicles', label: 'Inventory' },
    { href: '/3d-experience', label: '3D Showroom' },
    { href: '/services', label: 'Services' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`w-full sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-zinc-950/98 backdrop-blur-lg shadow-lg shadow-black/50'
          : 'bg-zinc-950/95 backdrop-blur-md'
      }`}
      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
    >
      <div className="border-b border-zinc-800/60">
        <div className="max-w-[120rem] mx-auto px-6 sm:px-12 lg:px-24">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                {/* Logo Icon */}
                <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>

              {/* Logo Text */}
              <div className="flex flex-col">
                <span
                  className="text-xl font-black text-white tracking-tight group-hover:text-red-400 transition-colors"
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  VELOCITY
                </span>
                <span className="text-[9px] text-zinc-500 uppercase tracking-[0.2em] font-semibold -mt-0.5">
                  Automotive
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="relative group"
                >
                  <span className={`text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? 'text-white'
                      : 'text-zinc-400 hover:text-white'
                  }`}>
                    {link.label}
                  </span>

                  {/* Active Indicator */}
                  {isActive(link.href) && (
                    <motion.div
                      className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-red-600"
                      layoutId="activeTab"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* CTA + Mobile Menu */}
            <div className="flex items-center gap-4">
              {/* Desktop CTA */}
              <Link to="/contact" className="hidden lg:block">
                <Button
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 text-sm font-semibold rounded-sm transition-colors"
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  Book Appointment
                </Button>
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                className="lg:hidden w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <motion.div
          className="lg:hidden border-b border-zinc-800/60 bg-zinc-950"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="max-w-[120rem] mx-auto px-6 sm:px-12 lg:px-24 py-6">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-sm text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? 'text-white bg-zinc-900'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile CTA */}
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4"
              >
                <Button
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-sm font-semibold rounded-sm"
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  Book Appointment
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}
