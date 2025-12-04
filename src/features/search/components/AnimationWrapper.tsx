'use client';

import { motion } from 'framer-motion';

const componentsVariants = {
  initial: { opacity: 0, x: 150 },
  animate: { opacity: 1, x: 0 },
};

const AnimationWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      variants={componentsVariants}
      initial="initial"
      animate="animate"
      transition={{
        type: 'spring',
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimationWrapper;
