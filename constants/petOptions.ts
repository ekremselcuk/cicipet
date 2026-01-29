export const PET_CATEGORIES = [
    { id: 'kedi', label: 'Kedi', icon: 'pets' },
    { id: 'kopek', label: 'Köpek', icon: 'cruelty_free' },
    { id: 'kus', label: 'Kuş', icon: 'raven' }, // 'raven' or 'bird' if available, using standard
    { id: 'surungen', label: 'Sürüngen', icon: ' Pest_Control' }, // Substitute icon
    { id: 'diger', label: 'Diğer', icon: 'more_horiz' },
];

export const PET_BREEDS: Record<string, string[]> = {
    kedi: [
        'Tekir', 'Siyam', 'British Shorthair', 'Ankara Kedisi', 'Van Kedisi',
        'Scottish Fold', 'İran Kedisi', 'Bombay', 'Birman', 'Ragdoll', 'Diğer'
    ],
    kopek: [
        'Golden Retriever', 'Labrador', 'Teriyer', 'Bulldog', 'Kangal',
        'Alman Kurdu', 'Husky', 'Chihuahua', 'Poodle', 'Rottweiler', 'Diğer'
    ],
    kus: [
        'Muhabbet Kuşu', 'Kanarya', 'Papağan', 'Bülbül', 'Güvercin',
        'İspinoz', 'Sultan Papağanı', 'Jako', 'Cennet Papağanı', 'Zebra İspinozu', 'Diğer'
    ],
    surungen: [
        'Kaplumbağa', 'İguana', 'Bukalemun', 'Geko', 'Yılan',
        'Kertenkele', 'Sakallı Ejder', 'Su Kaplumbağası', 'Top Piton', 'Mısır Yılanı', 'Diğer'
    ],
    diger: ['Diğer']
};
