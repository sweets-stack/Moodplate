import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
        setIsMenuOpen(false);
    };

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const headerHeight = document.querySelector('header')?.clientHeight || 0;
            window.scrollTo({
                top: element.offsetTop - headerHeight - 20,
                behavior: 'smooth'
            });
        } else {
            navigate('/', { state: { scrollTo: sectionId } });
        }
        setIsMenuOpen(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const menuVariants = {
        open: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.2,
                ease: "easeOut"
            }
        },
        closed: {
            opacity: 0,
            scale: 0.95,
            transition: {
                duration: 0.2,
                ease: "easeIn"
            }
        }
    };

    return (
        <motion.header
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-lg border-b border-white/20 dark:border-gray-800/50"
        >
            <div className="container mx-auto px-3 md:px-4 py-3 md:py-4">
                <div className="flex items-center justify-between">
                    <Link 
                        to="/" 
                        className="flex items-center gap-2 md:gap-3 cursor-pointer"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        {/* Small Screen Logo */}
                        <div className="block md:hidden">
                            <img src="/logo small screen black.png" alt="Moodplate" className="h-6 w-auto dark:hidden" />
                            <img src="/logo small screen white.png" alt="Moodplate" className="h-6 w-auto hidden dark:block" />
                        </div>
                        {/* Big Screen Logo */}
                        <div className="hidden md:block">
                            <img src="/logo big screen black.png" alt="Moodplate" className="h-8 md:h-10 w-auto dark:hidden" />
                            <img src="/logo big screen white.png" alt="Moodplate" className="h-8 md:h-10 w-auto hidden dark:block" />
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-4 md:gap-6">
                        <nav className="flex items-center gap-4 md:gap-6 text-sm font-bold text-gray-700 dark:text-gray-300">
                            <button className="hover:text-green-500 transition-colors" onClick={() => scrollToSection('hero')}>Generate</button>
                            {user && <button className="hover:text-green-500 transition-colors" onClick={() => scrollToSection('saved-recipes')}>Saved</button>}
                            <button className="hover:text-green-500 transition-colors" onClick={() => scrollToSection('about')}>About</button>
                            <button className="hover:text-green-500 transition-colors" onClick={() => scrollToSection('contact')}>Contact</button>
                        </nav>
                        
                        <div className="flex items-center gap-2 md:gap-4">
                            {user ? (
                                <motion.button
                                    onClick={handleLogout}
                                    className="px-3 py-1.5 md:px-4 md:py-2 bg-red-500 text-white rounded-lg font-medium text-xs md:text-sm whitespace-nowrap"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    Logout
                                </motion.button>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Link to="/login" className="font-bold text-xs md:text-sm text-gray-700 dark:text-gray-300 hover:text-green-500 transition-colors whitespace-nowrap">Login</Link>
                                    <Link to="/register" className="px-3 py-1.5 md:px-4 md:py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold text-xs md:text-sm transition-colors whitespace-nowrap">Register</Link>
                                </div>
                            )}
                            <ThemeToggle />
                        </div>
                    </div>

                    {/* Mobile Hamburger Menu */}
                    <div className="flex md:hidden items-center gap-2">
                        <ThemeToggle />
                        <button
                            onClick={toggleMenu}
                            className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            aria-label="Toggle menu"
                        >
                            <div className="w-6 h-6 flex flex-col justify-center items-center">
                                <motion.span
                                    animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                                    className="block w-5 h-0.5 bg-current mb-1.5"
                                />
                                <motion.span
                                    animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                                    className="block w-5 h-0.5 bg-current mb-1.5"
                                />
                                <motion.span
                                    animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                                    className="block w-5 h-0.5 bg-current"
                                />
                            </div>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            variants={menuVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 shadow-lg"
                        >
                            <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
                                <button 
                                    className="text-left py-2 font-bold text-gray-700 dark:text-gray-300 hover:text-green-500 transition-colors"
                                    onClick={() => scrollToSection('hero')}
                                >
                                    Generate
                                </button>
                                {user && (
                                    <button 
                                        className="text-left py-2 font-bold text-gray-700 dark:text-gray-300 hover:text-green-500 transition-colors"
                                        onClick={() => scrollToSection('saved-recipes')}
                                    >
                                        Saved Recipes
                                    </button>
                                )}
                                <button 
                                    className="text-left py-2 font-bold text-gray-700 dark:text-gray-300 hover:text-green-500 transition-colors"
                                    onClick={() => scrollToSection('about')}
                                >
                                    About
                                </button>
                                <button 
                                    className="text-left py-2 font-bold text-gray-700 dark:text-gray-300 hover:text-green-500 transition-colors"
                                    onClick={() => scrollToSection('contact')}
                                >
                                    Contact
                                </button>
                                
                                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-2">
                                    {user ? (
                                        <motion.button
                                            onClick={handleLogout}
                                            className="w-full px-4 py-3 bg-red-500 text-white rounded-lg font-medium text-sm text-center"
                                            whileHover={{ scale: 1.02 }}
                                        >
                                            Logout
                                        </motion.button>
                                    ) : (
                                        <div className="flex flex-col gap-3">
                                            <Link 
                                                to="/login" 
                                                className="px-4 py-3 text-center font-bold text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:border-green-500 hover:text-green-500 transition-colors"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                Login
                                            </Link>
                                            <Link 
                                                to="/register" 
                                                className="px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold text-sm text-center transition-colors"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                Register
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.header>
    );
};

export default Header;