"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { Challenge } from "$/lib/images.data";

interface EnhancedModalProps {
  challenge: Challenge | null;
  allChallenges: Challenge[];
  onClose: () => void;
  onChallengeChange: (challenge: Challenge) => void;
}

export const EnhancedModal = ({
  challenge,
  allChallenges,
  onClose,
  onChallengeChange,
}: EnhancedModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [copySuccess, setCopySuccess] = useState(false);

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

  const handleShare = useCallback(async () => {
    if (!challenge) return;

    const url = `${window.location.origin}${window.location.pathname}?challenge=${challenge.slug}`;

    try {
      await navigator.clipboard.writeText(url);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy URL:", err);
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      } catch (fallbackErr) {
        console.error("Fallback copy failed:", fallbackErr);
      } finally {
        document.body.removeChild(textArea);
      }
    }
  }, [challenge]);

  // Keyboard navigation
  useEffect(() => {
    if (!challenge) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft" && e.shiftKey) {
        goToPreviousChallenge();
      } else if (e.key === "ArrowRight" && e.shiftKey) {
        goToNextChallenge();
      } else if (e.key === "ArrowLeft") {
        goToPreviousImage();
      } else if (e.key === "ArrowRight") {
        goToNextImage();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [
    challenge,
    onClose,
    goToPreviousChallenge,
    goToNextChallenge,
    goToPreviousImage,
    goToNextImage,
  ]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (challenge) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
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
          className="absolute inset-0 glass-strong"
          style={{ backdropFilter: "blur(20px)" }}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Modal content */}
        <motion.div
          className="relative w-full max-w-7xl max-h-[95vh] overflow-hidden"
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          {/* Challenge navigation arrows */}
          <motion.button
            onClick={goToPreviousChallenge}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 glass-strong rounded-full md:p-4 p-2 text-white hover:scale-110 transition-transform duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </motion.button>

          <motion.button
            onClick={goToNextChallenge}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 glass-strong rounded-full md:p-4 p-2 text-white hover:scale-110 transition-transform duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>

          <div className="glass-strong organic-border overflow-hidden shadow-floating">
            <motion.div
              className="flex justify-between items-center flex-wrap-reverse gap-3 pl-10 p-4 bg-gray-50 dark:bg-gray-800"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div>
                {/* Challenge counter */}
                <div className="glass-strong text-white  px-4 py-2 rounded-full text-sm font-medium z-10">
                  Challenge {challenge.id} of {allChallenges.length}
                </div>
              </div>
              <div className="flex gap-2 items-center">
                {hasMultipleImages && (
                  <div className="flex gap-4">
                    <motion.button
                      onClick={goToPreviousImage}
                      className=" glass-strong rounded-full p-2 text-white z-10"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </motion.button>

                    <div className="flex gap-2 items-center">
                      {challenge.images.map((_, index) => (
                        <motion.button
                          key={index}
                          onClick={() => goToImage(index)}
                          className={`w-3 h-3 rounded-full transition-all duration-200 ${
                            index === currentImageIndex
                              ? "bg-violet-500 scale-125"
                              : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                          }`}
                          whileHover={{ scale: index === currentImageIndex ? 1.25 : 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        />
                      ))}
                    </div>
                    <motion.button
                      onClick={goToNextImage}
                      className="glass-strong rounded-full p-2 text-white z-10"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </motion.button>
                  </div>
                )}
              </div>

              <div>
                {/* Close button */}
                <motion.button
                  onClick={onClose}
                  className="cursor-pointer glass-strong rounded-full p-1 text-white hover:scale-110 transition-transform duration-200"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
            {/* Image container with dynamic sizing */}
            <div className="relative bg-black overflow-hidden">
              <div
                className="relative w-full h-full"
                style={{
                  minHeight: "50vh",
                  maxHeight: "60vh",
                  aspectRatio: "auto",
                }}
              >
                <motion.div
                  key={`${challenge.id}-${currentImageIndex}`}
                  className="relative w-full h-full"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  {challenge.images[currentImageIndex] ? (
                    <Image
                      src={challenge.images[currentImageIndex]}
                      alt={`${challenge.name} - Image ${currentImageIndex + 1}`}
                      className="object-contain w-full h-full"
                      priority
                      fill
                      style={{
                        minHeight: "50vh",
                        maxHeight: "60vh",
                        aspectRatio: "auto",
                      }}
                    />
                  ) : null}
                </motion.div>
              </div>
            </div>

            {/* Challenge info */}
            <motion.div
              className="p-6 bg-white dark:bg-gray-900"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex flex-col lg:flex-row md:gap-6 gap-2 items-start lg:items-center justify-between">
                <div className="flex-1">
                  <motion.h2 className="md:text-2xl text-xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2 text-gradient">
                    {challenge.name}
                  </motion.h2>
                </div>

                <div className="flex gap-3 items-center">
                  <motion.a
                    href={challenge.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 glass-strong md:px-6 px-3 md:py-3 py-2 rounded-full text-gray-700 dark:text-gray-200 hover:scale-105 transition-transform duration-200 font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    <span className="hidden sm:inline">View Original Post</span>
                    <span className="sm:hidden">LinkedIn</span>
                  </motion.a>

                  <motion.button
                    onClick={handleShare}
                    className="relative inline-flex items-center gap-3 glass-strong md:px-6 px-3 md:py-3 py-2 rounded-full text-gray-700 dark:text-gray-200 hover:scale-105 transition-transform duration-200 font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={copySuccess}
                  >
                    {copySuccess ? (
                      <motion.div
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <svg
                          className="w-5 h-5 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-green-500 hidden sm:inline">Copied!</span>
                      </motion.div>
                    ) : (
                      <>
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                          />
                        </svg>
                        <span className="hidden sm:inline">Share</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
