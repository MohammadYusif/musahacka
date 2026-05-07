"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useTranslations, useLocale } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@/i18n/navigation";
import {
  BedDouble, Building2, Car, CheckCircle2, CreditCard,
  Download, Landmark, MapPin, RotateCcw, Send, Ticket, Wallet,
} from "lucide-react";
import { openPrintReceipt } from "@/lib/print-receipt";
import type { Hotel } from "@/data/hotels";
import type { TransportOption } from "@/data/car-rentals";
import type { LocalEvent } from "@/data/events";
import type { Hospital, TreatmentPackage, TriageResult } from "./journey-types";

interface StepReceiptProps {
  triage: TriageResult;
  hospital: Hospital;
  pkg: TreatmentPackage | null;
  hotel: Hotel;
  nights: number;
  transport: TransportOption;
  events: LocalEvent[];
  onReset: () => void;
}

const SERVICE_FEE = 250;

const urgencyColors: Record<string, string> = {
  low: "bg-green-100 text-green-800",
  moderate: "bg-yellow-100 text-yellow-800",
  high: "bg-orange-100 text-orange-800",
  emergency: "bg-red-100 text-red-800",
};

function LineItem({ icon: Icon, label, sub, amount, freeLabel }: {
  icon: React.ElementType; label: string; sub?: string; amount: number; freeLabel: string;
}) {
  return (
    <div className="flex items-start justify-between gap-3 py-3 border-t border-ivory-200">
      <div className="flex items-start gap-3">
        <div className="w-7 h-7 rounded-lg bg-ivory-100 flex items-center justify-center shrink-0 mt-0.5">
          <Icon className="h-3.5 w-3.5 text-bark-500" />
        </div>
        <div>
          <p className="text-sm font-medium text-bark-700">{label}</p>
          {sub && <p className="text-xs text-bark-400 mt-0.5">{sub}</p>}
        </div>
      </div>
      <span className="text-sm font-semibold shrink-0 text-bark-700">
        {amount === 0 ? <span className="text-green-600">{freeLabel}</span> : `${amount.toLocaleString()} SAR`}
      </span>
    </div>
  );
}

export function StepReceipt({ triage, hospital, pkg, hotel, nights, transport, events, onReset }: StepReceiptProps) {
  const t = useTranslations("journey.receipt");
  const locale = useLocale();
  const { status: authStatus } = useSession();
  const isAuthenticated = authStatus === "authenticated";
  const isLoadingAuth = authStatus === "loading";

  const hospitalCost = pkg?.price ?? 500;
  const hotelCost = hotel.pricePerNight * nights;
  const transportCost = transport.type === "rideshare"
    ? (transport.estimatedPerTrip ?? 40) * 4 * nights
    : transport.pricePerDay * nights;
  const eventsCost = events.reduce((sum, e) => sum + e.price, 0);
  const total = hospitalCost + hotelCost + transportCost + eventsCost + SERVICE_FEE;

  const hospitalName = locale === "ar" && hospital.nameAr ? hospital.nameAr : hospital.name;
  const hotelName = locale === "ar" ? hotel.nameAr : hotel.name;
  const transportName = locale === "ar" ? transport.nameAr : transport.name;

  const paymentOptions = [
    {
      id: "pay_on_arrival",
      icon: Wallet,
      label: t("payOnArrival"),
      description: t("payOnArrivalDesc"),
      badge: t("payOnArrivalBadge"),
      badgeColor: "bg-green-100 text-green-700",
      disabled: false,
    },
    {
      id: "bank_transfer",
      icon: Landmark,
      label: t("bankTransfer"),
      description: t("bankTransferDesc"),
      badge: null,
      badgeColor: "",
      disabled: false,
    },
    {
      id: "online",
      icon: CreditCard,
      label: t("onlinePayment"),
      description: t("onlinePaymentDesc"),
      badge: t("comingSoon"),
      badgeColor: "bg-ivory-200 text-bark-500",
      disabled: true,
    },
  ];

  const [savedPlanId, setSavedPlanId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [showAnonForm, setShowAnonForm] = useState(false);
  const [anonForm, setAnonForm] = useState({ name: "", email: "", phone: "", nationality: "", travelDate: "" });
  const [contactPhone, setContactPhone] = useState("");
  const [contactNationality, setContactNationality] = useState("");
  const [contactTravelDate, setContactTravelDate] = useState("");
  const [formError, setFormError] = useState("");

  const buildPayload = (extra?: Record<string, unknown>) => ({
    specialty: triage.recommendedSpecialty,
    urgency: triage.urgency,
    triageSummary: triage.summary,
    hospitalName: hospital.name,
    packageName: pkg?.name ?? null,
    hospitalCost,
    hotelName: hotel.name,
    hotelStars: hotel.stars,
    pricePerNight: hotel.pricePerNight,
    nights,
    hotelCost,
    transportName: transport.name,
    transportCost,
    events: events.map((e) => ({ name: e.name, price: e.price })),
    eventsCost,
    serviceFee: SERVICE_FEE,
    totalCost: total,
    ...extra,
  });

  useEffect(() => {
    if (!isAuthenticated || savedPlanId || isSaving) return;
    setIsSaving(true);
    fetch("/api/journey-plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildPayload({ status: "saved" })),
    })
      .then((r) => r.json())
      .then((d) => { if (d.id) setSavedPlanId(d.id); })
      .catch(() => {})
      .finally(() => setIsSaving(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const handleDownloadPdf = () => {
    openPrintReceipt({
      triage, hospital, pkg, hotel, nights, transport, events,
      hospitalCost, hotelCost, transportCost, eventsCost,
      serviceFee: SERVICE_FEE, total,
      locale: locale === "ar" ? "ar" : "en",
      contact: {
        name: anonForm.name || undefined,
        nationality: anonForm.nationality || contactNationality || undefined,
        travelDate: anonForm.travelDate || contactTravelDate || undefined,
        phone: anonForm.phone || contactPhone || undefined,
        paymentMethod,
      },
    });
  };

  const handleConfirmAuth = async () => {
    if (!paymentMethod) return;
    setIsConfirming(true);
    try {
      if (savedPlanId) {
        await fetch(`/api/journey-plan/${savedPlanId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            paymentMethod,
            status: "payment_selected",
            contactPhone: contactPhone || null,
            nationality: contactNationality || null,
            travelDate: contactTravelDate || null,
          }),
        });
      }
      setIsConfirmed(true);
    } catch {
      setFormError(t("formError"));
    } finally {
      setIsConfirming(false);
    }
  };

  const handleConfirmAnon = async () => {
    if (!anonForm.name || !anonForm.email || !anonForm.phone) {
      setFormError(t("formErrorRequired"));
      return;
    }
    if (!paymentMethod) {
      setFormError(t("formErrorPayment"));
      return;
    }
    setFormError("");
    setIsConfirming(true);
    try {
      await fetch("/api/journey-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload({
          contactName: anonForm.name,
          contactEmail: anonForm.email,
          contactPhone: anonForm.phone,
          nationality: anonForm.nationality,
          travelDate: anonForm.travelDate,
          paymentMethod,
          status: "inquiry_sent",
        })),
      });
      setIsConfirmed(true);
    } catch {
      setFormError(t("formError"));
    } finally {
      setIsConfirming(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">

      {/* Triage strip */}
      <div className="rounded-xl bg-ivory-100 border border-ivory-200 px-4 py-3 flex items-center justify-between gap-2">
        <div className="min-w-0">
          <p className="text-xs text-bark-400">{t("condition")}</p>
          <p className="text-sm font-semibold text-bark-800 truncate">{triage.recommendedSpecialty}</p>
        </div>
        <Badge className={`${urgencyColors[triage.urgency]} border-0 shrink-0 capitalize`}>
          {t("urgency", { level: triage.urgency })}
        </Badge>
        <div className="text-end shrink-0">
          <p className="text-xs text-bark-400">{t("estStay")}</p>
          <p className="text-sm font-semibold text-bark-800">{nights} {locale === "ar" ? "ليالٍ" : "nights"}</p>
        </div>
      </div>

      {/* Line items */}
      <div className="rounded-2xl border border-ivory-200 bg-white overflow-hidden">
        <div className="px-4">
          <LineItem
            icon={Building2}
            label={hospitalName}
            sub={pkg
              ? `${locale === "ar" && pkg.nameAr ? pkg.nameAr : pkg.name} · ${pkg.duration}`
              : t("consultation")}
            amount={hospitalCost}
            freeLabel={t("free")}
          />
          <LineItem
            icon={BedDouble}
            label={hotelName}
            sub={t("nightsX", { nights, price: hotel.pricePerNight.toLocaleString() })}
            amount={hotelCost}
            freeLabel={t("free")}
          />
          <LineItem
            icon={Car}
            label={transportName}
            sub={transport.type === "rideshare"
              ? t("estTrips", { count: nights * 4 })
              : t("daysX", { nights, price: transport.pricePerDay })}
            amount={transportCost}
            freeLabel={t("free")}
          />
          {events.length > 0 && (
            <LineItem
              icon={Ticket}
              label={t("activitiesCount", { count: events.length })}
              sub={events.map((e) => locale === "ar" ? e.nameAr : e.name).join(", ")}
              amount={eventsCost}
              freeLabel={t("free")}
            />
          )}
          <LineItem
            icon={MapPin}
            label={t("wisalFee")}
            sub={t("wisalFeeDesc")}
            amount={SERVICE_FEE}
            freeLabel={t("free")}
          />
        </div>
        <div className="border-t-2 border-brand-100 bg-brand-50/40 px-4 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-bark-400 mb-0.5">{t("totalCost")}</p>
            <p className="text-2xl font-bold text-brand-700" style={{ fontFamily: "var(--font-display)" }}>
              {total.toLocaleString()} SAR
            </p>
            <p className="text-xs text-bark-400 mt-0.5">
              {t("usdApprox", { amount: Math.round(total / 3.75).toLocaleString() })}
            </p>
          </div>
          <div className="text-end">
            <Badge className="bg-green-100 text-green-800 border-green-200 border text-xs mb-1 block">{t("savingsVsHome")}</Badge>
            <p className="text-xs text-bark-400">{t("vsWestern")}</p>
          </div>
        </div>
      </div>

      {/* Package includes */}
      {(pkg?.includes?.length ?? 0) > 0 && (
        <div className="rounded-xl bg-brand-50 border border-brand-100 px-4 py-3">
          <p className="text-xs font-semibold text-brand-700 mb-2">{t("packageIncludes")}</p>
          <div className="flex flex-wrap gap-1.5">
            {pkg!.includes.map((item) => (
              <Badge key={item} className="bg-white border-brand-200 border text-brand-700 text-xs">{item}</Badge>
            ))}
          </div>
        </div>
      )}

      {/* ── AUTHENTICATED FLOW ── */}
      {!isLoadingAuth && isAuthenticated && (
        <div className="space-y-4">
          <div className={`rounded-xl border px-4 py-3 flex items-center gap-2 text-sm transition-all ${
            isSaving ? "border-ivory-200 bg-ivory-50 text-bark-500"
            : savedPlanId ? "border-green-200 bg-green-50 text-green-700"
            : "border-ivory-200 bg-ivory-50 text-bark-500"
          }`}>
            {isSaving ? (
              <><span className="h-3.5 w-3.5 rounded-full border-2 border-bark-400 border-t-transparent animate-spin shrink-0" /> {t("savingToDashboard")}</>
            ) : savedPlanId ? (
              <><CheckCircle2 className="h-4 w-4 shrink-0" /> {t("savedToDashboard")}</>
            ) : null}
          </div>

          {isConfirmed ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="rounded-2xl border-2 border-green-200 bg-green-50 p-5 text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
              <p className="font-semibold text-bark-800">{t("confirmedTitle")}</p>
              <p className="text-sm text-bark-500">
                {t("confirmedDesc", { method: paymentOptions.find(p => p.id === paymentMethod)?.label ?? "" })}
              </p>
              <Link href="/dashboard">
                <Button className="mt-2 bg-brand-600 hover:bg-brand-700 text-white gap-2" size="sm">
                  {t("viewDashboard")}
                </Button>
              </Link>
            </motion.div>
          ) : (
            <div className="rounded-2xl border-2 border-brand-100 bg-gradient-to-b from-brand-50/60 to-white p-5 space-y-4">
              <div>
                <p className="font-semibold text-bark-800 text-sm">{t("completeBooking")}</p>
                <p className="text-xs text-bark-500 mt-0.5">{t("completeBookingDesc")}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs text-bark-600">{t("whatsapp")}</Label>
                  <Input placeholder="+971 50 123 4567" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} className="h-9 text-sm border-ivory-300" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-bark-600">{t("nationalityLabel")}</Label>
                  <Input placeholder="UAE" value={contactNationality} onChange={(e) => setContactNationality(e.target.value)} className="h-9 text-sm border-ivory-300" />
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-bark-600">{t("travelDateLabel")}</Label>
                <Input type="date" value={contactTravelDate} onChange={(e) => setContactTravelDate(e.target.value)} className="h-9 text-sm border-ivory-300" />
              </div>

              <PaymentOptions options={paymentOptions} selected={paymentMethod} onSelect={setPaymentMethod} payHow={t("payHow")} />

              {formError && <p className="text-xs text-destructive">{formError}</p>}

              <Button className="w-full gap-2 bg-brand-600 hover:bg-brand-700 text-white" disabled={!paymentMethod || isConfirming} onClick={handleConfirmAuth}>
                {isConfirming ? (
                  <span className="flex items-center gap-2">
                    <span className="h-3.5 w-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    {t("confirming")}
                  </span>
                ) : (
                  <><Send className="h-4 w-4" /> {t("confirmJourney")}</>
                )}
              </Button>
            </div>
          )}
        </div>
      )}

      {/* ── NOT AUTHENTICATED FLOW ── */}
      {!isLoadingAuth && !isAuthenticated && (
        <div className="space-y-3">
          {!showAnonForm && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl border-2 border-brand-200 bg-gradient-to-b from-brand-50 to-white p-5 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-brand-100 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="h-4 w-4 text-brand-600" />
                </div>
                <div>
                  <p className="font-semibold text-bark-800 text-sm">{t("saveTitle")}</p>
                  <p className="text-xs text-bark-500 mt-0.5">{t("saveDesc")}</p>
                </div>
              </div>
              <ul className="space-y-1 ps-12">
                {([t("saveBullet1"), t("saveBullet2"), t("saveBullet3")] as string[]).map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-bark-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-400 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <div className="flex gap-2">
                <Link href="/login" className="flex-1">
                  <Button variant="outline" className="w-full border-brand-200 text-brand-700 hover:bg-brand-50" size="sm">{t("signIn")}</Button>
                </Link>
                <Link href="/register" className="flex-1">
                  <Button className="w-full bg-brand-600 hover:bg-brand-700 text-white" size="sm">{t("createAccount")}</Button>
                </Link>
              </div>
              <button className="text-xs text-bark-400 hover:text-bark-600 underline w-full text-center pt-1" onClick={() => setShowAnonForm(true)}>
                {t("continueWithout")}
              </button>
            </motion.div>
          )}

          {showAnonForm && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl border-2 border-ivory-200 bg-white p-5 space-y-4">
              {isConfirmed ? (
                <div className="text-center space-y-2 py-2">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  </div>
                  <p className="font-semibold text-bark-800">{t("sentTitle")}</p>
                  <p className="text-sm text-bark-500">{t("sentDesc")}</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-bark-800 text-sm">{t("sendInquiry")}</p>
                    <button className="text-xs text-bark-400 hover:text-bark-600 underline" onClick={() => setShowAnonForm(false)}>{t("backLink")}</button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-xs text-bark-600">{t("fullName")}</Label>
                      <Input placeholder="Ahmed Hassan" value={anonForm.name} onChange={(e) => setAnonForm((f) => ({ ...f, name: e.target.value }))} className="h-9 text-sm border-ivory-300" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-bark-600">{t("nationalityGuest")}</Label>
                      <Input placeholder="UAE" value={anonForm.nationality} onChange={(e) => setAnonForm((f) => ({ ...f, nationality: e.target.value }))} className="h-9 text-sm border-ivory-300" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-bark-600">{t("emailLabel")}</Label>
                    <Input type="email" placeholder="you@example.com" value={anonForm.email} onChange={(e) => setAnonForm((f) => ({ ...f, email: e.target.value }))} className="h-9 text-sm border-ivory-300" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-xs text-bark-600">{t("whatsappLabel")}</Label>
                      <Input placeholder="+971 50 123 4567" value={anonForm.phone} onChange={(e) => setAnonForm((f) => ({ ...f, phone: e.target.value }))} className="h-9 text-sm border-ivory-300" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-bark-600">{t("travelDateGuest")}</Label>
                      <Input type="date" value={anonForm.travelDate} onChange={(e) => setAnonForm((f) => ({ ...f, travelDate: e.target.value }))} className="h-9 text-sm border-ivory-300" />
                    </div>
                  </div>

                  <PaymentOptions options={paymentOptions} selected={paymentMethod} onSelect={setPaymentMethod} payHow={t("payHow")} />

                  {formError && <p className="text-xs text-destructive">{formError}</p>}

                  <Button className="w-full gap-2 bg-brand-600 hover:bg-brand-700 text-white" disabled={isConfirming} onClick={handleConfirmAnon}>
                    {isConfirming
                      ? <span className="flex items-center gap-2"><span className="h-3.5 w-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />{t("sending")}</span>
                      : <><Send className="h-4 w-4" /> {t("sendRequest")}</>
                    }
                  </Button>
                </>
              )}
            </motion.div>
          )}
        </div>
      )}

      <Button
        variant="outline"
        className="w-full gap-2 border-brand-200 text-brand-700 hover:bg-brand-50"
        onClick={handleDownloadPdf}
      >
        <Download className="h-4 w-4" /> {t("downloadPdf")}
      </Button>

      <Button variant="outline" className="w-full gap-2 border-ivory-300 text-bark-500 hover:bg-ivory-100" onClick={onReset}>
        <RotateCcw className="h-4 w-4" /> {t("planAnother")}
      </Button>
    </motion.div>
  );
}

function PaymentOptions({
  options, selected, onSelect, payHow,
}: {
  options: { id: string; icon: React.ElementType; label: string; description: string; badge: string | null; badgeColor: string; disabled: boolean }[];
  selected: string | null;
  onSelect: (id: string) => void;
  payHow: string;
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-bark-700">{payHow}</p>
      <div className="space-y-2">
        {options.map((opt) => {
          const Icon = opt.icon;
          const isSelected = selected === opt.id;
          return (
            <button
              key={opt.id}
              disabled={opt.disabled}
              onClick={() => !opt.disabled && onSelect(opt.id)}
              className={`w-full rounded-xl border-2 px-4 py-3 text-start transition-all flex items-start gap-3 ${
                opt.disabled ? "opacity-50 cursor-not-allowed border-ivory-200 bg-ivory-50"
                : isSelected ? "border-brand-500 bg-brand-50/60"
                : "border-ivory-200 hover:border-brand-300 bg-white"
              }`}
            >
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${isSelected ? "bg-brand-100" : "bg-ivory-100"}`}>
                <Icon className={`h-3.5 w-3.5 ${isSelected ? "text-brand-600" : "text-bark-500"}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-medium ${isSelected ? "text-brand-700" : "text-bark-700"}`}>{opt.label}</span>
                  {opt.badge && <Badge className={`text-xs border-0 ${opt.badgeColor}`}>{opt.badge}</Badge>}
                  {isSelected && <CheckCircle2 className="h-3.5 w-3.5 text-brand-600 ms-auto" />}
                </div>
                <p className="text-xs text-bark-400 mt-0.5">{opt.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
