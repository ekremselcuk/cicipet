'use client';

import { useState, useEffect } from 'react';
import { globalSearch } from '@/app/admin/actions';
import Link from 'next/link';

export default function GlobalSearch() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (query.length >= 3) {
                setLoading(true);
                const data = await globalSearch(query);
                setResults(data);
                setLoading(false);
                setShowResults(true);
            } else {
                setResults(null);
                setShowResults(false);
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [query]);

    return (
        <div className="relative w-full z-40">
            <div className="relative flex w-full items-center rounded-xl bg-[#362b1b] h-12">
                <div className="flex items-center justify-center pl-4 text-[#cbb690]">
                    <span className="material-symbols-outlined text-2xl">search</span>
                </div>
                <input
                    className="flex w-full flex-1 bg-transparent px-4 py-2 text-base text-white placeholder-[#cbb690] focus:outline-none focus:ring-0 border-none rounded-xl"
                    placeholder="En az 3 harf giriniz..."
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => query.length >= 3 && setShowResults(true)}
                    onBlur={() => setTimeout(() => setShowResults(false), 200)}
                />
                {loading && (
                    <div className="absolute right-4">
                        <span className="material-symbols-outlined animate-spin text-white">progress_activity</span>
                    </div>
                )}
            </div>

            {showResults && results && (
                <div className="absolute top-14 left-0 right-0 bg-white dark:bg-[#2a2216] rounded-xl shadow-xl border border-gray-100 dark:border-white/10 overflow-hidden max-h-[80vh] overflow-y-auto">
                    {/* Users */}
                    {results.users?.length > 0 && (
                        <div className="p-2">
                            <h3 className="text-xs font-bold text-gray-500 uppercase px-2 py-1">Kullanıcılar</h3>
                            {results.users.map((user: any) => (
                                <Link key={user.id} href={`/admin/kullanicilar/${user.id}`} className="flex items-center gap-3 p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg">
                                    <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                                        <img src={user.avatar_url || 'https://via.placeholder.com/32'} alt={user.full_name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-slate-900 dark:text-white">{user.full_name}</div>
                                        <div className="text-xs text-gray-500">{user.email}</div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* Pets */}
                    {results.pets?.length > 0 && (
                        <div className="p-2 border-t border-gray-100 dark:border-white/5">
                            <h3 className="text-xs font-bold text-gray-500 uppercase px-2 py-1">Petler</h3>
                            {results.pets.map((pet: any) => (
                                <Link key={pet.id} href={`/admin/petler/${pet.id}`} className="flex items-center gap-3 p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg">
                                    <div className="w-8 h-8 rounded-lg bg-gray-200 overflow-hidden">
                                        <img src={pet.image_url || 'https://via.placeholder.com/32'} alt={pet.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-slate-900 dark:text-white">{pet.name}</div>
                                        <div className="text-xs text-gray-500">{pet.type}</div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* Ads */}
                    {results.ads?.length > 0 && (
                        <div className="p-2 border-t border-gray-100 dark:border-white/5">
                            <h3 className="text-xs font-bold text-gray-500 uppercase px-2 py-1">İlanlar</h3>
                            {results.ads.map((ad: any) => (
                                <Link key={ad.id} href={`/admin/ilanlar/${ad.id}`} className="flex items-center gap-3 p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg">
                                    <div className="w-8 h-8 rounded-lg bg-gray-200 overflow-hidden">
                                        <img src={ad.photo_url || 'https://via.placeholder.com/32'} alt={ad.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">{ad.title}</div>
                                        <div className="text-xs text-gray-500">{ad.type}</div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* Contests */}
                    {results.contests?.length > 0 && (
                        <div className="p-2 border-t border-gray-100 dark:border-white/5">
                            <h3 className="text-xs font-bold text-gray-500 uppercase px-2 py-1">Yarışmalar</h3>
                            {results.contests.map((contest: any) => (
                                <Link key={contest.id} href={`/admin/yarisma/${contest.id}`} className="flex items-center gap-3 p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg">
                                    <div className="w-8 h-8 rounded-lg bg-gray-200 overflow-hidden">
                                        <img src={contest.image_url || 'https://via.placeholder.com/32'} alt={contest.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="text-sm font-bold text-slate-900 dark:text-white">{contest.title}</div>
                                </Link>
                            ))}
                        </div>
                    )}

                    {(!results.users?.length && !results.pets?.length && !results.ads?.length && !results.contests?.length) && (
                        <div className="p-4 text-center text-gray-500 text-sm">
                            Sonuç bulunamadı.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
