"use client";

import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/ui/fade-in";
import { FileText } from "lucide-react";

export default function TermsPage() {
  const t = useTranslations("pages.terms");

  return (
    <div className="min-h-screen bg-ivory-100/50">
      <div className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-brand-600">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1440 200" preserveAspectRatio="none">
            <defs><pattern id="termsGrid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#termsGrid)" />
          </svg>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <div className="w-14 h-14 rounded-2xl bg-gold-400/20 flex items-center justify-center mx-auto mb-6">
              <FileText className="w-7 h-7 text-gold-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold text-ivory-100" style={{ fontFamily: "var(--font-display)" }}>{t("title")}</h1>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16 md:py-24">
        <FadeIn>
          <div className="space-y-6 text-bark-700/80 leading-relaxed">
            <p>{t("p1")}</p>
            <p>{t("p2")}</p>
            <p>{t("p3")}</p>
            <p>{t("p4")}</p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
