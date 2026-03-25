<template>
  <header
    class="relative flex h-18 items-center justify-between overflow-hidden bg-emerald-600 px-5 text-white shadow-md sm:px-6"
  >
    <div class="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/5 blur-2xl -z-10"></div>
    <div
      class="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-white/5 blur-2xl -z-10"
    ></div>

    <div class="relative z-10 flex items-center gap-4">
      <button
        type="button"
        class="inline-flex items-center justify-center rounded-lg p-2.5 transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white md:hidden"
        :aria-expanded="isMobileSidebarOpen"
        aria-label="Buka menu"
        @click="$emit('toggle-sidebar')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <button
        type="button"
        class="hidden items-center rounded-lg p-2 text-sm font-medium transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white md:inline-flex"
        :aria-pressed="isDesktopSidebarVisible"
        :aria-label="isDesktopSidebarVisible ? 'Sembunyikan sidebar' : 'Tampilkan sidebar'"
        @click="$emit('toggle-sidebar')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div class="flex flex-col leading-tight">
        <p class="text-[11px] tracking-wide text-teal-100">Website Kuy Dinas</p>
        <h1 class="text-base font-semibold sm:text-lg md:text-xl leading-snug">Dashboard Belajar SKD</h1>
      </div>
    </div>

    <div class="relative flex items-center gap-4">
      <button
        class="relative hidden items-center justify-center rounded-lg p-2 bg-white text-slate-800 transition hover:bg-white/90 sm:flex"
      >
        🔔
        <span class="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-400"></span>
      </button>

      <div
        class="flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-sm font-semibold text-slate-800 shadow"
      >
        <span>🪙</span>
        <span>49.500</span>
      </div>

      <div class="flex items-center gap-3">
        <div class="hidden flex-col items-end leading-tight sm:flex">
          <p class="text-xs text-teal-100">Halo,</p>
          <p class="text-sm font-semibold">{{ user?.name || "User" }}</p>
        </div>

        <div class="h-9 w-9 overflow-hidden rounded-full border border-white/30 shadow">
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
import { onMounted, ref } from "vue"
import api from "../../services/api"
import { AUTH_ENDPOINTS } from "../../services/endpoints"

defineProps({
  isMobileSidebarOpen: {
    type: Boolean,
    default: false
  },
  isDesktopSidebarVisible: {
    type: Boolean,
    default: true
  }
})

defineEmits(["toggle-sidebar"])

const user = ref(null)

const getUser = async () => {
  try {
    const res = await api.get(AUTH_ENDPOINTS.user.me)
    user.value = res.data.data.user
  } catch (err) {
    console.error("Gagal mengambil data user:", err)
  }
}

onMounted(() => {
  getUser()
})
</script>
