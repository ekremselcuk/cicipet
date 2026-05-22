export const dynamic = "force-dynamic"
import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(req: NextRequest) {
  try {
    const type = new URL(req.url).searchParams.get("type") ?? "photos"
    if (type === "photos") {
      const pets = await prisma.pet.findMany({ where: { isActive: false }, include: { photos: true, owner: { select: { name:true, email:true } } }, orderBy: { createdAt: "desc" }, take: 50 })
      return NextResponse.json(pets)
    }
    if (type === "texts") {
      const pets = await prisma.pet.findMany({ where: { bio: { not: null } }, select: { id:true, name:true, bio:true, createdAt:true, owner: { select: { name:true } } }, orderBy: { createdAt: "desc" }, take: 50 })
      return NextResponse.json(pets)
    }
    if (type === "reports") {
      const logs = await prisma.moderationLog.findMany({ orderBy: { createdAt: "desc" }, take: 50, include: { moderator: { select: { name:true } }, targetUser: { select: { name:true, email:true } } } })
      return NextResponse.json(logs)
    }
    return NextResponse.json([])
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { action, targetId, targetType, reason } = await req.json()
    if (action === "approve" && targetType === "pet") {
      await prisma.pet.update({ where: { id: targetId }, data: { isActive: true } })
    } else if (action === "reject" && targetType === "pet") {
      await prisma.pet.update({ where: { id: targetId }, data: { isActive: false } })
    } else if (action === "warn") {
      const admin = await prisma.user.findFirst({ where: { role: "ADMIN" } })
      if (admin) {
        const pet = await prisma.pet.findUnique({ where: { id: targetId }, select: { ownerId:true } })
        if (pet) {
          await prisma.moderationLog.create({ data: { moderatorId: admin.id, targetUserId: pet.ownerId, action: "WARNING", reason: reason || "İçerik ihlali" } })
        }
      }
    }
    return NextResponse.json({ success: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
