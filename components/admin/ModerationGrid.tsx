'use client';

import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface ModerationItem {
    id: string; // uuid
    type: 'pet' | 'ad';
    subType?: string; // e.g. 'kayip', 'kedi'
    title: string; // name
    owner: string; // owner name or id
    image: string;
    date: string;
}

export default function ModerationGrid({ initialItems }: { initialItems: ModerationItem[] }) {
    const [items, setItems] = useState<ModerationItem[]>(initialItems);
    const supabase = createClient();
    const router = useRouter();

    const handleAction = async (id: string, type: 'pet' | 'ad', action: 'approve' | 'reject') => {
        // Optimistic UI update
        setItems(items.filter(i => i.id !== id));

        const table = type === 'pet' ? 'pets' : 'ads';
        const status = action === 'approve' ? 'approved' : 'rejected';

        try {
            const { error } = await supabase
                .from(table)
                .update({ status })
                .eq('id', id);

            if (error) {
                console.error('Moderation error:', error);
                // Revert on error (skipped for simplicity in MVP)
                alert('İşlem başarısız oldu.');
            } else {
                router.refresh(); // Sync server state
            }
        } catch (e) {
            console.error(e);
        }
    };

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-gray-400">
                <span className="material-symbols-outlined text-6xl mb-4 text-gray-300">check_circle</span>
                <p>Onay bekleyen kayıt yok.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 gap-3 p-4">
            {items.map((item) => (
                <div key={`${item.type}-${item.id}`} className="flex flex-col bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 animate-in fade-in zoom-in duration-300">
                    <div className="relative w-full aspect-square bg-center bg-no-repeat bg-cover bg-gray-100" style={{ backgroundImage: `url("${item.image}")` }}>
                        <div className="absolute top-2 left-2">
                            <div className="bg-black/40 text-white text-[9px] px-1.5 py-0.5 rounded font-bold uppercase backdrop-blur-sm">
                                {item.type === 'pet' ? 'PET' : 'İLAN'}
                            </div>
                        </div>
                    </div>
                    <div className="p-3 space-y-1">
                        <div className="flex justify-between items-start gap-1">
                            <p className="font-bold text-sm truncate flex-1">{item.title}</p>
                            {item.subType && (
                                <span className="text-[9px] bg-[#0dccf2]/10 text-[#0dccf2] px-1 rounded uppercase whitespace-nowrap">{item.subType}</span>
                            )}
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 text-[11px] truncate">Kullanıcı: {item.owner}</p>
                        <p className="text-gray-400 text-[10px]">{new Date(item.date).toLocaleDateString('tr-TR')}</p>

                        <div className="flex gap-2 pt-2">
                            <button
                                onClick={() => handleAction(item.id, item.type, 'approve')}
                                className="flex-1 bg-[#22c55e] text-white py-1.5 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors"
                            >
                                <span className="material-symbols-outlined text-sm">check</span>
                            </button>
                            <button
                                onClick={() => handleAction(item.id, item.type, 'reject')}
                                className="flex-1 bg-[#ef4444] text-white py-1.5 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors"
                            >
                                <span className="material-symbols-outlined text-sm">close</span>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
