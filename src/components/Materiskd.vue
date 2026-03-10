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
            Materi SKD
          </p>
          <h1 class="mt-1 text-xl sm:text-2xl font-semibold text-slate-800">
            Pusat Belajar SKD Kuy Dinas
          </h1>
          <p class="mt-1 text-xs sm:text-sm text-slate-600 max-w-xl">
            Pelajari ringkasan materi, contoh soal, dan tips SKD. Mulai dari
            yang paling lemah dulu, lalu naikkan level sampai siap menghadapi
            ujian sebenarnya.
          </p>
        </div>

        <!-- RINGKASAN SKOR PER SUBTES -->
        <div
          class="grid grid-cols-3 gap-2 sm:gap-3 text-xs sm:text-sm w-full sm:w-auto"
        >
          <div
            class="rounded-xl bg-slate-50 border border-slate-100 px-3 py-2 text-center"
          >
            <p class="text-[11px] text-slate-500">TWK</p>
            <p class="mt-1 text-lg font-semibold text-slate-800">
              {{ summary.twk }}
            </p>
            <p class="text-[10px] text-slate-500">Wawasan Kebangsaan</p>
          </div>
          <div
            class="rounded-xl bg-slate-50 border border-slate-100 px-3 py-2 text-center"
          >
            <p class="text-[11px] text-slate-500">TIU</p>
            <p class="mt-1 text-lg font-semibold text-slate-800">
              {{ summary.tiu }}
            </p>
            <p class="text-[10px] text-slate-500">Intelejensi Umum</p>
          </div>
          <div
            class="rounded-xl bg-slate-50 border border-slate-100 px-3 py-2 text-center"
          >
            <p class="text-[11px] text-slate-500">TKP</p>
            <p class="mt-1 text-lg font-semibold text-slate-800">
              {{ summary.tkp }}
            </p>
            <p class="text-[10px] text-slate-500">Karakteristik Pribadi</p>
          </div>
        </div>
      </section>

      <!-- REKOMENDASI MATERI -->
      <section
        class="rounded-2xl bg-emerald-50 border border-emerald-100 px-4 py-4 sm:px-5 sm:py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <p class="text-xs font-semibold text-emerald-700">
            Rekomendasi belajar hari ini
          </p>
          <p class="mt-1 text-sm font-semibold text-slate-800">
            {{ recommendation.title }}
          </p>
          <p class="mt-1 text-xs text-slate-700 max-w-xl">
            {{ recommendation.description }}
          </p>
        </div>
        <div class="flex flex-col items-start sm:items-end gap-2 text-xs">
          <p class="text-slate-500">
            Perkiraan waktu belajar:
            <span class="font-semibold">{{ recommendation.time }}</span>
          </p>
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-full bg-emerald-500 px-4 py-1.5 text-xs font-semibold text-white hover:bg-emerald-600"
          >
            🚀 Mulai Belajar Sekarang
          </button>
        </div>
      </section>

      <!-- FILTER KATEGORI -->
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

      <!-- LIST MATERI -->
      <section class="space-y-3">
        <div class="flex items-center justify-between">
          <h2 class="text-sm font-semibold text-slate-800">
            Daftar Materi SKD
            <span class="text-xs font-normal text-slate-500">
              • {{ filteredModules.length }} modul
            </span>
          </h2>
          <p class="text-[11px] text-slate-500">
            Ikuti urutan: materi &rarr; contoh soal &rarr; tryout.
          </p>
        </div>

        <div
          v-if="filteredModules.length"
          class="grid gap-3 sm:gap-4 md:grid-cols-2"
        >
          <article
            v-for="modul in filteredModules"
            :key="modul.id"
            class="rounded-2xl border bg-white shadow-sm px-4 py-4 sm:px-5 sm:py-4 flex flex-col gap-3"
          >
            <div class="flex items-start justify-between gap-3">
              <div>
                <p
                  class="inline-flex items-center rounded-full px-2 py-[2px] text-[10px] font-semibold"
                  :class="badgeClass(modul.type)"
                >
                  {{ modul.type }}
                </p>
                <h3
                  class="mt-2 text-sm sm:text-base font-semibold text-slate-900"
                >
                  {{ modul.title }}
                </h3>
                <p class="mt-1 text-xs text-slate-600">
                  {{ modul.subtitle }}
                </p>
              </div>
              <div class="text-right text-[11px] text-slate-500">
                <p>Level:</p>
                <p class="font-semibold text-slate-800">{{ modul.level }}</p>
              </div>
            </div>

            <!-- PROGRESS -->
            <div>
              <div class="flex justify-between text-[11px] text-slate-500 mb-1">
                <span>Progres modul</span>
                <span>{{ modul.progress }}%</span>
              </div>
              <div
                class="h-1.5 w-full rounded-full bg-slate-200 overflow-hidden"
              >
                <div
                  class="h-full rounded-full bg-emerald-500"
                  :style="{ width: modul.progress + '%' }"
                ></div>
              </div>
              <p class="mt-1 text-[11px] text-slate-500">
                {{ modul.progressText }}
              </p>
            </div>

            <!-- TAGS -->
            <div class="flex flex-wrap gap-1 mt-1">
              <span
                v-for="tag in modul.tags"
                :key="tag"
                class="inline-flex items-center rounded-full bg-slate-50 border border-slate-200 px-2 py-[2px] text-[10px] text-slate-600"
              >
                #{{ tag }}
              </span>
            </div>

            <!-- ACTIONS -->
            <div class="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                class="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-600"
              >
                📘 Belajar materi
              </button>
              <button
                type="button"
                class="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                📝 Contoh soal
              </button>
            </div>
          </article>
        </div>

        <div
          v-else
          class="rounded-2xl border border-dashed border-slate-200 bg-white px-4 py-8 text-center text-sm text-slate-500"
        >
          Belum ada modul untuk filter ini. Coba pilih kategori lain.
        </div>
      </section>

      <!-- RENCANA BELAJAR & RIWAYAT -->
      <section class="grid gap-4 md:grid-cols-2">
        <!-- Rencana belajar -->
        <div
          class="rounded-2xl bg-white border border-slate-100 shadow-sm px-4 py-4 sm:px-5 sm:py-5"
        >
          <h2 class="text-sm font-semibold text-slate-800 mb-2">
            Rencana Belajar Minggu Ini
          </h2>
          <ul class="space-y-2 text-xs sm:text-sm text-slate-700">
            <li
              v-for="plan in studyPlan"
              :key="plan.id"
              class="flex items-start gap-2"
            >
              <span class="mt-[3px] text-[10px] text-slate-400">•</span>
              <div>
                <p class="font-medium text-slate-800">{{ plan.title }}</p>
                <p class="text-[11px] text-slate-500">
                  {{ plan.day }} • {{ plan.time }}
                </p>
              </div>
            </li>
          </ul>
        </div>

        <!-- Riwayat belajar -->
        <div
          class="rounded-2xl bg-white border border-slate-100 shadow-sm px-4 py-4 sm:px-5 sm:py-5"
        >
          <h2 class="text-sm font-semibold text-slate-800 mb-2">
            Riwayat Belajar Terakhir
          </h2>
          <ul class="space-y-2 text-xs sm:text-sm text-slate-700">
            <li
              v-for="log in studyLog"
              :key="log.id"
              class="flex items-center justify-between"
            >
              <div>
                <p class="font-medium text-slate-800">{{ log.title }}</p>
                <p class="text-[11px] text-slate-500">{{ log.date }}</p>
              </div>
              <p class="text-[11px] text-slate-500">{{ log.duration }} menit</p>
            </li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

const summary = {
  twk: 120,
  tiu: 110,
  tkp: 150,
};

const recommendation = {
  title: "Fokus TIU - Penalaran Logis",
  description:
    "Nilai TIU kamu masih di bawah dua subtes lainnya. Coba selesaikan 1 modul penalaran logis dan 10 soal latihan hari ini.",
  time: "30–45 menit",
};

const filters = [
  { id: "semua", label: "Semua materi", icon: "📚" },
  { id: "TWK", label: "TWK - Wawasan Kebangsaan", icon: "🇮🇩" },
  { id: "TIU", label: "TIU - Intelejensi Umum", icon: "🧠" },
  { id: "TKP", label: "TKP - Karakteristik Pribadi", icon: "💬" },
];

const selectedFilter = ref("semua");

const modules = [
  {
    id: 1,
    type: "TWK",
    title: "Pancasila sebagai Dasar Negara",
    subtitle:
      "Konsep, kedudukan, dan contoh penerapan dalam kehidupan berbangsa.",
    level: "Dasar",
    progress: 80,
    progressText: "Sudah hampir selesai, tinggal review singkat.",
    tags: ["pancasila", "konstitusi", "dasar-negara"],
  },
  {
    id: 2,
    type: "TIU",
    title: "Penalaran Logis & Analitis",
    subtitle: "Latihan memahami pola, implikasi logis, dan silogisme.",
    level: "Menengah",
    progress: 40,
    progressText: "Baru setengah, lanjutkan agar semakin terbiasa.",
    tags: ["logika", "silogisme", "deret"],
  },
  {
    id: 3,
    type: "TKP",
    title: "Pelayanan Publik & Integritas",
    subtitle:
      "Skenario kasus seputar layanan publik dan etika aparatur sipil negara.",
    level: "Menengah",
    progress: 20,
    progressText: "Baru mulai, coba selesaikan minimal 1 subtopik.",
    tags: ["pelayanan", "integritas", "etika"],
  },
  {
    id: 4,
    type: "TWK",
    title: "UUD 1945 & Sistem Pemerintahan",
    subtitle: "Struktur lembaga negara, fungsi, dan wewenang secara ringkas.",
    level: "Lanjutan",
    progress: 0,
    progressText: "Belum dimulai, cocok untuk jadwal belajar besok.",
    tags: ["uud-1945", "lembaga-negara"],
  },
];

const studyPlan = [
  {
    id: 1,
    title: "TIU - Penalaran Logis (1 modul + 10 soal)",
    day: "Hari ini",
    time: "30–45 menit",
  },
  {
    id: 2,
    title: "TWK - Pancasila & UUD 1945 (ringkasan + catatan)",
    day: "Besok",
    time: "25–30 menit",
  },
  {
    id: 3,
    title: "TKP - Pelayanan Publik (simulasi kasus)",
    day: "Lusa",
    time: "30–40 menit",
  },
];

const studyLog = [
  {
    id: 1,
    title: "TIU - Deret angka & pola",
    date: "24 November 2025 • 21.10 WIB",
    duration: 35,
  },
  {
    id: 2,
    title: "TKP - Kerja sama tim",
    date: "23 November 2025 • 20.05 WIB",
    duration: 25,
  },
];

const filteredModules = computed(() => {
  if (selectedFilter.value === "semua") return modules;
  return modules.filter((m) => m.type === selectedFilter.value);
});

const badgeClass = (type) => {
  if (type === "TWK") {
    return "bg-emerald-100 text-emerald-700";
  }
  if (type === "TIU") {
    return "bg-sky-100 text-sky-700";
  }
  if (type === "TKP") {
    return "bg-amber-100 text-amber-700";
  }
  return "bg-slate-100 text-slate-700";
};
</script>
