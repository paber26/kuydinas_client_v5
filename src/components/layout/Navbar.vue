<template>
  <header
    class="relative h-16 flex items-center justify-between bg-emerald-600 text-white px-4 sm:px-6 shadow-md overflow-hidden"
  >
    <!-- background glow -->
    <div
      class="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"
    ></div>
    <div
      class="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"
    ></div>

    <!-- LEFT -->
    <div class="relative flex items-center gap-3">
      <button
        id="sidebar-toggle"
        class="inline-flex items-center justify-center rounded-lg p-2 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white md:hidden transition"
        aria-label="Buka menu"
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
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <div>
        <p class="text-[10px] text-teal-100 tracking-wide">Website Kuy Dinas</p>

        <h1 class="text-base sm:text-lg md:text-xl font-semibold">
          Dashboard Belajar SKD
        </h1>
      </div>
    </div>

    <!-- RIGHT -->
    <div class="relative flex items-center gap-4">
      <!-- Notification -->
      <button
        class="relative hidden sm:flex items-center justify-center rounded-lg p-2 bg-white hover:bg-white/10 transition"
      >
        🔔
        <span
          class="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-400"
        ></span>
      </button>

      <!-- Coin -->
      <div
        class="flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-sm font-semibold text-slate-800 shadow"
      >
        <span>🪙</span>
        <span>49.500</span>
      </div>

      <!-- Profile -->
      <div class="flex items-center gap-3">
        <div class="hidden sm:flex flex-col items-end leading-tight">
          <p class="text-xs text-teal-100">Halo,</p>
          <p class="text-sm font-semibold">{{ user?.name || "User" }}</p>
        </div>

        <div
          class="h-9 w-9 rounded-full overflow-hidden border border-white/30 shadow"
        >
          <img
            :src="user?.image || '/src/assets/logo-kuydinas.png'"
            alt="Foto profil"
            class="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../../services/api";
import { AUTH_ENDPOINTS } from "../../services/endpoints";

const user = ref(null);

const getUser = async () => {
  try {
    const res = await api.get(AUTH_ENDPOINTS.user.me);
    user.value = res.data.data.user;
  } catch (err) {
    console.error("Gagal mengambil data user:", err);
  }
};

onMounted(() => {
  getUser();
});
</script>
