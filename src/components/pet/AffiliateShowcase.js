export default function AffiliateShowcase() {
    return (
        <section className="px-4 mb-4">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-800 font-black flex items-center gap-2">
                    <span>⭐</span> Karabaş'ın Favorileri
                </h3>
                <span className="text-[9px] bg-gray-200 text-gray-500 font-bold px-2 py-1 rounded-lg uppercase tracking-wider">SPONSORLU</span>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-6 pl-1 no-scrollbar">
                <ProductCard name="Purina Pro Plan" image="https://placehold.co/100x120?text=Food" price="850₺" />
                <ProductCard name="Tırtıklı Top" image="https://placehold.co/100x120?text=Toy" price="150₺" />
                <ProductCard name="Kırmızı Tasma" image="https://placehold.co/100x120?text=Leash" price="220₺" />
            </div>
        </section>
    );
}

function ProductCard({ name, image, price }) {
    return (
        <div className="min-w-[140px] bg-white rounded-[20px] p-3 flex flex-col items-center shadow-soft border border-white hover:scale-105 transition-transform duration-300">
            <div className="w-full h-28 bg-gray-50 rounded-xl mb-3 flex items-center justify-center overflow-hidden">
                <img src={image} className="h-full object-contain mix-blend-multiply opacity-80" />
            </div>
            <span className="text-xs font-bold text-gray-700 text-center line-clamp-1 mb-1">{name}</span>
            <span className="text-sm font-black text-orange-500">{price}</span>
            <button className="w-full bg-orange-100 text-orange-600 text-[10px] font-bold mt-3 py-2 rounded-lg hover:bg-orange-500 hover:text-white transition-colors uppercase tracking-wide">
                Sepete Ekle
            </button>
        </div>
    );
}
