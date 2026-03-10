<template>
  <div class="min-h-full bg-slate-50">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <!-- HEADER + SUMMARY -->
      <section
        class="rounded-2xl bg-white shadow-sm border border-slate-100 p-4 sm:p-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
      >
        <div>
          <p
            class="text-xs font-semibold uppercase tracking-wide text-emerald-600"
          >
            Promo Try Out
          </p>
          <h1 class="mt-1 text-xl sm:text-2xl font-semibold text-slate-800">
            Pilih Paket Try Out SKD Sesuai Targetmu
          </h1>
          <p class="mt-2 text-xs sm:text-sm text-slate-600 max-w-xl">
            Latihan dengan soal terbaru, analisis nilai, dan pembahasan lengkap.
            Mulai dari paket
            <span class="font-semibold">gratis</span> sampai paket
            <span class="font-semibold">intensif</span>.
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-3">
          <div
            class="rounded-xl bg-slate-50 border border-slate-100 px-3 py-2 text-xs sm:text-sm text-slate-700"
          >
            <p class="font-semibold">🎯 {{ summary.total }} paket aktif</p>
            <p class="text-[11px] text-slate-500">
              {{ summary.free }} gratis • {{ summary.discount }} diskon
            </p>
          </div>

          <div
            class="flex items-center gap-2 rounded-full bg-amber-300/90 px-3 py-1.5 text-xs sm:text-sm font-semibold text-slate-800 shadow-sm"
          >
            <span>🪙</span>
            <span>{{ coins.toLocaleString("id-ID") }} koin</span>
          </div>
        </div>
      </section>

      <!-- INFO BANNER -->
      <section
        class="rounded-2xl bg-emerald-50 border border-emerald-100 px-4 py-3 text-xs sm:text-sm text-emerald-800 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
      >
        <div class="flex items-start gap-2">
          <span class="mt-[2px]">ℹ️</span>
          <p>
            Untuk mengerjakan tryout yang bukti pembayarannya sudah dikirim,
            silakan cek di menu
            <span class="font-semibold">Pengerjaan Try Out SKD</span>.
          </p>
        </div>
        <button
          class="inline-flex items-center justify-center rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white hover:bg-emerald-600 mt-1 sm:mt-0"
        >
          Buka Pengerjaan Try Out
        </button>
      </section>

      <!-- FILTERS -->
      <section class="flex flex-wrap gap-2 text-xs sm:text-sm">
        <button
          v-for="filter in filters"
          :key="filter.id"
          type="button"
          class="rounded-full border px-3 py-1.5 flex items-center gap-1.5"
          :class="
            selectedFilter === filter.id
              ? 'border-emerald-500 bg-emerald-50 text-emerald-700 font-medium'
              : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
          "
          @click="selectedFilter = filter.id"
        >
          <span v-if="filter.icon">{{ filter.icon }}</span>
          <span>{{ filter.label }}</span>
        </button>
      </section>

      <!-- GRID PAKET -->
      <section class="space-y-3">
        <h2 class="text-sm font-semibold text-slate-700">
          SKD CPNS
          <span class="text-xs font-normal text-slate-500">
            • {{ filteredPackages.length }} paket ditampilkan
          </span>
        </h2>

        <div
          v-if="filteredPackages.length"
          class="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3"
        >
          <article
            v-for="pkg in filteredPackages"
            :key="pkg.id"
            class="relative rounded-2xl border bg-white shadow-sm px-4 py-4 sm:px-5 sm:py-5 flex flex-col"
            :class="
              pkg.highlight
                ? 'border-emerald-200 bg-emerald-50/50'
                : 'border-slate-100'
            "
          >
            <!-- RIBBON / BADGE -->
            <div class="flex items-center justify-between gap-2">
              <p
                class="text-[11px] font-semibold uppercase tracking-wide"
                :class="pkg.highlight ? 'text-emerald-700' : 'text-slate-500'"
              >
                {{ pkg.category }}
              </p>
              <div class="flex gap-1.5">
                <span
                  v-if="pkg.isFree"
                  class="inline-flex items-center rounded-full bg-emerald-100 px-2 py-[2px] text-[10px] font-semibold text-emerald-700"
                >
                  GRATIS
                </span>
                <span
                  v-else-if="pkg.discount"
                  class="inline-flex items-center rounded-full bg-amber-100 px-2 py-[2px] text-[10px] font-semibold text-amber-700"
                >
                  {{ pkg.discount }}% OFF
                </span>
              </div>
            </div>

            <!-- TITLE -->
            <h3 class="mt-2 text-sm sm:text-base font-semibold text-slate-900">
              {{ pkg.title }}
            </h3>
            <p class="mt-1 text-xs text-slate-500">
              {{ pkg.subtitle }}
            </p>

            <!-- DETAIL LIST -->
            <dl class="mt-3 space-y-1.5 text-xs text-slate-700">
              <div class="flex items-center gap-2">
                <span>💰</span>
                <div class="flex-1 flex justify-between gap-2">
                  <dt class="text-slate-500">Harga</dt>
                  <dd class="font-semibold">
                    <span v-if="pkg.isFree">Gratis</span>
                    <span v-else
                      >{{ pkg.price.toLocaleString("id-ID") }} koin</span
                    >
                  </dd>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <span>⏱️</span>
                <div class="flex-1 flex justify-between gap-2">
                  <dt class="text-slate-500">Waktu</dt>
                  <dd>{{ pkg.duration }} menit</dd>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <span>📄</span>
                <div class="flex-1 flex justify-between gap-2">
                  <dt class="text-slate-500">Jumlah soal</dt>
                  <dd>{{ pkg.questionCount }} soal</dd>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <span>📊</span>
                <div class="flex-1 flex justify-between gap-2">
                  <dt class="text-slate-500">Tingkat</dt>
                  <dd>{{ pkg.level }}</dd>
                </div>
              </div>
            </dl>

            <!-- FOOTER -->
            <div class="mt-4 flex items-center justify-between gap-3">
              <div class="text-[11px] text-slate-500">
                <p v-if="pkg.seatsLeft &gt; 0">
                  Tersisa
                  <span class="font-semibold text-amber-600">
                    {{ pkg.seatsLeft }} kuota
                  </span>
                </p>
                <p v-else>
                  <span class="font-semibold text-rose-600"
                    >Kuota hampir penuh</span
                  >
                </p>
              </div>

              <button
                type="button"
                class="inline-flex items-center justify-center rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold shadow-sm transition"
                :class="
                  pkg.isFree
                    ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                    : 'bg-amber-400 text-slate-900 hover:bg-amber-500'
                "
                @click="handleSelect(pkg)"
              >
                Ikuti Tryout
              </button>
            </div>
          </article>
        </div>

        <div
          v-else
          class="rounded-2xl border border-dashed border-slate-200 bg-white px-4 py-10 text-center text-sm text-slate-500"
        >
          Belum ada paket tryout yang cocok dengan filter ini. Coba ubah filter
          di atas atau hubungi admin untuk rekomendasi paket terbaik untukmu.
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

const coins = 49500;

const tryoutPackages = [
  {
    id: 1,
    title: "Tryout SKD CPNS 2025 Paket 6",
    subtitle: "Soal terbaru + pembahasan lengkap",
    category: "Rekomendasi utama",
    price: 0,
    isFree: true,
    duration: 100,
    questionCount: 110,
    level: "Pemula - Menengah",
    seatsLeft: 999,
    discount: null,
    highlight: true,
    tag: "gratis",
  },
  {
    id: 2,
    title: "Paket 12 Soal Terbaru 2025",
    subtitle: "Fokus pada pola soal terkini seleksi CPNS",
    category: "Soal terbaru",
    price: 9000,
    isFree: false,
    duration: 100,
    questionCount: 110,
    level: "Menengah",
    seatsLeft: 23,
    discount: 35,
    highlight: true,
    tag: "populer",
  },
  {
    id: 3,
    title: "Tryout SKD 2024 Batch 10",
    subtitle: "Simulasi lengkap seperti ujian asli",
    category: "Best seller",
    price: 8000,
    isFree: false,
    duration: 100,
    questionCount: 110,
    level: "Menengah - Lanjutan",
    seatsLeft: 14,
    discount: 20,
    highlight: false,
    tag: "populer",
  },
  {
    id: 4,
    title: "Tryout SKD 2024 Batch 11",
    subtitle: "Latihan intensif untuk pemantapan",
    category: "Intensif 7 hari",
    price: 12000,
    isFree: false,
    duration: 100,
    questionCount: 110,
    level: "Lanjutan",
    seatsLeft: 7,
    discount: 40,
    highlight: false,
    tag: "diskon",
  },
  {
    id: 5,
    title: "Tryout SKD 2024 Batch 12",
    subtitle: "Cocok untuk cek kesiapan akhir",
    category: "Tryout akhir",
    price: 10000,
    isFree: false,
    duration: 100,
    questionCount: 110,
    level: "Menengah",
    seatsLeft: 12,
    discount: 15,
    highlight: false,
    tag: "populer",
  },
  {
    id: 6,
    title: "Tryout SKD 2024 Batch 1",
    subtitle: "Latihan dasar sebelum ambil paket intensif",
    category: "Pemanasan",
    price: 5000,
    isFree: false,
    duration: 90,
    questionCount: 90,
    level: "Pemula",
    seatsLeft: 31,
    discount: null,
    highlight: false,
    tag: "lainnya",
  },
];

const filters = [
  { id: "semua", label: "Semua paket", icon: "📦" },
  { id: "gratis", label: "Paket gratis", icon: "🆓" },
  { id: "populer", label: "Paling populer", icon: "🔥" },
  { id: "diskon", label: "Sedang diskon", icon: "💸" },
];

const selectedFilter = ref("semua");

const summary = computed(() => {
  const total = tryoutPackages.length;
  const free = tryoutPackages.filter((p) => p.isFree).length;
  const discount = tryoutPackages.filter((p) => p.discount).length;
  return { total, free, discount };
});

const filteredPackages = computed(() => {
  if (selectedFilter.value === "semua") return tryoutPackages;
  return tryoutPackages.filter((pkg) => {
    if (selectedFilter.value === "gratis") return pkg.isFree;
    return pkg.tag === selectedFilter.value;
  });
});

const handleSelect = (pkg) => {
  // TODO: ganti dengan navigasi ke halaman detail atau langsung mulai tryout
  // misalnya: router.push({ name: 'checkout', params: { id: pkg.id } })
  console.log("Paket dipilih:", pkg);
};
</script>
