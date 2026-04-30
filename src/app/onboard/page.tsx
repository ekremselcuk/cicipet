"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const PET_TYPES = [
  { id: "cat",     emoji: "🐱", label: "Kedi" },
  { id: "dog",     emoji: "🐶", label: "Köpek" },
  { id: "bird",    emoji: "🐦", label: "Kuş" },
  { id: "rabbit",  emoji: "🐰", label: "Tavşan" },
  { id: "hamster", emoji: "🐹", label: "Hamster" },
  { id: "fish",    emoji: "🐟", label: "Balık" },
  { id: "reptile", emoji: "🦎", label: "Sürüngen" },
  { id: "other",   emoji: "🐾", label: "Diğer" },
] as const;

type PetTypeId = (typeof PET_TYPES)[number]["id"];

const BREEDS: Record<PetTypeId, string[]> = {
  cat:     ["Van Kedisi", "Ankara Kedisi", "British Shorthair", "Persian", "Maine Coon", "Ragdoll", "Scottish Fold", "Siyam", "Bengal", "Sphynx", "Diğer"],
  dog:     ["Golden Retriever", "Labrador", "Alman Çoban Köpeği", "Husky", "Poodle", "Beagle", "Bulldog", "Rottweiler", "Chihuahua", "Border Collie", "Diğer"],
  bird:    ["Muhabbet Kuşu", "Papağan", "Kanarya", "Cennet Papağanı", "Kakadu", "Macaw", "Amazon Papağanı", "Afrika Gri Papağanı", "Forpus", "Sultan Papağanı", "Diğer"],
  rabbit:  ["Holland Lop", "Mini Rex", "Angora", "Lionhead", "Dutch", "Flemish Giant", "Rex", "Netherland Dwarf", "English Spot", "Mini Lop", "Diğer"],
  hamster: ["Suriye Hamsteri", "Dwarf Campbell", "Roborovski", "Çin Hamsteri", "Winter White", "Teddy Bear", "Panda Hamster", "Black Bear", "Avrupa Hamsteri", "Angora Hamster", "Diğer"],
  fish:    ["Japon Balığı", "Koi", "Betta", "Guppy", "Melek Balığı", "Diskus", "Oscar", "Neon Tetra", "Cichlid", "Bıyıklı Balık", "Diğer"],
  reptile: ["Leopar Gekko", "Yeşil İguana", "Çöl İguanası", "Kaplumbağa", "Su Kaplumbağası", "Kral Yılanı", "Corn Snake", "Mavi Dilli Skink", "Kameleon", "Sakal Ejderi", "Diğer"],
  other:   ["Kirpi", "Şeker Planeri", "Degu", "Kobay", "Ferret", "Mini Domuz", "Gecko", "Yılan", "Akbaba Papağanı", "Chinchilla", "Diğer"],
};

const GENDERS = [
  { value: "Erkek",    icon: "male" },
  { value: "Dişi",     icon: "female" },
  { value: "Bilinmiyor", icon: "question_mark" },
] as const;

export default function OnboardPage() {
  const router = useRouter();
  const [petType, setPetType] = useState<PetTypeId | null>(null);
  const [breed, setBreed]     = useState("");
  const [gender, setGender]   = useState("");
  const [age, setAge]         = useState("");
  const [phone, setPhone]     = useState("");
  const [bio, setBio]         = useState("");

  const isValid = petType && breed && gender && age && phone;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    router.push("/welcome");
  }

  function handleTypeSelect(id: PetTypeId) {
    setPetType(id);
    setBreed("");
  }

  return (
    <div className="min-h-screen bg-surface font-body text-on-surface">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/20 px-6 py-4 flex items-center gap-4">
        <button onClick={() => router.back()} className="text-on-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-xl font-headline italic text-primary tracking-tight">CiciPet</h1>
        <div className="ml-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-fixed text-on-primary-fixed rounded-full">
            <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
            <span className="text-xs font-bold uppercase tracking-widest">Arena Kaydı</span>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-12">
        {/* Title */}
        <div className="mb-10">
          <h2 className="font-headline text-4xl font-bold italic text-on-surface mb-3">
            Petini <span className="text-primary">Tanıtalım!</span>
          </h2>
          <p className="text-on-surface-variant leading-relaxed">
            Birkaç bilgi gir, podyuma hazır ol.
          </p>
          <div className="w-16 h-1 bg-primary rounded-full mt-4" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Pet Type */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/20">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 bg-primary-fixed rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-on-primary-fixed text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>pets</span>
              </div>
              <h3 className="font-headline text-lg font-bold italic text-on-surface">Evcil Hayvan Türü</h3>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {PET_TYPES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => handleTypeSelect(t.id)}
                  className={`flex flex-col items-center gap-1.5 rounded-2xl p-3 text-xs font-semibold transition-all border-2 ${
                    petType === t.id
                      ? "border-primary bg-primary-fixed/40 text-primary"
                      : "border-outline-variant/20 bg-surface-container-low text-on-surface-variant hover:border-primary/40 hover:bg-primary-fixed/20"
                  }`}
                >
                  <span className="text-2xl">{t.emoji}</span>
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Breed */}
          {petType && (
            <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/20">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 bg-primary-fixed rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-primary-fixed text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>category</span>
                </div>
                <h3 className="font-headline text-lg font-bold italic text-on-surface">Cins</h3>
              </div>
              <div className="relative">
                <select
                  value={breed}
                  onChange={(e) => setBreed(e.target.value)}
                  required
                  className="w-full appearance-none rounded-xl border border-outline-variant/40 px-4 py-3 pr-10 bg-surface-container-low text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
                >
                  <option value="">Cins seçin...</option>
                  {BREEDS[petType].map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
              </div>
            </div>
          )}

          {/* Details */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/20 space-y-6">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 bg-primary-fixed rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-on-primary-fixed text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
              </div>
              <h3 className="font-headline text-lg font-bold italic text-on-surface">Detaylar</h3>
            </div>

            {/* Gender */}
            <div>
              <p className="text-sm font-semibold text-on-surface-variant mb-3">Cinsiyet</p>
              <div className="flex gap-3">
                {GENDERS.map((g) => (
                  <button
                    key={g.value}
                    type="button"
                    onClick={() => setGender(g.value)}
                    className={`flex-1 flex flex-col items-center gap-1.5 rounded-xl py-3 text-sm font-semibold border-2 transition-all ${
                      gender === g.value
                        ? "border-primary bg-primary-fixed/40 text-primary"
                        : "border-outline-variant/20 text-on-surface-variant hover:border-primary/40 hover:bg-primary-fixed/20"
                    }`}
                  >
                    <span className="material-symbols-outlined text-xl">{g.icon}</span>
                    {g.value}
                  </button>
                ))}
              </div>
            </div>

            {/* Age */}
            <div>
              <label htmlFor="age" className="text-sm font-semibold text-on-surface-variant block mb-2">
                Yaş <span className="font-normal">(yıl)</span>
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl">cake</span>
                <input
                  id="age"
                  type="number"
                  min="0"
                  max="30"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="ör. 2"
                  required
                  className="w-full rounded-xl border border-outline-variant/40 pl-10 pr-4 py-3 bg-surface-container-low text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="text-sm font-semibold text-on-surface-variant block mb-2">
                Telefon Numarası
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl">phone</span>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="05XX XXX XX XX"
                  required
                  className="w-full rounded-xl border border-outline-variant/40 pl-10 pr-4 py-3 bg-surface-container-low text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
                />
              </div>
            </div>

            {/* Bio */}
            <div>
              <label htmlFor="bio" className="text-sm font-semibold text-on-surface-variant block mb-2">
                Kısa Bilgi{" "}
                <span className="font-normal text-on-surface-variant/60">(isteğe bağlı)</span>
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-3.5 text-on-surface-variant text-xl">edit_note</span>
                <textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Petinle ilgili eğlenceli bir şey yaz..."
                  rows={3}
                  className="w-full rounded-xl border border-outline-variant/40 pl-10 pr-4 py-3 bg-surface-container-low text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors resize-none"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!isValid}
            className="w-full gala-gradient-gold text-on-primary rounded-full py-5 font-bold text-lg editorial-shadow active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center justify-center gap-2"
          >
            <span>Devam Et</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>

          <p className="text-center text-xs text-on-surface-variant">
            Devam ederek{" "}
            <span className="underline cursor-pointer hover:text-primary transition-colors">Kullanım Koşulları</span>&apos;nı kabul etmiş olursunuz.
          </p>
        </form>
      </main>
    </div>
  );
}
