"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkAdminAuth } from "@/lib/adminAuth";
import AdminLayout from "@/components/admin/AdminLayout";

interface Participant {
  user: { id: string; name: string | null };
}

interface Conversation {
  id: string;
  createdAt: string;
  participants: Participant[];
  messages: { content: string; createdAt: string }[];
}

interface Message {
  id: string;
  content: string;
  isDeleted: boolean;
  createdAt: string;
  sender: { name: string | null } | null;
}

export default function MessagesPage() {
  const router = useRouter();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConv, setSelectedConv] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [msgLoading, setMsgLoading] = useState(false);

  useEffect(() => {
    if (!checkAdminAuth()) {
      router.push("/admin");
      return;
    }
    fetchConversations();
  }, [router]);

  function fetchConversations() {
    setLoading(true);
    fetch("/api/admin/messages")
      .then((r) => r.json())
      .then((data) => {
        setConversations(Array.isArray(data) ? data : data.conversations || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }

  function fetchMessages(conversationId: string) {
    setMsgLoading(true);
    fetch(`/api/admin/messages?conversationId=${conversationId}`)
      .then((r) => r.json())
      .then((data) => {
        setMessages(Array.isArray(data) ? data : data.messages || []);
        setMsgLoading(false);
      })
      .catch(() => setMsgLoading(false));
  }

  function selectConversation(id: string) {
    setSelectedConv(id);
    fetchMessages(id);
  }

  function deleteMessage(msgId: string) {
    fetch(`/api/admin/messages?id=${msgId}`, { method: "DELETE" }).then(() => {
      if (selectedConv) fetchMessages(selectedConv);
    });
  }

  function getParticipantNames(conv: Conversation) {
    return conv.participants?.map((p) => p.user?.name || "—").join(", ") || "—";
  }

  function getLastMessage(conv: Conversation) {
    const msgs = conv.messages;
    if (!msgs || msgs.length === 0) return "Mesaj yok";
    const last = msgs[msgs.length - 1];
    return last.content?.slice(0, 50) || "—";
  }

  return (
    <AdminLayout>
      <div>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#1a1a2e", marginBottom: 20, marginTop: 0 }}>
          Mesajlar
        </h1>

        <div
          style={{
            display: "flex",
            gap: 0,
            backgroundColor: "#fff",
            borderRadius: 10,
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            overflow: "hidden",
            height: "calc(100vh - 180px)",
          }}
        >
          {/* Conversations list */}
          <div
            style={{
              width: 300,
              borderRight: "1px solid #f0ede8",
              display: "flex",
              flexDirection: "column",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                padding: "14px 16px",
                borderBottom: "1px solid #f0ede8",
                fontSize: 13,
                fontWeight: 600,
                color: "#555",
              }}
            >
              Konuşmalar
            </div>
            <div style={{ flex: 1, overflowY: "auto" }}>
              {loading ? (
                <div style={{ padding: 20, textAlign: "center", color: "#888", fontSize: 13 }}>Yükleniyor...</div>
              ) : conversations.length === 0 ? (
                <div style={{ padding: 20, color: "#aaa", fontSize: 13 }}>Konuşma yok</div>
              ) : (
                conversations.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => selectConversation(conv.id)}
                    style={{
                      padding: "12px 16px",
                      borderBottom: "1px solid #f8f7f5",
                      cursor: "pointer",
                      backgroundColor: selectedConv === conv.id ? "#fdf8f0" : "transparent",
                      borderLeft: selectedConv === conv.id ? "3px solid #d4ad65" : "3px solid transparent",
                      transition: "background 0.1s",
                    }}
                  >
                    <div style={{ fontSize: 13, fontWeight: 500, color: "#333", marginBottom: 3 }}>
                      {getParticipantNames(conv)}
                    </div>
                    <div style={{ fontSize: 11, color: "#999", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {getLastMessage(conv)}
                    </div>
                    <div style={{ fontSize: 10, color: "#bbb", marginTop: 3 }}>
                      {new Date(conv.createdAt).toLocaleDateString("tr-TR")}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Messages area */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            {!selectedConv ? (
              <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "#bbb", fontSize: 14 }}>
                Bir konuşma seçin
              </div>
            ) : (
              <>
                <div
                  style={{
                    padding: "12px 16px",
                    borderBottom: "1px solid #f0ede8",
                    fontSize: 13,
                    fontWeight: 500,
                    color: "#555",
                  }}
                >
                  {conversations.find((c) => c.id === selectedConv)
                    ? getParticipantNames(conversations.find((c) => c.id === selectedConv)!)
                    : "Mesajlar"}
                </div>
                <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
                  {msgLoading ? (
                    <div style={{ textAlign: "center", color: "#888", fontSize: 13 }}>Yükleniyor...</div>
                  ) : messages.length === 0 ? (
                    <div style={{ color: "#aaa", fontSize: 13 }}>Mesaj yok</div>
                  ) : (
                    messages.map((msg) => (
                      <div
                        key={msg.id}
                        style={{
                          marginBottom: 10,
                          padding: "10px 12px",
                          backgroundColor: msg.isDeleted ? "#fff5f5" : "#f8f7f5",
                          borderRadius: 8,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          gap: 10,
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 12, fontWeight: 500, color: "#775a19", marginBottom: 3 }}>
                            {msg.sender?.name || "—"}
                          </div>
                          <div
                            style={{
                              fontSize: 13,
                              color: msg.isDeleted ? "#999" : "#333",
                              textDecoration: msg.isDeleted ? "line-through" : "none",
                            }}
                          >
                            {msg.content}
                          </div>
                          <div style={{ fontSize: 10, color: "#bbb", marginTop: 4 }}>
                            {new Date(msg.createdAt).toLocaleString("tr-TR")}
                            {msg.isDeleted && " · Silindi"}
                          </div>
                        </div>
                        {!msg.isDeleted && (
                          <button
                            onClick={() => deleteMessage(msg.id)}
                            title="Sil"
                            style={{
                              padding: "3px 7px",
                              border: "1px solid #ffcccc",
                              borderRadius: 4,
                              background: "#fff5f5",
                              cursor: "pointer",
                              fontSize: 12,
                              flexShrink: 0,
                            }}
                          >
                            🗑️
                          </button>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
