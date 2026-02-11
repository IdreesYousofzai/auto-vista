import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Image } from '@/components/ui/image';
import { motion } from 'framer-motion';
import { Award, Target, Users, Zap, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function AboutPage() {
  const [activeTimelineItem, setActiveTimelineItem] = useState(0);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const timelineItems = [
    {
      year: '2016',
      title: 'Founded',
      description: 'Velocity was born with a vision to revolutionize automotive retail through innovation and transparency.'
    },
    {
      year: '2018',
      title: 'Expansion',
      description: 'Opened our flagship showroom and launched our advanced vehicle analytics platform.'
    },
    {
      year: '2020',
      title: 'Digital Transformation',
      description: 'Introduced virtual showroom tours and AI-powered vehicle recommendations.'
    },
    {
      year: '2022',
      title: 'Market Leader',
      description: 'Achieved recognition as the region\'s most trusted automotive retailer.'
    },
    {
      year: '2024',
      title: 'Innovation Peak',
      description: 'Launched 3D vehicle experience and expanded our premium inventory.'
    }
  ];

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
              // ABOUT VELOCITY
            </span>

            <h1
              className="text-6xl md:text-7xl font-black mb-8"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              ENGINEERED
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                FOR EXCELLENCE
              </span>
            </h1>

            <p className="text-zinc-400 text-xl max-w-3xl mx-auto">
              Pioneering the future of automotive retail through innovation, integrity, and exceptional customer service
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="w-full max-w-[120rem] mx-auto px-6 sm:px-12 lg:px-24 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-black mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Our Story
            </h2>
            <p className="text-zinc-400 text-base mb-4">
              Founded in 2016, Velocity emerged from a vision to revolutionize the car buying experience. We recognized that customers deserved more than traditional dealership practices—they needed transparency, data-driven insights, and genuine partnership.
            </p>
            <p className="text-zinc-400 text-base">
              Today, we stand as a leader in automotive retail innovation, combining cutting-edge technology with personalized service to deliver unmatched value to our customers. Our commitment to excellence has earned us recognition as one of the most trusted dealerships in the region.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="aspect-[4/3] bg-gradient-to-br from-zinc-900 via-red-900/20 to-zinc-900 border border-zinc-800 overflow-hidden relative"
          >
            <Image
              src="https://static.wixstatic.com/media/cec0c1_331b85da6d2f4082bcabeef092feb4e4~mv2.png?originWidth=1152&originHeight=896"
              alt="Velocity automotive innovation"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* Values */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              icon: Target,
              title: 'Our Mission',
              description: 'To empower customers with data-driven insights and premium vehicle selection, making informed decisions accessible to everyone.'
            },
            {
              icon: Award,
              title: 'Our Values',
              description: 'Integrity, innovation, and customer-centricity guide every decision we make. We believe in building lasting relationships through trust and transparency.'
            },
            {
              icon: Users,
              title: 'Our Commitment',
              description: 'Delivering exceptional service at every touchpoint, from initial consultation to long-term ownership support and beyond.'
            }
          ].map((value, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              transition={{ delay: idx * 0.1 }}
              className="bg-zinc-900 border border-zinc-800 p-8 text-center hover:border-red-600 transition-all duration-300"
            >
              <value.icon className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-2xl font-black text-white mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>{value.title}</h3>
              <p className="text-zinc-400 text-base">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Interactive Timeline Section */}
      <section className="w-full bg-gradient-to-b from-zinc-950 to-zinc-900 py-20 lg:py-32">
        <div className="max-w-[120rem] mx-auto px-6 sm:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-black mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Our Journey
            </h2>
            <p className="text-zinc-400 text-lg max-w-3xl mx-auto">
              From vision to market leadership—explore the milestones that shaped Velocity
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Timeline Navigation */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1 space-y-3"
            >
              {timelineItems.map((item, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => setActiveTimelineItem(idx)}
                  whileHover={{ x: 4 }}
                  className={`w-full text-left p-4 rounded-lg border transition-all duration-300 ${
                    activeTimelineItem === idx
                      ? 'bg-red-600/20 border-red-600 shadow-lg shadow-red-600/20'
                      : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle className={`w-5 h-5 flex-shrink-0 ${activeTimelineItem === idx ? 'text-red-500' : 'text-zinc-600'}`} />
                    <div>
                      <div className="text-sm font-bold text-red-500">{item.year}</div>
                      <div className="text-base font-black text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                        {item.title}
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </motion.div>

            {/* Timeline Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <motion.div
                key={activeTimelineItem}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700 p-8 lg:p-12 rounded-lg"
              >
                <div className="mb-6">
                  <div className="inline-block px-4 py-2 bg-red-600/20 border border-red-600 rounded-full mb-4">
                    <span className="text-red-500 font-bold text-sm" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      {timelineItems[activeTimelineItem].year}
                    </span>
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-black text-white mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    {timelineItems[activeTimelineItem].title}
                  </h3>
                  <p className="text-zinc-300 text-lg leading-relaxed">
                    {timelineItems[activeTimelineItem].description}
                  </p>
                </div>

                {/* Visual Timeline Indicator */}
                <div className="mt-8 pt-8 border-t border-zinc-700">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1 bg-gradient-to-r from-red-600 to-orange-600 rounded-full" style={{ width: `${((activeTimelineItem + 1) / timelineItems.length) * 100}%` }} />
                    <span className="text-sm text-zinc-400 font-bold">
                      {activeTimelineItem + 1} / {timelineItems.length}
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full bg-gradient-to-r from-red-600 to-orange-600 py-20 lg:py-32">
        <div className="max-w-[120rem] mx-auto px-6 sm:px-12 lg:px-24">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { value: '15+', label: 'Years in Business' },
              { value: '5,000+', label: 'Vehicles Sold' },
              { value: '98%', label: 'Customer Satisfaction' },
              { value: '50+', label: 'Team Members' }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl lg:text-5xl font-black text-white mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  {stat.value}
                </div>
                <div className="text-sm text-white/80" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
