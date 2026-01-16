'use client';

import { useState } from 'react';

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('economy');

    return (
        <div className="p-4 bg-gray-900 min-h-screen text-white">
            <h1 className="text-2xl font-black mb-6 text-red-500 flex items-center gap-2">
                <span>🛡️</span> GOD MODE (Admin)
            </h1>

            {/* Admin Nav */}
            <div className="flex gap-2 overflow-x-auto pb-4 mb-4">
                <TabButton id="economy" label="Ekonomi" active={activeTab} set={setActiveTab} />
                <TabButton id="arena" label="Arena" active={activeTab} set={setActiveTab} />
                <TabButton id="content" label="İçerik" active={activeTab} set={setActiveTab} />
                <TabButton id="charity" label="İyilik" active={activeTab} set={setActiveTab} />
            </div>

            {/* Dynamic Content */}
            <div className="space-y-6">
                {activeTab === 'economy' && <EconomyPanel />}
                {activeTab === 'arena' && <ArenaPanel />}
                {activeTab === 'content' && <ContentPanel />}
                {activeTab === 'charity' && <CharityPanel />}
            </div>
        </div>
    );
}

function TabButton({ id, label, active, set }) {
    const isActive = active === id;
    return (
        <button
            onClick={() => set(id)}
            className={`px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap transition-colors
        ${isActive ? 'bg-white text-black' : 'bg-white/5 text-gray-400 hover:bg-white/10'}
      `}
        >
            {label}
        </button>
    );
}

function EconomyPanel() {
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <StatCard title="Enflasyon" value="%4.2" color="text-red-400" />
                <StatCard title="Dolaşımda PP" value="12.5M" color="text-gold-primary" />
            </div>

            <div className="bg-dark-elem p-4 rounded-xl border border-white/10">
                <h3 className="font-bold mb-2">🎁 Kupon Matbaası</h3>
                <p className="text-xs text-gray-400 mb-4">Efsanevi Patiler için %20 indirim kuponu bas.</p>
                <button className="w-full bg-green-600 py-2 rounded font-bold hover:bg-green-500">
                    Kupon Üret (1.000 Adet)
                </button>
            </div>

            <div className="bg-dark-elem p-4 rounded-xl border border-white/10">
                <h3 className="font-bold mb-2">⚡ Katsayı Yönetimi</h3>
                <div className="flex gap-2">
                    <button className="flex-1 bg-white/10 py-2 rounded hover:bg-gold-primary hover:text-black">1x</button>
                    <button className="flex-1 bg-gold-primary text-black py-2 rounded font-bold">2x (Haftasonu)</button>
                    <button className="flex-1 bg-white/10 py-2 rounded hover:bg-red-500">3x</button>
                </div>
            </div>
        </div>
    );
}

function ArenaPanel() {
    return (
        <div className="space-y-4">
            <div className="bg-dark-elem p-4 rounded-xl border border-red-500/20">
                <h3 className="font-bold text-red-400 mb-2">🚨 Flash Yarışma Tetikleyici</h3>
                <input type="text" placeholder="Yarışma Başlığı (Örn: Uyuyanlar)" className="w-full bg-black/50 p-2 rounded mb-2 border border-white/10" />
                <button className="w-full bg-red-600 py-2 rounded font-bold hover:bg-red-500 animate-pulse">
                    BAŞLAT (1 SAAT)
                </button>
            </div>

            <div className="bg-dark-elem p-4 rounded-xl">
                <h3 className="font-bold mb-2">Hile Kontrol</h3>
                <div className="flex justify-between items-center text-sm border-b border-white/5 py-2">
                    <span>User_9921 (Bot Şüphesi)</span>
                    <button className="text-red-400 text-xs border border-red-400 px-2 py-1 rounded">Diskalifiye</button>
                </div>
            </div>
        </div>
    );
}

function ContentPanel() {
    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="bg-dark-elem p-4 rounded-xl flex flex-col items-center">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-2">
                    <span className="text-2xl">🤖</span>
                </div>
                <span className="font-bold">AI Denetim</span>
                <span className="text-xs text-gray-400 text-center mt-1">15 Riskli Görsel Kuyrukta</span>
            </div>
            <div className="bg-dark-elem p-4 rounded-xl flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-2">
                    <span className="text-2xl">📍</span>
                </div>
                <span className="font-bold">Heatmap</span>
                <span className="text-xs text-gray-400 text-center mt-1">Kadıköy Yoğunlukta</span>
            </div>
        </div>
    );
}

function CharityPanel() {
    return (
        <div className="bg-dark-elem p-4 rounded-xl border border-green-500/20">
            <h3 className="font-bold text-green-400 mb-4">🚛 Lojistik Operasyon</h3>
            <div className="space-y-3">
                <LogItem text="Kadiköy Barınağı - 500kg Mama Teslim Edildi" time="10dk önce" />
                <LogItem text="Üsküdar Barınağı - Acil İlaç Talebi" time="30dk önce" urgent />
            </div>
        </div>
    );
}

function StatCard({ title, value, color }) {
    return (
        <div className="bg-dark-elem p-4 rounded-xl border border-white/5">
            <span className="text-xs text-gray-400 block mb-1">{title}</span>
            <span className={`text-2xl font-black ${color}`}>{value}</span>
        </div>
    );
}

function LogItem({ text, time, urgent }) {
    return (
        <div className={`p-2 rounded border-l-2 ${urgent ? 'border-red-500 bg-red-500/10' : 'border-green-500 bg-black/20'}`}>
            <p className="text-sm font-bold">{text}</p>
            <span className="text-[10px] text-gray-500">{time}</span>
        </div>
    );
}
