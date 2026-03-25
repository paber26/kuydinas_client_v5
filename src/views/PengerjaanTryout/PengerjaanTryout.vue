<template>
  <div class="min-h-full bg-slate-50">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <div class="flex-1 text-center text-slate-500 py-10" v-if="loading">Memuat tryout...</div>
      <div class="flex-1" v-else>
        <!-- HEADER + SUMMARY -->
        <section
          class="rounded-2xl bg-white shadow-sm border border-slate-100 p-4 sm:p-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
        >
          <div>
            <p class="text-xs font-semibold uppercase tracking-wide text-emerald-600">Pengerjaan Try Out SKD</p>
            <h1 class="mt-1 text-xl sm:text-2xl font-semibold text-slate-800">Daftar Try Out Aktif Kamu</h1>
            <p class="mt-2 text-xs sm:text-sm text-slate-600 max-w-xl">
              Lanjutkan tryout yang sedang berjalan, ulangi paket yang nilainya masih kurang, dan pantau progres
              latihanmu di Kuy Dinas.
            </p>
          </div>

          <div class="grid grid-cols-3 gap-2 sm:gap-3 text-xs sm:text-sm">
            <div class="rounded-xl bg-slate-50 border border-slate-100 px-3 py-2">
              <p class="text-[11px] text-slate-500">Tryout aktif</p>
              <p class="mt-1 text-lg font-semibold text-slate-800">
                {{ stats.active }}
              </p>
            </div>
            <div class="rounded-xl bg-slate-50 border border-slate-100 px-3 py-2">
              <p class="text-[11px] text-slate-500">Tryout selesai</p>
              <p class="mt-1 text-lg font-semibold text-slate-800">
                {{ stats.completed }}
              </p>
            </div>
            <div class="rounded-xl bg-slate-50 border border-slate-100 px-3 py-2">
              <p class="text-[11px] text-slate-500">Rata-rata nilai</p>
              <p class="mt-1 text-lg font-semibold text-slate-800">
                {{ stats.avgScore }}
              </p>
            </div>
          </div>
        </section>

        <!-- REKOMENDASI BERIKUTNYA -->
        <section
          v-if="nextSuggestion"
          class="rounded-2xl bg-emerald-50 border border-emerald-100 px-4 py-3 sm:px-5 sm:py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p class="text-xs font-semibold text-emerald-700">Rekomendasi langkah berikutnya</p>
            <p class="mt-1 text-sm font-semibold text-slate-800">
              {{ nextSuggestion.name }}
            </p>
            <p class="mt-1 text-xs text-slate-600">
              {{ nextSuggestion.reason }}
            </p>
          </div>
          <div class="flex flex-col items-start sm:items-end gap-2 text-xs">
            <p class="text-slate-500">
              Durasi {{ nextSuggestion.duration }} menit • {{ nextSuggestion.questionCount }} soal
            </p>
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-full bg-emerald-500 px-4 py-1.5 text-xs font-semibold text-white hover:bg-emerald-600"
              @click="handleContinue(nextSuggestion)"
            >
              🚀 Lanjutkan / Mulai Tryout
            </button>
          </div>
        </section>

        <!-- LIST TRYOUT -->
        <section class="space-y-3">
          <h2 class="text-sm font-semibold text-slate-700">
            Daftar Try Out Aktif
            <span class="text-xs font-normal text-slate-500">• {{ activeTryouts.length }} paket</span>
          </h2>

          <div v-if="activeTryouts.length" class="space-y-3">
            <article
              v-for="(item, index) in activeTryouts"
              :key="item.id"
              class="rounded-2xl border bg-white shadow-sm px-4 py-4 sm:px-5 sm:py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <!-- LEFT: INFO -->
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 text-[11px] text-slate-400 mb-1">
                  <span>#{{ index + 1 }}</span>
                  <span>•</span>
                  <span>{{ item.lastTaken }}</span>
                </div>
                <h3 class="text-sm sm:text-base font-semibold text-slate-900 truncate">
                  {{ item.name }}
                </h3>
                <p class="mt-1 text-xs text-slate-500">
                  Durasi {{ item.duration }} menit • {{ item.questionCount }} soal
                </p>

                <!-- PROGRESS -->
                <div class="mt-3">
                  <div class="flex justify-between text-[11px] text-slate-500 mb-1">
                    <span>Progres pengerjaan</span>
                    <span>{{ item.progress }}%</span>
                  </div>
                  <div class="h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
                    <div
                      class="h-full rounded-full"
                      :class="item.status === 'completed' ? 'bg-emerald-500' : 'bg-amber-400'"
                      :style="{ width: item.progress + '%' }"
                    ></div>
                  </div>
                </div>
              </div>

              <!-- RIGHT: STATUS + ACTION -->
              <div class="flex flex-col items-start sm:items-end gap-2 text-xs sm:text-sm">
                <div class="flex flex-wrap gap-2 justify-end w-full">
                  <span
                    class="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold"
                    :class="statusBadgeClass(item.status)"
                  >
                    {{ statusLabel(item.status) }}
                  </span>
                  <span
                    v-if="item.bestScore"
                    class="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-[11px] text-slate-700"
                  >
                    Nilai terbaik:
                    <span class="ml-1 font-semibold">{{ item.bestScore }}</span>
                  </span>
                </div>

                <div class="flex flex-wrap gap-2 justify-end w-full">
                  <button
                    type="button"
                    class="inline-flex items-center justify-center rounded-xl px-3 py-1.5 font-semibold shadow-sm transition"
                    :class="
                      item.status === 'completed'
                        ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                        : isInProgressStatus(item.status)
                          ? 'bg-amber-400 text-slate-900 hover:bg-amber-500'
                          : 'bg-sky-500 text-white hover:bg-sky-600'
                    "
                    @click="handleContinue(item)"
                  >
                    {{
                      item.status === "completed"
                        ? "Kerjakan Ulang"
                        : isInProgressStatus(item.status)
                          ? "Lanjutkan Tryout"
                          : "Mulai Tryout"
                    }}
                  </button>
                  <router-link
                    v-if="item.status === 'completed'"
                    :to="{ name: 'hasil-tryout', params: { id: item.id } }"
                    class="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-1.5 font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Tampilkan Hasil
                  </router-link>
                  <button
                    type="button"
                    class="inline-flex items-center justify-center rounded-xl bg-red-500 text-white px-3 py-1.5 font-semibold hover:bg-red-600"
                    @click="openEndConfirm(item)"
                    v-if="item.status !== 'completed'"
                  >
                    Akhiri Tryout
                  </button>
                </div>
              </div>
            </article>
          </div>

          <div
            v-else
            class="rounded-2xl border border-dashed border-slate-200 bg-white px-4 py-10 text-center text-sm text-slate-500"
          >
            Belum ada tryout aktif saat ini. Coba pilih paket di menu
            <span class="font-semibold">Promo Try Out</span>
            untuk mulai latihan.
          </div>
        </section>

        <!-- End Confirmation Modal -->
        <div v-if="showEndConfirm" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div class="bg-white rounded-lg shadow-lg max-w-sm w-full p-4">
            <h3 class="text-lg font-semibold mb-2">Konfirmasi Akhiri Tryout</h3>
            <p class="mb-4">
              Apakah Anda yakin ingin mengakhiri tryout "{{ selectedTryout?.name }}"? Proses ini tidak dapat dibatalkan.
            </p>
            <div class="flex justify-end space-x-2">
              <button @click="cancelEnd" class="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">
                Batal
              </button>
              <button @click="confirmEnd" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                Akhiri
              </button>
            </div>
          </div>
        </div>

        <!-- CTA LAINNYA -->
        <section
          class="rounded-2xl bg-white border border-slate-100 px-4 py-4 sm:px-5 sm:py-5 text-center sm:text-left flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
        >
          <div>
            <h3 class="text-sm font-semibold text-slate-800">Mau tambah latihan?</h3>
            <p class="mt-1 text-xs sm:text-sm text-slate-600">
              Ikuti tryout lain untuk memperbanyak jam terbang dan tingkatkan peluang lulus SKD.
            </p>
          </div>
          <router-link
            to="/promotryout"
            class="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-emerald-600"
          >
            Lihat Promo Try Out Lainnya
          </router-link>
        </section>
      </div>
    </div>

    <!-- SUCCESS PROMO MODAL -->
    <div v-if="showSuccessPopup" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4">
      <div class="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl text-center">
        <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 mb-4">
          <svg class="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 class="text-xl font-bold text-slate-900">Pendaftaran Berhasil</h2>
        <p class="mt-2 text-sm text-slate-500">
          Berhasil mengirim bukti persyaratan ikut tryout dan sudah bisa ikut tryout.
        </p>
        <button
          @click="closeSuccessPopup"
          class="mt-6 w-full rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition"
        >
          Tutup
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue"
import { useRouter, useRoute } from "vue-router"
import api from "../../services/api"
import { TRYOUT_ENDPOINTS } from "../../services/endpoints"

const router = useRouter()
const route = useRoute()

const loading = ref(true)
const tryouts = ref([])
const showSuccessPopup = ref(false)

const showEndConfirm = ref(false)
const selectedTryout = ref(null)

const closeSuccessPopup = () => {
  showSuccessPopup.value = false
  const query = { ...route.query }
  delete query.success
  router.replace({ query })
}

const loadUserTryouts = async () => {
  try {
    const res = await api.get(TRYOUT_ENDPOINTS.history)
    tryouts.value = res.data?.data || []
  } catch (err) {
    console.error("Gagal mengambil tryout user:", err)
  } finally {
    loading.value = false
  }
}

const isInProgressStatus = (status) => ["started", "in_progress", "ongoing"].includes(status)

const handleContinue = (item) => {
  if (isInProgressStatus(item.status)) {
    router.push({ name: "sesi-tryout", params: { id: item.id } })
  } else {
    router.push({ name: "tryout-persiapan", params: { id: item.id } })
  }
}

const openEndConfirm = (item) => {
  selectedTryout.value = item
  showEndConfirm.value = true
}

const cancelEnd = () => {
  showEndConfirm.value = false
  selectedTryout.value = null
}

const confirmEnd = async () => {
  // TODO: call API to end tryout
  // For now just close modal and refresh list
  showEndConfirm.value = false
  selectedTryout.value = null
  // you may want to emit an event or reload data
}

onMounted(() => {
  loadUserTryouts()
  if (route.query.success === "promo_submitted") {
    showSuccessPopup.value = true
  }
})

watch(
  () => route.query.refresh,
  () => {
    loadUserTryouts()
  }
)

/* =========================================
   COMPUTED PROPERTIES UNTUK TAMPILAN BARU 
   ========================================= */

const activeTryouts = computed(() => {
  return tryouts.value.map((t) => {
    const status = t.status || "not_started"
    const title = t.title || t.tryout?.title || `Tryout #${t.id}`
    let progress = t.progress || 0

    // Auto 100% jika selesai
    if (status === "completed") {
      progress = 100
    } else if (status === "not_started") {
      progress = 0
    }

    return {
      id: t.tryout_id || t.id,
      name: title,
      duration: t.tryout?.duration || t.duration || 100,
      questionCount: t.tryout?.questionCount || t.questionCount || 110,
      status: status,
      progress: progress,
      bestScore: t.score || null,
      lastTakenRaw: t.finished_at,
      lastTaken: t.finished_at
        ? `Selesai: ${new Date(t.finished_at).toLocaleString("id-ID")}`
        : isInProgressStatus(status)
          ? "Sedang dikerjakan"
          : "Belum dikerjakan"
    }
  })
})

const stats = computed(() => {
  const total = activeTryouts.value.length
  const completed = activeTryouts.value.filter((t) => t.status === "completed").length
  const sumScore = activeTryouts.value.filter((t) => t.bestScore).reduce((acc, t) => acc + Number(t.bestScore), 0)
  const countScore = activeTryouts.value.filter((t) => t.bestScore).length
  const avgScore = countScore ? Math.round(sumScore / countScore) : "-"
  return {
    active: total,
    completed,
    avgScore
  }
})

const nextSuggestion = computed(() => {
  if (!activeTryouts.value.length) return null

  const inProgress = activeTryouts.value.find((t) => isInProgressStatus(t.status))
  if (inProgress) {
    return {
      ...inProgress,
      reason: "Selesaikan dulu tryout yang sedang kamu kerjakan agar bisa melihat analisis nilai lengkap."
    }
  }

  const lowestScoreList = [...activeTryouts.value]
    .filter((t) => t.status === "completed" && t.bestScore !== null)
    .sort((a, b) => (Number(a.bestScore) || 9999) - (Number(b.bestScore) || 9999))

  if (lowestScoreList.length > 0) {
    return {
      ...lowestScoreList[0],
      reason:
        "Coba kerjakan ulang paket dengan nilai terendah untuk memperbaiki skor dan memperkuat materi yang masih lemah."
    }
  }

  // Kalau belum ada yang dikerjakan
  const notStarted = activeTryouts.value.find((t) => t.status !== "completed")
  if (notStarted) {
    return {
      ...notStarted,
      reason: "Kamu punya tryout yang belum dikerjakan, yuk mulai latihan sekarang!"
    }
  }

  return null
})

const statusLabel = (status) => {
  if (isInProgressStatus(status)) return "Sedang dikerjakan"
  if (status === "completed") return "Selesai"
  return "Belum mulai"
}

const statusBadgeClass = (status) => {
  if (isInProgressStatus(status)) {
    return "bg-amber-100 text-amber-700"
  }
  if (status === "completed") {
    return "bg-emerald-100 text-emerald-700"
  }
  return "bg-slate-100 text-slate-600"
}
</script>
