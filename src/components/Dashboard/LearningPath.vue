<template>
  <section
    class="relative rounded-2xl bg-white p-6 shadow-sm border border-slate-100"
  >
    <!-- HEADER -->
    <div class="flex items-center justify-between mb-5">
      <div>
        <h3 class="text-base font-semibold text-slate-800">
          Jalur Belajar SKD Kamu
        </h3>

        <p class="mt-1 text-xs text-slate-500">
          Rekomendasi materi berdasarkan performa tryout terakhir kamu.
        </p>
      </div>

      <button
        class="text-xs font-medium text-emerald-600 hover:text-emerald-700 hover:underline transition"
      >
        Lihat semua materi
      </button>
    </div>

    <!-- MODULE LIST -->
    <div class="space-y-4">
      <!-- TWK -->
      <div
        class="group rounded-xl border border-slate-100 bg-slate-50/70 p-4 hover:bg-white hover:shadow-sm transition"
      >
        <div class="flex items-center justify-between">
          <div>
            <p
              class="text-sm font-medium text-slate-800 flex items-center gap-2"
            >
              🇮🇩 TWK - Wawasan Kebangsaan
              <span
                class="text-[10px] px-2 py-[2px] rounded-full bg-amber-100 text-amber-700 font-medium"
              >
                Sedang
              </span>
            </p>

            <p class="text-xs text-slate-500 mt-1">
              Perkuat materi Pancasila, UUD 1945, dan NKRI.
            </p>
          </div>

          <button
            class="text-xs font-medium text-emerald-600 border border-emerald-200 px-3 py-1.5 rounded-lg hover:bg-emerald-50 transition"
          >
            Mulai
          </button>
        </div>

        <!-- PROGRESS -->
        <div class="mt-3">
          <div class="flex justify-between text-[11px] text-slate-500 mb-1">
            <span>Progress</span>
            <span>60%</span>
          </div>

          <div class="h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              class="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
              style="width: 60%"
            ></div>
          </div>
        </div>
      </div>

      <!-- TIU -->
      <div
        class="group rounded-xl border border-slate-100 bg-slate-50/70 p-4 hover:bg-white hover:shadow-sm transition"
      >
        <div class="flex items-center justify-between">
          <div>
            <p
              class="text-sm font-medium text-slate-800 flex items-center gap-2"
            >
              🧠 TIU - Penalaran Logis
              <span
                class="text-[10px] px-2 py-[2px] rounded-full bg-rose-100 text-rose-700 font-medium"
              >
                Lemah
              </span>
            </p>

            <p class="text-xs text-slate-500 mt-1">
              Latihan soal deret angka, silogisme, dan analisis logika.
            </p>
          </div>

          <button
            class="text-xs font-medium text-emerald-600 border border-emerald-200 px-3 py-1.5 rounded-lg hover:bg-emerald-50 transition"
          >
            Mulai
          </button>
        </div>

        <div class="mt-3">
          <div class="flex justify-between text-[11px] text-slate-500 mb-1">
            <span>Progress</span>
            <span>25%</span>
          </div>

          <div class="h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              class="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
              style="width: 25%"
            ></div>
          </div>
        </div>
      </div>

      <!-- TKP -->
      <div
        class="group rounded-xl border border-slate-100 bg-slate-50/70 p-4 hover:bg-white hover:shadow-sm transition"
      >
        <div class="flex items-center justify-between">
          <div>
            <p
              class="text-sm font-medium text-slate-800 flex items-center gap-2"
            >
              🤝 TKP - Pelayanan Publik
              <span
                class="text-[10px] px-2 py-[2px] rounded-full bg-emerald-100 text-emerald-700 font-medium"
              >
                Kuat
              </span>
            </p>

            <p class="text-xs text-slate-500 mt-1">
              Pertahankan nilai dengan latihan simulasi kasus.
            </p>
          </div>

          <button
            class="text-xs font-medium text-emerald-600 border border-emerald-200 px-3 py-1.5 rounded-lg hover:bg-emerald-50 transition"
          >
            Mulai
          </button>
        </div>

        <div class="mt-3">
          <div class="flex justify-between text-[11px] text-slate-500 mb-1">
            <span>Progress</span>
            <span>80%</span>
          </div>

          <div class="h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              class="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
              style="width: 80%"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
