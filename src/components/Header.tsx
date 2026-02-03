import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { scrollY } = useScroll();
  
  // Track scroll position for header effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'HOME' },
    { href: '/vehicles', label: 'FLEET' },
    { href: '/3d-experience', label: '3D SHOWROOM' },
    { href: '/services', label: 'SERVICES' },
    { href: '/analytics', label: 'DATA' },
    { href: '/about', label: 'ABOUT' },
    { href: '/contact', label: 'CONTACT' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.header 
      className={`w-full sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-zinc-950/95 backdrop-blur-xl border-b border-red-600/20 shadow-2xl shadow-red-600/5' 
          : 'bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/50'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {/* Racing Stripe Accent */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-600 to-transparent"
        animate={{ 
          opacity: scrolled ? [0.3, 1, 0.3] : 0.5,
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="max-w-[120rem] mx-auto px-6 sm:px-12 lg:px-24">
        <div className="flex items-center justify-between h-20">
          
          {/* Premium Logo */}
          <Link to="/" className="flex items-center gap-3 group relative">
            {/* Logo Icon with Glow Effect */}
            <motion.div
              className="relative"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-red-600/30 blur-xl rounded-full group-hover:bg-red-600/50 transition-all duration-300" />
              <div className="relative w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center shadow-lg shadow-red-600/30 group-hover:shadow-2xl group-hover:shadow-red-600/50 transition-all duration-300">
                <Zap className="w-6 h-6 text-white" fill="white" />
              </div>
            </motion.div>

            {/* Logo Text */}
            <div className="flex flex-col -space-y-1">
              <motion.span 
                className="font-black text-2xl lg:text-3xl tracking-tighter text-white group-hover:text-red-400 transition-colors"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
                whileHover={{ x: 2 }}
              >
                ELITE MOTORS
              </motion.span>
              <span className="text-[10px] text-zinc-500 tracking-[0.2em] uppercase font-bold">
                Premium Auto
              </span>
            </div>

            {/* Animated Underline */}
            <motion.div 
              className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-red-600 to-transparent"
              initial={{ width: 0 }}
              whileHover={{ width: '100%' }}
              transition={{ duration: 0.3 }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                to={link.href}
                className="relative group px-4 py-2"
              >
                <motion.div
                  className="relative"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className={`text-xs font-bold tracking-wider transition-all duration-300 ${
                    isActive(link.href)
                      ? 'text-red-500'
                      : 'text-zinc-400 group-hover:text-white'
                  }`}
                  style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    {link.label}
                  </span>
                  
                  {/* Active Indicator - Racing Stripe */}
                  {isActive(link.href) && (
                    <motion.div
                      className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-red-600 via-orange-500 to-red-600"
                      layoutId="activeNav"
                      transition={{ type: 'spring', stiffness: 380, damping: 40 }}
                    />
                  )}
                  
                  {/* Hover Effect - Subtle Glow */}
                  <motion.div 
                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-600/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </Link>
            ))}
          </nav>

          {/* CTA Button + Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* CTA Button - Desktop Only */}
            <Link to="/contact" className="hidden lg:block">
              <Button 
                className="bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 rounded-none px-6 py-2.5 text-xs font-bold border-b-2 border-red-900 hover:scale-105 transition-all duration-300 shadow-lg shadow-red-600/20 hover:shadow-2xl hover:shadow-red-600/40"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                <span className="flex items-center gap-2">
                  BOOK NOW
                  <ChevronRight className="w-4 h-4" />
                </span>
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden relative w-10 h-10 bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:border-red-600 hover:bg-red-600/10 transition-all duration-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-red-500" />
                ) : (
                  <Menu className="w-5 h-5 text-zinc-400" />
                )}
              </motion.div>
              
              {/* Pulse effect when open */}
              {mobileMenuOpen && (
                <motion.div
                  className="absolute inset-0 border-2 border-red-600"
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 1.2, opacity: 0 }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <motion.nav 
            className="lg:hidden py-6 border-t border-zinc-800"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <Link
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`group relative flex items-center justify-between py-4 px-5 transition-all duration-300 border-l-2 ${
                      isActive(link.href)
                        ? 'text-red-500 bg-red-600/10 border-red-600'
                        : 'text-zinc-400 hover:text-white bg-zinc-900/50 hover:bg-zinc-800 border-transparent hover:border-red-600/50'
                    }`}
                  >
                    <span className="text-sm font-bold tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      {link.label}
                    </span>
                    
                    <ChevronRight className={`w-4 h-4 transition-all duration-300 ${
                      isActive(link.href) 
                        ? 'text-red-500 translate-x-1' 
                        : 'text-zinc-600 group-hover:text-red-500 group-hover:translate-x-1'
                    }`} />
                  </Link>
                </motion.div>
              ))}

              {/* Mobile CTA */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 + 0.1, duration: 0.3 }}
                className="mt-4 pt-4 border-t border-zinc-800"
              >
                <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                  <Button 
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 rounded-none px-6 py-4 text-sm font-bold border-b-4 border-red-900 shadow-xl shadow-red-600/30"
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                  >
                    <span className="flex items-center justify-center gap-2">
                      BOOK CONSULTATION
                      <ChevronRight className="w-5 h-5" />
                    </span>
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.nav>
        )}
      </div>

      {/* Bottom Racing Glow Effect */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent"
        animate={{ 
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.header>
  );
}