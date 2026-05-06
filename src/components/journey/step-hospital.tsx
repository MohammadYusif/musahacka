"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowRight, Building2, CheckCircle2, Phone, Star } from "lucide-react";
import type { Hospital, TreatmentPackage, TriageResult } from "./journey-types";

interface StepHospitalProps {
  hospitals: Hospital[];
  triage: TriageResult;
  selectedHospital: Hospital | null;
  selectedPackage: TreatmentPackage | null;
  onSelect: (hospital: Hospital, pkg: TreatmentPackage | null) => void;
  onNext: () => void;
}

function matchScore(hospital: Hospital, specialty: string): number {
  if (hospital.treatmentPackages.some((p) => p.specialty === specialty)) return 99;
  if (hospital.specialties.includes(specialty)) return 90;
  return 75;
}

export function StepHospital({ hospitals, triage, selectedHospital, selectedPackage, onSelect, onNext }: StepHospitalProps) {
  const t = useTranslations("journey.hospital");
  const tSpec = useTranslations("specialties");
  const locale = useLocale();

  const localizedSpecialty = (s: string) => {
    try { return tSpec(s as Parameters<typeof tSpec>[0]); } catch { return s; }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-bark-500">
        {t("subtitle", { specialty: triage.recommendedSpecialty })}
      </p>

      <div className="space-y-3">
        {hospitals.map((hospital, i) => {
          const score = matchScore(hospital, triage.recommendedSpecialty);
          const pkg = hospital.treatmentPackages[0] ?? null;
          const isSelected = selectedHospital?.id === hospital.id;
          const displayName = locale === "ar" && hospital.nameAr ? hospital.nameAr : hospital.name;

          return (
            <motion.div key={hospital.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <Card
                className={`cursor-pointer transition-all border-2 ${
                  isSelected
                    ? "border-brand-500 bg-brand-50/50 shadow-md"
                    : "border-ivory-200 hover:border-brand-300 hover:shadow-sm"
                }`}
                onClick={() => onSelect(hospital, pkg)}
              >
                <CardHeader className="pb-2 pt-4 px-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-brand-100 flex items-center justify-center shrink-0 mt-0.5">
                        <Building2 className="h-4 w-4 text-brand-600" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-sm text-bark-800 leading-tight">{displayName}</h3>
                        {hospital.address && (
                          <p className="text-xs text-bark-400 truncate mt-0.5">{hospital.address}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <Badge className="bg-green-100 text-green-800 border-green-200 border text-xs">
                        {t("matchScore", { score })}
                      </Badge>
                      {isSelected && <CheckCircle2 className="h-4 w-4 text-brand-600" />}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="px-4 pb-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 text-gold-400 fill-gold-400" />
                      <span className="text-xs font-medium text-bark-700">{hospital.rating.toFixed(1)}</span>
                    </div>
                    {hospital.phone && (
                      <div className="flex items-center gap-1 text-xs text-bark-400">
                        <Phone className="h-3 w-3" /> {hospital.phone}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {hospital.specialties.slice(0, 4).map((s) => (
                      <Badge
                        key={s}
                        variant={s === triage.recommendedSpecialty ? "default" : "outline"}
                        className={`text-xs ${s === triage.recommendedSpecialty ? "bg-brand-600 text-white" : ""}`}
                      >
                        {localizedSpecialty(s)}
                      </Badge>
                    ))}
                    {hospital.specialties.length > 4 && (
                      <Badge variant="outline" className="text-xs text-bark-400">+{hospital.specialties.length - 4}</Badge>
                    )}
                  </div>

                  {pkg && (
                    <div className="rounded-lg bg-ivory-100 border border-ivory-200 px-3 py-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-bark-700">
                          {locale === "ar" && pkg.nameAr ? pkg.nameAr : pkg.name}
                        </span>
                        <span className="text-sm font-bold text-brand-700">
                          {pkg.price.toLocaleString()} {pkg.currency}
                        </span>
                      </div>
                      <p className="text-xs text-bark-400 mt-0.5">{pkg.duration}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <Button
        className="w-full gap-2 bg-brand-600 hover:bg-brand-700 text-white"
        size="lg"
        disabled={!selectedHospital}
        onClick={onNext}
      >
        {t("chooseHotel")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
      </Button>
    </div>
  );
}
