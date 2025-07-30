import { motion } from "framer-motion";

const blockAnimate = {
  exit: { y: -10, opacity: 0 },
  initial: { y: -10, opacity: 0 },
  transition: { delay: 0.5 },
  whileInView: { opacity: 1, y: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};
type Props = {
  children: React.ReactNode;
};
const AnimatedBlock = ({ children }: Props) => {
  return (
    <motion.div className="relative block" {...blockAnimate}>
      {children}
    </motion.div>
  );
};
export default AnimatedBlock;
