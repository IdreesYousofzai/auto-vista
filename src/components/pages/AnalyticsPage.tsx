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
              // DATA-DRIVEN INSIGHTS
            </span>

            <h1
              className="text-6xl md:text-7xl font-black mb-8"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              MARKET
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                ANALYTICS
              </span>
            </h1>

            <p className="text-zinc-400 text-xl max-w-3xl mx-auto">
              Real-time market data and insights to inform your automotive decisions
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="max-w-[120rem] mx-auto px-6 sm:px-12 lg:px-24 py-24">
        <motion.div
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {[
            { icon: Users, label: 'Active Customers', value: '2,847', color: 'text-red-500' },
            { icon: TrendingUp, label: 'Sales Growth', value: '+23%', color: 'text-red-500' },
            { icon: DollarSign, label: 'Avg. Transaction', value: '$45,200', color: 'text-red-500' },
            { icon: BarChart3, label: 'Market Share', value: '18.5%', color: 'text-red-500' }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              transition={{ delay: idx * 0.1 }}
              className="bg-zinc-900 border border-zinc-800 p-6 hover:border-red-600 transition-all duration-300"
            >
              <stat.icon className={`w-10 h-10 ${stat.color} mb-4`} />
              <div className="text-3xl font-black text-white mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>{stat.value}</div>
              <div className="text-sm text-zinc-400">{stat.label}</div>
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
          <div className="bg-zinc-900 border border-zinc-800 p-8">
            <h2 className="text-3xl font-black text-white mb-8" style={{ fontFamily: 'Orbitron, sans-serif' }}>Customer Demographics</h2>
            {isLoadingStats ? (
              <div className="h-[400px] flex items-center justify-center">
                <p className="text-zinc-400">Loading data...</p>
              </div>
            ) : statsChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={statsChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                  <XAxis 
                    dataKey="category" 
                    tick={{ fill: '#a1a1aa', fontFamily: 'Orbitron, sans-serif', fontSize: 12 }}
                  />
                  <YAxis 
                    tick={{ fill: '#a1a1aa', fontFamily: 'Orbitron, sans-serif', fontSize: 12 }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#18181b', 
                      border: '2px solid #ef4444',
                      fontFamily: 'Orbitron, sans-serif',
                      color: '#fff'
                    }}
                  />
                  <Legend 
                    wrapperStyle={{ fontFamily: 'Orbitron, sans-serif', color: '#fff' }}
                  />
                  <Bar dataKey="value" fill="#ef4444" name="Value" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[400px] flex items-center justify-center">
                <p className="text-zinc-400">No customer statistics available</p>
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
          <div className="bg-zinc-900 border border-zinc-800 p-8">
            <h2 className="text-3xl font-black text-white mb-8" style={{ fontFamily: 'Orbitron, sans-serif' }}>Vehicle Price Trends</h2>
            {isLoadingTrends ? (
              <div className="h-[400px] flex items-center justify-center">
                <p className="text-zinc-400">Loading data...</p>
              </div>
            ) : priceChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={priceChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fill: '#a1a1aa', fontFamily: 'Orbitron, sans-serif', fontSize: 12 }}
                  />
                  <YAxis 
                    tick={{ fill: '#a1a1aa', fontFamily: 'Orbitron, sans-serif', fontSize: 12 }}
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#18181b', 
                      border: '2px solid #ef4444',
                      fontFamily: 'Orbitron, sans-serif',
                      color: '#fff'
                    }}
                    formatter={(value: number) => [`$${value.toLocaleString()}`, 'Price']}
                  />
                  <Legend 
                    wrapperStyle={{ fontFamily: 'Orbitron, sans-serif', color: '#fff' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#ef4444" 
                    strokeWidth={3}
                    name="Average Price"
                    dot={{ fill: '#ef4444', r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[400px] flex items-center justify-center">
                <p className="text-zinc-400">No price trend data available</p>
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
          <div className="bg-gradient-to-br from-red-600 to-orange-600 p-8">
            <h3 className="text-2xl font-black text-white mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>Market Insights</h3>
            <p className="text-base text-white/90">
              Our analytics show consistent growth in premium vehicle segments, with electric and hybrid models gaining significant market share. Customer preferences are shifting toward technology-integrated features and sustainable options.
            </p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 p-8">
            <h3 className="text-2xl font-black text-white mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>Investment Opportunities</h3>
            <p className="text-base text-zinc-400">
              Current market conditions present excellent opportunities for buyers interested in luxury sedans and performance vehicles. Price stabilization in key segments indicates favorable timing for strategic purchases.
            </p>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
