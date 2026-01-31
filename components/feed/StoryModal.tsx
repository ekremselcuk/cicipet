'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import TimeAgo from 'react-timeago';
// @ts-ignore
import trStrings from 'react-timeago/lib/language-strings/tr';
// @ts-ignore
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import LikeButton from '../social/LikeButton';
import BookmarkButton from '../social/BookmarkButton';
import CommentSection from '../social/CommentSection';
import FollowButton from '../social/FollowButton';

const formatter = buildFormatter(trStrings);

interface StoryModalProps {
    story: any; // Type defined in feed.ts but utilizing specific fields here
    isOpen: boolean;
    onClose: () => void;
}

export default function StoryModal({ story, isOpen, onClose }: StoryModalProps) {
    if (!isOpen || !story) return null;

    // Close on escape
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white hover:text-gray-300 z-50 p-2 bg-black/20 rounded-full"
            >
                <span className="material-symbols-outlined text-3xl">close</span>
            </button>

            <div className="flex flex-col md:flex-row w-full max-w-5xl h-[85vh] bg-black rounded-xl overflow-hidden border border-white/10 shadow-2xl">

                {/* Media Section (Left/Top) */}
                <div className="flex-1 bg-black flex items-center justify-center relative min-h-[40vh] md:min-h-full">
                    <img
                        src={story.image_url}
                        alt={story.title || 'Story'}
                        className="max-h-full max-w-full object-contain"
                    />
                </div>

                {/* Interaction Section (Right/Bottom) */}
                <div className="w-full md:w-[400px] flex flex-col bg-white dark:bg-[#1a1a1a] border-l border-white/10">

                    {/* Header */}
                    <div className="p-4 flex items-center justify-between border-b border-gray-100 dark:border-white/5">
                        <div className="flex items-center gap-3">
                            <div className="size-10 rounded-full bg-gray-200 overflow-hidden ring-2 ring-primary/20">
                                <img
                                    src={story.profiles?.avatar_url || 'https://via.placeholder.com/40'}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm dark:text-white">
                                    {story.profiles?.full_name || 'Kullanıcı'}
                                </h4>
                                <span className="text-xs text-gray-500">
                                    <TimeAgo date={story.created_at} formatter={formatter} />
                                </span>
                            </div>
                        </div>
                        <FollowButton targetUserId={story.user_id} />
                    </div>

                    {/* Comments Area (Scrollable) */}
                    <div className="flex-1 overflow-y-auto p-0 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-neutral-700">
                        {/* Caption as first comment */}
                        {story.description && (
                            <div className="p-4 pb-2 border-b border-gray-100 dark:border-white/5">
                                <p className="text-sm dark:text-gray-200">{story.description}</p>
                            </div>
                        )}
                        <div className="p-2">
                            <CommentSection itemId={story.id} itemType="story" />
                        </div>
                    </div>

                    {/* Action Footer */}
                    <div className="p-4 border-t border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-black/20">
                        <div className="flex items-center justify-between mb-3 px-1">
                            <div className="flex gap-4">
                                <LikeButton itemId={story.id} itemType="story" initialLikes={story.likes_count || 0} />
                                {/* Comment icon is just decoration here as input is above/below */}
                                <button className="text-gray-500 hover:text-blue-500">
                                    <span className="material-symbols-outlined filled">chat_bubble</span>
                                </button>
                                <ShareButton title={story.title} text={story.description} url={`/profil?story=${story.id}`} />
                            </div>
                            <BookmarkButton itemId={story.id} itemType="story" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Helper for share button since it was imported in FeedItem but not standard
function ShareButton({ title, text, url }: { title?: string, text?: string, url?: string }) {
    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({ title, text, url: window.location.origin + url });
            } catch (err) { console.log('Share canceled'); }
        } else {
            alert('Tarayıcınız paylaşımı desteklemiyor.');
        }
    };
    return (
        <button onClick={handleShare} className="text-gray-400 hover:text-green-500">
            <span className="material-symbols-outlined text-[20px]">share</span>
        </button>
    );
}
