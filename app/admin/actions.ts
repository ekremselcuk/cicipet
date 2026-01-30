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
