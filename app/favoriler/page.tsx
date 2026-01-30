'use client';

import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LikeButton from "@/components/social/LikeButton";

export default function FavoritesPage() {
    const supabase = createClient();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'pets' | 'ads'>('pets');
    const [favoritePets, setFavoritePets] = useState<any[]>([]);
    const [favoriteAds, setFavoriteAds] = useState<any[]>([]);

    useEffect(() => {
        const loadFavorites = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) {
                    router.push('/auth/login');
                    return;
                }

                // Fetch Liked Pets (Assuming 'likes' table is polymorphic)
                // We need to join with pets table. Supabase complex join or 2-step

                const { data: likedPetIds } = await supabase
                    .from('likes')
                    .select('item_id')
                    .eq('user_id', user.id)
                    .eq('item_type', 'pet');

                if (likedPetIds && likedPetIds.length > 0) {
                    const ids = likedPetIds.map(l => l.item_id);
                    const { data: pets } = await supabase.from('pets').select('*, profiles(full_name)').in('id', ids);
                    setFavoritePets(pets || []);
                }

                // Fetch Liked Ads
                const { data: likedAdIds } = await supabase
                    .from('likes')
                    .select('item_id')
                    .eq('user_id', user.id)
                    .eq('item_type', 'ad');

                if (likedAdIds && likedAdIds.length > 0) {
                    const ids = likedAdIds.map(l => l.item_id);
                    const { data: ads } = await supabase.from('ads').select('*').in('id', ids);
                    setFavoriteAds(ads || []);
                }

            } catch (err) {
                console.error("Fav load error", err);
            } finally {
                setLoading(false);
            }
        };
        loadFavorites();
    }, [router, supabase]);

    return (
        <main className="pb-24 min-h-screen bg-background-light dark:bg-background-dark font-display">
            <header className="sticky top-0 z-20 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-gray-200 dark:border-white/5 px-4 h-16 flex items-center gap-4">
                <Link href="/profil" className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5">
                    <span className="material-symbols-outlined">arrow_back</span>
                </Link>
                <h1 className="text-xl font-bold">Favorilerim</h1>
            </header>

            <div className="sticky top-16 z-10 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm px-4 pt-2">
                <div className="flex p-1 bg-gray-100 dark:bg-white/5 rounded-xl">
                    <button
                        onClick={() => setActiveTab('pets')}
                        className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'pets' ? 'bg-white dark:bg-surface-dark shadow-sm text-primary' : 'text-gray-500'}`}
                    >
                        Petler
                    </button>
                    <button
                        onClick={() => setActiveTab('ads')}
                        className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'ads' ? 'bg-white dark:bg-surface-dark shadow-sm text-primary' : 'text-gray-500'}`}
                    >
                        İlanlar
                    </button>
                </div>
            </div>

            <div className="p-4">
                {loading ? (
                    <div className="flex justify-center py-12">
                        <span className="material-symbols-outlined animate-spin text-3xl text-primary">progress_activity</span>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-4">
                        {activeTab === 'pets' && (
                            favoritePets.length > 0 ? favoritePets.map(pet => (
                                <Link href={`/pet/${pet.id}`} key={pet.id} className="bg-white dark:bg-surface-dark rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-white/5">
                                    <div className="aspect-square relative">
                                        <img src={pet.image_url} className="w-full h-full object-cover" />
                                        <div className="absolute top-2 right-2">
                                            <div className="bg-white/90 dark:bg-black/50 p-1.5 rounded-full backdrop-blur-sm">
                                                <span className="material-symbols-outlined text-[16px] text-pink-500" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-3">
                                        <h3 className="font-bold text-sm truncate">{pet.name}</h3>
                                        <p className="text-xs text-gray-500">{pet.profiles?.full_name}</p>
                                    </div>
                                </Link>
                            )) : (
                                <div className="col-span-2 text-center py-12 text-gray-400">
                                    <p>Henüz favori petiniz yok.</p>
                                </div>
                            )
                        )}

                        {activeTab === 'ads' && (
                            favoriteAds.length > 0 ? favoriteAds.map(ad => (
                                <Link href={`/ilanlar/${ad.id}`} key={ad.id} className="bg-white dark:bg-surface-dark rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-white/5">
                                    <div className="aspect-square relative">
                                        <img src={ad.photo_url || 'https://via.placeholder.com/300'} className="w-full h-full object-cover" />
                                        <div className="absolute top-2 right-2">
                                            <div className="bg-white/90 dark:bg-black/50 p-1.5 rounded-full backdrop-blur-sm">
                                                <span className="material-symbols-outlined text-[16px] text-pink-500" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                                            </div>
                                        </div>
                                        <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/60 text-white text-[9px] font-bold uppercase rounded">{ad.type}</span>
                                    </div>
                                    <div className="p-3">
                                        <h3 className="font-bold text-sm line-clamp-2 leading-tight">{ad.title}</h3>
                                        <p className="text-xs text-gray-500 mt-1">{ad.category}</p>
                                    </div>
                                </Link>
                            )) : (
                                <div className="col-span-2 text-center py-12 text-gray-400">
                                    <p>Henüz favori ilanınız yok.</p>
                                </div>
                            )
                        )}
                    </div>
                )}
            </div>
        </main>
    )
}
