<template>
  <div class="min-h-screen bg-slate-100 px-6 py-10 sm:px-8 lg:px-16">
    <div class="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl overflow-hidden rounded-[36px] bg-white shadow-2xl shadow-slate-300/40 lg:grid-cols-[1.1fr_0.9fr]">
      <section class="relative hidden overflow-hidden bg-slate-900 p-10 text-white lg:block">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,197,94,0.28),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.28),_transparent_30%),linear-gradient(135deg,#020617,#0f172a,#111827)]"></div>
        <div class="relative">
          <RouterLink to="/login" class="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition hover:text-white">
            <span>&larr;</span>
            <span>Kembali ke login</span>
          </RouterLink>

          <h1 class="mt-10 max-w-lg text-5xl font-black leading-tight">
            Buat akun Kuydinas untuk mulai belajar dan ikut tryout.
          </h1>
          <p class="mt-5 max-w-lg text-sm leading-7 text-slate-300">
            Setelah akun dibuat, kamu akan langsung login lalu bisa melihat status verifikasi email di halaman profil.
          </p>

          <div class="mt-10 space-y-4">
            <div class="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <p class="text-sm font-semibold text-emerald-300">Verifikasi email</p>
              <p class="mt-2 text-sm leading-6 text-slate-300">
                Email verifikasi dikirim otomatis saat register dan saat email diganti.
              </p>
            </div>
            <div class="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <p class="text-sm font-semibold text-cyan-300">Reset password</p>
              <p class="mt-2 text-sm leading-6 text-slate-300">
                Fitur lupa password aktif setelah email akun berhasil diverifikasi.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="flex items-center px-6 py-10 sm:px-8 lg:px-12">
        <div class="w-full">
          <RouterLink to="/login" class="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-700 lg:hidden">
            <span>&larr;</span>
            <span>Kembali ke login</span>
          </RouterLink>

          <div class="mb-8">
            <p class="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-700">Register</p>
            <h2 class="mt-3 text-3xl font-black text-slate-900">Buat Akun Kuydinas</h2>
            <p class="mt-2 text-sm leading-6 text-slate-500">
              Isi data dasar dulu. Setelah itu kamu bisa lengkapi profil di dalam aplikasi.
            </p>
          </div>

          <div
            v-if="submitMessage"
            class="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
          >
            {{ submitMessage }}
          </div>

          <div
            v-if="submitError"
            class="mb-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
          >
            {{ submitError }}
          </div>

          <form class="space-y-5" @submit.prevent="handleRegister">
            <div>
              <label class="mb-2 block text-sm font-semibold text-slate-700">Nama Lengkap</label>
              <input
                v-model="form.name"
                type="text"
                class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                placeholder="Masukkan nama lengkap"
                required
              />
              <p v-if="errors.name" class="mt-2 text-xs text-rose-600">{{ errors.name }}</p>
            </div>

            <div>
              <label class="mb-2 block text-sm font-semibold text-slate-700">Email</label>
              <input
                v-model="form.email"
                type="email"
                class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                placeholder="nama@email.com"
                required
              />
              <p v-if="errors.email" class="mt-2 text-xs text-rose-600">{{ errors.email }}</p>
            </div>

            <div>
              <label class="mb-2 block text-sm font-semibold text-slate-700">Password</label>
              <input
                v-model="form.password"
                type="password"
                class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                placeholder="Minimal 6 karakter"
                required
              />
              <p v-if="errors.password" class="mt-2 text-xs text-rose-600">{{ errors.password }}</p>
            </div>

            <div>
              <label class="mb-2 block text-sm font-semibold text-slate-700">Konfirmasi Password</label>
              <input
                v-model="form.password_confirmation"
                type="password"
                class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                placeholder="Ulangi password"
                required
              />
            </div>

            <button
              :disabled="loading"
              class="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {{ loading ? "Membuat akun..." : "Daftar Sekarang" }}
            </button>
          </form>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { registerUser } from "../../services/authService";
import { saveAuthSession } from "../../utils/auth";

const router = useRouter();

const loading = ref(false);
const submitError = ref("");
const submitMessage = ref("");
const errors = ref({});
const form = ref({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});

const handleRegister = async () => {
  loading.value = true;
  submitError.value = "";
  submitMessage.value = "";
  errors.value = {};

  try {
    const response = await registerUser(form.value);
    const payload = response.data;
    const token = payload?.data?.token || payload?.token;
    const user = payload?.data?.user || payload?.user;

    submitMessage.value =
      payload?.message || "Akun berhasil dibuat. Email verifikasi sudah dikirim.";

    if (token && user) {
      saveAuthSession({ token, role: user.role, user });
      router.push("/profil?verification=welcome");
      return;
    }

    router.push("/login");
  } catch (error) {
    if (error?.response?.status === 422) {
      const validationErrors = error.response.data?.errors ?? {};
      errors.value = Object.fromEntries(
        Object.entries(validationErrors).map(([key, value]) => [
          key,
          Array.isArray(value) ? value[0] : value,
        ]),
      );
    }

    submitError.value =
      error.response?.data?.message || "Register gagal. Coba lagi.";
  } finally {
    loading.value = false;
  }
};
</script>
