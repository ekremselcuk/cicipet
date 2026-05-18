"use client";
import { useRouter } from "next/navigation";

const SERIF = '"Noto Serif", Georgia, serif';
const FONT  = '"Plus Jakarta Sans", system-ui, sans-serif';
const PRIMARY = "#775a19";

export default function KullanimKosullariPage() {
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
        <h2 style={{ fontFamily: SERIF, fontSize: 28, color: "#1a1209", marginBottom: 8 }}>Kullanım Koşulları</h2>
        <p style={{ color: "#8b7355", fontSize: 13, marginBottom: 32 }}>Son güncelleme: 1 Ocak 2025</p>

        {[
          {
            title: "1. Genel Hükümler",
            content: `CiciPet ("Platform"), cicipet.com.tr alan adı üzerinden hizmet veren, evcil hayvan yarışmaları ve topluluğuna yönelik bir dijital platformdur. Platform'u kullanarak bu Kullanım Koşulları'nı okuduğunuzu, anladığınızı ve kabul ettiğinizi beyan etmiş olursunuz. Bu koşulları kabul etmiyorsanız Platform'u kullanmayınız.`,
          },
          {
            title: "2. Üyelik Koşulları",
            content: `Platform'a üye olmak için 18 yaşını doldurmuş olmanız veya 18 yaşından küçükseniz ebeveyn/vasi onayına sahip olmanız gerekmektedir. Hesap bilgilerinizin doğru, güncel ve eksiksiz olmasından siz sorumlusunuz. Hesabınızı üçüncü şahıslarla paylaşamazsınız.`,
          },
          {
            title: "3. İçerik Kuralları",
            content: `Platform'a yüklediğiniz fotoğraf ve içeriklerin size ait olduğunu ya da kullanım hakkına sahip olduğunuzu beyan edersiniz. Hakaret, küfür, pornografi, şiddet veya uygunsuz içerik barındıran paylaşımlar yasaktır. CiciPet, yapay zeka destekli moderasyon sistemi ile içerikleri denetleme hakkını saklı tutar.`,
          },
          {
            title: "4. Yarışma Kuralları",
            content: `Yarışmalara katılmak için evcil hayvanınızın profil sayfasının eksiksiz doldurulmuş olması gerekir. Her kullanıcı bir yarışmaya en fazla bir pet ile katılabilir. Oy manipülasyonu, sahte hesap kullanımı veya hile tespit edilmesi durumunda diskalifiye edilirsiniz. Ödüller, kazananın iletişim bilgilerinin doğrulanmasının ardından 30 iş günü içinde gönderilir.`,
          },
          {
            title: "5. Fikri Mülkiyet",
            content: `CiciPet markası, logosu, tasarımı ve yazılımı CiciPet'e aittir. Platform üzerindeki kullanıcı içerikleri içerik sahibine ait olmaya devam eder; ancak kullanıcı, CiciPet'e bu içerikleri Platform dahilinde kullanma, görüntüleme ve tanıtım amacıyla paylaşma konusunda münhasır olmayan bir lisans vermektedir.`,
          },
          {
            title: "6. Sorumluluk Sınırlaması",
            content: `CiciPet, kullanıcılar arasındaki anlaşmazlıklardan, üçüncü taraf hizmetlerden kaynaklanan zararlardan veya Platform'un geçici olarak kullanılamaz olmasından sorumlu tutulamaz. Platform "olduğu gibi" sunulmaktadır.`,
          },
          {
            title: "7. Değişiklikler",
            content: `CiciPet, bu Kullanım Koşulları'nı önceden bildirmeksizin değiştirme hakkını saklı tutar. Güncel koşullar cicipet.com.tr/legal/kullanim-kosullari adresinde yayımlanır. Platform'u kullanmaya devam etmeniz, değişiklikleri kabul ettiğiniz anlamına gelir.`,
          },
          {
            title: "8. İletişim",
            content: `Bu koşullarla ilgili sorularınız için: destek@cicipet.com.tr adresine e-posta gönderebilirsiniz.`,
          },
        ].map((section) => (
          <section key={section.title} style={{ marginBottom: 28 }}>
            <h3 style={{ fontFamily: SERIF, fontSize: 17, color: PRIMARY, marginBottom: 8 }}>{section.title}</h3>
            <p style={{ color: "#3a2f1e", lineHeight: 1.8, fontSize: 15 }}>{section.content}</p>
          </section>
        ))}
      </main>
    </div>
  );
}
