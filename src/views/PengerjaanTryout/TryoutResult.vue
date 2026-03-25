<template>
  <div class="min-h-full bg-slate-50">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
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
          <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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
              <div class="rounded-xl bg-slate-50 border border-slate-100 px-3 py-2">
                <p class="text-[11px] text-slate-500">Total Skor</p>
                <p class="mt-1 text-xl font-semibold text-slate-900">
                  {{ summary.totalScore }}
                </p>
              </div>
              <div class="rounded-xl bg-slate-50 border border-slate-100 px-3 py-2">
                <p class="text-[11px] text-slate-500">Status</p>
                <p class="mt-1 text-xs font-semibold" :class="summary.passed ? 'text-emerald-600' : 'text-rose-600'">
                  {{ summary.passed ? "Lulus" : "Belum Lulus" }}
                </p>
              </div>
            </div>
          </div>

          <div class="mt-2 grid grid-cols-3 gap-3 text-center text-xs sm:text-sm">
            <div class="rounded-xl bg-slate-50 border border-slate-100 px-3 py-2">
              <p class="text-[11px] text-slate-500">TWK</p>
              <p class="mt-1 text-lg font-semibold text-slate-800">
                {{ summary.twk }}
              </p>
            </div>
            <div class="rounded-xl bg-slate-50 border border-slate-100 px-3 py-2">
              <p class="text-[11px] text-slate-500">TIU</p>
              <p class="mt-1 text-lg font-semibold text-slate-800">
                {{ summary.tiu }}
              </p>
            </div>
            <div class="rounded-xl bg-slate-50 border border-slate-100 px-3 py-2">
              <p class="text-[11px] text-slate-500">TKP</p>
              <p class="mt-1 text-lg font-semibold text-slate-800">
                {{ summary.tkp }}
              </p>
            </div>
          </div>
        </section>

        <section
          class="rounded-2xl bg-white shadow-sm border border-slate-100 px-4 py-3 text-xs sm:text-sm flex flex-wrap items-center gap-3"
        >
          <p class="text-slate-500">Keterangan warna:</p>
          <div class="flex flex-wrap gap-2">
            <span
              class="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-[11px] font-medium text-emerald-700"
            >
              <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
              Jawaban benar
            </span>
            <span
              class="inline-flex items-center gap-1 rounded-full bg-rose-50 border border-rose-200 px-2.5 py-1 text-[11px] font-medium text-rose-700"
            >
              <span class="h-2 w-2 rounded-full bg-rose-500"></span>
              Jawaban salah
            </span>
            <span
              class="inline-flex items-center gap-1 rounded-full bg-slate-50 border border-slate-200 px-2.5 py-1 text-[11px] font-medium text-slate-600"
            >
              <span class="h-2 w-2 rounded-full bg-slate-400"></span>
              Tidak dijawab
            </span>
          </div>
        </section>

        <section class="space-y-3">
          <h2 class="text-sm font-semibold text-slate-700">Detail Soal dan Pembahasan</h2>

          <article
            v-for="(q, index) in questions"
            :key="q.id"
            class="rounded-2xl border shadow-sm px-4 py-4 sm:px-5 sm:py-4 text-xs sm:text-sm"
            :class="questionCardClass(q.status)"
          >
            <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div class="flex flex-wrap items-center gap-2">
                <span class="text-[11px] font-semibold text-slate-500">Soal {{ index + 1 }} • {{ q.category }}</span>
              </div>
              <div class="flex flex-wrap items-center gap-2">
                <span
                  class="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold"
                  :class="statusBadgeClass(q.status)"
                >
                  {{ statusLabel(q.status) }}
                </span>
                <span
                  class="inline-flex items-center rounded-full bg-white/60 px-2.5 py-1 text-[11px] text-slate-700 border border-slate-200"
                >
                  Skor soal:
                  <span class="ml-1 font-semibold">{{ q.score }}</span>
                </span>
              </div>
            </div>

            <p class="mt-3 text-slate-800 whitespace-pre-line">
              {{ q.question }}
            </p>

            <div class="mt-3 space-y-1.5">
              <p class="text-[11px] font-semibold text-slate-600">Pilihan jawaban:</p>
              <ul class="space-y-1">
                <li
                  v-for="opt in q.options"
                  :key="opt.key"
                  class="flex items-start gap-2 rounded-lg px-2 py-1"
                  :class="optionClass(q, opt.key)"
                >
                  <span class="mt-[2px] text-[11px] font-semibold">{{ opt.key }}.</span>
                  <span class="text-xs sm:text-sm">
                    {{ opt.text }}
                  </span>
                </li>
              </ul>
            </div>

            <div class="mt-3 grid gap-2 sm:grid-cols-2">
              <div class="text-[11px] sm:text-xs text-slate-700">
                <p class="font-semibold">Jawaban kamu:</p>
                <p class="mt-0.5">
                  <span v-if="q.userAnswer">
                    {{ q.userAnswer }} -
                    {{ q.options.find((o) => o.key === q.userAnswer)?.text || "" }}
                  </span>
                  <span v-else class="italic text-slate-500">Tidak dijawab</span>
                </p>
              </div>
              <div class="text-[11px] sm:text-xs text-slate-700">
                <p class="font-semibold">Jawaban terbaik:</p>
                <p class="mt-0.5">
                  <span v-if="q.correctAnswer">
                    {{ q.correctAnswer }} -
                    {{ q.options.find((o) => o.key === q.correctAnswer)?.text || "" }}
                  </span>
                  <span v-else class="italic text-slate-500">-</span>
                </p>
              </div>
            </div>

            <div
              v-if="q.explanation"
              class="mt-3 rounded-xl bg-white/60 border border-dashed border-slate-200 px-3 py-2"
            >
              <p class="text-[11px] font-semibold text-slate-700">Pembahasan:</p>
              <p class="mt-1 text-xs text-slate-700 whitespace-pre-line">
                {{ q.explanation }}
              </p>
            </div>
          </article>
        </section>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue"
import { useRoute } from "vue-router"
import { getResult } from "../../services/tryoutService"

const route = useRoute()

const loading = ref(true)
const error = ref("")
const result = ref(null)

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

const questions = computed(() =>
  (result.value?.questions || []).map((question) => ({
    id: question.id,
    category: question.category || "-",
    question: question.question || "-",
    options: Array.isArray(question.options) ? question.options : [],
    correctAnswer: question.correctAnswer || question.correct_answer || null,
    userAnswer: question.userAnswer || question.user_answer || null,
    explanation: question.explanation || "",
    score: Number(question.score || 0),
    status: question.status || "unanswered"
  }))
)

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
  } catch (err) {
    console.error("Gagal mengambil hasil tryout:", err)
    error.value = err?.response?.data?.message || "Hasil tryout belum tersedia."
    result.value = null
  } finally {
    loading.value = false
  }
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

onMounted(loadResult)

watch(
  () => route.params.id,
  () => {
    loadResult()
  }
)
</script>
