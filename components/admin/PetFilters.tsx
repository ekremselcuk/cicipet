'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function PetFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isOpen, setIsOpen] = useState(false);

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

    return (
        <div className="flex flex-col gap-2">
            <div className="flex gap-2 overflow-x-auto hide-scrollbar -mx-4 px-4 pb-2">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold shrink-0 transition-transform active:scale-95 ${isOpen ? 'bg-primary text-black' : 'bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 text-slate-700 dark:text-gray-300'}`}
                >
                    <span className="material-symbols-outlined text-[18px]">filter_list</span>
                    Filtrele
                </button>

                {/* Quick Type Filters */}
                {['Kedi', 'Köpek', 'Kuş', 'Sürüngen', 'Diğer'].map((type) => (
                    <button
                        key={type}
                        onClick={() => updateFilter('type', searchParams.get('type') === type ? '' : type)}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium shrink-0 whitespace-nowrap border transition-colors
                            ${searchParams.get('type') === type
                                ? 'bg-primary/20 border-primary text-primary-dark'
                                : 'bg-white dark:bg-surface-dark border-gray-200 dark:border-white/10 text-slate-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5'
                            }`}
                    >
                        {type}
                    </button>
                ))}
            </div>

            {isOpen && (
                <div className="bg-white dark:bg-surface-dark p-4 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm grid grid-cols-2 gap-4 animate-in slide-in-from-top-2">
                    <div>
                        <label className="text-xs text-gray-500 mb-1 block">Irk (Breed)</label>
                        <input
                            type="text"
                            placeholder="Örn: Tekir"
                            defaultValue={searchParams.get('breed') || ''}
                            onChange={(e) => updateFilter('breed', e.target.value)}
                            className="w-full bg-gray-50 dark:bg-black/20 border-none rounded-lg text-sm px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="text-xs text-gray-500 mb-1 block">Yaş (Tam Sayı)</label>
                        <input
                            type="number"
                            placeholder="Yaş"
                            defaultValue={searchParams.get('age') || ''}
                            onChange={(e) => updateFilter('age', e.target.value)}
                            className="w-full bg-gray-50 dark:bg-black/20 border-none rounded-lg text-sm px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="text-xs text-gray-500 mb-1 block">Şehir / Konum</label>
                        <input
                            type="text"
                            placeholder="Şehir Ara..."
                            defaultValue={searchParams.get('city') || ''}
                            onChange={(e) => updateFilter('city', e.target.value)}
                            className="w-full bg-gray-50 dark:bg-black/20 border-none rounded-lg text-sm px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="text-xs text-gray-500 mb-1 block">Durum</label>
                        <select
                            defaultValue={searchParams.get('status') || ''}
                            onChange={(e) => updateFilter('status', e.target.value)}
                            className="w-full bg-gray-50 dark:bg-black/20 border-none rounded-lg text-sm px-3 py-2"
                        >
                            <option value="">Tümü</option>
                            <option value="active">Aktif</option>
                            <option value="pending">Onay Bekliyor</option>
                            <option value="archived">Arşiv</option>
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
}
