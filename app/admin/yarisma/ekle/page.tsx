
import MenuTrigger from "@/components/admin/MenuTrigger";
import { requireAdmin } from "@/utils/supabase/check-auth"; // Server-side check

export default async function AdminNewContestPage() {
    await requireAdmin();

    return (
        <div className="relative flex flex-col h-full min-h-screen pb-24">
            {/* Top Header */}
            <header className="sticky top-0 z-20 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-gray-200 dark:border-white/5 px-4 pt-4 pb-2">
                <div className="flex items-center justify-between mb-4">
                    {/* Menu Trigger Replaced */}
                    <MenuTrigger />
                    <h1 className="text-xl font-bold tracking-tight text-center flex-1 text-slate-900 dark:text-white">Yeni Yarışma Ekle</h1>
                    <div className="flex gap-2">
                        <button className="relative p-2 -mr-2 text-slate-600 dark:text-gray-300 hover:text-primary transition-colors rounded-full hover:bg-black/5 dark:hover:bg-white/5">
                            <span className="material-symbols-outlined text-[24px]">notifications</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex flex-col gap-6 p-4">
                <div className="bg-white dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-gray-200 dark:border-white/5">
                    <p className="text-center text-slate-500">Form içeriği buraya gelecek...</p>
                </div>
            </main>
        </div>
    );
}
