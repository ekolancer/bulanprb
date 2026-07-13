// Mitra & sponsor data — swap ke API: GET /api/v1/partners
export const mitraUtama = [
  { id: 1, name: 'BNPB', fullName: 'Badan Nasional Penanggulangan Bencana', tier: 'utama' },
  { id: 2, name: 'Bappenas', fullName: 'Kementerian PPN / Bappenas', tier: 'utama' },
  { id: 3, name: 'Basarnas', fullName: 'Badan Nasional Pencarian & Pertolongan', tier: 'utama' },
  { id: 4, name: 'BMKG', fullName: 'Badan Meteorologi, Klimatologi, dan Geofisika', tier: 'utama' },
];

export const mitraStrategis = [
  { id: 5, name: 'PMI', fullName: 'Palang Merah Indonesia', tier: 'strategis' },
  { id: 6, name: 'PVMBG', fullName: 'Pusat Vulkanologi & Mitigasi Bencana Geologi', tier: 'strategis' },
  { id: 7, name: 'BPBD DKI', fullName: 'BPBD Provinsi DKI Jakarta', tier: 'strategis' },
  { id: 8, name: 'LIPI', fullName: 'Lembaga Ilmu Pengetahuan Indonesia', tier: 'strategis' },
  { id: 9, name: 'UN OCHA', fullName: 'UN Office for Coordination of Humanitarian Affairs', tier: 'strategis' },
  { id: 10, name: 'UNDP', fullName: 'United Nations Development Programme', tier: 'strategis' },
];

export const mitraPendukung = [
  { id: 11, name: 'Pertamina', fullName: 'PT Pertamina (Persero)', tier: 'pendukung' },
  { id: 12, name: 'Telkom', fullName: 'PT Telkom Indonesia', tier: 'pendukung' },
  { id: 13, name: 'BRI', fullName: 'Bank Rakyat Indonesia', tier: 'pendukung' },
  { id: 14, name: 'PLN', fullName: 'PT PLN (Persero)', tier: 'pendukung' },
  { id: 15, name: 'Garuda', fullName: 'PT Garuda Indonesia', tier: 'pendukung' },
];

// Combined flat list for marquee
export const allMitra = [...mitraUtama, ...mitraStrategis, ...mitraPendukung];
