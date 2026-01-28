"use client";

import { PET_CATEGORIES, PET_BREEDS } from "@/constants/petOptions";

interface BreedSelectProps {
    category: string;
    selectedBreed: string;
    onSelect: (breed: string) => void;
    colorTheme?: string;
}

export default function BreedSelect({ category, selectedBreed, onSelect, colorTheme = 'primary' }: BreedSelectProps) {
    const breeds = PET_BREEDS[category] || [];

    if (breeds.length === 0) return null;

    const focusRing = {
        primary: 'focus:ring-primary',
        red: 'focus:ring-red-500',
        pink: 'focus:ring-pink-500',
        green: 'focus:ring-green-500',
    }[colorTheme] || 'focus:ring-primary';

    return (
        <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700 dark:text-gray-300 ml-1">Cinsi (Irkı)</label>
            <div className="relative">
                <select
                    value={selectedBreed}
                    onChange={(e) => onSelect(e.target.value)}
                    className={`w-full px-4 py-3 pr-10 rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 focus:ring-2 ${focusRing} focus:border-transparent outline-none transition-all dark:text-white text-sm appearance-none`}
                >
                    <option value="" disabled>Seçiniz</option>
                    {breeds.map((breed) => (
                        <option key={breed} value={breed}>{breed}</option>
                    ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                    <span className="material-symbols-outlined">expand_more</span>
                </div>
            </div>
        </div>
    );
}
