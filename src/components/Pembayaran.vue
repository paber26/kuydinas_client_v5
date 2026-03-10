<template>
  <div class="min-h-full bg-slate-50">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <!-- HEADER -->
      <section
        class="rounded-2xl bg-white shadow-sm border border-slate-100 p-4 sm:p-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <p
            class="text-xs font-semibold uppercase tracking-wide text-emerald-600"
          >
            Dompet Kuy Dinas
          </p>
          <h1 class="mt-1 text-xl sm:text-2xl font-semibold text-slate-800">
            Konfirmasi Pembayaran
          </h1>
          <p class="mt-1 text-xs sm:text-sm text-slate-600 max-w-xl">
            Pastikan detail paket top up dan nominal yang akan kamu bayar sudah
            sesuai. Setelah pembayaran, kirim bukti transfer ke admin Kuy Dinas.
          </p>
        </div>

        <div
          class="rounded-2xl bg-emerald-50 border border-emerald-100 px-4 py-3 text-xs sm:text-sm"
        >
          <p class="text-[11px] text-emerald-700 font-medium">
            Saldo koin saat ini
          </p>
          <p class="mt-1 text-lg font-semibold text-emerald-900">
            {{ currentBalance.toLocaleString("id-ID") }} koin
          </p>
          <p class="text-[11px] text-emerald-700">
            Setelah top up: sekitar
            <span class="font-semibold">
              {{
                (
                  currentBalance +
                  selectedPackage.coins +
                  (selectedPackage.bonus || 0)
                ).toLocaleString("id-ID")
              }}
            </span>
            koin
          </p>
        </div>
      </section>

      <!-- STEP INDICATOR -->
      <section
        class="rounded-2xl bg-white shadow-sm border border-slate-100 px-4 py-3 text-xs sm:text-sm"
      >
        <ol
          class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
        >
          <li class="flex items-center gap-2">
            <span
              class="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-[11px] font-semibold text-white"
            >
              1
            </span>
            <span>Pilih paket top up</span>
          </li>
          <li class="flex items-center gap-2">
            <span
              class="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-[11px] font-semibold text-white"
            >
              2
            </span>
            <span>Konfirmasi pembayaran (halaman ini)</span>
          </li>
          <li class="flex items-center gap-2">
            <span
              class="flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 text-[11px] font-semibold text-slate-600"
            >
              3
            </span>
            <span>Kirim bukti ke admin &amp; tunggu koin masuk</span>
          </li>
        </ol>
      </section>

      <!-- PACKAGE + PAYMENT SUMMARY -->
      <section
        class="rounded-2xl bg-white shadow-sm border border-slate-100 px-4 py-4 sm:px-5 sm:py-5 space-y-4"
      >
        <div
          class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"
        >
          <!-- Paket -->
          <div class="flex-1">
            <p class="text-xs font-semibold text-slate-500">
              Paket yang kamu pilih
            </p>
            <h2 class="mt-1 text-lg font-semibold text-slate-900">
              Paket {{ selectedPackage.id }} •
              {{ selectedPackage.coins.toLocaleString("id-ID") }} koin
            </h2>
            <p class="mt-1 text-xs text-slate-600">
              Harga paket:
              <span class="font-semibold">
                Rp{{ selectedPackage.price.toLocaleString("id-ID") }}
              </span>
              <span v-if="selectedPackage.bonus">
                • Bonus:
                <span class="font-semibold">
                  {{ selectedPackage.bonus.toLocaleString("id-ID") }} koin
                </span>
              </span>
            </p>
            <p class="mt-1 text-[11px] text-slate-500">
              Total koin yang akan kamu terima:
              <span class="font-semibold">
                {{ totalCoins.toLocaleString("id-ID") }} koin
              </span>
            </p>
          </div>

          <!-- Rincian pembayaran -->
          <div
            class="w-full sm:w-64 rounded-xl bg-slate-50 border border-slate-100 px-4 py-3 text-xs sm:text-sm"
          >
            <p class="text-[11px] text-slate-500">Rincian pembayaran</p>
            <div class="mt-2 flex items-center justify-between">
              <span>Top up koin</span>
              <span class="font-semibold">
                Rp{{ selectedPackage.price.toLocaleString("id-ID") }}
              </span>
            </div>
            <div class="mt-1 flex items-center justify-between text-[11px]">
              <span>Biaya admin</span>
              <span>Rp0</span>
            </div>
            <hr class="my-2 border-dashed border-slate-200" />
            <div
              class="flex items-center justify-between font-semibold text-slate-900"
            >
              <span>Total yang dibayar</span>
              <span>
                Rp{{ selectedPackage.price.toLocaleString("id-ID") }}
              </span>
            </div>
          </div>
        </div>

        <!-- Payment Gateway (Midtrans) -->
        <div
          class="rounded-xl border border-emerald-200 bg-emerald-50/70 px-4 py-3 text-xs sm:text-sm md:col-span-2"
        >
          <p class="font-semibold text-emerald-800">
            Pembayaran Otomatis (Midtrans)
          </p>
          <p class="mt-1 text-[11px] text-emerald-700">
            Gunakan virtual account / e-wallet untuk pembayaran otomatis.
            Setelah berhasil, koin akan masuk ke akunmu tanpa perlu mengirim
            bukti secara manual.
          </p>
          <ul class="mt-2 space-y-1 text-xs text-emerald-800">
            <li>
              • Metode yang didukung (contoh): BCA VA, BRI VA, QRIS, GoPay,
              ShopeePay.
            </li>
            <li>
              • Pastikan nominal pembayaran sesuai dengan total yang tertera di
              atas.
            </li>
          </ul>
          <div class="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-emerald-700"
              @click="handleAutoPayment"
            >
              ⚡ Bayar otomatis via Midtrans
            </button>
            <p class="text-[11px] text-emerald-800">
              Kamu akan diarahkan ke halaman pembayaran Midtrans.
            </p>
          </div>
        </div>

        <!-- PAYMENT METHODS -->
        <div class="grid gap-3 md:grid-cols-2">
          <!-- Transfer Bank -->
          <div
            class="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-xs sm:text-sm"
          >
            <p class="font-semibold text-slate-800">Transfer Bank</p>
            <p class="mt-1 text-[11px] text-slate-500">
              Lakukan transfer sesuai nominal ke rekening berikut:
            </p>
            <ul class="mt-2 space-y-1 text-xs">
              <li class="flex items-center justify-between">
                <span>BCA</span>
                <button
                  type="button"
                  class="inline-flex items-center gap-1 rounded-full bg-white px-2 py-[3px] text-[11px] font-medium text-slate-700 border border-slate-200 hover:bg-slate-50"
                  @click="copyToClipboard('1234567890 (a.n. Kuy Dinas BCA)')"
                >
                  1234567890
                  <span class="hidden sm:inline">(a.n. Kuy Dinas)</span>
                </button>
              </li>
              <li class="flex items-center justify-between">
                <span>BRI</span>
                <button
                  type="button"
                  class="inline-flex items-center gap-1 rounded-full bg-white px-2 py-[3px] text-[11px] font-medium text-slate-700 border border-slate-200 hover:bg-slate-50"
                  @click="copyToClipboard('0987654321 (a.n. Kuy Dinas BRI)')"
                >
                  0987654321
                  <span class="hidden sm:inline">(a.n. Kuy Dinas)</span>
                </button>
              </li>
            </ul>
            <p class="mt-2 text-[11px] text-slate-500 italic">
              Setelah transfer, simpan bukti pembayaran untuk dikirim ke admin.
            </p>
          </div>

          <!-- QRIS / E-Wallet -->
          <div
            class="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-xs sm:text-sm"
          >
            <p class="font-semibold text-slate-800">QRIS / E-Wallet</p>
            <p class="mt-1 text-[11px] text-slate-500">
              Kamu juga bisa membayar melalui QRIS atau e-wallet:
            </p>
            <ul class="mt-2 space-y-1 text-xs">
              <li>• QRIS (DANA / OVO / GoPay / LinkAja)</li>
              <li>
                • Nomor e-wallet akan dikirim oleh admin setelah kamu konfirmasi
                di WhatsApp.
              </li>
            </ul>
            <p class="mt-2 text-[11px] text-slate-500 italic">
              Cantumkan nominal yang sesuai agar proses verifikasi lebih cepat.
            </p>
          </div>
        </div>
      </section>

      <!-- CTA TO WHATSAPP -->
      <section
        class="rounded-2xl bg-emerald-50 border border-emerald-100 px-4 py-4 sm:px-5 sm:py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
      >
        <div class="text-xs sm:text-sm text-slate-700">
          <p class="font-semibold text-emerald-800">
            Langkah terakhir: konfirmasi ke admin Kuy Dinas
          </p>
          <p class="mt-1 max-w-xl">
            Setelah melakukan pembayaran, kirim pesan dan bukti transfer ke
            WhatsApp admin. Admin akan memproses penambahan koin ke akunmu
            maksimal dalam 10–15 menit.
          </p>
        </div>
        <div class="flex flex-col items-start sm:items-end gap-2">
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-emerald-600"
            @click="openWhatsApp"
          >
            💬 Konfirmasi via WhatsApp
          </button>
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-medium text-slate-700 hover:bg-slate-50"
            @click="goBack"
          >
            Pilih paket lain
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

// Dummy saldo awal (nanti ganti dari API/store)
const currentBalance = 49500;

// Ambil data paket dari query (fallback ke Paket 2 jika tidak ada)
const pkgId = Number(route.query.id || 2);
const pkgCoins = Number(route.query.coins || 250);
const pkgPrice = Number(route.query.price || 20000);
const pkgBonus = Number(route.query.bonus || 50) || 0;

const selectedPackage = computed(() => ({
  id: pkgId,
  coins: pkgCoins,
  price: pkgPrice,
  bonus: pkgBonus,
}));

const totalCoins = computed(
  () => selectedPackage.value.coins + (selectedPackage.value.bonus || 0)
);

const openWhatsApp = () => {
  const pkg = selectedPackage.value;
  const text = encodeURIComponent(
    `Halo Kak, saya ingin konfirmasi pembayaran top up koin Kuy Dinas.\n\n` +
      `Paket: ${pkg.id} (${pkg.coins} koin${
        pkg.bonus ? " + bonus " + pkg.bonus + " koin" : ""
      })\n` +
      `Nominal: Rp${pkg.price.toLocaleString("id-ID")}\n\n` +
      `Mohon diproses ya, terima kasih 🙏`
  );
  // Ganti 62xxxxxxxxxx dengan nomor WA admin
  window.open(`https://wa.me/62xxxxxxxxxx?text=${text}`, "_blank");
};

const goBack = () => {
  router.push("/dompet");
};

const copyToClipboard = async (value) => {
  try {
    await navigator.clipboard.writeText(value);
    alert("Nomor rekening berhasil disalin");
  } catch (e) {
    console.error("Gagal menyalin:", e);
  }
};

const handleAutoPayment = async () => {
  try {
    const pkg = selectedPackage.value;

    // TODO: sesuaikan URL endpoint backend sesuai dengan implementasi Laravel-mu
    const response = await fetch("/api/payments/midtrans/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        package_id: pkg.id,
        coins: pkg.coins,
        price: pkg.price,
        bonus: pkg.bonus || 0,
      }),
    });

    if (!response.ok) {
      throw new Error("Gagal memulai pembayaran otomatis");
    }

    const data = await response.json();

    // Jika backend mengembalikan redirect_url (Snap Redirect)
    if (data.redirect_url) {
      window.location.href = data.redirect_url;
      return;
    }

    // Jika backend mengembalikan snapToken dan Snap JS sudah dimuat (Snap Popup)
    if (
      data.snapToken &&
      window.snap &&
      typeof window.snap.pay === "function"
    ) {
      window.snap.pay(data.snapToken, {
        onSuccess: function () {
          alert("Pembayaran berhasil! Koin akan segera masuk ke akunmu.");
        },
        onPending: function () {
          alert(
            "Pembayaran masih diproses. Silakan cek status beberapa saat lagi."
          );
        },
        onError: function () {
          alert("Terjadi kesalahan saat memproses pembayaran.");
        },
        onClose: function () {
          console.log("Popup pembayaran ditutup oleh pengguna.");
        },
      });
      return;
    }

    alert("Respons pembayaran otomatis tidak dikenali. Silakan hubungi admin.");
  } catch (error) {
    console.error(error);
    alert(
      "Terjadi kesalahan saat memulai pembayaran otomatis. Silakan coba lagi atau gunakan metode manual."
    );
  }
};
</script>
