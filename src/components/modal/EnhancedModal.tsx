'use client';

import { Challenge } from '$/lib/images.data';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { CloseButton } from './close-button';
import { CopyButton } from './copy-button';

interface EnhancedModalProps {
  challenge: Challenge | null;
  allChallenges: Challenge[];
  onClose: () => void;
  onChallengeChange: (challenge: Challenge) => void;
}

export const EnhancedModal = ({ challenge, allChallenges, onClose, onChallengeChange }: EnhancedModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Reset image index when challenge changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [challenge]);

  const goToNextChallenge = useCallback(() => {
    if (!challenge) return;
    const currentIndex = allChallenges.findIndex((c) => c.id === challenge.id);
    const nextIndex = currentIndex === allChallenges.length - 1 ? 0 : currentIndex + 1;
    onChallengeChange(allChallenges[nextIndex]);
  }, [challenge, allChallenges, onChallengeChange]);

  const goToPreviousChallenge = useCallback(() => {
    if (!challenge) return;
    const currentIndex = allChallenges.findIndex((c) => c.id === challenge.id);
    const prevIndex = currentIndex === 0 ? allChallenges.length - 1 : currentIndex - 1;
    onChallengeChange(allChallenges[prevIndex]);
  }, [challenge, allChallenges, onChallengeChange]);

  const goToNextImage = useCallback(() => {
    if (!challenge) return;
    setCurrentImageIndex((prev) => (prev === challenge.images.length - 1 ? 0 : prev + 1));
  }, [challenge]);

  const goToPreviousImage = useCallback(() => {
    if (!challenge) return;
    setCurrentImageIndex((prev) => (prev === 0 ? challenge.images.length - 1 : prev - 1));
  }, [challenge]);

  const goToImage = useCallback((index: number) => {
    setCurrentImageIndex(index);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!challenge) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && e.shiftKey) {
        goToPreviousChallenge();
      } else if (e.key === 'ArrowRight' && e.shiftKey) {
        goToNextChallenge();
      } else if (e.key === 'ArrowLeft') {
        goToPreviousImage();
      } else if (e.key === 'ArrowRight') {
        goToNextImage();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [challenge, onClose, goToPreviousChallenge, goToNextChallenge, goToPreviousImage, goToNextImage]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (challenge) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [challenge]);

  if (!challenge) return null;

  const hasMultipleImages = challenge.images.length > 1;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Glassmorphism backdrop */}
        <motion.div
          className="glass-strong absolute inset-0"
          style={{ backdropFilter: 'blur(20px)' }}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Modal content */}
        <motion.div
          className="relative max-h-[95vh] w-full max-w-7xl overflow-hidden"
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        >
          <div className="glass-strong organic-border shadow-floating overflow-hidden">
            <motion.div
              className="flex flex-wrap-reverse items-center justify-between gap-3 bg-gray-50 p-4 pl-10 dark:bg-gray-800"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div>
                {/* Challenge counter */}
                <div className="glass-strong z-10 rounded-full px-4 py-2 text-sm font-medium text-white">
                  Challenge {challenge.id} of {allChallenges.length}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {hasMultipleImages && (
                  <div className="flex gap-4">
                    <motion.button
                      onClick={goToPreviousImage}
                      className="glass-strong z-10 rounded-full p-2 text-white"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </motion.button>

                    <div className="flex items-center gap-2">
                      {challenge.images.map((_, index) => (
                        <motion.button
                          key={index}
                          onClick={() => goToImage(index)}
                          className={`h-3 w-3 rounded-full transition-all duration-200 ${
                            index === currentImageIndex ? 'scale-125 bg-violet-500' : 'bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500'
                          }`}
                          whileHover={{ scale: index === currentImageIndex ? 1.25 : 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        />
                      ))}
                    </div>
                    <motion.button
                      onClick={goToNextImage}
                      className="glass-strong z-10 rounded-full p-2 text-white"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.button>
                  </div>
                )}
              </div>

              <CloseButton onClose={onClose} />
            </motion.div>
            {/* Image container with dynamic sizing */}
            <div className="bg-glass relative overflow-hidden">
              <div
                className="relative h-full w-full"
                style={{
                  minHeight: '50vh',
                  maxHeight: '60vh',
                  aspectRatio: 'auto',
                }}
              >
                <motion.div
                  key={`${challenge.id}-${currentImageIndex}`}
                  className="relative h-full w-full"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  {challenge.images[currentImageIndex] ? (
                    <Image
                      src={challenge.images[currentImageIndex]}
                      alt={`${challenge.name} - Image ${currentImageIndex + 1}`}
                      className="h-full w-full object-contain"
                      priority
                      fill
                      style={{
                        minHeight: '50vh',
                        maxHeight: '60vh',
                        aspectRatio: 'auto',
                      }}
                    />
                  ) : null}
                </motion.div>
              </div>
              {/* Challenge navigation arrows */}
              <motion.button
                onClick={goToPreviousChallenge}
                className="glass-strong absolute top-1/2 left-4 z-20 -translate-y-1/2 cursor-pointer rounded-full p-2 text-white transition-transform duration-200 hover:scale-110 md:p-4"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>

              <motion.button
                onClick={goToNextChallenge}
                className="glass-strong absolute top-1/2 right-4 z-20 -translate-y-1/2 cursor-pointer rounded-full p-2 text-white transition-transform duration-200 hover:scale-110 md:p-4"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </div>

            {/* Challenge info */}
            <motion.div
              className="custom-scrollbar h-[25vh] overflow-y-auto bg-white dark:bg-gray-900"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(167, 139, 250, 0.5) transparent',
              }}
              key={challenge.id}
            >
              <div className="space-y-4 p-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <motion.h2 className="text-gradient mb-2 text-xl font-bold text-gray-900 md:text-2xl lg:text-3xl dark:text-white">{challenge.name}</motion.h2>
                  <div className="flex flex-wrap items-center gap-5">
                    <motion.a
                      href={challenge.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-strong inline-flex items-center gap-3 rounded-full px-3 py-2 font-medium text-gray-700 transition-transform duration-200 hover:scale-105 dark:text-gray-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      <span className="hidden sm:inline">View Original Post</span>
                      <span className="sm:hidden">LinkedIn</span>
                    </motion.a>

                    <CopyButton challengeSlug={challenge.slug} />
                  </div>
                </div>
                <motion.p className="glass-strong rounded-lg p-2 text-sm text-gray-600 dark:text-gray-400">
                  {challenge.description.split('\n').map((line, index) => (
                    <span key={index}>
                      {line}
                      <br />
                    </span>
                  ))}
                </motion.p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
