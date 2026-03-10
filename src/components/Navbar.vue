<template>
  <div
    class="h-16 flex items-center justify-between bg-teal-600 text-white px-6 sm:px-10"
  >
    <div class="flex items-center">
      <button
        @click="$emit('toggleSidebar')"
        class="mr-3 inline-flex items-center justify-center rounded-lg p-2 hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-white md:hidden"
        aria-label="Buka menu"
      >
        <span class="sr-only">Buka menu</span>
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
      <div class="ml-3 sm:ml-5">
        <p class="text-[10px] text-teal-100">Website Kuy Dinas</p>
        <h1 class="text-base sm:text-lg md:text-xl font-semibold leading-tight">
          Selamat Datang di Website Kuy Dinas ^-^
        </h1>
      </div>
    </div>

    <div class="flex items-center gap-3">
      <div class="hidden sm:flex flex-col items-end">
        <p class="text-xs text-teal-100">Halo,</p>
        <p class="text-sm font-semibold">Aldo</p>
      </div>
      <div
        class="h-9 w-9 rounded-full overflow-hidden border border-teal-100 bg-slate-100"
      >
        <img
          src="/src/assets/logo-kuydinas.png"
          alt="Foto profil Aldo"
          class="h-full w-full object-cover"
        />
      </div>
      <div
        class="flex items-center gap-2 rounded-full bg-amber-300/90 px-3 py-1.5 text-sm font-semibold text-slate-800 shadow-sm"
      >
        <span>🪙</span>
        <span>49.500 koin</span>
      </div>
    </div>
  </div>
</template>
