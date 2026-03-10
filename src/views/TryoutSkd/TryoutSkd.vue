<template>
  <div class="p-6 space-y-8">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-slate-800">Tryout Saya</h1>
        <p class="text-sm text-slate-500">
          Daftar tryout yang sudah kamu tambahkan dan siap untuk dikerjakan.
        </p>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-16 text-slate-500">
      Memuat tryout...
    </div>

    <!-- Empty state -->
    <div
      v-else-if="tryouts.length === 0"
      class="bg-white border border-slate-100 rounded-xl shadow-sm p-12 text-center"
    >
      <p class="text-slate-500 text-sm">Kamu belum menambahkan tryout.</p>
    </div>

    <!-- Tryout grid -->
    <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="tryout in tryouts"
        :key="tryout.id"
        class="bg-white border border-slate-100 rounded-xl shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition"
      >
        <!-- Top -->
        <div class="space-y-2">
          <h2 class="text-lg font-semibold text-slate-800">
            {{ tryout.title }}
          </h2>

          <p class="text-sm text-slate-500">
            ⏱ Durasi: {{ tryout.duration }} menit
          </p>
        </div>

        <!-- Info -->
        <div class="mt-4 text-xs text-slate-500 space-y-1">
          <p>📚 Tryout latihan SKD</p>
          <p>🎯 Fokus TWK • TIU • TKP</p>
        </div>

        <!-- Button -->
        <button
          @click="startTryout(tryout.id)"
          class="mt-6 w-full bg-emerald-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-emerald-700 transition flex items-center justify-center gap-2"
        >
          ▶ Mulai Tryout
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import api from "../../services/api";

const router = useRouter();

const loading = ref(true);
const tryouts = ref([]);

const loadUserTryouts = async () => {
  try {
    // endpoint yang mengembalikan tryout yang sudah ditambahkan user
    const res = await api.get("/history");
    tryouts.value = res.data.data || [];
  } catch (err) {
    console.error("Gagal mengambil tryout user:", err);
  } finally {
    loading.value = false;
  }
};

const startTryout = (id) => {
  router.push(`/pengerjaantryout/${id}`);
};

onMounted(() => {
  loadUserTryouts();
});
</script>
