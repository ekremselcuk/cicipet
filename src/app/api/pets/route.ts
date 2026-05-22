export const dynamic = 'force-dynamic'

import { checkText } from '@/lib/textModeration'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
  console.log("[pets/route] POST isteği alındı")
  try {
    console.log("[pets/route] FormData okunuyor...")
    const formData = await request.formData()

    const petName = (formData.get('petName') as string) ?? ''
    const bio     = (formData.get('bio') as string) ?? ''
    const petType = (formData.get('petType') as string) ?? ''
    const breed   = (formData.get('breed') as string) ?? ''
    const age     = (formData.get('age') as string) ?? ''
    const gender  = (formData.get('gender') as string) ?? ''
    const phone   = (formData.get('phone') as string) ?? ''

    console.log("[pets/route] Form değerleri:", { petName, petType, breed, age, gender })

    // Text moderation
    if (checkText(petName)) return Response.json({ error: 'Pet adında uygunsuz içerik tespit edildi.' }, { status: 400 })
    if (bio && checkText(bio)) return Response.json({ error: 'Açıklamada uygunsuz içerik tespit edildi.' }, { status: 400 })

    const email = request.headers.get("x-user-email")
    console.log("[pets/route] x-user-email header:", email)
    if (!email) return Response.json({ error: "Lütfen giriş yapın." }, { status: 401 })

    console.log("[pets/route] Kullanıcı veritabanında aranıyor...")
    const user = await prisma.user.findFirst({ where: { email } })
    console.log("[pets/route] Kullanıcı:", user ? `id=${user.id}` : "BULUNAMADI")
    if (!user) return Response.json({ error: "Kullanıcı bulunamadı." }, { status: 401 })

    const ownerId = user.id

    // Species mapping
    const speciesMap: Record<string, string> = {
      kedi: 'CAT', köpek: 'DOG', kuş: 'BIRD', tavşan: 'RABBIT',
      hamster: 'OTHER', balık: 'FISH', sürüngen: 'REPTILE', diğer: 'OTHER',
    }
    const genderMap: Record<string, string> = { Erkek: 'MALE', Dişi: 'FEMALE' }

    const petSpecies = speciesMap[petType] ?? 'OTHER'
    const petGender  = genderMap[gender] ?? 'UNKNOWN'
    const birthYear  = age ? new Date().getFullYear() - parseInt(age) : null

    console.log("[pets/route] Pet oluşturuluyor:", { ownerId, petName, petSpecies, petGender })
    const pet = await prisma.pet.create({
      data: {
        ownerId,
        name: petName,
        species: petSpecies as "DOG"|"CAT"|"BIRD"|"RABBIT"|"FISH"|"REPTILE"|"OTHER",
        breed: breed || null,
        gender: petGender as "MALE"|"FEMALE"|"UNKNOWN",
        bio: bio || null,
        birthDate: birthYear ? new Date(birthYear, 0, 1) : null,
        isActive: true,
      },
    })
    console.log("[pets/route] Pet oluşturuldu, id:", pet.id)

    return Response.json({ success: true, petId: pet.id })
  } catch (err) {
    console.error('[pets/route] HATA:', err)
    return Response.json({ error: 'Sunucu hatası. Lütfen tekrar deneyin.' }, { status: 500 })
  }
}
