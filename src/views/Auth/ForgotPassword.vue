<template>
  <div class="flex min-h-screen items-center justify-center bg-slate-100 px-6 py-10">
    <div class="w-full max-w-lg rounded-[32px] border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-300/40 sm:p-10">
      <RouterLink to="/login" class="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-700">
        <span>&larr;</span>
        <span>Kembali ke login</span>
      </RouterLink>

      <div class="mt-6">
        <p class="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-700">Reset Password</p>
        <h1 class="mt-3 text-3xl font-black text-slate-900">Lupa Password</h1>
        <p class="mt-2 text-sm leading-6 text-slate-500">
          Masukkan email akun. Link reset password hanya dikirim jika email akun sudah diverifikasi.
        </p>
      </div>

      <div
        v-if="submitMessage"
        class="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
      >
        {{ submitMessage }}
      </div>

      <div
        v-if="submitError"
        class="mt-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
      >
        {{ submitError }}
      </div>

      <div
        v-if="showGoogleLoginPrompt"
        class="mt-6 rounded-2xl border border-sky-200 bg-sky-50 px-4 py-4"
      >
        <p class="text-sm font-semibold text-sky-900">Akun ini terhubung ke Google</p>
        <p class="mt-1 text-sm leading-6 text-sky-800">
          Password tidak perlu direset secara manual. Masuk saja menggunakan akun Google yang sama.
        </p>
        <button
          type="button"
          class="mt-4 flex w-full items-center justify-center gap-3 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
          @click="handleGoogleLogin"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            class="h-5 w-5"
            alt="Google Logo"
          />
          <span>Lanjutkan dengan Google</span>
        </button>
      </div>

      <form class="mt-6 space-y-5" @submit.prevent="handleSubmit">
        <div>
          <label class="mb-2 block text-sm font-semibold text-slate-700">Email</label>
          <input
            v-model="email"
            type="email"
            class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
            placeholder="nama@email.com"
            required
          />
        </div>

        <button
          :disabled="loading"
          class="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {{ loading ? "Mengirim..." : "Kirim Link Reset Password" }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { forgotPassword } from "../../services/authService";
import { buildUserGoogleLoginUrl } from "../../utils/auth";

const email = ref("");
const loading = ref(false);
const submitError = ref("");
const submitMessage = ref("");
const showGoogleLoginPrompt = ref(false);

const handleSubmit = async () => {
  loading.value = true;
  submitError.value = "";
  submitMessage.value = "";
  showGoogleLoginPrompt.value = false;

  try {
    const response = await forgotPassword({
      email: email.value,
    });

    submitMessage.value =
      response.data?.message || "Link reset password berhasil dikirim.";
  } catch (error) {
    submitError.value =
      error.response?.data?.message || "Link reset password belum bisa dikirim.";

    if (error.response?.data?.data?.action === "google_login") {
      showGoogleLoginPrompt.value = true;
    }
  } finally {
    loading.value = false;
  }
};

const handleGoogleLogin = () => {
  window.location.href = buildUserGoogleLoginUrl();
};
</script>
