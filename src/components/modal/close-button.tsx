import { motion } from 'framer-motion';

type CloseButtonProps = {
  onClose: () => void;
};

export const CloseButton = ({ onClose }: CloseButtonProps) => (
  <div>
    <motion.button
      onClick={onClose}
      className="glass-strong cursor-pointer rounded-full p-1 text-white transition-transform duration-200 hover:scale-110"
      whileHover={{ scale: 1.1, rotate: 90 }}
      whileTap={{ scale: 0.95 }}
    >
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </motion.button>
  </div>
);
