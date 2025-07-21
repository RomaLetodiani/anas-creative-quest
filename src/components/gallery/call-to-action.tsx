import { motion } from 'framer-motion';

export const CallToAction = () => (
  <motion.div className="mt-16 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }}>
    <motion.div
      className="glass organic-border-alt shadow-dreamy mx-auto max-w-2xl p-6"
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      data-aos="fade-up"
      data-aos-delay="1000"
    >
      <p className="mb-4 text-lg text-gray-600 dark:text-gray-300">Ready to start your own creative journey?</p>
      <motion.a
        href="https://www.canva.com/ai-image-generator/"
        target="_blank"
        rel="noopener noreferrer"
        className="gradient-primary inline-flex items-center gap-2 rounded-full px-8 py-3 font-medium text-white transition-all duration-300 hover:shadow-2xl"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        Try Canva AI
      </motion.a>
    </motion.div>
  </motion.div>
);
