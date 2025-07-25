import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const heroAnimate = {
  exit: { y: -10, opacity: 0 },
  initial: { y: -10, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

const Hero = () => {
  return (
    <section class="relative bg-primary w-full top-0 left-0 h-screen flex justify-center items-center text-center -translate-y-16 overflow-hidden">
      <motion.article
        class="relative w-5/12 text-2xl z-20 max-w-lg"
        transition={{ staggerChildren: 2.5, delayChildren: 2.8 }}
      >
        <motion.header class="fancy-font text-foreground" {...heroAnimate}>
          <h2>Hello, i’m</h2>
        </motion.header>
        <motion.section {...heroAnimate}>
          <h1 class="text-7xl font-bold py-5 text-white">Shirajuki</h1>
        </motion.section>
        <motion.footer {...heroAnimate}>
          <h2 class="fancy-font text-foreground">
            A CTF player @Iku-toppene @bootplug @Corax & @RumbleInTheJungle
          </h2>
        </motion.footer>
      </motion.article>

      <div class="absolute top-0 right-0 w-1/2 h-[200vh] bg-primary-dark z-10 rotate-[18deg] -translate-y-3/12 translate-x-6/12" />
    </section>
  );
};
export default Hero;
