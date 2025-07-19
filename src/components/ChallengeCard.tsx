import Image from "next/image";
import { useState } from "react";

interface ChallengeCardProps {
  challenge: {
    id: number;
    name: string;
    images: string[];
    linkedin: string;
  };
  onClick: () => void;
}

export const ChallengeCard = ({ challenge, onClick }: ChallengeCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const hasMultipleImages = challenge.images.length > 1;

  return (
    <div
      className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-[1.02]"
      onClick={onClick}
    >
      <div className="relative aspect-square overflow-hidden">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {imageError ? (
          <div className="absolute inset-0 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
            <div className="text-center text-gray-500 dark:text-gray-400">
              <div className="text-2xl mb-2">🖼️</div>
              <p className="text-sm">Image not available</p>
            </div>
          </div>
        ) : (
          <Image
            src={challenge.images[0]}
            alt={challenge.name}
            fill
            className={`object-cover transition-all duration-300 group-hover:scale-105 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        )}

        {/* Multi-image indicator */}
        {hasMultipleImages && (
          <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clipRule="evenodd"
              />
            </svg>
            {challenge.images.length}
          </div>
        )}

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300" />

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <h3 className="text-white font-semibold text-lg leading-tight group-hover:text-violet-200 transition-colors duration-300">
            {challenge.name}
          </h3>
        </div>
      </div>

      {/* Hover effects */}
      <div className="absolute inset-0 ring-0 group-hover:ring-2 group-hover:ring-violet-400 group-hover:ring-offset-2 dark:group-hover:ring-offset-gray-800 transition-all duration-300 rounded-xl" />
    </div>
  );
};
