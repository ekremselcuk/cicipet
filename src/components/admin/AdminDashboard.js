'use client';

import { useState } from 'react';

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('economy');

    return (
        <div className="p-4 bg-gray-50 min-h-screen text-gray-800 pb-24">
            <h1 className="text-2xl font-black mb-6 text-gray-800 flex items-center gap-2">
                <span className="text-3xl">🛡️</span> Yönetim Merkezi
            </h1>

            {/* Admin Nav */}
            <div className="flex gap-2 overflow-x-auto pb-4 mb-4 no-scrollbar">
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
            className={`px-5 py-2.5 rounded-full font-bold text-sm whitespace-nowrap transition-all shadow-sm border
        ${isActive
                    ? 'bg-orange-500 text-white border-orange-500 shadow-floating'
                    : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
                }
      `}
        >
            {label}
        </button>
    );
}

function EconomyPanel() {
    return (
        <div className="space-y-4 animate-pop">
            <div className="grid grid-cols-2 gap-4">
                <StatCard title="Enflasyon" value="%4.2" color="text-red-500" icon="📈" />
                <StatCard title="Dolaşımda PP" value="12.5M" color="text-orange-500" icon="💰" />
            </div>

            <div className="bg-white p-5 rounded-[24px] shadow-soft border border-white">
                <h3 className="font-bold mb-2 flex items-center gap-2">🎁 Kupon Matbaası</h3>
                <p className="text-xs text-gray-500 mb-4 font-medium">Efsanevi Patiler için %20 indirim kuponu bas.</p>
                <button className="w-full bg-green-500 text-white py-3 rounded-xl font-bold hover:bg-green-600 shadow-soft transition-transform active:scale-95">
                    Kupon Üret (1.000 Adet)
                </button>
            </div>

            <div className="bg-white p-5 rounded-[24px] shadow-soft border border-white">
                <h3 className="font-bold mb-4 flex items-center gap-2">⚡ Katsayı Yönetimi</h3>
                <div className="flex gap-2">
                    <button className="flex-1 bg-gray-100 text-gray-500 py-3 rounded-xl font-bold hover:bg-orange-100 hover:text-orange-600 transition-colors">1x</button>
                    <button className="flex-1 bg-gradient-to-tr from-orange-400 to-orange-500 text-white py-3 rounded-xl font-bold shadow-md transform scale-105">2x</button>
                    <button className="flex-1 bg-gray-100 text-gray-500 py-3 rounded-xl font-bold hover:bg-red-100 hover:text-red-600 transition-colors">3x</button>
                </div>
            </div>
        </div>
    );
}

function ArenaPanel() {
    return (
        <div className="space-y-4 animate-pop">
            <div className="bg-white p-5 rounded-[24px] shadow-soft border border-red-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-red-100 rounded-full blur-2xl -mr-5 -mt-5"></div>
                <h3 className="font-bold text-red-500 mb-3 flex items-center gap-2">🚨 Flash Yarışma</h3>
                <input type="text" placeholder="Yarışma Başlığı (Örn: Uyuyanlar)" className="w-full bg-gray-50 p-3 rounded-xl mb-3 border-none ring-1 ring-gray-200 focus:ring-red-300 outline-none text-sm transition-shadow" />
                <button className="w-full bg-red-500 text-white py-3 rounded-xl font-bold hover:bg-red-600 shadow-lg animate-pulse">
                    BAŞLAT (1 SAAT)
                </button>
            </div>

            <div className="bg-white p-5 rounded-[24px] shadow-soft border border-white">
                <h3 className="font-bold mb-4">Hile Kontrol Paneli</h3>
                <div className="flex justify-between items-center text-sm bg-red-50 p-3 rounded-xl">
                    <span className="font-bold text-gray-700">User_9921 (Bot?)</span>
                    <button className="text-red-600 px-3 py-1 rounded-lg bg-white shadow-sm text-xs font-bold hover:bg-red-600 hover:text-white transition-colors">Diskalifiye</button>
                </div>
            </div>
        </div>
    );
}

function ContentPanel() {
    return (
        <div className="grid grid-cols-2 gap-4 animate-pop">
            <div className="bg-white p-5 rounded-[24px] shadow-soft flex flex-col items-center text-center border border-white">
                <div className="w-14 h-14 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-3 text-2xl">
                    🤖
                </div>
                <span className="font-bold text-gray-800">AI Denetim</span>
                <span className="text-xs text-gray-400 font-medium mt-1">15 Riskli Görsel</span>
            </div>
            <div className="bg-white p-5 rounded-[24px] shadow-soft flex flex-col items-center text-center border border-white">
                <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-3 text-2xl">
                    📍
                </div>
                <span className="font-bold text-gray-800">Heatmap</span>
                <span className="text-xs text-gray-400 font-medium mt-1">Kadıköy Yoğun</span>
            </div>
        </div>
    );
}

function CharityPanel() {
    return (
        <div className="bg-white p-5 rounded-[24px] shadow-soft border-l-4 border-l-green-500 animate-pop">
            <h3 className="font-bold text-green-600 mb-4 flex items-center gap-2">🚛 Lojistik Operasyon</h3>
            <div className="space-y-3">
                <LogItem text="Kadiköy Barınağı - 500kg Mama" time="10dk önce" icon="✅" />
                <LogItem text="Üsküdar Barınağı - İlaç Talebi" time="30dk önce" urgent icon="⚠️" />
            </div>
        </div>
    );
}

function StatCard({ title, value, color, icon }) {
    return (
        <div className="bg-white p-5 rounded-[24px] shadow-soft border border-white relative overflow-hidden">
            <div className="flex justify-between items-start mb-2">
                <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">{title}</span>
                <span className="text-xl opacity-50">{icon}</span>
            </div>
            <span className={`text-2xl font-black ${color}`}>{value}</span>
        </div>
    );
}

function LogItem({ text, time, urgent, icon }) {
    return (
        <div className={`p-3 rounded-xl flex items-center gap-3 ${urgent ? 'bg-red-50 text-red-800' : 'bg-green-50 text-green-800'}`}>
            <span className="text-lg">{icon}</span>
            <div className="flex flex-col">
                <p className="text-sm font-bold leading-tight">{text}</p>
                <span className="text-[10px] opacity-70 mt-0.5 font-medium">{time}</span>
            </div>
        </div>
    );
}
