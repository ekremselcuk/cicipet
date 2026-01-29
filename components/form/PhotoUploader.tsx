'use client';

import { useState, useRef } from "react";
// import { createClient } from "@/utils/supabase/client"; // Will use this for actual upload later

interface PhotoUploaderProps {
    onFileSelect: (file: File) => void;
    currentImage?: string | null;
    colorTheme?: string; // 'primary' | 'red' | 'pink' | 'green'
}

export default function PhotoUploader({ onFileSelect, currentImage, colorTheme = 'primary' }: PhotoUploaderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(currentImage || null);

    // Refs
    const cameraInputRef = useRef<HTMLInputElement>(null);
    const galleryInputRef = useRef<HTMLInputElement>(null);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const handleCameraClick = () => {
        cameraInputRef.current?.click();
    };

    const handleGalleryClick = () => {
        galleryInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Create local preview
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);

            // Pass file back to parent for uploading
            onFileSelect(file);

            closeModal();
        }
    };

    // Dynamic styles based on theme
    const themeColors = {
        primary: { border: 'border-primary', bg: 'bg-primary', text: 'text-primary' },
        red: { border: 'border-red-400', bg: 'bg-red-500', text: 'text-red-500' },
        pink: { border: 'border-pink-400', bg: 'bg-pink-500', text: 'text-pink-500' },
        green: { border: 'border-green-400', bg: 'bg-green-500', text: 'text-green-500' },
    }[colorTheme] || { border: 'border-primary', bg: 'bg-primary', text: 'text-primary' };

    return (
        <>
            {/* Hidden Inputs */}
            <input
                type="file"
                accept="image/*"
                capture="environment"
                ref={cameraInputRef}
                className="hidden"
                onChange={handleFileChange}
            />
            <input
                type="file"
                accept="image/*"
                ref={galleryInputRef}
                className="hidden"
                onChange={handleFileChange}
            />

            {/* Upload Area / Preview */}
            <div className="flex flex-col items-center justify-center w-full">
                <div
                    onClick={openModal}
                    className={`relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-2xl cursor-pointer transition-colors overflow-hidden ${previewUrl ? 'border-transparent' : themeColors.border} hover:bg-black/5 dark:hover:bg-white/5`}
                >
                    {previewUrl ? (
                        <>
                            <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                <span className="material-symbols-outlined text-white text-3xl">edit</span>
                            </div>
                        </>
                    ) : (
                        <div className={`flex flex-col items-center justify-center pt-5 pb-6 ${themeColors.text}`}>
                            <span className="material-symbols-outlined text-4xl mb-2">add_a_photo</span>
                            <p className="text-sm font-semibold">Fotoğraf Ekle</p>
                            <p className="text-xs opacity-70">Kamera veya Galeri</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Selection Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="w-full max-w-sm bg-white dark:bg-[#221c10] rounded-3xl overflow-hidden shadow-2xl p-6 relative animate-in zoom-in-95 duration-200">
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>

                        <h3 className="text-xl font-bold text-center mb-2 text-slate-900 dark:text-white">Fotoğraf Kaynağı</h3>
                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <button
                                onClick={handleCameraClick}
                                className={`flex flex-col items-center gap-3 p-4 rounded-2xl border-2 border-gray-100 dark:border-white/10 hover:border-current hover:bg-gray-50 dark:hover:bg-white/5 transition-all group ${themeColors.text}`}
                            >
                                <span className="material-symbols-outlined text-3xl">photo_camera</span>
                                <span className="text-sm font-bold text-slate-700 dark:text-gray-200">Kamera</span>
                            </button>

                            <button
                                onClick={handleGalleryClick}
                                className={`flex flex-col items-center gap-3 p-4 rounded-2xl border-2 border-gray-100 dark:border-white/10 hover:border-current hover:bg-gray-50 dark:hover:bg-white/5 transition-all group ${themeColors.text}`}
                            >
                                <span className="material-symbols-outlined text-3xl">image</span>
                                <span className="text-sm font-bold text-slate-700 dark:text-gray-200">Galeri</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
