import { requireAuth } from "@/utils/supabase/check-auth";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import MenuTrigger from "@/components/admin/MenuTrigger";

export const dynamic = 'force-dynamic';

export default async function AdminAdDetailPage({ params }: { params: { id: string } }) {
    await requireAuth();
    const supabase = await createClient();

    const { id } = await params;

    const { data: ad, error } = await supabase
        .from('ads')
        .select(`
            *,
            profiles:user_id (
                id,
                full_name,
                username
            )
        `)
        .eq('id', id)
        .single();

    if (error || !ad) {
        return (
            <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col items-center justify-center p-4">
                <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-2xl max-w-md w-full text-center border border-red-100 dark:border-red-900/20">
                    <span className="material-symbols-outlined text-4xl text-red-500 mb-4">error</span>
                    <h1 className="text-xl font-bold text-slate-900 dark:text-white mb-2">İlan Bulunamadı</h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                        Aradığınız ilan sistemde bulunamadı veya bir hata oluştu.
                    </p>
                    <div className="bg-white dark:bg-black/20 p-3 rounded-lg text-left text-xs font-mono overflow-auto max-h-40 mb-4 border border-gray-200 dark:border-white/10">
                        <div className="font-bold text-gray-500 mb-1">Hata Detayları:</div>
                        <div>ID: {id}</div>
                        {error && <div className="text-red-500 mt-1">{error.message}</div>}
                    </div>
                    <Link href="/admin/ilanlar" className="inline-block px-6 py-2 bg-primary text-black font-bold rounded-lg hover:bg-primary/90 transition-colors">
                        Listeye Dön
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display antialiased selection:bg-primary selection:text-black pb-24 min-h-screen">
            {/* Top Header */}
            <header className="sticky top-0 z-20 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-gray-200 dark:border-white/5 px-4 pt-4 pb-2">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        {/* Mobile Menu Trigger */}
                        <div className="md:hidden">
                            <MenuTrigger />
                        </div>
                        <Link
                            href="/admin/ilanlar"
                            className="p-2 -ml-2 text-slate-600 dark:text-gray-300 hover:text-primary transition-colors rounded-full hover:bg-black/5 dark:hover:bg-white/5"
                        >
                            <span className="material-symbols-outlined text-[24px]">arrow_back</span>
                        </Link>
                    </div>
                    <h1 className="text-xl font-bold tracking-tight text-center flex-1">
                        İlan Detayı
                    </h1>
                    <div className="flex gap-2 w-10 justify-end"></div>
                </div>
            </header>

            <main className="flex flex-col gap-6 p-4">
                {/* Hero Section */}
                <div className="relative rounded-2xl overflow-hidden shadow-lg h-64 w-full group">
                    <img
                        alt={ad.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        src={ad.photo_url || 'https://via.placeholder.com/400'}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 text-white z-10 w-full pr-6">
                        <h1 className="text-2xl font-extrabold tracking-tight mb-2 drop-shadow-lg">{ad.title}</h1>
                        <div className="flex flex-wrap items-center gap-2 text-white/95 text-sm font-semibold">
                            <span className={`px-2.5 py-1 rounded-lg text-white text-xs shadow-sm flex items-center gap-1
                                ${ad.type === 'kayip' ? 'bg-red-500' : ad.type === 'sahiplendirme' ? 'bg-green-500' : 'bg-pink-500'}`}>
                                <span className="material-symbols-outlined text-[14px]">confirmation_number</span> {ad.type}
                            </span>
                            <span className="w-1 h-1 bg-white rounded-full opacity-50"></span>
                            <span className="drop-shadow-md">{ad.category || 'Bilinmiyor'}</span>
                            <span className="w-1 h-1 bg-white rounded-full opacity-50"></span>
                            <span className="drop-shadow-md">{ad.city || 'Şehir Yok'}</span>
                        </div>
                        <div className="mt-2 text-sm opacity-90">
                            İlan Sahibi:{" "}
                            <Link href={ad.profiles?.id ? `/admin/kullanicilar/${ad.profiles.id}` : '#'} className="font-bold underline hover:text-primary transition-colors">
                                {ad.profiles?.full_name || ad.profiles?.username || 'Bilinmeyen'}
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center gap-2 p-3 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl font-bold hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors">
                        <span className="material-symbols-outlined">block</span>
                        Yasakla
                    </button>
                    <button className="flex items-center justify-center gap-2 p-3 bg-primary text-black rounded-xl font-bold hover:bg-primary/90 transition-colors">
                        <span className="material-symbols-outlined">edit</span>
                        Düzenle
                    </button>
                </div>

                {/* Details */}
                <div className="bg-white dark:bg-surface-dark rounded-xl p-5 shadow-sm border border-gray-100 dark:border-white/5 space-y-4">
                    <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
                        <span className="text-gray-500 font-medium">İlan ID</span>
                        <span className="text-xs font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{ad.id}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
                        <span className="text-gray-500 font-medium">Durum</span>
                        <span className={`text-xs font-bold px-2 py-1 rounded ${ad.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                            {ad.status === 'approved' ? 'Onaylı' : 'Beklemede'}
                        </span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
                        <span className="text-gray-500 font-medium">Oluşturulma Tarihi</span>
                        <span className="font-semibold">{new Date(ad.created_at).toLocaleDateString('tr-TR')}</span>
                    </div>
                    <div className="flex justify-between pb-1">
                        <span className="text-gray-500 font-medium">Açıklama</span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 italic bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                        {ad.description || "Açıklama yok."}
                    </p>
                </div>
            </main>
        </div>
    );
}
