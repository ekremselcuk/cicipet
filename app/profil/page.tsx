'use client';

import { createClient } from "@/utils/supabase/client";
import SignOutButton from "@/components/auth/SignOutButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import LikeButton from "@/components/social/LikeButton";
import ShareButton from "@/components/social/ShareButton";
import PhotoUploader from "@/components/form/PhotoUploader";
import StoryUploader from "@/components/social/StoryUploader";
import FeedItem from "@/components/feed/FeedItem";
import { FeedItemType } from "@/utils/supabase/feed";

export default function ProfilPage() {
    const supabase = createClient();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const [userProfile, setUserProfile] = useState<any>(null);
    const [activeTab, setActiveTab] = useState<'pets' | 'ads' | 'stories' | 'saved'>('pets');

    // UI State
    const [uploadOpen, setUploadOpen] = useState(false);

    // Edit Mode State
    const [isEditingPhoto, setIsEditingPhoto] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);

    // Dynamic Module Import for Analysis
    const { analyzeImage } = require('@/utils/image-analysis');

    // Data States
    const [pets, setPets] = useState<any[]>([]);
    const [ads, setAds] = useState<any[]>([]);
    const [stories, setStories] = useState<any[]>([]);
    const [savedItems, setSavedItems] = useState<any[]>([]);
    const [stats, setStats] = useState({ followers: 0, following: 0, likes: 0 });

    useEffect(() => {
        const loadData = async () => {
            try {
                // 1. Check Auth
                const { data: { user: currentUser }, error: authError } = await supabase.auth.getUser();

                if (authError || !currentUser) {
                    router.push('/auth/login');
                    return;
                }
                setUser(currentUser);

                // 2. Fetch Profile
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', currentUser.id)
                    .single();
                setUserProfile(profile || {});

                // 3. Fetch Pets
                const { data: userPets } = await supabase
                    .from('pets')
                    .select('*')
                    .eq('owner_id', currentUser.id)
                    .order('created_at', { ascending: false });
                setPets(userPets || []);

                // 4. Fetch Ads
                const { data: userAds } = await supabase
                    .from('ads')
                    .select('*')
                    .eq('owner_id', currentUser.id)
                    .order('created_at', { ascending: false });
                setAds(userAds || []);

                // 5. Fetch Stories
                const { data: userStories } = await supabase
                    .from('stories')
                    .select('*')
                    .eq('user_id', currentUser.id)
                    // .gt('expires_at', new Date().toISOString()) // Allow all stories for now
                    .order('created_at', { ascending: false });
                setStories(userStories || []);

                // 6. Fetch Real Stats
                // Followers
                const { count: followersCount } = await supabase
                    .from('follows')
                    .select('*', { count: 'exact', head: true })
                    .eq('following_id', currentUser.id);

                // Following
                const { count: followingCount } = await supabase
                    .from('follows')
                    .select('*', { count: 'exact', head: true })
                    .eq('follower_id', currentUser.id);

                // Likes Received (Total of user's pets + ads)
                // This is complex to sum in one go with Supabase standard client without views.
                // We'll trust the 'likes_count' on pets/ads if triggers existed, 
                // OR just sum the loaded pets/ads likes_count if we select it.
                // For now, let's query the 'likes' table directly for items owned by user.
                // A bit heavy, but correct.
                // Simplifying: We'll assume we iterate over pets/ads and sum their likes_count if we added that column.
                // Checking previous schema: I added likes_count column.
                const totalLikes = (userPets || []).reduce((acc, p) => acc + (p.likes_count || 0), 0) +
                    (userAds || []).reduce((acc, a) => acc + (a.likes_count || 0), 0);

                setStats({
                    followers: followersCount || 0,
                    following: followingCount || 0,
                    likes: totalLikes
                });

                // 7. Fetch Bookmarks
                const { data: bookmarks } = await supabase
                    .from('bookmarks')
                    .select('item_id, item_type, created_at')
                    .eq('user_id', currentUser.id)
                    .order('created_at', { ascending: false });

                if (bookmarks && bookmarks.length > 0) {
                    const enrichedBookmarks = await Promise.all(bookmarks.map(async (b) => {
                        const table = b.item_type === 'pet' ? 'pets' : b.item_type === 'ad' ? 'ads' : 'stories';
                        const { data: item } = await supabase.from(table).select('*').eq('id', b.item_id).single();
                        if (item) return { ...item, type: b.item_type, bookmarked_at: b.created_at };
                        return null;
                    }));
                    setSavedItems(enrichedBookmarks.filter(Boolean));
                }



            } catch (err) {
                console.error("Data load error:", err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [router, supabase]);

    const handlePhotoUpdate = async (file: File) => {
        setAnalyzing(true);
        try {
            // AI Check
            const result = await analyzeImage(file);
            if (!result.valid) {
                alert(`Görsel Reddedildi: ${result.reason}`);
                setAnalyzing(false);
                return;
            }

            // Upload
            // Mock URL logic again
            const mockUrl = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde";

            const { error } = await supabase
                .from('profiles')
                .update({ avatar_url: mockUrl })
                .eq('id', user.id);

            if (error) throw error;

            setUserProfile({ ...userProfile, avatar_url: mockUrl });
            setIsEditingPhoto(false);
            alert("Profil fotoğrafı güncellendi!");

        } catch (e) {
            console.error(e);
            alert("Hata oluştu");
        } finally {
            setAnalyzing(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
                <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
            </div>
        );
    }

    if (!user) return null;

    const displayName = userProfile?.full_name || user.user_metadata?.full_name || user.email?.split('@')[0] || "Kullanıcı";
    const avatarUrl = userProfile?.avatar_url || user.user_metadata?.avatar_url || "https://via.placeholder.com/150";

    return (
        <main className="pb-24 min-h-screen bg-background-light dark:bg-background-dark font-display">
            {/* Header / Cover */}
            <div className="relative h-48 bg-gradient-to-br from-purple-500 to-primary">
                <div className="absolute top-4 right-4 z-10">
                    <Link href="/profil/ayarlar" className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors">
                        <span className="material-symbols-outlined">settings</span>
                    </Link>
                </div>
            </div>

            {/* Profile Info */}
            <div className="px-4 -mt-16 relative z-10 flex flex-col items-center">
                <div className="relative mb-3 group">
                    <div className="w-32 h-32 p-1.5 rounded-full bg-white dark:bg-surface-dark shadow-xl overflow-hidden cursor-pointer" onClick={() => setIsEditingPhoto(true)}>
                        <img alt="Profile" className="w-full h-full rounded-full object-cover border border-gray-100 dark:border-white/10" src={avatarUrl} />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                            <span className="material-symbols-outlined text-white">camera_enhance</span>
                        </div>
                    </div>
                </div>

                {isEditingPhoto && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">
                        <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl w-full max-w-sm">
                            <h3 className="font-bold text-lg mb-4 dark:text-white">Profil Fotoğrafını Değiştir</h3>
                            <PhotoUploader
                                onFileSelect={handlePhotoUpdate}
                                colorTheme="primary"
                            />
                            {analyzing && <p className="text-center text-sm text-primary font-bold mt-2">Görsel İnceleniyor...</p>}
                            <button onClick={() => setIsEditingPhoto(false)} className="w-full mt-4 py-2 text-gray-500">İptal</button>
                        </div>
                    </div>
                )}

                <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-1">{displayName}</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">@{user.email?.split('@')[0]}</p>

                {/* Real Stats */}
                <div className="flex items-center gap-8 mb-6">
                    <div className="flex flex-col items-center">
                        <span className="font-bold text-lg text-slate-900 dark:text-white">{stats.followers}</span>
                        <span className="text-xs text-gray-500 uppercase tracking-wide">Takipçi</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="font-bold text-lg text-slate-900 dark:text-white">{stats.following}</span>
                        <span className="text-xs text-gray-500 uppercase tracking-wide">Takip</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="font-bold text-lg text-slate-900 dark:text-white">{stats.likes}</span>
                        <span className="text-xs text-gray-500 uppercase tracking-wide">Beğeni</span>
                    </div>
                </div>

                {/* Quick Actions - Updated Links */}
                <div className="grid grid-cols-3 gap-3 w-full max-w-sm mb-8">
                    <Link href="/pet/ekle" className="flex flex-col items-center justify-center gap-1 p-3 bg-primary text-black font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors text-center h-24">
                        <span className="material-symbols-outlined text-2xl">pets</span>
                        <span className="text-xs">Pet Ekle</span>
                    </Link>

                    <button
                        onClick={() => setUploadOpen(true)}
                        className="flex flex-col items-center justify-center gap-1 p-3 bg-black text-white font-bold rounded-xl shadow-lg hover:bg-neutral-800 transition-colors text-center h-24"
                    >
                        <span className="material-symbols-outlined text-2xl">history_edu</span>
                        <span className="text-xs">Story Ekle</span>
                    </button>

                    <Link href="/ilanlar/ekle" className="flex flex-col items-center justify-center gap-1 p-3 bg-white dark:bg-surface-dark text-slate-900 dark:text-white font-bold rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-center h-24">
                        <span className="material-symbols-outlined text-2xl">campaign</span>
                        <span className="text-xs">İlan Ver</span>
                    </Link>
                </div>
                {/* Story Uploader Modal */}
                {uploadOpen && (
                    <StoryUploader
                        onClose={() => setUploadOpen(false)}
                        onUploadSuccess={() => {
                            alert("Hikaye başarıyla oluşturuldu! Sayfa yenileniyor...");
                            window.location.reload();
                        }}
                    />
                )}
            </div>

            {/* Stories Section Removed as requested */}

            {/* Content Tabs */}
            <div className="px-4">
                <div className="flex items-center gap-6 border-b border-gray-200 dark:border-white/10 mb-6">
                    <button
                        onClick={() => setActiveTab('pets')}
                        className={`pb-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'pets' ? 'border-black dark:border-white text-black dark:text-white' : 'border-transparent text-gray-400'}`}
                    >
                        Petlerim ({pets.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('ads')}
                        className={`pb-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'ads' ? 'border-black dark:border-white text-black dark:text-white' : 'border-transparent text-gray-400'}`}
                    >
                        İlanlarım ({ads.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('stories')}
                        className={`pb-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'stories' ? 'border-black dark:border-white text-black dark:text-white' : 'border-transparent text-gray-400'}`}
                    >
                        Hikayelerim ({stories.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('saved')}
                        className={`pb-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'saved' ? 'border-black dark:border-white text-black dark:text-white' : 'border-transparent text-gray-400'} flex items-center gap-1`}
                    >
                        Kaydedilenler ({savedItems.length})
                    </button>
                </div>

                {/* Tab Content */}
                <div className="grid grid-cols-3 gap-3">
                    {activeTab === 'pets' && (
                        pets.length > 0 ? pets.map(pet => (
                            pet.id ? (
                                <Link href={`/pet/${pet.id}`} key={pet.id} className="group relative aspect-[4/5] rounded-xl overflow-hidden bg-gray-100 dark:bg-surface-dark">
                                    <img src={pet.image_url} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                                        <span className="text-white font-bold">{pet.name}</span>
                                        <div className="flex items-center gap-3 mt-1 text-white/90">
                                            <div className="flex items-center gap-1 text-xs">
                                                <span className="material-symbols-outlined text-[14px]">favorite</span>
                                                {pet.likes_count || 0}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ) : null
                        )) : (
                            <div className="col-span-3 text-center py-12 text-gray-400 bg-gray-50 dark:bg-white/5 rounded-xl border border-dashed border-gray-200 dark:border-white/10">
                                <span className="material-symbols-outlined text-4xl mb-2">pets</span>
                                <p>Henüz pet eklemediniz.</p>
                                <Link href="/pet/ekle" className="text-primary font-bold hover:underline mt-2 inline-block">Şimdi Ekle</Link>
                            </div>
                        )
                    )}

                    {activeTab === 'ads' && (
                        ads.length > 0 ? ads.map(ad => (
                            <Link href={`/ilanlar/${ad.id}`} key={ad.id} className="group relative aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-surface-dark">
                                <img src={ad.photo_url || 'https://via.placeholder.com/300'} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                                <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/60 text-white text-[10px] uppercase font-bold backdrop-blur-sm">
                                    {ad.type}
                                </div>
                                <div className="absolute inset-x-0 bottom-0 p-3 bg-white dark:bg-surface-dark border-t border-gray-100 dark:border-white/5">
                                    <h4 className="font-bold text-sm truncate">{ad.title}</h4>
                                    <div className="flex items-center justify-between mt-2">
                                        <ShareButton title={ad.title} text={ad.description} url={`/ilanlar/${ad.id}`} />
                                    </div>
                                </div>
                            </Link>
                        )) : (
                            <div className="col-span-3 text-center py-12 text-gray-400 bg-gray-50 dark:bg-white/5 rounded-xl border border-dashed border-gray-200 dark:border-white/10">
                                <span className="material-symbols-outlined text-4xl mb-2">campaign</span>
                                <p>Henüz ilan vermediniz.</p>
                                <Link href="/ilanlar/ekle" className="text-primary font-bold hover:underline mt-2 inline-block">İlan Ver</Link>
                            </div>
                        )
                    )}

                    {activeTab === 'stories' && (
                        stories.length > 0 ? (
                            <div className="col-span-3 flex flex-col gap-6">
                                {[...stories].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).map(story => {
                                    // Convert story to FeedItemType on the fly
                                    const feedItem: FeedItemType = {
                                        id: story.id,
                                        type: 'story',
                                        subType: 'story',
                                        title: story.caption ? 'Hikaye Paylaşımı' : 'Hikaye', // or story.title if exists
                                        description: story.caption || '',
                                        image_url: story.image_url,
                                        created_at: story.created_at,
                                        user_id: story.user_id,
                                        profiles: {
                                            id: story.user_id,
                                            full_name: (userProfile?.full_name || user?.user_metadata?.full_name || 'Kullanıcı'),
                                            avatar_url: (userProfile?.avatar_url || user?.user_metadata?.avatar_url || 'https://via.placeholder.com/150'),
                                            // stories fetched in profile are owned by current user mostly, 
                                            // but waiting... 'stories' state is fetched by .eq('user_id', currentUser.id)
                                            // so profiles is current user.
                                        },
                                        likes_count: story.likes?.[0]?.count || 0,
                                        comments_count: story.comments?.[0]?.count || 0,
                                        is_liked: false // Logic to check if self liked is complex here without extra fetch
                                    };

                                    return <FeedItem key={story.id} item={feedItem} />;
                                })}
                            </div>
                        ) : (
                            <div className="col-span-3 text-center py-12 text-gray-400 bg-gray-50 dark:bg-white/5 rounded-xl border border-dashed border-gray-200 dark:border-white/10">
                                <span className="material-symbols-outlined text-4xl mb-2">history_edu</span>
                                <p>Henüz hikaye paylaşmadınız.</p>
                                <button onClick={() => setUploadOpen(true)} className="text-primary font-bold hover:underline mt-2 inline-block">Hikaye Ekle</button>
                            </div>
                        )
                    )}
                </div>
            </div>

            {/* Bottom Nav */}
            <nav className="fixed bottom-0 left-0 right-0 bg-background-light dark:bg-surface-dark border-t border-gray-200 dark:border-white/5 z-30 pb-safe">
                <div className="flex justify-around items-center h-16">
                    <Link href="/" className="flex flex-col items-center justify-center gap-1 w-full h-full text-gray-400 dark:text-gray-500 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-[24px]">home</span>
                    </Link>
                    <Link href="/ilanlar" className="flex flex-col items-center justify-center gap-1 w-full h-full text-gray-400 dark:text-gray-500 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-[24px]">search</span>
                    </Link>
                    <div className="w-full relative flex justify-center">
                        <Link href="/pet/ekle" className="absolute -top-6 h-14 w-14 rounded-full bg-primary shadow-lg shadow-primary/30 flex items-center justify-center text-black hover:bg-primary/90 transition-transform hover:scale-105">
                            <span className="material-symbols-outlined text-[28px]">add</span>
                        </Link>
                    </div>
                    <Link href="/favoriler" className="flex flex-col items-center justify-center gap-1 w-full h-full text-gray-400 dark:text-gray-500 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-[24px]">favorite</span>
                    </Link>
                    <Link href="/profil" className="flex flex-col items-center justify-center gap-1 w-full h-full text-primary">
                        <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
                    </Link>
                </div>
            </nav>
        </main>
    );
}
