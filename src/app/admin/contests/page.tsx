"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkAdminAuth } from "@/lib/adminAuth";
import AdminLayout from "@/components/admin/AdminLayout";

interface ContestEntry {
  id: string;
  photoUrl: string | null;
  pet: { name: string } | null;
  user: { name: string | null } | null;
  votes: { id: string }[];
}

interface Contest {
  id: string;
  title: string;
  description: string | null;
  status: string;
  startDate: string;
  endDate: string;
  prize: string | null;
  createdAt: string;
  _count: { entries: number };
  entries?: ContestEntry[];
}

const statusBadge: Record<string, { bg: string; color: string; label: string }> = {
  UPCOMING: { bg: "#ddeeff", color: "#0055cc", label: "Yaklaşan" },
  ACTIVE: { bg: "#e0f5e9", color: "#1a7a3a", label: "Aktif" },
  ENDED: { bg: "#eee", color: "#555", label: "Bitti" },
};

const emptyForm = { title: "", description: "", startDate: "", endDate: "", prize: "", status: "UPCOMING" };

export default function ContestsPage() {
  const router = useRouter();
  const [contests, setContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedContest, setSelectedContest] = useState<Contest | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [isEditing, setIsEditing] = useState(false);

  function fetchContests() {
    setLoading(true);
    fetch("/api/admin/contests")
      .then((r) => r.json())
      .then((data) => {
        setContests(Array.isArray(data) ? data : data.contests || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }

  useEffect(() => {
    if (!checkAdminAuth()) {
      router.push("/admin");
      return;
    }
    fetchContests();
  }, [router]);

  function handleCreate() {
    fetch("/api/admin/contests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    }).then(() => {
      setShowCreateModal(false);
      setForm({ ...emptyForm });
      fetchContests();
    });
  }

  function handleUpdate() {
    if (!selectedContest) return;
    fetch("/api/admin/contests", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contestId: selectedContest.id, ...form }),
    }).then(() => {
      setShowCreateModal(false);
      setIsEditing(false);
      setSelectedContest(null);
      setForm({ ...emptyForm });
      fetchContests();
    });
  }

  function handleCancel(contestId: string) {
    fetch("/api/admin/contests", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contestId, status: "ENDED" }),
    }).then(() => fetchContests());
  }

  function handleDelete(contestId: string) {
    if (!confirm("Bu yarışmayı silmek istediğinizden emin misiniz?")) return;
    fetch(`/api/admin/contests?id=${contestId}`, { method: "DELETE" }).then(() => fetchContests());
  }

  function openEdit(contest: Contest) {
    setSelectedContest(contest);
    setForm({
      title: contest.title,
      description: contest.description || "",
      startDate: contest.startDate ? contest.startDate.slice(0, 10) : "",
      endDate: contest.endDate ? contest.endDate.slice(0, 10) : "",
      prize: contest.prize || "",
      status: contest.status,
    });
    setIsEditing(true);
    setShowCreateModal(true);
  }

  async function openDetail(contest: Contest) {
    const res = await fetch(`/api/admin/contests?id=${contest.id}`);
    const data = await res.json();
    setSelectedContest(data);
    setShowDetailModal(true);
  }

  return (
    <AdminLayout>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#1a1a2e", margin: 0 }}>Yarışmalar</h1>
          <button
            onClick={() => { setIsEditing(false); setForm({ ...emptyForm }); setShowCreateModal(true); }}
            style={{
              padding: "10px 20px",
              background: "linear-gradient(135deg,#775a19 0%,#d4ad65 100%)",
              border: "none",
              borderRadius: 8,
              color: "#fff",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            + Yeni Yarışma
          </button>
        </div>

        <div style={{ backgroundColor: "#fff", borderRadius: 10, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", overflow: "hidden" }}>
          {loading ? (
            <div style={{ padding: 40, textAlign: "center", color: "#888" }}>Yükleniyor...</div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ backgroundColor: "#f8f7f5", borderBottom: "1px solid #eee" }}>
                  <th style={{ padding: "10px 12px", textAlign: "left" }}>Başlık</th>
                  <th style={{ padding: "10px 12px", textAlign: "left" }}>Durum</th>
                  <th style={{ padding: "10px 12px", textAlign: "left" }}>Başlangıç</th>
                  <th style={{ padding: "10px 12px", textAlign: "left" }}>Bitiş</th>
                  <th style={{ padding: "10px 12px", textAlign: "left" }}>Ödül</th>
                  <th style={{ padding: "10px 12px", textAlign: "left" }}>Katılımcı</th>
                  <th style={{ padding: "10px 12px", textAlign: "left" }}>İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {contests.map((contest) => {
                  const badge = statusBadge[contest.status] || { bg: "#eee", color: "#555", label: contest.status };
                  return (
                    <tr key={contest.id} style={{ borderBottom: "1px solid #f0ede8" }}>
                      <td style={{ padding: "8px 12px", fontWeight: 500 }}>{contest.title}</td>
                      <td style={{ padding: "8px 12px" }}>
                        <span style={{ padding: "2px 8px", borderRadius: 10, fontSize: 11, fontWeight: 600, backgroundColor: badge.bg, color: badge.color }}>
                          {badge.label}
                        </span>
                      </td>
                      <td style={{ padding: "8px 12px", color: "#777" }}>
                        {new Date(contest.startDate).toLocaleDateString("tr-TR")}
                      </td>
                      <td style={{ padding: "8px 12px", color: "#777" }}>
                        {new Date(contest.endDate).toLocaleDateString("tr-TR")}
                      </td>
                      <td style={{ padding: "8px 12px", color: "#555" }}>{contest.prize || "—"}</td>
                      <td style={{ padding: "8px 12px", color: "#555" }}>{contest._count?.entries ?? 0}</td>
                      <td style={{ padding: "8px 12px" }}>
                        <div style={{ display: "flex", gap: 4 }}>
                          <button
                            onClick={() => openDetail(contest)}
                            title="Detay"
                            style={{ padding: "3px 7px", border: "1px solid #ddd", borderRadius: 4, background: "#fff", cursor: "pointer", fontSize: 12 }}
                          >
                            👁️
                          </button>
                          <button
                            onClick={() => openEdit(contest)}
                            title="Düzenle"
                            style={{ padding: "3px 7px", border: "1px solid #ddd", borderRadius: 4, background: "#fff", cursor: "pointer", fontSize: 12 }}
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => handleCancel(contest.id)}
                            title="İptal Et"
                            style={{ padding: "3px 7px", border: "1px solid #ffcccc", borderRadius: 4, background: "#fff5f5", cursor: "pointer", fontSize: 12 }}
                          >
                            ❌
                          </button>
                          <button
                            onClick={() => handleDelete(contest.id)}
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
      </div>

      {/* Create/Edit Modal */}
      {showCreateModal && (
        <div
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}
          onClick={() => { setShowCreateModal(false); setIsEditing(false); }}
        >
          <div
            style={{ background: "#fff", borderRadius: 12, padding: 32, width: 460, maxWidth: "90%", maxHeight: "90vh", overflowY: "auto" }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ marginTop: 0, marginBottom: 20 }}>{isEditing ? "Yarışmayı Düzenle" : "Yeni Yarışma"}</h3>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 13, color: "#555", marginBottom: 4 }}>Başlık</label>
              <input
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                style={{ width: "100%", padding: "8px 10px", border: "1px solid #ddd", borderRadius: 6, fontSize: 13, boxSizing: "border-box" }}
              />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 13, color: "#555", marginBottom: 4 }}>Açıklama</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                rows={3}
                style={{ width: "100%", padding: "8px 10px", border: "1px solid #ddd", borderRadius: 6, fontSize: 13, boxSizing: "border-box", resize: "vertical" }}
              />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
              <div>
                <label style={{ display: "block", fontSize: 13, color: "#555", marginBottom: 4 }}>Başlangıç Tarihi</label>
                <input
                  type="date"
                  value={form.startDate}
                  onChange={(e) => setForm((f) => ({ ...f, startDate: e.target.value }))}
                  style={{ width: "100%", padding: "8px 10px", border: "1px solid #ddd", borderRadius: 6, fontSize: 13, boxSizing: "border-box" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 13, color: "#555", marginBottom: 4 }}>Bitiş Tarihi</label>
                <input
                  type="date"
                  value={form.endDate}
                  onChange={(e) => setForm((f) => ({ ...f, endDate: e.target.value }))}
                  style={{ width: "100%", padding: "8px 10px", border: "1px solid #ddd", borderRadius: 6, fontSize: 13, boxSizing: "border-box" }}
                />
              </div>
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 13, color: "#555", marginBottom: 4 }}>Ödül</label>
              <input
                value={form.prize}
                onChange={(e) => setForm((f) => ({ ...f, prize: e.target.value }))}
                style={{ width: "100%", padding: "8px 10px", border: "1px solid #ddd", borderRadius: 6, fontSize: 13, boxSizing: "border-box" }}
              />
            </div>
            {isEditing && (
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 13, color: "#555", marginBottom: 4 }}>Durum</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
                  style={{ width: "100%", padding: "8px 10px", border: "1px solid #ddd", borderRadius: 6, fontSize: 13 }}
                >
                  <option value="UPCOMING">Yaklaşan</option>
                  <option value="ACTIVE">Aktif</option>
                  <option value="ENDED">Bitti</option>
                </select>
              </div>
            )}
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={isEditing ? handleUpdate : handleCreate}
                style={{ padding: "8px 20px", background: "linear-gradient(135deg,#775a19 0%,#d4ad65 100%)", border: "none", borderRadius: 6, color: "#fff", cursor: "pointer", fontSize: 13 }}
              >
                {isEditing ? "Güncelle" : "Oluştur"}
              </button>
              <button
                onClick={() => { setShowCreateModal(false); setIsEditing(false); }}
                style={{ padding: "8px 20px", border: "1px solid #ddd", borderRadius: 6, cursor: "pointer", background: "#fff", fontSize: 13 }}
              >
                İptal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedContest && (
        <div
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}
          onClick={() => setShowDetailModal(false)}
        >
          <div
            style={{ background: "#fff", borderRadius: 12, padding: 32, width: 520, maxWidth: "90%", maxHeight: "80vh", overflowY: "auto" }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ marginTop: 0, marginBottom: 8 }}>{selectedContest.title}</h3>
            <p style={{ color: "#666", fontSize: 13, marginBottom: 20 }}>{selectedContest.description || "Açıklama yok"}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, fontSize: 13, marginBottom: 20 }}>
              <div><span style={{ color: "#888" }}>Durum:</span> <strong>{selectedContest.status}</strong></div>
              <div><span style={{ color: "#888" }}>Ödül:</span> <strong>{selectedContest.prize || "—"}</strong></div>
              <div><span style={{ color: "#888" }}>Başlangıç:</span> <strong>{new Date(selectedContest.startDate).toLocaleDateString("tr-TR")}</strong></div>
              <div><span style={{ color: "#888" }}>Bitiş:</span> <strong>{new Date(selectedContest.endDate).toLocaleDateString("tr-TR")}</strong></div>
            </div>
            <h4 style={{ fontSize: 14, marginBottom: 12 }}>Katılımcılar ({selectedContest.entries?.length ?? 0})</h4>
            {selectedContest.entries?.length ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {selectedContest.entries.map((entry) => (
                  <div
                    key={entry.id}
                    style={{ display: "flex", alignItems: "center", gap: 10, padding: 10, backgroundColor: "#f8f7f5", borderRadius: 8, fontSize: 13 }}
                  >
                    {entry.photoUrl && (
                      <img src={entry.photoUrl} alt="" style={{ width: 40, height: 40, borderRadius: 6, objectFit: "cover" }} />
                    )}
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 500 }}>{entry.pet?.name || "—"}</div>
                      <div style={{ color: "#888", fontSize: 11 }}>{entry.user?.name || "—"}</div>
                    </div>
                    <div style={{ color: "#775a19", fontWeight: 600, fontSize: 12 }}>
                      {entry.votes?.length ?? 0} oy
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ color: "#aaa", fontSize: 13 }}>Henüz katılımcı yok</div>
            )}
            <button
              onClick={() => setShowDetailModal(false)}
              style={{ marginTop: 24, padding: "8px 20px", border: "1px solid #ddd", borderRadius: 6, cursor: "pointer", background: "#fff" }}
            >
              Kapat
            </button>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
