export default function AffiliateShowcase() {
    return (
        <section className="px-4 mb-8">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <span>⭐</span> Karabaş'ın Favorileri
                <span className="text-[10px] bg-red-600 text-white px-1.5 rounded ml-auto">SPONSOR</span>
            </h3>

            <div className="flex gap-4 overflow-x-auto pb-4">
                <ProductCard name="Purina Pro Plan" image="https://placehold.co/100x120?text=Food" price="850₺" />
                <ProductCard name="Tırtıklı Top" image="https://placehold.co/100x120?text=Toy" price="150₺" />
                <ProductCard name="Kırmızı Tasma" image="https://placehold.co/100x120?text=Leash" price="220₺" />
            </div>
        </section>
    );
}

function ProductCard({ name, image, price }) {
    return (
        <div className="min-w-[120px] bg-white text-black rounded-xl p-2 flex flex-col items-center">
            <img src={image} className="w-full h-24 object-contain mb-2" />
            <span className="text-xs font-bold text-center line-clamp-1">{name}</span>
            <span className="text-sm font-black text-gold-primary bg-black px-2 rounded mt-1">{price}</span>
            <button className="w-full bg-gray-200 text-[10px] font-bold mt-2 py-1 rounded hover:bg-gold-primary transition-colors">
                Satın Al
            </button>
        </div>
    );
}
