import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Vehicles } from '@/entities';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicles[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicles[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMake, setSelectedMake] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  useEffect(() => {
    loadVehicles();
  }, []);

  useEffect(() => {
    filterVehicles();
  }, [searchTerm, selectedMake, priceRange, vehicles]);

  const loadVehicles = async () => {
    setIsLoading(true);
    try {
      const result = await BaseCrudService.getAll<Vehicles>('vehicles');
      setVehicles(result.items);
      setFilteredVehicles(result.items);
    } finally {
      setIsLoading(false);
    }
  };

  const filterVehicles = () => {
    let filtered = [...vehicles];

    if (searchTerm) {
      filtered = filtered.filter(v =>
        `${v.make} ${v.model}`.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedMake !== 'all') {
      filtered = filtered.filter(v => v.make === selectedMake);
    }

    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      filtered = filtered.filter(v => {
        const price = v.price || 0;
        return max ? price >= min && price <= max : price >= min;
      });
    }

    setFilteredVehicles(filtered);
  };

  const uniqueMakes = Array.from(new Set(vehicles.map(v => v.make).filter(Boolean)));

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 overflow-x-hidden" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Header />

      {/* HERO SECTION */}
      <section className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden bg-zinc-950">
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
        <div className="relative z-10 w-full max-w-[120rem] mx-auto px-4 sm:px-6 md:px-12 lg:px-24 py-12 sm:py-16 md:py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-3 mb-8 px-5 py-2.5 bg-red-600/10 border border-red-600/30 backdrop-blur-md rounded-full">
              <Filter className="w-4 h-4 text-red-400" />
              <span className="text-red-400 text-sm font-bold tracking-widest uppercase" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                // Premium Collection
              </span>
            </div>

            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.95] mb-8 text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              AVAILABLE
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-red-600">
                INVENTORY
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-zinc-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Hand-picked vehicles. Data-backed value. Zero compromises.
            </p>

            <div className="flex items-center justify-center gap-8 text-zinc-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-sm">{vehicles.length} Vehicles Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                <span className="text-sm">Updated Daily</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FILTER BAR */}
      <section className="sticky top-20 z-40 bg-zinc-950/95 backdrop-blur-xl border-y border-zinc-800 shadow-2xl">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 md:px-12 lg:px-24 py-4 sm:py-6">
          <div className="flex items-center gap-3 mb-4">
            <SlidersHorizontal className="w-5 h-5 text-red-500" />
            <span className="text-sm font-bold text-zinc-400 uppercase tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Filter Inventory
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 pointer-events-none" />
              <Input
                placeholder="Search make or model..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-12 bg-zinc-900 border-2 border-zinc-800 focus:border-red-600 text-white rounded-none h-14 text-base transition-colors"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              />
            </div>

            {/* Make Filter */}
            <select
              value={selectedMake}
              onChange={e => setSelectedMake(e.target.value)}
              className="bg-zinc-900 border-2 border-zinc-800 px-4 h-14 text-white focus:border-red-600 rounded-none cursor-pointer transition-colors text-base"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              <option value="all">All Makes</option>
              {uniqueMakes.map(make => (
                <option key={make} value={make}>
                  {make}
                </option>
              ))}
            </select>

            {/* Price Filter */}
            <select
              value={priceRange}
              onChange={e => setPriceRange(e.target.value)}
              className="bg-zinc-900 border-2 border-zinc-800 px-4 h-14 text-white focus:border-red-600 rounded-none cursor-pointer transition-colors text-base"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              <option value="all">All Price Ranges</option>
              <option value="0-50000">Under $50k</option>
              <option value="50000-100000">$50k – $100k</option>
              <option value="100000-200000">$100k – $200k</option>
              <option value="200000-999999">$200k+</option>
            </select>
          </div>

          {/* Active Filters Display */}
          {(searchTerm || selectedMake !== 'all' || priceRange !== 'all') && (
            <div className="mt-4 flex items-center gap-3 text-sm">
              <span className="text-zinc-500">Active filters:</span>
              {searchTerm && (
                <span className="px-3 py-1 bg-red-600/20 border border-red-600/50 text-red-400 rounded-full">
                  Search: {searchTerm}
                </span>
              )}
              {selectedMake !== 'all' && (
                <span className="px-3 py-1 bg-red-600/20 border border-red-600/50 text-red-400 rounded-full">
                  {selectedMake}
                </span>
              )}
              {priceRange !== 'all' && (
                <span className="px-3 py-1 bg-red-600/20 border border-red-600/50 text-red-400 rounded-full">
                  {priceRange === '0-50000' ? 'Under $50k' :
                   priceRange === '50000-100000' ? '$50k-$100k' :
                   priceRange === '100000-200000' ? '$100k-$200k' : '$200k+'}
                </span>
              )}
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedMake('all');
                  setPriceRange('all');
                }}
                className="ml-auto text-red-500 hover:text-red-400 font-semibold"
              >
                Clear All
              </button>
            </div>
          )}
        </div>
      </section>

      {/* RESULTS COUNT */}
      <section className="max-w-[120rem] mx-auto px-4 sm:px-6 md:px-12 lg:px-24 pt-8 sm:pt-12">
        <div className="flex items-center justify-between pb-6 border-b border-zinc-800">
          <div>
            <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              {filteredVehicles.length} {filteredVehicles.length === 1 ? 'Vehicle' : 'Vehicles'} Found
            </h2>
            <p className="text-sm text-zinc-500 mt-1">
              Showing all available inventory
            </p>
          </div>
        </div>
      </section>

      {/* VEHICLE GRID */}
      <section className="max-w-[120rem] mx-auto px-4 sm:px-6 md:px-12 lg:px-24 py-8 sm:py-12 pb-16 sm:pb-24">
        {isLoading ? (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-zinc-800 border-t-red-600 rounded-full animate-spin" />
          </div>
        ) : filteredVehicles.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVehicles.map((vehicle, idx) => (
              <motion.div
                key={vehicle._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.5 }}
              >
                <Link to={`/vehicles/${vehicle._id}`} className="group block h-full no-underline">
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="h-full bg-zinc-900 border border-zinc-800 overflow-hidden hover:border-red-600 hover:shadow-2xl hover:shadow-red-600/20 transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-zinc-950">
                      <Image
                        src={vehicle.mainImage}
                        alt={`${vehicle.make} ${vehicle.model}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      
                      {/* Overlay Badge */}
                      <div className="absolute top-4 right-4 px-3 py-1.5 bg-red-600/90 backdrop-blur-sm">
                        <span className="text-white text-xs font-bold uppercase tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                          Available
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col">
                      {/* Title */}
                      <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-red-400 transition-colors" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                        {vehicle.make}
                      </h3>
                      <h4 className="text-xl font-bold mb-4 text-zinc-400" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                        {vehicle.model}
                      </h4>

                      {/* Stats */}
                      <div className="flex items-center gap-4 mb-6 text-sm text-zinc-500">
                        <span>{vehicle.year}</span>
                        <span>•</span>
                        <span>{vehicle.mileage?.toLocaleString()} mi</span>
                      </div>

                      {/* Price & CTA */}
                      <div className="mt-auto pt-6 border-t border-zinc-800 flex items-center justify-between">
                        <div>
                          <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                            Starting at
                          </div>
                          <div className="text-3xl font-black text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                            ${vehicle.price?.toLocaleString()}
                          </div>
                        </div>
                        <div className="w-12 h-12 bg-zinc-800 group-hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:shadow-red-600/50">
                          <ArrowRight className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-zinc-600" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                No Vehicles Found
              </h3>
              <p className="text-zinc-400 mb-8">
                Try adjusting your filters or search criteria
              </p>
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedMake('all');
                  setPriceRange('all');
                }}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-none"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                Clear Filters
              </Button>
            </div>
          </div>
        )}
      </section>

      {/* CTA SECTION */}
      <section className="w-full bg-zinc-900 py-16 sm:py-24 border-t border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-black mb-6 text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              CAN'T FIND<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                WHAT YOU'RE LOOKING FOR?
              </span>
            </h2>
            <p className="text-xl text-zinc-300 mb-10 leading-relaxed max-w-2xl mx-auto">
              Our team can help you find the perfect vehicle. Let us know what you're after.
            </p>
            <Link to="/contact">
              <Button className="bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 rounded-none px-12 py-7 text-lg font-bold border-b-4 border-red-900 hover:scale-105 transition-all duration-300" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                CONTACT OUR TEAM
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}