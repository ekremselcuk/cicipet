"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

const SPECIES = [
  { id: "kedi",      label: "Kedi",      icon: "pets",         fill: false },
  { id: "köpek",    label: "Köpek",     icon: "pets",         fill: true  },
  { id: "kuş",      label: "Kuş",       icon: "cruelty_free", fill: false },
  { id: "tavşan",   label: "Tavşan",    icon: "cabin",        fill: false },
  { id: "hamster",  label: "Hamster",   icon: "mouse",        fill: false },
  { id: "balık",    label: "Balık",     icon: "phishing",     fill: false },
  { id: "sürüngen", label: "Sürüngen",  icon: "bug_report",   fill: false },
  { id: "diğer",    label: "Diğer",     icon: "more_horiz",   fill: false },
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

const PRIMARY   = "#775a19";
const GOLD      = "linear-gradient(135deg, #775a19 0%, #d4ad65 100%)";
const FONT      = '"Plus Jakarta Sans", system-ui, sans-serif';
const SERIF     = '"Noto Serif", Georgia, serif';

// SVG dashed border as data URL
const DASHED_BORDER = `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='16' ry='16' stroke='%23d4ad65' stroke-width='2' stroke-dasharray='8%2c6' stroke-dashoffset='0' stroke-linecap='round'/%3e%3c/svg%3e")`;

export default function OnboardPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedSpecies, setSelectedSpecies] = useState("");
  const [selectedBreed,   setSelectedBreed]   = useState("");
  const [selectedGender,  setSelectedGender]  = useState("");
  const [petName,  setPetName]  = useState("");
  const [petAge,   setPetAge]   = useState("");
  const [phone,    setPhone]    = useState("");
  const [bio,      setBio]      = useState("");
  const [photo,    setPhoto]    = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");

  function handleFileChange(file: File) {
    if (!["image/jpeg","image/png","image/webp"].includes(file.type)) {
      setError("Sadece JPG, PNG veya WEBP dosyaları kabul edilir."); return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Dosya boyutu en fazla 5MB olabilir."); return;
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
    if (!photo)           { setError("Lütfen bir fotoğraf yükleyin."); return; }
    if (!selectedSpecies) { setError("Lütfen hayvan türü seçin."); return; }
    if (!selectedGender)  { setError("Lütfen cinsiyet seçin."); return; }
    setLoading(true);
    setError("");
    try {
      const body = new FormData();
      body.append("petType", selectedSpecies);
      body.append("breed",   selectedBreed);
      body.append("petName", petName);
      body.append("phone",   phone);
      body.append("age",     petAge);
      body.append("gender",  selectedGender);
      body.append("bio",     bio);
      body.append("photo",   photo);
      const res  = await fetch("/api/pets", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Bir hata oluştu."); return; }
      router.push("/welcome");
    } catch {
      setError("Bağlantı hatası. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "13px 16px",
    borderRadius: 12, border: "1.5px solid #e8dfd0",
    fontSize: 15, backgroundColor: "#f5f0e8",
    outline: "none", boxSizing: "border-box",
    fontFamily: FONT, color: "#1a1209",
  };

  const labelStyle: React.CSSProperties = {
    display: "block", fontSize: 12,
    fontWeight: 700, color: "#8b7355",
    textTransform: "uppercase", letterSpacing: "0.08em",
    marginBottom: 8,
  };

  const sectionStyle: React.CSSProperties = {
    marginBottom: 28,
  };

  return (
    <div style={{ backgroundColor: "#faf9f6", minHeight: "100vh", fontFamily: FONT, paddingBottom: 120 }}>

      {/* ── Header ── */}
      <header style={{
        position: "sticky", top: 0, zIndex: 50,
        backgroundColor: "rgba(255,248,239,0.7)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(212,173,101,0.15)",
        padding: "14px 20px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        {/* Geri */}
        <button
          type="button"
          onClick={() => router.back()}
          style={{
            width: 40, height: 40, borderRadius: "50%",
            border: "none", backgroundColor: "rgba(119,90,25,0.08)",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            color: PRIMARY,
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_back</span>
        </button>

        {/* Logo */}
        <h1 style={{
          fontFamily: SERIF, fontStyle: "italic",
          color: "#823b18", fontSize: 22, margin: 0, letterSpacing: "-0.01em",
        }}>
          CiciPet
        </h1>

        {/* Stepper */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 700 }}>
          <span style={{ color: PRIMARY }}>01 Fotoğraf</span>
          <span style={{ color: "#c8b58a" }}>/</span>
          <span style={{ color: "#c8b58a" }}>02 Detaylar</span>
        </div>
      </header>

      <main style={{ maxWidth: 560, margin: "0 auto", padding: "28px 16px" }}>

        {/* ── Sayfa başlığı ── */}
        <div style={{ marginBottom: 28 }}>
          <h2 style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 28, color: "#1a1209", margin: "0 0 6px" }}>
            Petini <span style={{ color: PRIMARY }}>Gala&apos;ya</span> Taşı
          </h2>
          <p style={{ fontSize: 14, color: "#8b7355", margin: 0 }}>
            En güzel fotoğrafını yükle, şampiyonluk yolculuğunu başlat.
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          {/* ── Fotoğraf ── */}
          <div style={sectionStyle}>
            {photoPreview ? (
              <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", height: 256 }}>
                <Image
                  src={photoPreview}
                  alt="Önizleme"
                  fill
                  style={{ objectFit: "cover" }}
                />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.35), transparent)",
                }} />
                <button
                  type="button"
                  onClick={() => { setPhoto(null); setPhotoPreview(""); }}
                  style={{
                    position: "absolute", top: 12, right: 12,
                    width: 34, height: 34, borderRadius: "50%",
                    backgroundColor: "rgba(0,0,0,0.55)", color: "#fff",
                    border: "none", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>close</span>
                </button>
                {/* Rozet */}
                <div style={{
                  position: "absolute", bottom: 14, right: 14,
                  backgroundColor: "#fff", borderRadius: 9999,
                  padding: "5px 12px", fontSize: 11, fontWeight: 700,
                  color: PRIMARY, transform: "rotate(-3deg)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                }}>
                  ✨ Fotoğraf Hazır
                </div>
              </div>
            ) : (
              <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => fileInputRef.current?.click()}
                style={{
                  position: "relative", height: 256, borderRadius: 16,
                  backgroundImage: DASHED_BORDER,
                  backgroundColor: "rgba(255,222,165,0.12)",
                  cursor: "pointer",
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center", gap: 12,
                }}
              >
                <div style={{
                  width: 64, height: 64, borderRadius: "50%",
                  background: GOLD, opacity: 0.9,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 8px 24px rgba(119,90,25,0.25)",
                }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 30, color: "#fff", fontVariationSettings: "'FILL' 1" }}>
                    add_a_photo
                  </span>
                </div>
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontWeight: 700, fontSize: 16, color: "#1a1209", margin: "0 0 4px" }}>
                    Fotoğrafı Buraya Sürükle
                  </p>
                  <p style={{ fontSize: 13, color: "#8b7355", margin: 0 }}>
                    veya tıkla · JPG, PNG, WEBP · Maks. 5MB
                  </p>
                </div>
                {/* Rozet */}
                <div style={{
                  position: "absolute", bottom: 14, right: 14,
                  backgroundColor: PRIMARY, color: "#fff",
                  borderRadius: 9999, padding: "5px 12px",
                  fontSize: 11, fontWeight: 700,
                  transform: "rotate(-3deg)",
                  boxShadow: "0 4px 12px rgba(119,90,25,0.3)",
                }}>
                  Sevgiyi Hisset! 🐾
                </div>
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

          {/* ── Tür seçimi ── */}
          <div style={sectionStyle}>
            <p style={labelStyle}>Evcil Hayvan Türü</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
              {SPECIES.map((s) => {
                const active = selectedSpecies === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => { setSelectedSpecies(s.id); setSelectedBreed(""); }}
                    style={{
                      display: "flex", flexDirection: "column",
                      alignItems: "center", gap: 6,
                      padding: "14px 8px", borderRadius: 14,
                      cursor: "pointer", transition: "all 0.15s",
                      border: active ? "none" : "1.5px solid #e8dfd0",
                      background: active ? GOLD : "#ffffff",
                      color: active ? "#ffffff" : "#5c4a2a",
                      boxShadow: active
                        ? "0 4px 16px rgba(119,90,25,0.3), 0 0 0 3px rgba(212,173,101,0.4)"
                        : "0 1px 4px rgba(0,0,0,0.05)",
                      fontFamily: FONT,
                    }}
                  >
                    <span
                      className="material-symbols-outlined"
                      style={{
                        fontSize: 26,
                        fontVariationSettings: s.fill ? "'FILL' 1" : "'FILL' 0",
                        color: active ? "#fff" : PRIMARY,
                      }}
                    >
                      {s.icon}
                    </span>
                    <span style={{ fontSize: 11, fontWeight: 700 }}>{s.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Cins ── */}
          {selectedSpecies && (
            <div style={sectionStyle}>
              <label style={labelStyle}>Cins</label>
              <div style={{ position: "relative" }}>
                <select
                  value={selectedBreed}
                  onChange={(e) => setSelectedBreed(e.target.value)}
                  style={{ ...inputStyle, paddingRight: 40, appearance: "none", cursor: "pointer" }}
                >
                  <option value="">Cins seçin...</option>
                  {BREEDS[selectedSpecies]?.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
                <span className="material-symbols-outlined" style={{
                  position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                  color: "#8b7355", pointerEvents: "none", fontSize: 20,
                }}>expand_more</span>
              </div>
            </div>
          )}

          {/* ── Pet adı ── */}
          <div style={sectionStyle}>
            <label style={labelStyle}>Petinin Adı</label>
            <div style={{ position: "relative" }}>
              <span className="material-symbols-outlined" style={{
                position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)",
                color: "#c8a96a", fontSize: 18, pointerEvents: "none",
              }}>badge</span>
              <input
                type="text"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                placeholder="ör. Pamuk"
                required
                style={{ ...inputStyle, paddingLeft: 42 }}
              />
            </div>
          </div>

          {/* ── Cinsiyet ── */}
          <div style={sectionStyle}>
            <p style={labelStyle}>Cinsiyet</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                { value: "Erkek", icon: "male",   label: "♂ Erkek" },
                { value: "Dişi",  icon: "female", label: "♀ Dişi"  },
              ].map((g) => {
                const active = selectedGender === g.value;
                return (
                  <button
                    key={g.value}
                    type="button"
                    onClick={() => setSelectedGender(g.value)}
                    style={{
                      padding: "15px", borderRadius: 12, cursor: "pointer",
                      fontWeight: 700, fontSize: 15,
                      background: active ? GOLD : "#ffffff",
                      color: active ? "#ffffff" : "#5c4a2a",
                      boxShadow: active
                        ? "0 4px 16px rgba(119,90,25,0.3)"
                        : "0 1px 4px rgba(0,0,0,0.06)",
                      border: active ? "none" : "1.5px solid #e8dfd0",
                      transition: "all 0.15s",
                      fontFamily: FONT,
                    } as React.CSSProperties}
                  >
                    {g.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Yaş ── */}
          <div style={sectionStyle}>
            <label style={labelStyle}>Yaşı</label>
            <div style={{ position: "relative" }}>
              <span className="material-symbols-outlined" style={{
                position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)",
                color: "#c8a96a", fontSize: 18, pointerEvents: "none",
              }}>cake</span>
              <input
                type="number" min="0" max="30"
                value={petAge}
                onChange={(e) => setPetAge(e.target.value)}
                placeholder="ör. 2"
                required
                style={{ ...inputStyle, paddingLeft: 42 }}
              />
            </div>
          </div>

          {/* ── Telefon ── */}
          <div style={sectionStyle}>
            <label style={labelStyle}>Telefon Numarası</label>
            <div style={{ position: "relative" }}>
              <span className="material-symbols-outlined" style={{
                position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)",
                color: "#c8a96a", fontSize: 18, pointerEvents: "none",
              }}>phone</span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="05XX XXX XX XX"
                required
                style={{ ...inputStyle, paddingLeft: 42 }}
              />
            </div>
          </div>

          {/* ── Hikaye / Bio ── */}
          <div style={sectionStyle}>
            <label style={labelStyle}>
              Hikayesi{" "}
              <span style={{ fontWeight: 400, textTransform: "none", color: "#b8a07a" }}>(isteğe bağlı)</span>
            </label>
            <div style={{ position: "relative" }}>
              <span className="material-symbols-outlined" style={{
                position: "absolute", right: 14, bottom: 14,
                fontSize: 36, color: "rgba(212,173,101,0.2)",
                pointerEvents: "none", fontVariationSettings: "'FILL' 1",
                userSelect: "none",
              }}>format_quote</span>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="En sevdiği oyuncak, alışkanlıkları, komik anıları..."
                rows={4}
                style={{
                  ...inputStyle,
                  resize: "vertical",
                  lineHeight: 1.7,
                  backgroundColor: "#f0e8d8",
                }}
              />
            </div>
          </div>

          {/* ── Hata ── */}
          {error && (
            <div style={{
              display: "flex", alignItems: "center", gap: 10,
              backgroundColor: "#fff0f0", border: "1px solid #fbc8c8",
              borderRadius: 12, padding: "12px 16px",
              color: "#c0392b", fontSize: 14, marginBottom: 20,
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: 18, fontVariationSettings: "'FILL' 1" }}>error</span>
              {error}
            </div>
          )}

        </form>
      </main>

      {/* ── Fixed footer butonu ── */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 40,
        padding: "16px 16px 32px",
        background: "linear-gradient(to top, rgba(250,249,246,1) 60%, rgba(250,249,246,0))",
      }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: "100%", padding: "18px 24px",
              background: loading ? "#c8b98a" : GOLD,
              color: "#ffffff", border: "none",
              borderRadius: 9999, fontWeight: 700,
              fontSize: 17, cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "0 8px 32px rgba(119,90,25,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
              fontFamily: FONT, transition: "all 0.15s",
            }}
          >
            {loading ? (
              <>
                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>progress_activity</span>
                Yükleniyor...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined" style={{ fontSize: 20, fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                Gala&apos;ya Gönder
              </>
            )}
          </button>
        </div>
      </div>

    </div>
  );
}
