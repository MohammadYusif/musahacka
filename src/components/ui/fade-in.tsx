"use client";

import { motion, type Variants } from "framer-motion";
import { DURATION, EASE } from "@/lib/animations";

type Direction = "up" | "down" | "left" | "right" | "none";

function getVariants(direction: Direction, delay: number, duration: number): Variants {
  const offsets: Record<Direction, { x?: number; y?: number }> = {
    up: { y: 20 },
    down: { y: -20 },
    left: { x: -20 },
    right: { x: 20 },
    none: {},
  };

  const offset = offsets[direction];

  return {
    hidden: { opacity: 0, ...offset },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration, ease: EASE.out, delay },
    },
  };
}

interface FadeInProps {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

export function FadeIn({
  children,
  direction = "up",
  delay = 0,
  duration = DURATION.normal,
  className,
  once = true,
}: FadeInProps) {
  return (
    <motion.div
      variants={getVariants(direction, delay, duration)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-60px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
