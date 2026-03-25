<template>
  <div class="min-h-full bg-slate-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <section
        v-if="loading"
        class="rounded-2xl bg-white shadow-sm border border-slate-100 px-4 py-10 text-center text-sm text-slate-500"
      >
        Memuat hasil tryout...
      </section>

      <section
        v-else-if="error"
        class="rounded-2xl bg-white shadow-sm border border-rose-100 px-4 py-10 text-center space-y-4"
      >
        <p class="text-sm text-rose-600">{{ error }}</p>
        <button
          type="button"
          class="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          @click="loadResult"
        >
          Coba lagi
        </button>
      </section>

      <template v-else>
        <section class="rounded-2xl bg-white shadow-sm border border-slate-100 p-4 sm:p-5 flex flex-col gap-4">
          <div class="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p class="text-xs font-semibold uppercase tracking-wide text-emerald-600">Hasil Try Out SKD</p>
              <h1 class="mt-1 text-xl sm:text-2xl font-semibold text-slate-800">
                {{ summary.tryoutName }}
              </h1>
              <p class="mt-1 text-xs sm:text-sm text-slate-600">
                Dikerjakan pada {{ summary.date }} • {{ summary.questionCount }} soal • Durasi
                {{ summary.duration }} menit
              </p>
            </div>

            <div class="flex flex-wrap gap-3 text-xs sm:text-sm">
              <div class="rounded-xl bg-slate-50 border border-slate-100 px-3 py-2 min-w-[128px]">
                <p class="text-[11px] text-slate-500">Total Skor</p>
                <p class="mt-1 text-xl font-semibold text-slate-900">
                  {{ summary.totalScore }}
                </p>
              </div>
              <div class="rounded-xl bg-slate-50 border border-slate-100 px-3 py-2 min-w-[128px]">
                <p class="text-[11px] text-slate-500">Status</p>
                <p class="mt-1 text-xs font-semibold" :class="summary.passed ? 'text-emerald-600' : 'text-rose-600'">
                  {{ summary.passed ? "Lulus" : "Belum Lulus" }}
                </p>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 gap-3 sm:grid-cols-3 text-center text-xs sm:text-sm">
            <div class="rounded-xl bg-slate-50 border border-slate-100 px-3 py-3">
              <p class="text-[11px] text-slate-500">TWK</p>
              <p class="mt-1 text-lg font-semibold text-slate-800">
                {{ summary.twk }}
              </p>
            </div>
            <div class="rounded-xl bg-slate-50 border border-slate-100 px-3 py-3">
              <p class="text-[11px] text-slate-500">TIU</p>
              <p class="mt-1 text-lg font-semibold text-slate-800">
                {{ summary.tiu }}
              </p>
            </div>
            <div class="rounded-xl bg-slate-50 border border-slate-100 px-3 py-3">
              <p class="text-[11px] text-slate-500">TKP</p>
              <p class="mt-1 text-lg font-semibold text-slate-800">
                {{ summary.tkp }}
              </p>
            </div>
          </div>
        </section>

        <section class="grid grid-cols-1 gap-3 sm:grid-cols-3 xl:grid-cols-4">
          <div class="rounded-2xl border border-emerald-100 bg-white px-4 py-4 shadow-sm">
            <p class="text-[11px] font-semibold uppercase tracking-wide text-emerald-600">Jawaban Benar</p>
            <p class="mt-2 text-2xl font-semibold text-slate-900">{{ answerStats.correct }}</p>
          </div>
          <div class="rounded-2xl border border-rose-100 bg-white px-4 py-4 shadow-sm">
            <p class="text-[11px] font-semibold uppercase tracking-wide text-rose-600">Jawaban Salah</p>
            <p class="mt-2 text-2xl font-semibold text-slate-900">{{ answerStats.wrong }}</p>
          </div>
          <div class="rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
            <p class="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Tidak Dijawab</p>
            <p class="mt-2 text-2xl font-semibold text-slate-900">{{ answerStats.unanswered }}</p>
          </div>
          <div class="rounded-2xl border border-sky-100 bg-white px-4 py-4 shadow-sm">
            <p class="text-[11px] font-semibold uppercase tracking-wide text-sky-600">Total Soal</p>
            <p class="mt-2 text-2xl font-semibold text-slate-900">{{ orderedQuestions.length }}</p>
          </div>
        </section>

        <section class="rounded-2xl bg-white shadow-sm border border-slate-100 p-4 sm:p-5 space-y-4">
          <div class="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 class="text-sm font-semibold text-slate-800">Ringkasan Jawaban</h2>
              <p class="mt-1 text-xs text-slate-500">
                Klik nomor soal untuk langsung menuju pembahasan. Urutan kategori ditampilkan mulai dari TWK, TIU,
                lalu TKP.
              </p>
            </div>

            <div class="flex flex-wrap gap-2 text-[11px]">
              <span
                class="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1 font-medium text-emerald-700"
              >
                <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
                Benar
              </span>
              <span
                class="inline-flex items-center gap-1 rounded-full bg-rose-50 border border-rose-200 px-2.5 py-1 font-medium text-rose-700"
              >
                <span class="h-2 w-2 rounded-full bg-rose-500"></span>
                Salah
              </span>
              <span
                class="inline-flex items-center gap-1 rounded-full bg-slate-50 border border-slate-200 px-2.5 py-1 font-medium text-slate-600"
              >
                <span class="h-2 w-2 rounded-full bg-slate-400"></span>
                Tidak dijawab
              </span>
            </div>
          </div>

          <div class="space-y-4">
            <div
              v-for="section in groupedQuestionSections"
              :key="section.category"
              class="rounded-2xl border border-slate-100 bg-slate-50/70 p-4"
            >
              <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div class="flex items-center gap-3">
                  <span
                    class="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold"
                    :class="getCategoryBadgeClass(section.category)"
                  >
                    {{ section.category }}
                  </span>
                  <p class="text-xs text-slate-500">{{ section.questions.length }} soal</p>
                </div>

                <div class="flex flex-wrap gap-2 text-[11px]">
                  <span class="inline-flex items-center rounded-full bg-white px-2.5 py-1 text-emerald-700 border border-emerald-200">
                    {{ section.stats.correct }} benar
                  </span>
                  <span class="inline-flex items-center rounded-full bg-white px-2.5 py-1 text-rose-700 border border-rose-200">
                    {{ section.stats.wrong }} salah
                  </span>
                  <span class="inline-flex items-center rounded-full bg-white px-2.5 py-1 text-slate-600 border border-slate-200">
                    {{ section.stats.unanswered }} kosong
                  </span>
                </div>
              </div>

              <div class="mt-4 grid grid-cols-5 gap-2 sm:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12">
                <button
                  v-for="question in section.questions"
                  :key="question.id"
                  type="button"
                  class="inline-flex h-10 items-center justify-center rounded-xl border text-sm font-semibold transition"
                  :class="questionButtonClass(question)"
                  @click="scrollToQuestion(question)"
                >
                  {{ question.displayNumber }}
                </button>
              </div>
            </div>
          </div>
        </section>

        <section class="space-y-5">
          <div>
            <h2 class="text-sm font-semibold text-slate-800">Detail Soal dan Pembahasan</h2>
            <p class="mt-1 text-xs text-slate-500">Setiap bagian disusun berdasarkan kategori soal tryout.</p>
          </div>

          <div v-for="section in groupedQuestionSections" :key="`detail-${section.category}`" class="space-y-3">
            <div class="flex items-center gap-3">
              <span
                class="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold"
                :class="getCategoryBadgeClass(section.category)"
              >
                {{ section.category }}
              </span>
              <p class="text-xs text-slate-500">{{ section.questions.length }} soal</p>
            </div>

            <article
              v-for="question in section.questions"
              :id="question.anchorId"
              :key="question.id"
              class="scroll-mt-24 rounded-2xl border shadow-sm px-4 py-4 sm:px-5 sm:py-4 text-xs sm:text-sm transition"
              :class="[questionCardClass(question.status), activeQuestionId === question.id ? 'ring-2 ring-sky-200 border-sky-300' : '']"
            >
              <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div class="flex flex-wrap items-center gap-2">
                  <span class="text-[11px] font-semibold text-slate-500">
                    Soal {{ question.displayNumber }} • {{ question.category }}
                  </span>
                </div>
                <div class="flex flex-wrap items-center gap-2">
                  <span
                    class="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold"
                    :class="statusBadgeClass(question.status)"
                  >
                    {{ statusLabel(question.status) }}
                  </span>
                  <span
                    class="inline-flex items-center rounded-full bg-white/80 px-2.5 py-1 text-[11px] text-slate-700 border border-slate-200"
                  >
                    Skor soal:
                    <span class="ml-1 font-semibold">{{ question.score }}</span>
                  </span>
                </div>
              </div>

              <p class="mt-3 text-slate-800 whitespace-pre-line">
                {{ question.question }}
              </p>

              <div class="mt-3 space-y-1.5">
                <p class="text-[11px] font-semibold text-slate-600">Pilihan jawaban:</p>
                <ul class="space-y-1">
                  <li
                    v-for="option in question.options"
                    :key="option.key"
                    class="flex items-start gap-2 rounded-lg px-2 py-1"
                    :class="optionClass(question, option.key)"
                  >
                    <span class="mt-[2px] text-[11px] font-semibold">{{ option.key }}.</span>
                    <span class="text-xs sm:text-sm">{{ option.text }}</span>
                  </li>
                </ul>
              </div>

              <div class="mt-3 grid gap-2 sm:grid-cols-2">
                <div class="text-[11px] sm:text-xs text-slate-700">
                  <p class="font-semibold">Jawaban kamu:</p>
                  <p class="mt-0.5">
                    <span v-if="question.userAnswer">
                      {{ question.userAnswer }} -
                      {{ question.options.find((option) => option.key === question.userAnswer)?.text || "" }}
                    </span>
                    <span v-else class="italic text-slate-500">Tidak dijawab</span>
                  </p>
                </div>

                <div class="text-[11px] sm:text-xs text-slate-700">
                  <p class="font-semibold">Jawaban benar:</p>
                  <p class="mt-0.5">
                    <span v-if="question.correctAnswer">
                      {{ question.correctAnswer }} -
                      {{ question.options.find((option) => option.key === question.correctAnswer)?.text || "" }}
                    </span>
                    <span v-else class="italic text-slate-500">-</span>
                  </p>
                </div>
              </div>

              <div
                v-if="question.explanation"
                class="mt-3 rounded-xl bg-white/70 border border-dashed border-slate-200 px-3 py-2"
              >
                <p class="text-[11px] font-semibold text-slate-700">Pembahasan:</p>
                <p class="mt-1 text-xs text-slate-700 whitespace-pre-line">
                  {{ question.explanation }}
                </p>
              </div>
            </article>
          </div>
        </section>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, ref, watch } from "vue"
import { useRoute } from "vue-router"
import { getResult } from "../../services/tryoutService"

const route = useRoute()

const CATEGORY_ORDER = {
  TWK: 1,
  TIU: 2,
  TKP: 3
}

const loading = ref(true)
const error = ref("")
const result = ref(null)
const activeQuestionId = ref(null)

const emptySummary = {
  tryoutName: "-",
  date: "-",
  duration: 0,
  questionCount: 0,
  twk: 0,
  tiu: 0,
  tkp: 0,
  totalScore: 0,
  passed: false
}

const summary = computed(() => {
  const source = result.value?.summary || {}
  return {
    tryoutName: source.tryoutName || source.tryout_name || "-",
    date: formatDateTime(source.date),
    duration: Number(source.duration || 0),
    questionCount: Number(source.questionCount || source.question_count || 0),
    twk: Number(source.twk || 0),
    tiu: Number(source.tiu || 0),
    tkp: Number(source.tkp || 0),
    totalScore: Number(source.totalScore || source.total_score || 0),
    passed: Boolean(source.passed)
  }
})

const orderedQuestions = computed(() => {
  const rawQuestions = Array.isArray(result.value?.questions) ? result.value.questions : []

  return rawQuestions
    .map((question) => ({
      id: Number(question.id),
      category: normalizeCategory(question.category),
      question: question.question || "-",
      options: Array.isArray(question.options) ? question.options : [],
      correctAnswer: normalizeAnswer(question.correctAnswer || question.correct_answer || null),
      userAnswer: normalizeAnswer(question.userAnswer || question.user_answer || null),
      explanation: question.explanation || "",
      score: Number(question.score || 0),
      status: normalizeStatus(question.status),
      originalNumber: Number(question.number || 0)
    }))
    .sort((left, right) => {
      const categoryDiff = getCategoryOrder(left.category) - getCategoryOrder(right.category)
      if (categoryDiff !== 0) {
        return categoryDiff
      }

      const numberDiff = (left.originalNumber || 0) - (right.originalNumber || 0)
      if (numberDiff !== 0) {
        return numberDiff
      }

      return left.id - right.id
    })
    .map((question, index) => ({
      ...question,
      displayNumber: index + 1,
      anchorId: `question-${question.id}`
    }))
})

const answerStats = computed(() => {
  return orderedQuestions.value.reduce(
    (stats, question) => {
      stats[question.status] += 1
      return stats
    },
    {
      correct: 0,
      wrong: 0,
      unanswered: 0
    }
  )
})

const groupedQuestionSections = computed(() => {
  const grouped = orderedQuestions.value.reduce((sections, question) => {
    if (!sections[question.category]) {
      sections[question.category] = {
        category: question.category,
        questions: []
      }
    }

    sections[question.category].questions.push(question)
    return sections
  }, {})

  return Object.values(grouped)
    .sort((left, right) => getCategoryOrder(left.category) - getCategoryOrder(right.category))
    .map((section) => ({
      ...section,
      stats: section.questions.reduce(
        (stats, question) => {
          stats[question.status] += 1
          return stats
        },
        {
          correct: 0,
          wrong: 0,
          unanswered: 0
        }
      )
    }))
})

async function loadResult() {
  loading.value = true
  error.value = ""

  try {
    const response = await getResult(route.params.id)
    const source = response.data?.data || response.data || {}

    result.value = {
      summary: {
        ...emptySummary,
        ...(source.summary || {})
      },
      questions: Array.isArray(source.questions) ? source.questions : []
    }

    await nextTick()
    activeQuestionId.value = orderedQuestions.value[0]?.id ?? null
  } catch (err) {
    console.error("Gagal mengambil hasil tryout:", err)
    error.value = err?.response?.data?.message || "Hasil tryout belum tersedia."
    result.value = null
    activeQuestionId.value = null
  } finally {
    loading.value = false
  }
}

function normalizeCategory(category) {
  const normalized = String(category || "").trim().toUpperCase()

  if (CATEGORY_ORDER[normalized]) {
    return normalized
  }

  return normalized || "-"
}

function getCategoryOrder(category) {
  return CATEGORY_ORDER[category] || 99
}

function normalizeAnswer(answer) {
  if (answer === null || answer === undefined || answer === "") {
    return null
  }

  return String(answer).toUpperCase()
}

function normalizeStatus(status) {
  if (status === "correct" || status === "wrong") {
    return status
  }

  return "unanswered"
}

function formatDateTime(value) {
  if (!value) {
    return "-"
  }

  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) {
    return "-"
  }

  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "long",
    timeStyle: "short"
  }).format(parsed)
}

function statusLabel(status) {
  if (status === "correct") return "Benar"
  if (status === "wrong") return "Salah"
  return "Tidak dijawab"
}

function statusBadgeClass(status) {
  if (status === "correct") {
    return "bg-emerald-100 text-emerald-700 border border-emerald-200"
  }
  if (status === "wrong") {
    return "bg-rose-100 text-rose-700 border border-rose-200"
  }
  return "bg-slate-100 text-slate-600 border border-slate-200"
}

function questionCardClass(status) {
  if (status === "correct") {
    return "bg-emerald-50 border-emerald-200"
  }
  if (status === "wrong") {
    return "bg-rose-50 border-rose-200"
  }
  return "bg-slate-50 border-slate-200"
}

function optionClass(question, key) {
  const base = "text-slate-700"

  if (key === question.correctAnswer && key === question.userAnswer) {
    return `${base} bg-emerald-100/60 border border-emerald-300`
  }

  if (key === question.correctAnswer) {
    return `${base} bg-emerald-50/70 border border-emerald-200`
  }

  if (key === question.userAnswer && question.status === "wrong") {
    return `${base} bg-rose-50/70 border border-rose-200`
  }

  return base
}

function questionButtonClass(question) {
  const isActive = activeQuestionId.value === question.id

  if (question.status === "correct") {
    return isActive
      ? "border-emerald-600 bg-emerald-600 text-white shadow-sm"
      : "border-emerald-200 bg-emerald-500 text-white hover:bg-emerald-600"
  }

  if (question.status === "wrong") {
    return isActive
      ? "border-rose-600 bg-rose-600 text-white shadow-sm"
      : "border-rose-200 bg-rose-500 text-white hover:bg-rose-600"
  }

  return isActive
    ? "border-slate-500 bg-slate-500 text-white shadow-sm"
    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
}

function getCategoryBadgeClass(category) {
  switch (category) {
    case "TWK":
      return "bg-sky-100 text-sky-700 border border-sky-200"
    case "TIU":
      return "bg-indigo-100 text-indigo-700 border border-indigo-200"
    case "TKP":
      return "bg-amber-100 text-amber-700 border border-amber-200"
    default:
      return "bg-slate-100 text-slate-700 border border-slate-200"
  }
}

function scrollToQuestion(question) {
  activeQuestionId.value = question.id

  const target = document.getElementById(question.anchorId)
  if (!target) {
    return
  }

  target.scrollIntoView({
    behavior: "smooth",
    block: "start"
  })
}

onMounted(loadResult)

watch(
  () => route.params.id,
  () => {
    loadResult()
  }
)
</script>
