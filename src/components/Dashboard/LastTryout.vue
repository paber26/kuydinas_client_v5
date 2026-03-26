<template>
  <section
    class="relative overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:shadow-md"
  >
    <div
      class="pointer-events-none absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-teal-500/5 to-transparent"
    ></div>

    <div class="relative space-y-5 p-6">
      <template v-if="latestTryout">
        <div class="flex items-start justify-between gap-4">
          <div>
            <p class="text-[11px] font-semibold uppercase tracking-wider text-emerald-600">
              Tryout Terakhir
            </p>

            <h3 class="mt-1 text-lg font-semibold text-slate-800">
              {{ latestTryout.title }}
            </h3>

            <p class="mt-1 text-xs text-slate-500">
              Dikerjakan pada {{ formattedDate }} • {{ latestTryout.question_count }} soal
            </p>
          </div>

          <div class="text-right">
            <p class="text-[11px] uppercase tracking-wide text-slate-400">
              Nilai Kamu
            </p>

            <div class="mt-1 inline-flex items-center justify-center rounded-xl bg-emerald-50 px-4 py-2">
              <span class="text-2xl font-bold text-emerald-600">
                {{ formattedScore }}
              </span>
            </div>

            <p class="mt-1 text-[11px] text-slate-500">
              Passing grade:
              <span class="font-semibold">{{ formattedPassingGrade }}</span>
            </p>
          </div>
        </div>

        <div class="space-y-2">
          <div class="flex justify-between text-xs text-slate-500">
            <span>Progres kelulusan</span>
            <span class="font-semibold" :class="latestTryout.passed ? 'text-emerald-600' : 'text-amber-600'">
              {{ latestTryout.progress_percentage }}%
            </span>
          </div>

          <div class="h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              class="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
              :style="{ width: progressWidth }"
            ></div>
          </div>

          <p class="text-xs text-slate-500">
            {{ latestTryout.progress_message }}
          </p>
        </div>

        <div class="flex flex-wrap gap-3 pt-2">
          <router-link
            :to="{ name: 'tryout-persiapan', params: { id: latestTryout.tryout_id } }"
            class="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-white shadow transition hover:bg-emerald-600"
          >
            Kerjakan Ulang
          </router-link>

          <router-link
            :to="resultRoute"
            class="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Lihat Pembahasan
          </router-link>
        </div>
      </template>

      <template v-else>
        <div class="space-y-3">
          <p class="text-[11px] font-semibold uppercase tracking-wider text-emerald-600">
            Tryout Terakhir
          </p>
          <h3 class="text-lg font-semibold text-slate-800">
            Belum ada tryout yang selesai
          </h3>
          <p class="text-sm text-slate-500">
            Mulai tryout pertamamu supaya dashboard bisa menampilkan skor, progres kelulusan, dan rekomendasi belajar.
          </p>
          <router-link
            :to="{ name: 'promotryout' }"
            class="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-white shadow transition hover:bg-emerald-600"
          >
            Pilih Paket Tryout
          </router-link>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  latestTryout: {
    type: Object,
    default: null,
  },
});

const formattedDate = computed(() => formatDateTime(props.latestTryout?.finished_at));
const formattedScore = computed(() => formatNumber(props.latestTryout?.score));
const formattedPassingGrade = computed(() => formatNumber(props.latestTryout?.passing_grade));
const progressWidth = computed(() => `${Math.min(100, Number(props.latestTryout?.progress_percentage || 0))}%`);

const resultRoute = computed(() => ({
  name: "hasil-tryout",
  params: { id: props.latestTryout?.tryout_id },
  query: props.latestTryout?.attempt_number
    ? { attempt: String(props.latestTryout.attempt_number) }
    : undefined,
}));

function formatNumber(value) {
  const numericValue = Number(value ?? 0);

  if (!Number.isFinite(numericValue)) {
    return "0";
  }

  return new Intl.NumberFormat("id-ID").format(numericValue);
}

function formatDateTime(value) {
  if (!value) {
    return "-";
  }

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return "-";
  }

  return parsedDate.toLocaleString("id-ID", {
    dateStyle: "long",
    timeStyle: "short",
  });
}
</script>
