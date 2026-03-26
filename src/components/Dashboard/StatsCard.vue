<template>
  <section class="relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
    <div
      class="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-emerald-100/40 blur-2xl"
    ></div>

    <div class="relative">
      <div class="mb-4 flex items-center justify-between">
        <h3 class="text-sm font-semibold text-slate-800">Statistik Belajar</h3>
        <span class="rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-medium text-emerald-600">
          SKD
        </span>
      </div>

      <div class="grid grid-cols-3 gap-3">
        <div class="rounded-xl border border-slate-100 bg-slate-50/70 px-3 py-3 transition hover:bg-white hover:shadow-sm">
          <p class="text-[11px] text-slate-500">Total Tryout</p>
          <div class="mt-1 flex items-center justify-between">
            <p class="text-xl font-semibold text-slate-800">
              {{ formatNumber(stats.completed_tryouts) }}
            </p>
            <span class="text-xs">📊</span>
          </div>
        </div>

        <div class="rounded-xl border border-slate-100 bg-slate-50/70 px-3 py-3 transition hover:bg-white hover:shadow-sm">
          <p class="text-[11px] text-slate-500">Rata-rata Nilai</p>
          <div class="mt-1 flex items-center justify-between">
            <p class="text-xl font-semibold text-slate-800">
              {{ averageScoreLabel }}
            </p>
            <span class="text-xs">🧠</span>
          </div>
        </div>

        <div class="rounded-xl border border-slate-100 bg-slate-50/70 px-3 py-3 transition hover:bg-white hover:shadow-sm">
          <p class="text-[11px] text-slate-500">Ranking</p>
          <div class="mt-1 flex items-center justify-between">
            <p class="text-xl font-semibold text-emerald-600">
              {{ rankingLabel }}
            </p>
            <span class="text-xs">🏆</span>
          </div>
        </div>
      </div>

      <p class="mt-3 text-[11px] text-slate-500">
        {{ helperText }}
      </p>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  stats: {
    type: Object,
    default: () => ({
      completed_tryouts: 0,
      average_score: 0,
      latest_rank: null,
      latest_top_percentage: null,
      latest_participant_count: 0,
    }),
  },
});

const averageScoreLabel = computed(() => {
  const numericValue = Number(props.stats?.average_score ?? 0);

  if (!Number.isFinite(numericValue) || numericValue <= 0) {
    return "0";
  }

  return new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: Number.isInteger(numericValue) ? 0 : 1,
    maximumFractionDigits: 1,
  }).format(numericValue);
});

const rankingLabel = computed(() => {
  const percentage = Number(props.stats?.latest_top_percentage ?? 0);

  if (!Number.isFinite(percentage) || percentage <= 0) {
    return "-";
  }

  return `Top ${percentage}%`;
});

const helperText = computed(() => {
  const rank = props.stats?.latest_rank;
  const totalParticipants = Number(props.stats?.latest_participant_count ?? 0);

  if (rank && totalParticipants > 0) {
    return `Ranking diambil dari tryout terakhirmu: posisi ${rank} dari ${formatNumber(totalParticipants)} peserta.`;
  }

  return "Statistik dihitung dari tryout yang sudah selesai kamu kerjakan.";
});

function formatNumber(value) {
  const numericValue = Number(value ?? 0);

  if (!Number.isFinite(numericValue)) {
    return "0";
  }

  return new Intl.NumberFormat("id-ID").format(numericValue);
}
</script>
