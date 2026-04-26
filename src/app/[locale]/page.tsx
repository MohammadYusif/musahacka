import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
        <div className="container mx-auto px-4 relative">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              {t("hero.badge")}
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              {t("hero.title")}{" "}
              <span className="text-primary">{t("hero.titleHighlight")}</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              {t("hero.subtitle")}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/triage">
                <Button size="lg" className="w-full sm:w-auto gap-2">
                  {t("hero.cta")} <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/facilities">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  {t("hero.secondary")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y bg-muted/30 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
            {trustKeys.map((point) => (
              <div key={point.key} className="flex items-center gap-2 text-sm text-muted-foreground">
                <point.icon className="h-4 w-4 text-primary" />
                <span>{t(`trust.${point.key}`)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">{t("features.title")}</h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              {t("features.subtitle")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureKeys.map((feature) => (
              <Card key={feature.key} className="relative group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <Badge variant={feature.badge === "Core" ? "default" : "secondary"} className="text-xs">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="mt-3">{t(`features.${feature.key}.title`)}</CardTitle>
                  <CardDescription>{t(`features.${feature.key}.description`)}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold">{t("cta.title")}</h2>
          <p className="mt-4 text-primary-foreground/80 max-w-xl mx-auto">
            {t("cta.subtitle")}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/triage">
              <Button size="lg" variant="secondary" className="gap-2">
                {t("cta.button")} <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
