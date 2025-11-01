import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-black pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Content */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-800">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4">
                  1. Information We Collect
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Moodplate collects minimal information to provide our recipe generation service:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 ml-4">
                  <li>Mood preferences and recipe selections</li>
                  <li>Saved recipes (stored locally on your device)</li>
                  <li>Anonymous usage data to improve our service</li>
                  <li>No personal identification information is collected</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4">
                  2. How We Use Your Information
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  We use the collected information to:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 ml-4">
                  <li>Generate personalized recipes based on your mood</li>
                  <li>Improve our recipe recommendation algorithm</li>
                  <li>Provide a better user experience</li>
                  <li>Ensure the service functions correctly</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4">
                  3. Data Storage & Security
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Your data is important to us:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 ml-4">
                  <li>Saved recipes are stored locally in your browser</li>
                  <li>We don't store personal information on our servers</li>
                  <li>All data transmission is encrypted</li>
                  <li>You can clear your data at any time by clearing browser storage</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4">
                  4. Third-Party Services
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  We use minimal third-party services:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 ml-4">
                  <li>Unsplash for recipe images (anonymous requests)</li>
                  <li>Vercel for hosting (GDPR compliant)</li>
                  <li>No advertising or tracking services</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4">
                  5. Your Rights
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 ml-4">
                  <li>Access any data we might have about you</li>
                  <li>Request deletion of your data</li>
                  <li>Opt-out of data collection</li>
                  <li>Export your saved recipes</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4">
                  6. Contact Us
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  If you have any questions about this Privacy Policy, please contact us at:{' '}
                  <a 
                    href="mailto:privacy@moodplate.com" 
                    className="text-green-600 dark:text-green-400 hover:underline"
                  >
                    privacy@moodplate.com
                  </a>
                </p>
              </section>
            </div>
          </div>

          {/* Back to Home */}
          <motion.div
            className="text-center mt-8"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/"
              className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-6 rounded-2xl hover:shadow-lg transition-all duration-300"
            >
              Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;