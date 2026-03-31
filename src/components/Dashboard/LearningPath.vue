<template>
  <section class="relative rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
    <div class="mb-6">
      <h3 class="text-base font-semibold text-slate-800">Jadwal Tryout</h3>
      <p class="mt-1 text-xs text-slate-500">
        Kuy Dinas mengadakan tryout rutin setiap minggunya. Catat jadwalnya dan jangan sampai ketinggalan.
      </p>
    </div>

    <ol class="relative border-l border-slate-200 pl-6">
      <li
        v-for="item in timelineItems"
        :key="item.key"
        class="relative pb-6 last:pb-0"
      >
        <span
          class="absolute -left-[7px] top-2 h-3.5 w-3.5 rounded-full ring-4 ring-white"
          :class="dotClass(item.status)"
        ></span>

        <router-link
          :to="{ name: 'pengerjaantryout' }"
          class="group block rounded-2xl border border-slate-100 bg-slate-50/60 p-4 transition hover:bg-white hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          :aria-label="`Buka menu pengerjaan tryout untuk ${item.title}`"
        >
          <div class="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div class="min-w-0">
              <p class="text-sm font-semibold text-slate-800">
                {{ item.title }}
              </p>

              <p class="mt-1 text-xs text-slate-600">
                Jadwal pengerjaan
                <span class="font-medium text-slate-700">{{ item.rangeLabel }}</span>
              </p>
            </div>

            <div class="flex items-center gap-2">
              <span
                class="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold"
                :class="badgeClass(item.status)"
              >
                {{ item.statusLabel }}
              </span>

              <span
                v-if="item.isNext"
                class="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-1 text-[11px] font-semibold text-indigo-700"
              >
                Minggu terdekat
              </span>
            </div>
          </div>

          <div class="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
            <span class="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 ring-1 ring-slate-200">
              <span class="h-1.5 w-1.5 rounded-full bg-slate-400"></span>
              Batch {{ item.batch }}
            </span>
            <span class="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 ring-1 ring-slate-200">
              <span class="h-1.5 w-1.5 rounded-full bg-slate-400"></span>
              SKD CPNS 2026
            </span>

            <span class="ml-auto inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-700 opacity-0 transition group-hover:opacity-100">
              Buka pengerjaan
              <span aria-hidden="true">→</span>
            </span>
          </div>
        </router-link>
      </li>
    </ol>

    <div class="mt-6 rounded-2xl border border-slate-100 bg-slate-50 p-4 text-xs text-slate-600">
      <p class="font-semibold text-slate-700">Info</p>
      <p class="mt-1">
        Jadwal di atas bersifat informasi. Jika ada perubahan, peserta akan melihat pembaruan di aplikasi.
      </p>
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

const schedule = [
  {
    batch: 1,
    title: "Try Out Persiapan SKD CPNS 2026 Batch 1",
    start: "2026-04-01",
    end: "2026-04-07",
    rangeLabel: "1 April - 7 April 2026",
  },
  {
    batch: 2,
    title: "Try Out Persiapan SKD CPNS 2026 Batch 2",
    start: "2026-04-08",
    end: "2026-04-14",
    rangeLabel: "8 April - 14 April 2026",
  },
  {
    batch: 3,
    title: "Try Out Persiapan SKD CPNS 2026 Batch 3",
    start: "2026-04-15",
    end: "2026-04-21",
    rangeLabel: "15 April - 21 April 2026",
  },
  {
    batch: 4,
    title: "Try Out Persiapan SKD CPNS 2026 Batch 4",
    start: "2026-04-15",
    end: "2026-04-22",
    rangeLabel: "15 April - 22 April 2026",
  },
  {
    batch: 5,
    title: "Try Out Persiapan SKD CPNS 2026 Batch 5",
    start: "2026-04-22",
    end: "2026-04-30",
    rangeLabel: "22 April - 30 April 2026",
  },
];

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function parseIsoDate(isoDate) {
  const [year, month, day] = String(isoDate).split("-").map(Number);
  return new Date(year, (month ?? 1) - 1, day ?? 1);
}

function getStatus(today, startDate, endDate) {
  if (today < startDate) return "upcoming";
  if (today > endDate) return "past";
  return "active";
}

function statusLabel(status) {
  if (status === "active") return "Berlangsung";
  if (status === "upcoming") return "Akan datang";
  return "Selesai";
}

const timelineItems = computed(() => {
  // props.items masih diterima agar tidak jatuh ke attribute DOM dari pemanggil,
  // tapi untuk sementara jadwal tryout ditampilkan statis sesuai permintaan.
  void props.items;

  const today = startOfDay(new Date());
  const computedItems = schedule
    .slice()
    .sort((a, b) => parseIsoDate(a.start) - parseIsoDate(b.start))
    .map((item) => {
      const startDate = parseIsoDate(item.start);
      const endDate = parseIsoDate(item.end);
      const status = getStatus(today, startDate, endDate);

      return {
        ...item,
        key: `batch-${item.batch}`,
        status,
        statusLabel: statusLabel(status),
      };
    });

  const nextIndex = computedItems.findIndex((item) => item.status === "upcoming");
  return computedItems.map((item, index) => ({
    ...item,
    isNext: nextIndex !== -1 && index === nextIndex,
  }));
});

function badgeClass(status) {
  if (status === "active") return "bg-emerald-100 text-emerald-700";
  if (status === "upcoming") return "bg-amber-100 text-amber-800";
  return "bg-slate-100 text-slate-600";
}

function dotClass(status) {
  if (status === "active") return "bg-emerald-500";
  if (status === "upcoming") return "bg-amber-500";
  return "bg-slate-300";
}
</script>
