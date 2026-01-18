import TopStickyNav from '@/components/layout/TopStickyNav';
import CategoryBar from '@/components/home/CategoryBar';
import DuelPreview from '@/components/home/DuelPreview';
import CharityHub from '@/components/home/CharityHub';
import SmartFeed from '@/components/home/SmartFeed';
import HomeBottomBar from '@/components/layout/HomeBottomBar';

export default function Home() {
  return (
    <main className="pt-16 pb-32 bg-bone-white min-h-screen">
      {/* 1. Sticky Top Bar */}
      <TopStickyNav />

      {/* 2. Sub-Header: Category Bar */}
      <CategoryBar />

      {/* 3. Hero: Duel Preview (Instead of Champion Hero) */}
      <DuelPreview />

      {/* Charity Section (Kept for Social Impact) */}
      <CharityHub />

      {/* 4. Smart Feed */}
      <SmartFeed />

      {/* 5. Fixed Bottom Action Bar */}
      <HomeBottomBar />
    </main>
  );
}
