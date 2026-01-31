'use server'

import { createClient } from "@/utils/supabase/server";
import { requireAdmin } from "@/utils/supabase/check-auth";
import { revalidatePath } from "next/cache";

export async function approveItem(id: string, type: 'pet' | 'ad') {
    try {
        // Ensure the user is an admin
        await requireAdmin();

        const supabase = await createClient();
        const table = type === 'pet' ? 'pets' : 'ads';

        const { data, error } = await supabase
            .from(table)
            .update({ status: 'approved' })
            .eq('id', id)
            .select();

        if (error) {
            console.error('Approve Error:', error);
            return { error: error.message };
        }

        if (!data || data.length === 0) {
            return { error: 'Kayıt güncellenemedi. RLS (Veritabanı İzinleri) engelliyor olabilir.' };
        }

        revalidatePath('/admin/moderasyon');
        revalidatePath('/admin/petler');
        revalidatePath('/admin/kullanicilar');
        return { success: true };
    } catch (e: any) {
        console.error('Unexpected Approve Error:', e);
        return { error: e.message || 'An unexpected error occurred' };
    }
}

export async function rejectItem(id: string, type: 'pet' | 'ad') {
    try {
        // Ensure the user is an admin
        await requireAdmin();

        const supabase = await createClient();
        const table = type === 'pet' ? 'pets' : 'ads';

        const { data, error } = await supabase
            .from(table)
            .delete()
            .eq('id', id)
            .select();

        if (error) {
            console.error('Reject Error:', error);
            return { error: error.message };
        }

        if (!data || data.length === 0) {
            return { error: 'Kayıt silinemedi. RLS (Veritabanı İzinleri) engelliyor olabilir.' };
        }

        revalidatePath('/admin/moderasyon');
        revalidatePath('/admin/petler');
        revalidatePath('/admin/kullanicilar');
        return { success: true };
    } catch (e: any) {
        console.error('Unexpected Reject Error:', e);
        return { error: e.message || 'An unexpected error occurred' };
    }
}

export async function globalSearch(query: string) {
    try {
        await requireAdmin();
        const supabase = await createClient();
        const searchTerm = `%${query}%`;

        const [users, pets, ads, contests] = await Promise.all([
            supabase.from('profiles').select('id, full_name, email, avatar_url').ilike('full_name', searchTerm).limit(3),
            supabase.from('pets').select('id, name, type, image_url').ilike('name', searchTerm).limit(3),
            supabase.from('ads').select('id, title, type, photo_url').ilike('title', searchTerm).limit(3),
            supabase.from('contests').select('id, title, image_url').ilike('title', searchTerm).limit(3)
        ]);

        return {
            users: users.data || [],
            pets: pets.data || [],
            ads: ads.data || [],
            contests: contests.data || []
        };
    } catch (e: any) {
        console.error('Search Error:', e);
        return { users: [], pets: [], ads: [], contests: [] };
    }
}

export async function deletePet(id: string) {
    return rejectItem(id, 'pet');
}

export async function createContest(formData: FormData) {
    try {
        await requireAdmin();
        const supabase = await createClient();

        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const category = formData.get('category') as string;
        const requirementsStr = formData.get('requirements') as string;
        const start_date = formData.get('start_date') as string;
        const end_date = formData.get('end_date') as string;
        // Image handling would ideally go here, using a placeholder for now if not uploaded
        const image_url = 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba';
        const widget_placement = formData.get('widget_placement') as string || 'none';

        const requirements = requirementsStr ? JSON.parse(requirementsStr) : {};

        const { data, error } = await supabase
            .from('contests')
            .insert({
                title,
                description,
                category,
                requirements,
                start_date: new Date(start_date).toISOString(),
                end_date: new Date(end_date).toISOString(),
                image_url,
                status: 'active',
                widget_placement
            })
            .select();

        if (error) {
            console.error('Create Contest Error:', error);
            return { error: error.message };
        }

        revalidatePath('/admin/yarisma');
        return { success: true };
    } catch (e: any) {
        console.error('Create Contest Exception:', e);
        return { error: e.message };
    }
}

export async function deleteAd(id: string) {
    return rejectItem(id, 'ad');
}
