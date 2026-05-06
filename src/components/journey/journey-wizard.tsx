"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { BedDouble, Building2, Car, CheckCircle2, MapPin, Receipt, Stethoscope } from "lucide-react";
import { StepTriage } from "./step-triage";
import { StepHospital } from "./step-hospital";
import { StepHotel } from "./step-hotel";
import { StepTransport } from "./step-transport";
import { StepEvents } from "./step-events";
import { StepReceipt } from "./step-receipt";
import type {
  Hospital,
  JourneyData,
  JourneyState,
  TreatmentPackage,
  TriageResult,
} from "./journey-types";
import type { Hotel } from "@/data/hotels";
import type { TransportOption } from "@/data/car-rentals";
import type { LocalEvent } from "@/data/events";

const STEP_KEYS = ["triage", "hospital", "hotel", "transport", "events", "receipt"] as const;
const STEP_ICONS = [Stethoscope, Building2, BedDouble, Car, MapPin, Receipt];

const initialState: JourneyState = {
  step: 0,
  triageResult: null,
  journeyData: null,
  selectedHospital: null,
  selectedPackage: null,
  selectedHotel: null,
  nights: 3,
  selectedTransport: null,
  selectedEvents: [],
};

function pickDefaults(data: JourneyData) {
  const hospital = data.hospitals[0] ?? null;
  const pkg = hospital?.treatmentPackages[0] ?? null;
  const hotel = data.hotels.find((h) => h.stars === 4) ?? data.hotels[1] ?? data.hotels[0] ?? null;
  const transport = data.transports.find((t) => t.id === "transport-2") ?? data.transports[1] ?? null;
  return { hospital, pkg, hotel, transport };
}

export function JourneyWizard() {
  const t = useTranslations("journey");
  const [state, setState] = useState<JourneyState>(initialState);
  const [isLoadingJourney, setIsLoadingJourney] = useState(false);
  const [fromReport, setFromReport] = useState(false);

  const update = (patch: Partial<JourneyState>) =>
    setState((prev) => ({ ...prev, ...patch }));

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("wisal:triage");
      if (!raw) return;
      sessionStorage.removeItem("wisal:triage");
      const result = JSON.parse(raw) as TriageResult;
      if (!result.recommendedSpecialty) return;
      setFromReport(true);
      update({ triageResult: result, nights: result.estimatedStayDays ?? 3 });
      loadJourneyData(result);
    } catch {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadJourneyData = async (result: TriageResult) => {
    setIsLoadingJourney(true);
    try {
      const res = await fetch("/api/journey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ specialty: result.recommendedSpecialty }),
      });
      const data: JourneyData = await res.json();
      const { hospital, pkg, hotel, transport } = pickDefaults(data);
      update({
        journeyData: data,
        step: 1,
        selectedHospital: hospital,
        selectedPackage: pkg,
        selectedHotel: hotel,
        selectedTransport: transport,
      });
    } catch {
      update({ step: 1 });
    } finally {
      setIsLoadingJourney(false);
    }
  };

  const handleTriageComplete = async (result: TriageResult) => {
    update({ triageResult: result, nights: result.estimatedStayDays ?? 3 });
    await loadJourneyData(result);
  };

  const reset = () => {
    setState(initialState);
    setFromReport(false);
  };

  const { step, triageResult, journeyData, selectedHospital, selectedPackage,
    selectedHotel, nights, selectedTransport, selectedEvents } = state;

  return (
    <div className="space-y-6">
      {/* Progress bar */}
      <div className="flex items-center gap-0">
        {STEP_KEYS.map((key, i) => {
          const Icon = STEP_ICONS[i];
          const done = i < step;
          const active = i === step;
          return (
            <div key={i} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
                  done    ? "bg-brand-600 border-brand-600 text-white"
                  : active ? "bg-white border-brand-500 text-brand-600 shadow-sm"
                           : "bg-ivory-100 border-ivory-200 text-bark-300"
                }`}>
                  {done ? <CheckCircle2 className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                </div>
                <span className={`text-[10px] font-medium hidden sm:block ${
                  active ? "text-brand-700" : done ? "text-brand-500" : "text-bark-300"
                }`}>
                  {t(`steps.${key}`)}
                </span>
              </div>
              {i < STEP_KEYS.length - 1 && (
                <div className={`flex-1 h-0.5 mx-1 transition-all duration-300 ${i < step ? "bg-brand-500" : "bg-ivory-200"}`} />
              )}
            </div>
          );
        })}
      </div>

      {/* Step heading */}
      <div>
        <h2 className="text-xl font-bold text-bark-800" style={{ fontFamily: "var(--font-display)" }}>
          {t(`stepTitles.${STEP_KEYS[step]}`)}
        </h2>
        <p className="text-sm text-bark-400 mt-0.5">
          {t("stepOf", { current: step + 1, total: STEP_KEYS.length })}
        </p>
      </div>

      {/* Loading overlay while fetching journey data */}
      {isLoadingJourney && (
        <div className="fixed inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="text-center space-y-3">
            <div className="w-10 h-10 rounded-full border-2 border-brand-500 border-t-transparent animate-spin mx-auto" />
            <p className="text-sm font-medium text-bark-700">{t("personalising")}</p>
          </div>
        </div>
      )}

      {/* Step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {step === 0 && (
            <>
              {fromReport && triageResult ? (
                <div className="rounded-xl bg-brand-50 border border-brand-200 p-4 text-sm text-brand-700">
                  {t("loadingReport")}
                </div>
              ) : (
                <StepTriage onComplete={handleTriageComplete} />
              )}
            </>
          )}

          {step === 1 && journeyData && triageResult && (
            <StepHospital
              hospitals={journeyData.hospitals}
              triage={triageResult}
              selectedHospital={selectedHospital}
              selectedPackage={selectedPackage}
              onSelect={(h: Hospital, p: TreatmentPackage | null) =>
                update({ selectedHospital: h, selectedPackage: p })
              }
              onNext={() => update({ step: 2 })}
            />
          )}

          {step === 2 && journeyData && (
            <StepHotel
              hotels={journeyData.hotels}
              selectedHotel={selectedHotel}
              nights={nights}
              onSelect={(h: Hotel) => update({ selectedHotel: h })}
              onNightsChange={(n: number) => update({ nights: n })}
              onNext={() => update({ step: 3 })}
            />
          )}

          {step === 3 && journeyData && (
            <StepTransport
              transports={journeyData.transports}
              nights={nights}
              selectedTransport={selectedTransport}
              onSelect={(t: TransportOption) => update({ selectedTransport: t })}
              onNext={() => update({ step: 4 })}
            />
          )}

          {step === 4 && journeyData && (
            <StepEvents
              events={journeyData.events}
              selectedEvents={selectedEvents}
              onToggle={(e: LocalEvent) =>
                update({
                  selectedEvents: selectedEvents.some((x) => x.id === e.id)
                    ? selectedEvents.filter((x) => x.id !== e.id)
                    : [...selectedEvents, e],
                })
              }
              onNext={() => update({ step: 5 })}
            />
          )}

          {step === 5 && triageResult && selectedHospital && selectedHotel && selectedTransport && (
            <StepReceipt
              triage={triageResult}
              hospital={selectedHospital}
              pkg={selectedPackage}
              hotel={selectedHotel}
              nights={nights}
              transport={selectedTransport}
              events={selectedEvents}
              onReset={reset}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
