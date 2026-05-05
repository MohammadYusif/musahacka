"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/ui/fade-in";
import { StaggerContainer, StaggerItem } from "@/components/ui/stagger-container";
import { motion } from "framer-motion";
import {
  Stethoscope,
  DollarSign,
  Plane,
  MessageSquare,
  HeartPulse,
  ArrowRight,
  Shield,
  Globe,
  Zap,
} from "lucide-react";

const featureKeys = [
  { icon: Stethoscope, key: "triage", badge: "Core" },
  { icon: DollarSign, key: "pricing", badge: "Core" },
  { icon: Plane, key: "travel", badge: "Coming Soon" },
  { icon: MessageSquare, key: "chat", badge: "Core" },
  { icon: HeartPulse, key: "followup", badge: "Coming Soon" },
] as const;

const trustKeys = [
  { icon: Shield, key: "verified" },
  { icon: Globe, key: "serving" },
  { icon: Zap, key: "aiPowered" },
];

export default function HomePage() {
  const t = useTranslations();

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden py-24 md:py-36">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-primary/4 to-background animate-gradient" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative">
          <div className="mx-auto max-w-3xl text-center">
            <FadeIn direction="down" delay={0}>
              <Badge variant="secondary" className="mb-5 px-4 py-1.5 text-xs font-medium">
                {t("hero.badge")}
              </Badge>
            </FadeIn>
            <FadeIn direction="up" delay={0.1}>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl leading-[1.15]">
                {t("hero.title")}{" "}
                <span className="text-primary">{t("hero.titleHighlight")}</span>
              </h1>
            </FadeIn>
            <FadeIn direction="up" delay={0.2}>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                {t("hero.subtitle")}
              </p>
            </FadeIn>
            <FadeIn direction="up" delay={0.35}>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/triage">
                  <Button size="lg" className="w-full sm:w-auto gap-2 shadow-lg shadow-primary/20 h-12 px-8 text-base">
                    {t("hero.cta")}
                    <ArrowRight className="h-4 w-4 rtl-flip" />
                  </Button>
                </Link>
                <Link href="/facilities">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8 text-base">
                    {t("hero.secondary")}
                  </Button>
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-y bg-muted/20 py-5">
        <div className="container mx-auto px-4">
          <StaggerContainer
            className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-14"
            staggerDelay={0.12}
          >
            {trustKeys.map((point) => (
              <StaggerItem key={point.key}>
                <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10">
                    <point.icon className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span>{t(`trust.${point.key}`)}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold tracking-tight">{t("features.title")}</h2>
              <p className="mt-3 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {t("features.subtitle")}
              </p>
            </div>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
            {featureKeys.map((feature) => (
              <StaggerItem key={feature.key}>
                <Card className="group hover:shadow-lg hover:shadow-primary/8 hover:-translate-y-0.5 transition-all duration-200 h-full border-border/60">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <feature.icon className="h-5 w-5" />
                      </div>
                      <Badge
                        variant={feature.badge === "Core" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {feature.badge}
                      </Badge>
                    </div>
                    <CardTitle className="mt-4 text-base font-semibold">
                      {t(`features.${feature.key}.title`)}
                    </CardTitle>
                    <CardDescription className="leading-relaxed">
                      {t(`features.${feature.key}.description`)}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-3xl font-bold tracking-tight">{t("cta.title")}</h2>
          <p className="mt-4 text-primary-foreground/75 max-w-xl mx-auto leading-relaxed">
            {t("cta.subtitle")}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/triage">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Button size="lg" variant="secondary" className="gap-2 h-12 px-8 text-base font-semibold shadow-lg">
                  {t("cta.button")}
                  <ArrowRight className="h-4 w-4 rtl-flip" />
                </Button>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
