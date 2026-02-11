import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Image } from '@/components/ui/image';
import { TeamMembers } from '@/entities';
import { BaseCrudService } from '@/integrations';
import { motion } from 'framer-motion';
import { Award, Linkedin, Mail, Target, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function AboutPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMembers[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTeamMembers();
  }, []);

  const loadTeamMembers = async () => {
    setIsLoading(true);
    try {
      const result = await BaseCrudService.getAll<TeamMembers>('teammembers');
      setTeamMembers(result.items);
    } catch (error) {
      console.error('Error loading team members:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
            className="aspect-[4/3] bg-zinc-900 border border-zinc-800 overflow-hidden"
          >
            <Image
              src="https://static.wixstatic.com/media/cec0c1_cc0f070b051f445eae1495e96a231313~mv2.png?originWidth=896&originHeight=640"
              alt="Velocity showroom"
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

      {/* Team Section */}
      <section className="w-full bg-zinc-950 py-20 lg:py-32">
        <div className="max-w-[120rem] mx-auto px-6 sm:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-black mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Meet Our Team
            </h2>
            <p className="text-zinc-400 text-lg max-w-3xl mx-auto">
              Experienced professionals dedicated to delivering exceptional automotive solutions
            </p>
          </motion.div>

          <div className="min-h-[400px]">
            {isLoading ? null : teamMembers.length > 0 ? (
              <motion.div
                initial="initial"
                animate="animate"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {teamMembers.map((member, idx) => (
                  <motion.div
                    key={member._id}
                    variants={fadeInUp}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-zinc-900 border border-zinc-800 overflow-hidden hover:border-red-600 transition-all duration-300"
                  >
                    {member.photo && (
                      <div className="aspect-square bg-zinc-800 overflow-hidden">
                        <Image
                          src={member.photo}
                          alt={member.name || 'Team member'}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-2xl font-black text-white mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                        {member.name}
                      </h3>
                      {member.jobTitle && (
                        <p className="text-sm text-red-500 font-bold mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                          {member.jobTitle}
                        </p>
                      )}
                      {member.bio && (
                        <p className="text-zinc-400 text-base mb-4">
                          {member.bio}
                        </p>
                      )}
                      <div className="flex gap-3 mt-4">
                        {member.email && (
                          <a
                            href={`mailto:${member.email}`}
                            className="text-zinc-400 hover:text-red-500 transition-colors"
                            aria-label={`Email ${member.name}`}
                          >
                            <Mail className="w-5 h-5" />
                          </a>
                        )}
                        {member.linkedInProfile && (
                          <a
                            href={member.linkedInProfile}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-zinc-400 hover:text-red-500 transition-colors"
                            aria-label={`${member.name} LinkedIn profile`}
                          >
                            <Linkedin className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-20">
                <p className="text-zinc-400 text-lg">
                  Team information coming soon
                </p>
              </div>
            )}
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
