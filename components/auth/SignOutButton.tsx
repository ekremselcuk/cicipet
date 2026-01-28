'use client';

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignOutButton() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const supabase = createClient();

    const handleSignOut = async () => {
        setLoading(true);
        await supabase.auth.signOut();
        router.refresh();
        router.push("/");
        setLoading(false);
    };

    return (
        <button
            onClick={handleSignOut}
            disabled={loading}
            className="w-full py-3 text-red-400 font-bold text-sm hover:text-red-500 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
        >
            {loading ? (
                <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
            ) : (
                <span className="material-symbols-outlined text-[18px]">logout</span>
            )}
            {loading ? "Çıkış Yapılıyor..." : "Çıkış Yap"}
        </button>
    );
}
