"use client";

import { useState, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useSpecialty } from "@/lib/use-specialty";
import { FileUpload } from "@/components/triage/file-upload";
import { AnalysisResults } from "@/components/triage/analysis-results";
import { AgentStepReveal } from "@/components/triage/agent-step-reveal";
import { FadeIn } from "@/components/ui/fade-in";
import { StaggerContainer, StaggerItem } from "@/components/ui/stagger-container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Stethoscope, FileText, History } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface PastReport { id: string; fileName: string; specialty: string; status: string; date: string; analysis?: Record<string, unknown>; }

export default function TriagePage() {
  const t = useTranslations("triage");
  const ts = useSpecialty();
  const locale = useLocale();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState("");
  const [agentDone, setAgentDone] = useState(false);
  const [pastReports, setPastReports] = useState<PastReport[]>([]);
  const agentKeyRef = useRef(0);

  const handleFileSelect = async (file: File) => {
    setIsAnalyzing(true); setError(""); setAnalysis(null); setAgentDone(false);
    agentKeyRef.current += 1;
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("locale", locale);
      const res = await fetch("/api/triage", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) { setError(data.error || t("error") || "Analysis failed"); setIsAnalyzing(false); return; }
      setAnalysis(data.analysis);
    } catch { setError(t("error") || "Failed to analyze report. Please try again."); } finally { setIsAnalyzing(false); }
  };

  const showResults = analysis && (agentDone || !isAnalyzing);

  return (
    <div className="min-h-screen bg-ivory-100/50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <FadeIn>
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 rounded-xl bg-brand-500 flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-ivory-100" />
              </div>
              <h1 className="text-2xl font-bold text-bark-800" style={{ fontFamily: "var(--font-display)" }}>{t("title")}</h1>
            </div>
            <p className="text-bark-600">{t("subtitle")}</p>
          </div>
        </FadeIn>

        <div className="space-y-6">
          <FadeIn delay={0.1}>
            <FileUpload onFileSelect={handleFileSelect} isAnalyzing={isAnalyzing} />
          </FadeIn>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div key="error" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {isAnalyzing && !analysis && (
              <motion.div key={`agent-${agentKeyRef.current}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="bg-white rounded-2xl border border-ivory-200 p-4 shadow-sm">
                  <AgentStepReveal onComplete={() => setAgentDone(true)} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {showResults ? (
              <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <AnalysisResults analysis={analysis as Record<string, unknown>} />
              </motion.div>
            ) : !isAnalyzing && !analysis && (
              <motion.div key="history" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                {pastReports.length > 0 ? (
                  <>
                    <div className="flex items-center gap-2 mt-8">
                      <History className="h-4 w-4 text-bark-400" />
                      <span className="text-sm font-medium text-bark-500">{t("previousReports")}</span>
                    </div>
                    <StaggerContainer staggerDelay={0.1}>
                      {pastReports.map((report) => (
                        <StaggerItem key={report.id}>
                          <Card className="cursor-pointer hover:shadow-md transition-shadow border-ivory-200 bg-white rounded-2xl" onClick={() => { setAnalysis(report.analysis as Record<string, unknown>); setAgentDone(true); }}>
                            <CardHeader className="pb-2">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <FileText className="h-4 w-4 text-brand-600" />
                                  <CardTitle className="text-sm text-bark-800">{report.fileName}</CardTitle>
                                </div>
                                <Badge variant="secondary" className="bg-ivory-200 text-bark-600">{ts(report.specialty)}</Badge>
                              </div>
                            </CardHeader>
                            <CardContent><p className="text-xs text-bark-400">{report.date}</p></CardContent>
                          </Card>
                        </StaggerItem>
                      ))}
                    </StaggerContainer>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <FileText className="mx-auto h-8 w-8 text-bark-300 mb-3" />
                    <p className="text-sm text-bark-500">{t("noReports")}</p>
                    <p className="text-xs text-bark-400 mt-1">{t("uploadFirst")}</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
