import { motion } from 'framer-motion';

export const AnimaView = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, x: '25%' }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);
