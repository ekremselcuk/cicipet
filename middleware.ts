import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    // 1. Check for basic environment variables
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        console.error('Supabase env variables are missing in Middleware!');
        // Allow request to proceed to avoid 500, but auth won't work.
        // Or redirect to a setup error page.
        return NextResponse.next();
    }

    try {
        // Temporary fix: Bypass Supabase middleware logic to confirm deployment stability
        const response = NextResponse.next({
            request: {
                headers: request.headers,
            },
        });

        /*
        const supabase = createServerClient(
           // ...
        )

        const { data: { user }, error } = await supabase.auth.getUser()
        // ...
        */

        return response

    } catch (e) {
        console.error('Middleware Error:', e);
        // Fail open: Allow the request to complete instead of blocking with 500
        return NextResponse.next({
            request: {
                headers: request.headers,
            },
        });
    }
}


export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
