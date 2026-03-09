<template>
  <section
    class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 p-5 text-white shadow-sm"
  >
    <!-- decorative glow -->
    <div
      class="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/10 blur-2xl"
    ></div>

    <div class="relative space-y-4">
      <!-- label -->
      <span
        class="inline-flex items-center gap-1 rounded-full bg-black/50 teba px-2.5 py-1 text-[11px] font-medium"
      >
        🔥 Promo Tryout
      </span>

      <!-- title -->
      <h3 class="text-sm font-semibold leading-snug">
        Diskon hingga <span class="text-yellow-200 font-bold">50%</span> untuk
        paket premium SKD
      </h3>

      <!-- description -->
      <p class="text-xs text-emerald-100">
        Dapatkan akses ke semua tryout SKD, pembahasan lengkap, dan analisis
        nilai untuk meningkatkan peluang kamu lulus CPNS.
      </p>

      <!-- feature list -->
      <ul class="space-y-1 text-[11px] text-emerald-100">
        <li>• Akses semua tryout premium</li>
        <li>• Pembahasan lengkap setiap soal</li>
        <li>• Statistik dan analisis nilai</li>
      </ul>

      <!-- CTA button -->
      <button
        class="mt-2 w-full rounded-xl bg-white px-3 py-2 text-xs font-semibold text-emerald-700 shadow hover:bg-slate-100 transition"
      >
        Lihat Promo Sekarang
      </button>
    </div>
  </section>
</template>
