import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';
import { wrap } from '@motionone/utils';

type Props = {
  heading: string;
  wrap: [number, number];
  className?: string;
  baseVelocity?: number;
};
const ScrollingHeading = ({ heading, wrap: w, className = '', baseVelocity = 5 }: Props) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(w[0], w[1], v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < -5) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 5) {
      directionFactor.current = 1;
    } else {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div
      className={`-z-10 pointer-events-none absolute left-1/2 -translate-x-1/2 [mask:linear-gradient(90deg,transparent,white_30%,white_70%,transparent)] max-w-[2000px] [text-shadow:3px_3px_0_white,-3px_3px_0_white,-3px_-3px_0_white,3px_-3px_0_white] text-primary-900 ${className}`}
    >
      <motion.div className="text-9xl font-bold flex gap-20" style={{ x }}>
        <p>{heading}</p>
        <p>{heading}</p>
        <p>{heading}</p>
        <p>{heading}</p>
        <p>{heading}</p>
      </motion.div>
    </div>
  );
};
export default ScrollingHeading;
