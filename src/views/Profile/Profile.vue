<template>
  <div class="min-h-full bg-slate-50">
    <div class="max-w-4xl mx-auto space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <section class="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <p class="text-xs font-semibold uppercase tracking-wide text-emerald-600">Akun Saya</p>
        <h1 class="mt-1 text-xl font-semibold text-slate-800 sm:text-2xl">Profil Kamu</h1>
        <p class="mt-2 text-xs text-slate-600 sm:text-sm">
          Kelola informasi akunmu di sini agar tetap up to date selama menggunakan aplikasi.
        </p>
      </section>

      <div
        v-if="loading"
        class="rounded-2xl border border-slate-200 bg-white px-6 py-10 text-center text-sm text-slate-500 shadow-sm"
      >
        Memuat profil...
      </div>

      <template v-else>
        <section class="grid gap-6 lg:grid-cols-3">
          <article class="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm lg:col-span-1">
            <div class="flex items-center gap-4">
              <div
                class="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-xl font-bold text-emerald-700"
              >
                {{ initials }}
              </div>

              <div>
                <p class="text-lg font-semibold text-slate-800">
                  {{ form.name || "Peserta Tryout" }}
                </p>
                <p class="text-sm text-slate-500">{{ form.email || "-" }}</p>
              </div>
            </div>

            <div class="mt-5 space-y-3 text-sm">
              <div class="rounded-xl bg-slate-50 px-4 py-3">
                <p class="text-[11px] uppercase tracking-wide text-slate-400">Role</p>
                <p class="mt-1 font-semibold text-slate-700">
                  {{ profile.role || "user" }}
                </p>
              </div>

              <div class="rounded-xl bg-slate-50 px-4 py-3">
                <p class="text-[11px] uppercase tracking-wide text-slate-400">Provider Login</p>
                <p class="mt-1 font-semibold capitalize text-slate-700">
                  {{ profile.provider || "manual" }}
                </p>
              </div>

              <div class="rounded-xl bg-slate-50 px-4 py-3">
                <p class="text-[11px] uppercase tracking-wide text-slate-400">Saldo Koin</p>
                <p class="mt-1 font-semibold text-slate-700">
                  {{ formatNumber(profile.coin_balance) }}
                </p>
              </div>

              <div class="rounded-xl bg-slate-50 px-4 py-3">
                <p class="text-[11px] uppercase tracking-wide text-slate-400">Login Terakhir</p>
                <p class="mt-1 font-semibold text-slate-700">
                  {{ formatDateTime(profile.last_login) }}
                </p>
              </div>
            </div>
          </article>

          <article class="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm lg:col-span-2">
            <div class="flex items-center justify-between gap-3">
              <div>
                <h2 class="text-sm font-semibold text-slate-800 sm:text-base">Edit Profil</h2>
                <p class="mt-1 text-xs text-slate-500 sm:text-sm">Ubah nama, email, atau password akunmu.</p>
              </div>
            </div>

            <form class="mt-5 space-y-5" @submit.prevent="handleSubmit">
              <div class="grid gap-5 sm:grid-cols-2">
                <div class="sm:col-span-2">
                  <label class="mb-1 block text-xs font-medium text-slate-600">Nama Lengkap</label>
                  <input
                    v-model="form.name"
                    type="text"
                    class="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Masukkan nama lengkap"
                  />
                  <p v-if="errors.name" class="mt-1 text-xs text-rose-600">
                    {{ errors.name }}
                  </p>
                </div>

                <div class="sm:col-span-2">
                  <label class="mb-1 block text-xs font-medium text-slate-600">Email</label>
                  <input
                    v-model="form.email"
                    type="email"
                    class="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Masukkan email"
                  />
                  <p v-if="errors.email" class="mt-1 text-xs text-rose-600">
                    {{ errors.email }}
                  </p>
                </div>

                <div class="sm:col-span-2">
                  <div class="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
                    <p class="text-xs font-semibold text-amber-800">Ubah Password</p>
                    <p class="mt-1 text-[11px] text-amber-700">
                      Isi bagian ini hanya jika kamu ingin mengganti password.
                    </p>
                  </div>
                </div>

                <div class="sm:col-span-2">
                  <label class="mb-1 block text-xs font-medium text-slate-600">Password Saat Ini</label>
                  <input
                    v-model="form.current_password"
                    type="password"
                    class="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Masukkan password saat ini"
                  />
                  <p v-if="errors.current_password" class="mt-1 text-xs text-rose-600">
                    {{ errors.current_password }}
                  </p>
                </div>

                <div>
                  <label class="mb-1 block text-xs font-medium text-slate-600">Password Baru</label>
                  <input
                    v-model="form.password"
                    type="password"
                    class="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Masukkan password baru"
                  />
                  <p v-if="errors.password" class="mt-1 text-xs text-rose-600">
                    {{ errors.password }}
                  </p>
                </div>

                <div>
                  <label class="mb-1 block text-xs font-medium text-slate-600">Konfirmasi Password Baru</label>
                  <input
                    v-model="form.password_confirmation"
                    type="password"
                    class="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Ulangi password baru"
                  />
                </div>
              </div>

              <div
                v-if="submitError"
                class="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
              >
                {{ submitError }}
              </div>

              <div class="flex flex-wrap justify-end gap-3">
                <button
                  type="button"
                  class="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                  @click="resetForm"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  class="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-300"
                  :disabled="saving"
                >
                  {{ saving ? "Menyimpan..." : "Simpan Perubahan" }}
                </button>
              </div>
            </form>
          </article>
        </section>
      </template>
    </div>

    <div
      v-if="showSuccessPopup"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
    >
      <div class="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl">
        <div
          class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h2 class="text-lg font-semibold text-slate-900">Profil berhasil diperbarui</h2>
        <p class="mt-2 text-sm text-slate-500">Data profil kamu sudah tersimpan di sistem.</p>

        <button
          type="button"
          class="mt-5 w-full rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
          @click="showSuccessPopup = false"
        >
          Tutup
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue"
import { getUserProfile, updateUserProfile } from "../../services/userService"

const loading = ref(true)
const saving = ref(false)
const submitError = ref("")
const showSuccessPopup = ref(false)
const profile = ref({
  id: null,
  name: "",
  email: "",
  role: "user",
  coin_balance: 0,
  last_login: null,
  provider: null
})

const form = ref({
  name: "",
  email: "",
  current_password: "",
  password: "",
  password_confirmation: ""
})

const errors = ref({})

const initials = computed(() => {
  const source = String(form.value.name || profile.value.name || "P")

  return source
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("")
})

function applyProfile(user) {
  profile.value = {
    id: user?.id ?? null,
    name: user?.name ?? "",
    email: user?.email ?? "",
    role: user?.role ?? "user",
    coin_balance: Number(user?.coin_balance ?? 0),
    last_login: user?.last_login ?? null,
    provider: user?.provider ?? null
  }

  form.value = {
    name: profile.value.name,
    email: profile.value.email,
    current_password: "",
    password: "",
    password_confirmation: ""
  }
}

async function loadProfile() {
  loading.value = true
  submitError.value = ""

  try {
    const response = await getUserProfile()
    applyProfile(response.data?.data?.user ?? {})
  } catch (error) {
    console.error("Gagal memuat profil:", error)
    submitError.value = "Profil belum bisa dimuat."
  } finally {
    loading.value = false
  }
}

function resetForm() {
  applyProfile(profile.value)
  errors.value = {}
  submitError.value = ""
}

async function handleSubmit() {
  saving.value = true
  errors.value = {}
  submitError.value = ""

  try {
    const payload = {
      name: form.value.name,
      email: form.value.email
    }

    if (form.value.password) {
      payload.current_password = form.value.current_password
      payload.password = form.value.password
      payload.password_confirmation = form.value.password_confirmation
    }

    const response = await updateUserProfile(payload)
    const updatedUser = response.data?.data?.user ?? {}

    applyProfile(updatedUser)
    showSuccessPopup.value = true
    window.dispatchEvent(
      new CustomEvent("user-profile-updated", {
        detail: updatedUser
      })
    )
  } catch (error) {
    console.error("Gagal memperbarui profil:", error)

    if (error?.response?.status === 422) {
      const validationErrors = error.response.data?.errors ?? {}

      errors.value = Object.fromEntries(
        Object.entries(validationErrors).map(([key, value]) => [key, Array.isArray(value) ? value[0] : value])
      )
      submitError.value = error.response.data?.message || "Data profil belum valid."
    } else {
      submitError.value = "Profil belum bisa diperbarui. Coba lagi."
    }
  } finally {
    saving.value = false
  }
}

function formatDateTime(value) {
  if (!value) {
    return "-"
  }

  const parsedDate = new Date(value)

  if (Number.isNaN(parsedDate.getTime())) {
    return "-"
  }

  return parsedDate.toLocaleString("id-ID", {
    dateStyle: "long",
    timeStyle: "short"
  })
}

function formatNumber(value) {
  const numericValue = Number(value ?? 0)

  if (!Number.isFinite(numericValue)) {
    return "0"
  }

  return new Intl.NumberFormat("id-ID").format(numericValue)
}

onMounted(() => {
  loadProfile()
})
</script>
