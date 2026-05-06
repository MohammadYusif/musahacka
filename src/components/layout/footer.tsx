"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { HeartPulse } from "lucide-react";

export function Footer() {
  const t = useTranslations("footer");
  const tn = useTranslations("nav");
  const tc = useTranslations("common");
  const locale = useLocale();

  return (
    <footer className="bg-bark-900 text-ivory-400 pt-20 pb-10 relative">
      <div className="absolute top-0 left-0 right-0 h-px gold-line opacity-40"></div>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-brand-500 flex items-center justify-center">
                <HeartPulse className="w-5 h-5 text-ivory-100" />
              </div>
              <div>
                <span className="text-xl font-semibold text-ivory-100" style={{ fontFamily: "var(--font-display)" }}>{tc("appName")}</span>
                <span className="text-xs block tracking-[0.25em] text-gold-400 -mt-0.5" style={{ fontFamily: "var(--font-display)" }}>AL-AHSA</span>
              </div>
            </div>
            <p className="text-sm text-gold-400/80 leading-relaxed mb-6">{t("tagline")}</p>
            <div className="flex items-center gap-3 text-gold-400/60 text-sm">
              <span>{t("location")}</span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-ivory-100 tracking-wide uppercase mb-5" style={{ fontFamily: "var(--font-display)" }}>{t("services")}</h4>
            <ul className="space-y-3">
              <li><Link href="/triage" className="text-sm text-gold-400 hover:text-gold-300 transition-colors">{tn("triage")}</Link></li>
              <li><Link href="/facilities" className="text-sm text-gold-400 hover:text-gold-300 transition-colors">{tn("facilities")}</Link></li>
              <li><Link href="/chat" className="text-sm text-gold-400 hover:text-gold-300 transition-colors">{tn("chat")}</Link></li>
              <li><Link href="/dashboard" className="text-sm text-gold-400 hover:text-gold-300 transition-colors">{tn("dashboard")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-ivory-100 tracking-wide uppercase mb-5" style={{ fontFamily: "var(--font-display)" }}>{t("company")}</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-sm text-gold-400 hover:text-gold-300 transition-colors">{t("aboutUs")}</Link></li>
              <li><Link href="/story" className="text-sm text-gold-400 hover:text-gold-300 transition-colors">{t("ourStory")}</Link></li>
              <li><Link href="/faq" className="text-sm text-gold-400 hover:text-gold-300 transition-colors">{t("faq")}</Link></li>
              <li><Link href="/contact" className="text-sm text-gold-400 hover:text-gold-300 transition-colors">{t("contactUs")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-ivory-100 tracking-wide uppercase mb-5" style={{ fontFamily: "var(--font-display)" }}>{t("contact")}</h4>
            <ul className="space-y-3 text-sm text-gold-400/80">
              <li>{t("location")}</li>
            </ul>
          </div>
        </div>

        <div className="h-px bg-ivory-800 mb-8"></div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gold-400/60">&copy; {new Date().getFullYear()} {tc("appName")}. {t("rights")}</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-gold-400/70 hover:text-gold-300 transition-colors">{t("privacy")}</Link>
            <Link href="/terms" className="text-xs text-gold-400/70 hover:text-gold-300 transition-colors">{t("terms")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
