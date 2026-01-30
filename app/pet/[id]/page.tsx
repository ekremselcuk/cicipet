
import { requireAuth } from "@/utils/supabase/check-auth";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import LikeButton from "@/components/social/LikeButton";
import BookmarkButton from "@/components/social/BookmarkButton";
import CommentSection from "@/components/social/CommentSection";
import ShareButton from "@/components/social/ShareButton";

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

    const { data: { user } } = await supabase.auth.getUser();

    if (error || !pet) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background-light dark:bg-background-dark">
                <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-2xl max-w-md w-full text-center border border-red-100 dark:border-red-900/20">
                    <span className="material-symbols-outlined text-4xl text-red-500 mb-4">error</span>
                    <h1 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Pet Verisi Alınamadı</h1>
                    <code className="bg-white dark:bg-black/20 p-3 rounded-lg text-left text-xs font-mono overflow-auto max-h-40 mb-4 block border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300">
                        {error ? JSON.stringify(error, null, 2) : 'Pet verisi null döndü.'}
                    </code>
                    <div className="text-xs text-gray-500 mb-6">ID: {id}</div>
                    <Link href="/profil" className="inline-block px-6 py-3 bg-primary text-black font-bold rounded-xl hover:bg-primary/90 transition-colors">
                        Profile Dön
                    </Link>
                </div>
            </div>
        );
    }

    // Check visibility
    const isOwner = user?.id === pet.owner_id;
    // For MVP, assuming Admin check via RLS or role if implemented separately.
    // If pending and not owner, show 404 or specific message
    if (pet.status === 'pending' && !isOwner) {
        // Optionally check for admin role here if available
        // const isAdmin = ...
        return notFound();
    }

    if (!pet) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Pet Bulunamadı 🐾</h1>
                <p className="text-gray-500">Aradığınız pet silinmiş veya hiç var olmamış olabilir.</p>
                <div className="mt-4 p-2 bg-yellow-50 text-yellow-800 text-xs rounded border border-yellow-200">
                    Debug ID: {id}
                </div>
                <Link href="/profil" className="mt-6 px-6 py-3 bg-primary text-black font-bold rounded-xl">
                    Profile Dön
                </Link>
            </div>
        );
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
                <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-lg border border-gray-100 dark:border-white/5 group bg-black">
                    <img
                        src={pet.image_url || "https://via.placeholder.com/400"}
                        alt={pet.name}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-24">
                        <div className="flex items-end justify-between">
                            <div>
                                <h2 className="text-3xl font-extrabold text-white leading-none mb-1">{pet.name}</h2>
                                <p className="text-white/80 font-medium">{pet.breed} • {pet.age} Yaşında</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <LikeButton itemId={pet.id} itemType="pet" initialLikes={pet.likes_count || 0} />
                            </div>
                        </div>
                    </div>
                    {/* Share & Bookmark Absolute */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                        <div className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors">
                            <BookmarkButton itemId={pet.id} itemType="pet" />
                        </div>
                        <div className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors">
                            <ShareButton title={`CiciPet: ${pet.name}`} text={`${pet.name} ile tanışın!`} url={`/pet/${pet.id}`} />
                        </div>
                    </div>
                </div>

                {/* Status Badge */}
                {pet.status === 'pending' && (
                    <div className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-300 p-4 rounded-xl flex items-center gap-3 border border-orange-200 dark:border-orange-500/20">
                        <span className="material-symbols-outlined">hourglass_empty</span>
                        <div className="text-sm">
                            <span className="font-bold block">Onay Bekliyor</span>
                            <span>Bu pet moderasyon onayından geçmedi. Sadece siz görebilirsiniz.</span>
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
                    {/* Owner Link - Only if NOT owner */}
                    {!isOwner && pet.owner_id && (
                        <Link href={`/kullanici/${pet.owner_id}`} className="col-span-2 bg-primary/10 p-4 rounded-2xl border border-primary/20 flex items-center justify-between group">
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-primary uppercase tracking-wider">Sahibi</span>
                                <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:underline">Profili Görüntüle</span>
                            </div>
                            <span className="material-symbols-outlined text-primary">arrow_forward</span>
                        </Link>
                    )}
                </div>

                {/* Comments Section */}
                <CommentSection itemId={pet.id} itemType="pet" />

                {/* Actions - Only Owner */}
                {isOwner && (
                    <div className="flex flex-col gap-3 pt-4 border-t border-gray-100 dark:border-white/5">
                        <button className="w-full py-4 bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 text-slate-700 dark:text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                            <span className="material-symbols-outlined text-red-500">qr_code</span>
                            Künye Oluştur (QR)
                        </button>
                        <button className="w-full py-4 bg-red-50 dark:bg-red-900/10 border border-transparent text-red-500 font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors">
                            <span className="material-symbols-outlined">delete</span>
                            Peti Sil
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}
