// HPI 1.7-V
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
  ArrowUpRight
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// --- CANONICAL DATA SOURCES ---
// Preserving original data structures and enriching with strictly typed mock data 
// to fulfill the "Service/Products" and "Data Viz" requirements without external fetching.

const FEATURES = [
  { icon: Gauge, title: 'Performance', desc: 'High-performance vehicles engineered for excellence' },
  { icon: Zap, title: 'Innovation', desc: 'Cutting-edge technology in every model' },
  { icon: Shield, title: 'Reliability', desc: 'Comprehensive warranty and support' },
  { icon: TrendingUp, title: 'Value', desc: 'Competitive pricing with market insights' }
];

const STATS = [
  { value: '500+', label: 'Vehicles Sold' },
  { value: '98%', label: 'Satisfaction Rate' },
  { value: '15+', label: 'Years Experience' },
  { value: '24/7', label: 'Support Available' }
];

// Mock Data for Services (based on ServicesandProducts entity structure)
const SERVICES_DATA = [
  {
    id: 's1',
    name: 'Premium Diagnostics',
    description: 'Full-spectrum analysis of vehicle health using AI-driven tools.',
    price: 199,
    category: 'Maintenance'
  },
  {
    id: 's2',
    name: 'Performance Tuning',
    description: 'Optimize engine output and handling for track-ready performance.',
    price: 599,
    category: 'Upgrade'
  },
  {
    id: 's3',
    name: 'Ceramic Coating',
    description: 'Nano-protection layers for enduring shine and exterior defense.',
    price: 899,
    category: 'Detailing'
  },
  {
    id: 's4',
    name: 'Fleet Management',
    description: 'Comprehensive logistics and maintenance for corporate fleets.',
    price: 1200,
    category: 'Business'
  }
];

// Mock Data for Chart (based on PriceTrends entity structure)
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
    <div ref={containerRef} className="min-h-screen bg-background font-paragraph text-secondary selection:bg-primary selection:text-white overflow-x-hidden">
      <Header />
      {/* HERO SECTION - Premium Split Layout */}
      <section className="relative w-full min-h-screen flex flex-col lg:flex-row overflow-clip">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-20 xl:px-24 py-24 lg:py-0 z-10 bg-background">
          <FadeIn>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <div className="inline-block mb-6">
                <motion.div 
                  className="h-1 w-12 bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: 48 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              </div>
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] mb-8 text-secondary font-roboto">
                The Future of <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Automotive</span> <br/>
                Excellence
              </h1>
            </motion.div>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <p className="text-lg sm:text-xl text-secondary/70 max-w-lg mb-12 leading-relaxed font-light">
              Experience premium vehicles curated with precision. Data-driven insights, luxury design, and innovation at every turn.
            </p>
          </FadeIn>

          <FadeIn delay={0.4} className="flex flex-wrap gap-4">
            <Link to="/vehicles">
              <Button className="bg-primary text-white hover:bg-primary/90 rounded-lg px-10 py-6 text-base font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary/30">Buy</Button>
            </Link>
            <Link to="/3d-experience">
              <Button variant="outline" className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-white rounded-lg px-10 py-6 text-base font-semibold transition-all duration-300">
                3D Experience
              </Button>
            </Link>
          </FadeIn>

          {/* Stats */}
          <FadeIn delay={0.6} className="mt-16 grid grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold text-secondary mb-2">500+</div>
              <div className="text-sm text-secondary/60">Premium Vehicles</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-secondary mb-2">98%</div>
              <div className="text-sm text-secondary/60">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-secondary mb-2">24/7</div>
              <div className="text-sm text-secondary/60">Expert Support</div>
            </div>
          </FadeIn>
        </div>

        {/* Right Video - Full Bleed */}
        <div className="w-full lg:w-1/2 h-[50vh] lg:h-screen relative overflow-hidden">
          <motion.div
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
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
              Your browser does not support the video tag.
            </video>
          </motion.div>
          {/* Premium Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent opacity-10 pointer-events-none" />
        </div>
      </section>
      {/* MARQUEE TICKER - Dynamic Motion */}
      <div className="w-full bg-secondary py-6 overflow-hidden whitespace-nowrap border-y border-white/10">
        <motion.div 
          className="inline-flex items-center gap-16"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          {[...Array(4)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="text-white font-heading text-4xl font-bold uppercase tracking-widest opacity-80">Innovation</span>
              <span className="text-primary font-heading text-4xl font-bold uppercase tracking-widest">•</span>
              <span className="text-white font-heading text-4xl font-bold uppercase tracking-widest opacity-80">Performance</span>
              <span className="text-primary font-heading text-4xl font-bold uppercase tracking-widest">•</span>
              <span className="text-white font-heading text-4xl font-bold uppercase tracking-widest opacity-80">Precision</span>
              <span className="text-primary font-heading text-4xl font-bold uppercase tracking-widest">•</span>
            </React.Fragment>
          ))}
        </motion.div>
      </div>
      {/* FEATURES GRID - Minimalist & Clean */}
      <section className="w-full max-w-[120rem] mx-auto px-6 sm:px-12 lg:px-24 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <FadeIn>
              <div className="w-12 h-1 bg-primary mb-8" />
              <h2 className="font-heading text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Engineered for <br/>Excellence.
              </h2>
              <p className="text-secondary/70 text-lg max-w-sm">
                We don't just sell cars; we curate experiences backed by rigorous data and unwavering quality standards.
              </p>
            </FadeIn>
          </div>
          
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {FEATURES.map((feature, idx) => (
              <FadeIn key={idx} delay={idx * 0.1} className="group">
                <div className="h-full p-8 border border-secondary/10 hover:border-primary/50 bg-white transition-colors duration-500 hover:shadow-lg hover:shadow-primary/5">
                  <feature.icon className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform duration-500" />
                  <h3 className="font-heading text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{feature.title}</h3>
                  <p className="text-secondary/70 leading-relaxed">{feature.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
      {/* ANALYTICS & DATA VIZ SECTION - Dark Mode Contrast */}
      <section className="w-full bg-backgrounddark text-white py-32 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
        
        <div className="max-w-[120rem] mx-auto px-6 sm:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            {/* Chart Container */}
            <FadeIn className="relative order-2 lg:order-1">
              <div className="bg-white/5 border border-white/10 p-8 rounded-sm backdrop-blur-sm">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="font-heading text-xl font-semibold">Market Value Trends</h3>
                    <p className="text-sm text-white/50">6-Month Price Analysis</p>
                  </div>
                  <div className="flex items-center gap-2 text-primary text-sm font-medium bg-primary/10 px-3 py-1 rounded-full">
                    <TrendingUp className="w-4 h-4" /> +12.5%
                  </div>
                </div>
                
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={PRICE_TRENDS_DATA}>
                      <defs>
                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#5C5CF6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#5C5CF6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                      <XAxis 
                        dataKey="month" 
                        stroke="#666" 
                        tick={{fill: '#888', fontSize: 12}} 
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis 
                        stroke="#666" 
                        tick={{fill: '#888', fontSize: 12}} 
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(value) => `$${value/1000}k`}
                      />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#121212', borderColor: '#333', color: '#fff' }}
                        itemStyle={{ color: '#fff' }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="price" 
                        stroke="#5C5CF6" 
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill="url(#colorPrice)" 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="market" 
                        stroke="#333" 
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
                <div className="inline-flex items-center gap-2 text-primary font-medium mb-6 tracking-wider uppercase text-sm">
                  <BarChart3 className="w-4 h-4" />
                  Data Intelligence
                </div>
                <h2 className="font-heading text-5xl lg:text-6xl font-bold mb-8 leading-tight">
                  Decisions Driven <br/>by <span className="text-primary">Real Data.</span>
                </h2>
                <p className="text-white/70 text-lg mb-10 leading-relaxed max-w-xl">
                  Stop guessing. Our proprietary analytics platform tracks global market trends, depreciation curves, and inventory velocity to ensure you get the best value, every time.
                </p>
                
                <div className="grid grid-cols-2 gap-8 mb-10">
                  {STATS.map((stat, idx) => (
                    <div key={idx} className="border-l-2 border-primary pl-6">
                      <div className="font-heading text-3xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-sm text-white/50 uppercase tracking-wide">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <Link to="/analytics">
                  <Button className="bg-white text-backgrounddark hover:bg-white/90 rounded-none px-8 py-6 text-base font-bold">
                    Explore Analytics Dashboard
                  </Button>
                </Link>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
      {/* SERVICES LIST - Horizontal Scroll / Grid */}
      <section className="w-full py-32 bg-background">
        <div className="max-w-[120rem] mx-auto px-6 sm:px-12 lg:px-24">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <FadeIn>
              <h2 className="font-heading text-5xl font-bold mb-4">Premium Services</h2>
              <p className="text-secondary/60 text-lg">Comprehensive care for your automotive investment.</p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <Link to="/services" className="hidden md:flex items-center gap-2 text-primary font-medium hover:gap-4 transition-all">
                View All Services <ArrowRight className="w-5 h-5" />
              </Link>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES_DATA.map((service, idx) => (
              <FadeIn key={service.id} delay={idx * 0.1}>
                <Link to="/services" className="group relative h-full bg-white border border-secondary/10 p-8 hover:border-primary transition-colors duration-300 flex flex-col justify-between min-h-[320px] no-underline">
                  <div>
                    <div className="text-xs font-bold tracking-widest text-primary uppercase mb-4">{service.category}</div>
                    <h3 className="font-heading text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{service.name}</h3>
                    <p className="text-secondary/60 mb-8">{service.description}</p>
                  </div>
                  <div className="flex items-center justify-between border-t border-secondary/10 pt-6 mt-auto">
                    <span className="font-heading text-xl font-bold">${service.price}</span>
                    <div className="w-10 h-10 bg-secondary/5 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
          
          <div className="mt-12 md:hidden">
            <Link to="/services">
              <Button variant="outline" className="w-full py-6 border-secondary">View All Services</Button>
            </Link>
          </div>
        </div>
      </section>
      {/* IMMERSIVE IMAGE BREAK */}
      <section className="w-full h-[80vh] relative overflow-clip">
        <ParallaxImage 
          src="https://static.wixstatic.com/media/cec0c1_b09a94124db140ad9134f72d060b0344~mv2.png?originWidth=1152&originHeight=768"
          alt="Interior detail"
          className="w-full h-full"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <FadeIn>
            <h2 className="font-heading text-6xl md:text-8xl text-white font-bold text-center tracking-tighter">
              Drive the <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">Extraordinary.</span>
            </h2>
          </FadeIn>
        </div>
      </section>
      {/* CTA SECTION */}
      <section className="w-full py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="font-heading text-5xl md:text-6xl font-bold mb-8 text-secondary">
              Ready to upgrade your journey?
            </h2>
            <p className="text-xl text-secondary/70 mb-12 leading-relaxed">
              Join the thousands of satisfied clients who have discovered the Velocity difference. 
              Schedule your consultation today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/contact" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-secondary text-white hover:bg-secondary/90 px-12 py-8 text-lg rounded-none">
                  Book Consultation
                </Button>
              </Link>
              <Link to="/vehicles" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto border-2 border-secondary text-secondary hover:bg-secondary hover:text-white px-12 py-8 text-lg rounded-none">
                  Browse Inventory
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