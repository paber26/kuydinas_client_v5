<template>
  <div class="min-h-screen bg-slate-100">
    <div class="mx-auto flex min-h-screen max-w-[1600px] flex-col lg:flex-row">
      <aside
        class="w-full border-b border-slate-200 bg-white lg:min-h-screen lg:w-[320px] lg:border-b-0 lg:border-r"
      >
        <div class="p-5">
          <div class="flex items-center justify-between gap-3">
            <div>
              <p
                class="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600"
              >
                Daftar Soal
              </p>
              <h1 class="mt-1 text-lg font-bold text-slate-900">
                {{ tryoutMeta.title }}
              </h1>
            </div>
            <button
              type="button"
              class="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 lg:hidden"
              @click="showPalette = !showPalette"
            >
              {{ showPalette ? "Sembunyikan" : "Tampilkan" }}
            </button>
          </div>

          <div class="mt-4 flex flex-wrap gap-2 text-xs text-slate-500">
            <span class="rounded-full bg-slate-100 px-3 py-1.5">
              {{ questions.length }} soal
            </span>
            <span
              class="rounded-full bg-emerald-50 px-3 py-1.5 text-emerald-700"
            >
              {{ answeredCount }} terjawab
            </span>
            <span class="rounded-full bg-amber-50 px-3 py-1.5 text-amber-700">
              {{ flaggedCount }} ragu-ragu
            </span>
          </div>

          <div class="mt-5" :class="showPalette ? 'block' : 'hidden lg:block'">
            <div class="grid grid-cols-5 gap-3">
              <button
                v-for="(question, index) in questions"
                :key="question.id"
                type="button"
                class="relative flex h-12 items-center justify-center rounded-xl border text-sm font-semibold transition"
                :class="getPaletteClass(index)"
                @click="goToQuestion(index)"
              >
                {{ index + 1 }}
                <span
                  v-if="question.flagged"
                  class="absolute -right-1.5 -top-1.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-slate-300"
                />
              </button>
            </div>

            <div class="mt-6 space-y-2 text-xs text-slate-500">
              <div class="flex items-center gap-2">
                <span class="h-3 w-3 rounded-full bg-slate-900" />
                <span>Belum dijawab</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="h-3 w-3 rounded-full bg-emerald-500" />
                <span>Sudah dijawab</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="h-3 w-3 rounded-full bg-blue-500" />
                <span>Soal aktif</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="h-3 w-3 rounded-full bg-slate-300" />
                <span>Ditandai ragu-ragu</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <main class="flex-1 p-4 sm:p-6">
        <div class="rounded-[32px] bg-slate-50 p-4 sm:p-6">
          <div
            v-if="resultSummary"
            class="mb-6 rounded-[30px] border border-emerald-200 bg-white p-5 shadow-sm sm:p-6"
          >
            <div
              class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"
            >
              <div>
                <p
                  class="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600"
                >
                  Hasil Tryout
                </p>
                <h2 class="mt-2 text-2xl font-bold text-slate-900">
                  Tryout selesai
                </h2>
                <p class="mt-2 text-sm text-slate-500">
                  Nilai diambil langsung dari backend.
                </p>
              </div>

              <button
                type="button"
                class="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                @click="goToTryoutList"
              >
                Kembali ke Tryout Saya
              </button>
            </div>

            <div class="mt-6 grid gap-4 sm:grid-cols-3">
              <div class="rounded-2xl bg-emerald-50 p-4">
                <p class="text-sm text-emerald-700">Skor</p>
                <p class="mt-1 text-3xl font-bold text-emerald-800">
                  {{ resultSummary.score ?? "-" }}
                </p>
              </div>

              <div class="rounded-2xl border border-slate-200 p-4">
                <p class="text-sm text-slate-500">Jawaban Benar</p>
                <p class="mt-1 text-3xl font-bold text-slate-900">
                  {{ resultSummary.correctAnswer ?? "-" }}
                </p>
              </div>

              <div class="rounded-2xl border border-slate-200 p-4">
                <p class="text-sm text-slate-500">Selesai Pada</p>
                <p class="mt-1 text-base font-semibold text-slate-900">
                  {{ resultSummary.finishedAt || "-" }}
                </p>
              </div>
            </div>
          </div>

          <div
            v-if="isLoading"
            class="flex min-h-[60vh] items-center justify-center rounded-[30px] border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm"
          >
            Memuat soal tryout...
          </div>

          <div
            v-else-if="loadError"
            class="flex min-h-[60vh] flex-col items-center justify-center rounded-[30px] border border-rose-200 bg-white p-8 text-center shadow-sm"
          >
            <p class="text-lg font-semibold text-rose-600">
              {{ loadError }}
            </p>
            <button
              type="button"
              class="mt-4 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
              @click="loadTryoutSession"
            >
              Coba lagi
            </button>
          </div>

          <header
            v-else
            class="mb-6 flex flex-col gap-4 border-b border-slate-200 pb-6 xl:flex-row xl:items-start xl:justify-between"
          >
            <div>
              <p class="text-base font-semibold text-slate-600">
                Peserta: {{ participantName }}
              </p>
              <h2 class="mt-2 text-2xl font-bold text-slate-900">
                Soal nomor {{ currentQuestionNumber }}
              </h2>

              <div class="mt-2 flex items-center gap-3 text-sm text-slate-500">
                <span>Ukuran font soal:</span>
                <button
                  v-for="size in fontSizes"
                  :key="size.value"
                  type="button"
                  class="font-semibold transition"
                  :class="
                    selectedFontSize === size.value
                      ? 'text-slate-900'
                      : 'text-slate-400 hover:text-slate-700'
                  "
                  @click="selectedFontSize = size.value"
                >
                  {{ size.label }}
                </button>
              </div>
            </div>

            <div class="flex flex-wrap items-center gap-3">
              <div
                class="rounded-full border border-rose-300 bg-white px-5 py-3 text-sm font-semibold text-rose-500"
              >
                Sisa Waktu: {{ formattedTime }}
              </div>
              <button
                type="button"
                class="rounded-2xl bg-red-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700"
                @click="finishTryout"
              >
                Akhiri Tryout
              </button>
            </div>
          </header>

          <section
            v-if="!isLoading && !loadError && currentQuestion"
            class="rounded-[30px] border border-slate-200 bg-white p-5 shadow-sm sm:p-8"
          >
            <div class="max-w-5xl">
              <p
                class="leading-8 text-slate-900"
                :style="{ fontSize: selectedFontSize }"
              >
                {{ currentQuestion.text }}
              </p>
              <p
                v-if="currentQuestion.allowMultiple"
                class="mt-2 text-sm text-slate-500"
              >
                (Jawaban benar dapat lebih dari satu)
              </p>
            </div>

            <div class="mt-8 space-y-6">
              <label
                v-for="option in currentQuestion.options"
                :key="option.id"
                class="flex cursor-pointer items-start gap-4 rounded-[24px] border border-slate-200 bg-slate-50 px-4 py-5 transition hover:border-violet-200 hover:bg-violet-50/30 sm:px-6"
              >
                <input
                  :checked="isSelected(option.label)"
                  :type="currentQuestion.allowMultiple ? 'checkbox' : 'radio'"
                  :name="`question-${currentQuestion.id}`"
                  class="mt-1 h-5 w-5 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
                  @change="toggleAnswer(option.label)"
                />

                <div
                  class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-100 text-lg font-bold text-violet-600"
                >
                  {{ option.label }}
                </div>

                <p
                  class="pt-1 leading-7 text-slate-900"
                  :style="{ fontSize: selectedFontSize }"
                >
                  {{ option.text }}
                </p>
              </label>
            </div>

            <div
              class="mt-10 flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between"
            >
              <button
                type="button"
                class="rounded-2xl bg-rose-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-rose-600 disabled:cursor-not-allowed disabled:bg-slate-300"
                :disabled="currentIndex === 0"
                @click="previousQuestion"
              >
                Soal sebelumnya
              </button>

              <button
                type="button"
                class="rounded-2xl border-2 px-6 py-3 text-sm font-semibold transition"
                :class="
                  currentQuestion.flagged
                    ? 'border-amber-400 bg-amber-50 text-amber-700'
                    : 'border-amber-300 bg-white text-amber-600 hover:bg-amber-50'
                "
                @click="toggleFlag"
              >
                {{ currentQuestion.flagged ? "Batal Ragu-ragu" : "Ragu-ragu" }}
              </button>

              <button
                type="button"
                class="rounded-2xl bg-indigo-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600"
                @click="nextQuestion"
              >
                {{ isLastQuestion ? "Selesaikan Tryout" : "Soal berikutnya" }}
              </button>
            </div>
          </section>

          <div
            v-else-if="!isLoading && !loadError"
            class="flex min-h-[40vh] items-center justify-center rounded-[30px] border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm"
          >
            Soal tryout belum tersedia.
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "../../services/api";
import {
  autosaveTryout,
  getResult,
  getRemainingTime,
} from "../../services/tryoutService";

const route = useRoute();
const router = useRouter();

const participantName = localStorage.getItem("user_name") || "Peserta Tryout";
const selectedFontSize = ref("18px");
const showPalette = ref(false);
const currentIndex = ref(0);
const remainingSeconds = ref(88 * 60 + 5);
const isSubmitting = ref(false);
const isLoading = ref(true);
const loadError = ref("");
const resultSummary = ref(null);

const fontSizes = [
  { label: "A", value: "16px" },
  { label: "A", value: "18px" },
  { label: "A", value: "21px" },
  { label: "A", value: "24px" },
];

const tryoutMeta = ref({
  id: route.params.id,
  title: route.query.title || `Simulasi Tryout ${route.params.id}`,
  duration: null,
});

const questions = ref([]);

const currentQuestion = computed(() => questions.value[currentIndex.value]);
const currentQuestionNumber = computed(() => currentIndex.value + 1);
const answeredCount = computed(
  () =>
    questions.value.filter((question) => question.selected.length > 0).length,
);
const flaggedCount = computed(
  () => questions.value.filter((question) => question.flagged).length,
);
const isLastQuestion = computed(
  () => currentIndex.value === questions.value.length - 1,
);
const formattedTime = computed(() => {
  const safeSeconds = Math.max(
    0,
    Math.floor(Number(remainingSeconds.value) || 0),
  );
  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);
  const seconds = safeSeconds % 60;

  if (hours > 0) {
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
});

let timerId = null;
let autosaveTimeout = null;

async function loadTryoutSession() {
  isLoading.value = true;
  loadError.value = "";

  try {
    const historyResponse = await api.get("/history");
    const registeredTryouts = Array.isArray(historyResponse.data?.data)
      ? historyResponse.data.data
      : [];

    const registeredTryout = registeredTryouts.find(
      (item) => String(item.tryout_id ?? item.id) === String(route.params.id),
    );

    if (!registeredTryout) {
      throw new Error(
        "Tryout ini belum terdaftar pada akun Anda atau data history belum tersedia.",
      );
    }

    const detailResponse = await api.get(`/tryouts/${route.params.id}`);
    const normalized = normalizeTryoutResponse(
      detailResponse.data,
      registeredTryout,
    );

    tryoutMeta.value = {
      id: route.params.id,
      title: normalized.title,
      duration: normalized.duration,
    };
    questions.value = normalized.questions;
    currentIndex.value = 0;

    await loadRemainingTime();
  } catch (error) {
    console.error("Gagal memuat sesi tryout:", error);
    questions.value = [];
    loadError.value =
      error?.response?.data?.message ||
      error.message ||
      "Soal tryout belum bisa dimuat.";
  } finally {
    isLoading.value = false;
  }
}

async function loadRemainingTime() {
  try {
    const response = await getRemainingTime(route.params.id);
    const rawValue =
      response.data?.remaining_seconds ??
      response.data?.data?.remaining_seconds ??
      response.data?.remaining_time ??
      response.data?.data?.remaining_time ??
      response.data?.seconds ??
      response.data?.data?.seconds;

    const parsedRemainingSeconds = parseRemainingSeconds(rawValue);
    const fallbackDurationSeconds = getDurationFallbackSeconds();

    if (rawValue === null || rawValue === undefined) {
      if (fallbackDurationSeconds !== null) {
        remainingSeconds.value = fallbackDurationSeconds;
      }
      return;
    }

    if (
      parsedRemainingSeconds !== null &&
      isReasonableRemainingTime(parsedRemainingSeconds)
    ) {
      remainingSeconds.value = parsedRemainingSeconds;
      return;
    }

    if (fallbackDurationSeconds !== null) {
      remainingSeconds.value = fallbackDurationSeconds;
    }
  } catch (error) {
    console.error("Gagal mengambil sisa waktu:", error);
  }
}

function parseRemainingSeconds(rawValue) {
  if (rawValue === null || rawValue === undefined || rawValue === "") {
    return null;
  }

  if (typeof rawValue === "string" && rawValue.includes(":")) {
    const parts = rawValue.split(":").map((part) => Number(part));

    if (parts.every((part) => Number.isFinite(part))) {
      if (parts.length === 3) {
        return Math.max(
          0,
          Math.floor(parts[0] * 3600 + parts[1] * 60 + parts[2]),
        );
      }

      if (parts.length === 2) {
        return Math.max(0, Math.floor(parts[0] * 60 + parts[1]));
      }
    }
  }

  const numericValue = Number(rawValue);

  if (!Number.isFinite(numericValue)) {
    return null;
  }

  return Math.max(0, Math.floor(numericValue));
}

function getDurationFallbackSeconds() {
  const durationMinutes = Number(tryoutMeta.value.duration);

  if (!Number.isFinite(durationMinutes) || durationMinutes <= 0) {
    return null;
  }

  return Math.floor(durationMinutes * 60);
}

function isReasonableRemainingTime(value) {
  const fallbackDurationSeconds = getDurationFallbackSeconds();

  if (fallbackDurationSeconds === null) {
    return value >= 0;
  }

  return value >= 0 && value <= fallbackDurationSeconds;
}

function normalizeTryoutResponse(payload, registeredTryout) {
  const source =
    payload?.data?.tryout || payload?.data || payload?.tryout || payload || {};

  const questionSource =
    source.questions ||
    source.soals ||
    source.question_list ||
    payload?.questions ||
    payload?.data?.questions ||
    [];

  const normalizedQuestions = Array.isArray(questionSource)
    ? questionSource.map(normalizeQuestion).filter(Boolean)
    : [];

  if (!normalizedQuestions.length) {
    throw new Error(
      "Detail tryout berhasil dimuat, tetapi daftar soal belum ditemukan pada respons API.",
    );
  }

  return {
    title:
      source.title ||
      source.name ||
      registeredTryout?.title ||
      route.query.title ||
      `Simulasi Tryout ${route.params.id}`,
    duration:
      Number(source.duration || registeredTryout?.duration || 0) || null,
    questions: normalizedQuestions,
  };
}

function normalizeQuestion(question, index) {
  if (!question) {
    return null;
  }

  const optionSource =
    question.options ||
    question.choices ||
    question.answers ||
    question.pilihan ||
    [];

  const options = Array.isArray(optionSource)
    ? optionSource.map(normalizeOption).filter(Boolean)
    : [];

  if (!options.length) {
    return null;
  }

  const selectedSource =
    question.selected_answers ||
    question.selected ||
    question.answers_selected ||
    question.user_answers ||
    [];

  return {
    id: question.id ?? question.question_id ?? index + 1,
    text: question.question || question.text || question.body || question.soal,
    category: question.category || question.type || null,
    correctAnswer: normalizeCorrectAnswer(
      question.correct_answer ?? question.correctAnswer ?? null,
    ),
    allowMultiple:
      Boolean(question.allow_multiple) ||
      Boolean(question.is_multiple_choice) ||
      Boolean(question.multiple) ||
      Number(question.max_answers || 1) > 1,
    flagged: Boolean(question.flagged || question.is_flagged),
    selected: normalizeSelectedAnswers(selectedSource),
    options,
  };
}

function normalizeOption(option, index) {
  if (!option) {
    return null;
  }

  return {
    id:
      option.id ??
      option.option_id ??
      option.key ??
      option.value ??
      String.fromCharCode(97 + index),
    label:
      option.label ||
      option.code ||
      option.key?.toUpperCase?.() ||
      String.fromCharCode(65 + index),
    text: option.text || option.answer || option.option_text || option.pilihan,
    score:
      option.score !== undefined && option.score !== null
        ? Number(option.score)
        : null,
  };
}

function normalizeCorrectAnswer(value) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).toUpperCase());
  }

  if (value === null || value === undefined || value === "") {
    return [];
  }

  return [String(value).toUpperCase()];
}

function normalizeSelectedAnswers(value) {
  if (Array.isArray(value)) {
    return value.map((item) =>
      typeof item === "object" && item !== null
        ? String(
            item.label ?? item.code ?? item.id ?? item.option_id ?? item.value,
          )
        : String(item),
    );
  }

  if (value === null || value === undefined || value === "") {
    return [];
  }

  return [String(value)];
}

function createMockQuestions() {
  return [
    {
      id: 1,
      text: "Radiasi Latar Belakang Gelombang Mikro Kosmis (CMB) memberikan informasi penting tentang alam semesta awal. Pernyataan yang benar mengenai CMB adalah...",
      allowMultiple: true,
      flagged: false,
      selected: [],
      options: [
        {
          id: "a",
          label: "A",
          text: "Memiliki struktur inti karbon-oksigen yang tidak melakukan fusi.",
        },
        {
          id: "b",
          label: "B",
          text: "Melakukan pembakaran hidrogen dan helium di dalam kulit yang mengelilingi inti.",
        },
        {
          id: "c",
          label: "C",
          text: "Mengalami kehilangan massa secara besar-besaran melalui angin bintang yang kuat.",
        },
        {
          id: "d",
          label: "D",
          text: "Merupakan tahap tepat sebelum bintang meledak sebagai supernova tipe II.",
        },
      ],
    },
    {
      id: 2,
      text: "Dalam sistem pemerintahan Indonesia, lembaga yang berwenang menguji undang-undang terhadap UUD 1945 adalah...",
      allowMultiple: false,
      flagged: false,
      selected: [],
      options: [
        { id: "a", label: "A", text: "Mahkamah Agung" },
        { id: "b", label: "B", text: "Mahkamah Konstitusi" },
        { id: "c", label: "C", text: "Komisi Yudisial" },
        { id: "d", label: "D", text: "Dewan Perwakilan Rakyat" },
      ],
    },
    {
      id: 3,
      text: 'Pilih padanan kata yang paling tepat untuk kata "konkret".',
      allowMultiple: false,
      flagged: false,
      selected: [],
      options: [
        { id: "a", label: "A", text: "Abstrak" },
        { id: "b", label: "B", text: "Nyata" },
        { id: "c", label: "C", text: "Kabur" },
        { id: "d", label: "D", text: "Tersirat" },
      ],
    },
    {
      id: 4,
      text: "Sebuah kereta bergerak dengan kecepatan 72 km/jam. Berapa meter jarak yang ditempuh dalam 25 detik?",
      allowMultiple: false,
      flagged: false,
      selected: [],
      options: [
        { id: "a", label: "A", text: "350 meter" },
        { id: "b", label: "B", text: "400 meter" },
        { id: "c", label: "C", text: "450 meter" },
        { id: "d", label: "D", text: "500 meter" },
      ],
    },
    {
      id: 5,
      text: "Nilai utama ASN yang menekankan sikap adaptif terhadap perubahan adalah...",
      allowMultiple: false,
      flagged: false,
      selected: [],
      options: [
        { id: "a", label: "A", text: "Berorientasi pelayanan" },
        { id: "b", label: "B", text: "Akuntabel" },
        { id: "c", label: "C", text: "Adaptif" },
        { id: "d", label: "D", text: "Kolaboratif" },
      ],
    },
    {
      id: 6,
      text: "Jika semua peserta lulus seleksi administrasi dan sebagian peserta lulus SKD, maka pernyataan yang pasti benar adalah...",
      allowMultiple: false,
      flagged: false,
      selected: [],
      options: [
        { id: "a", label: "A", text: "Semua peserta lulus SKD" },
        {
          id: "b",
          label: "B",
          text: "Sebagian peserta tidak lulus administrasi",
        },
        { id: "c", label: "C", text: "Sebagian peserta lulus administrasi" },
        { id: "d", label: "D", text: "Tidak ada peserta lulus SKD" },
      ],
    },
    {
      id: 7,
      text: 'Sinonim yang paling dekat dari kata "efisien" adalah...',
      allowMultiple: false,
      flagged: false,
      selected: [],
      options: [
        { id: "a", label: "A", text: "Boros" },
        { id: "b", label: "B", text: "Hemat" },
        { id: "c", label: "C", text: "Rumit" },
        { id: "d", label: "D", text: "Lambat" },
      ],
    },
    {
      id: 8,
      text: "Dalam konstitusi, Presiden Republik Indonesia memegang kekuasaan pemerintahan menurut...",
      allowMultiple: false,
      flagged: false,
      selected: [],
      options: [
        { id: "a", label: "A", text: "Undang-Undang Dasar" },
        { id: "b", label: "B", text: "Peraturan Pemerintah" },
        { id: "c", label: "C", text: "Keputusan Presiden" },
        { id: "d", label: "D", text: "Peraturan Menteri" },
      ],
    },
    {
      id: 9,
      text: "Deret angka berikut: 3, 6, 12, 24, ... Angka selanjutnya adalah...",
      allowMultiple: false,
      flagged: false,
      selected: [],
      options: [
        { id: "a", label: "A", text: "36" },
        { id: "b", label: "B", text: "42" },
        { id: "c", label: "C", text: "48" },
        { id: "d", label: "D", text: "54" },
      ],
    },
    {
      id: 10,
      text: "Sikap yang tepat saat menerima kritik dalam lingkungan kerja adalah...",
      allowMultiple: false,
      flagged: false,
      selected: [],
      options: [
        { id: "a", label: "A", text: "Menolak karena merasa benar" },
        {
          id: "b",
          label: "B",
          text: "Menerima dan menjadikannya bahan evaluasi",
        },
        { id: "c", label: "C", text: "Membalas kritik dengan emosi" },
        { id: "d", label: "D", text: "Mengabaikan agar cepat selesai" },
      ],
    },
  ];
}

function getPaletteClass(index) {
  const question = questions.value[index];

  if (index === currentIndex.value) {
    return "border-blue-500 bg-blue-500 text-white shadow-sm";
  }

  if (question.selected.length > 0) {
    return "border-emerald-500 bg-emerald-500 text-white";
  }

  return "border-slate-200 bg-white text-slate-900 hover:border-slate-300";
}

function goToQuestion(index) {
  currentIndex.value = index;
}

function isSelected(optionId) {
  return currentQuestion.value.selected.includes(optionId);
}

function toggleAnswer(optionId) {
  const question = currentQuestion.value;

  if (question.allowMultiple) {
    question.selected = question.selected.includes(optionId)
      ? question.selected.filter((id) => id !== optionId)
      : [...question.selected, optionId];
  } else {
    question.selected = question.selected.includes(optionId) ? [] : [optionId];
  }

  scheduleAutosave();
}

function toggleFlag() {
  currentQuestion.value.flagged = !currentQuestion.value.flagged;
  scheduleAutosave();
}

function previousQuestion() {
  if (currentIndex.value > 0) {
    currentIndex.value -= 1;
  }
}

function nextQuestion() {
  if (isLastQuestion.value) {
    finishTryout();
    return;
  }

  currentIndex.value += 1;
}

function buildAnswersPayload() {
  return questions.value.reduce((answers, question) => {
    if (!question.selected.length) {
      return answers;
    }

    // Backend submit/autosave membaca answers sebagai map question_id => option label.
    answers[question.id] = String(question.selected[0]).toUpperCase();

    return answers;
  }, {});
}

function normalizeResultSummary(payload) {
  const source = payload?.data || payload || {};

  return {
    score: source.score ?? null,
    correctAnswer: source.correct_answer ?? source.correctAnswer ?? null,
    finishedAt: source.finished_at ?? source.finishedAt ?? null,
    answers: source.answers ?? {},
  };
}

async function fetchResultSummary() {
  const response = await getResult(route.params.id);
  return normalizeResultSummary(response.data);
}

function goToTryoutList() {
  router.push({ name: "pengerjaantryout", query: { refresh: Date.now() } });
}

function scheduleAutosave() {
  clearTimeout(autosaveTimeout);

  autosaveTimeout = setTimeout(async () => {
    try {
      await autosaveTryout(route.params.id, buildAnswersPayload());
    } catch (error) {
      console.error("Autosave tryout gagal:", error);
    }
  }, 500);
}

async function finishTryout() {
  if (isSubmitting.value || resultSummary.value) {
    return;
  }

  isSubmitting.value = true;

  try {
    const answers = buildAnswersPayload();
    const response = await api.post(`/tryouts/${route.params.id}/submit`, {
      answers,
    });

    const normalizedResponse = normalizeResultSummary(response.data);

    if (
      normalizedResponse.score !== null ||
      normalizedResponse.correctAnswer !== null ||
      normalizedResponse.finishedAt
    ) {
      resultSummary.value = normalizedResponse;
    } else {
      resultSummary.value = await fetchResultSummary();
    }

    clearInterval(timerId);
  } catch (error) {
    console.error("Submit tryout gagal:", error);
    return;
  } finally {
    isSubmitting.value = false;
  }
}

onMounted(() => {
  loadTryoutSession();
  timerId = window.setInterval(() => {
    if (remainingSeconds.value <= 1) {
      remainingSeconds.value = 0;
      clearInterval(timerId);
      finishTryout();
      return;
    }

    remainingSeconds.value -= 1;
  }, 1000);
});

watch(
  () => route.params.id,
  () => {
    resultSummary.value = null;
    loadTryoutSession();
  },
);

onBeforeUnmount(() => {
  clearInterval(timerId);
  clearTimeout(autosaveTimeout);
});
</script>
