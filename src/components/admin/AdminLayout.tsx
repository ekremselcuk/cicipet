"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { clearAdminAuth } from "@/lib/adminAuth";

const navLinks = [
  { emoji: "📊", label: "Dashboard", href: "/admin/dashboard" },
  { emoji: "👥", label: "Kullanıcılar", href: "/admin/users" },
  { emoji: "🐾", label: "Petler", href: "/admin/pets" },
  { emoji: "📋", label: "İlanlar", href: "/admin/listings" },
  { emoji: "🏆", label: "Yarışmalar", href: "/admin/contests" },
  { emoji: "🛡️", label: "Moderasyon", href: "/admin/moderation" },
  { emoji: "💬", label: "Mesajlar", href: "/admin/messages" },
  { emoji: "⚙️", label: "Ayarlar", href: "/admin/settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  function handleLogout() {
    clearAdminAuth();
    router.push("/admin");
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <div
        style={{
          width: 260,
          backgroundColor: "#1a1a2e",
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          zIndex: 100,
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: "28px 24px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div
            style={{
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
              fontSize: 24,
              color: "#d4ad65",
              marginBottom: 4,
            }}
          >
            CiciPet
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: 1 }}>
            ADMIN PANEL
          </div>
        </div>

        {/* Nav links */}
        <nav style={{ flex: 1, padding: "12px 0", overflowY: "auto" }}>
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <button
                key={link.href}
                onClick={() => router.push(link.href)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "11px 24px",
                  background: isActive
                    ? "linear-gradient(135deg,#775a19 0%,#d4ad65 100%)"
                    : "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: isActive ? "#fff" : "rgba(255,255,255,0.65)",
                  fontSize: 14,
                  textAlign: "left",
                  borderRadius: isActive ? 8 : 0,
                  margin: isActive ? "2px 10px" : "1px 0",
                  width: isActive ? "calc(100% - 20px)" : "100%",
                  transition: "all 0.15s",
                }}
              >
                <span style={{ fontSize: 16 }}>{link.emoji}</span>
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div style={{ padding: "16px 24px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              padding: "10px 16px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 8,
              color: "rgba(255,255,255,0.7)",
              cursor: "pointer",
              fontSize: 13,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span>🚪</span>
            <span>Çıkış Yap</span>
          </button>
        </div>
      </div>

      {/* Main area */}
      <div style={{ marginLeft: 260, flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Top bar */}
        <div
          style={{
            height: 56,
            backgroundColor: "#fff",
            borderBottom: "1px solid #e8e6e1",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
            position: "sticky",
            top: 0,
            zIndex: 50,
          }}
        >
          <span style={{ fontSize: 16, fontWeight: 600, color: "#1a1a2e" }}>
            CiciPet Admin Panel
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              style={{
                background: "linear-gradient(135deg,#775a19 0%,#d4ad65 100%)",
                color: "#fff",
                padding: "4px 12px",
                borderRadius: 20,
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              Admin
            </span>
            <button
              onClick={handleLogout}
              style={{
                padding: "6px 14px",
                background: "transparent",
                border: "1px solid #ddd",
                borderRadius: 6,
                cursor: "pointer",
                fontSize: 13,
                color: "#666",
              }}
            >
              Çıkış
            </button>
          </div>
        </div>

        {/* Page content */}
        <div
          style={{
            flex: 1,
            padding: 24,
            backgroundColor: "#f4f3f1",
            minHeight: "calc(100vh - 56px)",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
