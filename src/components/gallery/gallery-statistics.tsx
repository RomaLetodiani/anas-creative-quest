import { challengesMap, totalArtworks } from '$/lib/images.data';
import { motion } from 'framer-motion';

export const GalleryStatistics = () => (
  <motion.div className="mt-20" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
    <div className="glass-strong organic-border shadow-floating mx-auto max-w-4xl p-8" data-aos="zoom-in" data-aos-delay="800">
      <div className="grid grid-cols-1 gap-8 text-center sm:grid-cols-3">
        <motion.div whileHover={{ scale: 1.05, y: -5 }} transition={{ type: 'spring', stiffness: 300, damping: 15 }}>
          <div className="text-gradient mb-3 text-4xl font-bold sm:text-5xl">{challengesMap.size}</div>
          <div className="text-lg font-medium text-gray-600 dark:text-gray-300">Unique Challenges</div>
          <div className="mx-auto mt-2 h-1 w-12 rounded-full bg-gradient-to-r from-violet-500 to-purple-500" />
        </motion.div>

        <motion.div whileHover={{ scale: 1.05, y: -5 }} transition={{ type: 'spring', stiffness: 300, damping: 15 }}>
          <div className="text-gradient mb-3 text-4xl font-bold sm:text-5xl">{totalArtworks}</div>
          <div className="text-lg font-medium text-gray-600 dark:text-gray-300">Total Artworks</div>
          <div className="mx-auto mt-2 h-1 w-12 rounded-full bg-gradient-to-r from-pink-500 to-red-500" />
        </motion.div>

        <motion.div whileHover={{ scale: 1.05, y: -5 }} transition={{ type: 'spring', stiffness: 300, damping: 15 }}>
          <div className="text-gradient mb-3 text-4xl font-bold sm:text-5xl">∞</div>
          <div className="text-lg font-medium text-gray-600 dark:text-gray-300">Creative Possibilities</div>
          <div className="mx-auto mt-2 h-1 w-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
        </motion.div>
      </div>
    </div>
  </motion.div>
);
