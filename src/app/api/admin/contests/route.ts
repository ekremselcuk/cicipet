export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    // Detail view with entries
    if (id) {
      const contest = await prisma.contest.findUnique({
        where: { id },
        include: {
          entries: {
            include: {
              pet: { select: { name: true } },
              user: { select: { name: true } },
              votes: { select: { id: true } },
            },
          },
        },
      });
      return NextResponse.json(contest);
    }

    const contests = await prisma.contest.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        _count: { select: { entries: true } },
      },
    });

    return NextResponse.json(contests);
  } catch (error) {
    console.error("Contests GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description, startDate, endDate, prize } = body;

    if (!title || !startDate || !endDate) {
      return NextResponse.json({ error: "title, startDate, endDate required" }, { status: 400 });
    }

    const contest = await prisma.contest.create({
      data: {
        title,
        description: description || null,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        prize: prize || null,
        status: "UPCOMING",
      },
    });

    return NextResponse.json(contest, { status: 201 });
  } catch (error) {
    console.error("Contests POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { contestId, title, description, status, prize, startDate, endDate } = body;

    if (!contestId) {
      return NextResponse.json({ error: "contestId required" }, { status: 400 });
    }

    const data: Record<string, unknown> = {};
    if (title !== undefined) data.title = title;
    if (description !== undefined) data.description = description;
    if (status !== undefined) data.status = status;
    if (prize !== undefined) data.prize = prize;
    if (startDate !== undefined) data.startDate = new Date(startDate);
    if (endDate !== undefined) data.endDate = new Date(endDate);

    const contest = await prisma.contest.update({ where: { id: contestId }, data });
    return NextResponse.json(contest);
  } catch (error) {
    console.error("Contests PATCH error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "id required" }, { status: 400 });
    }

    await prisma.contest.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contests DELETE error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
