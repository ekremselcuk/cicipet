'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAdminMenu } from '@/context/AdminMenuContext';
import { useEffect } from 'react';

export default function AdminSidebar() {
    const { isOpen, closeMenu } = useAdminMenu();
    const pathname = usePathname();

    // Close menu on route change
    useEffect(() => {
        closeMenu();
    }, [pathname, closeMenu]);

    return (
        <>
            {/* Overlay - Mobile Only */}
            <div
                className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={closeMenu}
            />

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-50 h-full w-72 bg-background-light dark:bg-[#221c10] border-r border-black/10 dark:border-white/10 shadow-2xl transform transition-transform duration-300 ease-in-out 
                md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="flex flex-col h-full">
                    <div className="p-5 border-b border-black/5 dark:border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="size-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                                <span className="material-symbols-outlined filled text-[20px]">pets</span>
                            </div>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">CiciPet Panel</h2>
                        </div>

                        <button onClick={closeMenu} className="text-slate-500 hover:text-red-500 p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>

                    <nav className="flex-1 p-4 flex flex-col gap-1 overflow-y-auto">
                        <NavItem href="/admin" icon="dashboard" label="Genel Bakış" active={pathname === '/admin'} />

                        <div className="my-2 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Yönetim</div>

                        <NavItem href="/admin/kullanicilar" icon="group" label="Kullanıcılar" active={pathname.includes('/kullanicilar')} />
                        <NavItem href="/admin/petler" icon="pets" label="Petler" active={pathname.includes('/petler')} />
                        <NavItem href="/admin/yarisma" icon="trophy" label="Yarışmalar" active={pathname.includes('/yarisma')} />

                        <div className="my-2 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Sistem</div>

                        <NavItem href="/admin/moderasyon" icon="policy" label="Moderasyon" active={pathname.includes('/moderasyon')} />
                        <NavItem href="/admin/ayarlar" icon="settings" label="Ayarlar" active={pathname.includes('/ayarlar')} />
                    </nav>

                    <div className="p-4 border-t border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5">
                        <div className="flex items-center gap-3">
                            <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center">
                                <span className="material-symbols-outlined text-primary">person</span>
                            </div>
                            <div className="flex flex-col flex-1 min-w-0">
                                <span className="text-sm font-bold text-slate-900 dark:text-white truncate">Ekrem Selçuk</span>
                                <span className="text-xs text-slate-500 truncate">Süper Admin</span>
                            </div>
                            <button className="text-slate-400 hover:text-primary transition-colors">
                                <span className="material-symbols-outlined">logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}

function NavItem({ href, icon, label, active }: { href: string; icon: string; label: string; active: boolean }) {
    return (
        <Link
            href={href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${active
                ? 'bg-primary text-slate-900 font-bold shadow-sm'
                : 'text-slate-600 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
                }`}
        >
            <span className={`material-symbols-outlined transition-colors ${active ? 'filled' : ''}`}>{icon}</span>
            <span className="flex-1">{label}</span>
            {active && <span className="material-symbols-outlined text-[16px]">chevron_right</span>}
        </Link>
    );
}
