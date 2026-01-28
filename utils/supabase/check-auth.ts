import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function requireAuth() {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
        redirect("/auth/login");
    }

    return user;
}

export async function requireAdmin() {
    const user = await requireAuth();

    if (user.email !== "ekremselcuk@gmail.com") {
        redirect("/"); // Or a 403 page
    }

    return user;
}
