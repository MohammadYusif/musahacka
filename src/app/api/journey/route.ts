import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hotels } from "@/data/hotels";
import { transportOptions } from "@/data/car-rentals";
import { localEvents } from "@/data/events";

export async function POST(req: NextRequest) {
  try {
    const { specialty } = await req.json();

    let hospitals = await prisma.facility.findMany({
      where: { specialties: { has: specialty } },
      include: {
        doctors: { take: 2 },
        treatmentPackages: { where: { specialty }, take: 1 },
      },
      take: 3,
    });

    // Fall back to all facilities if none match the specialty
    if (hospitals.length === 0) {
      hospitals = await prisma.facility.findMany({
        include: {
          doctors: { take: 2 },
          treatmentPackages: { take: 1 },
        },
        take: 3,
      });
    }

    // Return all hotels and events — filtering by city happens on the client
    // after the user selects their hospital
    return NextResponse.json({ hospitals, hotels, transports: transportOptions, events: localEvents });
  } catch (error) {
    console.error("Journey error:", error);
    return NextResponse.json({ error: "Failed to load journey data" }, { status: 500 });
  }
}
