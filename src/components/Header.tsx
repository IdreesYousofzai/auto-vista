import Chatbot from '@/components/Chatbot';
import { AnimatePresence, motion } from 'framer-motion';
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

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  return (
    <>
      <Chatbot />
      <header
        className={`w-full sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-zinc-950/98 backdrop-blur-xl shadow-2xl shadow-black/50'
            : 'bg-zinc-950/95 backdrop-blur-md'
        }`}
      >
        <div className="border-b border-zinc-800/50">
          <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24">
            <div className="flex items-center justify-between h-16 sm:h-18 md:h-20 gap-3">
              {/* Logo */}
              <Link to="/" className="group flex items-center gap-0 flex-shrink-0">
                <div className="flex items-baseline gap-0.5">
                  <span
                    className="text-xl sm:text-2xl md:text-[30px] font-black text-white tracking-[-0.04em] transition-colors group-hover:text-red-500"
                    style={{ fontFamily: '"trxdxnt", sans-serif' }}
                  >
                    VELOCITY
                  </span>
                  <span
                    className="text-xl sm:text-2xl md:text-[30px] font-black text-red-600 tracking-[-0.04em]"
                    style={{ fontFamily: '"trxdxnt", sans-serif' }}
                  >
                    .
                  </span>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="relative px-3 xl:px-4 py-2 group"
                  >
                    <span
                      className={`text-xs xl:text-sm font-semibold tracking-wide transition-all duration-300 ${
                        isActive(link.href)
                          ? 'text-white'
                          : 'text-zinc-500 group-hover:text-white'
                      }`}
                      style={{ fontFamily: '"Inter", sans-serif' }}
                    >
                      {link.label}
                    </span>

                    {isActive(link.href) && (
                      <motion.div
                        className="absolute bottom-0 left-3 xl:left-4 right-3 xl:right-4 h-[2px] bg-red-600"
                        layoutId="activeIndicator"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                ))}
              </nav>

              {/* Right Section */}
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Desktop CTA */}
                <Link to="/contact" className="hidden md:block">
                  <motion.button
                    className="relative bg-red-600 text-white px-4 lg:px-6 py-2 text-xs lg:text-sm font-bold overflow-hidden group rounded-none border-b-2 border-red-800"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    style={{ fontFamily: '"Inter", sans-serif' }}
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
                  type="button"
                  className="lg:hidden relative w-9 h-9 sm:w-10 sm:h-10 flex flex-col items-center justify-center gap-1.5 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                  onClick={toggleMobileMenu}
                  aria-label="Toggle navigation menu"
                  aria-expanded={mobileMenuOpen}
                  aria-controls="mobile-nav"
                >
                  <motion.span
                    className="w-5 sm:w-6 h-0.5 bg-zinc-300 group-hover:bg-white transition-colors"
                    animate={mobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  />
                  <motion.span
                    className="w-5 sm:w-6 h-0.5 bg-zinc-300 group-hover:bg-white transition-colors"
                    animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  />
                  <motion.span
                    className="w-5 sm:w-6 h-0.5 bg-zinc-300 group-hover:bg-white transition-colors"
                    animate={mobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-nav"
              className="lg:hidden bg-zinc-950/98 backdrop-blur-xl border-b border-zinc-800/60"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="px-4 sm:px-6 py-4 sm:py-5">
                <nav className="flex flex-col gap-1.5 mb-4 sm:mb-5">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      transition={{ delay: index * 0.04, duration: 0.2 }}
                    >
                      <Link
                        to={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base font-semibold rounded-md transition-all ${
                          isActive(link.href)
                            ? 'text-white bg-zinc-900'
                            : 'text-zinc-300 hover:text-white hover:bg-zinc-900/70'
                        }`}
                        style={{ fontFamily: '"Inter", sans-serif' }}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Mobile CTA */}
                <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                  <button
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-3 sm:py-3.5 text-sm sm:text-base font-bold rounded-md transition-colors"
                    style={{ fontFamily: '"Inter", sans-serif' }}
                  >
                    Book Now
                  </button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
