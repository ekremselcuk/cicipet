'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        await signIn('google', { callbackUrl: '/profile' });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-bone-white px-4">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 space-y-8 text-center animate-fade-in-up">

                {/* Logo Area */}
                <div className="flex flex-col items-center gap-2">
                    <span className="text-6xl animate-bounce">🐾</span>
                    <h1 className="font-black text-3xl tracking-tight">
                        <span className="text-paw-orange">Cici</span>
                        <span className="text-turkuaz-blue">Pet</span>
                    </h1>
                    <p className="text-gray-500 text-sm font-medium">En tatlı yarışmaya hoş geldin!</p>
                </div>

                {/* Login Actions */}
                <div className="space-y-4 pt-4">
                    <button
                        onClick={handleGoogleLogin}
                        disabled={isLoading}
                        className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold py-3 px-4 rounded-xl transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-gray-300 border-t-turkuaz-blue rounded-full animate-spin"></div>
                        ) : (
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6" />
                        )}
                        <span>Google ile Devam Et</span>
                    </button>
                </div>

                {/* Footer */}
                <p className="text-xs text-center text-gray-400">
                    Giriş yaparak <Link href="/privacy" className="underline hover:text-turkuaz-blue">Gizlilik Politikası</Link>'nı kabul etmiş olursunuz.
                </p>

                <div className="mt-8">
                    <Link href="/" className="text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors">
                        Anasayfaya Dön
                    </Link>
                </div>
            </div>
        </div>
    );
}
