'use client';

import { motion } from 'framer-motion';

export const FloatingElements = () => {
  const shapes = [
    { size: 60, delay: 0, duration: 20, x: '10%', y: '20%' },
    { size: 40, delay: 2, duration: 25, x: '80%', y: '10%' },
    { size: 80, delay: 4, duration: 18, x: '70%', y: '80%' },
    { size: 35, delay: 1, duration: 22, x: '20%', y: '70%' },
    { size: 55, delay: 3, duration: 28, x: '90%', y: '60%' },
    { size: 45, delay: 5, duration: 24, x: '5%', y: '90%' },
  ];

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className="absolute opacity-10 dark:opacity-5"
          style={{
            left: shape.x,
            top: shape.y,
            width: shape.size,
            height: shape.size,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div
            className={`h-full w-full rounded-full ${index % 3 === 0 ? 'gradient-primary' : index % 3 === 1 ? 'gradient-secondary' : 'gradient-tertiary'}`}
            style={{
              borderRadius: index % 2 === 0 ? '60% 40% 40% 20%' : '40% 60% 20% 40%',
            }}
          />
        </motion.div>
      ))}

      {/* Gradient orbs with glassmorphism */}
      <motion.div
        className="gradient-dream absolute top-1/4 right-1/4 h-96 w-96 rounded-full opacity-20 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="gradient-warm absolute bottom-1/4 left-1/4 h-80 w-80 rounded-full opacity-15 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
};
