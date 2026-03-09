<template>
  <section
    class="relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
  >
    <!-- subtle background glow -->
    <div
      class="absolute -top-10 -left-10 h-32 w-32 rounded-full bg-emerald-100/40 blur-2xl"
    ></div>

    <div class="relative">
      <!-- Header -->
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-sm font-semibold text-slate-800">Statistik Belajar</h3>

        <span
          class="text-[11px] px-2 py-1 rounded-full bg-emerald-50 text-emerald-600 font-medium"
        >
          SKD
        </span>
      </div>

      <!-- Stats grid -->
      <div class="grid grid-cols-3 gap-3">
        <!-- total tryout -->
        <div
          class="rounded-xl border border-slate-100 bg-slate-50/70 px-3 py-3 hover:bg-white hover:shadow-sm transition"
        >
          <p class="text-[11px] text-slate-500">Total Tryout</p>

          <div class="flex items-center justify-between mt-1">
            <p class="text-xl font-semibold text-slate-800">8</p>

            <span class="text-xs"> 📊 </span>
          </div>
        </div>

        <!-- average score -->
        <div
          class="rounded-xl border border-slate-100 bg-slate-50/70 px-3 py-3 hover:bg-white hover:shadow-sm transition"
        >
          <p class="text-[11px] text-slate-500">Rata-rata Nilai</p>

          <div class="flex items-center justify-between mt-1">
            <p class="text-xl font-semibold text-slate-800">312</p>

            <span class="text-xs"> 🧠 </span>
          </div>
        </div>

        <!-- ranking -->
        <div
          class="rounded-xl border border-slate-100 bg-slate-50/70 px-3 py-3 hover:bg-white hover:shadow-sm transition"
        >
          <p class="text-[11px] text-slate-500">Ranking</p>

          <div class="flex items-center justify-between mt-1">
            <p class="text-xl font-semibold text-emerald-600">Top 12%</p>

            <span class="text-xs"> 🏆 </span>
          </div>
        </div>
      </div>

      <!-- small helper text -->
      <p class="mt-3 text-[11px] text-slate-500">
        Statistik dihitung dari seluruh tryout yang telah kamu kerjakan.
      </p>
    </div>
  </section>
</template>
