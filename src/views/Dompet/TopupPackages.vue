<template>
  <section class="space-y-3">
    <div class="flex items-center justify-between gap-2">
      <h2 class="text-sm font-semibold text-slate-800">Pilih Paket Top Up</h2>
      <p class="text-[11px] text-slate-500">
        Semakin besar paket, semakin hemat koin per rupiah.
      </p>
    </div>

    <div
      v-if="loading"
      class="rounded-2xl border border-slate-100 bg-white px-4 py-6 text-sm text-slate-500 shadow-sm"
    >
      Memuat paket top up...
    </div>

    <div
      v-else-if="error"
      class="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-6 text-sm text-rose-600 shadow-sm"
    >
      {{ error }}
    </div>

    <div
      v-else-if="packages.length === 0"
      class="rounded-2xl border border-slate-100 bg-white px-4 py-6 text-sm text-slate-500 shadow-sm"
    >
      Belum ada paket top up yang tersedia.
    </div>

    <div v-else class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <article
        v-for="pkg in packages"
        :key="pkg.id"
        class="relative rounded-2xl border bg-white px-4 py-4 shadow-sm flex flex-col gap-3"
        :class="
          pkg.highlight
            ? 'border-emerald-300 ring-1 ring-emerald-200'
            : 'border-slate-100'
        "
      >
        <div class="flex items-start justify-between gap-2">
          <div>
            <p class="text-xs text-slate-500">Paket {{ pkg.id }}</p>
            <p class="mt-1 text-lg font-semibold text-slate-900">
              {{ pkg.coins.toLocaleString("id-ID") }} koin
            </p>
          </div>
          <span
            v-if="pkg.tag"
            class="inline-flex items-center rounded-full px-2 py-[2px] text-[10px] font-semibold"
            :class="
              pkg.tag === 'Paling hemat'
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-amber-100 text-amber-700'
            "
          >
            {{ pkg.tag }}
          </span>
        </div>

        <div class="text-xs text-slate-600">
          <p>
            Harga:
            <span class="font-semibold"
              >Rp{{ pkg.price.toLocaleString("id-ID") }}</span
            >
          </p>
          <p v-if="pkg.bonus">
            Bonus koin:
            <span class="font-semibold"
              >{{ pkg.bonus.toLocaleString("id-ID") }} koin</span
            >
          </p>
          <p v-if="pkg.effectiveRate" class="mt-1 text-[11px] text-slate-500">
            ~ Rp{{ pkg.effectiveRate }}/100 koin
          </p>
        </div>

        <button
          type="button"
          class="mt-auto inline-flex items-center justify-center rounded-xl bg-emerald-500 px-3 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-slate-300"
          :disabled="submittingId === pkg.id"
          @click="$emit('select', pkg)"
        >
          {{
            submittingId === pkg.id ? "Memproses..." : `Top Up Paket ${pkg.id}`
          }}
        </button>
      </article>
    </div>

    <p class="mt-1 text-[11px] text-slate-500">
      Setelah memilih paket, pembayaran akan dibuka melalui Midtrans Snap.
    </p>
  </section>
</template>

<script setup>
defineProps({
  packages: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: "",
  },
  submittingId: {
    type: [String, Number, null],
    default: null,
  },
});

defineEmits(["select"]);
</script>
