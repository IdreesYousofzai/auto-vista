import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, X } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Vehicles, Reviews } from '@/entities';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useParams, useNavigate } from 'react-router-dom';

export default function Car3DExperiencePage() {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState<Vehicles[]>([]);
  const [reviews, setReviews] = useState<Reviews[]>([]);
  const [selectedCarIndex, setSelectedCarIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'exterior' | 'interior'>('exterior');
  const [showInteriorModal, setShowInteriorModal] = useState(false);

  // Load vehicles and reviews from CMS
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const vehiclesResult = await BaseCrudService.getAll<Vehicles>('vehicles');
        setVehicles(vehiclesResult.items);
        
        const reviewsResult = await BaseCrudService.getAll<Reviews>('reviews');
        setReviews(reviewsResult.items);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);



  const handlePreviousCar = () => {
    setSelectedCarIndex((prev) => (prev === 0 ? vehicles.length - 1 : prev - 1));
  };

  const handleNextCar = () => {
    if (selectedCarIndex === vehicles.length - 1) {
      setSelectedCarIndex(0);
    } else {
      setSelectedCarIndex((prev) => prev + 1);
    }
  };

  const selectedVehicle = vehicles[selectedCarIndex];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < rating ? 'fill-primary text-primary' : 'text-secondary/20'}`}
          />
        ))}
      </div>
    );
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
              3D Car <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Experience</span>
            </h1>
            <p className="font-paragraph text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
              Explore our vehicles in stunning detail. View exterior and interior photos, and discover what our customers think.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="w-full max-w-[120rem] mx-auto px-6 sm:px-12 lg:px-24 py-16 lg:py-24">
        {isLoading ? (
          <div className="text-center py-20">
            <p className="font-paragraph text-lg text-secondary/60">Loading experience...</p>
          </div>
        ) : vehicles.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-paragraph text-lg text-secondary/60">No vehicles available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Images */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Main Exterior Image */}
              <div className="relative aspect-video bg-backgrounddark overflow-hidden border-2 border-secondary/10">
                <Image
                  src={selectedVehicle?.mainImage || 'https://static.wixstatic.com/media/cec0c1_7a45e5798cba4bb8930ce1cae0a138a5~mv2.png?originWidth=1280&originHeight=704'}
                  alt={`${selectedVehicle?.make} ${selectedVehicle?.model} exterior`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* View Mode Toggle */}
              <div className="flex gap-4">
                <button
                  onClick={() => setViewMode('exterior')}
                  className={`flex-1 py-3 font-paragraph font-semibold transition-all ${
                    viewMode === 'exterior'
                      ? 'bg-primary text-white'
                      : 'bg-secondary/10 text-secondary hover:bg-secondary/20'
                  }`}
                >
                  Exterior View
                </button>
                <button
                  onClick={() => {
                    setViewMode('interior');
                    setShowInteriorModal(true);
                  }}
                  className={`flex-1 py-3 font-paragraph font-semibold transition-all ${
                    viewMode === 'interior'
                      ? 'bg-primary text-white'
                      : 'bg-secondary/10 text-secondary hover:bg-secondary/20'
                  }`}
                >
                  Interior View
                </button>
              </div>

              {/* Interior Modal */}
              {showInteriorModal && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                  onClick={() => setShowInteriorModal(false)}
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white max-w-2xl w-full max-h-[80vh] overflow-auto relative"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => setShowInteriorModal(false)}
                      className="absolute top-4 right-4 z-10 bg-primary text-white p-2 hover:bg-primary/90 transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                    
                    <div className="p-6">
                      <h3 className="font-heading text-2xl mb-4 text-secondary">
                        {selectedVehicle?.make} {selectedVehicle?.model} - Interior
                      </h3>
                      {selectedVehicle?.interiorImage ? (
                        <Image
                          src={selectedVehicle.interiorImage}
                          alt={`${selectedVehicle?.make} ${selectedVehicle?.model} interior`}
                          className="w-full h-auto object-cover"
                        />
                      ) : (
                        <div className="w-full h-96 bg-secondary/10 flex items-center justify-center">
                          <p className="text-secondary/60">Interior image not available</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {/* Reviews Section */}
              <div className="mt-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="mb-8"
                >
                  <h2 className="font-heading text-4xl text-secondary mb-2">Customer Reviews</h2>
                  <p className="font-paragraph text-secondary/60">See what our customers think about our vehicles</p>
                </motion.div>

                {reviews.length === 0 ? (
                  <div className="text-center py-12 bg-secondary/5 border-2 border-secondary/10">
                    <p className="font-paragraph text-secondary/60">No reviews yet. Be the first to review!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {reviews.map((review, idx) => (
                      <motion.div
                        key={review._id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className="bg-white border-2 border-secondary/10 p-6 hover:border-primary transition-colors"
                      >
                        <div className="flex items-start gap-4 mb-4">
                          {review.reviewerPhoto && (
                            <Image
                              src={review.reviewerPhoto}
                              alt={review.reviewerName || 'Reviewer'}
                              className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                            />
                          )}
                          <div className="flex-1">
                            <h3 className="font-heading text-lg text-secondary">{review.reviewerName}</h3>
                            {review.rating && renderStars(review.rating)}
                          </div>
                        </div>
                        {review.reviewTitle && (
                          <p className="font-heading text-sm text-primary mb-2">{review.reviewTitle}</p>
                        )}
                        <p className="font-paragraph text-sm text-secondary/80">{review.comment}</p>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Right Column - Vehicle Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-1"
            >
              {selectedVehicle && (
                <div className="space-y-6">
                  {/* Vehicle Info Card */}
                  <div className="bg-backgrounddark p-6 space-y-4">
                    <div>
                      <h2 className="font-heading text-3xl text-secondary-foreground mb-2">
                        {selectedVehicle.make} {selectedVehicle.model}
                      </h2>
                      <p className="font-paragraph text-sm text-secondary-foreground/60">
                        {selectedVehicle.year}
                      </p>
                    </div>

                    <div className="space-y-3 border-t border-secondary-foreground/20 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="font-paragraph text-sm text-secondary-foreground/70">Price</span>
                        <span className="font-heading text-xl text-primary">
                          ${selectedVehicle.price?.toLocaleString()}
                        </span>
                      </div>

                      {selectedVehicle.mileage && (
                        <div className="flex justify-between items-center border-b border-secondary-foreground/20 pb-3">
                          <span className="font-paragraph text-sm text-secondary-foreground/70">Mileage</span>
                          <span className="font-heading text-sm text-secondary-foreground">
                            {selectedVehicle.mileage.toLocaleString()} mi
                          </span>
                        </div>
                      )}

                      {selectedVehicle.engineType && (
                        <div className="flex justify-between items-center border-b border-secondary-foreground/20 pb-3">
                          <span className="font-paragraph text-sm text-secondary-foreground/70">Engine</span>
                          <span className="font-heading text-sm text-secondary-foreground">
                            {selectedVehicle.engineType}
                          </span>
                        </div>
                      )}

                      {selectedVehicle.transmission && (
                        <div className="flex justify-between items-center border-b border-secondary-foreground/20 pb-3">
                          <span className="font-paragraph text-sm text-secondary-foreground/70">Transmission</span>
                          <span className="font-heading text-sm text-secondary-foreground">
                            {selectedVehicle.transmission}
                          </span>
                        </div>
                      )}

                      {selectedVehicle.exteriorColor && (
                        <div className="flex justify-between items-center border-b border-secondary-foreground/20 pb-3">
                          <span className="font-paragraph text-sm text-secondary-foreground/70">Exterior</span>
                          <span className="font-heading text-sm text-secondary-foreground">
                            {selectedVehicle.exteriorColor}
                          </span>
                        </div>
                      )}

                      {selectedVehicle.interiorColor && (
                        <div className="flex justify-between items-center">
                          <span className="font-paragraph text-sm text-secondary-foreground/70">Interior</span>
                          <span className="font-heading text-sm text-secondary-foreground">
                            {selectedVehicle.interiorColor}
                          </span>
                        </div>
                      )}
                    </div>

                    {selectedVehicle.description && (
                      <p className="font-paragraph text-sm text-secondary-foreground/80 border-t border-secondary-foreground/20 pt-4">
                        {selectedVehicle.description}
                      </p>
                    )}
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={handlePreviousCar}
                      className="flex-1 flex items-center justify-center gap-2 bg-secondary text-white py-3 hover:bg-secondary/90 transition-colors font-heading"
                    >
                      <ChevronLeft className="w-5 h-5" />
                      Previous
                    </button>
                    <button
                      onClick={handleNextCar}
                      className="flex-1 flex items-center justify-center gap-2 bg-secondary text-white py-3 hover:bg-secondary/90 transition-colors font-heading"
                    >
                      Next
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Counter */}
                  <p className="text-center font-paragraph text-sm text-secondary-foreground/60">
                    {selectedCarIndex + 1} of {vehicles.length}
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="w-full bg-primary py-20 lg:py-32">
        <div className="max-w-[100rem] mx-auto px-6 sm:px-12 lg:px-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-4xl lg:text-5xl text-primary-foreground mb-6">
              Ready to Take a Test Drive?
            </h2>
            <p className="font-paragraph text-lg text-primary-foreground/90 max-w-2xl mx-auto mb-10">
              Schedule your test drive today and experience the perfect vehicle in person
            </p>
            <a href="/contact">
              <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-10 py-6 text-base">
                Schedule Test Drive
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
