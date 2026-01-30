'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

interface LikeButtonProps {
    itemId: string;
    itemType: 'pet' | 'ad' | 'story';
    initialLikes: number;
    initialLiked?: boolean;
}

export default function LikeButton({ itemId, itemType, initialLikes, initialLiked = false }: LikeButtonProps) {
    const [likes, setLikes] = useState(initialLikes);
    const [liked, setLiked] = useState(initialLiked);
    const [loading, setLoading] = useState(false);
    const supabase = createClient();

    const toggleLike = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (loading) return;

        setLoading(true);
        // Optimistic update
        const newLiked = !liked;
        setLiked(newLiked);
        setLikes(prev => newLiked ? prev + 1 : prev - 1);

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                // Revert if not logged in (or handle auth modal)
                setLiked(!newLiked);
                setLikes(prev => !newLiked ? prev + 1 : prev - 1);
                alert('Beğenmek için giriş yapmalısınız.');
                return;
            }

            if (newLiked) {
                await supabase.from('likes').insert({
                    user_id: user.id,
                    item_id: itemId,
                    item_type: itemType
                });
            } else {
                await supabase.from('likes').delete().match({
                    user_id: user.id,
                    item_id: itemId,
                    item_type: itemType
                });
            }
        } catch (error) {
            console.error('Like error:', error);
            // Revert on error
            setLiked(!newLiked);
            setLikes(prev => !newLiked ? prev + 1 : prev - 1);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={toggleLike}
            className={`flex items-center gap-1 transition-colors ${liked ? 'text-pink-500' : 'text-gray-400 hover:text-pink-500'}`}
        >
            <span
                className="material-symbols-outlined text-[20px] transition-transform active:scale-125"
                style={{ fontVariationSettings: liked ? "'FILL' 1" : "'FILL' 0" }}
            >
                favorite
            </span>
            <span className="text-xs font-bold">{likes}</span>
        </button>
    );
}
