"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface CountUpProps {
  target: number;
  duration?: number;
  delay?: number;
  className?: string;
}

export function CountUp({ target, duration = 1.2, delay = 0, className }: CountUpProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;

    const startTime = Date.now() + delay * 1000;
    const endTime = startTime + duration * 1000;

    const tick = () => {
      const now = Date.now();
      if (now < startTime) {
        requestAnimationFrame(tick);
        return;
      }

      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }, [inView, target, duration, delay]);

  return (
    <span ref={ref} className={className}>
      {count}
    </span>
  );
}
