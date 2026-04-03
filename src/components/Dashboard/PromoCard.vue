<template>
  <section
    class="relative overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 p-5 text-white shadow-sm"
  >
    <div
      class="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-white/10 blur-3xl"
    ></div>
    <div
      class="absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-teal-300/20 blur-3xl"
    ></div>

    <div class="relative space-y-4">
      <div class="flex items-start justify-between gap-3">
        <div>
          <span
            class="inline-flex items-center gap-1 rounded-full bg-black/20 px-2.5 py-1 text-[11px] font-semibold"
          >
            Promo Premium
          </span>

          <h3 class="mt-3 text-lg font-bold leading-snug">
            {{ sectionHeadline }}
          </h3>

          <p class="mt-2 text-xs leading-6 text-emerald-50">
            {{ sectionDescription }}
          </p>
        </div>

        <div
          v-if="displayPromos.length"
          class="rounded-2xl bg-white/10 px-3 py-2 text-right backdrop-blur"
        >
          <p class="text-[10px] uppercase tracking-wide text-emerald-50/90">
            Paket tampil
          </p>
          <p class="mt-1 text-lg font-bold">
            {{ displayPromos.length }}
          </p>
        </div>
      </div>

      <template v-if="displayPromos.length">
        <div class="space-y-3">
          <article
            v-for="promoItem in displayPromos"
            :key="promoItem.id"
            class="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur"
          >
            <div class="flex items-start justify-between gap-3">
              <div class="min-w-0">
                <div class="flex flex-wrap items-center gap-2">
                  <span class="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold">
                    Premium
                  </span>
                  <span class="rounded-full bg-amber-300/20 px-2.5 py-1 text-[10px] font-semibold text-amber-100">
                    Diskon {{ promoItem.discount }}%
                  </span>
                </div>

                <h4 class="mt-3 text-sm font-bold leading-snug">
                  {{ promoItem.title }}
                </h4>

                <p class="mt-1 text-[11px] text-emerald-50/90">
                  {{ promoItem.duration }} menit • {{ promoItem.question_count }} soal
                </p>
              </div>

              <div class="shrink-0 text-right">
                <p class="text-base font-bold">
                  {{ formatCoin(promoItem.final_price) }}
                </p>
                <p class="text-[11px] text-emerald-50/90 line-through">
                  {{ formatCoin(promoItem.price) }}
                </p>
              </div>
            </div>

            <div class="mt-4 flex items-center justify-between gap-3">
              <p class="text-[11px] text-emerald-50/90">
                Hemat {{ formatCoin(promoItem.price - promoItem.final_price) }} untuk latihan intensif.
              </p>

              <router-link
                :to="{ name: 'promotryout' }"
                class="shrink-0 rounded-xl bg-white px-3 py-2 text-xs font-semibold text-emerald-700 shadow transition hover:bg-slate-100"
              >
                Lihat Promo
              </router-link>
            </div>
          </article>
        </div>

        <router-link
          :to="{ name: 'promotryout' }"
          class="block w-full rounded-xl bg-white px-3 py-2.5 text-center text-xs font-semibold text-emerald-700 shadow transition hover:bg-slate-100"
        >
          Buka Semua Promo Tryout
        </router-link>
      </template>

      <template v-else-if="fallbackPromo">
        <div class="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
          <div class="flex items-start justify-between gap-3">
            <div>
              <span class="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold">
                {{ fallbackPromo.type === "free" ? "Gratis" : "Premium" }}
              </span>
              <h4 class="mt-3 text-sm font-bold leading-snug">
                {{ fallbackPromo.title }}
              </h4>
              <p class="mt-1 text-[11px] text-emerald-50/90">
                {{ fallbackPromo.duration }} menit • {{ fallbackPromo.question_count }} soal
              </p>
            </div>

            <div class="shrink-0 text-right">
              <p class="text-base font-bold">
                {{ fallbackPromo.type === "free" ? "0 koin" : formatCoin(fallbackPromo.final_price || fallbackPromo.price) }}
              </p>
            </div>
          </div>
        </div>

        <router-link
          :to="fallbackRoute"
          class="block w-full rounded-xl bg-white px-3 py-2.5 text-center text-xs font-semibold text-emerald-700 shadow transition hover:bg-slate-100"
        >
          {{ fallbackPromo.type === "free" ? "Ikuti Paket Gratis" : "Lihat Paket" }}
        </router-link>
      </template>

      <template v-else>
        <h3 class="text-sm font-semibold leading-snug">
          Belum ada promo tryout yang bisa ditampilkan
        </h3>

        <p class="text-xs leading-6 text-emerald-100">
          Saat ini belum ada paket premium diskon. Kamu tetap bisa lihat katalog tryout untuk memilih paket lain.
        </p>

        <router-link
          :to="{ name: 'promotryout' }"
          class="block w-full rounded-xl bg-white px-3 py-2.5 text-center text-xs font-semibold text-emerald-700 shadow transition hover:bg-slate-100"
        >
          Lihat Promo Tryout
        </router-link>
      </template>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  promos: {
    type: Array,
    default: () => [],
  },
  promo: {
    type: Object,
    default: null,
  },
});

const displayPromos = computed(() => {
  const items = Array.isArray(props.promos) ? props.promos : [];
  return items.filter((item) => item && item.id).slice(0, 3);
});

const fallbackPromo = computed(() => {
  if (displayPromos.value.length) {
    return null;
  }

  return props.promo && props.promo.id ? props.promo : null;
});

const sectionHeadline = computed(() => {
  if (displayPromos.value.length > 1) {
    return `${displayPromos.value.length} paket premium sedang diskon`;
  }

  if (displayPromos.value.length === 1) {
    return `${displayPromos.value[0].title} lagi diskon ${displayPromos.value[0].discount}%`;
  }

  if (fallbackPromo.value?.type === "free") {
    return `${fallbackPromo.value.title} siap kamu ikuti gratis`;
  }

  if (fallbackPromo.value?.id) {
    return `${fallbackPromo.value.title} siap kamu ambil`;
  }

  return "Belum ada promo premium diskon hari ini";
});

const sectionDescription = computed(() => {
  if (displayPromos.value.length) {
    return "Pilih salah satu paket premium diskon berikut untuk latihan intensif dengan harga lebih hemat.";
  }

  if (fallbackPromo.value?.type === "free") {
    return "Sambil menunggu promo premium berikutnya, kamu masih bisa mulai dari paket gratis yang direkomendasikan.";
  }

  if (fallbackPromo.value?.id) {
    return "Saat ini dashboard menampilkan rekomendasi tryout terbaik yang tersedia untukmu.";
  }

  return "Pantau dashboard untuk promo premium berikutnya, atau buka katalog tryout untuk melihat paket lain.";
});

const fallbackRoute = computed(() => {
  if (!fallbackPromo.value?.id) {
    return { name: "promotryout" };
  }

  if (fallbackPromo.value.type === "free") {
    return {
      name: "panduan-tryout",
      params: { id: fallbackPromo.value.id },
      query: {
        title: fallbackPromo.value.title,
        category: "SKD",
        tag: "free",
        info_ig: fallbackPromo.value.info_ig || "",
        info_wa: fallbackPromo.value.info_wa || "",
      },
    };
  }

  return { name: "promotryout" };
});

function formatCoin(value) {
  const numericValue = Number(value ?? 0);
  return `${new Intl.NumberFormat("id-ID").format(
    Number.isFinite(numericValue) ? numericValue : 0
  )} koin`;
}
</script>
