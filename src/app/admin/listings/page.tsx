"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { checkAdminAuth } from "@/lib/adminAuth";
import AdminLayout from "@/components/admin/AdminLayout";

interface Listing {
  id: string;
  title: string;
  type: string;
  status: string;
  city: string | null;
  price: number | null;
  createdAt: string;
  user: { name: string | null; email: string };
}

const typeMap: Record<string, string> = {
  ADOPTION: "Sahiplendirme",
  LOST: "Kayıp",
  FOUND: "Bulundu",
  MATING: "Çiftleşme",
  SALE: "Satış",
};

const typeBadgeColor: Record<string, { bg: string; color: string }> = {
  ADOPTION: { bg: "#e0f0ff", color: "#005580" },
  LOST: { bg: "#fff0e0", color: "#884400" },
  FOUND: { bg: "#e0ffe8", color: "#006622" },
  MATING: { bg: "#f5e0ff", color: "#660088" },
  SALE: { bg: "#fffbe0", color: "#665500" },
};

const statusBadgeColor: Record<string, { bg: string; color: string }> = {
  ACTIVE: { bg: "#e0f5e9", color: "#1a7a3a" },
  CLOSED: { bg: "#eee", color: "#555" },
  EXPIRED: { bg: "#ffe0e0", color: "#cc0000" },
};

const font = '"Plus Jakarta Sans", system-ui, sans-serif';

export default function ListingsPage() {
  const router = useRouter();
  const [listings, setListings] = useState<Listing[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const totalPages = Math.ceil(total / limit);

  const fetchListings = useCallback(() => {
    setLoading(true);
    const params = new URLSearchParams({
      search,
      type: typeFilter,
      status: statusFilter,
      page: String(page),
      limit: String(limit),
    });
    fetch(`/api/admin/listings?${params}`)
      .then((r) => r.json())
      .then((data) => {
        setListings(data.listings || []);
        setTotal(data.total || 0);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [search, typeFilter, statusFilter, page, limit]);

  useEffect(() => {
    if (!checkAdminAuth()) {
      router.push("/admin");
      return;
    }
    fetchListings();
  }, [fetchListings, router]);

  function handleClose(listingId: string) {
    fetch("/api/admin/listings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "close", listingId }),
    }).then(() => fetchListings());
  }

  function handleDelete(listingId: string) {
    if (!confirm("Bu ilanı silmek istediğinizden emin misiniz?")) return;
    fetch(`/api/admin/listings?id=${listingId}`, { method: "DELETE" }).then(() => fetchListings());
  }

  return (
    <AdminLayout>
      <div style={{ fontFamily: font }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#1a1a2e", marginBottom: 20, marginTop: 0 }}>
          İlanlar
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
            placeholder="Ara (başlık, açıklama...)"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            style={{ padding: "7px 12px", border: "1px solid #ddd", borderRadius: 6, fontSize: 13, width: 200, fontFamily: font }}
          />
          <select
            value={typeFilter}
            onChange={(e) => { setTypeFilter(e.target.value); setPage(1); }}
            style={{ padding: "7px 10px", border: "1px solid #ddd", borderRadius: 6, fontSize: 13, fontFamily: font }}
          >
            <option value="">Tüm Tipler</option>
            {Object.entries(typeMap).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            style={{ padding: "7px 10px", border: "1px solid #ddd", borderRadius: 6, fontSize: 13, fontFamily: font }}
          >
            <option value="">Tüm Durumlar</option>
            <option value="ACTIVE">Aktif</option>
            <option value="CLOSED">Kapalı</option>
            <option value="EXPIRED">Süresi Dolmuş</option>
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
          style={{ backgroundColor: "#fff", borderRadius: 10, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", overflow: "hidden" }}
        >
          {loading ? (
            <div style={{ padding: 40, textAlign: "center", color: "#888" }}>Yükleniyor...</div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ backgroundColor: "#f8f7f5", borderBottom: "1px solid #eee" }}>
                  <th style={{ padding: "10px 12px", textAlign: "left" }}>Başlık</th>
                  <th style={{ padding: "10px 12px", textAlign: "left" }}>Tip</th>
                  <th style={{ padding: "10px 12px", textAlign: "left" }}>Sahibi</th>
                  <th style={{ padding: "10px 12px", textAlign: "left" }}>Şehir</th>
                  <th style={{ padding: "10px 12px", textAlign: "left" }}>Durum</th>
                  <th style={{ padding: "10px 12px", textAlign: "left" }}>Fiyat</th>
                  <th style={{ padding: "10px 12px", textAlign: "left" }}>Tarih</th>
                  <th style={{ padding: "10px 12px", textAlign: "left" }}>İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {listings.map((listing) => {
                  const typeBadge = typeBadgeColor[listing.type] || { bg: "#eee", color: "#555" };
                  const statusBadge = statusBadgeColor[listing.status] || { bg: "#eee", color: "#555" };
                  return (
                    <tr key={listing.id} style={{ borderBottom: "1px solid #f0ede8" }}>
                      <td style={{ padding: "8px 12px", fontWeight: 500, maxWidth: 220 }}>
                        <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {listing.title}
                        </div>
                      </td>
                      <td style={{ padding: "8px 12px" }}>
                        <span style={{ padding: "2px 8px", borderRadius: 10, fontSize: 11, fontWeight: 600, backgroundColor: typeBadge.bg, color: typeBadge.color }}>
                          {typeMap[listing.type] || listing.type}
                        </span>
                      </td>
                      <td style={{ padding: "8px 12px", color: "#555" }}>{listing.user?.name || "—"}</td>
                      <td style={{ padding: "8px 12px", color: "#777" }}>{listing.city || "—"}</td>
                      <td style={{ padding: "8px 12px" }}>
                        <span style={{ padding: "2px 8px", borderRadius: 10, fontSize: 11, fontWeight: 600, backgroundColor: statusBadge.bg, color: statusBadge.color }}>
                          {listing.status === "ACTIVE" ? "Aktif" : listing.status === "CLOSED" ? "Kapalı" : "Süresi Dolmuş"}
                        </span>
                      </td>
                      <td style={{ padding: "8px 12px", color: "#555" }}>
                        {listing.price != null ? `${listing.price} ₺` : "—"}
                      </td>
                      <td style={{ padding: "8px 12px", color: "#999", fontSize: 12 }}>
                        {new Date(listing.createdAt).toLocaleDateString("tr-TR")}
                      </td>
                      <td style={{ padding: "8px 12px" }}>
                        <div style={{ display: "flex", gap: 4 }}>
                          <button
                            onClick={() => handleClose(listing.id)}
                            title="Kapat"
                            style={{ padding: "3px 7px", border: "1px solid #ddd", borderRadius: 4, background: "#fff", cursor: "pointer", fontSize: 12 }}
                          >
                            🔒 Kapat
                          </button>
                          <button
                            onClick={() => handleDelete(listing.id)}
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
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16, fontSize: 13, color: "#666" }}>
          <span>Toplam {total} ilan · Sayfa {page} / {totalPages || 1}</span>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              style={{ padding: "6px 14px", border: "1px solid #ddd", borderRadius: 6, background: "#fff", cursor: page <= 1 ? "not-allowed" : "pointer", opacity: page <= 1 ? 0.5 : 1, fontFamily: font }}
            >
              ← Önceki
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              style={{ padding: "6px 14px", border: "1px solid #ddd", borderRadius: 6, background: "#fff", cursor: page >= totalPages ? "not-allowed" : "pointer", opacity: page >= totalPages ? 0.5 : 1, fontFamily: font }}
            >
              Sonraki →
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
