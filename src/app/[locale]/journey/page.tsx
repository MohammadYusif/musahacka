"use client";

import { JourneyWizard } from "@/components/journey/journey-wizard";
import { FadeIn } from "@/components/ui/fade-in";
import { Route } from "lucide-react";

export default function JourneyPage() {
  return (
    <div className="min-h-screen bg-ivory-100/50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <FadeIn>
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 rounded-xl bg-brand-500 flex items-center justify-center">
                <Route className="w-5 h-5 text-ivory-100" />
              </div>
              <h1 className="text-2xl font-bold text-bark-800" style={{ fontFamily: "var(--font-display)" }}>
                Plan Your Journey
              </h1>
            </div>
            <p className="text-bark-600">
              From triage to check-out — your complete Al-Ahsa medical trip, planned in minutes.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="bg-white rounded-2xl border border-ivory-200 shadow-sm p-6">
            <JourneyWizard />
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
