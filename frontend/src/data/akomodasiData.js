// Shuttle bus data — swap ke API: GET /api/v1/shuttle
export const shuttleSchedule = {
  'D-1': {
    label: 'D-1',
    date: '12 Oktober 2025',
    description: 'Hari kedatangan peserta dari luar kota',
    routes: [
      {
        id: 's1-1',
        type: 'Hi-Ace Armada A',
        route: 'Bandara Soekarno-Hatta ➔ Hotel Area Kemayoran',
        times: ['12:00', '15:00', '18:00', '21:00'],
        capacity: 14,
        note: 'Tunggu di pintu kedatangan Terminal 3',
      },
      {
        id: 's1-2',
        type: 'Bus BNPB Armada B',
        route: 'Stasiun Gambir ➔ Hotel Area Kemayoran',
        times: ['10:00', '14:00', '17:00', '20:00'],
        capacity: 45,
        note: 'Kumpul di depan pintu utara Stasiun Gambir',
      },
    ],
  },
  'D0': {
    label: 'D0',
    date: '13–15 Oktober 2025',
    description: 'Hari-hari pelaksanaan acara puncak',
    routes: [
      {
        id: 's2-1',
        type: 'Hi-Ace Armada A',
        route: 'Stasiun Gambir ➔ Gedung BNPB',
        times: ['07:00', '08:00', '09:00'],
        capacity: 14,
        note: 'Hadir 15 menit sebelum keberangkatan, tunjukkan badge QR',
      },
      {
        id: 's2-2',
        type: 'Bus BNPB Armada B',
        route: 'Terminal Kampung Rambutan ➔ Gedung BNPB',
        times: ['07:30', '08:30', '10:00'],
        capacity: 45,
        note: 'Kumpul di area peron utama terminal',
      },
      {
        id: 's2-3',
        type: 'Bus BNPB Armada C',
        route: 'Halte TransJakarta Cempaka Putih ➔ Gedung BNPB',
        times: ['07:00', '08:30', '10:00'],
        capacity: 45,
        note: 'Lokasi tepat di depan halte arah Pulogadung',
      },
    ],
  },
  'D+1': {
    label: 'D+1',
    date: '16 Oktober 2025',
    description: 'Hari kepulangan peserta',
    routes: [
      {
        id: 's3-1',
        type: 'Hi-Ace Armada A',
        route: 'Hotel Area Kemayoran ➔ Bandara Soekarno-Hatta',
        times: ['06:00', '09:00', '12:00'],
        capacity: 14,
        note: 'Penjemputan langsung di lobby hotel masing-masing',
      },
      {
        id: 's3-2',
        type: 'Bus BNPB Armada B',
        route: 'Gedung BNPB ➔ Stasiun Gambir',
        times: ['08:00', '11:00', '14:00'],
        capacity: 45,
        note: 'Kumpul di pintu utama Gedung BNPB',
      },
    ],
  },
};

export const shuttleDays = Object.keys(shuttleSchedule);

export const shuttleNotes = [
  'Harap bersiap di titik penjemputan 15 menit sebelum jam keberangkatan.',
  'Tunjukkan badge identitas/pendaftaran (QR Code) kepada petugas bus.',
  'Layanan ini gratis dan tidak dipungut biaya apa pun.',
  'Konfirmasi keberangkatan via WhatsApp panitia: +62 812-0000-1234.',
];

export const mapsUrl = 'https://maps.google.com';

// Accommodation data — swap ke API: GET /api/v1/accommodations
export const hotels = [
  {
    id: 1,
    name: 'Grand Mercure Jakarta Kemayoran',
    category: 'Hotel',
    stars: 5,
    address: 'Jl. HBR Motik, Kemayoran, Jakarta Pusat',
    priceMin: 1100000,
    priceMax: 1800000,
    distanceKm: 2.5,
    rating: 4.7,
    phone: '+62 21-9121-0000',
    photo: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400',
    recommended: true,
    amenities: ['WiFi', 'Parkir', 'Kolam Renang', 'Restoran', 'Gym'],
  },
  {
    id: 2,
    name: 'Swiss-Belinn Kemayoran',
    category: 'Hotel',
    stars: 4,
    address: 'Jl. Complex Kemayoran, Jakarta Pusat',
    priceMin: 650000,
    priceMax: 950000,
    distanceKm: 3.1,
    rating: 4.4,
    phone: '+62 21-8271-9999',
    photo: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=400',
    recommended: false,
    amenities: ['WiFi', 'Parkir', 'Restoran'],
  },
  {
    id: 3,
    name: 'Ibis Jakarta Kemayoran',
    category: 'Hotel',
    stars: 3,
    address: 'Jl. Bungur Besar Raya, Jakarta Pusat',
    priceMin: 450000,
    priceMax: 700000,
    distanceKm: 2.8,
    rating: 4.3,
    phone: '+62 21-4227-5555',
    photo: 'https://images.unsplash.com/photo-1549294413-26f195afcbce?auto=format&fit=crop&q=80&w=400',
    recommended: false,
    amenities: ['WiFi', 'Parkir', 'Restoran'],
  },
  {
    id: 4,
    name: 'Kemayoran Cozy Guest House',
    category: 'Guest House',
    stars: 0,
    address: 'Jl. Utan Panjang No. 12, Jakarta Pusat',
    priceMin: 250000,
    priceMax: 400000,
    distanceKm: 1.2,
    rating: 4.2,
    phone: '+62 812-3456-7890',
    photo: 'https://images.unsplash.com/photo-1582719478250-c89cae4db85b?auto=format&fit=crop&q=80&w=400',
    recommended: false,
    amenities: ['WiFi', 'AC'],
  },
  {
    id: 5,
    name: 'Homestay Kenari Indah',
    category: 'Homestay',
    stars: 0,
    address: 'Jl. Kenari Baru No. 4, Jakarta Timur',
    priceMin: 180000,
    priceMax: 250000,
    distanceKm: 1.8,
    rating: 4.1,
    phone: '+62 899-8877-6655',
    photo: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&q=80&w=400',
    recommended: false,
    amenities: ['WiFi', 'Dapur Bersama'],
  },
  {
    id: 6,
    name: 'Griya Peserta PRB',
    category: 'Homestay',
    stars: 0,
    address: 'Jl. Senen Raya No. 88, Jakarta Pusat',
    priceMin: 150000,
    priceMax: 220000,
    distanceKm: 2.0,
    rating: 4.0,
    phone: '+62 811-2233-4455',
    photo: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&q=80&w=400',
    recommended: false,
    amenities: ['WiFi'],
  },
];

export const hotelCategories = ['Semua', 'Hotel', 'Guest House', 'Homestay'];

export const priceRanges = [
  { label: 'Semua Harga', min: 0, max: Infinity },
  { label: '< Rp 300rb', min: 0, max: 300000 },
  { label: 'Rp 300rb – 700rb', min: 300000, max: 700000 },
  { label: 'Rp 700rb – 1,2jt', min: 700000, max: 1200000 },
  { label: '> Rp 1,2jt', min: 1200000, max: Infinity },
];

export const sortOptions = [
  { label: 'Terdekat', value: 'distance' },
  { label: 'Harga Terendah', value: 'price_asc' },
  { label: 'Harga Tertinggi', value: 'price_desc' },
  { label: 'Rating Terbaik', value: 'rating' },
];
