<template>
  <div class="p-6 space-y-6">
    <h1 class="text-2xl font-bold text-slate-800">Tryout Saya</h1>

    <!-- Loading -->
    <div v-if="loading" class="text-center text-slate-500">
      Memuat tryout...
    </div>

    <!-- Empty -->
    <div
      v-else-if="tryouts.length === 0"
      class="text-center text-slate-500 bg-white rounded-xl shadow p-10"
    >
      Belum ada tryout yang ditambahkan.
    </div>

    <!-- Tryout list -->
    <div v-else class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="tryout in tryouts"
        :key="tryout.id"
        class="bg-white border rounded-xl shadow p-5 flex flex-col justify-between"
      >
        <div>
          <h2 class="font-semibold text-lg text-slate-800">
            {{ tryout.title }}
          </h2>

          <p class="text-sm text-slate-500 mt-1">
            Durasi: {{ tryout.duration }} menit
          </p>

          <p class="mt-2 text-xs font-medium text-slate-500">
            Status:
            <span class="capitalize text-slate-700">{{ tryout.status }}</span>
          </p>
        </div>

        <div class="mt-4 grid gap-3">
          <button
            @click="goToTryout(tryout.id)"
            class="w-full py-2 rounded-lg text-white"
            :class="
              tryout.status === 'completed'
                ? 'cursor-not-allowed bg-slate-400'
                : 'bg-emerald-600 hover:bg-emerald-700'
            "
            :disabled="tryout.status === 'completed'"
          >
            {{
              tryout.status === "completed"
                ? "Sudah Mengerjakan"
                : "Lanjutkan Tryout"
            }}
          </button>

          <button
            @click="openResult(tryout)"
            class="w-full border border-slate-300 text-slate-700 py-2 rounded-lg hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            :disabled="tryout.status !== 'completed'"
          >
            Lihat Hasil
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="selectedResult"
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4"
    >
      <div class="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <div class="flex items-start justify-between gap-4">
          <div>
            <h2 class="text-xl font-bold text-slate-900">Hasil Tryout</h2>
            <p class="mt-1 text-sm text-slate-500">
              {{ selectedResult.title }}
            </p>
          </div>

          <button
            @click="closeResult"
            class="rounded-lg px-3 py-2 text-sm font-semibold text-slate-500 hover:bg-slate-100"
          >
            Tutup
          </button>
        </div>

        <div v-if="resultLoading" class="mt-6 text-sm text-slate-500">
          Memuat hasil tryout...
        </div>

        <div v-else-if="resultError" class="mt-6 text-sm text-rose-600">
          {{ resultError }}
        </div>

        <div v-else class="mt-6 space-y-4">
          <div class="rounded-2xl bg-emerald-50 p-4">
            <p class="text-sm text-emerald-700">Skor</p>
            <p class="mt-1 text-3xl font-bold text-emerald-800">
              {{ selectedResult.score ?? "-" }}
            </p>
          </div>

          <div class="grid gap-3 sm:grid-cols-2">
            <div class="rounded-xl border border-slate-200 p-4">
              <p class="text-xs uppercase tracking-wide text-slate-400">
                Peringkat
              </p>
              <p class="mt-1 text-lg font-semibold text-slate-800">
                {{ selectedResult.rank ?? "-" }}
              </p>
            </div>

            <div class="rounded-xl border border-slate-200 p-4">
              <p class="text-xs uppercase tracking-wide text-slate-400">
                Jawaban Benar
              </p>
              <p class="mt-1 text-lg font-semibold text-slate-800">
                {{ selectedResult.correctAnswer ?? "-" }}
              </p>
            </div>
          </div>

          <div
            v-if="selectedResult.finishedAt"
            class="rounded-xl border border-slate-200 p-4 text-sm text-slate-600"
          >
            Selesai pada: {{ selectedResult.finishedAt }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import api from "../../services/api";
import { getResult } from "../../services/tryoutService";

const router = useRouter();
const route = useRoute();

const loading = ref(true);
const tryouts = ref([]);
const resultLoading = ref(false);
const resultError = ref("");
const selectedResult = ref(null);

const loadUserTryouts = async () => {
  try {
    // endpoint yang menyimpan tryout milik user
    const res = await api.get("/history");
    tryouts.value = res.data.data || [];
    console.log(res);
  } catch (err) {
    console.error("Gagal mengambil tryout user", err);
  } finally {
    loading.value = false;
  }
};

const goToTryout = (id) => {
  router.push({ name: "sesi-tryout", params: { id } });
};

const firstDefined = (...values) =>
  values.find((value) => value !== undefined && value !== null);

const openResult = async (tryout) => {
  selectedResult.value = {
    id: tryout.id,
    title: tryout.title,
    score: null,
    rank: null,
    correctAnswer: null,
    finishedAt: tryout.finished_at || null,
  };
  resultLoading.value = true;
  resultError.value = "";

  try {
    const res = await getResult(tryout.id);
    const root = res.data || {};
    const source = root.data || root || {};
    const resultSource =
      source.result ||
      root.result ||
      source.tryout_result ||
      root.tryout_result ||
      {};

    selectedResult.value = {
      id: tryout.id,
      title: tryout.title,
      score: firstDefined(
        source.score,
        resultSource.score,
        root.score,
        null,
      ),
      rank: firstDefined(
        source.rank,
        source.position,
        resultSource.rank,
        resultSource.position,
        root.rank,
        root.position,
        null,
      ),
      correctAnswer: firstDefined(
        source.correct_answer,
        source.correctAnswer,
        source.correct_answers,
        source.correctAnswers,
        resultSource.correct_answer,
        resultSource.correctAnswer,
        resultSource.correct_answers,
        resultSource.correctAnswers,
        root.correct_answer,
        root.correctAnswer,
        root.correct_answers,
        root.correctAnswers,
        null,
      ),
      finishedAt:
        firstDefined(
          source.finished_at,
          source.finishedAt,
          resultSource.finished_at,
          resultSource.finishedAt,
          root.finished_at,
          root.finishedAt,
          tryout.finished_at,
          null,
        ),
    };
  } catch (err) {
    console.error("Gagal mengambil hasil tryout:", err);
    resultError.value =
      err?.response?.data?.message || "Hasil tryout belum tersedia.";
  } finally {
    resultLoading.value = false;
  }
};

const closeResult = () => {
  selectedResult.value = null;
  resultError.value = "";
  resultLoading.value = false;
};

onMounted(() => {
  loadUserTryouts();
});

watch(
  () => route.query.refresh,
  () => {
    // When navigated back from promo page with ?refresh=..., reload list
    loadUserTryouts();
  },
);
</script>
