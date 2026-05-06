"use client";

import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/ui/fade-in";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";

export default function ContactPage() {
  const t = useTranslations("pages.contact");

  return (
    <div className="min-h-screen bg-ivory-100/50">
      <div className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-brand-600">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1440 200" preserveAspectRatio="none">
            <defs><pattern id="contactGrid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#contactGrid)" />
          </svg>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <div className="w-14 h-14 rounded-2xl bg-gold-400/20 flex items-center justify-center mx-auto mb-6">
              <MessageSquare className="w-7 h-7 text-gold-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold text-ivory-100" style={{ fontFamily: "var(--font-display)" }}>{t("title")}</h1>
          <p className="mt-4 text-ivory-300/80 max-w-lg mx-auto">{t("desc")}</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16 md:py-24">
        <FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 border border-ivory-300 text-center">
              <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-brand-600" />
              </div>
              <h3 className="text-sm font-semibold text-bark-800 mb-2" style={{ fontFamily: "var(--font-display)" }}>{t("email")}</h3>
              <p className="text-sm text-bark-600">{t("emailValue")}</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-ivory-300 text-center">
              <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-brand-600" />
              </div>
              <h3 className="text-sm font-semibold text-bark-800 mb-2" style={{ fontFamily: "var(--font-display)" }}>{t("phone")}</h3>
              <p className="text-sm text-bark-600">{t("phoneValue")}</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-ivory-300 text-center">
              <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-brand-600" />
              </div>
              <h3 className="text-sm font-semibold text-bark-800 mb-2" style={{ fontFamily: "var(--font-display)" }}>{t("location")}</h3>
              <p className="text-sm text-bark-600">{t("locationValue")}</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
