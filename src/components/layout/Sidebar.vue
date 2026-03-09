<template>
  <!-- Overlay mobile -->
  <div
    v-if="open"
    @click="toggleSidebar"
    class="fixed inset-0 bg-black/40 z-20 md:hidden"
  ></div>

  <aside
    class="fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300"
    :class="open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'"
  >
    <!-- Logo -->
    <div class="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
      <div
        class="h-10 w-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white font-bold"
      >
        KD
      </div>

      <div>
        <p class="text-xs text-slate-500">Tryout SKD CPNS</p>
        <p class="text-sm font-semibold text-slate-800">Kuy Dinas</p>
      </div>
    </div>

    <nav class="mt-4 flex-1 px-3 space-y-6 text-sm">
      <!-- DASHBOARD -->
      <div>
        <p class="px-3 text-xs font-semibold text-slate-400 uppercase mb-2">
          Dashboard
        </p>

        <RouterLink
          to="/"
          @click="toggleSidebar"
          class="group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-700 hover:bg-slate-100 transition"
          active-class="text-emerald-600 font-semibold"
        >
          <span
            class="absolute left-0 h-5 w-1 rounded-r bg-emerald-500 opacity-0 group-[.router-link-active]:opacity-100 transition"
          ></span>

          <Home class="w-5 h-5 text-slate-500 group-hover:text-emerald-500" />

          <span>Beranda</span>
        </RouterLink>
      </div>

      <!-- TRYOUT -->
      <div>
        <p class="px-3 text-xs font-semibold text-slate-400 uppercase mb-2">
          Tryout
        </p>

        <RouterLink
          to="/tryoutskd"
          @click="toggleSidebar"
          class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-700 hover:bg-slate-100 transition"
          active-class="bg-emerald-50 text-emerald-600 font-semibold"
        >
          <ClipboardCheck class="w-5 h-5 text-slate-500" />
          <span>Pengerjaan Tryout</span>
        </RouterLink>

        <RouterLink
          to="/peringkat"
          @click="toggleSidebar"
          class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-700 hover:bg-slate-100 transition"
          active-class="bg-emerald-50 text-emerald-600 font-semibold"
        >
          <Trophy class="w-5 h-5 text-slate-500" />
          <span>Peringkat SKD</span>
        </RouterLink>
      </div>

      <!-- BELAJAR -->
      <div>
        <p class="px-3 text-xs font-semibold text-slate-400 uppercase mb-2">
          Belajar
        </p>

        <RouterLink
          to="/materiskd"
          @click="toggleSidebar"
          class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-700 hover:bg-slate-100 transition"
          active-class="bg-emerald-50 text-emerald-600 font-semibold"
        >
          <BookOpen class="w-5 h-5 text-slate-500" />
          <span>Materi SKD</span>
        </RouterLink>
      </div>

      <!-- AKUN -->
      <div>
        <p class="px-3 text-xs font-semibold text-slate-400 uppercase mb-2">
          Akun
        </p>

        <RouterLink
          to="/dompet"
          @click="toggleSidebar"
          class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-700 hover:bg-slate-100 transition"
          active-class="bg-emerald-50 text-emerald-600 font-semibold"
        >
          <Wallet class="w-5 h-5 text-slate-500" />
          <span>Dompet</span>
        </RouterLink>

        <RouterLink
          to="/promotryout"
          @click="toggleSidebar"
          class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-700 hover:bg-slate-100 transition"
          active-class="bg-emerald-50 text-emerald-600 font-semibold"
        >
          <Flame class="w-5 h-5 text-slate-500" />
          <span>Promo Tryout</span>
        </RouterLink>
      </div>
    </nav>

    <!-- Logout -->
    <div class="px-3 pb-4 pt-2 border-t border-slate-100">
      <button
        @click="logout"
        class="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-rose-600 hover:bg-rose-50 transition"
      >
        <LogOut class="w-5 h-5" />
        Keluar
      </button>
    </div>
  </aside>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import api from "../../services/api";

import {
  Home,
  ClipboardCheck,
  Trophy,
  BookOpen,
  Wallet,
  Flame,
  LogOut,
} from "lucide-vue-next";

const open = ref(false);
const router = useRouter();

const toggleSidebar = () => {
  open.value = !open.value;
};

onMounted(() => {
  const btn = document.getElementById("sidebar-toggle");

  if (btn) {
    btn.addEventListener("click", toggleSidebar);
  }
});

const logout = async () => {
  const token = localStorage.getItem("token");

  try {
    await api.post(
      "/user/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  } catch (err) {
    // Ignore 401 errors because token might already be invalid
    if (err?.response?.status !== 401) {
      console.error(err);
    }
  }

  localStorage.removeItem("token");
  router.push("/login");
};
</script>
