import Link from 'next/link';

export default function Header() {
    return (
        <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md transition-colors duration-300 border-b border-black/5 dark:border-white/5">
            <div className="flex items-center px-4 py-3 justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="size-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined filled text-[20px]">pets</span>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-none">CiciPet</h1>
                        <span className="text-[10px] font-bold text-secondary tracking-wide leading-none">Sevgiyi Hisset</span>
                    </div>
                </Link>
                <div className="flex items-center gap-3">
                    <button className="flex items-center justify-center rounded-full size-10 hover:bg-black/5 dark:hover:bg-white/10 transition-colors relative">
                        <span className="material-symbols-outlined text-[#1c170d] dark:text-white" style={{ fontSize: '26px' }}>notifications</span>
                        <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-primary border border-background-light dark:border-background-dark"></span>
                    </button>
                    <Link href="/profil" className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary/10 overflow-hidden ring-2 ring-transparent hover:ring-secondary/20 transition-all cursor-pointer">
                        <span className="material-symbols-outlined text-secondary filled">person</span>
                    </Link>
                </div>
            </div>
        </header>
    );
}
