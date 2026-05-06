import React from "react";
import path from "path";
import {
  Document, Page, Text, View, StyleSheet, Image, Font,
} from "@react-pdf/renderer";

// ── Fonts ─────────────────────────────────────────────────────────────────────
const FONTS_DIR = path.join(
  process.cwd(),
  "node_modules/@fontsource/noto-naskh-arabic/files"
);

Font.register({
  family: "NotoNaskhArabic",
  fonts: [
    {
      src: path.join(FONTS_DIR, "noto-naskh-arabic-arabic-400-normal.woff"),
      fontWeight: 400,
    },
    {
      src: path.join(FONTS_DIR, "noto-naskh-arabic-arabic-700-normal.woff"),
      fontWeight: 700,
    },
  ],
});

Font.registerHyphenationCallback((w) => [w]);

// ── Types ──────────────────────────────────────────────────────────────────────
export interface PdfPlanData {
  planId?: string;
  locale: "en" | "ar";

  specialty: string;
  urgency: string;
  triageSummary?: string | null;

  hospitalName: string;
  hospitalNameAr?: string | null;
  hospitalAddress?: string | null;
  hospitalMapUrl?: string | null;
  packageName?: string | null;
  packageNameAr?: string | null;
  hospitalCost: number;

  hotelName: string;
  hotelNameAr?: string | null;
  hotelAddress?: string | null;
  hotelAddressAr?: string | null;
  hotelMapUrl?: string | null;
  hotelStars: number;
  hotelAmenities?: string[];
  hotelDistanceKm?: number;
  pricePerNight: number;
  nights: number;
  hotelCost: number;

  transportName: string;
  transportNameAr?: string | null;
  transportCost: number;

  events: { name: string; nameAr?: string; price: number }[];
  eventsCost: number;

  serviceFee: number;
  totalCost: number;

  contactName?: string | null;
  nationality?: string | null;
  travelDate?: string | null;
  paymentMethod?: string | null;
}

// ── Translations ───────────────────────────────────────────────────────────────
const LABEL = {
  en: {
    brand: "WISAL",
    receiptTitle: "Medical Journey Receipt",
    platform: "Medical Tourism Platform",
    destination: "Destination: Al-Ahsa, Saudi Arabia",
    generated: "Generated",
    planRef: "Plan Reference",
    medicalAssessment: "MEDICAL ASSESSMENT",
    urgencyLabel: (l: string) =>
      l === "low" ? "Low Urgency" :
      l === "moderate" ? "Moderate Urgency" :
      l === "high" ? "High Urgency" : "Emergency",
    hospital: "HOSPITAL",
    accommodation: "ACCOMMODATION",
    transport: "TRANSPORT",
    activities: "ACTIVITIES",
    priceBreakdown: "PRICE BREAKDOWN",
    bookingDetails: "BOOKING DETAILS",
    viewOnMaps: "View on Google Maps →",
    consultation: "Initial consultation",
    package: "Package",
    nightsXprice: (n: number, p: number) => `${n} nights × ${p.toLocaleString()} SAR / night`,
    airportTrips: "Airport transfers & hospital trips",
    amenities: "Amenities",
    distanceFrom: (km: number) => `${km} km from city centre`,
    wisalFee: "Wisal Coordination Fee",
    wisalFeeDesc: "Airport pickup, scheduling & 24/7 support",
    totalLabel: "Total Estimated Cost",
    savingsTag: "Save 40–60% vs. home country",
    usd: (amt: string) => `≈ $${amt} USD`,
    patientName: "Patient Name",
    travelDate: "Travel Date",
    paymentMethod: "Payment",
    nationality: "Nationality",
    free: "Free",
    activitiesCount: (n: number) => `${n} ${n === 1 ? "Activity" : "Activities"}`,
    paymentLabels: {
      pay_on_arrival: "Pay on Arrival",
      bank_transfer: "Bank Transfer",
      online: "Online Payment",
    } as Record<string, string>,
    footerNote: "All prices are estimates subject to final confirmation at booking.",
    footerBrand: "Wisal Medical Tourism · Al-Ahsa, Saudi Arabia · wisal.io",
  },
  ar: {
    brand: "وصال",
    receiptTitle: "إيصال الرحلة الطبية",
    platform: "منصة السياحة العلاجية",
    destination: "الوجهة: الأحساء، المملكة العربية السعودية",
    generated: "تاريخ الإصدار",
    planRef: "رقم المرجع",
    medicalAssessment: "التقييم الطبي",
    urgencyLabel: (l: string) =>
      l === "low" ? "أولوية منخفضة" :
      l === "moderate" ? "أولوية متوسطة" :
      l === "high" ? "أولوية مرتفعة" : "حالة طارئة",
    hospital: "المستشفى",
    accommodation: "الإقامة",
    transport: "التنقل",
    activities: "الأنشطة",
    priceBreakdown: "تفاصيل التكلفة",
    bookingDetails: "تفاصيل الحجز",
    viewOnMaps: "عرض على خرائط جوجل ←",
    consultation: "استشارة أولية",
    package: "الباقة",
    nightsXprice: (n: number, p: number) => `${n} ليالٍ × ${p.toLocaleString()} ريال / ليلة`,
    airportTrips: "نقل المطار ورحلات المستشفى",
    amenities: "المرافق",
    distanceFrom: (km: number) => `${km} كم من مركز المدينة`,
    wisalFee: "رسوم تنسيق وصال",
    wisalFeeDesc: "استقبال من المطار، جدولة، دعم على مدار الساعة",
    totalLabel: "التكلفة الإجمالية التقديرية",
    savingsTag: "وفّر 40–60٪ مقارنةً ببلدك",
    usd: (amt: string) => `≈ ${amt} دولار أمريكي`,
    patientName: "اسم المريض",
    travelDate: "تاريخ السفر",
    paymentMethod: "طريقة الدفع",
    nationality: "الجنسية",
    free: "مجاني",
    activitiesCount: (n: number) => `${n} ${n === 1 ? "نشاط" : "أنشطة"}`,
    paymentLabels: {
      pay_on_arrival: "الدفع عند الوصول",
      bank_transfer: "تحويل بنكي",
      online: "الدفع الإلكتروني",
    } as Record<string, string>,
    footerNote: "جميع الأسعار تقديرية وتخضع للتأكيد النهائي عند الحجز.",
    footerBrand: "وصال للسياحة العلاجية · الأحساء، المملكة العربية السعودية · wisal.io",
  },
};

// ── Colors ─────────────────────────────────────────────────────────────────────
const C = {
  navyDark: "#0f2444",
  navy: "#1e3a5f",
  blue: "#1d4ed8",
  blueMid: "#3b82f6",
  blueLight: "#dbeafe",
  blueFaint: "#eff6ff",
  dark: "#1e293b",
  mid: "#475569",
  muted: "#64748b",
  label: "#94a3b8",
  border: "#e2e8f0",
  borderLight: "#f1f5f9",
  bg: "#f8fafc",
  white: "#ffffff",
  green: "#16a34a",
  greenBg: "#f0fdf4",
  urgency: {
    low: "#16a34a",
    moderate: "#d97706",
    high: "#f97316",
    emergency: "#dc2626",
  } as Record<string, string>,
  urgencyBg: {
    low: "#f0fdf4",
    moderate: "#fffbeb",
    high: "#fff7ed",
    emergency: "#fef2f2",
  } as Record<string, string>,
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function fmtDate(iso: string, ar: boolean) {
  try {
    return new Date(iso).toLocaleDateString(ar ? "ar-SA" : "en-US", {
      year: "numeric", month: "long", day: "numeric",
    });
  } catch { return iso; }
}

function starText(n: number) {
  return "★".repeat(n);
}

function mapsUrl(query: string) {
  return `maps.google.com/?q=${encodeURIComponent(query)}`;
}

// ── Styles ────────────────────────────────────────────────────────────────────
const S = StyleSheet.create({
  // Page
  page: { backgroundColor: C.white, fontFamily: "Helvetica", fontSize: 10, color: C.dark },
  pageAr: { backgroundColor: C.white, fontFamily: "NotoNaskhArabic", fontSize: 11, color: C.dark },

  // Header
  header: {
    backgroundColor: C.navyDark,
    paddingTop: 26, paddingBottom: 26,
    paddingLeft: 40, paddingRight: 40,
    flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end",
  },
  headerLeft: {},
  headerBrand: { color: C.white, fontSize: 24, fontFamily: "Helvetica-Bold" },
  headerBrandAr: { color: C.white, fontSize: 24, fontFamily: "NotoNaskhArabic", fontWeight: 700 },
  headerTitle: { color: "rgba(255,255,255,0.7)", fontSize: 10, marginTop: 3 },
  headerTitleAr: { color: "rgba(255,255,255,0.7)", fontSize: 11, marginTop: 3, fontFamily: "NotoNaskhArabic" },
  headerRight: { alignItems: "flex-end" },
  headerRef: { color: "rgba(255,255,255,0.9)", fontSize: 9, fontFamily: "Helvetica-Bold" },
  headerRefAr: { color: "rgba(255,255,255,0.9)", fontSize: 10, fontFamily: "NotoNaskhArabic", fontWeight: 700 },
  headerDate: { color: "rgba(255,255,255,0.5)", fontSize: 8, marginTop: 2 },
  headerDateAr: { color: "rgba(255,255,255,0.5)", fontSize: 9, marginTop: 2, fontFamily: "NotoNaskhArabic" },

  // Destination banner
  destBanner: {
    backgroundColor: C.blueLight,
    paddingTop: 8, paddingBottom: 8,
    paddingLeft: 40, paddingRight: 40,
    flexDirection: "row", alignItems: "center",
  },
  destDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: C.blue, marginRight: 7 },
  destText: { color: C.blue, fontFamily: "Helvetica-Bold", fontSize: 10 },
  destTextAr: { color: C.blue, fontFamily: "NotoNaskhArabic", fontWeight: 700, fontSize: 11 },

  // Body
  body: { paddingLeft: 36, paddingRight: 36, paddingTop: 20, paddingBottom: 56 },

  // Section header row
  sectionRow: { flexDirection: "row", alignItems: "center", marginBottom: 8, marginTop: 18 },
  sectionBar: { width: 3, height: 14, backgroundColor: C.blue, marginRight: 8, borderRadius: 2 },
  sectionLabel: { fontSize: 9, fontFamily: "Helvetica-Bold", color: C.muted },
  sectionLabelAr: { fontSize: 10, fontFamily: "NotoNaskhArabic", fontWeight: 700, color: C.muted },

  // Medical assessment
  assessRow: { flexDirection: "row", marginBottom: 6 },
  chip: { borderRadius: 5, paddingTop: 4, paddingBottom: 4, paddingLeft: 9, paddingRight: 9, marginRight: 7 },
  chipText: { fontSize: 9, fontFamily: "Helvetica-Bold" },
  chipTextAr: { fontSize: 10, fontFamily: "NotoNaskhArabic", fontWeight: 700 },
  summaryBox: {
    marginTop: 8,
    backgroundColor: C.bg, borderRadius: 7,
    borderWidth: 1, borderColor: C.border,
    paddingTop: 9, paddingBottom: 9,
    paddingLeft: 12, paddingRight: 12,
  },
  summaryText: { fontSize: 9, color: C.mid, lineHeight: 1.55 },
  summaryTextAr: { fontSize: 10, color: C.mid, lineHeight: 1.7, fontFamily: "NotoNaskhArabic", textAlign: "right" },

  // Location card
  locationCard: {
    borderWidth: 1, borderColor: C.border, borderRadius: 10,
    marginBottom: 2, overflow: "hidden",
  },
  mapImage: { width: "100%", height: 90 },
  mapPlaceholder: {
    width: "100%", height: 50,
    backgroundColor: C.blueLight,
    alignItems: "center", justifyContent: "center",
  },
  locationBody: {
    paddingTop: 12, paddingBottom: 12,
    paddingLeft: 14, paddingRight: 14,
  },
  locationName: { fontSize: 13, fontFamily: "Helvetica-Bold", color: C.dark, marginBottom: 3 },
  locationNameAr: { fontSize: 13, fontFamily: "NotoNaskhArabic", fontWeight: 700, color: C.dark, marginBottom: 3, textAlign: "right" },
  locationAddrRow: { flexDirection: "row", alignItems: "flex-start", marginBottom: 3 },
  locationAddrPin: { fontSize: 9, marginRight: 4, color: C.blue, marginTop: 1 },
  locationAddr: { fontSize: 9, color: C.muted, flex: 1 },
  locationAddrAr: { fontSize: 10, color: C.muted, flex: 1, fontFamily: "NotoNaskhArabic", textAlign: "right" },
  locationMapLink: { fontSize: 8, color: C.blue, marginBottom: 6 },
  locationBottom: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    marginTop: 8, paddingTop: 8,
    borderTopWidth: 1, borderTopColor: C.borderLight,
  },
  locationMeta: { flex: 1 },
  locationMetaLabel: { fontSize: 8, color: C.label, marginBottom: 2 },
  locationMetaLabelAr: { fontSize: 9, color: C.label, marginBottom: 2, fontFamily: "NotoNaskhArabic", textAlign: "right" },
  locationMetaValue: { fontSize: 10, fontFamily: "Helvetica-Bold", color: C.dark },
  locationMetaValueAr: { fontSize: 11, fontFamily: "NotoNaskhArabic", fontWeight: 700, color: C.dark, textAlign: "right" },
  locationCost: { fontSize: 12, fontFamily: "Helvetica-Bold", color: C.dark },
  locationCostAr: { fontSize: 13, fontFamily: "NotoNaskhArabic", fontWeight: 700, color: C.dark },

  // Amenities
  amenitiesRow: { flexDirection: "row", flexWrap: "wrap", marginTop: 7 },
  amenityChip: {
    borderRadius: 4, paddingTop: 2, paddingBottom: 2,
    paddingLeft: 6, paddingRight: 6,
    backgroundColor: C.bg, borderWidth: 1, borderColor: C.border,
    marginRight: 4, marginBottom: 4,
  },
  amenityText: { fontSize: 8, color: C.muted },

  // Two-column mini cards (transport + activities)
  twoCol: { flexDirection: "row", marginTop: 0 },
  miniCard: {
    flex: 1, borderWidth: 1, borderColor: C.border, borderRadius: 9,
    paddingTop: 12, paddingBottom: 12,
    paddingLeft: 13, paddingRight: 13,
    marginRight: 8,
  },
  miniCardLast: {
    flex: 1, borderWidth: 1, borderColor: C.border, borderRadius: 9,
    paddingTop: 12, paddingBottom: 12,
    paddingLeft: 13, paddingRight: 13,
  },
  miniLabel: { fontSize: 8, fontFamily: "Helvetica-Bold", color: C.label, marginBottom: 6 },
  miniLabelAr: { fontSize: 9, fontFamily: "NotoNaskhArabic", fontWeight: 700, color: C.label, marginBottom: 6, textAlign: "right" },
  miniName: { fontSize: 11, fontFamily: "Helvetica-Bold", color: C.dark, marginBottom: 3 },
  miniNameAr: { fontSize: 12, fontFamily: "NotoNaskhArabic", fontWeight: 700, color: C.dark, marginBottom: 3, textAlign: "right" },
  miniDesc: { fontSize: 8, color: C.muted, marginBottom: 8, lineHeight: 1.4 },
  miniDescAr: { fontSize: 9, color: C.muted, marginBottom: 8, lineHeight: 1.5, fontFamily: "NotoNaskhArabic", textAlign: "right" },
  miniCost: { fontSize: 12, fontFamily: "Helvetica-Bold", color: C.blue },
  miniCostAr: { fontSize: 13, fontFamily: "NotoNaskhArabic", fontWeight: 700, color: C.blue, textAlign: "right" },
  eventRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
  eventName: { fontSize: 8, color: C.mid, flex: 1 },
  eventNameAr: { fontSize: 9, color: C.mid, flex: 1, fontFamily: "NotoNaskhArabic", textAlign: "right" },
  eventPrice: { fontSize: 8, color: C.mid },
  eventPriceAr: { fontSize: 9, color: C.mid, fontFamily: "NotoNaskhArabic" },
  freeText: { fontSize: 8, color: C.green, fontFamily: "Helvetica-Bold" },
  freeTextAr: { fontSize: 9, color: C.green, fontFamily: "NotoNaskhArabic", fontWeight: 700 },

  // Price breakdown
  priceTable: {
    borderWidth: 1, borderColor: C.border, borderRadius: 9,
    marginTop: 4, overflow: "hidden",
  },
  priceRow: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start",
    paddingTop: 9, paddingBottom: 9,
    paddingLeft: 14, paddingRight: 14,
    borderBottomWidth: 1, borderBottomColor: C.borderLight,
  },
  priceRowLeft: { flex: 1, marginRight: 12 },
  priceName: { fontSize: 10, color: C.dark },
  priceNameAr: { fontSize: 11, color: C.dark, fontFamily: "NotoNaskhArabic" },
  priceSub: { fontSize: 8, color: C.label, marginTop: 2 },
  priceSubAr: { fontSize: 9, color: C.label, marginTop: 2, fontFamily: "NotoNaskhArabic", textAlign: "right" },
  priceAmt: { fontSize: 10, fontFamily: "Helvetica-Bold", color: C.dark },
  priceAmtAr: { fontSize: 11, fontFamily: "NotoNaskhArabic", fontWeight: 700, color: C.dark },
  totalBlock: {
    backgroundColor: C.blueFaint,
    paddingTop: 14, paddingBottom: 14,
    paddingLeft: 14, paddingRight: 14,
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
  },
  totalBlockLeft: {},
  totalBlockLabel: { fontSize: 11, fontFamily: "Helvetica-Bold", color: C.dark },
  totalBlockLabelAr: { fontSize: 12, fontFamily: "NotoNaskhArabic", fontWeight: 700, color: C.dark },
  totalBlockSub: { fontSize: 8, color: C.green, fontFamily: "Helvetica-Bold", marginTop: 3 },
  totalBlockSubAr: { fontSize: 9, color: C.green, fontFamily: "NotoNaskhArabic", fontWeight: 700, marginTop: 3, textAlign: "right" },
  totalSAR: { fontSize: 22, fontFamily: "Helvetica-Bold", color: C.blue, textAlign: "right" },
  totalSARAr: { fontSize: 22, fontFamily: "NotoNaskhArabic", fontWeight: 700, color: C.blue },
  totalUSD: { fontSize: 9, color: C.label, marginTop: 2, textAlign: "right" },
  totalUSDAr: { fontSize: 10, color: C.label, marginTop: 2, fontFamily: "NotoNaskhArabic", textAlign: "right" },

  // Booking details
  detailsGrid: {
    flexDirection: "row", flexWrap: "wrap",
    backgroundColor: C.bg, borderWidth: 1, borderColor: C.border,
    borderRadius: 9, marginTop: 6,
    paddingTop: 12, paddingBottom: 6,
    paddingLeft: 14, paddingRight: 14,
  },
  detailItem: { width: "50%", marginBottom: 8, paddingRight: 8 },
  detailKey: { fontSize: 8, color: C.label, marginBottom: 2 },
  detailKeyAr: { fontSize: 9, color: C.label, marginBottom: 2, fontFamily: "NotoNaskhArabic" },
  detailValue: { fontSize: 10, fontFamily: "Helvetica-Bold", color: C.dark },
  detailValueAr: { fontSize: 11, fontFamily: "NotoNaskhArabic", fontWeight: 700, color: C.dark },

  // Footer
  footer: {
    position: "absolute", bottom: 20, left: 36, right: 36,
    borderTopWidth: 1, borderTopColor: C.border, paddingTop: 8,
  },
  footerText: { fontSize: 8, color: C.label, textAlign: "center", lineHeight: 1.5 },
  footerTextAr: { fontSize: 9, color: C.label, textAlign: "center", lineHeight: 1.6, fontFamily: "NotoNaskhArabic" },
});

// ── Component ─────────────────────────────────────────────────────────────────
export function TripReceiptDoc({ data }: { data: PdfPlanData }) {
  const ar = data.locale === "ar";
  const L = ar ? LABEL.ar : LABEL.en;
  const fontFamily = ar ? "NotoNaskhArabic" : "Helvetica";
  const fontFamilyBold = ar ? "NotoNaskhArabic" : "Helvetica-Bold";

  const today = new Date().toLocaleDateString(ar ? "ar-SA" : "en-US", {
    year: "numeric", month: "long", day: "numeric",
  });
  const planRef = data.planId ? `WIS-${data.planId.slice(-8).toUpperCase()}` : "WIS-PREVIEW";
  const urgencyColor = C.urgency[data.urgency] ?? C.muted;
  const urgencyBg = C.urgencyBg[data.urgency] ?? C.bg;

  const hospName = ar && data.hospitalNameAr ? data.hospitalNameAr : data.hospitalName;
  const hospAddr = ar && data.hospitalAddress ? data.hospitalAddress : data.hospitalAddress;
  const hospPkg = ar && data.packageNameAr ? data.packageNameAr : data.packageName;
  const hotelName = ar && data.hotelNameAr ? data.hotelNameAr : data.hotelName;
  const hotelAddr = ar && data.hotelAddressAr ? data.hotelAddressAr : data.hotelAddress;
  const transName = ar && data.transportNameAr ? data.transportNameAr : data.transportName;
  const payLabel = data.paymentMethod
    ? (L.paymentLabels[data.paymentMethod] ?? data.paymentMethod)
    : "";

  const usdAmt = Math.round(data.totalCost / 3.75).toLocaleString();
  const hotelMapQuery = `${data.hotelName}, Al-Ahsa, Saudi Arabia`;
  const hospMapQuery = `${data.hospitalName}, Al-Ahsa, Saudi Arabia`;

  return (
    <Document title={L.receiptTitle} author="Wisal Medical Tourism">
      <Page
        size="A4"
        style={ar ? S.pageAr : S.page}
      >
        {/* ═══ HEADER ═══ */}
        <View style={S.header}>
          <View style={S.headerLeft}>
            <Text style={ar ? S.headerBrandAr : S.headerBrand}>{L.brand}</Text>
            <Text style={ar ? S.headerTitleAr : S.headerTitle}>{L.platform}</Text>
          </View>
          <View style={S.headerRight}>
            <Text style={ar ? S.headerRefAr : S.headerRef}>{planRef}</Text>
            <Text style={ar ? S.headerDateAr : S.headerDate}>{L.generated}: {today}</Text>
          </View>
        </View>

        {/* ═══ DESTINATION BANNER ═══ */}
        <View style={S.destBanner}>
          <View style={S.destDot} />
          <Text style={ar ? S.destTextAr : S.destText}>{L.destination}</Text>
        </View>

        {/* ═══ BODY ═══ */}
        <View style={S.body}>

          {/* ── Medical Assessment ── */}
          <View style={S.sectionRow}>
            <View style={S.sectionBar} />
            <Text style={ar ? S.sectionLabelAr : S.sectionLabel}>{L.medicalAssessment}</Text>
          </View>
          <View style={S.assessRow}>
            <View style={[S.chip, { backgroundColor: C.blueFaint }]}>
              <Text style={[ar ? S.chipTextAr : S.chipText, { color: C.blue }]}>
                {data.specialty}
              </Text>
            </View>
            <View style={[S.chip, { backgroundColor: urgencyBg }]}>
              <Text style={[ar ? S.chipTextAr : S.chipText, { color: urgencyColor }]}>
                {L.urgencyLabel(data.urgency)}
              </Text>
            </View>
          </View>
          {data.triageSummary ? (
            <View style={S.summaryBox}>
              <Text style={ar ? S.summaryTextAr : S.summaryText}>{data.triageSummary}</Text>
            </View>
          ) : null}

          {/* ── Hospital Location Card ── */}
          <View style={S.sectionRow}>
            <View style={S.sectionBar} />
            <Text style={ar ? S.sectionLabelAr : S.sectionLabel}>{L.hospital}</Text>
          </View>
          <View style={S.locationCard} wrap={false}>
            {data.hospitalMapUrl ? (
              <Image src={data.hospitalMapUrl} style={S.mapImage} />
            ) : (
              <View style={S.mapPlaceholder}>
                <Text style={{ fontSize: 8, color: C.blue, fontFamily: fontFamily }}>
                  {hospAddr ?? `${data.hospitalName}, Al-Ahsa`}
                </Text>
              </View>
            )}
            <View style={S.locationBody}>
              <Text style={ar ? S.locationNameAr : S.locationName}>{hospName}</Text>
              {hospAddr ? (
                <View style={S.locationAddrRow}>
                  <Text style={S.locationAddrPin}>◉</Text>
                  <Text style={ar ? S.locationAddrAr : S.locationAddr}>{hospAddr}</Text>
                </View>
              ) : null}
              <Text style={S.locationMapLink}>
                {mapsUrl(hospMapQuery)}
              </Text>
              <View style={S.locationBottom}>
                <View style={S.locationMeta}>
                  <Text style={ar ? S.locationMetaLabelAr : S.locationMetaLabel}>
                    {hospPkg ? L.package : ""}
                  </Text>
                  <Text style={ar ? S.locationMetaValueAr : S.locationMetaValue}>
                    {hospPkg ?? L.consultation}
                  </Text>
                </View>
                <Text style={ar ? S.locationCostAr : S.locationCost}>
                  {data.hospitalCost.toLocaleString()} SAR
                </Text>
              </View>
            </View>
          </View>

          {/* ── Hotel Location Card ── */}
          <View style={[S.sectionRow, { marginTop: 14 }]}>
            <View style={S.sectionBar} />
            <Text style={ar ? S.sectionLabelAr : S.sectionLabel}>{L.accommodation}</Text>
          </View>
          <View style={S.locationCard} wrap={false}>
            {data.hotelMapUrl ? (
              <Image src={data.hotelMapUrl} style={S.mapImage} />
            ) : (
              <View style={S.mapPlaceholder}>
                <Text style={{ fontSize: 8, color: C.blue, fontFamily: fontFamily }}>
                  {hotelAddr ?? `${data.hotelName}, Al-Ahsa`}
                </Text>
              </View>
            )}
            <View style={S.locationBody}>
              <Text style={ar ? S.locationNameAr : S.locationName}>
                {hotelName}{"  "}{starText(data.hotelStars)}
              </Text>
              {hotelAddr ? (
                <View style={S.locationAddrRow}>
                  <Text style={S.locationAddrPin}>◉</Text>
                  <Text style={ar ? S.locationAddrAr : S.locationAddr}>{hotelAddr}</Text>
                </View>
              ) : null}
              {data.hotelDistanceKm ? (
                <Text style={{ fontSize: 8, color: C.muted, marginBottom: 3, fontFamily }}>
                  {L.distanceFrom(data.hotelDistanceKm)}
                </Text>
              ) : null}
              <Text style={S.locationMapLink}>
                {mapsUrl(hotelMapQuery)}
              </Text>
              {(data.hotelAmenities?.length ?? 0) > 0 ? (
                <View style={S.amenitiesRow}>
                  {data.hotelAmenities!.slice(0, 6).map((a, i) => (
                    <View key={`${i}-${a}`} style={S.amenityChip}>
                      <Text style={S.amenityText}>{a}</Text>
                    </View>
                  ))}
                </View>
              ) : null}
              <View style={S.locationBottom}>
                <View style={S.locationMeta}>
                  <Text style={ar ? S.locationMetaLabelAr : S.locationMetaLabel}>
                    {L.nightsXprice(data.nights, data.pricePerNight)}
                  </Text>
                </View>
                <Text style={ar ? S.locationCostAr : S.locationCost}>
                  {data.hotelCost.toLocaleString()} SAR
                </Text>
              </View>
            </View>
          </View>

          {/* ── Transport + Activities (two columns) ── */}
          <View style={[S.sectionRow, { marginTop: 14 }]}>
            <View style={S.sectionBar} />
            <Text style={ar ? S.sectionLabelAr : S.sectionLabel}>
              {L.transport} & {L.activities}
            </Text>
          </View>
          <View style={S.twoCol}>
            {/* Transport */}
            <View style={S.miniCard}>
              <Text style={ar ? S.miniLabelAr : S.miniLabel}>{L.transport}</Text>
              <Text style={ar ? S.miniNameAr : S.miniName}>{transName}</Text>
              <Text style={ar ? S.miniDescAr : S.miniDesc}>{L.airportTrips}</Text>
              <Text style={ar ? S.miniCostAr : S.miniCost}>
                {data.transportCost.toLocaleString()} SAR
              </Text>
            </View>

            {/* Activities */}
            <View style={S.miniCardLast}>
              <Text style={ar ? S.miniLabelAr : S.miniLabel}>
                {data.events.length > 0
                  ? L.activitiesCount(data.events.length)
                  : L.activities}
              </Text>
              {data.events.length > 0 ? (
                <>
                  {data.events.slice(0, 4).map((e, i) => (
                    <View key={`${i}-${e.name}`} style={S.eventRow}>
                      <Text style={ar ? S.eventNameAr : S.eventName}>
                        {ar && e.nameAr ? e.nameAr : e.name}
                      </Text>
                      {e.price === 0
                        ? <Text style={ar ? S.freeTextAr : S.freeText}>{L.free}</Text>
                        : <Text style={ar ? S.eventPriceAr : S.eventPrice}>
                            {e.price.toLocaleString()} SAR
                          </Text>
                      }
                    </View>
                  ))}
                  {data.events.length > 4 ? (
                    <Text style={{ fontSize: 8, color: C.label, fontFamily }}>
                      +{data.events.length - 4} more
                    </Text>
                  ) : null}
                  <View style={{ borderTopWidth: 1, borderTopColor: C.borderLight, marginTop: 4, paddingTop: 4 }}>
                    <Text style={ar ? S.miniCostAr : S.miniCost}>
                      {data.eventsCost === 0
                        ? L.free
                        : `${data.eventsCost.toLocaleString()} SAR`}
                    </Text>
                  </View>
                </>
              ) : (
                <Text style={{ fontSize: 9, color: C.label, fontFamily }}>—</Text>
              )}
            </View>
          </View>

          {/* ── Price Breakdown ── */}
          <View style={[S.sectionRow, { marginTop: 14 }]}>
            <View style={S.sectionBar} />
            <Text style={ar ? S.sectionLabelAr : S.sectionLabel}>{L.priceBreakdown}</Text>
          </View>
          <View style={S.priceTable}>

            <View style={S.priceRow}>
              <View style={S.priceRowLeft}>
                <Text style={ar ? S.priceNameAr : S.priceName}>{hospName}</Text>
                <Text style={ar ? S.priceSubAr : S.priceSub}>
                  {hospPkg ?? L.consultation}
                </Text>
              </View>
              <Text style={ar ? S.priceAmtAr : S.priceAmt}>
                {data.hospitalCost.toLocaleString()} SAR
              </Text>
            </View>

            <View style={S.priceRow}>
              <View style={S.priceRowLeft}>
                <Text style={ar ? S.priceNameAr : S.priceName}>{hotelName}</Text>
                <Text style={ar ? S.priceSubAr : S.priceSub}>
                  {L.nightsXprice(data.nights, data.pricePerNight)}
                </Text>
              </View>
              <Text style={ar ? S.priceAmtAr : S.priceAmt}>
                {data.hotelCost.toLocaleString()} SAR
              </Text>
            </View>

            <View style={S.priceRow}>
              <View style={S.priceRowLeft}>
                <Text style={ar ? S.priceNameAr : S.priceName}>{transName}</Text>
              </View>
              <Text style={ar ? S.priceAmtAr : S.priceAmt}>
                {data.transportCost.toLocaleString()} SAR
              </Text>
            </View>

            {data.events.length > 0 ? (
              <View style={S.priceRow}>
                <View style={S.priceRowLeft}>
                  <Text style={ar ? S.priceNameAr : S.priceName}>
                    {L.activitiesCount(data.events.length)}
                  </Text>
                </View>
                {data.eventsCost === 0
                  ? <Text style={[ar ? S.priceAmtAr : S.priceAmt, { color: C.green }]}>{L.free}</Text>
                  : <Text style={ar ? S.priceAmtAr : S.priceAmt}>
                      {data.eventsCost.toLocaleString()} SAR
                    </Text>
                }
              </View>
            ) : null}

            <View style={S.priceRow}>
              <View style={S.priceRowLeft}>
                <Text style={ar ? S.priceNameAr : S.priceName}>{L.wisalFee}</Text>
                <Text style={ar ? S.priceSubAr : S.priceSub}>{L.wisalFeeDesc}</Text>
              </View>
              <Text style={ar ? S.priceAmtAr : S.priceAmt}>
                {data.serviceFee.toLocaleString()} SAR
              </Text>
            </View>

            <View style={S.totalBlock}>
              <View style={S.totalBlockLeft}>
                <Text style={ar ? S.totalBlockLabelAr : S.totalBlockLabel}>{L.totalLabel}</Text>
                <Text style={ar ? S.totalBlockSubAr : S.totalBlockSub}>{L.savingsTag}</Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={ar ? S.totalSARAr : S.totalSAR}>
                  {data.totalCost.toLocaleString()} SAR
                </Text>
                <Text style={ar ? S.totalUSDAr : S.totalUSD}>{L.usd(usdAmt)}</Text>
              </View>
            </View>
          </View>

          {/* ── Booking Details ── */}
          {(data.contactName || data.travelDate || data.paymentMethod || data.nationality) ? (
            <>
              <View style={[S.sectionRow, { marginTop: 14 }]}>
                <View style={S.sectionBar} />
                <Text style={ar ? S.sectionLabelAr : S.sectionLabel}>{L.bookingDetails}</Text>
              </View>
              <View style={S.detailsGrid}>
                {data.contactName ? (
                  <View style={S.detailItem}>
                    <Text style={ar ? S.detailKeyAr : S.detailKey}>{L.patientName}</Text>
                    <Text style={ar ? S.detailValueAr : S.detailValue}>{data.contactName}</Text>
                  </View>
                ) : null}
                {data.travelDate ? (
                  <View style={S.detailItem}>
                    <Text style={ar ? S.detailKeyAr : S.detailKey}>{L.travelDate}</Text>
                    <Text style={ar ? S.detailValueAr : S.detailValue}>
                      {fmtDate(data.travelDate, ar)}
                    </Text>
                  </View>
                ) : null}
                {data.paymentMethod ? (
                  <View style={S.detailItem}>
                    <Text style={ar ? S.detailKeyAr : S.detailKey}>{L.paymentMethod}</Text>
                    <Text style={ar ? S.detailValueAr : S.detailValue}>{payLabel}</Text>
                  </View>
                ) : null}
                {data.nationality ? (
                  <View style={S.detailItem}>
                    <Text style={ar ? S.detailKeyAr : S.detailKey}>{L.nationality}</Text>
                    <Text style={ar ? S.detailValueAr : S.detailValue}>{data.nationality}</Text>
                  </View>
                ) : null}
              </View>
            </>
          ) : null}

        </View>

        {/* ═══ FOOTER (fixed) ═══ */}
        <View style={S.footer} fixed>
          <Text style={ar ? S.footerTextAr : S.footerText}>{L.footerNote}</Text>
          <Text style={ar ? S.footerTextAr : S.footerText}>{L.footerBrand}</Text>
        </View>

      </Page>
    </Document>
  );
}
