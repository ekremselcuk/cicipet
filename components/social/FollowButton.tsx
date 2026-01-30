'use client';

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

interface FollowButtonProps {
    targetUserId: string;
    onFollowChange?: (isFollowing: boolean) => void;
}

export default function FollowButton({ targetUserId, onFollowChange }: FollowButtonProps) {
    const supabase = createClient();
    const [isFollowing, setIsFollowing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);

    useEffect(() => {
        const checkFollowStatus = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) {
                    setLoading(false);
                    return;
                }
                setCurrentUserId(user.id);

                if (user.id === targetUserId) {
                    setLoading(false);
                    return; // Cannot follow self
                }

                const { data, error } = await supabase
                    .from('follows')
                    .select('*')
                    .eq('follower_id', user.id)
                    .eq('following_id', targetUserId)
                    .single();

                if (!error && data) {
                    setIsFollowing(true);
                }
            } catch (error) {
                console.error("Follow check error:", error);
            } finally {
                setLoading(false);
            }
        };

        checkFollowStatus();
    }, [targetUserId, supabase]);

    const handleFollowToggle = async () => {
        if (!currentUserId) return;
        if (loading) return;

        setLoading(true);
        try {
            if (isFollowing) {
                // Unfollow
                const { error } = await supabase
                    .from('follows')
                    .delete()
                    .eq('follower_id', currentUserId)
                    .eq('following_id', targetUserId);

                if (error) throw error;
                setIsFollowing(false);
                if (onFollowChange) onFollowChange(false);
            } else {
                // Follow
                const { error } = await supabase
                    .from('follows')
                    .insert({ follower_id: currentUserId, following_id: targetUserId });

                if (error) throw error;
                setIsFollowing(true);
                if (onFollowChange) onFollowChange(true);
            }
        } catch (error) {
            console.error("Follow toggle error:", error);
            alert("İşlem sırasında bir hata oluştu.");
        } finally {
            setLoading(false);
        }
    };

    if (!currentUserId || currentUserId === targetUserId) return null;

    return (
        <button
            onClick={handleFollowToggle}
            disabled={loading}
            className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${isFollowing
                    ? 'bg-transparent border border-gray-300 dark:border-white/20 text-gray-700 dark:text-gray-300'
                    : 'bg-primary text-black shadow-lg shadow-primary/20 hover:scale-105'
                }`}
        >
            {loading ? (
                <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
            ) : (
                isFollowing ? 'Takip Ediliyor' : 'Takip Et'
            )}
        </button>
    );
}
