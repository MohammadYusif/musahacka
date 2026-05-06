"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { StaggerContainer, StaggerItem } from "@/components/ui/stagger-container";
import { CountUp } from "@/components/ui/count-up";
import { motion } from "framer-motion";
import {
  AlertTriangle, ArrowRight, Building2, Calendar, CheckCircle2,
  Clock, FileText, HeartPulse, MessageSquare, Route, User,
} from "lucide-react";

interface JourneyPlan {
  id: string;
  specialty: string;
  urgency: string;
  hospitalName: string;
  packageName: string | null;
  hotelName: string;
  nights: number;
  totalCost: number;
  paymentMethod: string | null;
  status: string;
  travelDate: string | null;
  createdAt: string;
}

interface DemoAppointment {
  id: string; doctorName: string; facilityName: string;
  specialty: string; date: string; status: string; notes: string;
}

const demoAppointments: DemoAppointment[] = [{
  id: "1", doctorName: "Dr. Ahmed Al-Qahtani", facilityName: "Al-Moosa Specialist Hospital",
  specialty: "Cardiology", date: "May 4, 2026", status: "confirmed", notes: "Initial consultation for cholesterol management",
}];

const urgencyColors: Record<string, string> = {
  low: "bg-ivory-200 text-brand-600",
  moderate: "bg-gold-400/20 text-gold-600",
  high: "bg-brand-200 text-brand-600",
  emergency: "bg-red-100 text-red-700",
};

export default function DashboardPage() {
  const t = useTranslations("dashboard");
  const te = useTranslations("dashboardExtra");
  const tj = useTranslations("journey");
  const { data: session } = useSession();

  const [journeyPlans, setJourneyPlans] = useState<JourneyPlan[]>([]);
  const [isLoadingPlans, setIsLoadingPlans] = useState(true);

  useEffect(() => {
    fetch("/api/journey-plan")
      .then((r) => r.json())
      .then((d) => setJourneyPlans(d.plans ?? []))
      .catch(() => {})
      .finally(() => setIsLoadingPlans(false));
  }, []);

  const userName = session?.user?.name ?? session?.user?.email ?? "there";

  const stats = [
    { label: te("journeyPlans"),  count: journeyPlans.length,     icon: Route        },
    { label: t("appointments"),   count: demoAppointments.length,  icon: Calendar     },
    { label: t("recentChat"),     count: 1,                        icon: MessageSquare },
  ];

  const statusConfig: Record<string, { label: string; color: string }> = {
    saved:            { label: tj("statusLabels.saved"),            color: "bg-ivory-200 text-bark-600"    },
    inquiry_sent:     { label: tj("statusLabels.inquiry_sent"),     color: "bg-blue-100 text-blue-700"     },
    payment_selected: { label: tj("statusLabels.payment_selected"), color: "bg-yellow-100 text-yellow-700" },
    confirmed:        { label: tj("statusLabels.confirmed"),        color: "bg-green-100 text-green-700"   },
  };

  const paymentLabels: Record<string, string> = {
    pay_on_arrival: tj("paymentLabels.pay_on_arrival"),
    bank_transfer:  tj("paymentLabels.bank_transfer"),
    online:         tj("paymentLabels.online"),
  };

  return (
    <div className="min-h-screen bg-ivory-100/50">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <FadeIn>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-brand-500 flex items-center justify-center">
                <User className="w-5 h-5 text-ivory-100" />
              </div>
              <h1 className="text-2xl font-bold text-bark-800" style={{ fontFamily: "var(--font-display)" }}>{t("title")}</h1>
            </div>
            <p className="text-bark-600">{t("welcome")}, {userName}</p>
          </div>
        </FadeIn>

        {/* Stats */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8" staggerDelay={0.1}>
          {stats.map((stat, i) => (
            <StaggerItem key={stat.label}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer border-ivory-200 bg-white rounded-2xl">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-bark-800" style={{ fontFamily: "var(--font-display)" }}>
                        <CountUp target={stat.count} delay={0.2 + i * 0.15} />
                      </p>
                      <p className="text-sm text-bark-500">{stat.label}</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center">
                      <stat.icon className="w-5 h-5 text-brand-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="space-y-6">

          {/* ── My Journey Plans ── */}
          <FadeIn delay={0.2}>
            <Card className="border-ivory-200 bg-white rounded-2xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg text-bark-800 flex items-center gap-2" style={{ fontFamily: "var(--font-display)" }}>
                  <Route className="h-5 w-5 text-brand-600" /> {te("myJourneyPlans")}
                </CardTitle>
                <Link href="/journey">
                  <Button variant="ghost" size="sm" className="gap-1 text-brand-600 hover:text-brand-700">
                    {te("newJourney")} <ArrowRight className="h-3 w-3 rtl:rotate-180" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="space-y-3">
                {isLoadingPlans ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="h-5 w-5 rounded-full border-2 border-brand-400 border-t-transparent animate-spin" />
                  </div>
                ) : journeyPlans.length === 0 ? (
                  <div className="text-center py-8 space-y-3">
                    <HeartPulse className="mx-auto h-8 w-8 text-bark-300" />
                    <p className="text-sm text-bark-400">{te("noJourneyPlans")}</p>
                    <Link href="/journey">
                      <Button size="sm" className="bg-brand-600 hover:bg-brand-700 text-white gap-1">
                        {te("planFirstJourney")} <ArrowRight className="h-3 w-3 rtl:rotate-180" />
                      </Button>
                    </Link>
                  </div>
                ) : (
                  journeyPlans.map((plan, i) => {
                    const statusCfg = statusConfig[plan.status] ?? statusConfig.saved;
                    return (
                      <motion.div
                        key={plan.id}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.08 }}
                        className="rounded-xl border border-ivory-200 p-3 space-y-2 bg-ivory-50/50"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-start gap-2 min-w-0">
                            <Building2 className="h-4 w-4 text-brand-600 shrink-0 mt-0.5" />
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-bark-800 truncate">{plan.hospitalName}</p>
                              {plan.packageName && (
                                <p className="text-xs text-bark-500 truncate">{plan.packageName}</p>
                              )}
                            </div>
                          </div>
                          <Badge className={`${statusCfg.color} border-0 shrink-0 text-xs`}>{statusCfg.label}</Badge>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <Badge className={`${urgencyColors[plan.urgency] ?? ""} border-0 text-xs`}>
                            {plan.urgency === "moderate" || plan.urgency === "high" || plan.urgency === "emergency"
                              ? <AlertTriangle className="me-1 h-3 w-3 inline" />
                              : <CheckCircle2 className="me-1 h-3 w-3 inline" />
                            }
                            {plan.specialty}
                          </Badge>
                          <span className="text-xs text-bark-400">{plan.nights} × {plan.hotelName}</span>
                        </div>

                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-3 text-bark-400">
                            {plan.travelDate && (
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {new Date(plan.travelDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                              </span>
                            )}
                            {plan.paymentMethod && (
                              <span>{paymentLabels[plan.paymentMethod] ?? plan.paymentMethod}</span>
                            )}
                          </div>
                          <span className="font-semibold text-brand-700">{plan.totalCost.toLocaleString()} SAR</span>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </CardContent>
            </Card>
          </FadeIn>

          {/* ── Appointments ── */}
          <FadeIn delay={0.35}>
            <Card className="border-ivory-200 bg-white rounded-2xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg text-bark-800 flex items-center gap-2" style={{ fontFamily: "var(--font-display)" }}>
                  <Calendar className="h-5 w-5 text-brand-600" /> {t("appointments")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {demoAppointments.map((appt, i) => (
                  <motion.div key={appt.id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45 + i * 0.1 }} className="rounded-xl border border-ivory-200 p-3 space-y-2 bg-ivory-50/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-brand-600" />
                        <span className="text-sm font-medium text-bark-800">{appt.doctorName}</span>
                      </div>
                      <Badge className="bg-brand-100 text-brand-700 border-0 text-xs">{appt.status}</Badge>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-bark-500">
                      <span>{appt.facilityName}</span>
                      <Badge variant="outline" className="border-ivory-300 text-bark-600 text-xs">{appt.specialty}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs text-bark-400">
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {appt.date}</span>
                      <span>{appt.notes}</span>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </FadeIn>

          {/* ── Recent Chat ── */}
          <FadeIn delay={0.5}>
            <Card className="border-ivory-200 bg-white rounded-2xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg text-bark-800 flex items-center gap-2" style={{ fontFamily: "var(--font-display)" }}>
                  <MessageSquare className="h-5 w-5 text-brand-600" /> {t("recentChat")}
                </CardTitle>
                <Link href="/chat">
                  <Button variant="ghost" size="sm" className="gap-1 text-brand-600 hover:text-brand-700">
                    {t("openChat")} <ArrowRight className="h-3 w-3 rtl:rotate-180" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="rounded-xl border border-ivory-200 p-3 flex items-center justify-between bg-ivory-50/50">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-4 w-4 text-brand-600 shrink-0" />
                    <div>
                      <p className="text-sm text-bark-700 line-clamp-1">I recommend Al-Moosa Specialist Hospital or Saad Specialist Hospital for cardiology.</p>
                      <p className="text-xs text-bark-400">Apr 20, 2026</p>
                    </div>
                  </div>
                  <Link href="/chat">
                    <Button variant="ghost" size="sm" className="text-brand-600 hover:text-brand-700 shrink-0">{t("continue")}</Button>
                  </Link>
                </motion.div>
              </CardContent>
            </Card>
          </FadeIn>

        </div>
      </div>
    </div>
  );
}
