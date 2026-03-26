<template>
  <section class="relative rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
    <div class="mb-5 flex items-center justify-between">
      <div>
        <h3 class="text-base font-semibold text-slate-800">Jalur Belajar SKD Kamu</h3>
        <p class="mt-1 text-xs text-slate-500">
          Rekomendasi materi berdasarkan performa tryout terakhir kamu.
        </p>
      </div>

      <router-link
        :to="{ name: 'materiskd' }"
        class="text-xs font-medium text-emerald-600 transition hover:text-emerald-700 hover:underline"
      >
        Lihat semua materi
      </router-link>
    </div>

    <div class="space-y-4">
      <div
        v-for="item in normalizedItems"
        :key="item.category"
        class="group rounded-xl border border-slate-100 bg-slate-50/70 p-4 transition hover:bg-white hover:shadow-sm"
      >
        <div class="flex items-center justify-between gap-4">
          <div>
            <p class="flex items-center gap-2 text-sm font-medium text-slate-800">
              {{ item.title }}
              <span
                class="rounded-full px-2 py-[2px] text-[10px] font-medium"
                :class="statusBadgeClass(item.status)"
              >
                {{ item.status_label }}
              </span>
            </p>

            <p class="mt-1 text-xs text-slate-500">
              {{ item.description }}
            </p>
          </div>

          <router-link
            :to="{ name: 'materiskd' }"
            class="rounded-lg border border-emerald-200 px-3 py-1.5 text-xs font-medium text-emerald-600 transition hover:bg-emerald-50"
          >
            Mulai
          </router-link>
        </div>

        <div class="mt-3">
          <div class="mb-1 flex justify-between text-[11px] text-slate-500">
            <span>Progress</span>
            <span>{{ item.progress }}%</span>
          </div>

          <div class="h-1.5 overflow-hidden rounded-full bg-slate-200">
            <div
              class="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
              :style="{ width: `${item.progress}%` }"
            ></div>
          </div>

          <p class="mt-2 text-[11px] text-slate-500">
            Skor {{ item.category }}:
            <span class="font-semibold text-slate-700">
              {{ formatNumber(item.score) }}
            </span>
            <span v-if="item.max_score">
              dari {{ formatNumber(item.max_score) }}
            </span>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});

const normalizedItems = computed(() => {
  if (props.items?.length) {
    return props.items;
  }

  return [
    {
      category: "TWK",
      title: "TWK - Wawasan Kebangsaan",
      status: "idle",
      status_label: "Mulai",
      description: "Selesaikan tryout pertamamu untuk mendapatkan rekomendasi belajar.",
      progress: 0,
      score: 0,
      max_score: 0,
    },
    {
      category: "TIU",
      title: "TIU - Intelegensia Umum",
      status: "idle",
      status_label: "Mulai",
      description: "Selesaikan tryout pertamamu untuk mendapatkan rekomendasi belajar.",
      progress: 0,
      score: 0,
      max_score: 0,
    },
    {
      category: "TKP",
      title: "TKP - Karakteristik Pribadi",
      status: "idle",
      status_label: "Mulai",
      description: "Selesaikan tryout pertamamu untuk mendapatkan rekomendasi belajar.",
      progress: 0,
      score: 0,
      max_score: 0,
    },
  ];
});

function statusBadgeClass(status) {
  if (status === "strong") {
    return "bg-emerald-100 text-emerald-700";
  }

  if (status === "medium") {
    return "bg-amber-100 text-amber-700";
  }

  if (status === "idle") {
    return "bg-slate-100 text-slate-600";
  }

  return "bg-rose-100 text-rose-700";
}

function formatNumber(value) {
  const numericValue = Number(value ?? 0);

  if (!Number.isFinite(numericValue)) {
    return "0";
  }

  return new Intl.NumberFormat("id-ID").format(numericValue);
}
</script>
