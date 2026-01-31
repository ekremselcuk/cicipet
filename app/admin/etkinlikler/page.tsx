import { requireAdmin } from "@/utils/supabase/check-auth";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import MenuTrigger from "@/components/admin/MenuTrigger";

export const dynamic = 'force-dynamic';

export default async function AdminEventsPage() {
    await requireAdmin();
    const supabase = await createClient();

    const { data: events, error } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });

    return (
        <div className="relative flex flex-col h-full min-h-screen pb-24 bg-background-light dark:bg-background-dark text-slate-900 dark:text-white">
            {/* Header */}
            <header className="sticky top-0 z-20 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-gray-200 dark:border-white/5 px-4 pt-4 pb-2">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <div className="md:hidden">
                            <MenuTrigger />
                        </div>
                        <h1 className="text-xl font-bold tracking-tight">Etkinlik Yönetimi</h1>
                    </div>
                    <Link href="/admin/etkinlikler/ekle" className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">add_circle</span>
                        Yeni Etkinlik
                    </Link>
                </div>
            </header>

            <main className="flex flex-col gap-4 p-4">
                {events?.length === 0 ? (
                    <div className="text-center p-8 bg-white dark:bg-surface-dark rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
                        <p className="text-gray-500">Henüz kayıtlı etkinlik yok.</p>
                    </div>
                ) : (
                    events?.map((event: any) => (
                        <div key={event.id} className="bg-white dark:bg-surface-dark rounded-xl p-4 shadow-sm border border-gray-200 dark:border-white/5 flex gap-4">
                            <div className="w-24 h-24 rounded-lg bg-cover bg-center shrink-0" style={{ backgroundImage: `url('${event.image_url || 'https://via.placeholder.com/150'}' )` }}></div>
                            <div className="flex-1">
                                <h3 className="font-bold text-lg mb-1">{event.title}</h3>
                                <p className="text-sm text-gray-500 line-clamp-2 mb-2">{event.description}</p>
                                <div className="flex gap-2 text-xs font-bold">
                                    <span className="bg-primary/10 text-primary px-2 py-1 rounded-full">{event.topic}</span>
                                    <span className={`px-2 py-1 rounded-full ${event.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                        {event.status === 'active' ? 'Aktif' : 'Pasif'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </main>
        </div>
    );
}
