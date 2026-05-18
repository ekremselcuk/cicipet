export const dynamic = 'force-dynamic';

import { moderateImage } from '@/lib/imageModeration';
import { checkText } from '@/lib/textModeration';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const petName = (formData.get('petName') as string) ?? '';
    const bio     = (formData.get('bio')     as string) ?? '';
    const photo   = formData.get('photo') as File | null;

    // Metin moderasyonu
    if (checkText(petName)) {
      return Response.json({ error: 'Pet adında uygunsuz içerik tespit edildi.' }, { status: 400 });
    }
    if (bio && checkText(bio)) {
      return Response.json({ error: 'Açıklamada uygunsuz içerik tespit edildi.' }, { status: 400 });
    }

    // Görsel moderasyonu
    if (photo) {
      const arrayBuffer = await photo.arrayBuffer();
      const base64 = Buffer.from(arrayBuffer).toString('base64');
      const result = await moderateImage(base64);

      if (!result.safe) {
        return Response.json({ error: result.reason ?? 'Uygunsuz görsel içeriği tespit edildi.' }, { status: 400 });
      }
      if (!result.hasPet) {
        return Response.json({ error: result.reason ?? 'Fotoğrafta evcil hayvan tespit edilemedi.' }, { status: 400 });
      }
    } else {
      return Response.json({ error: 'Lütfen bir fotoğraf yükleyin.' }, { status: 400 });
    }

    // TODO: Prisma ile DB kaydı ve Cloudinary yükleme burada yapılacak
    return Response.json({ success: true, message: 'Pet kaydedildi' });

  } catch (err) {
    console.error('[/api/pets] POST error:', err);
    return Response.json({ error: 'Sunucu hatası. Lütfen tekrar deneyin.' }, { status: 500 });
  }
}
