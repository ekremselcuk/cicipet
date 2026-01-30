'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function AdFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isOpen, setIsOpen] = useState(true); // Default open for visibility as requested "immediately below"

    const updateFilter = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        params.set('offset', '0'); // Reset pagination
        router.push(`?${params.toString()}`);
    };

    const typeFilter = searchParams.get('type'); // Category: Es Bulma etc.
    // User wants "Above category (type) selected -> Below filters: Category (Kedi/Kopek), Breed, Age...

    return (
        <div className="flex flex-col gap-2">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1.5 text-sm font-bold text-gray-500 hover:text-primary transition-colors w-fit"
            >
                <span className="material-symbols-outlined text-[20px]">tune</span>
                Detaylı Filtreleme
                <span className={`material-symbols-outlined text-[18px] transition-transform ${isOpen ? 'rotate-180' : ''}`}>expand_more</span>
            </button>

            {isOpen && (
                <div className="bg-white dark:bg-surface-dark p-4 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 animate-in slide-in-from-top-2">
                    {/* Category (Kedi/Kopek) - Referred to as 'category' in ads table */}
                    <div>
                        <label className="text-xs text-gray-500 mb-1 block">Tür (Kedi/Köpek)</label>
                        <select
                            defaultValue={searchParams.get('category') || ''}
                            onChange={(e) => updateFilter('category', e.target.value)}
                            className="w-full bg-gray-50 dark:bg-black/20 border-none rounded-lg text-sm px-3 py-2"
                        >
                            <option value="">Tümü</option>
                            <option value="kedi">Kedi</option>
                            <option value="kopek">Köpek</option>
                            <option value="kus">Kuş</option>
                            <option value="diger">Diğer</option>
                        </select>
                    </div>

                    {/* Breed */}
                    <div>
                        <label className="text-xs text-gray-500 mb-1 block">Irk (Cins)</label>
                        <input
                            type="text"
                            placeholder="Örn: Golden"
                            defaultValue={searchParams.get('breed') || ''}
                            onChange={(e) => updateFilter('breed', e.target.value)}
                            className="w-full bg-gray-50 dark:bg-black/20 border-none rounded-lg text-sm px-3 py-2"
                        />
                    </div>

                    {/* Age */}
                    <div>
                        <label className="text-xs text-gray-500 mb-1 block">Yaş</label>
                        <input
                            type="number"
                            placeholder="Maksimum Yaş"
                            defaultValue={searchParams.get('age') || ''}
                            onChange={(e) => updateFilter('age', e.target.value)}
                            className="w-full bg-gray-50 dark:bg-black/20 border-none rounded-lg text-sm px-3 py-2"
                        />
                    </div>

                    {/* Gender */}
                    <div>
                        <label className="text-xs text-gray-500 mb-1 block">Cinsiyet</label>
                        <select
                            defaultValue={searchParams.get('gender') || ''}
                            onChange={(e) => updateFilter('gender', e.target.value)}
                            className="w-full bg-gray-50 dark:bg-black/20 border-none rounded-lg text-sm px-3 py-2"
                        >
                            <option value="">Tümü</option>
                            <option value="Erkek">Erkek</option>
                            <option value="Dişi">Dişi</option>
                        </select>
                    </div>

                    {/* Location */}
                    <div>
                        <label className="text-xs text-gray-500 mb-1 block">Konum (Şehir)</label>
                        <input
                            type="text"
                            placeholder="Şehir Ara..."
                            defaultValue={searchParams.get('city') || ''}
                            onChange={(e) => updateFilter('city', e.target.value)}
                            className="w-full bg-gray-50 dark:bg-black/20 border-none rounded-lg text-sm px-3 py-2"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
