import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const TermsOfServicePage: React.FC = () => {
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
              Terms of Service
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
                  1. Acceptance of Terms
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  By accessing and using Moodplate, you accept and agree to be bound by the terms and provision of this agreement.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4">
                  2. Use License
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Permission is granted to temporarily use Moodplate for personal, non-commercial transitory viewing only.
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 ml-4 mt-2">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose</li>
                  <li>Attempt to decompile or reverse engineer any software</li>
                  <li>Remove any copyright or other proprietary notations</li>
                  <li>Transfer the materials to another person</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4">
                  3. Disclaimer
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  The materials on Moodplate are provided on an 'as is' basis. Moodplate makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Further, Moodplate does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4">
                  4. Limitations
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  In no event shall Moodplate or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Moodplate, even if Moodplate or a Moodplate authorized representative has been notified orally or in writing of the possibility of such damage.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4">
                  5. Recipe Content
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  While we strive to provide accurate and safe recipes:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 ml-4">
                  <li>Always check for food allergies and dietary restrictions</li>
                  <li>Follow proper food safety guidelines</li>
                  <li>Consult with healthcare professionals for specific dietary needs</li>
                  <li>Recipe times and results may vary based on individual conditions</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4">
                  6. Revisions and Errata
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  The materials appearing on Moodplate could include technical, typographical, or photographic errors. Moodplate does not warrant that any of the materials on its web site are accurate, complete, or current. Moodplate may make changes to the materials contained on its web site at any time without notice.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4">
                  7. Links
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Moodplate has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Moodplate of the site. Use of any such linked website is at the user's own risk.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4">
                  8. Site Terms of Use Modifications
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Moodplate may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these Terms of Service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4">
                  9. Governing Law
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Any claim relating to Moodplate shall be governed by the laws of the Country without regard to its conflict of law provisions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4">
                  10. Contact Information
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  For any questions about these Terms, please contact us at:{' '}
                  <a 
                    href="mailto:legal@moodplate.com" 
                    className="text-green-600 dark:text-green-400 hover:underline"
                  >
                    legal@moodplate.com
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

export default TermsOfServicePage;