// Türkçe küfür listesi
const TR_PROFANITY = [
  "amk", "amına", "amcık", "bok", "boktan", "orospu", "orospuçocuğu",
  "sik", "sikeyim", "sikerim", "sikiş", "sikişmek", "yarrak", "yarrağı",
  "göt", "götlek", "götveren", "taşak", "taşşak", "ibne", "ibnelik",
  "piç", "piçlik", "kahpe", "kahpenin", "sürtük", "fahişe", "kancık",
  "pezevenk", "oynama", "sıktır", "hassiktir", "çük", "götü", "lavuk",
  "oğlancı", "dölsüz", "ananı", "babanı", "sikim",
];

// İngilizce küfür listesi
const EN_PROFANITY = [
  "fuck", "fucking", "fucker", "shit", "bullshit", "bitch", "bastard",
  "asshole", "cunt", "dick", "cock", "pussy", "whore", "slut", "damn",
  "prick", "motherfucker", "faggot", "nigger", "wanker",
];

// Leet speak normalizasyonu
function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/1/g, "i")
    .replace(/3/g, "e")
    .replace(/4/g, "a")
    .replace(/0/g, "o")
    .replace(/\$/g, "s")
    .replace(/@/g, "a")
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c");
}

export function containsProfanity(text: string): boolean {
  if (!text) return false;
  const normalized = normalize(text);
  return [...TR_PROFANITY, ...EN_PROFANITY].some((word) =>
    normalized.includes(normalize(word))
  );
}
