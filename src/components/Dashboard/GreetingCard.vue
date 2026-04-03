<template>
  <section
    class="relative overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm"
  >
    <div
      class="pointer-events-none absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-transparent"
    ></div>
    <div
      class="pointer-events-none absolute -right-10 top-0 h-36 w-36 rounded-full bg-emerald-200/20 blur-3xl"
    ></div>

    <div
      class="relative flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between"
    >
      <div class="flex items-start gap-4">
        <div
          class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-500 text-lg font-bold text-white shadow-sm"
        >
          {{ userInitial }}
        </div>

        <div>
          <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {{ greetingLabel }}
          </p>

          <h2 class="mt-1 text-2xl font-semibold text-slate-800">
            {{ userName }}
          </h2>

          <p class="mt-2 max-w-xl text-sm leading-6 text-slate-600">
            {{ descriptionText }}
          </p>

          <div class="mt-4 flex flex-wrap gap-2">
            <span
              class="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700"
            >
              {{ spotlightLabel }}: {{ spotlightTitle }}
            </span>

            <span
              class="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-600"
            >
              {{ secondaryChip }}
            </span>
          </div>

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
        class="grid w-full grid-cols-2 gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 md:w-80"
      >
        <div class="rounded-xl bg-white p-3 shadow-sm">
          <p class="text-[11px] text-slate-500">{{ spotlightLabel }}</p>
          <p class="mt-1 text-sm font-semibold text-slate-800">
            {{ spotlightTitle }}
          </p>
        </div>

        <div class="rounded-xl bg-white p-3 shadow-sm">
          <p class="text-[11px] text-slate-500">{{ scoreLabel }}</p>
          <p class="mt-1 text-sm font-semibold text-slate-800">
            {{ scoreValue }}
          </p>
        </div>

        <div class="rounded-xl bg-white p-3 shadow-sm">
          <p class="text-[11px] text-slate-500">{{ auxiliaryLabel }}</p>
          <p class="mt-1 text-sm font-semibold text-slate-800">
            {{ auxiliaryValue }}
          </p>
        </div>

        <div class="rounded-xl bg-white p-3 shadow-sm">
          <p class="text-[11px] text-slate-500">Status</p>
          <p class="mt-1 text-sm font-semibold" :class="statusClass">
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

const userInitial = computed(() => {
  const name = String(props.user?.name || "").trim();
  return name ? name.charAt(0).toUpperCase() : "K";
});

const greetingLabel = computed(() => {
  const hour = new Date().getHours();

  if (hour < 11) return "Selamat pagi";
  if (hour < 15) return "Selamat siang";
  if (hour < 19) return "Selamat sore";
  return "Selamat malam";
});

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
    return `Kamu masih mengerjakan ${props.currentTryout.title}. Lanjutkan sekarang supaya progres belajarmu tetap terjaga.`;
  }

  if (props.currentTryout?.status === "registered") {
    return `${props.currentTryout.title} sudah siap kamu mulai. Buka tryout dan lanjutkan persiapanmu hari ini.`;
  }

  if (props.latestTryout?.title) {
    return `Hasil terakhirmu di ${props.latestTryout.title} sudah tercatat. Yuk tingkatkan lagi skor berikutnya dengan latihan yang lebih konsisten.`;
  }

  return "Website Kuy Dinas menyiapkan tryout SKD gratis dan premium untuk menemani progres belajarmu dari awal sampai siap ujian.";
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
  props.currentTryout ? "Durasi" : "Passing grade",
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

const secondaryChip = computed(() => {
  if (props.currentTryout?.status === "in_progress") {
    return "Masih dikerjakan";
  }

  if (props.currentTryout?.status === "registered") {
    return "Siap dimulai";
  }

  if (props.latestTryout?.question_count) {
    return `${formatNumber(props.latestTryout.question_count)} soal tercatat`;
  }

  return "Mulai latihan pertamamu";
});

const statusText = computed(() => {
  if (props.currentTryout?.status === "in_progress") {
    return "Sedang dikerjakan";
  }

  if (props.currentTryout?.status === "registered") {
    return "Siap dimulai";
  }

  if (props.latestTryout) {
    return props.latestTryout.passed ? "Lulus" : "Belum lulus";
  }

  return "Belum ada data";
});

const statusClass = computed(() => {
  if (props.currentTryout?.status === "in_progress") {
    return "text-amber-600";
  }

  if (props.currentTryout?.status === "registered") {
    return "text-sky-600";
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
