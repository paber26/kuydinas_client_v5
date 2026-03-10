<template>
  <article
    class="relative rounded-2xl border bg-white shadow-sm px-4 py-4 sm:px-5 sm:py-5 flex flex-col"
    :class="
      pkg.highlight ? 'border-emerald-200 bg-emerald-50/50' : 'border-slate-100'
    "
  >
    <!-- HEADER -->
    <div class="flex items-center justify-between gap-2">
      <p
        class="text-[11px] font-semibold uppercase tracking-wide"
        :class="pkg.highlight ? 'text-emerald-700' : 'text-slate-500'"
      >
        {{ pkg.category }}
      </p>

      <div class="flex gap-1.5">
        <span
          v-if="pkg.tag === 'free'"
          class="inline-flex items-center rounded-full bg-emerald-100 px-2 py-[2px] text-[10px] font-semibold text-emerald-700"
        >
          GRATIS
        </span>

        <span
          v-else-if="pkg.discount"
          class="inline-flex items-center rounded-full bg-amber-100 px-2 py-[2px] text-[10px] font-semibold text-amber-700"
        >
          {{ pkg.discount }}% OFF
        </span>

        <span
          v-else-if="pkg.tag === 'premium'"
          class="inline-flex items-center rounded-full bg-purple-100 px-2 py-[2px] text-[10px] font-semibold text-purple-700"
        >
          PREMIUM
        </span>
      </div>
    </div>

    <!-- TITLE -->
    <h3 class="mt-2 text-sm sm:text-base font-semibold text-slate-900">
      {{ pkg.title }}
    </h3>

    <p class="mt-1 text-xs text-slate-500">
      {{ pkg.subtitle }}
    </p>

    <!-- DETAILS -->
    <dl class="mt-3 space-y-1.5 text-xs text-slate-700">
      <div class="flex justify-between">
        <dt class="text-slate-500">Harga</dt>
        <dd class="font-semibold">
          <span v-if="pkg.isFree">Gratis</span>
          <span v-else>{{ pkg.price.toLocaleString("id-ID") }} koin</span>
        </dd>
      </div>

      <div class="flex justify-between">
        <dt class="text-slate-500">Waktu</dt>
        <dd>{{ pkg.duration }} menit</dd>
      </div>

      <div class="flex justify-between">
        <dt class="text-slate-500">Jumlah soal</dt>
        <dd>{{ pkg.questionCount }} soal</dd>
      </div>

      <div class="flex justify-between">
        <dt class="text-slate-500">Tingkat</dt>
        <dd>{{ pkg.level }}</dd>
      </div>
    </dl>

    <!-- FOOTER -->
    <div class="mt-4 flex items-center justify-between gap-3">
      <div class="text-[11px] text-slate-500">
        <p v-if="pkg.seatsLeft > 0">
          Tersisa
          <span class="font-semibold text-amber-600">
            {{ pkg.seatsLeft }} kuota
          </span>
        </p>
        <p v-else>
          <span class="font-semibold text-rose-600"> Kuota hampir penuh </span>
        </p>
      </div>

      <button
        class="inline-flex items-center justify-center rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold shadow-sm transition"
        :class="
          pkg.isFree
            ? 'bg-emerald-500 text-white hover:bg-emerald-600'
            : 'bg-amber-400 text-slate-900 hover:bg-amber-500'
        "
        @click="$emit('select', pkg)"
      >
        Ikuti Tryout
      </button>
    </div>
  </article>
</template>

<script setup>
defineProps({
  pkg: Object,
});

defineEmits(["select"]);
</script>
