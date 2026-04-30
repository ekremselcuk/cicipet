"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
  other:   ["Kirpi", "Şeker Planeri", "Degu", "Çin Faresi", "Kobay", "Ferret", "Mini Domuz", "Iguana", "Akıncı Kuş", "Gecko", "Diğer"],
};

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
    <main className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 py-12 px-4">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">🐾</div>
          <h1 className="text-2xl font-black text-gray-900">Petini Tanıtalım!</h1>
          <p className="text-gray-500 text-sm mt-1">Birkaç bilgi gir, yarışmaya hazır ol.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Pet Type */}
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <label className="block font-bold text-gray-800 mb-4">Evcil Hayvan Türü</label>
            <div className="grid grid-cols-4 gap-2">
              {PET_TYPES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => handleTypeSelect(t.id)}
                  className={`flex flex-col items-center gap-1 rounded-2xl p-3 text-xs font-semibold transition-all border-2 ${
                    petType === t.id
                      ? "border-orange-500 bg-orange-50 text-orange-700"
                      : "border-transparent bg-gray-50 text-gray-600 hover:bg-orange-50"
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
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <label className="block font-bold text-gray-800 mb-3" htmlFor="breed">
                Cins
              </label>
              <select
                id="breed"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-800 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="">Cins seçin...</option>
                {BREEDS[petType].map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
          )}

          {/* Details */}
          <div className="bg-white rounded-3xl p-6 shadow-sm space-y-4">
            <label className="block font-bold text-gray-800 mb-1">Detaylar</label>

            {/* Gender */}
            <div>
              <p className="text-sm text-gray-600 mb-2">Cinsiyet</p>
              <div className="flex gap-3">
                {["Erkek", "Dişi", "Bilinmiyor"].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGender(g)}
                    className={`flex-1 rounded-xl py-2 text-sm font-semibold border-2 transition-all ${
                      gender === g
                        ? "border-orange-500 bg-orange-50 text-orange-700"
                        : "border-gray-200 text-gray-600 hover:bg-orange-50"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Age */}
            <div>
              <label htmlFor="age" className="text-sm text-gray-600 block mb-1">
                Yaş (yıl olarak)
              </label>
              <input
                id="age"
                type="number"
                min="0"
                max="30"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="ör. 2"
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="text-sm text-gray-600 block mb-1">
                Telefon Numarası
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="05XX XXX XX XX"
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* Bio */}
            <div>
              <label htmlFor="bio" className="text-sm text-gray-600 block mb-1">
                Kısa Bilgi <span className="text-gray-400">(isteğe bağlı)</span>
              </label>
              <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Petinle ilgili eğlenceli bir şey yaz..."
                rows={3}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className="w-full rounded-full bg-orange-500 py-4 text-white font-black text-lg shadow-md hover:bg-orange-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Devam Et →
          </button>
        </form>
      </div>
    </main>
  );
}
