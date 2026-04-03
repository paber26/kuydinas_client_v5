<template>
  <section
    class="relative rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
  >
    <div class="mb-6">
      <h3 class="text-base font-semibold text-slate-800">
        Jadwal Tryout Gratis
      </h3>
      <p class="mt-1 text-xs text-slate-500">
        Lihat tryout yang sedang aktif, akan datang, dan yang sudah berakhir.
      </p>
    </div>

    <ol
      v-if="timelineItems.length"
      class="relative border-l border-slate-200 pl-6"
    >
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
          :to="item.routeTarget"
          class="group block rounded-2xl border border-slate-100 bg-slate-50/60 p-4 transition hover:bg-white hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          :aria-label="
            item.isRegistered
              ? `Buka pengerjaan tryout untuk ${item.title}`
              : `Buka panduan registrasi tryout untuk ${item.title}`
          "
        >
          <div
            class="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between"
          >
            <div class="min-w-0">
              <p class="text-sm font-semibold text-slate-800">
                {{ item.title }}
              </p>

              <p class="mt-1 text-xs text-slate-600">
                Jadwal pengerjaan
                <span class="font-medium text-slate-700">{{
                  item.rangeLabel
                }}</span>
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

              <span
                class="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold"
                :class="registrationBadgeClass(item.isRegistered)"
              >
                {{ item.registrationLabel }}
              </span>
            </div>
          </div>

          <div
            class="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-slate-500"
          >
            <span
              class="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 ring-1 ring-slate-200"
            >
              <span class="h-1.5 w-1.5 rounded-full bg-slate-400"></span>
              Batch {{ item.batch }}
            </span>
            <span
              class="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 ring-1 ring-slate-200"
            >
              <span class="h-1.5 w-1.5 rounded-full bg-slate-400"></span>
              SKD CPNS 2026
            </span>

            <span
              class="ml-auto inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-700 opacity-0 transition group-hover:opacity-100"
            >
              {{ item.ctaLabel }}
              <span aria-hidden="true">→</span>
            </span>
          </div>
        </router-link>
      </li>
    </ol>

    <div
      v-else
      class="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center text-sm text-slate-500"
    >
      Belum ada tryout dengan jadwal masa akses yang bisa ditampilkan.
    </div>

    <div
      class="mt-6 rounded-2xl border border-slate-100 bg-slate-50 p-4 text-xs text-slate-600"
    >
      <p class="font-semibold text-slate-700">Info</p>
      <p class="mt-1">
        Jadwal di atas bersifat informasi. Jika ada perubahan, peserta akan
        melihat pembaruan di aplikasi.
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

function statusPriority(status) {
  if (status === "active") return 0;
  if (status === "upcoming") return 1;
  if (status === "past") return 2;
  return 3;
}

const timelineItems = computed(() => {
  const sourceItems = Array.isArray(props.items) ? props.items : [];
  const normalizedItems = sourceItems.map((item, index) => ({
    originalIndex: index,
    id: item.id ?? null,
    key: item.key ?? `tryout-${item.id ?? index}`,
    batch: item.batch ?? index + 1,
    title: item.title ?? "Tryout SKD",
    start: item.start ?? null,
    end: item.end ?? null,
    rangeLabel: item.range_label ?? "Jadwal belum tersedia",
    status: item.status ?? "active",
    statusLabel: item.status_label ?? "Sedang aktif",
    isRegistered: Boolean(item.is_registered),
    registrationLabel: item.registration_label ?? "Belum terdaftar",
    isNext: Boolean(item.is_next),
  }));

  const sortedItems = [...normalizedItems].sort((left, right) => {
    const byStatus = statusPriority(left.status) - statusPriority(right.status);

    if (byStatus !== 0) {
      return byStatus;
    }

    const leftStart = left.start ?? "9999-12-31";
    const rightStart = right.start ?? "9999-12-31";
    const byStart = leftStart.localeCompare(rightStart);

    if (byStart !== 0) {
      return byStart;
    }

    const leftEnd = left.end ?? "9999-12-31";
    const rightEnd = right.end ?? "9999-12-31";
    const byEnd = leftEnd.localeCompare(rightEnd);

    if (byEnd !== 0) {
      return byEnd;
    }

    return left.originalIndex - right.originalIndex;
  });

  const nextIndex = sortedItems.findIndex((item) => item.status === "upcoming");

  return sortedItems.map((item, index) => ({
    ...item,
    batch: index + 1,
    isNext: item.isNext || (nextIndex !== -1 && index === nextIndex),
    ctaLabel: item.isRegistered ? "Buka pengerjaan" : "Ikuti syarat dulu",
    routeTarget: item.isRegistered
      ? { name: "pengerjaantryout" }
      : {
          name: "panduan-tryout",
          params: { id: item.id },
          query: {
            title: item.title,
            category: "SKD",
            tag: "free",
          },
        },
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

function registrationBadgeClass(isRegistered) {
  return isRegistered
    ? "bg-sky-100 text-sky-700"
    : "bg-slate-100 text-slate-600";
}
</script>
