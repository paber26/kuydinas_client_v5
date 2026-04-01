<template>
  <div class="min-h-full bg-slate-50">
    <div
      class="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8"
    >
      <section
        class="overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-6 text-white shadow-lg"
      >
        <p class="text-sm font-semibold uppercase tracking-[0.2em] opacity-90">
          Panduan Mengikuti Tryout
        </p>
        <h1 class="mt-3 text-2xl font-bold sm:text-3xl">
          {{ tryoutTitle }}
        </h1>
        <p class="mt-2 max-w-2xl text-sm text-emerald-50 sm:text-base">
          Selesaikan langkah berikut untuk membuka tryout. Unggah 4 bukti
          berbeda: 1 bukti follow Instagram dan 3 bukti share ke grup WhatsApp.
        </p>

        <div class="mt-5 flex flex-wrap gap-3 text-sm">
          <span
            class="rounded-full bg-white/15 px-3 py-1.5 font-medium backdrop-blur"
          >
            {{ tryoutCategory }}
          </span>
          <span
            class="rounded-full bg-white/15 px-3 py-1.5 font-medium backdrop-blur"
          >
            {{ tryoutTagLabel }}
          </span>
        </div>
      </section>

      <section class="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div class="space-y-6">
          <div
            class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div class="flex items-center justify-between gap-3">
              <div>
                <h2 class="text-lg font-semibold text-slate-900">
                  Langkah Wajib
                </h2>
                <p class="mt-1 text-sm text-slate-500">
                  Ikuti semua langkah berikut sebelum memulai tryout.
                </p>
              </div>
              <span
                class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600"
              >
                4 langkah
              </span>
            </div>

            <div class="mt-5 space-y-4">
              <article
                v-for="step in steps"
                :key="step.id"
                class="rounded-2xl border border-slate-200 p-4"
              >
                <div class="flex items-start gap-3">
                  <div
                    class="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-base font-bold text-emerald-700"
                  >
                    {{ step.id }}
                  </div>
                  <div class="min-w-0 flex-1">
                    <h3 class="text-sm font-semibold text-slate-900">
                      {{ step.title }}
                    </h3>
                    <p class="mt-1 text-sm leading-6 text-slate-500">
                      {{ step.description }}
                    </p>
                    <div v-if="step.action" class="mt-3 flex flex-wrap gap-3">
                      <button
                        type="button"
                        class="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600"
                        @click="step.action"
                      >
                        {{ step.actionLabel }}
                      </button>
                      <button
                        v-if="step.secondaryAction"
                        type="button"
                        class="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                        @click="step.secondaryAction"
                      >
                        {{ step.secondaryLabel }}
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>

          <div
            class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div class="flex items-center justify-between gap-3">
              <div>
                <h2 class="text-lg font-semibold text-slate-900">
                  Upload Bukti
                </h2>
                <p class="mt-1 text-sm text-slate-500">
                  Unggah 4 gambar yang berbeda. Sistem akan menolak file yang
                  duplikat.
                </p>
              </div>
              <span
                class="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700"
              >
                {{ uploadedCount }}/4 terisi
              </span>
            </div>

            <div class="mt-5 grid gap-4 md:grid-cols-2">
              <label
                v-for="(slot, index) in uploadSlots"
                :key="slot.key"
                class="block rounded-2xl border border-dashed p-4 transition"
                :class="
                  slot.error
                    ? 'border-rose-300 bg-rose-50'
                    : 'border-slate-300 hover:border-emerald-300 hover:bg-emerald-50/40'
                "
              >
                <div class="flex items-center justify-between gap-3">
                  <div>
                    <p class="text-sm font-semibold text-slate-900">
                      {{ slot.label }}
                    </p>
                    <p class="mt-1 text-xs text-slate-500">
                      PNG, JPG, atau JPEG
                    </p>
                  </div>
                  <span
                    class="rounded-full px-2.5 py-1 text-[11px] font-semibold"
                    :class="
                      slot.file
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-slate-100 text-slate-500'
                    "
                  >
                    {{ slot.file ? "Terisi" : "Kosong" }}
                  </span>
                </div>

                <div
                  class="mt-4 flex min-h-40 items-center justify-center overflow-hidden rounded-2xl bg-slate-100"
                >
                  <img
                    v-if="slot.preview"
                    :src="slot.preview"
                    :alt="slot.label"
                    class="h-40 w-full object-cover"
                  />
                  <div v-else class="px-4 text-center text-xs text-slate-500">
                    Pilih gambar bukti untuk {{ slot.label.toLowerCase() }}
                  </div>
                </div>

                <div class="mt-4 flex items-center gap-3">
                  <input
                    class="block w-full text-xs text-slate-500 file:mr-4 file:rounded-xl file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-xs file:font-semibold file:text-white hover:file:bg-slate-700"
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    @change="onFileChange(index, $event)"
                  />
                  <button
                    v-if="slot.file"
                    type="button"
                    class="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                    @click.prevent="removeFile(index)"
                  >
                    Hapus
                  </button>
                </div>

                <p v-if="slot.fileName" class="mt-2 text-xs text-slate-500">
                  {{ slot.fileName }}
                </p>
                <p
                  v-if="slot.error"
                  class="mt-2 text-xs font-medium text-rose-600"
                >
                  {{ slot.error }}
                </p>
              </label>
            </div>

            <div
              v-if="duplicateMessage"
              class="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
            >
              {{ duplicateMessage }}
            </div>
          </div>
        </div>

        <aside class="space-y-6">
          <div
            class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <h2 class="text-lg font-semibold text-slate-900">
              Checklist Verifikasi
            </h2>

            <div class="mt-4 space-y-3">
              <label
                v-for="item in confirmations"
                :key="item.key"
                class="flex items-start gap-3 rounded-2xl border border-slate-200 px-4 py-3"
              >
                <input
                  v-model="item.checked"
                  type="checkbox"
                  class="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span class="text-sm leading-6 text-slate-600">
                  {{ item.label }}
                </span>
              </label>
            </div>
          </div>

          <div
            class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <h2 class="text-lg font-semibold text-slate-900">Siap Mulai?</h2>
            <p class="mt-2 text-sm leading-6 text-slate-500">
              Setelah semua bukti lengkap dan tidak duplikat, tombol mulai
              tryout akan aktif.
            </p>

            <div
              class="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600"
            >
              <p>Total bukti valid: {{ uploadedCount }}/4</p>
              <p class="mt-1">Checklist selesai: {{ completedChecks }}/3</p>
            </div>

            <p
              v-if="submitError"
              class="mt-4 text-sm font-medium text-rose-600"
            >
              {{ submitError }}
            </p>

            <div class="mt-5 flex flex-col gap-3">
              <button
                type="button"
                class="rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-slate-300"
                :disabled="!canSubmit || isSubmitting"
                @click="submitGuide"
              >
                {{
                  isSubmitting
                    ? "Memproses..."
                    : "Saya Sudah Siap, Mulai Tryout"
                }}
              </button>
              <button
                type="button"
                class="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                @click="goBack"
              >
                Kembali ke Promo Tryout
              </button>
            </div>
          </div>
        </aside>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { registerTryout, getTryoutDetail } from "../../services/tryoutService";

const route = useRoute();
const router = useRouter();

const tryoutId = computed(() => route.params.id);
const tryoutTitle = computed(
  () => route.query.title || `Tryout #${route.params.id}`,
);
const tryoutCategory = computed(() => route.query.category || "SKD");
const tryoutTagLabel = computed(() =>
  route.query.tag === "premium" ? "Paket Premium" : "Paket Gratis",
);

const fetchedInfoIg = ref("");
const fetchedInfoWa = ref("");

onMounted(async () => {
  try {
    const res = await getTryoutDetail(tryoutId.value);
    const data = res.data?.data || res.data;
    if (data) {
      fetchedInfoIg.value = data.info_ig || "";
      fetchedInfoWa.value = data.info_wa || "";
    }
  } catch (error) {
    console.error("Gagal get info ig/wa dari API", error);
  }
});

const infoIg = computed(() => fetchedInfoIg.value || route.query.info_ig || "");
const infoWa = computed(() => fetchedInfoWa.value || route.query.info_wa || "");

const promoMessage = computed(() => {
  let msg = `Halo teman-teman, aku baru ikut tryout ${tryoutTitle.value} di KuyDinas. Yuk ikut juga dan latihan bareng supaya persiapan makin matang.`;
  if (infoIg.value) msg += `\n\nLink Informasi/Postingan IG: ${infoIg.value}`;
  if (infoWa.value) msg += `\nLink WhatsApp Penyelenggara: ${infoWa.value}`;
  return msg;
});

const instagramUrl = computed(() => infoIg.value || "https://www.instagram.com/");
const whatsappUrl = computed(() => infoWa.value || `https://wa.me/?text=${encodeURIComponent(promoMessage.value)}`);

const uploadSlots = reactive([
  createUploadSlot("follow-instagram", "Bukti follow Instagram"),
  createUploadSlot("share-grup-1", "Bukti share Grup WhatsApp 1"),
  createUploadSlot("share-grup-2", "Bukti share Grup WhatsApp 2"),
  createUploadSlot("share-grup-3", "Bukti share Grup WhatsApp 3"),
]);

const confirmations = reactive([
  {
    key: "follow",
    label: "Saya sudah follow Instagram yang diminta.",
    checked: false,
  },
  {
    key: "share",
    label: "Saya sudah membagikan info tryout ke 3 grup WhatsApp.",
    checked: false,
  },
  {
    key: "valid",
    label: "Saya memastikan semua bukti yang diunggah adalah asli dan berbeda.",
    checked: false,
  },
]);

const duplicateMessage = ref("");
const isSubmitting = ref(false);
const submitError = ref("");

const steps = computed(() => [
  {
    id: "01",
    title: "Follow akun Instagram penyelenggara",
    description:
      "Tekan tombol di bawah untuk membuka Instagram. Setelah follow, siapkan screenshot sebagai bukti upload pertama.",
    actionLabel: "Buka Instagram",
    action: () => window.open(instagramUrl.value, "_blank", "noopener,noreferrer"),
  },
  {
    id: "02",
    title: "Salin informasi promo tryout",
    description:
      `Gunakan teks promosi yang sudah disiapkan agar format share ke grup tetap konsisten:\n\n"${promoMessage.value}"`,
    actionLabel: "Salin Teks Promosi",
    action: copyPromoMessage,
  },
  {
    id: "03",
    title: "Bagikan ke 3 grup WhatsApp",
    description:
      "Aplikasi web tidak bisa mengirim otomatis ke grup WhatsApp pribadi tanpa interaksi pengguna. Tombol berikut membuka WhatsApp dengan pesan siap kirim agar Anda bisa membagikannya ke 3 grup.",
    actionLabel: "Buka WhatsApp",
    action: () => window.open(whatsappUrl.value, "_blank", "noopener,noreferrer"),
  },
  {
    id: "04",
    title: "Unggah 4 bukti berbeda",
    description:
      "Unggah 1 bukti follow Instagram dan 3 bukti share WhatsApp. Jika ada gambar yang sama, form akan menolaknya.",
  },
]);

const uploadedCount = computed(
  () => uploadSlots.filter((slot) => Boolean(slot.file)).length,
);

const completedChecks = computed(
  () => confirmations.filter((item) => item.checked).length,
);

const canSubmit = computed(() => {
  const allSlotsFilled = uploadSlots.every(
    (slot) => slot.file && !slot.error && slot.hash,
  );

  return allSlotsFilled && completedChecks.value === confirmations.length;
});

function createUploadSlot(key, label) {
  return {
    key,
    label,
    file: null,
    fileName: "",
    preview: "",
    hash: "",
    error: "",
  };
}

async function onFileChange(index, event) {
  const [file] = event.target.files || [];

  if (!file) {
    return;
  }

  if (!file.type.startsWith("image/")) {
    uploadSlots[index].error = "File harus berupa gambar.";
    event.target.value = "";
    return;
  }

  const hash = await createFileHash(file);

  uploadSlots[index].file = file;
  uploadSlots[index].fileName = file.name;
  uploadSlots[index].preview = URL.createObjectURL(file);
  uploadSlots[index].hash = hash;
  uploadSlots[index].error = "";

  validateDuplicates();
}

function removeFile(index) {
  if (uploadSlots[index].preview) {
    URL.revokeObjectURL(uploadSlots[index].preview);
  }

  uploadSlots[index].file = null;
  uploadSlots[index].fileName = "";
  uploadSlots[index].preview = "";
  uploadSlots[index].hash = "";
  uploadSlots[index].error = "";

  validateDuplicates();
}

function validateDuplicates() {
  duplicateMessage.value = "";

  uploadSlots.forEach((slot) => {
    slot.error = "";
  });

  const hashMap = new Map();

  uploadSlots.forEach((slot, index) => {
    if (!slot.hash) {
      return;
    }

    if (!hashMap.has(slot.hash)) {
      hashMap.set(slot.hash, [index]);
      return;
    }

    hashMap.get(slot.hash).push(index);
  });

  hashMap.forEach((indexes) => {
    if (indexes.length < 2) {
      return;
    }

    duplicateMessage.value =
      "Terdapat gambar duplikat. Pastikan keempat bukti yang diunggah berbeda.";

    indexes.forEach((index) => {
      uploadSlots[index].error = "Gambar ini sama dengan upload bukti lain.";
    });
  });
}

async function createFileHash(file) {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);

  return Array.from(new Uint8Array(hashBuffer))
    .map((value) => value.toString(16).padStart(2, "0"))
    .join("");
}

async function copyPromoMessage() {
  try {
    await navigator.clipboard.writeText(promoMessage.value);
  } catch (error) {
    console.error("Gagal menyalin teks promosi:", error);
  }
}

async function submitGuide() {
  submitError.value = "";

  if (!canSubmit.value) {
    submitError.value =
      "Lengkapi checklist dan unggah 4 gambar berbeda sebelum memulai tryout.";
    return;
  }

  isSubmitting.value = true;

  try {
    // Registrasi tryout dulu
    await registerTryout(tryoutId.value);

    // Beralih ke halaman pengerjaan tryout
    router.push({
      name: "pengerjaantryout",
      query: { success: "promo_submitted" },
    });
  } catch (error) {
    console.error("Gagal memulai tryout:", error);
    submitError.value =
      "Tryout belum bisa dimulai. Silakan coba beberapa saat lagi.";
  } finally {
    isSubmitting.value = false;
  }
}

function goBack() {
  router.push({ name: "promotryout" });
}
</script>
