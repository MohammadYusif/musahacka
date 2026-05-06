import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as Record<string, string> | undefined)?.id ?? null;

    const body = await req.json();
    const {
      specialty, urgency, triageSummary,
      hospitalName, packageName, hospitalCost,
      hotelName, hotelStars, pricePerNight, nights, hotelCost,
      transportName, transportCost,
      events, eventsCost,
      serviceFee, totalCost,
      contactName, contactEmail, contactPhone, nationality, travelDate,
      paymentMethod, status,
    } = body;

    const plan = await prisma.journeyPlan.create({
      data: {
        userId,
        specialty, urgency, triageSummary: triageSummary ?? null,
        hospitalName, packageName: packageName ?? null, hospitalCost,
        hotelName, hotelStars, pricePerNight, nights, hotelCost,
        transportName, transportCost,
        events: events ?? [],
        eventsCost: eventsCost ?? 0,
        serviceFee: serviceFee ?? 250,
        totalCost,
        contactName: contactName ?? null,
        contactEmail: contactEmail ?? null,
        contactPhone: contactPhone ?? null,
        nationality: nationality ?? null,
        travelDate: travelDate ?? null,
        paymentMethod: paymentMethod ?? null,
        status: status ?? "saved",
      },
    });

    return NextResponse.json({ id: plan.id, success: true });
  } catch (error) {
    console.error("Journey plan create error:", error);
    return NextResponse.json({ error: "Failed to save journey plan" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as Record<string, string> | undefined)?.id;

    if (!userId) {
      return NextResponse.json({ plans: [] });
    }

    const plans = await prisma.journeyPlan.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ plans });
  } catch (error) {
    console.error("Journey plan fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch plans" }, { status: 500 });
  }
}
