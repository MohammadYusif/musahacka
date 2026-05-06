"use client";

import { useState, useEffect, useMemo } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Loader2, CheckCircle } from "lucide-react";

interface AgentStepRevealProps {
  onComplete?: () => void;
  startDelay?: number;
}

export function AgentStepReveal({ onComplete, startDelay = 0 }: AgentStepRevealProps) {
  const t = useTranslations("triage");
  const [activeStep, setActiveStep] = useState(-1);

  const STEPS = useMemo(() => [
    t("stepReading"),
    t("stepExtracting"),
    t("stepIdentifying"),
    t("stepMatching"),
    t("stepEstimating"),
    t("stepBuilding"),
  ], [t]);

  useEffect(() => {
    const initialTimer = setTimeout(() => {
      setActiveStep(0);
    }, startDelay);

    return () => clearTimeout(initialTimer);
  }, [startDelay]);

  useEffect(() => {
    if (activeStep < 0 || activeStep >= STEPS.length) return;

    const timer = setTimeout(() => {
      setActiveStep((prev) => {
        const next = prev + 1;
        if (next >= STEPS.length) {
          onComplete?.();
        }
        return next;
      });
    }, 800);

    return () => clearTimeout(timer);
  }, [activeStep, onComplete]);

  return (
    <div className="space-y-3 py-4">
      {STEPS.map((step, index) => {
        const isActive = activeStep === index;
        const isComplete = activeStep > index;

        return (
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: Math.max(0, index * 0.3 - (activeStep === -1 ? 0 : 0)) }}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              isActive
                ? "bg-brand-50 border border-brand-200"
                : isComplete
                  ? "bg-green-50/50 border border-transparent"
                  : "opacity-30"
            }`}
          >
            {isComplete ? (
              <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
            ) : (
              <Loader2 className={`h-5 w-5 text-brand-500 shrink-0 ${isActive ? "animate-spin" : ""}`} />
            )}
            <span
              className={`text-sm ${
                isActive
                  ? "font-semibold text-brand-700 animate-pulse"
                  : isComplete
                    ? "text-green-700"
                    : "text-bark-500"
              }`}
            >
              {step}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
