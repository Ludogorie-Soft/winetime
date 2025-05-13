'use client'

import { motion } from 'framer-motion'

const TransitonLayout = ({ children }) => (
  <motion.div
    initial={{ x: 300, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: 300, opacity: 0 }}
    transition={{
      type: 'spring',
      stiffness: 260,
      damping: 20,
    }}
  >
    {children}
  </motion.div>
)
export default TransitonLayout
