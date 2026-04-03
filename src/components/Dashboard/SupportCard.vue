<template>
  <section class="rounded-2xl bg-white p-4 shadow-sm border border-slate-100">
    <div class="flex items-start gap-3">
      <div
        class="bg-emerald-100 w-9 h-9 rounded-full flex items-center justify-center"
      >
        💬
      </div>

      <div>
        <h3 class="text-sm font-semibold">Hubungi Admin</h3>

        <p class="text-xs text-slate-500">
          Jika ada kendala pembayaran atau tryout
        </p>

        <a
          :href="supportUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="mt-2 inline-flex bg-emerald-500 text-white px-3 py-2 text-xs rounded-xl hover:bg-emerald-600 transition"
        >
          WhatsApp Admin
        </a>

        <p class="mt-2 text-[11px] text-slate-400">
          Fast response di jam 08.00-21.00 WIB.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";

const rawSupportUrl = import.meta.env.VITE_SUPPORT_WHATSAPP_URL || "";
const rawSupportNumber = import.meta.env.VITE_SUPPORT_WHATSAPP_NUMBER || "";

const supportMessage = encodeURIComponent(
  "Halo admin Kuy Dinas, saya ingin bertanya terkait pembayaran atau tryout."
);

const supportUrl = computed(() => {
  if (rawSupportUrl) {
    return rawSupportUrl;
  }

  if (rawSupportNumber) {
    const sanitizedNumber = String(rawSupportNumber).replace(/\D/g, "");
    return `https://wa.me/${sanitizedNumber}?text=${supportMessage}`;
  }

  return `https://wa.me/?text=${supportMessage}`;
});
</script>
