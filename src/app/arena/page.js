import ArenaCategories from '@/components/arena/ArenaCategories';
import DuelInterface from '@/components/arena/DuelInterface';
import BottomNav from '@/components/layout/BottomNav';

export default function ArenaPage() {
    return (
        <main className="bg-dark-bg min-h-screen pb-20 pt-6">
            <h1 className="text-3xl font-black text-white px-4 mb-6">ARENA <span className="text-gold">🏆</span></h1>

            <ArenaCategories />
            <DuelInterface />

            <BottomNav />
        </main>
    );
}
