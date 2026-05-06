"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

export function Footer() {
  const t = useTranslations("footer");
  const tn = useTranslations("nav");
  const tc = useTranslations("common");
  const locale = useLocale();

  return (
    <footer className="bg-brand-600 text-ivory-300/90 pt-20 pb-10 relative">
      <div className="absolute top-0 left-0 right-0 h-px gold-line opacity-30"></div>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="mb-5">
              <Image src="/brand/WisalLogo.svg" alt={tc("appName")} width={360} height={120} className="h-20 sm:h-24 md:h-28 w-auto" priority />
            </div>
            <p className="text-sm text-ivory-200/70 leading-relaxed mb-6">{t("tagline")}</p>
            <div className="flex items-center gap-3 text-ivory-200/60 text-sm">
              <span>{t("location")}</span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-ivory-100 tracking-wide uppercase mb-5" style={{ fontFamily: "var(--font-display)" }}>{t("services")}</h4>
            <ul className="space-y-3">
              <li><Link href="/triage" className="text-sm text-ivory-200/80 hover:text-ivory-100 transition-colors">{tn("triage")}</Link></li>
              <li><Link href="/facilities" className="text-sm text-ivory-200/80 hover:text-ivory-100 transition-colors">{tn("facilities")}</Link></li>
              <li><Link href="/chat" className="text-sm text-ivory-200/80 hover:text-ivory-100 transition-colors">{tn("chat")}</Link></li>
              <li><Link href="/dashboard" className="text-sm text-ivory-200/80 hover:text-ivory-100 transition-colors">{tn("dashboard")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-ivory-100 tracking-wide uppercase mb-5" style={{ fontFamily: "var(--font-display)" }}>{t("company")}</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-sm text-ivory-200/80 hover:text-ivory-100 transition-colors">{t("aboutUs")}</Link></li>
              <li><Link href="/story" className="text-sm text-ivory-200/80 hover:text-ivory-100 transition-colors">{t("ourStory")}</Link></li>
              <li><Link href="/faq" className="text-sm text-ivory-200/80 hover:text-ivory-100 transition-colors">{t("faq")}</Link></li>
              <li><Link href="/contact" className="text-sm text-ivory-200/80 hover:text-ivory-100 transition-colors">{t("contactUs")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-ivory-100 tracking-wide uppercase mb-5" style={{ fontFamily: "var(--font-display)" }}>{t("contact")}</h4>
            <ul className="space-y-3 text-sm text-ivory-200/80">
              <li>{t("location")}</li>
            </ul>
          </div>
        </div>

        <div className="h-px bg-white/10 mb-8"></div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ivory-200/60">&copy; {new Date().getFullYear()} {tc("appName")}. {t("rights")}</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-ivory-200/70 hover:text-ivory-100 transition-colors">{t("privacy")}</Link>
            <Link href="/terms" className="text-xs text-ivory-200/70 hover:text-ivory-100 transition-colors">{t("terms")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
