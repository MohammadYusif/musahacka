import { NextRequest, NextResponse } from "next/server";
import { mockFacilities, mockSpecialties } from "@/lib/mock-data";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const specialty = searchParams.get("specialty");
  const search = searchParams.get("search");

  let facilities = mockFacilities;
  let specialties = mockSpecialties;

  try {
    const { prisma } = await import("@/lib/prisma");

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

    const dbFacilities = await prisma.facility.findMany({
      where,
      include: { doctors: true, treatmentPackages: true },
      orderBy: { rating: "desc" },
    });

    const allSpecialties = await prisma.facility.findMany({
      select: { specialties: true },
    });

    facilities = dbFacilities as unknown as typeof mockFacilities;
    specialties = [...new Set(allSpecialties.flatMap((f) => f.specialties))].sort();
  } catch {
    console.warn("Database unavailable, using mock data");

    if (specialty && specialty !== "All Specialties") {
      facilities = facilities.filter((f) => f.specialties.includes(specialty));
    }

    if (search) {
      const q = search.toLowerCase();
      facilities = facilities.filter(
        (f) =>
          f.name.toLowerCase().includes(q) ||
          (f.nameAr && f.nameAr.includes(q)) ||
          f.city.toLowerCase().includes(q)
      );
    }
  }

  return NextResponse.json({ facilities, specialties });
}
