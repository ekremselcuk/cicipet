"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { checkAdminAuth } from "@/lib/adminAuth";
import AdminLayout from "@/components/admin/AdminLayout";

interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string | null;
  gender: string;
  isVaccinated: boolean;
  isNeutered: boolean;
  city: string | null;
  isActive: boolean;
  createdAt: string;
  owner: { name: string | null; email: string };
  photos: { url: string; isMain: boolean }[];
}

const speciesMap: Record<string, string> = {
  DOG: "Köpek",
  CAT: "Kedi",
  BIRD: "Kuş",
  RABBIT: "Tavşan",
  FISH: "Balık",
  REPTILE: "Sürüngen",
  OTHER: "Diğer",
};

const font = '"Plus Jakarta Sans", system-ui, sans-serif';

export default function PetsPage() {
  const router = useRouter();
  const [pets, setPets] = useState<Pet[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [search, setSearch] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const totalPages = Math.ceil(total / limit);

  const fetchPets = useCallback(() => {
    setLoading(true);
    const params = new URLSearchParams({
      search,
      species: speciesFilter,
      status: statusFilter,
      page: String(page),
      limit: String(limit),
    });
    fetch(`/api/admin/pets?${params}`)
      .then((r) => r.json())
      .then((data) => {
        setPets(data.pets || []);
        setTotal(data.total || 0);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [search, speciesFilter, statusFilter, page, limit]);

  useEffect(() => {
    if (!checkAdminAuth()) {
      router.push("/admin");
      return;
    }
    fetchPets();
  }, [fetchPets, router]);

  function handleApprove(petId: string) {
    fetch("/api/admin/pets", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "approve", petId }),
    }).then(() => fetchPets());
  }

  function handleReject(petId: string) {
    fetch("/api/admin/pets", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "reject", petId }),
    }).then(() => fetchPets());
  }

  function handleDelete(petId: string) {
    if (!confirm("Bu peti silmek istediğinizden emin misiniz?")) return;
    fetch(`/api/admin/pets?id=${petId}`, { method: "DELETE" }).then(() => fetchPets());
  }

  return (
    <AdminLayout>
      <div style={{ fontFamily: font }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#1a1a2e", marginBottom: 20, marginTop: 0 }}>
          Petler
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
            placeholder="Ara (pet adı, sahip...)"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            style={{ padding: "7px 12px", border: "1px solid #ddd", borderRadius: 6, fontSize: 13, width: 180, fontFamily: font }}
          />
          <select
            value={speciesFilter}
            onChange={(e) => { setSpeciesFilter(e.target.value); setPage(1); }}
            style={{ padding: "7px 10px", border: "1px solid #ddd", borderRadius: 6, fontSize: 13, fontFamily: font }}
          >
            <option value="">Tümü</option>
            <option value="CAT">Kedi</option>
            <option value="DOG">Köpek</option>
            <option value="BIRD">Kuş</option>
            <option value="RABBIT">Tavşan</option>
            <option value="FISH">Balık</option>
            <option value="REPTILE">Sürüngen</option>
            <option value="OTHER">Diğer</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            style={{ padding: "7px 10px", border: "1px solid #ddd", borderRadius: 6, fontSize: 13, fontFamily: font }}
          >
            <option value="">Tüm Durumlar</option>
            <option value="active">Aktif</option>
            <option value="inactive">Pasif</option>
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
                  <th style={{ padding: "10px 12px", textAlign: "left" }}>Fotoğraf</th>
                  <th style={{ padding: "10px 12px", textAlign: "left" }}>Pet Adı</th>
                  <th style={{ padding: "10px 12px", textAlign: "left" }}>Tür</th>
                  <th style={{ padding: "10px 12px", textAlign: "left" }}>Cins</th>
                  <th style={{ padding: "10px 12px", textAlign: "left" }}>Sahibi</th>
                  <th style={{ padding: "10px 12px", textAlign: "left" }}>Şehir</th>
                  <th style={{ padding: "10px 12px", textAlign: "left" }}>Durum</th>
                  <th style={{ padding: "10px 12px", textAlign: "left" }}>Tarih</th>
                  <th style={{ padding: "10px 12px", textAlign: "left" }}>İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {pets.map((pet) => {
                  const mainPhoto = pet.photos?.find((p) => p.isMain) || pet.photos?.[0];
                  return (
                    <tr key={pet.id} style={{ borderBottom: "1px solid #f0ede8" }}>
                      <td style={{ padding: "8px 12px" }}>
                        {mainPhoto ? (
                          <img
                            src={mainPhoto.url}
                            alt=""
                            style={{ width: 40, height: 40, borderRadius: 6, objectFit: "cover" }}
                          />
                        ) : (
                          <div
                            style={{
                              width: 40,
                              height: 40,
                              borderRadius: 6,
                              backgroundColor: "#f0ede8",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 18,
                            }}
                          >
                            🐾
                          </div>
                        )}
                      </td>
                      <td style={{ padding: "8px 12px", fontWeight: 500 }}>{pet.name}</td>
                      <td style={{ padding: "8px 12px" }}>{speciesMap[pet.species] || pet.species}</td>
                      <td style={{ padding: "8px 12px", color: "#777" }}>{pet.breed || "—"}</td>
                      <td style={{ padding: "8px 12px", color: "#555" }}>{pet.owner?.name || "—"}</td>
                      <td style={{ padding: "8px 12px", color: "#777" }}>{pet.city || "—"}</td>
                      <td style={{ padding: "8px 12px" }}>
                        <span
                          style={{
                            padding: "2px 8px",
                            borderRadius: 10,
                            fontSize: 11,
                            fontWeight: 600,
                            backgroundColor: pet.isActive ? "#e0f5e9" : "#ffe0e0",
                            color: pet.isActive ? "#1a7a3a" : "#cc0000",
                          }}
                        >
                          {pet.isActive ? "Aktif" : "Pasif"}
                        </span>
                      </td>
                      <td style={{ padding: "8px 12px", color: "#999", fontSize: 12 }}>
                        {new Date(pet.createdAt).toLocaleDateString("tr-TR")}
                      </td>
                      <td style={{ padding: "8px 12px" }}>
                        <div style={{ display: "flex", gap: 4 }}>
                          <button
                            onClick={() => handleApprove(pet.id)}
                            title="Onayla"
                            style={{ padding: "3px 7px", border: "1px solid #ccffdd", borderRadius: 4, background: "#f5fff8", cursor: "pointer", fontSize: 12 }}
                          >
                            ✅ Onayla
                          </button>
                          <button
                            onClick={() => handleReject(pet.id)}
                            title="Reddet"
                            style={{ padding: "3px 7px", border: "1px solid #ffcccc", borderRadius: 4, background: "#fff5f5", cursor: "pointer", fontSize: 12 }}
                          >
                            ❌ Reddet
                          </button>
                          <button
                            onClick={() => handleDelete(pet.id)}
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
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16, fontSize: 13, color: "#666" }}
        >
          <span>Toplam {total} pet · Sayfa {page} / {totalPages || 1}</span>
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
