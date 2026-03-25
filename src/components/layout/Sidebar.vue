<template>
  <div class="flex h-full flex-col bg-white">
    <div class="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
      <div class="flex items-center gap-3">
        <div
          class="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 font-bold text-white"
        >
          KD
        </div>

        <div>
          <p class="text-xs text-slate-500">Tryout SKD CPNS</p>
          <p class="text-sm font-semibold text-slate-800">Kuy Dinas</p>
        </div>
      </div>

      <button
        type="button"
        class="inline-flex items-center justify-center rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 md:hidden"
        aria-label="Tutup sidebar"
        @click="emitNavigate"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <nav class="mt-4 flex-1 space-y-6 px-3 text-sm">
      <div>
        <p class="mb-2 px-3 text-xs font-semibold uppercase text-slate-400">
          Dashboard
        </p>

        <RouterLink
          to="/dashboard"
          @click="emitNavigate"
          class="group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-slate-700 transition hover:bg-slate-100"
          active-class="bg-emerald-50 text-emerald-600 font-semibold"
        >
          <span
            class="absolute left-0 h-5 w-1 rounded-r bg-emerald-500 opacity-0 transition group-[.router-link-active]:opacity-100"
          ></span>
          <Home class="h-5 w-5 text-slate-500 group-hover:text-emerald-500" />
          <span>Beranda</span>
        </RouterLink>
      </div>

      <div>
        <p class="mb-2 px-3 text-xs font-semibold uppercase text-slate-400">
          Tryout
        </p>

        <RouterLink
          to="/pengerjaantryout"
          @click="emitNavigate"
          class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-slate-700 transition hover:bg-slate-100"
          active-class="bg-emerald-50 text-emerald-600 font-semibold"
        >
          <ClipboardCheck class="h-5 w-5 text-slate-500" />
          <span>Pengerjaan Tryout</span>
        </RouterLink>

        <RouterLink
          to="/peringkat"
          @click="emitNavigate"
          class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-slate-700 transition hover:bg-slate-100"
          active-class="bg-emerald-50 text-emerald-600 font-semibold"
        >
          <Trophy class="h-5 w-5 text-slate-500" />
          <span>Peringkat SKD</span>
        </RouterLink>
      </div>

      <div>
        <p class="mb-2 px-3 text-xs font-semibold uppercase text-slate-400">
          Belajar
        </p>

        <RouterLink
          to="/materiskd"
          @click="emitNavigate"
          class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-slate-700 transition hover:bg-slate-100"
          active-class="bg-emerald-50 text-emerald-600 font-semibold"
        >
          <BookOpen class="h-5 w-5 text-slate-500" />
          <span>Materi SKD</span>
        </RouterLink>
      </div>

      <div>
        <p class="mb-2 px-3 text-xs font-semibold uppercase text-slate-400">
          Akun
        </p>

        <RouterLink
          to="/dompet"
          @click="emitNavigate"
          class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-slate-700 transition hover:bg-slate-100"
          active-class="bg-emerald-50 text-emerald-600 font-semibold"
        >
          <Wallet class="h-5 w-5 text-slate-500" />
          <span>Dompet</span>
        </RouterLink>

        <RouterLink
          to="/promotryout"
          @click="emitNavigate"
          class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-slate-700 transition hover:bg-slate-100"
          active-class="bg-emerald-50 text-emerald-600 font-semibold"
        >
          <Flame class="h-5 w-5 text-slate-500" />
          <span>Promo Tryout</span>
        </RouterLink>
      </div>
    </nav>

    <div class="border-t border-slate-100 px-3 pb-4 pt-2">
      <button
        @click="logout"
        class="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-rose-600 transition hover:bg-rose-50"
      >
        <LogOut class="h-5 w-5" />
        Keluar
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import api from "../../services/api";
import { AUTH_ENDPOINTS } from "../../services/endpoints";
import {
  Home,
  ClipboardCheck,
  Trophy,
  BookOpen,
  Wallet,
  Flame,
  LogOut,
} from "lucide-vue-next";

const emit = defineEmits(["navigate"]);
const router = useRouter();

const emitNavigate = () => {
  emit("navigate");
};

const logout = async () => {
  const token = localStorage.getItem("token");

  try {
    await api.post(
      AUTH_ENDPOINTS.user.logout,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (err) {
    if (err?.response?.status !== 401) {
      console.error(err);
    }
  }

  emitNavigate();
  localStorage.removeItem("token");
  router.push("/login");
};
</script>
