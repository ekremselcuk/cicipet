import PetHeader from '@/components/pet/PetHeader';
import TrophyRoom from '@/components/profile/TrophyRoom'; // Reuse
import ProofOfCare from '@/components/care/ProofOfCare'; // Reuse (maybe add readonly prop later)
import HealthCard from '@/components/pet/HealthCard';
import AffiliateShowcase from '@/components/pet/AffiliateShowcase';

export default function PetPage({ params }) {
    return (
        <main className="bg-dark-bg min-h-screen">
            <PetHeader />

            {/* Social Proof Section */}
            <ProofOfCare />

            {/* Achievements */}
            <TrophyRoom />

            {/* Trust & Health */}
            <HealthCard />

            {/* Commercial Loop */}
            <AffiliateShowcase />
        </main>
    );
}
