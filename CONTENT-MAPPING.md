# Content Mapping — Bulan PRB 2026 (Frontend → CMS Filament)

Dokumen ini memetakan seluruh konten yang saat ini di-hardcode/statis di frontend React
(`frontend/src/data/*.js` dan `frontend/src/sections/*.jsx`) ke struktur CMS di backend
Laravel + Filament. Prinsip: **1 section frontend = 1 menu/Filament Resource** di admin panel.

Sumber analisis: seluruh file di `frontend/src/data/` dan `frontend/src/sections/`, dicek
silang dengan `frontend/src/pages/` untuk tahu section mana dipakai di halaman mana.

---

## Peta Halaman → Section

| Halaman | Route | Section (urutan render) |
|---|---|---|
| LandingPage | `/` | Hero → Countdown → GerakanPRB → PuncakPeringatan → RoadToPRB → PRBTahunKeTahun → MitraSponsor → FAQ |
| RundownPage | `/rundown` | RundownKegiatan → SharingSession → PembicaraUtama → ShuttleBus → Akomodasi |
| AkomodasiPage | `/akomodasi` (nonaktif di navbar) | ShuttleBus → Akomodasi |
| MediaCenterPage | `/media-center` | GaleriFoto → TwibbonAjakan → KumpulanDokumen |
| Layout global | semua halaman | Navbar, Footer |

`ShuttleBus` dan `Akomodasi` dipakai di 2 halaman tapi 1 sumber data — tidak duplikasi di CMS.

---

## Keputusan Arsitektur (baca dulu sebelum implementasi)

Bagian ini mengunci pola teknis yang berlaku lintas-section, supaya implementasi konsisten
dan tidak mengulang keputusan yang sama di tiap resource.

### AR-1. Pola Singleton — pakai Settings, bukan Resource 1-baris
Untuk section yang hanya punya satu record (Hero, Countdown, GerakanPRB, PuncakPeringatan,
TwibbonAjakan, header RoadToPRB/PRBTahunKeTahun, Footer/Site Settings), **jangan** bikin
Filament Resource biasa — Resource dengan 1 baris canggung (admin lihat tabel isi 1 row,
tombol "New" harus disembunyikan, bisa terhapus tak sengaja).

Pilihan yang benar:
- **`spatie/laravel-settings`** + Filament Settings Page — cocok untuk config global
  (Site Settings, event date, kontak footer). Tersimpan sebagai key-value, type-safe via
  Settings class.
- **Custom Filament Page dengan form** (single record model + `mutateFormDataBeforeSave`) —
  cocok untuk singleton per-section yang punya banyak field (Hero, Puncak, Twibbon).

Rekomendasi: satukan semua teks/config global ke **satu Settings page** dan singleton
per-section ke Page kustomnya masing-masing. Hindari 10+ tabel singleton mikro.

### AR-2. Section header → jangan bikin singleton mikro per section
RoadToPRB, PRBTahunKeTahun, MitraSponsor, FAQ punya "header" (badge + heading + description)
terpisah dari list itemnya. Bikin singleton sendiri untuk tiap header = belasan tabel/Page
kecil yang membengkakkan admin.

Pilihan: **satu tabel `section_headers`** generik berpola key → (badge, heading, description),
di-query per section key di frontend. Trade-off: kurang type-safe, tapi jauh lebih sedikit
boilerplate dan satu menu admin ("Teks Header Section") mengelola semua. Dipakai untuk semua
teks header yang bukan bagian dari singleton section utuh.

### AR-3. Navigation Group — cegah sidebar membengkak
18 section → jangan jadi 18 menu datar. Kelompokkan dengan Filament `NavigationGroup`:

| Group | Isi |
|---|---|
| **Landing Page** | Hero, Countdown, Gerakan PRB, Puncak Peringatan, Road to PRB, PRB History, Mitra, FAQ |
| **Halaman Rundown** | Rundown Days, Sharing Sessions, Pembicara, Shuttle |
| **Akomodasi** | Hotels |
| **Media Center** | Galeri Foto, Twibbon, Dokumen |
| **Pengaturan** | Site Settings, Section Headers, User & Role |

### AR-4. Kolom `sort` wajib eksplisit untuk reorder
Filament reorder **tidak otomatis** — butuh kolom integer di migration + `->reorderable('sort')`
di tabel + `->defaultSort('sort')`. Setiap tabel list (Road to PRB Items, Mitra, FAQ, Speakers,
Gallery, Documents, Rundown/Shuttle Items, PRB Images) **wajib** punya kolom `sort` (unsigned
integer, default 0).

### AR-5. Kolom `is_active` (publish/unpublish) di semua tabel list
Best practice CMS: admin bisa menyembunyikan konten tanpa menghapus. Setiap tabel list **wajib**
punya `is_active` (boolean, default true). Frontend/API hanya mengembalikan `where('is_active', true)`.
Untuk singleton, flag ini opsional (biasanya section selalu tampil).

### AR-6. Desain API — endpoint agregat per halaman, bukan per-resource
Landing page merender 8 section sekaligus. Kalau tiap section fetch endpoint sendiri = 8 request
+ 8 round-trip. Pola yang tepat untuk situs konten (read-heavy, jarang berubah):

- **Endpoint agregat per halaman**, kembalikan semua section halaman itu dalam 1 response:
  - `GET /api/v1/pages/landing`
  - `GET /api/v1/pages/rundown`
  - `GET /api/v1/pages/media-center`
- **Cache** response di sisi Laravel (mis. `Cache::remember`, di-flush saat admin save konten
  lewat Filament observer/event) — response konten praktis statis antar edit.
- Bungkus dengan **API Resource** (`JsonResource`) untuk kontrol bentuk output, jangan expose
  model mentah.
- Endpoint per-resource (`/api/v1/faqs` dst) tetap boleh disediakan kalau nanti ada kebutuhan
  fetch granular, tapi bukan jalur utama untuk render halaman.

### AR-7. Konvensi umum
- Semua tabel pakai `timestamps` Laravel; kolom tanggal konten pakai tipe `date`/`datetime`
  asli (bukan string), format tampilan di frontend.
- Semua `FileUpload` disimpan via Laravel filesystem (`disk` `public` untuk dev, S3-compatible
  untuk production), URL via `Storage::url()` — tidak ada path hardcode.
- Enum (category, tier, status) pakai PHP `enum` + cast Eloquent, bukan string bebas.

---

## Legenda Tipe Data

- **Singleton** — satu record per section. Implementasi: Settings page / custom Page (lihat AR-1), **bukan** Resource 1-baris
- **Repeater/List** — banyak baris, Filament Resource biasa; wajib kolom `sort` (AR-4) + `is_active` (AR-5)
- **Relasi** — tabel terpisah + foreign key, bukan JSON column
- **Config/UI-only** — bukan konten editorial, tetap hardcode di frontend

---

## 1. Hero — `sections/Hero.jsx`

**Status saat ini:** murni visual (background image + parallax + scroll indicator), tidak render field data dinamis apa pun. `heroData.js` (heroConfig, heroStats) ada tapi **tidak dipakai** oleh komponen ini — orphan data.

**Rekomendasi CMS (Singleton — "Hero Section"):**

| Field | Tipe Filament | Keterangan |
|---|---|---|
| `background_image` | FileUpload (image) | ganti `/hero.jpeg` hardcoded |
| `title` | TextInput | dari `heroConfig.title` (orphan, aktifkan) |
| `tagline` | TextInput | dari `heroConfig.tagline` |
| `description` | Textarea | dari `heroConfig.description` |
| `event_date` | DateTimePicker | **satukan dengan Countdown** — lihat catatan konsistensi di bawah |
| `location`, `venue` | TextInput | dari `heroConfig` |

**Keputusan diperlukan:** `heroStats` (4 statistik: peserta terdaftar, dst) saat ini tidak dirender di UI. Aktifkan di frontend dulu sebelum dibuatkan resource CMS, atau drop.

**Asset:** `/hero.jpeg` (public lokal) → pindah ke Filament media upload. Ada dead import `../assets/hero.png` di kode, tidak terpakai — bisa dihapus saat refactor.

---

## 2. Countdown — `sections/Countdown.jsx`

**Status saat ini:** semua hardcoded inline (tanggal target, quote, 3 baris judul).

**Rekomendasi CMS (Singleton — "Countdown Section"):**

| Field | Tipe Filament | Keterangan |
|---|---|---|
| `event_target_date` | DateTimePicker | **WAJIB jadi satu source of truth** dengan Hero — saat ini `2026-10-13T09:00:00` di sini vs `2025-...` di heroData.js. Pertimbangkan simpan di tabel `site_settings` global, dipakai bersama Hero & Countdown |
| `quote_text` | TextInput | "NGARIKSA BUMI BANTEN" |
| `title_line_1/2/3` | TextInput ×3 | "Peringatan Bulan" / "Pengurangan Risiko Bencana (PRB)" / "Tahun 2026" |

**Asset:** tidak ada gambar.

---

## 3. GerakanPRB — `sections/GerakanPRB.jsx` + `data/gerakanData.js`

**Rekomendasi CMS (Singleton — "Gerakan PRB Section"):**

| Field | Tipe Filament | Keterangan |
|---|---|---|
| `heading`, `description` | TextInput, Textarea | saat ini hardcoded di JSX, belum di data file |
| `kobo_form_url` | TextInput (url) | link tombol "Daftar Gerakan PRB" |
| `kobo_dashboard_url` | TextInput (url) | src iframe dashboard |

**Orphan — tidak dirender di UI saat ini, putuskan dulu:**
- `gerakanStats` (4 statistik: label, value, icon, color)
- `gerakanBenefits` (3 poin manfaat)

Jangan buat field CMS untuk ini sampai frontend benar-benar merender-nya.

**Asset:** tidak ada gambar, hanya iframe eksternal KoboToolbox.

---

## 4. PuncakPeringatan — `sections/PuncakPeringatan.jsx`

**Status saat ini:** semua hardcoded, tidak ada file data. Video src masih placeholder (`dQw4w9WgXcQ` — Rick Astley, dummy).

**Rekomendasi CMS (Singleton — "Puncak Peringatan Section"):**

| Field | Tipe Filament | Keterangan |
|---|---|---|
| `badge_text` | TextInput | "Kaleidoskop" |
| `heading` | TextInput | |
| `description` | Textarea | |
| `youtube_embed_url` | TextInput (url) | **ganti dummy video sebelum go-live** |
| `thumbnail_image` | FileUpload (image) | saat ini URL Unsplash placeholder |

---

## 5. RoadToPRB — `sections/RoadToPRB.jsx` + `data/roadToPRBData.js`

**Rekomendasi CMS:**

**Singleton (header section):** `badge_text` ("Galeri"), `heading` ("Road to PRB"), `description`. Pakai `section_headers` generik (AR-2), bukan tabel sendiri.

**Resource "Road to PRB Items" (Repeater/List, max 16 di frontend):**

| Field | Tipe Filament | Keterangan |
|---|---|---|
| `image` | FileUpload (image) | ganti URL Unsplash |
| `caption` | TextInput | |
| `location` | TextInput | |
| `event_date` | DatePicker | data asli string bebas ("Agustus 2025") — pakai date asli, format di frontend (AR-7) |
| `category` | Select (PHP enum) | Edukasi/Pelatihan/Forum/Lingkungan/Koordinasi, dst |
| `sort` | integer + `reorderable('sort')` | urutan tampil di carousel (AR-4) |
| `is_active` | boolean | publish/unpublish (AR-5) |

**Asset:** 8 URL Unsplash placeholder → wajib diganti foto asli + upload storage.

---

## 6. PRBTahunKeTahun — `sections/PRBTahunKeTahun.jsx` + `data/prbHistoryData.js`

**Relasi wajib tabel terpisah** (bukan JSON): satu tahun PRB punya banyak foto (one-to-many), butuh CRUD granular per foto + reorder.

**Resource "PRB History" (tabel `prb_histories`):**

| Field | Tipe Filament |
|---|---|
| `year` | TextInput / number |
| `theme` | TextInput |
| `location` | TextInput |
| `description` | Textarea |

**Sub-resource / Relation Manager "Images" (tabel `prb_history_images`, FK `prb_history_id`):**

| Field | Tipe Filament |
|---|---|
| `image` | FileUpload (image) |
| `caption` | TextInput |
| `sort` | integer + reorderable (AR-4) |
| `is_active` | boolean (AR-5) |

Singleton header section: `badge_text` ("Rekam Jejak"), `heading` ("PRB Dari Tahun ke Tahun") — pakai `section_headers` generik (AR-2).

**Asset:** ~10 URL Unsplash placeholder di 4 tahun → migrasi storage + foto asli.

---

## 7. MitraSponsor — `sections/MitraSponsor.jsx` + `data/mitraData.js`

**Rekomendasi CMS — 1 tabel `mitra` dengan kolom `tier` (bukan 3 tabel terpisah, field identik):**

| Field | Tipe Filament | Keterangan |
|---|---|---|
| `name` | TextInput | singkatan, mis. "BNPB" |
| `full_name` | TextInput | |
| `tier` | Select (enum: utama/strategis/pendukung) | |
| `logo` | FileUpload (image) | **field baru** — saat ini UI cuma render inisial huruf, tidak ada logo asli sama sekali. Perlu keputusan: aktifkan logo asli di frontend atau biarkan inisial |
| `order` | reorder | |

**Catatan:** `mitraPendukung` ada di data tapi tidak dirender sebagai grid sendiri, hanya masuk ke marquee gabungan — pastikan resource CMS tetap mendukung tier ini walau saat ini cuma tampil di marquee.

---

## 8. FAQ — `sections/FAQ.jsx` + `data/faqData.js`

**Resource "FAQ Items" (tabel `faq_items`):**

| Field | Tipe Filament |
|---|---|
| `category` | Select (enum) — dari `faqCategories`: Umum/Pendaftaran/Transportasi/Sertifikasi/Teknis/Acara |
| `question` | TextInput |
| `answer` | Textarea / RichEditor |
| `order` | reorder |

**Catatan:** `faqCategories` (list filter) ada di data tapi filter kategori **tidak dirender** di FAQ.jsx saat ini — field `category` per item tetap disimpan, tapi keputusan aktifkan filter di frontend menyusul terpisah.

**Perbaikan data saat ini:** jawaban FAQ menyebut "Bulan PRB 2025", tidak sinkron dengan tahun 2026 di section lain — perbaiki saat migrasi konten.

---

## 9. RundownKegiatan — `sections/RundownKegiatan.jsx` + `data/rundownData.js`

**Relasi wajib tabel terpisah** — Day → Items adalah one-to-many, admin perlu reorder/CRUD item individual.

**Resource "Rundown Days" (tabel `rundown_days`):**

| Field | Tipe Filament |
|---|---|
| `label` | TextInput ("Day 1") |
| `date` | DatePicker |
| `tagline` | TextInput |
| `order` | reorder |

**Relation Manager "Items" (tabel `rundown_items`, FK `rundown_day_id`):**

| Field | Tipe Filament | Keterangan |
|---|---|---|
| `time` | TextInput ("08:00 - 09:30") atau 2x TimePicker | |
| `title` | TextInput | |
| `location` | TextInput | |
| `status` | Select (Selesai/Berlangsung/Akan Datang) | pertimbangkan **computed dari waktu real** bukan manual, tapi butuh keputusan produk |
| `category` | Select (enum, warna badge) | Registrasi/Seremonial/Pameran, dst |
| `description` | Textarea | |
| `order` | reorder | |

**Catatan konsistensi:** field `type` (success/warning/info) di data asli redundant dengan `status` — cukup satu field, derive warna badge dari `status` di frontend, jangan duplikasi di CMS.

---

## 10. SharingSession — `sections/SharingSession.jsx` + `data/speakerData.js`

**Relasi wajib many-to-many** — satu sesi bisa banyak pembicara, satu pembicara isi banyak sesi. Wajib pivot table, bukan array JSON `speakerIds`.

**Resource "Sharing Sessions" (tabel `sharing_sessions`):**

| Field | Tipe Filament |
|---|---|
| `theme` | TextInput |
| `day` | Select — **relasi ke `rundown_days`**, bukan string bebas, supaya konsisten dengan Rundown |
| `time` | TextInput |
| `location` | TextInput |
| `description` | Textarea |
| `speakers` | Select multiple / Relation (pivot ke resource Pembicara #11) |
| `tags` | TagsInput (array string sederhana, cukup JSON, tidak perlu tabel kecuali butuh filter tag di masa depan) |

---

## 11. PembicaraUtama — `sections/PembicaraUtama.jsx` + `data/speakerData.js`

**Resource "Pembicara" (tabel `speakers`)** — tabel master, di-reference oleh Sharing Session di atas:

| Field | Tipe Filament | Keterangan |
|---|---|---|
| `name` | TextInput | |
| `title` | TextInput | jabatan |
| `institution` | TextInput | |
| `photo` | FileUpload (image) | ganti URL Unsplash — **foto personal, sebaiknya di-hosting sendiri, jangan tergantung pihak ketiga** |
| `bio` | Textarea | **orphan** — ada di data tapi tidak dirender di UI manapun, aktifkan dulu di frontend atau drop field |
| `topics` | TagsInput | **orphan juga**, sama seperti bio |
| `day` | Select — relasi ke `rundown_days` | |

---

## 12. ShuttleBus — `sections/ShuttleBus.jsx` + `data/akomodasiData.js`

**Relasi wajib tabel terpisah** — Day → Routes one-to-many, admin update per-armada individual.

**Resource "Shuttle Days" (tabel `shuttle_days`):**

| Field | Tipe Filament |
|---|---|
| `label` | TextInput ("D-1", "D0", "D+1") |
| `date` | DatePicker |
| `description` | TextInput |

**Relation Manager "Routes" (tabel `shuttle_routes`, FK `shuttle_day_id`):**

| Field | Tipe Filament |
|---|---|
| `type` | TextInput ("Hi-Ace Armada A") |
| `plate_number` | TextInput |
| `from`, `to` | TextInput |
| `departure_time` | TimePicker |
| `capacity` | TextInput (number) |
| `contact` | TextInput (nomor WA) |
| `note` | Textarea |

**Orphan — tidak dipakai di UI saat ini:** `shuttleNotes` (4 catatan umum), `mapsUrl` (generik, belum spesifik). Putuskan aktivasi dulu sebelum bikin field CMS.

---

## 13. Akomodasi — `sections/Akomodasi.jsx` + `data/akomodasiData.js`

**Resource "Hotels" (tabel `hotels`):**

| Field | Tipe Filament |
|---|---|
| `name` | TextInput |
| `category` | Select (Hotel/Guest House/Homestay) |
| `stars` | TextInput (number, 0 jika bukan hotel berbintang) |
| `address` | Textarea |
| `price_min`, `price_max` | TextInput (number/currency) |
| `distance_km` | TextInput (number) |
| `rating` | TextInput (decimal) |
| `phone` | TextInput |
| `photo` | FileUpload (image) |
| `recommended` | Toggle (boolean) |
| `amenities` | TagsInput (array string, cukup JSON) |

**Config/UI-only, TIDAK perlu CMS** (filter statis di frontend): `hotelCategories`, `sortOptions`.
**`priceRanges`** juga UI-only, tapi **perbaiki bug data**: `max: Infinity` tidak valid untuk JSON/DB, ganti `null` atau angka besar kalau nanti tetap dipindah ke CMS.

---

## 14. GaleriFoto — `sections/GaleriFoto.jsx` + `data/mediaCenterData.js`

**Resource "Gallery Photos" (tabel `gallery_photos`):**

| Field | Tipe Filament | Keterangan |
|---|---|---|
| `image` | FileUpload (image) | ganti URL `picsum.photos` — **semua placeholder dummy**, bukan foto asli |
| `caption` | TextInput | |
| `category` | Select (Apel/Simulasi/Pameran/Relawan/Seremoni/Edukasi/Lapangan) | |
| `layout_size` | Select (tall/wide/square) | presentation-only untuk bento grid — opsional, bisa di-drop kalau layout dibuat otomatis |
| `order` | reorder | |

**Catatan penamaan:** file sumber `mediaCenterData.js` isinya galeri foto + dokumen, bukan "media center" (press kit) dalam arti umum — pertimbangkan penamaan resource CMS yang lebih jelas: "Galeri Foto" dan "Dokumen" terpisah (sudah dipisah di mapping ini).

---

## 15. TwibbonAjakan — `sections/TwibbonAjakan.jsx`

**Status saat ini:** semua hardcoded, dan 2 CTA link masih `href="#"` (belum berfungsi — bukan cuma soal data, ada gap fungsional).

**Rekomendasi CMS (Singleton — "Twibbon Section"):**

| Field | Tipe Filament | Keterangan |
|---|---|---|
| `badge_text` | TextInput | "Twibbon Resmi" |
| `heading` | TextInput | |
| `description` | Textarea | |
| `cta_twibbon_url` | TextInput (url) | **isi link asli sebelum go-live** |
| `cta_share_url` | TextInput (url) | |
| `preview_image` | FileUpload (image) | ganti placeholder picsum |
| `overlay_title`, `overlay_subtitle` | TextInput | "Bulan PRB 2026" / "Siaga Bersama Banten" |

---

## 16. KumpulanDokumen — `sections/KumpulanDokumen.jsx` + `data/mediaCenterData.js`

**Resource "Documents" (tabel `documents`):**

| Field | Tipe Filament | Keterangan |
|---|---|---|
| `title` | TextInput | |
| `description` | Textarea | |
| `file` | FileUpload (document, bukan image) | semua `href` saat ini `'#'` — belum ada file nyata |
| `type` | (derive otomatis dari ekstensi file upload) | jangan manual-input, ambil dari file asli |
| `size` | (derive otomatis dari file upload) | jangan string manual seperti "4.2 MB" |
| `updated_at` | (timestamp otomatis Laravel) | jangan string manual seperti "2 Okt 2026" |
| `order` | reorder | |

---

## 17. Navbar — `sections/Navbar.jsx`

**Status:** struktural/navigasi aplikasi, bukan konten editorial. `navLinks` hardcoded (termasuk 1 item "Akomodasi" yang di-comment/nonaktif). `adminPanelUrl` sudah jadi app config (`/admin`, relatif — bukan CMS content).

**Rekomendasi:** **jangan masuk CMS** kecuali ada requirement khusus admin bisa reorder/tambah menu navigasi. Risiko: menu yang salah konfigurasi bisa merusak routing SPA.

---

## 18. Footer — `sections/Footer.jsx`

**Status:** semua hardcoded (deskripsi about, kontak, quick links, copyright otomatis dari tahun berjalan).

**Rekomendasi CMS — bukan "section" biasa, tapi bagian dari "Site Settings" (Singleton global, dipakai lintas halaman):**

| Field | Tipe Filament |
|---|---|
| `about_description` | Textarea |
| `contact_email` | TextInput |
| `contact_phone` | TextInput |
| `contact_website` | TextInput |

**Legal links** (`/kebijakan-privasi`, `/syarat-ketentuan`) mengarah ke halaman yang kemungkinan belum dibuat — di luar scope mapping ini, catat sebagai temuan terpisah untuk tim frontend.

---

## Ringkasan Lintas-Section

### A. Section yang aman TIDAK masuk CMS dulu (murni struktural/UI config)
- Navbar (`navLinks`) — struktural routing
- Akomodasi filter config (`hotelCategories`, `sortOptions`, `priceRanges`) — UI-only

### B. Data Orphan — putuskan aktivasi UI sebelum bikin field CMS
| Data | File | Section terkait |
|---|---|---|
| `heroStats`, `heroConfig` | heroData.js | Hero — tidak dirender |
| `gerakanStats`, `gerakanBenefits` | gerakanData.js | GerakanPRB — tidak dirender |
| `faqCategories` | faqData.js | FAQ — filter belum ada di UI |
| `shuttleNotes`, `mapsUrl` | akomodasiData.js | ShuttleBus — tidak dirender |
| `bio`, `topics` per pembicara | speakerData.js | PembicaraUtama & SharingSession — tidak dirender |

**Tindakan:** jangan bikin Filament field untuk ini di iterasi pertama. Tunggu konfirmasi produk apakah field ini akan diaktifkan di frontend, supaya CMS tidak punya kolom yang tidak pernah tersentuh admin.

### C. Relasi yang WAJIB tabel terpisah (bukan JSON column)
1. `PRB History` → `PRB History Images` (one-to-many, per tahun)
2. `Rundown Days` → `Rundown Items` (one-to-many, per hari)
3. `Shuttle Days` → `Shuttle Routes` (one-to-many, per hari)
4. `Sharing Sessions` ↔ `Speakers` (many-to-many, pivot table)
5. `Sharing Sessions.day` dan `Speakers.day` sebaiknya foreign key ke `Rundown Days`, bukan string bebas duplikat ("Day 1", "Day 2"...) — supaya satu source of truth hari acara.

### D. Field yang cukup JSON/array sederhana
- `amenities` (Hotel), `tags` (Sharing Session), `topics` (Speaker) — array string, kecuali nanti butuh filter/query per-tag.

### E. Strategi Asset & Storage

| Sumber saat ini | Jumlah | Tindakan |
|---|---|---|
| `images.unsplash.com` | ~29 URL | Ganti FileUpload Filament (disk `public`/S3), replace dengan foto asli sebelum go-live |
| `picsum.photos` | 9 URL | Sama — ini murni placeholder dummy generator, bukan foto asli sama sekali |
| `/public` lokal (`BNPB.png`, `hero.jpeg`) | 2 file | Bisa tetap asset statis, atau migrasi ke Filament upload kalau ingin admin bisa ganti tanpa deploy |
| Dokumen (PDF/DOCX/PPTX/ZIP) | 5 slot, semua `href="#"` | Belum ada file nyata — field `file` di resource Documents harus FileUpload asli, bukan link manual |

**Prinsip:** setiap `FileUpload` field disimpan lewat Laravel filesystem (disk `public` untuk dev, S3-compatible untuk production), diakses via URL yang di-generate otomatis (`Storage::url()`), bukan hardcode path.

### F. Inkonsistensi data yang perlu dibersihkan saat migrasi
- **Tahun event tidak konsisten**: heroData.js pakai 2025, Countdown.jsx & FAQ answer pakai 2026, dokumenData.js pakai 2026. **Wajib satu source of truth** — sarankan tabel `site_settings` singleton dengan `event_date` dipakai bersama oleh Hero & Countdown.
- `priceRanges.max: Infinity` (akomodasiData.js) — tidak valid JSON/DB, ganti `null` atau nilai besar.
- Rundown item punya `status` dan `type` yang redundant (dua field untuk satu konsep styling) — di CMS cukup satu field `status`, derive warna badge di frontend.
- Field `date`/`updatedAt` di beberapa tempat masih string bebas berbahasa Indonesia manual ("Agustus 2025", "2 Okt 2026") — sebaiknya jadi `DatePicker`/timestamp asli, format tampilan diatur di frontend, bukan disimpan sebagai string jadi.

---

## Urutan Implementasi yang Disarankan

0. **Fondasi arsitektur (lakukan pertama, sekali):**
   - Install `spatie/laravel-settings` untuk Site Settings (AR-1).
   - Sepakati konvensi migration: setiap tabel list punya `sort` + `is_active` (AR-4, AR-5).
   - Siapkan NavigationGroup di panel Filament (AR-3).
   - Buat tabel `section_headers` generik untuk teks header section (AR-2).
   - Konfigurasi disk storage (`public` dev / S3 prod) + API Resource base (AR-6, AR-7).
1. **Site Settings** (singleton global: event date, kontak footer) — dipakai lintas section.
2. **Tabel master tanpa dependency**: Speakers (Pembicara), Rundown Days, Hotels, Mitra, FAQ, Gallery Photos, Documents. Semua dengan `sort` + `is_active`.
3. **Tabel dengan relasi ke master di atas**: Sharing Sessions (FK Speakers + Rundown Days), Shuttle Days+Routes, PRB History+Images.
4. **Singleton per-section** (Hero, Countdown, GerakanPRB, PuncakPeringatan, TwibbonAjakan) — pakai custom Page (AR-1), bisa paralel dengan langkah 2-3.
5. **API layer**: endpoint agregat per halaman + cache + API Resource (AR-6). Baru arahkan frontend fetch dari sini.
6. **Validasi & migrasi asset** — ganti seluruh placeholder Unsplash/Picsum dengan upload asli sebelum go-live, dan isi link CTA yang masih `href="#"` (Twibbon, Documents).

Setelah struktur Filament Resource + API siap, tiap section React tinggal diarahkan fetch dari
endpoint agregat Laravel (`GET /api/v1/pages/...`) menggantikan static import dari
`frontend/src/data/*.js` — pola swap ini sudah dianjurkan lewat komentar di `frontend/src/data/index.js`.