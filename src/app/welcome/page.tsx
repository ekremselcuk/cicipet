"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const COLORS = ["#f59e0b", "#ef4444", "#10b981", "#3b82f6", "#8b5cf6", "#ec4899", "#f97316"];

export default function WelcomePage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const pieces: HTMLElement[] = [];

    for (let i = 0; i < 90; i++) {
      const el = document.createElement("div");
      const size = 6 + Math.random() * 8;
      el.style.cssText = `
        position: fixed;
        top: -20px;
        left: ${Math.random() * 100}vw;
        width: ${size}px;
        height: ${size}px;
        background: ${COLORS[Math.floor(Math.random() * COLORS.length)]};
        border-radius: ${Math.random() > 0.5 ? "50%" : "2px"};
        pointer-events: none;
        animation: cicipet-fall ${2 + Math.random() * 3}s ${Math.random() * 2}s linear forwards;
        z-index: 50;
      `;
      document.body.appendChild(el);
      pieces.push(el);
    }

    return () => pieces.forEach((el) => el.remove());
  }, []);

  return (
    <>
      <style>{`
        @keyframes cicipet-fall {
          to {
            transform: translateY(110vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>

      <main
        ref={containerRef}
        className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 flex items-center justify-center px-4"
      >
        <div className="text-center max-w-md">
          <div className="text-7xl mb-6 animate-bounce">🎉</div>

          <div className="bg-white rounded-3xl shadow-lg p-10">
            <h1 className="text-3xl font-black text-gray-900 mb-3">
              Tebrikler!
            </h1>
            <p className="text-lg text-orange-500 font-bold mb-6">
              Petiniz yarışmaya kaydedildi 🐾
            </p>
            <p className="text-gray-500 leading-relaxed mb-8">
              Harika! En kısa sürede sizinle iletişime geçeceğiz.
              Sonuçları e-posta ve SMS ile bildirilecek.
            </p>

            <div className="flex flex-col gap-3">
              <Link
                href="/"
                className="block rounded-full bg-orange-500 text-white font-bold py-3 px-6 hover:bg-orange-600 transition-colors"
              >
                Ana Sayfaya Dön
              </Link>
            </div>
          </div>

          <p className="text-xs text-gray-400 mt-6">
            Sorularınız için: destek@cicipet.com
          </p>
        </div>
      </main>
    </>
  );
}
