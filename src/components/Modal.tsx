"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

interface ModalProps {
  challenge: {
    id: number;
    name: string;
    images: string[];
    linkedin: string;
  } | null;
  onClose: () => void;
}

export const Modal = ({ challenge, onClose }: ModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Reset image index when challenge changes
  useEffect(() => {
    setCurrentImageIndex(0);
    setImageLoaded(false);
  }, [challenge]);

  const goToNext = useCallback(() => {
    if (!challenge) return;
    setImageLoaded(false);
    setCurrentImageIndex((prev) => (prev === challenge.images.length - 1 ? 0 : prev + 1));
  }, [challenge]);

  const goToPrevious = useCallback(() => {
    if (!challenge) return;
    setImageLoaded(false);
    setCurrentImageIndex((prev) => (prev === 0 ? challenge.images.length - 1 : prev - 1));
  }, [challenge]);

  // Keyboard navigation
  useEffect(() => {
    if (!challenge) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        goToNext();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [challenge, onClose, goToPrevious, goToNext]);

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

  const goToImage = useCallback((index: number) => {
    setImageLoaded(false);
    setCurrentImageIndex(index);
  }, []);

  if (!challenge) return null;

  const hasMultipleImages = challenge.images.length > 1;

  return (
    <div
      className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative max-w-6xl max-h-full w-full">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-full p-2 transition-colors duration-200"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Image container */}
        <div className="relative bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
          <div className="relative aspect-square max-h-[70vh]">
            {/* Loading spinner */}
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
              </div>
            )}

            <Image
              src={challenge.images[currentImageIndex]}
              alt={`${challenge.name} - Image ${currentImageIndex + 1}`}
              fill
              className={`object-contain transition-opacity duration-300 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
              priority
            />

            {/* Navigation arrows for multiple images */}
            {hasMultipleImages && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-full p-3 transition-colors duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-full p-3 transition-colors duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </>
            )}

            {/* Image counter */}
            {hasMultipleImages && (
              <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                {currentImageIndex + 1} of {challenge.images.length}
              </div>
            )}
          </div>

          {/* Challenge info */}
          <div className="p-6 bg-white dark:bg-gray-900">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {challenge.name}
            </h2>

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <p className="text-gray-600 dark:text-gray-300">
                Challenge #{challenge.id} • Created with Canva AI
              </p>

              <a
                href={challenge.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                View Original Post
              </a>
            </div>
          </div>

          {/* Image dots for multiple images */}
          {hasMultipleImages && (
            <div className="flex justify-center gap-2 p-4 bg-gray-50 dark:bg-gray-800">
              {challenge.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                    index === currentImageIndex
                      ? "bg-violet-500"
                      : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
