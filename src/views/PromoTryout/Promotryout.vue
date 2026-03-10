<template>
  <div class="min-h-full bg-slate-50">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <!-- HEADER + SUMMARY -->
      <PromoHeader :summary="summary" :coins="coins" />

      <!-- INFO BANNER -->
      <PromoBanner />

      <!-- FILTERS -->
      <PromoFilters :filters="filters" v-model="selectedFilter" />

      <!-- GRID PAKET -->
      <PromoGrid
        title="SKD CPNS"
        :packages="filteredPackages"
        @select="handleSelect"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import api from "../../services/api";

import PromoHeader from "../../components/PromoTryout/PromoHeader.vue";
import PromoBanner from "../../components/PromoTryout/PromoBanner.vue";
import PromoFilters from "../../components/PromoTryout/PromoFilters.vue";
import PromoGrid from "../../components/PromoTryout/PromoGrid.vue";

const coins = 49500;

const tryoutPackages = ref([]);

const fetchTryouts = async () => {
  try {
    const res = await api.get("/tryouts");

    // pastikan data berupa array (beberapa backend mengembalikan {data: [...]})
    const list = Array.isArray(res.data)
      ? res.data
      : Array.isArray(res.data.data)
        ? res.data.data
        : [];

    console.log(res.data);

    tryoutPackages.value = list.map((t) => ({
      id: t.id,
      title: t.title,
      subtitle: t.description || "Simulasi tryout terbaru",
      category: t.category || "SKD",
      price: t.price || 0,
      isFree: t.type === "free",
      duration: t.duration || 100,
      questionCount: t.questionCount,
      level: t.level || "Menengah",
      seatsLeft: t.quota || 999,
      discount: t.discount || null,
      highlight: false,
      tag: t.tag,
    }));
    console.log(tryoutPackages);
  } catch (error) {
    console.error("Gagal mengambil tryout:", error);
  }
};

onMounted(() => {
  fetchTryouts();
});

const filters = [
  { id: "semua", label: "Semua paket", icon: "📦" },
  { id: "gratis", label: "Paket gratis", icon: "🆓" },
  { id: "populer", label: "Paling populer", icon: "🔥" },
  { id: "diskon", label: "Sedang diskon", icon: "💸" },
];

const selectedFilter = ref("semua");

const summary = computed(() => {
  const total = tryoutPackages.value.length;
  const free = tryoutPackages.value.filter((p) => p.isFree).length;
  const discount = tryoutPackages.value.filter((p) => p.discount).length;
  return { total, free, discount };
});

const filteredPackages = computed(() => {
  if (selectedFilter.value === "semua") return tryoutPackages.value;
  return tryoutPackages.value.filter((pkg) => {
    if (selectedFilter.value === "gratis") return pkg.isFree;
    return pkg.tag === selectedFilter.value;
  });
});

const handleSelect = (pkg) => {
  // TODO: ganti dengan navigasi ke halaman detail atau langsung mulai tryout
  // misalnya: router.push({ name: 'checkout', params: { id: pkg.id } })
  console.log("Paket dipilih:", pkg);
};
</script>
