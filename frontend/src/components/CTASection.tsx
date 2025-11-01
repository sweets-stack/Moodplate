import React from 'react';
import { motion } from 'framer-motion';
import { UilArrowRight, UilDownloadAlt } from '@iconscout/react-unicons';

interface CTASectionProps {
  onGenerateAnother: () => void;
}

const CTASection: React.FC<CTASectionProps> = ({ onGenerateAnother }) => {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent-primary to-accent-secondary opacity-10" />
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-white dark:text-white mb-6"
        >
          Hungry for More Moods?
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-gray-100 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
        >
          Discover endless recipe possibilities tailored to your every mood and craving.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            onClick={onGenerateAnother}
            className="px-8 py-4 bg-white dark:bg-dark-surface text-gray-800 dark:text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 group"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Generate Another Recipe
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <UilArrowRight size={20} />
            </motion.span>
          </motion.button>

          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-accent-primary to-accent-secondary text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 group opacity-70 cursor-not-allowed"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            title="Coming Soon"
          >
            Download App
            <UilDownloadAlt size={20} />
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {[
            { number: '100+', label: 'Mood Recipes' },
            { number: '24/7', label: 'AI Chef Ready' },
            { number: '5min', label: 'Avg Prep Time' },
            { number: '∞', label: 'Possibilities' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-2xl md:text-3xl font-bold text-white mb-2">
                {stat.number}
              </div>
              <div className="text-gray-100 dark:text-white text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;