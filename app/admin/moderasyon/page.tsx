import MenuTrigger from "@/components/admin/MenuTrigger";
import ModerationGrid from "@/components/admin/ModerationGrid";
import { requireAdmin } from "@/utils/supabase/check-auth";
import { createClient } from "@/utils/supabase/server";

export const dynamic = 'force-dynamic';

export default async function AdminModerationPage() {
    await requireAdmin();
    const supabase = await createClient();

    // Fetch Pending Pets
    const { data: pets } = await supabase
        .from('pets')
        .select('*')
        .eq('status', 'pending');

    // Fetch Pending Ads
    const { data: ads } = await supabase
        .from('ads')
        .select('*')
        .eq('status', 'pending');

    // Transform to unified format directly
    const items = [
        ...(pets || []).map((p: any) => ({
            id: p.id,
            type: 'pet' as const,
            subType: p.type, // e.g. kedi
            title: p.name,
            owner: p.owner_id.slice(0, 8), // shorten for UI
            image: p.image_url || 'https://via.placeholder.com/150',
            date: p.created_at || new Date().toISOString()
        })),
        ...(ads || []).map((a: any) => ({
            id: a.id,
            type: 'ad' as const,
            subType: a.type, // e.g. kayip
            title: `${a.type === 'kayip' ? 'Kayıp' : a.type} - ${a.category}`,
            owner: a.user_id.slice(0, 8),
            image: a.photo_url || 'https://via.placeholder.com/150',
            date: a.created_at || new Date().toISOString()
        }))
    ];

    return (
        <div className="relative min-h-screen bg-[#f5f8f8] dark:bg-[#101f22] text-[#0d191c] dark:text-white font-sans">
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 backdrop-blur-[10px] bg-[rgba(245,248,248,0.8)] dark:bg-[rgba(16,31,34,0.8)]">
                <div className="flex items-center p-4 pb-2 justify-between">
                    <div className="flex items-center gap-2">
                        <MenuTrigger />
                        <h1 className="text-lg font-bold leading-tight tracking-tight">Pet Moderasyonu</h1>
                    </div>
                </div>
                <div className="px-4 pb-3">
                    <div className="flex items-center gap-2 bg-[#0dccf2]/10 dark:bg-[#0dccf2]/20 px-3 py-2 rounded-lg inline-flex">
                        <span className="material-symbols-outlined text-[#0dccf2] text-sm">history</span>
                        <p className="text-[#0dccf2] text-xs font-bold uppercase tracking-wider">{items.length} Onay Bekliyor</p>
                    </div>
                </div>
            </header>

            <main className="relative pb-32">
                {/* Search & Filter Section */}
                <div className="sticky top-[96px] z-40 bg-[#f5f8f8]/95 dark:bg-[#101f22]/95 px-4 py-2 space-y-2">
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <span className="material-symbols-outlined text-gray-400 text-lg">search</span>
                        </div>
                        <input className="block w-full pl-10 pr-3 py-2.5 bg-gray-100 dark:bg-gray-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#0dccf2]/50 placeholder:text-gray-400" placeholder="Pet veya id ara..." type="text" />
                    </div>
                    {/* Filters visual only for MVP */}
                    <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar hide-scrollbar">
                        <button className="flex h-8 shrink-0 items-center justify-center gap-x-1 rounded-full bg-[#0dccf2] text-white px-4 text-xs font-medium">Hepsi</button>
                        <button className="flex h-8 shrink-0 items-center justify-center gap-x-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-4 text-xs font-medium">Petler</button>
                        <button className="flex h-8 shrink-0 items-center justify-center gap-x-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-4 text-xs font-medium">İlanlar</button>
                    </div>
                </div>

                {/* Real Data Grid */}
                <ModerationGrid initialItems={items} />

                <div className="h-24"></div>
            </main>
        </div>
    );
}
