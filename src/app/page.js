import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';
import Hero from '@/components/home/Hero';
import CharityHub from '@/components/home/CharityHub';
import SmartFeed from '@/components/home/SmartFeed';

export default function Home() {
  return (
    <main className="pb-24 bg-dark-bg min-h-screen">
      <Header />
      <Hero />
      <CharityHub />
      <SmartFeed />
      <BottomNav />
    </main>
  );
}
