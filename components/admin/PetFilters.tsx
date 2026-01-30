'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

// Mock breed data for auto-suggestions or dropdown (user requested "kedi seçilirse kedi cinsi")
const BREEDS: Record<string, string[]> = {
    'Kedi': ['Tekir', 'Bombay', 'Siyam', 'Van', 'British Shorthair', 'Scottish Fold'],
    'Köpek': ['Golden', 'Terrier', 'Bulldog', 'Poodle', 'Chihuahua', 'Alman Kurdu'],
    'Kuş': ['Muhabbet', 'Papağan', 'Kanarya'],
    'Sürüngen': ['İguana', 'Kaplumbağa']
};

export default function PetFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isOpen, setIsOpen] = useState(true); // Open by default for better UX as per request

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

    const activeType = searchParams.get('type');

    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center mb-2">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-1.5 text-sm font-bold text-gray-500 hover:text-primary transition-colors"
                >
                    <span className="material-symbols-outlined text-[20px]">tune</span>
                    Detaylı Filtreleme
                    <span className={`material-symbols-outlined text-[18px] transition-transform ${isOpen ? 'rotate-180' : ''}`}>expand_more</span>
                </button>
            </div>

            {isOpen && (
                <div className="bg-white dark:bg-surface-dark p-4 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-4 animate-in slide-in-from-top-2">
                    {/* Breed Filter - Smart based on Type */}
                    <div>
                        <label className="text-xs text-gray-500 mb-1 block">Irk (Breed)</label>
                        {activeType && BREEDS[activeType] ? (
                            <select
                                defaultValue={searchParams.get('breed') || ''}
                                onChange={(e) => updateFilter('breed', e.target.value)}
                                className="w-full bg-gray-50 dark:bg-black/20 border-none rounded-lg text-sm px-3 py-2"
                            >
                                <option value="">Tümü ({activeType})</option>
                                {BREEDS[activeType].map(b => (
                                    <option key={b} value={b}>{b}</option>
                                ))}
                            </select>
                        ) : (
                            <input
                                type="text"
                                placeholder="Örn: Tekir"
                                defaultValue={searchParams.get('breed') || ''}
                                onChange={(e) => updateFilter('breed', e.target.value)}
                                className="w-full bg-gray-50 dark:bg-black/20 border-none rounded-lg text-sm px-3 py-2"
                            />
                        )}
                    </div>

                    {/* Age */}
                    <div>
                        <label className="text-xs text-gray-500 mb-1 block">Yaş</label>
                        <input
                            type="number"
                            placeholder="Yaş"
                            defaultValue={searchParams.get('age') || ''}
                            onChange={(e) => updateFilter('age', e.target.value)}
                            className="w-full bg-gray-50 dark:bg-black/20 border-none rounded-lg text-sm px-3 py-2"
                        />
                    </div>

                    {/* Gender - Added as requested */}
                    <div>
                        <label className="text-xs text-gray-500 mb-1 block">Cinsiyet</label>
                        <select
                            defaultValue={searchParams.get('gender') || ''}
                            onChange={(e) => updateFilter('gender', e.target.value)}
                            className="w-full bg-gray-50 dark:bg-black/20 border-none rounded-lg text-sm px-3 py-2"
                        >
                            <option value="">Tümü</option>
                            <option value="Male">Erkek</option>
                            <option value="Female">Dişi</option>
                        </select>
                    </div>

                    {/* Location */}
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
                </div>
            )}
        </div>
    );
}
