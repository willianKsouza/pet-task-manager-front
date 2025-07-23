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

      <form @submit.prevent="handleLogin" class="space-y-4">
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

        <div class="flex items-center justify-between text-sm">
          <label class="flex items-center gap-2">
            <input type="checkbox" class="rounded border-gray-300 text-blue-600" />
            <span>Lembrar de mim</span>
          </label>
          <button class="text-blue-600 hover:underline">Esqueceu a senha?</button>
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors"
        >
          Entrar
        </button>
      </form>

      <p class="mt-6 text-xs text-center text-gray-400">
        © 2025 Pet Task Manager. Todos os direitos reservados.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from '@/lib/axios'
import router from '@/router'

const email = ref('')
const password = ref('')

const handleLogin = async () => {
    try {
        // Primeiro, obtenha o cookie CSRF do Sanctum
        await axios.get('/sanctum/csrf-cookie')

        // Agora faça o login
        const response = await axios.post('/api/login',
            {
                email: email.value,
                password: password.value
            }
        )
        // Sucesso no login
            if (response.status === 204) {
                router.push('/dashboard') // Redireciona para o dashboard após o login
            } else {
                console.error('Erro no login:', response.status, response.data)
            }
        console.log('Login realizado:', response)
        // Aqui você pode redirecionar ou salvar o token, conforme necessário
    } catch (error) {
        console.error('Erro ao fazer login:', error)
    }
}
</script>
