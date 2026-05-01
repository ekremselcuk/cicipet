export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  return Response.json({ success: true, message: 'Pet kaydedildi' });
}
