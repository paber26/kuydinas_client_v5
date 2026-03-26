<template>
  <div class="min-h-screen bg-slate-50 py-6 px-4 sm:px-6 lg:px-8">
    <div class="max-w-2xl mx-auto">
      <div v-if="loading" class="text-center py-6">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
        <p class="mt-4 text-slate-700">Memuat detail tryout...</p>
      </div>

      <div v-else class="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
        <div class="bg-white px-6 py-5 border-b border-slate-200">
          <div>
            <h1 class="text-lg font-semibold text-slate-900 leading-tight">{{ tryout?.title }}</h1>
            <p class="mt-1 text-xs text-slate-500">Persiapan pengerjaan tryout</p>

            <div class="mt-3 flex flex-wrap gap-2 text-xs">
              <div
                class="bg-emerald-50 px-3 py-1.5 rounded-lg flex items-center gap-2 text-emerald-800 font-medium border border-emerald-100"
              >
                <span class="text-emerald-700">⏱️</span>
                <span>{{ tryout?.duration }} Menit</span>
              </div>
              <div
                class="bg-emerald-50 px-3 py-1.5 rounded-lg flex items-center gap-2 text-emerald-800 font-medium border border-emerald-100"
              >
                <span class="text-emerald-700">📝</span>
                <span>{{ tryout?.soals?.length || 0 }} Soal</span>
              </div>
            </div>
          </div>
        </div>

        <div class="p-5 space-y-6">
          <section>
            <h2 class="text-lg font-semibold text-slate-700 flex items-center gap-2 mb-3">
              <span class="text-emerald-500">📌</span>
              Panduan Pengerjaan
            </h2>
            <div
              class="bg-white rounded-xl p-4 space-y-3 text-slate-800 text-sm leading-relaxed border border-slate-200 shadow-sm"
            >
              <div class="flex gap-3">
                <span
                  class="flex-shrink-0 w-5 h-5 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-700 font-bold border border-slate-200"
                >
                  1
                </span>
                <p class="leading-relaxed text-slate-800">
                  Pastikan koneksi internet kamu dalam keadaan stabil selama pengerjaan.
                </p>
              </div>
              <div class="flex gap-3">
                <span
                  class="flex-shrink-0 w-5 h-5 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-700 font-bold border border-slate-200"
                >
                  2
                </span>
                <p class="leading-relaxed text-slate-800">
                  Begitu tombol "Mulai Sekarang" ditekan, waktu pengerjaan akan segera berjalan secara otomatis.
                </p>
              </div>
              <div class="flex gap-3">
                <span
                  class="flex-shrink-0 w-5 h-5 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-700 font-bold border border-slate-200"
                >
                  3
                </span>
                <p class="leading-relaxed text-slate-800">
                  Jawaban akan tersimpan otomatis setiap ada interaksi pada sesi tryout.
                </p>
              </div>
              <div class="flex gap-3">
                <span
                  class="flex-shrink-0 w-5 h-5 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-700 font-bold border border-slate-200"
                >
                  4
                </span>
                <p class="leading-relaxed text-slate-800">
                  Selesaikan semua soal sebelum waktu habis. Jika waktu habis, sistem akan menutup pengerjaan secara
                  otomatis.
                </p>
              </div>
              <div class="flex gap-3">
                <span
                  class="flex-shrink-0 w-5 h-5 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-700 font-bold border border-slate-200"
                >
                  5
                </span>
                <p class="leading-relaxed text-slate-800">
                  Dilarang melakukan kecurangan dalam bentuk apapun selama proses tryout berlangsung.
                </p>
              </div>
            </div>
          </section>

          <section class="pt-4 border-t border-slate-100">
            <label
              class="group flex items-center gap-3 p-3 rounded-xl cursor-pointer bg-white hover:bg-emerald-50 transition border border-slate-200 shadow-sm"
            >
              <div class="relative flex items-center">
                <input
                  type="checkbox"
                  v-model="isReady"
                  class="peer h-6 w-6 rounded-lg border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
              </div>
              <div class="flex-1">
                <p class="text-sm font-semibold text-slate-800">Saya memahami panduan dan siap memulai</p>
                <p class="text-xs text-slate-600">
                  Dengan mencentang ini, kamu menyatakan siap untuk mengerjakan tryout.
                </p>
              </div>
            </label>
          </section>

          <p
            v-if="startError"
            class="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-600"
          >
            {{ startError }}
          </p>

          <div class="flex flex-col gap-2">
            <button
              @click="start"
              :disabled="!isReady || isStarting"
              class="w-full py-3 rounded-xl bg-emerald-700 text-white font-semibold text-sm shadow-sm hover:bg-emerald-800 active:scale-[0.98] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ isStarting ? "Menyiapkan sesi..." : "Mulai Sekarang 🚀" }}
            </button>
            <button
              @click="back"
              :disabled="isStarting"
              class="w-full py-2.5 rounded-xl bg-white text-slate-700 text-sm font-medium border border-slate-200 hover:bg-slate-50 transition disabled:opacity-60"
            >
              Kembali
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import api from "../../services/api"
import { startTryout } from "../../services/tryoutService"

const route = useRoute()
const router = useRouter()

const tryoutId = route.params.id
const isReady = ref(false)
const isStarting = ref(false)
const startError = ref("")
const loading = ref(true)
const tryout = ref(null)

const fetchDetail = async () => {
  try {
    const res = await api.get(`/tryouts/${tryoutId}`)
    tryout.value = res.data?.data
  } catch (err) {
    console.error("Gagal mengambil detail tryout", err)
    startError.value = err?.response?.data?.message || "Gagal memuat detail tryout"
    router.push("/pengerjaantryout")
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchDetail()
})

const start = async () => {
  if (!isReady.value || isStarting.value) {
    return
  }

  isStarting.value = true
  startError.value = ""

  try {
    await startTryout(tryoutId)
    router.push({ name: "sesi-tryout", params: { id: tryoutId } })
  } catch (err) {
    console.error("Gagal memulai tryout", err)
    startError.value = err?.response?.data?.message || "Sesi tryout belum bisa dimulai."
  } finally {
    isStarting.value = false
  }
}

const back = () => {
  router.back()
}
</script>
