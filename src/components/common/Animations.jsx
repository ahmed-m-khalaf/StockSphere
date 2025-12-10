import { motion } from 'framer-motion';

// Page transition wrapper
export const PageTransition = ({ children }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
    >
        {children}
    </motion.div>
);

// Fade in animation
export const FadeIn = ({ children, delay = 0, className = '' }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay }}
        className={className}
    >
        {children}
    </motion.div>
);

// Slide up animation
export const SlideUp = ({ children, delay = 0, className = '' }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay, ease: 'easeOut' }}
        className={className}
    >
        {children}
    </motion.div>
);

// Scale on hover
export const ScaleOnHover = ({ children, className = '' }) => (
    <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
        className={className}
    >
        {children}
    </motion.div>
);

// Stagger children animation
export const StaggerContainer = ({ children, className = '' }) => (
    <motion.div
        initial="hidden"
        animate="visible"
        variants={{
            hidden: { opacity: 0 },
            visible: {
                opacity: 1,
                transition: {
                    staggerChildren: 0.1,
                },
            },
        }}
        className={className}
    >
        {children}
    </motion.div>
);

// Stagger item
export const StaggerItem = ({ children, className = '' }) => (
    <motion.div
        variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.3 }}
        className={className}
    >
        {children}
    </motion.div>
);

// Number counter animation
export const AnimatedNumber = ({ value, className = '' }) => (
    <motion.span
        key={value}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={className}
    >
        {value}
    </motion.span>
);

// Card hover effect
export const AnimatedCard = ({ children, className = '' }) => (
    <motion.div
        whileHover={{
            y: -4,
            boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
        }}
        transition={{ duration: 0.2 }}
        className={className}
    >
        {children}
    </motion.div>
);

// Pulse animation for live indicators
export const Pulse = ({ children, className = '' }) => (
    <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className={className}
    >
        {children}
    </motion.div>
);
