import Link from "next/link";

export default function AyarlarPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display antialiased selection:bg-primary selection:text-black pb-24 min-h-screen">
            {/* Top Header */}
            <header className="sticky top-0 z-20 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-gray-200 dark:border-white/5 px-4 pt-4 pb-2">
                <div className="flex items-center justify-between mb-4">
                    <Link
                        href="/admin"
                        className="p-2 -ml-2 text-slate-600 dark:text-gray-300 hover:text-primary transition-colors rounded-full hover:bg-black/5 dark:hover:bg-white/5"
                    >
                        <span className="material-symbols-outlined text-[28px]">arrow_back</span>
                    </Link>
                    <h1 className="text-xl font-bold tracking-tight text-center flex-1">
                        Ayarlar
                    </h1>
                    <div className="w-10"></div> {/* Spacer for centering title */}
                </div>
            </header>

            {/* Main Content */}
            <main className="flex flex-col gap-6 p-4">
                <div className="bg-white dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-gray-200 dark:border-white/5 flex flex-col items-center justify-center text-center gap-4 py-12">
                    <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-white/20">
                        settings
                    </span>
                    <div className="space-y-2">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                            Panel Ayarları
                        </h2>
                        <p className="text-sm text-slate-500 dark:text-gray-400 max-w-[250px] mx-auto">
                            Yönetici paneli ayarları ve yapılandırmaları bu sayfada yer alacaktır.
                        </p>
                    </div>
                    <button className="px-6 py-2.5 bg-primary text-black rounded-xl font-bold text-sm hover:bg-primary-dark transition-colors">
                        Yakında
                    </button>
                </div>
            </main>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 bg-background-light dark:bg-surface-dark border-t border-gray-200 dark:border-white/5 z-30 pb-safe">
                <div className="flex justify-around items-center h-16">
                    <Link
                        href="/admin"
                        className="flex flex-col items-center justify-center gap-1 w-full h-full text-gray-400 dark:text-gray-500 hover:text-primary dark:hover:text-primary transition-colors"
                    >
                        <span className="material-symbols-outlined text-[24px]">
                            dashboard
                        </span>
                        <span className="text-[10px] font-medium">Panel</span>
                    </Link>
                    <Link
                        href="/admin/petler"
                        className="flex flex-col items-center justify-center gap-1 w-full h-full text-gray-400 dark:text-gray-500 hover:text-primary dark:hover:text-primary transition-colors"
                    >
                        <span className="material-symbols-outlined text-[24px]">
                            pets
                        </span>
                        <span className="text-[10px] font-medium">Petler</span>
                    </Link>
                    <Link
                        href="/admin/kullanicilar"
                        className="flex flex-col items-center justify-center gap-1 w-full h-full text-gray-400 dark:text-gray-500 hover:text-primary dark:hover:text-primary transition-colors"
                    >
                        <span className="material-symbols-outlined text-[24px]">group</span>
                        <span className="text-[10px] font-medium">Kullanıcılar</span>
                    </Link>
                    <Link
                        href="/admin/ayarlar"
                        className="flex flex-col items-center justify-center gap-1 w-full h-full text-primary relative"
                    >
                        <span
                            className="material-symbols-outlined text-[24px] fill-current"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                            settings
                        </span>
                        <span className="text-[10px] font-bold">Ayarlar</span>
                        <span className="absolute top-0 w-full h-0.5 bg-primary"></span>
                    </Link>
                </div>
            </nav>
        </div>
    );
}
