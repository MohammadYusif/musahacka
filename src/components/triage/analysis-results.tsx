"use client";

import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { FadeIn } from "@/components/ui/fade-in";
import { AlertTriangle, ArrowRight, CheckCircle2, ClipboardList, FlaskConical, Stethoscope } from "lucide-react";

interface AnalysisResultsProps {
  analysis: {
    findings?: string[];
    recommendedSpecialty?: string;
    urgency?: string;
    summary?: string;
    suggestedActions?: string[];
    recommendedTests?: string[];
  };
}

export function AnalysisResults({ analysis }: AnalysisResultsProps) {
  const t = useTranslations("triage");
  const urgency = analysis.urgency || "low";

  const urgencyConfig: Record<string, { color: string; label: string; icon: React.ElementType }> = {
    low: { color: "bg-green-100 text-green-800", label: t("urgencyLabels.low"), icon: CheckCircle2 },
    moderate: { color: "bg-yellow-100 text-yellow-800", label: t("urgencyLabels.moderate"), icon: AlertTriangle },
    high: { color: "bg-orange-100 text-orange-800", label: t("urgencyLabels.high"), icon: AlertTriangle },
    emergency: { color: "bg-red-100 text-red-800", label: t("urgencyLabels.emergency"), icon: AlertTriangle },
  };

  const config = urgencyConfig[urgency] || urgencyConfig.low;
  const UrgencyIcon = config.icon;

  return (
    <div className="space-y-4">
      <FadeIn>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{t("results")}</h3>
          <Badge className={`${config.color} ${urgency === "high" || urgency === "emergency" ? "animate-pulse" : ""}`}>
            <UrgencyIcon className="mr-1 h-3 w-3" />
            {config.label} {t("urgency")}
          </Badge>
        </div>
      </FadeIn>

      {analysis.summary && (
        <FadeIn delay={0.08}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{t("summary")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">{analysis.summary}</p>
            </CardContent>
          </Card>
        </FadeIn>
      )}

      {analysis.recommendedSpecialty && (
        <FadeIn delay={0.16}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Stethoscope className="h-4 w-4" /> {t("recommendedSpecialty")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="secondary" className="text-sm">{analysis.recommendedSpecialty}</Badge>
            </CardContent>
          </Card>
        </FadeIn>
      )}

      {analysis.findings && analysis.findings.length > 0 && (
        <FadeIn delay={0.24}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <ClipboardList className="h-4 w-4" /> {t("findings")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1.5">
                {analysis.findings.map((finding, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    {finding}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </FadeIn>
      )}

      {analysis.suggestedActions && analysis.suggestedActions.length > 0 && (
        <FadeIn delay={0.32}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" /> {t("suggestedActions")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1.5">
                {analysis.suggestedActions.map((action, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-primary font-medium">{i + 1}.</span>
                    {action}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </FadeIn>
      )}

      {analysis.recommendedTests && analysis.recommendedTests.length > 0 && (
        <FadeIn delay={0.4}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <FlaskConical className="h-4 w-4" /> {t("recommendedTests")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {analysis.recommendedTests.map((test, i) => (
                  <Badge key={i} variant="outline">{test}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      )}

      {analysis.recommendedSpecialty && (
        <FadeIn delay={0.48}>
          <Link href={`/facilities?specialty=${encodeURIComponent(analysis.recommendedSpecialty)}`}>
            <Button className="w-full gap-2" size="lg">
              {t("findFacilities")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Button>
          </Link>
        </FadeIn>
      )}
    </div>
  );
}
