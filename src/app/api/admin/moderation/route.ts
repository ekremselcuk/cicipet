export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type") || "photos";

    if (type === "photos") {
      const pets = await prisma.pet.findMany({
        where: { isActive: false },
        include: {
          photos: { select: { url: true, isMain: true } },
          owner: { select: { name: true } },
        },
        orderBy: { createdAt: "desc" },
        take: 50,
      });
      return NextResponse.json(pets);
    }

    if (type === "texts") {
      const pets = await prisma.pet.findMany({
        where: { isActive: false },
        select: { id: true, name: true, createdAt: true, owner: { select: { name: true } } },
        take: 25,
      });

      const items = pets.map((p) => ({
        id: p.id,
        content: p.name,
        author: p.owner?.name || "—",
        type: "pet adı",
        date: p.createdAt,
      }));

      return NextResponse.json(items);
    }

    if (type === "reports") {
      const logs = await prisma.moderationLog.findMany({
        orderBy: { createdAt: "desc" },
        include: {
          moderator: { select: { name: true } },
          targetUser: { select: { name: true, email: true } },
        },
        take: 50,
      });
      return NextResponse.json(logs);
    }

    return NextResponse.json([]);
  } catch (error) {
    console.error("Moderation GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, targetId, targetType, reason } = body;

    if (!action || !targetId) {
      return NextResponse.json({ error: "action and targetId required" }, { status: 400 });
    }

    if (action === "approve" && targetType === "pet") {
      await prisma.pet.update({ where: { id: targetId }, data: { isActive: true } });
    } else if (action === "reject" && targetType === "pet") {
      await prisma.pet.update({ where: { id: targetId }, data: { isActive: false } });
    } else if (action === "warn") {
      // Get first admin user as moderator
      const adminUser = await prisma.user.findFirst({ where: { role: "ADMIN" } });
      if (!adminUser) {
        return NextResponse.json({ error: "No admin user found" }, { status: 400 });
      }

      // Try to find target user — if targetType is pet, get the owner
      let targetUserId: string | null = null;
      if (targetType === "pet") {
        const pet = await prisma.pet.findUnique({ where: { id: targetId }, select: { ownerId: true } });
        targetUserId = pet?.ownerId || null;
      } else {
        targetUserId = targetId;
      }

      if (targetUserId) {
        await prisma.moderationLog.create({
          data: {
            moderatorId: adminUser.id,
            targetUserId,
            action: "WARNING",
            reason: reason || "Uygunsuz içerik",
          },
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Moderation POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
