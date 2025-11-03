import React from 'react';
import { UilMoon, UilSun } from '@iconscout/react-unicons';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-lg border border-white/20 dark:border-dark-surface/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      aria-label="Toggle theme"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'light' ? 0 : 180 }}
        transition={{ duration: 0.3 }}
      >
        {theme === 'light' ? (
          <UilMoon size="18" className="text-gray-700" />
        ) : (
          <UilSun size="18" className="text-yellow-400" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;