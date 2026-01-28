
import { requireAuth } from "@/utils/supabase/check-auth";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function PetDetailPage({ params }: { params: { id: string } }) {
    await requireAuth();
    const supabase = await createClient();

    // The params might need to be awaited in Next.js 15+, but for 14/15 standard usage:
    // (Assuming this project uses standard Next app router props)
    const { id } = params;

    const { data: pet, error } = await supabase
        .from('pets')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !pet) {
        // If real DB fails/not found, show 404.
        // For development continuity if DB is empty, we might want a fallback,
        // but user asked for "System", so real logic is better.
        return notFound();
    }

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark pb-24">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-gray-200 dark:border-white/5 px-4 h-14 flex items-center gap-3">
                <Link href="/profil" className="p-1 -ml-1 text-slate-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
                    <span className="material-symbols-outlined">arrow_back</span>
                </Link>
                <h1 className="text-lg font-bold text-slate-900 dark:text-white">{pet.name}</h1>
                <div className="flex-1"></div>
                <button className="p-2 text-slate-600 dark:text-gray-300 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">edit</span>
                </button>
            </header>

            <main className="p-4 flex flex-col gap-6">
                {/* Pet Image Hero */}
                <div className="relative w-full aspect-square rounded-3xl overflow-hidden shadow-lg border border-gray-100 dark:border-white/5 group">
                    <img
                        src={pet.image_url || "https://via.placeholder.com/400"}
                        alt={pet.name}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-6 pt-24">
                        <h2 className="text-3xl font-extrabold text-white">{pet.name}</h2>
                        <p className="text-white/80 font-medium">{pet.breed} • {pet.age} Yaşında</p>
                    </div>
                </div>

                {/* Status Badge */}
                {pet.status === 'pending' && (
                    <div className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-300 p-4 rounded-xl flex items-center gap-3 border border-orange-200 dark:border-orange-500/20">
                        <span className="material-symbols-outlined">hourglass_empty</span>
                        <div className="text-sm">
                            <span className="font-bold block">Onay Bekliyor</span>
                            <span>Bu pet henüz moderasyon onayından geçmedi.</span>
                        </div>
                    </div>
                )}

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-surface-dark p-4 rounded-2xl border border-gray-100 dark:border-white/5 flex flex-col gap-1 shadow-sm">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Tür</span>
                        <span className="text-lg font-bold text-slate-700 dark:text-white capitalize">{pet.type}</span>
                    </div>
                    <div className="bg-white dark:bg-surface-dark p-4 rounded-2xl border border-gray-100 dark:border-white/5 flex flex-col gap-1 shadow-sm">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Cinsiyet</span>
                        <span className="text-lg font-bold text-slate-700 dark:text-white">{pet.gender || 'Belirtilmedi'}</span>
                    </div>
                    {/* Add more fields here as schema expands */}
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3">
                    <button className="w-full py-4 bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 text-slate-700 dark:text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                        <span className="material-symbols-outlined text-red-500">qr_code</span>
                        Künye Oluştur (QR)
                    </button>
                    <button className="w-full py-4 bg-red-50 dark:bg-red-900/10 border border-transparent text-red-500 font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors">
                        <span className="material-symbols-outlined">delete</span>
                        Peti Sil
                    </button>
                </div>
            </main>
        </div>
    );
}
