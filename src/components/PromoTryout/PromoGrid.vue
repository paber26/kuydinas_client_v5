<template>
  <section class="space-y-3">
    <h2 class="text-sm font-semibold text-slate-700">
      {{ title }}
      <span class="text-xs font-normal text-slate-500">
        • {{ packages.length }} paket ditampilkan
      </span>
    </h2>

    <div
      v-if="packages.length"
      class="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3"
    >
      <PromoCard
        v-for="pkg in packages"
        :key="pkg.id"
        :pkg="pkg"
        @select="$emit('select', pkg)"
      />
    </div>

    <div
      v-else
      class="rounded-2xl border border-dashed border-slate-200 bg-white px-4 py-10 text-center text-sm text-slate-500"
    >
      Belum ada paket tryout yang cocok dengan filter ini.
    </div>
  </section>
</template>

<script setup>
import PromoCard from "./PromoCard.vue";

defineProps({
  title: String,
  packages: Array,
});

defineEmits(["select"]);
</script>
