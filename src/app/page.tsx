"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function JoinButton({ label }: { label: string }) {
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/onboard" })}
      className="gala-gradient-gold text-on-primary px-10 py-5 rounded-full font-bold text-lg editorial-shadow active:scale-95 transition-transform"
    >
      {label}
    </button>
  );
}

export default function LandingPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") router.push("/onboard");
  }, [status, router]);

  return (
    <div className="bg-surface font-body text-on-surface selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* ── TopAppBar ── */}
      <header className="fixed top-0 w-full z-50 bg-[#faf9f6]/70 backdrop-blur-xl flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-primary hover:opacity-80 transition-opacity cursor-pointer">
            menu
          </span>
          <h1 className="text-2xl font-headline italic text-primary tracking-tight">CiciPet</h1>
        </div>
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex gap-8 text-stone-500 font-medium">
            <a className="text-primary font-bold hover:opacity-80 transition-opacity" href="#">Keşfet</a>
            <a className="hover:opacity-80 transition-opacity" href="#">Yarışma</a>
            <a className="hover:opacity-80 transition-opacity" href="#">Ödüller</a>
          </nav>
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container">
            <Image
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDw301IXK_kFv_bZiBRVmdNtNpNEMrvEb9NceUdeD7YRIZNt7fqaKSKg9n8aoQjAGjN5uU3Y4FOB1wgctbCjyAvAfIO5jIHI2cTvQPy1FDeo22kV_qMCaFBGpGdINskJ7Ap9ntnukZ8ItQixXnsWTB_0bfvNaZct2wO8v0Mn-RXmdHbdEJERqqYCCd0bax08k-753i-85eYz4vfp43rsBZRlrXTHTGJ92E4cxGiDePsMANEY3fTIXyJyN5BbiRyThpPThxEDO6CEA"
              alt="Kullanıcı profil fotoğrafı"
              width={40}
              height={40}
            />
          </div>
        </div>
      </header>

      <main className="pt-24 pb-32">
        {/* ── Hero ── */}
        <section className="relative px-6 py-12 md:py-24 overflow-hidden">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <div className="z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-fixed text-on-primary-fixed rounded-full mb-8">
                <span
                  className="material-symbols-outlined text-[18px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  stars
                </span>
                <span className="text-xs font-bold uppercase tracking-[0.2em]">Prestijli Arena Açılıyor</span>
              </div>
              <h2 className="font-headline text-5xl md:text-7xl font-bold text-on-surface leading-[1.1] mb-8">
                Şampiyonluk <span className="italic text-primary">Heyecanı</span> Başlıyor!
              </h2>
              <p className="text-lg md:text-xl text-on-surface-variant max-w-xl mb-12 leading-relaxed">
                Petinizin zarafetini ve yeteneklerini sergileyin. CiciPet Arenası, en seçkin dostlarımızı podyuma davet ediyor.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <JoinButton label="Adaylığınızı Başlatın" />
                <button
                  onClick={() => signIn("google", { callbackUrl: "/onboard" })}
                  className="border border-outline-variant bg-transparent px-10 py-5 rounded-full font-bold text-lg active:scale-95 transition-transform hover:bg-surface-container-low"
                >
                  Galeriyi Keşfet
                </button>
              </div>
            </div>

            {/* Champion Showcase Frame */}
            <div className="relative flex justify-center items-center">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-fixed rounded-full opacity-10 blur-[100px]" />
              <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-primary rounded-full opacity-5 blur-[120px]" />
              <div className="relative w-full max-w-[420px] p-6 bg-surface-container-lowest rounded-2xl frame-glow border border-outline-variant/30">
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-surface-container">
                  <Image
                    fill
                    className="object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPKp6nGfyKvG9QSD9c2luqcRpP0Kb31AUG-5VoHECzFZH6tsU9YvgkRONavrG6p0zEhpJ0dnbWgvQ6HrSq_Gxb-xI1ro88ijANOqP6oma1RXatdI7eB62M7G2SoFAhlOPyZBe2bdAfJqETLMp_4PUAV0JCUj8ESwsVdW_0oZMEbVa0NwIlKOlkN0lp2p8ej_9oIZBjB9gK94thI2u93MXYwwn2B683nLbnN0Ic4s9-ieP9VN3uX4zJwowvfnYLL_SsRMZ8r1Hamg"
                    alt="Altın taç takan şık küçük köpek, zarifçe poz veriyor"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
                <div className="absolute -right-8 top-12 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-xl border border-primary/10 max-w-[160px] animate-bounce-slow">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="material-symbols-outlined text-primary text-sm"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      workspace_premium
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Ödüllü</span>
                  </div>
                  <p className="font-headline text-lg italic text-on-surface leading-tight">
                    Haftanın Şampiyonu: Buddy
                  </p>
                </div>
                <div className="absolute -left-6 bottom-20 bg-primary text-on-primary w-14 h-14 rounded-full flex items-center justify-center shadow-2xl rotate-[-12deg]">
                  <span className="material-symbols-outlined text-3xl">military_tech</span>
                </div>
                <div className="mt-6 text-center">
                  <p className="font-headline text-sm italic text-on-surface-variant">
                    &ldquo;Zarafetin ve Sevginin En Saf Hali&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Nasıl Çalışır ── */}
        <section className="px-6 py-20 bg-surface">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="font-headline text-4xl font-bold mb-4 italic text-primary">Nasıl Çalışır?</h3>
              <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6" />
              <p className="text-on-surface-variant text-lg">3 Kolay Adımda Eğlenceye Katıl</p>
            </div>
            <div className="space-y-12">
              <div className="relative group p-8 bg-surface-container-lowest rounded-2xl border border-outline-variant/20 hover:shadow-xl transition-all duration-500">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-primary-container text-on-primary-container rounded-2xl flex items-center justify-center font-headline text-3xl font-bold shadow-inner">01</div>
                  <div>
                    <h4 className="font-headline text-2xl font-bold mb-3 italic">Hemen Kaydol ve Petini Ekle</h4>
                    <p className="text-on-surface-variant leading-relaxed">Google Auth ile saniyeler içinde hızlı giriş yap ve patili dostunu sisteme kaydet.</p>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary-fixed rounded-full flex items-center justify-center text-on-primary-fixed shadow-md">
                  <span className="material-symbols-outlined text-2xl">person_add</span>
                </div>
              </div>
              <div className="relative group p-8 bg-secondary-container/30 rounded-2xl border border-outline-variant/20 hover:shadow-xl transition-all duration-500">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-primary text-on-primary rounded-2xl flex items-center justify-center font-headline text-3xl font-bold shadow-inner">02</div>
                  <div>
                    <h4 className="font-headline text-2xl font-bold mb-3 italic">Fotoğrafları Yükle ve Beğeni Topla</h4>
                    <p className="text-on-surface-variant leading-relaxed">Petin en güzel, en neşeli anlarını paylaş. Topluluktan sevgi ve beğeni toplayarak öne çık.</p>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-on-secondary shadow-md">
                  <span className="material-symbols-outlined text-2xl">photo_camera</span>
                </div>
              </div>
              <div className="relative group p-8 bg-surface-container-high rounded-2xl border border-outline-variant/20 hover:shadow-xl transition-all duration-500">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-tertiary text-on-tertiary rounded-2xl flex items-center justify-center font-headline text-3xl font-bold shadow-inner">03</div>
                  <div>
                    <h4 className="font-headline text-2xl font-bold mb-3 italic">Büyük Yarışmayı Bekle</h4>
                    <p className="text-on-surface-variant leading-relaxed">10.000 katılımcıya ulaşıldığında arena kapıları büyük final için açılır. Muhteşem ödüller seni bekliyor!</p>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-tertiary-container text-on-tertiary-container rounded-full flex items-center justify-center shadow-md">
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA 1: "Şimdi Katıl" ── */}
        <div className="flex justify-center py-12 bg-surface-container-low">
          <JoinButton label="Şimdi Katıl" />
        </div>

        {/* ── Neden CiciPet Arenası ── */}
        <section className="px-6 py-20 bg-surface-container-low">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="font-headline text-4xl font-bold mb-4 italic text-primary">Neden CiciPet Arenası?</h3>
              <p className="text-on-surface-variant text-lg">Podyumda yerini almanın zamanı geldi.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-10">
              {[
                {
                  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAUjPXdtk3K_3Of0kb-tsshdIPOEq10CMDQ37E5meMI1045SiomC-MfPn605cb9ce_-jgpz_JbOCsU6brs7I2eqHhvv0Ku_CgodRPupYA4E6JRi15h7keJE7vJX_JI8f0BsZMq6-2jG46CAk6pnhxE8DjaszEO9UanTg9pFQPrxEe8WnHy1pprYTuSTrALA219kcIxzvIjlMUWMc-Z9hSbxhkOozxTGJkVh-g0Bs_BjWh2Nvzn2ymBLVJ88rEcZRfSHsYt-vrG0tQ",
                  alt: "Büyük altın şampiyonluk madalyası takan gururlu kedi",
                  icon: "emoji_events", title: "Puan Topla",
                  desc: "Yarışmalara katıl, yeteneklerini sergile ve puanları toplayarak zirveye yerleş.",
                },
                {
                  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPKp6nGfyKvG9QSD9c2luqcRpP0Kb31AUG-5VoHECzFZH6tsU9YvgkRONavrG6p0zEhpJ0dnbWgvQ6HrSq_Gxb-xI1ro88ijANOqP6oma1RXatdI7eB62M7G2SoFAhlOPyZBe2bdAfJqETLMp_4PUAV0JCUj8ESwsVdW_0oZMEbVa0NwIlKOlkN0lp2p8ej_9oIZBjB9gK94thI2u93MXYwwn2B683nLbnN0Ic4s9-ieP9VN3uX4zJwowvfnYLL_SsRMZ8r1Hamg",
                  alt: "Parlak altın taç takan şık pug köpeği",
                  icon: "workspace_premium", title: "Ünvan Kazan",
                  desc: "Şehrin en popüler peti ol. Ayın peti seçilerek özel rozetlerin sahibi ol.",
                },
                {
                  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8R5tcmJPayD5RFxUyc-IDB1uwLK0UMqb5qPwg_nhiYOyniZMNAu8-dYN0J2M82WX-llgsyR3GWc5CABA8By5xlYdH3Od9z_5IXSEfuJMtknoWF8L_zYrVjkay3-erWB2uGyX94zwIRaGXyYkUgx2sktwOQ7rA2YoLpko_hKRUrpFq6htPAFE8PvVXavlLcPFlTXjeVGoX0IkCL_qSAg7pQNXBBK1hRC74KY4_JS62DLAFBCAC1ihOvLBNUSY373dDB_HLw2SQLA",
                  alt: "Altın hediye çeki tutan mutlu kadın köpeğiyle",
                  icon: "redeem", title: "Ödülleri Yakala",
                  desc: "Partner mağazalarımızdan sürpriz hediyeler ve indirim çekleri seni bekliyor.",
                },
              ].map((card) => (
                <div key={card.title} className="bg-surface-container-lowest rounded-xl overflow-hidden hover:translate-y-[-8px] transition-transform duration-500">
                  <div className="h-80 relative overflow-hidden">
                    <Image fill className="object-cover" src={card.src} alt={card.alt} />
                    <div className="absolute top-4 right-4 bg-primary text-on-primary w-12 h-12 rounded-full flex items-center justify-center">
                      <span className="material-symbols-outlined">{card.icon}</span>
                    </div>
                  </div>
                  <div className="p-8">
                    <h4 className="font-headline text-2xl font-bold mb-3 italic">{card.title}</h4>
                    <p className="text-on-surface-variant leading-relaxed">{card.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA 2: "Yarışmalara Katıl, Ödülleri Kap" ── */}
        <div className="flex justify-center py-12 bg-surface">
          <JoinButton label="Yarışmalara Katıl, Ödülleri Kap" />
        </div>

        {/* ── Ödüller ── */}
        <section className="px-6 py-20 bg-surface">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="font-headline text-4xl font-bold mb-4 italic text-primary">Ödüllerimiz</h3>
              <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6" />
              <p className="text-on-surface-variant text-lg">Finalistleri Bekleyen Eşsiz Hediyeler</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: "pets",                label: "Mama Ödülü",        desc: "En kaliteli ve besleyici mamalarla dolu paketler." },
                { icon: "apparel",             label: "Aksesuar Ödülü",    desc: "Şık tasmalar ve gala kostümleriyle petiniz parlasın." },
                { icon: "confirmation_number", label: "Hediye Çeki Ödülü", desc: "Seçkin pet mağazalarında geçerli alışveriş çekleri." },
                { icon: "card_giftcard",       label: "Sürpriz Hediyeler", desc: "Arena sponsorlarından her hafta yenilenen hediyeler." },
              ].map((prize) => (
                <div key={prize.label} className="bg-surface-container-lowest p-8 rounded-full border border-primary/10 flex flex-col items-center text-center hover:shadow-lg transition-all duration-300 group">
                  <div className="w-20 h-20 bg-primary-fixed rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-4xl text-on-primary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>{prize.icon}</span>
                  </div>
                  <h4 className="font-headline text-xl font-bold mb-2 italic">{prize.label}</h4>
                  <p className="text-sm text-on-surface-variant">{prize.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Slogan ── */}
        <section className="py-24 text-center px-6">
          <h5 className="font-headline text-4xl md:text-6xl text-primary-container font-light tracking-[0.2em] mb-4 uppercase">
            Sevgiyi Hisset!
          </h5>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </section>

        {/* ── CTA 3: "Haydi Şimdi Katıl" ── */}
        <div className="flex justify-center pb-12">
          <JoinButton label="Haydi Şimdi Katıl" />
        </div>
      </main>

      {/* ── Bottom Nav (mobile) ── */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-2 bg-[#faf9f6]/80 backdrop-blur-2xl rounded-t-[3rem] shadow-[0_-4px_40px_rgba(26,28,26,0.06)] md:hidden">
        <div className="flex flex-col items-center justify-center text-primary bg-white rounded-full px-4 py-2 transition-all active:scale-90 duration-300 ease-out">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>explore</span>
          <span className="text-[10px] font-semibold tracking-wide uppercase">Keşfet</span>
        </div>
        {[
          { icon: "emoji_events", label: "Yarışma" },
          { icon: "military_tech", label: "Ödüller" },
          { icon: "person", label: "Profil" },
        ].map((item) => (
          <div key={item.label} className="flex flex-col items-center justify-center text-stone-400 hover:text-primary transition-colors active:scale-90 duration-300 ease-out">
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="text-[10px] font-semibold tracking-wide uppercase">{item.label}</span>
          </div>
        ))}
      </nav>

      {/* ── FAB ── */}
      <button
        onClick={() => signIn("google", { callbackUrl: "/onboard" })}
        className="fixed right-6 bottom-32 md:bottom-12 z-40 w-16 h-16 rounded-full gala-gradient-gold text-on-primary flex items-center justify-center shadow-xl active:scale-95 transition-transform"
      >
        <span className="material-symbols-outlined text-3xl">add</span>
      </button>
    </div>
  );
}
