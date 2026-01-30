
import { requireAuth } from "@/utils/supabase/check-auth";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import LikeButton from "@/components/social/LikeButton";
import BookmarkButton from "@/components/social/BookmarkButton";
import CommentSection from "@/components/social/CommentSection";
import ShareButton from "@/components/social/ShareButton";

export default async function AdDetailPage({ params }: { params: { id: string } }) {
    await requireAuth();
    const supabase = await createClient();

    const { id } = params;

    const { data: ad, error } = await supabase
        .from('ads')
        .select('*')
        .eq('id', id)
        .single();

    const { data: { user } } = await supabase.auth.getUser();

    if (error || !ad) {
        return notFound();
    }

    const isOwner = user?.id === ad.owner_id;

    if (ad.status === 'pending' && !isOwner) {
        return notFound();
    }

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark pb-24">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-gray-200 dark:border-white/5 px-4 h-14 flex items-center gap-3">
                <Link href="/ilanlar" className="p-1 -ml-1 text-slate-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
                    <span className="material-symbols-outlined">arrow_back</span>
                </Link>
                <h1 className="text-lg font-bold text-slate-900 dark:text-white truncate">{ad.title}</h1>
            </header>

            <main className="p-4 flex flex-col gap-6">
                {/* Hero */}
                <div className="relative w-full aspect-square rounded-3xl overflow-hidden shadow-lg border border-gray-100 dark:border-white/5 group bg-black">
                    <img
                        src={ad.photo_url || "https://via.placeholder.com/400"}
                        alt={ad.title}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                    />
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                        <div className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors">
                            <BookmarkButton itemId={ad.id} itemType="ad" />
                        </div>
                        <div className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors">
                            <ShareButton title={`CiciPet İlan: ${ad.title}`} text={ad.description} url={`/ilanlar/${ad.id}`} />
                        </div>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-24">
                        <div className="flex items-end justify-between">
                            <div className="flex-1 mr-4">
                                <span className="inline-block px-2 py-1 rounded bg-primary text-black text-xs font-bold mb-2 uppercase">{ad.type}</span>
                                <h2 className="text-2xl font-bold text-white leading-tight mb-1">{ad.title}</h2>
                            </div>
                            <div className="flex flex-col gap-2">
                                <LikeButton itemId={ad.id} itemType="ad" initialLikes={ad.likes_count || 0} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Details */}
                <div className="bg-white dark:bg-surface-dark p-6 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Açıklama</h3>
                    <p className="text-slate-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">{ad.description}</p>

                    <div className="mt-6 pt-6 border-t border-gray-100 dark:border-white/5 grid grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-400 font-bold uppercase">Şehir</span>
                            <span className="text-slate-900 dark:text-white font-medium">{ad.city || 'Belirtilmedi'}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-400 font-bold uppercase">Tarih</span>
                            <span className="text-slate-900 dark:text-white font-medium">{new Date(ad.created_at).toLocaleDateString('tr-TR')}</span>
                        </div>
                    </div>
                </div>

                {/* Owner */}
                {!isOwner && ad.owner_id && (
                    <Link href={`/kullanici/${ad.owner_id}`} className="bg-primary/10 p-4 rounded-2xl border border-primary/20 flex items-center justify-between group transition-colors hover:bg-primary/20">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined">person</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-primary uppercase tracking-wider">İlan Sahibi</span>
                                <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:underline">Profili Görüntüle</span>
                            </div>
                        </div>
                        <span className="material-symbols-outlined text-primary">arrow_forward</span>
                    </Link>
                )}

                {/* Comments */}
                <CommentSection itemId={ad.id} itemType="ad" />

                {/* Owner Actions */}
                {isOwner && (
                    <div className="flex flex-col gap-3 py-4">
                        <button className="w-full py-4 bg-red-50 dark:bg-red-900/10 border border-transparent text-red-500 font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors">
                            <span className="material-symbols-outlined">delete</span>
                            İlanı Sil
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}
