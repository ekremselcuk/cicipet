export const dynamic = 'force-dynamic';

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { v2 as cloudinary } from "cloudinary";
import { authOptions } from "@/auth";
import { prisma } from "@/lib/prisma";
import { moderateImage } from "@/lib/imageModeration";
import { containsProfanity } from "@/lib/textModeration";

cloudinary.config({
  cloud_name:  process.env.CLOUDINARY_CLOUD_NAME,
  api_key:     process.env.CLOUDINARY_API_KEY,
  api_secret:  process.env.CLOUDINARY_API_SECRET,
});

const SPECIES_MAP: Record<string, string> = {
  cat: "CAT", dog: "DOG", bird: "BIRD", rabbit: "RABBIT",
  hamster: "OTHER", fish: "FISH", reptile: "REPTILE", other: "OTHER",
};

const GENDER_MAP: Record<string, string> = {
  Erkek: "MALE", Dişi: "FEMALE",
};

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Giriş yapmanız gerekiyor." }, { status: 401 });
  }

  const formData = await req.formData();
  const petType  = formData.get("petType")  as string;
  const breed    = formData.get("breed")    as string;
  const petName  = formData.get("petName")  as string;
  const phone    = formData.get("phone")    as string;
  const age      = formData.get("age")      as string;
  const gender   = formData.get("gender")   as string;
  const bio      = formData.get("bio")      as string | null;
  const photo    = formData.get("photo")    as File | null;

  // Sunucu tarafı küfür kontrolü
  if (bio && containsProfanity(bio)) {
    return NextResponse.json({ error: "Uygunsuz içerik tespit edildi." }, { status: 400 });
  }
  if (containsProfanity(petName)) {
    return NextResponse.json({ error: "Uygunsuz içerik tespit edildi." }, { status: 400 });
  }

  // Fotoğraf zorunlu
  if (!photo) {
    return NextResponse.json({ error: "Fotoğraf yüklenmedi." }, { status: 400 });
  }

  // Fotoğrafı Cloudinary'e yükle
  let photoUrl: string;
  let base64: string;
  try {
    const buffer = Buffer.from(await photo.arrayBuffer());
    base64 = buffer.toString("base64");
    const dataUri = `data:${photo.type};base64,${base64}`;
    const result = await cloudinary.uploader.upload(dataUri, { folder: "cicipet/pets" });
    photoUrl = result.secure_url;
  } catch {
    return NextResponse.json({ error: "Fotoğraf yüklenemedi." }, { status: 500 });
  }

  // Görsel moderasyon
  const moderation = await moderateImage(base64);
  if (!moderation.safe) {
    return NextResponse.json({ error: moderation.reason ?? "Uygunsuz görsel içeriği." }, { status: 400 });
  }
  if (!moderation.hasPet) {
    return NextResponse.json({ error: moderation.reason ?? "Fotoğrafta evcil hayvan tespit edilemedi." }, { status: 400 });
  }

  // Kullanıcıyı upsert et
  const user = await prisma.user.upsert({
    where:  { email: session.user.email },
    update: {},
    create: {
      email:    session.user.email,
      username: session.user.email.split("@")[0] + "_" + Date.now(),
      name:     session.user.name ?? undefined,
      avatarUrl:session.user.image ?? undefined,
    },
  });

  // Yaklaşık doğum tarihi hesapla
  const birthDate = age
    ? new Date(new Date().getFullYear() - parseInt(age), 0, 1)
    : undefined;

  // Pet kaydı oluştur
  const pet = await prisma.pet.create({
    data: {
      ownerId:  user.id,
      name:     petName,
      species:  (SPECIES_MAP[petType] ?? "OTHER") as never,
      breed:    breed || undefined,
      gender:   (GENDER_MAP[gender] ?? "UNKNOWN") as never,
      birthDate,
      bio:      bio || undefined,
      photos: {
        create: { url: photoUrl, isMain: true, order: 0 },
      },
    },
  });

  return NextResponse.json({ success: true, petId: pet.id });
}
