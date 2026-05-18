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
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortDir, setSortDir] = useState("desc");
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState<null | "view" | "edit">(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editForm, setEditForm] = useState({ name: "", city: "", role: "" });

  const totalPages = Math.ceil(total / limit);

  const fetchUsers = useCallback(() => {
    setLoading(true);
    const params = new URLSearchParams({
      search,
      role: roleFilter,
      status: statusFilter,
      sortBy,
      sortDir,
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
  }, [search, roleFilter, statusFilter, sortBy, sortDir, page, limit]);

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

  function handleEdit() {
    if (!selectedUser) return;
    fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "edit", userId: selectedUser.id, ...editForm }),
    }).then(() => {
      setShowModal(null);
      fetchUsers();
    });
  }

  function openEdit(user: User) {
    setSelectedUser(user);
    setEditForm({ name: user.name || "", city: user.city || "", role: user.role });
    setShowModal("edit");
  }

  function openView(user: User) {
    setSelectedUser(user);
    setShowModal("view");
  }

  function toggleSelect(id: string) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  function toggleSelectAll() {
    if (selected.length === users.length) {
      setSelected([]);
    } else {
      setSelected(users.map((u) => u.id));
    }
  }

  function bulkBan() {
    Promise.all(
      selected.map((id) =>
        fetch("/api/admin/users", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "ban", userId: id }),
        })
      )
    ).then(() => {
      setSelected([]);
      fetchUsers();
    });
  }

  function bulkDelete() {
    if (!confirm(`${selected.length} kullanıcıyı silmek istediğinizden emin misiniz?`)) return;
    Promise.all(selected.map((id) => fetch(`/api/admin/users?id=${id}`, { method: "DELETE" }))).then(
      () => {
        setSelected([]);
        fetchUsers();
      }
    );
  }

  return (
    <AdminLayout>
      <div>
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
            style={{ padding: "7px 12px", border: "1px solid #ddd", borderRadius: 6, fontSize: 13, width: 200 }}
          />
          <select
            value={roleFilter}
            onChange={(e) => { setRoleFilter(e.target.value); setPage(1); }}
            style={{ padding: "7px 10px", border: "1px solid #ddd", borderRadius: 6, fontSize: 13 }}
          >
            <option value="">Tüm Roller</option>
            <option value="USER">USER</option>
            <option value="MODERATOR">MODERATOR</option>
            <option value="ADMIN">ADMIN</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            style={{ padding: "7px 10px", border: "1px solid #ddd", borderRadius: 6, fontSize: 13 }}
          >
            <option value="">Tüm Durumlar</option>
            <option value="active">Aktif</option>
            <option value="banned">Banlı</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{ padding: "7px 10px", border: "1px solid #ddd", borderRadius: 6, fontSize: 13 }}
          >
            <option value="createdAt">Kayıt Tarihi</option>
            <option value="name">Ad</option>
            <option value="email">Email</option>
          </select>
          <select
            value={sortDir}
            onChange={(e) => setSortDir(e.target.value)}
            style={{ padding: "7px 10px", border: "1px solid #ddd", borderRadius: 6, fontSize: 13 }}
          >
            <option value="desc">Azalan</option>
            <option value="asc">Artan</option>
          </select>
          <select
            value={limit}
            onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); }}
            style={{ padding: "7px 10px", border: "1px solid #ddd", borderRadius: 6, fontSize: 13 }}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>

          {selected.length > 0 && (
            <>
              <button
                onClick={bulkBan}
                style={{ padding: "7px 14px", background: "#ff6b35", border: "none", borderRadius: 6, color: "#fff", fontSize: 12, cursor: "pointer" }}
              >
                Toplu Ban ({selected.length})
              </button>
              <button
                onClick={bulkDelete}
                style={{ padding: "7px 14px", background: "#cc0000", border: "none", borderRadius: 6, color: "#fff", fontSize: 12, cursor: "pointer" }}
              >
                Toplu Sil ({selected.length})
              </button>
            </>
          )}
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
                  <th style={{ padding: "10px 12px", textAlign: "left", width: 32 }}>
                    <input
                      type="checkbox"
                      checked={selected.length === users.length && users.length > 0}
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th style={{ padding: "10px 12px", textAlign: "left" }}>Avatar</th>
                  <th style={{ padding: "10px 12px", textAlign: "left" }}>Ad</th>
                  <th style={{ padding: "10px 12px", textAlign: "left" }}>Email</th>
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
                        <input
                          type="checkbox"
                          checked={selected.includes(user.id)}
                          onChange={() => toggleSelect(user.id)}
                        />
                      </td>
                      <td style={{ padding: "8px 12px" }}>
                        {user.avatarUrl ? (
                          <img
                            src={user.avatarUrl}
                            alt=""
                            style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover" }}
                          />
                        ) : (
                          <div
                            style={{
                              width: 32,
                              height: 32,
                              borderRadius: "50%",
                              backgroundColor: "#e0d5c0",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 14,
                            }}
                          >
                            👤
                          </div>
                        )}
                      </td>
                      <td style={{ padding: "8px 12px", fontWeight: 500 }}>{user.name || "—"}</td>
                      <td style={{ padding: "8px 12px", color: "#555" }}>{user.email}</td>
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
                            onClick={() => openView(user)}
                            title="Görüntüle"
                            style={{ padding: "3px 7px", border: "1px solid #ddd", borderRadius: 4, background: "#fff", cursor: "pointer", fontSize: 12 }}
                          >
                            👁️
                          </button>
                          <button
                            onClick={() => openEdit(user)}
                            title="Düzenle"
                            style={{ padding: "3px 7px", border: "1px solid #ddd", borderRadius: 4, background: "#fff", cursor: "pointer", fontSize: 12 }}
                          >
                            ✏️
                          </button>
                          {user.isActive ? (
                            <button
                              onClick={() => handleBan(user.id)}
                              title="Ban"
                              style={{ padding: "3px 7px", border: "1px solid #ffcccc", borderRadius: 4, background: "#fff5f5", cursor: "pointer", fontSize: 12 }}
                            >
                              🚫
                            </button>
                          ) : (
                            <button
                              onClick={() => handleUnban(user.id)}
                              title="Unban"
                              style={{ padding: "3px 7px", border: "1px solid #ccffdd", borderRadius: 4, background: "#f5fff8", cursor: "pointer", fontSize: 12 }}
                            >
                              ✅
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(user.id)}
                            title="Sil"
                            style={{ padding: "3px 7px", border: "1px solid #ffcccc", borderRadius: 4, background: "#fff5f5", cursor: "pointer", fontSize: 12 }}
                          >
                            🗑️
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
              }}
            >
              Sonraki →
            </button>
          </div>
        </div>
      </div>

      {/* View Modal */}
      {showModal === "view" && selectedUser && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => setShowModal(null)}
        >
          <div
            style={{ background: "#fff", borderRadius: 12, padding: 32, width: 420, maxWidth: "90%" }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ marginTop: 0, marginBottom: 20, fontSize: 18 }}>Kullanıcı Detayı</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, fontSize: 14 }}>
              <div><span style={{ color: "#888" }}>Ad:</span> <strong>{selectedUser.name || "—"}</strong></div>
              <div><span style={{ color: "#888" }}>Email:</span> <strong>{selectedUser.email}</strong></div>
              <div><span style={{ color: "#888" }}>Kullanıcı Adı:</span> <strong>{selectedUser.username || "—"}</strong></div>
              <div><span style={{ color: "#888" }}>Şehir:</span> <strong>{selectedUser.city || "—"}</strong></div>
              <div><span style={{ color: "#888" }}>Rol:</span> <strong>{selectedUser.role}</strong></div>
              <div><span style={{ color: "#888" }}>Durum:</span> <strong>{selectedUser.isActive ? "Aktif" : "Banlı"}</strong></div>
              <div><span style={{ color: "#888" }}>Kayıt:</span> <strong>{new Date(selectedUser.createdAt).toLocaleDateString("tr-TR")}</strong></div>
            </div>
            <button
              onClick={() => setShowModal(null)}
              style={{ marginTop: 24, padding: "8px 20px", border: "1px solid #ddd", borderRadius: 6, cursor: "pointer", background: "#fff" }}
            >
              Kapat
            </button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showModal === "edit" && selectedUser && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => setShowModal(null)}
        >
          <div
            style={{ background: "#fff", borderRadius: 12, padding: 32, width: 400, maxWidth: "90%" }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ marginTop: 0, marginBottom: 20, fontSize: 18 }}>Kullanıcıyı Düzenle</h3>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 13, color: "#555", marginBottom: 4 }}>Ad</label>
              <input
                value={editForm.name}
                onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))}
                style={{ width: "100%", padding: "8px 10px", border: "1px solid #ddd", borderRadius: 6, fontSize: 13, boxSizing: "border-box" }}
              />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 13, color: "#555", marginBottom: 4 }}>Şehir</label>
              <input
                value={editForm.city}
                onChange={(e) => setEditForm((f) => ({ ...f, city: e.target.value }))}
                style={{ width: "100%", padding: "8px 10px", border: "1px solid #ddd", borderRadius: 6, fontSize: 13, boxSizing: "border-box" }}
              />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: 13, color: "#555", marginBottom: 4 }}>Rol</label>
              <select
                value={editForm.role}
                onChange={(e) => setEditForm((f) => ({ ...f, role: e.target.value }))}
                style={{ width: "100%", padding: "8px 10px", border: "1px solid #ddd", borderRadius: 6, fontSize: 13 }}
              >
                <option value="USER">USER</option>
                <option value="MODERATOR">MODERATOR</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={handleEdit}
                style={{ padding: "8px 20px", background: "linear-gradient(135deg,#775a19 0%,#d4ad65 100%)", border: "none", borderRadius: 6, color: "#fff", cursor: "pointer", fontSize: 13 }}
              >
                Kaydet
              </button>
              <button
                onClick={() => setShowModal(null)}
                style={{ padding: "8px 20px", border: "1px solid #ddd", borderRadius: 6, cursor: "pointer", background: "#fff", fontSize: 13 }}
              >
                İptal
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
