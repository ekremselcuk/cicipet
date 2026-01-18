import ProfileHeader from '@/components/profile/ProfileHeader';
import TrophyRoom from '@/components/profile/TrophyRoom';
import ProofOfCare from '@/components/care/ProofOfCare';

export default function Profile() {
    return (
        <main className="bg-dark-bg min-h-screen">
            <ProfileHeader />
            <ProofOfCare />
            <TrophyRoom />

            {/* Social Links / Arena Status */}
            <section className="px-4 text-center">
                <div className="p-4 bg-dark-card rounded-xl border border-white/5">
                    <h4 className="text-white font-bold mb-2">Podyum Durumu</h4>
                    <p className="text-xs text-gray-400 mb-4">
                        Boncuk şu an <span className="text-gold">"En Uykucu"</span> yarışmasında #5. sırada!
                    </p>
                    <button className="btn-primary w-full text-sm py-3">
                        Destekle & Oy Topla
                    </button>
                </div>
            </section>
        </main>
    );
}
