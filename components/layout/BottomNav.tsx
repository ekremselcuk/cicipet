import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
    // We can use pathname to highlight active link if needed, 
    // currently implementing standard layout.

    return (
        <nav className="fixed bottom-0 z-50 w-full border-t border-slate-200 bg-white/95 dark:bg-background-dark/95 dark:border-slate-800 pb-safe backdrop-blur-lg">
            <div className="flex h-16 items-center justify-around px-2">
                <Link href="/" className="flex flex-col items-center gap-1 p-2 text-slate-400 transition-colors hover:text-primary dark:text-slate-500">
                    <span className="material-symbols-outlined text-2xl">home</span>
                    <span className="text-[10px] font-medium">Anasayfa</span>
                </Link>
                <Link href="/pazar" className="flex flex-col items-center gap-1 p-2 text-slate-400 transition-colors hover:text-primary dark:text-slate-500">
                    <span className="material-symbols-outlined text-2xl">storefront</span>
                    <span className="text-[10px] font-medium">Pazar</span>
                </Link>
                <div className="relative -top-5">
                    <Link href="/yarisma">
                        <button className="flex h-14 w-14 flex-col items-center justify-center rounded-full bg-primary shadow-lg shadow-primary/40 ring-4 ring-white dark:ring-background-dark transition-transform active:scale-95">
                            <span className="material-symbols-outlined text-3xl text-white fill-1">emoji_events</span>
                        </button>
                        <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-bold text-primary whitespace-nowrap">Yarışmalar</span>
                    </Link>
                </div>
                <Link href="/barinaklar" className="flex flex-col items-center gap-1 p-2 text-slate-400 transition-colors hover:text-primary dark:text-slate-500">
                    <span className="material-symbols-outlined text-2xl">volunteer_activism</span>
                    <span className="text-[10px] font-medium">Barınaklar</span>
                </Link>
                <Link href="/cuzdan" className="flex flex-col items-center gap-1 p-2 text-slate-400 transition-colors hover:text-primary dark:text-slate-500">
                    {/* Changed Profil link to /cuzdan temporarily as shown in static cuzdan.html usage, or keep standard 'Profil' -> /profil */}
                    {/* The user requested cuzdan page content, and cuzdan.html nav says "Profil". 
              Usually Profil is /profil. Cuzdan is separate. 
              But let's stick to the static HTML logic. 
              Wait, static HTML cuzdan.html nav says "Profil" icon -> #. 
              The user created cuzdan.html. 
              Let's map: 
              Anasayfa -> /
              Pazar -> /pazar
              Yarışmalar -> /yarisma
              Barınaklar -> /barinaklar
              Profil -> /profil (or /cuzdan?)
              Typically users check wallet in profile or separate. 
              I'll link Profil to /cuzdan for now as the user focused on it, or create /profil later. 
              Actually, I'll link to /cuzdan for visibility since we have that page. 
          */}
                    <span className="material-symbols-outlined text-2xl">person</span>
                    <span className="text-[10px] font-medium">Profil</span>
                </Link>
            </div>
            <div className="h-4 w-full"></div>
        </nav>
    );
}
