<template>
  <div class="min-h-screen bg-slate-950 text-slate-900">
    <div class="grid min-h-screen lg:grid-cols-2">
      <section class="relative hidden overflow-hidden lg:flex lg:flex-col lg:justify-between">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.28),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.28),_transparent_30%),linear-gradient(135deg,#020617,#0f172a,#111827)]"></div>
        <div class="relative px-12 pt-12">
          <div class="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 backdrop-blur">
            <img :src="logoKuydinas" alt="KuyDinas" class="h-8 w-8 rounded-xl object-contain" />
            <span>Kuydinas Authentication</span>
          </div>
        </div>

        <div class="relative px-12 py-16 text-white">
          <p class="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Portal Peserta</p>
          <h1 class="mt-5 max-w-xl text-5xl font-black leading-tight">
            Masuk, verifikasi email, lalu kelola akun dengan alur yang lebih jelas.
          </h1>
          <p class="mt-6 max-w-lg text-base leading-7 text-slate-300">
            Daftar akun Kuydinas, login ke dashboard, verifikasi email di halaman profil, dan gunakan fitur reset password dengan aman.
          </p>

          <div class="mt-10 grid max-w-xl gap-4 sm:grid-cols-2">
            <div class="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <p class="text-sm font-semibold text-cyan-300">1. Register akun</p>
              <p class="mt-2 text-sm leading-6 text-slate-300">
                Buat akun user baru langsung dari halaman login.
              </p>
            </div>
            <div class="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <p class="text-sm font-semibold text-emerald-300">2. Verifikasi email</p>
              <p class="mt-2 text-sm leading-6 text-slate-300">
                Status verifikasi tampil di profil beserta tombol kirim ulang email.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="flex items-center justify-center bg-slate-100 px-6 py-10 sm:px-8 lg:px-16">
        <div class="w-full max-w-md rounded-[32px] border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-300/40 sm:p-10">
          <div class="mb-8 text-center lg:text-left">
            <div class="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 lg:mx-0">
              <img :src="logoKuydinas" alt="KuyDinas" class="h-11 w-11 object-contain" />
            </div>
            <h2 class="text-3xl font-black tracking-tight text-slate-900">Masuk ke akun</h2>
            <p class="mt-3 text-sm leading-6 text-slate-500">
              Gunakan email dan password akun Kuydinas kamu.
            </p>
          </div>

          <div
            v-if="flashMessage"
            class="mb-6 rounded-2xl border px-4 py-3 text-sm"
            :class="flashClass"
          >
            {{ flashMessage }}
          </div>

          <form class="space-y-5" @submit.prevent="login">
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

            <div>
              <div class="mb-2 flex items-center justify-between gap-3">
                <label class="block text-sm font-semibold text-slate-700">Password</label>
                <RouterLink
                  to="/forgot-password"
                  class="text-xs font-semibold text-cyan-700 transition hover:text-cyan-800"
                >
                  Lupa password?
                </RouterLink>
              </div>
              <input
                v-model="password"
                type="password"
                class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                placeholder="Masukkan password"
                required
              />
            </div>

            <button
              :disabled="loading"
              class="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {{ loading ? "Memproses..." : "Masuk Sekarang" }}
            </button>
          </form>

          <div class="my-7 flex items-center gap-3">
            <div class="h-px flex-1 bg-slate-200"></div>
            <span class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">atau</span>
            <div class="h-px flex-1 bg-slate-200"></div>
          </div>

          <button
            @click="loginGoogle"
            class="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              class="h-5 w-5"
              alt="Google Logo"
            />
            <span>Lanjutkan dengan Google</span>
          </button>

          <div class="mt-8 rounded-3xl bg-slate-50 p-5">
            <p class="text-sm font-semibold text-slate-800">Belum punya akun Kuydinas?</p>
            <p class="mt-1 text-sm leading-6 text-slate-500">
              Buat akun baru, lalu setelah login verifikasi email di halaman profil untuk mengaktifkan reset password.
            </p>
            <RouterLink
              to="/register"
              class="mt-4 inline-flex w-full items-center justify-center rounded-2xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-white"
            >
              Register Akun Kuydinas
            </RouterLink>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { loginUser } from "../../services/authService";
import { buildUserGoogleLoginUrl, saveAuthSession } from "../../utils/auth";
import logoKuydinas from "../../assets/logo-kuydinas.png";

const router = useRouter();
const route = useRoute();

const email = ref("");
const password = ref("");
const loading = ref(false);

const flashMessage = computed(() => {
  if (route.query.verification === "success") {
    return "Email berhasil diverifikasi. Silakan login dan lanjutkan menggunakan akun kamu.";
  }

  if (route.query.verification === "invalid") {
    return "Link verifikasi email tidak valid atau sudah kedaluwarsa. Silakan kirim ulang dari halaman profil.";
  }

  if (route.query.reset === "success") {
    return "Password berhasil direset. Silakan login dengan password baru.";
  }

  return "";
});

const flashClass = computed(() => {
  if (route.query.verification === "invalid") {
    return "border-rose-200 bg-rose-50 text-rose-700";
  }

  return "border-emerald-200 bg-emerald-50 text-emerald-700";
});

const login = async () => {
  if (!email.value || !password.value) {
    alert("Email dan password wajib diisi");
    return;
  }

  loading.value = true;

  try {
    const res = await loginUser({
      email: email.value,
      password: password.value,
    });

    const payload = res.data;
    const token = payload?.data?.token || payload?.token;
    const user = payload?.data?.user || payload?.user;

    if (!token || !user) {
      alert("Login gagal: token atau user tidak ditemukan");
      return;
    }

    if (user.role === "admin") {
      alert("Akun ini terdaftar sebagai admin. Mohon login melalui portal admin.");
      return;
    }

    saveAuthSession({ token, role: user.role, user });

    if (!user.is_email_verified) {
      router.push("/profil?verification=pending");
      return;
    }

    router.push("/dashboard");
  } catch (err) {
    alert(err.response?.data?.message || err.message || "Login gagal");
  } finally {
    loading.value = false;
  }
};

const loginGoogle = () => {
  window.location.href = buildUserGoogleLoginUrl();
};
</script>
