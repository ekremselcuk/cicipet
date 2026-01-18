import CategoryBar from '@/components/home/CategoryBar';
import DuelPreview from '@/components/home/DuelPreview';
import CharityHub from '@/components/home/CharityHub';
import SmartFeed from '@/components/home/SmartFeed';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* 2. Sub-Header: Category Bar */}
      <CategoryBar />

      {/* 3. Hero: Duel Preview (Instead of Champion Hero) */}
      <DuelPreview />

      {/* Charity Section (Kept for Social Impact) */}
      <CharityHub />

      {/* 4. Smart Feed */}
      <SmartFeed />
    </main>
  );
}
