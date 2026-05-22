export const dynamic = 'force-dynamic'

import { moderateImage } from '@/lib/imageModeration'
import { checkText } from '@/lib/textModeration'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'

// Cloudinary upload via REST API (no SDK needed for server-side)
async function uploadToCloudinary(base64: string, mimeType: string): Promise<string> {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET
  if (!cloudName || !apiKey || !apiSecret) throw new Error('Cloudinary config eksik')

  const dataUri = `data:${mimeType};base64,${base64}`
  const formData = new FormData()
  formData.append('file', dataUri)
  formData.append('upload_preset', 'cicipet_pets')
  formData.append('folder', 'cicipet/pets')

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, { method: 'POST', body: formData })
  if (!res.ok) throw new Error('Cloudinary yükleme hatası')
  const data = await res.json()
  return data.secure_url as string
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession({ providers: [], session: { strategy: "jwt" }, secret: process.env.NEXTAUTH_SECRET } as any)
    const formData = await request.formData()

    const petName = (formData.get('petName') as string) ?? ''
    const bio = (formData.get('bio') as string) ?? ''
    const petType = (formData.get('petType') as string) ?? ''
    const breed = (formData.get('breed') as string) ?? ''
    const age = (formData.get('age') as string) ?? ''
    const gender = (formData.get('gender') as string) ?? ''
    const phone = (formData.get('phone') as string) ?? ''
    const photo = formData.get('photo') as File | null

    // Text moderation
    if (checkText(petName)) return Response.json({ error: 'Pet adında uygunsuz içerik tespit edildi.' }, { status: 400 })
    if (bio && checkText(bio)) return Response.json({ error: 'Açıklamada uygunsuz içerik tespit edildi.' }, { status: 400 })
    if (!photo) return Response.json({ error: 'Lütfen bir fotoğraf yükleyin.' }, { status: 400 })

    // Image moderation
    const arrayBuffer = await photo.arrayBuffer()
    const base64 = Buffer.from(arrayBuffer).toString('base64')
    const modResult = await moderateImage(base64)
    if (!modResult.safe) return Response.json({ error: modResult.reason ?? 'Uygunsuz görsel içeriği.' }, { status: 400 })
    if (!modResult.hasPet) return Response.json({ error: modResult.reason ?? 'Fotoğrafta evcil hayvan tespit edilemedi.' }, { status: 400 })

    // Cloudinary upload
    let photoUrl = ''
    try {
      photoUrl = await uploadToCloudinary(base64, photo.type)
    } catch (err) {
      console.error('[pets/route] Cloudinary hatası:', err)
      // Cloudinary olmadan devam et
    }

    // Species mapping
    const speciesMap: Record<string, string> = {
      kedi: 'CAT', köpek: 'DOG', kuş: 'BIRD', tavşan: 'RABBIT',
      hamster: 'OTHER', balık: 'FISH', sürüngen: 'REPTILE', diğer: 'OTHER',
    }
    const genderMap: Record<string, string> = { Erkek: 'MALE', Dişi: 'FEMALE' }

    // Find or create user
    let ownerId: string
    if (session?.user?.email) {
      const user = await prisma.user.findFirst({ where: { email: session.user.email } })
      if (!user) return Response.json({ error: 'Kullanıcı bulunamadı. Lütfen giriş yapın.' }, { status: 401 })
      ownerId = user.id
      // Update phone if provided
      if (phone) await prisma.user.update({ where: { id: ownerId }, data: { phone } })
    } else {
      return Response.json({ error: 'Lütfen giriş yapın.' }, { status: 401 })
    }

    // Create pet
    const petSpecies = speciesMap[petType] ?? 'OTHER'
    const petGender = genderMap[gender] ?? 'UNKNOWN'
    const birthYear = age ? new Date().getFullYear() - parseInt(age) : null

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

    // Create photo record if upload succeeded
    if (photoUrl) {
      await prisma.petPhoto.create({ data: { petId: pet.id, url: photoUrl, isMain: true, order: 0 } })
    }

    return Response.json({ success: true, petId: pet.id })
  } catch (err) {
    console.error('[/api/pets] POST error:', err)
    return Response.json({ error: 'Sunucu hatası. Lütfen tekrar deneyin.' }, { status: 500 })
  }
}
