import React from 'react';
import { motion } from 'framer-motion';

const ingredients = [
  { emoji: '🍅', delay: 0, x: -50 },
  { emoji: '🧅', delay: 0.2, x: 50 },
  { emoji: '🧄', delay: 0.4, x: -30 },
  { emoji: '🥕', delay: 0.6, x: 30 },
  { emoji: '🌿', delay: 0.8, x: -70 },
  { emoji: '🍋', delay: 1.0, x: 70 },
];

const MoodAnimation: React.FC = () => {
  return (
    <motion.div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="text-center bg-white/90 dark:bg-dark-surface/90 backdrop-blur-lg rounded-3xl p-12 shadow-2xl max-w-md mx-4">
        <motion.div
          className="text-6xl mb-8"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        >
          👨‍🍳
        </motion.div>
        
        <motion.h3
          className="text-2xl font-semibold text-gray-800 dark:text-white mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Cooking up something special...
        </motion.h3>

        <div className="flex justify-center gap-4 mb-8">
          {ingredients.map((ingredient, index) => (
            <motion.div
              key={index}
              className="text-3xl"
              initial={{ opacity: 0, y: 20, scale: 0.8, x: ingredient.x }}
              animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
              transition={{
                delay: ingredient.delay,
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 2
              }}
            >
              {ingredient.emoji}
            </motion.div>
          ))}
        </div>

        <motion.p 
          className="text-gray-600 dark:text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          AI is crafting your perfect recipe based on your mood...
        </motion.p>

        <motion.div
          className="mt-6 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="bg-gradient-to-r from-accent-primary to-accent-secondary h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MoodAnimation;