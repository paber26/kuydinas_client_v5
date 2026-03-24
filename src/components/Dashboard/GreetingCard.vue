<template>
  <section
    class="relative overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm"
  >
    <!-- Background gradient -->
    <div
      class="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-transparent pointer-events-none"
    ></div>

    <div
      class="relative p-6 flex flex-col gap-6 md:flex-row md:items-center md:justify-between"
    >
      <!-- LEFT CONTENT -->
      <div class="flex items-start gap-4">
        <div>
          <p class="text-xs text-slate-500">Selamat datang kembali</p>

          <h2 class="text-2xl font-semibold text-slate-800">Aldo 👋</h2>

          <p class="mt-2 text-sm text-slate-600 max-w-xl">
            Website
            <span class="font-semibold text-emerald-600">Kuy Dinas</span>
            menyediakan try out SKD yang dapat diakses secara
            <span class="font-semibold">gratis</span> maupun
            <span class="font-semibold">premium</span>. Ayo lanjutkan latihanmu
            hari ini.
          </p>

          <!-- Buttons -->
          <div class="mt-4 flex flex-wrap gap-3">
            <button
              class="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-white shadow hover:bg-emerald-600 transition"
            >
              🚀 Mulai Tryout
            </button>

            <button
              class="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
            >
              📚 Lihat Materi SKD
            </button>
          </div>
        </div>
      </div>

      <!-- RIGHT INFO CARD -->
      <div
        class="grid grid-cols-2 gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4 w-full md:w-72"
      >
        <div>
          <p class="text-[11px] text-slate-500">Tryout terakhir</p>
          <p class="text-sm font-semibold text-slate-800">Premium 1</p>
        </div>

        <div>
          <p class="text-[11px] text-slate-500">Nilai terakhir</p>
          <p class="text-sm font-semibold text-slate-800">345</p>
        </div>

        <div>
          <p class="text-[11px] text-slate-500">Passing Grade</p>
          <p class="text-sm font-semibold text-slate-800">311</p>
        </div>

        <div>
          <p class="text-[11px] text-slate-500">Status</p>
          <p class="text-sm font-semibold text-emerald-600">Lulus</p>
        </div>
      </div>
    </div>
  </section>
</template>
