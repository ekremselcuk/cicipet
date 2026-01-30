'use client';

import { useState } from 'react';
import { deletePet } from '@/app/admin/actions';
import { useRouter } from 'next/navigation';

export default function DeletePetButton({ id }: { id: string }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        if (!confirm('Bu peti silmek istediğinize emin misiniz? Bu işlem geri alınamaz.')) return;

        setIsDeleting(true);
        const result = await deletePet(id);
        setIsDeleting(false);

        if (result.success) {
            router.refresh();
        } else {
            alert('Silme işlemi başarısız: ' + result.error);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="h-9 w-9 flex items-center justify-center rounded-lg bg-gray-50 dark:bg-white/5 hover:bg-red-500/20 hover:text-red-500 text-slate-600 dark:text-gray-300 transition-colors disabled:opacity-50"
            title="Peti Sil"
        >
            <span className="material-symbols-outlined text-[18px]">
                {isDeleting ? 'hourglass_empty' : 'delete'}
            </span>
        </button>
    );
}
