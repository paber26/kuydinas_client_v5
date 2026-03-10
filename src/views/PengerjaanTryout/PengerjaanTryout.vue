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
        </div>

        <button
          @click="goToTryout(tryout.id)"
          class="mt-4 w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700"
        >
          Lanjutkan Tryout
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
  // buka halaman pengerjaan tryout (tanpa sidebar & navbar)
  router.push(`/pengerjaantryout/${id}`);
};

onMounted(() => {
  loadUserTryouts();
});
</script>
