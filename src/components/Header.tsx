import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/vehicles', label: 'Inventory' },
    { href: '/3d-experience', label: '3D Experience' },
    { href: '/services', label: 'Services' },
    { href: '/analytics', label: 'Analytics' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="w-full bg-background border-b border-secondary/5 sticky top-0 z-50 backdrop-blur-md bg-background/95">
      <div className="max-w-[120rem] mx-auto px-6 sm:px-12 lg:px-24">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <motion.span 
              className="font-heading text-2xl lg:text-3xl font-bold group-hover:text-primary transition-colors text-new"
              whileHover={{ scale: 1.05 }}
            >
              Velocity
            </motion.span>
            <motion.span 
              className="font-heading text-2xl lg:text-3xl font-bold ml-1 [text-shadow:none] text-new2"
              whileHover={{ scale: 1.05 }}
            >
              Auto
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="relative px-4 py-2 font-heading text-sm font-medium transition-colors"
              >
                <span className={`transition-colors ${
                  isActive(link.href)
                    ? 'text-primary'
                    : 'text-secondary hover:text-primary'
                }`}>
                  {link.label}
                </span>
                {isActive(link.href) && (
                  <motion.div
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary"
                    layoutId="underline"
                    transition={{ type: 'spring', stiffness: 380, damping: 40 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-secondary hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.nav 
            className="lg:hidden py-6 border-t border-secondary/10"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-heading text-base py-3 px-4 rounded-lg transition-colors ${
                    isActive(link.href)
                      ? 'text-primary bg-primary/10'
                      : 'text-secondary hover:text-primary hover:bg-secondary/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </div>
    </header>
  );
}
