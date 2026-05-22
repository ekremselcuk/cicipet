export const dynamic = "force-dynamic"
import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const search = searchParams.get("search") ?? ""
    const role = searchParams.get("role") ?? ""
    const status = searchParams.get("status") ?? ""
    const page = parseInt(searchParams.get("page") ?? "1")
    const limit = parseInt(searchParams.get("limit") ?? "25")
    const skip = (page - 1) * limit

    const where: Record<string, unknown> = {}
    if (search) where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
    ]
    if (role) where.role = role
    if (status === "active") where.isActive = true
    if (status === "banned") where.isActive = false

    const [users, total] = await Promise.all([
      prisma.user.findMany({ where, skip, take: limit, orderBy: { createdAt: "desc" }, select: { id:true, email:true, username:true, name:true, avatarUrl:true, city:true, role:true, isActive:true, createdAt:true } }),
      prisma.user.count({ where }),
    ])
    return NextResponse.json({ users, total, page, totalPages: Math.ceil(total / limit) })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { action, userId, name, city, role } = await req.json()
    if (!userId) return NextResponse.json({ error: "userId required" }, { status: 400 })
    let data: Record<string, unknown> = {}
    if (action === "ban") data = { isActive: false }
    else if (action === "unban") data = { isActive: true }
    else if (action === "edit") { if (name !== undefined) data.name = name; if (city !== undefined) data.city = city; if (role !== undefined) data.role = role }
    const user = await prisma.user.update({ where: { id: userId }, data, select: { id:true, name:true, isActive:true, role:true } })
    return NextResponse.json(user)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = new URL(req.url).searchParams.get("id")
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 })
    await prisma.user.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
