import { NextRequest } from "next/server";
import React from "react";
import { renderToBuffer } from "@react-pdf/renderer";
import type { DocumentProps } from "@react-pdf/renderer";
import { TripReceiptDoc } from "@/lib/pdf/trip-receipt-doc";
import type { PdfPlanData } from "@/lib/pdf/trip-receipt-doc";

function staticMapUrl(query: string): string | null {
  const key = process.env.GOOGLE_MAPS_API_KEY;
  if (!key) return null;
  const q = encodeURIComponent(`${query}, Al-Ahsa, Saudi Arabia`);
  return (
    `https://maps.googleapis.com/maps/api/staticmap` +
    `?center=${q}&zoom=14&size=480x160&scale=2&maptype=roadmap` +
    `&markers=color:0x1d4ed8%7C${q}` +
    `&style=feature:poi%7Cvisibility:off` +
    `&key=${encodeURIComponent(key)}`
  );
}

// Demo/fake fallback so the PDF always renders, even with a partial payload.
const DEMO: PdfPlanData = {
  locale: "en",
  specialty: "General Medicine",
  urgency: "moderate",
  triageSummary:
    "Initial assessment recommends a specialist consultation within 1–2 weeks. No emergency indicators detected.",
  hospitalName: "King Fahad Hospital — Al-Ahsa",
  hospitalNameAr: "مستشفى الملك فهد بالأحساء",
  hospitalAddress: "King Fahad Rd, Al-Hofuf, Al-Ahsa 36361",
  hospitalMapUrl: null,
  packageName: "Initial Specialist Consultation",
  packageNameAr: "استشارة أخصائي مبدئية",
  hospitalCost: 750,
  hotelName: "Intercontinental Al-Ahsa",
  hotelNameAr: "إنتركونتيننتال الأحساء",
  hotelAddress: "Eastern Ring Rd, Al-Hofuf",
  hotelAddressAr: "طريق الدائري الشرقي، الهفوف",
  hotelMapUrl: null,
  hotelStars: 5,
  hotelAmenities: ["Free WiFi", "Pool", "Breakfast", "Airport Shuttle", "Spa", "Gym"],
  hotelDistanceKm: 4,
  pricePerNight: 480,
  nights: 5,
  hotelCost: 2400,
  transportName: "Private Driver — Sedan",
  transportNameAr: "سائق خاص — سيدان",
  transportCost: 1200,
  events: [
    { name: "Al-Qarah Mountain Tour", nameAr: "جولة جبل القارة", price: 150 },
    { name: "Old Souq Walking Tour", nameAr: "جولة السوق القديم", price: 0 },
    { name: "Date Farm Experience", nameAr: "تجربة مزرعة النخيل", price: 220 },
  ],
  eventsCost: 370,
  serviceFee: 250,
  totalCost: 4970,
  contactName: "Ahmed Hassan",
  nationality: "United Arab Emirates",
  travelDate: "2026-06-15",
  paymentMethod: "pay_on_arrival",
  planId: "demo-plan-00000001",
};

function sanitizeEvents(input: unknown): PdfPlanData["events"] {
  if (!Array.isArray(input) || input.length === 0) return DEMO.events;
  return input
    .filter((e): e is Record<string, unknown> => !!e && typeof e === "object")
    .map((e, i) => ({
      name: typeof e.name === "string" && e.name.length > 0 ? e.name : `Activity ${i + 1}`,
      nameAr: typeof e.nameAr === "string" ? e.nameAr : undefined,
      price: typeof e.price === "number" ? e.price : 0,
    }));
}

function sanitizeAmenities(input: unknown): string[] {
  if (!Array.isArray(input)) return DEMO.hotelAmenities!;
  const seen = new Set<string>();
  const out: string[] = [];
  for (const a of input) {
    if (typeof a === "string" && a.length > 0 && !seen.has(a)) {
      seen.add(a);
      out.push(a);
    }
  }
  return out.length > 0 ? out : DEMO.hotelAmenities!;
}

function withDefaults(body: Partial<PdfPlanData>): PdfPlanData {
  const hospitalName = body.hospitalName || DEMO.hospitalName;
  const hotelName = body.hotelName || DEMO.hotelName;
  return {
    ...DEMO,
    ...body,
    locale: body.locale === "ar" ? "ar" : "en",
    specialty: body.specialty || DEMO.specialty,
    urgency: body.urgency || DEMO.urgency,
    hospitalName,
    hotelName,
    transportName: body.transportName || DEMO.transportName,
    hotelStars: typeof body.hotelStars === "number" ? body.hotelStars : DEMO.hotelStars,
    nights: typeof body.nights === "number" ? body.nights : DEMO.nights,
    pricePerNight: typeof body.pricePerNight === "number" ? body.pricePerNight : DEMO.pricePerNight,
    hospitalCost: typeof body.hospitalCost === "number" ? body.hospitalCost : DEMO.hospitalCost,
    hotelCost: typeof body.hotelCost === "number" ? body.hotelCost : DEMO.hotelCost,
    transportCost: typeof body.transportCost === "number" ? body.transportCost : DEMO.transportCost,
    eventsCost: typeof body.eventsCost === "number" ? body.eventsCost : DEMO.eventsCost,
    serviceFee: typeof body.serviceFee === "number" ? body.serviceFee : DEMO.serviceFee,
    totalCost: typeof body.totalCost === "number" ? body.totalCost : DEMO.totalCost,
    events: sanitizeEvents(body.events),
    hotelAmenities: sanitizeAmenities(body.hotelAmenities),
    hospitalMapUrl: body.hospitalMapUrl ?? staticMapUrl(hospitalName),
    hotelMapUrl: body.hotelMapUrl ?? staticMapUrl(hotelName),
  };
}

async function renderPdf(data: PdfPlanData): Promise<Buffer> {
  const element = React.createElement(
    TripReceiptDoc,
    { data }
  ) as unknown as React.ReactElement<DocumentProps>;
  return renderToBuffer(element);
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => ({}))) as Partial<PdfPlanData>;
    const data = withDefaults(body);
    const buffer = await renderPdf(data);
    return new Response(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="wisal-trip-receipt.pdf"',
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return new Response(JSON.stringify({ error: "PDF generation failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// GET → demo PDF for previewing the layout. Use ?locale=ar for Arabic.
export async function GET(req: NextRequest) {
  try {
    const locale = req.nextUrl.searchParams.get("locale") === "ar" ? "ar" : "en";
    const data = withDefaults({ locale });
    const buffer = await renderPdf(data);
    return new Response(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="wisal-trip-receipt-demo.pdf"',
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return new Response(JSON.stringify({ error: "PDF generation failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
