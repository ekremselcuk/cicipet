'use client';

import { useState } from 'react';
import Link from 'next/link';
import TimeAgo from 'react-timeago';
// @ts-ignore
import trStrings from 'react-timeago/lib/language-strings/tr';
// @ts-ignore
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import { FeedItemType } from '@/utils/supabase/feed';
import LikeButton from '../social/LikeButton';
import CommentSection from '../social/CommentSection';
import ShareButton from '../social/ShareButton';
import BookmarkButton from '../social/BookmarkButton';
import FollowButton from '../social/FollowButton';

const formatter = buildFormatter(trStrings);

export default function FeedItem({ item }: { item: FeedItemType }) {
    const [showComments, setShowComments] = useState(false);

    // Determine link based on type
    const detailLink = item.type === 'pet' ? `/pet/${item.id}` : `/ilanlar/${item.id}`; // Wait, public routes might defer
    // Actually public routes are usually /pet/[id] and /ilanlar/[id].
    // Let's assume these exist or will be verified.

    return (
        <article className="bg-white dark:bg-[#2c2415] rounded-2xl shadow-sm border border-black/5 dark:border-white/5 overflow-hidden">
            {/* Header */}
            <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Link href={`/profil/${item.profiles?.id}`} className="size-10 rounded-full bg-gray-200 overflow-hidden ring-2 ring-primary/20 shrink-0">
                        <img
                            src={item.profiles?.avatar_url || 'https://via.placeholder.com/40'}
                            alt={item.profiles?.full_name || 'User'}
                            className="h-full w-full object-cover"
                        />
                    </Link>
                    <div className="flex flex-col">
                        <Link href={`/profil/${item.profiles?.id}`} className="text-sm font-bold text-neutral-900 dark:text-white hover:underline decoration-primary">
                            {/* Title - Username Format Request */}
                            {item.title ? (
                                <span>{item.title} <span className="font-normal text-neutral-400 mx-1">•</span> {item.profiles?.full_name}</span>
                            ) : (
                                <span>{item.profiles?.full_name || 'Kullanıcı'}</span>
                            )}
                        </Link>
                        <div className="flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400">
                            {item.profiles?.city && <span>{item.profiles.city} • </span>}
                            <TimeAgo date={item.created_at} formatter={formatter} />
                        </div>
                    </div>
                </div>
                <FollowButton targetUserId={item.user_id} />
            </div>

            {/* Content Media */}
            <div className="w-full aspect-square bg-black relative flex items-center justify-center">
                <Link href={detailLink} className="w-full h-full">
                    {/* Centered Image with Contain for stories to look better */}
                    <img
                        src={item.image_url || 'https://via.placeholder.com/600'}
                        alt={item.title}
                        className="w-full h-full object-contain"
                    />
                </Link>
                {/* Type Badge - Hide if story */}
                {item.type !== 'story' && (
                    <div className="absolute top-3 right-3">
                        <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase shadow-sm backdrop-blur-md
                        ${item.type === 'pet' ? 'bg-primary/90 text-black' :
                                item.subType === 'kayip' ? 'bg-red-500/90 text-white' :
                                    item.subType === 'es_bulma' ? 'bg-pink-500/90 text-white' : 'bg-green-500/90 text-white'}`}>
                            {item.type === 'pet' ? 'Yeni Pet' :
                                item.subType === 'kayip' ? 'Kayıp İlanı' :
                                    item.subType === 'es_bulma' ? 'Eş Arıyor' : 'Sahiplendirme'}
                        </span>
                    </div>
                )}
            </div>

            {/* Actions Bar */}
            <div className="flex items-center justify-between p-4 pb-2">
                <div className="flex items-center gap-4">
                    <LikeButton
                        itemId={item.id}
                        itemType={item.type}
                        initialLikes={item.likes_count || 0}
                    // initialLiked logic handled by component or passed if we fetch it
                    />
                    <button
                        onClick={() => setShowComments(!showComments)}
                        className="group flex items-center gap-1.5 text-neutral-600 dark:text-neutral-300 hover:text-blue-500 transition-colors"
                    >
                        <span className="material-symbols-outlined text-[20px] group-hover:fill animate-pulse">chat_bubble</span>
                        <span className="text-sm font-bold">{item.comments_count || 0}</span>
                    </button>
                    <ShareButton title={item.title} text={item.description} url={detailLink} />
                </div>
                <BookmarkButton itemId={item.id} itemType={item.type} />
            </div>

            {/* Text Content */}
            <div className="px-4 pb-3">
                <div className="flex items-baseline gap-2 mb-1">
                    <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                        {item.title}
                    </h3>
                </div>
                <p className="text-sm text-neutral-600 dark:text-gray-300 leading-relaxed line-clamp-2">
                    {item.description}
                </p>
            </div>

            {/* Comments Section (Collapsible) */}
            {showComments && (
                <div className="px-4 pb-4 animate-in slide-in-from-top-2 fade-in duration-200">
                    <div className="pt-3 border-t border-gray-100 dark:border-white/5">
                        <CommentSection itemId={item.id} itemType={item.type} />
                    </div>
                </div>
            )}
        </article>
    );
}
