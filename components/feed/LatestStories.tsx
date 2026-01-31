'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import FeedItem from './FeedItem';
import { FeedItemType } from '@/utils/supabase/feed';

export default function LatestStories() {
    const [stories, setStories] = useState<FeedItemType[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                // Use RPC if available, or fallback to reliable standard fetch
                // Using RPC is safer for join issues shown before, but needs DB script run.
                // We'll try rpc first, fallback to standard.

                const { data, error } = await supabase.rpc('get_stories_with_interactions', {
                    p_user_id: user?.id || '00000000-0000-0000-0000-000000000000',
                    p_limit: 3
                });

                if (!error && data) {
                    const mapped: FeedItemType[] = data.map((s: any) => ({
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
                            full_name: s.full_name,
                            avatar_url: s.avatar_url,
                        },
                        likes_count: s.likes_count,
                        comments_count: s.comments_count,
                        is_liked: s.is_liked,
                        is_bookmarked: s.is_bookmarked
                    }));
                    setStories(mapped);
                } else {
                    // Fallback to simple fetch if RPC not exists yet (user forgot script)
                    console.warn("RPC failed, falling back", error);
                    const { data: simpleData } = await supabase
                        .from('stories')
                        .select('*, profiles(full_name, avatar_url, id)')
                        .order('created_at', { ascending: false })
                        .limit(3);

                    if (simpleData) {
                        // Force slice to be sure
                        const limitedData = simpleData.slice(0, 3);
                        const simpleMapped: FeedItemType[] = limitedData.map((s: any) => ({
                            id: s.id, type: 'story', subType: 'story', title: s.title, description: s.caption,
                            image_url: s.image_url, created_at: s.created_at, user_id: s.user_id,
                            profiles: s.profiles, likes_count: 0, comments_count: 0, is_liked: false
                        }));
                        setStories(simpleMapped);
                    }
                }

            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchStories();
    }, []);

    if (loading) return <div className="p-4 flex justify-center"><span className="material-symbols-outlined animate-spin">progress_activity</span></div>;
    if (stories.length === 0) return null;

    return (
        <section className="flex flex-col gap-4 px-4">
            <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">history_edu</span>
                    Son Hikayeler
                </h3>
                <Link href="/hikayeler" className="text-xs font-bold text-primary hover:underline">
                    Tümünü Gör
                </Link>
            </div>

            <div className="flex flex-col gap-6">
                {stories.map(story => (
                    <FeedItem key={story.id} item={story} />
                ))}
            </div>

            <Link href="/hikayeler" className="block text-center text-sm font-bold text-gray-500 hover:text-primary py-2 border-t border-gray-100 dark:border-white/5">
                Tümünü Gör
            </Link>
        </section>
    );
}
