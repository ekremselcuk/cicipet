'use client';

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import FeedItem from "@/components/feed/FeedItem";
import { FeedItemType } from "@/utils/supabase/feed";

export default function StoriesPage() {
    const supabase = createClient();
    const [stories, setStories] = useState<FeedItemType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStories = async () => {
            const { data: { user } } = await supabase.auth.getUser();

            // Use RPC to get interactions (likes, etc.) correct everywhere
            const { data, error } = await supabase.rpc('get_stories_with_interactions', {
                p_user_id: user?.id || '00000000-0000-0000-0000-000000000000',
                p_limit: 50
            });

            if (data) {
                // Map RPC result to FeedItemType
                const items: FeedItemType[] = data.map((s: any) => ({
                    id: s.id,
                    type: 'story',
                    subType: 'story',
                    title: s.title || 'Hikaye',
                    description: s.caption || '',
                    image_url: s.image_url,
                    created_at: s.created_at,
                    user_id: s.user_id,
                    profiles: {
                        id: s.user_id,
                        full_name: s.full_name || 'Kullanıcı',
                        avatar_url: s.avatar_url || 'https://via.placeholder.com/150'
                    },
                    likes_count: s.likes_count || 0,
                    comments_count: s.comments_count || 0,
                    is_liked: s.is_liked,
                    is_bookmarked: s.is_bookmarked
                }));
                setStories(items);
            }
            setLoading(false);
        };
        fetchStories();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black pb-20">
            <header className="sticky top-0 z-30 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-100 dark:border-white/5 p-4 flex items-center gap-4">
                <a href="/" className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10">
                    <span className="material-symbols-outlined">arrow_back</span>
                </a>
                <h1 className="font-bold text-lg dark:text-white">Hikayeler</h1>
            </header>

            <div className="max-w-md mx-auto p-4 flex flex-col gap-6">
                {loading ? (
                    <div className="flex justify-center py-10">
                        <span className="material-symbols-outlined animate-spin text-3xl text-primary">progress_activity</span>
                    </div>
                ) : stories.length > 0 ? (
                    stories.map(story => (
                        <FeedItem key={story.id} item={story} />
                    ))
                ) : (
                    <div className="text-center py-20 text-gray-400">
                        <span className="material-symbols-outlined text-4xl mb-2">history_edu</span>
                        <p>Henüz hiç hikaye yok.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
