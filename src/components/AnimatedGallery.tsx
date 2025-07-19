"use client";

import { useState, useEffect, useLayoutEffect, useCallback } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { GlassmorphCard } from "./GlassmorphCard";
import { EnhancedModal } from "./EnhancedModal";
import { Challenge, challenges, challengesMap, totalArtworks } from "$/lib/images.data";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface AnimatedGalleryProps {
  challengeId?: string | null;
}

export const AnimatedGallery = ({ challengeId }: AnimatedGalleryProps) => {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }

      return params.toString();
    },
    [searchParams]
  );

  useLayoutEffect(() => {
    if (challengeId) {
      const challenge = challengesMap.get(Number(challengeId));
      if (challenge) {
        setSelectedChallenge(challenge);
      }
    }
  }, [challengeId]);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 100,
    });
  }, []);

  const openModal = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    router.push(`${pathname}?${createQueryString("challengeId", challenge.id.toString())}`);
  };

  const closeModal = () => {
    setSelectedChallenge(null);
    router.push(`${pathname}?${createQueryString("challengeId", "")}`);
  };

  const changeChallenge = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    router.push(`${pathname}?${createQueryString("challengeId", challenge.id.toString())}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <>
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 gradient-dream opacity-5" />

        {/* Floating background shapes */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 gradient-secondary opacity-20 rounded-full blur-2xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-20 right-10 w-40 h-40 gradient-tertiary opacity-15 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 20, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="glass-strong organic-border p-8 max-w-3xl mx-auto shadow-floating"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <h2
                className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-gradient text-glow"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                The Creative Gallery
              </h2>
              <p
                className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                Each artwork tells a unique story, capturing moments of inspiration and artistic
                exploration throughout Ana&apos;s creative journey with AI.
              </p>
            </motion.div>
          </motion.div>

          {/* Gallery grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {Array.from(challengesMap.values()).map((challenge, index) => (
              <div
                key={challenge.id}
                data-aos="fade-up"
                data-aos-delay={index * 50}
                data-aos-anchor-placement="top-bottom"
              >
                <GlassmorphCard
                  challenge={challenge}
                  onClick={() => openModal(challenge)}
                  index={index}
                />
              </div>
            ))}
          </motion.div>

          {/* Gallery statistics */}
          <motion.div
            className="mt-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
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
                  <div className="text-4xl sm:text-5xl font-bold text-gradient mb-3">
                    {totalArtworks}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 font-medium text-lg">
                    Total Artworks
                  </div>
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

          {/* Call to action */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.div
              className="glass organic-border-alt p-6 max-w-2xl mx-auto shadow-dreamy"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              data-aos="fade-up"
              data-aos-delay="1000"
            >
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                Ready to start your own creative journey?
              </p>
              <motion.a
                href="https://www.canva.com/ai-image-generator/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 gradient-primary text-white px-8 py-3 rounded-full font-medium hover:shadow-2xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                Try Canva AI
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Modal */}
      <EnhancedModal
        challenge={selectedChallenge}
        allChallenges={Array.from(challengesMap.values())}
        onClose={closeModal}
        onChallengeChange={changeChallenge}
      />
    </>
  );
};
