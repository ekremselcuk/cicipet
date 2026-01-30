'use client';

import { useState, useEffect, useRef } from 'react';
import { createClient } from '@/utils/supabase/client';
import TimeAgo from 'react-timeago';
// @ts-ignore
import trStrings from 'react-timeago/lib/language-strings/tr';
// @ts-ignore
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';

const formatter = buildFormatter(trStrings);

interface Comment {
    id: string;
    content: string;
    created_at: string;
    user_id: string;
    profiles?: {
        full_name: string;
        avatar_url: string;
    };
}

interface CommentSectionProps {
    itemId: string;
    itemType: 'pet' | 'ad';
}

export default function CommentSection({ itemId, itemType }: CommentSectionProps) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(false);
    const supabase = createClient();
    const bottomRef = useRef<HTMLDivElement>(null);

    // Initial Fetch
    // Initial Fetch
    useEffect(() => {
        const fetchInitialComments = async () => {
            const { data, error } = await supabase
                .from('comments')
                .select('*, profiles(full_name, avatar_url)')
                .eq('item_id', itemId)
                .eq('item_type', itemType)
                .order('created_at', { ascending: true });

            if (data) {
                setComments(data as any[]);
            }
        };

        fetchInitialComments();

        // Realtime Subscription
        const channel = supabase
            .channel('public:comments')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'comments', filter: `item_id=eq.${itemId}` }, async (payload) => {
                // Fetch the user profile for the new comment
                const { data: profile } = await supabase.from('profiles').select('full_name, avatar_url').eq('id', payload.new.user_id).single();

                const commentWithProfile = {
                    ...payload.new,
                    profiles: profile
                };

                // Only add if types match (filter limitation in supabase-js sometimes, good to double check)
                if (payload.new.item_type === itemType) {
                    setComments(prev => [...prev, commentWithProfile as any]);
                    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
                }
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [itemId, itemType, supabase]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        setLoading(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                alert('Yorum yapmak için giriş yapmalısınız.');
                return;
            }

            const { error } = await supabase.from('comments').insert({
                user_id: user.id,
                item_id: itemId,
                item_type: itemType,
                content: newComment
            });

            if (error) throw error;
            setNewComment('');
        } catch (err) {
            console.error(err);
            alert('Yorum gönderilemedi.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-gray-50 dark:bg-black/20 rounded-2xl p-4">
            <h3 className="font-bold text-sm text-gray-500 uppercase tracking-wider mb-4">Yorumlar ({comments.length})</h3>

            <div className="flex-1 overflow-y-auto max-h-[300px] mb-4 space-y-4 pr-2">
                {comments.length === 0 && <p className="text-gray-400 text-sm text-center py-4">Henüz yorum yok. İlk yorumu sen yap!</p>}

                {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                        <img
                            src={comment.profiles?.avatar_url || 'https://via.placeholder.com/40'}
                            className="w-8 h-8 rounded-full object-cover shrink-0"
                            alt="avatar"
                        />
                        <div className="flex flex-col">
                            <div className="bg-white dark:bg-surface-dark p-3 rounded-2xl rounded-tl-none shadow-sm">
                                <span className="font-bold text-sm text-slate-900 dark:text-white block mb-1">
                                    {comment.profiles?.full_name || 'Kullanıcı'}
                                </span>
                                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{comment.content}</p>
                            </div>
                            <span className="text-[10px] text-gray-400 mt-1 pl-1">
                                <TimeAgo date={comment.created_at} formatter={formatter} />
                            </span>
                        </div>
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>

            <form onSubmit={handleSubmit} className="relative">
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Bir yorum yaz..."
                    className="w-full pl-4 pr-12 py-3 rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 focus:ring-2 focus:ring-primary outline-none"
                    disabled={loading}
                />
                <button
                    type="submit"
                    disabled={loading || !newComment.trim()}
                    className="absolute right-2 top-2 p-1.5 text-primary hover:bg-primary/10 rounded-lg disabled:opacity-50 transition-colors"
                >
                    <span className="material-symbols-outlined">send</span>
                </button>
            </form>
        </div>
    );
}
