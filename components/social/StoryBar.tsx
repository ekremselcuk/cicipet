'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import StoryUploader from './StoryUploader';
import TimeAgo from 'react-timeago';
import LikeButton from './LikeButton';
import ShareButton from './ShareButton';

// @ts-ignore
import trStrings from 'react-timeago/lib/language-strings/tr';
// @ts-ignore
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';

const formatter = buildFormatter(trStrings);

interface Story {
    id: string;
    image_url: string;
    created_at: string;
    user_id: string;
    profiles: {
        full_name: string;
        avatar_url: string;
    };
    caption?: string; // Add caption support
}

export default function StoryBar() {
    const [stories, setStories] = useState<Story[]>([]);
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [uploadOpen, setUploadOpen] = useState(false);
    const [viewingStory, setViewingStory] = useState<Story | null>(null);
    const [commentText, setCommentText] = useState(''); // State for comment input
    const supabase = createClient();

    useEffect(() => {
        const init = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setCurrentUser(user);
            fetchStories();
        };
        init();
    }, []);

    const fetchStories = async () => {
        const now = new Date().toISOString();
        const { data, error } = await supabase
            .from('stories')
            .select('*, profiles(full_name, avatar_url), likes(count)')
            .gt('expires_at', now)
            .order('created_at', { ascending: false });

        if (data) {
            setStories(data as any[]);
        }
    };

    const handleSendResult = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!commentText.trim() || !viewingStory || !currentUser) return;

        try {
            // Insert comment
            const { error } = await supabase.from('comments').insert({
                user_id: currentUser.id,
                item_id: viewingStory.id, // Story ID
                type: 'story', // Identify as story comment
                content: commentText.trim()
            });

            if (error) throw error;

            alert('Yanıtınız gönderildi!'); // Feedback
            setCommentText(''); // Clear input

        } catch (err) {
            console.error(err);
            alert('Mesaj gönderilemedi.');
        }
    };

    // Group stories by user
    const groupedStories = stories.reduce((acc, story) => {
        if (!acc[story.user_id]) acc[story.user_id] = [];
        acc[story.user_id].push(story);
        return acc;
    }, {} as Record<string, Story[]>);

    return (
        <section className="px-4">
            <h3 className="text-sm font-bold text-neutral-900 dark:text-white mb-3 flex items-center gap-1">
                Hikayeler <span className="text-xs font-normal text-neutral-500 ml-auto">Tümünü gör</span>
            </h3>

            <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-1">
                {/* Add Story Button */}
                <div className="flex flex-col items-center gap-1.5 shrink-0" onClick={() => setUploadOpen(true)}>
                    <div className="size-16 rounded-full bg-white dark:bg-white/5 border-2 border-dashed border-neutral-300 dark:border-neutral-600 flex items-center justify-center relative cursor-pointer hover:border-primary transition-colors">
                        <span className="material-symbols-outlined text-secondary text-2xl">add</span>
                        <div className="absolute bottom-0 right-0 bg-secondary text-white rounded-full p-0.5 border-2 border-white dark:border-background-dark">
                            <span className="material-symbols-outlined text-[10px] block">add</span>
                        </div>
                    </div>
                    <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">Ekle</span>
                </div>

                {/* Story List */}
                {Object.keys(groupedStories).map(userId => {
                    const userStories = groupedStories[userId];
                    const mainStory = userStories[0];
                    const isSelf = currentUser && currentUser.id === userId;

                    if (isSelf) return null;

                    return (
                        <div
                            key={userId}
                            className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer"
                            onClick={() => setViewingStory(mainStory)}
                        >
                            <div className="size-16 rounded-full p-0.5 bg-gradient-to-tr from-primary to-secondary">
                                <div className="w-full h-full rounded-full bg-white dark:bg-black p-0.5">
                                    <img
                                        alt="story"
                                        className="w-full h-full rounded-full object-cover"
                                        src={mainStory.profiles?.avatar_url || 'https://via.placeholder.com/100'}
                                    />
                                </div>
                            </div>
                            <span className="text-xs font-medium text-neutral-900 dark:text-white truncate w-14 text-center">
                                {mainStory.profiles?.full_name?.split(' ')[0] || 'User'}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Upload Modal */}
            {uploadOpen && (
                <StoryUploader
                    onClose={() => setUploadOpen(false)}
                    onUploadSuccess={fetchStories}
                />
            )}

            {/* Viewer Modal */}
            {viewingStory && (
                <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
                    <div className="relative w-full max-w-md h-full md:h-[80vh] bg-black md:rounded-2xl overflow-hidden flex flex-col">
                        {/* Progress Bar (Mock) */}
                        <div className="absolute top-2 left-2 right-2 flex gap-1 z-20">
                            <div className="h-1 bg-white/50 flex-1 rounded-full overflow-hidden">
                                <div className="h-full bg-white w-full animate-[progress_5s_linear]"></div>
                            </div>
                        </div>

                        {/* Top Info */}
                        <div className="absolute top-6 left-4 right-12 z-20 flex items-center gap-2">
                            <img
                                src={viewingStory.profiles?.avatar_url || 'https://via.placeholder.com/40'}
                                className="w-8 h-8 rounded-full border border-white/20"
                            />
                            <div className="flex flex-col">
                                <span className="text-white font-bold text-sm shadow-black drop-shadow-md">
                                    {viewingStory.profiles?.full_name}
                                </span>
                                <span className="text-white/60 text-xs">
                                    <TimeAgo date={viewingStory.created_at} formatter={formatter} />
                                </span>
                            </div>
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={() => setViewingStory(null)}
                            className="absolute top-6 right-4 z-30 text-white/80 hover:text-white"
                        >
                            <span className="material-symbols-outlined text-3xl">close</span>
                        </button>

                        {/* Main Image */}
                        <div className="flex-1 relative">
                            <img
                                src={viewingStory.image_url}
                                className="w-full h-full object-cover"
                                alt="story"
                            />

                            {/* Caption Overlay if exists */}
                            {viewingStory.caption && (
                                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-12 pb-24 text-center">
                                    <p className="text-white text-lg font-medium leading-relaxed drop-shadow-lg">
                                        {viewingStory.caption}
                                    </p>
                                </div>
                            )}

                            {/* Share Button (Top Right, below close) */}
                            <div className="absolute top-16 right-4 flex flex-col gap-4">
                                <div className="bg-black/20 backdrop-blur-md rounded-full p-2">
                                    <ShareButton
                                        title={`CiciPet Story: ${viewingStory.profiles?.full_name}`}
                                        text={viewingStory.caption || 'Bu hikayeye göz at!'}
                                        url={`/`} // Deep link to story hard to mock, homepage for now
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Reply / Like (Bottom) */}
                        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 z-30">
                            <form onSubmit={handleSendResult} className="flex-1 relative">
                                <input
                                    type="text"
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                    placeholder="Mesaj gönder..."
                                    className="w-full bg-white/10 border border-white/20 rounded-full pl-4 pr-10 py-3 text-white placeholder:text-white/60 backdrop-blur-md outline-none focus:bg-white/20 transition-all"
                                />
                                {commentText && (
                                    <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-primary text-white rounded-full">
                                        <span className="material-symbols-outlined text-sm">send</span>
                                    </button>
                                )}
                            </form>

                            <div className="bg-white/10 backdrop-blur-md p-2 rounded-full">
                                <LikeButton
                                    itemId={viewingStory.id}
                                    itemType="story"
                                    initialLikes={(viewingStory as any).likes?.[0]?.count || 0}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
