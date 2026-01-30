'use client';

import { useFormStatus } from 'react-dom';
import { adminLogin } from './actions';
import { useState } from 'react';

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full py-3 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
            {pending ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
        </button>
    );
}

export default function SecretLoginPage() {
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (formData: FormData) => {
        const result = await adminLogin(formData);
        if (result?.error) {
            setError(result.error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-display">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
                <div className="text-center mb-8">
                    <span className="material-symbols-outlined text-4xl text-gray-800 mb-2">lock</span>
                    <h1 className="text-xl font-bold text-gray-800">Yönetici Paneli</h1>
                    <p className="text-sm text-gray-500">Bu alana sadece yetkili kişiler erişebilir.</p>
                </div>

                <form action={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1 ml-1 uppercase">Kullanıcı Adı</label>
                        <input
                            name="username"
                            type="text"
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                            placeholder="Kullanıcı adı"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1 ml-1 uppercase">Şifre</label>
                        <input
                            name="password"
                            type="password"
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    {error && (
                        <div className="p-3 bg-red-50 text-red-600 text-sm font-bold rounded-lg flex items-center gap-2">
                            <span className="material-symbols-outlined text-[18px]">error</span>
                            {error}
                        </div>
                    )}

                    <SubmitButton />
                </form>
            </div>
        </div>
    );
}
