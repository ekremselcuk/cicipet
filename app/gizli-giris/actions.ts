'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function adminLogin(formData: FormData) {
    const user = formData.get('username') as string;
    const pass = formData.get('password') as string;

    // Hardcoded credentials as requested
    if (user === 'ekremselcuk' && pass === 'Ekrem5298@') {
        const cookieStore = await cookies();
        cookieStore.set('cicipet_admin_token', 'authorized_secret_access', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/',
        });
        redirect('/admin');
    } else {
        return { error: 'Hatalı kullanıcı adı veya şifre!' };
    }
}
