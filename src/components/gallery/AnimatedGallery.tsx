'use client';

import { Challenge, challengesMap } from '$/lib/images.data';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { EnhancedModal } from '../modal/EnhancedModal';
import { CallToAction } from './call-to-action';
import { GalleryStatistics } from './gallery-statistics';
import { GlassmorphCard } from './GlassmorphCard';

interface AnimatedGalleryProps {
  challengeSlug?: string | null;
}

export const AnimatedGallery = ({ challengeSlug }: AnimatedGalleryProps) => {
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
    [searchParams],
  );

  useLayoutEffect(() => {
    if (challengeSlug) {
      const challenge = challengesMap.get(challengeSlug);
      if (challenge) {
        setSelectedChallenge(challenge);
      }
    }
  }, [challengeSlug]);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100,
    });
  }, []);

  const openModal = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    router.push(`${pathname}?${createQueryString('challenge', challenge.slug)}`);
  };

  const closeModal = () => {
    setSelectedChallenge(null);
    router.push(`${pathname}?${createQueryString('challenge', '')}`);
  };

  const changeChallenge = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    router.push(`${pathname}?${createQueryString('challenge', challenge.slug)}`);
  };

  return (
    <>
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        {/* Background elements */}
        <div className="gradient-dream absolute inset-0 opacity-5" />

        {/* Floating background shapes */}
        <motion.div
          className="gradient-secondary absolute top-20 left-10 h-32 w-32 rounded-full opacity-20 blur-2xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.div
          className="gradient-tertiary absolute right-10 bottom-20 h-40 w-40 rounded-full opacity-15 blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 20, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl">
          {/* Section header */}
          <div className="mb-16 text-center">
            <motion.div
              className="glass-strong organic-border shadow-floating mx-auto max-w-3xl p-8"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <h2 className="text-gradient text-glow mb-6 text-4xl font-bold sm:text-5xl lg:text-6xl">The Creative Gallery</h2>
              <p className="text-lg leading-relaxed text-gray-600 sm:text-xl dark:text-gray-300">
                Each artwork tells a unique story, capturing moments of inspiration and artistic exploration throughout Ana&apos;s creative journey with AI.
              </p>
            </motion.div>
          </div>

          {/* Gallery grid */}
          <motion.div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from(challengesMap.values()).map((challenge, index) => (
                <GlassmorphCard key={challenge.slug} challenge={challenge} onClick={() => openModal(challenge)} index={index} />
            ))}
          </motion.div>

          <GalleryStatistics />

          <CallToAction />
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
