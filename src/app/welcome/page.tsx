"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function WelcomePage() {
  useEffect(() => {
    // Inject keyframe animation
    const styleId = "cicipet-confetti-style";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        @keyframes cicipet-fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }

    const colors = [
      "#775a19", "#d4ad65", "#ef4444", "#10b981",
      "#3b82f6", "#8b5cf6", "#ec4899", "#f97316", "#facc15",
    ];

    const pieces: HTMLElement[] = [];
    for (let i = 0; i < 80; i++) {
      const el = document.createElement("div");
      const size = 6 + Math.random() * 8;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const left = Math.random() * 100;
      const duration = 2 + Math.random() * 3;
      const delay = Math.random() * 2;
      const isCircle = Math.random() > 0.5;

      el.style.cssText = [
        "position:fixed",
        "top:-20px",
        `left:${left}vw`,
        `width:${size}px`,
        `height:${size}px`,
        `background:${color}`,
        `border-radius:${isCircle ? "50%" : "2px"}`,
        "pointer-events:none",
        `animation:cicipet-fall ${duration}s ${delay}s linear forwards`,
        "z-index:9999",
      ].join(";");

      document.body.appendChild(el);
      pieces.push(el);
    }

    return () => {
      pieces.forEach((el) => el.remove());
      const s = document.getElementById(styleId);
      if (s) s.remove();
    };
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#faf9f6",
        fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
    >
      {/* Center card */}
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: 24,
          padding: 40,
          boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
          maxWidth: 440,
          width: "100%",
          textAlign: "center",
        }}
      >
        {/* Checkmark circle */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "linear-gradient(135deg,#775a19 0%,#d4ad65 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px",
          }}
        >
          <span style={{ color: "#fff", fontSize: 36, lineHeight: 1 }}>✓</span>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: '"Noto Serif", Georgia, serif',
            fontStyle: "italic",
            fontSize: 32,
            fontWeight: 700,
            color: "#1a1a1a",
            margin: "0 0 12px",
          }}
        >
          Tebrikler! 🎉
        </h1>

        {/* Subheading */}
        <p
          style={{
            fontSize: 18,
            fontWeight: 600,
            background: "linear-gradient(135deg,#775a19 0%,#d4ad65 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            margin: "0 0 20px",
          }}
        >
          Petiniz Gala&apos;ya Kaydedildi!
        </p>

        {/* Description */}
        <p
          style={{
            fontSize: 15,
            color: "#666",
            lineHeight: 1.7,
            margin: "0 0 32px",
          }}
        >
          Harika! Moderasyon sonrası yarışmaya dahil edilecek.
          Sonuçları e-posta ve SMS ile bildireceğiz.
        </p>

        {/* Button */}
        <Link
          href="/"
          style={{
            display: "inline-block",
            background: "linear-gradient(135deg,#775a19 0%,#d4ad65 100%)",
            color: "#fff",
            fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
            fontWeight: 700,
            fontSize: 16,
            borderRadius: 9999,
            padding: "16px 32px",
            textDecoration: "none",
            boxShadow: "0 4px 16px rgba(119,90,25,0.35)",
          }}
        >
          Ana Sayfaya Dön
        </Link>
      </div>
    </main>
  );
}
