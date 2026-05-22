export const dynamic = "force-dynamic"
import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const search = searchParams.get("search") ?? ""
    const species = searchParams.get("species") ?? ""
    const gender = searchParams.get("gender") ?? ""
    const status = searchParams.get("status") ?? ""
    const page = parseInt(searchParams.get("page") ?? "1")
    const limit = parseInt(searchParams.get("limit") ?? "25")
    const skip = (page - 1) * limit

    const where: Record<string, unknown> = {}
    if (search) where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { owner: { name: { contains: search, mode: "insensitive" } } },
    ]
    if (species) where.species = species
    if (gender) where.gender = gender
    if (status === "active") where.isActive = true
    if (status === "inactive") where.isActive = false

    const [pets, total] = await Promise.all([
      prisma.pet.findMany({ where, skip, take: limit, orderBy: { createdAt: "desc" }, include: { owner: { select: { name:true, email:true } }, photos: { where: { isMain: true }, take: 1 } } }),
      prisma.pet.count({ where }),
    ])
    return NextResponse.json({ pets, total, page, totalPages: Math.ceil(total / limit) })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { action, petId, name, breed, city, bio } = await req.json()
    if (!petId) return NextResponse.json({ error: "petId required" }, { status: 400 })
    let data: Record<string, unknown> = {}
    if (action === "approve") data = { isActive: true }
    else if (action === "reject") data = { isActive: false }
    else if (action === "edit") { if (name) data.name = name; if (breed) data.breed = breed; if (city) data.city = city; if (bio) data.bio = bio }
    const pet = await prisma.pet.update({ where: { id: petId }, data, select: { id:true, name:true, isActive:true } })
    return NextResponse.json(pet)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = new URL(req.url).searchParams.get("id")
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 })
    await prisma.pet.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
