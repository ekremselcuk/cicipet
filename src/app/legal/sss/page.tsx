"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SERIF = '"Noto Serif", Georgia, serif';
const FONT  = '"Plus Jakarta Sans", system-ui, sans-serif';
const PRIMARY = "#775a19";

const FAQS = [
  {
    q: "CiciPet nedir?",
    a: "CiciPet, Türkiye'nin evcil hayvan tutkunlarına özel dijital yarışma platformudur. Petinizi kaydedip fotoğraflarını paylaşarak yarışmalara katılabilir, oy toplayabilir ve heyecan verici ödüller kazanabilirsiniz.",
  },
  {
    q: "Nasıl katılabilirim?",
    a: "Google hesabınızla giriş yaparak, evcil hayvanınızın bilgilerini ve fotoğrafını yükleyerek kayıt olabilirsiniz. Kayıt tamamen ücretsizdir.",
  },
  {
    q: "Hangi hayvanlar yarışabilir?",
    a: "Kedi, köpek, kuş, tavşan, hamster, balık, sürüngen ve diğer evcil hayvanlar yarışmaya katılabilir. Fotoğrafın net ve hayvanın açıkça görünmesi gerekmektedir.",
  },
  {
    q: "Fotoğraf nasıl yüklenir?",
    a: "Onboard sayfasında 'Fotoğrafını Sürükle' alanına fotoğrafınızı sürükleyebilir ya da alana tıklayarak galerinizden seçebilirsiniz. JPG, PNG ve WEBP formatları desteklenir, maksimum boyut 5MB'dır.",
  },
  {
    q: "Fotoğrafım neden reddedildi?",
    a: "Fotoğraflar yapay zeka destekli moderasyon sistemimizden geçmektedir. Evcil hayvanın fotoğrafta net görünmemesi, uygunsuz içerik içermesi veya görüntü kalitesinin düşük olması reddedilme nedenlerinden olabilir.",
  },
  {
    q: "Yarışmada nasıl oy kullanılır?",
    a: "Platform içindeki aktif yarışmalara göz atarak beğendiğiniz pet profiline oy verebilirsiniz. Her kullanıcı bir yarışmada bir kez oy kullanabilir.",
  },
  {
    q: "Ödüller nelerdir?",
    a: "Ödüller yarışmaya göre değişmekle birlikte; kaliteli mama paketleri, aksesuar seti, pet mağazası hediye çekleri ve sponsor ürünleri gibi çeşitli ödüller sunulmaktadır.",
  },
  {
    q: "Ödülüm ne zaman gelir?",
    a: "Yarışma sonuçlanmasının ardından kazananlar duyurulur. Kazananların iletişim bilgilerinin doğrulanmasının ardından ödüller 30 iş günü içinde kargoya verilir.",
  },
  {
    q: "Hesabımı nasıl silebilirim?",
    a: "Hesabınızı silmek için destek@cicipet.com.tr adresine 'Hesap Silme Talebi' konusuyla e-posta gönderebilirsiniz. Talebiniz 7 iş günü içinde işleme alınır.",
  },
  {
    q: "Kişisel verilerim güvende mi?",
    a: "Kişisel verileriniz 6698 sayılı KVKK kapsamında korunmaktadır. Verileriniz endüstri standardı şifreleme ile güvence altındadır ve üçüncü taraflarla yasal zorunluluklar dışında paylaşılmaz. Detaylar için Gizlilik Politikamızı inceleyebilirsiniz.",
  },
  {
    q: "Bir sorunu nasıl bildirebilirim?",
    a: "Teknik sorunlar, kural ihlalleri veya şüpheli içerikler için destek@cicipet.com.tr adresine yazabilirsiniz. Ekibimiz en kısa sürede geri dönüş yapacaktır.",
  },
];

export default function SssPage() {
  const router = useRouter();
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div style={{ backgroundColor: "#faf9f6", minHeight: "100vh", fontFamily: FONT }}>
      <header style={{
        position: "sticky", top: 0, zIndex: 50,
        backgroundColor: "rgba(255,248,239,0.9)", backdropFilter: "blur(16px)",
        borderBottom: "1px solid #e8dfd0", padding: "14px 20px",
        display: "flex", alignItems: "center", gap: 12,
      }}>
        <button onClick={() => router.back()} style={{
          width: 36, height: 36, borderRadius: "50%", border: "none",
          backgroundColor: "rgba(119,90,25,0.08)", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", color: PRIMARY,
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_back</span>
        </button>
        <h1 style={{ fontFamily: SERIF, fontStyle: "italic", color: PRIMARY, fontSize: 20, margin: 0 }}>CiciPet</h1>
      </header>

      <main style={{ maxWidth: 720, margin: "0 auto", padding: "40px 24px 80px" }}>
        <h2 style={{ fontFamily: SERIF, fontSize: 28, color: "#1a1209", marginBottom: 8 }}>Sıkça Sorulan Sorular</h2>
        <p style={{ color: "#8b7355", fontSize: 13, marginBottom: 32 }}>Aklınızdaki soruların cevaplarını burada bulabilirsiniz.</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {FAQS.map((faq, i) => (
            <div key={i} style={{
              backgroundColor: "#ffffff",
              borderRadius: 12,
              border: `1px solid ${openIdx === i ? "#d4ad65" : "#e8dfd0"}`,
              overflow: "hidden",
              transition: "border-color 0.15s",
            }}>
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                style={{
                  width: "100%", padding: "16px 20px",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  background: "none", border: "none", cursor: "pointer",
                  fontFamily: FONT, textAlign: "left",
                }}
              >
                <span style={{ fontWeight: 600, fontSize: 15, color: "#1a1209" }}>{faq.q}</span>
                <span className="material-symbols-outlined" style={{
                  fontSize: 20, color: PRIMARY, flexShrink: 0, marginLeft: 12,
                  transform: openIdx === i ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s",
                }}>expand_more</span>
              </button>
              {openIdx === i && (
                <div style={{
                  padding: "0 20px 16px",
                  fontSize: 14, color: "#3a2f1e", lineHeight: 1.8,
                  borderTop: "1px solid #f0e8d8",
                }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 48, textAlign: "center",
          padding: "24px", backgroundColor: "#fff8ed",
          borderRadius: 16, border: "1px solid #e8c97a",
        }}>
          <p style={{ color: "#5c4010", fontSize: 14, margin: "0 0 8px", fontWeight: 600 }}>Aradığınızı bulamadınız mı?</p>
          <p style={{ color: "#8b6030", fontSize: 13, margin: 0 }}>
            destek@cicipet.com.tr adresinden bize ulaşın, en kısa sürede yardımcı olalım.
          </p>
        </div>
      </main>
    </div>
  );
}
