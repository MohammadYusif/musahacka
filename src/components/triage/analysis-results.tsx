"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  FlaskConical,
  Stethoscope,
} from "lucide-react";

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

const urgencyConfig: Record<string, { color: string; label: string; icon: React.ElementType }> = {
  low: { color: "bg-green-100 text-green-800", label: "Low", icon: CheckCircle2 },
  moderate: { color: "bg-yellow-100 text-yellow-800", label: "Moderate", icon: AlertTriangle },
  high: { color: "bg-orange-100 text-orange-800", label: "High", icon: AlertTriangle },
  emergency: { color: "bg-red-100 text-red-800", label: "Emergency", icon: AlertTriangle },
};

export function AnalysisResults({ analysis }: AnalysisResultsProps) {
  const urgency = analysis.urgency || "low";
  const config = urgencyConfig[urgency] || urgencyConfig.low;
  const UrgencyIcon = config.icon;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Analysis Results</h3>
        <Badge className={config.color}>
          <UrgencyIcon className="mr-1 h-3 w-3" />
          {config.label} Priority
        </Badge>
      </div>

      {analysis.summary && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed">{analysis.summary}</p>
          </CardContent>
        </Card>
      )}

      {analysis.recommendedSpecialty && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Stethoscope className="h-4 w-4" /> Recommended Specialty
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="secondary" className="text-sm">{analysis.recommendedSpecialty}</Badge>
          </CardContent>
        </Card>
      )}

      {analysis.findings && analysis.findings.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <ClipboardList className="h-4 w-4" /> Key Findings
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
      )}

      {analysis.suggestedActions && analysis.suggestedActions.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" /> Suggested Actions
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
      )}

      {analysis.recommendedTests && analysis.recommendedTests.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <FlaskConical className="h-4 w-4" /> Recommended Tests
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
      )}

      {analysis.recommendedSpecialty && (
        <Link href={`/facilities?specialty=${encodeURIComponent(analysis.recommendedSpecialty)}`}>
          <Button className="w-full gap-2" size="lg">
            Find Matching Facilities <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      )}
    </div>
  );
}
