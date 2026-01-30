'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

interface BookmarkButtonProps {
    itemId: string;
    itemType: 'pet' | 'ad' | 'story';
    initialBookmarked?: boolean;
}

export default function BookmarkButton({ itemId, itemType, initialBookmarked = false }: BookmarkButtonProps) {
    const [bookmarked, setBookmarked] = useState(initialBookmarked);
    const [loading, setLoading] = useState(false);
    const supabase = createClient();

    // Verification check on mount (optional, or rely on prop)
    // We rely on prop for initial state to avoid layout shift, but simple logic here:
    // User toggles, we verify rights.

    const toggleBookmark = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (loading) return;

        setLoading(true);
        // Optimistic
        const newState = !bookmarked;
        setBookmarked(newState);

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                setBookmarked(!newState);
                alert('Favorilere eklemek için giriş yapmalısınız.');
                return;
            }

            if (newState) {
                await supabase.from('bookmarks').insert({
                    user_id: user.id,
                    item_id: itemId,
                    item_type: itemType
                });
            } else {
                await supabase.from('bookmarks').delete().match({
                    user_id: user.id,
                    item_id: itemId,
                    item_type: itemType
                });
            }
        } catch (error) {
            console.error('Bookmark error:', error);
            setBookmarked(!newState);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={toggleBookmark}
            className={`flex items-center gap-1 transition-colors ${bookmarked ? 'text-blue-500' : 'text-gray-400 hover:text-blue-500'}`}
        >
            <span
                className="material-symbols-outlined text-[20px] transition-transform active:scale-125"
                style={{ fontVariationSettings: bookmarked ? "'FILL' 1" : "'FILL' 0" }}
            >
                bookmark
            </span>
            <span className="text-xs font-bold hidden sm:inline">Kaydet</span>
        </button>
    );
}
