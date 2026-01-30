'use client';

import { useState } from 'react';

interface ShareButtonProps {
    title: string;
    text: string;
    url: string;
}

export default function ShareButton({ title, text, url }: ShareButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}${url}` : url;

    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({ title, text, url: fullUrl });
            } catch (error) {
                console.log('Error sharing', error);
            }
        } else {
            setIsOpen(!isOpen);
        }
    };

    const copyLink = () => {
        navigator.clipboard.writeText(fullUrl);
        alert('Link kopyalandı! 📋');
        setIsOpen(false);
    };

    const shareWhatsapp = () => {
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + fullUrl)}`, '_blank');
        setIsOpen(false);
    };

    const shareMail = () => {
        window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + ' ' + fullUrl)}`, '_blank');
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={handleNativeShare}
                className="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors"
            >
                <span className="material-symbols-outlined text-[20px]">share</span>
                <span className="text-xs font-bold">Paylaş</span>
            </button>

            {/* Fallback / Desktop Menu */}
            {isOpen && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
                    <div className="absolute bottom-full right-0 mb-2 w-48 bg-white dark:bg-surface-dark rounded-xl shadow-xl border border-gray-100 dark:border-white/10 z-50 p-2 flex flex-col gap-1 anim-fade-in">
                        <button onClick={copyLink} className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg text-left">
                            <span className="material-symbols-outlined text-[18px]">content_copy</span>
                            Link Kopyala
                        </button>
                        <button onClick={shareWhatsapp} className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg text-left text-green-600">
                            <span className="material-symbols-outlined text-[18px]">chat</span>
                            WhatsApp
                        </button>
                        <button onClick={shareMail} className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg text-left text-blue-600">
                            <span className="material-symbols-outlined text-[18px]">mail</span>
                            E-posta
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
