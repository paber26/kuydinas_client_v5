<template>
  <div class="min-h-full bg-slate-50">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <section
        class="rounded-2xl bg-white shadow-sm border border-slate-100 p-4 sm:p-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
      >
        <div>
          <p class="text-xs font-semibold uppercase tracking-wide text-emerald-600">
            Tryout HOTS
          </p>
          <h1 class="mt-1 text-xl sm:text-2xl font-semibold text-slate-800">
            Paket Tryout HOTS Premium
          </h1>
          <p class="mt-2 text-xs sm:text-sm text-slate-600 max-w-xl">
            Kumpulan tryout premium tanpa diskon untuk latihan HOTS yang lebih
            intensif, menantang, dan cocok untuk pendalaman materi menjelang
            ujian.
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-3">
          <div
            class="rounded-xl bg-slate-50 border border-slate-100 px-3 py-2 text-xs sm:text-sm text-slate-700"
          >
            <p class="font-semibold">🎯 {{ summary.total }} paket HOTS</p>
            <p class="text-[11px] text-slate-500">
              {{ summary.premium }} premium • {{ summary.noDiscount }} tanpa diskon
            </p>
          </div>

          <div
            class="flex items-center gap-2 rounded-full bg-amber-300/90 px-3 py-1.5 text-xs sm:text-sm font-semibold text-slate-800 shadow-sm"
          >
            <span>🪙</span>
            <span>{{ coins.toLocaleString("id-ID") }} koin</span>
          </div>
        </div>
      </section>

      <section
        class="rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 px-4 py-3 text-xs sm:text-sm text-amber-900 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
      >
        <div class="flex items-start gap-2">
          <span class="mt-[2px]">🧠</span>
          <p>
            Paket Tryout HOTS berisi tryout
            <span class="font-semibold">premium tanpa diskon</span> untuk
            latihan intensif. Cocok dipilih kalau kamu ingin fokus pada simulasi
            penuh dengan tingkat kesulitan lebih tinggi.
          </p>
        </div>

        <button
          type="button"
          class="inline-flex items-center justify-center rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-white hover:bg-amber-600 mt-1 sm:mt-0"
          @click="router.push('/promotryout')"
        >
          Lihat Promo Tryout
        </button>
      </section>

      <PromoGrid
        title="Tryout HOTS Premium"
        :packages="hotsPackages"
        @select="handleSelect"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import api from "../../services/api";
import { TRYOUT_ENDPOINTS, WALLET_ENDPOINTS } from "../../services/endpoints";
import PromoGrid from "../../components/PromoTryout/PromoGrid.vue";

const router = useRouter();
const coins = ref(0);
const hotsPackages = ref([]);

const isHotsTryout = (tryout) =>
  tryout?.type === "premium" && Number(tryout?.discount ?? 0) <= 0;

const fetchTryouts = async () => {
  try {
    const [tryoutsResponse, historyResponse, walletResponse] = await Promise.all([
      api.get(TRYOUT_ENDPOINTS.list),
      api.get(TRYOUT_ENDPOINTS.history),
      api.get(WALLET_ENDPOINTS.wallet),
    ]);

    const list = Array.isArray(tryoutsResponse.data)
      ? tryoutsResponse.data
      : Array.isArray(tryoutsResponse.data.data)
        ? tryoutsResponse.data.data
        : [];

    const registeredList = Array.isArray(historyResponse.data?.data)
      ? historyResponse.data.data
      : [];
    const registeredTryoutIds = new Set(
      registeredList.map((item) => String(item.tryout_id ?? item.id)),
    );

    coins.value = Number(walletResponse.data?.data?.balance || 0);

    hotsPackages.value = list
      .filter((t) => !registeredTryoutIds.has(String(t.id)))
      .filter((t) => isHotsTryout(t))
      .map((t) => ({
        id: t.id,
        title: t.title,
        subtitle:
          t.subtitle ||
          t.description ||
          "Latihan HOTS premium tanpa diskon untuk pendalaman materi",
        category: "HOTS Premium",
        type: t.type || "premium",
        price: t.price || 0,
        isFree: false,
        duration: t.duration || 100,
        questionCount: Number(t.questionCount ?? t.question_count ?? 0),
        level: t.level || "Lanjutan",
        seatsLeft: Number(t.quota ?? t.qouta ?? t.seatsLeft ?? 0),
        discount: Number(t.discount || 0),
        highlight: true,
        tag: t.tag || "premium",
        info_ig: t.info_ig,
        info_wa: t.info_wa,
      }))
      .sort((a, b) => a.price - b.price);
  } catch (error) {
    console.error("Gagal mengambil tryout HOTS:", error);
  }
};

onMounted(() => {
  fetchTryouts();
});

const summary = computed(() => ({
  total: hotsPackages.value.length,
  premium: hotsPackages.value.length,
  noDiscount: hotsPackages.value.length,
}));

const handleSelect = async (pkg) => {
  router.push({
    name: "panduan-tryout",
    params: { id: pkg.id },
    query: {
      title: pkg.title,
      category: pkg.category,
      tag: "premium",
      info_ig: pkg.info_ig || "",
      info_wa: pkg.info_wa || "",
    },
  });
};
</script>
