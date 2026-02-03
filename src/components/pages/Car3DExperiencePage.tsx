import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, RotateCw, Info, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

// Premium Car Models Database
const CAR_MODELS = [
  {
    id: 1,
    name: '2025 BMW M4 Competition',
    make: 'BMW',
    model: 'M4 Competition',
    year: 2025,
    sketchfabId: 'f8141ecd755547989c9209784b71ad43',
    price: 79900,
    specs: {
      engine: '3.0L Twin-Turbo I6',
      horsepower: '503 HP',
      transmission: '8-Speed Automatic',
      drivetrain: 'RWD'
    },
    description: 'Pure performance meets refined luxury in this track-ready beast.',
    category: 'Performance'
  },
  {
    id: 2,
    name: '2025 Toyota Land Cruiser 250',
    make: 'Toyota',
    model: 'Land Cruiser 250',
    year: 2025,
    sketchfabId: 'b53e78d5e3474474a788e7ef4deccda0',
    price: 62500,
    specs: {
      engine: '2.4L Turbo I4',
      horsepower: '326 HP',
      transmission: '8-Speed Automatic',
      drivetrain: 'AWD'
    },
    description: 'Legendary off-road capability with modern refinement.',
    category: 'SUV'
  },
  {
    id: 3,
    name: 'Porsche 911 Carrera 4S',
    make: 'Porsche',
    model: '911 Carrera 4S',
    year: 2024,
    sketchfabId: 'd01b254483794de3819786d93e0e1ebf',
    price: 139800,
    specs: {
      engine: '3.0L Twin-Turbo Flat-6',
      horsepower: '443 HP',
      transmission: '8-Speed PDK',
      drivetrain: 'AWD'
    },
    description: 'The iconic sports car that defines automotive excellence.',
    category: 'Sports'
  },
  {
    id: 4,
    name: '2021 Lamborghini Countach LPI 800-4',
    make: 'Lamborghini',
    model: 'Countach LPI 800-4',
    year: 2021,
    sketchfabId: 'd76b94884432422b966d1a7f8815afb5',
    price: 2640000,
    specs: {
      engine: '6.5L V12 Hybrid',
      horsepower: '803 HP',
      transmission: '7-Speed ISR',
      drivetrain: 'AWD'
    },
    description: 'A legendary icon reimagined with hybrid performance.',
    category: 'Supercar'
  },
  {
    id: 5,
    name: 'McLaren F1 1993',
    make: 'McLaren',
    model: 'F1',
    year: 1993,
    sketchfabId: '294df724d96241cdbe0e0f3c91ad7fce',
    price: 20000000,
    specs: {
      engine: '6.1L V12',
      horsepower: '627 HP',
      transmission: '6-Speed Manual',
      drivetrain: 'RWD'
    },
    description: 'The ultimate analog supercar and automotive masterpiece.',
    category: 'Classic'
  },
  {
    id: 6,
    name: 'Toyota Crown 2025',
    make: 'Toyota',
    model: 'Crown',
    year: 2025,
    sketchfabId: '9f48fc0a66e44a69a09fda2f864e5944',
    price: 47500,
    specs: {
      engine: '2.4L Turbo Hybrid',
      horsepower: '340 HP',
      transmission: 'e-CVT',
      drivetrain: 'AWD'
    },
    description: 'Japanese luxury redefined with hybrid efficiency.',
    category: 'Luxury'
  },
  {
    id: 7,
    name: 'Bugatti EB110 Super Sport 1992',
    make: 'Bugatti',
    model: 'EB110 Super Sport',
    year: 1992,
    sketchfabId: '4af92c51ecdd4efa9b1c19a1163d9f46',
    price: 3500000,
    specs: {
      engine: '3.5L Quad-Turbo V12',
      horsepower: '603 HP',
      transmission: '6-Speed Manual',
      drivetrain: 'AWD'
    },
    description: 'A rare Italian engineering marvel and collector\'s dream.',
    category: 'Classic'
  },
  {
    id: 8,
    name: 'Mercedes-AMG CLS',
    make: 'Mercedes-AMG',
    model: 'CLS',
    year: 2024,
    sketchfabId: '88b9a904632e42d18254aa6bf5f43344',
    price: 89900,
    specs: {
      engine: '3.0L Twin-Turbo I6',
      horsepower: '429 HP',
      transmission: '9-Speed Automatic',
      drivetrain: 'AWD'
    },
    description: 'Four-door coupe perfection with AMG performance.',
    category: 'Performance'
  },
  {
    id: 9,
    name: 'Future Concept',
    make: 'Concept',
    model: 'Future Legacy',
    year: 2026,
    sketchfabId: '18babb7cc04146ada3e3f80c4739d91a',
    price: 150000,
    specs: {
      engine: 'Electric Tri-Motor',
      horsepower: '1000+ HP',
      transmission: 'Direct Drive',
      drivetrain: 'AWD'
    },
    description: 'A glimpse into the future of automotive design.',
    category: 'Concept'
  },
  {
    id: 10,
    name: 'Audi R8',
    make: 'Audi',
    model: 'R8',
    year: 2024,
    sketchfabId: 'e17e438f076f4427a58d93aa779edaed',
    price: 158600,
    specs: {
      engine: '5.2L V10',
      horsepower: '562 HP',
      transmission: '7-Speed Dual-Clutch',
      drivetrain: 'AWD'
    },
    description: 'Everyday supercar with R8 DNA and Quattro grip.',
    category: 'Supercar'
  },
  {
    id: 11,
    name: 'Audi R8 V10 Plus',
    make: 'Audi',
    model: 'R8 V10 Plus',
    year: 2024,
    sketchfabId: '498c1b7f5e5a4a178fbc4eb69d699e63',
    price: 194400,
    specs: {
      engine: '5.2L V10',
      horsepower: '602 HP',
      transmission: '7-Speed Dual-Clutch',
      drivetrain: 'AWD'
    },
    description: 'Maximum R8 performance in its most potent form.',
    category: 'Supercar'
  },
  {
    id: 12,
    name: 'Tesla Model X',
    make: 'Tesla',
    model: 'Model X',
    year: 2024,
    sketchfabId: '36e9d3598c554bb69f3d9cd00e161818',
    price: 98490,
    specs: {
      engine: 'Tri-Motor Electric',
      horsepower: '1020 HP',
      transmission: 'Direct Drive',
      drivetrain: 'AWD'
    },
    description: 'Falcon-wing luxury SUV with ludicrous performance.',
    category: 'Electric'
  }
];

export default function Car3DExperiencePage() {
  const [currentCarIndex, setCurrentCarIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  const currentCar = CAR_MODELS[currentCarIndex];

  const handleNextCar = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentCarIndex((prev) => (prev + 1) % CAR_MODELS.length);
    setIframeKey(prev => prev + 1);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  const handlePreviousCar = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentCarIndex((prev) => (prev - 1 + CAR_MODELS.length) % CAR_MODELS.length);
    setIframeKey(prev => prev + 1);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePreviousCar();
      if (e.key === 'ArrowRight') handleNextCar();
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isTransitioning]);

  const getSketchfabEmbedUrl = (modelId: string) => {
    return `https://sketchfab.com/models/${modelId}/embed?autospin=0&autostart=1&preload=1&ui_theme=dark`;
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 overflow-x-hidden" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Header />

      {/* HERO SECTION */}
      <section className="relative w-full min-h-[50vh] flex items-center justify-center overflow-hidden bg-zinc-950">
        {/* Animated Background */}
        <div className="absolute inset-0">
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
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-[120rem] mx-auto px-6 sm:px-12 lg:px-24 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-3 mb-6 px-5 py-2.5 bg-red-600/10 border border-red-600/30 backdrop-blur-md rounded-full">
              <Maximize2 className="w-4 h-4 text-red-400" />
              <span className="text-red-400 text-sm font-bold tracking-widest uppercase" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                Interactive Experience
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.95] mb-6 text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              3D <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">SHOWROOM</span>
            </h1>
            
            <p className="text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
              Experience our collection in stunning 3D. Rotate, zoom, and explore every detail from every angle.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3D VIEWER SECTION */}
      <section className="w-full max-w-[120rem] mx-auto px-6 sm:px-12 lg:px-24 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* 3D CANVAS - LARGE */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCarIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="relative bg-zinc-900 border border-zinc-800 overflow-hidden"
                style={{ height: '700px' }}
              >
                {/* Sketchfab Iframe */}
                <iframe
                  key={iframeKey}
                  title={currentCar.name}
                  frameBorder="0"
                  allowFullScreen
                  mozallowfullscreen="true"
                  webkitallowfullscreen="true"
                  allow="autoplay; fullscreen; xr-spatial-tracking"
                  src={getSketchfabEmbedUrl(currentCar.sketchfabId)}
                  className="w-full h-full"
                />

                {/* Navigation Arrows */}
                <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between px-6 pointer-events-none">
                  <motion.button
                    onClick={handlePreviousCar}
                    disabled={isTransitioning}
                    className="pointer-events-auto w-14 h-14 bg-zinc-950/90 backdrop-blur-md border border-zinc-700 hover:border-red-600 flex items-center justify-center transition-all duration-300 hover:bg-red-600 disabled:opacity-50"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronLeft className="w-7 h-7 text-white" />
                  </motion.button>

                  <motion.button
                    onClick={handleNextCar}
                    disabled={isTransitioning}
                    className="pointer-events-auto w-14 h-14 bg-zinc-950/90 backdrop-blur-md border border-zinc-700 hover:border-red-600 flex items-center justify-center transition-all duration-300 hover:bg-red-600 disabled:opacity-50"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronRight className="w-7 h-7 text-white" />
                  </motion.button>
                </div>

                {/* Counter Badge */}
                <div className="absolute bottom-6 left-6 px-4 py-2 bg-zinc-950/90 backdrop-blur-md border border-zinc-700 rounded-full">
                  <span className="text-white text-sm font-bold" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    {currentCarIndex + 1} / {CAR_MODELS.length}
                  </span>
                </div>

                {/* Category Badge */}
                <div className="absolute top-6 right-6 px-4 py-2 bg-red-600/20 backdrop-blur-md border border-red-600/50 rounded-full">
                  <span className="text-red-400 text-xs font-bold tracking-wider uppercase" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    {currentCar.category}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Instructions */}
            <div className="mt-6 flex flex-wrap gap-4 justify-center lg:justify-start">
              <div className="flex items-center gap-2 text-zinc-500 text-sm">
                <RotateCw className="w-4 h-4" />
                <span>Click & drag to rotate</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-500 text-sm">
                <Maximize2 className="w-4 h-4" />
                <span>Scroll to zoom</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-500 text-sm">
                <Info className="w-4 h-4" />
                <span>Use arrow keys to navigate</span>
              </div>
            </div>
          </div>

          {/* VEHICLE DETAILS */}
          <div className="lg:col-span-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCarIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-zinc-900 border border-zinc-800 p-8 h-full"
              >
                {/* Header */}
                <div className="mb-8">
                  <h2 className="text-4xl font-black text-white mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    {currentCar.make}
                  </h2>
                  <h3 className="text-2xl font-bold text-zinc-400 mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    {currentCar.model}
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="text-zinc-500 text-sm">{currentCar.year}</span>
                    <div className="h-1 w-12 bg-red-600" />
                  </div>
                </div>

                {/* Price */}
                <div className="mb-8 pb-8 border-b border-zinc-800">
                  <div className="text-sm text-zinc-500 uppercase tracking-wider mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    Starting At
                  </div>
                  <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    ${currentCar.price.toLocaleString()}
                  </div>
                </div>

                {/* Description */}
                <p className="text-zinc-400 leading-relaxed mb-8">
                  {currentCar.description}
                </p>

                {/* Specs */}
                <div className="space-y-4 mb-8">
                  <h4 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    Specifications
                  </h4>
                  
                  {Object.entries(currentCar.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center pb-3 border-b border-zinc-800/50">
                      <span className="text-zinc-500 text-sm capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span className="text-white font-bold text-sm" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3">
                  <Link to="/contact" className="block">
                    <Button className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 rounded-none px-8 py-6 text-base font-bold border-b-4 border-red-900 hover:scale-105 transition-all duration-300" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      SCHEDULE TEST DRIVE
                    </Button>
                  </Link>
                  <Link to="/vehicles" className="block">
                    <Button variant="outline" className="w-full border-2 border-zinc-700 text-white hover:bg-zinc-800 hover:border-red-500 rounded-none px-8 py-6 text-base font-bold transition-all duration-300" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      VIEW FULL SPECS
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* QUICK GALLERY */}
      <section className="w-full bg-zinc-900 py-16 border-y border-zinc-800">
        <div className="max-w-[120rem] mx-auto px-6 sm:px-12 lg:px-24">
          <h3 className="text-2xl font-bold text-white mb-8" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            QUICK SELECT
          </h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {CAR_MODELS.map((car, index) => (
              <motion.button
                key={car.id}
                onClick={() => {
                  if (!isTransitioning) {
                    setIsTransitioning(true);
                    setCurrentCarIndex(index);
                    setIframeKey(prev => prev + 1);
                    setTimeout(() => setIsTransitioning(false), 800);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className={`group relative p-4 border transition-all duration-300 ${
                  currentCarIndex === index
                    ? 'border-red-600 bg-red-600/10'
                    : 'border-zinc-800 hover:border-zinc-700 bg-zinc-950'
                }`}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-left">
                  <div className={`text-xs font-bold mb-1 ${
                    currentCarIndex === index ? 'text-red-400' : 'text-zinc-500'
                  }`} style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    {car.make}
                  </div>
                  <div className={`text-sm font-bold line-clamp-2 ${
                    currentCarIndex === index ? 'text-white' : 'text-zinc-400 group-hover:text-white'
                  }`} style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    {car.model}
                  </div>
                </div>
                
                {currentCarIndex === index && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 to-orange-500"
                    layoutId="activeIndicator"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="w-full py-32 bg-zinc-950">
        <div className="max-w-[120rem] mx-auto px-6 sm:px-12 lg:px-24">
          <div className="text-center mb-20">
            <span className="text-red-500 text-sm font-bold tracking-[0.3em] uppercase mb-6 inline-block" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              // INTERACTIVE FEATURES
            </span>
            <h2 className="text-5xl font-black mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              IMMERSIVE <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">EXPLORATION</span>
            </h2>
            <p className="text-zinc-400 text-xl max-w-3xl mx-auto">
              Experience vehicles like never before with our cutting-edge 3D visualization
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: '🔄',
                title: '360° Rotation',
                desc: 'Full freedom to explore every angle and detail'
              },
              {
                icon: '🔍',
                title: 'Zoom Control',
                desc: 'Get close to examine craftsmanship up close'
              },
              {
                icon: '⚡',
                title: 'Real-Time Rendering',
                desc: 'Photorealistic 3D models with stunning detail'
              },
              {
                icon: '🎮',
                title: 'Intuitive Controls',
                desc: 'Mouse, touch, and keyboard navigation support'
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="group bg-zinc-900 border border-zinc-800 p-8 hover:border-red-600 transition-all duration-300"
              >
                <div className="text-5xl mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  {feature.title}
                </h3>
                <p className="text-zinc-400 text-sm">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="w-full py-32 bg-gradient-to-br from-zinc-900 to-zinc-950 border-t border-zinc-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Zap className="w-12 h-12 text-red-500 mx-auto mb-6" />
            <h2 className="text-5xl font-black mb-6 text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              READY TO EXPERIENCE<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">THE REAL THING?</span>
            </h2>
            <p className="text-xl text-zinc-300 mb-10 leading-relaxed max-w-2xl mx-auto">
              Schedule your test drive today and feel the power, precision, and luxury in person.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact">
                <Button className="bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 rounded-none px-12 py-7 text-lg font-bold border-b-4 border-red-900 hover:scale-105 transition-all duration-300" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  BOOK TEST DRIVE
                </Button>
              </Link>
              <Link to="/vehicles">
                <Button variant="outline" className="border-2 border-zinc-600 text-white hover:bg-zinc-800 hover:border-red-500 rounded-none px-12 py-7 text-lg font-bold transition-all duration-300" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  BROWSE INVENTORY
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}