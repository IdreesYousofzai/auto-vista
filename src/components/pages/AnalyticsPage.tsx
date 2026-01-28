import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, DollarSign, BarChart3 } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { CustomerStatistics, PriceTrends } from '@/entities';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AnalyticsPage() {
  const [customerStats, setCustomerStats] = useState<CustomerStatistics[]>([]);
  const [priceTrends, setPriceTrends] = useState<PriceTrends[]>([]);
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [isLoadingTrends, setIsLoadingTrends] = useState(true);

  useEffect(() => {
    loadCustomerStats();
    loadPriceTrends();
  }, []);

  const loadCustomerStats = async () => {
    setIsLoadingStats(true);
    try {
      const result = await BaseCrudService.getAll<CustomerStatistics>('customerstatistics');
      setCustomerStats(result.items);
    } catch (error) {
      console.error('Error loading customer stats:', error);
    } finally {
      setIsLoadingStats(false);
    }
  };

  const loadPriceTrends = async () => {
    setIsLoadingTrends(true);
    try {
      const result = await BaseCrudService.getAll<PriceTrends>('pricetrends');
      setPriceTrends(result.items);
    } catch (error) {
      console.error('Error loading price trends:', error);
    } finally {
      setIsLoadingTrends(false);
    }
  };

  const statsChartData = customerStats.map(stat => ({
    category: stat.demographicCategory || 'Unknown',
    value: stat.statisticValue || 0,
    period: stat.timePeriod || ''
  }));

  const priceChartData = priceTrends
    .sort((a, b) => {
      const dateA = a.trendDate ? new Date(a.trendDate).getTime() : 0;
      const dateB = b.trendDate ? new Date(b.trendDate).getTime() : 0;
      return dateA - dateB;
    })
    .map(trend => ({
      date: trend.trendDate ? new Date(trend.trendDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '',
      vehicle: `${trend.vehicleMake || ''} ${trend.vehicleModel || ''}`.trim() || 'Unknown',
      price: trend.averagePrice || 0,
      change: trend.priceChangePercentage || 0
    }));

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
              Market Analytics Dashboard
            </h1>
            <p className="font-paragraph text-lg text-secondary-foreground/80 max-w-3xl mx-auto">
              Real-time insights into customer trends and vehicle pricing dynamics
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="w-full max-w-[100rem] mx-auto px-8 lg:px-16 py-16">
        <motion.div
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {[
            { icon: Users, label: 'Active Customers', value: '2,847', color: 'text-primary' },
            { icon: TrendingUp, label: 'Sales Growth', value: '+23%', color: 'text-primary' },
            { icon: DollarSign, label: 'Avg. Transaction', value: '$45,200', color: 'text-primary' },
            { icon: BarChart3, label: 'Market Share', value: '18.5%', color: 'text-primary' }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              transition={{ delay: idx * 0.1 }}
              className="bg-background border-2 border-secondary/10 p-6"
            >
              <stat.icon className={`w-10 h-10 ${stat.color} mb-4`} />
              <div className="font-heading text-3xl text-secondary mb-2">{stat.value}</div>
              <div className="font-paragraph text-sm text-secondary/60">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Customer Statistics Chart */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="mb-16"
        >
          <div className="bg-background border-2 border-secondary/10 p-8">
            <h2 className="font-heading text-3xl text-secondary mb-8">Customer Demographics</h2>
            {isLoadingStats ? (
              <div className="h-[400px] flex items-center justify-center">
                <p className="font-paragraph text-base text-secondary/60">Loading data...</p>
              </div>
            ) : statsChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={statsChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                  <XAxis 
                    dataKey="category" 
                    tick={{ fill: '#000000', fontFamily: 'open sans', fontSize: 12 }}
                  />
                  <YAxis 
                    tick={{ fill: '#000000', fontFamily: 'open sans', fontSize: 12 }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#ffffff', 
                      border: '2px solid #5C5CF6',
                      fontFamily: 'open sans'
                    }}
                  />
                  <Legend 
                    wrapperStyle={{ fontFamily: 'open sans' }}
                  />
                  <Bar dataKey="value" fill="#5C5CF6" name="Value" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[400px] flex items-center justify-center">
                <p className="font-paragraph text-base text-secondary/60">No customer statistics available</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Price Trends Chart */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.2 }}
        >
          <div className="bg-backgrounddark p-8">
            <h2 className="font-heading text-3xl text-secondary-foreground mb-8">Vehicle Price Trends</h2>
            {isLoadingTrends ? (
              <div className="h-[400px] flex items-center justify-center">
                <p className="font-paragraph text-base text-secondary-foreground/60">Loading data...</p>
              </div>
            ) : priceChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={priceChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fill: '#ffffff', fontFamily: 'open sans', fontSize: 12 }}
                  />
                  <YAxis 
                    tick={{ fill: '#ffffff', fontFamily: 'open sans', fontSize: 12 }}
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#121212', 
                      border: '2px solid #5C5CF6',
                      fontFamily: 'open sans',
                      color: '#ffffff'
                    }}
                    formatter={(value: number) => [`$${value.toLocaleString()}`, 'Price']}
                  />
                  <Legend 
                    wrapperStyle={{ fontFamily: 'open sans', color: '#ffffff' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#5C5CF6" 
                    strokeWidth={3}
                    name="Average Price"
                    dot={{ fill: '#5C5CF6', r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[400px] flex items-center justify-center">
                <p className="font-paragraph text-base text-secondary-foreground/60">No price trend data available</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Insights Section */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <div className="bg-primary p-8">
            <h3 className="font-heading text-2xl text-primary-foreground mb-4">Market Insights</h3>
            <p className="font-paragraph text-base text-primary-foreground/90">
              Our analytics show consistent growth in premium vehicle segments, with electric and hybrid models gaining significant market share. Customer preferences are shifting toward technology-integrated features and sustainable options.
            </p>
          </div>
          <div className="bg-background border-2 border-secondary/10 p-8">
            <h3 className="font-heading text-2xl text-secondary mb-4">Investment Opportunities</h3>
            <p className="font-paragraph text-base text-secondary/70">
              Current market conditions present excellent opportunities for buyers interested in luxury sedans and performance vehicles. Price stabilization in key segments indicates favorable timing for strategic purchases.
            </p>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
