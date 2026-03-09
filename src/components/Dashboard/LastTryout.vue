<template>
  <section
    class="relative overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition"
  >
    <!-- subtle gradient background -->
    <div
      class="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-teal-500/5 to-transparent pointer-events-none"
    ></div>

    <div class="relative p-6 space-y-5">
      <!-- HEADER -->
      <div class="flex items-start justify-between gap-4">
        <div>
          <p
            class="text-[11px] font-semibold uppercase tracking-wider text-emerald-600"
          >
            Tryout Terakhir
          </p>

          <h3 class="mt-1 text-lg font-semibold text-slate-800">
            Tryout SKD CPNS Paket Premium 1
          </h3>

          <p class="mt-1 text-xs text-slate-500">
            Dikerjakan pada 24 November 2025 • 110 soal
          </p>
        </div>

        <!-- score badge -->
        <div class="text-right">
          <p class="text-[11px] uppercase tracking-wide text-slate-400">
            Nilai Kamu
          </p>

          <div
            class="mt-1 inline-flex items-center justify-center rounded-xl bg-emerald-50 px-4 py-2"
          >
            <span class="text-2xl font-bold text-emerald-600"> 345 </span>
          </div>

          <p class="mt-1 text-[11px] text-slate-500">
            Passing grade: <span class="font-semibold">311</span>
          </p>
        </div>
      </div>

      <!-- PROGRESS -->
      <div class="space-y-2">
        <div class="flex justify-between text-xs text-slate-500">
          <span>Progres kelulusan</span>
          <span class="font-semibold text-emerald-600"> 111% </span>
        </div>

        <div class="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
          <div
            class="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
            style="width: 100%"
          ></div>
        </div>

        <p class="text-xs text-slate-500">
          Mantap! Kamu sudah melewati passing grade. Pertahankan performa kamu.
        </p>
      </div>

      <!-- ACTION BUTTONS -->
      <div class="flex flex-wrap gap-3 pt-2">
        <button
          class="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-white shadow hover:bg-emerald-600 transition"
        >
          ▶️ Ulangi Tryout
        </button>

        <button
          class="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
        >
          📖 Lihat Pembahasan
        </button>
      </div>
    </div>
  </section>
</template>
