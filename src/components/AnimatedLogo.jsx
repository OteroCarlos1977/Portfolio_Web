import PropTypes from 'prop-types';
import { animated, useSpring } from '@react-spring/web';
import { useEffect, useState } from 'react';

const usePrefersReducedMotion = () => {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);

    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  return reducedMotion;
};

const AnimatedLogo = ({ src, alt }) => {
  const [isHovered, setIsHovered] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  const logoSpring = useSpring({
    transform: isHovered ? 'scale(1.06)' : 'scale(1)',
    config: { tension: 180, friction: 14 },
  });

  const rotationSpring = useSpring({
    from: { rotation: 0 },
    to: { rotation: reducedMotion ? 0 : 360 },
    loop: !reducedMotion,
    config: { duration: 28000 },
  });

  return (
    <animated.a
      className="logo"
      href="#hero"
      aria-label="Inicio"
      style={logoSpring}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      <animated.img
        src={src}
        alt={alt}
        style={{
          transform: rotationSpring.rotation.to((value) => `rotate(${value}deg)`),
        }}
      />
    </animated.a>
  );
};

AnimatedLogo.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default AnimatedLogo;
