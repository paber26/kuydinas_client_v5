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
import { useRouter } from "vue-router";
import api from "../../services/api";

import PromoHeader from "../../components/PromoTryout/PromoHeader.vue";
import PromoBanner from "../../components/PromoTryout/PromoBanner.vue";
import PromoFilters from "../../components/PromoTryout/PromoFilters.vue";
import PromoGrid from "../../components/PromoTryout/PromoGrid.vue";

const coins = 49500;

const router = useRouter();
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

    tryoutPackages.value = list
      .map((t) => ({
        id: t.id,
        title: t.title,
        subtitle: t.description || "Simulasi tryout terbaru",
        category: t.category || "SKD",
        price: t.price || 0,
        isFree: t.type === "free",
        duration: t.duration || 100,
        questionCount: t.questionCount,
        level: t.level || "Menengah",
        seatsLeft: Number(t.quota ?? t.qouta ?? t.seatsLeft ?? 0),
        discount: Number(t.discount || 0),
        highlight: false,
        tag: t.tag,
      }))
      .sort((a, b) => Number(b.isFree) - Number(a.isFree));
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

  // paket gratis
  const free = tryoutPackages.value.filter((p) => p.tag === "free").length;

  // paket diskon hanya premium
  const discountPremium = tryoutPackages.value.filter(
    (p) => p.tag === "premium" && Number(p.discount) > 0,
  ).length;

  return { total, free, discountPremium };
});

const filteredPackages = computed(() => {
  if (selectedFilter.value === "semua") return tryoutPackages.value;

  if (selectedFilter.value === "gratis") {
    return tryoutPackages.value.filter((pkg) => pkg.tag === "free");
  }

  if (selectedFilter.value === "populer") {
    return tryoutPackages.value.filter((pkg) => pkg.tag === "premium");
  }

  if (selectedFilter.value === "diskon") {
    return tryoutPackages.value.filter(
      (pkg) => pkg.tag === "premium" && Number(pkg.discount) > 0,
    );
  }

  return tryoutPackages.value;
});

const handleSelect = async (pkg) => {
  router.push({
    name: "panduan-tryout",
    params: { id: pkg.id },
    query: {
      title: pkg.title,
      category: pkg.category,
      tag: pkg.tag || (pkg.isFree ? "free" : "premium"),
    },
  });
};
</script>
