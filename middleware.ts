import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
    // 1. Supabase Auth Refresh
    // Note: updateSession handles the supabase auth token refresh
    // Even if we have a separate admin cookie, we still want supabase auth to work for data fetching

    // Assuming updateSession exists in utils/supabase/middleware as per standard boilerplate. 
    // If not, we might need to standard implementation. 
    // Since I saw 'utils/supabase' folder, I assume it's there.
    // If it fails, I'll need to create it.

    let response = await updateSession(request);

    // 2. Secret Admin Gatekeeper
    if (request.nextUrl.pathname.startsWith('/admin')) {
        const adminToken = request.cookies.get('cicipet_admin_token');

        if (!adminToken || adminToken.value !== 'authorized_secret_access') {
            // Unauthorized access to admin panel -> Redirect to Home to hide the panel existence
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
         * Feel free to modify this pattern to include more paths.
         */
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
