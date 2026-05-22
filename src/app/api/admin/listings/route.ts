export const dynamic = "force-dynamic"
import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const search = searchParams.get("search") ?? ""
    const type = searchParams.get("type") ?? ""
    const status = searchParams.get("status") ?? ""
    const city = searchParams.get("city") ?? ""
    const page = parseInt(searchParams.get("page") ?? "1")
    const limit = parseInt(searchParams.get("limit") ?? "25")
    const skip = (page - 1) * limit

    const where: Record<string, unknown> = {}
    if (search) where.OR = [{ title: { contains: search, mode: "insensitive" } }, { description: { contains: search, mode: "insensitive" } }]
    if (type) where.type = type
    if (status) where.status = status
    if (city) where.city = { contains: city, mode: "insensitive" }

    const [listings, total] = await Promise.all([
      prisma.listing.findMany({ where, skip, take: limit, orderBy: { createdAt: "desc" }, include: { user: { select: { name:true, email:true } } } }),
      prisma.listing.count({ where }),
    ])
    return NextResponse.json({ listings, total, page, totalPages: Math.ceil(total / limit) })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { action, listingId, title, description, city } = await req.json()
    if (!listingId) return NextResponse.json({ error: "listingId required" }, { status: 400 })
    let data: Record<string, unknown> = {}
    if (action === "close") data = { status: "CLOSED" }
    else if (action === "edit") { if (title) data.title = title; if (description) data.description = description; if (city) data.city = city }
    const listing = await prisma.listing.update({ where: { id: listingId }, data, select: { id:true, title:true, status:true } })
    return NextResponse.json(listing)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = new URL(req.url).searchParams.get("id")
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 })
    await prisma.listing.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
