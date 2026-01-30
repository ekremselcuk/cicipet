import { SupabaseClient } from '@supabase/supabase-js';

export type FeedItemType = {
    id: string;
    type: 'pet' | 'ad' | 'story';
    subType: string; // e.g. 'kedi', 'kayip', 'es_bulma', 'image'
    title: string;
    description: string;
    image_url: string;
    created_at: string;
    user_id: string;
    profiles: {
        id: string;
        full_name: string;
        avatar_url: string;
        city?: string;
    };
    likes_count?: number;
    comments_count?: number;
    is_liked?: boolean;
    is_bookmarked?: boolean;
};

export async function getFeedItems(supabase: SupabaseClient): Promise<FeedItemType[]> {
    // 1. Fetch Pets (latest 20)
    const { data: pets, error: petsError } = await supabase
        .from('pets')
        .select(`
            *,
            profiles(id, full_name, avatar_url, city),
            likes(count),
            comments(count)
        `)
        //.eq('status', 'approved') 
        .order('created_at', { ascending: false })
        .limit(20);

    if (petsError) console.error('Error fetching pets for feed:', petsError);

    // 2. Fetch Ads (latest 20)
    const { data: ads, error: adsError } = await supabase
        .from('ads')
        .select(`
            *,
            profiles(id, full_name, avatar_url, city),
            likes(count),
            comments(count)
        `)
        // .eq('status', 'approved')
        .order('created_at', { ascending: false })
        .limit(20);

    if (adsError) console.error('Error fetching ads for feed:', adsError);

    // 3. Fetch Stories (latest 20 active)
    const { data: stories, error: storiesError } = await supabase
        .from('stories')
        .select(`
            *,
            profiles!stories_user_id_fkey(full_name, avatar_url, id),
            likes(count),
            comments(count)
        `)
        // .gt('expires_at', new Date().toISOString()) 
        .order('created_at', { ascending: false })
        .limit(20);

    if (storiesError) console.error('Error fetching stories for feed:', storiesError);


    // 4. Transform and Merge
    const petItems: FeedItemType[] = (pets || []).map((p: any) => ({
        id: p.id,
        type: 'pet',
        subType: p.type,
        title: `${p.name} (${p.breed || 'Melez'})`,
        description: `Merhaba! Ben ${p.name}. ${p.age ? p.age + ' yaşındayım.' : ''}`,
        image_url: p.image_url,
        created_at: p.created_at,
        user_id: p.owner_id,
        profiles: p.profiles,
        likes_count: p.likes?.[0]?.count || 0,
        comments_count: p.comments?.[0]?.count || 0,
    }));

    const adItems: FeedItemType[] = (ads || []).map((a: any) => ({
        id: a.id,
        type: 'ad',
        subType: a.type,
        title: a.title,
        description: a.description,
        image_url: a.photo_url,
        created_at: a.created_at,
        user_id: a.user_id,
        profiles: a.profiles,
        likes_count: a.likes?.[0]?.count || 0,
        comments_count: a.comments?.[0]?.count || 0,
    }));

    const storyItems: FeedItemType[] = (stories || []).map((s: any) => ({
        id: s.id,
        type: 'story',
        subType: 'story',
        title: s.title || 'Hikaye Paylaşımı',
        description: s.caption || '',
        image_url: s.image_url,
        created_at: s.created_at,
        user_id: s.user_id,
        profiles: {
            id: s.user_id,
            full_name: s.profiles?.full_name || 'Kullanıcı',
            avatar_url: s.profiles?.avatar_url || 'https://via.placeholder.com/150',
            city: ''
        },
        likes_count: s.likes?.[0]?.count || 0,
        comments_count: 0,
    }));

    // 5. Sort Combined List by Date
    const feed = [...petItems, ...adItems, ...storyItems].sort((a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    return feed;
}
