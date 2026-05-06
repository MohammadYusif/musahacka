"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, Clock, MapPin, Ticket } from "lucide-react";
import type { LocalEvent } from "@/data/events";

interface StepEventsProps {
  events: LocalEvent[];
  selectedEvents: LocalEvent[];
  onToggle: (event: LocalEvent) => void;
  onNext: () => void;
}

const categoryColors: Record<string, string> = {
  heritage: "bg-amber-100 text-amber-800",
  nature: "bg-green-100 text-green-800",
  culture: "bg-purple-100 text-purple-800",
  shopping: "bg-blue-100 text-blue-800",
  wellness: "bg-rose-100 text-rose-800",
};

export function StepEvents({ events, selectedEvents, onToggle, onNext }: StepEventsProps) {
  const t = useTranslations("journey.events");
  const locale = useLocale();
  const selectedIds = new Set(selectedEvents.map((e) => e.id));
  const totalCost = selectedEvents.reduce((sum, e) => sum + e.price, 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-bark-500">{t("subtitle")}</p>
        {selectedEvents.length > 0 && (
          <Badge className="bg-brand-100 text-brand-700 border-brand-200 border">
            {t("selected", { count: selectedEvents.length })}
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3">
        {events.map((event, i) => {
          const isSelected = selectedIds.has(event.id);
          const displayName = locale === "ar" ? event.nameAr : event.name;
          const displayDesc = locale === "ar" ? event.descriptionAr : event.description;
          const displayHighlight = locale === "ar" ? event.highlightAr : event.highlight;
          const displayOpenDays = locale === "ar" ? event.openDaysAr : event.openDays;

          return (
            <motion.div key={event.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card
                className={`cursor-pointer transition-all border-2 ${
                  isSelected
                    ? "border-brand-500 bg-brand-50/50 shadow-md"
                    : "border-ivory-200 hover:border-brand-300 hover:shadow-sm"
                }`}
                onClick={() => onToggle(event)}
              >
                <CardContent className="pt-4 pb-3 px-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-sm text-bark-800">{displayName}</h3>
                        {displayHighlight && (
                          <Badge className={`text-xs border-0 ${categoryColors[event.category] || "bg-gray-100 text-gray-700"}`}>
                            {displayHighlight}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-bark-500 leading-relaxed line-clamp-2">{displayDesc}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center gap-1 text-xs text-bark-400">
                          <Clock className="h-3 w-3" /> {event.durationHours}h
                        </div>
                        <div className="flex items-center gap-1 text-xs text-bark-400">
                          <MapPin className="h-3 w-3" /> {event.distanceKm} km
                        </div>
                        <div className="flex items-center gap-1 text-xs text-bark-400">
                          <Ticket className="h-3 w-3" />
                          {event.isFree
                            ? <span className="text-green-600 font-medium">{t("free")}</span>
                            : `${event.price} SAR`}
                        </div>
                      </div>
                    </div>
                    {isSelected && (
                      <CheckCircle2 className="h-5 w-5 text-brand-600 shrink-0 mt-0.5" />
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {totalCost > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-xl bg-ivory-100 border border-ivory-200 px-4 py-2.5 flex justify-between items-center">
          <span className="text-sm text-bark-600">{t("activitiesTotal")}</span>
          <span className="text-sm font-bold text-bark-800">{totalCost} SAR</span>
        </motion.div>
      )}

      <Button className="w-full gap-2 bg-brand-600 hover:bg-brand-700 text-white" size="lg" onClick={onNext}>
        {t("viewReceipt")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
      </Button>
    </div>
  );
}
