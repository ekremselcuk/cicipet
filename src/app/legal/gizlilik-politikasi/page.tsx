"use client";
import { useRouter } from "next/navigation";

const SERIF = '"Noto Serif", Georgia, serif';
const FONT  = '"Plus Jakarta Sans", system-ui, sans-serif';
const PRIMARY = "#775a19";

export default function GizlilikPolitikasiPage() {
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
        <h2 style={{ fontFamily: SERIF, fontSize: 28, color: "#1a1209", marginBottom: 8 }}>Gizlilik Politikası</h2>
        <p style={{ color: "#8b7355", fontSize: 13, marginBottom: 32 }}>Son güncelleme: 1 Ocak 2025</p>

        {[
          {
            title: "1. Veri Sorumlusu",
            content: `CiciPet olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında veri sorumlusu sıfatıyla hareket etmekteyiz. İletişim: destek@cicipet.com.tr`,
          },
          {
            title: "2. Toplanan Veriler",
            content: `Aşağıdaki kişisel verilerinizi işlemekteyiz:\n• Kimlik bilgileri: Ad, soyad, kullanıcı adı\n• İletişim bilgileri: E-posta adresi, telefon numarası\n• Konum bilgisi: Şehir/ilçe\n• Profil fotoğrafı ve evcil hayvan fotoğrafları\n• Google hesabı üzerinden giriş yapılması durumunda Google profil bilgileri\n• Platform kullanım verileri ve çerezler`,
          },
          {
            title: "3. Verilerin İşlenme Amaçları",
            content: `Kişisel verileriniz şu amaçlarla işlenmektedir:\n• Hesap oluşturma ve kimlik doğrulama\n• Yarışma süreçlerinin yönetimi\n• Ödül gönderimi için iletişim\n• Platform güvenliğinin sağlanması\n• Yasal yükümlülüklerin yerine getirilmesi`,
          },
          {
            title: "4. Verilerin Paylaşımı",
            content: `Kişisel verileriniz; yasal zorunluluklar dışında üçüncü taraflarla paylaşılmaz. Teknik hizmetler için Google Cloud, Cloudinary ve Vercel gibi altyapı sağlayıcılarla çalışılmaktadır. Bu sağlayıcılar veri işleme anlaşmaları kapsamındadır.`,
          },
          {
            title: "5. Çerezler",
            content: `Platform, oturum yönetimi için zorunlu çerezler kullanmaktadır. Analitik amaçlı çerezler için açık rızanız alınmaktadır. Tarayıcı ayarlarınızdan çerezleri yönetebilirsiniz.`,
          },
          {
            title: "6. Haklarınız",
            content: `KVKK'nın 11. maddesi kapsamında; verilerinize erişim, düzeltme, silme, işlemenin kısıtlanması ve itiraz haklarına sahipsiniz. Bu haklarınızı kullanmak için destek@cicipet.com.tr adresine başvurabilirsiniz.`,
          },
          {
            title: "7. Veri Güvenliği",
            content: `Verileriniz, endüstri standardı şifreleme (TLS/SSL) ile korunmaktadır. Veritabanı erişimleri yetkilendirme sistemleri ile güvence altındadır. Olası veri ihlallerini 72 saat içinde yetkili makamlara bildirmeyi taahhüt ederiz.`,
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
