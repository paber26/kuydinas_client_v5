<template>
  <section class="flex flex-wrap gap-2 text-xs sm:text-sm">
    <button
      v-for="filter in filters"
      :key="filter.id"
      type="button"
      class="rounded-full border px-3 py-1.5 flex items-center gap-1.5"
      :class="
        modelValue === filter.id
          ? 'border-emerald-500 bg-emerald-50 text-emerald-700 font-medium'
          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
      "
      @click="$emit('update:modelValue', filter.id)"
    >
      <span v-if="filter.icon">{{ filter.icon }}</span>
      <span>{{ filter.label }}</span>
    </button>
  </section>
</template>

<script setup>
defineProps({
  filters: Array,
  modelValue: String,
});

defineEmits(["update:modelValue"]);
</script>
