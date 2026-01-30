'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';

export default function ContestWidget() {
    const [contest, setContest] = useState<any>(null);
    const supabase = createClient();

    useEffect(() => {
        const fetchContest = async () => {
            // Fetch a separate active contest, or specifically one marked for widget
            // For now, fetch the second active one (since first is featured) or just a random one
            const { data } = await supabase
                .from('contests')
                .select('*')
                .eq('is_active', true)
                .limit(1)
                .order('created_at', { ascending: true }); // Get an older active one maybe?

            if (data && data.length > 0) {
                setContest(data[0]);
            }
        };
        fetchContest();
    }, []);

    if (!contest) return null;

    return (
        <section className="px-4">
            <div className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden shadow-lg group">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${contest.image_url || 'https://images.unsplash.com/photo-1551884831-bbf3ddd77535?auto=format&fit=crop&q=80'}')` }}>
                </div>
                <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute inset-y-0 right-0 w-2/3 p-5 flex flex-col items-end justify-center text-right gap-2">
                    <div className="flex items-center gap-2 mb-1">
                        <div
                            className="flex items-center gap-1 bg-primary/90 backdrop-blur-sm px-2 py-0.5 rounded-lg border border-white/10">
                            <span className="material-symbols-outlined text-black text-[12px]">celebration</span>
                            <span className="text-black text-[10px] font-bold">Özel Etkinlik</span>
                        </div>
                    </div>
                    <h2 className="text-white text-lg font-bold leading-tight shadow-sm">
                        {contest.title}
                    </h2>
                    <Link
                        href={`/yarisma`}
                        className="mt-2 bg-white text-black hover:bg-white/90 font-bold py-1.5 px-4 rounded-full text-xs shadow-lg transition-transform active:scale-95">
                        İncele
                    </Link>
                </div>
            </div>
        </section>
    );
}
