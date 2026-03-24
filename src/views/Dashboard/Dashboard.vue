<template>
  <div class="max-w-6xl mx-auto px-6 py-6 space-y-6">
    <!-- Greeting -->
    <GreetingCard />

    <div class="grid gap-6 lg:grid-cols-3">
      <!-- LEFT -->
      <div class="space-y-6 lg:col-span-2">
        <LastTryout />
        <LearningPath />
      </div>

      <!-- RIGHT -->
      <div class="space-y-6">
        <StatsCard />
        <PromoCard />
        <SupportCard />
      </div>
    </div>
  </div>
</template>

<script setup>
import GreetingCard from "../../components/Dashboard/GreetingCard.vue";
import LastTryout from "../../components/Dashboard/LastTryout.vue";
import LearningPath from "../../components/Dashboard/LearningPath.vue";
import StatsCard from "../../components/Dashboard/StatsCard.vue";
import PromoCard from "../../components/Dashboard/PromoCard.vue";
import SupportCard from "../../components/Dashboard/SupportCard.vue";
</script>
