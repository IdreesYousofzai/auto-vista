import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { ServicesandProducts } from '@/entities';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ServicesPage() {
  const [services, setServices] = useState<ServicesandProducts[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    setIsLoading(true);
    try {
      const result = await BaseCrudService.getAll<ServicesandProducts>('servicesandproducts');
      setServices(result.items);
    } catch (error) {
      console.error('Error loading services:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const categories = Array.from(new Set(services.map(s => s.category).filter(Boolean)));
  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(s => s.category === selectedCategory);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 overflow-x-hidden">
      <Header />

      {/* Hero Section */}
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
              // ELITE SERVICES
            </span>

            <h1
              className="text-6xl md:text-7xl font-black mb-8"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              PREMIUM
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                OFFERINGS
              </span>
            </h1>

            <p className="text-zinc-400 text-xl max-w-3xl mx-auto">
              Concierge-level services engineered for the discerning automotive enthusiast
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      {categories.length > 0 && (
        <section className="sticky top-20 z-40 bg-zinc-950/90 backdrop-blur-md border-y border-zinc-800">
          <div className="max-w-[120rem] mx-auto px-6 sm:px-12 lg:px-24 py-6">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-6 py-2 text-sm font-bold tracking-wider transition-all rounded-none border ${
                  selectedCategory === 'all'
                    ? 'bg-red-600 text-white border-red-600'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-red-500 hover:text-white'
                }`}
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                All Services
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category!)}
                  className={`px-6 py-2 text-sm font-bold tracking-wider transition-all rounded-none border ${
                    selectedCategory === category
                      ? 'bg-red-600 text-white border-red-600'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-red-500 hover:text-white'
                  }`}
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Services Grid */}
      <section className="max-w-[120rem] mx-auto px-6 sm:px-12 lg:px-24 py-24">
        {isLoading ? null : filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service, idx) => (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <motion.div
                  whileHover={{ y: -10 }}
                  className="h-full bg-zinc-900 border border-zinc-800 overflow-hidden transition-all duration-300 hover:border-red-600 flex flex-col"
                >
                  {service.image && (
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.name || 'Service'}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>
                  )}

                  <div className="p-6 flex flex-col flex-grow">
                    {service.category && (
                      <span
                        className="inline-block px-3 py-1 bg-red-600/20 text-red-400 text-xs font-bold tracking-widest mb-3 w-fit"
                        style={{ fontFamily: 'Orbitron, sans-serif' }}
                      >
                        {service.category}
                      </span>
                    )}
                    <h3
                      className="text-2xl font-bold mb-3 group-hover:text-red-400 transition-colors"
                      style={{ fontFamily: 'Orbitron, sans-serif' }}
                    >
                      {service.name}
                    </h3>

                    {service.description && (
                      <p className="text-sm text-zinc-400 mb-4 flex-grow">
                        {service.description}
                      </p>
                    )}

                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-zinc-800">
                      {service.price && (
                        <span
                          className="text-3xl font-black text-white"
                          style={{ fontFamily: 'Orbitron, sans-serif' }}
                        >
                          ${service.price.toLocaleString()}
                        </span>
                      )}
                      {service.callToActionUrl && (
                        <a
                          href={service.callToActionUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-red-500 font-bold uppercase tracking-wider hover:text-red-400 transition-colors flex items-center gap-2"
                        >
                          Learn More <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center text-zinc-400 py-20">
            No services match your criteria.
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
