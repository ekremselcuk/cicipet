import { requireAuth } from "@/utils/supabase/check-auth";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import MenuTrigger from "@/components/admin/MenuTrigger";

export default async function AdminPetDetailPage({ params }: { params: { id: string } }) {
    await requireAuth();
    const supabase = await createClient();

    const { id } = await params;

    const { data: pet, error } = await supabase
        .from('pets')
        .select(`
            *,
            profiles:owner_id (
                id,
                full_name,
                username
            )
        `)
        .eq('id', id)
        .single();

    if (error) {
        console.error("Error fetching pet details:", error);
    }

    if (error || !pet) {
        console.log("Pet not found or error occurred for ID:", id);
        return notFound();
    }

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display antialiased selection:bg-primary selection:text-black pb-24 min-h-screen">
            {/* Top Header */}
            <header className="sticky top-0 z-20 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-gray-200 dark:border-white/5 px-4 pt-4 pb-2">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        {/* Mobile Menu Trigger */}
                        <div className="md:hidden">
                            <MenuTrigger />
                        </div>
                        <Link
                            href="/admin/petler"
                            className="p-2 -ml-2 text-slate-600 dark:text-gray-300 hover:text-primary transition-colors rounded-full hover:bg-black/5 dark:hover:bg-white/5"
                        >
                            <span className="material-symbols-outlined text-[24px]">arrow_back</span>
                        </Link>
                    </div>
                    <h1 className="text-xl font-bold tracking-tight text-center flex-1">
                        Pet Detayı
                    </h1>
                    <div className="flex gap-2 w-10 justify-end">
                    </div>
                </div>
            </header>

            <main className="flex flex-col gap-6 p-4">
                {/* Hero Section */}
                <div className="relative rounded-2xl overflow-hidden shadow-lg h-64 w-full group">
                    <img
                        alt={pet.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        src={pet.image_url || 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?q=80&w=2070&auto=format&fit=crop'}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 text-white z-10 w-full pr-6">
                        <h1 className="text-4xl font-extrabold tracking-tight mb-2 drop-shadow-lg">{pet.name}</h1>
                        <div className="flex flex-wrap items-center gap-2 text-white/95 text-sm font-semibold">
                            <span className="bg-primary px-2.5 py-1 rounded-lg text-white text-xs shadow-sm flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">pets</span> {pet.type}
                            </span>
                            <span className="w-1 h-1 bg-white rounded-full opacity-50"></span>
                            <span className="drop-shadow-md">{pet.breed || 'Bilinmiyor'}</span>
                            <span className="w-1 h-1 bg-white rounded-full opacity-50"></span>
                            <span className="drop-shadow-md">{pet.age} Yaşında</span>
                        </div>
                        <div className="mt-2 text-sm opacity-90">
                            Sahip:{" "}
                            {pet.profiles ? (
                                <Link href={`/admin/kullanicilar/${pet.profiles.id}`} className="font-bold underline hover:text-primary transition-colors">
                                    {pet.profiles.full_name || pet.profiles.username || 'Bilinmeyen'}
                                </Link>
                            ) : (
                                <span className="font-bold">Bilinmeyen</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center gap-2 p-3 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl font-bold hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors">
                        <span className="material-symbols-outlined">block</span>
                        Yasakla
                    </button>
                    <button className="flex items-center justify-center gap-2 p-3 bg-primary text-black rounded-xl font-bold hover:bg-primary/90 transition-colors">
                        <span className="material-symbols-outlined">edit</span>
                        Düzenle
                    </button>
                </div>

                {/* Details */}
                <div className="bg-white dark:bg-surface-dark rounded-xl p-5 shadow-sm border border-gray-100 dark:border-white/5 space-y-4">
                    <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
                        <span className="text-gray-500 font-medium">Pet ID</span>
                        <span className="text-xs font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{pet.id}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
                        <span className="text-gray-500 font-medium">Oluşturulma Tarihi</span>
                        <span className="font-semibold">{new Date(pet.created_at).toLocaleDateString('tr-TR')}</span>
                    </div>
                    <div className="flex justify-between pb-1">
                        <span className="text-gray-500 font-medium">Açıklama</span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 italic bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                        {pet.description || "Açıklama yok."}
                    </p>
                </div>
            </main>
        </div>
    );
}
