import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    const userId = (session?.user as Record<string, string> | undefined)?.id ?? null;

    const body = await req.json();
    const { paymentMethod, status, contactName, contactEmail, contactPhone, nationality, travelDate } = body;

    const existing = await prisma.journeyPlan.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    // Only allow update if plan belongs to this user (or is anonymous)
    if (existing.userId && existing.userId !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const updated = await prisma.journeyPlan.update({
      where: { id },
      data: {
        ...(paymentMethod !== undefined && { paymentMethod }),
        ...(status !== undefined && { status }),
        ...(contactName !== undefined && { contactName }),
        ...(contactEmail !== undefined && { contactEmail }),
        ...(contactPhone !== undefined && { contactPhone }),
        ...(nationality !== undefined && { nationality }),
        ...(travelDate !== undefined && { travelDate }),
      },
    });

    return NextResponse.json({ id: updated.id, success: true });
  } catch (error) {
    console.error("Journey plan update error:", error);
    return NextResponse.json({ error: "Failed to update plan" }, { status: 500 });
  }
}
