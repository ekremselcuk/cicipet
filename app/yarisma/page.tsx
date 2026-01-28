import { createClient } from "@/utils/supabase/server";
import { getActiveContests } from "@/utils/supabase/queries";
import ContestView from "./ContestView";

export const revalidate = 0; // Ensure dynamic data fetching

export default async function YarismaPage() {
    const supabase = await createClient();
    const { data: contests } = await getActiveContests(supabase);

    // Pass data to the client component
    return <ContestView contests={(contests || []) as any[]} />;
}
