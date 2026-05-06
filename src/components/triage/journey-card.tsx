"use client";

import { useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Download, Calendar, ArrowRight } from "lucide-react";
import Image from "next/image";

interface CompanionPlan {
  companions: number;
  hotel: string;
  familyCost: number;
  currency?: string;
}

interface JourneyCardProps {
  diagnosis?: string;
  specialty?: string;
  specialtyKey?: string;
  urgency?: string;
  facility?: {
    name: string;
    nameAr?: string;
    jciAccredited?: boolean;
    id?: string;
  };
  costs?: {
    estimatedCost: number;
    currency?: string;
    stayDuration: string;
  };
  companions?: CompanionPlan;
}

export function JourneyCard({
  diagnosis = "Elevated cholesterol & borderline hypertension",
  specialty = "Cardiology",
  specialtyKey,
  urgency = "Moderate",
  facility = {
    name: "Al-Moosa Specialist Hospital",
    nameAr: "مستشفى المواس التخصصي",
    jciAccredited: true,
    id: "mock-1",
  },
  costs = {
    estimatedCost: 12000,
    currency: "SAR",
    stayDuration: "7-10 Days",
  },
  companions = {
    companions: 2,
    hotel: "Holiday Inn Al-Ahsa",
    familyCost: 4500,
    currency: "SAR",
  },
}: JourneyCardProps) {
  const t = useTranslations("triage");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const currency = costs.currency || "SAR";

  const facilityName = isRtl && facility.nameAr ? facility.nameAr : facility.name;
  const linkSpecialty = specialtyKey || specialty;

  const handleSavePdf = useCallback(() => {
    const el = document.getElementById("wisal-journey-print");
    if (!el) return;
    const printWin = window.open("", "_blank");
    if (!printWin) return;
    const styles = Array.from(document.querySelectorAll("style, link[rel='stylesheet']"))
      .map((s) => s.outerHTML)
      .join("");
    printWin.document.write(`
      <!DOCTYPE html>
      <html dir="${isRtl ? "rtl" : "ltr"}">
        <head><title>Wisal - Medical Journey</title>${styles}</head>
        <body style="padding:32px;background:#FDFBF7;font-family:Inter,sans-serif">${el.outerHTML}</body>
      </html>
    `);
    printWin.document.close();
    printWin.focus();
    setTimeout(() => printWin.print(), 300);
  }, [isRtl]);

  return (
    <div id="wisal-journey-print" className={`flex flex-col ${isRtl ? "md:flex-row-reverse" : "md:flex-row"} rounded-2xl overflow-hidden shadow-xl border border-ivory-200`}>
      {/* Left Panel */}
      <div className="bg-brand-600 text-ivory-100 p-6 md:w-1/3 flex flex-col justify-between">
        <div>
          <p className="text-xs tracking-widest uppercase opacity-70 mb-4">
            {t("journeyLabel")}
          </p>
          <h3 className="text-2xl font-bold leading-tight mb-2" style={{ fontFamily: "var(--font-display)" }}>
            {specialty}
          </h3>
          <p className="text-sm opacity-80 mb-4">{diagnosis}</p>
          <div className="w-12 h-px bg-gold-400 mb-4" />
          <span className="inline-block rounded-full bg-white/15 text-ivory-100 text-xs font-medium px-3 py-1">
            {urgency} {t("urgency")}
          </span>
        </div>
        <div className="mt-6 md:mt-0">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
            <Image src="/brand/WisalW.svg" alt="Wisal" width={24} height={24} className="w-5 h-5 brightness-0 invert" />
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="bg-white p-6 md:w-2/3 space-y-5">
        {/* Row 1: Facility */}
        <div className="flex items-center justify-between gap-3">
          <h4 className="text-lg font-semibold text-bark-800" style={{ fontFamily: "var(--font-display)" }}>
            {facilityName}
          </h4>
          {facility.jciAccredited && (
            <span className="text-[10px] font-bold tracking-wider text-brand-600 bg-brand-50 px-2 py-1 rounded-md border border-brand-200 shrink-0">
              JCI
            </span>
          )}
        </div>

        {/* Row 2: Stat boxes */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-ivory-100 rounded-xl p-3 text-center">
            <p className="text-xl font-bold text-brand-600">{costs.estimatedCost.toLocaleString()}</p>
            <p className="text-[10px] text-bark-500 uppercase tracking-wider">{currency}</p>
            <p className="text-[10px] text-bark-400">{t("estimatedCost")}</p>
          </div>
          <div className="bg-ivory-100 rounded-xl p-3 text-center">
            <p className="text-xl font-bold text-brand-600">{costs.stayDuration}</p>
            <p className="text-[10px] text-bark-400">{t("stayDuration")}</p>
          </div>
          <div className="bg-ivory-100 rounded-xl p-3 text-center">
            <p className="text-xl font-bold text-brand-600">{specialty}</p>
            <p className="text-[10px] text-bark-400">{t("specialty")}</p>
          </div>
        </div>

        {/* Row 3: Companion Plan */}
        <div className="bg-ivory-50 rounded-xl p-4 border border-ivory-200">
          <p className="text-xs font-semibold text-bark-600 uppercase tracking-wider mb-2">
            {t("companionPlan")}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-bark-700">
            <span>{companions.companions} {t("companions")}</span>
            <span className="text-bark-300 hidden sm:inline">|</span>
            <span>{companions.hotel}</span>
            <span className="text-bark-300 hidden sm:inline">|</span>
            <span className="font-semibold">{companions.familyCost.toLocaleString()} {companions.currency || currency}</span>
          </div>
        </div>

        {/* Row 4: Actions */}
        <div className="flex flex-wrap gap-3">
          <Link href={`/facilities?specialty=${encodeURIComponent(linkSpecialty)}`}>
            <Button className="inline-flex items-center gap-2 bg-brand-600 text-ivory-100 px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-brand-700 transition-all active:scale-[0.97] border-0 cursor-pointer">
              <Calendar className="w-4 h-4" />
              {t("bookConsultation")} <ArrowRight className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
            </Button>
          </Link>
          <Button variant="outline" onClick={handleSavePdf} className="inline-flex items-center gap-2 border-brand-400 text-brand-600 px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-brand-50 transition-all cursor-pointer">
            <Download className="w-4 h-4" />
            {t("saveAsPdf")}
          </Button>
        </div>
      </div>
    </div>
  );
}
