"use client";

import { useState } from "react";
import Link from "next/link";
import PhotoUploader from "@/components/form/PhotoUploader";
import BreedSelect from "@/components/form/BreedSelect";
import { PET_CATEGORIES } from "@/constants/petOptions";
import { createClient } from "@/utils/supabase/client";

export default function MateAdPage() {
    const [formData, setFormData] = useState({
        category: 'kedi',
        breed: '',
        age: '',
        description: '',
        photo: null as File | null
    });
    const [loading, setLoading] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);
    const { analyzeImage } = require('@/utils/image-analysis');
    const router = require('next/navigation').useRouter();
    const supabase = createClient();

    const handlePhotoSelect = async (file: File) => {
        setFormData({ ...formData, photo: file });

        setAnalyzing(true);
        try {
            const result = await analyzeImage(file);
            setAnalyzing(false);

            if (!result.valid) {
                alert(`Görsel Reddedildi: ${result.reason}`);
                setFormData(prev => ({ ...prev, photo: null }));
            }
        } catch (error) {
            console.error("Analysis error:", error);
            setAnalyzing(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!termsAccepted) {
            alert('Lütfen görsel yükleme şartlarını kabul edin.');
            return;
        }

        setLoading(true);

        try {
            let photoUrl = null;
            if (formData.photo) {
                // Mock Upload
                photoUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuAnLEykf_jW6kowf6oISTaUimFCqyGZ6J6r4QLKJSghKFPC-DKcR9W8mb-Sd42s82AqUu7_Uop0pSPcONvrojB-2JT08JnFKd5SOPeT-lAaOwuUtKR5MH1uT-5iYi-yKjuIM5uA2j3Ke2QLU1rb4evjs9C5otGWCCKgGmN6NcELFrhkKPK2B7Kt2Lm1WO1K-tYtGk6MYgYugM-8mskwdo5OEDqNM-IPdqcjkADRW4QyER6ctL2Jk5S_6wEm9Lkg-C6h_jGpHnifTeM";
            }

            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                const { error } = await supabase.from('ads').insert({
                    user_id: user.id,
                    type: 'es_bulma',
                    category: formData.category,
                    breed: formData.breed || 'Diğer',
                    age: formData.age ? parseInt(formData.age) : null,
                    description: formData.description,
                    photo_url: photoUrl,
                    status: 'pending'
                });

                if (error) {
                    console.error('Ad Error:', error);
                    alert('İlan oluşturulurken hata oluştu.');
                } else {
                    alert('İlan başarıyla oluşturuldu ve onaya gönderildi.');
                    router.push('/ilanlar');
                    router.refresh();
                }
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark pb-24">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-gray-200 dark:border-white/5 px-4 h-14 flex items-center gap-3">
                <Link href="/ilanlar" className="p-1 -ml-1 text-slate-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
                    <span className="material-symbols-outlined">arrow_back</span>
                </Link>
                <h1 className="text-lg font-bold text-slate-900 dark:text-white">Eş Bul</h1>
            </header>

            <main className="p-4">
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="relative">
                        <PhotoUploader
                            colorTheme="pink"
                            onFileSelect={handlePhotoSelect}
                        />
                        {analyzing && (
                            <div className="absolute inset-0 bg-black/50 rounded-2xl flex flex-col items-center justify-center text-white backdrop-blur-sm z-10">
                                <span className="material-symbols-outlined animate-spin text-3xl mb-2">smart_toy</span>
                                <span className="font-bold text-sm">İnceleniyor...</span>
                            </div>
                        )}
                    </div>

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
                                    <div className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-surface-dark peer-checked:border-pink-500 peer-checked:bg-pink-50 dark:peer-checked:bg-pink-900/20 peer-checked:text-pink-600 transition-all">
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
                            colorTheme="pink"
                        />
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700 dark:text-gray-300 ml-1">Yaşı <span className="text-pink-500">*</span></label>
                            <input
                                type="number"
                                required
                                value={formData.age}
                                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                placeholder="Örn: 3"
                                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all dark:text-white text-sm"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-700 dark:text-gray-300 ml-1">Aradığınız Özellikler <span className="text-pink-500">*</span></label>
                        <textarea
                            rows={4}
                            required
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Dostunuz için nasıl bir eş arıyorsunuz?"
                            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all dark:text-white text-sm resize-none"
                        ></textarea>
                    </div>

                    <label className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 dark:bg-white/5 cursor-pointer hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                        <div className="relative flex items-center mt-0.5">
                            <input
                                type="checkbox"
                                required
                                checked={termsAccepted}
                                onChange={(e) => setTermsAccepted(e.target.checked)}
                                className="peer h-5 w-5 rounded-md border-gray-300 text-pink-500 focus:ring-pink-500 dark:border-gray-600 dark:bg-gray-700"
                            />
                        </div>
                        <span className="text-xs text-slate-600 dark:text-gray-400">
                            Yüklediğim görselin genel ahlak kurallarına uygun olduğunu ve <strong>gerçek bir evcil hayvan görseli</strong> olduğunu kabul ediyorum.
                        </span>
                    </label>

                    <button type="submit" className="w-full py-4 bg-pink-500 text-white font-bold rounded-2xl shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 active:scale-[0.98] transition-all mt-2 flex items-center justify-center gap-2 disabled:opacity-50">
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                        {loading ? 'Yayınlanıyor...' : 'Eş Bulma İlanı Oluştur'}
                    </button>
                    <p className="text-[10px] text-center text-gray-400 px-4">
                        *İlanınız yönetici onayından geçtikten sonra yayınlanacaktır.
                    </p>
                </form>
            </main>
        </div>
    );
}
