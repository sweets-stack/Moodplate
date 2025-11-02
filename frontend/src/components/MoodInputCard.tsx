// MoodInputCard.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UilCloud,
  UilSun,
  UilCloudRain,
  UilSnowflake,
  UilWind,
  UilArrowDown
  
} from '@iconscout/react-unicons';
import VoiceControl from './VoiceControl'; // Import the voice control
import { FilterOptions, RecipeFilters } from '../types/recipe';

interface MoodInputCardProps {
  onGenerateRecipe: (mood: string, filters: RecipeFilters) => void;
  isLoading: boolean;
}

const MoodInputCard: React.FC<MoodInputCardProps> = ({ onGenerateRecipe, isLoading }) => {
  const [mood, setMood] = useState('');
  const [selectedMood, setSelectedMood] = useState('');
  const [focused, setFocused] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    cuisineTypes: [],
    mealTypes: [],
    difficulties: [],
    moods: []
  });

  const [filters, setFilters] = useState<RecipeFilters>({
    weather: '',
    timeOfDay: '',
    cuisineType: '',
    mealType: '',
    difficulty: ''
  });

  const moods = [
    { emoji: '😊', label: 'Happy', value: 'happy', gradient: 'from-yellow-400 to-orange-400' },
    { emoji: '😌', label: 'Cozy', value: 'cozy', gradient: 'from-purple-400 to-pink-400' },
    { emoji: '⚡', label: 'Energetic', value: 'energetic', gradient: 'from-green-400 to-cyan-400' },
    { emoji: '🌙', label: 'Relaxed', value: 'relaxed', gradient: 'from-blue-400 to-indigo-400' },
    { emoji: '🤩', label: 'Excited', value: 'excited', gradient: 'from-red-400 to-pink-400' },
    { emoji: '🥶', label: 'Cold', value: 'cold', gradient: 'from-cyan-400 to-blue-500' },
    { emoji: '🔥', label: 'Warm', value: 'warm', gradient: 'from-orange-400 to-red-500' },
    { emoji: '🎉', label: 'Party', value: 'celebratory', gradient: 'from-fuchsia-400 to-purple-500' },
  ];

  const weatherOptions = [
    { value: 'sunny', label: 'Sunny', icon: <UilSun size={20} /> },
    { value: 'cloudy', label: 'Cloudy', icon: <UilCloud size={20} /> },
    { value: 'rainy', label: 'Rainy', icon: <UilCloudRain size={20} /> },
    { value: 'snowy', label: 'Snowy', icon: <UilSnowflake size={20} /> },
    { value: 'windy', label: 'Windy', icon: <UilWind size={20} /> },
  ];

  const timeOptions = [
    { value: 'morning', label: 'Morning', icon: '🌅' },
    { value: 'afternoon', label: 'Afternoon', icon: '☀️' },
    { value: 'evening', label: 'Evening', icon: '🌇' },
    { value: 'night', label: 'Night', icon: '🌙' },
  ];

  useEffect(() => {
    const loadFilterOptions = async () => {
      try {
        const response = await fetch('http://moodplate-backend.onrender.com/api/recipes/filters');
        if (response.ok) {
          const options = await response.json();
          setFilterOptions(options);
        }
      } catch (error) {
        console.error('Failed to load filter options:', error);
      }
    };

    loadFilterOptions();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalMood = mood.trim() || selectedMood;
    if (finalMood) {
      console.log('Submitting with filters:', filters); // Debug log
      onGenerateRecipe(finalMood, filters);
    }
  };

  const handleMoodSelect = (moodValue: string) => {
    setSelectedMood(moodValue);
    setMood(moodValue);
  };

  const handleVoiceTranscript = (transcript: string) => {
    setMood(transcript);
    setSelectedMood('');
  };

  const updateFilter = (key: keyof RecipeFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key] === value ? '' : value
    }));
  };

  const clearFilters = () => {
    setFilters({
      weather: '',
      timeOfDay: '',
      cuisineType: '',
      mealType: '',
      difficulty: ''
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-lg md:max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <motion.div
          className="relative bg-white dark:bg-black rounded-3xl p-5 sm:p-6 shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
        >
          {/* Gradient Glow Effect */}
          <motion.div
            className="absolute -inset-1 bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-green-500/20 rounded-3xl blur-xl"
            animate={{
              opacity: focused ? 1 : 0.5,
              scale: focused ? 1.05 : 1
            }}
            transition={{ duration: 0.3 }}
          />

          <div className="relative space-y-4 sm:space-y-5">
            {/* Mood Input */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                <span className="text-green-500 text-lg">✨</span>
                How are you feeling? *
              </label>
              <div className="flex gap-2">
                <motion.input
                  type="text"
                  value={mood}
                  onChange={(e) => {
                    setMood(e.target.value);
                    setSelectedMood('');
                  }}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  placeholder="Describe your mood..."
                  className="flex-1 px-3 py-2.5 sm:px-4 sm:py-3 bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 font-medium text-sm"
                  required
                  disabled={isLoading}
                  whileFocus={{ scale: 1.02 }}
                />
                <VoiceControl 
                  onTranscript={handleVoiceTranscript}
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Rest of your component remains the same */}
            {/* Mood Quick Select */}
            <div>
              <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                Quick Select:
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {moods.map((moodItem) => (
                  <motion.button
                    key={moodItem.value}
                    type="button"
                    onClick={() => handleMoodSelect(moodItem.value)}
                    disabled={isLoading}
                    className={`relative p-2 rounded-xl transition-all duration-300 flex flex-col items-center gap-1 overflow-hidden ${
                      selectedMood === moodItem.value
                        ? 'ring-2 ring-green-500 shadow-lg scale-105'
                        : 'bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-700 hover:border-green-500'
                    }`}
                    whileHover={{ scale: isLoading ? 1 : 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {selectedMood === moodItem.value && (
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${moodItem.gradient} opacity-20`}
                        layoutId="selectedMoodBg"
                      />
                    )}
                    <span className="text-xl sm:text-2xl relative z-10">{moodItem.emoji}</span>
                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300 relative z-10">
                      {moodItem.label}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Basic Filters (Weather & Time of Day) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  Weather
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {weatherOptions.map((option) => (
                    <motion.button
                      key={option.value}
                      type="button"
                      onClick={() => updateFilter('weather', option.value)}
                      disabled={isLoading}
                      className={`p-2 rounded-xl transition-all duration-300 flex flex-col items-center gap-1 ${
                        filters.weather === option.value
                          ? 'bg-green-500 text-white shadow-lg'
                          : 'bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {React.cloneElement(option.icon, { size: 16 })}
                      <span className="text-xs font-medium">{option.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  Time of Day
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {timeOptions.map((option) => (
                    <motion.button
                      key={option.value}
                      type="button"
                      onClick={() => updateFilter('timeOfDay', option.value)}
                      disabled={isLoading}
                      className={`p-2 rounded-xl transition-all duration-300 flex flex-col items-center gap-1 ${
                        filters.timeOfDay === option.value
                          ? 'bg-green-500 text-white shadow-lg'
                          : 'bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-lg">{option.icon}</span>
                      <span className="text-xs font-medium">{option.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Advanced Filters Toggle */}
            <motion.button
              type="button"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`flex items-center gap-2 w-full p-3 rounded-xl transition-all duration-300 text-sm ${
                showAdvancedFilters || hasActiveFilters
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
              whileHover={{ scale: 1.02 }}
            >
              <UilArrowDown size={16} className={showAdvancedFilters ? "transform rotate-180" : ""} />
              <span className="font-bold">Advanced Filters</span>
              {hasActiveFilters && (
                <span className="ml-auto bg-white text-green-500 px-1 py-0.5 rounded-full text-xs font-bold">
                  Active
                </span>
              )}
            </motion.button>

            {/* Advanced Filters */}
            <AnimatePresence>
              {showAdvancedFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-3 overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {/* Cuisine Type */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                        Cuisine
                      </label>
                      <select
                        value={filters.cuisineType}
                        onChange={(e) => updateFilter('cuisineType', e.target.value)}
                        className="w-full p-2.5 bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 dark:text-white text-sm"
                        disabled={isLoading}
                      >
                        <option value="">Any Cuisine</option>
                        {filterOptions.cuisineTypes.map((cuisine) => (
                          <option key={cuisine} value={cuisine}>
                            {cuisine}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Meal Type */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                        Meal Type
                      </label>
                      <select
                        value={filters.mealType}
                        onChange={(e) => updateFilter('mealType', e.target.value)}
                        className="w-full p-2.5 bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 dark:text-white text-sm"
                        disabled={isLoading}
                      >
                        <option value="">Any Meal</option>
                        {filterOptions.mealTypes.map((mealType) => (
                          <option key={mealType} value={mealType}>
                            {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Difficulty */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                        Difficulty
                      </label>
                      <select
                        value={filters.difficulty}
                        onChange={(e) => updateFilter('difficulty', e.target.value)}
                        className="w-full p-2.5 bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 dark:text-white text-sm"
                        disabled={isLoading}
                      >
                        <option value="">Any Difficulty</option>
                        {filterOptions.difficulties.map((difficulty) => (
                          <option key={difficulty} value={difficulty}>
                            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Clear Filters Button */}
                  {hasActiveFilters && (
                    <motion.button
                      type="button"
                      onClick={clearFilters}
                      className="w-full py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-bold text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Clear All Filters
                    </motion.button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Generate Button */}
          <motion.button
            type="submit"
            disabled={!mood.trim() || isLoading}
            className="relative w-full mt-5 sm:mt-6 py-3.5 sm:py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-black text-base rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl hover:shadow-green-500/50 overflow-hidden group"
            whileHover={{ scale: !mood.trim() || isLoading ? 1 : 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center gap-2 relative z-10"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  Finding Your Recipe...
                </motion.div>
              ) : (
                <motion.span
                  key="generate"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center gap-1 relative z-10"
                >
                  <span className="text-base sm:text-lg">✨</span>
                  Find Perfect Recipe
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default MoodInputCard;