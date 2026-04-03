<template>
  <div class="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-10">
    <div class="w-full max-w-lg rounded-[32px] border border-white/10 bg-white p-8 shadow-2xl shadow-black/30 sm:p-10">
      <div>
        <p class="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-700">Atur Password Baru</p>
        <h1 class="mt-3 text-3xl font-black text-slate-900">Reset Password</h1>
        <p class="mt-2 text-sm leading-6 text-slate-500">
          Masukkan password baru untuk email <span class="font-semibold text-slate-700">{{ form.email || "-" }}</span>.
        </p>
      </div>

      <div
        v-if="submitError"
        class="mt-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
      >
        {{ submitError }}
      </div>

      <form class="mt-6 space-y-5" @submit.prevent="handleSubmit">
        <div>
          <label class="mb-2 block text-sm font-semibold text-slate-700">Password Baru</label>
          <input
            v-model="form.password"
            type="password"
            class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
            placeholder="Minimal 6 karakter"
            required
          />
        </div>

        <div>
          <label class="mb-2 block text-sm font-semibold text-slate-700">Konfirmasi Password Baru</label>
          <input
            v-model="form.password_confirmation"
            type="password"
            class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
            placeholder="Ulangi password baru"
            required
          />
        </div>

        <button
          :disabled="loading"
          class="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {{ loading ? "Menyimpan..." : "Simpan Password Baru" }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { resetPassword } from "../../services/authService";

const route = useRoute();
const router = useRouter();

const loading = ref(false);
const submitError = ref("");
const form = ref({
  token: "",
  email: "",
  password: "",
  password_confirmation: "",
});

const handleSubmit = async () => {
  loading.value = true;
  submitError.value = "";

  try {
    await resetPassword(form.value);
    router.push("/login?reset=success");
  } catch (error) {
    submitError.value =
      error.response?.data?.message || "Reset password gagal. Coba lagi.";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  form.value.token = String(route.query.token || "");
  form.value.email = String(route.query.email || "");

  if (!form.value.token || !form.value.email) {
    submitError.value = "Link reset password tidak lengkap atau tidak valid.";
  }
});
</script>
