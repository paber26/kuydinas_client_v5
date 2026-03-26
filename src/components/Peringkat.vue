<template>
  <div class="min-h-full bg-slate-50">
    <div class="max-w-6xl mx-auto space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <section
        class="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5"
      >
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div class="flex flex-col gap-1">
            <p class="text-xs font-semibold uppercase tracking-wide text-emerald-600">
              Leaderboard Tryout SKD
            </p>
            <h1 class="text-xl font-semibold text-slate-800 sm:text-2xl">
              Peringkat Peserta Tryout SKD
            </h1>
            <p class="text-xs text-slate-600 sm:text-sm">
              Pilih tryout yang ingin kamu lihat peringkatnya, lalu bandingkan
              posisimu dengan peserta lain.
            </p>
          </div>

          <div class="w-full sm:w-72">
            <label
              class="mb-1 block text-[11px] font-medium text-slate-500"
              for="tryout-select"
            >
              Pilih Try Out
            </label>
            <select
              id="tryout-select"
              v-model="selectedTryoutId"
              :disabled="loadingTryouts || !tryouts.length"
              class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 sm:text-sm disabled:cursor-not-allowed disabled:bg-slate-100"
            >
              <option v-if="!tryouts.length" :value="null">
                Belum ada tryout
              </option>
              <option v-for="t in tryouts" :key="t.id" :value="t.id">
                {{ t.name }}
              </option>
            </select>
          </div>
        </div>

        <div
          class="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4"
        >
          <div>
            <p class="text-xs text-slate-500">Peringkat Anda pada tryout ini:</p>
            <p
              class="mt-1 text-2xl font-bold"
              :class="selectedTryout.userRank ? 'text-emerald-600' : 'text-slate-400'"
            >
              {{ selectedTryout.userRank || "-" }}
            </p>
            <p class="text-xs text-slate-500">
              dari {{ selectedTryout.totalPeserta }} peserta
            </p>
            <p
              v-if="!selectedTryout.userRank && !loadingRanking"
              class="mt-1 text-[11px] text-slate-500"
            >
              Kamu belum pernah menyelesaikan tryout ini, tapi tetap bisa melihat
              peringkat peserta lain.
            </p>
          </div>

          <div class="flex flex-col items-end">
            <p class="text-xs text-slate-500">Nilai total kamu</p>
            <p class="mt-1 text-2xl font-bold text-slate-800">
              {{ selectedTryout.userScore || "-" }}
            </p>
          </div>
        </div>
      </section>

      <div
        v-if="errorMessage"
        class="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
      >
        {{ errorMessage }}
      </div>

      <section v-if="loadingRanking" class="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div
          v-for="placeholder in 3"
          :key="placeholder"
          class="h-32 animate-pulse rounded-2xl border border-slate-200 bg-white"
        ></div>
      </section>

      <section v-else class="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div
          v-for="p in topThreeDisplay"
          :key="`${p.rank}-${p.user_id || p.name}`"
          class="rounded-2xl border p-4 text-center shadow-sm"
          :class="
            p.rank === 1
              ? 'border-amber-300 bg-amber-100/70'
              : p.rank === 2
                ? 'border-slate-300 bg-slate-100'
                : 'border-emerald-300 bg-emerald-100/60'
          "
        >
          <p class="text-sm font-semibold text-slate-700">Peringkat {{ p.rank }}</p>
          <p class="mt-2 text-lg font-bold text-slate-900">{{ p.name }}</p>
          <p class="text-xs text-slate-500">{{ p.region }}</p>
          <p class="mt-3 text-xl font-bold">{{ p.total }}</p>
        </div>

        <div
          v-if="!topThreeDisplay.length"
          class="col-span-full rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center text-sm text-slate-500"
        >
          Belum ada peserta yang menyelesaikan tryout ini.
        </div>
      </section>

      <section
        class="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5"
      >
        <h2 class="mb-3 text-sm font-semibold text-slate-700">
          Daftar Peringkat Lengkap
        </h2>

        <div v-if="loadingRanking" class="py-8 text-center text-sm text-slate-500">
          Memuat leaderboard...
        </div>

        <div
          v-else-if="!leaderboardDisplay.length"
          class="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center text-sm text-slate-500"
        >
          Belum ada data leaderboard untuk tryout ini.
        </div>

        <div v-else class="overflow-x-auto">
          <table class="w-full border-collapse text-xs sm:text-sm">
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
                :key="`${row.rank}-${row.user_id}`"
                class="border-b"
                :class="row.is_current_user ? 'bg-emerald-50 font-semibold' : 'bg-white'"
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

      <section
        class="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-center sm:p-5"
      >
        <h3 class="text-sm font-semibold text-emerald-800 sm:text-base">
          Semakin sering latihan, semakin besar peluang Anda naik peringkat!
        </h3>
        <p class="mt-1 text-xs text-emerald-700 sm:text-sm">
          Coba ikuti tryout lain untuk memperbaiki nilai Anda dan mencapai
          peringkat terbaik.
        </p>

        <router-link
          to="/promotryout"
          class="mt-3 inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700 sm:text-sm"
        >
          Coba Tryout Lainnya
        </router-link>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { getRanking, getTryoutList } from "../services/tryoutService";

const tryouts = ref([]);
const selectedTryoutId = ref(null);
const loadingTryouts = ref(true);
const loadingRanking = ref(false);
const errorMessage = ref("");
const rankingData = ref({
  summary: {
    total_participants: 0,
    user_rank: null,
    user_score: null,
  },
  top_three: [],
  leaderboard: [],
});

const selectedTryout = computed(() => {
  const activeTryout = tryouts.value.find(
    (tryout) => String(tryout.id) === String(selectedTryoutId.value),
  );

  return {
    id: activeTryout?.id ?? null,
    name: activeTryout?.name ?? "",
    userRank: rankingData.value.summary?.user_rank ?? null,
    totalPeserta: rankingData.value.summary?.total_participants ?? 0,
    userScore: rankingData.value.summary?.user_score ?? null,
    topThree: rankingData.value.top_three ?? [],
    leaderboard: rankingData.value.leaderboard ?? [],
  };
});

const topThreeDisplay = computed(() => selectedTryout.value.topThree || []);
const leaderboardDisplay = computed(() => selectedTryout.value.leaderboard || []);

async function loadTryouts() {
  loadingTryouts.value = true;
  errorMessage.value = "";

  try {
    const response = await getTryoutList();
    const list = Array.isArray(response.data?.data) ? response.data.data : [];

    tryouts.value = list.map((item) => ({
      id: item.id,
      name: item.title || `Tryout #${item.id}`,
    }));

    if (!selectedTryoutId.value && tryouts.value.length) {
      selectedTryoutId.value = tryouts.value[0].id;
    }
  } catch (error) {
    console.error("Gagal memuat daftar tryout ranking:", error);
    errorMessage.value = "Daftar tryout belum bisa dimuat.";
  } finally {
    loadingTryouts.value = false;
  }
}

async function loadRanking(tryoutId) {
  if (!tryoutId) {
    rankingData.value = {
      summary: {
        total_participants: 0,
        user_rank: null,
        user_score: null,
      },
      top_three: [],
      leaderboard: [],
    };
    return;
  }

  loadingRanking.value = true;
  errorMessage.value = "";

  try {
    const response = await getRanking(tryoutId);
    rankingData.value = response.data?.data ?? rankingData.value;
  } catch (error) {
    console.error("Gagal memuat ranking tryout:", error);
    errorMessage.value = "Leaderboard tryout belum bisa dimuat.";
    rankingData.value = {
      summary: {
        total_participants: 0,
        user_rank: null,
        user_score: null,
      },
      top_three: [],
      leaderboard: [],
    };
  } finally {
    loadingRanking.value = false;
  }
}

watch(selectedTryoutId, (value) => {
  loadRanking(value);
});

onMounted(async () => {
  await loadTryouts();
});
</script>
