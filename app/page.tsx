import Header from "@/components/layout/Header";
import { createClient } from "@/utils/supabase/server";
import { getActiveContests, getContestDetails } from "@/utils/supabase/queries";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Home() {
  const supabase = await createClient();
  const { data: contests } = await getActiveContests(supabase);
  const featuredContest = contests && contests.length > 0 ? contests[0] : null;

  return (
    <main className="flex flex-col gap-6 pt-4">
      <Header />
      <section className="w-full overflow-hidden px-4">
        {featuredContest ? (
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-lg group">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url('${featuredContest.image_url || 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2043&auto=format&fit=crop'}')` }}>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full p-5 flex flex-col items-start gap-2">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-lg uppercase tracking-wider border border-white/20">
                  CiciYarışma
                </span>
                <div
                  className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-lg border border-white/10">
                  <span className="material-symbols-outlined text-white text-[12px]">timer</span>
                  <span className="text-white text-[10px] font-medium">Aktif</span>
                </div>
              </div>
              <h2 className="text-white text-xl font-bold leading-tight shadow-sm">
                {featuredContest.title} 🏆
              </h2>
              <p className="text-white/90 text-xs font-medium line-clamp-1 max-w-[85%]">
                {featuredContest.description || "Hemen katıl ve kazan!"}
              </p>
              <Link
                href={`/yarisma`}
                className="mt-1 bg-white text-secondary hover:bg-white/90 font-bold py-2 px-4 rounded-xl text-sm shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-1">
                <span>Hemen Katıl</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-lg group bg-gray-100 dark:bg-surface-dark flex items-center justify-center p-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <span className="material-symbols-outlined text-4xl text-gray-400">event_busy</span>
              <h3 className="text-slate-900 dark:text-white font-bold">Aktif Yarışma Yok</h3>
              <p className="text-xs text-gray-500">Şu anda aktif bir yarışma bulunmuyor. Takipte kal!</p>
            </div>
          </div>
        )}
      </section>
      <section className="px-4">
        <h3 className="text-sm font-bold text-neutral-900 dark:text-white mb-3 flex items-center gap-1">
          Hikayeler <span className="text-xs font-normal text-neutral-500 ml-auto">Tümünü gör</span>
        </h3>
        <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-1">
          <div className="flex flex-col items-center gap-1.5 shrink-0">
            <div
              className="size-16 rounded-full bg-white dark:bg-white/5 border-2 border-dashed border-neutral-300 dark:border-neutral-600 flex items-center justify-center relative cursor-pointer">
              <span className="material-symbols-outlined text-secondary text-2xl">add</span>
              <div
                className="absolute bottom-0 right-0 bg-secondary text-white rounded-full p-0.5 border-2 border-white dark:border-background-dark">
                <span className="material-symbols-outlined text-[10px] block">add</span>
              </div>
            </div>
            <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">Ekle</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer">
            <div className="size-16 rounded-full p-0.5 bg-gradient-to-tr from-primary to-secondary">
              <div className="w-full h-full rounded-full bg-white dark:bg-black p-0.5">
                <img alt="User story" className="w-full h-full rounded-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUaOlYsT2STSMRed6Bw9DAKkzlg2uYk4oY6wkjpG4Ul-H8SJiSWwxHDxkwmwbJYzngiRlmVkhCzWtMSE2U3iPH5W_3Y0YOXRnqTYLMF9hD_q7YntvgXGc3zDtXeCfjYRmeahdzVfs8BoHisGm-Pdxpml4D4fcZZO8DMBVO_TmtHXn2gEeW072t9ikWrd7cmmV1DorhCSgBmF6C7PSxyqUae_WEbMMnFikjcPmhIEZDPUyCzOEkEH9obFXAcq-3YCRN5AFQ5EFnWTQ" />
              </div>
            </div>
            <span className="text-xs font-medium text-neutral-900 dark:text-white">Elif</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer">
            <div className="size-16 rounded-full p-0.5 bg-gradient-to-tr from-primary to-secondary">
              <div className="w-full h-full rounded-full bg-white dark:bg-black p-0.5">
                <img alt="User story" className="w-full h-full rounded-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCuIZBrFyk9LaTHqwN7a8I4GL5_NjmMONtJo2yYyGyPi190BO2Ue0ULzKYx8vxAYs4z5incCD2WG8_SQ_VvT5CCq-d0txy-RVOLPyXWbAl1THfue_m_IkgqraT8K7QSR8pvt0szyqHXoHF2E2jP9gQebt0Hqn7jyzCzROXzTQkI54lopeKIFR1jdHDhuKN9qPh2anDMoXPGuJXycn81qpc6UOpeE94ldktHKWPdkHC_cSg8ye3QyIhSClfK5xccm-rmQM1uI0u5TLw" />
              </div>
            </div>
            <span className="text-xs font-medium text-neutral-900 dark:text-white">Can</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer opacity-70">
            <div className="size-16 rounded-full border-2 border-neutral-200 dark:border-neutral-700 p-0.5">
              <img alt="User story" className="w-full h-full rounded-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3QQIeNTmkKhzgX6GF897ZjC3hfL2AhrUMwFp1MB4vKcxUTTXXnpdQsyNM7IzQH3WZImsnBPuqbsrwXPTXVsqqbxd3JlvRvoavn0gJqXhrbALSBfxShvjjApE4AAdHLlFBfk42UYGemMJKEGGmtlUOQHEpSF2xPt9CA2oXPsdv1u6T9_2bj3QouR58wSmTsIEn_1XR3S3J5b7UV9weztgcFeBGwQrY1RJzDqKFjzmPZSq7ZA4QRhHF-uI2GW9-TSVhohTv2AQwmAs" />
            </div>
            <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">Pamuk</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer opacity-70">
            <div className="size-16 rounded-full border-2 border-neutral-200 dark:border-neutral-700 p-0.5">
              <img alt="User story" className="w-full h-full rounded-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4uQ6xyT3941YBcHxTcGlYi7Df4f1CR1Vk6p_TC_B-ihCnBSo2qCj6EacEbiyxb_5DAllsUuBsCpR6kLGSwhqF584t0c-D0E51QaMRAnoap7FjW5i6sSwgIXxrMu_2yBsDb1oXNGnkbZIqoLAVhUz0lziXR9dOl_Gt3uHzM98eR0Y356JdLT17w61h3CUiSVsbFxglJ0nQnvSIh8q263csGJm2NYB27CKOgMIFXVFwaHgvcjoO8hvxnq51BpEBJyMoS2V0G2nPhME" />
            </div>
            <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">Markalar</span>
          </div>
        </div>
      </section>
      <article className="px-4">
        <div
          className="flex flex-col gap-3 bg-white dark:bg-[#2c2415] p-4 rounded-2xl shadow-sm border border-black/5 dark:border-white/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-gray-200 overflow-hidden">
                <img alt="User avatar" className="h-full w-full object-cover"
                  data-alt="Portrait of a young woman with dark hair"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUaOlYsT2STSMRed6Bw9DAKkzlg2uYk4oY6wkjpG4Ul-H8SJiSWwxHDxkwmwbJYzngiRlmVkhCzWtMSE2U3iPH5W_3Y0YOXRnqTYLMF9hD_q7YntvgXGc3zDtXeCfjYRmeahdzVfs8BoHisGm-Pdxpml4D4fcZZO8DMBVO_TmtHXn2gEeW072t9ikWrd7cmmV1DorhCSgBmF6C7PSxyqUae_WEbMMnFikjcPmhIEZDPUyCzOEkEH9obFXAcq-3YCRN5AFQ5EFnWTQ" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-white">Elif &amp; Pamuk</h3>
                  <span
                    className="material-symbols-outlined text-secondary text-[14px] fill-current">verified</span>
                </div>
                <span className="text-xs text-neutral-500 dark:text-neutral-400">İstanbul, Kadıköy • 2s
                  önce</span>
              </div>
            </div>
            <button
              className="flex items-center justify-center size-8 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-neutral-500">
              <span className="material-symbols-outlined">more_horiz</span>
            </button>
          </div>
          <div className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 relative">
            <img alt="White cat with sunglasses sitting in the sun" className="w-full h-full object-cover"
              data-alt="White cat wearing sunglasses sitting on a patio"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3QQIeNTmkKhzgX6GF897ZjC3hfL2AhrUMwFp1MB4vKcxUTTXXnpdQsyNM7IzQH3WZImsnBPuqbsrwXPTXVsqqbxd3JlvRvoavn0gJqXhrbALSBfxShvjjApE4AAdHLlFBfk42UYGemMJKEGGmtlUOQHEpSF2xPt9CA2oXPsdv1u6T9_2bj3QouR58wSmTsIEn_1XR3S3J5b7UV9weztgcFeBGwQrY1RJzDqKFjzmPZSq7ZA4QRhHF-uI2GW9-TSVhohTv2AQwmAs" />
            <div
              className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-white text-[16px]">photo_camera</span>
              <span className="text-xs font-medium text-white">Canon R5</span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center gap-4">
              <button className="group flex items-center gap-1.5 text-neutral-600 dark:text-neutral-300">
                <span
                  className="material-symbols-outlined group-hover:text-red-500 transition-colors">favorite</span>
                <span className="text-sm font-medium">2.4k</span>
              </button>
              <button className="group flex items-center gap-1.5 text-neutral-600 dark:text-neutral-300">
                <span
                  className="material-symbols-outlined group-hover:text-blue-500 transition-colors">chat_bubble</span>
                <span className="text-sm font-medium">128</span>
              </button>
              <button className="group flex items-center gap-1.5 text-neutral-600 dark:text-neutral-300">
                <span
                  className="material-symbols-outlined group-hover:text-green-500 transition-colors">send</span>
              </button>
            </div>
            <button className="text-neutral-600 dark:text-neutral-300 hover:text-secondary transition-colors">
              <span className="material-symbols-outlined">bookmark</span>
            </button>
          </div>
          <div>
            <p className="text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed">
              Bugün İstanbul{"'"}da havanın tadını çıkarıyoruz! ☀️ Pamuk balkondaki yeni yerini çok sevdi. <span
                className="text-secondary font-medium">#KediHayatı #İstanbulKedileri</span>
            </p>
          </div>
        </div>
      </article>
      <section className="px-4">
        <div
          className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/10 dark:to-orange-900/20 p-4 rounded-2xl border border-primary/20 flex gap-4 items-center relative overflow-hidden">
          <div className="absolute top-0 left-0 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-br-lg">
            Sponsorlu
          </div>
          <div className="w-24 h-24 shrink-0 bg-white rounded-xl p-1 shadow-sm">
            <img alt="Dog treats in a bowl" className="w-full h-full object-cover rounded-lg"
              data-alt="Close up of dog treats in a wooden bowl"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4uQ6xyT3941YBcHxTcGlYi7Df4f1CR1Vk6p_TC_B-ihCnBSo2qCj6EacEbiyxb_5DAllsUuBsCpR6kLGSwhqF584t0c-D0E51QaMRAnoap7FjW5i6sSwgIXxrMu_2yBsDb1oXNGnkbZIqoLAVhUz0lziXR9dOl_Gt3uHzM98eR0Y356JdLT17w61h3CUiSVsbFxglJ0nQnvSIh8q263csGJm2NYB27CKOgMIFXVFwaHgvcjoO8hvxnq51BpEBJyMoS2V0G2nPhME" />
          </div>
          <div className="flex flex-col flex-1 gap-1">
            <h4 className="text-sm font-bold text-neutral-900 dark:text-white">Organik Köpek Ödül Maması</h4>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Tamamen doğal içerikli, vitamin deposu.
            </p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-lg font-bold text-primary">120 TL</span>
              <button
                className="bg-primary hover:bg-primary/90 text-white text-xs font-bold py-2 px-4 rounded-lg transition-colors shadow-sm">
                Satın Al
              </button>
            </div>
          </div>
        </div>
      </section>
      <article className="px-4">
        <div
          className="flex flex-col gap-3 bg-white dark:bg-[#2c2415] p-4 rounded-2xl shadow-sm border border-black/5 dark:border-white/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-gray-200 overflow-hidden">
                <img alt="User avatar" className="h-full w-full object-cover"
                  data-alt="Portrait of a man with a beard"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCuIZBrFyk9LaTHqwN7a8I4GL5_NjmMONtJo2yYyGyPi190BO2Ue0ULzKYx8vxAYs4z5incCD2WG8_SQ_VvT5CCq-d0txy-RVOLPyXWbAl1THfue_m_IkgqraT8K7QSR8pvt0szyqHXoHF2E2jP9gQebt0Hqn7jyzCzROXzTQkI54lopeKIFR1jdHDhuKN9qPh2anDMoXPGuJXycn81qpc6UOpeE94ldktHKWPdkHC_cSg8ye3QyIhSClfK5xccm-rmQM1uI0u5TLw" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-white">Can &amp; Max</h3>
                </div>
                <span className="text-xs text-neutral-500 dark:text-neutral-400">İzmir, Türkiye • 5s önce</span>
              </div>
            </div>
            <button
              className="flex bg-secondary/10 hover:bg-secondary/20 text-secondary text-xs font-bold px-3 py-1.5 rounded-full transition-colors">
              Takip Et
            </button>
          </div>
          <div className="w-full aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
            <img alt="Two dogs running on a beach" className="w-full h-full object-cover"
              data-alt="Two happy dogs running and jumping"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMskjYiRNGF3CCVxGHPvh1kS-wb7Ir1Oow--xkCHFwQArFS38CPvtoTEF11_5_A4l-v8Nf7p5-Ho6KWvwQv5fuirrzvl7MbQwiE9CD-fjQOyp4GHy8tbiHDo9eSdlmBYwmSOZQoWi4kMXjWenA1sIiaEfP-lmNt6fWrBhV3WctQz5D8WPrk46gb9Mfk-QzFQCPOPeLU5G9EXYd9ns6fcCDCvCRunjFeCvXpj8vA2UYObp8Xyz8dt9TKFij_JSYhGi8PUOdNzfCsOg" />
          </div>
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center gap-4">
              <button className="group flex items-center gap-1.5 text-neutral-600 dark:text-neutral-300">
                <span
                  className="material-symbols-outlined group-hover:text-red-500 transition-colors">favorite_border</span>
                <span className="text-sm font-medium">856</span>
              </button>
              <button className="group flex items-center gap-1.5 text-neutral-600 dark:text-neutral-300">
                <span
                  className="material-symbols-outlined group-hover:text-blue-500 transition-colors">chat_bubble</span>
                <span className="text-sm font-medium">42</span>
              </button>
            </div>
            <button className="text-neutral-600 dark:text-neutral-300 hover:text-secondary transition-colors">
              <span className="material-symbols-outlined">bookmark</span>
            </button>
          </div>
          <div>
            <p className="text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed">
              Sonsuza kadar en iyi arkadaşlar! Max bugün parkta yeni bir arkadaş edindi. 🐶 <span
                className="text-secondary font-medium">#KöpekSevgisi #İzmir</span>
            </p>
          </div>
        </div>
      </article>
      <section className="py-2">
        <div className="px-4 mb-3 flex items-center justify-between">
          <h2 className="text-base font-bold text-neutral-900 dark:text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">percent</span>
            Sponsorlu Fırsatlar
          </h2>
          <a className="text-xs font-bold text-secondary hover:text-secondary/80" href="#">Tümü</a>
        </div>
        <div className="flex overflow-x-auto gap-3 px-4 pb-4 hide-scrollbar snap-x snap-mandatory">
          <div
            className="snap-center shrink-0 w-36 bg-white dark:bg-[#2c2415] rounded-xl overflow-hidden shadow-sm border border-black/5 dark:border-white/5 flex flex-col group">
            <div className="aspect-square bg-gray-100 relative overflow-hidden">
              <img alt="Modern dog leash"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                data-alt="Colorful dog leash on a plain background"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCx5K3TWcIFLixbgb1KLFagzLB1qg-z_7nFPg4BaryGKAUCLJ8N080---UyGw-Rgk9QwZiMXItRxUEMIJ6kWwoQRnOThhTg9CBrDNQ43KNeTqN17r2zXPn-FkBXSoiXVayNtonpXZT7toOMEoivoAR8bMfBirZWkBWCV7CWtSeOicLwwGkygh7mvDSIyirKZUcPQZ6uXaUQ-ynPzHrColDV_8TJV3utxEuH9-EUc1zlZVo0HhhCjM6ViorTwsXt9oNrpr0YBJxP9g8" />
            </div>
            <div className="p-2.5 flex flex-col gap-1 flex-1">
              <h4 className="text-xs font-semibold text-neutral-900 dark:text-white line-clamp-1">Dayanıklı Tasma
              </h4>
              <div className="flex items-center gap-1 mt-auto">
                <span className="text-sm font-bold text-primary">245 TL</span>
              </div>
            </div>
          </div>
          <div
            className="snap-center shrink-0 w-36 bg-white dark:bg-[#2c2415] rounded-xl overflow-hidden shadow-sm border border-black/5 dark:border-white/5 flex flex-col group">
            <div className="aspect-square bg-gray-100 relative overflow-hidden">
              <img alt="Cat bed"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                data-alt="Cozy grey cat bed with a fluffy pillow"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQC2b6AeYVRD9hwYY5v0V1xr7ELVPE0nsmVvZJ3okiy1-AtxrC-9i2EXGbs2WP57gKZMzynzqz7MItcXOwVBRyCMQH02QLbbCZWWUG6QBfZoE6pUhC-8sudSGBVmKBj8iFyzgxhxyBgh0vEdJ7xjkx8W-JYy9MJ6g_D16rQA2fIvexQ8chDNHb9ed3NtkuQvGoNkbyei8SrWH00UgvClZ4fStu7yFp3Mdc_jJp5FCBANTrS97UdfF8G9X7-IT9GAMWbl4YSlZg8MM" />
              <div
                className="absolute top-2 left-2 bg-secondary text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                Yeni</div>
            </div>
            <div className="p-2.5 flex flex-col gap-1 flex-1">
              <h4 className="text-xs font-semibold text-neutral-900 dark:text-white line-clamp-1">Kedi Yatağı</h4>
              <div className="flex items-center gap-1 mt-auto">
                <span className="text-sm font-bold text-primary">599 TL</span>
              </div>
            </div>
          </div>
          <div
            className="snap-center shrink-0 w-36 bg-white dark:bg-[#2c2415] rounded-xl overflow-hidden shadow-sm border border-black/5 dark:border-white/5 flex flex-col group">
            <div className="aspect-square bg-gray-100 relative overflow-hidden">
              <img alt="Dog treats"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                data-alt="Close up of dog treats in a wooden bowl"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4uQ6xyT3941YBcHxTcGlYi7Df4f1CR1Vk6p_TC_B-ihCnBSo2qCj6EacEbiyxb_5DAllsUuBsCpR6kLGSwhqF584t0c-D0E51QaMRAnoap7FjW5i6sSwgIXxrMu_2yBsDb1oXNGnkbZIqoLAVhUz0lziXR9dOl_Gt3uHzM98eR0Y356JdLT17w61h3CUiSVsbFxglJ0nQnvSIh8q263csGJm2NYB27CKOgMIFXVFwaHgvcjoO8hvxnq51BpEBJyMoS2V0G2nPhME" />
              <div
                className="absolute top-2 left-2 bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                -20%</div>
            </div>
            <div className="p-2.5 flex flex-col gap-1 flex-1">
              <h4 className="text-xs font-semibold text-neutral-900 dark:text-white line-clamp-1">Somon Ödül</h4>
              <div className="flex items-center gap-1 mt-auto">
                <span className="text-sm font-bold text-primary">120 TL</span>
                <span className="text-[10px] text-neutral-400 line-through">150 TL</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="px-4">
        <div
          className="bg-secondary dark:bg-secondary/20 rounded-2xl p-5 relative overflow-hidden text-white shadow-md">
          <div className="absolute -right-4 -top-4 text-white/10 dark:text-white/5 rotate-12">
            <span className="material-symbols-outlined text-[120px] filled">favorite</span>
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined filled text-white text-2xl">volunteer_activism</span>
              <h2 className="text-lg font-bold">Eş Bulma</h2>
            </div>
            <h3 className="text-xl font-bold leading-tight mb-2">Kedime eş arıyorum 😻</h3>
            <p className="text-white/90 text-sm mb-4 max-w-[70%]">Minik dostunuz için ideal arkadaşı veya eşi bulun.
            </p>
            <button
              className="bg-white text-secondary font-bold py-2.5 px-5 rounded-xl text-sm hover:bg-neutral-50 shadow-sm transition-colors">
              Hemen Başla
            </button>
          </div>
        </div>
      </section>
      <article className="px-4 pb-4">
        <div
          className="flex flex-col gap-3 bg-white dark:bg-[#2c2415] p-4 rounded-2xl shadow-sm border border-black/5 dark:border-white/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-gray-200 overflow-hidden ring-2 ring-primary/20">
                <img alt="Another user avatar" className="h-full w-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtfYtUb9L8lgu9JjwHn3bXnTaijo111jciD23vZ2ect98yCbN-JHXJ1MJZZSU0l0M8P9UtLIeOD5zfWb9_3bJh7ewkevsA6hah3g5txvOw2hQvDaSnH8p_T9FSIff17IZFi22ouy3-aM-lrnGu9kPRvEnUbtaYDbCxM5oT9nAVeVtCU1PJNunjPv00P5ovfIB-cJ-p4oK9vhqGWr-UtvSIOnNWI6jP8SZUEqCmlceEEm-u8CxLLU9bOq3ZLgxE0b6-gHGk9TvlsBI" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white">Zeynep &amp; Çiko</h3>
                <span className="text-xs text-neutral-500 dark:text-neutral-400">Ankara, Türkiye • 6s
                  önce</span>
              </div>
            </div>
            <button
              className="flex items-center justify-center size-8 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-neutral-500">
              <span className="material-symbols-outlined">more_horiz</span>
            </button>
          </div>
          <div className="p-2">
            <p className="text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed font-medium">
              Herkese selam! Çiko için yeni bir veteriner arıyoruz Ankara Çankaya tarafında. Tavsiyesi olan
              var mı? 🙏
            </p>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-black/5 dark:border-white/5 mt-1">
            <div className="flex items-center gap-4 mt-2">
              <button className="group flex items-center gap-1.5 text-neutral-600 dark:text-neutral-300">
                <span
                  className="material-symbols-outlined group-hover:text-red-500 transition-colors">favorite_border</span>
                <span className="text-sm font-medium">12</span>
              </button>
              <button className="group flex items-center gap-1.5 text-neutral-600 dark:text-neutral-300">
                <span
                  className="material-symbols-outlined group-hover:text-blue-500 transition-colors">chat_bubble</span>
                <span className="text-sm font-medium">5</span>
              </button>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
