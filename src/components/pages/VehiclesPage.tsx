import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
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
    <div className="min-h-screen bg-zinc-950 text-zinc-100 overflow-x-hidden">
      <Header />

      {/* HERO */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-red-600/20 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-600/20 blur-[120px]" />

        <div className="relative max-w-[120rem] mx-auto px-6 sm:px-12 lg:px-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span
              className="inline-block mb-6 text-red-500 text-sm font-bold tracking-[0.3em] uppercase"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              // OUR FLEET
            </span>

            <h1
              className="text-6xl md:text-7xl font-black mb-8"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              PERFORMANCE
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                INVENTORY
              </span>
            </h1>

            <p className="text-zinc-400 text-xl max-w-3xl mx-auto">
              Hand-selected premium vehicles engineered for power, precision,
              and long-term value.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FILTER BAR */}
      <section className="sticky top-20 z-40 bg-zinc-950/90 backdrop-blur-md border-y border-zinc-800">
        <div className="max-w-[120rem] mx-auto px-6 sm:px-12 lg:px-24 py-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <Input
              placeholder="Search make or model"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10 bg-zinc-900 border border-zinc-800 focus:border-red-500 text-white rounded-none"
            />
          </div>

          <select
            value={selectedMake}
            onChange={e => setSelectedMake(e.target.value)}
            className="bg-zinc-900 border border-zinc-800 px-4 py-2 text-white focus:border-red-500 rounded-none"
          >
            <option value="all">All Makes</option>
            {uniqueMakes.map(make => (
              <option key={make} value={make}>
                {make}
              </option>
            ))}
          </select>

          <select
            value={priceRange}
            onChange={e => setPriceRange(e.target.value)}
            className="bg-zinc-900 border border-zinc-800 px-4 py-2 text-white focus:border-red-500 rounded-none"
          >
            <option value="all">All Prices</option>
            <option value="0-30000">Under $30k</option>
            <option value="30000-50000">$30k–$50k</option>
            <option value="50000-75000">$50k–$75k</option>
            <option value="75000-999999">$75k+</option>
          </select>
        </div>
      </section>

      {/* VEHICLE GRID */}
      <section className="max-w-[120rem] mx-auto px-6 sm:px-12 lg:px-24 py-24">
        {isLoading ? null : filteredVehicles.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVehicles.map((vehicle, idx) => (
              <motion.div
                key={vehicle._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Link to={`/vehicles/${vehicle._id}`} className="group block h-full">
                  <motion.div
                    whileHover={{ y: -10 }}
                    className="h-full bg-zinc-900 border border-zinc-800 overflow-hidden transition-all duration-300 group-hover:border-red-600"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={vehicle.mainImage}
                        alt={`${vehicle.make} ${vehicle.model}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>

                    <div className="p-6 flex flex-col h-full">
                      <h3
                        className="text-2xl font-bold mb-2 group-hover:text-red-400 transition-colors"
                        style={{ fontFamily: 'Orbitron, sans-serif' }}
                      >
                        {vehicle.make} {vehicle.model}
                      </h3>

                      <p className="text-sm text-zinc-400 mb-4">
                        {vehicle.year} • {vehicle.mileage?.toLocaleString()} miles
                      </p>

                      <div className="mt-auto flex items-center justify-between pt-4 border-t border-zinc-800">
                        <span
                          className="text-3xl font-black text-white"
                          style={{ fontFamily: 'Orbitron, sans-serif' }}
                        >
                          ${vehicle.price?.toLocaleString()}
                        </span>
                        <span className="text-sm text-red-500 font-bold uppercase tracking-wider">
                          View →
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center text-zinc-400 py-20">
            No vehicles match your criteria.
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
