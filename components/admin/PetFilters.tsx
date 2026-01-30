'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

// Expanded breed data to cover main categories
const BREEDS: Record<string, string[]> = {
    'Kedi': ['Tekir', 'Bombay', 'Siyam', 'Van', 'British Shorthair', 'Scottish Fold', 'Persian', 'Maine Coon', 'Sphynx'],
    'Köpek': ['Golden Retriever', 'Terrier', 'Bulldog', 'Poodle', 'Chihuahua', 'Alman Kurdu', 'Husky', 'Beagle', 'Pug'],
    'Kuş': ['Muhabbet Kuşu', 'Papağan', 'Kanarya', 'Finç', 'Güvercin'],
    'Sürüngen': ['İguana', 'Kaplumbağa', 'Bukalemun', 'Gecko'],
    'Diğer': ['Hamster', 'Tavşan', 'Gine Domuzu']
};

export default function PetFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isOpen, setIsOpen] = useState(true);

    const updateFilter = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        params.set('offset', '0');
        router.push(`?${params.toString()}`);
    };

    const activeType = searchParams.get('type');
    // If no type is selected, we can show a combined list or a generic label "Önce Tür Seçin"
    // User requested: "Üstten seçilen kategoriye göre... de cinsiyet filtresi gibi seçilebilir şekilde olsun." 
    // This implies robustness when a category is selected.

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
                    {/* Breed Filter - Dropdown Style */}
                    <div>
                        <label className="text-xs text-gray-500 mb-1 block">Irk (Breed)</label>
                        <select
                            defaultValue={searchParams.get('breed') || ''}
                            onChange={(e) => updateFilter('breed', e.target.value)}
                            className="w-full bg-gray-50 dark:bg-black/20 border-none rounded-lg text-sm px-3 py-2 disabled:opacity-50"
                            disabled={!activeType || !BREEDS[activeType.charAt(0).toUpperCase() + activeType.slice(1).toLowerCase()]}
                        >
                            {!activeType ? (
                                <option value="">Önce Pet Türü Seçiniz</option>
                            ) : (
                                <>
                                    <option value="">Tümü ({activeType})</option>
                                    {BREEDS[activeType.charAt(0).toUpperCase() + activeType.slice(1).toLowerCase()]?.map(b => (
                                        <option key={b} value={b}>{b}</option>
                                    ))}
                                </>
                            )}
                        </select>
                        {!activeType && <p className="text-[10px] text-orange-500 mt-1">Irk seçimi için yukarıdan tür seçmelisiniz.</p>}
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

                    {/* Gender */}
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
