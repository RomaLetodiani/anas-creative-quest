'use client';

import { LINKEDIN_URL } from '$/lib/socials';
import { motion } from 'framer-motion';
import Link from 'next/link';

export const Footer = () => (
  <footer className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-white px-4 py-20 sm:px-6 lg:px-8 dark:from-gray-900 dark:to-gray-800">
    {/* Background elements */}
    <div className="gradient-primary absolute inset-0 opacity-5" />

    {/* Floating shapes in footer */}
    <motion.div
      className="gradient-warm absolute top-10 right-20 h-24 w-24 rounded-full opacity-20 blur-xl"
      animate={{
        y: [0, -20, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />

    <div className="relative z-10 mx-auto max-w-6xl">
      <div className="mb-12 text-center">
        <div className="glass-strong organic-border shadow-floating p-10">
          <Link href={LINKEDIN_URL} className="block">
            <motion.h3
              className="text-gradient mb-6 text-3xl font-bold sm:text-4xl"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300, damping: 10 }}
            >
              Ana Kopadze
            </motion.h3>
          </Link>

          <motion.div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <motion.a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-strong organic-border shadow-dreamy inline-flex items-center gap-3 px-8 py-4 font-medium text-gray-700 transition-all duration-300 hover:scale-105 dark:text-gray-200"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              Connect on LinkedIn
            </motion.a>

            <motion.a
              href="https://www.canva.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="gradient-primary organic-border-alt inline-flex items-center gap-3 px-8 py-4 font-medium text-white transition-all duration-300 hover:shadow-2xl"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
              Explore Canva
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="border-t border-gray-200 pt-8 dark:border-gray-700">
        <div className="glass organic-border-alt shadow-dreamy p-6 text-center">
          <div className="mx-auto flex items-center justify-center gap-2 text-gray-600 dark:text-gray-300">
            <motion.div
              className="h-2 w-2 rounded-full bg-gradient-to-r from-violet-500 to-purple-500"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <span className="text-sm font-medium">AI Art Collection</span>
            <motion.div
              className="h-2 w-2 rounded-full bg-gradient-to-r from-pink-500 to-red-500"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  </footer>
);
