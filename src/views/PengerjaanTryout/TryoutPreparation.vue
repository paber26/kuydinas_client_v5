<template>
  <div class="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">
      <div v-if="loading" class="text-center py-10">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
        <p class="mt-4 text-slate-800">Memuat detail tryout...</p>
      </div>

      <div v-else class="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        <!-- Header -->
        <div class="bg-gradient-to-r from-emerald-500 to-teal-600 px-8 py-10 text-white">
          <h1 class="text-3xl font-bold text-slate-800">{{ tryout?.title }}</h1>
          <p class="mt-2 text-slate-800">Persiapan pengerjaan tryout</p>
          
          <div class="mt-6 flex flex-wrap gap-4 text-sm">
            <div class="bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2 text-slate-800">
              <span>⏱️</span>
              <span>{{ tryout?.duration }} Menit</span>
            </div>
            <div class="bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2 text-slate-800">
              <span>📝</span>
              <span>{{ tryout?.soals?.length || 0 }} Soal</span>
            </div>
          </div>
        </div>

        <!-- content -->
        <div class="p-8 space-y-8">
          <section>
            <h2 class="text-xl font-bold text-slate-800 flex items-center gap-2 mb-4">
              <span class="text-emerald-500">📌</span> Panduan Pengerjaan
            </h2>
            <div class="bg-slate-50 rounded-2xl p-6 space-y-4 text-slate-800 text-sm leading-relaxed border border-slate-100">
              <div class="flex gap-3">
                <span class="flex-shrink-0 w-6 h-6 bg-white rounded-full flex items-center justify-center text-emerald-600 font-bold border border-slate-200">1</span>
                <p>Pastikan koneksi internet kamu dalam keadaan stabil selama pengerjaan.</p>
              </div>
              <div class="flex gap-3">
                <span class="flex-shrink-0 w-6 h-6 bg-white rounded-full flex items-center justify-center text-emerald-600 font-bold border border-slate-200">2</span>
                <p>Begitu tombol "Mulai Sekarang" ditekan, waktu pengerjaan akan segera berjalan secara otomatis.</p>
              </div>
              <div class="flex gap-3">
                <span class="flex-shrink-0 w-6 h-6 bg-white rounded-full flex items-center justify-center text-emerald-600 font-bold border border-slate-200">3</span>
                <p>Jawaban akan tersimpan secara otomatis setiap kali kamu memilih opsi jawaban.</p>
              </div>
              <div class="flex gap-3">
                <span class="flex-shrink-0 w-6 h-6 bg-white rounded-full flex items-center justify-center text-emerald-600 font-bold border border-slate-200">4</span>
                <p>Selesaikan semua soal sebelum waktu habis. Jika waktu habis, sistem akan menutup pengerjaan secara otomatis.</p>
              </div>
              <div class="flex gap-3">
                <span class="flex-shrink-0 w-6 h-6 bg-white rounded-full flex items-center justify-center text-emerald-600 font-bold border border-slate-200">5</span>
                <p>Dilarang melakukan kecurangan dalam bentuk apapun selama proses tryout berlangsung.</p>
              </div>
            </div>
          </section>

          <section class="pt-4 border-t border-slate-100">
            <label class="group flex items-center gap-4 p-4 rounded-2xl cursor-pointer hover:bg-emerald-50 transition border border-transparent hover:border-emerald-100">
              <div class="relative flex items-center">
                <input 
                  type="checkbox" 
                  v-model="isReady"
                  class="peer h-6 w-6 rounded-lg border-slate-300 text-emerald-600 focus:ring-emerald-500"
                >
              </div>
              <div class="flex-1">
                <p class="text-base font-semibold text-slate-800">Saya memahami panduan dan siap memulai</p>
                <p class="text-sm text-slate-700">Dengan mencentang ini, kamu menyatakan siap untuk mengerjakan tryout.</p>
              </div>
            </label>
          </section>

          <div class="flex flex-col gap-3">
            <button
              @click="start"
              :disabled="!isReady"
              class="w-full py-4 rounded-2xl bg-emerald-600 text-white font-bold text-lg shadow-lg shadow-emerald-300 hover:bg-emerald-700 active:scale-[0.98] transition disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:active:scale-100"
            >
              Mulai Sekarang 🚀
            </button>
            <button
              @click="back"
              class="w-full py-3 rounded-2xl bg-white text-slate-600 font-semibold border border-slate-200 hover:bg-slate-50 transition"
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
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "../../services/api";

const route = useRoute();
const router = useRouter();

const tryoutId = route.params.id;
const isReady = ref(false);
const loading = ref(true);
const tryout = ref(null);

const fetchDetail = async () => {
  try {
    const res = await api.get(`/tryouts/${tryoutId}`);
    tryout.value = res.data?.data;
  } catch (err) {
    console.error("Gagal mengambil detail tryout", err);
    alert("Gagal memuat detail tryout");
    router.push("/pengerjaantryout");
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchDetail();
});

const start = () => {
  if (isReady.value) {
    router.push({ name: "sesi-tryout", params: { id: tryoutId } });
  }
};

const back = () => {
  router.back();
};
</script>
