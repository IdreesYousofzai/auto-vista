import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Gauge, Fuel, Settings, Palette, ArrowRight } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Vehicles } from '@/entities';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="w-full max-w-[100rem] mx-auto px-8 lg:px-16 py-12 min-h-[600px]">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <LoadingSpinner />
          </div>
        ) : !vehicle ? (
          <div className="text-center py-20">
            <h2 className="font-heading text-3xl text-secondary mb-4">Vehicle Not Found</h2>
            <Link to="/vehicles">
              <Button className="bg-primary text-primary-foreground hover:bg-accentbluelight">
                Back to Inventory
              </Button>
            </Link>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Back Button */}
            <Link to="/vehicles" className="inline-flex items-center gap-2 font-paragraph text-base text-secondary hover:text-primary transition-colors mb-8">
              <ArrowLeft className="w-5 h-5" />
              Back to Inventory
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="aspect-[4/3] bg-backgrounddark"
              >
                <Image
                  src={vehicle.mainImage || 'https://static.wixstatic.com/media/cec0c1_5b45e47791214e1fbc7fa54c930bf5b3~mv2.png?originWidth=1152&originHeight=896'}
                  alt={`${vehicle.make} ${vehicle.model}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Details */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h1 className="font-heading text-5xl text-secondary mb-4">
                  {vehicle.make} {vehicle.model}
                </h1>
                <p className="font-heading text-4xl text-primary mb-8">
                  ${vehicle.price?.toLocaleString()}
                </p>

                {vehicle.description && (
                  <p className="font-paragraph text-base text-secondary mb-8">
                    {vehicle.description}
                  </p>
                )}

                <Link to="/contact">
                  <Button className="bg-primary text-primary-foreground hover:bg-accentbluelight px-8 py-6 text-base w-full lg:w-auto">
                    Schedule Test Drive <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Specifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-backgrounddark p-8 lg:p-12"
            >
              <h2 className="font-heading text-3xl text-secondary-foreground mb-8">
                Specifications
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {vehicle.year && (
                  <div className="flex items-start gap-4">
                    <Calendar className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-paragraph text-sm text-secondary-foreground/60 mb-1">Year</div>
                      <div className="font-heading text-xl text-secondary-foreground">{vehicle.year}</div>
                    </div>
                  </div>
                )}

                {vehicle.mileage && (
                  <div className="flex items-start gap-4">
                    <Gauge className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-paragraph text-sm text-secondary-foreground/60 mb-1">Mileage</div>
                      <div className="font-heading text-xl text-secondary-foreground">{vehicle.mileage.toLocaleString()} miles</div>
                    </div>
                  </div>
                )}

                {vehicle.engineType && (
                  <div className="flex items-start gap-4">
                    <Fuel className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-paragraph text-sm text-secondary-foreground/60 mb-1">Engine</div>
                      <div className="font-heading text-xl text-secondary-foreground">{vehicle.engineType}</div>
                    </div>
                  </div>
                )}

                {vehicle.transmission && (
                  <div className="flex items-start gap-4">
                    <Settings className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-paragraph text-sm text-secondary-foreground/60 mb-1">Transmission</div>
                      <div className="font-heading text-xl text-secondary-foreground">{vehicle.transmission}</div>
                    </div>
                  </div>
                )}

                {vehicle.exteriorColor && (
                  <div className="flex items-start gap-4">
                    <Palette className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-paragraph text-sm text-secondary-foreground/60 mb-1">Exterior Color</div>
                      <div className="font-heading text-xl text-secondary-foreground">{vehicle.exteriorColor}</div>
                    </div>
                  </div>
                )}

                {vehicle.interiorColor && (
                  <div className="flex items-start gap-4">
                    <Palette className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-paragraph text-sm text-secondary-foreground/60 mb-1">Interior Color</div>
                      <div className="font-heading text-xl text-secondary-foreground">{vehicle.interiorColor}</div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-16 bg-primary p-12 text-center"
            >
              <h2 className="font-heading text-3xl text-primary-foreground mb-4">
                Interested in This Vehicle?
              </h2>
              <p className="font-paragraph text-lg text-primary-foreground mb-8 max-w-2xl mx-auto">
                Contact our team to schedule a test drive or learn more about financing options
              </p>
              <Link to="/contact">
                <Button className="bg-secondary text-secondary-foreground hover:bg-backgrounddark px-10 py-6 text-base">
                  Contact Us Now
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
}
