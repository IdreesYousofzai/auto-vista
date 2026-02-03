import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Info
} from 'lucide-react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';

import { BaseCrudService } from '@/integrations';
import { Vehicles } from '@/entities';

/* --------------------------------------------------------
   Types
-------------------------------------------------------- */

interface VehicleWith3D extends Vehicles {
  sketchfabUrl?: string;
}

/* --------------------------------------------------------
   Page
-------------------------------------------------------- */

export default function Car3DExperiencePage() {
  const [vehicles, setVehicles] = useState<VehicleWith3D[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const [autoRotate, setAutoRotate] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(5);
  const [viewMode, setViewMode] = useState<'exterior' | 'interior'>('exterior');

  /* --------------------------------------------------------
     Load vehicles
  -------------------------------------------------------- */

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await BaseCrudService.getAll<Vehicles>('vehicles');
        setVehicles(res.items as VehicleWith3D[]);
      } catch (err) {
        console.error('Failed to load vehicles', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const vehicle = vehicles[index];

  /* --------------------------------------------------------
     Navigation
  -------------------------------------------------------- */

  const prev = () =>
    setIndex((i) => (i === 0 ? vehicles.length - 1 : i - 1));

  const next = () =>
    setIndex((i) => (i === vehicles.length - 1 ? 0 : i + 1));

  /* --------------------------------------------------------
     Render
  -------------------------------------------------------- */

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* ----------------------------------------------------
         HERO
      ---------------------------------------------------- */}
      <section className="relative overflow-hidden bg-gradient-to-br from-backgrounddark via-backgrounddark to-primary/10 py-24 lg:py-32">
        <div className="absolute inset-0 opacity-25">
          <div className="absolute right-0 top-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute left-0 bottom-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-[120rem] mx-auto px-6 sm:px-12 lg:px-24 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-heading text-5xl lg:text-7xl font-bold text-white mb-6"
          >
            3D Car <br />
            <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              Experience
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-paragraph text-lg text-white/70 max-w-3xl mx-auto"
          >
            Rotate, zoom, and explore every vehicle in immersive 3D — just like
            standing in the showroom.
          </motion.p>
        </div>
      </section>

      {/* ----------------------------------------------------
         MAIN CONTENT
      ---------------------------------------------------- */}
      <section className="max-w-[120rem] mx-auto px-6 sm:px-12 lg:px-24 py-20">
        {loading ? (
          <div className="text-center py-32 text-secondary/60">
            Loading 3D experience…
          </div>
        ) : vehicles.length === 0 ? (
          <div className="text-center py-32 text-secondary/60">
            No vehicles available
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* ------------------ 3D VIEWER ------------------ */}
            <div className="lg:col-span-2">
              <div className="relative bg-black border border-secondary/20 overflow-hidden min-h-[620px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={vehicle?.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0"
                  >
                    {vehicle?.sketchfabUrl ? (
                      <iframe
                        title={`${vehicle.make} ${vehicle.model} 3D`}
                        src={`${vehicle.sketchfabUrl}?autostart=1&preload=1&ui_theme=dark`}
                        className="w-full h-full"
                        frameBorder={0}
                        allow="autoplay; fullscreen; xr-spatial-tracking"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-secondary/60">
                        3D model not available
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Controls */}
                <div className="absolute bottom-6 left-6 flex flex-wrap gap-3">
                  <button
                    onClick={() => setAutoRotate(!autoRotate)}
                    className="bg-primary text-white px-4 py-2 flex items-center gap-2"
                  >
                    <RotateCw className="w-4 h-4" />
                    {autoRotate ? 'Pause' : 'Rotate'}
                  </button>

                  <button
                    onClick={() => setZoomLevel((z) => Math.max(2, z - 1))}
                    className="bg-secondary text-white px-3 py-2"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setZoomLevel((z) => Math.min(15, z + 1))}
                    className="bg-secondary text-white px-3 py-2"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>

                  <button className="bg-secondary text-white px-3 py-2">
                    <Info className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* View Mode */}
              <div className="mt-6 flex gap-4">
                {(['exterior', 'interior'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`flex-1 py-3 font-semibold transition ${
                      viewMode === mode
                        ? 'bg-primary text-white'
                        : 'bg-secondary/10 hover:bg-secondary/20'
                    }`}
                  >
                    {mode === 'exterior' ? 'Exterior View' : 'Interior View'}
                  </button>
                ))}
              </div>
            </div>

            {/* ------------------ DETAILS ------------------ */}
            <div className="space-y-6">
              <div className="aspect-[4/3] border border-secondary/20 overflow-hidden">
                <Image
                  src={
                    vehicle.mainImage ||
                    'https://static.wixstatic.com/media/cec0c1_80c6fdf44d2543dda360a624430998d3~mv2.png'
                  }
                  alt={`${vehicle.make} ${vehicle.model}`}
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="bg-backgrounddark p-6 border border-secondary/20">
                <h2 className="font-heading text-3xl text-secondary-foreground">
                  {vehicle.make} {vehicle.model}
                </h2>
                <p className="text-secondary-foreground/60 mb-6">
                  {vehicle.year}
                </p>

                <div className="space-y-3 text-sm">
                  {vehicle.price && (
                    <div className="flex justify-between">
                      <span>Price</span>
                      <span className="text-primary font-bold">
                        ${vehicle.price.toLocaleString()}
                      </span>
                    </div>
                  )}

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

                {vehicle.description && (
                  <p className="mt-6 text-secondary-foreground/70 text-sm">
                    {vehicle.description}
                  </p>
                )}

                {/* Navigation */}
                <div className="mt-8 flex gap-3">
                  <button
                    onClick={prev}
                    className="flex-1 bg-secondary text-white py-3 flex items-center justify-center"
                  >
                    <ChevronLeft />
                  </button>
                  <button
                    onClick={next}
                    className="flex-1 bg-secondary text-white py-3 flex items-center justify-center"
                  >
                    <ChevronRight />
                  </button>
                </div>

                <p className="mt-3 text-center text-xs text-secondary-foreground/50">
                  {index + 1} of {vehicles.length}
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ----------------------------------------------------
         CTA
      ---------------------------------------------------- */}
      <section className="bg-primary py-24 text-center">
        <h2 className="font-heading text-4xl lg:text-5xl text-primary-foreground mb-6">
          Ready to Take a Test Drive?
        </h2>
        <p className="text-primary-foreground/90 mb-10 max-w-2xl mx-auto">
          See it in 3D, feel it in real life.
        </p>
        <a href="/contact">
          <Button className="bg-secondary text-secondary-foreground px-10 py-6">
            Schedule Test Drive
          </Button>
        </a>
      </section>

      <Footer />
    </div>
  );
}
