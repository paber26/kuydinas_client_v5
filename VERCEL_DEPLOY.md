# Vercel Deploy Setup

Dokumen ini dipakai untuk deploy frontend Vue ke Vercel dengan backend publik:

- Frontend: `https://kuydinasclientv5.vercel.app/`
- Backend API: `https://apili.kuydinas.id`
- Payment: Midtrans Snap

## Environment Variables di Vercel

Tambahkan environment variables berikut di project Vercel:

```env
VITE_API_BASE_URL=https://apili.kuydinas.id/api
VITE_MIDTRANS_CLIENT_KEY=Mid-client-H_w4TLBf1kgkfUHx
VITE_MIDTRANS_SNAP_URL=https://app.sandbox.midtrans.com/snap/snap.js
```

*(Catatan: Jika sudah ke production, ubah URL Snap ke https://app.midtrans.com/snap/snap.js).*

## Konfigurasi Dashboard Midtrans

Buka dashboard Midtrans (Sandbox/Production) dan atur **Notification URL**:

- URL: `https://apili.kuydinas.id/api/payments/midtrans/webhook`
- Pastikan URL ini bisa diakses secara publik.

## Catatan Frontend

`src/services/api.js` sudah membaca:

```js
import.meta.env.VITE_API_BASE_URL
```

Jadi tidak perlu mengubah code lagi untuk ganti domain backend.

## Checklist Backend

Pastikan backend `https://apili.kuydinas.id` sudah:

- menerima request `Authorization: Bearer <token>`
- mengizinkan CORS dari domain frontend Vercel
- mengizinkan method:
  - `GET`
  - `POST`
  - `PUT`
  - `PATCH`
  - `DELETE`
  - `OPTIONS`
- mengizinkan header:
  - `Authorization`
  - `Content-Type`
  - `Accept`

## Checklist Midtrans

Midtrans tidak perlu diarahkan ke domain Vercel untuk webhook.

Yang harus dipasang di dashboard Midtrans adalah webhook backend:

```text
https://apili.kuydinas.id/api/payments/midtrans/webhook
```

Frontend Vercel hanya butuh:

- `Client Key`
- `snap.js`
- `snap_token` dari backend

## Alur Produksi

1. Frontend Vercel memanggil backend `https://apili.kuydinas.id/api`
2. Backend membuat transaksi Midtrans
3. Frontend membuka Snap popup
4. Midtrans mengirim webhook ke backend
5. Backend menambah saldo coin
6. Frontend refresh `/wallet`

## Yang Perlu Dicek Jika Error

- CORS backend belum mengizinkan domain Vercel
- backend tidak mengembalikan `snap_token`
- URL webhook Midtrans salah
- frontend memakai Snap sandbox tetapi backend production, atau sebaliknya
