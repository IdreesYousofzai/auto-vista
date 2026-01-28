import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal } from 'lucide-react';
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
    } catch (error) {
      console.error('Error loading vehicles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterVehicles = () => {
    let filtered = [...vehicles];

    if (searchTerm) {
      filtered = filtered.filter(v => 
        v.make?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.model?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedMake !== 'all') {
      filtered = filtered.filter(v => v.make === selectedMake);
    }

    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      filtered = filtered.filter(v => {
        const price = v.price || 0;
        if (max) {
          return price >= min && price <= max;
        }
        return price >= min;
      });
    }

    setFilteredVehicles(filtered);
  };

  const uniqueMakes = Array.from(new Set(vehicles.map(v => v.make).filter(Boolean)));

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-backgrounddark via-backgrounddark to-primary/10 py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-[120rem] mx-auto px-6 sm:px-12 lg:px-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div 
              className="inline-block mb-6"
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="h-1 w-12 bg-primary" />
            </motion.div>
            <h1 className="font-heading text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Premium Vehicle <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Inventory</span>
            </h1>
            <p className="font-paragraph text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
              Explore our curated collection of premium vehicles engineered for performance, luxury, and innovation
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="w-full border-b border-secondary/5 bg-background sticky top-20 z-40 backdrop-blur-md bg-background/95">
        <div className="max-w-[120rem] mx-auto px-6 sm:px-12 lg:px-24 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div 
              className="relative"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary/50" />
              <Input
                type="text"
                placeholder="Search by make or model..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-2 border-secondary/10 focus:border-primary rounded-lg transition-colors"
              />
            </motion.div>

            <motion.select
              value={selectedMake}
              onChange={(e) => setSelectedMake(e.target.value)}
              className="px-4 py-2 border-2 border-secondary/10 focus:border-primary focus:outline-none font-paragraph text-base rounded-lg transition-colors"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <option value="all">All Makes</option>
              {uniqueMakes.map(make => (
                <option key={make} value={make}>{make}</option>
              ))}
            </motion.select>

            <motion.select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="px-4 py-2 border-2 border-secondary/10 focus:border-primary focus:outline-none font-paragraph text-base rounded-lg transition-colors"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <option value="all">All Prices</option>
              <option value="0-30000">Under $30,000</option>
              <option value="30000-50000">$30,000 - $50,000</option>
              <option value="50000-75000">$50,000 - $75,000</option>
              <option value="75000-999999">$75,000+</option>
            </motion.select>
          </div>
        </div>
      </section>

      {/* Vehicles Grid */}
      <section className="w-full max-w-[120rem] mx-auto px-6 sm:px-12 lg:px-24 py-20 min-h-[600px]">
        {isLoading ? null : filteredVehicles.length > 0 ? (
          <motion.div
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredVehicles.map((vehicle, idx) => (
              <motion.div
                key={vehicle._id}
                variants={fadeInUp}
                transition={{ delay: idx * 0.1 }}
              >
                <Link to={`/vehicles/${vehicle._id}`} className="group block h-full">
                  <motion.div 
                    className="border border-secondary/10 hover:border-primary transition-all duration-300 overflow-hidden h-full flex flex-col bg-white hover:shadow-xl hover:shadow-primary/10"
                    whileHover={{ y: -8 }}
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-backgrounddark relative">
                      <Image
                        src={vehicle.mainImage || 'https://static.wixstatic.com/media/cec0c1_80c6fdf44d2543dda360a624430998d3~mv2.png?originWidth=768&originHeight=576'}
                        alt={`${vehicle.make} ${vehicle.model}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="font-heading text-2xl font-bold text-secondary mb-2 group-hover:text-primary transition-colors">
                        {vehicle.make} {vehicle.model}
                      </h3>
                      <p className="font-paragraph text-sm text-secondary/60 mb-4">
                        {vehicle.year} • {vehicle.mileage?.toLocaleString()} miles
                      </p>
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-secondary/10">
                        <span className="font-heading text-2xl font-bold text-primary">
                          ${vehicle.price?.toLocaleString()}
                        </span>
                        <span className="font-paragraph text-sm text-secondary group-hover:text-primary transition-colors font-semibold">
                          View Details →
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <p className="font-paragraph text-lg text-secondary/60">
              No vehicles found matching your criteria
            </p>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
