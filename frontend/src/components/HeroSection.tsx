import React from 'react';
import { motion } from 'framer-motion';
import { UilAward, UilCheck } from '@iconscout/react-unicons';
import MoodInputCard from './MoodInputCard';
import { RecipeFilters } from '../types/recipe';

interface HeroSectionProps {
  onGenerateRecipe: (mood: string, filters: RecipeFilters) => void;
  isLoading: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onGenerateRecipe, isLoading }) => {
  const features = [
    'AI-Powered Recipes',
    'Mood-Based Suggestions',
    'Instant Results',
  ];

  return (
    // Reduced vertical padding for mobile, kept larger for desktop
    // Ensured text is centered on mobile, aligned left on larger screens
    <div className="min-h-screen flex items-center justify-center px-4 py-16 md:py-24 relative overflow-hidden text-center lg:text-left"> {/* Adjusted py- for mobile */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Adjusted gap for mobile (smaller) and larger screens (larger) */}
        {/* Changed grid layout to stack on mobile, then 2 columns on lg */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center"> {/* Reduced mobile gap to gap-8 */}
          {/* Left Column - Headline & Features */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left" // Explicitly centered for mobile, left for lg
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              // Reduced horizontal padding px-3, vertical py-1.5 for mobile badge
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-full mb-4 md:mb-6 mx-auto lg:mx-0" // Adjusted padding & margin, ensured auto margins for centering
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <UilAward size={16} className="text-green-500 md:w-5 md:h-5" /> {/* Slightly smaller icon on mobile */}
              </motion.div>
              <span className="text-xs md:text-sm font-semibold text-green-600 dark:text-green-400"> {/* Smaller text on mobile */}
                AI-Powered Recipe Generation
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              // Adjusted text sizes for mobile (from 5xl down to 4xl, etc.)
              // Line height also adjusted for better stacking on mobile
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-4 leading-tight sm:leading-tight md:leading-tight [text-wrap:balance]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span
                className="block pb-2 sm:pb-3 text-black dark:text-white" // Reduced bottom padding for mobile
              >
                What's Your
              </span>
              <motion.span
                className="block pb-4 sm:pb-6 text-emerald-600" // Reduced bottom padding for mobile
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                Mood Today?
              </motion.span>
            </motion.h1>

           {/* Description */}
<motion.p
  className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 md:mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.5 }}
>
  Transform your feelings into delicious recipes. Our AI understands your mood,
  weather, and time of day to create the perfect culinary experience.
</motion.p>

            {/* Feature Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              // Ensure centering on mobile, left alignment on larger screens
              className="flex flex-wrap gap-2 justify-center lg:justify-start mb-6 md:mb-8" // Reduced gap and bottom margin for mobile
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  // Adjusted padding and font size for mobile
                  className="flex items-center gap-1.5 px-2.5 py-1 bg-white/50 dark:bg-green-900/50 backdrop-blur-sm border border-gray-200/50 dark:border-green-300/50 rounded-full text-xs md:text-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <UilCheck size={14} className="text-green-500 md:w-4 md:h-4" /> {/* Further reduced icon size for smallest screens */}
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              // Ensure centering on mobile, left alignment on larger screens
              className="flex items-center gap-3 justify-center lg:justify-start" // Reduced gap
            >
              <div className="flex -space-x-1 sm:-space-x-2"> {/* Further adjusted space-x for smaller screens */}
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    // Smaller avatars and text for mobile
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 border-2 border-white dark:border-gray-900 flex items-center justify-center text-white font-bold text-xs sm:text-sm"
                    whileHover={{ scale: 1.2, zIndex: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {String.fromCharCode(64 + i)}
                  </motion.div>
                ))}
              </div>
              <div className="text-xs sm:text-sm"> {/* Smaller text */}
                <div className="flex items-center gap-0.5 text-yellow-500 mb-0.5"> {/* Ensured minimal gap */}
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span key={i} className="text-yellow-500">★</span>
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400 font-medium">
                  Loved by <span className="text-gray-900 dark:text-white font-bold">10K+</span> food enthusiasts
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Mood Input Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            // Centered on mobile with auto margins, aligned right on larger screens
            className="flex justify-center mt-8 lg:mt-0" // Reduced top margin for mobile, centered
          >
            <MoodInputCard
              onGenerateRecipe={onGenerateRecipe}
              isLoading={isLoading}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;