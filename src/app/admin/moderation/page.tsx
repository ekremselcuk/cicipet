"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkAdminAuth } from "@/lib/adminAuth";
import AdminLayout from "@/components/admin/AdminLayout";

type TabType = "photos" | "texts" | "reports";

interface PhotoItem {
  id: string;
  name: string;
  photos: { url: string }[];
  owner: { name: string | null } | null;
  aiScore?: string;
}

interface TextItem {
  id: string;
  content: string;
  author: string;
  type: string;
  date: string;
}

interface ReportItem {
  id: string;
  action: string;
  reason: string | null;
  createdAt: string;
  moderator: { name: string | null } | null;
  targetUser: { name: string | null; email: string } | null;
}

export default function ModerationPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("photos");
  const [items, setItems] = useState<(PhotoItem | TextItem | ReportItem)[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!checkAdminAuth()) {
      router.push("/admin");
    }
  }, [router]);

  useEffect(() => {
    setLoading(true);
    setItems([]);
    fetch(`/api/admin/moderation?type=${activeTab}`)
      .then((r) => r.json())
      .then((data) => {
        setItems(Array.isArray(data) ? data : data.items || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [activeTab]);

  function postAction(action: string, targetId: string, targetType: string, reason?: string) {
    fetch("/api/admin/moderation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, targetId, targetType, reason }),
    }).then(() => {
      // Re-fetch
      setLoading(true);
      fetch(`/api/admin/moderation?type=${activeTab}`)
        .then((r) => r.json())
        .then((data) => {
          setItems(Array.isArray(data) ? data : data.items || []);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    });
  }

  const tabs: { key: TabType; label: string }[] = [
    { key: "photos", label: "📷 Fotoğraflar" },
    { key: "texts", label: "📝 Metinler" },
    { key: "reports", label: "🚩 Raporlar" },
  ];

  return (
    <AdminLayout>
      <div>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#1a1a2e", marginBottom: 20, marginTop: 0 }}>
          Moderasyon
        </h1>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 20, backgroundColor: "#fff", borderRadius: 10, padding: 6, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", width: "fit-content" }}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding: "8px 18px",
                border: "none",
                borderRadius: 7,
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 500,
                background: activeTab === tab.key ? "linear-gradient(135deg,#775a19 0%,#d4ad65 100%)" : "transparent",
                color: activeTab === tab.key ? "#fff" : "#555",
                transition: "all 0.15s",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {loading && (
          <div style={{ padding: 40, textAlign: "center", color: "#888" }}>Yükleniyor...</div>
        )}

        {/* Photos tab */}
        {!loading && activeTab === "photos" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
            {(items as PhotoItem[]).map((item) => (
              <div
                key={item.id}
                style={{ backgroundColor: "#fff", borderRadius: 12, padding: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
              >
                {item.photos?.[0]?.url ? (
                  <img
                    src={item.photos[0].url}
                    alt=""
                    style={{ width: "100%", height: 200, objectFit: "cover", borderRadius: 8, marginBottom: 12 }}
                  />
                ) : (
                  <div
                    style={{ width: "100%", height: 200, backgroundColor: "#f0ede8", borderRadius: 8, marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40 }}
                  >
                    🐾
                  </div>
                )}
                <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>{item.name}</div>
                <div style={{ fontSize: 12, color: "#888", marginBottom: 4 }}>Sahip: {item.owner?.name || "—"}</div>
                {item.aiScore && (
                  <div style={{ fontSize: 11, color: "#cc6600", backgroundColor: "#fff5e0", padding: "3px 8px", borderRadius: 6, marginBottom: 10, display: "inline-block" }}>
                    AI Skoru: {item.aiScore}
                  </div>
                )}
                <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
                  <button
                    onClick={() => postAction("approve", item.id, "pet")}
                    style={{ flex: 1, padding: "6px", border: "1px solid #ccffdd", borderRadius: 6, background: "#f5fff8", cursor: "pointer", fontSize: 12 }}
                  >
                    ✅ Onayla
                  </button>
                  <button
                    onClick={() => postAction("reject", item.id, "pet")}
                    style={{ flex: 1, padding: "6px", border: "1px solid #ffcccc", borderRadius: 6, background: "#fff5f5", cursor: "pointer", fontSize: 12 }}
                  >
                    ❌ Reddet
                  </button>
                  <button
                    onClick={() => postAction("warn", item.id, "pet", "Uygunsuz içerik")}
                    style={{ flex: 1, padding: "6px", border: "1px solid #ffe0cc", borderRadius: 6, background: "#fff8f5", cursor: "pointer", fontSize: 12 }}
                  >
                    ⚠️ Uyar
                  </button>
                </div>
              </div>
            ))}
            {items.length === 0 && (
              <div style={{ color: "#aaa", fontSize: 14, padding: 20 }}>İncelenecek fotoğraf yok</div>
            )}
          </div>
        )}

        {/* Texts tab */}
        {!loading && activeTab === "texts" && (
          <div style={{ backgroundColor: "#fff", borderRadius: 10, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", overflow: "hidden" }}>
            {(items as TextItem[]).map((item, idx) => (
              <div
                key={item.id || idx}
                style={{ padding: "14px 16px", borderBottom: "1px solid #f0ede8", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, color: "#333", marginBottom: 6, lineHeight: 1.5 }}>{item.content}</div>
                  <div style={{ fontSize: 11, color: "#999" }}>
                    {item.author} · {item.type} · {item.date ? new Date(item.date).toLocaleDateString("tr-TR") : "—"}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                  <button
                    onClick={() => postAction("approve", item.id, "text")}
                    style={{ padding: "4px 10px", border: "1px solid #ccffdd", borderRadius: 6, background: "#f5fff8", cursor: "pointer", fontSize: 12 }}
                  >
                    ✅
                  </button>
                  <button
                    onClick={() => postAction("reject", item.id, "text")}
                    style={{ padding: "4px 10px", border: "1px solid #ffcccc", borderRadius: 6, background: "#fff5f5", cursor: "pointer", fontSize: 12 }}
                  >
                    ❌
                  </button>
                </div>
              </div>
            ))}
            {items.length === 0 && (
              <div style={{ color: "#aaa", fontSize: 14, padding: 20 }}>İncelenecek metin yok</div>
            )}
          </div>
        )}

        {/* Reports tab */}
        {!loading && activeTab === "reports" && (
          <div style={{ backgroundColor: "#fff", borderRadius: 10, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", overflow: "hidden" }}>
            {(items as ReportItem[]).map((item) => (
              <div
                key={item.id}
                style={{ padding: "14px 16px", borderBottom: "1px solid #f0ede8", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4, color: "#333" }}>
                    Moderatör: {item.moderator?.name || "—"} → Hedef: {item.targetUser?.name || item.targetUser?.email || "—"}
                  </div>
                  <div style={{ fontSize: 12, color: "#666", marginBottom: 4 }}>
                    İşlem: <strong>{item.action}</strong>
                  </div>
                  {item.reason && (
                    <div style={{ fontSize: 12, color: "#888" }}>Sebep: {item.reason}</div>
                  )}
                  <div style={{ fontSize: 11, color: "#aaa", marginTop: 4 }}>
                    {new Date(item.createdAt).toLocaleDateString("tr-TR")}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                  <button
                    onClick={() => postAction("approve", item.id, "report")}
                    style={{ padding: "4px 12px", border: "1px solid #ddd", borderRadius: 6, background: "#fff", cursor: "pointer", fontSize: 12 }}
                  >
                    İncele
                  </button>
                  <button
                    onClick={() => postAction("reject", item.id, "report")}
                    style={{ padding: "4px 12px", border: "1px solid #ddd", borderRadius: 6, background: "#fff", cursor: "pointer", fontSize: 12 }}
                  >
                    Yoksay
                  </button>
                </div>
              </div>
            ))}
            {items.length === 0 && (
              <div style={{ color: "#aaa", fontSize: 14, padding: 20 }}>İncelenecek rapor yok</div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
