"use client";

import { useState } from "react";
import Link from "next/link";
import PhotoUploader from "@/components/form/PhotoUploader";
import BreedSelect from "@/components/form/BreedSelect";
import { PET_CATEGORIES } from "@/constants/petOptions";
import { createClient } from "@/utils/supabase/client";

export default function AdoptionAdPage() {
    const [formData, setFormData] = useState({
        category: 'kedi',
        breed: '',
        age: '',
        description: '',
        photo: null as File | null
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await new Promise(r => setTimeout(r, 1000));
        alert('İlan başarıyla oluşturuldu! (Simüle edildi)');
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark pb-24">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-gray-200 dark:border-white/5 px-4 h-14 flex items-center gap-3">
                <Link href="/ilanlar" className="p-1 -ml-1 text-slate-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
                    <span className="material-symbols-outlined">arrow_back</span>
                </Link>
                <h1 className="text-lg font-bold text-slate-900 dark:text-white">Sahiplendir</h1>
            </header>

            <main className="p-4">
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <PhotoUploader
                        colorTheme="green"
                        onFileSelect={(file) => setFormData({ ...formData, photo: file })}
                    />

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 dark:text-gray-300 ml-1">Kategorisi</label>
                        <div className="grid grid-cols-3 gap-3">
                            {PET_CATEGORIES.map((cat) => (
                                <label key={cat.id} className="cursor-pointer">
                                    <input
                                        type="radio"
                                        name="category"
                                        value={cat.id}
                                        checked={formData.category === cat.id}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value, breed: '' })}
                                        className="peer hidden"
                                    />
                                    <div className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-surface-dark peer-checked:border-green-500 peer-checked:bg-green-50 dark:peer-checked:bg-green-900/20 peer-checked:text-green-600 transition-all">
                                        <span className="material-symbols-outlined">{cat.icon}</span>
                                        <span className="text-xs font-bold">{cat.label}</span>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <BreedSelect
                            category={formData.category}
                            selectedBreed={formData.breed}
                            onSelect={(breed) => setFormData({ ...formData, breed })}
                            colorTheme="green"
                        />
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700 dark:text-gray-300 ml-1">Yaşı</label>
                            <input
                                type="number"
                                value={formData.age}
                                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                placeholder="Örn: 1"
                                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all dark:text-white text-sm"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-700 dark:text-gray-300 ml-1">Karakter Özellikleri / Hikayesi</label>
                        <textarea
                            rows={4}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Neden sahiplendiriyorsunuz? Huyu nasıl? Aşıları tam mı?"
                            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all dark:text-white text-sm resize-none"
                        ></textarea>
                    </div>

                    <button type="submit" className="w-full py-4 bg-green-500 text-white font-bold rounded-2xl shadow-lg shadow-green-500/30 hover:shadow-green-500/50 active:scale-[0.98] transition-all mt-2 flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined">check_circle</span>
                        {loading ? 'Yayınlanıyor...' : 'Sahiplendirme İlanı Oluştur'}
                    </button>
                    <p className="text-[10px] text-center text-gray-400 px-4">
                        *İlanınız yönetici onayından geçtikten sonra yayınlanacaktır.
                    </p>
                </form>
            </main>
        </div>
    );
}
