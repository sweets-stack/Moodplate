import React from 'react';
import { motion } from 'framer-motion';
import { UilHeart, UilGithub, UilTwitter, UilInstagram } from '@iconscout/react-unicons';
import ThemeToggle from './ThemeToggle';
import { useNavigate } from 'react-router-dom'; // <--- Make sure useNavigate is imported here

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate(); // <--- Initialize useNavigate here

  // Define handleScrollToSection INSIDE the component, where navigate is available
  const handleScrollToSection = (sectionId: string) => {
    navigate('/', { state: { scrollTo: sectionId } });
  };

  return (
    <footer className="border-t border-gray-200 dark:border-green-950 bg-white/50 dark:bg-black/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
         {/* Left - Brand with Logo */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  className="text-center md:text-left flex items-center gap-2 md:gap-3"
>
  {/* Light mode logo */}
  <img
    src="/logo name.png"
    alt="Moodplate"
    className="h-4 md:h-6 w-auto dark:hidden" 

  />
  {/* Dark mode logo */}
  <img
    src="/logo name white.png"
    alt="Moodplate"
    className="h-4 md:h-6 w-auto hidden dark:block" 
  />
  <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm">
    AI-powered recipes for every mood
  </p>
</motion.div>

          {/* Center - Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-3 md:gap-4"
          >
            {[
              { icon: <UilGithub size={18} className="md:w-5 md:h-5" />, label: 'GitHub', href: 'https://github.com/sweets-stack' },
              { icon: <UilTwitter size={18} className="md:w-5 md:h-5" />, label: 'Twitter', href: 'https://x.com/sweetsstack?s=21' },
              { icon: <UilInstagram size={18} className="md:w-5 md:h-5" />, label: 'Instagram', href: 'https://www.instagram.com/thereal_toye?igsh=eXg5bTJnenl4YTJ3&utm_source=qr' },
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-300 p-1.5 md:p-2 rounded-lg hover:bg-white/50 dark:hover:bg-green-800/50"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={social.label}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>

          {/* Right - Theme Toggle and Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 md:gap-4"
          >
            <ThemeToggle />
            <div className="text-gray-600 dark:text-gray-400 text-xs md:text-sm flex items-center gap-1">
              <span>© {currentYear} Made with</span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <UilHeart size={14} className="md:w-4 md:h-4 text-red-500" />
              </motion.span>
              <span>by Moodplate</span>
            </div>
          </motion.div>
        </div>

        {/* Bottom Links */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-200 dark:border-gray-700 text-center"
      >
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs md:text-sm text-gray-600 dark:text-gray-400">
          <motion.a
            href="/PrivacyPolicyPage"
            className="hover:text-green-600 dark:hover:text-green-400 transition-colors duration-300"
            whileHover={{ y: -1 }}
          >
            Privacy Policy
          </motion.a>
          <motion.a
            href="/TermsOfServicePage"
            className="hover:text-green-600 dark:hover:text-green-400 transition-colors duration-300"
            whileHover={{ y: -1 }}
          >
            Terms of Service
          </motion.a>
          <motion.button
            onClick={() => handleScrollToSection('contact')} // Now handleScrollToSection is defined
            className="hover:text-green-600 dark:hover:text-green-400 transition-colors duration-300"
            whileHover={{ y: -1 }}
          >
            Contact
          </motion.button>
          <motion.button
            onClick={() => handleScrollToSection('about')} // Now handleScrollToSection is defined
            className="hover:text-green-600 dark:hover:text-green-400 transition-colors duration-300"
            whileHover={{ y: -1 }}
          >
            About
          </motion.button>
        </div>
      </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

// The recipe data sanitizer utility and its types are below,
// and it's generally good practice to keep these in a separate utility file (e.g., src/utils/recipeSanitizer.ts)
// if they are not directly related to the Footer component's logic.
// I'll keep them here for now as you provided them together, but consider moving them.

export interface Ingredient {
  name: string;
  qty?: string;
  unit?: string;
  note?: string;
}

export interface Recipe {
  dishName: string;
  description: string;
  ingredients: Ingredient[] | string[];
  steps: string[];
  cookTimeMin: number;
  prepTimeMin: number;
  tags: string[];
  imageUrl: string;
  servings?: number;
  difficulty?: string;
}

export function sanitizeRecipe(recipeData: any): Recipe {
  // Ensure ingredients are properly formatted
  let ingredients: Ingredient[] = [];

  if (Array.isArray(recipeData.ingredients)) {
    ingredients = recipeData.ingredients.map((ing: any) => {
      if (typeof ing === 'string') {
        // Convert string to ingredient object
        return { name: ing.trim() };
      } else if (typeof ing === 'object' && ing !== null) {
        // Ensure it has the required structure
        return {
          name: ing.name || ing.ingredient || 'Unknown',
          qty: ing.qty || ing.quantity || '',
          unit: ing.unit || '',
          note: ing.note || ''
        };
      }
      return { name: 'Invalid ingredient' };
    });
  }

  // Ensure steps are properly formatted
  let steps: string[] = [];
  if (Array.isArray(recipeData.steps)) {
    steps = recipeData.steps.map((step: any, index: number) => {
      if (typeof step === 'string') {
        return step;
      } else {
        return `Step ${index + 1}: ${JSON.stringify(step)}`;
      }
    });
  }

  // Calculate total time - removed as it's not being used in the returned Recipe object
  // const totalTime = (recipeData.prepTimeMin || 0) + (recipeData.cookTimeMin || 0);

  return {
    dishName: recipeData.dishName || recipeData.name || 'Unknown Dish',
    description: recipeData.description || 'No description available',
    ingredients,
    steps,
    cookTimeMin: recipeData.cookTimeMin || 0,
    prepTimeMin: recipeData.prepTimeMin || 0,
    tags: Array.isArray(recipeData.tags) ? recipeData.tags : [],
    imageUrl: recipeData.imageUrl || '/fallback-image.png',
    servings: recipeData.servings || 2,
    difficulty: recipeData.difficulty || 'easy'
  };
}

export function formatIngredient(ingredient: Ingredient | string): string {
  if (typeof ingredient === 'string') {
    return ingredient;
  }

  let formatted = ingredient.name;
  if (ingredient.qty) {
    formatted += ` - ${ingredient.qty}`;
  }
  if (ingredient.unit) {
    formatted += ` ${ingredient.unit}`;
  }
  if (ingredient.note) {
    formatted += ` (${ingredient.note})`;
  }

  return formatted;
}