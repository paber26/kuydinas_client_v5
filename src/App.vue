<template>
  <div class="min-h-screen flex md:pl-64 relative">
    <!-- SIDEBAR -->
    <Sidebar />
    <div
      id="sidebar-backdrop"
      class="fixed inset-0 z-20 bg-black/40 hidden md:hidden"
    ></div>

    <!-- MAIN AREA -->
    <div class="flex-1 flex flex-col min-w-0">
      <!-- Navbar -->
      <Navbar />

      <!-- CONTENT -->
      <main class="flex-1 overflow-y-auto">
        <div class="max-w-6xl mx-auto px-6 py-6 space-y-6">
          <!-- Greeting & CTA -->
          <section
            class="rounded-2xl bg-white shadow-sm border border-slate-100 p-5"
          >
            <div
              class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p class="text-xs text-slate-500">Selamat datang kembali,</p>
                <h2 class="text-2xl font-semibold text-slate-800">Aldo 👋</h2>
                <p class="mt-2 text-sm text-slate-600 max-w-xl">
                  Website Kuy Dinas menyediakan try out SKD yang dapat diakses
                  secara
                  <span class="font-semibold">gratis</span> maupun
                  <span class="font-semibold">premium</span>. Ayo lanjutkan
                  latihanmu hari ini!
                </p>
                <div class="mt-4 flex flex-wrap gap-3">
                  <button
                    class="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-white shadow hover:bg-emerald-600 transition"
                  >
                    🚀 Mulai Tryout
                  </button>
                  <button
                    class="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
                  >
                    📚 Lihat Materi SKD
                  </button>
                </div>
              </div>
              <div
                class="rounded-2xl bg-slate-50 border border-slate-100 px-4 py-3 w-full md:w-64"
              >
                <p class="text-xs text-slate-500 mb-1">Info singkat</p>
                <ul class="text-xs text-slate-600 space-y-1">
                  <li>• Tryout terakhir: Paket Premium 1</li>
                  <li>
                    • Nilai terakhir: <span class="font-semibold">345</span>
                  </li>
                  <li>
                    • Passing grade: <span class="font-semibold">311</span>
                  </li>
                  <li>
                    • Status:
                    <span class="text-emerald-600 font-semibold">Lulus ✅</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <!-- GRID: kiri (besar) + kanan -->
          <div class="grid gap-6 lg:grid-cols-3">
            <!-- KIRI -->
            <div class="space-y-6 lg:col-span-2">
              <!-- Tryout Terakhir -->
              <section
                class="rounded-2xl bg-white p-5 shadow-sm border border-slate-100"
              >
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <p
                      class="text-xs font-semibold uppercase tracking-wide text-emerald-600"
                    >
                      Tryout terakhir
                    </p>
                    <h3 class="mt-1 text-lg font-semibold text-slate-800">
                      Tryout SKD CPNS Paket Premium 1
                    </h3>
                    <p class="mt-1 text-xs text-slate-500">
                      Dikerjakan pada 24 November 2025 • 110 soal
                    </p>
                  </div>
                  <div class="text-right">
                    <p
                      class="text-[11px] uppercase tracking-wide text-slate-400"
                    >
                      Nilai kamu
                    </p>
                    <p class="text-2xl font-bold text-emerald-600">345</p>
                    <p class="text-[11px] text-slate-500">
                      Passing grade: <span class="font-semibold">311</span>
                    </p>
                  </div>
                </div>

                <!-- Progress -->
                <div class="mt-4">
                  <div class="flex justify-between text-xs text-slate-500 mb-1">
                    <span>Progres kelulusan</span>
                    <span>111%</span>
                  </div>
                  <div
                    class="h-2 w-full rounded-full bg-slate-100 overflow-hidden"
                  >
                    <div
                      class="h-full rounded-full bg-emerald-500"
                      style="width: 100%"
                    ></div>
                  </div>
                  <p class="mt-2 text-xs text-slate-500">
                    Mantap! Kamu sudah melewati passing grade. Pertahankan dan
                    tingkatkan lagi 💪
                  </p>
                </div>

                <div class="mt-4 flex flex-wrap gap-3">
                  <button
                    class="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600 transition"
                  >
                    ▶️ Ulangi Tryout
                  </button>
                  <button
                    class="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
                  >
                    📖 Lihat Pembahasan
                  </button>
                </div>
              </section>

              <!-- Jalur Belajar -->
              <section
                class="rounded-2xl bg-white p-5 shadow-sm border border-slate-100"
              >
                <div class="flex items-center justify-between">
                  <div>
                    <h3 class="text-base font-semibold text-slate-800">
                      Jalur Belajar SKD Kamu
                    </h3>
                    <p class="mt-1 text-xs text-slate-500">
                      Ikuti rekomendasi materi berdasarkan nilai tryout kamu.
                    </p>
                  </div>
                  <button class="text-xs text-emerald-600 hover:underline">
                    Lihat semua materi
                  </button>
                </div>

                <div class="mt-4 space-y-3">
                  <!-- modul 1 -->
                  <div
                    class="rounded-xl border border-slate-100 bg-slate-50/70 px-4 py-3 flex items-center justify-between gap-3"
                  >
                    <div>
                      <p class="text-sm font-medium text-slate-800">
                        TWK - Wawasan Kebangsaan
                        <span
                          class="ml-2 inline-flex items-center rounded-full px-2 py-[2px] text-[10px] font-medium bg-amber-100 text-amber-700"
                        >
                          Sedang
                        </span>
                      </p>
                      <p class="text-xs text-slate-500">
                        Perkuat materi Pancasila, UUD 1945, dan NKRI.
                      </p>
                      <div class="mt-2">
                        <div
                          class="flex justify-between text-[10px] text-slate-500 mb-1"
                        >
                          <span>Progres materi</span>
                          <span>60%</span>
                        </div>
                        <div
                          class="h-1.5 w-full rounded-full bg-slate-200 overflow-hidden"
                        >
                          <div
                            class="h-full rounded-full bg-emerald-500"
                            style="width: 60%"
                          ></div>
                        </div>
                      </div>
                    </div>
                    <button
                      class="shrink-0 rounded-xl bg-white px-3 py-2 text-xs font-medium text-emerald-600 border border-emerald-100 hover:bg-emerald-50 transition"
                    >
                      Mulai
                    </button>
                  </div>

                  <!-- modul 2 -->
                  <div
                    class="rounded-xl border border-slate-100 bg-slate-50/70 px-4 py-3 flex items-center justify-between gap-3"
                  >
                    <div>
                      <p class="text-sm font-medium text-slate-800">
                        TIU - Penalaran Logis
                        <span
                          class="ml-2 inline-flex items-center rounded-full px-2 py-[2px] text-[10px] font-medium bg-rose-100 text-rose-700"
                        >
                          Lemah
                        </span>
                      </p>
                      <p class="text-xs text-slate-500">
                        Latihan soal deret angka, silogisme, dan analisis.
                      </p>
                      <div class="mt-2">
                        <div
                          class="flex justify-between text-[10px] text-slate-500 mb-1"
                        >
                          <span>Progres materi</span>
                          <span>25%</span>
                        </div>
                        <div
                          class="h-1.5 w-full rounded-full bg-slate-200 overflow-hidden"
                        >
                          <div
                            class="h-full rounded-full bg-emerald-500"
                            style="width: 25%"
                          ></div>
                        </div>
                      </div>
                    </div>
                    <button
                      class="shrink-0 rounded-xl bg-white px-3 py-2 text-xs font-medium text-emerald-600 border border-emerald-100 hover:bg-emerald-50 transition"
                    >
                      Mulai
                    </button>
                  </div>

                  <!-- modul 3 -->
                  <div
                    class="rounded-xl border border-slate-100 bg-slate-50/70 px-4 py-3 flex items-center justify-between gap-3"
                  >
                    <div>
                      <p class="text-sm font-medium text-slate-800">
                        TKP - Pelayanan Publik
                        <span
                          class="ml-2 inline-flex items-center rounded-full px-2 py-[2px] text-[10px] font-medium bg-emerald-100 text-emerald-700"
                        >
                          Kuat
                        </span>
                      </p>
                      <p class="text-xs text-slate-500">
                        Pertahankan nilai TKP-mu dengan mengulang simulasi
                        kasus.
                      </p>
                      <div class="mt-2">
                        <div
                          class="flex justify-between text-[10px] text-slate-500 mb-1"
                        >
                          <span>Progres materi</span>
                          <span>80%</span>
                        </div>
                        <div
                          class="h-1.5 w-full rounded-full bg-slate-200 overflow-hidden"
                        >
                          <div
                            class="h-full rounded-full bg-emerald-500"
                            style="width: 80%"
                          ></div>
                        </div>
                      </div>
                    </div>
                    <button
                      class="shrink-0 rounded-xl bg-white px-3 py-2 text-xs font-medium text-emerald-600 border border-emerald-100 hover:bg-emerald-50 transition"
                    >
                      Mulai
                    </button>
                  </div>
                </div>
              </section>
            </div>

            <!-- KANAN -->
            <div class="space-y-6">
              <!-- Statistik -->
              <section
                class="rounded-2xl bg-white p-4 shadow-sm border border-slate-100"
              >
                <h3 class="text-sm font-semibold text-slate-800 mb-3">
                  Statistik Belajar
                </h3>
                <div
                  class="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3"
                >
                  <div class="rounded-xl bg-slate-50 px-3 py-3">
                    <p class="text-[11px] text-slate-500">
                      Total tryout dikerjakan
                    </p>
                    <p class="mt-1 text-xl font-semibold text-slate-800">8</p>
                  </div>
                  <div class="rounded-xl bg-slate-50 px-3 py-3">
                    <p class="text-[11px] text-slate-500">Rata-rata nilai</p>
                    <p class="mt-1 text-xl font-semibold text-slate-800">312</p>
                  </div>
                  <div class="rounded-xl bg-slate-50 px-3 py-3">
                    <p class="text-[11px] text-slate-500">Peringkat SKD</p>
                    <p class="mt-1 text-xl font-semibold text-slate-800">
                      Top 12%
                    </p>
                  </div>
                </div>
                <p class="mt-3 text-[11px] text-slate-500">
                  Peringkat dihitung dari seluruh peserta Kuy Dinas yang
                  mengikuti tryout.
                </p>
              </section>

              <!-- Promo -->
              <section
                class="rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 p-4 text-white shadow-sm"
              >
                <p
                  class="inline-flex items-center rounded-full bg-white/15 px-2 py-[2px] text-[11px] font-medium mb-2"
                >
                  🔥 Promo Try Out
                </p>
                <h3 class="text-base font-semibold">
                  Diskon hingga 50% paket premium
                </h3>
                <p class="mt-1 text-xs text-emerald-50">
                  Akses semua tryout SKD + pembahasan lengkap dan analisis
                  nilai.
                </p>
                <ul class="mt-3 space-y-1 text-xs text-emerald-50">
                  <li>• Paket Harian: mulai 5.000 koin</li>
                  <li>• Paket 7 Hari Intensif</li>
                  <li>• Paket Sampai Lulus SKD</li>
                </ul>
                <button
                  class="mt-4 w-full rounded-xl bg-white/95 px-3 py-2 text-xs font-semibold text-emerald-700 hover:bg-white transition"
                >
                  Lihat semua promo
                </button>
              </section>

              <!-- Hubungi Admin -->
              <section
                class="rounded-2xl bg-white p-4 shadow-sm border border-rose-100"
              >
                <div class="flex items-start gap-3">
                  <div
                    class="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-lg"
                  >
                    💬
                  </div>
                  <div>
                    <h3 class="text-sm font-semibold text-slate-800">
                      Hubungi Admin apabila ada kendala
                    </h3>
                    <p class="mt-1 text-xs text-slate-500">
                      Jika ada masalah pembayaran, error tryout, atau pertanyaan
                      lainnya, kamu bisa langsung menghubungi admin melalui
                      WhatsApp.
                    </p>
                    <a
                      href="#"
                      class="mt-3 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-600 transition"
                    >
                      WhatsApp Admin
                    </a>
                    <p class="mt-2 text-[11px] text-slate-400">
                      Fast response di jam 08.00–21.00 WIB.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "./components/Sidebar.vue";
import Navbar from "./components/Navbar.vue";
// import Footer from "./components/Footer.vue";
</script>
