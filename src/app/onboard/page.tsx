"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

const SPECIES = [
  { id: "kedi",     emoji: "🐱", label: "Kedi" },
  { id: "köpek",   emoji: "🐶", label: "Köpek" },
  { id: "kuş",     emoji: "🐦", label: "Kuş" },
  { id: "tavşan",  emoji: "🐰", label: "Tavşan" },
  { id: "hamster", emoji: "🐹", label: "Hamster" },
  { id: "balık",   emoji: "🐟", label: "Balık" },
  { id: "sürüngen",emoji: "🦎", label: "Sürüngen" },
  { id: "diğer",   emoji: "🐾", label: "Diğer" },
];

const BREEDS: Record<string, string[]> = {
  kedi:      ["Van Kedisi","Ankara Kedisi","British Shorthair","Persian","Scottish Fold","Ragdoll","Siamese","Maine Coon","Sphynx","Diğer"],
  köpek:     ["Golden Retriever","Labrador","Alman Çoban","Bulldog","Poodle","Chihuahua","Husky","Beagle","Rottweiler","Diğer"],
  kuş:       ["Muhabbet Kuşu","Papağan","Kanarya","Sultan Papağanı","Cennet Papağanı","Jako","Amazon","Macaw","Finch","Diğer"],
  tavşan:    ["Holland Lop","Mini Rex","Angora","Lionhead","Dutch","Rex","Flemish Giant","Himalayan","Polish","Diğer"],
  hamster:   ["Suriye","Dwarf","Roborovski","Chinese","Campbell","Winter White","Hybrid","Teddy Bear","Black Bear","Diğer"],
  balık:     ["Japon Balığı","Betta","Guppy","Oscar","Diskus","Neon Tetra","Koi","Melek Balığı","Cichlid","Diğer"],
  sürüngen:  ["Kaplumbağa","Leopar Gekko","Kınkanatlı","İguana","Kral Yılanı","Korn Yılanı","Sakal Ejderi","Bukalemun","Skink","Diğer"],
  diğer:     ["Diğer"],
};

const GOLD = "linear-gradient(135deg, #775a19 0%, #d4ad65 100%)";
const PRIMARY = "#775a19";

export default function OnboardPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedSpecies, setSelectedSpecies] = useState("");
  const [selectedBreed, setSelectedBreed]     = useState("");
  const [selectedGender, setSelectedGender]   = useState("");
  const [petName, setPetName]                 = useState("");
  const [petAge, setPetAge]                   = useState("");
  const [phone, setPhone]                     = useState("");
  const [bio, setBio]                         = useState("");
  const [photo, setPhoto]                     = useState<File | null>(null);
  const [photoPreview, setPhotoPreview]       = useState("");
  const [loading, setLoading]                 = useState(false);
  const [error, setError]                     = useState("");

  function handleFileChange(file: File) {
    if (!["image/jpeg","image/png","image/webp"].includes(file.type)) {
      setError("Sadece JPG, PNG veya WEBP dosyaları kabul edilir.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Dosya boyutu en fazla 5MB olabilir.");
      return;
    }
    setError("");
    setPhoto(file);
    const reader = new FileReader();
    reader.onload = (e) => setPhotoPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) handleFileChange(f);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!photo) { setError("Lütfen bir fotoğraf yükleyin."); return; }
    if (!selectedSpecies) { setError("Lütfen hayvan türü seçin."); return; }
    if (!selectedGender) { setError("Lütfen cinsiyet seçin."); return; }

    setLoading(true);
    setError("");
    try {
      const body = new FormData();
      body.append("petType",  selectedSpecies);
      body.append("breed",    selectedBreed);
      body.append("petName",  petName);
      body.append("phone",    phone);
      body.append("age",      petAge);
      body.append("gender",   selectedGender);
      body.append("bio",      bio);
      body.append("photo",    photo);

      const res = await fetch("/api/pets", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Bir hata oluştu."); return; }
      router.push("/welcome");
    } catch {
      setError("Bağlantı hatası. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }

  const cardStyle = {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 24,
    boxShadow: "0 2px 12px rgba(119,90,25,0.08)",
    marginBottom: 16,
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: 12,
    border: "1.5px solid #e2d9c8",
    fontSize: 16,
    backgroundColor: "#faf9f6",
    outline: "none",
    boxSizing: "border-box" as const,
  };

  const labelStyle = {
    display: "block",
    fontSize: 13,
    fontWeight: 600,
    color: "#4d4635",
    marginBottom: 8,
  };

  return (
    <div style={{ backgroundColor: "#faf9f6", minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>

      {/* Header */}
      <header style={{
        position: "sticky", top: 0, zIndex: 50,
        backgroundColor: "rgba(250,249,246,0.9)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid #e2d9c8",
        padding: "16px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <h1 style={{ fontFamily: "Georgia, serif", fontStyle: "italic", color: PRIMARY, fontSize: 24, margin: 0 }}>
          CiciPet
        </h1>
        {session && (
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            style={{ fontSize: 13, color: "#4d4635", background: "none", border: "none", cursor: "pointer" }}
          >
            Çıkış
          </button>
        )}
      </header>

      <main style={{ maxWidth: 600, margin: "0 auto", padding: "32px 16px 64px" }}>

        <h2 style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: 32, color: "#1a1c1a", marginBottom: 8 }}>
          Petini <span style={{ color: PRIMARY }}>Tanıtalım!</span>
        </h2>
        <p style={{ color: "#4d4635", marginBottom: 32 }}>Birkaç bilgi gir, podyuma hazır ol.</p>

        <form onSubmit={handleSubmit}>

          {/* Fotoğraf */}
          <div style={cardStyle}>
            <p style={{ ...labelStyle, fontSize: 15, marginBottom: 16 }}>📷 Fotoğraf Yükle</p>
            {photoPreview ? (
              <div style={{ position: "relative" }}>
                <Image
                  src={photoPreview}
                  alt="Önizleme"
                  width={560}
                  height={320}
                  style={{ width: "100%", height: 220, objectFit: "cover", borderRadius: 12 }}
                />
                <button
                  type="button"
                  onClick={() => { setPhoto(null); setPhotoPreview(""); }}
                  style={{
                    position: "absolute", top: 8, right: 8,
                    background: "rgba(0,0,0,0.5)", color: "#fff",
                    border: "none", borderRadius: 9999, width: 32, height: 32,
                    cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >✕</button>
              </div>
            ) : (
              <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => fileInputRef.current?.click()}
                style={{
                  border: "2px dashed #d0c5af",
                  borderRadius: 12, padding: "40px 24px",
                  textAlign: "center", cursor: "pointer",
                  backgroundColor: "#faf9f6",
                }}
              >
                <div style={{ fontSize: 40, marginBottom: 12 }}>☁️</div>
                <p style={{ fontWeight: 600, color: "#1a1c1a", marginBottom: 4 }}>Fotoğrafını Sürükle</p>
                <p style={{ fontSize: 13, color: "#4d4635" }}>veya tıkla, galerinden seç • JPG, PNG, WEBP • Maks. 5MB</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  style={{ display: "none" }}
                  onChange={(e) => { if (e.target.files?.[0]) handleFileChange(e.target.files[0]); }}
                />
              </div>
            )}
          </div>

          {/* Tür seçimi */}
          <div style={cardStyle}>
            <p style={{ ...labelStyle, fontSize: 15, marginBottom: 16 }}>🐾 Evcil Hayvan Türü</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
              {SPECIES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => { setSelectedSpecies(s.id); setSelectedBreed(""); }}
                  style={{
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                    padding: "12px 8px", borderRadius: 12, cursor: "pointer",
                    border: selectedSpecies === s.id ? "3px solid #775a19" : "2px solid #e2d9c8",
                    backgroundColor: selectedSpecies === s.id ? "#ffdea5" : "#ffffff",
                    fontSize: 12, fontWeight: 600, color: selectedSpecies === s.id ? PRIMARY : "#4d4635",
                    transition: "all 0.15s",
                  }}
                >
                  <span style={{ fontSize: 24 }}>{s.emoji}</span>
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cins dropdown */}
          {selectedSpecies && (
            <div style={cardStyle}>
              <label style={labelStyle}>Cins</label>
              <select
                value={selectedBreed}
                onChange={(e) => setSelectedBreed(e.target.value)}
                style={{ ...inputStyle, appearance: "none" as const }}
              >
                <option value="">Cins seçin...</option>
                {BREEDS[selectedSpecies]?.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
          )}

          {/* Pet adı */}
          <div style={cardStyle}>
            <label style={labelStyle}>Petinin Adı</label>
            <input
              type="text"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              placeholder="ör. Pamuk"
              required
              style={inputStyle}
            />
          </div>

          {/* Cinsiyet */}
          <div style={cardStyle}>
            <p style={{ ...labelStyle, marginBottom: 16 }}>Cinsiyet</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {["Erkek", "Dişi"].map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setSelectedGender(g)}
                  style={{
                    padding: "16px", borderRadius: 12, cursor: "pointer",
                    fontWeight: 700, fontSize: 15, border: "none",
                    background: selectedGender === g ? GOLD : "#ffffff",
                    color: selectedGender === g ? "#ffffff" : "#4d4635",
                    boxShadow: selectedGender === g
                      ? "0 4px 16px rgba(119,90,25,0.25)"
                      : "0 1px 4px rgba(0,0,0,0.08)",
                    transition: "all 0.15s",
                  }}
                >
                  {g === "Erkek" ? "♂ Erkek" : "♀ Dişi"}
                </button>
              ))}
            </div>
          </div>

          {/* Yaş */}
          <div style={cardStyle}>
            <label style={labelStyle}>Yaşı</label>
            <input
              type="number"
              value={petAge}
              onChange={(e) => setPetAge(e.target.value)}
              placeholder="ör. 2"
              min="0" max="30"
              required
              style={inputStyle}
            />
          </div>

          {/* Telefon */}
          <div style={cardStyle}>
            <label style={labelStyle}>Telefon Numarası</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="05XX XXX XX XX"
              required
              style={inputStyle}
            />
          </div>

          {/* Bio */}
          <div style={cardStyle}>
            <label style={labelStyle}>
              Kısa Bilgi <span style={{ fontWeight: 400, color: "#a89a7a" }}>(isteğe bağlı)</span>
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="En sevdiği oyuncak, alışkanlıkları..."
              rows={3}
              style={{ ...inputStyle, resize: "vertical" as const, lineHeight: 1.6 }}
            />
          </div>

          {/* Hata */}
          {error && (
            <div style={{
              backgroundColor: "#fff0f0", border: "1px solid #f5c6c6",
              borderRadius: 12, padding: "12px 16px",
              color: "#c0392b", fontSize: 14, marginBottom: 16,
            }}>
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%", padding: "20px",
              background: loading ? "#c8b98a" : GOLD,
              color: "#ffffff", border: "none",
              borderRadius: 9999, fontWeight: "bold",
              fontSize: 18, cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "0 8px 24px rgba(119,90,25,0.25)",
              transition: "all 0.15s",
            }}
          >
            {loading ? "Yükleniyor..." : "Yarışmaya Katıl →"}
          </button>

          <p style={{ textAlign: "center", fontSize: 12, color: "#a89a7a", marginTop: 16 }}>
            Devam ederek Kullanım Koşulları&apos;nı kabul etmiş olursunuz.
          </p>

        </form>
      </main>
    </div>
  );
}
