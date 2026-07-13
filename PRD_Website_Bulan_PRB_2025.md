PRODUCT REQUIREMENTS DOCUMENT

Website Bulan Pengurangan Risiko Bencana 2025

Rebuild Modern — React SPA + Laravel 12 + Soft UI Design System

| Informasi Dokumen | Detail |
| --- | --- |
| Proyek | Website Bulan PRB 2025 — Rebuild |
| Klien / Instansi | BNPB (Badan Nasional Penanggulangan Bencana) |
| Versi Dokumen | 2.2.0 |
| Tanggal | 30 Juni 2025 |
| Status | Draft — Untuk Review |
| Tech Lead | [Nama Tech Lead] |
| Product Owner | [Nama PO] |

---

# Daftar Isi

1. [Ringkasan Eksekutif](#1-ringkasan-eksekutif)
2. [Latar Belakang & Konteks](#2-latar-belakang--konteks)
3. [User Persona & Target Audience](#3-user-persona--target-audience)
4. [Tujuan & Sasaran Produk](#4-tujuan--sasaran-produk)
5. [User Stories](#5-user-stories)
6. [Lingkup Proyek](#6-lingkup-proyek)
7. [Stack Teknologi](#7-stack-teknologi)
8. [Arsitektur Sistem](#8-arsitektur-sistem)
9. [Fitur Frontend (Halaman Publik)](#9-fitur-frontend-halaman-publik)
10. [Fitur Backend CMS (Admin Dashboard)](#10-fitur-backend-cms-admin-dashboard)
11. [Desain Sistem & UI Guidelines](#11-desain-sistem--ui-guidelines)
12. [Spesifikasi REST API](#12-spesifikasi-rest-api)
13. [Skema Database](#13-skema-database)
14. [Strategi SEO untuk SPA](#14-strategi-seo-untuk-spa)
15. [Strategi Internationalization (i18n)](#15-strategi-internationalization-i18n)
16. [Error Handling & Edge Cases](#16-error-handling--edge-cases)
17. [Kebutuhan Non-Fungsional](#17-kebutuhan-non-fungsional)
18. [Strategi Testing](#18-strategi-testing)
19. [Deployment & Infrastructure](#19-deployment--infrastructure)
20. [Migrasi Data](#20-migrasi-data)
21. [Wireframe & Mockup](#21-wireframe--mockup)
22. [Milestone & Timeline](#22-milestone--timeline)
23. [Risiko & Mitigasi](#23-risiko--mitigasi)
24. [Kriteria Penerimaan (Acceptance Criteria)](#24-kriteria-penerimaan-acceptance-criteria)
25. [Glosarium](#25-glosarium)
26. [Persetujuan Dokumen](#26-persetujuan-dokumen)

---

# 1. Ringkasan Eksekutif

Dokumen ini menjelaskan kebutuhan produk untuk membangun ulang website resmi Bulan Pengurangan Risiko Bencana (PRB) 2025 milik BNPB. Website yang ada saat ini akan digantikan dengan sistem modern berbasis **React.js SPA (Single Page Application)** dengan Tailwind CSS + ShadcnUI pada sisi frontend, serta **Laravel 12** sebagai backend CMS (Content Management System) untuk manajemen konten secara dinamis.

Tujuan utama rebuild ini adalah:

- Menghadirkan tampilan modern bergaya SaaS dengan **Soft UI Design System**
- Meningkatkan performa, aksesibilitas, dan SEO website
- Memberikan kemampuan kepada admin BNPB untuk mengelola semua konten secara mandiri tanpa perlu menyentuh kode
- Membangun fondasi yang scalable untuk peringatan PRB di tahun-tahun mendatang

---

# 2. Latar Belakang & Konteks

## 2.1 Tentang Bulan PRB

Bulan Pengurangan Risiko Bencana (PRB) adalah peringatan tahunan yang diselenggarakan BNPB setiap bulan Oktober. Website ini berfungsi sebagai pusat informasi resmi untuk seluruh rangkaian kegiatan, mulai dari rundown acara, jadwal shuttle bus, sharing session, road to PRB, hingga dukungan dan kolaborasi dari berbagai instansi.

## 2.2 Masalah Website Saat Ini

Berdasarkan analisis website yang ada (web.bnpb.go.id/bulanprb2025), ditemukan sejumlah permasalahan:

- Desain visual kurang modern dan tidak konsisten dengan standar UI/UX terkini
- Konten bersifat statis — memerlukan developer untuk setiap perubahan konten
- Tidak ada sistem manajemen konten (CMS) terintegrasi
- Performa dan mobile responsiveness perlu ditingkatkan
- Tidak ada sistem autentikasi admin yang terstruktur

---

# 3. User Persona & Target Audience

## 3.1 Persona: Visitor Publik (Masyarakat Umum)

| Atribut | Detail |
| --- | --- |
| **Nama Persona** | Budi — Peserta Event PRB |
| **Deskripsi** | Masyarakat umum, PNS, mahasiswa, atau relawan yang ingin mengikuti rangkaian kegiatan Bulan PRB |
| **Tujuan** | Mencari informasi jadwal kegiatan, lokasi, shuttle bus, dan pembicara |
| **Pain Points** | Kesulitan menemukan informasi terkini, tampilan website lama tidak mobile-friendly |
| **Device** | Smartphone (70%), Laptop/Desktop (30%) |
| **Tech Savviness** | Rendah–Menengah |

## 3.2 Persona: Perwakilan Instansi / Media

| Atribut | Detail |
| --- | --- |
| **Nama Persona** | Sari — Humas Instansi Mitra |
| **Deskripsi** | Perwakilan dari instansi pemerintah, NGO, atau media yang berkolaborasi dalam Bulan PRB |
| **Tujuan** | Mencari informasi resmi untuk publikasi, melihat daftar mitra, dan mengakses materi promosi |
| **Pain Points** | Data tidak update, sulit menemukan kontak atau informasi kolaborasi |
| **Device** | Laptop/Desktop (80%), Tablet (20%) |
| **Tech Savviness** | Menengah |

## 3.3 Persona: Admin BNPB (Pengelola CMS)

| Atribut | Detail |
| --- | --- |
| **Nama Persona** | Rina — Staff IT BNPB |
| **Deskripsi** | Staff BNPB yang bertugas mengelola dan memperbarui konten website Bulan PRB |
| **Jumlah Estimasi** | 3–5 orang admin aktif |
| **Tujuan** | Mengupdate konten website (jadwal, pembicara, galeri) secara mandiri tanpa bantuan developer |
| **Pain Points** | Harus menghubungi developer untuk setiap perubahan kecil, tidak ada dashboard admin |
| **Device** | Laptop/Desktop (100%) |
| **Tech Savviness** | Menengah — familiar dengan aplikasi web sederhana, bukan developer |

---

# 4. Tujuan & Sasaran Produk

| Sasaran | Indikator Keberhasilan | Prioritas |
| --- | --- | --- |
| Tampilan modern Soft UI | Skor Lighthouse Design ≥ 90 | P0 — Must Have |
| CMS untuk admin BNPB | Admin bisa edit semua konten tanpa dev | P0 — Must Have |
| Performa tinggi | Skor Lighthouse Performance ≥ 85 | P0 — Must Have |
| SEO optimal | Semua halaman terindeks Google (via prerendering) | P1 — Should Have |
| Multi-bahasa (ID/EN) | Toggle bahasa tersedia di navbar | P2 — Nice to Have |
| Animasi & micro-interaction | Framer Motion / Tailwind animate | P2 — Nice to Have |

---

# 5. User Stories

## 5.1 Visitor Publik

| ID | User Story | Prioritas |
| --- | --- | --- |
| US-01 | Sebagai visitor, saya ingin melihat **countdown timer** menuju acara puncak PRB agar saya tahu berapa lama lagi acara dimulai. | P0 |
| US-02 | Sebagai visitor, saya ingin melihat **rundown kegiatan lengkap** dengan tanggal, waktu, dan lokasi agar saya bisa merencanakan kehadiran. | P0 |
| US-03 | Sebagai visitor, saya ingin melihat **jadwal sharing session** beserta profil pembicara agar saya bisa memilih sesi yang relevan. | P0 |
| US-04 | Sebagai visitor, saya ingin melihat **jadwal dan rute shuttle bus** agar saya tahu cara menuju lokasi acara. | P0 |
| US-05 | Sebagai visitor, saya ingin **mencari jawaban di FAQ** agar pertanyaan umum saya terjawab tanpa perlu menghubungi panitia. | P1 |
| US-06 | Sebagai visitor, saya ingin melihat **galeri foto kegiatan PRB tahun-tahun sebelumnya** agar saya memahami skala dan nuansa acara. | P1 |
| US-07 | Sebagai visitor, saya ingin **menonton video highlight** acara puncak PRB agar saya mendapat gambaran acara. | P1 |
| US-08 | Sebagai visitor, saya ingin website **tampil dengan baik di smartphone** saya agar saya bisa mengakses informasi kapan saja. | P0 |
| US-08a | Sebagai visitor, saya ingin melihat **daftar tempat penginapan** terdekat beserta harga dan fasilitas agar saya bisa merencanakan akomodasi selama kegiatan PRB. | P1 |
| US-08b | Sebagai visitor, saya ingin melihat **statistik Gerakan PRB** (jumlah aksi, peserta, sebaran wilayah) yang sudah diolah agar saya termotivasi untuk berpartisipasi. | P1 |
| US-08c | Sebagai visitor, saya ingin **mengklik tombol CTA "Daftar Gerakan PRB"** yang mengarahkan saya ke form KoboToolbox agar saya bisa mendaftarkan aksi PRB. | P1 |

## 5.2 Perwakilan Instansi / Media

| ID | User Story | Prioritas |
| --- | --- | --- |
| US-09 | Sebagai perwakilan instansi, saya ingin melihat **daftar mitra dan sponsor** beserta logo mereka agar saya tahu siapa saja yang terlibat. | P1 |
| US-10 | Sebagai jurnalis, saya ingin mengakses **informasi resmi dan materi visual** agar saya bisa membuat liputan yang akurat. | P1 |

## 5.3 Admin BNPB

| ID | User Story | Prioritas |
| --- | --- | --- |
| US-11 | Sebagai admin, saya ingin **login ke CMS dashboard** dengan aman agar hanya orang berwenang yang bisa mengelola konten. | P0 |
| US-12 | Sebagai admin, saya ingin **mengupdate jadwal rundown kegiatan** agar informasi di website selalu akurat. | P0 |
| US-13 | Sebagai admin, saya ingin **menambah/mengedit pembicara sharing session** beserta foto dan topik mereka. | P0 |
| US-14 | Sebagai admin, saya ingin **mengupload foto galeri** secara batch agar proses pengelolaan galeri lebih efisien. | P1 |
| US-15 | Sebagai admin, saya ingin **mengelola FAQ** (tambah, edit, hapus, urutkan) agar informasi FAQ selalu relevan. | P1 |
| US-16 | Sebagai super admin, saya ingin **mengelola akun admin lain** (tambah, edit role, nonaktifkan) agar kontrol akses terkelola dengan baik. | P0 |
| US-17 | Sebagai admin, saya ingin melihat **statistik pengunjung website** di dashboard agar saya tahu seberapa efektif website ini. | P2 |
| US-18 | Sebagai admin, saya ingin perubahan konten di CMS **langsung tercermin di website** dalam waktu < 5 detik. | P0 |
| US-19 | Sebagai admin, saya ingin **mengelola daftar tempat penginapan** (tambah, edit, hapus, urutkan) agar peserta mendapat informasi akomodasi yang akurat. | P1 |
| US-20 | Sebagai admin, saya ingin **mengkonfigurasi URL form KoboToolbox** dan label tombol CTA agar link pendaftaran Gerakan PRB selalu up-to-date. | P1 |
| US-21 | Sebagai admin, saya ingin **men-trigger sync data dari KoboToolbox** atau melihat kapan terakhir data di-sync agar statistik yang ditampilkan di publik selalu terkini. | P1 |

---

# 6. Lingkup Proyek

## 6.1 Yang Termasuk dalam Scope

- **Frontend:** Seluruh halaman publik website Bulan PRB 2025 (React SPA)
- **Backend CMS:** Dashboard admin dengan CRUD konten (Laravel 12)
- **REST API:** Endpoint untuk konsumsi frontend
- **Autentikasi admin:** Login, role-based access control (RBAC)
- **Upload media:** Gambar, video thumbnail, dokumen
- **SEO Prerendering:** Konfigurasi prerender untuk crawlability
- **Deployment:** Konfigurasi server dan CI/CD

## 6.2 Yang Tidak Termasuk dalam Scope

- Aplikasi mobile native (iOS/Android)
- Sistem pendaftaran peserta online
- Integrasi dengan sistem BNPB yang sudah ada (SSO, e-reporting)
- Fitur live streaming terintegrasi
- Server-Side Rendering (SSR) / Next.js — frontend menggunakan React SPA murni

---

# 7. Stack Teknologi

| Layer | Teknologi | Versi | Keterangan |
| --- | --- | --- | --- |
| Frontend Framework | React.js (JSX) | 18.x | SPA dengan React Router v6 |
| Styling | Tailwind CSS | 3.x | Utility-first CSS framework |
| UI Components | Shadcn/UI | Latest | Komponen aksesibel berbasis Radix UI |
| Animasi | Framer Motion | 11.x | Micro-interaction & page transition |
| State Management | Zustand + React Query | Latest | Global state + server state caching |
| SEO (SPA) | react-helmet-async + react-snap | Latest | Meta tags + prerendering untuk crawler |
| Backend Framework | Laravel | 12.x | REST API + Admin CMS |
| Database | MySQL | 8.x | Relational database |
| Cache | Redis | 7.x | Caching API response |
| Storage | Laravel Storage (S3/local) | — | Upload gambar & media |
| Auth | Laravel Sanctum | — | Token-based admin auth |
| Build Tool | Vite | 5.x | Fast bundler untuk React |
| Deployment | Docker + Nginx | — | Containerized deployment |
| CI/CD | GitHub Actions | — | Auto deploy on push |
| Monitoring | Umami / Google Analytics | — | Web analytics |

---

# 8. Arsitektur Sistem

Sistem dibangun dengan arsitektur **decoupled (separated frontend-backend)** menggunakan **React SPA** pada frontend dan **Laravel REST API** pada backend.

## 8.1 Diagram Arsitektur

```
┌─────────────────────────────────────────────────────────┐
│                     VISITOR BROWSER                      │
│                                                          │
│  ┌──────────────────┐      ┌──────────────────────────┐ │
│  │  React SPA        │      │  Prerendered HTML Cache  │ │
│  │  (bulanprb2025.   │      │  (untuk SEO crawler)     │ │
│  │   bnpb.go.id)     │      │                          │ │
│  └────────┬─────────┘      └──────────────────────────┘ │
└───────────┼──────────────────────────────────────────────┘
            │ REST API calls
            ▼
┌─────────────────────────────────────────────────────────┐
│                    LARAVEL 12 API                         │
│                 (api.bulanprb2025.bnpb.go.id)             │
│                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────┐  │
│  │ Public API   │  │ Admin API    │  │ Media Upload  │  │
│  │ /api/v1/*    │  │ /api/admin/* │  │ Service       │  │
│  │ (No Auth)    │  │ (Sanctum)    │  │               │  │
│  └──────┬───────┘  └──────┬───────┘  └───────┬───────┘  │
│         │                 │                   │          │
│  ┌──────▼─────────────────▼───────────────────▼───────┐ │
│  │              Business Logic Layer                   │ │
│  │              (app/Services/)                        │ │
│  └──────┬─────────────────┬───────────────────┬───────┘ │
│         │                 │                   │          │
│  ┌──────▼───────┐  ┌──────▼───────┐  ┌───────▼───────┐ │
│  │   MySQL 8    │  │    Redis     │  │ File Storage  │ │
│  │   Database   │  │    Cache     │  │ (S3/Local)    │ │
│  └──────────────┘  └──────────────┘  └───────────────┘ │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                   ADMIN BROWSER                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │  CMS Dashboard (admin.bulanprb2025.bnpb.go.id)   │   │
│  │  Laravel Blade / React terpisah                   │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

## 8.2 Alur Akses

1. **Visitor** mengakses Frontend React SPA (domain utama: `bulanprb2025.bnpb.go.id`)
2. **Search Engine Crawler** menerima prerendered HTML statis untuk indexing SEO
3. React Frontend melakukan request ke **Laravel REST API** (`api.bulanprb2025.bnpb.go.id`)
4. **Admin** mengakses CMS Dashboard (`admin.bulanprb2025.bnpb.go.id`) — di-serve oleh Laravel Blade atau React terpisah
5. Laravel API berkomunikasi dengan **MySQL** dan **Redis**
6. Media/file disimpan di **Laravel Storage** (dapat dikonfigurasi ke S3-compatible storage)

## 8.3 Struktur Folder Frontend (React SPA)

```
src/
├── components/       # Komponen reusable (Shadcn + custom)
├── pages/            # Halaman-halaman utama
├── sections/         # Section per blok konten halaman
├── hooks/            # Custom React hooks
├── services/         # API service calls (axios/fetch wrapper)
├── stores/           # Zustand stores
├── utils/            # Helper functions
├── i18n/             # File terjemahan (ID/EN)
├── assets/           # Gambar, font, ikon statis
└── App.jsx           # Root component dengan React Router
```

## 8.4 Struktur Folder Backend (Laravel 12)

```
app/
├── Http/
│   ├── Controllers/
│   │   ├── Api/      # Controller untuk REST API publik
│   │   └── Admin/    # Controller untuk CMS admin
│   ├── Middleware/    # Custom middleware (CORS, rate limit)
│   └── Requests/     # Form request validation
├── Models/            # Eloquent models
├── Services/          # Business logic layer
├── Policies/          # Authorization policies (RBAC)
└── Exceptions/        # Custom exception handlers
database/
├── migrations/        # Schema database
├── seeders/           # Data seeder (roles, settings default)
└── factories/         # Model factories untuk testing
routes/
├── api.php            # Route API publik
└── admin.php          # Route admin (protected by Sanctum)
```

---

# 9. Fitur Frontend (Halaman Publik)

## 9.1 Navbar & Hero Section

- Sticky navbar transparan dengan blur effect (glassmorphism) saat scroll
- Logo BNPB + logo PRB dengan animasi fade-in
- Navigasi anchor ke semua section halaman
- Toggle bahasa ID/EN (P2)
- Tombol CTA 'Daftar Sekarang' (jika relevan) dengan gradient button
- Hero section: full-width dengan ilustrasi/animasi, judul utama, subtitle, dan **countdown timer** menuju acara puncak

## 9.2 Section Gerakan PRB

- Deskripsi singkat tentang Gerakan PRB dengan rich text
- Peta interaktif wilayah Indonesia (opsional: Leaflet.js)
- Statistik kunci dalam animated counter cards (jumlah peserta, kegiatan, dll.)

## 9.3 Section Puncak Peringatan

- Embed video YouTube atau video player kustom
- Thumbnail dengan play button overlay
- Judul, deskripsi, dan tanggal acara puncak

## 9.4 Section PRB Tahun ke Tahun

- Timeline horizontal/vertical dari tahun ke tahun
- Foto galeri dengan lightbox
- Filter berdasarkan tahun

## 9.5 Section Rundown Kegiatan

- Timeline vertikal bergaya modern (step-by-step)
- Setiap item menampilkan: tanggal, waktu, nama kegiatan, deskripsi singkat, lokasi
- Badge status: `Selesai` / `Berlangsung` / `Akan Datang`
- Expand/collapse untuk detail kegiatan

## 9.6 Section Jadwal Sharing Session

- Tabel jadwal interaktif dengan filter hari/tema
- Card pembicara: foto, nama, jabatan, topik
- Export jadwal ke PDF (opsional)

## 9.7 Section Shuttle Bus

- Jadwal shuttle Hi-Ace dan Bus dalam tabel terstruktur
- Rute dengan peta statis (embed Google Maps)
- Informasi titik penjemputan dan waktu keberangkatan

## 9.8 Section FAQ

- Accordion FAQ yang dapat di-expand/collapse
- Search/filter pertanyaan
- Animasi smooth open/close

## 9.9 Section Road to PRB

- Masonry grid galeri foto kegiatan road to PRB
- Lazy loading gambar
- Lightbox viewer dengan navigasi

## 9.10 Section Dukungan & Kolaborasi

- Logo wall mitra dan sponsor dalam grid responsif
- Marquee animation untuk logo
- Tautan ke website mitra (opsional)

## 9.12 Section Tempat Penginapan

- Daftar akomodasi/penginapan terdekat untuk peserta kegiatan PRB
- Card penginapan: nama, alamat, foto, kisaran harga, jarak ke venue, rating
- Filter berdasarkan kategori (hotel, guest house, homestay) dan range harga
- Link ke Google Maps untuk navigasi
- Informasi kontak dan link booking (jika tersedia)
- Badge rekomendasi panitia (opsional)

## 9.13 Section Dashboard Gerakan PRB

- Tombol CTA "Daftar Gerakan PRB" yang mengarah ke form KoboToolbox (sistem pendaftaran terpisah)
- Tampilan statistik hasil olahan data dari KoboToolbox di bawah tombol CTA:
  - Total aksi PRB terdaftar (counter animasi)
  - Total peserta/instansi yang berpartisipasi
  - Sebaran wilayah aksi PRB (peta sederhana atau badge per provinsi)
  - Breakdown kategori aksi (pie chart / bar chart sederhana)
- Data statistik diambil dari API backend yang mengolah data hasil submit KoboToolbox
- Auto-refresh statistik secara periodik (polling setiap 5 menit atau saat section terlihat)
- Desain card/widget statistik dengan animated counter dan progress indicator

## 9.14 Footer

- Logo BNPB, deskripsi singkat, tautan media sosial
- Sitemap link
- Copyright notice

---

# 10. Fitur Backend CMS (Admin Dashboard)

## 10.1 Autentikasi & Authorization

- Login admin dengan email & password
- Autentikasi menggunakan Laravel Sanctum (token-based)
- Role: **Super Admin**, **Editor**, **Viewer**
- Fitur: Remember me, forgot password, session timeout (30 menit idle)

### RBAC Permission Matrix

| Permission | Super Admin | Editor | Viewer |
| --- | :---: | :---: | :---: |
| Login ke CMS Dashboard | ✅ | ✅ | ✅ |
| Melihat semua modul konten | ✅ | ✅ | ✅ |
| Membuat konten baru (Create) | ✅ | ✅ | ❌ |
| Mengedit konten (Update) | ✅ | ✅ | ❌ |
| Menghapus konten (Delete) | ✅ | ❌ | ❌ |
| Upload media | ✅ | ✅ | ❌ |
| Menghapus media | ✅ | ❌ | ❌ |
| Mengelola akun admin (CRUD user) | ✅ | ❌ | ❌ |
| Mengubah pengaturan umum situs | ✅ | ❌ | ❌ |
| Melihat dashboard analytics | ✅ | ✅ | ✅ |
| Export data | ✅ | ✅ | ❌ |

## 10.2 Manajemen Konten

| Modul CMS | Operasi CRUD | Keterangan |
| --- | --- | --- |
| Hero Section | Edit teks, gambar, video URL | Judul, subtitle, background |
| Gerakan PRB | Edit rich text, upload gambar | Deskripsi + peta |
| Puncak Peringatan | Edit URL video, judul, tanggal | Embed YouTube |
| Galeri PRB Tahunan | CRUD foto per tahun | Upload + urutan |
| Rundown Kegiatan | CRUD item kegiatan | Tanggal, waktu, status, lokasi |
| Sharing Session | CRUD jadwal + pembicara | Nama, foto, topik, waktu |
| Shuttle Bus | CRUD jadwal shuttle | Rute, waktu, kapasitas |
| FAQ | CRUD pertanyaan-jawaban | Urutan, kategori |
| Road to PRB | Upload galeri foto | Batch upload, caption |
| Mitra & Sponsor | CRUD logo + link | Urutan tampil, kategori |
| Tempat Penginapan | CRUD data penginapan | Nama, alamat, foto, harga, kategori |
| Dashboard Gerakan PRB | View statistik, konfigurasi URL KoboToolbox, sync data | Data diolah dari KoboToolbox, tampilkan statistik agregat |
| Pengaturan Umum | Edit metadata situs | Judul, deskripsi, og:image |

## 10.3 Media Manager

- Upload gambar dengan preview
- Kompresi otomatis gambar (WebP conversion)
- Manajemen file: list, hapus, copy URL
- Batasan ukuran file: maksimal **5MB** per file
- Format yang didukung: JPG, PNG, GIF, SVG, WebP, PDF

## 10.4 Dashboard Analytics

- Total pengunjung website (via Google Analytics embed atau Umami)
- Halaman paling banyak dikunjungi
- Jumlah konten per modul
- Grafik tren pengunjung (7 hari, 30 hari)

---

# 11. Desain Sistem & UI Guidelines

## 11.1 Prinsip Soft UI / SaaS Design

- Warna dominan: putih (#FFFFFF), abu terang (#F8FAFC), dengan aksen biru dan oranye
- Bayangan lembut (`box-shadow: 0 4px 24px rgba(0,0,0,0.06)`) — menghindari shadow keras
- Border radius besar (`rounded-2xl` / 16px) untuk semua card dan komponen
- Glassmorphism pada navbar, card overlay, dan modal
- Typography: **Inter** atau **Plus Jakarta Sans** sebagai font utama
- Spacing konsisten menggunakan **8-point grid system**

## 11.2 Palet Warna

| Nama | Hex Code | Penggunaan |
| --- | --- | --- |
| Primary Blue | `#1E40AF` | Heading, CTA utama, badge |
| Accent Blue | `#3B82F6` | Link, icon, highlight |
| Background | `#F8FAFC` | Latar halaman utama |
| Surface White | `#FFFFFF` | Card, modal, input |
| Text Primary | `#111827` | Judul & body text utama |
| Text Secondary | `#6B7280` | Subtitle, caption, placeholder |
| Success | `#10B981` | Status badge selesai |
| Warning | `#F59E0B` | Status badge berlangsung |
| Danger | `#EF4444` | Error, hapus |
| Orange Accent | `#F97316` | Highlight PRB branding |

## 11.3 Komponen Shadcn/UI yang Digunakan

| Komponen | Penggunaan |
| --- | --- |
| Button, Badge, Card, Separator | Komponen dasar |
| Accordion | FAQ section |
| Dialog / Sheet | Lightbox, detail modal |
| Table | Jadwal sharing session & shuttle |
| Tabs | Filter konten |
| Toast / Sonner | Notifikasi CMS admin |
| Form + Input | CMS admin forms |
| DropdownMenu | Navbar mobile, aksi tabel |
| Skeleton | Loading state |

---

# 12. Spesifikasi REST API

## 12.1 Konvensi Umum

- Base URL publik: `/api/v1/`
- Base URL admin: `/api/admin/`
- Format response: JSON
- Encoding: UTF-8
- Versioning: URL-based (`/v1/`)

## 12.2 Standard Response Format

### Success Response

```json
{
  "status": "success",
  "message": "Data retrieved successfully",
  "data": { ... },
  "meta": {
    "current_page": 1,
    "per_page": 15,
    "total": 50,
    "last_page": 4
  }
}
```

### Error Response

```json
{
  "status": "error",
  "message": "Validation failed",
  "errors": {
    "title": ["The title field is required."],
    "image": ["The image must be less than 5MB."]
  },
  "code": 422
}
```

### Pagination

Semua endpoint list menggunakan **offset-based pagination** dengan parameter:
- `?page=1` — nomor halaman
- `?per_page=15` — jumlah item per halaman (default: 15, max: 100)

## 12.3 Daftar Endpoint

### Endpoint Publik (No Auth)

| Method | Endpoint | Deskripsi |
| --- | --- | --- |
| GET | `/api/v1/settings` | Pengaturan umum situs (meta, og:image) |
| GET | `/api/v1/hero` | Data hero section |
| GET | `/api/v1/about` | Deskripsi gerakan PRB |
| GET | `/api/v1/highlight` | Data puncak peringatan |
| GET | `/api/v1/gallery` | Galeri foto PRB tahunan |
| GET | `/api/v1/gallery?year=2024` | Filter galeri per tahun |
| GET | `/api/v1/rundown` | Daftar rundown kegiatan |
| GET | `/api/v1/sessions` | Jadwal sharing session |
| GET | `/api/v1/speakers` | Daftar pembicara |
| GET | `/api/v1/shuttle` | Jadwal shuttle bus |
| GET | `/api/v1/faq` | Daftar FAQ |
| GET | `/api/v1/faq?category=umum` | Filter FAQ per kategori |
| GET | `/api/v1/road-to-prb` | Galeri road to PRB |
| GET | `/api/v1/partners` | Daftar mitra & sponsor |
| GET | `/api/v1/partners?category=sponsor` | Filter mitra per kategori |
| GET | `/api/v1/accommodations` | Daftar tempat penginapan |
| GET | `/api/v1/accommodations?category=hotel` | Filter penginapan per kategori |
| GET | `/api/v1/gerakan-prb/stats` | Statistik agregat Gerakan PRB (hasil olahan data KoboToolbox) |
| GET | `/api/v1/gerakan-prb/config` | Konfigurasi CTA (URL form KoboToolbox, label tombol) |

### Endpoint Admin (Sanctum Auth Required)

| Method | Endpoint | Deskripsi |
| --- | --- | --- |
| POST | `/api/admin/login` | Login admin (returns token) |
| POST | `/api/admin/logout` | Logout admin (revoke token) |
| GET | `/api/admin/me` | Profil admin yang sedang login |
| GET/POST/PUT/DELETE | `/api/admin/{module}` | CRUD semua modul CMS |
| GET/POST/PUT/DELETE | `/api/admin/{module}/{id}` | Operasi per item |
| POST | `/api/admin/media/upload` | Upload media |
| DELETE | `/api/admin/media/{id}` | Hapus media |
| GET/POST/PUT/DELETE | `/api/admin/users` | Kelola akun admin (Super Admin only) |
| GET | `/api/admin/analytics/summary` | Summary analytics dashboard |

### Rate Limiting

| Endpoint Group | Rate Limit |
| --- | --- |
| Public API (`/api/v1/*`) | 60 requests/menit per IP |
| Admin API (`/api/admin/*`) | 120 requests/menit per user |
| Login (`/api/admin/login`) | 5 requests/menit per IP |
| Media Upload | 10 requests/menit per user |

---

# 13. Skema Database

| Tabel | Kolom Utama | Keterangan |
| --- | --- | --- |
| `settings` | key, value, updated_at | Key-value untuk pengaturan situs |
| `hero_sections` | title, subtitle, bg_image, cta_text, video_url | Konten hero |
| `about_sections` | title, description, map_config | Gerakan PRB |
| `highlights` | title, description, video_url, event_date | Puncak acara |
| `galleries` | year, image_path, caption, order | Galeri per tahun |
| `rundowns` | title, description, start_at, end_at, location, status, order | Jadwal kegiatan |
| `sharing_sessions` | title, date, start_time, end_time, theme | Sesi sharing |
| `speakers` | session_id (FK), name, title, photo, topic | Pembicara per sesi |
| `shuttles` | type, route_name, departure_time, capacity, notes | Jadwal shuttle |
| `faqs` | question, answer, category, order | Pertanyaan & jawaban |
| `road_to_prb_photos` | image_path, caption, taken_at, order | Galeri road to PRB |
| `partners` | name, logo_path, website_url, category, order | Mitra & sponsor |
| `accommodations` | name, address, photo, category, price_range, distance_to_venue, rating, contact, booking_url, is_recommended, order | Tempat penginapan peserta |
| `gerakan_prb_stats` | total_actions, total_participants, total_regions, categories_breakdown (JSON), last_synced_at, kobo_form_url | Statistik agregat dari KoboToolbox (di-sync periodik) |
| `gerakan_prb_config` | cta_label, cta_url (KoboToolbox form link), description, is_active | Konfigurasi section CTA Gerakan PRB |
| `admins` | name, email, password, role, is_active, last_login_at | Akun admin |
| `media` | filename, path, mime_type, size, uploaded_by (FK) | Media library |

> **Catatan:** Semua tabel memiliki kolom `id`, `created_at`, dan `updated_at` secara default (Laravel timestamps). Kolom `order` digunakan untuk custom sorting via drag-and-drop di CMS.

---

# 14. Strategi SEO untuk SPA

Karena frontend menggunakan **React SPA (Client-Side Rendering)**, diperlukan strategi khusus agar website tetap SEO-friendly dan dapat diindeks oleh search engine.

## 14.1 Pendekatan: Prerendering

| Komponen | Implementasi |
| --- | --- |
| **Prerendering Tool** | `react-snap` — generate static HTML saat build |
| **Meta Tags** | `react-helmet-async` — dynamic `<title>`, `<meta description>`, Open Graph tags per section |
| **Sitemap** | Generate `sitemap.xml` otomatis saat build (via script atau `sitemap-generator`) |
| **Robots.txt** | File statis di `/public/robots.txt` |

## 14.2 Meta Tags Strategy

Setiap section/halaman utama harus memiliki:

```html
<title>Bulan PRB 2025 — [Nama Section] | BNPB</title>
<meta name="description" content="[Deskripsi 150-160 karakter]" />
<meta property="og:title" content="[Judul]" />
<meta property="og:description" content="[Deskripsi]" />
<meta property="og:image" content="[URL gambar og:image dari CMS]" />
<meta property="og:url" content="[URL halaman]" />
<meta property="og:type" content="website" />
<link rel="canonical" href="[URL canonical]" />
```

## 14.3 Structured Data (JSON-LD)

Implementasi schema.org untuk meningkatkan rich snippet di Google:

- **Organization** — data BNPB
- **Event** — acara puncak PRB
- **FAQPage** — halaman FAQ
- **BreadcrumbList** — navigasi breadcrumb

## 14.4 Technical SEO Checklist

- [ ] Prerendered HTML tersedia untuk semua route utama
- [ ] `sitemap.xml` terdaftar di Google Search Console
- [ ] `robots.txt` mengizinkan crawling semua halaman publik
- [ ] Open Graph & Twitter Card tags di semua halaman
- [ ] Canonical URL pada setiap halaman
- [ ] Structured data (JSON-LD) tervalidasi
- [ ] Gambar memiliki `alt` text
- [ ] Heading hierarchy (H1 → H2 → H3) benar

---

# 15. Strategi Internationalization (i18n)

> **Prioritas: P2 — Nice to Have**

## 15.1 Pendekatan

| Aspek | Implementasi |
| --- | --- |
| **Library** | `react-i18next` |
| **File Terjemahan** | JSON files di `src/i18n/locales/{id,en}.json` |
| **Toggle** | Tombol bahasa di navbar (ID / EN) |
| **Default** | Bahasa Indonesia (ID) |
| **URL Strategy** | Query parameter `?lang=en` (tidak mengubah URL path) |
| **Konten CMS** | Fase pertama: hanya UI labels yang diterjemahkan. Konten CMS tetap bahasa Indonesia. Multi-bahasa konten CMS sebagai enhancement di fase berikutnya. |

---

# 16. Error Handling & Edge Cases

## 16.1 Frontend Error States

| Skenario | Handling |
| --- | --- |
| API request gagal (500/timeout) | Tampilkan **error card** dengan tombol "Coba Lagi" (retry) |
| API request lambat | Tampilkan **Skeleton loading** (Shadcn Skeleton component) |
| Data kosong dari API | Tampilkan **empty state** dengan ilustrasi dan pesan informatif |
| Gambar gagal dimuat | Tampilkan **placeholder image** dengan ikon broken image |
| Network offline | Tampilkan **banner notifikasi** "Anda sedang offline" di atas navbar |
| Route tidak ditemukan | Tampilkan **halaman 404** dengan navigasi kembali ke beranda |

## 16.2 Backend Error Handling

| Skenario | Handling |
| --- | --- |
| Validation error (422) | Return field-level error messages dalam format standard |
| Authentication failed (401) | Return pesan "Unauthorized" + redirect ke login |
| Forbidden (403) | Return pesan "Insufficient permissions" |
| Resource not found (404) | Return pesan "Resource not found" |
| Server error (500) | Log error ke file/monitoring, return generic error ke client |
| Media upload gagal | Rollback, return error spesifik (file too large, format invalid) |
| Rate limit exceeded (429) | Return pesan "Too many requests" + `Retry-After` header |

## 16.3 CMS Edge Cases

| Skenario | Handling |
| --- | --- |
| Session timeout (30 menit idle) | Redirect ke login dengan pesan "Sesi Anda telah berakhir" |
| Concurrent edit (2 admin edit data yang sama) | **Last write wins** — tampilkan notifikasi jika data berubah sejak terakhir di-load |
| Batch upload foto gagal sebagian | Upload foto yang berhasil, tampilkan list foto yang gagal dengan alasan |
| Hapus media yang sedang digunakan di konten | Tampilkan warning "Media ini sedang digunakan di [modul]" sebelum konfirmasi hapus |

---

# 17. Kebutuhan Non-Fungsional

| Aspek | Requirement | Target Metrik |
| --- | --- | --- |
| Performance | First Contentful Paint (FCP) | < 1.5 detik |
| Performance | Largest Contentful Paint (LCP) | < 2.5 detik |
| Performance | Lighthouse Performance Score | ≥ 85 |
| SEO | Lighthouse SEO Score | ≥ 90 |
| Aksesibilitas | Lighthouse A11y Score | ≥ 85 |
| Responsiveness | Breakpoint support | Mobile (≤640px), Tablet (641–1024px), Desktop (>1024px) |
| Browser Support | Kompatibilitas browser | Chrome, Firefox, Safari, Edge (2 versi terakhir) |
| Uptime | Ketersediaan layanan | ≥ 99.5% |
| Security | HTTPS, CSRF, XSS protection | Laravel built-in + Helmet.js |
| API Response Time | Rata-rata response API | < 300ms |
| API Response Time | P95 response API | < 800ms |
| Image Optimization | Format gambar modern | WebP dengan fallback JPG/PNG |
| Bundle Size | Ukuran initial JS bundle | < 200KB (gzipped) |

---

# 18. Strategi Testing

## 18.1 Frontend Testing

| Jenis Test | Tool | Target | Keterangan |
| --- | --- | --- | --- |
| Unit Test | Vitest + React Testing Library | ≥ 70% coverage | Test komponen, hooks, dan utility functions |
| Integration Test | Vitest | Key user flows | Test interaksi antar komponen |
| E2E Test | Playwright | Critical paths | Test flow utama: navigasi section, filter, lightbox |
| Visual Regression | Playwright screenshots | Semua breakpoint | Deteksi perubahan tampilan yang tidak diinginkan |

### Critical E2E Test Scenarios

1. Visitor dapat scroll melalui semua 12 section tanpa error
2. Countdown timer menampilkan waktu yang benar
3. FAQ accordion expand/collapse berfungsi
4. Galeri lightbox buka/tutup dengan navigasi
5. Filter jadwal sharing session berfungsi
6. Website responsif di viewport mobile (375px), tablet (768px), dan desktop (1440px)

## 18.2 Backend Testing

| Jenis Test | Tool | Target | Keterangan |
| --- | --- | --- | --- |
| Unit Test | PHPUnit | ≥ 80% coverage | Test models, services, dan helpers |
| Feature Test | PHPUnit | Semua endpoint | Test API endpoint (request → response) |
| Integration Test | PHPUnit | Database operations | Test CRUD dengan database test |

### Critical Backend Test Scenarios

1. Login berhasil dengan credentials valid, gagal dengan credentials invalid
2. Endpoint admin tidak dapat diakses tanpa token Sanctum
3. Role-based access: Editor tidak bisa menghapus konten
4. Upload media berhasil dan file tersimpan di storage
5. Semua endpoint publik mengembalikan data dengan format response yang konsisten
6. Rate limiting aktif dan mengembalikan 429 pada request berlebihan

## 18.3 Performance Testing

| Tool | Test | Target |
| --- | --- | --- |
| Lighthouse CI | Performa, SEO, A11y | Scores ≥ target di NFR |
| k6 / Artillery | Load testing API | 100 concurrent users, response < 800ms (P95) |

---

# 19. Deployment & Infrastructure

## 19.1 Environment Strategy

| Environment | Tujuan | URL |
| --- | --- | --- |
| **Development** | Development lokal | `localhost:3000` (FE), `localhost:8000` (BE) |
| **Staging** | Testing & UAT oleh BNPB | `staging.bulanprb2025.bnpb.go.id` |
| **Production** | Website live | `bulanprb2025.bnpb.go.id` |

## 19.2 Server Specification (Minimum)

| Komponen | Spesifikasi | Keterangan |
| --- | --- | --- |
| **Web Server** | 2 vCPU, 4GB RAM, 40GB SSD | Nginx + PHP-FPM + React build |
| **Database Server** | 2 vCPU, 4GB RAM, 80GB SSD | MySQL 8 + Redis |
| **OS** | Ubuntu 22.04 LTS | Atau sesuai standar infrastruktur BNPB |

> **Catatan:** Jika traffic tinggi (menjelang acara puncak), disarankan scale up ke 4 vCPU / 8GB RAM atau gunakan load balancer.

## 19.3 Domain & SSL

| Item | Detail |
| --- | --- |
| Domain utama | `bulanprb2025.bnpb.go.id` |
| API subdomain | `api.bulanprb2025.bnpb.go.id` |
| Admin subdomain | `admin.bulanprb2025.bnpb.go.id` |
| SSL Certificate | Let's Encrypt (auto-renew) atau sertifikat dari BNPB |

## 19.4 CI/CD Pipeline (GitHub Actions)

```
Push to main branch
    ↓
Run Tests (PHPUnit + Vitest)
    ↓
Build Frontend (npm run build + react-snap prerender)
    ↓
Build Docker Images
    ↓
Deploy to Staging (auto)
    ↓
Manual Approval
    ↓
Deploy to Production
```

## 19.5 Backup & Recovery

| Aspek | Strategi |
| --- | --- |
| Database backup | Daily automated backup (mysqldump), retensi 30 hari |
| Media backup | Sync ke S3-compatible storage atau backup harian |
| Recovery Time Objective (RTO) | < 2 jam |
| Recovery Point Objective (RPO) | < 24 jam (data loss maksimal 1 hari) |

## 19.6 Monitoring & Alerting

| Tool | Fungsi |
| --- | --- |
| **Umami / Google Analytics** | Web analytics (traffic, pageviews) |
| **Laravel Telescope** (staging only) | Debug queries, requests, exceptions |
| **Uptime monitoring** (UptimeRobot / Better Uptime) | Alert jika website down |
| **Log management** | Laravel log files + rotation |

---

# 20. Migrasi Data

## 20.1 Scope Migrasi

| Data | Sumber | Aksi |
| --- | --- | --- |
| Konten teks (deskripsi, FAQ, jadwal) | Website lama (web.bnpb.go.id/bulanprb2025) | Copy manual ke CMS baru — volume kecil |
| Foto galeri | Website lama | Download dan re-upload ke media manager |
| Data pembicara | Dokumen internal BNPB | Input manual via CMS |
| Logo mitra & sponsor | Website lama / file asli | Re-upload dengan kualitas lebih baik |

## 20.2 Pendekatan

- **Input manual via CMS** — mengingat volume data yang tidak terlalu besar, migrasi dilakukan secara manual melalui CMS admin setelah sistem siap
- Tidak diperlukan migration script otomatis
- Tim admin BNPB mengisi konten selama **Fase 4 (Integrasi)**

---

# 21. Wireframe & Mockup

## 21.1 Design Tool

Desain UI/UX menggunakan **Google Stitch** sebagai tool utama untuk wireframing dan prototyping.

## 21.2 Deliverables Desain

| Deliverable | Format | Status |
| --- | --- | --- |
| Low-fidelity wireframe (semua section) | Google Stitch | Dalam proses |
| High-fidelity mockup (Desktop) | Google Stitch | Belum dimulai |
| High-fidelity mockup (Mobile) | Google Stitch | Belum dimulai |
| Interactive prototype | Google Stitch | Belum dimulai |
| CMS Dashboard wireframe | Google Stitch | Belum dimulai |

## 21.3 Design Review Process

1. Desainer membuat wireframe di **Google Stitch** dan membagikan link ke stakeholder
2. Review & feedback dari tim BNPB dan Product Owner
3. Iterasi desain berdasarkan feedback
4. **Sign-off desain** sebelum masuk ke fase development
5. Desain final menjadi **source of truth** untuk implementasi frontend

## 21.4 Referensi Desain

Inspirasi visual dan benchmark dari website event modern:

- Website event pemerintah dengan desain SaaS-like
- Landing page modern dengan Soft UI aesthetic
- Dashboard CMS yang intuitif untuk non-technical users

> **Link Google Stitch project akan ditambahkan setelah fase Discovery dimulai.**

---

# 22. Milestone & Timeline

Total estimasi: **8–9 minggu** dari kickoff hingga go-live.

| Fase | Kegiatan | Durasi | Output |
| --- | --- | --- | --- |
| **Fase 0 — Discovery** | Requirement gathering, wireframe di Google Stitch, approval desain | 1 minggu | Google Stitch prototype disetujui |
| **Fase 1 — Setup** | Setup repo, CI/CD, database schema, boilerplate code | 1 minggu | Repo & environment siap |
| **Fase 2 — Backend** | Laravel API + CMS admin (semua modul CRUD) + unit tests | 2 minggu | API ter-dokumentasi & tested |
| **Fase 3 — Frontend** | React SPA components, semua section halaman publik + prerendering | 2 minggu | Frontend terhubung ke API |
| **Fase 4 — Integrasi** | Frontend-Backend integration, CMS testing oleh admin, konten entry | 1 minggu | Sistem terintegrasi penuh |
| **Fase 5 — QA & UAT** | Testing performa, E2E test, bug fixing, UAT oleh BNPB | 1 minggu | Sign-off UAT |
| **Fase 6 — Launch** | Deployment produksi, monitoring setup, serah terima | 3 hari | Website live |

---

# 23. Risiko & Mitigasi

| Risiko | Kemungkinan | Dampak | Mitigasi |
| --- | --- | --- | --- |
| Perubahan requirement di tengah jalan | Sedang | Tinggi | Change request process yang jelas, sprint review reguler |
| Konten belum siap saat development | Tinggi | Sedang | Gunakan konten placeholder, CMS selesai lebih awal |
| Performa server tidak mencukupi | Rendah | Tinggi | Load testing sebelum launch, siapkan scaling plan |
| Kompatibilitas browser | Rendah | Sedang | Testing cross-browser di fase QA |
| Keterlambatan approval desain | Sedang | Tinggi | Wireframe low-fidelity (Google Stitch) dulu, paralel dengan setup backend |
| SEO SPA kurang optimal | Sedang | Sedang | Prerendering dengan react-snap, validasi di Google Search Console |
| Staff BNPB kesulitan menggunakan CMS | Sedang | Sedang | Pelatihan CMS + dokumentasi user guide + UI yang intuitif |

---

# 24. Kriteria Penerimaan (Acceptance Criteria)

## 24.1 Frontend

- [ ] Semua 12 section halaman publik ditampilkan dengan benar di mobile, tablet, dan desktop
- [ ] Data semua section diambil dari API Laravel (tidak ada data hardcoded)
- [ ] Lighthouse Performance ≥ 85, SEO ≥ 90, Accessibility ≥ 85
- [ ] Tidak ada broken link atau gambar yang gagal dimuat
- [ ] Animasi dan transisi berjalan mulus di semua browser target
- [ ] Prerendered HTML tersedia dan dapat di-crawl oleh Google
- [ ] Loading state (skeleton) ditampilkan saat data sedang dimuat
- [ ] Error state ditampilkan dengan tombol retry saat API gagal

## 24.2 Backend CMS

- [ ] Admin dapat login dan logout dengan aman
- [ ] Semua modul CMS dapat melakukan CRUD lengkap sesuai permission role
- [ ] Perubahan konten di CMS tercermin di frontend dalam < 5 detik (dengan cache busting)
- [ ] Upload gambar berhasil dan gambar dapat ditampilkan di frontend
- [ ] Endpoint API mengembalikan response dalam format JSON yang konsisten
- [ ] Editor tidak dapat menghapus konten (sesuai RBAC matrix)
- [ ] Viewer hanya bisa melihat, tidak bisa membuat/edit/hapus

## 24.3 Security

- [ ] Endpoint admin tidak dapat diakses tanpa token valid
- [ ] HTTPS aktif di semua environment
- [ ] Input form terlindungi dari XSS dan SQL injection
- [ ] Rate limiting aktif pada endpoint login dan API publik
- [ ] Session timeout berfungsi setelah 30 menit idle

## 24.4 Testing

- [ ] Backend test coverage ≥ 80%
- [ ] Frontend test coverage ≥ 70%
- [ ] Semua E2E critical test scenarios pass
- [ ] Load test berhasil dengan 100 concurrent users

---

# 25. Glosarium

| Istilah | Definisi |
| --- | --- |
| PRB | Pengurangan Risiko Bencana |
| BNPB | Badan Nasional Penanggulangan Bencana |
| CMS | Content Management System — sistem pengelolaan konten |
| REST API | Representational State Transfer Application Programming Interface |
| SPA | Single Page Application — aplikasi web satu halaman yang di-render di browser (client-side) |
| CSR | Client-Side Rendering — proses rendering halaman di browser, bukan di server |
| Prerendering | Proses generate HTML statis dari SPA saat build, untuk keperluan SEO |
| Sanctum | Library autentikasi API milik Laravel berbasis token |
| Shadcn/UI | Library komponen React aksesibel berbasis Radix UI dan Tailwind |
| Soft UI | Gaya desain dengan bayangan lembut, warna pastel, dan sudut membulat |
| RBAC | Role-Based Access Control — kontrol akses berdasarkan peran pengguna |
| UAT | User Acceptance Testing — pengujian oleh pengguna akhir |
| P0/P1/P2 | Prioritas fitur: P0 = wajib ada, P1 = sebaiknya ada, P2 = nilai tambah |
| FCP | First Contentful Paint — waktu hingga konten pertama muncul |
| LCP | Largest Contentful Paint — waktu hingga elemen terbesar muncul |
| JSON-LD | JavaScript Object Notation for Linked Data — format structured data untuk SEO |
| Google Stitch | Tool desain UI/UX dari Google untuk wireframing dan prototyping |
| react-snap | Tool prerendering untuk React SPA yang menghasilkan HTML statis |

---

# 26. Persetujuan Dokumen

Dengan menandatangani dokumen ini, pihak-pihak yang terlibat menyatakan telah membaca, memahami, dan menyetujui seluruh isi Product Requirements Document ini.

| Peran | Nama | Tanda Tangan | Tanggal |
| --- | --- | --- | --- |
| Product Owner |  |  |  |
| Tech Lead Frontend |  |  |  |
| Tech Lead Backend |  |  |  |
| Perwakilan BNPB |  |  |  |
