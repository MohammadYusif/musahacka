import type { Hotel } from "@/data/hotels";
import type { TransportOption } from "@/data/car-rentals";
import type { LocalEvent } from "@/data/events";
import type { Hospital, TreatmentPackage, TriageResult } from "@/components/journey/journey-types";

export interface PrintReceiptInput {
  triage: TriageResult;
  hospital: Hospital;
  pkg: TreatmentPackage | null;
  hotel: Hotel;
  nights: number;
  transport: TransportOption;
  events: LocalEvent[];
  hospitalCost: number;
  hotelCost: number;
  transportCost: number;
  eventsCost: number;
  serviceFee: number;
  total: number;
  locale: "en" | "ar";
  contact?: {
    name?: string;
    nationality?: string;
    travelDate?: string;
    phone?: string;
    paymentMethod?: string | null;
  };
}

const L = {
  en: {
    brand: "WISAL",
    platform: "Medical Tourism Platform",
    destination: "Destination: Al-Ahsa, Saudi Arabia",
    receiptTitle: "Medical Journey Receipt",
    generated: "Generated",
    planRef: "Plan Reference",
    medicalAssessment: "Medical Assessment",
    hospital: "Hospital",
    accommodation: "Accommodation",
    transport: "Transport",
    activities: "Activities",
    priceBreakdown: "Price Breakdown",
    bookingDetails: "Booking Details",
    consultation: "Initial consultation",
    package: "Package",
    nightsX: (n: number, p: number) => `${n} nights × ${p.toLocaleString()} SAR / night`,
    days: (n: number) => `${n} days`,
    estTrips: (n: number) => `Est. ${n} trips (airport & hospital)`,
    distanceFrom: (km: number) => `${km} km from city centre`,
    starsLabel: "Rating",
    amenities: "Amenities",
    wisalFee: "Wisal Coordination Fee",
    wisalFeeDesc: "Airport pickup, scheduling & 24/7 support",
    totalLabel: "Total Estimated Cost",
    savingsTag: "Save 40–60% vs. home country",
    usd: (a: string) => `≈ $${a} USD`,
    patientName: "Patient Name",
    travelDate: "Travel Date",
    paymentMethod: "Payment",
    nationality: "Nationality",
    phone: "WhatsApp",
    free: "Free",
    viewOnMaps: "View on Google Maps",
    address: "Address",
    activitiesCount: (n: number) => `${n} ${n === 1 ? "Activity" : "Activities"}`,
    payments: {
      pay_on_arrival: "Pay on Arrival",
      bank_transfer: "Bank Transfer",
      online: "Online Payment",
    } as Record<string, string>,
    urgencyLabel: (u: string) =>
      u === "low" ? "Low Urgency" :
      u === "moderate" ? "Moderate Urgency" :
      u === "high" ? "High Urgency" : "Emergency",
    footerNote: "All prices are estimates subject to final confirmation at booking.",
    footerBrand: "Wisal Medical Tourism · Al-Ahsa, Saudi Arabia · wisal.io",
    printHint: "Use your browser's print dialog and choose 'Save as PDF' to download.",
  },
  ar: {
    brand: "وصال",
    platform: "منصة السياحة العلاجية",
    destination: "الوجهة: الأحساء، المملكة العربية السعودية",
    receiptTitle: "إيصال الرحلة الطبية",
    generated: "تاريخ الإصدار",
    planRef: "رقم المرجع",
    medicalAssessment: "التقييم الطبي",
    hospital: "المستشفى",
    accommodation: "الإقامة",
    transport: "التنقل",
    activities: "الأنشطة",
    priceBreakdown: "تفاصيل التكلفة",
    bookingDetails: "تفاصيل الحجز",
    consultation: "استشارة أولية",
    package: "الباقة",
    nightsX: (n: number, p: number) => `${n} ليالٍ × ${p.toLocaleString()} ريال / ليلة`,
    days: (n: number) => `${n} يوم`,
    estTrips: (n: number) => `تقريباً ${n} رحلة (مطار ومستشفى)`,
    distanceFrom: (km: number) => `${km} كم من مركز المدينة`,
    starsLabel: "التصنيف",
    amenities: "المرافق",
    wisalFee: "رسوم تنسيق وصال",
    wisalFeeDesc: "استقبال من المطار، جدولة، دعم على مدار الساعة",
    totalLabel: "التكلفة الإجمالية التقديرية",
    savingsTag: "وفّر 40–60٪ مقارنة ببلدك",
    usd: (a: string) => `≈ ${a} دولار أمريكي`,
    patientName: "اسم المريض",
    travelDate: "تاريخ السفر",
    paymentMethod: "طريقة الدفع",
    nationality: "الجنسية",
    phone: "واتساب",
    free: "مجاني",
    viewOnMaps: "عرض على خرائط جوجل",
    address: "العنوان",
    activitiesCount: (n: number) => `${n} ${n === 1 ? "نشاط" : "أنشطة"}`,
    payments: {
      pay_on_arrival: "الدفع عند الوصول",
      bank_transfer: "تحويل بنكي",
      online: "الدفع الإلكتروني",
    } as Record<string, string>,
    urgencyLabel: (u: string) =>
      u === "low" ? "أولوية منخفضة" :
      u === "moderate" ? "أولوية متوسطة" :
      u === "high" ? "أولوية مرتفعة" : "حالة طارئة",
    footerNote: "جميع الأسعار تقديرية وتخضع للتأكيد النهائي عند الحجز.",
    footerBrand: "وصال للسياحة العلاجية · الأحساء، المملكة العربية السعودية · wisal.io",
    printHint: "استخدم مربع الطباعة في المتصفح واختر 'حفظ بصيغة PDF' للتنزيل.",
  },
};

const URGENCY_COLORS: Record<string, { fg: string; bg: string }> = {
  low: { fg: "#16a34a", bg: "#f0fdf4" },
  moderate: { fg: "#d97706", bg: "#fffbeb" },
  high: { fg: "#f97316", bg: "#fff7ed" },
  emergency: { fg: "#dc2626", bg: "#fef2f2" },
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function mapsUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function makeRefId(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `WIS-${ts}-${rand}`;
}

export function buildReceiptHtml(input: PrintReceiptInput): string {
  const {
    triage, hospital, pkg, hotel, nights, transport, events,
    hospitalCost, hotelCost, transportCost, eventsCost, serviceFee, total,
    locale, contact,
  } = input;

  const ar = locale === "ar";
  const t = ar ? L.ar : L.en;
  const dir = ar ? "rtl" : "ltr";
  const lang = ar ? "ar" : "en";

  const today = new Date().toLocaleDateString(ar ? "ar-SA" : "en-US", {
    year: "numeric", month: "long", day: "numeric",
  });
  const refId = makeRefId();

  const hospitalName = ar && hospital.nameAr ? hospital.nameAr : hospital.name;
  const hospitalAddr = `${hospital.name}, Al-Ahsa, Saudi Arabia`;
  const packageLabel = pkg
    ? (ar && pkg.nameAr ? pkg.nameAr : pkg.name)
    : t.consultation;

  const hotelName = ar ? hotel.nameAr : hotel.name;
  const hotelAddr = ar ? hotel.addressAr : hotel.address;
  const transportName = ar ? transport.nameAr : transport.name;

  const urgency = URGENCY_COLORS[triage.urgency] ?? URGENCY_COLORS.low;
  const usdAmt = Math.round(total / 3.75).toLocaleString();

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString(ar ? "ar-SA" : "en-US", {
        year: "numeric", month: "long", day: "numeric",
      });
    } catch { return iso; }
  };

  const eventsRows = events.length > 0
    ? events.map((e) => `
        <div class="event-row">
          <span>${escapeHtml(ar && e.nameAr ? e.nameAr : e.name)}</span>
          <span class="event-price">${e.price === 0 ? `<em class="free">${t.free}</em>` : `${e.price.toLocaleString()} SAR`}</span>
        </div>`).join("")
    : "";

  const amenitiesHtml = (hotel.amenities ?? [])
    .slice(0, 8)
    .map((a) => `<span class="chip">${escapeHtml(a)}</span>`).join("");

  const hasBooking = !!(contact?.name || contact?.travelDate || contact?.paymentMethod || contact?.nationality);
  const bookingHtml = hasBooking ? `
    <section class="block">
      <h2 class="section-title">${t.bookingDetails}</h2>
      <div class="details-grid">
        ${contact?.name ? `<div class="detail"><span class="k">${t.patientName}</span><span class="v">${escapeHtml(contact.name)}</span></div>` : ""}
        ${contact?.nationality ? `<div class="detail"><span class="k">${t.nationality}</span><span class="v">${escapeHtml(contact.nationality)}</span></div>` : ""}
        ${contact?.phone ? `<div class="detail"><span class="k">${t.phone}</span><span class="v">${escapeHtml(contact.phone)}</span></div>` : ""}
        ${contact?.travelDate ? `<div class="detail"><span class="k">${t.travelDate}</span><span class="v">${escapeHtml(formatDate(contact.travelDate))}</span></div>` : ""}
        ${contact?.paymentMethod ? `<div class="detail"><span class="k">${t.paymentMethod}</span><span class="v">${escapeHtml(t.payments[contact.paymentMethod] ?? contact.paymentMethod)}</span></div>` : ""}
      </div>
    </section>` : "";

  return `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}">
<head>
<meta charset="utf-8" />
<title>${escapeHtml(t.receiptTitle)} · ${refId}</title>
<style>
  @page { size: A4; margin: 14mm 14mm 14mm 14mm; }

  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body {
    font-family: ${ar ? "'Noto Naskh Arabic', 'Tahoma', system-ui, -apple-system, sans-serif" : "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"};
    color: #0f172a;
    background: #fff;
    font-size: 11pt;
    line-height: 1.5;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .toolbar {
    position: sticky; top: 0; z-index: 10;
    background: #0f2444; color: #fff;
    padding: 12px 18px;
    display: flex; align-items: center; justify-content: space-between;
    gap: 12px;
  }
  .toolbar p { margin: 0; font-size: 9pt; opacity: 0.85; }
  .toolbar button {
    background: #2563eb; color: #fff; border: 0;
    padding: 8px 18px; border-radius: 6px;
    font-size: 10pt; font-weight: 600; cursor: pointer;
  }
  .toolbar button:hover { background: #1d4ed8; }

  .page { max-width: 800px; margin: 0 auto; padding: 0; }
  .receipt { padding: 24px 28px 40px; }

  /* Header */
  .header {
    background: linear-gradient(135deg, #0f2444 0%, #1e3a5f 100%);
    color: #fff;
    padding: 22px 28px;
    display: flex; justify-content: space-between; align-items: flex-end;
    border-radius: 0;
  }
  .brand { font-size: 26pt; font-weight: 800; letter-spacing: 0.5px; }
  .platform { font-size: 9pt; opacity: 0.75; margin-top: 2px; }
  .ref-block { text-align: ${ar ? "left" : "right"}; }
  .ref-id { font-size: 10pt; font-weight: 700; opacity: 0.95; }
  .ref-date { font-size: 8pt; opacity: 0.6; margin-top: 2px; }

  .destination-banner {
    background: #dbeafe; color: #1d4ed8;
    padding: 8px 28px; font-size: 10pt; font-weight: 600;
    display: flex; align-items: center; gap: 8px;
  }
  .destination-banner .dot { width: 7px; height: 7px; border-radius: 50%; background: #1d4ed8; }

  /* Sections */
  .section-title {
    font-size: 9pt; text-transform: uppercase; letter-spacing: 1.1px;
    color: #64748b; font-weight: 700; margin: 22px 0 10px;
    padding-${ar ? "right" : "left"}: 10px;
    border-${ar ? "right" : "left"}: 3px solid #2563eb;
  }
  .block { page-break-inside: avoid; break-inside: avoid; }

  /* Triage */
  .triage-row { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 8px; }
  .pill {
    border-radius: 6px;
    padding: 5px 12px;
    font-size: 9pt; font-weight: 700;
  }
  .summary-box {
    background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;
    padding: 12px 14px; font-size: 10pt; color: #475569; line-height: 1.6;
    margin-top: 8px;
  }

  /* Location card */
  .location-card {
    border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;
    background: #fff; margin-top: 4px;
    page-break-inside: avoid; break-inside: avoid;
  }
  .map-bar {
    height: 90px;
    background:
      linear-gradient(135deg, rgba(37,99,235,0.08), rgba(37,99,235,0.18)),
      repeating-linear-gradient(0deg, transparent 0 22px, rgba(37,99,235,0.07) 22px 23px),
      repeating-linear-gradient(90deg, transparent 0 22px, rgba(37,99,235,0.07) 22px 23px),
      #eff6ff;
    position: relative;
    display: flex; align-items: center; justify-content: center;
  }
  .map-bar::before, .map-bar::after {
    content: ""; position: absolute;
    background: rgba(37,99,235,0.5);
  }
  .map-bar::before {
    top: 50%; left: 0; right: 0; height: 1.5px;
    transform: rotate(-3deg);
  }
  .map-bar::after {
    top: 0; bottom: 0; left: 35%; width: 1.5px;
    transform: rotate(8deg);
  }
  .map-pin {
    position: relative; z-index: 1;
    width: 28px; height: 28px; border-radius: 50% 50% 50% 0;
    background: #dc2626;
    transform: rotate(-45deg);
    box-shadow: 0 4px 10px rgba(220,38,38,0.45);
    display: flex; align-items: center; justify-content: center;
  }
  .map-pin::after {
    content: ""; width: 9px; height: 9px;
    background: #fff; border-radius: 50%;
    transform: rotate(45deg);
  }

  .location-body { padding: 14px 16px; }
  .location-name { font-size: 13pt; font-weight: 700; color: #0f172a; margin-bottom: 4px; }
  .location-meta { font-size: 9pt; color: #64748b; margin-bottom: 6px; }
  .location-addr {
    font-size: 9.5pt; color: #475569;
    display: flex; align-items: flex-start; gap: 6px;
    margin-bottom: 6px;
  }
  .location-addr .marker { color: #2563eb; font-weight: 700; }
  .location-link {
    display: inline-block;
    font-size: 8.5pt; color: #2563eb;
    text-decoration: none; word-break: break-all;
    border-bottom: 1px dashed #93c5fd;
    padding-bottom: 1px;
  }

  .footer-row {
    display: flex; justify-content: space-between; align-items: center;
    margin-top: 10px; padding-top: 10px;
    border-top: 1px solid #f1f5f9;
  }
  .footer-row .meta-label { font-size: 8pt; color: #94a3b8; }
  .footer-row .meta-value { font-size: 10pt; font-weight: 700; color: #0f172a; }
  .footer-row .price { font-size: 12pt; font-weight: 700; color: #0f172a; }

  /* Amenities */
  .chips { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 8px; }
  .chip {
    font-size: 8.5pt; padding: 3px 8px; border-radius: 4px;
    background: #f8fafc; border: 1px solid #e2e8f0; color: #64748b;
  }

  /* Two columns */
  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .mini-card {
    border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px;
    page-break-inside: avoid; break-inside: avoid;
  }
  .mini-label { font-size: 8pt; text-transform: uppercase; letter-spacing: 0.8px; color: #94a3b8; font-weight: 700; margin-bottom: 6px; }
  .mini-name { font-size: 11pt; font-weight: 700; color: #0f172a; margin-bottom: 4px; }
  .mini-desc { font-size: 9pt; color: #64748b; margin-bottom: 10px; }
  .mini-cost { font-size: 12pt; font-weight: 700; color: #2563eb; }

  .event-row {
    display: flex; justify-content: space-between;
    font-size: 9pt; color: #475569; padding: 3px 0;
  }
  .event-row .event-price { font-weight: 600; }
  .free { font-style: normal; color: #16a34a; font-weight: 700; }

  /* Price table */
  .price-table {
    border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;
    margin-top: 4px;
  }
  .price-row {
    display: flex; justify-content: space-between; align-items: flex-start;
    padding: 11px 16px;
    border-bottom: 1px solid #f1f5f9;
  }
  .price-row:last-of-type { border-bottom: 0; }
  .price-name { font-size: 10pt; color: #0f172a; }
  .price-sub { font-size: 8.5pt; color: #94a3b8; margin-top: 2px; }
  .price-amt { font-size: 10pt; font-weight: 700; color: #0f172a; white-space: nowrap; }

  .total-block {
    background: #eff6ff;
    padding: 16px 18px;
    display: flex; justify-content: space-between; align-items: center;
  }
  .total-label { font-size: 11pt; font-weight: 700; color: #0f172a; }
  .total-savings { font-size: 8pt; font-weight: 700; color: #16a34a; margin-top: 4px; }
  .total-sar { font-size: 22pt; font-weight: 800; color: #1d4ed8; line-height: 1; }
  .total-usd { font-size: 9pt; color: #94a3b8; margin-top: 4px; text-align: ${ar ? "left" : "right"}; }

  /* Booking grid */
  .details-grid {
    background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px;
    padding: 14px 18px;
    display: grid; grid-template-columns: 1fr 1fr; gap: 12px 18px;
  }
  .detail { display: flex; flex-direction: column; gap: 2px; }
  .detail .k { font-size: 8pt; color: #94a3b8; }
  .detail .v { font-size: 10.5pt; font-weight: 700; color: #0f172a; }

  /* Footer */
  .doc-footer {
    margin-top: 30px; padding-top: 14px;
    border-top: 1px solid #e2e8f0;
    text-align: center;
    color: #94a3b8; font-size: 8.5pt;
    line-height: 1.6;
  }

  @media print {
    .toolbar { display: none; }
    body { font-size: 10.5pt; }
    .page { max-width: none; }
    .header { border-radius: 0; }
    a { color: #2563eb; }
    .location-link { color: #2563eb; }
  }
</style>
</head>
<body>

<div class="toolbar">
  <p>${escapeHtml(t.printHint)}</p>
  <button onclick="window.print()">⬇ ${ar ? "تنزيل PDF" : "Download PDF"}</button>
</div>

<div class="page">

  <!-- HEADER -->
  <div class="header">
    <div>
      <div class="brand">${escapeHtml(t.brand)}</div>
      <div class="platform">${escapeHtml(t.platform)}</div>
    </div>
    <div class="ref-block">
      <div class="ref-id">${refId}</div>
      <div class="ref-date">${escapeHtml(t.generated)}: ${today}</div>
    </div>
  </div>

  <div class="destination-banner">
    <span class="dot"></span>
    <span>${escapeHtml(t.destination)}</span>
  </div>

  <div class="receipt">

    <!-- Medical Assessment -->
    <section class="block">
      <h2 class="section-title">${t.medicalAssessment}</h2>
      <div class="triage-row">
        <span class="pill" style="background:#eff6ff;color:#1d4ed8;">${escapeHtml(triage.recommendedSpecialty)}</span>
        <span class="pill" style="background:${urgency.bg};color:${urgency.fg};">${escapeHtml(t.urgencyLabel(triage.urgency))}</span>
      </div>
      ${triage.summary ? `<div class="summary-box">${escapeHtml(triage.summary)}</div>` : ""}
    </section>

    <!-- Hospital Location -->
    <section class="block">
      <h2 class="section-title">${t.hospital}</h2>
      <div class="location-card">
        <div class="map-bar"><div class="map-pin"></div></div>
        <div class="location-body">
          <div class="location-name">${escapeHtml(hospitalName)}</div>
          <div class="location-addr">
            <span class="marker">◉</span>
            <span>${escapeHtml(hospitalAddr)}</span>
          </div>
          <a class="location-link" href="${mapsUrl(hospitalAddr)}" target="_blank">
            ${escapeHtml(t.viewOnMaps)} ${ar ? "←" : "→"}
          </a>
          <div class="footer-row">
            <div>
              <div class="meta-label">${t.package}</div>
              <div class="meta-value">${escapeHtml(packageLabel)}</div>
            </div>
            <div class="price">${hospitalCost.toLocaleString()} SAR</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Hotel Location -->
    <section class="block">
      <h2 class="section-title">${t.accommodation}</h2>
      <div class="location-card">
        <div class="map-bar"><div class="map-pin"></div></div>
        <div class="location-body">
          <div class="location-name">${escapeHtml(hotelName)} <span style="color:#d97706;font-size:10pt;">${"★".repeat(hotel.stars)}</span></div>
          <div class="location-meta">${escapeHtml(t.distanceFrom(hotel.distanceKm))}</div>
          <div class="location-addr">
            <span class="marker">◉</span>
            <span>${escapeHtml(hotelAddr)}</span>
          </div>
          <a class="location-link" href="${mapsUrl(`${hotel.name}, Al-Ahsa, Saudi Arabia`)}" target="_blank">
            ${escapeHtml(t.viewOnMaps)} ${ar ? "←" : "→"}
          </a>
          ${amenitiesHtml ? `<div class="chips">${amenitiesHtml}</div>` : ""}
          <div class="footer-row">
            <div>
              <div class="meta-label">${escapeHtml(t.nightsX(nights, hotel.pricePerNight))}</div>
            </div>
            <div class="price">${hotelCost.toLocaleString()} SAR</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Transport + Activities -->
    <section class="block">
      <h2 class="section-title">${t.transport} &amp; ${t.activities}</h2>
      <div class="two-col">
        <div class="mini-card">
          <div class="mini-label">${t.transport}</div>
          <div class="mini-name">${escapeHtml(transportName)}</div>
          <div class="mini-desc">${escapeHtml(transport.type === "rideshare" ? t.estTrips(nights * 4) : t.days(nights))}</div>
          <div class="mini-cost">${transportCost.toLocaleString()} SAR</div>
        </div>
        <div class="mini-card">
          <div class="mini-label">${events.length > 0 ? t.activitiesCount(events.length) : t.activities}</div>
          ${events.length > 0 ? eventsRows : `<div class="mini-desc">—</div>`}
          ${events.length > 0 ? `<div class="mini-cost" style="margin-top:8px;border-top:1px solid #f1f5f9;padding-top:6px;">${eventsCost === 0 ? t.free : `${eventsCost.toLocaleString()} SAR`}</div>` : ""}
        </div>
      </div>
    </section>

    <!-- Price breakdown -->
    <section class="block">
      <h2 class="section-title">${t.priceBreakdown}</h2>
      <div class="price-table">
        <div class="price-row">
          <div>
            <div class="price-name">${escapeHtml(hospitalName)}</div>
            <div class="price-sub">${escapeHtml(packageLabel)}</div>
          </div>
          <div class="price-amt">${hospitalCost.toLocaleString()} SAR</div>
        </div>
        <div class="price-row">
          <div>
            <div class="price-name">${escapeHtml(hotelName)}</div>
            <div class="price-sub">${escapeHtml(t.nightsX(nights, hotel.pricePerNight))}</div>
          </div>
          <div class="price-amt">${hotelCost.toLocaleString()} SAR</div>
        </div>
        <div class="price-row">
          <div>
            <div class="price-name">${escapeHtml(transportName)}</div>
          </div>
          <div class="price-amt">${transportCost.toLocaleString()} SAR</div>
        </div>
        ${events.length > 0 ? `
          <div class="price-row">
            <div>
              <div class="price-name">${t.activitiesCount(events.length)}</div>
            </div>
            <div class="price-amt">${eventsCost === 0 ? `<em class="free">${t.free}</em>` : `${eventsCost.toLocaleString()} SAR`}</div>
          </div>` : ""}
        <div class="price-row">
          <div>
            <div class="price-name">${t.wisalFee}</div>
            <div class="price-sub">${t.wisalFeeDesc}</div>
          </div>
          <div class="price-amt">${serviceFee.toLocaleString()} SAR</div>
        </div>
        <div class="total-block">
          <div>
            <div class="total-label">${t.totalLabel}</div>
            <div class="total-savings">${t.savingsTag}</div>
          </div>
          <div style="text-align:${ar ? "left" : "right"};">
            <div class="total-sar">${total.toLocaleString()} SAR</div>
            <div class="total-usd">${t.usd(usdAmt)}</div>
          </div>
        </div>
      </div>
    </section>

    ${bookingHtml}

    <div class="doc-footer">
      <div>${escapeHtml(t.footerNote)}</div>
      <div>${escapeHtml(t.footerBrand)}</div>
    </div>

  </div>

</div>

<script>
  // Auto-trigger print dialog once content has rendered.
  window.addEventListener("load", function () {
    setTimeout(function () { window.print(); }, 350);
  });
</script>

</body>
</html>`;
}

export function openPrintReceipt(input: PrintReceiptInput): void {
  const html = buildReceiptHtml(input);
  const w = window.open("", "_blank", "width=900,height=1100");
  if (!w) return;
  w.document.open();
  w.document.write(html);
  w.document.close();
}
