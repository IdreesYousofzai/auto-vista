// PREMIUM 3D EXPERIENCE – ALIGNED WITH HOMEPAGE
import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  RotateCw,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Gauge,
  Shield,
  Rocket,
  ArrowUpRight
} from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Vehicles } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { Link } from 'react-router-dom';

/* -------------------------------- UTIL -------------------------------- */

const FadeIn = ({
  children,
  delay = 0,
  className = ''
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ----------------------------- MAIN PAGE ----------------------------- */

export default function Car3DExperiencePage() {
  const [vehicles, setVehicles] = useState<Vehicles[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [autoRotate, setAutoRotate] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await BaseCrudService.getAll<Vehicles>('vehicles');
        setVehicles(res.items);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const vehicle = vehicles[index];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 overflow-x-hidden">
      <Header />

      {/* ------------------------------ HERO ------------------------------ */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-40"
          >
            <source src="https://www.pexels.com/download/video/32098956/" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/40" />
        </div>

        <div className="relative z-10 max-w-[120rem] mx-auto px-6 sm:px-12 lg:px-24">
          <FadeIn>
            <span
              className="text-red-500 tracking-[0.35em] uppercase text-sm font-bold"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              // IMMERSIVE 3D EXPERIENCE
            </span>
            <h1
              className="text-6xl md:text-8xl font-black mt-6 mb-8 leading-[0.95]"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              STEP INSIDE
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                THE MACHINE
              </span>
            </h1>
            <p className="text-xl text-zinc-300 max-w-2xl">
              Rotate. Zoom. Explore. Experience every curve and contour in cinematic 3D —
              before you ever step inside.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ---------------------------- VIEWER ----------------------------- */}
      <section className="max-w-[120rem] mx-auto px-6 sm:px-12 lg:px-24 py-32">
        {loading ? (
          <p className="text-center text-zinc-400">Loading experience…</p>
        ) : !vehicle ? (
          <p className="text-center text-zinc-400">No vehicles available</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* 3D */}
            <FadeIn className="lg:col-span-2">
              <div className="relative border border-zinc-800 bg-zinc-900 overflow-hidden min-h-[600px]">
                <iframe
                  title="3D Vehicle"
                  src="https://sketchfab.com/models/f8141ecd755547989c9209784b71ad43/embed?autostart=1&preload=1"
                  className="w-full h-full min-h-[600px]"
                  allow="autoplay; fullscreen; xr-spatial-tracking"
                />

                {/* Controls */}
                <div className="absolute bottom-6 left-6 flex gap-3">
                  <button
                    onClick={() => setAutoRotate(!autoRotate)}
                    className="bg-red-600 text-white px-4 py-2 flex items-center gap-2 font-bold"
                  >
                    <RotateCw className="w-4 h-4" />
                    {autoRotate ? 'PAUSE' : 'ROTATE'}
                  </button>
                  <div className="bg-zinc-800 px-4 py-2 flex gap-3">
                    <ZoomIn className="w-4 h-4 text-white" />
                    <ZoomOut className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* DETAILS */}
            <FadeIn delay={0.2}>
              <div className="bg-zinc-900 border border-zinc-800 p-8 h-full flex flex-col">
                <Image
                  src={vehicle.mainImage}
                  alt={vehicle.model}
                  className="w-full h-48 object-cover mb-6"
                />

                <h2
                  className="text-3xl font-black mb-2"
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  {vehicle.make} {vehicle.model}
                </h2>
                <p className="text-zinc-400 mb-6">{vehicle.year}</p>

                <div className="space-y-4 text-sm mb-8">
                  <div className="flex justify-between border-b border-zinc-700 pb-2">
                    <span>Price</span>
                    <span className="text-red-400 font-bold">
                      ${vehicle.price?.toLocaleString()}
                    </span>
                  </div>
                  {vehicle.engineType && (
                    <div className="flex justify-between">
                      <span>Engine</span>
                      <span>{vehicle.engineType}</span>
                    </div>
                  )}
                  {vehicle.transmission && (
                    <div className="flex justify-between">
                      <span>Transmission</span>
                      <span>{vehicle.transmission}</span>
                    </div>
                  )}
                </div>

                <p className="text-zinc-400 text-sm mb-8">
                  {vehicle.description}
                </p>

                <div className="mt-auto flex gap-4">
                  <button
                    onClick={() =>
                      setIndex((i) => (i === 0 ? vehicles.length - 1 : i - 1))
                    }
                    className="flex-1 bg-zinc-800 hover:bg-red-600 transition py-3"
                  >
                    <ChevronLeft className="mx-auto" />
                  </button>
                  <button
                    onClick={() =>
                      setIndex((i) => (i === vehicles.length - 1 ? 0 : i + 1))
                    }
                    className="flex-1 bg-zinc-800 hover:bg-red-600 transition py-3"
                  >
                    <ChevronRight className="mx-auto" />
                  </button>
                </div>
              </div>
            </FadeIn>
          </div>
        )}
      </section>

      {/* ---------------------------- FEATURES ---------------------------- */}
      <section className="bg-zinc-900 py-32 border-y border-zinc-800">
        <div className="max-w-[120rem] mx-auto px-6 sm:px-12 lg:px-24">
          <FadeIn>
            <h2
              className="text-6xl font-black mb-16 text-center"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              BUILT FOR
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                &nbsp;CONTROL
              </span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: RotateCw, title: '360° Control' },
              { icon: Gauge, title: 'Precision Detail' },
              { icon: Shield, title: 'Interior View' },
              { icon: Rocket, title: 'Instant Access' }
            ].map((f, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-zinc-950 border border-zinc-800 p-8 hover:border-red-600 transition">
                  <f.icon className="w-8 h-8 text-red-500 mb-4" />
                  <h3
                    className="text-xl font-bold"
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                  >
                    {f.title}
                  </h3>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------- CTA ------------------------------ */}
      <section className="py-32 text-center">
        <FadeIn>
          <h2
            className="text-6xl font-black mb-8"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            READY TO
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
              FEEL IT FOR REAL?
            </span>
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto mb-12">
            Book a private consultation or explore the full collection today.
          </p>
          <div className="flex justify-center gap-6">
            <Link to="/contact">
              <Button className="bg-red-600 px-12 py-6 font-bold rounded-none">
                BOOK CONSULTATION
              </Button>
            </Link>
            <Link to="/vehicles">
              <Button variant="outline" className="px-12 py-6 rounded-none">
                VIEW COLLECTION
              </Button>
            </Link>
          </div>
        </FadeIn>
      </section>

      <Footer />
    </div>
  );
}
