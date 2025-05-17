import { useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { wrap } from "@motionone/utils";

type Props = {
  heading: string;
  className?: string;
  baseVelocity?: number;
};
const ScrollingHeading = ({
  heading,
  className = "",
  baseVelocity = 5,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
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

  const [wrapRange, setWrapRange] = useState<[number, number]>([-500, 500]);
  useEffect(() => {
    if (ref.current) {
      const headings = ref.current.querySelectorAll("p");
      if (headings.length === 0) return;
      const singleItemWidth = headings[0].offsetWidth;
      const gap = 80;
      const totalWidth = singleItemWidth * 3 + gap * (3 - 1);
      setWrapRange([-totalWidth, -singleItemWidth]);
    }
  }, []);

  const x = useTransform(
    baseX,
    (v) => `${wrap(wrapRange[0], wrapRange[1], v)}px`,
  );

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 25);
    const velocity = velocityFactor.get();
    directionFactor.current = velocity < -5 ? -1 : 1;

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div
      class={`-z-10 pointer-events-none absolute left-1/2 -translate-x-1/2 [mask:linear-gradient(90deg,transparent,white_30%,white_70%,transparent)] max-w-[2000px] [text-shadow:3px_3px_0_var(--foreground),-3px_3px_0_var(--foreground),-3px_-3px_0_var(--foreground),3px_-3px_0_var(--foreground)] text-background [-webkit-text-stroke:1px_var(--foreground)] ${className}`}
    >
      <motion.div
        class="text-9xl font-bold flex gap-20 whitespace-nowrap"
        style={{ x }}
        ref={ref}
      >
        <p>{heading}</p>
        <p>{heading}</p>
        <p>{heading}</p>

        <p>{heading}</p>
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
