"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, useRouter, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Globe, Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const t = useTranslations("nav");
  const tc = useTranslations("common");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const switchLocale = () => {
    const next = locale === "en" ? "ar" : "en";
    router.replace(pathname, { locale: next });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-primary-foreground font-bold text-sm">M</span>
          </div>
          <span className="font-bold text-lg">MedVisit</span>
          <span className="text-xs text-muted-foreground hidden sm:inline">Al-Ahsa</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/triage" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">{t("triage")}</Link>
          <Link href="/facilities" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">{t("facilities")}</Link>
          <Link href="/chat" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">{t("chat")}</Link>
          <Link href="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">{t("dashboard")}</Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={switchLocale} className="gap-1 text-xs">
            <Globe className="h-3.5 w-3.5" />
            {locale === "en" ? "العربية" : "English"}
          </Button>
          <Link href="/login">
            <Button variant="outline" size="sm" className="hidden md:inline-flex">{tc("signIn")}</Button>
          </Link>
          <Link href="/register">
            <Button size="sm" className="hidden md:inline-flex">{tc("getStarted")}</Button>
          </Link>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t bg-background p-4 space-y-3">
          <Link href="/triage" className="block text-sm font-medium py-2" onClick={() => setMobileOpen(false)}>{t("triage")}</Link>
          <Link href="/facilities" className="block text-sm font-medium py-2" onClick={() => setMobileOpen(false)}>{t("facilities")}</Link>
          <Link href="/chat" className="block text-sm font-medium py-2" onClick={() => setMobileOpen(false)}>{t("chat")}</Link>
          <Link href="/dashboard" className="block text-sm font-medium py-2" onClick={() => setMobileOpen(false)}>{t("dashboard")}</Link>
          <div className="flex gap-2 pt-2">
            <Link href="/login" className="flex-1"><Button variant="outline" className="w-full" size="sm">{tc("signIn")}</Button></Link>
            <Link href="/register" className="flex-1"><Button className="w-full" size="sm">{tc("getStarted")}</Button></Link>
          </div>
        </div>
      )}
    </header>
  );
}
