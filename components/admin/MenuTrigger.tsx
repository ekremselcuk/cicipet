'use client';

import { useAdminMenu } from "@/context/AdminMenuContext";

export default function MenuTrigger() {
    const { toggleMenu } = useAdminMenu();

    return (
        <button
            onClick={toggleMenu}
            className="p-2 -ml-2 text-slate-600 dark:text-gray-300 hover:text-primary transition-colors rounded-full hover:bg-black/5 dark:hover:bg-white/5"
            aria-label="Menüyü Aç"
        >
            <span className="material-symbols-outlined text-[28px]">menu</span>
        </button>
    );
}
