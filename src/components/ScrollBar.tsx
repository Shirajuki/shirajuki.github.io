import { motion, useScroll } from "framer-motion";

const ScrollBar = () => {
  const { scrollYProgress } = useScroll();
  return (
    <>
      <motion.div
        style={{
          scaleX: scrollYProgress,
          translateX: "-50%",
        }}
        class="left-1/2 w-full z-50 rounded-full bg-primary-dark top-0 fixed h-1"
      />
    </>
  );
};

export default ScrollBar;
