import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { initializedAtom } from '../../utils/store';
import Lottie, { useLottie } from 'lottie-react';
import animationData from '../../lotties/jonny.json';
import { useEffect, useRef } from 'react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 2.25,
    },
  },
};
const item = {
  hidden: { opacity: 0, translateY: '-10%' },
  show: { opacity: 1, translateY: '0' },
};

const Hero = () => {
  const [initialized, setInitialized] = useAtom(initializedAtom);
  const lottieRef = useRef(null);
  const { play, View } = useLottie({
    loop: false,
    autoplay: false,
    onComplete: () => {
      setInitialized(true);
    },
    style: {
      display: 'flex',
      justifyContent: 'center',
    },
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
      className: '!h-[auto] !w-[auto]',
    },
  });

  useEffect(() => {
    setTimeout(() => {
      play();
    }, 1000);
  }, []);

  return (
    <>
      <div className="absolute overflow-hidden top-8 left-1/2 -translate-x-1/2 w-[calc(100vw-4rem)] h-[calc(100vh-4rem)] [mask:linear-gradient(0deg,transparent,white_30%,white_70%,transparent)] opacity-40 rounded-3xl">
        <div className="w-full h-full overflow-hidden rounded-3xl [background-image:url(/hero.png)] bg-cover bg-center [box-shadow:inset_0px_0px_40px_20px_rgba(0,0,0,0.75)] [mask:linear-gradient(90deg,transparent,white_30%,white_70%,transparent)]"></div>
      </div>
      <motion.section
        className="py-14 text-center h-screen flex justify-center items-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <h1 className="text-9xl [line-height:1] fancy-font -translate-y-6">
          <motion.p variants={item} className="text-4xl">
            Hello, I'm
          </motion.p>
          {/* <motion.p variants={item}>Jonny</motion.p> */}
          {View}
          <motion.p variants={item} className="text-4xl px-14">
            A fullstack software developer based in Lillehammer, Norway
          </motion.p>
        </h1>
      </motion.section>
    </>
  );
};
export default Hero;
