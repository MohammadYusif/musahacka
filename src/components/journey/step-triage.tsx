"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { FileUpload } from "@/components/triage/file-upload";
import { AgentStepReveal } from "@/components/triage/agent-step-reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, ArrowRight, CheckCircle2, FlaskConical, Stethoscope, Zap } from "lucide-react";
import type { TriageResult } from "./journey-types";

interface StepTriageProps {
  onComplete: (result: TriageResult) => void;
}

const DEMO_RESULT: TriageResult = {
  findings: [
    "Elevated LDL cholesterol (185 mg/dL)",
    "Borderline hypertension (138/88 mmHg)",
    "Mild left ventricular hypertrophy on ECG",
    "Vitamin D deficiency (22 ng/mL)",
  ],
  recommendedSpecialty: "Cardiology",
  urgency: "moderate",
  summary:
    "Patient presents with a cluster of cardiovascular risk factors including dyslipidemia and borderline hypertension with early signs of cardiac remodelling. A cardiology evaluation is strongly advised within the next 2–4 weeks.",
  suggestedActions: [
    "Schedule cardiology consultation",
    "Begin low-sodium, heart-healthy diet",
    "Start daily 30-minute moderate exercise",
    "Monitor blood pressure twice daily",
  ],
  recommendedTests: ["Echocardiogram", "Lipid Panel", "Stress Test", "24hr Holter Monitor"],
  estimatedStayDays: 5,
};

export function StepTriage({ onComplete }: StepTriageProps) {
  const t = useTranslations("journey.triage");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [agentDone, setAgentDone] = useState(false);
  const [result, setResult] = useState<TriageResult | null>(null);
  const [error, setError] = useState("");
  const agentKeyRef = useRef(0);

  const handleFileSelect = async (file: File) => {
    setIsAnalyzing(true);
    setError("");
    setResult(null);
    setAgentDone(false);
    agentKeyRef.current += 1;
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("locale", "en");
      const res = await fetch("/api/triage", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) { setError(data.error || t("fetchError")); setIsAnalyzing(false); return; }
      setResult(data.analysis);
    } catch {
      setError(t("fetchError"));
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDemo = () => {
    setIsAnalyzing(true);
    setResult(null);
    setAgentDone(false);
    agentKeyRef.current += 1;
    setTimeout(() => {
      setIsAnalyzing(false);
      setResult(DEMO_RESULT);
    }, 1800);
  };

  const urgencyConfig: Record<string, { color: string; label: string; icon: React.ElementType }> = {
    low:       { color: "bg-green-100 text-green-800 border-green-200",   label: t("urgencyLabels.low"),      icon: CheckCircle2  },
    moderate:  { color: "bg-yellow-100 text-yellow-800 border-yellow-200", label: t("urgencyLabels.moderate"), icon: AlertTriangle },
    high:      { color: "bg-orange-100 text-orange-800 border-orange-200", label: t("urgencyLabels.high"),     icon: AlertTriangle },
    emergency: { color: "bg-red-100 text-red-800 border-red-200",          label: t("urgencyLabels.emergency"),icon: AlertTriangle },
  };

  const showResults = result && (agentDone || !isAnalyzing);
  const cfg = result ? (urgencyConfig[result.urgency] || urgencyConfig.low) : null;
  const UrgencyIcon = cfg?.icon ?? CheckCircle2;

  return (
    <div className="space-y-5">
      <AnimatePresence mode="wait">
        {!result && !isAnalyzing && (
          <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <FileUpload onFileSelect={handleFileSelect} isAnalyzing={isAnalyzing} />
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-ivory-200" />
              <span className="text-xs text-bark-400 font-medium">{t("or")}</span>
              <div className="flex-1 h-px bg-ivory-200" />
            </div>
            <Button variant="outline" className="w-full gap-2 border-brand-200 text-brand-700 hover:bg-brand-50" onClick={handleDemo}>
              <Zap className="h-4 w-4" /> {t("demoButton")}
            </Button>
          </motion.div>
        )}

        {isAnalyzing && (
          <motion.div key={`agent-${agentKeyRef.current}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="bg-white rounded-2xl border border-ivory-200 p-4 shadow-sm">
              <AgentStepReveal onComplete={() => setAgentDone(true)} />
            </div>
          </motion.div>
        )}

        {error && (
          <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
            {error}
            <button className="ms-2 underline text-xs" onClick={() => setError("")}>{t("dismiss")}</button>
          </motion.div>
        )}

        {showResults && cfg && (
          <motion.div key="results" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-bark-800">{t("analysisDone")}</span>
              <Badge className={`${cfg.color} border`}>
                <UrgencyIcon className="me-1 h-3 w-3" /> {cfg.label}
              </Badge>
            </div>

            <Card className="border-ivory-200">
              <CardContent className="pt-4 space-y-3">
                <p className="text-sm text-bark-700 leading-relaxed">{result!.summary}</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="gap-1">
                    <Stethoscope className="h-3 w-3" /> {result!.recommendedSpecialty}
                  </Badge>
                  <Badge variant="outline" className="gap-1 text-bark-600">
                    {t("dayStayEst", { days: result!.estimatedStayDays })}
                  </Badge>
                </div>
                {result!.findings.length > 0 && (
                  <ul className="space-y-1">
                    {result!.findings.slice(0, 3).map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-bark-600">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500 shrink-0" />
                        {f}
                      </li>
                    ))}
                    {result!.findings.length > 3 && (
                      <li className="text-xs text-bark-400">{t("moreFindings", { count: result!.findings.length - 3 })}</li>
                    )}
                  </ul>
                )}
                {result!.recommendedTests.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    <FlaskConical className="h-3.5 w-3.5 text-bark-400 mt-0.5" />
                    {result!.recommendedTests.map((test, i) => (
                      <Badge key={i} variant="outline" className="text-xs">{test}</Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Button className="w-full gap-2 bg-brand-600 hover:bg-brand-700 text-white" size="lg" onClick={() => onComplete(result!)}>
              {t("planJourney")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
