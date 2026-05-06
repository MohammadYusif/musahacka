"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, useRouter, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Globe, Menu, X, User, LogOut } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signOut } from "next-auth/react";

export function Header() {
  const t = useTranslations("nav");
  const tc = useTranslations("common");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const switchLocale = () => {
    const next = locale === "en" ? "ar" : "en";
    router.replace(pathname, { locale: next });
  };

  const navLinks = [
    { href: "/triage", label: t("triage") },
    { href: "/facilities", label: t("facilities") },
    { href: "/chat", label: t("chat") },
    { href: "/dashboard", label: t("dashboard") },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-ivory-50/95 backdrop-blur-xl shadow-sm border-b border-ivory-200" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <Image src="/brand/WisalLogo.svg" alt={tc("appName")} width={320} height={106} className="h-14 sm:h-16 md:h-[68px] w-auto" priority />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-bark-700 hover:text-gold-400 transition-colors tracking-wide"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={switchLocale}
              className="gap-1.5 text-xs text-bark-700 hover:text-gold-400"
            >
              <Globe className="h-3.5 w-3.5" />
              {locale === "en" ? tc("arabic") : tc("english")}
            </Button>

            {session?.user ? (
              <div className="hidden md:flex items-center gap-2">
                <div className="text-sm text-bark-700 font-medium max-w-[120px] truncate">
                  {session.user.name ?? session.user.email}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-bark-600 hover:text-bark-800 gap-1.5"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  {tc("signOut")}
                </Button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="font-medium text-bark-700 hover:text-gold-400">
                    {tc("signIn")}
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="rounded-full bg-brand-600 text-ivory-100 font-medium hover:bg-brand-700 transition-all active:scale-[0.97] border-0">
                    {tc("getStarted")}
                  </Button>
                </Link>
              </div>
            )}

            <button
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-ivory-300 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? tc("closeMenu") : tc("openMenu")}
            >
              {mobileOpen ? <X className="w-5 h-5 text-bark-800" /> : <Menu className="w-5 h-5 text-bark-800" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="md:hidden bg-ivory-50/95 backdrop-blur-xl border-t border-ivory-200 overflow-hidden"
          >
            <div className="px-6 py-6 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-base font-medium text-bark-700 py-2 hover:text-gold-400 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-ivory-300 flex gap-3">
                {session?.user ? (
                  <Button
                    variant="outline"
                    className="w-full"
                    size="sm"
                    onClick={() => { setMobileOpen(false); signOut({ callbackUrl: "/" }); }}
                  >
                    {tc("signOut")}
                  </Button>
                ) : (
                  <>
                    <Link href="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
                      <Button variant="outline" className="w-full rounded-full" size="sm">{tc("signIn")}</Button>
                    </Link>
                    <Link href="/register" className="flex-1" onClick={() => setMobileOpen(false)}>
                      <Button className="w-full rounded-full bg-brand-600 text-ivory-100 border-0" size="sm">{tc("getStarted")}</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
