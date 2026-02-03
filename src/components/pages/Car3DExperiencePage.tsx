import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles, Award, TrendingUp, Rocket } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Vehicles } from '@/entities';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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

const STATS = [
  { value: '500+', label: 'Premium Vehicles', icon: Sparkles },
  { value: '98%', label: 'Client Satisfaction', icon: Award },
  { value: '15+', label: 'Years Excellence', icon: TrendingUp },
  { value: '24/7', label: 'Concierge Service', icon: Rocket }
];

export default function Car3DExperiencePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [vehicles, setVehicles] = useState<Vehicles[]>([]);
  const [selectedCarIndex, setSelectedCarIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Load vehicles from CMS
  useEffect(() => {
    const loadVehicles = async () => {
      setIsLoading(true);
      try {
        const result = await BaseCrudService.getAll<Vehicles>('vehicles');
        setVehicles(result.items);
      } catch (error) {
        console.error('Error loading vehicles:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadVehicles();
  }, []);

  const handlePreviousCar = () => {
    setSelectedCarIndex((prev) => (prev === 0 ? vehicles.length - 1 : prev - 1));
  };

  const handleNextCar = () => {
    setSelectedCarIndex((prev) => (prev === vehicles.length - 1 ? 0 : prev + 1));
  };

  const selectedVehicle = vehicles[selectedCarIndex];

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
                  3D SHOWROOM EXPERIENCE
                </span>
              </div>
              
              <h1 className="text-6xl sm:text-7xl lg:text-9xl font-black tracking-tighter leading-[0.95] mb-8 text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                Explore Every<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-red-600">
                  Detail in 3D.
                </span>
              </h1>

              <p className="text-xl sm:text-2xl text-gray-300 max-w-xl mb-8">
                Immersive vehicle exploration.
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
              Rotate, zoom, and inspect <span className="text-red-500 font-semibold">every angle</span> of our premium collection. 
              <span className="text-blue-400 font-semibold"> Interactive 3D</span> 
              <br />showcasing automotive excellence.
            </p>
          </FadeIn>

          <FadeIn delay={0.4} className="flex flex-wrap gap-5">
            <a href="#3d-viewer">
              <Button className="bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 rounded-none px-12 py-7 text-lg font-bold transition-all duration-300 hover:shadow-2xl hover:shadow-red-600/50 border-b-4 border-red-800 hover:scale-105" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                EXPLORE 3D MODELS
              </Button>
            </a>
            <a href="/vehicles">
              <Button variant="outline" className="border-2 border-zinc-600 text-white hover:bg-zinc-800 hover:border-red-500 rounded-none px-12 py-7 text-lg font-bold transition-all duration-300 backdrop-blur-md" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                VIEW INVENTORY
              </Button>
            </a>
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
              <span className="text-white font-black text-3xl uppercase tracking-widest" style={{ fontFamily: 'Orbitron, sans-serif' }}>IMMERSIVE</span>
              <span className="text-white/40 font-black text-3xl">●</span>
              <span className="text-white font-black text-3xl uppercase tracking-widest" style={{ fontFamily: 'Orbitron, sans-serif' }}>INTERACTIVE</span>
              <span className="text-white/40 font-black text-3xl">●</span>
              <span className="text-white font-black text-3xl uppercase tracking-widest" style={{ fontFamily: 'Orbitron, sans-serif' }}>INNOVATIVE</span>
              <span className="text-white/40 font-black text-3xl">●</span>
            </React.Fragment>
          ))}
        </motion.div>
      </div>

      {/* 3D VIEWER SECTION */}
      <section id="3d-viewer" className="w-full max-w-[120rem] mx-auto px-6 sm:px-12 lg:px-24 py-32 relative bg-zinc-950">
        {isLoading ? (
          <div className="text-center py-20">
            <p className="text-lg text-zinc-400">Loading 3D experience...</p>
          </div>
        ) : vehicles.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg text-zinc-400">No vehicles available for 3D viewing</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* 3D Model Showcase */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
              key={selectedVehicle?._id}
            >
              <div className="relative bg-zinc-900 border-2 border-zinc-800 overflow-hidden" style={{ minHeight: '600px' }}>
                {/* 3D Model */}
                <div className="w-full h-full" style={{ minHeight: '600px' }}>
                  {selectedVehicle?.model3dUrl ? (
                    <iframe
                      title={`3D ${selectedVehicle.make} ${selectedVehicle.model} Model`}
                      frameBorder="0"
                      allowFullScreen
                      mozAllowFullScreen={true}
                      webkitAllowFullScreen={true}
                      allow="autoplay; fullscreen; xr-spatial-tracking"
                      xr-spatial-tracking="true"
                      execution-while-out-of-viewport="true"
                      execution-while-not-rendered="true"
                      web-share="true"
                      src={selectedVehicle.model3dUrl}
                      style={{ width: '100%', height: '100%', minHeight: '600px' }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-zinc-800">
                      <p className="text-zinc-400 text-center px-4">
                        3D model not available for this vehicle
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Vehicle Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-1"
            >
              {selectedVehicle && (
                <div className="space-y-6">
                  {/* Vehicle Image */}
                  <div className="aspect-[4/3] bg-zinc-900 overflow-hidden border-2 border-zinc-800">
                    <Image
                      src={selectedVehicle.mainImage || 'https://static.wixstatic.com/media/cec0c1_80c6fdf44d2543dda360a624430998d3~mv2.png?originWidth=768&originHeight=576'}
                      alt={`${selectedVehicle.make} ${selectedVehicle.model}`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Vehicle Info */}
                  <div className="bg-zinc-900 border border-zinc-800 p-6">
                    <h2 className="text-3xl font-black text-white mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      {selectedVehicle.make} {selectedVehicle.model}
                    </h2>
                    <p className="text-sm text-zinc-400 mb-6">
                      {selectedVehicle.year}
                    </p>

                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between items-center border-b border-zinc-700 pb-3">
                        <span className="text-sm text-zinc-400">Price</span>
                        <span className="text-xl font-black text-red-500">
                          ${selectedVehicle.price?.toLocaleString()}
                        </span>
                      </div>

                      {selectedVehicle.mileage && (
                        <div className="flex justify-between items-center border-b border-zinc-700 pb-3">
                          <span className="text-sm text-zinc-400">Mileage</span>
                          <span className="text-sm font-semibold text-white">
                            {selectedVehicle.mileage.toLocaleString()} mi
                          </span>
                        </div>
                      )}

                      {selectedVehicle.engineType && (
                        <div className="flex justify-between items-center border-b border-zinc-700 pb-3">
                          <span className="text-sm text-zinc-400">Engine</span>
                          <span className="text-sm font-semibold text-white">
                            {selectedVehicle.engineType}
                          </span>
                        </div>
                      )}

                      {selectedVehicle.transmission && (
                        <div className="flex justify-between items-center border-b border-zinc-700 pb-3">
                          <span className="text-sm text-zinc-400">Transmission</span>
                          <span className="text-sm font-semibold text-white">
                            {selectedVehicle.transmission}
                          </span>
                        </div>
                      )}

                      {selectedVehicle.exteriorColor && (
                        <div className="flex justify-between items-center border-b border-zinc-700 pb-3">
                          <span className="text-sm text-zinc-400">Exterior</span>
                          <span className="text-sm font-semibold text-white">
                            {selectedVehicle.exteriorColor}
                          </span>
                        </div>
                      )}

                      {selectedVehicle.interiorColor && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-zinc-400">Interior</span>
                          <span className="text-sm font-semibold text-white">
                            {selectedVehicle.interiorColor}
                          </span>
                        </div>
                      )}
                    </div>

                    {selectedVehicle.description && (
                      <p className="text-sm text-zinc-300 mb-6">
                        {selectedVehicle.description}
                      </p>
                    )}

                    {/* Navigation */}
                    <div className="flex gap-3">
                      <button
                        onClick={handlePreviousCar}
                        className="flex-1 flex items-center justify-center gap-2 bg-zinc-800 text-white py-3 hover:bg-red-600 transition-colors font-bold"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={handleNextCar}
                        className="flex-1 flex items-center justify-center gap-2 bg-zinc-800 text-white py-3 hover:bg-red-600 transition-colors font-bold"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Counter */}
                    <p className="text-center text-sm text-zinc-400 mt-4">
                      {selectedCarIndex + 1} of {vehicles.length}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
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
                  EXPERIENCE<br/>
                  THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">FUTURE</span>
                </h2>
                <p className="text-zinc-300 text-2xl leading-relaxed mb-10">
                  Advanced 3D visualization technology brings our vehicles to life. Explore with unprecedented detail and interactivity.
                </p>
                <a href="/vehicles">
                  <Button className="bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 rounded-none px-12 py-7 text-lg font-bold border-b-4 border-red-900 hover:scale-105 transition-all duration-300" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    DISCOVER MORE →
                  </Button>
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="w-full py-32 relative overflow-hidden bg-zinc-950">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-red-600/20 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-600/20 blur-[120px]" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <motion.h2 
              className="text-6xl md:text-7xl font-black mb-8 text-white"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              READY TO FIND YOUR<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">PERFECT MATCH?</span>
            </motion.h2>
            <p className="text-xl text-zinc-300 mb-12 leading-relaxed max-w-2xl mx-auto">
              Schedule a consultation with our experts and find the vehicle of your dreams.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a href="/contact" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 px-12 py-8 text-lg font-bold rounded-none border-b-4 border-red-900 hover:scale-105 transition-all duration-300" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  BOOK CONSULTATION
                </Button>
              </a>
              <a href="/vehicles" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto border-2 border-zinc-600 text-white hover:bg-zinc-800 hover:border-red-500 px-12 py-8 text-lg font-bold rounded-none transition-all duration-300" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  EXPLORE VEHICLES
                </Button>
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}
