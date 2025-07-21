'use client';

import { motion } from 'framer-motion';
import { useCallback, useState } from 'react';

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
      console.error('Failed to copy URL:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      } catch (fallbackErr) {
        console.error('Fallback copy failed:', fallbackErr);
      } finally {
        document.body.removeChild(textArea);
      }
    }
  }, [challengeSlug]);
  return (
    <motion.button
      onClick={handleShare}
      className="glass-strong relative inline-flex cursor-pointer items-center gap-3 rounded-full px-3 py-2 font-medium text-gray-700 transition-transform duration-200 hover:scale-105 sm:w-28 dark:text-gray-200"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      disabled={copySuccess}
    >
      {copySuccess ? (
        <motion.div className="flex items-center gap-2" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }}>
          <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="hidden text-green-500 sm:inline">Copied!</span>
        </motion.div>
      ) : (
        <>
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
