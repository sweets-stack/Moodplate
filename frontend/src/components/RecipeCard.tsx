import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  UilClock,
  UilBookmark,
  UilShareAlt,
  UilArrowDown,
  UilCheck,
  UilTrashAlt,
  UilHeart
} from '@iconscout/react-unicons';
import { Recipe, SavedRecipe } from '../types/recipe';
import { useAuth } from '../context/AuthContext';

interface RecipeCardProps {
  recipe: Recipe | SavedRecipe;
  onSave?: () => void;
  onRegenerate?: () => void;
  onDelete?: () => void;
  isSaved: boolean;
  compact?: boolean;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  onSave,
  onRegenerate,
  onDelete,
  isSaved,
  compact = false
}) => {
  const { isAuthenticated } = useAuth();
  const [showIngredients, setShowIngredients] = useState(true);
  const [showSteps, setShowSteps] = useState(true);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();

  const totalTime = (recipe.prepTimeMin || 0) + (recipe.cookTimeMin || 0);

  const toggleStep = (index: number) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(index)) {
      newCompleted.delete(index);
    } else {
      newCompleted.add(index);
    }
    setCompletedSteps(newCompleted);
  };

  const getImageUrl = () => {
    const defaultImg = `https://ui-avatars.com/api/?name=${encodeURIComponent(recipe.dishName)}&size=800&background=059669&color=fff&bold=true&format=svg`;
    if (imageError || !recipe.imageUrl) {
      return defaultImg;
    }
    return recipe.imageUrl;
  };

  const handleSaveClick = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/', message: 'Please log in to save recipes' } });
      return;
    }
    if (onSave) {
      onSave();
    }
  };

  const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients.map((ing: any) => ({
    name: ing.name || '',
    qty: ing.qty || '',
    unit: ing.unit || '',
    note: ing.note || ''
  })) : [];

  const steps = Array.isArray(recipe.steps) ? recipe.steps.filter(Boolean).map(String) : [];

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ y: -4, scale: 1.02 }}
        className="bg-white dark:bg-black rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-800 group"
        onClick={() => onRegenerate && onRegenerate()}
      >
        <div className="relative overflow-hidden h-32 sm:h-40 md:h-48">
          <img
            src={getImageUrl()}
            onError={() => setImageError(true)}
            alt={recipe.dishName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          {isSaved && (
            <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
              <div className="bg-green-500 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-bold flex items-center gap-1">
                <UilHeart size={12} className="sm:w-3 sm:h-3" />
                <span className="text-xs">Saved</span>
              </div>
            </div>
          )}

          {onDelete && (
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                onDelete && onDelete();
              }}
              className="absolute top-2 left-2 sm:top-3 sm:left-3 p-1.5 sm:p-2 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <UilTrashAlt size={12} className="sm:w-4 sm:h-4" />
            </motion.button>
          )}

          <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3">
            <h3 className="font-black text-sm sm:text-base md:text-lg text-white mb-1 line-clamp-2">
              {recipe.dishName}
            </h3>
            <p className="text-white/80 text-xs sm:text-sm line-clamp-1">{recipe.description}</p>
          </div>
        </div>

        <div className="p-2 sm:p-3 md:p-4">
          <div className="flex items-center justify-between text-xs sm:text-sm mb-2 sm:mb-3">
            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
              <UilClock size={14} className="sm:w-4 sm:h-4" />
              <span className="font-semibold text-xs sm:text-sm">{totalTime} min</span>
            </div>
            <div className="flex gap-1 flex-wrap justify-end">
              {recipe.tags && recipe.tags.slice(0, 2).map((tag, index) => (
                <span
                  key={index}
                  className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl lg:max-w-5xl mx-auto px-3 sm:px-4"
    >
      <div className="bg-white dark:bg-black rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl lg:shadow-2xl border border-gray-200 dark:border-gray-800">
        {/* Hero Image Section */}
        <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 overflow-hidden group">
          <motion.img
            src={getImageUrl()}
            onError={() => setImageError(true)}
            alt={recipe.dishName}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.5 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          {/* Tags */}
          <div className="absolute top-3 sm:top-4 lg:top-6 right-3 sm:right-4 lg:right-6 flex flex-wrap gap-1 sm:gap-2 justify-end max-w-xs sm:max-w-md">
            {recipe.tags && recipe.tags.slice(0, 3).map((tag, index) => (
              <motion.span
                key={index}
                className="px-2 py-1 sm:px-3 sm:py-1.5 lg:px-4 lg:py-2 bg-white/20 dark:bg-black/40 backdrop-blur-lg text-white text-xs sm:text-sm font-bold rounded-full border border-white/30"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
          
          {/* Title and Description */}
          <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-4 sm:left-6 lg:left-8 right-4 sm:right-6 lg:right-8">
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-2 sm:mb-3 drop-shadow-2xl line-clamp-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {recipe.dishName}
            </motion.h2>
            <motion.p
              className="text-sm sm:text-base lg:text-lg text-white/90 max-w-3xl drop-shadow-lg line-clamp-2 sm:line-clamp-3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {recipe.description}
            </motion.p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="p-4 sm:p-6 lg:p-8 border-b border-gray-200 dark:border-gray-800">
          <div className="flex flex-wrap gap-4 sm:gap-6 justify-center">
            <div className="flex items-center gap-2 sm:gap-3">
              <UilClock size={20} className="sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-green-500" />
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase">Total Time</p>
                <p className="text-lg sm:text-xl lg:text-2xl font-black">{totalTime} min</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-xl sm:text-2xl lg:text-3xl">👥</span>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase">Servings</p>
                <p className="text-lg sm:text-xl lg:text-2xl font-black">{recipe.servings}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-xl sm:text-2xl lg:text-3xl">⚡</span>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase">Difficulty</p>
                <p className="text-lg sm:text-xl lg:text-2xl font-black capitalize">{recipe.difficulty}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Ingredients and Instructions */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 p-4 sm:p-6 lg:p-8">
          {/* Ingredients */}
          <div>
            <button
              onClick={() => setShowIngredients(!showIngredients)}
              className="flex items-center justify-between w-full text-left mb-4 sm:mb-6"
            >
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black">Ingredients ({ingredients.length})</h3>
              <UilArrowDown 
                size={20} 
                className="sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-green-500 transition-transform duration-300"
                style={{ transform: showIngredients ? 'rotate(180deg)' : 'rotate(0deg)' }}
              />
            </button>
            <AnimatePresence>
              {showIngredients && (
                <motion.ul
                  className="space-y-2 sm:space-y-3"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  {ingredients.map((ing, index) => (
                    <li key={index} className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg text-sm sm:text-base">
                      <span className="text-green-500 font-bold mt-0.5">•</span>
                      <span className="font-medium">{ing.qty} {ing.unit} {ing.name}</span>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* Instructions */}
          <div>
            <button
              onClick={() => setShowSteps(!showSteps)}
              className="flex items-center justify-between w-full text-left mb-4 sm:mb-6"
            >
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black">Instructions ({steps.length})</h3>
              <UilArrowDown 
                size={20} 
                className="sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-green-500 transition-transform duration-300"
                style={{ transform: showSteps ? 'rotate(180deg)' : 'rotate(0deg)' }}
              />
            </button>
            <AnimatePresence>
              {showSteps && (
                <motion.ol 
                  className="space-y-3 sm:space-y-4" 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                >
                  {steps.map((step, index) => (
                    <li key={index} className="flex gap-3 sm:gap-4 cursor-pointer" onClick={() => toggleStep(index)}>
                      <div className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl flex items-center justify-center text-white font-black text-sm sm:text-base lg:text-lg ${
                        completedSteps.has(index) ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-700'
                      }`}>
                        {completedSteps.has(index) ? <UilCheck size={16} className="sm:w-5 sm:h-5" /> : index + 1}
                      </div>
                      <p className="pt-1 sm:pt-2 text-sm sm:text-base flex-1">{step}</p>
                    </li>
                  ))}
                </motion.ol>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 sm:p-6 lg:p-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
            <motion.button
              onClick={() => onRegenerate && onRegenerate()}
              className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 lg:px-6 lg:py-3 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white font-bold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors text-sm sm:text-base"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <UilShareAlt size={16} className="sm:w-5 sm:h-5" />
              Regenerate
            </motion.button>
            
            {onSave && !isSaved && (
              <motion.button
                onClick={handleSaveClick}
                className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 lg:px-6 lg:py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <UilBookmark size={16} className="sm:w-5 sm:h-5" />
                Save Recipe
              </motion.button>
            )}
            
            {isSaved && (
              <div className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 lg:px-6 lg:py-3 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 font-bold rounded-lg text-sm sm:text-base">
                <UilCheck size={16} className="sm:w-5 sm:h-5" />
                Saved
              </div>
            )}
            
            {onDelete && (
              <motion.button
                onClick={onDelete}
                className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 lg:px-6 lg:py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors text-sm sm:text-base"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <UilTrashAlt size={16} className="sm:w-5 sm:h-5" />
                Delete
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RecipeCard;