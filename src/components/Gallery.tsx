"use client";

import { useState } from "react";
import { ChallengeCard } from "./ChallengeCard";
import { Modal } from "./Modal";

interface Challenge {
  id: number;
  name: string;
  images: string[];
  linkedin: string;
}

interface GalleryProps {
  challenges: Challenge[];
}

export const Gallery = ({ challenges }: GalleryProps) => {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);

  const openModal = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
  };

  const closeModal = () => {
    setSelectedChallenge(null);
  };

  return (
    <>
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              The Creative Gallery
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Each artwork tells a unique story, capturing moments of inspiration and artistic
              exploration throughout the 30-day challenge.
            </p>
          </div>

          {/* Responsive Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {challenges.map((challenge) => (
              <ChallengeCard
                key={challenge.id}
                challenge={challenge}
                onClick={() => openModal(challenge)}
              />
            ))}
          </div>

          {/* Gallery Stats */}
          <div className="mt-16 bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-violet-600 dark:text-violet-400 mb-2">
                  {challenges.length}
                </div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">
                  Challenges Completed
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-violet-600 dark:text-violet-400 mb-2">
                  {challenges.reduce((total, challenge) => total + challenge.images.length, 0)}
                </div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">Total Artworks</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-violet-600 dark:text-violet-400 mb-2">
                  30
                </div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">Day Challenge</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <Modal challenge={selectedChallenge} onClose={closeModal} />
    </>
  );
};
