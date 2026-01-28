import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, Award, Users, Linkedin, Mail } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { TeamMembers } from '@/entities';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
              About Velocity Auto
            </h1>
            <p className="font-paragraph text-lg text-primary-foreground/90 max-w-3xl mx-auto">
              Pioneering the future of automotive retail through innovation, integrity, and exceptional customer service
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="w-full max-w-[100rem] mx-auto px-8 lg:px-16 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-4xl lg:text-5xl text-secondary mb-6">
              Our Story
            </h2>
            <p className="font-paragraph text-base text-secondary mb-4">
              Founded in 2011, Velocity Auto emerged from a vision to revolutionize the car buying experience. We recognized that customers deserved more than traditional dealership practices—they needed transparency, data-driven insights, and genuine partnership.
            </p>
            <p className="font-paragraph text-base text-secondary">
              Today, we stand as a leader in automotive retail innovation, combining cutting-edge technology with personalized service to deliver unmatched value to our customers. Our commitment to excellence has earned us recognition as one of the most trusted dealerships in the region.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="aspect-[4/3] bg-backgrounddark"
          >
            <Image
              src="https://static.wixstatic.com/media/cec0c1_cc0f070b051f445eae1495e96a231313~mv2.png?originWidth=896&originHeight=640"
              alt="Velocity Auto showroom"
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
              className="bg-backgrounddark p-8 text-center"
            >
              <value.icon className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-heading text-2xl text-secondary-foreground mb-4">{value.title}</h3>
              <p className="font-paragraph text-base text-secondary-foreground/80">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Team Section */}
      <section className="w-full bg-background py-20 lg:py-32">
        <div className="max-w-[100rem] mx-auto px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl lg:text-5xl text-secondary mb-6">
              Meet Our Team
            </h2>
            <p className="font-paragraph text-lg text-secondary/70 max-w-3xl mx-auto">
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
                    className="bg-background border-2 border-secondary/10 overflow-hidden hover:border-primary transition-all duration-300"
                  >
                    {member.photo && (
                      <div className="aspect-square bg-backgrounddark">
                        <Image
                          src={member.photo}
                          alt={member.name || 'Team member'}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="font-heading text-2xl text-secondary mb-2">
                        {member.name}
                      </h3>
                      {member.jobTitle && (
                        <p className="font-paragraph text-sm text-primary mb-4">
                          {member.jobTitle}
                        </p>
                      )}
                      {member.bio && (
                        <p className="font-paragraph text-base text-secondary/70 mb-4 line-clamp-3">
                          {member.bio}
                        </p>
                      )}
                      <div className="flex gap-3 mt-4">
                        {member.email && (
                          <a
                            href={`mailto:${member.email}`}
                            className="text-secondary hover:text-primary transition-colors"
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
                            className="text-secondary hover:text-primary transition-colors"
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
                <p className="font-paragraph text-lg text-secondary/60">
                  Team information coming soon
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full bg-primary py-20 lg:py-32">
        <div className="max-w-[100rem] mx-auto px-8 lg:px-16">
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
                <div className="font-heading text-4xl lg:text-5xl text-primary-foreground mb-2">
                  {stat.value}
                </div>
                <div className="font-paragraph text-sm text-primary-foreground/80">
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
