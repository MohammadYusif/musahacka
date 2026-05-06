"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowRight, BedDouble, CheckCircle2, MapPin, Minus, Plus, Star, Wifi } from "lucide-react";
import type { Hotel } from "@/data/hotels";

interface StepHotelProps {
  hotels: Hotel[];
  selectedHotel: Hotel | null;
  nights: number;
  onSelect: (hotel: Hotel) => void;
  onNightsChange: (nights: number) => void;
  onNext: () => void;
}

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`h-3 w-3 ${i < count ? "text-gold-400 fill-gold-400" : "text-bark-200"}`} />
      ))}
    </div>
  );
}

export function StepHotel({ hotels, selectedHotel, nights, onSelect, onNightsChange, onNext }: StepHotelProps) {
  const t = useTranslations("journey.hotel");
  const tAmenities = useTranslations("amenities");
  const locale = useLocale();

  const localizeAmenity = (a: string) => {
    try { return tAmenities(a as Parameters<typeof tAmenities>[0]); } catch { return a; }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-bark-500">{t("subtitle")}</p>
        <div className="flex items-center gap-2 bg-ivory-100 rounded-xl px-3 py-1.5 border border-ivory-200">
          <button
            className="w-6 h-6 rounded-full bg-white border border-ivory-200 flex items-center justify-center hover:bg-ivory-50 disabled:opacity-40"
            onClick={() => onNightsChange(Math.max(1, nights - 1))}
            disabled={nights <= 1}
          >
            <Minus className="h-3 w-3 text-bark-600" />
          </button>
          <span className="text-sm font-semibold text-bark-800 w-20 text-center">
            {t("nights", { nights })}
          </span>
          <button
            className="w-6 h-6 rounded-full bg-white border border-ivory-200 flex items-center justify-center hover:bg-ivory-50 disabled:opacity-40"
            onClick={() => onNightsChange(Math.min(30, nights + 1))}
            disabled={nights >= 30}
          >
            <Plus className="h-3 w-3 text-bark-600" />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {hotels.map((hotel, i) => {
          const isSelected = selectedHotel?.id === hotel.id;
          const total = hotel.pricePerNight * nights;
          const displayName = locale === "ar" ? hotel.nameAr : hotel.name;
          const displayDesc = locale === "ar" ? hotel.descriptionAr : hotel.description;

          return (
            <motion.div key={hotel.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
              <Card
                className={`cursor-pointer transition-all border-2 ${
                  isSelected
                    ? "border-brand-500 bg-brand-50/50 shadow-md"
                    : "border-ivory-200 hover:border-brand-300 hover:shadow-sm"
                }`}
                onClick={() => onSelect(hotel)}
              >
                <CardHeader className="pb-2 pt-4 px-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-gold-100 flex items-center justify-center shrink-0 mt-0.5">
                        <BedDouble className="h-4 w-4 text-gold-600" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-sm text-bark-800 leading-tight">{displayName}</h3>
                        <StarRating count={hotel.stars} />
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className="text-sm font-bold text-brand-700">
                        {hotel.pricePerNight.toLocaleString()} SAR
                        <span className="text-xs font-normal text-bark-400">{t("perNight")}</span>
                      </span>
                      {isSelected && <CheckCircle2 className="h-4 w-4 text-brand-600" />}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="px-4 pb-4 space-y-2">
                  <p className="text-xs text-bark-500 leading-relaxed">{displayDesc}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-xs text-bark-400">
                      <MapPin className="h-3 w-3" /> {t("kmToHospital", { km: hotel.distanceKm })}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {hotel.amenities.slice(0, 4).map((a) => (
                      <Badge key={a} variant="outline" className="text-xs gap-1">
                        {a === "Free WiFi" && <Wifi className="h-2.5 w-2.5" />}
                        {localizeAmenity(a)}
                      </Badge>
                    ))}
                    {hotel.amenities.length > 4 && (
                      <Badge variant="outline" className="text-xs text-bark-400">+{hotel.amenities.length - 4}</Badge>
                    )}
                  </div>
                  {isSelected && nights > 0 && (
                    <div className="rounded-lg bg-brand-50 border border-brand-100 px-3 py-1.5 flex justify-between items-center">
                      <span className="text-xs text-brand-700">{t("nightsTotal", { nights })}</span>
                      <span className="text-sm font-bold text-brand-700">{total.toLocaleString()} SAR</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <Button className="w-full gap-2 bg-brand-600 hover:bg-brand-700 text-white" size="lg" disabled={!selectedHotel} onClick={onNext}>
        {t("chooseTransport")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
      </Button>
    </div>
  );
}
