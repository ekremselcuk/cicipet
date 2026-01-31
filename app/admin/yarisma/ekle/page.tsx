'use client';

import { createContest } from "@/app/admin/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CATEGORY_GROUPS = [
    {
        label: "Cinsiyete Göre",
        options: [
            { label: "En Yakışıklı (Erkek)", value: "en_yakisikli", req: { gender: "Male" } },
            { label: "En Güzel (Dişi)", value: "en_guzel", req: { gender: "Female" } },
            { label: "Tüm Kategoriler (Genel)", value: "genel_cinsiyet", req: {} }
        ]
    },
    {
        label: "Yetenek & Özellik",
        options: [
            { label: "Komiklik", value: "komiklik", req: {} },
            { label: "Uyku Hali", value: "uyku", req: {} },
            { label: "Yetenek", value: "yetenek", req: {} },
            { label: "Karışık", value: "karisik", req: {} }
        ]
    },
    {
        label: "Yaş Grubu",
        options: [
            { label: "Yavrular (Tümü)", value: "yavrular", req: { max_age: 1 } }
        ]
    },
    {
        label: "Özel Tür",
        options: [
            { label: "Akvaryum Yıldızı (Sadece Balıklar)", value: "akvaryum", req: { type: "kus", type_override: "fish_logic_placeholder" } } // logic to be refined
        ]
    }
];

export default function AddContestPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<any>(null);

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.currentTarget);

        if (selectedCategory) {
            formData.set('category', selectedCategory.value);
            formData.set('requirements', JSON.stringify(selectedCategory.req));
        }

        const res = await createContest(formData);

        setLoading(false);
        if (res.error) {
            alert("Hata: " + res.error);
        } else {
            alert("Yarışma başarıyla oluşturuldu!");
            router.push("/admin/yarisma");
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black p-4 pb-24">
            <header className="flex items-center gap-2 mb-6">
                <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10">
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <h1 className="text-xl font-bold">Yeni Yarışma Ekle</h1>
            </header>

            <form onSubmit={onSubmit} className="max-w-xl mx-auto flex flex-col gap-4 bg-white dark:bg-surface-dark p-6 rounded-xl shadow-sm">
                <div>
                    <label className="block text-sm font-bold mb-1">Yarışma Başlığı</label>
                    <input name="title" required placeholder="Örn: Haftanın En Komik Kedisi" className="w-full bg-gray-50 dark:bg-black/20 border-none rounded-lg p-3" />
                </div>

                <div>
                    <label className="block text-sm font-bold mb-1">Yarışma Görseli</label>
                    {/* @ts-ignore */}
                    <input type="file" name="image" accept="image/*" className="w-full bg-gray-50 dark:bg-black/20 border-none rounded-lg p-3" />
                    <p className="text-xs text-gray-400 mt-1">Önerilen: 1200x600px, max 5MB</p>
                </div>

                <div>
                    <label className="block text-sm font-bold mb-1">Açıklama</label>
                    <textarea name="description" rows={3} placeholder="Yarışma detayları..." className="w-full bg-gray-50 dark:bg-black/20 border-none rounded-lg p-3" />
                </div>

                <div>
                    <label className="block text-sm font-bold mb-1">Kategori Seçimi</label>
                    <div className="grid grid-cols-1 gap-2">
                        {CATEGORY_GROUPS.map(group => (
                            <div key={group.label} className="border border-gray-100 dark:border-white/5 rounded-lg p-3">
                                <p className="text-xs font-bold text-gray-400 uppercase mb-2">{group.label}</p>
                                <div className="grid grid-cols-2 gap-2">
                                    {group.options.map(opt => (
                                        <button
                                            key={opt.value}
                                            type="button"
                                            onClick={() => setSelectedCategory(opt)}
                                            className={`text-sm text-left px-3 py-2 rounded-lg transition-colors border ${selectedCategory?.value === opt.value ? 'bg-primary/10 border-primary text-primary-dark font-bold' : 'bg-gray-50 dark:bg-black/20 border-transparent hover:bg-gray-100'}`}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <input type="hidden" name="category" value={selectedCategory?.value || ''} required />
                </div>

                <div>
                    <label className="block text-sm font-bold mb-1">Anasayfa Widget Yerleşimi</label>
                    <select name="widget_placement" className="w-full bg-gray-50 dark:bg-black/20 border-none rounded-lg p-3">
                        <option value="none">Gösterme (Sadece Liste)</option>
                        <option value="main_widget">Anasayfa Vitrin (Hikayelerin Altı)</option>
                    </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold mb-1">Başlangıç Tarihi</label>
                        <input type="date" name="start_date" required className="w-full bg-gray-50 dark:bg-black/20 border-none rounded-lg p-3" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-1">Bitiş Tarihi</label>
                        <input type="date" name="end_date" required className="w-full bg-gray-50 dark:bg-black/20 border-none rounded-lg p-3" />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="mt-4 bg-primary text-black font-bold py-3 rounded-xl hover:opacity-90 disabled:opacity-50 transition-all active:scale-95"
                >
                    {loading ? 'Oluşturuluyor...' : 'Yarışmayı Oluştur'}
                </button>
            </form>
        </div>
    );
}
