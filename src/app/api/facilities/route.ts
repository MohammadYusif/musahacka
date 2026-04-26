import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const specialty = searchParams.get("specialty");
    const search = searchParams.get("search");

    const where: Record<string, unknown> = {};

    if (specialty && specialty !== "All Specialties") {
      where.specialties = { has: specialty };
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { nameAr: { contains: search, mode: "insensitive" } },
        { city: { contains: search, mode: "insensitive" } },
      ];
    }

    const facilities = await prisma.facility.findMany({
      where,
      include: {
        doctors: true,
        treatmentPackages: true,
      },
      orderBy: { rating: "desc" },
    });

    const allSpecialties = await prisma.facility.findMany({
      select: { specialties: true },
    });

    const uniqueSpecialties = [...new Set(allSpecialties.flatMap((f) => f.specialties))].sort();

    return NextResponse.json({ facilities, specialties: uniqueSpecialties });
  } catch (error) {
    console.error("Facilities error:", error);
    return NextResponse.json({ error: "Failed to fetch facilities" }, { status: 500 });
  }
}
