export const dynamic = 'force-dynamic'

import { checkText } from '@/lib/textModeration'
import prisma from '@/lib/prisma'

async function uploadToCloudinary(base64: string, mimeType: string): Promise<string> {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME
  const apiKey    = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET
  if (!cloudName || !apiKey || !apiSecret) throw new Error('Cloudinary config eksik')

  const formData = new FormData()
  formData.append('file', `data:${mimeType};base64,${base64}`)
  formData.append('upload_preset', 'cicipet_pets')
  formData.append('folder', 'cicipet/pets')

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, { method: 'POST', body: formData })
  if (!res.ok) throw new Error(`Cloudinary yükleme hatası: ${res.status}`)
  const data = await res.json()
  return data.secure_url as string
}

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
    const photo   = formData.get('photo') as File | null

    console.log("[pets/route] Form değerleri:", { petName, petType, breed, age, gender, hasPhoto: !!photo })

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
    if (phone) await prisma.user.update({ where: { id: ownerId }, data: { phone } })

    // Cloudinary upload — hata olursa fotoğrafsız devam et
    let photoUrl = ''
    if (photo) {
      try {
        const base64 = Buffer.from(await photo.arrayBuffer()).toString('base64')
        console.log("[pets/route] Cloudinary yükleniyor...")
        photoUrl = await uploadToCloudinary(base64, photo.type)
        console.log("[pets/route] Cloudinary başarılı:", photoUrl)
      } catch (err) {
        console.error('[pets/route] Cloudinary hatası (devam ediliyor):', err)
      }
    }

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

    if (photoUrl) {
      await prisma.petPhoto.create({ data: { petId: pet.id, url: photoUrl, isMain: true, order: 0 } })
      console.log("[pets/route] Fotoğraf kaydedildi")
    }

    return Response.json({ success: true, petId: pet.id })
  } catch (err) {
    console.error('[pets/route] HATA:', err)
    return Response.json({ error: 'Sunucu hatası. Lütfen tekrar deneyin.' }, { status: 500 })
  }
}
