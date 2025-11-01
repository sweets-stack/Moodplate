import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { useAuth } from './context/AuthContext';
import api from './services/api';

import { FaTwitter } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';

import AnimatedBackground from './components/AnimatedBackground';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import RecipeCard from './components/RecipeCard';
import MoodAnimation from './components/MoodAnimation';
import Footer from './components/Footer'; // Ensure Footer is imported

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import AuthCallbackPage from './pages/AuthCallbackPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'; // Import new page
import TermsOfServicePage from './pages/TermsOfServicePage'; // Import new page


import { Recipe, SavedRecipe, RecipeFilters } from './types/recipe';

// Contact Section Component
const ContactSection: React.FC = () => {
  const handleEmailClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const email = 'sweetadetoye@gmail.com';
    const subject = 'Project Inquiry from Moodplate';
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
    window.location.href = mailtoLink;
    setTimeout(() => {
      if (document.hasFocus()) {
        navigator.clipboard.writeText(email).then(() => {
          alert(`Email client not found. Copied to clipboard: ${email}`);
        });
      }
    }, 500);
  };

  return (
    <section id="contact" className="py-12 md:py-20 bg-gray-50 dark:bg-black">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, once: true }}
        >
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-4">
            Let's Build Something Amazing
          </h2>
          <p className="text-base md:text-xl text-gray-600 dark:text-gray-400 mb-8 md:mb-12 max-w-2xl mx-auto">
            Interested in collaborating or have a project in mind? Let's connect.
          </p>
          <div className="flex justify-center gap-6 mb-8 md:mb-12">
            <motion.a href="https://twitter.com/sweetsstack" target="_blank" rel="noopener noreferrer" whileHover={{ y: -5, scale: 1.1 }}>
              <FaTwitter className="w-6 h-6 md:w-8 md:h-8 text-gray-500 dark:text-gray-400 hover:text-green-500" />
            </motion.a>
            <motion.button onClick={handleEmailClick} whileHover={{ y: -5, scale: 1.1 }} aria-label="Send an email">
              <FiMail className="w-6 h-6 md:w-8 md:h-8 text-gray-500 dark:text-gray-400 hover:text-green-500" />
            </motion.button>
          </div>
          <div className="bg-white dark:bg-green-950 rounded-xl md:rounded-2xl p-6 md:p-8 max-w-2xl mx-auto border border-gray-200 dark:border-gray-800 shadow-lg md:shadow-xl">
            <h3 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white mb-4">
              Need a Website Like This?
            </h3>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-6">
              This project was developed by <span className="font-bold text-green-500">SweetStack</span>. If you're looking for a professional, high-performance website, feel free to reach out.
            </p>
            <motion.button onClick={handleEmailClick} className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-2 px-6 md:py-3 md:px-8 rounded-lg hover:shadow-lg transition-all duration-300 text-sm md:text-base" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              Contact SweetStack
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// --- MAIN PAGE LOGIC ---
function MainPage() {
  const [currentRecipe, setCurrentRecipe] = useState<Recipe | null>(null);
  const [savedRecipes, setSavedRecipes] = useState<SavedRecipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
      }
    }
  }, [location]);

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      if (user) {
        setIsLoading(true);
        try {
          const response = await api.get('/user/recipes');
          setSavedRecipes(response.data);
        } catch (err) {
          setError("Could not load your saved recipes.");
        } finally {
          setIsLoading(false);
        }
      } else {
        setSavedRecipes([]);
      }
    };
    fetchSavedRecipes();
  }, [user]);

  const handleGenerateRecipe = async (mood: string, filters: RecipeFilters) => {
    setIsLoading(true);
    setError(null);
    setCurrentRecipe(null);
    try {
      const response = await api.post('/recipes/generate', { mood, ...filters });
      setCurrentRecipe(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to generate a recipe.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewRecipe = (recipe: SavedRecipe) => {
    setCurrentRecipe(recipe);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveRecipe = async () => {
    if (!user) {
      navigate('/login', { state: { from: '/', message: 'Please log in to save recipes' } });
      return;
    }
    if (currentRecipe) {
      try {
        const recipeToSave: SavedRecipe = {
          ...currentRecipe,
          id: Date.now().toString(),
          savedAt: new Date().toISOString()
        };
        const response = await api.post('/user/recipes', recipeToSave);
        setSavedRecipes(response.data);
      } catch (err) {
        setError('Failed to save recipe.');
      }
    }
  };

  const handleDeleteRecipe = async (recipeId: string) => {
    if (!user) return;
    try {
      const response = await api.delete(`/user/recipes/${recipeId}`);
      setSavedRecipes(response.data);
      if (currentRecipe && 'id' in currentRecipe && (currentRecipe as SavedRecipe).id === recipeId) {
        setCurrentRecipe(null);
      }
    } catch (err) {
      setError('Failed to delete recipe.');
    }
  };

  return (
    <div className="relative z-10">
      <section id="hero" className="pt-16 md:pt-20">
        {!currentRecipe && (
          <HeroSection
            onGenerateRecipe={handleGenerateRecipe}
            isLoading={isLoading}
          />
        )}
      </section>

      {isLoading && <MoodAnimation />}

      {error && (
        <div className="text-center my-4 p-3 md:p-4 bg-red-500/20 text-red-500 rounded-md max-w-lg mx-auto text-sm md:text-base">
          {error}
          <button onClick={() => setError(null)} className="ml-4 font-bold">X</button>
        </div>
      )}

      {currentRecipe && !isLoading && (
        <div className="container mx-auto px-3 md:px-4 py-6 md:py-8">
          <RecipeCard
            recipe={currentRecipe}
            onSave={handleSaveRecipe}
            onRegenerate={() => setCurrentRecipe(null)}
            onDelete={savedRecipes.find(r => r.dishName === currentRecipe.dishName) ? () => handleDeleteRecipe(savedRecipes.find(r => r.dishName === currentRecipe.dishName)!.id) : undefined}
            isSaved={savedRecipes.some(r => r.dishName === currentRecipe.dishName)}
          />
        </div>
      )}

      <section id="saved-recipes" className="py-8 md:py-12">
        {user && savedRecipes.length > 0 && !currentRecipe && (
          <div className="container mx-auto px-3 md:px-4">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white mb-4">
                Your Saved Recipes
              </h2>
            </motion.div>
            <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {savedRecipes.map(recipe => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  isSaved={true}
                  onRegenerate={() => handleViewRecipe(recipe)}
                  onDelete={() => handleDeleteRecipe(recipe.id)}
                  compact={true}
                />
              ))}
            </div>
          </div>
        )}
      </section>

      <section id="about" className="py-12 md:py-20 bg-green-100 dark:bg-green-950">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-black mb-4">About Moodplate</h2>
            <p className="text-base md:text-xl max-w-3xl mx-auto text-gray-600 dark:text-gray-400">
                Moodplate creates personalized recipes based on your current mood, weather, and time of day. Find the perfect dish to match your vibe.
            </p>
        </div>
      </section>

      <ContactSection /> {/* Contact section is already here */}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen relative flex flex-col overflow-hidden">
        <AnimatedBackground />
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
            <Route path="/auth/callback" element={<AuthCallbackPage />} />
            {/* New Routes for Privacy Policy and Terms of Service */}
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          </Routes>
        </main>
        <Footer /> {/* Footer renders the links */}
      </div>
    </ThemeProvider>
  );
}

export default App;