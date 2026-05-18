"use client";
import { useRouter } from "next/navigation";

const SERIF = '"Noto Serif", Georgia, serif';
const FONT  = '"Plus Jakarta Sans", system-ui, sans-serif';
const PRIMARY = "#775a19";

export default function AcikRizaPage() {
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
        <h2 style={{ fontFamily: SERIF, fontSize: 28, color: "#1a1209", marginBottom: 8 }}>Açık Rıza Metni</h2>
        <p style={{ color: "#8b7355", fontSize: 13, marginBottom: 32 }}>Son güncelleme: 1 Ocak 2025</p>

        <div style={{
          backgroundColor: "#fff8ed", border: "1px solid #e8c97a",
          borderRadius: 12, padding: "16px 20px", marginBottom: 32,
          fontSize: 14, color: "#5c4010", lineHeight: 1.6,
        }}>
          Bu metin, 6698 sayılı KVKK'nın 5/1. maddesi kapsamında kişisel verilerinizin işlenmesine ilişkin açık rızanızı almak amacıyla hazırlanmıştır.
        </div>

        {[
          {
            title: "İşlenecek Kişisel Veriler",
            content: `Aşağıdaki kişisel verileriniz açık rızanıza dayalı olarak işlenecektir:\n• Profil fotoğrafı (biyometrik veri içermesi halinde özel nitelikli)\n• Evcil hayvan fotoğrafları\n• Telefon numarası\n• Konum bilgisi (şehir/ilçe)\n• Yarışma katılım geçmişi`,
          },
          {
            title: "İşleme Amaçları",
            content: `Yukarıda belirtilen kişisel verileriniz aşağıdaki amaçlarla işlenecektir:\n• CiciPet yarışmalarına katılımınızın sağlanması\n• Kazanmanız halinde ödülün tarafınıza iletilmesi\n• Platform içi sosyal etkileşimlerin gerçekleştirilmesi\n• Tanıtım ve pazarlama faaliyetlerinde örnek paylaşım (fotoğraf/video)\n• Yapay zeka destekli içerik moderasyonu`,
          },
          {
            title: "Aktarım",
            content: `Verileriniz; teknik altyapı hizmetleri kapsamında yurt içi ve yurt dışındaki hizmet sağlayıcılarla (Google Cloud, Cloudinary) paylaşılabilecektir.`,
          },
          {
            title: "Rızanın Geri Alınması",
            content: `Açık rızanızı her zaman geri alabilirsiniz. Bunun için destek@cicipet.com.tr adresine yazabilir veya Platform ayarlarından hesabınızı kapatabilirsiniz. Rızanızın geri alınması, geri alma tarihinden önceki işlemlerin hukuka aykırı hale gelmesine yol açmaz.`,
          },
          {
            title: "Onay",
            content: `"Yarışmaya Katıl" butonuna tıklayarak yukarıda belirtilen kişisel verilerimin, açıklanan amaçlar doğrultusunda işlenmesine özgür irademle, bilgilendirilerek ve açıkça onay verdiğimi kabul ediyorum.`,
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
