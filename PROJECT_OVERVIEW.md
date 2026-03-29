# Project Overview

Dokumen ini merangkum struktur, fitur utama, dan flow aplikasi `kuydinas_client_v5` berdasarkan implementasi yang saat ini ada di project.

## Teknologi Utama

- Frontend: Vue 3 (`script setup`)
- Router: Vue Router 4
- HTTP Client: Axios
- Styling: Tailwind CSS 4
- Build Tool: Vite
- Icon: `lucide-vue-next`

## Struktur Utama

### Root Project

- `package.json`
  Konfigurasi dependency dan script `dev`, `build`, `preview`.
- `vite.config.js`
  Konfigurasi Vite.
- `index.html`
  Entry HTML utama aplikasi.
- `README.md`
  Dokumentasi dasar project.
- `MIDTRANS_LOCAL_SETUP.md`
  Panduan setup lokal integrasi Midtrans.
- `VERCEL_DEPLOY.md`
  Catatan deployment ke Vercel.
- `vercel.json`
  Konfigurasi rewrite untuk SPA di Vercel agar semua path diarahkan ke root (`/`), mencegah 404 saat reload pada route non-root.

### Entry Frontend

- `src/main.js`
  Entry point aplikasi Vue.
- `src/App.vue`
  Root component aplikasi.
- `src/style.css`
  Styling global.

## Route Aplikasi

Route dikelola di `src/router/index.js`.

### Route Dengan Dashboard Layout

- `/dashboard`
  Halaman dashboard utama.
- `/materiskd`
  Halaman materi SKD.
- `/dompet`
  Halaman dompet, top up koin, redeem tryout, dan riwayat transaksi.
- `/promotryout`
  Halaman promo tryout yang belum dimiliki user.
- `/promotryout/:id/panduan`
  Halaman panduan sebelum memulai tryout.
- `/pengerjaantryout`
  Halaman daftar tryout milik user.

### Route Dengan Tryout Layout

- `/pengerjaantryout/:id`
  Halaman sesi pengerjaan tryout full focus tanpa sidebar dan navbar.

### Route Auth

- `/login`
  Halaman login email/password dan login Google.
- `/register`
  Halaman registrasi user.
- `/auth/google/callback`
  Callback autentikasi Google.

### Guard

- Route dengan `meta.requiresAuth` akan redirect ke `/login` jika token tidak ada.
- User yang sudah login akan diarahkan ke `/dashboard` saat membuka `/login` atau `/register`.

## Layout

- `src/layout/DashboardLayout.vue`
  Layout utama aplikasi setelah login.
- `src/layout/AuthLayout.vue`
  Layout halaman autentikasi.
- `src/layout/TryoutLayout.vue`
  Layout khusus sesi tryout.

## Fitur Utama

### 1. Autentikasi User

File utama:

- `src/views/Auth/Login.vue`
- `src/views/Auth/Register.vue`
- `src/views/Auth/GoogleCallback.vue`
- `src/services/api.js`
- `src/services/endpoints.js`

Kemampuan saat ini:

- Login menggunakan email dan password.
- Register user baru.
- Login dengan Google melalui redirect ke backend.
- Penyimpanan token di `localStorage`.
- Axios interceptor otomatis menambahkan bearer token ke setiap request.
- Handling global `401 Unauthorized` untuk menghapus token dan redirect ke `/login`.

### 2. Dashboard

File utama:

- `src/views/Dashboard/Dashboard.vue`
- `src/components/Dashboard/GreetingCard.vue`
- `src/components/Dashboard/LastTryout.vue`
- `src/components/Dashboard/LearningPath.vue`
- `src/components/Dashboard/StatsCard.vue`
- `src/components/Dashboard/PromoCard.vue`
- `src/components/Dashboard/SupportCard.vue`

Kemampuan saat ini:

- Menampilkan ringkasan dashboard user.
- Menyusun informasi utama melalui beberapa card terpisah.

### 3. Materi SKD

File utama:

- `src/views/MateriSkd/Materiskd.vue`

Kemampuan saat ini:

- Menyediakan halaman materi pembelajaran SKD.

### 4. Promo Tryout

File utama:

- `src/views/PromoTryout/Promotryout.vue`
- `src/components/PromoTryout/PromoHeader.vue`
- `src/components/PromoTryout/PromoBanner.vue`
- `src/components/PromoTryout/PromoFilters.vue`
- `src/components/PromoTryout/PromoGrid.vue`
- `src/components/PromoTryout/PromoCard.vue`

Kemampuan saat ini:

- Mengambil daftar tryout dari endpoint `/tryouts`.
- Mengambil history tryout user dari `/history`.
- Mengambil saldo koin user dari `/wallet`.
- Menyembunyikan tryout yang sudah dimiliki user.
- Menampilkan ringkasan jumlah paket.
- Menyediakan filter:
  - semua paket
  - paket gratis
  - paket populer
  - paket diskon
- Mengarahkan user ke halaman panduan sebelum mulai tryout.

### 5. Panduan Sebelum Tryout

File utama:

- `src/views/PromoTryout/TryoutGuide.vue`

Kemampuan saat ini:

- Menampilkan judul, kategori, dan tag tryout dari route/query.
- Menampilkan langkah wajib sebelum tryout.
- Validasi upload 4 bukti:
  - 1 bukti follow Instagram
  - 3 bukti share ke WhatsApp
- Menolak file duplikat.
- Menyediakan checklist verifikasi.
- Mengaktifkan tombol mulai hanya jika semua syarat terpenuhi.

### 6. Pengerjaan Tryout

File utama:

- `src/views/PengerjaanTryout/PengerjaanTryout.vue`
- `src/views/PengerjaanTryout/TryoutSession.vue`
- `src/services/tryoutService.js`

Kemampuan saat ini:

- Menampilkan daftar tryout user dari endpoint `/history`.
- Menampilkan status tryout.
- Tombol lanjut tryout untuk tryout yang belum selesai.
- Tombol lihat hasil untuk tryout yang sudah selesai.
- Modal hasil tryout berisi skor, ranking, jawaban benar, dan waktu selesai.
- Halaman sesi tryout menampilkan:
  - daftar nomor soal
  - indikator soal aktif, terjawab, dan ragu-ragu
  - ukuran font soal
  - timer sisa waktu
  - tombol navigasi antar soal
  - fitur tandai ragu-ragu
  - autosave jawaban
  - submit tryout
  - tampilan ringkasan hasil setelah selesai
- Service tryout sudah mencakup helper untuk:
  - register tryout
  - start tryout
  - autosave
  - submit
  - remaining time
  - result
  - history
  - ranking
  - my rank

### 7. Fitur Dompet

File utama:

- `src/views/Dompet/Dompet.vue`
- `src/views/Dompet/TopupPackages.vue`
- `src/services/walletService.js`
- `src/services/endpoints.js`
- `MIDTRANS_LOCAL_SETUP.md`

Kemampuan saat ini:

- Menampilkan saldo koin user dari endpoint `/wallet`.
- Menampilkan estimasi jumlah tryout premium yang bisa dibeli dari saldo saat ini.
- Menampilkan promo event di halaman dompet.
- Mengambil dan menampilkan paket top up dari endpoint `/wallet/topup-packages`.
- Normalisasi data paket top up dari berbagai kemungkinan format response backend, termasuk dukungan field bonus:
  - `bonus`, `bonus_coins`, `bonus_coin`, atau `coin_bonus`.
- Membuat transaksi top up melalui endpoint `/wallet/topup/create`.
- Membuka pembayaran Midtrans Snap jika backend mengembalikan `snap_token`.
- Fallback ke `redirect_url` jika Snap tidak tersedia atau backend memakai redirect flow.
- Mengecek detail transaksi top up terbaru melalui `/wallet/topup/:id`.
- Refresh saldo dan riwayat transaksi setelah pembayaran berhasil atau status berubah.
- Menampilkan daftar tryout yang bisa ditukar dengan koin dari endpoint `/wallet/redeemable-tryouts`.
- Menukar koin dengan tryout melalui endpoint `/wallet/redeem-tryout/:id`.
- Menampilkan status kecukupan saldo untuk setiap tryout premium.
- Menampilkan riwayat transaksi koin pada halaman dompet.
- Menampilkan feedback sukses/error ke user selama proses wallet.

Komponen terkait:

- `TopupPackages.vue`
  - Bertanggung jawab menampilkan grid kartu paket top up.
  - Props: `packages`, `loading`, `error`, `submittingId`.
  - Emit: `select` ketika user memilih paket untuk diproses pembayaran.

## Service Layer

### `src/services/api.js`

- Membuat instance Axios dengan `baseURL` dari `VITE_API_BASE_URL`.
- Menambahkan header default JSON.
- Menambahkan Authorization header otomatis jika token tersedia.
- Menangani response `401` secara global.

### `src/services/endpoints.js`

Menyimpan konstanta endpoint untuk:

- auth user
- auth admin
- tryout
- wallet
- admin soal
- admin tryout

### `src/services/tryoutService.js`

Helper request untuk flow tryout user, termasuk fallback aman jika endpoint remaining time tidak tersedia.

### `src/services/walletService.js`

Helper request untuk flow dompet:

- `getWallet()`
- `getRedeemableTryouts()`
- `createWalletTopup(payload)`
- `redeemWalletTryout(tryoutId)`
- `getWalletTopupPackages()`
- `getWalletTopupDetail(id)`

## Komponen Layout dan Navigasi

File utama:

- `src/components/layout/Navbar.vue`
- `src/components/layout/Sidebar.vue`
- `src/components/layout/Footer.vue`

Kemampuan saat ini:

- Sidebar menyediakan akses ke dashboard, tryout, materi, dompet, dan promo tryout.
- Tersedia tombol logout yang memanggil endpoint logout user lalu menghapus token lokal.

## Flow Utama Aplikasi

### Flow Login

1. User membuka `/login`.
2. User login dengan email/password atau Google.
3. Token disimpan di `localStorage`.
4. User diarahkan ke `/dashboard`.

### Flow Promo Tryout

1. User membuka `/promotryout`.
2. Frontend memuat daftar tryout, history user, dan saldo dompet.
3. Tryout yang sudah dimiliki tidak ditampilkan.
4. User memilih paket tryout.
5. User diarahkan ke `/promotryout/:id/panduan`.

### Flow Mulai Tryout

1. User menyelesaikan checklist dan upload bukti di `TryoutGuide.vue`.
2. Setelah valid, user mulai tryout.
3. User diarahkan ke sesi tryout `/pengerjaantryout/:id`.

### Flow Pengerjaan Tryout

1. Frontend memuat detail tryout dan daftar soal.
2. Frontend memuat remaining time jika endpoint tersedia.
3. User menjawab soal.
4. Jawaban disimpan dengan autosave.
5. User submit atau mengakhiri tryout.
6. Hasil ditampilkan dari response backend.

### Flow Hasil Tryout

1. User membuka `/pengerjaantryout`.
2. User klik `Lihat Hasil`.
3. Frontend memanggil endpoint result.
4. Skor, ranking, jawaban benar, dan waktu selesai ditampilkan di modal.

### Flow Dompet dan Top Up

1. User membuka `/dompet`.
2. Frontend memuat saldo, transaksi, paket top up, dan tryout redeemable.
3. User memilih paket top up.
4. Frontend membuat transaksi top up ke backend.
5. Jika tersedia, Midtrans Snap dibuka untuk proses pembayaran.
6. Setelah sukses atau status berubah, saldo dan riwayat dompet dimuat ulang.

### Flow Redeem Tryout Dengan Koin

1. User membuka daftar tryout redeemable di halaman dompet.
2. Frontend menandai apakah saldo user cukup atau tidak.
3. User klik tukar koin pada tryout yang tersedia.
4. Frontend memanggil endpoint redeem.
5. Saldo dompet dan daftar tryout dimuat ulang.

## Fitur Baru yang Sudah Ditambahkan

Bagian ini merangkum fitur baru yang sudah tampak aktif di implementasi saat ini:

- Halaman `Dompet` sudah aktif sebagai route `/dompet`.
- Integrasi service wallet sudah tersedia di `src/services/walletService.js`.
- Paket top up diambil dari backend, bukan lagi data dummy statis.
- Pembuatan transaksi top up sudah memanggil backend.
- Midtrans Snap sudah disiapkan di frontend melalui script dinamis dan env:
  - `VITE_MIDTRANS_CLIENT_KEY`
  - `VITE_MIDTRANS_SNAP_URL`
- Frontend sudah memiliki fallback ke `redirect_url` jika Snap popup tidak dipakai.
- Detail transaksi top up terbaru bisa dicek ulang untuk sinkronisasi status.
- User sudah bisa redeem tryout premium dengan koin.
- Riwayat transaksi dompet sudah ditampilkan di UI.
- Promo tryout sekarang ikut membaca saldo wallet user.
- Pemecahan UI paket top up menjadi komponen `TopupPackages.vue` agar mudah dirawat.
- Penambahan file `vercel.json` untuk rewrite SPA sehingga reload pada route seperti `/dompet` tidak menghasilkan 404 di Vercel.

## Catatan Implementasi Saat Ini

- Integrasi dompet sudah jauh lebih maju dibanding dokumentasi overview sebelumnya.
- Frontend dompet sudah siap untuk flow top up dan redeem, tetapi keberhasilan end-to-end tetap bergantung pada response backend dan webhook Midtrans.
- Dokumentasi setup lokal Midtrans tersedia di `MIDTRANS_LOCAL_SETUP.md`.
- Troubleshooting Private Network Access (PNA) untuk Snap saat development lokal tersedia di `MIDTRANS_LOCAL_SETUP.md` (Chrome flag atau alternatif HTTPS/ngrok).

## Tujuan Dokumen

File ini dibuat agar lebih mudah memahami:

- struktur project
- route yang tersedia
- fitur utama aplikasi
- flow tryout user
- flow dompet dan top up
- file penting yang terkait dengan fitur inti
