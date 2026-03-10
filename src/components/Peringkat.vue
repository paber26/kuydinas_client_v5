<template>
  <div class="min-h-full bg-slate-50">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <!-- HEADER -->
      <section
        class="rounded-2xl bg-white shadow-sm border border-slate-100 p-4 sm:p-5 flex flex-col gap-4"
      >
        <div
          class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
        >
          <div class="flex flex-col gap-1">
            <p
              class="text-xs font-semibold uppercase tracking-wide text-emerald-600"
            >
              Leaderboard Tryout SKD
            </p>
            <h1 class="text-xl sm:text-2xl font-semibold text-slate-800">
              Peringkat Peserta Tryout SKD
            </h1>
            <p class="text-xs sm:text-sm text-slate-600">
              Pilih tryout yang ingin kamu lihat peringkatnya, lalu bandingkan
              posisimu dengan peserta lain.
            </p>
          </div>

          <!-- SELECT TRYOUT -->
          <div class="w-full sm:w-72">
            <label
              class="block text-[11px] font-medium text-slate-500 mb-1"
              for="tryout-select"
            >
              Pilih Try Out
            </label>
            <select
              id="tryout-select"
              v-model="selectedTryoutId"
              class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs sm:text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option v-for="t in tryouts" :key="t.id" :value="t.id">
                {{ t.name }}
              </option>
            </select>
          </div>
        </div>

        <!-- USER POSITION -->
        <div
          class="rounded-xl bg-slate-50 border border-slate-200 p-4 flex items-center justify-between"
        >
          <div>
            <p class="text-xs text-slate-500">
              Peringkat Anda pada tryout ini:
            </p>
            <p
              class="mt-1 text-2xl font-bold"
              :class="
                selectedTryout.userRank ? 'text-emerald-600' : 'text-slate-400'
              "
            >
              {{ selectedTryout.userRank ? selectedTryout.userRank : "-" }}
            </p>
            <p class="text-xs text-slate-500">
              dari {{ selectedTryout.totalPeserta }} peserta
            </p>
            <p
              v-if="!selectedTryout.userRank"
              class="mt-1 text-[11px] text-slate-500"
            >
              Kamu belum pernah mengikuti tryout ini, tapi tetap bisa melihat
              peringkat peserta lain.
            </p>
          </div>
          <div class="flex flex-col items-end">
            <p class="text-xs text-slate-500">Nilai total kamu</p>
            <p class="mt-1 text-2xl font-bold text-slate-800">
              {{ selectedTryout.userScore ? selectedTryout.userScore : "-" }}
            </p>
          </div>
        </div>
      </section>

      <!-- TOP 3 -->
      <section class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div
          v-for="p in topThreeDisplay"
          :key="p.rank"
          class="rounded-2xl p-4 shadow-sm border text-center"
          :class="
            p.rank === 1
              ? 'bg-amber-100/70 border-amber-300'
              : p.rank === 2
              ? 'bg-slate-100 border-slate-300'
              : 'bg-emerald-100/60 border-emerald-300'
          "
        >
          <p class="font-semibold text-sm text-slate-700">
            Peringkat {{ p.rank }}
          </p>
          <p class="mt-2 text-lg font-bold text-slate-900">{{ p.name }}</p>
          <p class="text-xs text-slate-500">{{ p.region }}</p>
          <p class="mt-3 text-xl font-bold">{{ p.score }}</p>
        </div>
      </section>

      <!-- TABLE -->
      <section
        class="rounded-2xl bg-white shadow-sm border border-slate-100 p-4 sm:p-5"
      >
        <h2 class="text-sm font-semibold text-slate-700 mb-3">
          Daftar Peringkat Lengkap
        </h2>

        <div class="overflow-x-auto">
          <table class="w-full text-xs sm:text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-slate-700">
                <th class="px-3 py-2 text-left">Peringkat</th>
                <th class="px-3 py-2 text-left">Nama</th>
                <th class="px-3 py-2 text-left">Asal Daerah</th>
                <th class="px-3 py-2 text-center">TWK</th>
                <th class="px-3 py-2 text-center">TIU</th>
                <th class="px-3 py-2 text-center">TKP</th>
                <th class="px-3 py-2 text-center">Total</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="row in leaderboardDisplay"
                :key="row.rank"
                :class="
                  row.rank === selectedTryout.userRank
                    ? 'bg-emerald-50 font-semibold'
                    : 'bg-white'
                "
                class="border-b"
              >
                <td class="px-3 py-2">{{ row.rank }}</td>
                <td class="px-3 py-2">{{ row.name }}</td>
                <td class="px-3 py-2">{{ row.region }}</td>
                <td class="px-3 py-2 text-center">{{ row.twk }}</td>
                <td class="px-3 py-2 text-center">{{ row.tiu }}</td>
                <td class="px-3 py-2 text-center">{{ row.tkp }}</td>
                <td class="px-3 py-2 text-center font-bold">{{ row.total }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- MOTIVATION -->
      <section
        class="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 sm:p-5 text-center"
      >
        <h3 class="text-sm sm:text-base font-semibold text-emerald-800">
          Semakin sering latihan, semakin besar peluang Anda naik peringkat!
        </h3>
        <p class="mt-1 text-xs sm:text-sm text-emerald-700">
          Coba ikuti tryout lain untuk memperbaiki nilai Anda dan mencapai
          peringkat terbaik.
        </p>

        <router-link
          to="/promo"
          class="inline-flex items-center justify-center rounded-xl bg-emerald-600 text-white px-4 py-2 mt-3 text-xs sm:text-sm font-semibold hover:bg-emerald-700"
        >
          Coba Tryout Lainnya
        </router-link>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const tryouts = [
  {
    id: "batch9",
    name: "TRYOUT SKD 2024 BATCH 9",
    userRank: 279,
    totalPeserta: 300,
    userScore: 455,
    topThree: [
      { rank: 1, name: "Verlia Indah", region: "Jawa Barat", score: 556 },
      { rank: 2, name: "Kaditata Alyssa", region: "Jawa Timur", score: 525 },
      { rank: 3, name: "M. Firlan Wijaya", region: "Banten", score: 510 },
    ],
    leaderboard: [
      {
        rank: 278,
        name: "Peserta A",
        region: "Jawa Tengah",
        twk: 90,
        tiu: 120,
        tkp: 220,
        total: 430,
      },
      {
        rank: 279,
        name: "Aldo",
        region: "DKI Jakarta",
        twk: 95,
        tiu: 130,
        tkp: 230,
        total: 455,
      },
      {
        rank: 280,
        name: "Peserta B",
        region: "Jawa Barat",
        twk: 85,
        tiu: 110,
        tkp: 200,
        total: 395,
      },
    ],
  },
  {
    id: "batch10",
    name: "TRYOUT SKD 2024 BATCH 10",
    userRank: null,
    totalPeserta: 250,
    userScore: null,
    topThree: [
      { rank: 1, name: "Peserta C", region: "Sumatera Utara", score: 540 },
      { rank: 2, name: "Peserta D", region: "Jawa Barat", score: 530 },
      { rank: 3, name: "Peserta E", region: "Sulawesi Selatan", score: 520 },
    ],
    leaderboard: [
      {
        rank: 1,
        name: "Peserta C",
        region: "Sumatera Utara",
        twk: 120,
        tiu: 140,
        tkp: 280,
        total: 540,
      },
      {
        rank: 2,
        name: "Peserta D",
        region: "Jawa Barat",
        twk: 115,
        tiu: 135,
        tkp: 280,
        total: 530,
      },
      {
        rank: 3,
        name: "Peserta E",
        region: "Sulawesi Selatan",
        twk: 110,
        tiu: 130,
        tkp: 280,
        total: 520,
      },
    ],
  },
];

const selectedTryoutId = ref(tryouts[0]?.id || null);

const selectedTryout = computed(() => {
  return (
    tryouts.find((t) => t.id === selectedTryoutId.value) || {
      id: null,
      name: "",
      userRank: null,
      totalPeserta: 0,
      userScore: null,
      topThree: [],
      leaderboard: [],
    }
  );
});

const topThreeDisplay = computed(() => selectedTryout.value.topThree || []);
const leaderboardDisplay = computed(
  () => selectedTryout.value.leaderboard || []
);
</script>
