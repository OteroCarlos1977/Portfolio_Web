import PropTypes from 'prop-types';
import { motion, useReducedMotion } from 'framer-motion';

const variants = {
  default: {
    hidden: { opacity: 0, y: 42, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1 },
  },
  page: {
    hidden: { opacity: 0, y: 50, rotateX: 8, transformPerspective: 900 },
    visible: { opacity: 1, y: 0, rotateX: 0, transformPerspective: 900 },
  },
};

const RevealSection = ({ children, variant }) => {
  const reduceMotion = useReducedMotion();
  const selectedVariant = variants[variant] || variants.default;

  if (reduceMotion) {
    return children;
  }

  return (
    <motion.div
      className="reveal-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      variants={selectedVariant}
      transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

RevealSection.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'page']),
};

RevealSection.defaultProps = {
  variant: 'default',
};

export default RevealSection;
