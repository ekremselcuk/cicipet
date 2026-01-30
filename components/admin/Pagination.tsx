'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function Pagination({
    total,
    currentLimit,
    currentOffset
}: {
    total: number;
    currentLimit: number;
    currentOffset: number;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentPage = Math.floor(currentOffset / currentLimit) + 1;
    const totalPages = Math.ceil(total / currentLimit);

    const updateParams = (newParams: Record<string, string>) => {
        const params = new URLSearchParams(searchParams.toString());
        Object.entries(newParams).forEach(([key, value]) => {
            params.set(key, value);
        });
        router.push(`${pathname}?${params.toString()}`);
    };

    if (total === 0) return null;

    return (
        <div className="flex items-center justify-between p-4 bg-white dark:bg-surface-dark border-t border-gray-100 dark:border-white/5">
            <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Sayfa Başına:</span>
                <select
                    value={currentLimit}
                    onChange={(e) => updateParams({ limit: e.target.value, offset: '0' })}
                    className="bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg text-xs py-1 px-2"
                >
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>

            <div className="flex items-center gap-2">
                <button
                    disabled={currentPage === 1}
                    onClick={() => updateParams({ offset: Math.max(0, currentOffset - currentLimit).toString() })}
                    className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <span className="text-xs text-gray-500">
                    {currentPage} / {totalPages}
                </span>
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => updateParams({ offset: (currentOffset + currentLimit).toString() })}
                    className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <span className="material-symbols-outlined">chevron_right</span>
                </button>
            </div>
        </div>
    );
}
