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
          <div>
            <p
              class="text-xs font-semibold uppercase tracking-wide text-emerald-600"
            >
              Hasil Try Out SKD
            </p>
            <h1 class="mt-1 text-xl sm:text-2xl font-semibold text-slate-800">
              {{ summary.tryoutName }}
            </h1>
            <p class="mt-1 text-xs sm:text-sm text-slate-600">
              Dikerjakan pada {{ summary.date }} •
              {{ summary.questionCount }} soal • Durasi
              {{ summary.duration }} menit
            </p>
          </div>

          <div class="flex flex-wrap gap-3 text-xs sm:text-sm">
            <div
              class="rounded-xl bg-slate-50 border border-slate-100 px-3 py-2"
            >
              <p class="text-[11px] text-slate-500">Total Skor</p>
              <p class="mt-1 text-xl font-semibold text-slate-900">
                {{ summary.totalScore }}
              </p>
            </div>
            <div
              class="rounded-xl bg-slate-50 border border-slate-100 px-3 py-2"
            >
              <p class="text-[11px] text-slate-500">Status</p>
              <p
                class="mt-1 text-xs font-semibold"
                :class="summary.passed ? 'text-emerald-600' : 'text-rose-600'"
              >
                {{ summary.passed ? "Lulus" : "Belum Lulus" }}
              </p>
            </div>
          </div>
        </div>

        <!-- SCORE TABLE -->
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

      <!-- LEGEND -->
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

      <!-- LIST PERTANYAAN -->
      <section class="space-y-3">
        <h2 class="text-sm font-semibold text-slate-700">
          Detail Soal dan Pembahasan
        </h2>

        <article
          v-for="(q, index) in questions"
          :key="q.id"
          class="rounded-2xl border shadow-sm px-4 py-4 sm:px-5 sm:py-4 text-xs sm:text-sm"
          :class="questionCardClass(q.status)"
        >
          <!-- HEADER BAR -->
          <div
            class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
          >
            <div class="flex flex-wrap items-center gap-2">
              <span class="text-[11px] font-semibold text-slate-500">
                Soal {{ index + 1 }} • {{ q.category }}
              </span>
            </div>
            <div class="flex flex-wrap items-center gap-2">
              <span
                class="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold"
                :class="statusBadgeClass(q.status)"
              >
                {{ statusLabel(q.status) }}
              </span>
              <span
                v-if="q.score !== undefined"
                class="inline-flex items-center rounded-full bg-white/60 px-2.5 py-1 text-[11px] text-slate-700 border border-slate-200"
              >
                Skor soal:
                <span class="ml-1 font-semibold">{{ q.score }}</span>
              </span>
            </div>
          </div>

          <!-- QUESTION TEXT -->
          <p class="mt-3 text-slate-800 whitespace-pre-line">
            {{ q.question }}
          </p>

          <!-- ANSWERS -->
          <div class="mt-3 space-y-1.5">
            <p class="text-[11px] font-semibold text-slate-600">
              Pilihan jawaban:
            </p>
            <ul class="space-y-1">
              <li
                v-for="opt in q.options"
                :key="opt.key"
                class="flex items-start gap-2 rounded-lg px-2 py-1"
                :class="optionClass(q, opt.key)"
              >
                <span class="mt-[2px] text-[11px] font-semibold"
                  >{{ opt.key }}.</span
                >
                <span class="text-xs sm:text-sm">
                  {{ opt.text }}
                </span>
              </li>
            </ul>
          </div>

          <!-- USER / CORRECT ANSWER SUMMARY -->
          <div class="mt-3 grid gap-2 sm:grid-cols-2">
            <div class="text-[11px] sm:text-xs text-slate-700">
              <p class="font-semibold">Jawaban kamu:</p>
              <p class="mt-0.5">
                <span v-if="q.userAnswer">
                  {{ q.userAnswer }} -
                  {{
                    q.options.find((o) => o.key === q.userAnswer)?.text || ""
                  }}
                </span>
                <span v-else class="italic text-slate-500">
                  Tidak dijawab
                </span>
              </p>
            </div>
            <div class="text-[11px] sm:text-xs text-slate-700">
              <p class="font-semibold">Jawaban yang benar:</p>
              <p class="mt-0.5">
                {{ q.correctAnswer }} -
                {{
                  q.options.find((o) => o.key === q.correctAnswer)?.text || ""
                }}
              </p>
            </div>
          </div>

          <!-- EXPLANATION -->
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
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

// TODO: ganti dengan data asli dari API / props
const summary = {
  tryoutName: "Tryout SKD CPNS 2025 Paket 2",
  date: "24 November 2025",
  duration: 100,
  questionCount: 110,
  twk: 120,
  tiu: 140,
  tkp: 310,
  totalScore: 570,
  passed: true,
};

const rawQuestions = [
  {
    id: 1,
    category: "TWK",
    question:
      "Pancasila sebagai dasar negara memiliki kedudukan tertinggi dalam tata hukum Indonesia. Pernyataan yang tepat mengenai hal tersebut adalah ....",
    options: [
      {
        key: "A",
        text: "Pancasila merupakan sumber dari segala sumber hukum negara Indonesia.",
      },
      {
        key: "B",
        text: "Pancasila hanya berlaku bagi lembaga negara.",
      },
      { key: "C", text: "Pancasila sama kedudukannya dengan UUD 1945." },
      {
        key: "D",
        text: "Pancasila hanya menjadi pedoman dalam penyelenggaraan pemerintahan pusat.",
      },
      {
        key: "E",
        text: "Pancasila hanya berlaku dalam kehidupan berbangsa, tidak dalam kehidupan bernegara.",
      },
    ],
    correctAnswer: "A",
    userAnswer: "A",
    explanation:
      "Pancasila disebut sebagai sumber dari segala sumber hukum karena seluruh peraturan perundang-undangan di Indonesia tidak boleh bertentangan dengan nilai-nilai Pancasila.",
    score: 5,
  },
  {
    id: 2,
    category: "TIU",
    question:
      "Seorang pegawai mampu menyelesaikan sebuah laporan dalam waktu 6 jam. Jika dibantu seorang rekan dengan kemampuan yang sama, waktu yang dibutuhkan untuk menyelesaikan laporan tersebut adalah ....",
    options: [
      { key: "A", text: "1 jam" },
      { key: "B", text: "2 jam" },
      { key: "C", text: "3 jam" },
      { key: "D", text: "4 jam" },
      { key: "E", text: "5 jam" },
    ],
    correctAnswer: "C",
    userAnswer: "D",
    explanation:
      "Satu orang menyelesaikan pekerjaan dalam 6 jam, sehingga dalam 1 jam menyelesaikan 1/6 pekerjaan. Dua orang dengan kemampuan sama menyelesaikan 2/6 = 1/3 pekerjaan per jam. Jadi seluruh pekerjaan selesai dalam 3 jam.",
    score: 5,
  },
  {
    id: 3,
    category: "TKP",
    question:
      "Anda baru saja diterima bekerja di sebuah instansi pemerintah. Pada minggu pertama, Anda melihat rekan kerja yang datang terlambat hampir setiap hari. Tindakan Anda adalah ....",
    options: [
      {
        key: "A",
        text: "Membiarkan saja karena merasa masih baru dan belum mengenal budaya kerja di kantor.",
      },
      {
        key: "B",
        text: "Menegur rekan tersebut dengan keras agar menjadi contoh bagi pegawai lain.",
      },
      {
        key: "C",
        text: "Mencari tahu terlebih dahulu aturan terkait jam kerja dan budaya disiplin di kantor.",
      },
      {
        key: "D",
        text: "Langsung melaporkan kepada atasan karena perilaku tersebut melanggar aturan.",
      },
      {
        key: "E",
        text: "Menceritakan kebiasaan terlambat tersebut kepada rekan kerja lain untuk meminta pendapat.",
      },
    ],
    correctAnswer: "C",
    userAnswer: null,
    explanation:
      "Langkah terbaik adalah memahami terlebih dahulu aturan dan budaya kerja sebelum mengambil tindakan. Setelah memahami aturan, Anda dapat menentukan langkah yang tepat secara profesional.",
    score: 4,
  },
];

const questions = computed(() =>
  rawQuestions.map((q) => {
    let status = "unanswered";
    if (q.userAnswer) {
      status = q.userAnswer === q.correctAnswer ? "correct" : "wrong";
    }
    return { ...q, status };
  })
);

const statusLabel = (status) => {
  if (status === "correct") return "Benar";
  if (status === "wrong") return "Salah";
  return "Tidak dijawab";
};

const statusBadgeClass = (status) => {
  if (status === "correct") {
    return "bg-emerald-100 text-emerald-700 border border-emerald-200";
  }
  if (status === "wrong") {
    return "bg-rose-100 text-rose-700 border border-rose-200";
  }
  return "bg-slate-100 text-slate-600 border border-slate-200";
};

const questionCardClass = (status) => {
  if (status === "correct") {
    return "bg-emerald-50 border-emerald-200";
  }
  if (status === "wrong") {
    return "bg-rose-50 border-rose-200";
  }
  return "bg-slate-50 border-slate-200";
};

const optionClass = (q, key) => {
  const base = "text-slate-700";
  if (key === q.correctAnswer && key === q.userAnswer) {
    // dipilih dan benar
    return `${base} bg-emerald-100/60 border border-emerald-300`;
  }
  if (key === q.correctAnswer) {
    // kunci jawaban
    return `${base} bg-emerald-50/70 border border-emerald-200`;
  }
  if (key === q.userAnswer && q.status === "wrong") {
    // jawaban user yang salah
    return `${base} bg-rose-50/70 border border-rose-200`;
  }
  return `${base}`;
};
</script>
