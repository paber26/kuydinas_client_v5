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
            Pengerjaan Try Out SKD
          </p>
          <h1 class="mt-1 text-xl sm:text-2xl font-semibold text-slate-800">
            Daftar Try Out Aktif Kamu
          </h1>
          <p class="mt-2 text-xs sm:text-sm text-slate-600 max-w-xl">
            Lanjutkan tryout yang sedang berjalan, ulangi paket yang nilainya
            masih kurang, dan pantau progres latihanmu di Kuy Dinas.
          </p>
        </div>

        <div class="grid grid-cols-3 gap-2 sm:gap-3 text-xs sm:text-sm">
          <div class="rounded-xl bg-slate-50 border border-slate-100 px-3 py-2">
            <p class="text-[11px] text-slate-500">Tryout aktif</p>
            <p class="mt-1 text-lg font-semibold text-slate-800">
              {{ stats.active }}
            </p>
          </div>
          <div class="rounded-xl bg-slate-50 border border-slate-100 px-3 py-2">
            <p class="text-[11px] text-slate-500">Tryout selesai</p>
            <p class="mt-1 text-lg font-semibold text-slate-800">
              {{ stats.completed }}
            </p>
          </div>
          <div class="rounded-xl bg-slate-50 border border-slate-100 px-3 py-2">
            <p class="text-[11px] text-slate-500">Rata-rata nilai</p>
            <p class="mt-1 text-lg font-semibold text-slate-800">
              {{ stats.avgScore }}
            </p>
          </div>
        </div>
      </section>

      <!-- REKOMENDASI BERIKUTNYA -->
      <section
        v-if="nextSuggestion"
        class="rounded-2xl bg-emerald-50 border border-emerald-100 px-4 py-3 sm:px-5 sm:py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <p class="text-xs font-semibold text-emerald-700">
            Rekomendasi langkah berikutnya
          </p>
          <p class="mt-1 text-sm font-semibold text-slate-800">
            {{ nextSuggestion.name }}
          </p>
          <p class="mt-1 text-xs text-slate-600">
            {{ nextSuggestion.reason }}
          </p>
        </div>
        <div class="flex flex-col items-start sm:items-end gap-2 text-xs">
          <p class="text-slate-500">
            Durasi {{ nextSuggestion.duration }} menit •
            {{ nextSuggestion.questionCount }} soal
          </p>
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-full bg-emerald-500 px-4 py-1.5 text-xs font-semibold text-white hover:bg-emerald-600"
            @click="handleContinue(nextSuggestion)"
          >
            🚀 Lanjutkan / Mulai Tryout
          </button>
        </div>
      </section>

      <!-- LIST TRYOUT -->
      <section class="space-y-3">
        <h2 class="text-sm font-semibold text-slate-700">
          Daftar Try Out Aktif
          <span class="text-xs font-normal text-slate-500">
            • {{ activeTryouts.length }} paket
          </span>
        </h2>

        <div v-if="activeTryouts.length" class="space-y-3">
          <article
            v-for="(item, index) in activeTryouts"
            :key="item.id"
            class="rounded-2xl border bg-white shadow-sm px-4 py-4 sm:px-5 sm:py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <!-- LEFT: INFO -->
            <div class="flex-1 min-w-0">
              <div
                class="flex items-center gap-2 text-[11px] text-slate-400 mb-1"
              >
                <span>#{{ index + 1 }}</span>
                <span>•</span>
                <span>{{ item.lastTaken }}</span>
              </div>
              <h3
                class="text-sm sm:text-base font-semibold text-slate-900 truncate"
              >
                {{ item.name }}
              </h3>
              <p class="mt-1 text-xs text-slate-500">
                Durasi {{ item.duration }} menit • {{ item.questionCount }} soal
              </p>

              <!-- PROGRESS -->
              <div class="mt-3">
                <div
                  class="flex justify-between text-[11px] text-slate-500 mb-1"
                >
                  <span>Progres pengerjaan</span>
                  <span>{{ item.progress }}%</span>
                </div>
                <div
                  class="h-1.5 w-full rounded-full bg-slate-200 overflow-hidden"
                >
                  <div
                    class="h-full rounded-full"
                    :class="
                      item.status === 'completed'
                        ? 'bg-emerald-500'
                        : 'bg-amber-400'
                    "
                    :style="{ width: item.progress + '%' }"
                  ></div>
                </div>
              </div>
            </div>

            <!-- RIGHT: STATUS + ACTION -->
            <div
              class="flex flex-col items-start sm:items-end gap-2 text-xs sm:text-sm"
            >
              <div class="flex flex-wrap gap-2 justify-end w-full">
                <span
                  class="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold"
                  :class="statusBadgeClass(item.status)"
                >
                  {{ statusLabel(item.status) }}
                </span>
                <span
                  v-if="item.bestScore"
                  class="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-[11px] text-slate-700"
                >
                  Nilai terbaik:
                  <span class="ml-1 font-semibold">{{ item.bestScore }}</span>
                </span>
              </div>

              <div class="flex flex-wrap gap-2 justify-end w-full">
                <button
                  type="button"
                  class="inline-flex items-center justify-center rounded-xl px-3 py-1.5 font-semibold shadow-sm transition"
                  :class="
                    item.status === 'completed'
                      ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                      : item.status === 'in_progress'
                      ? 'bg-amber-400 text-slate-900 hover:bg-amber-500'
                      : 'bg-sky-500 text-white hover:bg-sky-600'
                  "
                  @click="handleContinue(item)"
                >
                  {{
                    item.status === "completed"
                      ? "Kerjakan Ulang"
                      : item.status === "in_progress"
                      ? "Lanjutkan Tryout"
                      : "Mulai Tryout"
                  }}
                </button>
                <router-link
                  to="/pengerjaantryout/tampilkanhasil"
                  v-if="item.status === 'completed'"
                  type="button"
                  class="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-1.5 font-medium text-slate-700 hover:bg-slate-50"
                  @click="handleResult(item)"
                >
                  Tampilkan Hasil
                </router-link>
              </div>
            </div>
          </article>
        </div>

        <div
          v-else
          class="rounded-2xl border border-dashed border-slate-200 bg-white px-4 py-10 text-center text-sm text-slate-500"
        >
          Belum ada tryout aktif saat ini. Coba pilih paket di menu
          <span class="font-semibold">Promo Try Out</span> untuk mulai latihan.
        </div>
      </section>

      <!-- CTA LAINNYA -->
      <section
        class="rounded-2xl bg-white border border-slate-100 px-4 py-4 sm:px-5 sm:py-5 text-center sm:text-left flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
      >
        <div>
          <h3 class="text-sm font-semibold text-slate-800">
            Mau tambah latihan?
          </h3>
          <p class="mt-1 text-xs sm:text-sm text-slate-600">
            Ikuti tryout lain untuk memperbanyak jam terbang dan tingkatkan
            peluang lulus SKD.
          </p>
        </div>
        <router-link
          to="/promo"
          class="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-emerald-600"
        >
          Lihat Promo Try Out Lainnya
        </router-link>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const activeTryouts = [
  {
    id: 1,
    name: "Tryout SKD CPNS 2025 Paket 2",
    duration: 100,
    questionCount: 110,
    status: "in_progress",
    progress: 45,
    bestScore: 320,
    lastTaken: "Terakhir dikerjakan 2 hari lalu",
  },
  {
    id: 2,
    name: "Tryout SKD 2024 Batch 9",
    duration: 100,
    questionCount: 110,
    status: "completed",
    progress: 100,
    bestScore: 345,
    lastTaken: "Selesai 5 hari lalu",
  },
  {
    id: 3,
    name: "Tryout SKD 2024 Batch 10",
    duration: 100,
    questionCount: 110,
    status: "not_started",
    progress: 0,
    bestScore: null,
    lastTaken: "Belum pernah dikerjakan",
  },
];

const stats = computed(() => {
  const total = activeTryouts.length;
  const completed = activeTryouts.filter(
    (t) => t.status === "completed"
  ).length;
  const sumScore = activeTryouts
    .filter((t) => t.bestScore)
    .reduce((acc, t) => acc + t.bestScore, 0);
  const countScore = activeTryouts.filter((t) => t.bestScore).length;
  const avgScore = countScore ? Math.round(sumScore / countScore) : "-";
  return {
    active: total,
    completed,
    avgScore,
  };
});

const nextSuggestion = computed(() => {
  if (!activeTryouts.length) return null;
  const inProgress = activeTryouts.find((t) => t.status === "in_progress");
  if (inProgress) {
    return {
      ...inProgress,
      reason:
        "Selesaikan dulu tryout yang sedang kamu kerjakan agar bisa melihat analisis nilai lengkap.",
    };
  }
  const lowestScore = [...activeTryouts].sort(
    (a, b) => (a.bestScore || 9999) - (b.bestScore || 9999)
  )[0];
  if (!lowestScore) return null;
  return {
    ...lowestScore,
    reason:
      "Coba kerjakan ulang paket dengan nilai terendah untuk memperbaiki skor dan memperkuat materi yang masih lemah.",
  };
});

const statusLabel = (status) => {
  if (status === "in_progress") return "Sedang dikerjakan";
  if (status === "completed") return "Selesai";
  return "Belum mulai";
};

const statusBadgeClass = (status) => {
  if (status === "in_progress") {
    return "bg-amber-100 text-amber-700";
  }
  if (status === "completed") {
    return "bg-emerald-100 text-emerald-700";
  }
  return "bg-slate-100 text-slate-600";
};

const handleContinue = (item) => {
  // TODO: ganti dengan navigasi ke halaman pengerjaan tryout
  // misalnya: router.push({ name: 'tryoutDo', params: { id: item.id } })
  console.log("Lanjutkan / kerjakan ulang:", item);
};

const handleResult = (item) => {
  // TODO: ganti dengan navigasi ke halaman hasil tryout
  // misalnya: router.push({ name: 'tryoutResult', params: { id: item.id } })
  console.log("Lihat hasil:", item);
};
</script>
