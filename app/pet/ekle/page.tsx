'use client';

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PhotoUploader from "@/components/form/PhotoUploader";
import BreedSelect from "@/components/form/BreedSelect";
import { PET_CATEGORIES } from "@/constants/petOptions";
import { createClient } from "@/utils/supabase/client";

export default function AddPetPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        category: 'kedi',
        breed: '',
        age: '',
        photo: null as File | null
    });

    // Dynamic import to avoid SSR issues with some libs if any, though here it's fine.
    // We'll use the one we created.
    const { analyzeImage } = require('@/utils/image-analysis');

    const supabase = createClient();

    const handlePhotoSelect = async (file: File) => {
        setFormData({ ...formData, photo: file });

        // Immediate AI Analysis
        setAnalyzing(true);
        try {
            const result = await analyzeImage(file);
            setAnalyzing(false);

            if (!result.valid) {
                alert(`Görsel Reddedildi: ${result.reason}`);
                setFormData(prev => ({ ...prev, photo: null })); // Clear invalid photo
            } else {
                // Success feedback (optional, or just show photo)
            }
        } catch (error) {
            console.error("Analysis error:", error);
            setAnalyzing(false);
        }
    };

    const handleUpload = async (file: File) => {
        // 1. Upload to Supabase Storage
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        // Mock URL for now as per previous implementation logic
        return "https://lh3.googleusercontent.com/aida-public/AB6AXuACdszP9Owo_giuD_cOFvDCsciUgRRjCl0ttEGK3iHXjRAhptbmyrguHv_21pMgTgv_Xodgo5ttPM5uce6UG2OXLM1Af-B7w3hzhZWDAlzu_DtLvxvUVsqJdBk01qAExuoaIDNx-zYh7UsvHr9QiiXKjXtn2RE6uKGGDLiCR387D6wmRHWR46SCtAlSm2scpx9_ShOKTMsrBvfT-HlFN3RofYqmBYTQD_6oHBzkn_z5W-Z2EQo82YaqmbmLDc66RiqsVPVpVrS6-u4";
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!termsAccepted) {
            alert("Lütfen kuralları kabul ediniz.");
            return;
        }

        if (!formData.name || !formData.age) {
            alert("Lütfen isim ve yaş alanlarını doldurunuz.");
            return;
        }

        setLoading(true);

        try {
            let photoUrl = null;
            if (formData.photo) {
                photoUrl = await handleUpload(formData.photo);
            }

            // Get current user
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                // Insert into 'pets' table with 'pending' status
                const { error } = await supabase.from('pets').insert({
                    owner_id: user.id,
                    name: formData.name,
                    type: formData.category,
                    breed: formData.breed || 'Diğer',
                    age: (formData.age && !isNaN(parseInt(formData.age))) ? parseInt(formData.age) : null,
                    image_url: photoUrl,
                    status: 'pending' // Moderation required
                });

                if (error) {
                    console.error('Error adding pet:', error);
                    alert('Pet eklenirken bir hata oluştu.');
                } else {
                    router.push('/profil');
                    router.refresh();
                }
            }
        } catch (error) {
            console.error('Unexpected error:', error);
            alert('Bir hata oluştu. Lütfen tekrar deneyin.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark pb-24">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-gray-200 dark:border-white/5 px-4 h-14 flex items-center gap-3">
                <Link href="/profil" className="p-1 -ml-1 text-slate-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
                    <span className="material-symbols-outlined">arrow_back</span>
                </Link>
                <h1 className="text-lg font-bold text-slate-900 dark:text-white">Pet Ekle</h1>
            </header>

            <main className="p-4">
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    {/* Photo Upload with Analysis Status */}
                    <div className="relative">
                        <PhotoUploader
                            onFileSelect={handlePhotoSelect}
                        />
                        {analyzing && (
                            <div className="absolute inset-0 bg-black/50 rounded-2xl flex flex-col items-center justify-center text-white backdrop-blur-sm z-10">
                                <span className="material-symbols-outlined animate-spin text-3xl mb-2">smart_toy</span>
                                <span className="font-bold text-sm">Yapay Zeka Görseli İnceliyor...</span>
                            </div>
                        )}
                    </div>

                    {/* Name */}
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-700 dark:text-gray-300 ml-1">Pet İsmi <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Örn: Pamuk"
                            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white text-sm"
                        />
                    </div>

                    {/* Category Selection */}
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
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="peer hidden"
                                    />
                                    <div className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-surface-dark peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary transition-all">
                                        <span className="material-symbols-outlined">{cat.icon}</span>
                                        <span className="text-xs font-bold">{cat.label}</span>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <BreedSelect
                            category={formData.category}
                            selectedBreed={formData.breed}
                            onSelect={(breed) => setFormData({ ...formData, breed })}
                            colorTheme="primary"
                        />

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700 dark:text-gray-300 ml-1">Yaşı <span className="text-red-500">*</span></label>
                            <input
                                type="number"
                                required
                                value={formData.age}
                                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                placeholder="Örn: 2"
                                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white text-sm"
                            />
                        </div>
                    </div>

                    {/* Terms Checkbox */}
                    <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                        <div className="relative flex items-center">
                            <input
                                type="checkbox"
                                id="terms"
                                checked={termsAccepted}
                                onChange={(e) => setTermsAccepted(e.target.checked)}
                                className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-slate-300 transition-all checked:border-primary checked:bg-primary"
                            />
                            <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </span>
                        </div>
                        <label htmlFor="terms" className="text-xs text-slate-600 dark:text-slate-300 cursor-pointer select-none">
                            Yüklediğim görselin <span className="font-bold text-primary">kendi evcil hayvanıma</span> ait olduğunu,
                            topluluk kurallarına uygun olduğunu ve NSFW (Uygunsuz) içerik barındırmadığını kabul ediyorum.
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading || analyzing || !termsAccepted}
                        className="w-full py-4 bg-primary text-black font-bold rounded-2xl shadow-lg shadow-primary/30 hover:shadow-primary/50 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Ekleniyor...' : (analyzing ? 'Görsel İnceleniyor...' : 'Kaydet ve Onaya Gönder')}
                    </button>

                    <p className="text-center text-[10px] text-gray-400">
                        * Eklenen petler moderasyon onayından sonra profilinizde yayınlanacaktır.
                    </p>
                </form>
            </main>
        </div>
    );
}
