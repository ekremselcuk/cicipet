"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { containsProfanity } from "@/lib/textModeration";

// ── Sabit veriler ─────────────────────────────────────────────────────────────

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
  cat:     ["Van Kedisi","Ankara Kedisi","British Shorthair","Persian","Maine Coon","Ragdoll","Scottish Fold","Siyam","Bengal","Sphynx","Diğer"],
  dog:     ["Golden Retriever","Labrador","Alman Çoban Köpeği","Husky","Poodle","Beagle","Bulldog","Rottweiler","Chihuahua","Border Collie","Diğer"],
  bird:    ["Muhabbet Kuşu","Papağan","Kanarya","Cennet Papağanı","Kakadu","Macaw","Amazon Papağanı","Afrika Gri Papağanı","Forpus","Sultan Papağanı","Diğer"],
  rabbit:  ["Holland Lop","Mini Rex","Angora","Lionhead","Dutch","Flemish Giant","Rex","Netherland Dwarf","English Spot","Mini Lop","Diğer"],
  hamster: ["Suriye Hamsteri","Dwarf Campbell","Roborovski","Çin Hamsteri","Winter White","Teddy Bear","Panda Hamster","Black Bear","Avrupa Hamsteri","Angora Hamster","Diğer"],
  fish:    ["Japon Balığı","Koi","Betta","Guppy","Melek Balığı","Diskus","Oscar","Neon Tetra","Cichlid","Bıyıklı Balık","Diğer"],
  reptile: ["Leopar Gekko","Yeşil İguana","Çöl İguanası","Kaplumbağa","Su Kaplumbağası","Kral Yılanı","Corn Snake","Mavi Dilli Skink","Kameleon","Sakal Ejderi","Diğer"],
  other:   ["Kirpi","Şeker Planeri","Degu","Kobay","Ferret","Mini Domuz","Gecko","Yılan","Chinchilla","Akbaba Papağanı","Diğer"],
};

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE_MB = 5;

// ── Yardımcı bileşenler ───────────────────────────────────────────────────────

function SectionCard({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/20">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-8 h-8 bg-primary-fixed rounded-full flex items-center justify-center flex-shrink-0">
          <span className="material-symbols-outlined text-on-primary-fixed text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
        </div>
        <h3 className="font-headline text-lg font-bold italic text-on-surface">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function FieldInput({ id, label, icon, optional, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { id: string; label: string; icon: string; optional?: boolean }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-on-surface-variant block mb-2">
        {label}{optional && <span className="font-normal text-on-surface-variant/60 ml-1">(isteğe bağlı)</span>}
      </label>
      <div className="relative">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl pointer-events-none">{icon}</span>
        <input
          id={id}
          className="w-full rounded-xl border border-outline-variant/40 pl-10 pr-4 py-3 bg-surface-container-low text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
          {...props}
        />
      </div>
    </div>
  );
}

// ── Ana bileşen ───────────────────────────────────────────────────────────────

export default function OnboardPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [petType, setPetType]   = useState<PetTypeId | null>(null);
  const [breed, setBreed]       = useState("");
  const [petName, setPetName]   = useState("");
  const [phone, setPhone]       = useState("");
  const [age, setAge]           = useState("");
  const [gender, setGender]     = useState("");
  const [bio, setBio]           = useState("");

  // Photo state
  const [file, setFile]         = useState<File | null>(null);
  const [preview, setPreview]   = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [fileError, setFileError]   = useState<string | null>(null);

  // UI state
  const [bioError, setBioError]         = useState<string | null>(null);
  const [submitError, setSubmitError]   = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ── Dosya işleme ────────────────────────────────────────────────────────────

  const handleFile = useCallback((f: File) => {
    setFileError(null);
    if (!ACCEPTED_TYPES.includes(f.type)) {
      setFileError("Sadece JPG, PNG veya WEBP dosyaları kabul edilir.");
      return;
    }
    if (f.size > MAX_SIZE_MB * 1024 * 1024) {
      setFileError(`Dosya boyutu en fazla ${MAX_SIZE_MB}MB olabilir.`);
      return;
    }
    setFile(f);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(f);
  }, []);

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragActive(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) handleFile(dropped);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setDragActive(true);
  }

  // ── Küfür kontrolü ──────────────────────────────────────────────────────────

  function handleBioBlur() {
    if (bio && containsProfanity(bio)) {
      setBioError("Uygunsuz içerik tespit edildi. Lütfen açıklamanızı düzenleyin.");
    } else {
      setBioError(null);
    }
  }

  // ── Submit ───────────────────────────────────────────────────────────────────

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);

    if (bio && containsProfanity(bio)) {
      setBioError("Uygunsuz içerik tespit edildi.");
      return;
    }
    if (!file) {
      setFileError("Lütfen bir fotoğraf yükleyin.");
      return;
    }

    setIsSubmitting(true);
    try {
      const body = new FormData();
      body.append("petType",  petType!);
      body.append("breed",    breed);
      body.append("petName",  petName);
      body.append("phone",    phone);
      body.append("age",      age);
      body.append("gender",   gender);
      body.append("bio",      bio);
      body.append("photo",    file);

      const res = await fetch("/api/pets", { method: "POST", body });
      const data = await res.json();

      if (!res.ok) {
        setSubmitError(data.error ?? "Bir hata oluştu. Lütfen tekrar deneyin.");
        return;
      }
      router.push("/welcome");
    } catch {
      setSubmitError("Bağlantı hatası. Lütfen tekrar deneyin.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const isValid = petType && breed && petName && phone && age && gender && file && !bioError;

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-surface font-body text-on-surface">

      {/* Header */}
      <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/20 px-6 py-4 flex items-center gap-3">
        <button type="button" onClick={() => router.back()} className="text-on-surface-variant hover:text-primary transition-colors">
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

        {/* Başlık */}
        <div className="mb-10">
          <h2 className="font-headline text-4xl font-bold italic text-on-surface mb-3">
            Petini <span className="text-primary">Tanıtalım!</span>
          </h2>
          <p className="text-on-surface-variant leading-relaxed">Birkaç bilgi gir, podyuma hazır ol.</p>
          <div className="w-16 h-1 bg-primary rounded-full mt-4" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* 1 — Pet Türü */}
          <SectionCard icon="pets" title="Evcil Hayvan Türü">
            <div className="grid grid-cols-4 gap-2">
              {PET_TYPES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => { setPetType(t.id); setBreed(""); }}
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
          </SectionCard>

          {/* 2 — Cins */}
          {petType && (
            <SectionCard icon="category" title="Cins">
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
            </SectionCard>
          )}

          {/* 3 — Temel Bilgiler */}
          <SectionCard icon="info" title="Temel Bilgiler">
            <div className="space-y-4">
              <FieldInput id="petName" label="Petinin Adı" icon="badge" value={petName} onChange={(e) => setPetName(e.target.value)} placeholder="ör. Pamuk" required />
              <FieldInput id="age" label="Yaşı" icon="cake" type="number" min="0" max="30" value={age} onChange={(e) => setAge(e.target.value)} placeholder="ör. 2" required />

              {/* Cinsiyet */}
              <div>
                <p className="text-sm font-semibold text-on-surface-variant mb-3">Cinsiyet</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: "Erkek", icon: "male" },
                    { value: "Dişi",  icon: "female" },
                  ].map((g) => (
                    <button
                      key={g.value}
                      type="button"
                      onClick={() => setGender(g.value)}
                      className={`flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold border-2 transition-all ${
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
            </div>
          </SectionCard>

          {/* 4 — İletişim */}
          <SectionCard icon="phone" title="İletişim">
            <FieldInput id="phone" label="Telefon Numarası" icon="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="05XX XXX XX XX" required />
          </SectionCard>

          {/* 5 — Açıklama */}
          <SectionCard icon="edit_note" title="Kısa Açıklama">
            <div>
              <label htmlFor="bio" className="text-sm font-semibold text-on-surface-variant block mb-2">
                Petinden bahset <span className="font-normal text-on-surface-variant/60">(isteğe bağlı)</span>
              </label>
              <textarea
                id="bio"
                value={bio}
                onChange={(e) => { setBio(e.target.value); if (bioError) setBioError(null); }}
                onBlur={handleBioBlur}
                placeholder="En sevdiği oyuncak, alışkanlıkları, komik anıları..."
                rows={3}
                className={`w-full rounded-xl border px-4 py-3 bg-surface-container-low text-on-surface focus:outline-none focus:ring-2 transition-colors resize-none ${
                  bioError
                    ? "border-error focus:ring-error/40"
                    : "border-outline-variant/40 focus:ring-primary/40 focus:border-primary"
                }`}
              />
              {bioError && (
                <div className="flex items-center gap-2 mt-2 text-error text-sm">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>error</span>
                  {bioError}
                </div>
              )}
            </div>
          </SectionCard>

          {/* 6 — Fotoğraf */}
          <SectionCard icon="photo_camera" title="Fotoğraf Yükle">
            {preview ? (
              <div className="relative">
                {/* Önizleme */}
                <div className="relative aspect-square max-h-72 overflow-hidden rounded-xl bg-surface-container">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={preview} alt="Önizleme" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-white text-sm font-semibold bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full">
                      {file?.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => { setFile(null); setPreview(null); setFileError(null); }}
                      className="bg-black/50 backdrop-blur-sm text-white rounded-full p-1.5 hover:bg-black/70 transition-colors"
                    >
                      <span className="material-symbols-outlined text-lg">close</span>
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-3 text-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-base text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  Fotoğraf hazır
                </div>
              </div>
            ) : (
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={() => setDragActive(false)}
                onClick={() => fileInputRef.current?.click()}
                className={`relative flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed p-10 cursor-pointer transition-all ${
                  dragActive
                    ? "border-primary bg-primary-fixed/20 scale-[1.01]"
                    : "border-outline-variant/40 hover:border-primary/60 hover:bg-primary-fixed/10"
                }`}
              >
                <div className="w-16 h-16 bg-primary-fixed rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-primary-fixed text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>upload</span>
                </div>
                <div className="text-center">
                  <p className="font-headline text-lg italic text-on-surface mb-1">Fotoğrafını Sürükle</p>
                  <p className="text-on-surface-variant text-sm">veya tıkla, galerinden seç</p>
                </div>
                <div className="flex items-center gap-4 text-xs text-on-surface-variant">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">image</span>JPG, PNG, WEBP
                  </span>
                  <span className="w-1 h-1 rounded-full bg-outline-variant" />
                  <span>Maks. {MAX_SIZE_MB}MB</span>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={ACCEPTED_TYPES.join(",")}
                  className="hidden"
                  onChange={(e) => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }}
                />
              </div>
            )}
            {fileError && (
              <div className="flex items-center gap-2 mt-3 text-error text-sm">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>error</span>
                {fileError}
              </div>
            )}
          </SectionCard>

          {/* Genel hata */}
          {submitError && (
            <div className="flex items-start gap-3 p-4 bg-error-container text-on-error-container rounded-2xl text-sm">
              <span className="material-symbols-outlined flex-shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>error</span>
              <span>{submitError}</span>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="w-full gala-gradient-gold text-on-primary rounded-full py-5 font-bold text-lg editorial-shadow active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <span className="material-symbols-outlined animate-spin">progress_activity</span>
                Yükleniyor...
              </>
            ) : (
              <>
                <span>Yarışmaya Katıl</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </>
            )}
          </button>

          <p className="text-center text-xs text-on-surface-variant pb-4">
            Devam ederek{" "}
            <span className="underline cursor-pointer hover:text-primary transition-colors">Kullanım Koşulları</span>&apos;nı kabul etmiş olursunuz.
          </p>

        </form>
      </main>
    </div>
  );
}
