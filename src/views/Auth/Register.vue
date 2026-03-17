<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white shadow-lg rounded-xl w-full max-w-md p-8">
      <h1 class="text-2xl font-bold text-center mb-6">Register</h1>

      <p v-if="error" class="text-red-500 text-sm text-center mb-4">
        {{ error }}
      </p>

      <form @submit.prevent="register" class="space-y-4">
        <div>
          <label class="text-sm">Nama</label>
          <input
            v-model="name"
            type="text"
            class="w-full border rounded-lg px-3 py-2 mt-1"
            required
          />
        </div>

        <div>
          <label class="text-sm">Email</label>
          <input
            v-model="email"
            type="email"
            class="w-full border rounded-lg px-3 py-2 mt-1"
            required
          />
        </div>

        <div>
          <label class="text-sm">Password</label>
          <input
            v-model="password"
            type="password"
            class="w-full border rounded-lg px-3 py-2 mt-1"
            required
          />
        </div>

        <div>
          <label class="text-sm">Confirm Password</label>
          <input
            v-model="confirmPassword"
            type="password"
            class="w-full border rounded-lg px-3 py-2 mt-1"
            required
          />
        </div>

        <button
          :disabled="loading"
          class="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
        >
          {{ loading ? "Registering..." : "Register" }}
        </button>
      </form>

      <p class="text-sm text-center mt-6">
        Sudah punya akun?
        <router-link to="/login" class="text-blue-600"> Login </router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "../../services/api";
import { AUTH_ENDPOINTS } from "../../services/endpoints";

const router = useRouter();

const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const loading = ref(false);
const error = ref("");

const register = async () => {
  error.value = "";

  if (password.value !== confirmPassword.value) {
    error.value = "Password tidak sama";
    return;
  }

  loading.value = true;

  try {
    await api.post(AUTH_ENDPOINTS.user.register, {
      name: name.value,
      email: email.value,
      password: password.value,
    });

    router.push("/login");
  } catch (err) {
    error.value = err.response?.data?.message || "Register gagal";
  } finally {
    loading.value = false;
  }
};
</script>
