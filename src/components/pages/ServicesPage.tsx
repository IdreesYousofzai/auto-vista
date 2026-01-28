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
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-primary py-16 lg:py-24">
        <div className="max-w-[100rem] mx-auto px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-heading text-5xl lg:text-6xl text-primary-foreground mb-6">
              Services & Products
            </h1>
            <p className="font-paragraph text-lg text-primary-foreground/90 max-w-3xl mx-auto">
              Comprehensive automotive solutions designed to enhance your driving experience
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      {categories.length > 0 && (
        <section className="w-full border-b border-secondary/10 bg-background">
          <div className="max-w-[100rem] mx-auto px-8 lg:px-16 py-6">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-6 py-2 font-paragraph text-base transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background border-2 border-secondary/20 text-secondary hover:border-primary'
                }`}
              >
                All Services
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category!)}
                  className={`px-6 py-2 font-paragraph text-base transition-all ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background border-2 border-secondary/20 text-secondary hover:border-primary'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Services Grid */}
      <section className="w-full max-w-[100rem] mx-auto px-8 lg:px-16 py-16 min-h-[600px]">
        {isLoading ? null : filteredServices.length > 0 ? (
          <motion.div
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredServices.map((service, idx) => (
              <motion.div
                key={service._id}
                variants={fadeInUp}
                transition={{ delay: idx * 0.1 }}
                className="border-2 border-secondary/10 hover:border-primary transition-all duration-300 overflow-hidden bg-background"
              >
                {service.image && (
                  <div className="aspect-[16/10] overflow-hidden bg-backgrounddark">
                    <Image
                      src={service.image}
                      alt={service.name || 'Service'}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-6">
                  {service.category && (
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary font-paragraph text-xs mb-3">
                      {service.category}
                    </span>
                  )}
                  <h3 className="font-heading text-2xl text-secondary mb-3">
                    {service.name}
                  </h3>
                  {service.description && (
                    <p className="font-paragraph text-base text-secondary/70 mb-4 line-clamp-3">
                      {service.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between mt-6">
                    {service.price && (
                      <span className="font-heading text-2xl text-primary">
                        ${service.price.toLocaleString()}
                      </span>
                    )}
                    {service.callToActionUrl && (
                      <a
                        href={service.callToActionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-paragraph text-sm text-secondary hover:text-primary transition-colors"
                      >
                        Learn More <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <p className="font-paragraph text-lg text-secondary/60">
              No services found in this category
            </p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="w-full bg-backgrounddark py-20 lg:py-32">
        <div className="max-w-[100rem] mx-auto px-8 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-4xl lg:text-5xl text-secondary-foreground mb-6">
              Need a Custom Solution?
            </h2>
            <p className="font-paragraph text-lg text-secondary-foreground/80 max-w-2xl mx-auto mb-10">
              Our team can create tailored service packages to meet your specific automotive needs
            </p>
            <a href="/contact">
              <Button className="bg-primary text-primary-foreground hover:bg-accentbluelight px-10 py-6 text-base">
                Contact Our Team
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
