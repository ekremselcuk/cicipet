import { requireAdmin } from "@/utils/supabase/check-auth";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import ContestEditForm from "@/components/admin/ContestEditForm";

export default async function AdminContestDetailPage({ params }: { params: { id: string } }) {
    await requireAdmin();
    const supabase = await createClient();
    const id = params.id;

    const { data: contest, error } = await supabase
        .from('contests')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !contest) {
        return (
            <div className="p-8 text-center">
                <h1 className="text-2xl font-bold mb-4">Yarışma Bulunamadı</h1>
                <Link href="/admin/yarisma" className="text-primary hover:underline">Listeye Dön</Link>
            </div>
        );
    }

    return (
        <div className="p-6 pb-24 max-w-4xl mx-auto">
            <header className="flex items-center gap-4 mb-8">
                <Link href="/admin/yarisma" className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10">
                    <span className="material-symbols-outlined">arrow_back</span>
                </Link>
                <h1 className="text-2xl font-bold">Yarışma Düzenle</h1>
            </header>

            <div className="bg-white dark:bg-surface-dark rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-white/5">
                <ContestEditForm contest={contest} />
            </div>
        </div>
    );
}
