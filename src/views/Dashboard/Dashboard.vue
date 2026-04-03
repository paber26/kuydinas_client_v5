<template>
  <div class="max-w-6xl mx-auto px-6 py-6 space-y-6">
    <div
      v-if="loading"
      class="rounded-2xl border border-slate-200 bg-white px-6 py-10 text-center text-sm text-slate-500 shadow-sm"
    >
      Memuat dashboard...
    </div>

    <div
      v-else-if="errorMessage"
      class="rounded-2xl border border-rose-200 bg-rose-50 px-6 py-6 text-center shadow-sm"
    >
      <p class="text-sm font-semibold text-rose-700">{{ errorMessage }}</p>
      <button
        type="button"
        class="mt-4 inline-flex items-center justify-center rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700"
        @click="loadDashboard"
      >
        Coba lagi
      </button>
    </div>

    <template v-else>
      <GreetingCard
        :user="dashboard.user"
        :latest-tryout="dashboard.latest_tryout"
        :current-tryout="dashboard.current_tryout"
        :primary-action="dashboard.primary_action"
      />

      <div class="grid gap-6 lg:grid-cols-3">
        <div class="space-y-6 lg:col-span-2">
          <LastTryout :latest-tryout="dashboard.latest_tryout" />
          <LearningPath :items="dashboard.learning_path" />
        </div>

        <div class="space-y-6">
          <StatsCard :stats="dashboard.stats" />
          <PromoCard
            :promos="dashboard.promo_tryouts"
            :promo="dashboard.promo_tryout"
          />
          <SupportCard />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import GreetingCard from "../../components/Dashboard/GreetingCard.vue";
import LastTryout from "../../components/Dashboard/LastTryout.vue";
import LearningPath from "../../components/Dashboard/LearningPath.vue";
import StatsCard from "../../components/Dashboard/StatsCard.vue";
import PromoCard from "../../components/Dashboard/PromoCard.vue";
import SupportCard from "../../components/Dashboard/SupportCard.vue";
import { getDashboardSummary } from "../../services/dashboardService";

const loading = ref(true);
const errorMessage = ref("");
const dashboard = ref({
  user: null,
  stats: {
    completed_tryouts: 0,
    average_score: 0,
    latest_rank: null,
    latest_top_percentage: null,
    latest_participant_count: 0,
  },
  current_tryout: null,
  primary_action: {
    kind: "browse",
    label: "Mulai Tryout",
    tryout_id: null,
  },
  latest_tryout: null,
  learning_path: [],
  promo_tryout: null,
  promo_tryouts: [],
});

async function loadDashboard() {
  loading.value = true;
  errorMessage.value = "";

  try {
    const response = await getDashboardSummary();
    dashboard.value = response.data?.data ?? dashboard.value;
  } catch (error) {
    console.error("Gagal memuat dashboard:", error);
    errorMessage.value = "Data dashboard belum bisa dimuat. Coba refresh beberapa saat lagi.";
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  loadDashboard();
});
</script>
