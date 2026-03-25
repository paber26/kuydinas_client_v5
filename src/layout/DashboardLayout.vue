<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import Navbar from "../components/layout/Navbar.vue";
import Sidebar from "../components/layout/Sidebar.vue";

const route = useRoute();
const isMobileSidebarOpen = ref(false);
const isDesktopSidebarVisible = ref(true);

let desktopMediaQuery = null;

const closeMobileSidebar = () => {
  isMobileSidebarOpen.value = false;
};

const toggleSidebar = () => {
  if (desktopMediaQuery?.matches) {
    isDesktopSidebarVisible.value = !isDesktopSidebarVisible.value;
    return;
  }

  isMobileSidebarOpen.value = !isMobileSidebarOpen.value;
};

const handleViewportChange = (event) => {
  if (event.matches) {
    isMobileSidebarOpen.value = false;
  }
};

watch(
  () => route.fullPath,
  () => {
    closeMobileSidebar();
  }
);

watch(isMobileSidebarOpen, (open) => {
  document.body.classList.toggle("overflow-hidden", open);
});

onMounted(() => {
  desktopMediaQuery = window.matchMedia("(min-width: 768px)");
  handleViewportChange(desktopMediaQuery);

  if (desktopMediaQuery.addEventListener) {
    desktopMediaQuery.addEventListener("change", handleViewportChange);
  } else {
    desktopMediaQuery.addListener(handleViewportChange);
  }
});

onBeforeUnmount(() => {
  document.body.classList.remove("overflow-hidden");

  if (!desktopMediaQuery) {
    return;
  }

  if (desktopMediaQuery.removeEventListener) {
    desktopMediaQuery.removeEventListener("change", handleViewportChange);
  } else {
    desktopMediaQuery.removeListener(handleViewportChange);
  }
});
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <transition name="sidebar-backdrop">
      <button
        v-if="isMobileSidebarOpen"
        type="button"
        class="fixed inset-0 z-40 bg-slate-900/45 md:hidden"
        aria-label="Tutup sidebar"
        @click="closeMobileSidebar"
      ></button>
    </transition>

    <aside
      class="fixed inset-y-0 left-0 z-50 w-64 border-r border-slate-200 bg-white shadow-xl transition-transform duration-300 ease-out"
      :class="[
        isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full',
        isDesktopSidebarVisible ? 'md:translate-x-0' : 'md:-translate-x-full',
      ]"
    >
      <Sidebar @navigate="closeMobileSidebar" />
    </aside>

    <div
      class="flex min-h-screen min-w-0 flex-1 flex-col transition-[padding-left] duration-300 ease-out"
      :class="isDesktopSidebarVisible ? 'md:pl-64' : 'md:pl-0'"
    >
      <Navbar
        :is-mobile-sidebar-open="isMobileSidebarOpen"
        :is-desktop-sidebar-visible="isDesktopSidebarVisible"
        @toggle-sidebar="toggleSidebar"
      />

      <main class="flex-1 p-4 lg:p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>

<style scoped>
.sidebar-backdrop-enter-active,
.sidebar-backdrop-leave-active {
  transition: opacity 0.25s ease;
}

.sidebar-backdrop-enter-from,
.sidebar-backdrop-leave-to {
  opacity: 0;
}
</style>
