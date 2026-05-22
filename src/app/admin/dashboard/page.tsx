"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkAdminAuth } from "@/lib/adminAuth";
import AdminLayout from "@/components/admin/AdminLayout";

interface Stats {
  totalUsers: number;
  totalPets: number;
  pendingModeration: number;
  totalListings: number;
  activeContests: number;
  todayRegistrations: number;
  recentUsers: { id: string; name: string | null; email: string; createdAt: string; city: string | null; role: string }[];
  recentPets: { id: string; name: string; species: string; createdAt: string; owner: { name: string | null } }[];
}

const statCards = [
  { key: "totalUsers" as const, emoji: "👥", label: "Toplam Kullanıcı" },
  { key: "totalPets" as const, emoji: "🐾", label: "Toplam Pet" },
  { key: "pendingModeration" as const, emoji: "🛡️", label: "Bekleyen Moderasyon" },
  { key: "totalListings" as const, emoji: "📋", label: "Aktif İlan" },
  { key: "activeContests" as const, emoji: "🏆", label: "Aktif Yarışma" },
  { key: "todayRegistrations" as const, emoji: "📅", label: "Bugün Kayıt" },
];

export default function DashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!checkAdminAuth()) {
      router.push("/admin");
      return;
    }
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [router]);

  if (loading) {
    return (
      <AdminLayout>
        <div style={{ padding: 40, textAlign: "center", color: "#888", fontSize: 16 }}>
          Yükleniyor...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#1a1a2e", marginBottom: 24, marginTop: 0, fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}>
          Dashboard
        </h1>

        {/* Stat cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 16,
            marginBottom: 32,
          }}
        >
          {statCards.map(({ key, emoji, label }) => (
            <div
              key={key}
              style={{
                backgroundColor: "#fff",
                borderRadius: 12,
                padding: 20,
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 8 }}>{emoji}</div>
              <div style={{ fontSize: 13, color: "#888", marginBottom: 4, fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}>{label}</div>
              <div style={{ fontSize: 32, fontWeight: 700, color: "#775a19", fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}>
                {stats ? (stats[key] ?? 0) : "—"}
              </div>
            </div>
          ))}
        </div>

        {/* Recent lists */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {/* Recent Users */}
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: 12,
              padding: 20,
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            }}
          >
            <h2 style={{ fontSize: 16, fontWeight: 600, color: "#1a1a2e", marginTop: 0, marginBottom: 16, fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}>
              Son Kullanıcılar
            </h2>
            {stats?.recentUsers?.length ? (
              <div>
                {stats.recentUsers.map((u) => (
                  <div
                    key={u.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "8px 0",
                      borderBottom: "1px solid #f0ede8",
                      fontSize: 13,
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 500, color: "#333" }}>{u.name || u.email}</div>
                      <div style={{ color: "#999", fontSize: 11 }}>{u.city || "—"} · {u.role}</div>
                    </div>
                    <div style={{ color: "#aaa", fontSize: 11 }}>
                      {new Date(u.createdAt).toLocaleDateString("tr-TR")}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ color: "#aaa", fontSize: 13 }}>Veri yok</div>
            )}
          </div>

          {/* Recent Pets */}
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: 12,
              padding: 20,
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            }}
          >
            <h2 style={{ fontSize: 16, fontWeight: 600, color: "#1a1a2e", marginTop: 0, marginBottom: 16, fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}>
              Son Petler
            </h2>
            {stats?.recentPets?.length ? (
              <div>
                {stats.recentPets.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "8px 0",
                      borderBottom: "1px solid #f0ede8",
                      fontSize: 13,
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 500, color: "#333" }}>{p.name}</div>
                      <div style={{ color: "#999", fontSize: 11 }}>
                        {p.species} · {p.owner?.name || "—"}
                      </div>
                    </div>
                    <div style={{ color: "#aaa", fontSize: 11 }}>
                      {new Date(p.createdAt).toLocaleDateString("tr-TR")}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ color: "#aaa", fontSize: 13 }}>Veri yok</div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
