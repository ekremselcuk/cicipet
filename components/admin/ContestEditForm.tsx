'use client';

import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import PhotoUploader from "@/components/form/PhotoUploader";
import { useRouter } from "next/navigation";

export default function ContestEditForm({ contest }: { contest: any }) {
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
            const start_date = formData.get('start_date') as string;
            const end_date = formData.get('end_date') as string;
            const status = formData.get('status') as string;

            let image_url = contest.image_url;

            if (imageFile) {
                const fileExt = imageFile.name.split('.').pop();
                const fileName = `contest-${Date.now()}.${fileExt}`;
                const { error: uploadError } = await supabase.storage.from('contest-images').upload(fileName, imageFile);
                if (!uploadError) {
                    const { data: { publicUrl } } = supabase.storage.from('contest-images').getPublicUrl(fileName);
                    image_url = publicUrl;
                }
            }

            const { error } = await supabase.from('contests')
                .update({
                    title,
                    description,
                    start_date,
                    end_date,
                    status,
                    image_url
                })
                .eq('id', contest.id);

            if (error) throw error;
            router.refresh();
            alert('Yarışma güncellendi!');

        } catch (error: any) {
            alert('Hata: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex gap-4">
                <div className="shrink-0 w-32">
                    <label className="block text-sm font-bold mb-2">Mevcut Görsel</label>
                    <img src={contest.image_url || 'https://via.placeholder.com/150'} className="w-full h-24 object-cover rounded-lg" />
                </div>
                <div className="flex-1">
                    <label className="block text-sm font-bold mb-2">Görseli Değiştir</label>
                    <PhotoUploader onFileSelect={setImageFile} />
                </div>
            </div>

            <div>
                <label className="block text-sm font-bold mb-2">Başlık</label>
                <input name="title" defaultValue={contest.title} required className="w-full p-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/20" />
            </div>

            <div>
                <label className="block text-sm font-bold mb-2">Açıklama</label>
                <textarea name="description" defaultValue={contest.description} required rows={4} className="w-full p-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/20"></textarea>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-bold mb-2">Başlangıç Tarihi</label>
                    <input type="datetime-local" name="start_date" defaultValue={new Date(contest.start_date).toISOString().slice(0, 16)} className="w-full p-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/20" />
                </div>
                <div>
                    <label className="block text-sm font-bold mb-2">Bitiş Tarihi</label>
                    <input type="datetime-local" name="end_date" defaultValue={new Date(contest.end_date).toISOString().slice(0, 16)} className="w-full p-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/20" />
                </div>
            </div>

            <div>
                <label className="block text-sm font-bold mb-2">Durum</label>
                <select name="status" defaultValue={contest.status} className="w-full p-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/20">
                    <option value="active">Aktif</option>
                    <option value="upcoming">Yaklaşan</option>
                    <option value="ended">Biten</option>
                </select>
            </div>

            <button disabled={loading} className="w-full py-4 bg-primary text-black font-bold rounded-xl mt-4">
                {loading ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
            </button>
        </form>
    );
}
