// HPI 2.0 - PREMIUM AUTOMOTIVE EDITION
import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView, useSpring } from 'framer-motion';
import { 
  ArrowRight, 
  Gauge, 
  Zap, 
  Shield, 
  TrendingUp, 
  BarChart3, 
  ChevronRight, 
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
  Rocket,
  Award
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  Legend
} from 'recharts';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
    icon: Wrench
  },
  {
    id: 's2',
    name: 'Track-Ready Tuning',
    description: 'Unlock peak performance with custom ECU calibration',
    price: 599,
    category: 'PERFORMANCE',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    icon: Zap
  },
  {
    id: 's3',
    name: 'Ceramic Shield Pro',
    description: 'Military-grade nano-ceramic protection coating',
    price: 899,
    category: 'PROTECTION',
    gradient: 'from-purple-500/20 to-pink-500/20',
    icon: Sparkles
  },
  {
    id: 's4',
    name: 'Executive Fleet',
    description: 'White-glove fleet management for enterprises',
    price: 1200,
    category: 'ENTERPRISE',
    gradient: 'from-amber-500/20 to-yellow-500/20',
    icon: Trophy
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
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-red-600 selection:text-white overflow-x-hidden" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Header />
      
      {/* HERO SECTION - Split Screen Design */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-clip bg-zinc-950">
        {/* Video Background with Vignette */}
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
          
          {/* Premium Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/60 to-zinc-950/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/40" />
          
          {/* Racing Red Accent Glow */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-blue-600/10"
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Carbon Fiber Texture Overlay */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,.05) 2px, rgba(255,255,255,.05) 4px)`
          }} />
        </div>

        {/* Content with Racing Typography */}
        <div className="relative z-10 w-full max-w-[100rem] mx-auto px-6 sm:px-12 lg:px-24 py-24 flex flex-col justify-center items-start min-h-screen">
          <FadeIn>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              {/* Racing Badge */}
              <div className="inline-flex items-center gap-3 mb-8 px-5 py-2.5 bg-red-600/10 border border-red-600/30 backdrop-blur-md rounded-full">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-red-400 text-sm font-bold tracking-widest uppercase" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  Premium Collection 2025
                </span>
              </div>
              
              <h1 className="text-6xl sm:text-7xl lg:text-9xl font-black tracking-tighter leading-[0.95] mb-8 text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                Drive more<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-red-600">
                  than a car.
                </span>
              </h1>

              <p className="text-xl sm:text-2xl text-gray-300 max-w-xl mb-8">
                Drive a statement.
              </p>
              
              {/* Racing Stripe Accent */}
              <motion.div 
                className="h-1.5 bg-gradient-to-r from-red-600 via-orange-500 to-transparent mb-8"
                initial={{ width: 0 }}
                animate={{ width: '300px' }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </motion.div>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <p className="text-xl sm:text-2xl text-zinc-300 max-w-2xl mb-12 leading-relaxed font-light">
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

          {/* Performance Stats Bar */}
          <FadeIn delay={0.6} className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-4xl">
            {STATS.map((stat, idx) => (
              <motion.div 
                key={idx}
                className="relative group"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                <div className="relative bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 group-hover:border-red-600/50 p-6 transition-all duration-300">
                  <stat.icon className="w-6 h-6 text-red-500 mb-3" />
                  <div className="text-4xl font-black text-white mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>{stat.value}</div>
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

      {/* FEATURES - 3D Card Design */}
      <section className="w-full max-w-[120rem] mx-auto px-6 sm:px-12 lg:px-24 py-32 relative bg-zinc-950">
        {/* Ambient Glow Effects */}
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
          <div className="text-center mb-20">
            <FadeIn>
              <div className="inline-block mb-6">
                <span className="text-red-500 text-sm font-bold tracking-[0.3em] uppercase" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  // PERFORMANCE WITHOUT COMPROMISE
                </span>
              </div>
              <h2 className="text-6xl lg:text-7xl font-black mb-8 leading-tight" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                PURE <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">ADRENALINE</span>
              </h2>
              <p className="text-zinc-400 text-xl max-w-3xl mx-auto leading-relaxed">
                Every vehicle in our collection represents the pinnacle of automotive engineering, 
                backed by cutting-edge technology and uncompromising performance standards.
              </p>
            </FadeIn>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((feature, idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                <motion.div 
                  className="group relative h-full bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 overflow-hidden"
                  whileHover={{ 
                    y: -10,
                    borderColor: 'rgb(239, 68, 68)',
                    boxShadow: '0 20px 60px -12px rgba(239, 68, 68, 0.3)'
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Gradient Background on Hover */}
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  />
                  
                  {/* Top Racing Stripe */}
                  <motion.div 
                    className={`absolute top-0 left-0 h-1 bg-gradient-to-r ${feature.color} w-0 group-hover:w-full transition-all duration-500`}
                  />
                  
                  <div className="relative z-10 p-8 h-full flex flex-col">
                    {/* Icon with 3D Effect */}
                    <motion.div
                      className="mb-6"
                      whileHover={{ scale: 1.1, rotateY: 15 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-orange-600 rounded-lg flex items-center justify-center shadow-lg shadow-red-600/30 group-hover:shadow-2xl group-hover:shadow-red-600/50 transition-all duration-300">
                        <feature.icon className="w-8 h-8 text-white" />
                      </div>
                    </motion.div>
                    
                    {/* Stat Badge */}
                    <div className="inline-flex self-start mb-4 px-3 py-1 bg-zinc-800/50 border border-zinc-700 rounded-full">
                      <span className="text-red-400 text-xs font-bold tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                        {feature.stat}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-red-400 transition-colors" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      {feature.title}
                    </h3>
                    <p className="text-zinc-400 leading-relaxed text-sm">
                      {feature.desc}
                    </p>
                    
                    {/* Bottom Accent Line */}
                    <div className="mt-auto pt-6">
                      <motion.div 
                        className="h-0.5 bg-gradient-to-r from-red-600 to-transparent"
                        initial={{ width: '30%' }}
                        whileHover={{ width: '100%' }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ANALYTICS SECTION - Premium Dark */}
      <section className="w-full bg-zinc-900 py-32 overflow-hidden relative border-y border-zinc-800">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(239, 68, 68, 0.1) 25%, rgba(239, 68, 68, 0.1) 26%, transparent 27%, transparent 74%, rgba(239, 68, 68, 0.1) 75%, rgba(239, 68, 68, 0.1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(239, 68, 68, 0.1) 25%, rgba(239, 68, 68, 0.1) 26%, transparent 27%, transparent 74%, rgba(239, 68, 68, 0.1) 75%, rgba(239, 68, 68, 0.1) 76%, transparent 77%, transparent)',
          backgroundSize: '60px 60px'
        }} />
        
        <div className="max-w-[120rem] mx-auto px-6 sm:px-12 lg:px-24 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            {/* Chart with Premium Styling */}
            <FadeIn className="relative order-2 lg:order-1">
              <div className="bg-zinc-950 border border-zinc-800 p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>MARKET TRAJECTORY</h3>
                    <p className="text-sm text-zinc-500 uppercase tracking-wider font-semibold">7-Month Performance Index</p>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/30">
                    <TrendingUp className="w-5 h-5" /> +12.5%
                  </div>
                </div>
                
                <div className="h-[320px] w-full">
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
                        tick={{fill: '#71717a', fontSize: 12, fontFamily: 'Orbitron, sans-serif'}} 
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis 
                        stroke="#52525b" 
                        tick={{fill: '#71717a', fontSize: 12, fontFamily: 'Orbitron, sans-serif'}} 
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
                          fontFamily: 'Orbitron, sans-serif'
                        }}
                        itemStyle={{ color: '#EF4444' }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="price" 
                        stroke="#EF4444" 
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill="url(#colorPrice)" 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="market" 
                        stroke="#52525b" 
                        strokeWidth={2}
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
                <div className="inline-flex items-center gap-3 mb-8 px-4 py-2 bg-blue-600/10 border border-blue-600/30 rounded-full">
                  <BarChart3 className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-400 text-sm font-bold tracking-widest uppercase" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    DATA-DRIVEN CONFIDENCE
                  </span>
                </div>
                
                <h2 className="text-5xl lg:text-6xl font-black mb-8 leading-tight" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  POWERED BY<br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">REAL DATA</span>
                </h2>
                
                <p className="text-zinc-400 text-lg mb-10 leading-relaxed max-w-xl">
                  We analyze real market trends, vehicle performance, and long-term value so you don't have to guess. Every recommendation is backed by data — not sales pressure.
                </p>
                
                <div className="grid grid-cols-2 gap-6 mb-12">
                  {STATS.slice(0, 2).map((stat, idx) => (
                    <div key={idx} className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                      <div className="relative bg-zinc-950 border-l-2 border-red-600 pl-6 py-4">
                        <div className="text-4xl font-black text-white mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>{stat.value}</div>
                        <div className="text-xs text-zinc-500 uppercase tracking-wider font-bold">{stat.label}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <Link to="/analytics">
                  <Button className="bg-white text-zinc-950 hover:bg-zinc-200 rounded-none px-10 py-6 text-base font-bold border-b-4 border-zinc-400 hover:scale-105 transition-all duration-300" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    See the Data Behind Our Cars →
                  </Button>
                </Link>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* PREMIUM SERVICES - FIXED */}
      <section className="w-full py-32 bg-zinc-950 relative overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-[120rem] mx-auto px-6 sm:px-12 lg:px-24 relative z-10">
          <div className="text-center mb-20">
            <FadeIn>
              <span className="text-red-500 text-sm font-bold tracking-[0.3em] uppercase mb-6 inline-block" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                // PREMIUM SERVICES
              </span>
              <h2 className="text-6xl font-black mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                ELITE <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">OFFERINGS</span>
              </h2>
              <p className="text-zinc-400 text-xl max-w-3xl mx-auto">
                Concierge-level services engineered for the discerning automotive enthusiast
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES_DATA.map((service, idx) => (
              <FadeIn key={service.id} delay={idx * 0.1}>
                <Link to="/services" className="group relative h-full block no-underline">
                  <motion.div
                    className="relative h-full bg-zinc-900/90 backdrop-blur-sm border border-zinc-800 p-8 flex flex-col justify-between min-h-[400px] overflow-hidden"
                    whileHover={{ 
                      y: -8,
                      borderColor: 'rgb(239, 68, 68)',
                      boxShadow: '0 20px 60px -12px rgba(239, 68, 68, 0.3)'
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Gradient Overlay - Only on Hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} />
                    
                    {/* Solid Dark Background */}
                    <div className="absolute inset-0 bg-zinc-900 -z-20" />
                    
                    {/* Icon & Category */}
                    <div className="relative z-10">
                      {/* Icon with 3D Effect */}
                      <motion.div
                        className="mb-6"
                        whileHover={{ scale: 1.1, rotateY: 15 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-orange-600 rounded-lg flex items-center justify-center shadow-lg shadow-red-600/30 group-hover:shadow-2xl group-hover:shadow-red-600/50 transition-all duration-300">
                          <service.icon className="w-8 h-8 text-white" />
                        </div>
                      </motion.div>

                      <div className="inline-block px-3 py-1 bg-zinc-800/80 border border-zinc-700 rounded-full mb-6">
                        <span className="text-red-400 text-xs font-bold tracking-widest" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                          {service.category}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-red-400 transition-colors" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                        {service.name}
                      </h3>
                      <p className="text-zinc-400 leading-relaxed text-sm">
                        {service.description}
                      </p>
                    </div>
                    
                    {/* Price Footer */}
                    <div className="relative z-10 flex items-center justify-between border-t border-zinc-800 pt-6 mt-8">
                      <span className="text-3xl font-black text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                        ${service.price}
                      </span>
                      <div className="w-12 h-12 bg-zinc-800 group-hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:shadow-red-600/50">
                        <ArrowUpRight className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* IMMERSIVE PARALLAX */}
      <section className="w-full h-[90vh] relative overflow-clip">
        <ParallaxImage 
          src="https://static.wixstatic.com/media/cec0c1_b09a94124db140ad9134f72d060b0344~mv2.png?originWidth=1152&originHeight=768"
          alt="Interior detail"
          className="w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/60 to-transparent flex items-center">
          <div className="max-w-[120rem] mx-auto px-6 sm:px-12 lg:px-24 w-full">
            <FadeIn>
              <div className="max-w-3xl">
                <div className="h-1 w-20 bg-red-600 mb-8" />
                <h2 className="text-7xl md:text-8xl font-black text-white mb-8 leading-[0.95]" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  UNLEASH<br/>
                  THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">BEAST</span>
                </h2>
                <p className="text-zinc-300 text-2xl leading-relaxed mb-10">
                  Where raw power meets refined elegance. Experience automotive excellence reimagined.
                </p>
                <Link to="/vehicles">
                  <Button className="bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 rounded-none px-12 py-7 text-lg font-bold border-b-4 border-red-900 hover:scale-105 transition-all duration-300" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    DISCOVER MORE →
                  </Button>
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA - INTERACTIVE CAR */}
      <section 
        className="w-full py-32 relative overflow-hidden cursor-none"
        onMouseMove={(e) => {
          const section = e.currentTarget;
          const rect = section.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          section.style.setProperty('--mouse-x', `${x}px`);
          section.style.setProperty('--mouse-y', `${y}px`);
        }}
      >
        {/* Racing Track Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
          <motion.div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 40px,
                rgba(239, 68, 68, 0.3) 40px,
                rgba(239, 68, 68, 0.3) 60px
              )`
            }}
            animate={{ 
              backgroundPositionY: ['0px', '100px']
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Cursor Glow */}
        <motion.div 
          className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            left: 'var(--mouse-x, 50%)',
            top: 'var(--mouse-y, 50%)',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(239, 68, 68, 0.3) 0%, transparent 70%)',
            filter: 'blur(40px)'
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Tire Tracks */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10">
          <defs>
            <pattern id="tire-tracks" x="0" y="0" width="100" height="20" patternUnits="userSpaceOnUse">
              <rect x="10" y="2" width="30" height="4" fill="rgba(239,68,68,0.3)" rx="2"/>
              <rect x="10" y="14" width="30" height="4" fill="rgba(239,68,68,0.3)" rx="2"/>
              <rect x="60" y="2" width="30" height="4" fill="rgba(239,68,68,0.3)" rx="2"/>
              <rect x="60" y="14" width="30" height="4" fill="rgba(239,68,68,0.3)" rx="2"/>
            </pattern>
          </defs>
          <motion.rect 
            width="100%" 
            height="100%" 
            fill="url(#tire-tracks)"
            animate={{ x: [0, -100] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </svg>

        {/* Exhaust Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-2 h-2 bg-red-500/40 rounded-full pointer-events-none blur-sm"
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 + 50],
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeOut"
            }}
            style={{
              left: `${20 + (i * 4)}%`,
              top: `${30 + (i % 3) * 20}%`
            }}
          />
        ))}

        {/* Car Cursor */}
        <motion.div
          className="absolute pointer-events-none z-50"
          style={{
            left: 'var(--mouse-x, 50%)',
            top: 'var(--mouse-y, 50%)',
            transform: 'translate(-50%, -50%)'
          }}
          animate={{ rotate: [0, 2, -2, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          <svg width="60" height="40" viewBox="0 0 60 40" className="drop-shadow-2xl">
            <motion.g animate={{ y: [0, -1, 0] }} transition={{ duration: 0.3, repeat: Infinity }}>
              <ellipse cx="30" cy="35" rx="25" ry="3" fill="rgba(0,0,0,0.3)" opacity="0.5"/>
              <path d="M15 25 L10 30 L50 30 L45 25 L40 15 L20 15 Z" fill="url(#carGradient)" stroke="#EF4444" strokeWidth="1.5"/>
              <rect x="22" y="17" width="7" height="6" fill="rgba(239, 68, 68, 0.3)" rx="1"/>
              <rect x="31" y="17" width="7" height="6" fill="rgba(239, 68, 68, 0.3)" rx="1"/>
              <circle cx="48" cy="28" r="2" fill="#FFD700">
                <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite"/>
              </circle>
              <circle cx="12" cy="28" r="2" fill="#FF4444"/>
              <motion.circle 
                cx="20" cy="32" r="4" 
                fill="#333" stroke="#EF4444" strokeWidth="1"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: '20px 32px' }}
              />
              <motion.circle 
                cx="40" cy="32" r="4" 
                fill="#333" stroke="#EF4444" strokeWidth="1"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: '40px 32px' }}
              />
            </motion.g>
            <defs>
              <linearGradient id="carGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#EF4444"/>
                <stop offset="100%" stopColor="#DC2626"/>
              </linearGradient>
            </defs>
          </svg>
          
          <motion.div
            className="absolute right-full top-1/2 -translate-y-1/2"
            animate={{ opacity: [0, 0.8, 0], x: [10, -20] }}
            transition={{ duration: 0.4, repeat: Infinity }}
          >
            <div className="flex flex-col gap-1">
              <div className="h-0.5 w-8 bg-gradient-to-r from-transparent to-red-500/80 rounded"/>
              <div className="h-0.5 w-6 bg-gradient-to-r from-transparent to-red-500/60 rounded"/>
              <div className="h-0.5 w-4 bg-gradient-to-r from-transparent to-red-500/40 rounded"/>
            </div>
          </motion.div>
        </motion.div>

        {/* Horizon Lights */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-zinc-950/80 to-transparent">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`light-${i}`}
              className="absolute bottom-10 w-1 h-20 bg-gradient-to-t from-red-500/60 to-transparent"
              style={{ left: `${i * 12.5}%` }}
              animate={{
                height: [60, 80, 60],
                opacity: [0.4, 0.8, 0.4]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <motion.h2 
              className="text-6xl md:text-7xl font-black mb-8 text-white"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
              animate={{
                textShadow: [
                  '0 0 20px rgba(239, 68, 68, 0.5)',
                  '0 0 30px rgba(239, 68, 68, 0.8)',
                  '0 0 20px rgba(239, 68, 68, 0.5)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              READY TO<br/>IGNITE YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">JOURNEY?</span>
            </motion.h2>
            <p className="text-xl text-zinc-300 mb-12 leading-relaxed max-w-2xl mx-auto">
              Join thousands of enthusiasts who've experienced automotive excellence. 
              Your premium vehicle awaits.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/contact" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 px-12 py-8 text-lg font-bold rounded-none border-b-4 border-red-900 hover:scale-105 transition-all duration-300" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  BOOK CONSULTATION
                </Button>
              </Link>
              <Link to="/vehicles" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto border-2 border-zinc-600 text-white hover:bg-zinc-800 hover:border-red-500 px-12 py-8 text-lg font-bold rounded-none transition-all duration-300" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  EXPLORE FLEET
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