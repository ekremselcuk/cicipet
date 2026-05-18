export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const species = searchParams.get("species") || "";
    const gender = searchParams.get("gender") || "";
    const status = searchParams.get("status") || "";
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortDir = (searchParams.get("sortDir") || "desc") as "asc" | "desc";
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.min(100, parseInt(searchParams.get("limit") || "25"));

    const where: Record<string, unknown> = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { breed: { contains: search, mode: "insensitive" } },
        { city: { contains: search, mode: "insensitive" } },
      ];
    }

    if (species) {
      where.species = species;
    }

    if (gender) {
      where.gender = gender;
    }

    if (status === "active") {
      where.isActive = true;
    } else if (status === "inactive") {
      where.isActive = false;
    }

    const allowedSortFields = ["createdAt", "name"];
    const orderByField = allowedSortFields.includes(sortBy) ? sortBy : "createdAt";

    const [pets, total] = await Promise.all([
      prisma.pet.findMany({
        where,
        orderBy: { [orderByField]: sortDir },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          owner: { select: { name: true, email: true } },
          photos: { select: { url: true, isMain: true } },
        },
      }),
      prisma.pet.count({ where }),
    ]);

    return NextResponse.json({
      pets,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Pets GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, petId, name, breed, city } = body;

    if (!petId) {
      return NextResponse.json({ error: "petId required" }, { status: 400 });
    }

    if (action === "approve") {
      await prisma.pet.update({ where: { id: petId }, data: { isActive: true } });
    } else if (action === "reject") {
      await prisma.pet.update({ where: { id: petId }, data: { isActive: false } });
    } else if (action === "edit") {
      const data: Record<string, unknown> = {};
      if (name !== undefined) data.name = name;
      if (breed !== undefined) data.breed = breed;
      if (city !== undefined) data.city = city;
      await prisma.pet.update({ where: { id: petId }, data });
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Pets PATCH error:", error);
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

    await prisma.pet.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Pets DELETE error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
