// HPI 2.0 - PREMIUM AUTOMOTIVE EDITION - MOBILE OPTIMIZED
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import {
  ArrowUpRight,
  Award,
  BarChart3,
  Rocket,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

// --- PREMIUM AUTOMOTIVE DATA ---
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

// --- MAIN PAGE COMPONENT ---
export default function HomePage() {
  const containerRef = useRef(null);

  return (
    <div ref={containerRef} className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-red-600 selection:text-white overflow-x-hidden" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Header />

      {/* HERO SECTION - Mobile Optimized */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-zinc-950">
        {/* Video Background */}
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

          {/* Overlays */}
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

        {/* Content - Mobile Responsive */}
        <div className="relative z-10 w-full max-w-[100rem] mx-auto px-4 sm:px-6 md:px-12 lg:px-24 py-12 sm:py-16 md:py-24 flex flex-col justify-center items-start min-h-screen">
          <FadeIn>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              {/* Badge - Mobile Friendly */}
              <div className="inline-flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8 px-3 sm:px-5 py-2 sm:py-2.5 bg-red-600/10 border border-red-600/30 backdrop-blur-md rounded-full">
                <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-red-400 text-xs sm:text-sm font-bold tracking-widest uppercase" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  Premium Collection 2026
                </span>
              </div>

              {/* Main Heading - Responsive */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-black tracking-tighter leading-[0.95] mb-6 sm:mb-8 text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                Drive more<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-red-600">
                  than a car.
                </span>
              </h1>

              <p className="text-base sm:text-xl md:text-2xl text-gray-300 max-w-xl mb-6 sm:mb-8">
                Drive a statement.
              </p>

              {/* Racing Stripe */}
              <motion.div
                className="h-1 sm:h-1.5 bg-gradient-to-r from-red-600 via-orange-500 to-transparent mb-6 sm:mb-8"
                initial={{ width: 0 }}
                animate={{ width: '200px' }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </motion.div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-zinc-300 max-w-2xl mb-6 sm:mb-8 md:mb-12 leading-relaxed font-light">
              Engineered <span className="text-red-500 font-semibold">for the road.</span> Powered
              <span className="text-blue-400 font-semibold"> by intelligence.</span>
              <br className="hidden sm:block" />This is performance, evolved.
            </p>
          </FadeIn>

          {/* Buttons - Mobile Stacked */}
          <FadeIn delay={0.4} className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-5 w-full sm:w-auto">
            <Link to="/vehicles" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 rounded-none px-8 sm:px-12 py-5 sm:py-7 text-base sm:text-lg font-bold transition-all duration-300 hover:shadow-2xl hover:shadow-red-600/50 border-b-4 border-red-800 hover:scale-105" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                EXPLORE COLLECTION
              </Button>
            </Link>
            <Link to="/3d-experience" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto border-2 border-zinc-600 text-white hover:bg-zinc-800 hover:border-red-500 rounded-none px-8 sm:px-12 py-5 sm:py-7 text-base sm:text-lg font-bold transition-all duration-300 backdrop-blur-md" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                3D SHOWROOM
              </Button>
            </Link>
          </FadeIn>

          {/* Stats - Mobile 2x2 Grid */}
          <FadeIn delay={0.6} className="mt-8 sm:mt-12 md:mt-16 lg:mt-20 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 w-full max-w-4xl">
            {STATS.map((stat, idx) => (
              <motion.div
                key={idx}
                className="relative group"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                <div className="relative bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 group-hover:border-red-600/50 p-3 sm:p-4 md:p-6 transition-all duration-300">
                  <stat.icon className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 text-red-500 mb-2 sm:mb-3" />
                  <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white mb-1 sm:mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>{stat.value}</div>
                  <div className="text-[10px] sm:text-xs text-zinc-400 uppercase tracking-wider font-semibold leading-tight">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </FadeIn>
        </div>
      </section>

      {/* RACING TICKER - Mobile Optimized */}
      <div className="w-full bg-gradient-to-r from-red-600 to-orange-600 py-3 sm:py-4 overflow-hidden border-y-2 border-red-800">
        <motion.div
          className="inline-flex items-center gap-8 sm:gap-12"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        >
          {[...Array(6)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="text-white font-black text-xl sm:text-2xl md:text-3xl uppercase tracking-widest whitespace-nowrap" style={{ fontFamily: 'Orbitron, sans-serif' }}>PERFORMANCE</span>
              <span className="text-white/40 font-black text-xl sm:text-2xl md:text-3xl">●</span>
              <span className="text-white font-black text-xl sm:text-2xl md:text-3xl uppercase tracking-widest whitespace-nowrap" style={{ fontFamily: 'Orbitron, sans-serif' }}>PRECISION</span>
              <span className="text-white/40 font-black text-xl sm:text-2xl md:text-3xl">●</span>
              <span className="text-white font-black text-xl sm:text-2xl md:text-3xl uppercase tracking-widest whitespace-nowrap" style={{ fontFamily: 'Orbitron, sans-serif' }}>POWER</span>
              <span className="text-white/40 font-black text-xl sm:text-2xl md:text-3xl">●</span>
            </React.Fragment>
          ))}
        </motion.div>
      </div>

      {/* BMW SECTION - Mobile Responsive */}
      <section className="w-full max-w-[120rem] mx-auto px-4 sm:px-6 md:px-12 lg:px-24 py-12 sm:py-16 md:py-24 lg:py-32 relative bg-zinc-950">
        {/* Ambient Glows */}
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-red-600/20 rounded-full blur-[120px]"
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]"
          animate={{
            x: [0, -50, 0],
            y: [0, 50, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <FadeIn>
              <div className="inline-block mb-4 sm:mb-6">
                <span className="text-red-500 text-xs sm:text-sm font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  // PERFORMANCE WITHOUT COMPROMISE
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 sm:mb-8 leading-tight" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                PURE <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">ADRENALINE</span>
              </h2>
              <p className="text-zinc-400 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed px-4">
                Every vehicle in our collection represents the pinnacle of automotive engineering,
                backed by cutting-edge technology and uncompromising performance standards.
              </p>
            </FadeIn>
          </div>

          {/* BMW Content - Mobile Stack */}
          <FadeIn delay={0.2}>
            <div className="mt-6 sm:mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-center">
              {/* Image */}
              <div className="w-full bg-zinc-900 border border-zinc-800 p-4 sm:p-6 md:p-8 rounded-lg group hover:border-red-600 transition-all duration-300 hover:shadow-2xl hover:shadow-red-600/30">
                <Image
                  src="https://freepngimg.com/thumb/bmw/58042-car-coupe-m6-bmw-m3-m2-white.png"
                  alt="BMW M Performance Coupe"
                  className="w-full h-auto max-h-[300px] sm:max-h-[400px] md:max-h-[500px] object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Text */}
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-3 sm:mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    BMW M Performance
                  </h3>
                  <div className="inline-flex px-3 sm:px-4 py-1.5 sm:py-2 bg-zinc-800/50 border border-zinc-700 rounded-full mb-4 sm:mb-6">
                    <span className="text-red-400 text-xs sm:text-sm font-bold tracking-wider uppercase" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      0-62 MPH IN 3.9s
                    </span>
                  </div>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <p className="text-zinc-300 text-base sm:text-lg leading-relaxed">
                    3.0L TwinPower Turbo inline-6 engine with advanced M xDrive all-wheel drive.
                  </p>
                  <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
                    Precision handling meets everyday luxury in a cockpit packed with next-gen digital instrumentation.
                  </p>
                </div>
                <div className="pt-4 border-t border-zinc-800">
                  <Link to="/vehicles" className="block sm:inline-block">
                    <Button className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-orange-500 text-white hover:from-red-700 hover:to-orange-600 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold rounded-none border-b-4 border-red-800 hover:scale-105 transition-all duration-300" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      EXPLORE BMW MODELS →
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ANALYTICS SECTION - Mobile Responsive */}
      <section className="w-full bg-zinc-900 py-16 sm:py-24 md:py-32 overflow-hidden relative border-y border-zinc-800">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(239, 68, 68, 0.1) 25%, rgba(239, 68, 68, 0.1) 26%, transparent 27%, transparent 74%, rgba(239, 68, 68, 0.1) 75%, rgba(239, 68, 68, 0.1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(239, 68, 68, 0.1) 25%, rgba(239, 68, 68, 0.1) 26%, transparent 27%, transparent 74%, rgba(239, 68, 68, 0.1) 75%, rgba(239, 68, 68, 0.1) 76%, transparent 77%, transparent)',
          backgroundSize: '60px 60px'
        }} />

        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 md:px-12 lg:px-24 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 md:gap-16 lg:gap-20 items-center">

            {/* Chart - Mobile First */}
            <FadeIn className="relative order-2 lg:order-1">
              <div className="bg-zinc-950 border border-zinc-800 p-4 sm:p-6 md:p-8 shadow-2xl">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-3 sm:gap-0">
                  <div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>MARKET TRAJECTORY</h3>
                    <p className="text-xs sm:text-sm text-zinc-500 uppercase tracking-wider font-semibold">7-Month Performance Index</p>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-400 text-xs sm:text-sm font-bold bg-emerald-500/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-emerald-500/30 whitespace-nowrap">
                    <TrendingUp className="w-4 sm:w-5 h-4 sm:h-5" /> +12.5%
                  </div>
                </div>

                <div className="h-[250px] sm:h-[280px] md:h-[320px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={PRICE_TRENDS_DATA}>
                      <defs>
                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#EF4444" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                      <XAxis
                        dataKey="month"
                        stroke="#52525b"
                        tick={{fill: '#71717a', fontSize: 10, fontFamily: 'Orbitron, sans-serif'}}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        stroke="#52525b"
                        tick={{fill: '#71717a', fontSize: 10, fontFamily: 'Orbitron, sans-serif'}}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(value) => `$${value/1000}k`}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#18181b',
                          borderColor: '#3f3f46',
                          color: '#fff',
                          borderRadius: '0',
                          fontFamily: 'Orbitron, sans-serif',
                          fontSize: '12px'
                        }}
                        itemStyle={{ color: '#EF4444' }}
                      />
                      <Area
                        type="monotone"
                        dataKey="price"
                        stroke="#EF4444"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorPrice)"
                      />
                      <Area
                        type="monotone"
                        dataKey="market"
                        stroke="#52525b"
                        strokeWidth={1.5}
                        strokeDasharray="5 5"
                        fill="transparent"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </FadeIn>

            {/* Text Content */}
            <div className="order-1 lg:order-2">
              <FadeIn delay={0.2}>
                <div className="inline-flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600/10 border border-blue-600/30 rounded-full">
                  <BarChart3 className="w-3 sm:w-4 h-3 sm:h-4 text-blue-400" />
                  <span className="text-blue-400 text-xs sm:text-sm font-bold tracking-wider sm:tracking-widest uppercase" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    DATA-DRIVEN CONFIDENCE
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 sm:mb-8 leading-tight" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  POWERED BY<br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">REAL DATA</span>
                </h2>

                <p className="text-zinc-400 text-base sm:text-lg mb-6 sm:mb-8 md:mb-10 leading-relaxed max-w-xl">
                  We analyze real market trends, vehicle performance, and long-term value so you don't have to guess. Every recommendation is backed by data — not sales pressure.
                </p>

                <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10 md:mb-12">
                  {STATS.slice(0, 2).map((stat, idx) => (
                    <div key={idx} className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                      <div className="relative bg-zinc-950 border-l-2 border-red-600 pl-4 sm:pl-6 py-3 sm:py-4">
                        <div className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-1 sm:mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>{stat.value}</div>
                        <div className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-wider font-bold">{stat.label}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <Link to="/3d-experience" className="block sm:inline-block">
                  <Button className="w-full sm:w-auto bg-white text-zinc-950 hover:bg-zinc-200 rounded-none px-8 sm:px-10 py-4 sm:py-6 text-sm sm:text-base font-bold border-b-4 border-zinc-400 hover:scale-105 transition-all duration-300" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    Explore 3D Experience →
                  </Button>
                </Link>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* PREMIUM SERVICES - Mobile Grid */}
      <section className="w-full py-16 sm:py-24 md:py-32 bg-zinc-950 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 md:px-12 lg:px-24 relative z-10">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <FadeIn>
              <span className="text-red-500 text-xs sm:text-sm font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-4 sm:mb-6 inline-block" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                // PREMIUM SERVICES
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 sm:mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                ELITE <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">OFFERINGS</span>
              </h2>
              <p className="text-zinc-400 text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-4">
                Concierge-level services engineered for the discerning automotive enthusiast
              </p>
            </FadeIn>
          </div>

          {/* Services Grid - 1 col mobile, 2 col tablet, 4 col desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {SERVICES_DATA.map((service, idx) => (
              <FadeIn key={service.id} delay={idx * 0.1}>
                <Link to="/services" className="group relative h-full block no-underline">
                  <motion.div
                    className="relative h-full bg-zinc-900/90 backdrop-blur-sm border border-zinc-800 p-6 sm:p-8 flex flex-col justify-between min-h-[350px] sm:min-h-[400px] overflow-hidden"
                    whileHover={{
                      y: -8,
                      borderColor: 'rgb(239, 68, 68)',
                      boxShadow: '0 20px 60px -12px rgba(239, 68, 68, 0.3)'
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} />
                    <div className="absolute inset-0 bg-zinc-900 -z-20" />

                    <div className="relative z-10">
                      <div className="text-4xl sm:text-5xl mb-4 sm:mb-6">{service.icon}</div>
                      <div className="inline-block px-2.5 sm:px-3 py-1 bg-zinc-800/80 border border-zinc-700 rounded-full mb-4 sm:mb-6">
                        <span className="text-red-400 text-[10px] sm:text-xs font-bold tracking-widest" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                          {service.category}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white group-hover:text-red-400 transition-colors" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                        {service.name}
                      </h3>
                      <p className="text-zinc-400 leading-relaxed text-sm">
                        {service.description}
                      </p>
                    </div>

                    <div className="relative z-10 flex items-center justify-between border-t border-zinc-800 pt-4 sm:pt-6 mt-6 sm:mt-8">
                      <span className="text-2xl sm:text-3xl font-black text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                        ${service.price}
                      </span>
                      <div className="w-10 sm:w-12 h-10 sm:h-12 bg-zinc-800 group-hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:shadow-red-600/50">
                        <ArrowUpRight className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* PARALLAX - Mobile Optimized */}
      <section className="w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] relative overflow-clip">
        <ParallaxImage
          src="https://static.wixstatic.com/media/cec0c1_b09a94124db140ad9134f72d060b0344~mv2.png?originWidth=1152&originHeight=768"
          alt="Interior detail"
          className="w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/60 to-transparent flex items-center">
          <div className="max-w-[120rem] mx-auto px-4 sm:px-6 md:px-12 lg:px-24 w-full">
            <FadeIn>
              <div className="max-w-3xl">
                <div className="h-0.5 sm:h-1 w-12 sm:w-20 bg-red-600 mb-6 sm:mb-8" />
                <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 sm:mb-8 leading-[0.95]" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  UNLEASH<br/>
                  THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">BEAST</span>
                </h2>
                <p className="text-zinc-300 text-lg sm:text-xl md:text-2xl leading-relaxed mb-8 sm:mb-10">
                  Where raw power meets refined elegance. Experience automotive excellence reimagined.
                </p>
                <Link to="/vehicles" className="block sm:inline-block">
                  <Button className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 rounded-none px-8 sm:px-12 py-5 sm:py-7 text-base sm:text-lg font-bold border-b-4 border-red-900 hover:scale-105 transition-all duration-300" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    DISCOVER MORE →
                  </Button>
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA SECTION - Mobile Optimized */}
      <section className="w-full py-16 sm:py-24 md:py-32 relative overflow-hidden bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <FadeIn>
            <h2
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 sm:mb-8 text-white leading-tight"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              READY TO<br/>IGNITE YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">JOURNEY?</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-zinc-300 mb-8 sm:mb-10 md:mb-12 leading-relaxed max-w-2xl mx-auto px-4">
              Join thousands of enthusiasts who've experienced automotive excellence.
              Your premium vehicle awaits.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <Link to="/contact" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 px-8 sm:px-12 py-5 sm:py-7 md:py-8 text-base sm:text-lg font-bold rounded-none border-b-4 border-red-900 hover:scale-105 transition-all duration-300" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  BOOK CONSULTATION
                </Button>
              </Link>
              <Link to="/vehicles" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto border-2 border-zinc-600 text-white hover:bg-zinc-800 hover:border-red-500 px-8 sm:px-12 py-5 sm:py-7 md:py-8 text-base sm:text-lg font-bold rounded-none transition-all duration-300" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  EXPLORE VEHICLES
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}
