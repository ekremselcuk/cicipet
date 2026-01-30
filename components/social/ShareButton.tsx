'use client';

import { useState } from 'react';

interface ShareButtonProps {
    title: string;
    text: string;
    url: string;
}

export default function ShareButton({ title, text, url }: ShareButtonProps) {
    const handleShare = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (navigator.share) {
            try {
                await navigator.share({
                    title,
                    text,
                    url
                });
            } catch (error) {
                console.log('Error sharing', error);
            }
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(url);
            alert('Link kopyalandı!');
        }
    };

    return (
        <button
            onClick={handleShare}
            className="flex items-center gap-1 text-gray-400 hover:text-blue-500 transition-colors"
        >
            <span className="material-symbols-outlined text-[20px]">share</span>
            <span className="text-xs font-bold">Paylaş</span>
        </button>
    );
}
