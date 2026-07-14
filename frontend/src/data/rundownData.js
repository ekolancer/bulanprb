// Rundown schedule data — swap ke API: GET /api/v1/rundown
export const rundownSchedule = {
  'Day 1': {
    label: 'Day 1',
    date: '13 Oktober 2025',
    tagline: 'Pembukaan & Pameran',
    items: [
      { id: 'r1-1', time: '08:00 - 09:30', title: 'Registrasi & Welcoming Drink', location: 'Main Lobby', status: 'Selesai', type: 'success', category: 'Registrasi', description: 'Proses pendaftaran ulang peserta, pembagian seminar kit, kartu pengenal, serta penyambutan dengan hidangan selamat datang.' },
      { id: 'r1-2', time: '09:30 - 11:30', title: 'Apel Kesiapsiagaan Bencana Nasional', location: 'Outdoor Plaza', status: 'Selesai', type: 'success', category: 'Seremonial', description: 'Upacara bendera dan apel kesiapan seluruh personel, relawan, serta peralatan penanggulangan bencana nasional.' },
      { id: 'r1-3', time: '11:30 - 13:00', title: 'Istirahat & Makan Siang', location: 'Dining Area', status: 'Selesai', type: 'success', category: 'Istirahat', description: 'Waktu istirahat, ibadah sholat, dan makan siang bersama di Dining Area.' },
      { id: 'r1-4', time: '13:00 - 15:30', title: 'Pembukaan Pameran Inovasi Kebencanaan', location: 'Exhibition Hall A', status: 'Selesai', type: 'success', category: 'Pameran', description: 'Pembukaan stan pameran inovasi teknologi kebencanaan terbaru dari instansi pemerintah, swasta, dan komunitas.' },
      { id: 'r1-5', time: '15:30 - 17:00', title: 'Sesi Foto & Media Nasional', location: 'Press Area', status: 'Selesai', type: 'success', category: 'Media', description: 'Konferensi pers bersama media nasional dan sesi dokumentasi resmi para tokoh serta panitia penyelenggara.' },
    ],
  },
  'Day 2': {
    label: 'Day 2',
    date: '14 Oktober 2025',
    tagline: 'Simulasi & Talkshow',
    items: [
      { id: 'r2-1', time: '08:30 - 09:00', title: 'Pembukaan Hari Kedua', location: 'Main Auditorium', status: 'Berlangsung', type: 'warning', category: 'Seremonial', description: 'Pembukaan rangkaian kegiatan hari kedua dengan pengantar jalannya sesi serta pengumuman penting bagi peserta.' },
      { id: 'r2-2', time: '09:00 - 12:00', title: 'Simulasi Kebakaran & Gempa Bumi', location: 'Area Simulasi A', status: 'Berlangsung', type: 'warning', category: 'Simulasi', description: 'Praktek lapangan simulasi evakuasi mandiri, pemadaman api awal, dan penanganan korban luka akibat gempa bumi.' },
      { id: 'r2-3', time: '12:00 - 13:30', title: 'Istirahat & Makan Siang', location: 'Dining Area', status: 'Akan Datang', type: 'info', category: 'Istirahat', description: 'Waktu istirahat, ibadah sholat, dan makan siang bersama di Dining Area.' },
      { id: 'r2-4', time: '13:30 - 16:30', title: 'Talkshow Kolaborasi Kebencanaan', location: 'Main Auditorium', status: 'Akan Datang', type: 'info', category: 'Talkshow', description: 'Diskusi panel interaktif bersama pakar dan praktisi tentang pentingnya sinergi pentahelix dalam mitigasi bencana.' },
      { id: 'r2-5', time: '16:30 - 18:00', title: 'Sharing Session: Mitigasi Komunitas', location: 'Meeting Room B', status: 'Akan Datang', type: 'info', category: 'Sharing', description: 'Berbagi cerita sukses dan praktik terbaik mengenai ketangguhan bencana berbasis masyarakat lokal.' },
    ],
  },
  'Day 3': {
    label: 'Day 3',
    date: '15 Oktober 2025',
    tagline: 'Penutupan & Komitmen',
    items: [
      { id: 'r3-1', time: '08:30 - 09:00', title: 'Pembukaan Hari Ketiga', location: 'Main Auditorium', status: 'Akan Datang', type: 'info', category: 'Seremonial', description: 'Pembukaan rangkaian kegiatan hari ketiga dengan pengantar jalannya sesi serta pengumuman penting bagi peserta.' },
      { id: 'r3-2', time: '09:00 - 11:30', title: 'Sharing Session Relawan Muda', location: 'Meeting Room C', status: 'Akan Datang', type: 'info', category: 'Sharing', description: 'Sesi diskusi dan berbagi pengalaman oleh para relawan muda dalam menghadapi dinamika di lapangan.' },
      { id: 'r3-3', time: '11:30 - 13:00', title: 'Istirahat & Makan Siang', location: 'Dining Area', status: 'Akan Datang', type: 'info', category: 'Istirahat', description: 'Waktu istirahat, ibadah sholat, dan makan siang bersama di Dining Area.' },
      { id: 'r3-4', time: '13:00 - 15:00', title: 'Penandatanganan Komitmen Bersama', location: 'Main Hall', status: 'Akan Datang', type: 'info', category: 'Seremonial', description: 'Prosesi penandatanganan dokumen nota kesepahaman dan komitmen pengurangan risiko bencana oleh para pemangku kepentingan.' },
      { id: 'r3-5', time: '15:00 - 17:00', title: 'Closing Ceremony & Penutupan Resmi', location: 'Main Auditorium', status: 'Akan Datang', type: 'info', category: 'Seremonial', description: 'Seremoni penutupan resmi acara Bulan PRB 2026, penyampaian apresiasi, dan pembacaan doa bersama.' },
    ],
  },
};

export const rundownDays = Object.keys(rundownSchedule);
