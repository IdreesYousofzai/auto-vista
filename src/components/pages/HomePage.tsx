// VELOCITY AUTOMOTIVE - ULTRA PREMIUM EDITION
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { motion, useInView, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import {
  ArrowUpRight,
  Award,
  ChevronRight,
  Rocket,
  Sparkles,
  TrendingUp,
  Zap
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// --- DATA ---
const STATS = [
  { value: '100+', label: 'Premium Vehicles', icon: Sparkles },
  { value: '98%', label: 'Client Satisfaction', icon: Award },
  { value: '10+', label: 'Years Excellence', icon: TrendingUp },
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
    icon: '🔧',
    color: 'red'
  },
  {
    id: 's2',
    name: 'Track-Ready Tuning',
    description: 'Unlock peak performance with custom ECU calibration',
    price: 599,
    category: 'PERFORMANCE',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    icon: '⚡',
    color: 'blue'
  },
  {
    id: 's3',
    name: 'Ceramic Shield Pro',
    description: 'Military-grade nano-ceramic protection coating',
    price: 899,
    category: 'PROTECTION',
    gradient: 'from-purple-500/20 to-pink-500/20',
    icon: '✨',
    color: 'purple'
  },
  {
    id: 's4',
    name: 'Executive Fleet',
    description: 'White-glove fleet management for enterprises',
    price: 1200,
    category: 'ENTERPRISE',
    gradient: 'from-amber-500/20 to-yellow-500/20',
    icon: '🏆',
    color: 'amber'
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

// --- ADVANCED ANIMATIONS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Magnetic button effect
const MagneticButton = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.1);
    y.set((e.clientY - centerY) * 0.1);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
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
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <div ref={ref} className={`overflow-clip relative ${className}`}>
      <motion.div style={{ y, scale }} className="w-full h-full">
        <Image src={src} alt={alt} className="w-full h-full object-cover" />
      </motion.div>
    </div>
  );
};

// Animated counter
const AnimatedCounter = ({ value, suffix = '' }: { value: string, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const numValue = parseInt(value.replace(/\D/g, ''));
    let current = 0;
    const increment = numValue / 30;
    const timer = setInterval(() => {
      current += increment;
      if (current >= numValue) {
        setCount(numValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 50);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count}{value.includes('+') ? '+' : ''}{value.includes('%') ? '%' : ''}{suffix}
    </span>
  );
};

export default function HomePage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div ref={containerRef} className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-red-600 selection:text-white overflow-x-hidden relative" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-orange-500 to-red-600 origin-left z-[100]"
        style={{ scaleX }}
      />

      <Header />

      {/* HERO - ULTRA PREMIUM */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated mesh gradient background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-zinc-950" />

          {/* Animated gradient orbs */}
          <motion.div
            className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(239, 68, 68, 0.15) 0%, transparent 70%)',
              filter: 'blur(80px)'
            }}
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          <motion.div
            className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
              filter: 'blur(80px)'
            }}
            animate={{
              x: [0, -100, 0],
              y: [0, 100, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '100px 100px'
          }} />

          {/* Video overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 mix-blend-overlay"
          >
            <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-30">
              <source src="https://www.pexels.com/download/video/32098956/" type="video/mp4" />
            </video>
          </motion.div>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-[100rem] mx-auto px-4 sm:px-6 md:px-12 lg:px-24 py-12">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Floating badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-3 mb-8 px-5 py-2.5 bg-red-600/5 border border-red-600/20 backdrop-blur-xl rounded-full group cursor-pointer"
              whileHover={{ scale: 1.05, borderColor: 'rgba(239, 68, 68, 0.4)' }}
            >
              <motion.div
                className="w-2 h-2 bg-red-500 rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-red-400 text-sm font-bold tracking-widest uppercase" style={{ fontFamily: 'Teko, sans-serif' }}>
                Premium Collection 2026
              </span>
              <ChevronRight className="w-4 h-4 text-red-500 group-hover:translate-x-1 transition-transform" />
            </motion.div>

            {/* Hero heading with stagger */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-black tracking-tighter leading-[0.9] mb-8 text-white"
              style={{ fontFamily: 'Teko, sans-serif' }}
            >
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                Drive more
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative inline-block"
              >
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-red-600">
                  than a car.
                </span>
                <motion.div
                  className="absolute inset-0 blur-2xl opacity-50 bg-gradient-to-r from-red-500 via-orange-500 to-red-600"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [0.95, 1.05, 0.95]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </motion.div>
            </motion.h1>

            {/* Subtitle with typing effect */}
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl md:text-2xl text-zinc-300 max-w-2xl mb-12 leading-relaxed"
            >
              Engineered <motion.span
                className="text-red-400 font-semibold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >for the road.</motion.span> Powered
              <motion.span
                className="text-blue-400 font-semibold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              > by intelligence.</motion.span>
            </motion.p>

            {/* CTA Buttons with magnetic effect */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 mb-16"
            >
              <Link to="/vehicles" className="group">
                <MagneticButton>
                  <Button className="relative overflow-hidden bg-gradient-to-r from-red-600 to-red-700 text-white px-12 py-7 text-lg font-bold transition-all duration-300 border-b-4 border-red-900 group-hover:border-red-800" style={{ fontFamily: 'Teko, sans-serif', letterSpacing: '1px' }}>
                    <span className="relative z-10">EXPLORE COLLECTION</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-red-700 to-orange-600"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Button>
                </MagneticButton>
              </Link>

              <Link to="/3d-experience" className="group">
                <MagneticButton>
                  <Button
                    variant="outline"
                    className="relative overflow-hidden border-2 border-zinc-700 text-white hover:border-red-500 px-12 py-7 text-lg font-bold backdrop-blur-xl bg-zinc-950/50 group-hover:bg-zinc-900/80 transition-all duration-300"
                    style={{ fontFamily: 'Teko, sans-serif', letterSpacing: '1px' }}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      3D SHOWROOM
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <Zap className="w-5 h-5 text-red-500" />
                      </motion.div>
                    </span>
                  </Button>
                </MagneticButton>
              </Link>
            </motion.div>

            {/* Animated stats */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl"
            >
              {STATS.map((stat, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="group relative"
                  whileHover={{ y: -10 }}
                >
                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-red-600/0 via-red-600/0 to-red-600/0 group-hover:from-red-600/20 group-hover:via-red-600/10 group-hover:to-transparent blur-xl transition-all duration-500"
                  />

                  <div className="relative bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 group-hover:border-red-600/50 p-4 sm:p-6 transition-all duration-300">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + idx * 0.1, type: "spring" }}
                    >
                      <stat.icon className="w-6 h-6 text-red-500 mb-3" />
                    </motion.div>
                    <div className="text-3xl md:text-4xl font-black text-white mb-2" style={{ fontFamily: 'Teko, sans-serif' }}>
                      <AnimatedCounter value={stat.value} />
                    </div>
                    <div className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">{stat.label}</div>
                  </div>

                  {/* Corner accent */}
                  <motion.div
                    className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-red-600/0 group-hover:border-red-600 transition-all duration-300"
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex flex-col items-center gap-2 text-zinc-500">
            <span className="text-xs uppercase tracking-wider" style={{ fontFamily: 'Teko, sans-serif' }}>Scroll</span>
            <motion.div
              className="w-6 h-10 border-2 border-zinc-700 rounded-full p-1"
              whileHover={{ borderColor: '#EF4444' }}
            >
              <motion.div
                className="w-1 h-2 bg-red-500 rounded-full mx-auto"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* RACING TICKER - Enhanced */}
      <div className="w-full bg-gradient-to-r from-red-600 via-orange-500 to-red-600 py-4 overflow-hidden border-y-2 border-red-800 relative">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="flex items-center gap-12 whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(8)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="text-white font-black text-3xl uppercase tracking-widest" style={{ fontFamily: 'Teko, sans-serif' }}>PERFORMANCE</span>
              <span className="text-white/40 font-black text-3xl">●</span>
              <span className="text-white font-black text-3xl uppercase tracking-widest" style={{ fontFamily: 'Teko, sans-serif' }}>PRECISION</span>
              <span className="text-white/40 font-black text-3xl">●</span>
              <span className="text-white font-black text-3xl uppercase tracking-widest" style={{ fontFamily: 'Teko, sans-serif' }}>POWER</span>
              <span className="text-white/40 font-black text-3xl">●</span>
            </React.Fragment>
          ))}
        </motion.div>
      </div>

      {/* BMW SHOWCASE - Redesigned */}
      <section className="w-full py-32 relative overflow-hidden bg-zinc-950">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-px h-full bg-gradient-to-b from-transparent via-red-600/20 to-transparent"
              style={{ left: `${25 + i * 25}%` }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
                scaleY: [0.8, 1, 0.8]
              }}
              transition={{
                duration: 3,
                delay: i * 0.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 md:px-12 lg:px-24 relative z-10">
          <FadeIn>
            <div className="text-center mb-20">
              <motion.div
                className="inline-block mb-6"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <span className="text-red-500 text-sm font-bold tracking-[0.3em] uppercase" style={{ fontFamily: 'Teko, sans-serif' }}>
                  // PERFORMANCE WITHOUT COMPROMISE
                </span>
              </motion.div>

              <motion.h2
                className="text-6xl lg:text-7xl font-black mb-8 leading-tight"
                style={{ fontFamily: 'Teko, sans-serif' }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                PURE <span className="relative">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">ADRENALINE</span>
                  <motion.div
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-orange-500"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  />
                </span>
              </motion.h2>
            </div>
          </FadeIn>

          {/* BMW Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image with reveal animation */}
            <FadeIn delay={0.2}>
              <motion.div
                className="relative group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl" />
                <div className="relative bg-zinc-900 border border-zinc-800 p-8 overflow-hidden">
                  {/* Animated corner brackets */}
                  {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos, i) => (
                    <motion.div
                      key={i}
                      className={`absolute ${pos} w-8 h-8`}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    >
                      <div className={`w-full h-full border-red-600 ${
                        pos.includes('top') ? 'border-t-2' : 'border-b-2'
                      } ${
                        pos.includes('left') ? 'border-l-2' : 'border-r-2'
                      }`} />
                    </motion.div>
                  ))}

                  <motion.div
                    initial={{ opacity: 0, scale: 1.1 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  >
                    <Image
                      src="https://freepngimg.com/thumb/bmw/58042-car-coupe-m6-bmw-m3-m2-white.png"
                      alt="BMW M Performance"
                      className="w-full h-auto object-contain filter drop-shadow-2xl"
                    />
                  </motion.div>
                </div>
              </motion.div>
            </FadeIn>

            {/* Text content */}
            <FadeIn delay={0.4} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-5xl font-black text-white mb-4" style={{ fontFamily: 'Teko, sans-serif' }}>
                  BMW M Performance
                </h3>
                <motion.div
                  className="inline-flex px-4 py-2 bg-zinc-800/50 border-l-4 border-red-600 mb-6"
                  whileHover={{ x: 5 }}
                >
                  <span className="text-red-400 text-sm font-bold tracking-wider uppercase" style={{ fontFamily: 'Teko, sans-serif' }}>
                    0-62 MPH IN 3.9s
                  </span>
                </motion.div>
              </motion.div>

              <motion.div
                className="space-y-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.p variants={itemVariants} className="text-zinc-300 text-lg leading-relaxed">
                  3.0L TwinPower Turbo inline-6 engine with advanced M xDrive all-wheel drive.
                </motion.p>
                <motion.p variants={itemVariants} className="text-zinc-400 text-lg leading-relaxed">
                  Precision handling meets everyday luxury in a cockpit packed with next-gen digital instrumentation.
                </motion.p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <Link to="/vehicles">
                  <MagneticButton>
                    <Button className="group relative overflow-hidden bg-gradient-to-r from-red-600 to-orange-500 text-white px-8 py-4 text-lg font-bold border-b-4 border-red-800" style={{ fontFamily: 'Teko, sans-serif', letterSpacing: '1px' }}>
                      <span className="relative z-10 flex items-center gap-2">
                        EXPLORE BMW MODELS
                        <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-700"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </Button>
                  </MagneticButton>
                </Link>
              </motion.div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Continue in next part... */}
      <Footer />
    </div>
  );
}
