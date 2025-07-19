"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import { Challenge } from "$/lib/images";

interface GlassmorphCardProps {
  challenge: Challenge;
  onClick: () => void;
  index: number;
}

export const GlassmorphCard = ({ challenge, onClick, index }: GlassmorphCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const hasMultipleImages = challenge.images.length > 1;

  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-100, 100], [30, -30]));
  const rotateY = useSpring(useTransform(mouseX, [-100, 100], [-30, 30]));

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  // Dynamic gradient based on image index
  const gradientClass = [
    "gradient-primary",
    "gradient-secondary",
    "gradient-tertiary",
    "gradient-warm",
    "gradient-dream",
  ][index % 5];

  return (
    <motion.div
      ref={cardRef}
      className="group relative overflow-hidden cursor-pointer"
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      whileHover={{
        scale: 1.05,
        y: -10,
        transition: { duration: 0.3 },
      }}
    >
      {/* Glass background with dynamic gradient */}
      <motion.div
        className="absolute inset-0 glass organic-border shadow-floating"
        style={{
          background: isHovered ? "rgba(255, 255, 255, 0.4)" : "rgba(255, 255, 255, 0.25)",
        }}
        animate={{
          backdropFilter: isHovered ? "blur(40px)" : "blur(20px)",
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Gradient overlay that appears on hover */}
      <motion.div
        className={`absolute inset-0 ${gradientClass} organic-border opacity-0`}
        animate={{
          opacity: isHovered ? 0.1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Main content */}
      <div className="relative z-10 p-4 h-full">
        {/* Image container */}
        <div className="relative aspect-square mb-4 overflow-hidden organic-border-alt shadow-dreamy">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 glass-strong flex items-center justify-center">
              <motion.div
                className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </div>
          )}

          {imageError ? (
            <div className="absolute inset-0 glass-strong flex items-center justify-center">
              <div className="text-center text-gray-500 dark:text-gray-400">
                <div className="text-2xl mb-2">🎨</div>
                <p className="text-sm">Artwork Loading</p>
              </div>
            </div>
          ) : (
            <motion.div
              className="relative w-full h-full"
              initial={{ scale: 1.1 }}
              animate={{
                scale: imageLoaded ? 1 : 1.1,
                opacity: imageLoaded ? 1 : 0,
              }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src={challenge.images[0]}
                alt={challenge.name}
                fill
                className="object-cover"
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />

              {/* Overlay gradient on image */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"
                animate={{
                  opacity: isHovered ? 0.7 : 0.3,
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          )}

          {/* Multi-image indicator */}
          {hasMultipleImages && (
            <motion.div
              className="absolute top-3 right-3 glass-strong rounded-full px-3 py-1.5 text-xs font-bold text-gray-700 dark:text-gray-200"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
              whileHover={{ scale: 1.1 }}
            >
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clipRule="evenodd"
                  />
                </svg>
                {challenge.images.length}
              </div>
            </motion.div>
          )}
        </div>

        {/* Title section */}
        <motion.div
          className="space-y-2"
          animate={{
            y: isHovered ? -5 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.h3
            className="font-bold text-lg leading-tight text-gray-800 dark:text-gray-100 text-center"
            animate={{
              color: isHovered ? "#667eea" : undefined,
            }}
            transition={{ duration: 0.3 }}
          >
            {challenge.name}
          </motion.h3>

          <motion.div
            className="text-center text-sm text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              height: isHovered ? "auto" : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-center gap-2">
              <span>Challenge #{challenge.id}</span>
              <span className="w-1 h-1 bg-current rounded-full" />
              <span>AI Generated</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Shimmer effect on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ x: "-100%" }}
          animate={{
            x: isHovered ? "100%" : "-100%",
          }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
        </motion.div>
      </div>

      {/* Floating corner accents */}
      <motion.div
        className="absolute top-2 left-2 w-3 h-3 bg-gradient-to-br from-violet-400 to-purple-500 rounded-full opacity-60"
        animate={{
          scale: isHovered ? [1, 1.2, 1] : 1,
          opacity: isHovered ? [0.6, 1, 0.6] : 0.6,
        }}
        transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
      />

      <motion.div
        className="absolute bottom-2 right-2 w-2 h-2 bg-gradient-to-br from-pink-400 to-red-500 rounded-full opacity-50"
        animate={{
          scale: isHovered ? [1, 1.3, 1] : 1,
          opacity: isHovered ? [0.5, 0.8, 0.5] : 0.5,
        }}
        transition={{ duration: 2.5, repeat: isHovered ? Infinity : 0 }}
      />
    </motion.div>
  );
};
