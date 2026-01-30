import Header from "@/components/layout/Header";
import { createClient } from "@/utils/supabase/server";
import { getActiveContests, getContestDetails } from "@/utils/supabase/queries";
import Link from "next/link";
import StoryBar from "@/components/social/StoryBar";
import Feed from "@/components/feed/Feed";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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
      <StoryBar />

      <Feed />

    </main>
  );
}
