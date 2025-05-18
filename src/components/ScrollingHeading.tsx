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
};
const ScrollingHeading = ({ heading, className = "" }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const baseVelocity = 5;
  const baseX = useMotionValue(-6000);
  const { scrollY } = useScroll();

  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const [wrapRange, setWrapRange] = useState<[number, number]>([-50000, 50000]);
  const wrapRef = useRef<number[]>([0, 0]);
  useEffect(() => {
    requestAnimationFrame(() => {
      if (ref.current) {
        const headings = ref.current.querySelectorAll("p");
        if (headings.length === 0) return;
        const singleItemWidth = headings[0].offsetWidth;
        const gap = 80;
        const totalWidth = singleItemWidth * 3 + gap * (3 - 1);
        wrapRef.current = [totalWidth, singleItemWidth];
        baseX.set(-(singleItemWidth * 9 + gap * (9 - 1)));
      }
    });
  }, [baseX.set]);

  const x = useTransform(
    baseX,
    (v) => `${wrap(wrapRange[0], wrapRange[1], v)}px`,
  );

  const directionFactor = useRef<number>(1);
  useAnimationFrame((_t, delta) => {
    requestAnimationFrame(() => {
      let moveBy = directionFactor.current * baseVelocity * (delta / 40);
      const velocity = velocityFactor.get();
      directionFactor.current = velocity < -5 ? -1 : 1;

      moveBy += directionFactor.current * moveBy * velocityFactor.get();
      if (wrapRange[0] === -50000) {
        const current = baseX.get();
        const target = -wrapRef.current[0] + wrapRef.current[1] - 80;
        const eased = current + (target - current) * (1 - (1 - 0.01) ** 3);
        if (Math.abs(current - target) < 80) {
          setWrapRange([-wrapRef.current[0], -wrapRef.current[1]]);
        }
        baseX.set(eased);
      } else {
        baseX.set(baseX.get() + moveBy);
      }
    });
  });

  return (
    <div
      class={`-z-10 select-none pointer-events-none absolute left-1/2 -translate-x-1/2 [mask:linear-gradient(90deg,transparent,white_30%,white_70%,transparent)] max-w-[2000px] [text-shadow:3px_3px_0_var(--foreground),-3px_3px_0_var(--foreground),-3px_-3px_0_var(--foreground),3px_-3px_0_var(--foreground)] text-background [-webkit-text-stroke:1px_var(--foreground)] ${className}`}
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
