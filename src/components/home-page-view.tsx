"use client";

import { Suspense } from "react";
import { challenges } from "$/lib/images";
import { Header } from "./Header";
import { Gallery } from "./Gallery";
import { Loading, LoadingSkeleton } from "./Loading";

export const HomePageView = () => {
  const totalChallenges = 30; // The full 30-day challenge
  const completedChallenges = challenges.length; // Currently completed challenges

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header Section */}
      <Header totalChallenges={totalChallenges} completedChallenges={completedChallenges} />

      {/* Gallery Section */}
      <Suspense fallback={<LoadingSkeleton />}>
        <Gallery challenges={challenges} />
      </Suspense>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              About Ana Kopadze
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
              A creative professional exploring the intersection of artificial intelligence and
              artistic expression. This 30-day challenge showcases the possibilities of AI-assisted
              creativity using Canva's innovative tools.
            </p>
            <a
              href="https://www.linkedin.com/in/anakopadze/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 font-medium text-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              Connect on LinkedIn
            </a>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <p className="text-gray-500 dark:text-gray-400">
              © 2024 Ana Kopadze. All artworks created using Canva AI during the 30-Day Challenge.
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
              Built with Next.js, TypeScript, and Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
