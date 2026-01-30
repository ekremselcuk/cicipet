import { SupabaseClient } from '@supabase/supabase-js';

export type FeedItemType = {
    id: string;
    type: 'pet' | 'ad';
    subType: string; // e.g. 'kedi', 'kayip', 'es_bulma'
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
        //.eq('status', 'approved') // Assuming status column exists and is used. If not, remove.
        .order('created_at', { ascending: false })
        .limit(20);

    if (petsError) {
        console.error('Error fetching pets for feed:', petsError);
    }

    // 2. Fetch Ads (latest 20)
    const { data: ads, error: adsError } = await supabase
        .from('ads')
        .select(`
            *,
            profiles(id, full_name, avatar_url, city), // Assuming profiles relation is set up correctly
            likes(count),
            comments(count)
        `)
        // .eq('status', 'approved')
        .order('created_at', { ascending: false })
        .limit(20);

    if (adsError) {
        console.error('Error fetching ads for feed:', adsError);
    }

    // 3. Transform and Merge
    const petItems: FeedItemType[] = (pets || []).map((p: any) => ({
        id: p.id,
        type: 'pet',
        subType: p.type,
        title: `${p.name} (${p.breed || 'Melez'})`,
        description: `Merhaba! Ben ${p.name}. ${p.age ? p.age + ' yaşındayım.' : ''}`, // Basic intro
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
        subType: a.type, // 'kayip', 'sahiplendirme', 'es_bulma'
        title: a.title,
        description: a.description,
        image_url: a.photo_url,
        created_at: a.created_at,
        user_id: a.user_id,
        profiles: a.profiles,
        likes_count: a.likes?.[0]?.count || 0,
        comments_count: a.comments?.[0]?.count || 0,
    }));

    // 4. Sort Combined List by Date
    const feed = [...petItems, ...adItems].sort((a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    return feed;
}
