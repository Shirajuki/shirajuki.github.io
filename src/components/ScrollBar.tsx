import { motion, useScroll } from 'framer-motion';

const ScrollBar = () => {
  const { scrollYProgress } = useScroll();
  return (
    <>
      <motion.div
        style={{
          position: 'fixed',
          scaleX: scrollYProgress,
          translateX: '-50%',
          top: '0.5rem',
          height: '0.25rem',
        }}
        className="left-1/2 w-[calc(100%-2rem)] z-50 rounded-full bg-primary-100"
      />
    </>
  );
};

export default ScrollBar;
