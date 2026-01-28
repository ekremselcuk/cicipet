import { SupabaseClient } from '@supabase/supabase-js';

// --- Profiles ---

export async function getProfile(supabase: SupabaseClient, userId: string) {
    return supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
}

export async function updateProfile(supabase: SupabaseClient, userId: string, data: any) {
    return supabase
        .from('profiles')
        .update(data)
        .eq('id', userId);
}

// --- Pets ---

export async function getUserPets(supabase: SupabaseClient, userId: string) {
    return supabase
        .from('pets')
        .select('*')
        .eq('owner_id', userId)
        .order('created_at', { ascending: false });
}

export async function getPet(supabase: SupabaseClient, petId: string) {
    return supabase
        .from('pets')
        .select('*, profiles(*)')
        .eq('id', petId)
        .single();
}

export async function createPet(supabase: SupabaseClient, petData: any) {
    return supabase
        .from('pets')
        .insert(petData)
        .select()
        .single();
}

// --- Contests ---

export async function getActiveContests(supabase: SupabaseClient) {
    return supabase
        .from('contests')
        .select('*')
        .eq('status', 'active')
        .order('end_date', { ascending: true });
}

export async function getContestDetails(supabase: SupabaseClient, contestId: string) {
    return supabase
        .from('contests')
        .select('*, contest_participants(count)')
        .eq('id', contestId)
        .single();
}

export async function joinContest(supabase: SupabaseClient, entryData: any) {
    return supabase
        .from('contest_participants')
        .insert(entryData);
}

// --- Wallet ---

export async function getWalletBalance(supabase: SupabaseClient, userId: string) {
    return supabase
        .from('wallets')
        .select('*')
        .eq('user_id', userId)
        .single();
}

export async function getTransactions(supabase: SupabaseClient, userId: string) {
    // First get wallet_id from wallets table if needed, or join
    // For simplicity assuming we query by joining or two steps.
    // Actually policies allow querying transactions if you own the wallet.
    // But we need the wallet ID usually. 
    // Let's rely on the policy checking auth.uid() via the wallet relation.

    const { data: wallet } = await supabase
        .from('wallets')
        .select('user_id')
        .eq('user_id', userId)
        .single();

    if (!wallet) return { data: [], error: null };

    return supabase
        .from('transactions')
        .select('*')
        .eq('wallet_id', userId) // wallet_id is user_id in our schema (pk constraint)? 
        // Wait, schema says: wallet_id uuid references wallets(user_id)
        // And wallets pk is user_id. So yes, wallet_id = user_id essentially.
        .order('created_at', { ascending: false });
}
