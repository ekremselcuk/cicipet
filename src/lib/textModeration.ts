// Türkçe küfür / hakaret listesi
const TR_PROFANITY = [
  "amk", "amına", "amcık", "amını", "amınakoyim", "amınakoyayım",
  "bok", "boktan", "boklu", "boklaşmak",
  "orospu", "orospuçocuğu", "orospuçocukları",
  "sik", "sikeyim", "sikerim", "sikiş", "sikişmek", "siktirgit", "siktir",
  "sikimin", "sikici",
  "yarrak", "yarrağı", "yarrağına",
  "göt", "götlek", "götveren", "götü", "göte",
  "taşak", "taşşak",
  "ibne", "ibnelik", "ibneler",
  "piç", "piçlik", "piçin",
  "kahpe", "kahpenin", "kahpeler",
  "sürtük", "fahişe", "kancık",
  "pezevenk", "pezevenklik",
  "hassiktir", "hassikter",
  "çük", "lavuk",
  "oğlancı", "dölsüz",
  "ananı", "anani", "babanı", "babani",
  "sikim", "sikimde",
  "oç", "oc", "orosbuçocuğu",
  "gerizekalı", "geri zekalı", "aptal", "salak", "gerizekalı",
  "mal", "dangalak", "ahmak", "eşek",
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

// Alias — onboard ve API route'larında kullanılır
export const checkText = containsProfanity;
