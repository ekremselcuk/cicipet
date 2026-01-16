export default function HealthCard() {
    return (
        <div className="px-4 mb-8">
            <div className="bg-dark-elem rounded-2xl p-5 border border-white/5 relative overflow-hidden">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                    <span>🩺</span> Sağlık Karnesi
                </h3>

                <div className="space-y-4">
                    <HealthItem label="Karma Aşı" date="12 Ocak 2026" status="Tamam" />
                    <HealthItem label="Kuduz Aşısı" date="10 Ekim 2025" status="Tamam" />
                    <HealthItem label="İç/Dış Parazit" date="15 Ocak 2026" status="Yeni" highlight />
                </div>

                <div className="mt-6 pt-4 border-t border-white/5">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Oyun Arkadaşı Durumu</span>
                        <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full font-bold">
                            🟢 Arıyor
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function HealthItem({ label, date, status, highlight }) {
    return (
        <div className="flex justify-between items-center">
            <span className="text-sm text-gray-300">{label}</span>
            <div className="flex flex-col items-end">
                <span className={`text-xs font-bold ${highlight ? 'text-green-400' : 'text-gray-500'}`}>{status}</span>
                <span className="text-[10px] text-gray-600">{date}</span>
            </div>
        </div>
    );
}
