// Rundown schedule data — swap ke API: GET /api/v1/rundown
export const rundownSchedule = {
  'Day 1': {
    label: 'Day 1',
    date: '13 Oktober 2025',
    tagline: 'Pembukaan & Pameran',
    items: [
      { id: 'r1-1', time: '08:00 - 09:30', title: 'Registrasi & Welcoming Drink', location: 'Main Lobby', status: 'Selesai', type: 'success', category: 'Registrasi' },
      { id: 'r1-2', time: '09:30 - 11:30', title: 'Apel Kesiapsiagaan Bencana Nasional', location: 'Outdoor Plaza', status: 'Selesai', type: 'success', category: 'Seremonial' },
      { id: 'r1-3', time: '11:30 - 13:00', title: 'Istirahat & Makan Siang', location: 'Dining Area', status: 'Selesai', type: 'success', category: 'Istirahat' },
      { id: 'r1-4', time: '13:00 - 15:30', title: 'Pembukaan Pameran Inovasi Kebencanaan', location: 'Exhibition Hall A', status: 'Selesai', type: 'success', category: 'Pameran' },
      { id: 'r1-5', time: '15:30 - 17:00', title: 'Sesi Foto & Media Nasional', location: 'Press Area', status: 'Selesai', type: 'success', category: 'Media' },
    ],
  },
  'Day 2': {
    label: 'Day 2',
    date: '14 Oktober 2025',
    tagline: 'Simulasi & Talkshow',
    items: [
      { id: 'r2-1', time: '08:30 - 09:00', title: 'Pembukaan Hari Kedua', location: 'Main Auditorium', status: 'Berlangsung', type: 'warning', category: 'Seremonial' },
      { id: 'r2-2', time: '09:00 - 12:00', title: 'Simulasi Kebakaran & Gempa Bumi', location: 'Area Simulasi A', status: 'Berlangsung', type: 'warning', category: 'Simulasi' },
      { id: 'r2-3', time: '12:00 - 13:30', title: 'Istirahat & Makan Siang', location: 'Dining Area', status: 'Akan Datang', type: 'info', category: 'Istirahat' },
      { id: 'r2-4', time: '13:30 - 16:30', title: 'Talkshow Kolaborasi Kebencanaan', location: 'Main Auditorium', status: 'Akan Datang', type: 'info', category: 'Talkshow' },
      { id: 'r2-5', time: '16:30 - 18:00', title: 'Sharing Session: Mitigasi Komunitas', location: 'Meeting Room B', status: 'Akan Datang', type: 'info', category: 'Sharing' },
    ],
  },
  'Day 3': {
    label: 'Day 3',
    date: '15 Oktober 2025',
    tagline: 'Penutupan & Komitmen',
    items: [
      { id: 'r3-1', time: '08:30 - 09:00', title: 'Pembukaan Hari Ketiga', location: 'Main Auditorium', status: 'Akan Datang', type: 'info', category: 'Seremonial' },
      { id: 'r3-2', time: '09:00 - 11:30', title: 'Sharing Session Relawan Muda', location: 'Meeting Room C', status: 'Akan Datang', type: 'info', category: 'Sharing' },
      { id: 'r3-3', time: '11:30 - 13:00', title: 'Istirahat & Makan Siang', location: 'Dining Area', status: 'Akan Datang', type: 'info', category: 'Istirahat' },
      { id: 'r3-4', time: '13:00 - 15:00', title: 'Penandatanganan Komitmen Bersama', location: 'Main Hall', status: 'Akan Datang', type: 'info', category: 'Seremonial' },
      { id: 'r3-5', time: '15:00 - 17:00', title: 'Closing Ceremony & Penutupan Resmi', location: 'Main Auditorium', status: 'Akan Datang', type: 'info', category: 'Seremonial' },
    ],
  },
};

export const rundownDays = Object.keys(rundownSchedule);
