"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { checkAdminAuth } from "@/lib/adminAuth";
import AdminLayout from "@/components/admin/AdminLayout";

interface User {
  id: string;
  email: string;
  username: string | null;
  name: string | null;
  avatarUrl: string | null;
  city: string | null;
  role: string;
  isActive: boolean;
  createdAt: string;
}

const roleBadge: Record<string, { bg: string; color: string }> = {
  ADMIN: { bg: "#ffe0e0", color: "#cc0000" },
  MODERATOR: { bg: "#ddeeff", color: "#0055cc" },
  USER: { bg: "#eee", color: "#555" },
};

export default function UsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const totalPages = Math.ceil(total / limit);

  const fetchUsers = useCallback(() => {
    setLoading(true);
    const params = new URLSearchParams({
      search,
      role: roleFilter,
      status: statusFilter,
      page: String(page),
      limit: String(limit),
    });
    fetch(`/api/admin/users?${params}`)
      .then((r) => r.json())
      .then((data) => {
        setUsers(data.users || []);
        setTotal(data.total || 0);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [search, roleFilter, statusFilter, page, limit]);

  useEffect(() => {
    if (!checkAdminAuth()) {
      router.push("/admin");
      return;
    }
    fetchUsers();
  }, [fetchUsers, router]);

  function handleBan(userId: string) {
    fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "ban", userId }),
    }).then(() => fetchUsers());
  }

  function handleUnban(userId: string) {
    fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "unban", userId }),
    }).then(() => fetchUsers());
  }

  function handleDelete(userId: string) {
    if (!confirm("Bu kullanıcıyı silmek istediğinizden emin misiniz?")) return;
    fetch(`/api/admin/users?id=${userId}`, { method: "DELETE" }).then(() => fetchUsers());
  }

  const font = '"Plus Jakarta Sans", system-ui, sans-serif';

  return (
    <AdminLayout>
      <div style={{ fontFamily: font }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#1a1a2e", marginBottom: 20, marginTop: 0 }}>
          Kullanıcılar
        </h1>

        {/* Filter bar */}
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: 10,
            padding: "14px 16px",
            marginBottom: 16,
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            alignItems: "center",
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
          }}
        >
          <input
            placeholder="Ara (ad, email...)"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            style={{ padding: "7px 12px", border: "1px solid #ddd", borderRadius: 6, fontSize: 13, width: 200, fontFamily: font }}
          />
          <select
            value={roleFilter}
            onChange={(e) => { setRoleFilter(e.target.value); setPage(1); }}
            style={{ padding: "7px 10px", border: "1px solid #ddd", borderRadius: 6, fontSize: 13, fontFamily: font }}
          >
            <option value="">Tüm Roller</option>
            <option value="USER">USER</option>
            <option value="MODERATOR">MODERATOR</option>
            <option value="ADMIN">ADMIN</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            style={{ padding: "7px 10px", border: "1px solid #ddd", borderRadius: 6, fontSize: 13, fontFamily: font }}
          >
            <option value="">Tüm Durumlar</option>
            <option value="active">Aktif</option>
            <option value="banned">Banlı</option>
          </select>
          <select
            value={limit}
            onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); }}
            style={{ padding: "7px 10px", border: "1px solid #ddd", borderRadius: 6, fontSize: 13, fontFamily: font }}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        {/* Table */}
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: 10,
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            overflow: "hidden",
          }}
        >
          {loading ? (
            <div style={{ padding: 40, textAlign: "center", color: "#888" }}>Yükleniyor...</div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ backgroundColor: "#f8f7f5", borderBottom: "1px solid #eee" }}>
                  <th style={{ padding: "10px 12px", textAlign: "left" }}>Ad / Email</th>
                  <th style={{ padding: "10px 12px", textAlign: "left" }}>Şehir</th>
                  <th style={{ padding: "10px 12px", textAlign: "left" }}>Rol</th>
                  <th style={{ padding: "10px 12px", textAlign: "left" }}>Durum</th>
                  <th style={{ padding: "10px 12px", textAlign: "left" }}>Kayıt Tarihi</th>
                  <th style={{ padding: "10px 12px", textAlign: "left" }}>İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => {
                  const badge = roleBadge[user.role] || roleBadge.USER;
                  return (
                    <tr key={user.id} style={{ borderBottom: "1px solid #f0ede8" }}>
                      <td style={{ padding: "8px 12px" }}>
                        <div style={{ fontWeight: 500, color: "#333" }}>{user.name || "—"}</div>
                        <div style={{ color: "#999", fontSize: 11 }}>{user.email}</div>
                      </td>
                      <td style={{ padding: "8px 12px", color: "#777" }}>{user.city || "—"}</td>
                      <td style={{ padding: "8px 12px" }}>
                        <span
                          style={{
                            padding: "2px 8px",
                            borderRadius: 10,
                            fontSize: 11,
                            fontWeight: 600,
                            backgroundColor: badge.bg,
                            color: badge.color,
                          }}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td style={{ padding: "8px 12px" }}>
                        <span
                          style={{
                            padding: "2px 8px",
                            borderRadius: 10,
                            fontSize: 11,
                            fontWeight: 600,
                            backgroundColor: user.isActive ? "#e0f5e9" : "#ffe0e0",
                            color: user.isActive ? "#1a7a3a" : "#cc0000",
                          }}
                        >
                          {user.isActive ? "Aktif" : "Banlı"}
                        </span>
                      </td>
                      <td style={{ padding: "8px 12px", color: "#999", fontSize: 12 }}>
                        {new Date(user.createdAt).toLocaleDateString("tr-TR")}
                      </td>
                      <td style={{ padding: "8px 12px" }}>
                        <div style={{ display: "flex", gap: 4 }}>
                          <button
                            onClick={() => alert("Düzenleme paneli yakında!")}
                            title="Düzenle"
                            style={{ padding: "3px 7px", border: "1px solid #ddd", borderRadius: 4, background: "#fff", cursor: "pointer", fontSize: 12 }}
                          >
                            ✏️ Düzenle
                          </button>
                          {user.isActive ? (
                            <button
                              onClick={() => handleBan(user.id)}
                              title="Ban"
                              style={{ padding: "3px 7px", border: "1px solid #ffcccc", borderRadius: 4, background: "#fff5f5", cursor: "pointer", fontSize: 12 }}
                            >
                              🚫 Ban
                            </button>
                          ) : (
                            <button
                              onClick={() => handleUnban(user.id)}
                              title="Unban"
                              style={{ padding: "3px 7px", border: "1px solid #ccffdd", borderRadius: 4, background: "#f5fff8", cursor: "pointer", fontSize: 12 }}
                            >
                              ✅ Unban
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(user.id)}
                            title="Sil"
                            style={{ padding: "3px 7px", border: "1px solid #ffcccc", borderRadius: 4, background: "#fff5f5", cursor: "pointer", fontSize: 12 }}
                          >
                            🗑️ Sil
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 16,
            fontSize: 13,
            color: "#666",
          }}
        >
          <span>
            Toplam {total} kullanıcı · Sayfa {page} / {totalPages || 1}
          </span>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              style={{
                padding: "6px 14px",
                border: "1px solid #ddd",
                borderRadius: 6,
                background: "#fff",
                cursor: page <= 1 ? "not-allowed" : "pointer",
                opacity: page <= 1 ? 0.5 : 1,
                fontFamily: font,
              }}
            >
              ← Önceki
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              style={{
                padding: "6px 14px",
                border: "1px solid #ddd",
                borderRadius: 6,
                background: "#fff",
                cursor: page >= totalPages ? "not-allowed" : "pointer",
                opacity: page >= totalPages ? 0.5 : 1,
                fontFamily: font,
              }}
            >
              Sonraki →
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
