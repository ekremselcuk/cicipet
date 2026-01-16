export default function HealthCard() {
    return (
        <div className="px-4 mb-8">
            <div className="bg-white rounded-[24px] p-6 shadow-soft border-l-4 border-l-green-400 relative overflow-hidden">
                <h3 className="text-gray-800 font-black mb-6 flex items-center gap-2 text-lg">
                    <span className="bg-green-100 p-1.5 rounded-lg text-green-600">🩺</span> Sağlık Karnesi
                </h3>

                <div className="space-y-4">
                    <HealthItem label="Karma Aşı" date="12 Ocak 2026" status="Tamam" icon="💉" />
                    <HealthItem label="Kuduz Aşısı" date="10 Ekim 2025" status="Tamam" icon="🦠" />
                    <HealthItem label="İç/Dış Parazit" date="15 Ocak 2026" status="Yeni" highlight icon="💊" />
                </div>

                <div className="mt-8 pt-4 border-t border-gray-100">
                    <div className="flex justify-between items-center bg-green-50 p-3 rounded-xl">
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-gray-700">Oyun Arkadaşı</span>
                            <span className="text-[10px] text-green-600 font-bold">Aktif & Arıyor</span>
                        </div>

                        <div className="relative w-12 h-6 rounded-full bg-green-200 cursor-pointer">
                            <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-green-500 shadow-sm"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function HealthItem({ label, date, status, highlight, icon }) {
    return (
        <div className="flex justify-between items-center group">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-sm group-hover:bg-green-50 transition-colors">
                    {icon}
                </div>
                <span className="text-sm text-gray-600 font-medium group-hover:text-gray-900 transition-colors">{label}</span>
            </div>
            <div className="flex flex-col items-end">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${highlight ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                    {status}
                </span>
                <span className="text-[10px] text-gray-400 mt-0.5">{date}</span>
            </div>
        </div>
    );
}
