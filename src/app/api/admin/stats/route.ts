export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const [
      totalUsers,
      totalPets,
      pendingModeration,
      activeListings,
      activeContests,
      todayRegistrations,
      recentUsers,
      recentPets,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.pet.count(),
      prisma.pet.count({ where: { isActive: false } }),
      prisma.listing.count({ where: { status: "ACTIVE" } }),
      prisma.contest.count({ where: { status: "ACTIVE" } }),
      prisma.user.count({ where: { createdAt: { gte: todayStart } } }),
      prisma.user.findMany({
        orderBy: { createdAt: "desc" },
        take: 10,
        select: { id: true, name: true, email: true, createdAt: true, city: true },
      }),
      prisma.pet.findMany({
        orderBy: { createdAt: "desc" },
        take: 10,
        select: {
          id: true,
          name: true,
          species: true,
          createdAt: true,
          owner: { select: { name: true } },
        },
      }),
    ]);

    return NextResponse.json({
      totalUsers,
      totalPets,
      pendingModeration,
      activeListings,
      activeContests,
      todayRegistrations,
      recentUsers,
      recentPets,
    });
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
