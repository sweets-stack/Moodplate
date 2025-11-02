import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const TermsOfServicePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100 pt-16">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4">
              Terms of Service
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Back Button */}
          <div className="mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center text-green-500 hover:text-green-600 font-semibold transition-colors"
            >
              ← Back to Home
            </Link>
          </div>

          {/* Content */}
          <div className="bg-white dark:bg-gray-900/50 rounded-2xl p-6 md:p-8 shadow-lg border border-gray-200 dark:border-gray-800 space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Acceptance of Terms</h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>
                  By accessing and using Moodplate ("the Service"), you accept and agree to be bound by the terms and provision of this agreement.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Description of Service</h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>
                  Moodplate is a recipe recommendation service that provides personalized recipe suggestions based on your mood, weather conditions, time of day, and other preferences.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. User Accounts</h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>When you create an account with us, you must provide accurate and complete information. You are responsible for:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Maintaining the confidentiality of your account and password</li>
                  <li>All activities that occur under your account</li>
                  <li>Notifying us immediately of any unauthorized use of your account</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. User Responsibilities</h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>You agree not to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Use the Service for any illegal purpose</li>
                  <li>Attempt to gain unauthorized access to any part of the Service</li>
                  <li>Interfere with or disrupt the Service or servers</li>
                  <li>Use any robot, spider, or other automatic device to access the Service</li>
                  <li>Harass, abuse, or harm another person</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Intellectual Property</h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>
                  The Service and its original content, features, and functionality are owned by SweetStack and are protected by international copyright, trademark, and other intellectual property laws.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Recipe Content</h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>
                  The recipes provided through our Service are for personal, non-commercial use. While we strive to provide accurate recipe information, we cannot guarantee the accuracy, completeness, or reliability of any recipe content.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. Termination</h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>
                  We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">8. Limitation of Liability</h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>
                  In no event shall SweetStack, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">9. Disclaimer</h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>
                  Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">10. Governing Law</h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>
                  These Terms shall be governed and construed in accordance with the laws of Nigeria, without regard to its conflict of law provisions.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">11. Changes to Terms</h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">12. Contact Information</h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>
                  If you have any questions about these Terms, please contact us at:
                </p>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <p className="font-semibold">SweetStack</p>
                  <p>Email: sweetadetoye@gmail.com</p>
                  <p>Twitter: @sweetsstack</p>
                </div>
              </div>
            </section>
          </div>

          {/* Back to Top */}
          <div className="mt-8 text-center">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-green-500 hover:text-green-600 font-semibold transition-colors"
            >
              ↑ Back to Top
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;