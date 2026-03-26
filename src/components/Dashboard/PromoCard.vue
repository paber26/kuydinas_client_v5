<template>
  <section
    class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 p-5 text-white shadow-sm"
  >
    <div
      class="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl"
    ></div>

    <div class="relative space-y-4">
      <span class="inline-flex items-center gap-1 rounded-full bg-black/20 px-2.5 py-1 text-[11px] font-medium">
        Promo Tryout
      </span>

      <template v-if="promo">
        <h3 class="text-sm font-semibold leading-snug">
          {{ promoHeadline }}
        </h3>

        <p class="text-xs text-emerald-100">
          {{ promoDescription }}
        </p>

        <ul class="space-y-1 text-[11px] text-emerald-100">
          <li>• {{ promo.duration }} menit simulasi penuh SKD</li>
          <li>• {{ promo.question_count }} soal untuk latihan real test</li>
          <li>• Cocok untuk menambah progres dashboard belajarmu</li>
        </ul>

        <router-link
          :to="promoRoute"
          class="mt-2 block w-full rounded-xl bg-white px-3 py-2 text-center text-xs font-semibold text-emerald-700 shadow transition hover:bg-slate-100"
        >
          {{ promoCta }}
        </router-link>
      </template>

      <template v-else>
        <h3 class="text-sm font-semibold leading-snug">
          Belum ada promo tryout yang bisa ditampilkan
        </h3>

        <p class="text-xs text-emerald-100">
          Kamu sudah mengambil semua paket yang tersedia saat ini. Lihat daftar tryout aktifmu untuk melanjutkan latihan.
        </p>

        <router-link
          :to="{ name: 'pengerjaantryout' }"
          class="mt-2 block w-full rounded-xl bg-white px-3 py-2 text-center text-xs font-semibold text-emerald-700 shadow transition hover:bg-slate-100"
        >
          Lihat Tryout Aktif
        </router-link>
      </template>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  promo: {
    type: Object,
    default: null,
  },
});

const promoHeadline = computed(() => {
  if (!props.promo) {
    return "";
  }

  if (Number(props.promo.discount || 0) > 0) {
    return `${props.promo.title} sedang diskon ${props.promo.discount}%`;
  }

  if (props.promo.type === "free") {
    return `${props.promo.title} siap kamu kerjakan gratis`;
  }

  return `${props.promo.title} siap untuk tryout berikutnya`;
});

const promoDescription = computed(() => {
  if (!props.promo) {
    return "";
  }

  if (props.promo.type === "free") {
    return "Mulai dari paket gratis untuk menambah jam terbang dan mengisi progres latihanmu.";
  }

  if (Number(props.promo.discount || 0) > 0) {
    return `Harga promo ${formatCurrency(props.promo.final_price)} dari harga normal ${formatCurrency(props.promo.price)}.`;
  }

  return `Paket premium ini tersedia dengan harga ${formatCurrency(props.promo.price)} untuk latihan yang lebih intensif.`;
});

const promoCta = computed(() => {
  if (!props.promo) {
    return "Lihat Promo";
  }

  return props.promo.type === "free" ? "Mulai Paket Gratis" : "Lihat Promo Sekarang";
});

const promoRoute = computed(() => {
  if (!props.promo?.id) {
    return { name: "promotryout" };
  }

  return {
    name: "panduan-tryout",
    params: { id: props.promo.id },
    query: {
      title: props.promo.title,
      category: "SKD",
      tag: props.promo.type || "premium",
    },
  };
});

function formatCurrency(value) {
  const numericValue = Number(value ?? 0);

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(numericValue) ? numericValue : 0);
}
</script>
