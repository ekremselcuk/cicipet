import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
    const supabase = await createClient();
    const { searchParams, origin } = new URL(request.url);
    const next = searchParams.get("next") || "/";

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: `${origin}/auth/callback?next=${next}`,
        },
    });

    if (error) {
        return redirect("/?error=auth");
    }

    if (data.url) {
        return redirect(data.url);
    }

    return redirect("/");
}
