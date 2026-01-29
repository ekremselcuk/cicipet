'use client';

import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MyAdsPage() {
    const supabase = createClient();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [ads, setAds] = useState<any[]>([]);

    useEffect(() => {
        const loadAds = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) {
                    router.push('/auth/login');
                    return;
                }

                // Fetch ads
                const { data: userAds, error } = await supabase
                    .from('ads')
                    .select('*')
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false });

                if (!error && userAds) {
                    setAds(userAds);
                }
            } catch (err) {
                console.error("Error loading ads:", err);
            } finally {
                setLoading(false);
            }
        };

        loadAds();
    }, [router, supabase]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
                <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
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
                <h1 className="text-lg font-bold text-slate-900 dark:text-white">İlanlarım</h1>
            </header>

            <main className="p-4 space-y-6">
                {/* Action Buttons - Always Visible */}
                <div className="grid grid-cols-3 gap-2">
                    <Link href="/ilanlar/ekle?type=kayip" className="flex flex-col items-center justify-center p-3 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors gap-2">
                        <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">
                            <span className="material-symbols-outlined">campaign</span>
                        </div>
                        <span className="text-xs font-bold text-center text-red-700 dark:text-red-300">Kayıp İlanı</span>
                    </Link>
                    <Link href="/ilanlar/ekle?type=es-bulma" className="flex flex-col items-center justify-center p-3 bg-pink-50 dark:bg-pink-900/10 border border-pink-100 dark:border-pink-900/30 rounded-xl hover:bg-pink-100 dark:hover:bg-pink-900/20 transition-colors gap-2">
                        <div className="w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center text-pink-600 dark:text-pink-400">
                            <span className="material-symbols-outlined">favorite</span>
                        </div>
                        <span className="text-xs font-bold text-center text-pink-700 dark:text-pink-300">Eş Bulma</span>
                    </Link>
                    <Link href="/ilanlar/ekle?type=sahiplendirme" className="flex flex-col items-center justify-center p-3 bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30 rounded-xl hover:bg-green-100 dark:hover:bg-green-900/20 transition-colors gap-2">
                        <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                            <span className="material-symbols-outlined">pets</span>
                        </div>
                        <span className="text-xs font-bold text-center text-green-700 dark:text-green-300">Sahiplendirme</span>
                    </Link>
                </div>

                {/* Ads List */}
                <div className="space-y-4">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white px-1">İlan Listesi ({ads.length})</h2>
                    {ads.length === 0 ? (
                        <div className="text-center py-12 px-4 bg-white dark:bg-surface-dark rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
                            <div className="w-16 h-16 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-400">
                                <span className="material-symbols-outlined text-3xl">inbox</span>
                            </div>
                            <p className="text-gray-500 dark:text-gray-400 font-medium">Henüz bir ilanın bulunmuyor.</p>
                            <p className="text-xs text-gray-400 mt-1">Yukarıdaki butonları kullanarak yeni bir ilan oluşturabilirsin.</p>
                        </div>
                    ) : (
                        ads.map((ad) => (
                            <div key={ad.id} className="bg-white dark:bg-surface-dark rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-white/5 flex gap-4">
                                <div className="w-24 h-24 flex-shrink-0 bg-gray-100 dark:bg-white/5 rounded-xl overflow-hidden">
                                    <img
                                        src={ad.photo_url || "https://via.placeholder.com/150"}
                                        alt={ad.title || ad.category}
                                        className="w-full h-full object-cover"
                                        onError={(e) => (e.target as HTMLImageElement).src = "https://via.placeholder.com/150"}
                                    />
                                </div>
                                <div className="flex-1 flex flex-col justify-between py-1">
                                    <div>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide
                                                ${ad.type === 'kayip' ? 'bg-red-100 text-red-600 dark:bg-red-900/30' :
                                                    ad.type === 'sahiplendirme' ? 'bg-green-100 text-green-600 dark:bg-green-900/30' :
                                                        'bg-pink-100 text-pink-600 dark:bg-pink-900/30'}`}>
                                                {ad.type === 'kayip' ? 'Kayıp' : ad.type === 'sahiplendirme' ? 'Sahiplendirme' : 'Eş Bulma'}
                                            </span>
                                            {ad.status === 'pending' && (
                                                <span className="flex items-center gap-1 text-[10px] text-orange-500 font-bold bg-orange-50 dark:bg-orange-900/10 px-2 py-0.5 rounded-full border border-orange-200 dark:border-orange-500/20">
                                                    <span className="material-symbols-outlined text-[12px]">hourglass_top</span>
                                                    Onay Bekliyor
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="font-bold text-slate-900 dark:text-white line-clamp-1">{ad.title || `${ad.breed} ${ad.category}`}</h3>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">{ad.description}</p>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-400 mt-2">
                                        <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                                        {new Date(ad.created_at).toLocaleDateString('tr-TR')}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
}
