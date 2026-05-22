export const dynamic = "force-dynamic"
import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const conversationId = searchParams.get("conversationId")
    if (conversationId) {
      const messages = await prisma.message.findMany({ where: { conversationId }, orderBy: { createdAt: "asc" }, include: { sender: { select: { name:true, avatarUrl:true } } } })
      return NextResponse.json(messages)
    }
    const conversations = await prisma.conversation.findMany({ orderBy: { createdAt: "desc" }, take: 50, include: { participants: { include: { user: { select: { id:true, name:true, avatarUrl:true } } } }, messages: { orderBy: { createdAt: "desc" }, take: 1 } } })
    return NextResponse.json(conversations)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = new URL(req.url).searchParams.get("id")
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 })
    await prisma.message.update({ where: { id }, data: { isDeleted: true } })
    return NextResponse.json({ success: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
