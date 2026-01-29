import { requireAuth } from "@/utils/supabase/check-auth";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import MenuTrigger from "@/components/admin/MenuTrigger";

export default async function AdminUserDetailPage({ params }: { params: { id: string } }) {
    await requireAuth();
    const supabase = await createClient();
    const { id } = await params;

    const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !profile) {
        console.error("Error fetching user profile:", error);
        return notFound();
    }

    // Fetch user's pets
    const { data: userPets } = await supabase
        .from('pets')
        .select('*')
        .eq('owner_id', id);

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display antialiased selection:bg-primary selection:text-black pb-24 min-h-screen">
            {/* Top Header */}
            <header className="sticky top-0 z-20 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-gray-200 dark:border-white/5 px-4 pt-4 pb-2">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <div className="md:hidden">
                            <MenuTrigger />
                        </div>
                        <Link
                            href="/admin/kullanicilar" // Assuming this page exists or will exist
                            className="p-2 -ml-2 text-slate-600 dark:text-gray-300 hover:text-primary transition-colors rounded-full hover:bg-black/5 dark:hover:bg-white/5"
                        >
                            <span className="material-symbols-outlined text-[28px]">arrow_back</span>
                        </Link>
                    </div>
                    <h1 className="text-xl font-bold tracking-tight text-center flex-1">
                        Kullanıcı Detayı
                    </h1>
                    <div className="w-10"></div>
                </div>
            </header>

            <main className="flex flex-col gap-6 p-4">
                {/* User Info Card */}
                <div className="bg-white dark:bg-surface-dark rounded-xl p-5 shadow-sm border border-gray-100 dark:border-white/5 space-y-4">
                    <div className="flex items-center gap-4 border-b border-gray-100 dark:border-gray-800 pb-4">
                        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-2xl">
                            {profile.full_name ? profile.full_name.charAt(0).toUpperCase() : '?'}
                        </div>
                        <div>
                            <h2 className="text-lg font-bold">{profile.full_name || 'İsimsiz Kullanıcı'}</h2>
                            <p className="text-sm text-gray-500">@{profile.username || 'username'}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                        <div className="flex justify-between py-2 border-b border-gray-50 dark:border-white/5">
                            <span className="text-gray-500">Kullanıcı ID</span>
                            <span className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-gray-700 dark:text-gray-300">{profile.id}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-50 dark:border-white/5">
                            <span className="text-gray-500">Kayıt Tarihi</span>
                            <span>{new Date(profile.created_at || Date.now()).toLocaleDateString('tr-TR')}</span>
                        </div>
                        <div className="flex justify-between py-2">
                            <span className="text-gray-500">Rol</span>
                            <span className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 px-2 py-0.5 rounded text-xs font-bold uppercase">{profile.role || 'User'}</span>
                        </div>
                    </div>
                </div>

                {/* User's Pets */}
                <section>
                    <h3 className="text-lg font-bold mb-3 px-1 text-gray-700 dark:text-gray-300">Kullanıcının Petleri</h3>
                    {userPets && userPets.length > 0 ? (
                        <div className="grid grid-cols-1 gap-3">
                            {userPets.map((pet) => (
                                <Link href={`/admin/petler/${pet.id}`} key={pet.id} className="bg-white dark:bg-surface-dark rounded-xl p-3 shadow-sm border border-gray-100 dark:border-white/5 flex items-center gap-3 hover:border-primary/50 transition-colors">
                                    <div
                                        className="w-12 h-12 rounded-lg bg-cover bg-center shrink-0"
                                        style={{ backgroundImage: `url('${pet.image_url || "https://via.placeholder.com/150"}')` }}
                                    ></div>
                                    <div>
                                        <p className="font-bold text-sm">{pet.name}</p>
                                        <p className="text-xs text-gray-500">{pet.type} • {pet.breed}</p>
                                    </div>
                                    <div className="ml-auto">
                                        <span className="material-symbols-outlined text-gray-400">chevron_right</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-surface-dark rounded-xl p-8 text-center text-gray-500 border border-dashed border-gray-300 dark:border-gray-700">
                            Bu kullanıcının henüz peti yok.
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}
