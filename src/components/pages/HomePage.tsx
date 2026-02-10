// HPI 2.0 - PREMIUM AUTOMOTIVE EDITION WITH CAR SHOWCASE
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { AnimatePresence, motion, useInView, useScroll, useTransform } from 'framer-motion';
import {
  Award,
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  Gauge,
  Rocket,
  Shield,
  Sparkles,
  TrendingUp,
  Zap
} from 'lucide-react';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// --- PREMIUM AUTOMOTIVE DATA ---
const FEATURES = [
  {
    icon: Gauge,
    title: 'Raw Power',
    desc: 'Engineering excellence meets uncompromising performance',
    stat: '0-60 in 2.9s',
    color: 'from-red-600 to-orange-500'
  },
  {
    icon: Zap,
    title: 'Tech Forward',
    desc: 'Next-generation AI-powered driving systems',
    stat: 'Level 3 Auto',
    color: 'from-blue-600 to-cyan-500'
  },
  {
    icon: Shield,
    title: 'Built to Last',
    desc: '10-year comprehensive protection program',
    stat: '10yr Warranty',
    color: 'from-emerald-600 to-teal-500'
  },
  {
    icon: Award,
    title: 'Premium Value',
    desc: 'Industry-leading resale and trade-in guarantees',
    stat: '95% Resale',
    color: 'from-amber-600 to-yellow-500'
  }
];

const STATS = [
  { value: '500+', label: 'Premium Vehicles', icon: Sparkles },
  { value: '98%', label: 'Client Satisfaction', icon: Award },
  { value: '15+', label: 'Years Excellence', icon: TrendingUp },
  { value: '24/7', label: 'Concierge Service', icon: Rocket }
];

const SERVICES_DATA = [
  {
    id: 's1',
    name: 'Performance Diagnostics',
    description: 'Precision analysis with aerospace-grade diagnostic systems',
    price: 199,
    category: 'MAINTENANCE',
    gradient: 'from-red-500/20 to-orange-500/20',
    icon: '🔧'
  },
  {
    id: 's2',
    name: 'Track-Ready Tuning',
    description: 'Unlock peak performance with custom ECU calibration',
    price: 599,
    category: 'PERFORMANCE',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    icon: '⚡'
  },
  {
    id: 's3',
    name: 'Ceramic Shield Pro',
    description: 'Military-grade nano-ceramic protection coating',
    price: 899,
    category: 'PROTECTION',
    gradient: 'from-purple-500/20 to-pink-500/20',
    icon: '✨'
  },
  {
    id: 's4',
    name: 'Executive Fleet',
    description: 'White-glove fleet management for enterprises',
    price: 1200,
    category: 'ENTERPRISE',
    gradient: 'from-amber-500/20 to-yellow-500/20',
    icon: '🏆'
  }
];

const PRICE_TRENDS_DATA = [
  { month: 'Jan', price: 45000, market: 42000 },
  { month: 'Feb', price: 46200, market: 42500 },
  { month: 'Mar', price: 45800, market: 43000 },
  { month: 'Apr', price: 47500, market: 43200 },
  { month: 'May', price: 48900, market: 44000 },
  { month: 'Jun', price: 48200, market: 43800 },
  { month: 'Jul', price: 51000, market: 44500 },
];

// Featured Cars for Showcase
const FEATURED_CARS = [
  {
    id: 1,
    name: 'BMW M4',
    fullName: '2025 BMW M4 Competition',
    tagline: 'PRECISION ENGINEERED',
    description: 'Pure performance meets refined luxury in this track-ready beast',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=80',
    specs: {
      power: '503 HP',
      acceleration: '0-60 in 3.8s',
      topSpeed: '180 MPH'
    }
  },
  {
    id: 2,
    name: 'PORSCHE 911',
    fullName: 'Porsche 911 Carrera 4S',
    tagline: 'ICONIC PERFECTION',
    description: 'The legendary sports car that defines automotive excellence',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80',
    specs: {
      power: '443 HP',
      acceleration: '0-60 in 3.6s',
      topSpeed: '191 MPH'
    }
  },
  {
    id: 3,
    name: 'LAMBORGHINI',
    fullName: '2021 Lamborghini Countach LPI 800-4',
    tagline: 'LEGENDARY ICON',
    description: 'A timeless icon reimagined with hybrid performance',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=80',
    specs: {
      power: '803 HP',
      acceleration: '0-60 in 2.8s',
      topSpeed: '221 MPH'
    }
  }
];

// --- UTILITY COMPONENTS ---
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

const ParallaxImage = ({ src, alt, className }: { src: string, alt: string, className?: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className={`overflow-clip relative ${className}`}>
      <motion.div style={{ y }} className="w-full h-[120%] -mt-[10%]">
        <Image src={src} alt={alt} className="w-full h-full object-cover" />
      </motion.div>
    </div>
  );
};

// --- CAR SHOWCASE COMPONENT ---
const CarShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const constraintsRef = useRef(null);

  const handleDragEnd = (event: any, info: any) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (Math.abs(velocity) >= 500 || Math.abs(offset) > 100) {
      if (offset > 0 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else if (offset < 0 && currentIndex < FEATURED_CARS.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < FEATURED_CARS.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const currentCar = FEATURED_CARS[currentIndex];

  return (
    <section className="w-full min-h-screen bg-zinc-950 relative overflow-hidden py-20">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(255,255,255,0.03) 50px, rgba(255,255,255,0.03) 51px)`
        }} />
      </div>

      <div className="max-w-[1920px] mx-auto px-6 sm:px-12 lg:px-24 relative z-10">

        <motion.div
          key={currentCar.id}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-4 mb-4">
            <div className="h-px w-12 bg-red-600" />
            <span
              className="text-5xl md:text-6xl font-black text-white tracking-tight"
              style={{ fontFamily: '"Teko", sans-serif' }}
            >
              {currentCar.name}
            </span>
            <div className="h-px w-12 bg-red-600" />
          </div>
          <p className="text-zinc-500 text-sm uppercase tracking-widest" style={{ fontFamily: '"Inter", sans-serif' }}>
            {currentCar.tagline}
          </p>
        </motion.div>

        <motion.h2
          key={`tagline-${currentCar.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-4xl md:text-6xl lg:text-7xl font-black text-zinc-200 mb-16 tracking-tight leading-tight"
          style={{ fontFamily: '"Teko", sans-serif' }}
        >
          YOU CAN'T HIDE<br/>WHO YOU ARE
        </motion.h2>

        <div className="relative h-[500px] mb-16" ref={constraintsRef}>
          <AnimatePresence mode="wait">
            {FEATURED_CARS.map((car, index) => {
              const offset = index - currentIndex;
              const isActive = index === currentIndex;

              return (
                <motion.div
                  key={car.id}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl"
                  initial={false}
                  animate={{
                    x: `${offset * 100}%`,
                    scale: isActive ? 1 : 0.75,
                    opacity: isActive ? 1 : 0.3,
                    zIndex: isActive ? 10 : 0,
                  }}
                  drag={isActive ? "x" : false}
                  dragConstraints={{ left: -100, right: 100 }}
                  dragElastic={0.1}
                  onDragEnd={handleDragEnd}
                  transition={{
                    duration: 0.5,
                    ease: [0.32, 0.72, 0, 1]
                  }}
                  style={{
                    cursor: isActive ? 'grab' : 'default'
                  }}
                  whileDrag={{ cursor: 'grabbing' }}
                >
                  <motion.img
                    src={car.image}
                    alt={car.fullName}
                    className="w-full h-auto object-contain drop-shadow-2xl"
                    draggable={false}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>

          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-16 h-16 border-2 border-zinc-700 hover:border-red-600 bg-zinc-950/50 backdrop-blur-sm flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed group"
            style={{ clipPath: 'polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 50%)' }}
          >
            <ChevronLeft className="w-8 h-8 text-zinc-400 group-hover:text-red-500 transition-colors" />
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex === FEATURED_CARS.length - 1}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-16 h-16 border-2 border-zinc-700 hover:border-red-600 bg-zinc-950/50 backdrop-blur-sm flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed group"
            style={{ clipPath: 'polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%)' }}
          >
            <ChevronRight className="w-8 h-8 text-zinc-400 group-hover:text-red-500 transition-colors" />
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentCar.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-3 gap-8 mb-12">
              {Object.entries(currentCar.specs).map(([key, value], idx) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 + 0.3 }}
                  className="text-center p-6 bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm"
                >
                  <div
                    className="text-3xl font-black text-white mb-2"
                    style={{ fontFamily: '"Teko", sans-serif' }}
                  >
                    {value}
                  </div>
                  <div className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center text-zinc-400 text-lg mb-12 leading-relaxed"
            >
              {currentCar.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/3d-experience" className="w-full sm:w-auto">
                <Button
                  className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-10 py-6 text-base font-bold flex items-center justify-center gap-3 transition-all"
                  style={{ fontFamily: '"Teko", sans-serif', fontSize: '18px', letterSpacing: '1px' }}
                >
                  EXPLORE THE MODEL
                  <ExternalLink className="w-5 h-5" />
                </Button>
              </Link>

              <Button
                variant="outline"
                className="w-full sm:w-auto border-2 border-zinc-700 hover:border-zinc-600 text-white px-10 py-6 text-base font-bold flex items-center justify-center gap-3 transition-all bg-transparent hover:bg-zinc-900"
                style={{ fontFamily: '"Teko", sans-serif', fontSize: '18px', letterSpacing: '1px' }}
              >
                DOWNLOAD BROCHURE
                <Download className="w-5 h-5" />
              </Button>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-12"
        >
          <p className="text-zinc-600 text-sm uppercase tracking-widest">
            ← Drag to explore →
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// --- MAIN PAGE COMPONENT ---
export default function HomePage() {
  const containerRef = useRef(null);

  return (
    <div ref={containerRef} className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-red-600 selection:text-white overflow-x-hidden" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Header />

      {/* HERO SECTION */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-clip bg-zinc-950">
        <div className="absolute inset-0 w-full h-full">
          <motion.div
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="w-full h-full"
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="https://www.pexels.com/download/video/32098956/" type="video/mp4" />
            </video>
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/60 to-zinc-950/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/40" />

          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-blue-600/10"
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,.05) 2px, rgba(255,255,255,.05) 4px)`
          }} />
        </div>

        <div className="relative z-10 w-full max-w-[100rem] mx-auto px-4 sm:px-6 md:px-12 lg:px-24 py-12 sm:py-16 md:py-24 flex flex-col justify-center items-start min-h-screen">
          <FadeIn>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <div className="inline-flex items-center gap-3 mb-8 px-5 py-2.5 bg-red-600/10 border border-red-600/30 backdrop-blur-md rounded-full">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-red-400 text-sm font-bold tracking-widest uppercase" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  Premium Collection 2025
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter leading-[0.95] mb-6 sm:mb-8 text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                Drive more<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-red-600">
                  than a car.
                </span>
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-xl mb-6 sm:mb-8">
                Drive a statement.
              </p>

              <motion.div
                className="h-1.5 bg-gradient-to-r from-red-600 via-orange-500 to-transparent mb-8"
                initial={{ width: 0 }}
                animate={{ width: '300px' }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </motion.div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-lg sm:text-xl md:text-2xl text-zinc-300 max-w-2xl mb-8 sm:mb-12 leading-relaxed font-light">
              Engineered <span className="text-red-500 font-semibold">for the road.</span> Powered
              <span className="text-blue-400 font-semibold"> by intelligence.</span>
              <br />This is performance, evolved.
            </p>
          </FadeIn>

          <FadeIn delay={0.4} className="flex flex-wrap gap-5">
            <Link to="/vehicles">
              <Button className="bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 rounded-none px-12 py-7 text-lg font-bold transition-all duration-300 hover:shadow-2xl hover:shadow-red-600/50 border-b-4 border-red-800 hover:scale-105" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                EXPLORE OUR COLLECTION
              </Button>
            </Link>
            <Link to="/3d-experience">
              <Button variant="outline" className="border-2 border-zinc-600 text-white hover:bg-zinc-800 hover:border-red-500 rounded-none px-12 py-7 text-lg font-bold transition-all duration-300 backdrop-blur-md" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                VIEW 3D SHOWROOM
              </Button>
            </Link>
          </FadeIn>

          <FadeIn delay={0.6} className="mt-12 sm:mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 w-full max-w-4xl">
            {STATS.map((stat, idx) => (
              <motion.div
                key={idx}
                className="relative group"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                <div className="relative bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 group-hover:border-red-600/50 p-4 sm:p-6 transition-all duration-300">
                  <stat.icon className="w-5 sm:w-6 h-5 sm:h-6 text-red-500 mb-2 sm:mb-3" />
                  <div className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>{stat.value}</div>
                  <div className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </FadeIn>
        </div>
      </section>

      {/* RACING TICKER */}
      <div className="w-full bg-gradient-to-r from-red-600 to-orange-600 py-4 overflow-hidden border-y-2 border-red-800">
        <motion.div
          className="inline-flex items-center gap-12"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        >
          {[...Array(6)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="text-white font-black text-3xl uppercase tracking-widest" style={{ fontFamily: 'Orbitron, sans-serif' }}>PERFORMANCE</span>
              <span className="text-white/40 font-black text-3xl">●</span>
              <span className="text-white font-black text-3xl uppercase tracking-widest" style={{ fontFamily: 'Orbitron, sans-serif' }}>PRECISION</span>
              <span className="text-white/40 font-black text-3xl">●</span>
              <span className="text-white font-black text-3xl uppercase tracking-widest" style={{ fontFamily: 'Orbitron, sans-serif' }}>POWER</span>
              <span className="text-white/40 font-black text-3xl">●</span>
            </React.Fragment>
          ))}
        </motion.div>
      </div>

      {/* CAR SHOWCASE - LAMBORGHINI STYLE */}
      <CarShowcase />

      {/* Continue with rest of sections... */}
      <Footer />
    </div>
  );
}
