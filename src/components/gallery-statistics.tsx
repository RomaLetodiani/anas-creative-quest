import { challengesMap, totalArtworks } from "$/lib/images.data";
import { motion } from "framer-motion";

export const GalleryStatistics = () => (
  <motion.div
    className="mt-20"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.1 }}
  >
    <div
      className="glass-strong organic-border p-8 shadow-floating max-w-4xl mx-auto"
      data-aos="zoom-in"
      data-aos-delay="800"
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <div className="text-4xl sm:text-5xl font-bold text-gradient mb-3">
            {challengesMap.size}
          </div>
          <div className="text-gray-600 dark:text-gray-300 font-medium text-lg">
            Unique Challenges
          </div>
          <div className="w-12 h-1 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full mx-auto mt-2" />
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <div className="text-4xl sm:text-5xl font-bold text-gradient mb-3">{totalArtworks}</div>
          <div className="text-gray-600 dark:text-gray-300 font-medium text-lg">Total Artworks</div>
          <div className="w-12 h-1 bg-gradient-to-r from-pink-500 to-red-500 rounded-full mx-auto mt-2" />
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <div className="text-4xl sm:text-5xl font-bold text-gradient mb-3">∞</div>
          <div className="text-gray-600 dark:text-gray-300 font-medium text-lg">
            Creative Possibilities
          </div>
          <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mt-2" />
        </motion.div>
      </div>
    </div>
  </motion.div>
);
