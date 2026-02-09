import { motion } from 'framer-motion';
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
          ? 'bg-zinc-950/98 backdrop-blur-xl shadow-2xl shadow-black/50'
          : 'bg-zinc-950/95 backdrop-blur-md'
      }`}
    >
      <div className="border-b border-zinc-800/50">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-12 lg:px-24">
          <div className="flex items-center justify-between h-16 sm:h-20">

            {/* Logo - Pure Typography */}
            <Link to="/" className="group flex items-center gap-0 flex-shrink-0">
              {/* Brand Name */}
              <div className="flex items-baseline gap-0.5">
                <span
                  className="text-lg sm:text-2xl md:text-[32px] font-black text-white tracking-[-0.04em] transition-colors group-hover:text-red-500"
                  style={{ fontFamily: '\"Bebas Neue\", sans-serif' }}
                >
                  VELOCITY
                </span>
                <span
                  className="text-lg sm:text-2xl md:text-[32px] font-black text-red-600 tracking-[-0.04em]"
                  style={{ fontFamily: '\"Bebas Neue\", sans-serif' }}
                >
                  .
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="relative px-3 xl:px-5 py-2 group"
                >
                  <span
                    className={`text-xs xl:text-[13px] font-semibold tracking-wide transition-all duration-300 ${
                      isActive(link.href)
                        ? 'text-white'
                        : 'text-zinc-500 group-hover:text-white'
                    }`}
                    style={{ fontFamily: '\"Inter\", sans-serif' }}
                  >
                    {link.label}
                  </span>

                  {/* Active Indicator */}
                  {isActive(link.href) && (
                    <motion.div
                      className="absolute bottom-0 left-3 xl:left-5 right-3 xl:right-5 h-[2px] bg-red-600"
                      layoutId="activeIndicator"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Desktop CTA */}
              <Link to="/contact" className="hidden lg:block">
                <motion.button
                  className="relative bg-red-600 text-white px-5 xl:px-7 py-2 xl:py-2.5 text-xs xl:text-sm font-bold overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ fontFamily: '\"Inter\", sans-serif' }}
                >
                  <span className="relative z-10">Book Now</span>
                  <motion.div
                    className="absolute inset-0 bg-red-700"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </Link>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden relative w-8 h-8 sm:w-10 sm:h-10 flex flex-col items-center justify-center gap-1 sm:gap-1.5 group"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <motion.span
                  className="w-5 sm:w-6 h-0.5 bg-zinc-400 group-hover:bg-white transition-colors"
                  animate={mobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                />
                <motion.span
                  className="w-5 sm:w-6 h-0.5 bg-zinc-400 group-hover:bg-white transition-colors"
                  animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                />
                <motion.span
                  className="w-5 sm:w-6 h-0.5 bg-zinc-400 group-hover:bg-white transition-colors"
                  animate={mobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <motion.div
          className="lg:hidden bg-zinc-950 border-b border-zinc-800/50"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="px-4 sm:px-6 py-4 sm:py-6">
            <nav className="flex flex-col gap-1 mb-4 sm:mb-6">
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
                    className={`block px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base font-semibold rounded transition-all ${
                      isActive(link.href)
                        ? 'text-white bg-zinc-900'
                        : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
                    }`}
                    style={{ fontFamily: '\"Inter\", sans-serif' }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Mobile CTA */}
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
              <button
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 sm:py-3.5 text-sm sm:text-base font-bold transition-colors"
                style={{ fontFamily: '\"Inter\", sans-serif' }}
              >
                Book Now
              </button>
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  );
}
