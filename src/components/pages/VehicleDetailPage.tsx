import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { Vehicles } from '@/entities';
import { BaseCrudService } from '@/integrations';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Award,
  Calendar,
  Fuel,
  Gauge,
  Mail,
  Palette,
  Phone,
  Settings,
  Shield,
  Zap
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function VehicleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [vehicle, setVehicle] = useState<Vehicles | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadVehicle();
  }, [id]);

  const loadVehicle = async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const data = await BaseCrudService.getById<Vehicles>('vehicles', id);
      setVehicle(data);
    } catch (error) {
      console.error('Error loading vehicle:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950">
        <Header />
        <div className="flex items-center justify-center min-h-[600px]">
          <div className="text-center">
            <div className="inline-block w-16 h-16 border-4 border-zinc-800 border-t-red-600 rounded-full animate-spin mb-4" />
            <p className="text-zinc-400" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Loading Vehicle...
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-zinc-950">
        <Header />
        <div className="flex items-center justify-center min-h-[600px]">
          <div className="text-center max-w-md">
            <h2 className="text-3xl font-black text-white mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              VEHICLE NOT FOUND
            </h2>
            <p className="text-zinc-400 mb-8">
              The vehicle you're looking for doesn't exist or has been sold.
            </p>
            <Link to="/vehicles">
              <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-none" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                BACK TO INVENTORY
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Header />

      {/* BACK BUTTON */}
      <div className="w-full max-w-[120rem] mx-auto px-6 sm:px-12 lg:px-24 pt-8">
        <Link
          to="/vehicles"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-semibold" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            BACK TO INVENTORY
          </span>
        </Link>
      </div>

      {/* HERO IMAGE & DETAILS */}
      <section className="w-full max-w-[120rem] mx-auto px-6 sm:px-12 lg:px-24 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[4/3] bg-zinc-900 border border-zinc-800 overflow-hidden">
              <Image
                src={vehicle.mainImage || 'https://static.wixstatic.com/media/cec0c1_5b45e47791214e1fbc7fa54c930bf5b3~mv2.png?originWidth=1152&originHeight=896'}
                alt={`${vehicle.make} ${vehicle.model}`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Status Badge */}
            <div className="absolute top-6 right-6 px-4 py-2 bg-emerald-600 backdrop-blur-sm">
              <span className="text-white text-sm font-bold uppercase tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                Available Now
              </span>
            </div>
          </motion.div>

          {/* DETAILS */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col"
          >
            {/* Header */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-600/10 border border-red-600/30 rounded-full mb-6">
                <Award className="w-4 h-4 text-red-400" />
                <span className="text-red-400 text-xs font-bold uppercase tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  Premium Selection
                </span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-black text-white mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                {vehicle.make}
              </h1>
              <h2 className="text-3xl font-bold text-zinc-400 mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                {vehicle.model}
              </h2>

              <div className="flex items-center gap-4 text-zinc-500 mb-8">
                <span className="text-lg">{vehicle.year}</span>
                <div className="w-1 h-1 bg-zinc-700 rounded-full" />
                <span className="text-lg">{vehicle.mileage?.toLocaleString()} miles</span>
              </div>

              {/* Racing Stripe */}
              <div className="h-1 w-24 bg-gradient-to-r from-red-600 to-orange-500 mb-8" />
            </div>

            {/* Price */}
            <div className="mb-8 pb-8 border-b border-zinc-800">
              <div className="text-sm text-zinc-500 uppercase tracking-wider mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                Your Price
              </div>
              <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                ${vehicle.price?.toLocaleString()}
              </div>
            </div>

            {/* Description */}
            {vehicle.description && (
              <div className="mb-8">
                <p className="text-zinc-300 leading-relaxed text-lg">
                  {vehicle.description}
                </p>
              </div>
            )}

            {/* Key Features */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {vehicle.engineType && (
                <div className="bg-zinc-900 border border-zinc-800 p-4 text-center">
                  <Zap className="w-6 h-6 text-red-500 mx-auto mb-2" />
                  <div className="text-xs text-zinc-500 uppercase mb-1">Engine</div>
                  <div className="text-sm font-bold text-white">{vehicle.engineType}</div>
                </div>
              )}
              {vehicle.transmission && (
                <div className="bg-zinc-900 border border-zinc-800 p-4 text-center">
                  <Settings className="w-6 h-6 text-red-500 mx-auto mb-2" />
                  <div className="text-xs text-zinc-500 uppercase mb-1">Trans</div>
                  <div className="text-sm font-bold text-white">{vehicle.transmission}</div>
                </div>
              )}
              <div className="bg-zinc-900 border border-zinc-800 p-4 text-center">
                <Shield className="w-6 h-6 text-red-500 mx-auto mb-2" />
                <div className="text-xs text-zinc-500 uppercase mb-1">Warranty</div>
                <div className="text-sm font-bold text-white">Included</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-4 mt-auto">
              <Link to="/contact" className="block">
                <Button className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 rounded-none px-8 py-7 text-lg font-bold border-b-4 border-red-900 hover:scale-[1.02] transition-all duration-300" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  SCHEDULE TEST DRIVE
                </Button>
              </Link>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="border-2 border-zinc-700 text-white hover:bg-zinc-800 hover:border-red-500 rounded-none px-6 py-6 text-base font-bold transition-all duration-300"
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  CALL US
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-zinc-700 text-white hover:bg-zinc-800 hover:border-red-500 rounded-none px-6 py-6 text-base font-bold transition-all duration-300"
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  <Mail className="w-5 h-5 mr-2" />
                  EMAIL
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SPECIFICATIONS */}
      <section className="w-full bg-zinc-900 py-20 border-y border-zinc-800">
        <div className="max-w-[120rem] mx-auto px-6 sm:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-black text-white mb-12" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              SPECIFICATIONS
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Year */}
              {vehicle.year && (
                <div className="flex items-start gap-4 p-6 bg-zinc-950 border border-zinc-800">
                  <div className="w-12 h-12 bg-red-600/10 border border-red-600/30 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-500 uppercase tracking-wider mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      Year
                    </div>
                    <div className="text-2xl font-bold text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      {vehicle.year}
                    </div>
                  </div>
                </div>
              )}

              {/* Mileage */}
              {vehicle.mileage && (
                <div className="flex items-start gap-4 p-6 bg-zinc-950 border border-zinc-800">
                  <div className="w-12 h-12 bg-red-600/10 border border-red-600/30 flex items-center justify-center flex-shrink-0">
                    <Gauge className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-500 uppercase tracking-wider mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      Mileage
                    </div>
                    <div className="text-2xl font-bold text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      {vehicle.mileage.toLocaleString()}
                    </div>
                    <div className="text-xs text-zinc-500 mt-1">miles</div>
                  </div>
                </div>
              )}

              {/* Engine */}
              {vehicle.engineType && (
                <div className="flex items-start gap-4 p-6 bg-zinc-950 border border-zinc-800">
                  <div className="w-12 h-12 bg-red-600/10 border border-red-600/30 flex items-center justify-center flex-shrink-0">
                    <Fuel className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-500 uppercase tracking-wider mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      Engine
                    </div>
                    <div className="text-2xl font-bold text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      {vehicle.engineType}
                    </div>
                  </div>
                </div>
              )}

              {/* Transmission */}
              {vehicle.transmission && (
                <div className="flex items-start gap-4 p-6 bg-zinc-950 border border-zinc-800">
                  <div className="w-12 h-12 bg-red-600/10 border border-red-600/30 flex items-center justify-center flex-shrink-0">
                    <Settings className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-500 uppercase tracking-wider mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      Transmission
                    </div>
                    <div className="text-2xl font-bold text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      {vehicle.transmission}
                    </div>
                  </div>
                </div>
              )}

              {/* Exterior Color */}
              {vehicle.exteriorColor && (
                <div className="flex items-start gap-4 p-6 bg-zinc-950 border border-zinc-800">
                  <div className="w-12 h-12 bg-red-600/10 border border-red-600/30 flex items-center justify-center flex-shrink-0">
                    <Palette className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-500 uppercase tracking-wider mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      Exterior
                    </div>
                    <div className="text-2xl font-bold text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      {vehicle.exteriorColor}
                    </div>
                  </div>
                </div>
              )}

              {/* Interior Color */}
              {vehicle.interiorColor && (
                <div className="flex items-start gap-4 p-6 bg-zinc-950 border border-zinc-800">
                  <div className="w-12 h-12 bg-red-600/10 border border-red-600/30 flex items-center justify-center flex-shrink-0">
                    <Palette className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-500 uppercase tracking-wider mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      Interior
                    </div>
                    <div className="text-2xl font-bold text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      {vehicle.interiorColor}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES & BENEFITS */}
      <section className="w-full py-20 bg-zinc-950">
        <div className="max-w-[120rem] mx-auto px-6 sm:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-black text-white mb-12" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              WHY <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">VELOCITY?</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-zinc-900 border border-zinc-800 p-8 hover:border-red-600 transition-colors">
                <Shield className="w-10 h-10 text-red-500 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  Comprehensive Warranty
                </h3>
                <p className="text-zinc-400">
                  Every vehicle includes our industry-leading protection plan
                </p>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 p-8 hover:border-red-600 transition-colors">
                <Award className="w-10 h-10 text-red-500 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  Certified Quality
                </h3>
                <p className="text-zinc-400">
                  Rigorous inspection process ensures top condition
                </p>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 p-8 hover:border-red-600 transition-colors">
                <Zap className="w-10 h-10 text-red-500 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  Premium Service
                </h3>
                <p className="text-zinc-400">
                  24/7 support and white-glove delivery available
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="w-full bg-gradient-to-br from-zinc-900 to-zinc-950 py-24 border-t border-zinc-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl font-black mb-6 text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              READY TO<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                MAKE IT YOURS?
              </span>
            </h2>
            <p className="text-xl text-zinc-300 mb-10 leading-relaxed max-w-2xl mx-auto">
              Experience this {vehicle.make} {vehicle.model} in person. Schedule your test drive today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact">
                <Button className="bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 rounded-none px-12 py-7 text-lg font-bold border-b-4 border-red-900 hover:scale-105 transition-all duration-300" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  BOOK TEST DRIVE
                </Button>
              </Link>
              <Link to="/vehicles">
                <Button variant="outline" className="border-2 border-zinc-600 text-white hover:bg-zinc-800 hover:border-red-500 rounded-none px-12 py-7 text-lg font-bold transition-all duration-300" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  VIEW MORE VEHICLES
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
