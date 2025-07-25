'use client';

import { Challenge } from '$/lib/images.data';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState } from 'react';

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

  const rotateX = useSpring(useTransform(mouseY, [-50, 50], [30, -30]));
  const rotateY = useSpring(useTransform(mouseX, [-50, 50], [-30, 30]));

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 6;
    const centerY = rect.top + rect.height / 6;

    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  // Dynamic gradient based on image index
  const gradientClass = ['gradient-primary', 'gradient-secondary', 'gradient-tertiary', 'gradient-warm', 'gradient-dream'][index % 5];

  return (
    <motion.div
      ref={cardRef}
      className="group relative cursor-pointer overflow-hidden"
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
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
        ease: 'easeOut',
      }}
      whileHover={{
        scale: 1.05,
        y: -10,
        transition: { duration: 0.7 },
      }}
    >
      {/* Glass background with dynamic gradient */}
      <motion.div
        className="glass organic-border shadow-floating absolute inset-0"
        style={{
          background: isHovered ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.25)',
        }}
        animate={{
          backdropFilter: isHovered ? 'blur(40px)' : 'blur(20px)',
        }}
        transition={{ duration: 0.7 }}
      />

      {/* Gradient overlay that appears on hover */}
      <motion.div
        className={`absolute inset-0 ${gradientClass} organic-border opacity-0`}
        animate={{
          opacity: isHovered ? 0.1 : 0,
        }}
        transition={{ duration: 0.7 }}
      />

      {/* Main content */}
      <div className="organic-border relative z-10 h-full overflow-hidden p-4">
        {/* Image container */}
        <div className="organic-border-alt shadow-dreamy relative mb-4 aspect-square overflow-hidden">
          {!imageLoaded && !imageError && (
            <div className="glass-strong absolute inset-0 flex items-center justify-center">
              <motion.div
                className="h-8 w-8 rounded-full border-2 border-violet-500 border-t-transparent"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          )}

          {imageError ? (
            <div className="glass-strong absolute inset-0 flex items-center justify-center">
              <div className="text-center text-gray-500 dark:text-gray-400">
                <div className="mb-2 text-2xl">🎨</div>
                <p className="text-sm">Artwork Loading</p>
              </div>
            </div>
          ) : (
            <motion.div
              className="relative h-full w-full"
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
                  opacity: isHovered ? 0.7 : 0.7,
                }}
                transition={{ duration: 0.7 }}
              />
            </motion.div>
          )}

          {/* Multi-image indicator */}
          {hasMultipleImages && (
            <motion.div
              className="glass-strong absolute top-3 right-3 rounded-full px-3 py-1.5 text-xs font-bold text-gray-700 dark:text-gray-200"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.7 + index * 0.1, duration: 0.7 }}
              whileHover={{ scale: 1.1 }}
            >
              <div className="flex items-center gap-1">
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
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
          transition={{ duration: 0.7 }}
        >
          <motion.h3 className="text-center text-lg leading-tight font-bold text-gray-800 dark:text-gray-100" transition={{ duration: 0.7 }}>
            {challenge.name}
          </motion.h3>
        </motion.div>

        {/* Shimmer effect on hover */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          initial={{ x: '-100%' }}
          animate={{
            x: isHovered ? '100%' : '-100%',
          }}
          transition={{ duration: 0.6 }}
        >
          <div className="h-full w-full skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </motion.div>
      </div>

      {/* Floating corner accents */}
      <motion.div
        className="absolute top-3 left-3 h-3 w-3 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 opacity-60"
        animate={{
          scale: isHovered ? [1, 1.2, 1] : 1,
          opacity: isHovered ? [0.6, 1, 0.6] : 0.6,
        }}
        transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
      />

      <motion.div
        className="absolute right-3 bottom-3 h-2 w-2 rounded-full bg-gradient-to-br from-pink-400 to-red-500 opacity-50"
        animate={{
          scale: isHovered ? [1, 1.3, 1] : 1,
          opacity: isHovered ? [0.5, 0.8, 0.5] : 0.5,
        }}
        transition={{ duration: 2.5, repeat: isHovered ? Infinity : 0 }}
      />
    </motion.div>
  );
};
