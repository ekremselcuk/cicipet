import CategoryBar from '@/components/home/CategoryBar';
import DuelInterface from '@/components/arena/DuelInterface';
import HomeBottomBar from '@/components/layout/HomeBottomBar';

export default function ArenaPage() {
    return (
        <main className="bg-dark-bg min-h-screen pb-20 pt-6">
            <h1 className="text-3xl font-black text-white px-4 mb-6">PODYUM <span className="text-gold">🏆</span></h1>

            <CategoryBar title="Aktif Yarışmalar" />
            <DuelInterface />

            <HomeBottomBar />
        </main>
    );
}
