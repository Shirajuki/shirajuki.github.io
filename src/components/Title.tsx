import { motion } from "framer-motion";
import ScrollingHeading from "./ScrollingHeading";
import { cn } from "@/lib/utils";
import { useState } from "preact/hooks";

const titleAnimate = {
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

type Props = {
  text: string;
  scrollText: string;
  variant?: "hero" | "normal";
};
const Title = ({ text, scrollText, variant = "normal" }: Props) => {
  const [strokeVisible, setStrokeVisible] = useState(false);

  return (
    <motion.h1
      class={cn(
        "relative inline-block mx-auto text-2xl font-bold text-center mb-8 uppercase title",
        variant === "hero" && "mt-24",
        strokeVisible && "before:opacity-100",
      )}
    >
      <div
        class={
          "absolute left-1/2 -translate-x-1/2 overflow-hidden h-16 w-screen top-0 -translate-y-24 pointer-events-none"
        }
      >
        <ScrollingHeading
          heading={scrollText}
          className={cn(variant === "normal" && "text-primary-dark")}
        />
      </div>
      <motion.span
        class="relative block"
        {...titleAnimate}
        onAnimationStart={() => setStrokeVisible(true)}
      >
        {text}
      </motion.span>
    </motion.h1>
  );
};
export default Title;
