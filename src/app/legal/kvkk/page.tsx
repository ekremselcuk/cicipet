"use client";
import { useRouter } from "next/navigation";

const SERIF = '"Noto Serif", Georgia, serif';
const FONT  = '"Plus Jakarta Sans", system-ui, sans-serif';
const PRIMARY = "#775a19";

export default function KvkkPage() {
  const router = useRouter();
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
        <h2 style={{ fontFamily: SERIF, fontSize: 28, color: "#1a1209", marginBottom: 8 }}>KVKK Aydınlatma Metni</h2>
        <p style={{ color: "#8b7355", fontSize: 13, marginBottom: 32 }}>6698 Sayılı Kişisel Verilerin Korunması Kanunu Kapsamında · Son güncelleme: 1 Ocak 2025</p>

        {[
          {
            title: "Veri Sorumlusu",
            content: `CiciPet, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca veri sorumlusu sıfatına sahiptir.\n\nİletişim: destek@cicipet.com.tr\nWeb: cicipet.com.tr`,
          },
          {
            title: "Kişisel Verilerin İşlenme Amacı",
            content: `Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:\n• Platform üyeliğinin oluşturulması ve yönetimi\n• Yarışma süreçlerinin yürütülmesi\n• Ödül teslimatlarının gerçekleştirilmesi\n• Hizmet kalitesinin iyileştirilmesi\n• Yasal yükümlülüklerin yerine getirilmesi\n• Platform güvenliğinin sağlanması`,
          },
          {
            title: "İşlenen Kişisel Veriler",
            content: `İşlenen kişisel veri kategorileri:\n• Kimlik: Ad, soyad, kullanıcı adı\n• İletişim: E-posta, telefon numarası\n• Konum: Şehir/ilçe bilgisi\n• Görsel: Profil fotoğrafı, evcil hayvan fotoğrafları\n• İşlem güvenliği: IP adresi, oturum bilgileri\n• Pazarlama: Yarışma katılım tercihleri`,
          },
          {
            title: "Kişisel Verilerin Aktarıldığı Taraflar",
            content: `Kişisel verileriniz:\n• Teknik altyapı sağlayıcıları (Google Cloud, Cloudinary, Vercel) — hizmet alımı amacıyla\n• Kargo ve lojistik şirketleri — ödül teslimatı amacıyla\n• Yetkili kamu kurum ve kuruluşları — yasal zorunluluk halinde\nile paylaşılabilmektedir.`,
          },
          {
            title: "Kişisel Verilerin Toplanma Yöntemi ve Hukuki Sebebi",
            content: `Kişisel verileriniz; Platform'a üye olmanız, yarışmaya katılmanız veya Platform'u kullanmanız suretiyle elektronik ortamda toplanmaktadır. İşlemenin hukuki dayanakları KVKK m.5/2-(c) sözleşmenin ifası, m.5/2-(ç) hukuki yükümlülük ve m.5/1 açık rızadır.`,
          },
          {
            title: "KVKK Kapsamındaki Haklarınız",
            content: `KVKK'nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:\n• Kişisel verilerinizin işlenip işlenmediğini öğrenme\n• İşlenmişse bilgi talep etme\n• İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme\n• Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri öğrenme\n• Eksik veya yanlış işlenmişse düzeltilmesini isteme\n• Silinmesini veya yok edilmesini isteme\n• Otomatik sistemler ile analiz edilmesi sonucu aleyhinize çıkan kararın itiraz edilmesi\n• Zararın giderilmesini talep etme\n\nBaşvurularınız için: destek@cicipet.com.tr`,
          },
        ].map((section) => (
          <section key={section.title} style={{ marginBottom: 28 }}>
            <h3 style={{ fontFamily: SERIF, fontSize: 17, color: PRIMARY, marginBottom: 8 }}>{section.title}</h3>
            <p style={{ color: "#3a2f1e", lineHeight: 1.8, fontSize: 15, whiteSpace: "pre-line" }}>{section.content}</p>
          </section>
        ))}
      </main>
    </div>
  );
}
