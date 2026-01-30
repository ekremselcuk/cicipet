'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import StoryUploader from './StoryUploader';
import TimeAgo from 'react-timeago';

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
}

export default function StoryBar() {
    const [stories, setStories] = useState<Story[]>([]);
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [uploadOpen, setUploadOpen] = useState(false);
    const [viewingStory, setViewingStory] = useState<Story | null>(null);
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
        // Fetch active stories (expires_at > now)
        // Note: Supabase ISO string comparison works
        const now = new Date().toISOString();

        const { data, error } = await supabase
            .from('stories')
            .select('*, profiles(full_name, avatar_url)')
            .gt('expires_at', now)
            .order('created_at', { ascending: false });

        if (data) {
            setStories(data as any[]);
        }
    };

    // Group stories by user? For MVP, just list individual stories or distinct users.
    // User requested "dairesel avatarlarla listelenen". Usually grouped.
    // Let's group by user_id for the UI.
    const groupedStories = stories.reduce((acc, story) => {
        if (!acc[story.user_id]) {
            acc[story.user_id] = [];
        }
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
                    const mainStory = userStories[0]; // Show the latest? or first?
                    const isSelf = currentUser && currentUser.id === userId;

                    if (isSelf) return null; // Don't show self in list if we have 'Add' button, or show differently? Usually show as 'Your Story'. For now skip.

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
                    <div className="relative w-full max-w-md h-full md:h-[80vh] bg-black md:rounded-2xl overflow-hidden">
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
                            <span className="text-white font-bold text-sm shadow-black drop-shadow-md">
                                {viewingStory.profiles?.full_name}
                            </span>
                            <span className="text-white/60 text-xs">
                                <TimeAgo date={viewingStory.created_at} formatter={formatter} />
                            </span>
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={() => setViewingStory(null)}
                            className="absolute top-6 right-4 z-30 text-white/80 hover:text-white"
                        >
                            <span className="material-symbols-outlined text-3xl">close</span>
                        </button>

                        <img
                            src={viewingStory.image_url}
                            className="w-full h-full object-cover"
                            alt="story"
                        />

                        {/* Reply / Like (Bottom) */}
                        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-4 z-20">
                            <input
                                type="text"
                                placeholder="Mesaj gönder..."
                                className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-3 text-white placeholder:text-white/60 backdrop-blur-md outline-none focus:bg-white/20"
                            />
                            <button className="text-white hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-3xl">favorite</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
