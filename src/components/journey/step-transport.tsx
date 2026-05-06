"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowRight, Car, CheckCircle2, Users } from "lucide-react";
import type { TransportOption } from "@/data/car-rentals";

interface StepTransportProps {
  transports: TransportOption[];
  nights: number;
  selectedTransport: TransportOption | null;
  onSelect: (transport: TransportOption) => void;
  onNext: () => void;
}

function transportTotal(transport: TransportOption, nights: number): number {
  if (transport.type === "rideshare") {
    return (transport.estimatedPerTrip ?? 40) * 4 * nights;
  }
  return transport.pricePerDay * nights;
}

export function StepTransport({ transports, nights, selectedTransport, onSelect, onNext }: StepTransportProps) {
  const t = useTranslations("journey.transport");
  const tFeatures = useTranslations("transportFeatures");
  const locale = useLocale();

  const localizeFeature = (f: string) => {
    try { return tFeatures(f as Parameters<typeof tFeatures>[0]); } catch { return f; }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-bark-500">
        {t("subtitle", { nights })}
      </p>

      <div className="grid grid-cols-1 gap-3">
        {transports.map((transport, i) => {
          const isSelected = selectedTransport?.id === transport.id;
          const total = transportTotal(transport, nights);
          const displayName = locale === "ar" ? transport.nameAr : transport.name;
          const displayDesc = locale === "ar" ? transport.descriptionAr : transport.description;

          return (
            <motion.div key={transport.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
              <Card
                className={`cursor-pointer transition-all border-2 ${
                  isSelected
                    ? "border-brand-500 bg-brand-50/50 shadow-md"
                    : "border-ivory-200 hover:border-brand-300 hover:shadow-sm"
                }`}
                onClick={() => onSelect(transport)}
              >
                <CardHeader className="pb-2 pt-4 px-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2">
                      <div className="w-8 h-8 rounded-lg bg-bark-100 flex items-center justify-center shrink-0 mt-0.5">
                        <Car className="h-4 w-4 text-bark-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm text-bark-800">{displayName}</h3>
                        <p className="text-xs text-bark-400">{transport.carModel}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      {transport.type === "rideshare" ? (
                        <span className="text-sm font-bold text-brand-700">
                          ~{transport.estimatedPerTrip} SAR<span className="text-xs font-normal text-bark-400">{t("perTrip")}</span>
                        </span>
                      ) : (
                        <span className="text-sm font-bold text-brand-700">
                          {transport.pricePerDay} SAR<span className="text-xs font-normal text-bark-400">{t("perDay")}</span>
                        </span>
                      )}
                      {isSelected && <CheckCircle2 className="h-4 w-4 text-brand-600" />}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="px-4 pb-4 space-y-2">
                  <p className="text-xs text-bark-500 leading-relaxed">{displayDesc}</p>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-xs text-bark-400">
                      <Users className="h-3 w-3" /> {t("seats", { count: transport.seating })}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {transport.features.map((f) => (
                      <Badge key={f} variant="outline" className="text-xs">{localizeFeature(f)}</Badge>
                    ))}
                  </div>
                  {isSelected && nights > 0 && (
                    <div className="rounded-lg bg-brand-50 border border-brand-100 px-3 py-1.5 flex justify-between items-center">
                      <span className="text-xs text-brand-700">
                        {transport.type === "rideshare"
                          ? t("estTrips", { count: nights * 4 })
                          : t("days", { count: nights })}
                      </span>
                      <span className="text-sm font-bold text-brand-700">~{total.toLocaleString()} SAR</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <Button className="w-full gap-2 bg-brand-600 hover:bg-brand-700 text-white" size="lg" disabled={!selectedTransport} onClick={onNext}>
        {t("exploreEvents")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
      </Button>
    </div>
  );
}
