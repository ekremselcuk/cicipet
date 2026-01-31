'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import PhotoUploader from '@/components/form/PhotoUploader';

interface StoryUploaderProps {
    onClose: () => void;
    onUploadSuccess: () => void;
}

export default function StoryUploader({ onClose, onUploadSuccess }: StoryUploaderProps) {
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [title, setTitle] = useState(''); // New Title State
    const [caption, setCaption] = useState('');
    const supabase = createClient();

    const handleUpload = async () => {
        if (!file) return;
        setLoading(true);

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("User not found");

            // AI Moderation
            const { analyzeImage } = require('@/utils/image-analysis');
            const result = await analyzeImage(file);
            if (!result.valid) {
                alert(`Hikaye Paylaşılamadı: ${result.reason}`);
                setLoading(false);
                return;
            }

            // 1. Upload Image
            const fileExt = file.name.split('.').pop();
            const fileName = `${user.id}-${Date.now()}.${fileExt}`;
            const filePath = `${fileName}`;

            // Try uploading to 'stories' bucket
            let { error: uploadError } = await supabase.storage
                .from('stories')
                .upload(filePath, file);

            if (uploadError) {
                // If stories bucket doesn't exist, try 'public' or 'images'
                // This is a last resort fallback attempt
                console.warn("Stories bucket upload failed, trying 'images'...", uploadError);
                const { error: fallbackError } = await supabase.storage
                    .from('images')
                    .upload(`stories/${filePath}`, file);

                if (fallbackError) {
                    console.error("Upload failed:", fallbackError);
                    throw new Error("Görsel yüklenemedi. Lütfen 'stories' depolama alanının oluşturulduğundan emin olun.");
                }

                // If fallback worked, get URL
                const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(`stories/${filePath}`);
                var finalUrl = publicUrl;
            } else {
                const { data: { publicUrl } } = supabase.storage.from('stories').getPublicUrl(filePath);
                var finalUrl = publicUrl;
            }

            // 2. Insert into Stories
            const expiresAt = new Date();
            expiresAt.setHours(expiresAt.getHours() + 24);

            const { error: insertError } = await supabase.from('stories').insert({
                user_id: user.id,
                image_url: finalUrl,
                type: 'image',
                title: title,
                caption: caption,
                expires_at: expiresAt.toISOString()
            });

            if (insertError) throw insertError;

            onUploadSuccess();
            onClose();

        } catch (error: any) {
            console.error(error);
            alert(`Story yüklenirken hata oluştu: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black overflow-y-auto overflow-x-hidden">
            <div className="min-h-full flex flex-col relative bg-neutral-900">
                {/* Top Bar - Absolute but safe */}
                <div className="absolute top-0 left-0 right-0 z-20 p-4 flex items-center justify-between pointer-events-none">
                    <button
                        onClick={onClose}
                        className="size-10 flex items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md border border-white/10 hover:bg-black/60 transition-colors pointer-events-auto"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                    <h3 className="text-white font-bold text-sm shadow-sm drop-shadow-md">Hikaye Ekle</h3>
                    <div className="size-10"></div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] py-16">
                    {!file ? (
                        // Empty State
                        <div className="flex flex-col items-center justify-center p-6 text-center">
                            <div
                                onClick={() => document.getElementById('story-file-input')?.click()}
                                className="size-32 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 cursor-pointer hover:bg-white/10 hover:scale-105 transition-all text-white/50 hover:text-white"
                            >
                                <span className="material-symbols-outlined text-5xl">add_a_photo</span>
                            </div>
                            <h3 className="text-white font-bold text-xl mb-2">Hikaye Oluştur</h3>
                            <p className="text-white/50 text-sm max-w-[200px]">Takipçilerinle anlık fotoğraf veya video paylaş.</p>

                            <div className="mt-8 w-full max-w-xs bg-white/5 rounded-xl overflow-hidden p-1">
                                <PhotoUploader onFileSelect={(f) => setFile(f)} colorTheme="white" />
                            </div>
                        </div>
                    ) : (
                        // Image Preview State
                        <div className="relative w-full flex-1 flex items-center justify-center p-4">
                            <img
                                src={URL.createObjectURL(file)}
                                className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-2xl"
                                alt="preview"
                            />

                            <button
                                onClick={() => setFile(null)}
                                className="absolute top-6 right-6 z-20 p-2 bg-black/50 text-white rounded-full hover:bg-red-500/80 transition-colors backdrop-blur-md border border-white/10"
                            >
                                <span className="material-symbols-outlined text-xl">delete</span>
                            </button>
                        </div>
                    )}
                </div>

                {/* Bottom Section - In Flow (Not Fixed) for scroll safety */}
                {file && (
                    // INCREASED BOTTOM PADDING TO pb-48 (approx 12rem) for extra scroll space
                    <div className="z-20 bg-neutral-900 border-t border-white/10 shrink-0 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] pb-48 pr-[env(safe-area-inset-right)] pl-[env(safe-area-inset-left)]">
                        <div className="p-4 flex flex-col gap-3">
                            {/* Title Input */}
                            <div className="relative">
                                <span className="absolute left-3 top-3 material-symbols-outlined text-white/50 text-xl">title</span>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Bir Başlık Ekle (Opsiyonel)"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-white/40 focus:outline-none focus:bg-white/10 focus:border-white/20 transition-all text-sm font-bold"
                                />
                            </div>

                            {/* Caption Input */}
                            <div className="relative">
                                <span className="absolute left-3 top-3 material-symbols-outlined text-white/50 text-xl">edit_note</span>
                                <input
                                    type="text"
                                    value={caption}
                                    onChange={(e) => setCaption(e.target.value)}
                                    placeholder="Bir açıklama ekle..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-white/40 focus:outline-none focus:bg-white/10 focus:border-white/20 transition-all text-sm"
                                />
                            </div>

                            <button
                                onClick={handleUpload}
                                disabled={loading}
                                className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-100 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {loading ? (
                                    <>
                                        <span className="material-symbols-outlined animate-spin text-xl">progress_activity</span>
                                        <span>Paylaşılıyor...</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined fill-current">send</span>
                                        <span>Hikayende Paylaş</span>
                                    </>
                                )}
                            </button>
                            <p className="text-[10px] text-white/30 text-center mt-2">
                                *Görsel ve açıklama topluluk kurallarına uygun olmalıdır.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
