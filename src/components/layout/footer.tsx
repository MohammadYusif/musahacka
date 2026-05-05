"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("footer");
  const tn = useTranslations("nav");
  const tc = useTranslations("common");
  const locale = useLocale();

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary shadow-sm shadow-primary/20">
                <span className="text-primary-foreground font-black text-xs">W</span>
              </div>
              <span className="font-bold text-base">{tc("appName")}</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {locale === "ar"
                ? "بوابتك الذكية للسياحة العلاجية في المملكة العربية السعودية."
                : "Your AI-powered gateway to medical tourism in Saudi Arabia."}
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">{t("services")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/triage" className="hover:text-foreground transition-colors">{tn("triage")}</Link></li>
              <li><Link href="/facilities" className="hover:text-foreground transition-colors">{tn("facilities")}</Link></li>
              <li><Link href="/chat" className="hover:text-foreground transition-colors">{tn("chat")}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">{t("contact")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>{locale === "ar" ? "الأحساء، المنطقة الشرقية" : "Al-Ahsa, Eastern Province"}</li>
              <li>{locale === "ar" ? "المملكة العربية السعودية" : "Saudi Arabia"}</li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-5 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} {tc("appName")}. {t("rights")}
        </div>
      </div>
    </footer>
  );
}
