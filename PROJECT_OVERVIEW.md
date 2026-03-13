# Project Overview

Dokumen ini merangkum file dan bagian utama yang sudah dibuat di project `kuydinas_client_v5`.

## Teknologi Utama

- Frontend: Vue 3
- Router: Vue Router
- HTTP Client: Axios
- Styling: Tailwind CSS
- Build Tool: Vite

## Struktur Utama

### Root Project

- `package.json`
  Konfigurasi project, dependency, dan script build/dev.
- `vite.config.js`
  Konfigurasi Vite.
- `README.md`
  Dokumen dasar project.
- `index.html`
  Entry HTML utama aplikasi.

### Entry Frontend

- `src/main.js`
  Entry point Vue.
- `src/App.vue`
  Root component aplikasi.
- `src/style.css`
  Style global.

## Router

- `src/router/index.js`
  Mengatur seluruh route aplikasi.

Route utama yang tersedia:

- `/dashboard`
  Halaman dashboard.
- `/materiskd`
  Halaman materi SKD.
- `/promotryout`
  Halaman daftar promo tryout.
- `/promotryout/:id/panduan`
  Halaman panduan sebelum memulai tryout.
- `/pengerjaantryout`
  Halaman daftar tryout milik user.
- `/pengerjaantryout/:id`
  Halaman sesi pengerjaan tryout tanpa sidebar/navbar.
- `/login`
  Halaman login.
- `/register`
  Halaman register.
- `/auth/google/callback`
  Callback login Google.

## Layout

- `src/layout/DashboardLayout.vue`
  Layout utama yang memakai sidebar dan navbar.
- `src/layout/AuthLayout.vue`
  Layout untuk halaman autentikasi.
- `src/layout/TryoutLayout.vue`
  Layout khusus sesi tryout tanpa sidebar dan navbar.

## Services

- `src/services/api.js`
  Axios instance, base URL API, token auth, dan handling 401.
- `src/services/tryoutService.js`
  Kumpulan helper request untuk register tryout, start tryout, autosave, submit, result, ranking, dan history.

## Views

### Auth

- `src/views/Auth/Login.vue`
  Halaman login user.
- `src/views/Auth/Register.vue`
  Halaman registrasi user.
- `src/views/Auth/GoogleCallback.vue`
  Halaman callback autentikasi Google.

### Dashboard

- `src/views/Dashboard/Dashboard.vue`
  Halaman utama dashboard setelah login.

### Materi

- `src/views/MateriSkd/Materiskd.vue`
  Halaman materi SKD.

### Promo Tryout

- `src/views/PromoTryout/Promotryout.vue`
  Menampilkan daftar tryout yang belum diregistrasi user.
  Memuat data dari `/tryouts` dan memfilter berdasarkan `/history`.
- `src/views/PromoTryout/TryoutGuide.vue`
  Halaman panduan tryout sebelum user mulai ujian.
  Berisi:
  - panduan follow Instagram
  - panduan share ke WhatsApp
  - upload 4 bukti
  - validasi duplikat gambar
  - tombol lanjut mulai tryout

### Pengerjaan Tryout

- `src/views/PengerjaanTryout/PengerjaanTryout.vue`
  Halaman daftar tryout milik user.
  Berisi:
  - daftar tryout dari `/history`
  - tombol lanjut tryout
  - tombol lihat hasil
  - modal hasil tryout
- `src/views/PengerjaanTryout/TryoutSession.vue`
  Halaman sesi pengerjaan tryout.
  Berisi:
  - daftar nomor soal
  - tampilan soal dan opsi jawaban
  - timer remaining time
  - autosave jawaban
  - submit tryout
  - tampilan hasil tryout dari backend

### Tryout Lain

- `src/views/TryoutSkd/TryoutSkd.vue`
  Halaman tryout lama/alternatif yang masih ada di project.

## Components

### Layout Components

- `src/components/layout/Navbar.vue`
  Navbar utama.
- `src/components/layout/Sidebar.vue`
  Sidebar utama.
- `src/components/layout/Footer.vue`
  Footer aplikasi.

### Dashboard Components

- `src/components/Dashboard/GreetingCard.vue`
- `src/components/Dashboard/LastTryout.vue`
- `src/components/Dashboard/LearningPath.vue`
- `src/components/Dashboard/PromoCard.vue`
- `src/components/Dashboard/StatsCard.vue`
- `src/components/Dashboard/SupportCard.vue`

Komponen-komponen ini dipakai untuk menyusun tampilan dashboard.

### Promo Tryout Components

- `src/components/PromoTryout/PromoHeader.vue`
  Header ringkasan promo tryout.
- `src/components/PromoTryout/PromoBanner.vue`
  Banner informasi promo.
- `src/components/PromoTryout/PromoFilters.vue`
  Filter daftar tryout.
- `src/components/PromoTryout/PromoGrid.vue`
  Grid daftar paket tryout.
- `src/components/PromoTryout/PromoCard.vue`
  Card paket tryout dengan tombol ikut tryout.

### Komponen Tambahan

- `src/components/Axiostest.vue`
  Komponen testing request Axios.
- `src/components/HelloWorld.vue`
  Komponen default contoh.

## Asset

- `src/assets/logo-kuydinas.png`
  Logo aplikasi.
- `src/assets/vue.svg`
  Asset bawaan Vue.

## Catatan Flow Saat Ini

### Flow Promo Tryout

1. User membuka `Promotryout.vue`
2. Frontend memuat daftar tryout
3. Tryout yang sudah ada di history user tidak ditampilkan
4. User memilih tryout
5. User diarahkan ke `TryoutGuide.vue`
6. Setelah memenuhi langkah panduan, user mulai tryout

### Flow Pengerjaan Tryout

1. User masuk ke `TryoutSession.vue`
2. Frontend memuat detail tryout dan soal
3. Frontend memuat remaining time
4. User menjawab soal
5. Jawaban di-autosave
6. Saat submit, frontend mengirim jawaban ke backend
7. Hasil ditampilkan berdasarkan response backend

### Flow Hasil Tryout

1. User membuka `PengerjaanTryout.vue`
2. User klik `Lihat Hasil`
3. Frontend memanggil endpoint result
4. Score, jawaban benar, dan waktu selesai ditampilkan di modal

## File yang Ditambahkan/Difokuskan di Flow Tryout

- `src/views/PromoTryout/TryoutGuide.vue`
- `src/views/PengerjaanTryout/TryoutSession.vue`
- `src/views/PengerjaanTryout/PengerjaanTryout.vue`
- `src/views/PromoTryout/Promotryout.vue`
- `src/router/index.js`
- `src/layout/TryoutLayout.vue`
- `src/services/tryoutService.js`

## Tujuan Dokumen Ini

File ini dibuat sebagai ringkasan cepat agar lebih mudah memahami:

- halaman apa saja yang ada
- layout yang dipakai
- alur tryout user
- komponen utama project
- file penting yang berkaitan dengan flow tryout
