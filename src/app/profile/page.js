'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function ProfilePage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        }
    }, [status, router]);

    if (status === 'loading') {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <div className="w-8 h-8 border-4 border-gray-200 border-t-turkuaz-blue rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!session) return null;

    return (
        <div className="px-4 pb-24 space-y-6 animate-fade-in">

            {/* Header / Banner */}
            <div className="bg-white rounded-[32px] p-6 shadow-sm mt-4 text-center space-y-4 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-r from-blue-50 to-purple-50 -z-10"></div>

                <div className="relative inline-block">
                    <img
                        src={session.user.image || `https://ui-avatars.com/api/?name=${session.user.name}`}
                        alt={session.user.name}
                        className="w-24 h-24 rounded-full border-4 border-white shadow-md mx-auto"
                    />
                </div>

                <div>
                    <h2 className="text-2xl font-black text-gray-800">{session.user.name}</h2>
                    <p className="text-gray-500 font-medium text-sm">{session.user.email}</p>
                </div>

                <div className="flex justify-center gap-2 pt-2">
                    <button
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="px-6 py-2 bg-red-50 text-red-500 font-bold rounded-full text-sm hover:bg-red-100 transition-colors"
                    >
                        Çıkış Yap
                    </button>
                </div>
            </div>

            {/* Stats Grid (Mock) */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-2xl shadow-sm text-center">
                    <span className="block text-2xl font-black text-paw-orange">0</span>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Pet</span>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-sm text-center">
                    <span className="block text-2xl font-black text-turkuaz-blue">0</span>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Puan</span>
                </div>
            </div>

            {/* My Pets Section */}
            <div className="space-y-4">
                <div className="flex justify-between items-end px-2">
                    <h3 className="text-xl font-bold text-gray-700">Petlerim</h3>
                    <Link href="/upload" className="text-sm font-bold text-turkuaz-blue hover:underline">
                        + Yeni Ekle
                    </Link>
                </div>

                {/* Empty State */}
                <div className="bg-white rounded-[24px] p-8 text-center border-2 border-dashed border-gray-100 space-y-3">
                    <span className="text-4xl block opacity-50">🐱</span>
                    <h4 className="font-bold text-gray-600">Henüz pet eklemedin</h4>
                    <p className="text-sm text-gray-400 pb-2">Hemen sevimli dostunu yükle ve yarışmaya katıl!</p>
                    <Link
                        href="/upload"
                        className="inline-block px-6 py-3 bg-paw-orange text-white font-bold rounded-xl shadow-lg shadow-orange-200 hover:shadow-xl hover:scale-105 transition-all"
                    >
                        Hemen Yükle 📸
                    </Link>
                </div>
            </div>
        </div>
    );
}
