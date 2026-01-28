'use client';

import { useState } from "react";

export default function AddPetModal() {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <>
            {/* Trigger Button */}
            <button
                onClick={openModal}
                className="flex-shrink-0 flex flex-col items-center gap-2 group"
            >
                <div className="w-20 h-20 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-surface-dark flex items-center justify-center text-gray-400 group-hover:text-primary group-hover:border-primary group-hover:bg-primary/5 transition-all">
                    <span className="material-symbols-outlined text-[28px]">add</span>
                </div>
                <span className="text-xs font-bold text-gray-400 group-hover:text-primary transition-colors">Yeni Pet Ekle</span>
            </button>

            {/* Modal Overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="w-full max-w-sm bg-white dark:bg-[#221c10] rounded-3xl overflow-hidden shadow-2xl p-6 relative animate-in zoom-in-95 duration-200">
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>

                        <h3 className="text-xl font-bold text-center mb-2 text-slate-900 dark:text-white">Pet Fotoğrafı Yükle</h3>
                        <p className="text-sm text-center text-gray-500 mb-6">Sevimli dostunun fotoğrafını nasıl yüklemek istersin?</p>

                        <div className="grid grid-cols-2 gap-4">
                            <button className="flex flex-col items-center gap-3 p-4 rounded-2xl border-2 border-gray-100 dark:border-white/10 hover:border-primary hover:bg-primary/5 transition-all group">
                                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-2xl">photo_camera</span>
                                </div>
                                <span className="text-sm font-bold text-slate-700 dark:text-gray-200">Kamera</span>
                            </button>

                            <button className="flex flex-col items-center gap-3 p-4 rounded-2xl border-2 border-gray-100 dark:border-white/10 hover:border-primary hover:bg-primary/5 transition-all group">
                                <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-2xl">image</span>
                                </div>
                                <span className="text-sm font-bold text-slate-700 dark:text-gray-200">Galeri</span>
                            </button>
                        </div>

                        <p className="text-xs text-center text-gray-400 mt-6">
                            *Fotoğraf yüklendikten sonra cins ve yaş bilgilerini girebileceksin.
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}
