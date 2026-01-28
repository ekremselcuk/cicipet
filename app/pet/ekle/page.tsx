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
    const [formData, setFormData] = useState({
        name: '',
        category: 'kedi',
        breed: '',
        age: '',
        photo: null as File | null
    });

    const supabase = createClient();

    const handleUpload = async (file: File) => {
        // 1. Upload to Supabase Storage
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        /* 
           Note: Ensure 'pets_images' bucket exists in Supabase.
           If not, this will fail. For demo/prototype without direct DB access, 
           we simulate success or log error.
        */

        // In a real scenario, we'd do:
        // const { error: uploadError } = await supabase.storage.from('pets_images').upload(filePath, file);
        // const { data } = supabase.storage.from('pets_images').getPublicUrl(filePath);

        // For now, we'll assume we get a URL or skip actual storage if buckets aren't set up.
        // Just returning a mock/local URL for the "DB Insert" step effectively.
        return "https://lh3.googleusercontent.com/aida-public/AB6AXuACdszP9Owo_giuD_cOFvDCsciUgRRjCl0ttEGK3iHXjRAhptbmyrguHv_21pMgTgv_Xodgo5ttPM5uce6UG2OXLM1Af-B7w3hzhZWDAlzu_DtLvxvUVsqJdBk01qAExuoaIDNx-zYh7UsvHr9QiiXKjXtn2RE6uKGGDLiCR387D6wmRHWR46SCtAlSm2scpx9_ShOKTMsrBvfT-HlFN3RofYqmBYTQD_6oHBzkn_z5W-Z2EQo82YaqmbmLDc66RiqsVPVpVrS6-u4";
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let photoUrl = null;
            if (formData.photo) {
                photoUrl = await handleUpload(formData.photo);
            }

            // Get current user
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                // Insert into 'pets' table
                const { error } = await supabase.from('pets').insert({
                    owner_id: user.id,
                    name: formData.name,
                    type: formData.category,
                    breed: formData.breed || 'Diğer',
                    age: formData.age ? parseInt(formData.age) : null,
                    image_url: photoUrl
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
                    {/* Photo Upload */}
                    <PhotoUploader
                        onFileSelect={(file) => setFormData({ ...formData, photo: file })}
                    />

                    {/* Name */}
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-700 dark:text-gray-300 ml-1">Pet İsmi</label>
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
                            <label className="text-sm font-medium text-slate-700 dark:text-gray-300 ml-1">Yaşı</label>
                            <input
                                type="number"
                                value={formData.age}
                                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                placeholder="Örn: 2"
                                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white text-sm"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-primary text-black font-bold rounded-2xl shadow-lg shadow-primary/30 hover:shadow-primary/50 active:scale-[0.98] transition-all mt-4 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {loading ? 'Ekleniyor...' : 'Kaydet'}
                    </button>
                </form>
            </main>
        </div>
    );
}
