import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { RotateCw, ZoomIn, ZoomOut, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import * as THREE from 'three';
import { BaseCrudService } from '@/integrations';
import { Vehicles } from '@/entities';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface CarModel {
  vehicle: Vehicles;
  imageUrl: string;
}

export default function Car3DExperiencePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const carGroupRef = useRef<THREE.Group | null>(null);
  const animationIdRef = useRef<number | null>(null);

  const [vehicles, setVehicles] = useState<Vehicles[]>([]);
  const [selectedCarIndex, setSelectedCarIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [rotationSpeed, setRotationSpeed] = useState(0.005);
  const [zoomLevel, setZoomLevel] = useState(5);
  const [viewMode, setViewMode] = useState<'exterior' | 'interior'>('exterior');
  const [autoRotate, setAutoRotate] = useState(true);

  // Load vehicles from CMS
  useEffect(() => {
    const loadVehicles = async () => {
      setIsLoading(true);
      try {
        const result = await BaseCrudService.getAll<Vehicles>('vehicles');
        setVehicles(result.items);
      } catch (error) {
        console.error('Error loading vehicles:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadVehicles();
  }, []);

  // Initialize Three.js scene
  useEffect(() => {
    if (!containerRef.current || vehicles.length === 0) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfafafa);
    sceneRef.current = scene;

    // Camera setup
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 2, zoomLevel);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.4);
    pointLight.position.set(-5, 5, 5);
    scene.add(pointLight);

    // Create car group
    const carGroup = new THREE.Group();
    scene.add(carGroup);
    carGroupRef.current = carGroup;

    // Create a simple car representation using geometric shapes
    const createSimpleCar = () => {
      const group = new THREE.Group();

      // Car body
      const bodyGeometry = new THREE.BoxGeometry(2, 1.2, 4.5);
      const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0x1a1a1a });
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      body.position.y = 0.6;
      group.add(body);

      // Cabin
      const cabinGeometry = new THREE.BoxGeometry(1.8, 0.8, 1.5);
      const cabinMaterial = new THREE.MeshPhongMaterial({ color: 0x2a2a2a });
      const cabin = new THREE.Mesh(cabinGeometry, cabinMaterial);
      cabin.position.set(0, 1.4, -0.3);
      group.add(cabin);

      // Windows
      const windowGeometry = new THREE.BoxGeometry(0.8, 0.6, 0.1);
      const windowMaterial = new THREE.MeshPhongMaterial({ color: 0x4a9eff, transparent: true, opacity: 0.6 });
      
      const frontWindow = new THREE.Mesh(windowGeometry, windowMaterial);
      frontWindow.position.set(0, 1.4, 0.8);
      group.add(frontWindow);

      const rearWindow = new THREE.Mesh(windowGeometry, windowMaterial);
      rearWindow.position.set(0, 1.4, -1.3);
      group.add(rearWindow);

      // Wheels
      const wheelGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.3, 32);
      const wheelMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });

      const wheelPositions = [
        [-0.8, 0.5, 1.2],
        [0.8, 0.5, 1.2],
        [-0.8, 0.5, -1.2],
        [0.8, 0.5, -1.2]
      ];

      wheelPositions.forEach(pos => {
        const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
        wheel.rotation.z = Math.PI / 2;
        wheel.position.set(...(pos as [number, number, number]));
        group.add(wheel);
      });

      // Headlights
      const lightGeometry = new THREE.SphereGeometry(0.2, 16, 16);
      const lightMaterial = new THREE.MeshPhongMaterial({ color: 0xffff00, emissive: 0xffff00 });

      const leftLight = new THREE.Mesh(lightGeometry, lightMaterial);
      leftLight.position.set(-0.6, 0.8, 2.3);
      group.add(leftLight);

      const rightLight = new THREE.Mesh(lightGeometry, lightMaterial);
      rightLight.position.set(0.6, 0.8, 2.3);
      group.add(rightLight);

      return group;
    };

    const carModel = createSimpleCar();
    carGroup.add(carModel);

    // Handle window resize
    const handleResize = () => {
      const newWidth = containerRef.current?.clientWidth || width;
      const newHeight = containerRef.current?.clientHeight || height;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      if (autoRotate && carGroup) {
        carGroup.rotation.y += rotationSpeed;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, [vehicles.length, rotationSpeed, autoRotate, zoomLevel]);

  // Update camera zoom
  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.position.z = zoomLevel;
      cameraRef.current.updateProjectionMatrix();
    }
  }, [zoomLevel]);

  const handlePreviousCar = () => {
    setSelectedCarIndex((prev) => (prev === 0 ? vehicles.length - 1 : prev - 1));
  };

  const handleNextCar = () => {
    setSelectedCarIndex((prev) => (prev === vehicles.length - 1 ? 0 : prev + 1));
  };

  const handleResetView = () => {
    if (carGroupRef.current) {
      carGroupRef.current.rotation.set(0, 0, 0);
    }
    setZoomLevel(5);
    setAutoRotate(true);
  };

  const selectedVehicle = vehicles[selectedCarIndex];

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
              3D Car <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Experience</span>
            </h1>
            <p className="font-paragraph text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
              Explore our vehicles in stunning 3D. Rotate, zoom, and discover every detail from every angle with interactive controls.
            </p>
          </motion.div>
        </div>
      </section>
      {/* 3D Viewer Section */}
      <section className="w-full max-w-[120rem] mx-auto px-6 sm:px-12 lg:px-24 py-16 lg:py-24">
        {isLoading ? (
          <div className="text-center py-20">
            <p className="font-paragraph text-lg text-secondary/60">Loading 3D experience...</p>
          </div>
        ) : vehicles.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-paragraph text-lg text-secondary/60">No vehicles available for 3D viewing</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 3D Canvas */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="relative bg-white border-2 border-secondary/10 overflow-hidden" style={{ minHeight: '600px' }}>
                {/* Sketchfab 3D Model */}
                <div className="w-full h-full" style={{ minHeight: '600px' }}>
                  <iframe
                    title="Rayfield Caliburn | www.vecarz.com"
                    frameBorder="0"
                    allowFullScreen
                    mozAllowFullScreen={true}
                    webkitAllowFullScreen={true}
                    allow="autoplay; fullscreen; xr-spatial-tracking"
                    xr-spatial-tracking="true"
                    src="https://sketchfab.com/models/10d3d2c26ebc42938933fc3779061615/embed"
                    style={{ width: '100%', height: '100%', minHeight: '600px' }}
                  />
                </div>

                {/* Controls Overlay */}
                <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-3">
                  <button
                    onClick={() => setAutoRotate(!autoRotate)}
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 hover:bg-primary/90 transition-colors"
                    title="Toggle auto-rotate"
                  >
                    <RotateCw className="w-4 h-4" />
                    <span className="hidden sm:inline text-sm">{autoRotate ? 'Pause' : 'Rotate'}</span>
                  </button>

                  <button
                    onClick={() => setZoomLevel(Math.max(2, zoomLevel - 1))}
                    className="flex items-center gap-2 bg-secondary text-white px-4 py-2 hover:bg-secondary/90 transition-colors"
                    title="Zoom in"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setZoomLevel(Math.min(15, zoomLevel + 1))}
                    className="flex items-center gap-2 bg-secondary text-white px-4 py-2 hover:bg-secondary/90 transition-colors"
                    title="Zoom out"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleResetView}
                    className="flex items-center gap-2 bg-secondary text-white px-4 py-2 hover:bg-secondary/90 transition-colors"
                    title="Reset view"
                  >
                    <Info className="w-4 h-4" />
                    <span className="hidden sm:inline text-sm">Reset</span>
                  </button>
                </div>
              </div>

              {/* View Mode Toggle */}
              <div className="mt-6 flex gap-4">
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
                  onClick={() => setViewMode('interior')}
                  className={`flex-1 py-3 font-paragraph font-semibold transition-all ${
                    viewMode === 'interior'
                      ? 'bg-primary text-white'
                      : 'bg-secondary/10 text-secondary hover:bg-secondary/20'
                  }`}
                >
                  Interior View
                </button>
              </div>
            </motion.div>

            {/* Vehicle Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-1"
            >
              {selectedVehicle && (
                <div className="space-y-6">
                  {/* Vehicle Image */}
                  <div className="aspect-[4/3] bg-backgrounddark overflow-hidden border-2 border-secondary/10">
                    <Image
                      src={selectedVehicle.mainImage || 'https://static.wixstatic.com/media/cec0c1_80c6fdf44d2543dda360a624430998d3~mv2.png?originWidth=768&originHeight=576'}
                      alt={`${selectedVehicle.make} ${selectedVehicle.model}`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Vehicle Info */}
                  <div className="bg-backgrounddark p-6">
                    <h2 className="font-heading text-3xl text-secondary-foreground mb-2">
                      {selectedVehicle.make} {selectedVehicle.model}
                    </h2>
                    <p className="font-paragraph text-sm text-secondary-foreground/60 mb-6">
                      {selectedVehicle.year}
                    </p>

                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between items-center border-b border-secondary-foreground/20 pb-3">
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
                      <p className="font-paragraph text-sm text-secondary-foreground/80 mb-6">
                        {selectedVehicle.description}
                      </p>
                    )}

                    {/* Navigation */}
                    <div className="flex gap-3">
                      <button
                        onClick={handlePreviousCar}
                        className="flex-1 flex items-center justify-center gap-2 bg-secondary text-white py-3 hover:bg-secondary/90 transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={handleNextCar}
                        className="flex-1 flex items-center justify-center gap-2 bg-secondary text-white py-3 hover:bg-secondary/90 transition-colors"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Counter */}
                    <p className="text-center font-paragraph text-sm text-secondary-foreground/60 mt-4">
                      {selectedCarIndex + 1} of {vehicles.length}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </section>
      {/* Features Section */}
      <section className="w-full bg-backgrounddark py-20 lg:py-32">
        <div className="max-w-[120rem] mx-auto px-6 sm:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl lg:text-5xl text-secondary-foreground mb-6">
              Interactive Features
            </h2>
            <p className="font-paragraph text-lg text-secondary-foreground/70 max-w-3xl mx-auto">
              Experience our vehicles like never before with advanced 3D visualization
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                title: '360° Rotation',
                description: 'Rotate vehicles smoothly to view from every angle'
              },
              {
                title: 'Zoom Control',
                description: 'Get up close to examine details or step back for full view'
              },
              {
                title: 'Multiple Views',
                description: 'Switch between exterior and interior perspectives'
              },
              {
                title: 'Vehicle Gallery',
                description: 'Browse through our entire inventory seamlessly'
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                transition={{ delay: idx * 0.1 }}
                className="bg-background border-2 border-secondary/10 p-6 hover:border-primary transition-colors"
              >
                <h3 className="font-heading text-xl text-secondary-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="font-paragraph text-sm text-secondary-foreground/70">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
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
