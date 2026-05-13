"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

// ── Renk sabitleri ────────────────────────────────────────────────────────────
const C = {
  primary:                "#775a19",
  onPrimary:              "#ffffff",
  primaryContainer:       "#d4ad65",
  primaryFixed:           "#ffdea5",
  onPrimaryFixed:         "#261900",
  surface:                "#faf9f6",
  onSurface:              "#1a1c1a",
  onSurfaceVariant:       "#4d4635",
  surfaceContainer:       "#efeeeb",
  surfaceContainerLow:    "#f4f3f1",
  surfaceContainerHigh:   "#e9e8e5",
  surfaceContainerLowest: "#ffffff",
  secondary:              "#625e51",
  onSecondary:            "#ffffff",
  secondaryContainer:     "#e6dfce",
  tertiary:               "#5f5e5a",
  onTertiary:             "#ffffff",
  tertiaryContainer:      "#b5b3ae",
  onTertiaryContainer:    "#464541",
  outlineVariant:         "#d0c5af",
} as const;

const FONT_HEADLINE = '"Noto Serif", serif';
const FONT_BODY     = '"Plus Jakarta Sans", sans-serif';

// ── JoinButton ────────────────────────────────────────────────────────────────
function JoinButton({ label }: { label: string }) {
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/onboard" })}
      className="gala-gradient-gold editorial-shadow"
      style={{
        color: C.onPrimary,
        padding: "1.25rem 2.5rem",
        borderRadius: "9999px",
        fontWeight: 700,
        fontSize: "1.125rem",
        fontFamily: FONT_BODY,
        border: "none",
        cursor: "pointer",
        display: "inline-block",
      }}
    >
      {label}
    </button>
  );
}

// ── Ana bileşen ───────────────────────────────────────────────────────────────
export default function LandingPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") router.push("/onboard");
  }, [status, router]);

  return (
    <div style={{ backgroundColor: C.surface, fontFamily: FONT_BODY, color: C.onSurface, minHeight: "100dvh" }}>

      {/* ── Header ── */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        backgroundColor: "rgba(250,249,246,0.75)",
        backdropFilter: "blur(20px)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "1rem 1.5rem",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span className="material-symbols-outlined" style={{ color: C.primary, cursor: "pointer" }}>menu</span>
          <h1 style={{ fontFamily: FONT_HEADLINE, fontStyle: "italic", color: C.primary, fontSize: "1.5rem", margin: 0, letterSpacing: "-0.02em" }}>
            CiciPet
          </h1>
        </div>
      </header>

      <main style={{ paddingTop: "6rem", paddingBottom: "8rem" }}>

        {/* ── Hero ── */}
        <section style={{ position: "relative", padding: "3rem 1.5rem", overflow: "hidden" }}>
          <div style={{
            maxWidth: "80rem", margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
            gap: "4rem",
            alignItems: "center",
          }}>
            {/* Sol: Metin */}
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                padding: "0.5rem 1rem",
                backgroundColor: C.primaryFixed, color: C.onPrimaryFixed,
                borderRadius: "9999px", marginBottom: "2rem",
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: "18px", fontVariationSettings: "'FILL' 1" }}>stars</span>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em" }}>
                  Prestijli Arena Açılıyor
                </span>
              </div>

              <h2 style={{
                fontFamily: FONT_HEADLINE, fontWeight: 700, color: C.onSurface,
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                lineHeight: 1.1, marginBottom: "2rem", margin: "0 0 2rem",
              }}>
                Şampiyonluk{" "}
                <span style={{ fontStyle: "italic", color: C.primary }}>Heyecanı</span>{" "}
                Başlıyor!
              </h2>

              <p style={{
                fontSize: "1.125rem", color: C.onSurfaceVariant,
                lineHeight: 1.75, maxWidth: "36rem",
                margin: "0 0 3rem",
              }}>
                Türkiye&apos;nin en sevimli evcil hayvanları burada! Petini kaydet, yarışmalara katıl, harika ödüller kazan.
              </p>

              <JoinButton label="Adaylığınızı Başlatın" />
            </div>

            {/* Sağ: Showcase Frame */}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
              {/* Arka plan ışıkları */}
              <div style={{
                position: "absolute", top: "-6rem", right: "-6rem",
                width: "16rem", height: "16rem",
                backgroundColor: C.primaryFixed, borderRadius: "9999px",
                opacity: 0.1, filter: "blur(100px)", pointerEvents: "none",
              }} />
              <div style={{
                position: "absolute", bottom: "-6rem", left: "-6rem",
                width: "20rem", height: "20rem",
                backgroundColor: C.primary, borderRadius: "9999px",
                opacity: 0.05, filter: "blur(120px)", pointerEvents: "none",
              }} />

              {/* Kart */}
              <div className="frame-glow" style={{
                position: "relative", width: "100%", maxWidth: "420px",
                padding: "1.5rem",
                backgroundColor: C.surfaceContainerLowest,
                borderRadius: "1rem",
                border: `1px solid ${C.outlineVariant}`,
              }}>
                <div style={{
                  position: "relative", aspectRatio: "3/4",
                  overflow: "hidden", borderRadius: "0.5rem",
                  backgroundColor: C.surfaceContainer,
                }}>
                  <Image
                    fill
                    style={{ objectFit: "cover" }}
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPKp6nGfyKvG9QSD9c2luqcRpP0Kb31AUG-5VoHECzFZH6tsU9YvgkRONavrG6p0zEhpJ0dnbWgvQ6HrSq_Gxb-xI1ro88ijANOqP6oma1RXatdI7eB62M7G2SoFAhlOPyZBe2bdAfJqETLMp_4PUAV0JCUj8ESwsVdW_0oZMEbVa0NwIlKOlkN0lp2p8ej_9oIZBjB9gK94thI2u93MXYwwn2B683nLbnN0Ic4s9-ieP9VN3uX4zJwowvfnYLL_SsRMZ8r1Hamg"
                    alt="Altın taç takan şık küçük köpek"
                  />
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.4), transparent)",
                  }} />
                </div>

                {/* Rozet */}
                <div style={{
                  position: "absolute", left: "-1.5rem", bottom: "5rem",
                  backgroundColor: C.primary, color: C.onPrimary,
                  width: "3.5rem", height: "3.5rem", borderRadius: "9999px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
                  transform: "rotate(-12deg)",
                }}>
                  <span className="material-symbols-outlined" style={{ fontSize: "1.75rem" }}>military_tech</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Nasıl Çalışır ── */}
        <section style={{ padding: "5rem 1.5rem", backgroundColor: C.surface }}>
          <div style={{ maxWidth: "56rem", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <h3 style={{ fontFamily: FONT_HEADLINE, fontSize: "2.25rem", fontWeight: 700, fontStyle: "italic", color: C.primary, margin: "0 0 1rem" }}>
                Nasıl Çalışır?
              </h3>
              <div style={{ width: "6rem", height: "4px", backgroundColor: C.primary, margin: "0 auto 1.5rem", borderRadius: "9999px" }} />
              <p style={{ color: C.onSurfaceVariant, fontSize: "1.125rem", margin: 0 }}>3 Kolay Adımda Eğlenceye Katıl</p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
              {/* Adım 1 */}
              <div style={{ position: "relative", padding: "2rem", backgroundColor: C.surfaceContainerLowest, borderRadius: "1rem", border: `1px solid ${C.outlineVariant}` }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "1.5rem" }}>
                  <div style={{ flexShrink: 0, width: "4rem", height: "4rem", backgroundColor: C.primaryContainer, color: C.onPrimaryFixed, borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT_HEADLINE, fontSize: "1.875rem", fontWeight: 700 }}>01</div>
                  <div>
                    <h4 style={{ fontFamily: FONT_HEADLINE, fontSize: "1.5rem", fontWeight: 700, fontStyle: "italic", margin: "0 0 0.75rem" }}>Hemen Kaydol ve Petini Ekle</h4>
                    <p style={{ color: C.onSurfaceVariant, lineHeight: 1.75, margin: 0 }}>Google hesabınızla saniyeler içinde giriş yapın ve patili dostunuzu sisteme kaydedin.</p>
                  </div>
                </div>
                <div style={{ position: "absolute", top: "-1rem", right: "-1rem", width: "3rem", height: "3rem", backgroundColor: C.primaryFixed, color: C.onPrimaryFixed, borderRadius: "9999px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: "1.25rem" }}>person_add</span>
                </div>
              </div>

              {/* Adım 2 */}
              <div style={{ position: "relative", padding: "2rem", backgroundColor: `${C.secondaryContainer}4D`, borderRadius: "1rem", border: `1px solid ${C.outlineVariant}` }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "1.5rem" }}>
                  <div style={{ flexShrink: 0, width: "4rem", height: "4rem", backgroundColor: C.primary, color: C.onPrimary, borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT_HEADLINE, fontSize: "1.875rem", fontWeight: 700 }}>02</div>
                  <div>
                    <h4 style={{ fontFamily: FONT_HEADLINE, fontSize: "1.5rem", fontWeight: 700, fontStyle: "italic", margin: "0 0 0.75rem" }}>Fotoğrafları Yükle ve Beğeni Topla</h4>
                    <p style={{ color: C.onSurfaceVariant, lineHeight: 1.75, margin: 0 }}>Evcil hayvanının en güzel fotoğrafını paylaş, yarışmalara katıl ve beğeni topla.</p>
                  </div>
                </div>
                <div style={{ position: "absolute", top: "-1rem", right: "-1rem", width: "3rem", height: "3rem", backgroundColor: C.secondary, color: C.onSecondary, borderRadius: "9999px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: "1.25rem" }}>photo_camera</span>
                </div>
              </div>

              {/* Adım 3 */}
              <div style={{ position: "relative", padding: "2rem", backgroundColor: C.surfaceContainerHigh, borderRadius: "1rem", border: `1px solid ${C.outlineVariant}` }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "1.5rem" }}>
                  <div style={{ flexShrink: 0, width: "4rem", height: "4rem", backgroundColor: C.tertiary, color: C.onTertiary, borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT_HEADLINE, fontSize: "1.875rem", fontWeight: 700 }}>03</div>
                  <div>
                    <h4 style={{ fontFamily: FONT_HEADLINE, fontSize: "1.5rem", fontWeight: 700, fontStyle: "italic", margin: "0 0 0.75rem" }}>Ödülleri Kap!</h4>
                    <p style={{ color: C.onSurfaceVariant, lineHeight: 1.75, margin: 0 }}>Kazandığın puanlarla mama, aksesuar, tasma ve hediye çeki ödüllerini kap!</p>
                  </div>
                </div>
                <div style={{ position: "absolute", top: "-1rem", right: "-1rem", width: "3rem", height: "3rem", backgroundColor: C.tertiaryContainer, color: C.onTertiaryContainer, borderRadius: "9999px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: "1.25rem", fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA 1 ── */}
        <div style={{ display: "flex", justifyContent: "center", padding: "3rem 1.5rem", backgroundColor: C.surfaceContainerLow }}>
          <JoinButton label="Şimdi Katıl" />
        </div>

        {/* ── Ödüller ── */}
        <section style={{ padding: "5rem 1.5rem", backgroundColor: C.surface }}>
          <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <h3 style={{ fontFamily: FONT_HEADLINE, fontSize: "2.25rem", fontWeight: 700, fontStyle: "italic", color: C.primary, margin: "0 0 1rem" }}>
                Ödüllerimiz
              </h3>
              <div style={{ width: "6rem", height: "4px", backgroundColor: C.primary, margin: "0 auto 1.5rem", borderRadius: "9999px" }} />
              <p style={{ color: C.onSurfaceVariant, fontSize: "1.125rem", margin: 0 }}>Finalistleri Bekleyen Eşsiz Hediyeler</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "2rem" }}>
              {[
                { icon: "pets",                label: "Mama Ödülü",        desc: "En kaliteli ve besleyici mamalarla dolu paketler." },
                { icon: "apparel",             label: "Aksesuar Ödülü",    desc: "Şık tasmalar ve gala kostümleriyle petiniz parlasın." },
                { icon: "confirmation_number", label: "Hediye Çeki Ödülü", desc: "Seçkin pet mağazalarında geçerli alışveriş çekleri." },
                { icon: "card_giftcard",       label: "Sürpriz Hediyeler", desc: "Arena sponsorlarından her hafta yenilenen hediyeler." },
              ].map((prize) => (
                <div key={prize.label} style={{
                  backgroundColor: C.surfaceContainerLowest,
                  padding: "2rem", borderRadius: "9999px",
                  border: `1px solid ${C.primaryFixed}`,
                  display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                }}>
                  <div style={{ width: "5rem", height: "5rem", backgroundColor: C.primaryFixed, borderRadius: "9999px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
                    <span className="material-symbols-outlined" style={{ fontSize: "2.5rem", color: C.onPrimaryFixed, fontVariationSettings: "'FILL' 1" }}>{prize.icon}</span>
                  </div>
                  <h4 style={{ fontFamily: FONT_HEADLINE, fontSize: "1.25rem", fontWeight: 700, fontStyle: "italic", margin: "0 0 0.5rem" }}>{prize.label}</h4>
                  <p style={{ fontSize: "0.875rem", color: C.onSurfaceVariant, margin: 0, lineHeight: 1.6 }}>{prize.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Slogan ── */}
        <section style={{ padding: "6rem 1.5rem", textAlign: "center" }}>
          <h5 style={{ fontFamily: FONT_HEADLINE, fontSize: "clamp(2rem, 5vw, 3.75rem)", color: C.primaryContainer, fontWeight: 300, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 1rem" }}>
            Sevgiyi Hisset!
          </h5>
          <div style={{ width: "6rem", height: "4px", backgroundColor: C.primary, margin: "0 auto", borderRadius: "9999px" }} />
        </section>

        {/* ── CTA 3 ── */}
        <div style={{ display: "flex", justifyContent: "center", paddingBottom: "3rem" }}>
          <JoinButton label="Haydi Şimdi Katıl" />
        </div>
      </main>

      {/* ── Bottom Nav ── */}
      <nav style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50,
        display: "flex", justifyContent: "space-around", alignItems: "center",
        padding: "0.5rem 1rem 1.5rem",
        backgroundColor: "rgba(250,249,246,0.85)",
        backdropFilter: "blur(24px)",
        borderTopLeftRadius: "3rem", borderTopRightRadius: "3rem",
        boxShadow: "0 -4px 40px rgba(26,28,26,0.06)",
      }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", color: C.primary, backgroundColor: "#fff", borderRadius: "9999px", padding: "0.5rem 1rem" }}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>explore</span>
          <span style={{ fontSize: "0.625rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Keşfet</span>
        </div>
        {[
          { icon: "emoji_events", label: "Yarışma" },
          { icon: "military_tech", label: "Ödüller" },
          { icon: "person", label: "Profil" },
        ].map((item) => (
          <div key={item.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", color: "#a8a29e" }}>
            <span className="material-symbols-outlined">{item.icon}</span>
            <span style={{ fontSize: "0.625rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{item.label}</span>
          </div>
        ))}
      </nav>

      {/* ── FAB ── */}
      <button
        onClick={() => signIn("google", { callbackUrl: "/onboard" })}
        className="gala-gradient-gold"
        style={{
          position: "fixed", right: "1.5rem", bottom: "8rem", zIndex: 40,
          width: "4rem", height: "4rem", borderRadius: "9999px",
          color: C.onPrimary, border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 20px 25px -5px rgba(0,0,0,0.15)",
        }}
      >
        <span className="material-symbols-outlined" style={{ fontSize: "1.75rem" }}>add</span>
      </button>
    </div>
  );
}
