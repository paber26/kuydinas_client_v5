# Midtrans Local Setup

Checklist ini dipakai untuk development lokal dengan Vue + Laravel + Midtrans.

## 1. Frontend Env

Buat file `.env` dari `.env.example` lalu isi:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
VITE_MIDTRANS_CLIENT_KEY=Mid-client-xxxx
VITE_MIDTRANS_SNAP_URL=https://app.sandbox.midtrans.com/snap/snap.js
```

Catatan:

- `VITE_API_BASE_URL` tetap boleh memakai `127.0.0.1` untuk komunikasi frontend ke backend lokal.
- `VITE_MIDTRANS_CLIENT_KEY` diambil dari dashboard Midtrans.
- Untuk testing gunakan URL Snap sandbox.

## 2. Backend Env Laravel

Isi `.env` Laravel:

```env
APP_URL=http://127.0.0.1:8000

MIDTRANS_SERVER_KEY=SB-Mid-server-xxxx
MIDTRANS_CLIENT_KEY=Mid-client-xxxx
MIDTRANS_IS_PRODUCTION=false
MIDTRANS_IS_SANITIZED=true
MIDTRANS_IS_3DS=true
```

## 3. Jalankan Local Server

Frontend:

```bash
npm run dev
```

Backend Laravel:

```bash
php artisan serve
```

## 4. Expose Backend Dengan ngrok

Karena webhook Midtrans tidak bisa mengakses `localhost` atau `127.0.0.1`, expose backend Laravel:

```bash
ngrok http 8000
```

Contoh hasil:

```text
https://abc123.ngrok-free.app
```

## 5. Daftarkan Notification URL di Midtrans

Di dashboard Midtrans, isi:

```text
https://abc123.ngrok-free.app/api/payments/midtrans/webhook
```

Catatan:

- Gunakan URL `https`.
- Jangan gunakan `localhost`.
- Jika ngrok berubah, update lagi Notification URL di Midtrans.

## 6. Flow Top Up Yang Benar

1. Frontend memanggil backend create topup.
2. Backend membuat transaksi Midtrans dan mengembalikan `snap_token`.
3. Frontend membuka `window.snap.pay(snapToken)`.
4. Midtrans mengirim webhook ke backend.
5. Backend memverifikasi webhook.
6. Backend menambah saldo coin user.
7. Frontend refresh `/wallet`.

## 7. Yang Tidak Boleh Dilakukan

- Jangan masukkan `MIDTRANS_SERVER_KEY` ke frontend.
- Jangan tambah saldo coin dari callback frontend.
- Jangan daftarkan webhook ke `http://127.0.0.1:8000/...`.

## 8. Testing Cepat

- Login user di frontend.
- Pilih paket top up di halaman dompet.
- Pastikan backend mengembalikan `snap_token`.
- Selesaikan pembayaran sandbox.
- Cek apakah webhook masuk ke backend.
- Cek apakah saldo `/wallet` bertambah.
