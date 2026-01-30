'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { getFeedItems, FeedItemType } from '@/utils/supabase/feed';
import FeedItem from './FeedItem';

export default function Feed() {
    const [items, setItems] = useState<FeedItemType[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const loadFeed = async () => {
            try {
                const data = await getFeedItems(supabase);
                setItems(data);
            } catch (error) {
                console.error("Feed loading error:", error);
            } finally {
                setLoading(false);
            }
        };

        loadFeed();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col gap-4 px-4 pb-20">
                {[1, 2].map(i => (
                    <div key={i} className="bg-white dark:bg-[#2c2415] rounded-2xl p-4 shadow-sm animate-pulse h-[400px]">
                        <div className="flex gap-3 mb-4">
                            <div className="size-10 rounded-full bg-gray-200 dark:bg-white/10"></div>
                            <div className="flex-1 space-y-2">
                                <div className="h-4 w-32 bg-gray-200 dark:bg-white/10 rounded"></div>
                                <div className="h-3 w-20 bg-gray-200 dark:bg-white/10 rounded"></div>
                            </div>
                        </div>
                        <div className="w-full aspect-square bg-gray-200 dark:bg-white/10 rounded-xl mb-4"></div>
                        <div className="space-y-2">
                            <div className="h-4 w-3/4 bg-gray-200 dark:bg-white/10 rounded"></div>
                            <div className="h-4 w-1/2 bg-gray-200 dark:bg-white/10 rounded"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="text-center py-10 px-4">
                <div className="bg-white dark:bg-surface-dark rounded-2xl p-8 shadow-sm">
                    <span className="material-symbols-outlined text-4xl text-gray-300 mb-2">pets</span>
                    <h3 className="font-bold text-gray-900 dark:text-white">Akış Boş</h3>
                    <p className="text-sm text-gray-500">Henüz takip edebileceğin bir içerik yok.</p>
                </div>
            </div>
        );
    }

    return (
        <section className="flex flex-col gap-6 px-4 pb-20">
            {items.map((item) => (
                <FeedItem key={`${item.type}-${item.id}`} item={item} />
            ))}

            <div className="text-center py-4 text-xs text-gray-400">
                • • •
            </div>
        </section>
    );
}
