export const dynamic = "force-dynamic"
import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")
    if (id) {
      const contest = await prisma.contest.findUnique({ where: { id }, include: { entries: { include: { pet: { select: { name:true } }, user: { select: { name:true } }, votes: { select: { id:true } } } } } })
      return NextResponse.json(contest)
    }
    const contests = await prisma.contest.findMany({ orderBy: { createdAt: "desc" }, include: { _count: { select: { entries:true } } } })
    return NextResponse.json(contests)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { title, description, startDate, endDate, prize } = await req.json()
    if (!title || !startDate || !endDate) return NextResponse.json({ error: "title, startDate, endDate required" }, { status: 400 })
    const contest = await prisma.contest.create({ data: { title, description: description || null, startDate: new Date(startDate), endDate: new Date(endDate), prize: prize || null, status: "UPCOMING" } })
    return NextResponse.json(contest, { status: 201 })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { contestId, ...updates } = await req.json()
    if (!contestId) return NextResponse.json({ error: "contestId required" }, { status: 400 })
    const data: Record<string, unknown> = {}
    if (updates.title) data.title = updates.title
    if (updates.description !== undefined) data.description = updates.description
    if (updates.status) data.status = updates.status
    if (updates.prize !== undefined) data.prize = updates.prize
    if (updates.startDate) data.startDate = new Date(updates.startDate)
    if (updates.endDate) data.endDate = new Date(updates.endDate)
    const contest = await prisma.contest.update({ where: { id: contestId }, data })
    return NextResponse.json(contest)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = new URL(req.url).searchParams.get("id")
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 })
    await prisma.contest.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
