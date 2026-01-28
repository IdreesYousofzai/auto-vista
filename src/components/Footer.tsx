import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-backgrounddark text-secondary-foreground">
      <div className="max-w-[100rem] mx-auto px-8 lg:px-16 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="font-heading text-2xl text-primary mb-6">Velocity Auto</h3>
            <p className="font-paragraph text-sm text-secondary-foreground/80 mb-6">
              Leading the future of automotive excellence with innovation, performance, and customer-first service.
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-secondary-foreground hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-secondary-foreground hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-secondary-foreground hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-secondary-foreground hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg text-secondary-foreground mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/vehicles" className="font-paragraph text-sm text-secondary-foreground/80 hover:text-primary transition-colors">
                  Browse Vehicles
                </Link>
              </li>
              <li>
                <Link to="/3d-experience" className="font-paragraph text-sm text-secondary-foreground/80 hover:text-primary transition-colors">
                  3D Experience
                </Link>
              </li>
              <li>
                <Link to="/services" className="font-paragraph text-sm text-secondary-foreground/80 hover:text-primary transition-colors">
                  Services & Products
                </Link>
              </li>
              <li>
                <Link to="/analytics" className="font-paragraph text-sm text-secondary-foreground/80 hover:text-primary transition-colors">
                  Market Analytics
                </Link>
              </li>
              <li>
                <Link to="/about" className="font-paragraph text-sm text-secondary-foreground/80 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading text-lg text-secondary-foreground mb-6">Our Services</h4>
            <ul className="space-y-3">
              <li className="font-paragraph text-sm text-secondary-foreground/80">Vehicle Sales</li>
              <li className="font-paragraph text-sm text-secondary-foreground/80">Financing Options</li>
              <li className="font-paragraph text-sm text-secondary-foreground/80">Trade-In Evaluation</li>
              <li className="font-paragraph text-sm text-secondary-foreground/80">Maintenance & Repair</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading text-lg text-secondary-foreground mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="font-paragraph text-sm text-secondary-foreground/80">
                  123 Auto Drive, Innovation City, IC 12345
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="tel:+15551234567" className="font-paragraph text-sm text-secondary-foreground/80 hover:text-primary transition-colors">
                  +1 (555) 123-4567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="mailto:info@velocityauto.com" className="font-paragraph text-sm text-secondary-foreground/80 hover:text-primary transition-colors">
                  info@velocityauto.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-secondary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-paragraph text-sm text-secondary-foreground/60">
              © 2026 Velocity Auto. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="font-paragraph text-sm text-secondary-foreground/60 hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="font-paragraph text-sm text-secondary-foreground/60 hover:text-primary transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
