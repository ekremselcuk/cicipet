export interface ModerationResult {
  safe: boolean;
  hasPet: boolean;
  reason?: string;
}

const LIKELIHOOD_SCORE: Record<string, number> = {
  UNKNOWN: 0,
  VERY_UNLIKELY: 0,
  UNLIKELY: 1,
  POSSIBLE: 2,
  LIKELY: 3,
  VERY_LIKELY: 4,
};

const PET_LABELS = [
  "dog", "cat", "bird", "rabbit", "hamster", "fish", "reptile", "lizard",
  "turtle", "snake", "pet", "animal", "puppy", "kitten", "parrot",
  "goldfish", "guinea pig", "hedgehog", "ferret", "companion dog",
  "domestic animal", "fauna", "canine", "feline", "rodent", "amphibian",
];

export async function moderateImage(base64: string): Promise<ModerationResult> {
  const apiKey = process.env.GOOGLE_CLOUD_VISION_API_KEY;

  // Geliştirme modu: API key yoksa her fotoğrafı kabul et
  if (!apiKey) {
    console.warn("[imageModeration] GOOGLE_CLOUD_VISION_API_KEY yok — mock mod aktif.");
    return { safe: true, hasPet: true };
  }

  const res = await fetch(
    `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requests: [
          {
            image: { content: base64 },
            features: [
              { type: "SAFE_SEARCH_DETECTION" },
              { type: "LABEL_DETECTION", maxResults: 15 },
            ],
          },
        ],
      }),
    }
  );

  if (!res.ok) {
    console.error("[imageModeration] Vision API hatası:", res.status);
    // API hatası geliştirme ortamında geç, prodda reddet
    return process.env.NODE_ENV === "production"
      ? { safe: false, hasPet: false, reason: "Görsel denetim servisi geçici olarak kullanılamıyor." }
      : { safe: true, hasPet: true };
  }

  const data = await res.json();
  const response = data.responses?.[0];

  // NSFW kontrolü
  const safe = response?.safeSearchAnnotation;
  if (safe) {
    const adultScore   = LIKELIHOOD_SCORE[safe.adult]    ?? 0;
    const violenceScore= LIKELIHOOD_SCORE[safe.violence] ?? 0;
    const racyScore    = LIKELIHOOD_SCORE[safe.racy]     ?? 0;

    if (adultScore >= 3 || violenceScore >= 3 || racyScore >= 3) {
      return { safe: false, hasPet: false, reason: "Uygunsuz görsel içeriği tespit edildi." };
    }
  }

  // Pet tespiti
  const labels: Array<{ description: string; score: number }> =
    response?.labelAnnotations ?? [];

  const hasPet = labels.some(
    (l) =>
      l.score >= 0.6 &&
      PET_LABELS.some((pet) => l.description.toLowerCase().includes(pet))
  );

  if (!hasPet) {
    return { safe: true, hasPet: false, reason: "Fotoğrafta evcil hayvan tespit edilemedi. Lütfen petinizin net göründüğü bir fotoğraf yükleyin." };
  }

  return { safe: true, hasPet: true };
}
