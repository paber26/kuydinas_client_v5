<template>
  <section class="relative overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
    <div
      class="pointer-events-none absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-transparent"
    ></div>

    <div class="relative flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between">
      <div class="flex items-start gap-4">
        <div>
          <p class="text-xs text-slate-500">Selamat datang kembali</p>
          <h2 class="text-2xl font-semibold text-slate-800">
            {{ userName }}
          </h2>

          <p class="mt-2 max-w-xl text-sm text-slate-600">
            Website
            <span class="font-semibold text-emerald-600">Kuy Dinas</span>
            menyiapkan tryout SKD yang bisa kamu lanjutkan kapan saja. {{
              descriptionText
            }}
          </p>

          <div class="mt-4 flex flex-wrap gap-3">
            <router-link
              :to="primaryActionTo"
              class="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-white shadow transition hover:bg-emerald-600"
            >
              {{ primaryActionLabel }}
            </router-link>

            <router-link
              :to="{ name: 'materiskd' }"
              class="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Lihat Materi SKD
            </router-link>
          </div>
        </div>
      </div>

      <div
        class="grid w-full grid-cols-2 gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4 md:w-80"
      >
        <div>
          <p class="text-[11px] text-slate-500">{{ spotlightLabel }}</p>
          <p class="text-sm font-semibold text-slate-800">
            {{ spotlightTitle }}
          </p>
        </div>

        <div>
          <p class="text-[11px] text-slate-500">{{ scoreLabel }}</p>
          <p class="text-sm font-semibold text-slate-800">
            {{ scoreValue }}
          </p>
        </div>

        <div>
          <p class="text-[11px] text-slate-500">{{ auxiliaryLabel }}</p>
          <p class="text-sm font-semibold text-slate-800">
            {{ auxiliaryValue }}
          </p>
        </div>

        <div>
          <p class="text-[11px] text-slate-500">Status</p>
          <p class="text-sm font-semibold" :class="statusClass">
            {{ statusText }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  user: {
    type: Object,
    default: null,
  },
  latestTryout: {
    type: Object,
    default: null,
  },
  currentTryout: {
    type: Object,
    default: null,
  },
  primaryAction: {
    type: Object,
    default: () => ({
      kind: "browse",
      label: "Mulai Tryout",
      tryout_id: null,
    }),
  },
});

const userName = computed(() => props.user?.name || "Peserta Tryout");

const primaryActionLabel = computed(
  () => props.primaryAction?.label || "Mulai Tryout",
);

const primaryActionTo = computed(() => {
  const tryoutId = props.primaryAction?.tryout_id;

  switch (props.primaryAction?.kind) {
    case "continue":
      return tryoutId
        ? { name: "sesi-tryout", params: { id: tryoutId } }
        : { name: "pengerjaantryout" };
    case "start":
    case "retry":
      return tryoutId
        ? { name: "tryout-persiapan", params: { id: tryoutId } }
        : { name: "promotryout" };
    case "browse":
    default:
      return { name: "promotryout" };
  }
});

const descriptionText = computed(() => {
  if (props.currentTryout?.status === "in_progress") {
    return `Kamu masih punya tryout aktif, lanjutkan ${props.currentTryout.title} agar progres belajarmu tetap terjaga.`;
  }

  if (props.latestTryout?.title) {
    return `Tryout terakhirmu di ${props.latestTryout.title} sudah tercatat. Lanjutkan latihan untuk meningkatkan skor berikutnya.`;
  }

  return "Ayo mulai latihan pertamamu hari ini agar dashboard progresmu segera terisi.";
});

const spotlightSource = computed(
  () => props.currentTryout || props.latestTryout || null,
);

const spotlightLabel = computed(() =>
  props.currentTryout ? "Tryout aktif" : "Tryout terakhir",
);

const spotlightTitle = computed(
  () => spotlightSource.value?.title || "Belum ada tryout",
);

const scoreLabel = computed(() =>
  props.currentTryout ? "Jumlah soal" : "Nilai terakhir",
);

const scoreValue = computed(() => {
  if (props.currentTryout) {
    return `${formatNumber(props.currentTryout.question_count)} soal`;
  }

  if (props.latestTryout) {
    return formatNumber(props.latestTryout.score);
  }

  return "-";
});

const auxiliaryLabel = computed(() =>
  props.currentTryout ? "Durasi" : "Passing Grade",
);

const auxiliaryValue = computed(() => {
  if (props.currentTryout) {
    return `${formatNumber(props.currentTryout.duration)} menit`;
  }

  if (props.latestTryout) {
    return formatNumber(props.latestTryout.passing_grade);
  }

  return "-";
});

const statusText = computed(() => {
  if (props.currentTryout?.status === "in_progress") {
    return "Sedang Dikerjakan";
  }

  if (props.currentTryout?.status === "registered") {
    return "Siap Dimulai";
  }

  if (props.latestTryout) {
    return props.latestTryout.passed ? "Lulus" : "Belum Lulus";
  }

  return "Belum Ada Data";
});

const statusClass = computed(() => {
  if (props.currentTryout) {
    return "text-amber-600";
  }

  if (props.latestTryout?.passed) {
    return "text-emerald-600";
  }

  if (props.latestTryout && !props.latestTryout.passed) {
    return "text-rose-600";
  }

  return "text-slate-500";
});

function formatNumber(value) {
  const numericValue = Number(value ?? 0);

  if (!Number.isFinite(numericValue)) {
    return "0";
  }

  return new Intl.NumberFormat("id-ID").format(numericValue);
}
</script>
