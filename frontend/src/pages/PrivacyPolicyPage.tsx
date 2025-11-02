import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const PrivacyPolicyPage: React.FC = () => {
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
              Privacy Policy
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
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Information We Collect</h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>
                  We collect information that you provide directly to us when you use Moodplate:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Account Information:</strong> When you create an account, we collect your name, email address, and password.</li>
                  <li><strong>Profile Information:</strong> Optional information like your phone number if you choose to provide it.</li>
                  <li><strong>Recipe Preferences:</strong> Your mood inputs, saved recipes, and cooking preferences.</li>
                  <li><strong>Usage Data:</strong> Information about how you interact with our service.</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. How We Use Your Information</h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Personalize your recipe recommendations based on your mood and preferences</li>
                  <li>Communicate with you about updates, security alerts, and support messages</li>
                  <li>Protect against fraud and abuse</li>
                  <li>Develop new features and services</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Information Sharing</h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Service Providers:</strong> With vendors who help us operate our service</li>
                  <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                  <li><strong>Business Transfers:</strong> In connection with a merger or sale of assets</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Data Security</h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>
                  We implement appropriate security measures to protect your personal information. 
                  This includes encryption, secure servers, and regular security assessments. 
                  However, no method of transmission over the Internet is 100% secure.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Your Rights</h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access and update your personal information</li>
                  <li>Delete your account and associated data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Export your data</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Cookies and Tracking</h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>
                  We use cookies and similar technologies to enhance your experience, 
                  analyze usage, and deliver personalized content. You can control 
                  cookies through your browser settings.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. Children's Privacy</h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>
                  Our service is not intended for children under 13. We do not knowingly 
                  collect personal information from children under 13.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">8. Changes to This Policy</h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>
                  We may update this privacy policy from time to time. We will notify you 
                  of any changes by posting the new policy on this page and updating the 
                  "Last updated" date.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">9. Contact Us</h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>
                  If you have any questions about this Privacy Policy, please contact us at:
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

export default PrivacyPolicyPage;