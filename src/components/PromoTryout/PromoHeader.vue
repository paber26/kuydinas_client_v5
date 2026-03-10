<template>
  <section
    class="rounded-2xl bg-white shadow-sm border border-slate-100 p-4 sm:p-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
  >
    <div>
      <p class="text-xs font-semibold uppercase tracking-wide text-emerald-600">
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
          {{ summary.free }} gratis • {{ summary.discountPremium }} diskon
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
</template>

<script setup>
defineProps({
  summary: Object,
  coins: Number,
});
</script>
