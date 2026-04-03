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
                class="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-emerald-100 text-xl font-bold text-emerald-700"
              >
                <img
                  v-if="profile.image"
                  :src="profile.image"
                  alt="Foto profil"
                  class="h-full w-full object-cover"
                />
                <span v-else>{{ initials }}</span>
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

            <div
              class="mt-5 rounded-2xl border px-4 py-4"
              :class="profile.is_email_verified ? 'border-emerald-200 bg-emerald-50' : 'border-amber-200 bg-amber-50'"
            >
              <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p
                    class="text-xs font-semibold uppercase tracking-wide"
                    :class="profile.is_email_verified ? 'text-emerald-700' : 'text-amber-700'"
                  >
                    Verifikasi Email
                  </p>
                  <p class="mt-1 text-sm font-semibold text-slate-800">
                    {{
                      profile.is_email_verified
                        ? "Email akun kamu sudah terverifikasi."
                        : "Email akun kamu belum terverifikasi."
                    }}
                  </p>
                  <p class="mt-1 text-xs text-slate-600 sm:text-sm">
                    {{
                      profile.is_email_verified
                        ? `Terverifikasi pada ${formatDateTime(profile.email_verified_at)}.`
                        : verificationNotice
                    }}
                  </p>
                </div>

                <button
                  v-if="!profile.is_email_verified && !isGoogleAccount"
                  type="button"
                  class="rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:bg-amber-300"
                  :disabled="sendingVerificationEmail"
                  @click="handleResendVerification"
                >
                  {{ sendingVerificationEmail ? "Mengirim..." : "Kirim Ulang Verifikasi" }}
                </button>
              </div>

              <p
                v-if="verificationFeedback"
                class="mt-3 rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-xs text-slate-700"
              >
                {{ verificationFeedback }}
              </p>
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
                  <div class="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
                    <p class="text-xs font-semibold text-emerald-800">Kontak & Alamat</p>
                    <p class="mt-1 text-[11px] text-emerald-700">
                      Lengkapi nomor WhatsApp dan domisili kamu agar data profil lebih lengkap.
                    </p>
                  </div>
                </div>

                <div class="sm:col-span-2">
                  <label class="mb-1 block text-xs font-medium text-slate-600">Nomor WhatsApp</label>
                  <input
                    v-model="form.whatsapp"
                    type="tel"
                    class="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Contoh: 081234567890"
                  />
                  <p v-if="errors.whatsapp" class="mt-1 text-xs text-rose-600">
                    {{ errors.whatsapp }}
                  </p>
                </div>

                <div>
                  <label class="mb-1 block text-xs font-medium text-slate-600">Provinsi</label>
                  <select
                    v-model="form.province_code"
                    class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:cursor-not-allowed disabled:bg-slate-100"
                    :disabled="loadingRegions.provinces"
                    @change="handleProvinceChange"
                  >
                    <option value="">
                      {{ loadingRegions.provinces ? "Memuat provinsi..." : "Pilih provinsi" }}
                    </option>
                    <option
                      v-for="province in provinces"
                      :key="province.code"
                      :value="province.code"
                    >
                      {{ province.name }}
                    </option>
                  </select>
                  <p v-if="errors.province_code" class="mt-1 text-xs text-rose-600">
                    {{ errors.province_code }}
                  </p>
                </div>

                <div>
                  <label class="mb-1 block text-xs font-medium text-slate-600">Kabupaten / Kota</label>
                  <select
                    v-model="form.regency_code"
                    class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:cursor-not-allowed disabled:bg-slate-100"
                    :disabled="loadingRegions.regencies || !form.province_code"
                    @change="handleRegencyChange"
                  >
                    <option value="">
                      {{
                        !form.province_code
                          ? "Pilih provinsi dulu"
                          : loadingRegions.regencies
                            ? "Memuat kabupaten..."
                            : "Pilih kabupaten / kota"
                      }}
                    </option>
                    <option
                      v-for="regency in regencies"
                      :key="regency.code"
                      :value="regency.code"
                    >
                      {{ regency.name }}
                    </option>
                  </select>
                  <p v-if="errors.regency_code" class="mt-1 text-xs text-rose-600">
                    {{ errors.regency_code }}
                  </p>
                </div>

                <div class="sm:col-span-2">
                  <label class="mb-1 block text-xs font-medium text-slate-600">Kecamatan</label>
                  <select
                    v-model="form.district_code"
                    class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:cursor-not-allowed disabled:bg-slate-100"
                    :disabled="loadingRegions.districts || !form.regency_code"
                    @change="handleDistrictChange"
                  >
                    <option value="">
                      {{
                        !form.regency_code
                          ? "Pilih kabupaten / kota dulu"
                          : loadingRegions.districts
                            ? "Memuat kecamatan..."
                            : "Pilih kecamatan"
                      }}
                    </option>
                    <option
                      v-for="district in districts"
                      :key="district.code"
                      :value="district.code"
                    >
                      {{ district.name }}
                    </option>
                  </select>
                  <p v-if="errors.district_code" class="mt-1 text-xs text-rose-600">
                    {{ errors.district_code }}
                  </p>
                </div>

                <div
                  v-if="regionError"
                  class="sm:col-span-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800"
                >
                  {{ regionError }}
                </div>

                <div v-if="!isGoogleAccount" class="sm:col-span-2">
                  <div class="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
                    <p class="text-xs font-semibold text-amber-800">Ubah Password</p>
                    <p class="mt-1 text-[11px] text-amber-700">
                      Isi bagian ini hanya jika kamu ingin mengganti password akun.
                    </p>
                  </div>
                </div>

                <div v-if="!isGoogleAccount" class="sm:col-span-2">
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

                <div v-if="!isGoogleAccount">
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

                <div v-if="!isGoogleAccount">
                  <label class="mb-1 block text-xs font-medium text-slate-600">Konfirmasi Password Baru</label>
                  <input
                    v-model="form.password_confirmation"
                    type="password"
                    class="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Ulangi password baru"
                  />
                  <p v-if="errors.password_confirmation" class="mt-1 text-xs text-rose-600">
                    {{ errors.password_confirmation }}
                  </p>
                </div>

                <div
                  v-if="isGoogleAccount"
                  class="sm:col-span-2 rounded-xl border border-sky-200 bg-sky-50 px-4 py-3"
                >
                  <p class="text-xs font-semibold text-sky-800">Login Google Aktif</p>
                  <p class="mt-1 text-[11px] text-sky-700 sm:text-xs">
                    Akun ini terhubung dengan Google dan email sudah dianggap terverifikasi. Untuk masuk ke akun ini, gunakan tombol login Google.
                  </p>
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
import { useRoute } from "vue-router"
import {
  getDistricts,
  getProvinces,
  getRegencies,
  getUserProfile,
  updateUserProfile
} from "../../services/userService"
import { resendVerificationEmail } from "../../services/authService"

const route = useRoute()
const loading = ref(true)
const saving = ref(false)
const submitError = ref("")
const showSuccessPopup = ref(false)
const regionError = ref("")
const sendingVerificationEmail = ref(false)
const verificationFeedback = ref("")
const profile = ref({
  id: null,
  name: "",
  email: "",
  email_verified_at: null,
  is_email_verified: false,
  whatsapp: "",
  role: "user",
  coin_balance: 0,
  last_login: null,
  provider: null,
  image: null,
  province_code: "",
  province_name: "",
  regency_code: "",
  regency_name: "",
  district_code: "",
  district_name: ""
})

const form = ref({
  name: "",
  email: "",
  whatsapp: "",
  province_code: "",
  province_name: "",
  regency_code: "",
  regency_name: "",
  district_code: "",
  district_name: "",
  current_password: "",
  password: "",
  password_confirmation: ""
})

const errors = ref({})
const provinces = ref([])
const regencies = ref([])
const districts = ref([])
const loadingRegions = ref({
  provinces: false,
  regencies: false,
  districts: false
})

const initials = computed(() => {
  const source = String(form.value.name || profile.value.name || "P")

  return source
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("")
})

const isGoogleAccount = computed(() => profile.value.provider === "google")

const verificationNotice = computed(() => {
  if (isGoogleAccount.value) {
    return "Akun Google langsung dianggap terverifikasi dan tidak memerlukan pengiriman email verifikasi manual."
  }

  if (route.query.verification === "welcome") {
    return "Akun berhasil dibuat. Kami sudah mengirim email verifikasi ke alamat email kamu."
  }

  if (route.query.verification === "pending") {
    return "Sebelum memakai fitur lupa password, verifikasi email dulu dari link yang dikirim ke inbox kamu."
  }

  return "Verifikasi email dulu agar fitur lupa password dan reset password bisa digunakan dengan aman."
})

function applyProfile(user) {
  profile.value = {
    id: user?.id ?? null,
    name: user?.name ?? "",
    email: user?.email ?? "",
    email_verified_at: user?.email_verified_at ?? null,
    is_email_verified: Boolean(user?.is_email_verified),
    whatsapp: user?.whatsapp ?? "",
    role: user?.role ?? "user",
    coin_balance: Number(user?.coin_balance ?? 0),
    last_login: user?.last_login ?? null,
    provider: user?.provider ?? null,
    image: user?.image ?? null,
    province_code: user?.province_code ?? "",
    province_name: user?.province_name ?? "",
    regency_code: user?.regency_code ?? "",
    regency_name: user?.regency_name ?? "",
    district_code: user?.district_code ?? "",
    district_name: user?.district_name ?? ""
  }

  form.value = {
    name: profile.value.name,
    email: profile.value.email,
    whatsapp: profile.value.whatsapp,
    province_code: profile.value.province_code,
    province_name: profile.value.province_name,
    regency_code: profile.value.regency_code,
    regency_name: profile.value.regency_name,
    district_code: profile.value.district_code,
    district_name: profile.value.district_name,
    current_password: "",
    password: "",
    password_confirmation: ""
  }
}

function syncRegionLabel(type, list, code) {
  const selected = list.find((item) => String(item.code) === String(code))

  if (type === "province") {
    form.value.province_name = selected?.name ?? ""
  }

  if (type === "regency") {
    form.value.regency_name = selected?.name ?? ""
  }

  if (type === "district") {
    form.value.district_name = selected?.name ?? ""
  }
}

function normalizeWilayahResponse(response) {
  const payload = response?.data

  if (Array.isArray(payload?.data?.data)) {
    return payload.data.data
  }

  if (Array.isArray(payload?.data)) {
    return payload.data
  }

  if (Array.isArray(payload)) {
    return payload
  }

  return []
}

function resetRegencySelection() {
  form.value.regency_code = ""
  form.value.regency_name = ""
  regencies.value = []
  resetDistrictSelection()
}

function resetDistrictSelection() {
  form.value.district_code = ""
  form.value.district_name = ""
  districts.value = []
}

async function loadProvinces() {
  loadingRegions.value.provinces = true
  regionError.value = ""

  try {
    const response = await getProvinces()
    provinces.value = normalizeWilayahResponse(response)
    syncRegionLabel("province", provinces.value, form.value.province_code)
  } catch (error) {
    console.error("Gagal memuat provinsi:", error)
    regionError.value = "Daftar provinsi belum bisa dimuat dari layanan wilayah."
  } finally {
    loadingRegions.value.provinces = false
  }
}

async function loadRegencies(provinceCode) {
  if (!provinceCode) {
    regencies.value = []
    return
  }

  loadingRegions.value.regencies = true
  regionError.value = ""

  try {
    const response = await getRegencies(provinceCode)
    regencies.value = normalizeWilayahResponse(response)
    syncRegionLabel("regency", regencies.value, form.value.regency_code)
  } catch (error) {
    console.error("Gagal memuat kabupaten/kota:", error)
    regionError.value = "Daftar kabupaten / kota belum bisa dimuat."
  } finally {
    loadingRegions.value.regencies = false
  }
}

async function loadDistricts(regencyCode) {
  if (!regencyCode) {
    districts.value = []
    return
  }

  loadingRegions.value.districts = true
  regionError.value = ""

  try {
    const response = await getDistricts(regencyCode)
    districts.value = normalizeWilayahResponse(response)
    syncRegionLabel("district", districts.value, form.value.district_code)
  } catch (error) {
    console.error("Gagal memuat kecamatan:", error)
    regionError.value = "Daftar kecamatan belum bisa dimuat."
  } finally {
    loadingRegions.value.districts = false
  }
}

async function handleProvinceChange() {
  regionError.value = ""
  syncRegionLabel("province", provinces.value, form.value.province_code)
  resetRegencySelection()

  if (form.value.province_code) {
    await loadRegencies(form.value.province_code)
  }
}

async function handleRegencyChange() {
  regionError.value = ""
  syncRegionLabel("regency", regencies.value, form.value.regency_code)
  resetDistrictSelection()

  if (form.value.regency_code) {
    await loadDistricts(form.value.regency_code)
  }
}

function handleDistrictChange() {
  regionError.value = ""
  syncRegionLabel("district", districts.value, form.value.district_code)
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

async function handleResendVerification() {
  sendingVerificationEmail.value = true
  verificationFeedback.value = ""

  try {
    const response = await resendVerificationEmail()
    verificationFeedback.value =
      response.data?.message || "Email verifikasi berhasil dikirim ulang."
  } catch (error) {
    verificationFeedback.value =
      error.response?.data?.message || "Email verifikasi belum bisa dikirim ulang."
  } finally {
    sendingVerificationEmail.value = false
  }
}

async function resetForm() {
  applyProfile(profile.value)
  errors.value = {}
  submitError.value = ""
  regionError.value = ""

  await loadProvinces()

  if (form.value.province_code) {
    await loadRegencies(form.value.province_code)
  }

  if (form.value.regency_code) {
    await loadDistricts(form.value.regency_code)
  }
}

async function handleSubmit() {
  saving.value = true
  errors.value = {}
  submitError.value = ""
  verificationFeedback.value = ""

  try {
    const payload = {
      name: form.value.name,
      email: form.value.email,
      whatsapp: form.value.whatsapp,
      province_code: form.value.province_code || null,
      province_name: form.value.province_name || null,
      regency_code: form.value.regency_code || null,
      regency_name: form.value.regency_name || null,
      district_code: form.value.district_code || null,
      district_name: form.value.district_name || null
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

onMounted(async () => {
  await loadProfile()
  await loadProvinces()

  if (form.value.province_code) {
    await loadRegencies(form.value.province_code)
  }

  if (form.value.regency_code) {
    await loadDistricts(form.value.regency_code)
  }
})
</script>
