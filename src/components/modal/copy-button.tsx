"use client";

import { motion } from "framer-motion";
import { useCallback, useState } from "react";

type CopyButtonProps = {
  challengeSlug: string;
};

export const CopyButton = ({ challengeSlug }: CopyButtonProps) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleShare = useCallback(async () => {
    const url = `${window.location.origin}${window.location.pathname}?challenge=${challengeSlug}`;

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
  }, [challengeSlug]);
  return (
    <motion.button
      onClick={handleShare}
      className="relative cursor-pointer inline-flex items-center gap-3 glass-strong px-3 py-2 sm:w-28 rounded-full text-gray-700 dark:text-gray-200 hover:scale-105 transition-transform duration-200 font-medium"
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-green-500 hidden sm:inline">Copied!</span>
        </motion.div>
      ) : (
        <>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
  );
};
