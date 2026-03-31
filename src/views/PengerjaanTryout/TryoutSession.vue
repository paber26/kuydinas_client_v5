<template>
  <div class="h-screen w-screen bg-slate-100 overflow-hidden">
    <div class="flex h-full w-full flex-row-reverse">
      <aside class="h-full w-[280px] bg-white border-l shadow-sm">
        <div class="flex h-full flex-col overflow-y-auto">
          <div class="p-4 sm:p-5">
            <div class="flex items-center justify-between gap-3">
              <div>
                <p class="text-[10px] font-bold uppercase tracking-widest text-violet-600">
                  Peserta: {{ participantName }}
                </p>
                <h1 class="mt-1 text-lg font-extrabold text-slate-900 line-clamp-1">
                  {{ tryoutMeta.title }}
                </h1>
              </div>
              <button
                type="button"
                class="rounded-xl bg-slate-100 p-2 text-slate-500 hover:bg-slate-200 lg:hidden"
                @click="() => {}"
              >
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div class="mt-4 flex flex-wrap gap-1.5 text-[11px] text-slate-500">
              <span class="rounded-lg bg-slate-100 px-2.5 py-1 font-medium">{{ questions.length }} soal</span>
              <span class="rounded-lg bg-emerald-50 px-2.5 py-1 font-medium text-emerald-700">
                {{ answeredCount }} terjawab
              </span>
              <span class="rounded-lg bg-amber-50 px-2.5 py-1 font-medium text-amber-700">{{ flaggedCount }} ragu</span>
            </div>

            <div class="mt-6 space-y-5">
              <div v-for="section in groupedQuestionSections" :key="section.category">
                <div class="mb-2 flex items-center justify-between">
                  <p class="text-[11px] font-black uppercase tracking-[0.2em]" :class="getCategoryTextClass(section.category)">
                    {{ formatCategory(section.category) }}
                  </p>
                  <span class="text-[10px] font-semibold text-slate-400">{{ section.items.length }} soal</span>
                </div>

                <div class="grid grid-cols-5 gap-2">
                  <button
                    v-for="item in section.items"
                    :key="item.question.id"
                    type="button"
                    class="relative flex h-10 w-10 items-center justify-center rounded-md border text-sm font-semibold"
                    :class="getPaletteClass(item.index)"
                    @click="goToQuestion(item.index)"
                  >
                    {{ item.index + 1 }}
                    <span
                      v-if="item.question.flagged"
                      class="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white bg-amber-400"
                    />
                  </button>
                </div>
              </div>

              <div class="mt-6 space-y-2 border-t border-slate-100 pt-5 text-[11px] font-medium text-slate-500">
                <div class="flex items-center gap-2">
                  <span class="h-2.5 w-2.5 rounded-full border border-slate-200 bg-white" />
                  <span>Belum dijawab</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  <span>Sudah dijawab</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="h-2.5 w-2.5 rounded-full bg-blue-500" />
                  <span>Sedang dibuka</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span>Ragu-ragu</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <main class="flex-1 h-full overflow-y-auto p-6">
        <div class="w-full">
          <div v-if="resultSummary" class="mb-4 rounded-3xl border border-emerald-200 bg-white p-4 shadow-sm sm:p-6">
            <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p class="text-xs font-bold uppercase tracking-widest text-emerald-600">Hasil Tryout</p>
                <h2 class="mt-1 text-xl font-extrabold text-slate-900">Tryout selesai</h2>
                <p class="mt-1 text-xs text-slate-500">Nilai diambil langsung dari backend.</p>
              </div>

              <button
                type="button"
                class="rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-slate-700"
                @click="goToTryoutList"
              >
                Kembali ke Tryout Saya
              </button>
            </div>

            <div class="mt-5 grid border-t border-slate-100 pt-5 gap-3 sm:grid-cols-3">
              <div class="rounded-2xl bg-emerald-50 p-4">
                <p class="text-xs font-bold text-emerald-700">Skor</p>
                <p class="mt-0.5 text-2xl font-black text-emerald-800">
                  {{ resultSummary.score ?? "-" }}
                </p>
              </div>

              <div class="rounded-2xl border border-slate-100 p-4">
                <p class="text-xs font-bold text-slate-400">Peringkat</p>
                <p class="mt-0.5 text-2xl font-black text-slate-900">
                  {{ resultSummary.rank ?? "-" }}
                </p>
              </div>

              <div class="rounded-2xl border border-slate-100 p-4">
                <p class="text-xs font-bold text-slate-400">Jawaban Benar</p>
                <p class="mt-0.5 text-2xl font-black text-slate-900">
                  {{ resultSummary.correctAnswer ?? "-" }}
                </p>
              </div>
            </div>
          </div>

          <div
            v-if="isLoading"
            class="flex min-h-[50vh] items-center justify-center rounded-3xl border border-slate-200 bg-white p-8 text-center text-sm font-medium text-slate-500 shadow-sm"
          >
            Memuat soal tryout...
          </div>

          <div
            v-else-if="loadError"
            class="flex min-h-[50vh] flex-col items-center justify-center rounded-3xl border border-rose-100 bg-white p-8 text-center shadow-sm"
          >
            <p class="text-lg font-bold text-rose-600">
              {{ loadError }}
            </p>
            <button
              type="button"
              class="mt-4 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-700"
              @click="loadTryoutSession"
            >
              Coba lagi
            </button>
          </div>

          <template v-else-if="!resultSummary">
            <header class="flex items-center justify-between mb-4 border-b border-slate-200 pb-3">
              <div class="flex items-center gap-4">
                <button
                  type="button"
                  class="rounded-xl border border-slate-200 p-2.5 text-slate-500 hover:bg-white hover:shadow-sm lg:hidden"
                  @click="() => {}"
                >
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <div>
                  <div class="flex items-center gap-3">
                    <h2 class="text-xl font-black text-slate-900">Soal {{ currentQuestionNumber }}</h2>
                    <span
                      v-if="currentQuestion"
                      class="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-[0.2em]"
                      :class="getCategoryBadgeClass(currentQuestion.category)"
                    >
                      {{ formatCategory(currentQuestion.category) }}
                    </span>
                  </div>
                  <div class="mt-1 flex items-center gap-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <span>Ukuran:</span>
                    <div class="flex items-center gap-3">
                      <button
                        v-for="size in fontSizes"
                        :key="size.value"
                        type="button"
                        class="transition"
                        :class="selectedFontSize === size.value ? 'text-violet-600 scale-110' : 'hover:text-slate-700'"
                        @click="selectedFontSize = size.value"
                      >
                        {{ size.label }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex items-center gap-2">
                <div
                  class="flex items-center gap-2 rounded-xl border-2 border-rose-100 bg-rose-50/50 px-4 py-2 font-mono text-sm font-bold text-rose-600"
                >
                  <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {{ formattedTime }}
                </div>
                <button
                  type="button"
                  class="rounded-xl bg-rose-600 px-4 py-2.5 text-xs font-extrabold text-white shadow-sm transition hover:bg-rose-700 disabled:opacity-60"
                  :disabled="isSubmitting"
                  @click="showEndConfirm = true"
                >
                  Akhiri
                </button>
              </div>
            </header>

            <section
              v-if="currentQuestion"
              class="rounded-xl border border-slate-200 bg-white p-6"
            >
              <div class="prose prose-slate max-w-none">
                <div
                  class="leading-relaxed text-slate-800 font-medium whitespace-pre-line rich-content"
                  :style="{ fontSize: selectedFontSize }"
                  v-html="sanitizeRichText(currentQuestion.text)"
                ></div>
                <p
                  v-if="currentQuestion.allowMultiple"
                  class="mt-2 text-[11px] font-bold uppercase tracking-wider text-slate-400"
                >
                  (Pilih semua jawaban yang benar)
                </p>
              </div>

              <div class="mt-6 space-y-3">
                <label
                  v-for="option in currentQuestion.options"
                  :key="option.id"
                  class="group flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 bg-white p-4 hover:border-violet-400"
                  :class="isSelected(option.label) ? 'border-violet-600 bg-violet-600 ring-1 ring-violet-600' : ''"
                >
                  <div class="relative mt-1">
                    <input
                      :checked="isSelected(option.label)"
                      :type="currentQuestion.allowMultiple ? 'checkbox' : 'radio'"
                      class="h-5 w-5 rounded-lg border-2 border-slate-300 text-violet-600 focus:ring-violet-500"
                      @change="toggleAnswer(option.label)"
                    />
                  </div>

                  <div
                    class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-sm font-black text-violet-700 transition-colors group-hover:bg-violet-200"
                    :class="isSelected(option.label) ? 'bg-white text-violet-700' : 'bg-violet-100 text-violet-700'"
                  >
                    {{ option.label }}
                  </div>

                  <div
                    class="flex-1 pt-1.5 font-medium transition-colors whitespace-pre-line rich-content"
                    :class="isSelected(option.label) ? 'text-white' : 'text-slate-700 group-hover:text-slate-900'"
                    :style="{ fontSize: selectedFontSize }"
                    v-html="sanitizeRichText(option.text)"
                  ></div>
                </label>
              </div>

              <div class="mt-6 flex items-center justify-between border-t border-slate-200 pt-4">
                <div class="flex items-center gap-2">
                  <button
                    type="button"
                    class="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50 disabled:opacity-30"
                    :disabled="currentIndex === 0 || isSubmitting"
                    @click="previousQuestion"
                  >
                    Sebelumnya
                  </button>
                  <button
                    type="button"
                    class="rounded-xl border-2 px-5 py-2 text-xs font-bold transition-all flex items-center justify-center"
                    :class="
                      currentQuestion.flagged
                        ? 'border-amber-500 bg-amber-500 text-white shadow'
                        : 'border-amber-200 bg-amber-50 text-amber-600 hover:bg-amber-100'
                    "
                    :disabled="isSubmitting"
                    @click="toggleFlag"
                  >
                    {{ currentQuestion.flagged ? "Yakin" : "Ragu-ragu" }}
                  </button>
                </div>

                <button
                  type="button"
                  class="rounded-xl bg-violet-600 px-6 py-3 text-sm font-black text-white shadow-lg shadow-violet-200 transition active:scale-95 disabled:opacity-60"
                  :disabled="isSubmitting"
                  @click="nextQuestion"
                >
                  {{ isLastQuestion ? "Selesaikan" : "Selanjutnya" }}
                </button>
              </div>
            </section>

            <div
              v-else
              class="flex min-h-[40vh] items-center justify-center rounded-3xl border border-slate-100 bg-white p-8 text-center text-sm font-medium text-slate-500 shadow-sm"
            >
              Soal tryout belum tersedia.
            </div>
          </template>
        </div>
      </main>
    </div>

    <div
      v-if="showEndConfirm"
      class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
    >
      <div class="w-full max-w-sm rounded-[32px] bg-white p-6 shadow-2xl transition-all">
        <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-50 text-rose-500">
          <svg class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <div class="mt-5 text-center">
          <h3 class="text-xl font-black text-slate-900">Selesaikan Tryout?</h3>
          <p class="mt-2 text-sm font-medium text-slate-500">
            Masih ada waktu pengerjaan. Pastikan semua jawaban sudah kamu periksa kembali.
          </p>
        </div>
        <div class="mt-8 flex flex-col gap-2">
          <button
            type="button"
            class="flex w-full items-center justify-center rounded-2xl bg-slate-900 px-5 py-4 text-sm font-black text-white transition hover:bg-slate-700 active:scale-[0.98] disabled:opacity-60"
            :disabled="isSubmitting"
            @click="finishTryout"
          >
            {{ isSubmitting ? "Mengirim hasil..." : "Ya, Selesaikan" }}
          </button>
          <button
            type="button"
            class="flex w-full items-center justify-center rounded-2xl bg-white px-5 py-4 text-sm font-bold text-slate-400 transition hover:text-slate-600"
            :disabled="isSubmitting"
            @click="showEndConfirm = false"
          >
            Lanjutkan Pengerjaan
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  autosaveTryout,
  getMyRank,
  getRemainingTime,
  getResult,
  startTryout,
  submitTryout,
} from "../../services/tryoutService";

const route = useRoute();
const router = useRouter();

const participantName = localStorage.getItem("user_name") || "Peserta Tryout";
const selectedFontSize = ref("18px");
const showEndConfirm = ref(false);
const currentIndex = ref(0);
const remainingSeconds = ref(0);
const isSubmitting = ref(false);
const isLoading = ref(true);
const loadError = ref("");
const resultSummary = ref(null);
const lastInteraction = ref(null);

const fontSizes = [
  { label: "A", value: "16px" },
  { label: "A", value: "18px" },
  { label: "A", value: "21px" },
  { label: "A", value: "24px" }
];

const tryoutMeta = ref({
  id: route.params.id,
  title: route.query.title || `Simulasi Tryout ${route.params.id}`,
  duration: null,
});

const questions = ref([]);

const currentQuestion = computed(() => questions.value[currentIndex.value] || null);
const currentQuestionNumber = computed(() => currentIndex.value + 1);
const answeredCount = computed(() => questions.value.filter((question) => question.selected.length > 0).length);
const flaggedCount = computed(() => questions.value.filter((question) => question.flagged).length);
const isLastQuestion = computed(() => currentIndex.value === questions.value.length - 1);
const groupedQuestionSections = computed(() => {
  const groups = new Map();

  questions.value.forEach((question, index) => {
    const category = normalizeCategory(question.category);

    if (!groups.has(category)) {
      groups.set(category, {
        category,
        items: [],
      });
    }

    groups.get(category).items.push({
      index,
      question,
    });
  });

  return Array.from(groups.values()).sort(
    (left, right) => getCategoryOrder(left.category) - getCategoryOrder(right.category)
  );
});
const formattedTime = computed(() => {
  const safeSeconds = Math.max(0, Math.floor(Number(remainingSeconds.value) || 0));
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
  showEndConfirm.value = false;
  stopTimer();
  clearTimeout(autosaveTimeout);

  try {
    const response = await startTryout(route.params.id);
    const normalized = normalizeTryoutSession(response.data);

    tryoutMeta.value = {
      id: route.params.id,
      title: normalized.title,
      duration: normalized.duration,
    };
    questions.value = normalized.questions;
    currentIndex.value = normalized.currentIndex;
    remainingSeconds.value = normalized.remainingSeconds;
    lastInteraction.value = normalized.lastInteraction;

    await loadRemainingTime();
    ensureQuestionVisited(currentIndex.value);

    if (normalized.registrationStatus === "completed" || normalized.finishedAt) {
      resultSummary.value = await fetchResultSummary();
      remainingSeconds.value = 0;
      stopTimer();
      return;
    }

    startTimer();
  } catch (error) {
    console.error("Gagal memuat sesi tryout:", error);
    questions.value = [];
    loadError.value = error?.response?.data?.message || error.message || "Soal tryout belum bisa dimuat.";
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

    if (parsedRemainingSeconds !== null && isReasonableRemainingTime(parsedRemainingSeconds)) {
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

function normalizeTryoutSession(payload) {
  const source = payload?.data || payload || {};
  const sessionState = normalizeSessionState(source.session_state ?? source.sessionState ?? {});
  const savedAnswers = source.answers ?? source.saved_answers ?? source.savedAnswers ?? {};
  const questionSource = Array.isArray(source.questions) ? source.questions : [];
  const questionsFromApi = sortQuestionsByCategory(
    questionSource.map((question, index) => normalizeQuestion(question, index, savedAnswers, sessionState)).filter(Boolean)
  );

  if (!questionsFromApi.length) {
    throw new Error("Detail tryout berhasil dimuat, tetapi daftar soal belum ditemukan pada respons API.");
  }

  return {
    title: source.title || route.query.title || `Simulasi Tryout ${route.params.id}`,
    duration: Number(source.duration || 0) || null,
    questions: questionsFromApi,
    currentIndex: resolveCurrentIndex(sessionState, questionsFromApi),
    remainingSeconds: parseRemainingSecondsFromEndTime(source.end_time, source.duration),
    lastInteraction: sessionState.lastInteraction,
    registrationStatus: source.registration_status || source.status || null,
    finishedAt: source.finished_at || null,
  };
}

function normalizeSessionState(value) {
  const source = value && typeof value === "object" ? value : {};

  return {
    currentIndex: Number.isFinite(Number(source.current_index)) ? Math.max(0, Number(source.current_index)) : 0,
    currentQuestionId: source.current_question_id ?? null,
    flaggedQuestionIds: normalizeQuestionIdList(source.flagged_question_ids),
    visitedQuestionIds: normalizeQuestionIdList(source.visited_question_ids),
    lastInteraction: source.last_interaction || null,
  };
}

function normalizeQuestion(question, index, savedAnswers, sessionState) {
  if (!question) {
    return null;
  }

  const optionSource = question.options || question.choices || question.answers || question.pilihan || [];
  const options = Array.isArray(optionSource) ? optionSource.map(normalizeOption).filter(Boolean) : [];

  if (!options.length) {
    return null;
  }

  const questionId = question.id ?? question.question_id ?? index + 1;
  const selectedAnswer = savedAnswers?.[questionId] ?? savedAnswers?.[String(questionId)] ?? question.selected_answers ?? question.selected ?? null;

  return {
    id: questionId,
    text: question.question || question.text || question.body || question.soal,
    category: normalizeCategory(question.category || question.type || null),
    correctAnswer: normalizeCorrectAnswer(question.correct_answer ?? question.correctAnswer ?? null),
    allowMultiple:
      Boolean(question.allow_multiple) ||
      Boolean(question.is_multiple_choice) ||
      Boolean(question.multiple) ||
      Number(question.max_answers || 1) > 1,
    flagged: sessionState.flaggedQuestionIds.includes(Number(questionId)),
    selected: normalizeSelectedAnswers(selectedAnswer),
    visited: sessionState.visitedQuestionIds.includes(Number(questionId)),
    sequence: index,
    options,
  };
}

function normalizeCategory(value) {
  if (!value) {
    return "LAINNYA";
  }

  return String(value).trim().toUpperCase();
}

function getCategoryOrder(category) {
  switch (normalizeCategory(category)) {
    case "TWK":
      return 1;
    case "TIU":
      return 2;
    case "TKP":
      return 3;
    default:
      return 4;
  }
}

function formatCategory(category) {
  return normalizeCategory(category);
}

function sortQuestionsByCategory(questionList) {
  return [...questionList].sort((left, right) => {
    const categoryComparison = getCategoryOrder(left.category) - getCategoryOrder(right.category);

    if (categoryComparison !== 0) {
      return categoryComparison;
    }

    return Number(left.sequence ?? 0) - Number(right.sequence ?? 0);
  });
}

function getCategoryBadgeClass(category) {
  switch (normalizeCategory(category)) {
    case "TWK":
      return "bg-sky-100 text-sky-700";
    case "TIU":
      return "bg-emerald-100 text-emerald-700";
    case "TKP":
      return "bg-amber-100 text-amber-700";
    default:
      return "bg-slate-100 text-slate-600";
  }
}

function getCategoryTextClass(category) {
  switch (normalizeCategory(category)) {
    case "TWK":
      return "text-sky-600";
    case "TIU":
      return "text-emerald-600";
    case "TKP":
      return "text-amber-600";
    default:
      return "text-slate-500";
  }
}

function normalizeOption(option, index) {
  if (!option) {
    return null;
  }

  return {
    id: option.id ?? option.option_id ?? option.key ?? option.value ?? String.fromCharCode(97 + index),
    label: option.label || option.code || option.key?.toUpperCase?.() || String.fromCharCode(65 + index),
    text: option.text || option.answer || option.option_text || option.pilihan,
    score: option.score !== undefined && option.score !== null ? Number(option.score) : null,
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
    return value
      .map((item) =>
        typeof item === "object" && item !== null
          ? String(item.label ?? item.code ?? item.id ?? item.option_id ?? item.value)
          : String(item)
      )
      .map((item) => item.toUpperCase());
  }

  if (value === null || value === undefined || value === "") {
    return [];
  }

  return [String(value).toUpperCase()];
}

function normalizeQuestionIdList(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => Number(item))
    .filter((item) => Number.isFinite(item));
}

function resolveCurrentIndex(sessionState, normalizedQuestions) {
  if (!normalizedQuestions.length) {
    return 0;
  }

  if (sessionState.currentQuestionId !== null && sessionState.currentQuestionId !== undefined) {
    const matchedIndex = normalizedQuestions.findIndex(
      (question) => String(question.id) === String(sessionState.currentQuestionId)
    );

    if (matchedIndex >= 0) {
      return matchedIndex;
    }
  }

  return Math.min(sessionState.currentIndex || 0, normalizedQuestions.length - 1);
}

function decodeIfEscapedHtml(input) {
  const raw = String(input || "");

  // If backend stored HTML as escaped entities (e.g. "&lt;figure&gt;"),
  // v-html would still render it as text. Decode only when it looks escaped.
  if (/&lt;[a-z!/]/i.test(raw) && !/<[a-z!/]/i.test(raw)) {
    try {
      const doc = new DOMParser().parseFromString(raw, "text/html");
      return doc.documentElement.textContent || raw;
    } catch {
      return raw;
    }
  }

  return raw;
}

function sanitizeRichText(html) {
  if (!html) return "";

  const rawHtml = decodeIfEscapedHtml(html);

  // Minimal client-side sanitization for admin-authored content.
  // Removes scripts/iframes and inline event handlers; strips unsafe URLs.
  let doc;
  try {
    doc = new DOMParser().parseFromString(String(rawHtml), "text/html");
  } catch {
    return "";
  }

  doc
    .querySelectorAll("script,style,iframe,object,embed,link,meta")
    .forEach((node) => node.remove());

  const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_ELEMENT);
  let node = walker.currentNode;

  while (node) {
    const el = node;

    Array.from(el.attributes || []).forEach((attr) => {
      const name = attr.name.toLowerCase();
      const value = attr.value || "";

      if (name.startsWith("on")) {
        el.removeAttribute(attr.name);
        return;
      }

      if ((name === "href" || name === "src") && /^\s*javascript:/i.test(value)) {
        el.removeAttribute(attr.name);
        return;
      }

      if (name === "style") {
        if (el.tagName === "IMG") {
          const kept = String(value)
            .split(";")
            .map((part) => part.trim())
            .filter((part) => /^(width|height|aspect-ratio)\s*:/i.test(part))
            .join("; ");

          if (kept) el.setAttribute("style", kept);
          else el.removeAttribute("style");
        } else {
          el.removeAttribute("style");
        }
      }
    });

    node = walker.nextNode();
  }

  return doc.body.innerHTML;
}

function parseRemainingSecondsFromEndTime(endTime, duration) {
  if (endTime) {
    const endTimestamp = new Date(endTime).getTime();

    if (Number.isFinite(endTimestamp)) {
      return Math.max(0, Math.floor((endTimestamp - Date.now()) / 1000));
    }
  }

  const parsedDuration = Number(duration || tryoutMeta.value.duration || 0);
  return Number.isFinite(parsedDuration) && parsedDuration > 0 ? parsedDuration * 60 : 0;
}

function parseRemainingSeconds(rawValue) {
  if (rawValue === null || rawValue === undefined || rawValue === "") {
    return null;
  }

  if (typeof rawValue === "string" && rawValue.includes(":")) {
    const parts = rawValue.split(":").map((part) => Number(part));

    if (parts.every((part) => Number.isFinite(part))) {
      if (parts.length === 3) {
        return Math.max(0, Math.floor(parts[0] * 3600 + parts[1] * 60 + parts[2]));
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

function ensureQuestionVisited(index) {
  if (questions.value[index]) {
    questions.value[index].visited = true;
  }
}

function startTimer() {
  stopTimer();

  if (resultSummary.value) {
    return;
  }

  timerId = window.setInterval(() => {
    if (remainingSeconds.value <= 1) {
      remainingSeconds.value = 0;
      stopTimer();
      finishTryout();
      return;
    }

    remainingSeconds.value -= 1;
  }, 1000);
}

function stopTimer() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
}

function getPaletteClass(index) {
  const question = questions.value[index];

  if (!question) {
    return "border-slate-200 bg-white text-slate-900";
  }

  if (index === currentIndex.value) {
    return "border-blue-500 bg-blue-500 text-white";
  }

  if (question.flagged) {
    return "border-amber-400 bg-amber-400 text-white";
  }

  if (question.selected.length > 0) {
    return "border-emerald-500 bg-emerald-500 text-white";
  }

  if (question.visited) {
    return "border-slate-300 bg-slate-200 text-slate-700";
  }

  return "border-slate-200 bg-white text-slate-900";
}

function goToQuestion(index) {
  currentIndex.value = index;
  ensureQuestionVisited(index);
  scheduleAutosave({ type: "navigate", questionId: questions.value[index]?.id ?? null });
}

function isSelected(optionLabel) {
  return currentQuestion.value?.selected.includes(optionLabel) || false;
}

function toggleAnswer(optionLabel) {
  const question = currentQuestion.value;

  if (!question) {
    return;
  }

  if (question.allowMultiple) {
    question.selected = question.selected.includes(optionLabel)
      ? question.selected.filter((id) => id !== optionLabel)
      : [...question.selected, optionLabel];
  } else {
    question.selected = question.selected.includes(optionLabel) ? [] : [optionLabel];
  }

  scheduleAutosave({ type: "answer", questionId: question.id, optionLabel });
}

function toggleFlag() {
  if (!currentQuestion.value) {
    return;
  }

  currentQuestion.value.flagged = !currentQuestion.value.flagged;
  scheduleAutosave({ type: "flag", questionId: currentQuestion.value.id });
}

function previousQuestion() {
  if (currentIndex.value > 0) {
    currentIndex.value -= 1;
    ensureQuestionVisited(currentIndex.value);
    scheduleAutosave({ type: "navigate", questionId: currentQuestion.value?.id ?? null });
  }
}

function nextQuestion() {
  if (isLastQuestion.value) {
    finishTryout();
    return;
  }

  currentIndex.value += 1;
  ensureQuestionVisited(currentIndex.value);
  scheduleAutosave({ type: "navigate", questionId: currentQuestion.value?.id ?? null });
}

function buildAnswersPayload() {
  return questions.value.reduce((answers, question) => {
    if (!question.selected.length) {
      return answers;
    }

    answers[question.id] = String(question.selected[0]).toUpperCase();
    return answers;
  }, {});
}

function buildSessionStatePayload(interaction = {}) {
  const timestamp = new Date().toISOString();
  const fallbackQuestionId = currentQuestion.value?.id ? Number(currentQuestion.value.id) : null;

  const payload = {
    current_index: currentIndex.value,
    current_question_id: fallbackQuestionId,
    flagged_question_ids: questions.value
      .filter((question) => question.flagged)
      .map((question) => Number(question.id))
      .filter((questionId) => Number.isFinite(questionId)),
    visited_question_ids: questions.value
      .filter((question) => question.visited)
      .map((question) => Number(question.id))
      .filter((questionId) => Number.isFinite(questionId)),
    last_interaction: {
      type: interaction.type || lastInteraction.value?.type || "interaction",
      question_id: Number(interaction.questionId ?? fallbackQuestionId ?? 0) || null,
      option_label: interaction.optionLabel ? String(interaction.optionLabel).toUpperCase() : null,
      at: timestamp,
    },
  };

  lastInteraction.value = payload.last_interaction;
  return payload;
}

function normalizeResultSummary(payload) {
  const source = payload?.data || payload || {};

  return {
    score: source.score ?? null,
    rank: source.rank ?? null,
    correctAnswer: source.correct_answer ?? source.correctAnswer ?? null,
    finishedAt: source.finished_at ?? source.finishedAt ?? null,
    answers: source.answers ?? {},
  };
}

async function fetchResultSummary() {
  const [resultResponse, rankResponse] = await Promise.allSettled([
    getResult(route.params.id),
    getMyRank(route.params.id),
  ]);

  let summary = {
    score: null,
    rank: null,
    correctAnswer: null,
    finishedAt: null,
    answers: {},
  };

  if (resultResponse.status === "fulfilled") {
    summary = normalizeResultSummary(resultResponse.value.data);
  }

  if (rankResponse.status === "fulfilled") {
    summary.rank = rankResponse.value.data?.rank ?? rankResponse.value.data?.data?.rank ?? summary.rank;
  }

  return summary;
}

function goToTryoutList() {
  router.push({ name: "pengerjaantryout", query: { refresh: Date.now() } });
}

function scheduleAutosave(interaction = {}) {
  clearTimeout(autosaveTimeout);

  autosaveTimeout = setTimeout(async () => {
    try {
      await autosaveTryout(route.params.id, buildAnswersPayload(), buildSessionStatePayload(interaction));
    } catch (error) {
      console.error("Autosave tryout gagal:", error);
    }
  }, 350);
}

async function finishTryout() {
  if (isSubmitting.value || resultSummary.value) {
    return;
  }

  showEndConfirm.value = false;
  isSubmitting.value = true;
  clearTimeout(autosaveTimeout);

  try {
    const response = await submitTryout(
      route.params.id,
      buildAnswersPayload(),
      buildSessionStatePayload({ type: "submit", questionId: currentQuestion.value?.id ?? null })
    );

    const normalizedResponse = normalizeResultSummary(response.data);
    resultSummary.value = normalizedResponse.rank !== null ? normalizedResponse : await fetchResultSummary();
    stopTimer();
  } catch (error) {
    console.error("Submit tryout gagal:", error);
    loadError.value = error?.response?.data?.message || "Tryout belum bisa diselesaikan.";
  } finally {
    isSubmitting.value = false;
  }
}

onMounted(() => {
  loadTryoutSession();
});

watch(
  () => route.params.id,
  () => {
    resultSummary.value = null;
    questions.value = [];
    remainingSeconds.value = 0;
    currentIndex.value = 0;
    loadTryoutSession();
  }
);

onBeforeUnmount(() => {
  stopTimer();
  clearTimeout(autosaveTimeout);
});
</script>

<style scoped>
.rich-content :deep(img) {
  height: auto;
  max-width: 100%;
}

.rich-content :deep(figure.image) {
  margin: 0.75rem 0;
  max-width: 100%;
}
</style>
