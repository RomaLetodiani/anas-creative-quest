"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const ParallaxHero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden paper-texture"
      style={{ y, opacity }}
    >
      {/* Dynamic background gradient */}
      <div className="absolute inset-0 gradient-dream opacity-60" />
      <div className="absolute inset-0 gradient-primary opacity-40" />

      {/* Floating gradient orbs */}
      <motion.div
        className="absolute top-20 left-1/4 w-64 h-64 rounded-full gradient-secondary opacity-30 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-20 right-1/4 w-48 h-48 rounded-full gradient-tertiary opacity-25 blur-2xl"
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -40, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Glassmorphism card container */}
        <motion.div
          className="glass-strong organic-border p-8 sm:p-12 lg:p-16 max-w-4xl mx-auto shadow-floating"
          variants={itemVariants}
        >
          <motion.div variants={itemVariants} className="mb-8">
            <motion.h1
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 text-gradient text-glow"
              style={{ fontFamily: "var(--font-display)" }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              AI Art Journey
            </motion.h1>

            <motion.p
              className="text-2xl sm:text-3xl lg:text-4xl text-gray-700 dark:text-gray-200 font-medium mb-4"
              variants={itemVariants}
            >
              Ana Kopadze's Creative Quest
            </motion.p>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6">
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Dive into a world where artificial intelligence meets boundless creativity. Each
              artwork is a testament to the magical possibilities that emerge when human imagination
              collaborates with AI innovation.
            </p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12"
              variants={itemVariants}
            >
              <motion.div
                className="glass organic-border-alt px-8 py-4 shadow-dreamy"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="text-3xl font-bold text-gradient mb-1">19</div>
                <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                  Unique Creations
                </div>
              </motion.div>

              <motion.div
                className="glass organic-border px-8 py-4 shadow-dreamy"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="text-3xl font-bold text-gradient mb-1">31</div>
                <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                  Total Artworks
                </div>
              </motion.div>

              <motion.div
                className="glass organic-border-alt px-8 py-4 shadow-dreamy"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="text-3xl font-bold text-gradient mb-1">∞</div>
                <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                  Inspiration
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="mt-16"
          variants={itemVariants}
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="flex flex-col items-center text-gray-500 dark:text-gray-400">
            <span className="text-sm font-medium mb-2">Explore the Gallery</span>
            <motion.div
              className="w-1 h-8 bg-gradient-to-b from-transparent via-gray-400 to-transparent rounded-full"
              animate={{
                scaleY: [1, 1.5, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};
