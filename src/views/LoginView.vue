<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
      <div class="text-center mb-6">
        <h1 class="text-2xl font-semibold text-gray-900 flex justify-center items-center space-x-2">
          <span>🐾</span>
          <span>Pet Task Manager</span>
        </h1>
        <p class="text-sm text-gray-500 mt-1">Acesse sua conta</p>
      </div>

      <form @submit.prevent="submit" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="email"
            type="email"
            id="email"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="seuemail@exemplo.com"
            required
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Senha</label>
          <input
            v-model="password"
            type="password"
            id="password"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="********"
            required
          />
        </div>
        <div>
          <p>{{ warning || '' }}</p>
        </div>
        <div class="flex items-center justify-between text-sm">
          <label class="flex items-center gap-2">
            <input type="checkbox" class="rounded border-gray-300 text-blue-600" />
            <span>Lembrar de mim</span>
          </label>
          <button class="text-blue-600 hover:underline">Esqueceu a senha?</button>
        </div>

   

        <button
    type="submit"
    class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
    :disabled="isLoading"
  >
    <svg
      v-if="isLoading"
      class="animate-spin h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      ></path>
    </svg>
    <span>{{ isLoading ? 'Entrando...' : 'Entrar' }}</span>
  </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/useAuthStore'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const isLoading = ref(false)
const auth = useAuthStore()
const router = useRouter()
const warning = ref('')

async function submit() {
  try {
    isLoading.value = true
    await auth.login({ email: email.value, password: password.value })
    router.push({ name: 'dashboard' })
  } catch (error) {
    warning.value = 'Erro ao fazer login. Verifique suas credenciais.'
    alert('Login failed')
  } finally {
    isLoading.value = false
  }
}
</script>
