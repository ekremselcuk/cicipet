'use client';

import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PhotoUploader from "@/components/form/PhotoUploader";

export default function AdminEventAddPage() {
    const supabase = createClient();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData(e.currentTarget);
            const title = formData.get('title') as string;
            const description = formData.get('description') as string;
            const topic = formData.get('topic') as string;

            let image_url = 'https://via.placeholder.com/600x300';

            if (imageFile) {
                const fileExt = imageFile.name.split('.').pop();
                const fileName = `event-${Date.now()}.${fileExt}`;
                const { error: uploadError } = await supabase.storage.from('images').upload(fileName, imageFile);
                if (!uploadError) {
                    const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(fileName);
                    image_url = publicUrl;
                }
            }

            const { error } = await supabase.from('events').insert({
                title,
                description,
                topic,
                image_url,
                start_date: new Date().toISOString(),
                status: 'active'
            });

            if (error) throw error;
            router.push('/admin/etkinlikler');
            router.refresh();

        } catch (error: any) {
            alert('Hata: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 pb-24 max-w-2xl mx-auto">
            <header className="flex items-center gap-4 mb-8">
                <Link href="/admin/etkinlikler" className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10">
                    <span className="material-symbols-outlined">arrow_back</span>
                </Link>
                <h1 className="text-2xl font-bold">Yeni Etkinlik Ekle</h1>
            </header>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6 bg-white dark:bg-surface-dark p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-white/5">
                <div>
                    <label className="block text-sm font-bold mb-2">Etkinlik Görseli</label>
                    <PhotoUploader onFileSelect={setImageFile} />
                </div>

                <div>
                    <label className="block text-sm font-bold mb-2">Başlık</label>
                    <input name="title" required className="w-full p-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/20" />
                </div>

                <div>
                    <label className="block text-sm font-bold mb-2">Açıklama</label>
                    <textarea name="description" required rows={4} className="w-full p-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/20"></textarea>
                </div>

                <div>
                    <label className="block text-sm font-bold mb-2">Konu</label>
                    <select name="topic" className="w-full p-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/20">
                        <option value="Genel">Genel</option>
                        <option value="Festival">Festival</option>
                        <option value="Seminer">Seminer</option>
                        <option value="Buluşma">Buluşma</option>
                    </select>
                </div>

                <button disabled={loading} className="w-full py-4 bg-primary text-black font-bold rounded-xl mt-4">
                    {loading ? 'Kaydediliyor...' : 'Etkinliği Oluştur'}
                </button>
            </form>
        </div>
    );
}
