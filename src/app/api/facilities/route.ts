import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const specialty = searchParams.get("specialty");
  const search = searchParams.get("search");

  try {
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
      include: { doctors: true, treatmentPackages: true },
      orderBy: { rating: "desc" },
    });

    const allSpecialties = await prisma.facility.findMany({
      select: { specialties: true },
    });

    const specialties = [...new Set(allSpecialties.flatMap((f) => f.specialties))].sort();

    return NextResponse.json({ facilities, specialties });
  } catch (error) {
    console.error("Failed to fetch facilities:", error);
    return NextResponse.json({ facilities: [], specialties: [] }, { status: 500 });
  }
}
