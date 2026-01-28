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
      <section className="w-full bg-backgrounddark py-16 lg:py-24">
        <div className="max-w-[100rem] mx-auto px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-heading text-5xl lg:text-6xl text-secondary-foreground mb-6">
              Our Vehicle Inventory
            </h1>
            <p className="font-paragraph text-lg text-secondary-foreground/80 max-w-3xl mx-auto">
              Discover premium vehicles with cutting-edge technology and exceptional performance
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="w-full border-b border-secondary/10 bg-background sticky top-20 z-40">
        <div className="max-w-[100rem] mx-auto px-8 lg:px-16 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary/50" />
              <Input
                type="text"
                placeholder="Search by make or model..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-2 border-secondary/20 focus:border-primary"
              />
            </div>

            <select
              value={selectedMake}
              onChange={(e) => setSelectedMake(e.target.value)}
              className="px-4 py-2 border-2 border-secondary/20 focus:border-primary focus:outline-none font-paragraph text-base"
            >
              <option value="all">All Makes</option>
              {uniqueMakes.map(make => (
                <option key={make} value={make}>{make}</option>
              ))}
            </select>

            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="px-4 py-2 border-2 border-secondary/20 focus:border-primary focus:outline-none font-paragraph text-base"
            >
              <option value="all">All Prices</option>
              <option value="0-30000">Under $30,000</option>
              <option value="30000-50000">$30,000 - $50,000</option>
              <option value="50000-75000">$50,000 - $75,000</option>
              <option value="75000-999999">$75,000+</option>
            </select>
          </div>
        </div>
      </section>

      {/* Vehicles Grid */}
      <section className="w-full max-w-[100rem] mx-auto px-8 lg:px-16 py-16 min-h-[600px]">
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
                <Link to={`/vehicles/${vehicle._id}`} className="group block">
                  <div className="border-2 border-secondary/10 hover:border-primary transition-all duration-300 overflow-hidden">
                    <div className="aspect-[4/3] overflow-hidden bg-backgrounddark">
                      <Image
                        src={vehicle.mainImage || 'https://static.wixstatic.com/media/cec0c1_80c6fdf44d2543dda360a624430998d3~mv2.png?originWidth=768&originHeight=576'}
                        alt={`${vehicle.make} ${vehicle.model}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6 bg-background">
                      <h3 className="font-heading text-2xl text-secondary mb-2">
                        {vehicle.make} {vehicle.model}
                      </h3>
                      <p className="font-paragraph text-sm text-secondary/60 mb-4">
                        {vehicle.year} • {vehicle.mileage?.toLocaleString()} miles
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-heading text-3xl text-primary">
                          ${vehicle.price?.toLocaleString()}
                        </span>
                        <span className="font-paragraph text-sm text-secondary group-hover:text-primary transition-colors">
                          View Details →
                        </span>
                      </div>
                    </div>
                  </div>
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
