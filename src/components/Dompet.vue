<template>
  <div class="min-h-full bg-slate-50">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <!-- HEADER + BALANCE -->
      <section
        class="rounded-2xl bg-white shadow-sm border border-slate-100 p-4 sm:p-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
      >
        <div>
          <p
            class="text-xs font-semibold uppercase tracking-wide text-emerald-600"
          >
            Dompet Kuy Dinas
          </p>
          <h1 class="mt-1 text-xl sm:text-2xl font-semibold text-slate-800">
            Dompet &amp; Transaksi
          </h1>
          <p class="mt-1 text-xs sm:text-sm text-slate-600 max-w-xl">
            Top up koin untuk mengikuti tryout premium, membuka pembahasan
            lengkap, dan latihan sepuasnya di Kuy Dinas.
          </p>
        </div>

        <div
          class="rounded-2xl bg-emerald-50 border border-emerald-100 px-4 py-3 flex items-center gap-3 w-full sm:w-auto"
        >
          <div
            class="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white text-xl"
          >
            🪙
          </div>
          <div class="flex-1">
            <p class="text-[11px] text-emerald-700 font-medium">
              Saldo koin kamu
            </p>
            <p class="text-xl sm:text-2xl font-semibold text-emerald-900">
              {{ balance.toLocaleString("id-ID") }}
              <span class="text-xs font-normal">koin</span>
            </p>
            <p class="text-[11px] text-emerald-700">
              Cukup untuk sekitar {{ estimatedTryouts }}x tryout premium.
            </p>
          </div>
        </div>
      </section>

      <!-- EVENT PROMO -->
      <section
        class="rounded-2xl bg-emerald-500 text-white p-4 sm:p-5 shadow-sm flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
      >
        <div class="flex items-start gap-3">
          <div
            class="hidden sm:flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-2xl"
          >
            🎉
          </div>
          <div>
            <p
              class="text-[11px] font-semibold uppercase tracking-wide text-white"
            >
              Promo Event Spesial
            </p>
            <h2 class="text-base sm:text-lg font-semibold text-white">
              {{ promoEvent.title }}
            </h2>
            <p class="mt-1 text-xs sm:text-sm text-white max-w-xl">
              {{ promoEvent.description }}
            </p>
            <p class="mt-1 text-[11px] text-white">
              Berlaku sampai:
              <span class="font-semibold">{{ promoEvent.until }}</span>
            </p>
          </div>
        </div>

        <div class="flex flex-col items-start sm:items-end gap-2">
          <div
            class="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium text-white"
          >
            💸 Bonus hingga {{ promoEvent.maxBonus }} koin
          </div>
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-xl bg-white text-emerald-700 px-4 py-2 text-xs sm:text-sm font-semibold shadow-sm hover:bg-white/90"
          >
            Lihat paket promo
          </button>
        </div>
      </section>

      <!-- TOP UP PACKAGES -->
      <section class="space-y-3">
        <div class="flex items-center justify-between gap-2">
          <h2 class="text-sm font-semibold text-slate-800">
            Pilih Paket Top Up
          </h2>
          <p class="text-[11px] text-slate-500">
            Semakin besar paket, semakin hemat koin per rupiah.
          </p>
        </div>

        <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <article
            v-for="pkg in packages"
            :key="pkg.id"
            class="relative rounded-2xl border bg-white px-4 py-4 shadow-sm flex flex-col gap-3"
            :class="
              pkg.highlight
                ? 'border-emerald-300 ring-1 ring-emerald-200'
                : 'border-slate-100'
            "
          >
            <div class="flex items-start justify-between gap-2">
              <div>
                <p class="text-xs text-slate-500">Paket {{ pkg.id }}</p>
                <p class="mt-1 text-lg font-semibold text-slate-900">
                  {{ pkg.coins.toLocaleString("id-ID") }} koin
                </p>
              </div>
              <span
                v-if="pkg.tag"
                class="inline-flex items-center rounded-full px-2 py-[2px] text-[10px] font-semibold"
                :class="
                  pkg.tag === 'Paling hemat'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-amber-100 text-amber-700'
                "
              >
                {{ pkg.tag }}
              </span>
            </div>

            <div class="text-xs text-slate-600">
              <p>
                Harga:
                <span class="font-semibold"
                  >Rp{{ pkg.price.toLocaleString("id-ID") }}</span
                >
              </p>
              <p v-if="pkg.bonus">
                Bonus:
                <span class="font-semibold"
                  >{{ pkg.bonus.toLocaleString("id-ID") }} koin</span
                >
              </p>
              <p
                v-if="pkg.effectiveRate"
                class="mt-1 text-[11px] text-slate-500"
              >
                ~ Rp{{ pkg.effectiveRate }}/100 koin
              </p>
            </div>

            <button
              type="button"
              class="mt-auto inline-flex items-center justify-center rounded-xl bg-emerald-500 px-3 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-emerald-600"
              @click="handleSelectPackage(pkg)"
            >
              Top Up Paket {{ pkg.id }}
            </button>
          </article>
        </div>

        <p class="mt-1 text-[11px] text-slate-500">
          Setelah memilih paket, kamu akan diarahkan ke WhatsApp admin untuk
          konfirmasi pembayaran dan pengisian koin.
        </p>
      </section>

      <!-- TRANSACTION HISTORY -->
      <section
        class="rounded-2xl bg-white shadow-sm border border-slate-100 px-4 py-4 sm:px-5 sm:py-5 space-y-3"
      >
        <div class="flex items-center justify-between gap-2">
          <h2 class="text-sm font-semibold text-slate-800">
            Riwayat Transaksi
          </h2>
          <button
            type="button"
            class="text-[11px] text-emerald-600 hover:underline"
          >
            Lihat semua
          </button>
        </div>

        <div
          v-if="transactions.length === 0"
          class="text-xs text-slate-500 italic"
        >
          Loading riwayat transaksi...
        </div>

        <ul v-else class="divide-y divide-slate-100 text-xs sm:text-sm">
          <li
            v-for="tx in transactions"
            :key="tx.id"
            class="flex items-center justify-between py-2"
          >
            <div>
              <p class="font-medium text-slate-800">
                +{{ tx.coins.toLocaleString("id-ID") }} koin
              </p>
              <p class="text-[11px] text-slate-500">
                {{ tx.method }} • {{ tx.date }}
              </p>
            </div>
            <p class="text-xs font-semibold text-emerald-700">
              Rp{{ tx.amount.toLocaleString("id-ID") }}
            </p>
          </li>
        </ul>
      </section>

      <!-- FOOTER NOTE -->
      <section class="text-[11px] text-slate-400 text-center pb-2">
        Koin Kuy Dinas hanya dapat digunakan untuk layanan di platform Kuy Dinas
        dan tidak dapat diuangkan kembali.
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";

// TODO: ganti nilai saldo dengan data asli dari API / store
const balance = 49500;

const estimatedTryouts = computed(() => {
  // asumsi 1 tryout premium ~ 8000 koin
  return Math.max(1, Math.round(balance / 8000));
});

// Promo event (bisa diganti sesuai event berjalan)
const promoEvent = {
  title: "Promo Akhir Tahun Kuy Dinas",
  description:
    "Top up minimal 20.000 koin dan dapatkan bonus koin hingga 30% untuk semua paket tryout SKD.",
  until: "31 Desember 2025",
  maxBonus: 5500,
};

// Paket top up (dummy, ganti dengan data backend kalau sudah siap)
const packages = [
  {
    id: 1,
    coins: 100,
    price: 10000,
    bonus: 0,
    tag: "Coba dulu",
    highlight: false,
    effectiveRate: 10000,
  },
  {
    id: 2,
    coins: 250,
    price: 20000,
    bonus: 50,
    tag: "Favorit",
    highlight: true,
    effectiveRate: 8000,
  },
  {
    id: 3,
    coins: 400,
    price: 30000,
    bonus: 120,
    tag: "Paling hemat",
    highlight: true,
    effectiveRate: 7500,
  },
  {
    id: 4,
    coins: 550,
    price: 40000,
    bonus: 200,
    tag: "Paling hemat",
    highlight: false,
    effectiveRate: 7273,
  },
];

// Dummy transaksi (bisa diganti API)
const transactions = [
  {
    id: 1,
    coins: 250,
    amount: 20000,
    method: "Transfer BCA",
    date: "20 November 2025, 19.30 WIB",
  },
  {
    id: 2,
    coins: 400,
    amount: 30000,
    method: "QRIS",
    date: "5 November 2025, 08.15 WIB",
  },
];

const router = useRouter();

const handleSelectPackage = (pkg) => {
  // TODO: ganti dengan logika nyata (mis. buka WA admin dengan template pesan)
  // contoh:
  // window.open(`https://wa.me/62xxxxxx?text=Halo%20Kak,%20saya%20ingin%20top%20up%20Paket%20${pkg.id}%20(${pkg.coins}%20koin).`, "_blank");
  console.log("Paket dipilih:", pkg);
  router.push("/dompet/pembayaran");
};
</script>
